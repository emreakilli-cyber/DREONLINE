# -*- coding: utf-8 -*-
"""
TAVAN ve KAZANÇ MODELİ — 28 Temmuz, gerçek ölçüme kalibre.

TAVAN: bir branştan alınabilecek EN YÜKSEK net = o branşta sınavda çıkan soru sayısı.
       Kullanıcı beyanı (resmi TUS dağılımı, 200 soru = 100 temel + 100 klinik).

KAZANÇ: kazanç = (tavan − mevcut) × r × kapsanan_pay
        r = 0.405 — bir tam turun kapattığı boşluk oranı.
        Kalibrasyon: Patoloji · TUSTIME konu kitabı 1 tur + Emrullah SST 60 saat
        → 24 Tem MediTUS'ta 11.75 net · tavan 18.2 → %64.6 → r = 1−(1−0.646)^(1/2)

Branş neti ASLA tavanı aşamaz. Aynı konuyu iki kaynaktan çalışmak boşluğu
iki kez kapatmaz — kapsanan_pay konu düzeyinde tekilleştirilir.
"""
RESMI={'Anatomi':13,'Histo-Embriyoloji':7,'Fizyoloji':8,'Biyokimya':18,'Mikrobiyoloji':18,
       'Patoloji':18,'Farmakoloji':18,'Dahiliye grubu':35,'Pediatri':25,
       'Genel Cerrahi grubu':30,'Kadın Doğum':10}          # toplam 200

# Küçük Stajlar ayrı bir sınav grubu DEĞİL. Konuları iki klinik gruba dağılır.
# Kanıt (28 Tem): ölçülen Dahiliye 23.20 + Küçük Stajlar 22.00 = 45.20, resmi 35 (+10.20);
# ölçülen Genel Cerrahi 23.60, resmi 30 (−6.40). Küçük Stajlar'ın CERRAHİ konuları
# (7.00 soru) Genel Cerrahi'ye eklenince: 30.60 vs 30 → sapma yalnız +0.60.
KS_CERRAHI={'Beyin cerrahisi','Kalp ve Damar cerrahisi','Göğüs Cerrahisi',
            'Üroloji','Çocuk Cerrahisi','Ortopedi'}

# Program branşı → sınav grubu
GRUP={'Anatomi':'Anatomi','Fizyoloji':'Fizyoloji+Histo','Biyokimya':'Biyokimya',
      'Mikrobiyoloji':'Mikrobiyoloji','Patoloji':'Patoloji','Farmakoloji':'Farmakoloji',
      'Dahiliye':'Dahiliye grubu','Pediatri':'Pediatri',
      'Genel Cerrahi':'Genel Cerrahi grubu','Kadın Doğum':'Kadın Doğum'}

R=0.405        # bir tam turun kapattığı boşluk oranı

def tavanlar(HAM, ort):
    """Tusanaliz ölçümünü resmi toplamlara ölçekler, grup tavanlarını döndürür."""
    O={br:sum(ort(v) for v in d.values()) for br,d in HAM.items()}
    c=sum(ort(HAM['Küçük Stajlar'][k]) for k in KS_CERRAHI if k in HAM['Küçük Stajlar'])
    d=O['Küçük Stajlar']-c
    gc=O['Genel Cerrahi']+c; dh=O['Dahiliye']+d
    kl=gc+dh+O['Pediatri']+O['Kadın Doğum']
    tm=sum(O[b] for b in ('Anatomi','Fizyoloji','Biyokimya','Mikrobiyoloji','Patoloji','Farmakoloji'))
    kx=100.0/kl; tx=100.0/tm
    return {'Anatomi':O['Anatomi']*tx,'Fizyoloji+Histo':O['Fizyoloji']*tx,
            'Biyokimya':O['Biyokimya']*tx,'Mikrobiyoloji':O['Mikrobiyoloji']*tx,
            'Patoloji':O['Patoloji']*tx,'Farmakoloji':O['Farmakoloji']*tx,
            'Dahiliye grubu':dh*kx,'Genel Cerrahi grubu':gc*kx,
            'Pediatri':O['Pediatri']*kx,'Kadın Doğum':O['Kadın Doğum']*kx}, \
           {'ks_cerrahi':c,'ks_dahili':d,'klinik_olcek':kx,'temel_olcek':tx}

def ks_grubu(konu):
    """Küçük Stajlar konusu hangi klinik gruba düşüyor."""
    return 'Genel Cerrahi grubu' if konu in KS_CERRAHI else 'Dahiliye grubu'

def kazanc(tavan, mevcut, pay):
    """Azalan verim: boşluğun r×pay kadarı kapanır. Tavan aşılamaz."""
    return max(0.0,(tavan-mevcut))*R*max(0.0,min(1.0,pay))

if __name__=='__main__':
    import importlib.util
    s=importlib.util.spec_from_file_location('sa','soru_analiz.py')
    sa=importlib.util.module_from_spec(s); s.loader.exec_module(sa)
    T,bilgi=tavanlar(sa.HAM,sa.ort)
    print('RESMİ TOPLAM %d soru'%sum(RESMI.values()))
    print('Küçük Stajlar: cerrahi %.2f → Genel Cerrahi · dahili %.2f → Dahiliye'%(bilgi['ks_cerrahi'],bilgi['ks_dahili']))
    print('ölçek: klinik ×%.4f · temel ×%.4f'%(bilgi['klinik_olcek'],bilgi['temel_olcek']))
    print()
    print('%-22s %7s'%('GRUP','TAVAN'))
    for b,v in sorted(T.items(),key=lambda z:-z[1]): print('%-22s %7.2f'%(b,v))
    print('%-22s %7.2f'%('TOPLAM',sum(T.values())))
