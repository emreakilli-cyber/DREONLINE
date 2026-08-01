# -*- coding: utf-8 -*-
"""
GÖREV KATALOĞU — envanterdeki HER bölüm için üretilebilecek görev + verimliliği.
Program yerleşimi bu katalogdan seçilerek yapılır; katalogda olmayan görev üretilemez.

Verimlilik = beklenen net / saat.
  beklenen net = Tusanaliz ortalama soru × KALIBRASYON
  KALIBRASYON  = programda ölçülen 1 soru ≈ 0.2037 net (bkz. DEVIR §12.5)
"""
import importlib.util
def _y(a,p):
    s=importlib.util.spec_from_file_location(a,p); m=importlib.util.module_from_spec(s); s.loader.exec_module(m); return m
EN=_y('en','envanter.py'); SA=_y('sa','soru_analiz.py')
ort=SA.ort; HAM=SA.HAM
KALIB=0.2037

# ── OKUMA HIZI · DEVIR §2 modeli
#    taban 15.0 = kitap daha önce çalışılmış/tanıdık · 8.0 = bakir
#    ÷1.4 = ezber yoğun branş · Klinisyen Vaka serisi 12.0 (kullanıcı beyanı)
HIZ={
 'TUSTIME Mikrobiyoloji':15.0/1.4,   'TUSTIME Fizyoloji':15.0,
 'TUSTIME Küçük Stajlar':15.0,       'Emrullah Patoloji SST':15.0,
 'TUSTIME Kadın Doğum konu':15.0,
 'FT Farmakoloji':8.0/1.4,           'FT Biyokimya':8.0/1.4,
 'Speetus Genel Cerrahi':8.0,        'FT Kadın Doğum':8.0,
 'Klinisyen Vaka Pediatri':12.0,     'Klinisyen Vaka Küçük Stajlar':12.0,
 'Klinisyen Vaka Fizyoloji':12.0, 'Anatomi Fast Track':8.0/1.4,
 'Atilla Uslu Dahiliye 1':8.0,       'Atilla Uslu Dahiliye 2':8.0,
 'Atilla Uslu SST':15.0,
 'Yavuz Şahin Biyokimya konu':8.0/1.4,
 'Yavuz Şahin Biyokimya SB':16.0,    'Yavuz Şahin Farmakoloji SB':16.0,
 'Levent Kodal Genel Cerrahi SB':24.0, 'Feyyaz Akay Mikrobiyoloji':16.0,
}
# Soru bankası hızları kullanıcı ölçümünden: 10 Farma sorusu 15 dk, 10 Pediatri 10 dk.
# Sayfa başına soru sayısı bilinmediğinden bu hızlar VARSAYIMDIR — doğrulanmalı.
VARSAYIM_HIZ={'Yavuz Şahin Biyokimya SB','Yavuz Şahin Farmakoloji SB',
              'Levent Kodal Genel Cerrahi SB','Feyyaz Akay Mikrobiyoloji',
              'Klinisyen Vaka Küçük Stajlar','Klinisyen Vaka Fizyoloji',
              'Atilla Uslu Dahiliye 1','Atilla Uslu Dahiliye 2','Atilla Uslu SST',
              'Yavuz Şahin Biyokimya konu','TUSTIME Kadın Doğum konu'}

# ── KİTAP → BRANŞ
BRANS={
 'TUSTIME Mikrobiyoloji':'Mikrobiyoloji','Feyyaz Akay Mikrobiyoloji':'Mikrobiyoloji',
 'TUSTIME Fizyoloji':'Fizyoloji','Klinisyen Vaka Fizyoloji':'Fizyoloji',
 'TUSTIME Küçük Stajlar':'Küçük Stajlar','Klinisyen Vaka Küçük Stajlar':'Küçük Stajlar',
 'Emrullah Patoloji SST':'Patoloji','Anatomi Fast Track':'Anatomi',
 'FT Farmakoloji':'Farmakoloji','Yavuz Şahin Farmakoloji SB':'Farmakoloji',
 'FT Biyokimya':'Biyokimya','Yavuz Şahin Biyokimya konu':'Biyokimya',
 'Yavuz Şahin Biyokimya SB':'Biyokimya',
 'Speetus Genel Cerrahi':'Genel Cerrahi','Levent Kodal Genel Cerrahi SB':'Genel Cerrahi',
 'FT Kadın Doğum':'Kadın Doğum','TUSTIME Kadın Doğum konu':'Kadın Doğum',
 'Klinisyen Vaka Pediatri':'Pediatri',
 'Atilla Uslu Dahiliye 1':'Dahiliye','Atilla Uslu Dahiliye 2':'Dahiliye',
 'Atilla Uslu SST':'Dahiliye',
}

