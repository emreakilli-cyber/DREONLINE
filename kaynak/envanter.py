# -*- coding: utf-8 -*-
"""
ENVANTER — kullanıcı beyanından birebir alınmış kaynak içerikleri.
Tek doğruluk kaynağı budur. Buraya yazılmayan hiçbir konu görev olarak üretilemez.

Biçim:
  KITAP[ad] = (toplam_sayfa, [(bölüm_adı, baslangic_sf, bitis_sf), ...])
  Bitiş sayfası bir sonraki bölümün başlangıcıdır; son bölümde toplam_sayfa+1'dir.
  (eko.py'deki 4. alan — Tusanaliz soru değeri — burada YOK; o ayrı bir veri.)

VIDEO[ad] = (bölünemez_birim_dakika, [(konu, video_adedi, video_dakikası), ...])
"""

def _bl(top, cift):
    """[(ad, baslangic)] listesini [(ad, bas, bit)] hâline çevirir."""
    out=[]
    for i,(ad,b) in enumerate(cift):
        bit = cift[i+1][1] if i+1<len(cift) else top+1
        out.append((ad,b,bit))
    return out

KITAP={}

# ── 1 · Dr Atilla Uslu Dahiliye konu kitabı-1 · 251 sayfa
KITAP['Atilla Uslu Dahiliye 1']=(251,_bl(251,[
 ('Hematoloji',8),('Onkoloji',90),('Kardiyoloji',102),('Göğüs Hastalıkları',184)]))

# ── 2 · Dr Atilla Uslu Dahiliye konu kitabı-2 · 260 sayfa
KITAP['Atilla Uslu Dahiliye 2']=(260,_bl(260,[
 ('Nefroloji',8),('Endokrinoloji',60),('Gastroenteroloji/Hepatoloji',136),('Romatoloji',216)]))

# ── 3 · Dr Atilla Uslu Sorularla Son Tekrar · 358 sayfa
KITAP['Atilla Uslu SST']=(358,_bl(358,[
 ('Kısaltmalar ve Normal Lab değerleri',4),('Hematoloji',5),('Onkoloji',75),
 ('Kardiyoloji',93),('Göğüs Hastalıkları',139),('Nefroloji',171),('Endokrinoloji',195),
 ('Gastroenteroloji',249),('Romatoloji',305),('Enfeksiyon Hastalıkları',337)]))

# ── 4 · TUSTIME Fast Track Biyokimya · 115 sayfa
KITAP['FT Biyokimya']=(115,_bl(115,[
 ('Hücre ve organeller',5),('Aminoasitler ve Proteinler',12),('Enzimler',26),
 ('Karbonhidratlar',27),('Lipidler',48),('Aminoasitlerin metabolizması',69),
 ('Nükleotid metabolizması',86),('Vitaminler',101),('Hormonlar',109)]))

# ── 5 · Dr Yavuz Şahin Flash Biyokimya konu kitabı · toplam sayfa BEYAN EDİLMEDİ
KITAP['Yavuz Şahin Biyokimya konu']=(None,_bl(0,[
 ('Karbonhidratlar',3),('Lipidler',23),('Metabolizma Entegrasyonu',37),
 ('Genom ve Nükleik asitler',43),('Aminoasitler',51),('Proteinler',65),
 ('Enzimler ve Klinik Biyokimya',77),('Hücre ve Organeller',85),('Vitaminler',91),
 ('Hormonlar',97)]))

# ── 6 · Dr Yavuz Şahin Biyokimya Hızlı Tekrar Soru Bankası · 222 sayfa
KITAP['Yavuz Şahin Biyokimya SB']=(222,_bl(222,[
 ('Karbonhidratlar',7),('Lipidler',55),('Metabolizma Entegrasyonu',89),
 ('Nükleik Asitler ve Genom',95),('Amino Asitler',123),('Proteinler',151),
 ('Enzimler ve Klinik Biyokimya',171),('Hücre ve Organeller',183),('Vitaminler',197),
 ('Hormonlar',209)]))

