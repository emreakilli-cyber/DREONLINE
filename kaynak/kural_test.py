# -*- coding: utf-8 -*-
"""Bu oturumda bulunan her hata sınıfı için kalıcı kontrol."""
import json,re,sys
from collections import defaultdict
from datetime import date,timedelta
G=json.load(open('app_gorev.json'))
s=open('eko.py').read(); exec(s[s.find('KITAP={'):s.find('\nEZBER=')])
dk=lambda s_:(lambda p:int(p[0])*60+int(p[1]))(s_.split(':'))
SR={'Z':0,'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'—':7}
NRM=lambda z:''.join(c for c in z.lower().replace('ı','i').replace('İ','i').replace('ş','s').replace('ğ','g').replace('ü','u').replace('ö','o').replace('ç','c') if c.isalnum())
KB={'FT Farmakoloji':'Farmakoloji','FT Biyokimya':'Biyokimya','Speetus Genel Cerrahi':'Genel Cerrahi',
 'FT Kadın Doğum':'Kadın Doğum','TUSTIME Mikrobiyoloji':'Mikrobiyoloji','TUSTIME Fizyoloji':'Fizyoloji',
 'TUSTIME Küçük Stajlar':'Küçük Stajlar','Anatomi Fast Track':'Anatomi',
 'Emrullah Patoloji SST':'Patoloji','Klinisyen Vaka Pediatri':'Pediatri'}
ESL={'TUSTIME Fast Track Farmakoloji':'FT Farmakoloji','TUSTIME Fast Track Biyokimya':'FT Biyokimya',
 'TUSDATA Speetus':'Speetus Genel Cerrahi','TUSTIME Fast Track Kadın Doğum':'FT Kadın Doğum',
 'TUSTIME Mikrobiyoloji':'TUSTIME Mikrobiyoloji','TUSTIME Fizyoloji':'TUSTIME Fizyoloji',
 'TUSTIME Küçük Stajlar':'TUSTIME Küçük Stajlar','Anatomi Fast Track':'Anatomi Fast Track',
 'Klinisyen Vaka Pediatri':'Klinisyen Vaka Pediatri'}
H=[]
def X(ad,ok,e=''):
    print("  %s %s%s"%('✓' if ok else '✗',ad,'' if ok else '  :: %s'%e))
    if not ok: H.append(ad)
print("═══ KALICI KURAL TESTİ · bu oturumda bulunan 16 hata sınıfı ═══\n")
# 1 kronolojik sayfa sırası
grp=defaultdict(list)
for x in G:
    if x['act']=='oku' and ' sf ' in (x.get('src') or ''): grp[(x['br'],re.sub(r'\s+—.*','',x['k']))].append(x)
kir=[]
for k,l in grp.items():
    l.sort(key=lambda y:(y['d'],SR[y['b']],dk(y['t'].split('–')[0])))
    ss=[]
    for x in l:
        m=re.search(r'sf (\d+)–(\d+)',x['src']); ss.append((int(m.group(1)),int(m.group(2))))
    for i in range(1,len(ss)):
        if ss[i][0]!=ss[i-1][1]: kir.append((k[1][:24],ss[i-1][1],ss[i][0]))
X('1 sayfa sırası kronolojik gün sırasını izliyor',not kir,kir[:3])
# 2 kısmi bölüm yok (Kural D)
kaps=defaultdict(set)
for x in G:
    if x['act']=='oku' and ' sf ' in (x.get('src') or ''):
        kn=x['src'].split(' sf ')[0]
        if kn in ESL:
            m=re.search(r'sf (\d+)–(\d+)',x['src']); kaps[ESL[kn]]|=set(range(int(m.group(1)),int(m.group(2))))
kis=[]
for kit,(tot,bl) in KITAP.items():
    for ad,a,b,q in bl:
        sf=set(range(a,b)); k=sf&kaps.get(kit,set())
        if k and k!=sf: kis.append((ad,len(k),len(sf)))
X('2 KURAL D · kısmi okunan bölüm yok',not kis,kis)
# 3 asgari 15 dk parça
kucuk=[(x['d'][5:],x['k'][:22],round(x['sure']*60)) for x in G if x['act']=='oku' and x['sure']<0.25]
X('3 15 dk altı okuma oturumu ≤12',len(kucuk)<=12,'%d tane'%len(kucuk))
# 4 negatif/sıfır mola
X('4 negatif veya sıfır mola yok',not [x for x in G if x.get('mola') and x['mola'][2]<=0])
# 5 alt saat çakışması + aynı saat
blk=defaultdict(list)
for x in G:
    if x['b']!='—': blk[(x['d'],x['b'])].append(x)
cak=ayn=0
for (g,b),l in blk.items():
    l.sort(key=lambda y:dk(y['t'].split('–')[0]))
    if len({x['t'] for x in l})<len(l): ayn+=1
    for i in range(1,len(l)):
        if dk(l[i]['t'].split('–')[0])<dk(l[i-1]['t'].split('–')[1]): cak+=1
X('5 alt saat çakışması yok',cak==0,cak)
X('6 aynı saatte iki görev yok',ayn==0,ayn)
# 7 her blokta mola · EK görevler (24'lü denemeler) program sonrası, molası yok
_bm=defaultdict(list)
for x in G:
    if x.get('ek'): continue
    _bm[(x['d'],x['b'])].append(x)
_eks=[k for k,l in _bm.items() if not any(y.get('mola') for y in l)]
X('7 her blokta mola bilgisi',not _eks,'%d/%d'%(len(_bm)-len(_eks),len(_bm)))

X('8 sira alanı blok görev sayısıyla uyumlu',
  not [1 for (g,b),l in blk.items() if any((x.get('sira') or [0,0])[1]!=len(l) for x in l)])
# 9 27–28 TEMMUZ PROGRAMDA OLMAMALI
#    27 Tem: program hazır olmadığı için çalışılamadı.
#    28 Tem: kız arkadaşının doğum günü, şehir dışı, hiç çalışılamıyor.
#    Program 29 Temmuz'da başlar. (Eskiden 28 Tem'de 4 saatlik Z bloğu vardı.)
kapali={x['d'] for x in G} & {'2026-07-27','2026-07-28'}
X('9 27–28 Temmuz programda yok, program 29 Tem başlıyor',not kapali,sorted(kapali))
X('9b ilk gün 29 Temmuz',min(x['d'] for x in G)=='2026-07-29',min(x['d'] for x in G))
# 10 RENK · envanter.py birimlerine göre (eski: eko.py bölümleri)
#    Anatomi'de 13 bölüm 8 birime indi (Nöroanatomi 5 parçayı kapsıyor),
#    Feyyaz Akay'da 14 bölüm 8'e. eko.py'nin sınırlarıyla ölçmek yanlış sonuç veriyordu.
import importlib.util as _iu
def _yuk(a,p):
    _s=_iu.spec_from_file_location(a,p); _m=_iu.module_from_spec(_s); _s.loader.exec_module(_m); return _m
_gk=_yuk('_gk','gorev_katalog.py')
_K=_gk.katalog(); RENK={}
_byk={}
for _x in _K: _byk.setdefault(_x['kitap'],[]).append(_x)
for _kit,_l in _byk.items():
    _l2=sorted(_l,key=lambda z:(-(z['soru'] or 0),z['sayfa']/max(z['soru'] or .01,.01)))
    _n=len(_l2); _a,_b,_c=int(round(_n*.225)),int(round(_n*.50)),int(round(_n*.775))
    for _i,_x in enumerate(_l2):
        RENK[(_x['kitap'],_x['bolum'])]='pembe' if _i<_a else ('turuncu' if _i<_b else ('sari' if _i<_c else 'mavi'))
_ry=[]
for x in G:
    if x['act'] not in ('oku','tekrar'): continue
    _k=x['src'].split(' sf ')[0]; _ad=re.sub(r'\s+·\s\d+/\d+\.\sparça','',x['k']).replace(' — tekrar','')
    _b2=RENK.get((_k,_ad))
    if _b2 and x.get('tag') and x['tag']!=_b2: _ry.append((x['br'],_ad[:24],x['tag'],_b2))
X('10 renk envanter birimleriyle tutarlı',not _ry,_ry[:4])

# 11 SEÇİLEN KONU TAM OKUNUR (eski "pembe tamlık" kuralının yerine)
#    Eski kural: her pembe bölüm tam okunmalı. O kural, katalogun TAMAMININ
#    programa gireceği varsayımına dayanıyordu. Yeni tasarımda katalog 295.6 saat,
#    kapasite 132.2 saat — seçim ZORUNLU. Pembe bir bölümün seçilmemesi artık
#    hata değil, karar. Yerine geçen değişmez: SEÇİLEN her konu TAM okunur.
import collections as _c
_bol=_c.defaultdict(set)
for x in G:
    m=re.search(r'sf (\d+)–(\d+)',x.get('src') or '')
    if m and x['act'] in ('oku','tekrar'):
        _bol[(x['act'],x['br'],re.sub(r'\s+·\s\d+/\d+\.\sparça','',x['k']),x['src'].split(' sf ')[0])]|=set(range(int(m.group(1)),int(m.group(2))))
_kis=[]
for (act,br,ad,kit),sf in _bol.items():
    if sf and (max(sf)-min(sf)+1)!=len(sf): _kis.append('%s %s'%(br,ad))
X('11 seçilen konularda sayfa boşluğu yok',not _kis,_kis[:5])

# 12 ATANAN SORU · GRUP TAVANINI AŞMIYOR (eski: kitap toplamı)
#    Eski kural kitap bazındaydı ve aynı konuyu iki kitaptan çalışınca çift sayıyordu.
#    Yeni ölçüt: bir GRUBUN programdaki soru ağırlığı, o grubun sınav tavanını aşamaz.
_tv=_yuk('_tv','tavan.py'); _sa=_yuk('_sa','soru_analiz.py')
_T,_=_tv.tavanlar(_sa.HAM,_sa.ort)
_grp={}
for x in G:
    if x['act'] not in ('oku',): continue
    _ad=re.sub(r'\s+·\s\d+/\d+\.\sparça','',x['k'])
    _grp.setdefault(x.get('z'),{})[_ad]=x.get('soru') or 0
_sis=[]
for _g,_d in _grp.items():
    if _g not in _T: continue
    _at=sum(_d.values())
    if _at>_T[_g]+0.6: _sis.append((_g,round(_at,1),round(_T[_g],1)))
X('12 grup soru ağırlığı tavanı aşmıyor',not _sis,_sis)

# 13 yetim referanslar
KOM=json.load(open('kombo.json')); kid=lambda x:x['d']+'|'+x['b']+'|'+x['br']+'|'+x['k']
kim={kid(x) for x in G}
X('13 kombo uçları geçerli',not [k for k in KOM if k[0] not in kim or k[1] not in kim])
gs={x['d'] for x in G}
KH=json.load(open('kaynak_harita.json'))
X('14 kaynak haritası gün atıfları geçerli',not [1 for k in KH['kitap'] for s_ in k['s'] for d_ in s_[3] if d_ not in gs])
# 15 olmayan kaynak
# DÜZELTME 28 Tem: 'Klinisyen Vaka Fizyoloji' listeden ÇIKARILDI — o kitap
# kullanıcının kaynak beyanında (11 numara) gerçekten var ve envanter.py'de kayıtlı.
# Eski program onu hayalet sanıyordu; bu kural yanlıştı.
YOK=['Küçük Stajlar bölüm soruları']
X('15 olmayan kaynağa atıf yok',not [x for x in G if any(y in (x.get('src') or '') for y in YOK)])
# 16 Z/F blok tutarlılığı
zf={x['d'] for x in G if x['b']=='Z'}&{x['d'] for x in G if x['b']=='F'}
X('16 Z+F çakışması yalnız temmuz/ağustos başı',all(g<='2026-08-07' for g in zf),sorted(zf))

# 17-18 kaynak haritası iki yönlü
KH2=json.load(open('kaynak_harita.json'))
kul={(x.get('src') or '').split(' sf ')[0].split(' · ')[0].strip() for x in G}
kul={k for k in kul if k}
kh={k['ad'] for k in KH2['kitap']}
ELLE={"TUSDATA 24'lü branş denemeleri":{k for k in kul if "24'lü" in k},
      'Atilla Uslu Dahiliye videoları · 1.5x':{'Atilla Uslu Dahiliye videoları'}}
eks=[a for a in kh if a not in kul and a not in ELLE]
faz=[u for u in kul if u not in kh and not any(u in v for v in ELLE.values())
     and u not in ('cilt 7','cilt 8','hafif soru','yanlış defteri')]
X('17 kaynak haritasındaki her kitap programda kullanılıyor',not eks,eks)
X('18 programdaki her kaynak haritada var',not faz,faz)
print()
print(("✓ 18 KALICI KONTROL GEÇTİ" if not H else "✗ %d KONTROL BAŞARISIZ"%len(H)))
sys.exit(1 if H else 0)
