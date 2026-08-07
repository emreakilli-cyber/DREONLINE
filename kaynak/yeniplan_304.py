# -*- coding: utf-8 -*-
"""§304 · KULLANICININ YENİ PLANI · 8–22 Ağustos
Kullanıcı programa yetişemedi (Atilla Uslu · Göğüs Hastalıkları 3'e kadar geldi)
ve planı kendisi yeniden tarif etti. Bu betik o tarifi BİREBİR uygular:

  08-08  kalan Atilla Uslu videoları (19 iş · 7.5 sa) — mevcut görevler taşınıyor
  08-09  DENEME + Genel Cerrahi        ┐
  08-10         Pediatri               │
  08-11  DENEME + Kadın Doğum          │ 7 derse 1'er gün
  08-12         Biyokimya              │ pembe konu videoları + ezber
  08-13  DENEME + Farmakoloji          │
  08-14         Mikrobiyoloji          │
  08-15  DENEME + Küçük Stajlar        ┘
  08-16  DENEME + Patoloji SST komple tekrar
  08-17  DENEME + Genel Cerrahi  ┐
  08-18  DENEME + Pediatri       │
  08-19  DENEME + Kadın Doğum    │ Tüm TUS soruları
  08-20  DENEME + Biyokimya      │ + deneme yanlışları
  08-21  DENEME + Farmakoloji    │
  08-22  DENEME + Mikrobiyoloji  ┘
  08-23  SINAV

Deneme ritmi kullanıcının dediği gibi: 09/11/13 (6 gün boyunca 2 günde 1),
sonra 15'ten itibaren HER SABAH.

⚠ VERİDEKİ BOŞLUK (uydurulmadı, rapora yazıldı): uygulamada Dahiliye dışında
HİÇBİR derse ait video kaynağı yok. "Pembe konu videoları" görevlerinin kaynağı
bu yüzden ders adıyla yazılıyor; hangi video serisi olduğunu kullanıcı biliyor.
Konu listeleri UYDURULMADI — uygulamanın kendi verisinden geliyor:
mevcut plandaki o dersin konuları (pembe etiketliler önce), yoksa KONU_DAG
soru ağırlığı sırası.
"""
import json, collections

G = json.load(open('gorevler.json'))
KD = json.load(open('konu_dag.json'))

KESIM = '2026-08-08'          # bu tarihten İTİBAREN yeniden kuruluyor
SINAV = '2026-08-23'

# ── kalan Atilla Uslu videoları (göğüs 3'ten sonrası) ───────────────────
au = [g for g in G if 'Atilla Uslu' in g.get('src', '') and g['act'] == 'video']
kes = next(i for i, g in enumerate(au) if 'Göğüs Hastalıkları videoları — 3' in g['k'])
AU_KALAN = au[kes + 1:]

# ⚠ ÇİFT KAYIT: kullanıcı "Göğüs Hastalıkları 3"e kadar geldi, ama eski plan
# kalan videoların 13'ünü 4/6/7 Ağustos'a yazmıştı. Bu günler "geçmiş" diye
# korunursa aynı video HEM geçmişte HEM 8 Ağustos'ta görünüyor; eritme yüzdesi
# ve iş sayısı şişiyor (ölçüldü: 13 çift kayıt). Yapılmamış AU videoları
# geçmişten düşülüyor — yeri artık yalnız 8 Ağustos.
AU_ANH = set((g['k'], g['src']) for g in AU_KALAN)
gecmis = [g for g in G if g['d'] < KESIM
          and not (g['act'] == 'video' and (g['k'], g['src']) in AU_ANH)]
gelecek = [g for g in G if g['d'] >= KESIM]

TUR = {'Anatomi': 'T', 'Fizyoloji': 'T', 'Biyokimya': 'T', 'Mikrobiyoloji': 'T',
       'Patoloji': 'T', 'Farmakoloji': 'T', 'Histo-Embriyoloji': 'T',
       'Dahiliye': 'K', 'Genel Cerrahi': 'K', 'Pediatri': 'K',
       'Kadın Doğum': 'K', 'Küçük Stajlar': 'K', 'Deneme': 'K'}

def dk(hhmm):
    h, m = hhmm.split(':'); return int(h) * 60 + int(m)