# ── 7 · TUSTIME Fast Track Farmakoloji · 118 sayfa (Toksikoloji son sayfa)
KITAP['FT Farmakoloji']=(118,_bl(118,[
 ('Genel Farmakoloji',5),('Otonom Sinir Sistemi',17),('Kardiyovasküler sistem',25),
 ('Hormonlar',44),('Santral Sinir Sistemi',53),('Otakoidler',76),('NSAİİ',83),
 ('Gastrointestinal Sistem',87),('Kemoterapötikler',90),('İmmün Modulatör İlaçlar',112),
 ('Hematopoetik sistem',117),('Toksikoloji',118)]))

# ── 8 · Dr Yavuz Şahin Farmakoloji Hızlı Tekrar Soru Bankası · 215 sayfa
KITAP['Yavuz Şahin Farmakoloji SB']=(215,_bl(215,[
 ('Genel Farmakoloji',7),('Otonom Sinir Sistemi',31),('Kardiyovasküler sistem',51),
 ('Hormonlar',87),('Santral Sinir Sistemi',105),('Otakoidler ve NSAİİ',135),
 ('Kemoterapötikler ve İmmunmodülatörler',149),('Diğer Sistem ilaçları',193)]))

# ── 9 · TUSTIME Mikrobiyoloji Konu kitabı · 349 sayfa
KITAP['TUSTIME Mikrobiyoloji']=(349,_bl(349,[
 ('Temel Mikrobiyoloji',5),('İmmünoloji',47),('Bakteriyoloji',87),('Viroloji',190),
 ('Mikoloji',259),('Tıbbi Parazitoloji',287),('Enfeksiyon Hastalıkları',321)]))

# ── 10 · Dr Feyyaz Akay Mikrobiyoloji Hızlı Tekrar ve Soru · 232 sayfa (Kaynakça son)
# Kullanıcı kararı (28 Tem): Oldies + Goldies TEK BİRİM sayılıyor.
KITAP['Feyyaz Akay Mikrobiyoloji']=(232,_bl(232,[
 ('Genel Mikrobiyoloji (Oldies+Goldies)',8),('İmmünoloji (Oldies+Goldies)',34),
 ('Bakteriyoloji (Oldies+Goldies)',64),('Viroloji (Oldies+Goldies)',119),
 ('Mikoloji (Oldies+Goldies)',151),('Parazitoloji (Oldies+Goldies)',177),
 ('Genel Tekrar',202),('Kaynakça',232)]))

# ── 11 · TUSTIME Fizyoloji Konu Kitabı · 215 sayfa
KITAP['TUSTIME Fizyoloji']=(215,_bl(215,[
 ('Hücre Fizyolojisi',5),('Sinir Sistemi Fizyolojisi',22),('Kas Fizyolojisi',77),
 ('Kardiyovasküler sistem Fizyolojisi',91),('Solunum Sistemi Fizyolojisi',116),
 ('Hematopoetik Sistem Fizyolojisi',129),('Gastrointestinal sistem fizyolojisi',140),
 ('Böbrek Fizyolojisi',159),('Endokrin Sistem Fizyolojisi',179),('Üreme Fizyolojisi',205)]))

# ── 12 · Klinisyen Vaka Soruları Fizyoloji-Histoloji-Embriyoloji · toplam BEYAN EDİLMEDİ
KITAP['Klinisyen Vaka Fizyoloji']=(None,_bl(0,[
 ('Hücre Histolojisi ve Fizyolojisi',7),('Doku Histolojisi ve Fizyolojisi',33),
 ('Kas Dokusu Histoloji ve Fizyolojisi',81),('Genital sistem Histolojisi ve Fizyolojisi',98),
 ('Genel Embriyoloji',109),('Hematopoetik sistem Histolojisi ve Fizyolojisi',138),
 ('Gastrointestinal sistem Histolojisi ve Fizyolojisi',171),
 ('Kardiyovasküler sistem Histolojisi ve Fizyolojisi',200),
 ('Endokrin sistem Histolojisi ve Fizyolojisi',219),
 ('Solunum sistemi Histolojisi ve Fizyolojisi',240),
 ('Santral sinir sistemi Histolojisi ve Fizyolojisi',260),
 ('Üriner sistem Histolojisi ve Fizyolojisi',295)]))

