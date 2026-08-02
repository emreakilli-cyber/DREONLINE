# EVREN PLANI · TUS Bilgi Evreni (goal + DEVIR §235/§239)

> ⚠ **3D PİVOT (§244):** Bu plandaki 2D SVG sahne yaklaşımı kullanıcı
> tarafından reddedildi. Sahne artık saf WebGL raymarch gezegen (gerçek
> kamera, GPU-pick). Aşağıdaki kozmik eşleme ve veri kuralları GEÇERLİ;
> aşama 2+ (kitap katmanı, DRE menüsü, deneme uydusu) dikey dilimin
> kullanıcı onayına kilitli — onaysız eklenmez.

Amaç: klasik dashboard değil, YAŞAYAN BİLGİ EVRENİ — tek kamera, fetih
metaforu, her görsel gerçek veriye bağlı. Veri kaybı / çalışan özellik
bozulması KABUL EDİLEMEZ.

## 1 · Mevcut mimari (özet · doğrulanmış)
Tek dosya PWA `index.html` (~690KB): tüm durum `localStorage.D`
(`rota-veri`), gist senkronu (`Senk`), servis işçisi ağ-öncelikli.
Sayfalar: ROTA (çark+gün listesi), SEYİR, ÖLÇÜM; 4 panel (k/d/p/b).
Karşılama katmanı + maskot Dre + katmanKur scroll-reveal (§236) mevcut.

## 2 · Mevcut veri modeli (özet · doğrulanmış semboller)
- Görevler: `GOREVLER[]` (d,b,t,br,k,src,sure,act,soru,why,tag) · `D.bitti`
- Power-up: `POWERUP[]` + `D.pu` (kitap+konu anahtarlı, §228 grup kuralı)
- Konu hiyerarşisi: `KONU_DAG[branş][konu]=TUS payı`; kitap içi bölümler
  kaynak haritası verisinde (khP panelleri) ve katalog (kaynak/)
- Denemeler: `D.denemeler[]` (t,k,bn,dy, `sorular[]` ayrıntılı+güven)
- Hâkimiyet: `bransDurum()` (olc/bek/proj) · `konuCalisildi()` ·
  `bransCalisma()` saat · `dqIstat()` sağlam/kırılgan + boşluk
- Çürüme: `curume(br,tar)` · `puTekrarGun` · Kural E taban çürümesi
- Öneri: `karsiOner()` (telafi>plan>power-up) · `puSirali()` (boşluk ağırlıklı)
→ GEREKEN HER VERİ MEVCUT. Yeni model YOK; yalnız türetme adaptörü.

## 3 · Kozmik eşleme (metafor ↔ veri)
- Gezegen bölgeleri = 11 branş (`RB`) · alt-bölgeler = `KONU_DAG` konuları
- Kitap katmanı = kaynak haritası kitapları (bölge→kitap→bölüm→sayfa)
- Hâkimiyet görseli = `bransDurum().olc` & konu kapsaması (0-1 → karanlık
  →ışık→yaşam→fetih; eşikler sürekli fonksiyon, §135 dersi: kademe YOK)
- Çürüme görseli = `curume()` çıktısı (ışık sönmesi/sis; cezalandırmaz)
- Kara delik = kör nokta + kırılgan + tekrarlanan yanlış (dqIstat)
- Deneme = bölge parlama/kararma delta'sı (`denemeSapma`, bn farkları)
- DRE menüsü = mevcut karsiOner + trendCiz + tamamlananlar; YENİ İÇERİK
  ÜRETMEZ, sayfa bilgisi katalogdan gelir (uydurma sayfa YASAK)

## 4 · Kamera modeli
Tek durum makinesi: `uzay → gezegen → bölge(branş) → kitap → bölüm/konu
→ sayfa` ve `uzay → özellik-dünyası(ÖLÇÜM/SEYİR yüzeyleri)`.
Uygulama: tek `#evren` katmanı, transform(scale+translate)-only animasyon;
mevcut sayfalar İLK AŞAMADA kameranın "indiği" yüzeyler (yeniden yazım yok).
Geri = aynı dünyadan uzaklaşma. Pinch/wheel mevcut gunKip altyapısından.

## 5 · Aşamalar
0. ✔ Veri omurgası: `evrenVeri()` adaptörü (bu tur · §240)
1. Gezegen kuş bakışı (SVG bölge haritası, hâkimiyet boyama) + bölgeye zoom
2. Bölge→kitap→içindekiler (mevcut kitap sekmesi verisi kamera altına)
3. DRE menüsü (yıldız→seçenek morph) + karsiOner kamera sürüşü
4. Çürüme/yaşam animasyonları · deneme delta parlamaları
5. Kara delikler · galaksi (deneme geçmişi) · sayfa düzeyi
Her aşama: kapılar + gerçek tarayıcı + cihaz onayı; SURUM çifti birlikte.

## 6 · Performans
LOD: zoom'a göre detay; görünmeyen render edilmez; DOM yıkıp kurma YOK
(§103); transform/opacity-only; rAF tek döngü; uzak=özet yakın=detay.

## 7 · Riskler & geri dönüş
- Tek dosya büyümesi → aşama başına bayt bütçesi, ölü kod temizliği
- Çark/liste regresyonu → evren AYRI katman, mevcut yüzeyler korunur;
  her aşama ayrı PR = tek adımda geri alınabilir
- Metafor zorlaması → kural: veri karşılığı yoksa metafor EKLENMEZ
