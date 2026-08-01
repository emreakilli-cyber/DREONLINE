# -*- coding: utf-8 -*-
"""
TUSANALİZ HAM VERİSİ — kullanıcı beyanı, son 5 TUS sınavı.
Okuma: 1 = 2025 Ağustos TUS'u, 2 = bir önceki, ... 5 = beş sınav öncesi.

Bu dosya SORU POTANSİYELİNİN tek doğruluk kaynağıdır. eko.py'deki türetilmiş
'soru' değerlerinin yerini alır — o değerler Gemini üzerinden dolaylı üretilmişti,
bunlar ham sayım.

BOZUK kayıtlar aynen korunur ama ortalamaya GİRMEZ; aşağıda listelenir.
"""

# (branş, konu): [1,2,3,4,5]  · None = o sınav için veri yok/bozuk
HAM = {
'Anatomi': {
 'Kemikler':[0,3,1,0,1], 'Eklemler':[1,0,0,0,0], 'Kaslar':[1,2,3,2,3],
 'Solunum Sistemi':[1,1,1,1,1], 'Dolaşım':[3,0,2,1,1], 'GİS':[3,2,1,2,1],
 'Nöroanatomi':[3,4,4,5,5],
 'Ürogenital':[1,1,1,2,1]},   # kullanıcı beyanı 28 Tem (ilk listede yoktu)
'Fizyoloji': {
 'Hücre':[2,2,1,2,0], 'Doku':[2,2,2,2,3], 'Kas':[1,1,1,1,0],
 'Genital sistem ve Genel embriyoloji':[3,2,2,3,2], 'Hemopoetik Sistem':[1,0,1,0,0],
 'GİS':[2,1,0,1,2], 'KVS':[1,3,1,1,1], 'Endokrin':[0,1,2,1,1],
 'Sinir':[2,2,3,2,3], 'Üriner':[0,0,1,1,2]},
'Biyokimya': {
 'Metabolizma':[1,0,0,0,1], 'Karbonhidratlar':[3,3,2,2,3], 'Lipitler':[2,3,2,6,2],
 'Aminoasitler ve Proteinler':[7,8,8,8,6], 'Nükleik Asitler':[1,1,1,1,2],
 'Vitaminler ve Mineraller':[2,1,2,0,0], 'Hormonlar':[2,2,3,1,3]},
'Mikrobiyoloji': {
 'Temel Mikrobiyoloji':[2,3,4,4,2],   # düzeltildi (kullanıcı teyidi 28 Tem)
 'Bakteriyoloji':[8,6,5,6,7], 'Parazitoloji':[2,2,2,2,2], 'Mikoloji':[2,2,3,2,2],
 'Viroloji':[3,3,2,3,3], 'İmmünoloji':[1,2,2,1,2]},
'Patoloji': {
 'Hücre':[1,2,1,2,3], 'İnflamasyon':[1,0,1,0,1], 'İmmün Sistem':[1,3,0,0,1],
 'Yara iyileşmesi':[0,1,0,0,1], 'Hemodinamik Hastalıklar':[0,0,2,0,1],
 'Neoplazi':[3,0,2,2,1], 'Solunum':[0,1,2,1,1], 'KVS':[1,1,1,1,0],
 'Hemopoetik sistem':[1,1,0,1,0], 'GİS':[1,2,1,2,3], 'Hepatobiliyer sistem':[0,1,1,2,0],
 'Üriner Sistem':[1,0,1,2,2],   # ⚠ metinde iki kez yazılmış, aynı değerlerle — tek sayıldı
 'Endokrin':[2,1,0,0,0], 'Kadın Genital':[1,1,0,2,2], 'Erkek Genital':[1,1,1,0,0],
 'Meme Hastalıkları':[1,1,2,0,1], 'Sinir sistemi':[1,0,0,0,0],
 'Kas iskelet sistemi':[1,1,2,2,1], 'Deri':[1,1,1,1,1]},
'Farmakoloji': {
 'Genel farmakoloji':[1,1,1,2,2], 'Otonom Sinir Sistemi':[2,1,1,1,2],
 'SSS':[3,3,3,4,3], 'KVS':[2,2,2,1,2], 'Solunum':[1,0,0,0,1], 'GİS':[0,2,2,0,1],
 'Endokrin':[4,2,3,3,2], 'Otakoidler':[0,1,0,0,0], 'NSAİİ':[0,0,0,1,0],
 'Kemoterapötikler':[3,5,5,5,5], 'Toksikoloji':[2,1,1,1,0]},
'Dahiliye': {
 'Hematoloji':[1,2,2,2,2], 'Onkoloji':[2,2,2,1,2], 'Nefroloji':[2,2,2,3,2],
 'Kardiyoloji':[3,3,3,3,3], 'Göğüs Hastalıkları':[2,2,2,2,2],
 'Gastroenteroloji':[2,0,2,2,0], 'Hepatoloji':[3,3,1,1,3], 'Endokrin':[2,2,2,2,2],
 'Romatoloji':[3,2,2,2,2], 'Enfeksiyon':[3,3,3,3,3],
 'Alerji ve İmmünoloji':[0,1,1,1,1], 'Geriatri':[1,1,1,1,1]},
'Pediatri': {
 'Yenidoğan':[3,2,2,2,2], 'Genetik':[0,0,2,1,1], 'Büyüme ve Gelişme':[0,2,2,1,1],
 'Beslenme':[1,1,1,0,1], 'Gastroenteroloji':[0,1,0,0,1], 'Hepatoloji':[2,0,1,2,0],
 'Nöroloji':[2,0,2,2,2], 'Kardiyoloji':[1,2,3,3,3], 'Göğüs hastalıkları':[2,1,1,1,2],
 'Döküntülü hastalıklar':[1,0,0,0,1], 'Bağışıklama':[1,0,1,0,1], 'Alerji':[0,1,1,1,0],
 'İmmünoloji':[1,2,1,1,1], 'Enfeksiyon hastalıkları':[0,2,1,1,0],
 'Endokrinoloji':[1,2,1,1,1], 'Metabolik hastalıklar':[1,2,1,2,1],
 'Hematoloji':[1,0,0,2,2], 'Onkoloji':[2,2,1,1,0], 'Nefroloji':[3,2,1,1,2],
 'Romatoloji':[1,1,1,1,1], 'Acil tıp ve zehirlenmeler':[1,1,1,1,2],
 'Çocuk psikiyatrisi':[1,1,1,1,0]},
'Genel Cerrahi': {
 'Temel Cerrahi':[5,7,7,5,5], 'Meme':[2,2,2,2,2], 'Tiroid':[1,1,2,0,2],
 'Paratiroid':[1,1,0,0,0], 'Özofagus':[1,1,0,0,0], 'Mide':[1,2,3,1,1],
 'İnce bağırsak':[2,0,0,2,1], 'Kolon ve Rektum':[1,1,1,2,3], 'Karaciğer':[2,0,1,2,1],
 'Safra kesesi':[1,1,1,1,1], 'Pankreas':[1,1,1,1,2],
 'Dalak':[1,1,1,1,1],                 # düzeltildi (kullanıcı teyidi 28 Tem)
 'Karın duvarı periton ve mezenter':[0,1,1,0,0], 'Fıtıklar':[1,1,0,1,0],
 'Sıvı elektrolit ve asit baz':[1,1,1,0,0], 'Beslenme':[1,1,0,0,0],
 'Travmaya yanıt':[1,1,1,1,0], 'Cerrahi enfeksiyonlar':[0,0,0,1,1],
 'Hemostaz ve Transfüzyon':[0,1,1,0,1], 'Travmalı hastaya yaklaşım':[2,0,2,0,1],
 'Yanık':[0,0,1,1,0]},
'Kadın Doğum': {
 'Jinekoloji':[3,2,3,3,2], 'Endokrinoloji':[3,3,2,2,4], 'Onkoloji':[1,1,1,1,0],
 'Obstetri':[3,4,4,4,4]},
'Küçük Stajlar': {
 'Nöroloji':[2,3,3,1,2], 'Beyin cerrahisi':[1,2,1,2,1], 'Psikiyatri':[2,2,1,2,2],
 'Halk Sağlığı':[1,1,1,1,1], 'Dermatoloji':[2,2,2,2,2], 'Radyoloji':[1,1,1,1,1],
 'Nükleer tıp':[1,1,1,1,1], 'KBB':[1,1,2,1,1], 'Göz Hastalıkları':[1,1,1,1,1],
 'Ortopedi':[2,2,1,2,1], 'FTR':[2,0,2,0,1], 'Üroloji':[1,1,1,1,1],
 'Çocuk Cerrahisi':[1,1,1,1,1], 'Kalp ve Damar cerrahisi':[1,1,2,2,1],
 'Göğüs Cerrahisi':[0,1,0,1,1],
 'Anestezi':[1,1,1,1,1],              # düzeltildi (kullanıcı teyidi 28 Tem)
 'Acil tıp ve zehirlenmeler':[2,1,1,2,3]},
}