# ── 13 · Dr Emrullah Beyazyıldız Patoloji Sorularla Son Tekrar · 441 sayfa
KITAP['Emrullah Patoloji SST']=(441,_bl(441,[
 ('Hücre Zedelenmesi',10),('İnflamasyon',32),('Yara İyileşmesi',52),('İmmünoloji',62),
 ('Hemodinamik Bozukluklar',90),('Neoplazi',104),('Pediatrik ve Çevresel Hastalıklar',134),
 ('Kardiyovasküler sistem hastalıkları',146),('Hematopoetik Sistem hastalıkları',158),
 ('Solunum Sistem Hastalıkları',180),('Üriner Sistem Hastalıkları',204),
 ('Erkek Genital Sistem Hastalıkları',236),('Kadın Genital Sistem Hastalıkları',246),
 ('Gastrointestinal sistem hastalıkları',266),('Karaciğer Hastalıkları',300),
 ('Pankreas Hastalıkları',322),('Meme Hastalıkları',332),('Sinir sistemi Hastalıkları',350),
 ('Endokrin Sistem Hastalıkları',378),('Deri Hastalıkları',404),
 ('Kas İskelet Sistemi Hastalıkları',424)]))

# ── 14 · Klinisyen Vaka Soruları Pediatri · 378 sayfa
KITAP['Klinisyen Vaka Pediatri']=(378,_bl(378,[
 ('Yenidoğan',1),('Genetik',40),('Büyüme ve Gelişme',48),('Sosyal Pediatri ve Adölesan',52),
 ('Beslenme',54),('Sıvı Elektrolit - Asit Baz Bozuklukları',63),('Pediatrik Gastroenteroloji',70),
 ('Pediatrik Nöroloji',91),('Pediatrik Kardiyoloji',109),('Solunum/Çocuk ve Göğüs Hastalıkları',161),
 ('Döküntülü Hastalıklar',174),('Bağışıklama',181),('Pediatrik İmmünoloji',186),
 ('Pediatrik Allerji',207),('Pediatrik Endokrinoloji',226),('Metabolik Hastalıklar',248),
 ('Pediatrik Hematoloji',284),('Pediatrik Onkoloji',309),('Pediatrik Nefroloji',336),
 ('Pediatrik Romatoloji',358),('Çocuk Acil ve Yoğun Bakım',368),('Zehirlenmeler',376)]))

# ── 15 · Klinisyen Vaka Soruları Küçük Stajlar · toplam BEYAN EDİLMEDİ
KITAP['Klinisyen Vaka Küçük Stajlar']=(None,_bl(0,[
 ('Nöroloji',7),('Beyin Cerrahisi',76),('Psikiyatri',115),('Üroloji ve Çocuk Cerrahisi',142),
 ('Kalp ve Damar Cerrahisi',176),('Göğüs Cerrahisi',190),('Halk Sağlığı',199),('Radyoloji',211),
 ('Anestezi',218),('Kulak Burun Boğaz Hastalıkları',230),('Ortopedi',254),
 ('Fizik Tedavi ve Rehabilitasyon',269),('Plastik Cerrahi',291),('Göz Hastalıkları',297),
 ('Dermatoloji',325)]))

# ── 16 · TUSTIME Küçük Stajlar Konu Kitabı · 200 sayfa (Nükleer tıp son sayfa)
KITAP['TUSTIME Küçük Stajlar']=(200,_bl(200,[
 ('Nöroloji',5),('Nöroşirurji',32),('Dermatoloji',46),('Psikiyatri',66),('Göz Hastalıkları',92),
 ('Kulak Burun Boğaz',105),('Epidemiyoloji ve Temel İstatistik',118),
 ('Fizik Tedavi ve Rehabilitasyon',127),('Ortopedi',135),('Üroloji',150),('Çocuk Cerrahisi',162),
 ('Anestezi',171),('Göğüs Cerrahisi Kalp Damar Cerrahisi',180),('Acil Tıp',194),('Nükleer tıp',200)]))

