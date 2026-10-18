#!/usr/bin/env python3
"""Merges tools/i18n/<lang>.json ({"Ukrainian source": "translation"}) into TR[<lang>] inside index.html (keys = FNV hash of the source).
Usage: python3 tools/i18n-merge.py en   (then: python3 tools/i18n-stats.py)"""
import json, os, re, sys
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANG=sys.argv[1] if len(sys.argv)>1 else 'en'
def H(t):
  h=0x811c9dc5; b=t.encode('utf-16-le')
  for k in range(0,len(b),2): h^=int.from_bytes(b[k:k+2],'little'); h=(h*0x01000193)&0xffffffff
  d='0123456789abcdefghijklmnopqrstuvwxyz'; o=''
  while True:
    o=d[h%36]+o; h//=36
    if h==0: return o
p=os.path.join(ROOT,'index.html'); s=open(p,encoding='utf-8').read()
i=s.index('const TR=')+len('const TR='); obj,end=json.JSONDecoder().raw_decode(s[i:])
src=json.load(open(os.path.join(ROOT,'tools','i18n',LANG+'.json'),encoding='utf-8'))
d=obj.setdefault(LANG,{}); n=0; bad=[]
for uk,tr in src.items():
  if not tr: continue
  ph=sorted(re.findall(r'\{\d+\}',uk)); 
  if ph!=sorted(re.findall(r'\{\d+\}',tr)): bad.append(uk); continue
  k=H(uk)
  if d.get(k)!=tr: d[k]=tr; n+=1
out=json.dumps(obj,ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
s=s[:i]+out+s[i+end:]
open(p,'w',encoding='utf-8').write(s)
print(f'{LANG}: {n} entries written, {len(d)} total' + (f'; skipped (placeholder mismatch): {bad}' if bad else ''))
