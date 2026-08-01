# -*- coding: utf-8 -*-
import json,re
from datetime import date,timedelta
from collections import defaultdict,Counter
h=open('/mnt/user-data/outputs/index.html').read()
def cek(ad):
    i=h.index('const '+ad+'=') if ('const '+ad+'=') in h else h.index(ad+'=')
    j=h.index('=',i)+1
    while h[j] in ' \n': j+=1
    ac=h[j]; kap={'[':']','{':'}'}[ac]; d=0; k=j; ins=False; esc=False
    while k<len(h):
        c=h[k]
        if ins:
            if esc: esc=False
            elif c=='\\': esc=True
            elif c=='"': ins=False
        else:
            if c=='"': ins=True
            elif c==ac: d+=1
            elif c==kap:
                d-=1
                if d==0: return json.loads(h[j:k+1])
        k+=1
    raise ValueError(ad)
hata=0
def X(a,ok,e=''):
    global hata
    if not ok: hata+=1; print("  ✗ %s %s"%(a,e))
print("═══ 1 · ENTEGRASYON ═══")
for t in ['/*__G__*/','/*__D__*/','/*__S__*/','/*__K__*/','/*__I__*/','/*__H__*/']:
    X("yer tutucu kaldı "+t, t not in h)
G=cek('GOREVLER'); DEN=cek('TOHUM'); SORU=cek('SORU'); KOM=cek('KOMBO'); ISA=cek('ISARET'); KH=cek('KHARITA')
print("  GOREVLER %d · TOHUM %d · KOMBO %d · ISARET %d · KHARITA %d kitap"%(len(G),len(DEN),len(KOM),len(ISA),len(KH['kitap'])))
A=json.load(open('app_gorev.json'))
X("index verisi kaynak dosyayla aynı", G==A, "%d vs %d"%(len(G),len(A)))
X("SORU.den 11", len(SORU['den'])==11); X("SORU.radar 11", len(SORU['radar'])==11)
print("═══ 2 · DENEME VERİSİ ═══")
TEMEL=['Anatomi','Histo-Embriyoloji','Fizyoloji','Biyokimya','Mikrobiyoloji','Patoloji','Farmakoloji']
for d in DEN:
    t=sum(v for k,v in d['bn'].items() if k in TEMEL); kk=sum(v for k,v in d['bn'].items() if k not in TEMEL)
    X("%s branş neti toplamı"%d['tar'], abs(t-d['t'])<.01 and abs(kk-d['k'])<.01, "%.2f/%.2f vs %.2f/%.2f"%(t,kk,d['t'],d['k']))
print("  5 denemenin branş netleri temel/klinik toplamlarıyla tutarlı")
print("═══ 3 · GÖREV YAPISI ═══")
for f in ('d','b','t','blokT','sira','br','k','src','act','sure','why','tag','kaz','tur'):
    X("alan %s"%f, all(f in x for x in G), "%d eksik"%sum(1 for x in G if f not in x))
X("brifing >25", all(len(x['why'])>25 for x in G))
X("kaz sayısal", all(isinstance(x['kaz'],(int,float)) for x in G))
X("25 gün", len({x['d'] for x in G})==25)
print("═══ 4 · BLOK VE SAAT ═══")
dk=lambda s:(lambda p:int(p[0])*60+int(p[1]))(s.split(':'))
SON={'Z':'','A':'08:45','B':'13:45','C':'17:15','D':'19:30','E':'22:00','F':'22:30'}
blk=defaultdict(list)
for x in G: blk[(x['d'],x['b'])].append(x)
ayni=cak=asim=0
for (d,b),l in blk.items():
    if b=='—': continue
    if len({x['t'] for x in l})==1 and len(l)>1: ayni+=1
    for i in range(1,len(l)):
        if dk(l[i]['t'].split('–')[0])<dk(l[i-1]['t'].split('–')[1]): cak+=1
    lim=SON[b] or l[0]['blokT'].split('–')[1]
    if dk(l[-1]['t'].split('–')[1])>dk(lim): asim+=1