# ── 17 · TUSDATA Speetus Genel Cerrahi Yeni Nesil Özet · 142 sayfa
#    DİKKAT: eko.py'de 20 bölüm vardı; gerçek içindekiler 35 bölüm.
KITAP['Speetus Genel Cerrahi']=(142,_bl(142,[
 ('Sıvı Elektrolit Dengesi Asit Baz Bozuklukları',1),('Beslenme',9),
 ('Travmaya sistemik cevap ve Metabolik Destek',11),('Şok',14),('Cerrahi Enfeksiyonlar',18),
 ('Yara İyileşmesi',21),('Hemostaz ve Transfüzyon',23),('Travma ve Travma Hastasına yaklaşım',27),
 ('Yanık',32),('Meme Hastalıkları ve Cerrahisi',36),('Tiroid Hastalıkları ve Cerrahisi',44),
 ('Paratiroid Hastalıkları ve cerrahisi',50),('Adrenal bez Hastalıkları ve Cerrahisi',52),
 ('Transplantasyon',55),('Akut Karın',58),('Özofagus Hastalıkları ve Cerrahisi',59),
 ('Mide Hastalıkları ve Cerrahisi',67),('Morbid Obezite ve Cerrahisi',73),
 ('İnce Bağırsak Hastalıkları ve Cerrahisi',74),('Kolon Rektum Hastalıkları ve Cerrahisi',80),
 ('Apendiks Vermiformis Hastalıkları ve Cerrahisi',91),
 ('Perianal bölge Hastalıkları ve Cerrahisi',95),('İntestinal Tıkanıklıklar ve Cerrahisi',98),
 ('Gastrointestinal Sistem Kanamaları ve Cerrahisi',100),
 ('Gastrointestinal sistem Fistülleri ve Cerrahisi',102),
 ('Karaciğer hastalıkları ve Cerrahisi',103),('Portal Hipertansiyon ve Cerrahisi',109),
 ('Safra Kesesi - Safra yolları hastalıkları ve cerrahisi',112),
 ('Pankreas hastalıkları ve cerrahisi',119),('Mezenterik Vasküler Hastalıklar ve Cerrahisi',128),
 ('Dalak Hastalıkları ve cerrahisi',130),
 ('Karın duvarı, periton, retroperiton ve mezenter hastalıkları ve cerrahisi',135),
 ('Karın duvarı fıtıkları ve cerrahisi',137),('Cerrahi komplikasyonlar ve tedavisi',140)]))

# ── 18 · Op Dr Levent Kodal Genel Cerrahi Soru bankası · 296 sayfa
KITAP['Levent Kodal Genel Cerrahi SB']=(296,_bl(296,[
 ('Şok travma ve temel konular',5),('Sıvı elektrolit, Asit baz bozuklukları',63),
 ('Tiroid ve Paratiroid hastalıkları',81),('Meme Hastalıkları',109),('Özofagus Hastalıkları',135),
 ('Mide Duodenum hastalıkları, Obezite Cerrahisi',149),('İnce ve Kalın bağırsak hastalıkları',175),
 ('Safra Kesesi ve Safra yolları hastalıkları',227),('Pankreas Hastalıkları',245),
 ('Karaciğer, Dalak Hastalıkları ve Transplantasyon',263),('Karın duvarı fıtıkları',289)]))

# ── 19 · TUSTIME Fast Track Kadın Doğum · 136 sayfa
KITAP['FT Kadın Doğum']=(136,_bl(136,[
 ('Reproduktif Endokrinoloji',5),('Genel Jinekolojik',39),('Jinekolojik Onkoloji',62),
 ('Obstetri',81)]))

# ── 20 · TUSTIME Kadın Doğum konu kitabı · 235 sayfa (bölüm sonlarında çalışma soruları var)
KITAP['TUSTIME Kadın Doğum konu']=(235,_bl(235,[
 ('Reproduktif Endokrinoloji',1),('Genel Jinekolojik',62),('Jinekolojik Onkoloji',111),
 ('Obstetri',148)]))

