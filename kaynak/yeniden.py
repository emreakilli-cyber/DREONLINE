# -*- coding: utf-8 -*-
import json,re
from collections import defaultdict
from datetime import date,timedelta
G=json.load(open('app_gorev.json'))
SR={'Z':0,'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'—':7}
G.sort(key=lambda x:(x['d'],SR[x['b']],x['t']))
gun=sorted({x['d'] for x in G}); gi={d:i for i,d in enumerate(gun)}

grp=defaultdict(list)
for i,x in enumerate(G):
    if x['act']=='oku' and ' sf ' in (x.get('src') or ''):
        grp[(x['br'],re.sub(r'\s+—.*','',x['k']))].append(i)
for k,idx in grp.items():
    idx.sort(key=lambda i:(G[i]['d'],SR[G[i]['b']]))
    n=len(idx)
    for j,i in enumerate(idx):
        G[i]['ot']=[j+1,n]
        G[i]['otg']=[G[q]['d']+'|'+G[q]['b'] for q in idx]
kir=0
for k,idx in grp.items():
    idx.sort(key=lambda i:(G[i]['d'],SR[G[i]['b']]))
    ss=[]
    for i in idx:
        m=re.search(r'sf (\d+)–(\d+)',G[i]['src'])
        if m: ss.append((int(m.group(1)),int(m.group(2)),i))
    for a in range(1,len(ss)):
        if ss[a][0]!=ss[a-1][1]:
            kir+=1; print("  ✗ sayfa boşluğu %s %s: %d→%d"%(k[0],k[1][:30],ss[a-1][1],ss[a][0]))
print("sayfa sürekliliği: %s"%('✓ tam' if kir==0 else '✗ %d kırık'%kir))
for x in G:
    if x['act']=='oku' and x.get('ot'):
        a,b=x['ot']
        if b==1: x['why']='Bölüm tek oturumda kapanıyor — verilen sayfaların hepsi bu blokta.'
        elif a==b: x['why']='Son oturum %d/%d — bu bölüm bu blokta kapanıyor.'%(a,b)
        else: x['why']='Oturum %d/%d — bu blokta sadece verilen sayfalar, ötesine geçme.'%(a,b)
NED={'Enfeksiyon & Antimikrobiyal':'Etkeni ve antibiyotik mekanizmasını aynı blokta görmek, ampirik tedavi sorusunu tek adımda çözdürüyor',
 'GİS & Hepatobiliyer & Cerrahi':'Aynı organın patolojisi, dahiliyesi ve cerrahisi tek sistemde dönüyor',
 'Nörobilim':'Fizyolojik yol, anatomik lokalizasyon ve ilaç etkisi aynı şemaya oturuyor',
 'Metabolizma':'Yolak bilgisi ile kalıtsal metabolik hastalığın klinik yüzü aynı bilgi',
 'Endokrin & Üreme':'Hormon sentezi, ilaç etkisi ve klinik tablo birbirini tamamlıyor',
 'Kardiyovasküler':'Endokardit, perikardit ve kapak hastalığı erişkin-çocuk ortak; farkları öğren, iki soruyu birden al',
 'Gebelik & Yenidoğan':'Gebelik komplikasyonu ile yenidoğan sonucu aynı vakanın iki ucu',
 'Kas-İskelet & Romatoloji':'Eklem bulgusu, anatomik yapı ve sistemik hastalık aynı vakada',
 'Nefro-Üriner':'Böbrek patolojisi erişkin ve çocukta aynı mekanizma, farklı eşikler',
 'Meme & Deri':'Lezyon morfolojisi patoloji ve klinik tarafından aynı dille sorulur',
 'Solunum':'Radyoloji ve klinik bulgu erişkin-çocuk ortak',
 'Acil & Halk Sağlığı':'Şok ve sıvı-elektrolit yaklaşımı erişkin-çocuk ortak, sadece dozlar değişiyor',
 'Hematoloji-Onkoloji':'Erişkin ve çocuk hematolojisi aynı mekanizmayı farklı eşiklerle soruyor'}
kid=lambda x:x['d']+'|'+x['b']+'|'+x['br']+'|'+x['k']
gz=defaultdict(list)
for i,x in enumerate(G):
    if x['act'] in ('oku','video','soru') and x.get('z'): gz[x['z']].append(i)
KOM=[];gr=set()
for z,idx in gz.items():
    idx.sort(key=lambda i:(G[i]['d'],SR[G[i]['b']]))
    for a in range(len(idx)):
        for b in range(a+1,len(idx)):
            xa,xb=G[idx[a]],G[idx[b]]
            f=gi[xb['d']]-gi[xa['d']]
            if f>1: break
            if xa['br']==xb['br']: continue
            ck=(xa['br']+'|'+xa['k'],xb['br']+'|'+xb['k'])
            if ck in gr or (ck[1],ck[0]) in gr: continue
            gr.add(ck)
            KOM.append([kid(xa),kid(xb),NED.get(z,'Aynı sistemin iki farklı branştaki yüzü'),
                        xa['br']+' · '+xa['k'], xb['br']+' · '+xb['k'], f])
json.dump(KOM,open('kombo.json','w'),ensure_ascii=False)
kim={kid(x) for x in G}
print("kombo: %d · uçlar geçerli %s · ≤1 gün %s"%(len(KOM),
  all(k[0] in kim and k[1] in kim for k in KOM), all(k[5]<=1 for k in KOM)))
KH=json.load(open('kaynak_harita.json'))
# ── KAYNAK HARİTASI TAM YENİDEN ÜRETİM
# Eskiden yalnız mevcut satırların GÜN listesi tazeleniyordu; programa yeni giren
# bölüm haritaya hiç eklenmiyor, çıkan bölüm hiç silinmiyor, çöpten kurtulan bölüm
# çöpte kalıyordu. Sonuç: 30 bölüm haritada görünmüyor, 23'ü hayalet, 2'si hem
# çöpte hem programda. Artık harita her koşuda programdan yeniden kuruluyor.
srcGun=defaultdict(list); srcSf=defaultdict(set); srcSoru={}
for x in G:
    n=(x.get('src') or '').split(' sf ')[0]
    if not n: continue
    b=re.sub(r'\s+—.*','',x['k'])
    srcGun[(n,b)].append(x['d'])
    m=re.search(r'sf (\d+)–(\d+)',x.get('src') or '')
    if m: srcSf[(n,b)]|={int(m.group(1)),int(m.group(2))}
    if x.get('soru'): srcSoru[(n,b)]=x['soru']
try:
    ek=open('eko.py').read(); exec(ek[ek.find('KITAP={'):ek.find('\nEZBER=')])
except Exception: KITAP={}
ESL={'TUSTIME Fast Track Farmakoloji':'FT Farmakoloji','TUSTIME Fast Track Biyokimya':'FT Biyokimya',
 'TUSDATA Speetus':'Speetus Genel Cerrahi','TUSTIME Fast Track Kadın Doğum':'FT Kadın Doğum',
 'TUSTIME Mikrobiyoloji':'TUSTIME Mikrobiyoloji','TUSTIME Fizyoloji':'TUSTIME Fizyoloji',
 'TUSTIME Küçük Stajlar':'TUSTIME Küçük Stajlar','Anatomi Fast Track':'Anatomi Fast Track',
 'Klinisyen Vaka Pediatri':'Klinisyen Vaka Pediatri'}
RENK={}
for kit,(tot,bl) in KITAP.items():
    srt=sorted(bl,key=lambda z:(-z[3],(z[2]-z[1])/max(z[3],0.01)))
    nn=len(srt); q1,q2,q3=int(round(nn*.225)),int(round(nn*.50)),int(round(nn*.775))
    for i,(a2,x2,y2,q) in enumerate(srt):
        RENK[(kit,a2)]='pembe' if i<q1 else ('turuncu' if i<q2 else ('sari' if i<q3 else 'mavi'))
kaps=defaultdict(set)
for x in G:
    m=re.search(r'sf (\d+)–(\d+)',x.get('src') or '')
    if m and x['act']=='oku':
        kn=x['src'].split(' sf ')[0]
        if kn in ESL: kaps[ESL[kn]]|=set(range(int(m.group(1)),int(m.group(2))))
eks=0
# kural_test.py'nin ELLE eşlemesinin aynısı: haritadaki tek başlık, programda
# birden çok src adına dağılmış olabilir (24'lü branş denemeleri, video · 1.5x).
def esles(ad,n):
    if ad=="TUSDATA 24'lü branş denemeleri": return "24'lü" in n
    if ad=='Atilla Uslu Dahiliye videoları · 1.5x': return n=='Atilla Uslu Dahiliye videoları'
    return n==ad
for k in KH['kitap']:
    ad=k['ad']
    bolumler=sorted({b for (n,b) in srcGun if esles(ad,n)})
    yeniS=[]
    for b in bolumler:
        gs=set(); sf=set(); sr=0
        for (n,b2),g2 in srcGun.items():
            if b2==b and esles(ad,n):
                gs|=set(g2); sf|=srcSf.get((n,b2),set()); sr=srcSoru.get((n,b2),sr)
        ar='%d–%d'%(min(sf),max(sf)) if sf else ''
        yeniS.append([b,ar,sr,sorted(gs),len(gs)])
    k['s']=yeniS
    k['cop']=[c for c in k['cop'] if c[0] not in set(bolumler)]
    kit=ESL.get(ad)
    if kit and kit in KITAP:
        tot,bl=KITAP[kit]
        say={'pembe':[0,0],'turuncu':[0,0],'sari':[0,0],'mavi':[0,0]}
        ic=0
        for a2,p1,p2,q in bl:
            r=RENK[(kit,a2)]; say[r][1]+=1
            if set(range(p1,p2))<=kaps.get(kit,set()): say[r][0]+=1; ic+=1
        k['say']=say; k['ic']=ic; k['tp']=len(bl)
    eks+=1
json.dump(KH,open('kaynak_harita.json','w'),ensure_ascii=False)
print("kaynak haritası: %d kitap sıfırdan kuruldu · %d planlı satır · %d çöp"%(
  eks,sum(len(k['s']) for k in KH['kitap']),sum(len(k['cop']) for k in KH['kitap'])))
json.dump(G,open('app_gorev.json','w'),ensure_ascii=False)
print("\n%d görev · %d gün · %.1f etkin saat"%(len(G),len(gun),sum(x['sure'] for x in G)))