# ── BÖLÜM ADI → TUSANALİZ KONUSU
#    Yalnız EMİN olunan eşleşmeler. Eşleşmeyen bölüm 'soru bilinmiyor' olarak raporlanır.
ESLES={
'Anatomi':{'Kemikler':['Kemikler'],'Eklemler':['Eklemler'],'Kaslar':['Kaslar'],
 'Solunum Sistemi Anatomisi':['Solunum Sistemi'],'Dolaşım Sistemi Anatomisi':['Dolaşım'],
 'Ürogenital Sistem Anatomisi':['Ürogenital'],
 'Sindirim + Endokrin Sistem Anatomisi':['GİS'],
 'Nöroanatomi (Pleksus + MSS + PSS + Duyu + Deri)':['Nöroanatomi']},
'Fizyoloji':{'Hücre Fizyolojisi':['Hücre'],'Sinir Sistemi Fizyolojisi':['Sinir'],
 'Kas Fizyolojisi':['Kas'],'Kardiyovasküler sistem Fizyolojisi':['KVS'],
 'Solunum Sistemi Fizyolojisi':[],'Hematopoetik Sistem Fizyolojisi':['Hemopoetik Sistem'],
 'Gastrointestinal sistem fizyolojisi':['GİS'],'Böbrek Fizyolojisi':['Üriner'],
 'Endokrin Sistem Fizyolojisi':['Endokrin'],'Üreme Fizyolojisi':['Genital sistem ve Genel embriyoloji']},
'Biyokimya':{'Hücre ve organeller':[],'Aminoasitler ve Proteinler':['Aminoasitler ve Proteinler'],
 'Enzimler':[],'Karbonhidratlar':['Karbonhidratlar'],'Lipidler':['Lipitler'],
 'Aminoasitlerin metabolizması':['Metabolizma'],'Nükleotid metabolizması':['Nükleik Asitler'],
 'Vitaminler':['Vitaminler ve Mineraller'],'Hormonlar':['Hormonlar']},
'Farmakoloji':{'Genel Farmakoloji':['Genel farmakoloji'],'Otonom Sinir Sistemi':['Otonom Sinir Sistemi'],
 'Kardiyovasküler sistem':['KVS'],'Hormonlar':['Endokrin'],'Santral Sinir Sistemi':['SSS'],
 'Otakoidler':['Otakoidler'],'NSAİİ':['NSAİİ'],'Gastrointestinal Sistem':['GİS'],
 'Kemoterapötikler':['Kemoterapötikler'],'İmmün Modulatör İlaçlar':[],
 'Hematopoetik sistem':[],'Toksikoloji':['Toksikoloji']},
'Mikrobiyoloji':{'Temel Mikrobiyoloji':['Temel Mikrobiyoloji'],'İmmünoloji':['İmmünoloji'],
 'Bakteriyoloji':['Bakteriyoloji'],'Viroloji':['Viroloji'],'Mikoloji':['Mikoloji'],
 'Tıbbi Parazitoloji':['Parazitoloji'],'Enfeksiyon Hastalıkları':[]},
'Patoloji':{'Hücre Zedelenmesi':['Hücre'],'İnflamasyon':['İnflamasyon'],'Yara İyileşmesi':['Yara iyileşmesi'],
 'İmmünoloji':['İmmün Sistem'],'Hemodinamik Bozukluklar':['Hemodinamik Hastalıklar'],
 'Neoplazi':['Neoplazi'],'Pediatrik ve Çevresel Hastalıklar':[],
 'Kardiyovasküler sistem hastalıkları':['KVS'],'Hematopoetik Sistem hastalıkları':['Hemopoetik sistem'],
 'Solunum Sistem Hastalıkları':['Solunum'],'Üriner Sistem Hastalıkları':['Üriner Sistem'],
 'Erkek Genital Sistem Hastalıkları':['Erkek Genital'],'Kadın Genital Sistem Hastalıkları':['Kadın Genital'],
 'Gastrointestinal sistem hastalıkları':['GİS'],'Karaciğer Hastalıkları':['Hepatobiliyer sistem'],
 'Pankreas Hastalıkları':[],'Meme Hastalıkları':['Meme Hastalıkları'],
 'Sinir sistemi Hastalıkları':['Sinir sistemi'],'Endokrin Sistem Hastalıkları':['Endokrin'],
 'Deri Hastalıkları':['Deri'],'Kas İskelet Sistemi Hastalıkları':['Kas iskelet sistemi']},
'Pediatri':{'Yenidoğan':['Yenidoğan'],'Genetik':['Genetik'],'Büyüme ve Gelişme':['Büyüme ve Gelişme'],
 'Sosyal Pediatri ve Adölesan':[],'Beslenme':['Beslenme'],'Sıvı Elektrolit - Asit Baz Bozuklukları':[],
 'Pediatrik Gastroenteroloji':['Gastroenteroloji','Hepatoloji'],'Pediatrik Nöroloji':['Nöroloji'],
 'Pediatrik Kardiyoloji':['Kardiyoloji'],'Solunum/Çocuk ve Göğüs Hastalıkları':['Göğüs hastalıkları'],
 'Döküntülü Hastalıklar':['Döküntülü hastalıklar'],'Bağışıklama':['Bağışıklama'],
 'Pediatrik İmmünoloji':['İmmünoloji'],'Pediatrik Allerji':['Alerji'],
 'Pediatrik Endokrinoloji':['Endokrinoloji'],'Metabolik Hastalıklar':['Metabolik hastalıklar'],
 'Pediatrik Hematoloji':['Hematoloji'],'Pediatrik Onkoloji':['Onkoloji'],
 'Pediatrik Nefroloji':['Nefroloji'],'Pediatrik Romatoloji':['Romatoloji'],
 'Çocuk Acil ve Yoğun Bakım':['Acil tıp ve zehirlenmeler'],'Zehirlenmeler':[]},
'Kadın Doğum':{'Reproduktif Endokrinoloji':['Endokrinoloji'],'Genel Jinekolojik':['Jinekoloji'],
 'Jinekolojik Onkoloji':['Onkoloji'],'Obstetri':['Obstetri']},
'Dahiliye':{'Hematoloji':['Hematoloji'],'Onkoloji':['Onkoloji'],'Kardiyoloji':['Kardiyoloji'],
 'Göğüs Hastalıkları':['Göğüs Hastalıkları'],'Nefroloji':['Nefroloji'],'Endokrinoloji':['Endokrin'],
 'Gastroenteroloji/Hepatoloji':['Gastroenteroloji','Hepatoloji'],'Romatoloji':['Romatoloji'],
 'Gastroenteroloji':['Gastroenteroloji','Hepatoloji'],'Enfeksiyon Hastalıkları':['Enfeksiyon'],
 'Kısaltmalar ve Normal Lab değerleri':[]},
'Küçük Stajlar':{'Nöroloji':['Nöroloji'],'Nöroşirurji':['Beyin cerrahisi'],'Dermatoloji':['Dermatoloji'],
 'Psikiyatri':['Psikiyatri'],'Göz Hastalıkları':['Göz Hastalıkları'],'Kulak Burun Boğaz':['KBB'],
 'Epidemiyoloji ve Temel İstatistik':['Halk Sağlığı'],'Fizik Tedavi ve Rehabilitasyon':['FTR'],
 'Ortopedi':['Ortopedi'],'Üroloji':['Üroloji'],'Çocuk Cerrahisi':['Çocuk Cerrahisi'],
 'Anestezi':['Anestezi'],'Göğüs Cerrahisi Kalp Damar Cerrahisi':['Göğüs Cerrahisi','Kalp ve Damar cerrahisi'],
 'Acil Tıp':['Acil tıp ve zehirlenmeler'],'Nükleer tıp':['Nükleer tıp']},
'Genel Cerrahi':{'Sıvı Elektrolit Dengesi Asit Baz Bozuklukları':['Sıvı elektrolit ve asit baz'],
 'Beslenme':['Beslenme'],'Travmaya sistemik cevap ve Metabolik Destek':['Travmaya yanıt'],
 'Şok':['Temel Cerrahi'],'Cerrahi Enfeksiyonlar':['Cerrahi enfeksiyonlar'],'Yara İyileşmesi':[],
 'Hemostaz ve Transfüzyon':['Hemostaz ve Transfüzyon'],
 'Travma ve Travma Hastasına yaklaşım':['Travmalı hastaya yaklaşım'],'Yanık':['Yanık'],
 'Meme Hastalıkları ve Cerrahisi':['Meme'],'Tiroid Hastalıkları ve Cerrahisi':['Tiroid'],
 'Paratiroid Hastalıkları ve cerrahisi':['Paratiroid'],'Adrenal bez Hastalıkları ve Cerrahisi':[],
 'Transplantasyon':[],'Akut Karın':[],'Özofagus Hastalıkları ve Cerrahisi':['Özofagus'],
 'Mide Hastalıkları ve Cerrahisi':['Mide'],'Morbid Obezite ve Cerrahisi':[],
 'İnce Bağırsak Hastalıkları ve Cerrahisi':['İnce bağırsak'],
 'Kolon Rektum Hastalıkları ve Cerrahisi':['Kolon ve Rektum'],
 'Apendiks Vermiformis Hastalıkları ve Cerrahisi':[],'Perianal bölge Hastalıkları ve Cerrahisi':[],
 'İntestinal Tıkanıklıklar ve Cerrahisi':[],'Gastrointestinal Sistem Kanamaları ve Cerrahisi':[],
 'Gastrointestinal sistem Fistülleri ve Cerrahisi':[],'Karaciğer hastalıkları ve Cerrahisi':['Karaciğer'],
 'Portal Hipertansiyon ve Cerrahisi':[],'Safra Kesesi - Safra yolları hastalıkları ve cerrahisi':['Safra kesesi'],
 'Pankreas hastalıkları ve cerrahisi':['Pankreas'],'Mezenterik Vasküler Hastalıklar ve Cerrahisi':[],
 'Dalak Hastalıkları ve cerrahisi':['Dalak'],
 'Karın duvarı, periton, retroperiton ve mezenter hastalıkları ve cerrahisi':['Karın duvarı periton ve mezenter'],
 'Karın duvarı fıtıkları ve cerrahisi':['Fıtıklar'],'Cerrahi komplikasyonlar ve tedavisi':[]},
}