# ── 21 · Anatomi Fast Track · 126 sayfa (Deri ve ekleri son sayfa)
# Kullanıcı kararları (28 Tem):
#  · Nöroanatomi = Pleksuslar + MSS + PSS + Duyu Organları + Deri ve Ekleri (tek birim)
#  · Endokrin Sistem Anatomisi → Sindirim (GİS) birimine dahil
#  · Ürogenital ayrı birim, Tusanaliz verisi verildi [1,1,1,2,1]
# Sayfalar bitişik DEĞİL; birim çoklu aralık taşıyor.
KITAP['Anatomi Fast Track']=(126,[
 ('Kemikler',5,22),('Eklemler',22,28),('Kaslar',28,49),
 ('Solunum Sistemi Anatomisi',55,60),('Dolaşım Sistemi Anatomisi',60,77),
 ('Ürogenital Sistem Anatomisi',119,124),
 # çoklu aralıklı iki birim aşağıda ARALIK sözlüğünde
 ('Sindirim + Endokrin Sistem Anatomisi',77,90),
 ('Nöroanatomi (Pleksus + MSS + PSS + Duyu + Deri)',90,115),
])
# Çoklu aralık taşıyan birimler: (kitap,birim) -> [(bas,bit),...]
ARALIK={
 ('Anatomi Fast Track','Sindirim + Endokrin Sistem Anatomisi'):[(77,90),(124,126)],
 ('Anatomi Fast Track','Nöroanatomi (Pleksus + MSS + PSS + Duyu + Deri)'):
   [(49,55),(90,119),(126,127)],
}

# ── Alt başlıklar (kullanıcı beyanı) — görev brifinglerinde kullanılabilir
ALT={
 ('Anatomi Fast Track','Nöroanatomi (MSS + PSS)'):[
   (90,'Medulla Spinalis (Omurilik)'),(95,'Truncus Encephali (Beyin Sapı)'),
   (97,'Cerebellum (Beyincik)'),(98,'Diencephalon (Ara Beyin)'),(99,'Limbik Sistem'),
   (100,'Telencephalon (Cerebrum)'),(101,'Substantia Alba (Beyaz Cevher)'),
   (102,'Nuclei Basales (Bazal Çekirdekler)'),
   (102,'Liquor Cerebrospinalis (BOS) Dolaşımı ve Ventriküller'),
   (103,'Meninges (Beyin Zarları), Dural Sinüsler, Sisternalar'),
   (106,'Kranyal Sinirler'),(113,'Otonom Sinir Sistemi')],
 ('Anatomi Fast Track','Duyu Organları'):[
   (115,'Bulbus oculi (Göz)'),(117,'Auris (Kulak)')],
}

# Tusanaliz'de KARŞILIĞI OLMAYAN bölümler — 'soru 0' DEĞİL, 'veri yok'.
VERI_YOK=set()   # Anatomi'deki beş boşluk 28 Tem kullanıcı kararlarıyla kapandı.

# ══ VİDEO SERİLERİ ═══════════════════════════════════════════════
# KURAL: video bölünemez. Bir görev tam sayıda video içermek zorunda.
VIDEO={}
VIDEO['Atilla Uslu Dahiliye konu videoları']={
  'hiz':1.5,
  'konu':[
    ('Hematoloji',        9, 40),
    ('Onkoloji',          1, 45),
    ('Endokrinoloji',     7, 30),
    ('Kardiyoloji',       6, 45),
    ('Göğüs Hastalıkları',6, 30),
    ('Nefroloji',         4, 30),
    ('Gastroenteroloji',  7, 30),
    ('Romatoloji',        4, 30),
  ]}
# ⚠ Bu seride ENFEKSİYON HASTALIKLARI VİDEOSU YOKTUR.
#   Dahiliye konu kitapları 1 ve 2'de de Enfeksiyon bölümü yoktur.
#   Enfeksiyon yalnız Atilla Uslu SORULARLA SON TEKRAR kitabında var (sf 337–358).