def hm(t):
    return '%02d:%02d' % (t // 60, t % 60)

# ── o dersin konu listesi · UYGULAMANIN KENDİ VERİSİNDEN ───────────────
def ders_konulari(ders):
    """1) mevcut planda o dersin konuları — pembe önce, sonra soru ağırlığı
       2) yoksa KONU_DAG soru ağırlığı"""
    sira = {'pembe': 0, 'turuncu': 1, 'sari': 2, 'mavi': 3}
    if ders == 'Küçük Stajlar':
        ks = [g for g in G if 'TUSTIME Küçük Stajlar' in g.get('src', '')]
        gor = {}
        # ⚠ br UYDURULMUYOR: uygulamanın branş kümesinde "Küçük Stajlar" YOK
        # (10 branş: Anatomi…Kadın Doğum). Her konunun branşı kendi kaynak
        # görevinden taşınıyor — Ortopedi/Çocuk Cerrahisi/Üroloji 'Genel
        # Cerrahi', kalanı 'Dahiliye'. Toptan 'Dahiliye' yazmak bu üçünün
        # kalibrasyonunu yanlış branşa yazardı.
        for g in ks:
            gor.setdefault(g['k'], {'k': g['k'], 'src': g['src'].split(' sf ')[0],
                                    'sf': g['src'].split(' sf ')[-1], 'br': g['br'],
                                    'tag': g.get('tag', 'turuncu'), 'soru': g.get('soru', 0)})
        L = list(gor.values())
    else:
        pl = [g for g in G if g['br'] == ders and g['act'] in ('oku', 'video')]
        gor = {}
        for g in pl:
            ad = g['k'].split(' · ')[0]                    # parça eki atılır
            if ad in gor:
                gor[ad]['soru'] = max(gor[ad]['soru'], g.get('soru', 0))
                if sira.get(g.get('tag'), 9) < sira.get(gor[ad]['tag'], 9):
                    gor[ad]['tag'] = g.get('tag')
                continue
            gor[ad] = {'k': ad, 'src': g['src'].split(' sf ')[0], 'br': g['br'],
                       'sf': None, 'tag': g.get('tag', 'turuncu'), 'soru': g.get('soru', 0)}
        L = list(gor.values())
        if not L:                                          # plana hiç girmemiş ders
            L = [{'k': k, 'src': None, 'sf': None, 'br': ders, 'tag': 'pembe', 'soru': v}
                 for k, v in sorted(KD.get(ders, {}).items(), key=lambda x: -x[1])]
    L.sort(key=lambda x: (sira.get(x['tag'], 9), -x['soru']))
    return L

# ── gün üretimi ────────────────────────────────────────────────────────
YENI = []

def blok_doldur(gun, blok, bas, bit, isler, molaSon, z, why_ek=''):
    """isler: [(br,k,src,act,tag,soru)] · blok süresi eşit bölünür"""
    if not isler: return
    top = dk(bit) - dk(bas)
    pay = top // len(isler)
    t = dk(bas)
    for i, (br, k, src, act, tag, soru) in enumerate(isler):
        son = dk(bit) if i == len(isler) - 1 else t + pay
        YENI.append({
            'd': gun, 'b': blok, 't': hm(t) + '–' + hm(son),
            'blokT': bas + '–' + bit, 'blokSon': bit,
            'br': br, 'k': k, 'src': src,
            'sure': round((son - t) / 60.0, 4),
            'act': act, 'tur': TUR.get(br, 'K'), 'kaz': 0.0, 'soru': soru,
            'z': z, 'mola': molaSon if i == len(isler) - 1 else None,
            'sira': [i + 1, len(isler)],
            'why': why_ek, 'tag': tag})
        t = son

M15 = ['%s', '%s', 15, 'kisa', '15 dk ara']
def mola(a, b, dkk, tip, met): return [a, b, dkk, tip, met]

# ── 08-08 · KALAN ATİLLA USLU VİDEOLARI ────────────────────────────────
g = '2026-08-08'
bloklar = [('A', '08:00', '10:00', mola('10:00', '10:15', 15, 'kisa', '15 dk ara')),
           ('B', '10:15', '12:30', mola('12:30', '13:30', 60, 'ogle', '60 dk öğle')),
           ('C', '13:30', '15:45', mola('15:45', '16:00', 15, 'kisa', '15 dk ara')),
           ('D', '16:00', '17:30', mola('17:30', '23:00', 330, 'yavas', 'gün bitti — akşam serbest'))]
pay = [[], [], [], []]
for i, v in enumerate(AU_KALAN): pay[i % 4].append(v)
for (bl, a, b, ml), grup in zip(bloklar, pay):
    blok_doldur(g, bl, a, b,
                [(v['br'], v['k'], v['src'], 'video', 'pembe', v.get('soru', 0)) for v in grup],
                ml, 'Atilla Uslu bitirme',
                'Kalan Atilla Uslu videoları. Bugün BİTİYOR — erişim kapanıyor.')

# ── ders günleri ───────────────────────────────────────────────────────
DERS_GUN = [('2026-08-09', 'Genel Cerrahi'), ('2026-08-10', 'Pediatri'),
            ('2026-08-11', 'Kadın Doğum'),   ('2026-08-12', 'Biyokimya'),
            ('2026-08-13', 'Farmakoloji'),   ('2026-08-14', 'Mikrobiyoloji'),
            ('2026-08-15', 'Küçük Stajlar')]
SORU_GUN = [('2026-08-17', 'Genel Cerrahi'), ('2026-08-18', 'Pediatri'),
            ('2026-08-19', 'Kadın Doğum'),   ('2026-08-20', 'Biyokimya'),
            ('2026-08-21', 'Farmakoloji'),   ('2026-08-22', 'Mikrobiyoloji')]
PAT_GUN = '2026-08-16'
DENEME = {'2026-08-09', '2026-08-11', '2026-08-13',
          '2026-08-15', '2026-08-16', '2026-08-17', '2026-08-18',
          '2026-08-19', '2026-08-20', '2026-08-21', '2026-08-22'}

def deneme_bloklari(g):
    YENI.append({'d': g, 'b': 'A', 't': '08:00–10:15', 'blokT': '08:00–10:15',
        'blokSon': '10:15', 'br': 'Deneme', 'k': 'Tam deneme — 1. oturum (temel)',
        'src': 'TUSDATA PreTUS200', 'sure': 2.25, 'act': 'deneme', 'tur': 'T',
        'kaz': 0.0, 'soru': 0, 'z': 'Deneme günü',
        'mola': mola('10:15', '10:45', 30, 'kisa', '30 dk deneme arası'),
        'sira': [1, 1], 'tag': 'pembe',
        'why': 'Sınav koşullarında, ara vermeden. Kitapçığı fotoğraflamayı unutma.'})
    YENI.append({'d': g, 'b': 'B', 't': '10:45–13:00', 'blokT': '10:45–13:00',
        'blokSon': '13:00', 'br': 'Deneme', 'k': 'Tam deneme — 2. oturum (klinik)',
        'src': 'TUSDATA PreTUS200', 'sure': 2.25, 'act': 'deneme', 'tur': 'K',
        'kaz': 0.0, 'soru': 0, 'z': 'Deneme günü',
        'mola': mola('13:00', '14:00', 60, 'ogle', '60 dk öğle yemeği'),
        'sira': [1, 1], 'tag': 'pembe',
        'why': 'İkinci oturum. Bitince kitapçığın fotoğrafını uygulamaya oku.'})
    YENI.append({'d': g, 'b': 'C', 't': '14:00–15:30', 'blokT': '14:00–15:30',
        'blokSon': '15:30', 'br': 'Deneme', 'k': 'Deneme analizi + yanlış defteri',
        'src': 'yanlış defteri', 'sure': 1.5, 'act': 'analiz', 'tur': 'K',
        'kaz': 0.0, 'soru': 0, 'z': 'Deneme günü',
        'mola': mola('15:30', '15:45', 15, 'kisa', '15 dk ara'),
        'sira': [1, 1], 'tag': 'turuncu',
        'why': 'Her yanlışın SEBEBİNİ yaz: bilmiyordum / karıştırdım / dikkatsizlik.'})

def ders_gunu(g, ders, kip):
    """kip: 'video' (pembe konu videoları+ezber) · 'soru' (Tüm TUS soruları)"""
    L = ders_konulari(ders)
    denemeli = g in DENEME
    if denemeli:
        deneme_bloklari(g)
        # ⚠ Deneme günü zaten 6 saat (2×2.25 sınav + 1.5 analiz). Üstüne
        # 3.5 saat koyunca gün 9.5 saate çıkıyordu ve bu 8 gün ÜST ÜSTE
        # sürecekti. Ders bloğu 2 saate indirildi → gün 8.0 saat.
        bloklar = [('D', '15:45', '17:45',
                    mola('17:45', '23:00', 315, 'yavas', 'gün bitti — akşam serbest'))]
    else:
        bloklar = [('A', '08:00', '10:00', mola('10:00', '10:15', 15, 'kisa', '15 dk ara')),
                   ('B', '10:15', '12:30', mola('12:30', '13:30', 60, 'ogle', '60 dk öğle')),
                   ('C', '13:30', '15:45', mola('15:45', '16:00', 15, 'kisa', '15 dk ara')),
                   ('D', '16:00', '17:30', mola('17:30', '23:00', 330, 'yavas', 'gün bitti — akşam serbest'))]
    # ⚠ Konular blok başına SABİT sayıyla dağıtılınca ders az konuluysa
    # bloklar boş kalıyor ve gün yarım doluyordu (Mikrobiyoloji 2.0 sa).
    # Artık günün TOPLAM dakikası konulara paylaştırılıyor; az konulu derste
    # her konuya daha çok vakit düşüyor, gün dolu kalıyor.
    topDk = sum(dk(b) - dk(a) for _, a, b, _ in bloklar)
    enAz = 25
    kap = max(1, min(len(L), topDk // enAz))
    kon = L[:kap]
    # ⚠ Ders az konuluysa (Mikrobiyoloji 1, Biyokimya 3) konular tek bloğa
    # düşüp gün 1.5 saatte bitiyordu. Konu sayısı blok sayısından azsa konu
    # PARÇALARA bölünüyor — mevcut planın kendi "· 1/2. parça" dili.
    if len(kon) < len(bloklar):
        gen = []
        kat = -(-len(bloklar) // len(kon))          # yukarı yuvarlama
        for k in kon:
            if kat == 1: gen.append(k); continue
            for i in range(kat):
                y = dict(k); y['k'] = '%s · %d/%d. parça' % (k['k'], i + 1, kat)
                y['soru'] = round(k['soru'] / kat, 2)
                gen.append(y)
        kon = gen[:max(len(bloklar), len(gen))]
    # blokları SIRAYLA doldur — her blok en az bir konu alsın
    pay = [[] for _ in bloklar]
    for i, k in enumerate(kon): pay[i % len(bloklar)].append(k)
    for (bl, a, b, ml), grup in zip(bloklar, pay):
        isler = []
        for k in grup:
            if kip == 'video':
                src = ders + ' · pembe konu videoları'
                why = ('%s · %s — videoyu izle, önemli detayları EZBERLE. '
                       'Konu listesi uygulamanın kendi verisinden.' % (ders, k['k']))
                act = 'video'
            else:
                src = 'Tüm TUS Soruları · ' + ders
                why = ('%s · %s — soruları oku, sonra bu konudaki DENEME YANLIŞLARINA bak.'
                       % (ders, k['k']))
                act = 'soru'
            isler.append((k.get('br') or ders, k['k'], src, act, k['tag'], k['soru']))
        blok_doldur(g, bl, a, b, isler, ml,
                    ders + (' · pembe' if kip == 'video' else ' · TUS soruları'), '')
    # why alanlarını tek tek yaz
    for t in YENI:
        if t['d'] == g and t['br'] != 'Deneme' and not t['why']:
            t['why'] = (('%s · %s — videoyu izle, önemli detayları EZBERLE.' % (ders, t['k']))
                        if kip == 'video' else
                        ('%s · %s — soruları oku, deneme yanlışlarınla karşılaştır.' % (ders, t['k'])))

for g, d in DERS_GUN: ders_gunu(g, d, 'video')

# ── 08-16 · PATOLOJİ SST KOMPLE TEKRAR (deneme günü) ────────────────────
g = PAT_GUN
deneme_bloklari(g)
pat = ders_konulari('Patoloji')
# ⚠ Ad "(komple tekrar)" ile ayrılıyor: aynı konu aynı kitapta İKİNCİ kez
# geçiyor ve kitap görünümünde SATIR YİNELENİYORDU (kapı yakaladı).
# Parantezli ek `konuSade` tarafından soyuluyor → konu kökü DEĞİŞMİYOR,
# yalnız görünen ad ayrışıyor. "— tekrar" kullanılmadı: tire ayraç olarak
# boşluğa çevriliyor ve kök "neoplazi tekrar" olup konu bağını koparıyor.
blok_doldur(g, 'D', '15:45', '17:45',
    [('Patoloji', k['k'] + ' (komple tekrar)', 'Emrullah Patoloji SST', 'oku',
      k['tag'], k['soru']) for k in pat[:5]],
    mola('17:45', '23:00', 315, 'yavas', 'gün bitti — akşam serbest'),
    'Patoloji komple tekrar', '')
for t in YENI:
    if t['d'] == g and t['br'] == 'Patoloji':
        t['why'] = 'Patoloji SST komple tekrar · ' + t['k'] + ' — hızlı geç, ezber tazele.'

for g, d in SORU_GUN: ders_gunu(g, d, 'soru')

# ── birleştir ──────────────────────────────────────────────────────────
TAM = gecmis + YENI
TAM.sort(key=lambda g: (g['d'], g['b'], g['t']))
json.dump(TAM, open('gorevler_yeni.json', 'w'), ensure_ascii=False)

print('eski görev:', len(G), '· yeni görev:', len(TAM),
      '(geçmiş %d korundu, yeni %d üretildi)' % (len(gecmis), len(YENI)))
gun = collections.OrderedDict()
for x in YENI: gun.setdefault(x['d'], []).append(x)
print('\n%-12s %-4s %-6s %s' % ('GÜN', 'İŞ', 'SAAT', 'İÇERİK'))
for d in sorted(gun):
    xs = gun[d]
    sa = sum(x['sure'] for x in xs)
    brs = []
    for x in xs:
        e = x['br'] if x['br'] != 'Deneme' else 'DENEME'
        if e not in brs: brs.append(e)
    print('%-12s %-4d %-6.1f %s' % (d, len(xs), sa, ' + '.join(brs)))
