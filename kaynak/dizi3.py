# -*- coding: utf-8 -*-
"""Tüm türetilmiş alanları sıfırdan hesaplar: alt saat · sıra · blokSon · mola."""
import json,re
from collections import defaultdict
from datetime import date,timedelta
G=json.load(open('app_gorev.json'))
dk=lambda s:(lambda p:int(p[0])*60+int(p[1]))(s.split(':'))
ss=lambda m:'%02d:%02d'%(m//60,m%60)
carpan=lambda t:1+0.055*max(0,t-3.0)
SR={'Z':0,'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'—':7}
SPOR={date(2026,7,26)}
d=date(2026,7,29)
while d<=date(2026,8,22): SPOR.add(d); d+=timedelta(2)
SIKIS={date(2026,7,26),date(2026,8,2),date(2026,8,10),date(2026,8,16),date(2026,8,20)}
UZUN=SPOR-SIKIS
DEN={'2026-08-01','2026-08-05','2026-08-09','2026-08-13','2026-08-17','2026-08-20'}
zSure={}
for x in G:
    if x['b']=='Z':
        a,b=x['blokT'].split('–'); zSure[x['d']]=max(zSure.get(x['d'],0),(dk(b)-dk(a))/60)
FV={x['d'] for x in G if x['b']=='F'}
MOLA_AD={'kahvalti':'kahvaltı','ogle':'öğle yemeği','kisa':'kısa ara','aksam':'akşam yemeği',
         'spor':'spor','yavas':'yavaşlama','izin':'izin'}
def bloklar(g):
    uz=date.fromisoformat(g) in UZUN; z=zSure.get(g,0.0); L=[]
    if z>0: L.append(('Z','06:00–%s'%ss(360+int(round(z*60)))))
    if g in DEN:
        L+=[('A','07:15–08:45'),('B','10:15–12:30'),('C','14:45–17:15'),('D','17:30–19:30'),('E','20:15–22:00')]
    else:
        L+=[('A','07:15–08:45'),('B','10:00–13:45')]
        if not uz: L.append(('C','14:45–17:15'))
        L+=[('D','17:30–19:30'),('E','20:15–22:00')]
    return L
def anahtar(x):
    m=re.search(r'sf (\d+)',x.get('src') or '')
    tip=0 if x['act'] in ('soru','tekrar') else (1 if x['act'] in ('oku','video') else 2)
    return (tip,int(m.group(1)) if m else 0)
blk=defaultdict(list)
for x in G:
    if x['b']!='—': blk[(x['d'],x['b'])].append(x)
cak=asm=mol=0
for g in sorted({x['d'] for x in G}):
    BT=dict(bloklar(g))
    sira=[k for k,_ in bloklar(g) if blk.get((g,k))]
    for j,b in enumerate(sira):
        l=blk.get((g,b),[])
        if not l: continue
        l.sort(key=anahtar)
        bt=BT[b]; bas,bit=dk(bt.split('–')[0]),dk(bt.split('–')[1]); t=bas
        for i,x in enumerate(l):
            x['blokT']=bt; x['blokSon']=ss(bit); x['sira']=[i+1,len(l)]; x['mola']=None
            sn=t+max(5,int(round(x['sure']*60)))
            if i<len(l)-1: sn=min(sn,bit-5*(len(l)-1-i))
            sn=max(sn,t+5)
            x['t']='%s–%s'%(ss(t),ss(sn)); t=sn
        if t>bit: asm+=1
        if j+1<len(sira):
            nb=sira[j+1]; nbas=dk(BT[nb].split('–')[0]); f=nbas-bit
            if b=='B' and date.fromisoformat(g) in UZUN and g not in DEN:
                # DÜZELTME: öğle yemeği açıkça yazılıyor
                l[-1]['mola']=[ss(bit),ss(nbas),f,'spor',
                  '%s–14:00 öğle yemeği · 14:00–16:15 spor · 16:15–%s toparlanma, sonra blok %s'%(ss(bit),ss(nbas),nb)]
            else:
                tip='kisa' if f<=20 else ('kahvalti' if b in ('Z','A') else ('ogle' if b=='B' else ('aksam' if b=='D' else 'kisa')))
                l[-1]['mola']=[ss(bit),ss(nbas),f,tip,'%d dk %s · %s–%s'%(f,MOLA_AD[tip],ss(bit),ss(nbas))]
        else:
            f=dk('23:00')-bit
            if False:
                l[-1]['mola']=[ss(bit),'23:00',f,'izin','günün kalanı izin · %s–23:00 · şehir dışındasın'%ss(bit)]
            else:
                l[-1]['mola']=[ss(bit),'23:00',f,'yavas','%d dk yavaşlama · %s–23:00 · yeni konu yok'%(f,ss(bit))]
        mol+=1
G.sort(key=lambda x:(x['d'],SR[x['b']],dk(x['t'].split('–')[0])))
json.dump(G,open('app_gorev.json','w'),ensure_ascii=False)
blk2=defaultdict(list)
for x in G:
    if x['b']!='—': blk2[(x['d'],x['b'])].append(x)
c2=d2=a2=0
for (g,b),l in blk2.items():
    l.sort(key=lambda y:dk(y['t'].split('–')[0]))
    if len({x['t'] for x in l})<len(l): a2+=1
    for i in range(1,len(l)):
        if dk(l[i]['t'].split('–')[0])<dk(l[i-1]['t'].split('–')[1]): c2+=1
    bt=l[0]['blokT']
    if dk(l[-1]['t'].split('–')[1])>dk(bt.split('–')[1]): d2+=1
    if any((x['sira'] or [0,0])[1]!=len(l) for x in l): print('sira ✗',g,b)
print("blok %d · mola %d · çakışma %d · blok dışı %d · aynı saat %d"%(len(blk2),mol,c2,d2,a2))