# ══ DENEME / SORU SERİLERİ ════════════════════════════════════════
SERI={
 "TUSDATA 24'lü branş denemeleri":['Pediatri','Patoloji','Fizyoloji','Anatomi','Küçük Stajlar',
    'Biyokimya','Farmakoloji','Genel Cerrahi','Kadın Hastalıkları ve Doğum Bilgisi','Dahiliye'],
 'TUSDATA PreTUS200':['cilt 3 (çözüldü)','cilt 4','cilt 5','cilt 6','cilt 7','cilt 8'],
 'Klinisyen Tüm TUS Soruları 36. Baskı':['Genel Cerrahi','Küçük Stajlar',
    'Kadın Hastalıkları ve Doğum Bilgisi','Farmakoloji','Pediatri','Biyokimya',
    'Dahiliye ve Entegre Enfeksiyon Hastalıkları'],
 'TTS 34. Baskı':['Patoloji (okundu)','Mikrobiyoloji','Anatomi'],
}

# ══ ÖLÇÜLMÜŞ HIZLAR (kullanıcı beyanı) ═══════════════════════════
OLCUM={
 'Farmakoloji soru':(10,15),   # 10 soru · 15 dakika (açıklama okuyarak, bakir konu)
 'Pediatri soru':(10,10),      # 10 soru · 10 dakika (klinik, tanıdık)
}

# ══ EKSİK / DOĞRULANMAMIŞ ════════════════════════════════════════
EKSIK=[
 'ANATOMİ · VERİSİ OLMAYAN BEŞ BÖLÜM: Pleksuslar · Duyu Organları · Ürogenital · '
 'Endokrin · Deri ve Ekleri. Tusanaliz Anatomi listesinde bu etiketler YOK. '
 'DİKKAT: "0 soru çıkıyor" DEĞİL, "ölçülmemiş" demek — ikisi aynı şey değildir. '
 'Kullanıcı teyidi (28 Tem): Anatomi Duyu Organları (Bulbus oculi · Auris YAPILARI) ile '
 'Küçük Stajlar Göz Hastalıkları · KBB (KLİNİK) AYRI içeriktir, biri diğerinin yerine '
 'sayılamaz. Bu beş bölüm 18 sayfa · 3.15 saat tutuyor ve verimlilik sıralamasına '
 'sokulamaz — kullanıcı kararı gerekiyor.',
 'Yavuz Şahin Biyokimya konu kitabı — toplam sayfa sayısı beyan edilmedi.',
 'Klinisyen Vaka Fizyoloji — toplam sayfa sayısı beyan edilmedi.',
 'Klinisyen Vaka Küçük Stajlar — toplam sayfa sayısı beyan edilmedi.',
 'Atilla Uslu SST soru çözüm videoları — satın alınmadı, süre bilinmiyor.',
 'Yavuz Şahin konu anlatım videoları — satın alınmadı, süre bilinmiyor.',
]

if __name__=='__main__':
    print('%-34s %6s %6s'%('KAYNAK','sayfa','bölüm'))
    print('='*50)
    for k,(tot,bl) in KITAP.items():
        print('%-34s %6s %6d'%(k[:34],tot if tot else '—',len(bl)))
    print()
    for ad,v in VIDEO.items():
        top=sum(n*d for _,n,d in v['konu']); h=top/v['hiz']
        print('%s · %d video · %d dk ham · %.2f saat @%.1fx'%(ad,sum(n for _,n,_ in v['konu']),top,h/60,v['hiz']))
        for k,n,d in v['konu']:
            print('   %-22s %2d video × %2d dk = %4d dk → %.3f saat (video başı %.3f)'%(k,n,d,n*d,(n*d/v['hiz'])/60,(d/v['hiz'])/60))
    print()
    print('EKSİK/DOĞRULANMAMIŞ: %d madde'%len(EKSIK))
    for e in EKSIK: print('  · '+e)