# ── 28 Tem'de tamamlanan eşlemeler (kitaba özel bölüm adları)
KITAP_ESLES={
 'Klinisyen Vaka Fizyoloji':{
   'Hücre Histolojisi ve Fizyolojisi':['Hücre'],'Doku Histolojisi ve Fizyolojisi':['Doku'],
   'Kas Dokusu Histoloji ve Fizyolojisi':['Kas'],
   'Genital sistem Histolojisi ve Fizyolojisi':['Genital sistem ve Genel embriyoloji'],
   'Genel Embriyoloji':[],   # yukarıdaki birimle aynı Tusanaliz etiketi — çift sayılmıyor
   'Hematopoetik sistem Histolojisi ve Fizyolojisi':['Hemopoetik Sistem'],
   'Gastrointestinal sistem Histolojisi ve Fizyolojisi':['GİS'],
   'Kardiyovasküler sistem Histolojisi ve Fizyolojisi':['KVS'],
   'Endokrin sistem Histolojisi ve Fizyolojisi':['Endokrin'],
   'Solunum sistemi Histolojisi ve Fizyolojisi':[],   # Fizyoloji'de Solunum etiketi yok
   'Santral sinir sistemi Histolojisi ve Fizyolojisi':['Sinir'],
   'Üriner sistem Histolojisi ve Fizyolojisi':['Üriner']},
 'Feyyaz Akay Mikrobiyoloji':{
   'Genel Mikrobiyoloji (Oldies+Goldies)':['Temel Mikrobiyoloji'],
   'İmmünoloji (Oldies+Goldies)':['İmmünoloji'],
   'Bakteriyoloji (Oldies+Goldies)':['Bakteriyoloji'],
   'Viroloji (Oldies+Goldies)':['Viroloji'],'Mikoloji (Oldies+Goldies)':['Mikoloji'],
   'Parazitoloji (Oldies+Goldies)':['Parazitoloji'],'Genel Tekrar':[],'Kaynakça':[]},
 'Levent Kodal Genel Cerrahi SB':{
   'Şok travma ve temel konular':['Temel Cerrahi'],
   'Sıvı elektrolit, Asit baz bozuklukları':['Sıvı elektrolit ve asit baz'],
   'Tiroid ve Paratiroid hastalıkları':['Tiroid','Paratiroid'],'Meme Hastalıkları':['Meme'],
   'Özofagus Hastalıkları':['Özofagus'],
   'Mide Duodenum hastalıkları, Obezite Cerrahisi':['Mide'],
   'İnce ve Kalın bağırsak hastalıkları':['İnce bağırsak','Kolon ve Rektum'],
   'Safra Kesesi ve Safra yolları hastalıkları':['Safra kesesi'],
   'Pankreas Hastalıkları':['Pankreas'],
   'Karaciğer, Dalak Hastalıkları ve Transplantasyon':['Karaciğer','Dalak'],
   'Karın duvarı fıtıkları':['Fıtıklar']},
 'Klinisyen Vaka Küçük Stajlar':{
   'Nöroloji':['Nöroloji'],'Beyin Cerrahisi':['Beyin cerrahisi'],'Psikiyatri':['Psikiyatri'],
   'Üroloji ve Çocuk Cerrahisi':['Üroloji','Çocuk Cerrahisi'],
   'Kalp ve Damar Cerrahisi':['Kalp ve Damar cerrahisi'],'Göğüs Cerrahisi':['Göğüs Cerrahisi'],
   'Halk Sağlığı':['Halk Sağlığı'],'Radyoloji':['Radyoloji'],'Anestezi':['Anestezi'],
   'Kulak Burun Boğaz Hastalıkları':['KBB'],'Ortopedi':['Ortopedi'],
   'Fizik Tedavi ve Rehabilitasyon':['FTR'],'Plastik Cerrahi':[],
   'Göz Hastalıkları':['Göz Hastalıkları'],'Dermatoloji':['Dermatoloji']},
 'Yavuz Şahin Biyokimya konu':{
   'Karbonhidratlar':['Karbonhidratlar'],'Lipidler':['Lipitler'],
   'Metabolizma Entegrasyonu':['Metabolizma'],'Genom ve Nükleik asitler':['Nükleik Asitler'],
   'Aminoasitler':['Aminoasitler ve Proteinler'],'Proteinler':[],
   'Enzimler ve Klinik Biyokimya':[],'Hücre ve Organeller':[],
   'Vitaminler':['Vitaminler ve Mineraller'],'Hormonlar':['Hormonlar']},
 'Yavuz Şahin Biyokimya SB':{
   'Karbonhidratlar':['Karbonhidratlar'],'Lipidler':['Lipitler'],
   'Metabolizma Entegrasyonu':['Metabolizma'],'Nükleik Asitler ve Genom':['Nükleik Asitler'],
   'Amino Asitler':['Aminoasitler ve Proteinler'],'Proteinler':[],
   'Enzimler ve Klinik Biyokimya':[],'Hücre ve Organeller':[],
   'Vitaminler':['Vitaminler ve Mineraller'],'Hormonlar':['Hormonlar']},
 'Yavuz Şahin Farmakoloji SB':{
   'Genel Farmakoloji':['Genel farmakoloji'],'Otonom Sinir Sistemi':['Otonom Sinir Sistemi'],
   'Kardiyovasküler sistem':['KVS'],'Hormonlar':['Endokrin'],
   'Santral Sinir Sistemi':['SSS'],'Otakoidler ve NSAİİ':['Otakoidler','NSAİİ'],
   'Kemoterapötikler ve İmmunmodülatörler':['Kemoterapötikler'],
   'Diğer Sistem ilaçları':['Solunum','GİS','Toksikoloji']},
}

