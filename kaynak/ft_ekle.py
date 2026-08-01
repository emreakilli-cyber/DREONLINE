# -*- coding: utf-8 -*-
"""FT içindekiler → POWERUP kaydı.
Sayfa aralığından süre (5.71 sf/saat · FT standardı), soru sayısı
KONU_DAG eşleşmesinden veya sayfa oranından türetiliyor."""
import json,re,sys,unicodedata

SF_SAAT = 5.71          # FT kitaplarının ölçülen oranı

def sade(a):
    a=re.sub(r'\s*\([^)]*\)','',a)
    a=a.replace('İ','i').replace('I','ı').lower()
    a=re.sub(r'[/\-–—]',' ',a)
    return ' '.join(a.split())

# ── EŞANLAMLI KÖKLER ────────────────────────────────────────────────
# Kitap bölüm adı ile TusAnaliz konu adı aynı şeyi farklı söyleyebiliyor:
# "Kalp Hastalıkları" ↔ "kardiyovasküler sistem hastalıkları" gibi.
# Kelime örtüşmesi bunları yakalayamıyordu; ortak bir köke indirgeniyor.
ESANLAM={
    'kalp':'kardiyovaskuler','kardiyovasküler':'kardiyovaskuler',
    'damar':'kardiyovaskuler',
    'akciğer':'solunum','akciger':'solunum','solunum':'solunum',
    'hematolojik':'hematopoetik','hematopoetik':'hematopoetik',
    'hematoloji':'hematopoetik',
    'immün':'immunoloji','immun':'immunoloji','immünoloji':'immunoloji',
    'immunoloji':'immunoloji','bağışıklık':'immunoloji',
    'kemik':'kasiskelet','eklem':'kasiskelet','kas':'kasiskelet',
    'iskelet':'kasiskelet',
    'böbrek':'uriner','uriner':'uriner','üriner':'uriner',
    'nefrit':'uriner',
    'sinir':'sinir','nöroloji':'sinir','noroloji':'sinir',
}
def kok(w):
    return ESANLAM.get(w,w)

def kelimeler(a):
    # ⚠ 'fizyolojisi' listede yoktu: "Solunum Fizyolojisi" ile "Üreme
    #   Fizyolojisi" yalnız o kelimeyle eşleşip yanlış atama yapıyordu.
    #   Branş adı ve organ eki taşıyan tüm dolgular eleniyor.
    at={'ve','ile','için','hastalıkları','hastalıklar','cerrahisi','sistem',
        'sistemi','sistemin','değişiklikleri','genel','bilgiler',
        'fizyoloji','fizyolojisi','histoloji','histolojisi','anatomi',
        'anatomisi','patoloji','patolojisi','dokusu','doku','bezi'}
    return [kok(w) for w in sade(a).split() if len(w)>2 and w not in at]

def sikis(a):
    """Boşluksuz, dolgusuz biçim. ⚠ "Aminoasitler" tek kelime, TusAnaliz'de
    "amino asitler" iki kelime — kelime kümesi hiç örtüşmüyordu. Boşluk
    kaldırılınca ikisi de 'aminoasitler' oluyor."""
    return ''.join(kelimeler(a)) if kelimeler(a) else ''

def benzer(a,b):
    """Kelime örtüşmesi VEYA boşluksuz alt-dize ilişkisi."""
    ka,kb=set(kelimeler(a)),set(kelimeler(b))
    if ka and kb:
        ort=len(ka&kb)
        if ort: return ort/max(1,min(len(ka),len(kb))), ort
    sa,sb=sikis(a),sikis(b)
    if len(sa)>=5 and len(sb)>=5 and (sa in sb or sb in sa):
        return 0.9, 1
    return 0.0, 0

def esle(bolum, konu_dag):
    """Bölüm adını KONU_DAG konularıyla eşleştir · soru payı için."""
    kb=set(kelimeler(bolum))
    if not kb: return None
    en, enS = None, 0
    for kn,v in konu_dag.items():
        kk=set(kelimeler(kn))
        if not kk: continue
        ort=len(kb&kk)
        s=ort/max(1,min(len(kb),len(kk)))
        if ort and s>enS: en,enS=kn,s
    return en if enS>=0.5 else None

