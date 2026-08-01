# -*- coding: utf-8 -*-
"""FT kitaplarının bölüm katalogu · tek kaynak.
Algoritma iyileştikçe hepsi buradan yeniden üretiliyor ki
eski kitaplar eski (kusurlu) eşleştirmeyle kalmasın."""

KATALOG = {
 'FT Genel Cerrahi': dict(grup='Genel Cerrahi grubu', brans='Genel Cerrahi',
  kd='Genel Cerrahi', hedef=30.0, bolum=[
   ('Travmaya Sistemik Yanıt ve Metabolik Destek',5,13),
   ('Adrenal Hastalıkları ve Cerrahisi',14,17),
   ('Sıvı-Elektrolit Dengesi ve Asit Baz Metabolizması',18,28),
   ('Cerrahi Hastalarda Beslenme',29,32),
   ('Şok Patofizyolojisi ve Şok Çeşitleri',33,36),
   ('Tiroid Hastalıkları ve Cerrahisi',37,47),
   ('Paratiroid Hastalıkları ve Cerrahisi',48,50),
   ('Meme Hastalıkları ve Cerrahisi',51,60),
   ('Transplantasyon',61,65),('Yara İyileşmesi',66,68),
   ('Yanık ve Cerrahisi',69,70),('Dalak Hastalıkları ve Cerrahisi',71,72),
   ('Karın Duvarı ve Karın Duvarı Fıtıkları Cerrahisi',73,75),
   ('Akut Karın Hastalıkları ve Cerrahisi',76,77),
   ('Karın İçi Enfeksiyonlar ve Karın Duvarı Hastalıkları',78,78),
   ('Karın Travmaları ve Cerrahisi',79,81),
   ('Özofagus Hastalıkları ve Diyafragmatik Herniler',82,86),
   ('Mide Hastalıkları ve Cerrahisi',87,94),
   ('İnce Barsaklar Hastalıkları ve Cerrahisi',95,98),
   ('Apendiks Hastalıkları ve Cerrahisi',99,100),
   ('Kolon ve Rektum Hastalıkları ve Cerrahisi',101,110),
   ('GİS Kanamalar, Fistüller ve Obstrüksiyonlar',111,114),
   ('Karaciğer Hastalıkları ve Cerrahisi',115,119),
   ('Safra Kesesi ve Safra Yolları Hastalıkları ve Cerrahisi',120,124),
   ('Pankreas Hastalıkları ve Cerrahisi',125,134),
   ('Cerrahi Hazırlık ve Cerrahi Enfeksiyonlar',135,139),
   ('Hemostaz, Cerrahi Kanama ve Kan Transfüzyonları',140,145),
   ('Deri Hastalıkları',146,149)]),

 'FT Pediatri': dict(grup='Pediatri', brans='Pediatri', kd='Pediatri', hedef=25.0, bolum=[
   ('Pediatriye Genel Bakış',5,7),('Büyüme-Gelişme ve Davranış',8,12),
   ('Anne Sütü, Beslenme, Mineral ve Vitamin',13,22),('Genetik',23,26),
   ('Aşılar ve Temel Uygulama Prensipleri',27,32),('Döküntülü Hastalıklar',33,36),
   ('Pediatrik Gastroenteroloji ve Hepatoloji',37,47),('Pediatrik Hematoloji',48,60),
   ('Pediatrik Onkoloji',61,69),('Yenidoğan · Neonatoloji',70,79),
   ('Pediatrik Nöroloji',80,86),('Adölesan · Ergen Sağlığı',87,87),
   ('Acil ve Zehirlenmeler',88,91),('Pediatrik Metabolik Hastalıklar',92,97),
   ('Pediatrik İmmünoloji ve Hastalıkları',98,100),('Pediatrik Alerji',101,103),
   ('Pediatrik Nefroloji',104,110),('Pediatrik Romatoloji',111,115),
   ('Pediatrik Göğüs Hastalıkları',116,121),
   ('Pediatrik Kardiyovasküler Sistem ve Hastalıkları',122,130),
   ('Pediatrik Endokrinoloji',131,140)]),

 'FT Fizyoloji': dict(grup='Fizyoloji+Histo', brans='Fizyoloji', kd='Fizyoloji', hedef=8.0, bolum=[
   ('Hücre Fizyolojisi',5,10),('Sinir Sistemi Fizyolojisi',11,29),
   ('Kas Fizyolojisi',30,35),('Kardiyovasküler Sistem Fizyolojisi',36,45),
   ('Solunum Sistemi Fizyolojisi',46,50),('Hematopoetik Sistem Fizyolojisi',51,55),
   ('Gastrointestinal Sistem Fizyolojisi',56,60),('Böbrek Fizyolojisi',61,66),
   ('Endokrin Sistem Fizyolojisi',67,72)]),

 'FT Mikrobiyoloji': dict(grup='Mikrobiyoloji', brans='Mikrobiyoloji',
  kd='Mikrobiyoloji', hedef=18.0, bolum=[
   ('Temel Mikrobiyoloji',5,19),('İmmünoloji',20,32),('Bakteriyoloji',33,74),
   ('Viroloji',75,98),('Mikoloji',99,108),('Tıbbi Parazitoloji',109,123),
   ('Enfeksiyon Hastalıkları',124,130)],
  ozel={'Enfeksiyon Hastalıkları':dict(soru_kd=('Dahiliye','enfeksiyon hastalıkları'),
        grup='Dahiliye grubu',brans='Dahiliye')}),

 'FT Patoloji': dict(grup='Patoloji', brans='Patoloji', kd='Patoloji', hedef=18.0, bolum=[
   ('Hücre Hasarı, Hücre Ölümü ve Adaptasyonlar',5,7),('İnflamasyon ve Doku Tamiri',8,11),
   ('Hemodinamik Hastalıklar, Tromboembolik Hastalık ve Şok',12,14),
   ('İmmün Sistem Hastalıkları',15,19),('Neoplazi',20,23),('Çocukluk Çağı Tümörleri',24,24),
   ('Genetik Hastalıklar',25,26),('Damar Hastalıkları',27,29),('Kalp Hastalıkları',30,32),
   ('Hematolojik Hastalıklar',33,39),('Çevresel ve Nütrisyonel Hastalıklar',40,41),
   ('Akciğer Hastalıkları',42,46),('Baş ve Boyun Hastalıkları',47,48),
   ('Gastrointestinal Sistem Hastalıkları',49,54),
   ('Karaciğer ve Safra Kesesi Hastalıkları',55,58),('Pankreas Hastalıkları',59,60),
   ('Böbrek Hastalıkları',61,65),
   ('Alt Üriner Sistem ve Erkek Genital Sistemi Hastalıkları',66,69),
   ('Kadın Genital Sistem Hastalıkları',70,74),('Meme Hastalıkları',75,78),
   ('Endokrin Sistem Hastalıkları',79,82),('Deri Hastalıkları',83,87),
   ('Kemik-Eklem Hastalıkları ve Yumuşak Doku Tümörleri',88,92),
   ('Sinir Sistemi Hastalıkları',93,98)]),

 'FT Dahiliye': dict(grup='Dahiliye grubu', brans='Dahiliye', kd='Dahiliye',
  hedef=None, ks_haric=True, cikar=['enfeksiyon hastalıkları'], bolum=[
   ('Hematoloji',5,28),('Onkoloji',29,37),
   ('Endokrinoloji ve Metabolizma Hastalıkları',38,67),('Nefroloji',68,87),
   ('Gastroenteroloji',88,115),('Kardiyoloji',116,127),('Göğüs Hastalıkları',128,137),
   ('Romatoloji',138,157),('Geriatri',158,163)],
  # Geriatri · demans içeriği nöroloji altında sayılıyor, payın 1/4ü
  ozel={'Geriatri':dict(soru_sabit=0.51)}),

 # ⚠ Bu kitapta yalnız DÖRT ana başlık var (Obstetri tek başına 55 sayfa
 #   = 9.6 saat). Diğer kitaplarda ana başlık yeterince ayrıntılıydı;
 #   burada ALT başlıklar kullanılıyor ki "hangi bölüme baktım" izlenebilsin.
 'FT Kadın Doğum': dict(grup='Kadın Doğum', brans='Kadın Doğum',
  kd='Kadın Doğum', hedef=10.0, bolum=[
   ('Kadın Genital Sistem Fizyolojisi ve Histolojisi',5,7),
   ('Kadın Genital Sistem Embriyolojisi ve Hastalıkları',8,10),
   ('Seksüel Gelişim Bozuklukları',11,13),('Puberte ve Anormallikleri',14,15),
   ('Menstrual Siklus',16,18),('Amenore',19,20),('Hiperprolaktinemi',21,21),
   ('Kronik Anovülasyon ve Hiperandrojenizm',22,24),('İnfertilite',25,28),
   ('Kontrasepsiyon',29,34),('Menopoz',35,38),
   ('Kadın Genital Sistemi Anatomisi',39,42),
   ('Jinekolojide Muayene ve Tanısal İşlemler',43,45),
   ('Anormal Uterin Kanamalar',46,47),('Pelvik Ağrılar',48,50),
   ('Pelvik Kitleler',51,53),('CYBH ve Pelvik Enfeksiyonlar',54,58),
   ('Ürojinekoloji',59,61),
   ('Vulvanın Premalign ve Malign Hastalıkları',62,63),
   ('Vajenin Premalign ve Malign Hastalıkları',64,64),
   ('Serviks Uterinin Premalign ve Malign Hastalıkları',65,67),
   ('Korpus Uterinin Premalign ve Malign Hastalıkları',68,71),
   ('Tuba ve Overin Malign Hastalıkları',72,76),
   ('Gestasyonel Trofoblastik Hastalıklar',77,80),
   ('Obstetriye Giriş ve İmplantasyon',81,84),('Abortus',85,88),
   ('Ektopik Gebelikler',89,90),('Fetal Gelişim ve Fizyoloji',91,93),
   ('Maternal Fizyoloji',94,95),('Gebelik-İlaç İlişkisi',96,98),
   ('Prenatal Değerlendirme',99,101),('Fetal Monitorizasyon',102,104),
   ('Doğum ve Komplikasyonları',105,111),('Anormal Doğum',112,116),
   ('Puerperium ve Puerperal Enfeksiyonlar',117,118),
   ('Riskli Gebelikler',119,127),('Gebelikte Sistemik Hastalıklar',128,135)]),

 'Anatomi Fast Track': dict(grup='Anatomi', brans='Anatomi',
  kd='Anatomi', hedef=13.0, bolum=[
   ('Kemikler',5,21),('Eklemler',22,27),('Kaslar',28,48),('Pleksuslar',49,54),
   ('Solunum Sistemi Anatomisi',55,59),('Dolaşım Sistemi Anatomisi',60,76),
   ('Sindirim Sistemi Anatomisi',77,89),('Merkezi Sinir Sistemi Anatomisi',90,105),
   ('Periferik Sinir Sistemi Anatomisi',106,114),('Duyu Organları',115,118),
   ('Ürogenital Sistem Anatomisi',119,123),('Endokrin Sistem Anatomisi',124,125),
   ('Deri ve Ekleri',126,127)]),

 'FT Farmakoloji': dict(grup='Farmakoloji', brans='Farmakoloji',
  kd='Farmakoloji', hedef=18.0, bolum=[
   ('Genel Farmakoloji',5,16),('Otonom Sinir Sistemi',17,24),
   ('Kardiyovasküler Sistem',25,43),('Hormonlar',44,52),
   ('Santral Sinir Sistemi',53,75),('Otakoidler',76,82),('NSAII',83,86),
   ('Gastrointestinal Sistem',87,89),('Kemoterapötikler',90,111),
   ('İmmün Modülatör İlaçlar',112,116),
   ('Hematopoetik Sistem Farmakolojisi',117,117),('Toksikoloji',118,120)]),

 'FT Biyokimya': dict(grup='Biyokimya', brans='Biyokimya', kd='Biyokimya', hedef=18.0, bolum=[
   ('Hücre ve Organeller',5,11),('Aminoasitler ve Proteinler',12,22),('Enzimler',23,26),
   ('Karbonhidratlar',27,47),('Lipidler',48,68),('Aminoasitlerin Metabolizması',69,85),
   ('Nükleotid Metabolizması',86,100),('Vitaminler',101,108),('Hormonlar',109,116)]),
}