def etiket(brans,bolum,kitap=None):
    """Bu bölümün karşılık geldiği TUSANALİZ etiketleri — tekilleştirme anahtarı.
    Kitap bölüm adı kitaptan kitaba değişir ('Aminoasitler ve Proteinler' /
    'Aminoasitler' / 'Amino Asitler') ama Tusanaliz etiketi aynıdır."""
    if kitap and kitap in KITAP_ESLES:
        k=KITAP_ESLES[kitap].get(bolum)
        return tuple(sorted(k)) if k else (('__',bolum) if k is None else ())
    d=ESLES.get(brans)
    if not isinstance(d,dict): return ('__',bolum)
    k=d.get(bolum)
    return tuple(sorted(k)) if k else (('__',bolum) if k is None else ())

def soru(brans,bolum,kitap=None):
    if kitap and kitap in KITAP_ESLES:
        k=KITAP_ESLES[kitap].get(bolum)
        if k is None: return None
        if not k: return 0.0
        t=0.0
        for a in k:
            v=HAM.get(brans,{}).get(a)
            if v is None: return None
            t+=ort(v)
        return t
    return _soru(brans,bolum)

def _soru(brans,bolum):
    d=ESLES.get(brans)
    if not isinstance(d,dict): return None
    k=d.get(bolum)
    if k is None: return None          # eşleşme tanımlanmamış
    if not k: return 0.0               # bilerek eşleşmesiz (Tusanaliz'de karşılığı yok)
    t=0.0
    for a in k:
        v=HAM.get(brans,{}).get(a)
        if v is None: return None
        t+=ort(v)
    return t