BOZUK=[
 ('Patoloji','Üriner Sistem',"kaynak metinde iki kez yazılmış (aynı değerlerle), tek sayıldı"),
]
DUZELTILDI=[   # 28 Temmuz kullanıcı teyidi
 ('Mikrobiyoloji','Temel Mikrobiyoloji',[2,3,4,4,2]),
 ('Genel Cerrahi','Dalak',[1,1,1,1,1]),
 ('Küçük Stajlar','Anestezi',[1,1,1,1,1]),
]

def ort(v):
    """Ortalama soru/sınav — None'lar sayımdan düşer."""
    g=[x for x in v if x is not None]
    return sum(g)/len(g) if g else None

def fire(v):
    """Kaç sınavda 0 soru çıkmış — 'fire' sayısı. Düşük fire = güvenilir konu."""
    g=[x for x in v if x is not None]
    return sum(1 for x in g if x==0)

def istikrar(v):
    """En düşük değer — son 5 sınavda garanti taban."""
    g=[x for x in v if x is not None]
    return min(g) if g else None

if __name__=='__main__':
    print('%-14s %-38s %6s %5s %5s %6s'%('BRANŞ','KONU','ort','taban','fire','veri'))
    print('='*80)
    tum=[]
    for br,d in HAM.items():
        for k,v in d.items():
            o=ort(v); tum.append((o,br,k,v))
            print('%-14s %-38s %6.2f %5s %5d %6d'%(br,k[:38],o,istikrar(v),fire(v),len([x for x in v if x is not None])))
    print()
    print('EN YÜKSEK 20 KONU (ortalama soru/sınav)')
    for o,br,k,v in sorted(tum,reverse=True)[:20]:
        print('  %5.2f  %-14s %-38s %s'%(o,br,k[:38],v))
    print()
    print('SIFIRA YAKIN 12 KONU (soru potansiyeli düşük)')
    for o,br,k,v in sorted(tum)[:12]:
        print('  %5.2f  %-14s %-38s %s'%(o,br,k[:38],v))
    print()
    print('BRANŞ TOPLAMLARI (konuların ortalama toplamı)')
    for br,d in sorted(HAM.items(), key=lambda z:-sum(ort(v) or 0 for v in z[1].values())):
        print('  %-14s %6.2f soru/sınav · %d konu'%(br,sum(ort(v) or 0 for v in d.values()),len(d)))
    print()
    print('⚠ BOZUK KAYITLAR (%d)'%len(BOZUK))
    for a,b,c in BOZUK: print('  · %s / %s → %s'%(a,b,c))
