#!/usr/bin/env python3
"""Merges tools/i18n/<lang>.json ({"Ukrainian source": "translation"}) into i18n/tr-<lang>.js (keys = FNV hash of the source)
and bumps that file's version in app.html's loader so browsers fetch the new copy.
Usage: python3 tools/i18n-merge.py en   (then: python3 tools/i18n-stats.py)"""
import json, os, re, sys, hashlib
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANG=sys.argv[1] if len(sys.argv)>1 else 'en'
def H(t):
  h=0x811c9dc5; b=t.encode('utf-16-le')
  for k in range(0,len(b),2): h^=int.from_bytes(b[k:k+2],'little'); h=(h*0x01000193)&0xffffffff
  d='0123456789abcdefghijklmnopqrstuvwxyz'; o=''
  while True:
    o=d[h%36]+o; h//=36
    if h==0: return o
tp=os.path.join(ROOT,'i18n','tr-'+LANG+'.js')
d={}
if os.path.exists(tp):
  t=open(tp,encoding='utf-8').read(); i=t.index(']=')+2; d,_=json.JSONDecoder().raw_decode(t[i:])
src=json.load(open(os.path.join(ROOT,'tools','i18n',LANG+'.json'),encoding='utf-8'))
n=0; bad=[]
for uk,tr in src.items():
  if not tr: continue
  ph=sorted(re.findall(r'\{\d+\}',uk))
  if ph!=sorted(re.findall(r'\{\d+\}',tr)): bad.append(uk); continue
  k=H(uk)
  if d.get(k)!=tr: d[k]=tr; n+=1
body='/* CODE · '+LANG+' translations (loaded only for this language) — edit via tools/i18n-merge.py */\n(window.TR=window.TR||{})["'+LANG+'"]='+json.dumps(d,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')+';\n'
open(tp,'w',encoding='utf-8').write(body)
ap=os.path.join(ROOT,'app.html'); s=open(ap,encoding='utf-8').read()
m=re.search(r'var V=(\{[^}]*\})',s); V=json.loads(m.group(1)); V[LANG]=hashlib.md5(body.encode()).hexdigest()[:8]
s=s[:m.start(1)]+json.dumps(V)+s[m.end(1):]
open(ap,'w',encoding='utf-8').write(s)
print(f'{LANG}: {n} entries written, {len(d)} total' + (f'; skipped (placeholder mismatch): {bad}' if bad else ''))