def katalog():
    out=[]
    AR=getattr(EN,'ARALIK',{})
    for kit,(tot,bl) in EN.KITAP.items():
        br=BRANS.get(kit); hz=HIZ.get(kit)
        if not br or not hz: continue
        for ad,a,b in bl:
            ar=AR.get((kit,ad))
            sf=sum(y-x for x,y in ar) if ar else b-a
            if sf<=0: continue
            q=soru(br,ad,kit)
            sa=sf/hz
            out.append({'kitap':kit,'brans':br,'bolum':ad,'sf':(a,b),'aralik':ar,'sayfa':sf,
                        'saat':sa,'soru':q,
                        'net':None if q is None else q*KALIB,
                        'verim':None if q is None else (q*KALIB)/sa,
                        'etiket':etiket(br,ad,kit),
                        'varsayim':kit in VARSAYIM_HIZ})
    return out

if __name__=='__main__':
    K=katalog()
    bilinen=[x for x in K if x['verim'] is not None]
    yok=[x for x in K if x['verim'] is None]
    print('KATALOG: %d bölüm · %d soru verisi eşleşti · %d eşleşmedi'%(len(K),len(bilinen),len(yok)))
    print('toplam okuma yükü: %.1f saat · beklenen net: %.2f'%(
        sum(x['saat'] for x in K), sum(x['net'] for x in bilinen)))
    print()
    print('EN VERİMLİ 25 BÖLÜM (net/saat)')
    print('%-26s %-40s %5s %6s %6s %7s'%('KİTAP','BÖLÜM','sf','saat','soru','net/sa'))
    for x in sorted(bilinen,key=lambda z:-z['verim'])[:25]:
        print('%-26s %-40s %5d %6.2f %6.2f %7.3f%s'%(x['kitap'][:26],x['bolum'][:40],
              x['sayfa'],x['saat'],x['soru'],x['verim'],' ~' if x['varsayim'] else ''))
    print()
    print('EN VERİMSİZ 15 BÖLÜM')
    for x in sorted(bilinen,key=lambda z:z['verim'])[:15]:
        print('%-26s %-40s %5d %6.2f %6.2f %7.3f'%(x['kitap'][:26],x['bolum'][:40],
              x['sayfa'],x['saat'],x['soru'],x['verim']))
    print()
    print('SORU VERİSİ EŞLEŞMEYEN %d BÖLÜM'%len(yok))
    for x in yok[:20]: print('   %-26s %s'%(x['kitap'][:26],x['bolum'][:46]))
    print()
    print('~ = okuma hızı varsayım, doğrulanmalı')
