#!/usr/bin/env python3
"""Counts how much of the site is translated into each language and writes i18n-stats.json (shown in the admin «Налаштування»).
Run after every translation batch:  python3 tools/i18n-stats.py"""
import re, json, datetime, os
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
s=open(os.path.join(ROOT,'index.html'),encoding='utf-8').read()
LANGS=['en','de','fr','es','it']; NAMES={'en':'Англійська','de':'Німецька','fr':'Французька','es':'Іспанська','it':'Італійська'}
def H(t):
  h=0x811c9dc5
  for ch in t.encode('utf-16-le').decode('utf-16-le'):
    pass
  h=0x811c9dc5
  for cu in [int.from_bytes(t.encode('utf-16-le')[k:k+2],'little') for k in range(0,len(t.encode('utf-16-le')),2)]:
    h^=cu; h=(h*0x01000193)&0xffffffff
  n=h; d='0123456789abcdefghijklmnopqrstuvwxyz'; o=''
  while True:
    o=d[n%36]+o; n//=36
    if n==0: break
  return o
def obj(name):
  i=s.index(name+'{')+len(name); depth=0
  for j in range(i,len(s)):
    c=s[j]
    if c=='{': depth+=1
    elif c=='}':
      depth-=1
      if depth==0: return s[i:j+1],(i,j+1)
TRs,span1=obj('const TR='); TR=json.loads(TRs)
TRXs,span2=obj('const TRX='); TRX=json.loads(TRXs)
for i,l in enumerate(LANGS):
  for k,v in TRX.items():
    if v and len(v)>i and v[i]: TR.setdefault(l,{})[H(k)]=v[i]
# UI dictionary
I18s,span3=obj('const I18N=')
ui={}
for m in re.finditer(r'\n\s*(uk|en|de|fr|es|it)\s*:\s*\{',I18s): ui.setdefault(m.group(1),0)
def keys_of(lang):
  m=re.search(r'\n\s*'+lang+r'\s*:\s*\{',I18s)
  if not m: return set()
  i=m.end()-1; depth=0
  for j in range(i,len(I18s)):
    c=I18s[j]
    if c=='{': depth+=1
    elif c=='}':
      depth-=1
      if depth==0: break
  return set(re.findall(r'(?:^|[{,\s])([A-Za-z_][A-Za-z0-9_]*)\s*:',I18s[i:j+1]))
uk_keys=keys_of('uk')
# phrases wrapped in _t/_f and content strings (Cyrillic literals) outside the dictionaries
body=s
for a,b in sorted([span1,span2,span3],reverse=True): body=body[:a]+body[b:]
code=''.join(m.group(1) for m in re.finditer(r'<script(?![^>]*src)[^>]*>(.*?)</script>',body,re.S))
phr=set(m.group(2) for m in re.finditer(r'_(t|f)\("((?:[^"\\]|\\.)*)"',code))
phr={p.encode().decode('unicode_escape').encode('latin-1').decode('utf-8') if '\\u' in p else p for p in phr}
lit=set(m.group(1) for m in re.finditer(r'"((?:[^"\\\n]|\\.){8,})"',code) if re.search('[а-яіїєґА-ЯІЇЄҐ]',m.group(1)) and ' ' in m.group(1))
content=lit-phr
out={'updated':datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%dT%H:%MZ'),'base':'uk','langs':[]}
for l in LANGS:
  d=TR.get(l,{}); uk=keys_of(l)
  pt=sum(1 for p in phr if H(p) in d); ct=sum(1 for c in content if H(c) in d)
  out['langs'].append({'code':l,'name':NAMES[l],'ui':[len(uk&uk_keys),len(uk_keys)],'phrases':[pt,len(phr)],'content':[ct,len(content)]})
open(os.path.join(ROOT,'i18n-stats.json'),'w',encoding='utf-8').write(json.dumps(out,ensure_ascii=False,indent=1))
print(json.dumps(out,ensure_ascii=False))