def uret(kitap, grup, brans, bolumler, konu_dag, brans_soru=None):
    """bolumler: [(ad, ilkSayfa, sonSayfa), ...]

    Soru dağıtımı iki aşamalı:
      1 · Her bölüm KONU_DAG'daki BİR konuya eşleşiyor (tekil · en güçlü
          örtüşme kazanıyor, konu bir kez kullanılıyor). Çift sayım yok.
      2 · Eşleşmeyen bölümler, artan soruyu SAYFA ORANINDA paylaşıyor.
    Böylece toplam branşın TusAnaliz sorusuna eşit çıkıyor."""
    top_sf=sum(b[2]-b[1]+1 for b in bolumler)
    hedef=brans_soru if brans_soru else sum(konu_dag.values())
    # 1 · tekil eşleştirme · en güçlü örtüşmeden başlayarak
    adaylar=[]
    for i,(ad,s1,s2) in enumerate(bolumler):
        for kn,v in konu_dag.items():
            skor,ort=benzer(ad,kn)
            if skor>=0.5: adaylar.append((skor,ort,i,kn))
    # ⚠ Ortak kelime yalnız dolgu ise ("fizyolojisi" gibi zaten atılıyor,
    #   ama "sistem"/"sistemi" iki farklı organ sisteminde de geçebiliyor)
    #   eşleşme ANLAMLI bir kök paylaşmalı: en az bir kelime, her iki adın
    #   da AYIRT EDİCİ parçası olmalı. "Solunum" ↔ "üreme" bunu sağlamıyordu.
    adaylar=[a for a in adaylar if a[1]>=1]
    adaylar.sort(key=lambda x:(-x[0],-x[1]))
    kul_b,kul_k,esles={},set(),{}
    for skor,ort,i,kn in adaylar:
        if i in kul_b or kn in kul_k: continue
        kul_b[i]=kn; kul_k.add(kn); esles[i]=kn
    # ⚠ Aynı TusAnaliz konusuna birden çok bölüm aday olabilir ("Kalp
    #   Hastalıkları" ve "Damar Hastalıkları" ikisi de kardiyovasküler).
    #   Tekilleştirme birine tam payı verip diğerini sıfıra yakın
    #   bırakıyordu. Artık o konunun payı, aday bölümler arasında SAYFA
    #   ORANINDA paylaşılıyor.
    ortak={}
    for skor,ort,i,kn in adaylar:
        if kn in kul_k and i not in esles:
            ortak.setdefault(kn,[]).append(i)
    pay_bol={}
    for kn,ekler in ortak.items():
        sahip=[i for i,v in esles.items() if v==kn]
        # ⚠ Değişken adı `grup` idi ve FONKSİYON PARAMETRESİNİ eziyordu:
        #   üretilen kayıtların `grup` alanı [7,8] gibi indeks listesine
        #   dönüşüyor, getiri sıfır çıkıyordu. Ad değiştirildi.
        oks=sahip+ekler
        tsf_g=sum(bolumler[i][2]-bolumler[i][1]+1 for i in oks)
        for i in oks:
            sf_i=bolumler[i][2]-bolumler[i][1]+1
            pay_bol[i]=konu_dag[kn]*sf_i/tsf_g
        for i in ekler: esles[i]=kn
    # 3 · ⚠ ATANMAMIŞ TusAnaliz konuları · en iyi aday bölüme EKLE
    #   "amino asitler" (3.76) ve "genom ve nükleik asitler" (1.22) hiçbir
    #   bölüme atanamayıp payları sayfa oranıyla ilgisiz bölümlere
    #   ("Hücre ve Organeller" 3.30 soru!) dağılıyordu. Artık boşta kalan
    #   konu, kendisine EN ÇOK benzeyen bölüme ekleniyor — o bölüm zaten
    #   başka bir konuyla eşleşmiş olsa bile.
    ek_pay={}
    for kn,v in konu_dag.items():
        if kn in kul_k: continue
        en_i,en_s=None,0
        for i,(ad,s1,s2) in enumerate(bolumler):
            sk,_=benzer(ad,kn)
            if sk>en_s: en_i,en_s=i,sk
        if en_i is not None and en_s>=0.5:
            ek_pay[en_i]=ek_pay.get(en_i,0.0)+v
            kul_k.add(kn)
    # 2 · kalan soruyu sayfa oranında dağıt
    atanan=sum(konu_dag[k] for k in kul_k)
    kalan=max(0.0,hedef-atanan)
    bos_sf=sum(b[2]-b[1]+1 for i,b in enumerate(bolumler) if i not in esles)
    kayit=[]
    for i,(ad,s1,s2) in enumerate(bolumler):
        sf=s2-s1+1
        saat=round(sf/SF_SAAT,2)
        if i in pay_bol: soru=pay_bol[i]
        elif i in esles: soru=konu_dag[esles[i]]
        else: soru=(kalan*sf/bos_sf) if bos_sf else 0.0
        soru=round(soru+ek_pay.get(i,0.0),2)
        kayit.append({"konu":ad,"kitap":kitap,"grup":grup,"brans":brans,
            "saat":saat,"soru":soru,"sayfa":sf,"sf":[s1,s2],"aralik":None,
            "net":0,"verim":0,"esles":esles.get(i)})
    return kayit,top_sf