X("aynı saatli çoklu görev",ayni==0,ayni); X("alt saat çakışması",cak==0,cak)
# DEĞİŞTİRİLDİ: "aşan blok sayısı ≤4" sabit eşiği yerine gerçek ölçüt —
# bir blok sonraki bloğun başlangıcına taşıyor mu, ve 23:00 aşılıyor mu.
SIRA={'Z':0,'A':1,'B':2,'C':3,'D':4,'E':5,'F':6}
gb=defaultdict(list)
for (d2,b2),l2 in blk.items():
    if b2!='—': gb[d2].append((b2,l2))
carp=gec=0
for d2,bl2 in gb.items():
    bl2.sort(key=lambda z:SIRA[z[0]])
    for i2,(b2,l2) in enumerate(bl2):
        l2.sort(key=lambda y:dk(y['t'].split('–')[0]))
        son2=dk(l2[-1]['t'].split('–')[1])
        nb=dk(bl2[i2+1][1][0]['blokT'].split('–')[0]) if i2+1<len(bl2) else dk('23:00')
        if son2>nb: carp+=1
        if son2>dk('23:00'): gec+=1
X("blok sonraki bloğa taşmıyor",carp==0,carp)
X("hiçbir iş 23:00'ü aşmıyor",gec==0,gec)
print("  %d blok · %d'ünde >1 görev · hepsinde alt saat ayrık"%(len(blk),sum(1 for l in blk.values() if len(l)>1)))
print("═══ 5 · SAYFA SÜREKLİLİĞİ ═══")
SR={'Z':0,'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'—':7}
sec=defaultdict(list)
for x in sorted(G,key=lambda y:(y['d'],SR[y['b']])):
    m=re.search(r'sf (\d+)–(\d+)',x.get('src') or '')
    # act de anahtara girer: TEKRAR ayni sayfalara donmek demektir, bosluk degildir.
    # Ayrica kitap adi da girer: ayni konu farkli kitaplarda farkli sayfalarda.
    if m: sec[(x['act'],x['br'],x['src'].split(' sf ')[0],
               re.sub(r'\s+·\s\d+/\d+\.\sparça','',re.sub(r'\s+—.*','',x['k'])))].append((int(m.group(1)),int(m.group(2))))
# Coklu aralikli birimler (Anatomi Noroanatomi = sf 49-55 + 90-119 + 126-127,
# Sindirim+Endokrin = 77-90 + 124-126) suregelen sayfa beklemez; muaf.
COKLU={'Nöroanatomi (Pleksus + MSS + PSS + Duyu + Deri)','Sindirim + Endokrin Sistem Anatomisi'}
bos=0
for k,l in sec.items():
    if k[3] in COKLU: continue
    for i in range(1,len(l)):
        if l[i][0]!=l[i-1][1]: bos+=1; print("    ✗ %s %s: %d→%d"%(k[1][:12],k[3][:26],l[i-1][1],l[i][0]))
X("sayfa sürekliliği",bos==0,bos)
print("  %d bölüm · %d oturum"%(len(sec),sum(len(l) for l in sec.values())))
print("═══ 6 · KOMBO / İŞARET / KAYNAK HARİTASI ═══")
kim=set(x['d']+'|'+x['b']+'|'+x['br']+'|'+x['k'] for x in G)
X("kombo uçları geçerli",all(b[0] in kim and b[1] in kim for b in KOM),
  str([b[0] for b in KOM if b[0] not in kim][:1]))
gu=sorted({x['d'] for x in G}); gi={d:i for i,d in enumerate(gu)}
uz=[b for b in KOM if abs(gi[b[1].split('|')[0]]-gi[b[0].split('|')[0]])>1]
X("kombo ≤1 gün",not uz,str([(b[3][:24],b[4][:24]) for b in uz][:2]))
X("kombo farklı branş",all(b[0].split('|')[2]!=b[1].split('|')[2] for b in KOM))
X("kombo tekil",len({(b[0],b[1]) for b in KOM})==len(KOM))
X("işaret günleri geçerli",all(any(x['d']==i[0] for x in G) for i in ISA))
gs={x['d'] for x in G}
X("kaynak haritası günleri",all(all(d in gs for d in s[3]) for k in KH['kitap'] for s in k['s']))
X("çöp nedenli",all(len(str(c[3]))>10 for k in KH['kitap'] for c in k['cop']))
print("  kombo %d · işaret %d · kaynak haritası %d kitap %d planlı %d çöp"%(len(KOM),len(ISA),
 len(KH['kitap']),sum(len(k['s']) for k in KH['kitap']),sum(len(k['cop']) for k in KH['kitap'])))
print("═══ 7 · KURALLAR ═══")
SPOR={date(2026,7,26)}
d=date(2026,7,29)
while d<=date(2026,8,22): SPOR.add(d); d+=timedelta(2)
SIKIS={date(2026,7,26),date(2026,8,2),date(2026,8,10),date(2026,8,16),date(2026,8,20)}
# ESKI KURAL KALDIRILDI (28 Tem): eski yapida uzun spor gununde C blogu yoktu.
# Yeni yapida spor gunu C blogu 16:30-18:15'te, spordan SONRA. Kural gecersiz.
X("video ≤8 Ağu",max(x['d'] for x in G if x['act']=='video')<='2026-08-08')
# Son iki gun TEKRAR gunudur; tekrar da sayfa tasir ama yeni ogrenme degildir.
X("son 2 gün yeni okuma yok",not any(x['act']=='oku' and x['d']>=sorted({y['d'] for y in G})[-2] for x in G))
X("6 tam deneme",sum(1 for x in G if x['act']=='deneme')==12)
c=Counter((x['d'],x['b'],x['br'],x['k']) for x in G)
X("mükerrer görev",max(c.values())==1)
kt={}
for x in G:
    n=(x.get('src') or '').split(' sf ')[0]
    if not n or n=='yanlış defteri' or n.startswith("TUSDATA 24'lü") or 'hafif' in n or n.startswith('cilt'): continue
    kt.setdefault(n,x['d'])
# Referans: programin ILK GUNU (sabit tarih degil). 14 gun = ilk gun + 13.
_ilk=date.fromisoformat(min(x['d'] for x in G))
ihA=sum(1 for v in kt.values() if (date.fromisoformat(v)-_ilk).days>=14)
X("KURAL A",ihA==0,"%d kaynak %d ihlal"%(len(kt),ihA))
gz=defaultdict(lambda: defaultdict(float))
for x in G:
    if x['act']=='oku': gz[x['d']][x.get('z','')]+=x['sure']
bask=sum(max(v.values())/sum(v.values()) for v in gz.values())/len(gz)
X("KURAL B ≥%80",bask>=.80,"%.0f%%"%(100*bask))
# Dilim sinirlari programin kendi gun listesinden turetilir (8/9/8).
_gu=sorted({x['d'] for x in G}); _s1=_gu[7]; _s2=_gu[16]
def dl(s): return 1 if s<=_s1 else (2 if s<=_s2 else 3)
GG=defaultdict(float);KO=defaultdict(float)
for x in G:
    # 'deneme' ve 'analiz' de GERI GETIRME'dir; eski liste onlari saymiyordu.
    if x['act'] in ('soru','deneme24','tekrar','deneme','analiz'): GG[dl(x['d'])]+=x['sure']
    if x['act'] in ('oku','video'): KO[dl(x['d'])]+=x['sure']
X("KURAL C artan",GG[3]>GG[2]>GG[1]); X("KURAL C azalan",KO[1]>=KO[2]>=KO[3])
tg=sum(GG.values());tk=sum(KO.values())
print("  A: %d kaynak ≤gün12 · B: %%%.0f · C: geri getirme %%%.0f/%%%.0f/%%%.0f, yeni öğrenme %%%.0f/%%%.0f/%%%.0f"%(
 len(kt),100*bask,100*GG[1]/tg,100*GG[2]/tg,100*GG[3]/tg,100*KO[1]/tk,100*KO[2]/tk,100*KO[3]/tk))
print("\n"+("✓ SIFIR HATA — %d görev, %.1f etkin saat"%(len(G),sum(x['sure'] for x in G)) if hata==0 else "✗ %d HATA"%hata))
