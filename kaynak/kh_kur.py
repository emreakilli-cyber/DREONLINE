# -*- coding: utf-8 -*-
"""KAYNAK HARİTASI · etiketsiz kaynaklara da ilerleme etiketi"""
import json,re,importlib.util
from collections import defaultdict
def y(a,p):
    s=importlib.util.spec_from_file_location(a,p);m=importlib.util.module_from_spec(s);s.loader.exec_module(m);return m
gk=y('gk','gorev_katalog.py')
G=json.load(open('app_gorev.json')); KH=json.load(open('kaynak_harita.json'))
PU=json.load(open('powerup.json'))
K=gk.katalog()
ADI=lambda k:re.sub(r'\s+·\s\d+(/\d+)?\.\sparça','',re.sub(r'\s+—\stekrar','',k))
RENK={}; byk=defaultdict(list)
for x in K: byk[x['kitap']].append(x)
for kit,l in byk.items():
    l2=sorted(l,key=lambda z:(-(z['soru'] or 0),z['sayfa']/max(z['soru'] or .01,.01)))
    n=len(l2); a,b,c=int(round(n*.225)),int(round(n*.50)),int(round(n*.775))
    for i,x in enumerate(l2): RENK[(x['kitap'],x['bolum'])]='pembe' if i<a else ('turuncu' if i<b else ('sari' if i<c else 'mavi'))
icer=defaultdict(set); ilk={}; gorevSay=defaultdict(int)
for x in G:
    kit=x['src'].split(' sf ')[0]
    gorevSay[kit]+=1
    if kit not in ilk or x['d']<ilk[kit]: ilk[kit]=x['d']
    if x['act'] in ('oku','tekrar'): icer[kit].add(ADI(x['k']))
# ETİKETSİZ KAYNAKLAR · toplam birim sayısı
ETSIZ={
 "TUSDATA 24'lü branş denemeleri":(240,'deneme','10 branş × 24 deneme'),
 'Atilla Uslu Dahiliye videoları · 1.5x':(44,'video','Dahiliye konu videoları'),
 'PreTUS200':(12,'oturum','6 tam deneme × 2 oturum'),
 'yanlış defteri':(6,'analiz','her deneme sonrası'),
}
n=0
for k in KH['kitap']:
    kit=k['ad']; l=byk.get(kit)
    k['ilk']=ilk.get(kit) or '9999'
    if l:
        say={'pembe':[0,0],'turuncu':[0,0],'sari':[0,0],'mavi':[0,0]}; ic=0
        for x in l:
            r=RENK[(kit,x['bolum'])]; say[r][1]+=1
            if x['bolum'] in icer.get(kit,()): say[r][0]+=1; ic+=1
        k['say']=say; k['ic']=ic; k['tp']=len(l); k['renkli']=1
        k['pu']={u['konu']:RENK.get((kit,u['konu'])) for u in PU if u['kitap']==kit}
        n+=1
    else:
        k['say']=None; k['renkli']=0; k['pu']={}
        if kit in ETSIZ:
            top,bir,ac=ETSIZ[kit]
            k['ic']=gorevSay.get(kit,0); k['tp']=top; k['bir']=bir; k['alt']=ac
        else:
            k['ic']=gorevSay.get(kit,0); k['tp']=gorevSay.get(kit,0); k['bir']='görev'; k['alt']=''
KH['kitap'].sort(key=lambda k:(-k['renkli'],k['ilk'],k['ad']))
json.dump(KH,open('kaynak_harita.json','w'),ensure_ascii=False)
print("renk sayacı: %d · etiketsiz ilerleme: %d" % (n,len(KH['kitap'])-n))
print()
print("%-38s %10s %s" % ('KAYNAK','ilerleme','not'))
for k in KH['kitap']:
    if k['renkli']: continue
    print("%-38s %6s/%-4s %s" % (k['ad'][:38],k['ic'],k['tp'],k.get('alt','')))
