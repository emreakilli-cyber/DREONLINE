# CLAUDE.md — TUS Hazırlık · "Rota" (DREONLINE)

Çalışma dili Türkçe'dir; tüm belgeler, commit mesajları ve raporlar Türkçe yazılır.
Cevaplarda abartı yok, kendini övme yok — ne yapıldığı ve ne bulunamadığı sade yazılır.

## Proje nedir

- Tek dosyalık, çevrimdışı çalışan bir PWA: `index.html` (tüm CSS + JS + görev verisi
  gömülü, ~620 KB) + `sw.js` (önbellek) + `manifest.webmanifest`.
- Kullanıcının 23 Ağustos 2026 TUS sınavı için gün-gün çalışma programını yürütür:
  çark arayüzü (ROTA), takvim/kaynak haritası (SEYİR), deneme-puan-kalibrasyon modeli
  (ÖLÇÜM), cihazlar arası gist senkronu.
- Sunucu yok; tüm durum `localStorage`'da (`rota-veri`, `rota-senk`).

## Hafıza ve doğruluk kaynakları (önce bunu oku)

1. **`DEVIR.md`** projenin oturum-oturum hafızasıdır (228+ tur kaydı). Yeni oturumda
   önce şunları oku: **§0** (çalışma ilkeleri) · **§0f** (kabul edilmiş ödünler) ·
   **§0h** (kırılgan noktalar) · ve **dosyanın EN SONU** ("⚠ DEVİR NOTU · KALDIĞIM YER"
   + "Bilinen açık noktalar").
2. ⚠ DEVIR'in baş bölümlerindeki durum bilgisi eskimiş olabilir (§0b bir dönem 7 ay
   geride kaldı). "Çalışan sürüm" gibi bilgileri belgeden değil **koddan** oku:
   `index.html` içindeki `SURUM=`, `sw.js` içindeki `rota-` önekli `SURUM`.
3. Üretim boru hattı ve test bataryası **`kaynak/` klasöründedir** (`uret.py`,
   `denet.py`, `kural_test.py`, `derin_ortam.js`, testler, `secim_v*.json`…).
   Bu klasör repoda yoksa: tam sistem **`tus_tamami.tar.gz` devir paketi** olarak
   taşınıyor — kullanıcıdan iste; dosyaları bağlamdan/ezberden yeniden KURMA
   (bir kez yapıldı ve riskliydi, DEVIR §30).
4. Repo (GitHub Pages) bir **dağıtım hedefidir**; kullanıcı dosyaları çoğunlukla
   GitHub web arayüzünden elle yükler. Yerel git ritüeli varsayma.

## Değişmez kurallar (kullanıcının açık talebi — yeniden tartışma)

- **Tahmin yok.** Her sayının kaynağı gösterilir: ölçüm mü, kullanıcı beyanı mı,
  varsayım mı — açıkça etiketle. Varsayımsa doğrulama yolu öner; kullanıcı onayı
  almadan karar girdisi yapma.
- **Kullanıcının vermediği kuralı kural sanma.** İki kez oldu ("bölüm başına 3 oturum",
  "Salı kuralı") ve sahte denetim bulguları üretti (§25, §27). Terimleri teyit et —
  "24'lü deneme"nin yanlış anlaşılması koca bir kalibrasyon analizini çöpe götürdü (§91).
- **Mirası doğrulamadan kabul etme.** "Önceki oturumda öyle yazılmış" gerekçe değildir;
  iki oturum bağımsız olarak aynı yanlışa vardı (§12.12).
- **Kendi hatalarını her turda aktif ara ve bildir** ("bu turda yaptığım hatalar"
  bölümü). Kullanıcı bunu her turda istiyor ve ciddi bir taleptir.
- Karar gerektiren yerde iki seçeneğin sayısını yan yana koy, öner; **kararı kullanıcı verir**.
- §0f'teki ödünleri ve gerekçeli reddedilmiş kaynakları (§8) yeniden açma.
- Erişim anahtarı (PAT) asla koda gömülmez — gerekçeli ret DEVIR §33'te.
- **Tek dosya mimarisi bilinçlidir** (çevrimdışı + elle dağıtım; ikonlar bile gömülü,
  §157). "Dosyayı parçalayalım" önerme.
- Turu kapatırken DEVIR.md'ye devir bölümü yaz: yapılan, yapılamayan, hatalar,
  açık maddeler, `sürüm ↔ rota` etiketi.

## Sürüm ve dağıtım

- `index.html` `SURUM='YYYY-AA-GGx'` ↔ `sw.js` `SURUM='rota-YYYY-AA-GGx'`
  **birebir eşleşmek zorunda**; her yayında ikisi birlikte ilerletilir. Eşleşmezse
  servis çalışanı bayat sürüm sunar. (Etiket tur sayacıdır, gerçek takvimle bağı yok.)
- Yayın dosya listesi: `index.html` + `sw.js` (+ değiştiyse manifest/ikon).
- Dosya adları büyük/küçük harfe duyarlı yayınlanır: `icon-192.PNG` ≠ `icon-192.png`.
  Manifest referanslarını gerçek dosya adlarıyla birebir doğrula (bir 404 fiilen yaşandı).
- iOS'ta ikon değişikliği, ana ekran kısayolunun silinip yeniden eklenmesini gerektirir.

## Üretim boru hattı ve kapılar (`kaynak/`)

- Üretim sırası: `dizi3.py` → `yeniden.py` → `uret.py` (kural testi otomatik koşar)
  → `denet.py` → `kos.js`. FT/power-up tarafı: `ft_katalog.py` (tek kaynak) → `ft_uret.py`.
- Tur sonu **on dokuz kapı**: `kural_test.py` · `denet.py` · `kos.js` · `derin_test.js` ·
  `kombo_test.js` · `cark_test.js` · `mola_test.js` · `pu_test.js` · `kal_test.js` ·
  `dom_test.js` · `olcek_test.js` · `analiz_test.js` · `gercek_akis_test.js` · `ust_test.js` ·
  `senk_kos/poll/etag/uc/rol.js`. Hepsi koşulur, **çıktının tamamı okunur**.
- ⚠ **Kapı geçmek "hata yok" demek değildir** — kapılar kendi yazdığın kontrollerdir
  (§87'de kapılar temizken 4 gerçek hata bulundu). Belgeyi de denetlemezler (§12.10).
- ⚠ Kapılar **görsel/yerleşim regresyonlarını görmez**; test ortamının DOM taklidi
  sınırlıdır (`derin_ortam.js`). Görsel değişiklik gerçek tarayıcıda/cihazda
  doğrulanmadan "düzeldi" denmez. Ekran kaydından kare-farkı analizi (§141) en kesin
  yöntemdi — görsel sıçrama şüphesinde onu kullan.
- Test beklentilerinde sabit değerler var (görev sayısı, projeksiyon, tarihler —
  §0h tablosu). Yapısal değişiklikten sonra güncellenmeleri gerekir; "test kırıldı"
  her zaman "uygulama bozuk" demek değildir, eskimiş iddia olabilir.
- Sıkı kısıtlı yerleşimde **nokta müdahalesi çalışmaz** (6 kez denendi, hep kırıldı,
  §77 "üçüncü kez aynı örüntü"). Doğru yol: kısıtı algoritmaya ekleyip boru hattını
  baştan koşturmak.

## Yasak / zorunlu komut kalıpları (hepsi yaşanmış kazalardan)

- Boru hattı betiklerini **asla** çıktısı kesilerek koşturma (`| head`, `| tail`):
  SIGPIPE `json.dump`'ı öldürür, dosya yazılmaz; `tail -1` hatayı gizler.
  Üç kez yaşandı (§29, §42, §68).
- **Geniş aralık silme yapma**; her bloğu kendi imzasıyla değiştir. Bir kez iki işaret
  arası silinirken 12 862 karakter ilgisiz CSS gitti (§101).
- Her dosya düzenlemesinden sonra hedef dizgiyi **`grep` ile doğrula** — düzenleme
  sessizce başarısız olabilir ve testler bunu saklayabilir (§127).
- **Yeni CSS sınıfı eklemeden önce adı `grep`'le ara**; kısa adlar iki kez çakıştı
  (`.kd` §106, `.molaK` §137).
- Regex ile CSS silerken kalan `}` bırakma: tek başıboş `}` o noktadan sonraki tüm
  stili geçersiz kıldı ve 4 tur yanlış yerde arandı (§108). CSS bütünlük kontrolü koş.
- Aynı verinin sürümlü dosyaları (`secim_vN`, `gun_vN`) arasında kopyalama yaparken
  yönü iki kez kontrol et — eski dosya yeninin üstüne kopyalanınca bir tur kaybedildi (§69).

## Mühendislik dersleri (tekrar edilmesin)

- **Bayat ölçüm:** CSS geçişi sürerken ölçme; düzenin oturmasını bekle, gerekiyorsa
  her karede yeniden ölç ya da değeri doğrudan CSS'ten türet (7+ tur: §120–122, §127,
  §139, §146, §148, §158).
- **Tahmin değil ölçüm:** "varsayılan yükseklik/sihirli sabit" üç kez yanılttı;
  `getBoundingClientRect`/`scrollHeight` kullan (§102, §127, §130).
- **Ayrık eşik yerine sürekli fonksiyon:** kademe/sabit istisna görsel sıçrama üretir;
  tek kaynaktan (merkeze uzaklık) sürekli değer türet (6 tur: §135–§158).
- Aynı özelliği **iki mekanizma aynı anda sürmesin** (JS her karede yazarken CSS
  transition da çalışmasın — §135, §142).
- **Donmuş değer:** türetilmiş değerleri planlama anında dondurma; gösterim anında
  hesapla ya da önbellek anahtarı tüm girdileri kapsasın (5 tur: §72–§85).
- **Veri anahtarları:** konu adı tek başına anahtar olmaz — `kitap+konu` / grup bazlı
  anahtar kullan (§154, §228). "Sessiz sıfır" tuzağına dikkat: eşleşmeyen ad exception
  atmaz, 0 döner ve hata görünmez (§153, §155 aynı aile).
- **Tek doğruluk kaynağı:** bölüm sınırları `envanter.py`; FT tarafı `ft_katalog.py`.
  İkiz kaynak çarpışması dört kez hata çıkardı (§43, §58, §67, §88).
- Bir düzeltmeyi uygularken **tüm varyantları ve kopyaları tara** (mola/power-up/telafi
  varyantı atlanınca §112'nin düzeltmesi §117'ye kadar eksik kaldı; aynı kusur dört
  panelde birden vardı §151).

## Güncel durum işaretçisi (sürüm `2027-02-19j`, DEVIR sonundaki devir notu)

- FT serisi 10 kitap power-up havuzuna işlendi (156 → 254 konu); konu tekilliği /
  net havuzu paylaşımı grup bazlı anahtarla tamamlandı (§219–§228).
- **§280–§282 TTS + refleks:** 8 kitap TTS içeriği · "başka kaynaktan" rozeti
  (video↔konu kitabı↔power-up tek tik) · konu-kök bazlı decay (9/9 kapsama).
- **§283 KAMERA İLE DENEME · Aşama 1:** kitapçık fotoğrafından ayrıntılı deneme
  girişi — sabit numara→ders eşlemesi, el yazısı D/Y/B + E/B/AK/U + konu okuma,
  200→D.denemeler / 24'lü→D.kal. Okuma motoru **kullanıcının Anthropic anahtarıyla
  tarayıcıdan doğrudan Claude görüşü** (anahtar `rota-gorus` yerel deposunda, gist'e
  senkronlanmaz, koda gömülü değil). Gerçek fotoğraf doğruluğu kullanıcıda denenecek.
- **§284 · ölü tamamlama dairesi düzeltildi.** Gün listesini yeniden kuran yedi
  koddan biri `glBagla()` atlıyordu → ‹ › ile gün değişince daireler bağsız kalıp
  tıklama kullanıcıyı çarka ışınlıyordu. Artık tek yol: `glKur()` + düğme korumalı
  `glSatirBagla()`. Power-up paneline de "başka kaynaktan" rozeti eklendi.
  **Yeni kapı `kaynak/dom_test.js`** — gerçek Chromium'da gerçek dokunma; harness
  (`derin_ortam.js`) olay bağlamayı GÖREMEZ, bu sınıf kusur ondan kaçıyordu.
- **§285–§289 · Gemini + analiz akışı.** Fotoğraf okuma **Google Gemini**'ye taşındı
  (varsayılan `gemini-flash-lite-latest`; ⚠ `gemini-2.5-flash-lite` EMEKLİ). API biçimi
  resmî Discovery şeması + cookbook'tan alındı, CORS canlı ölçüldü. Cevap anahtarı
  fotoğrafından çözüm **okunuyor** (üretilmiyor); düşük güvenli eşleşme kaydedilmez,
  gözden geçirme kuyruğuna düşer. Ders/konu zayıflık özeti mevcut `b/konu/s/e` şeması
  üzerine kuruldu. 4 sayfalık kaydırmalı akış (`akisAc`), tamamı akışkan/responsive.
  ⚠ **Görseller `D`'ye YAZILMAZ** — `Senk` `denemeler`i olduğu gibi gist'e yolluyor;
  görseller `GorselDepo` (IndexedDB, senkron dışı) içinde, çözüm metni D'de.
- **§290 · projeksiyon gerçeğe çekildi.** Kazanç anahtarı kök bazlı (`konuKok`),
  video ≡ kitap tek kaynak kökü (`kaynakKok`/`KAYNAK_ESL`), konu tavanı (`_khT`),
  parça böleni `gorevParca` (⚠ `g.sira[1]` parça sayısı DEĞİL, blok iş sayısı),
  power-up kazancı zaten çalışılmış konuda TEKRAR sayılıyor. Etki iki yönlü.
- **§291–§292 · çarkın merkezini tutup SAĞA kaydır → deneme analizi** (her iki
  görünümde). Analiz hazır olunca üstten bildirim YOK; çark ritmik dürtüyor
  (`#cark.durt`), `D.analizBekliyor` ile kalıcı, senkron dışı.
- **§293 · gerçek fotoğraflar üç varsayımı çürüttü.** D/Y/B soru numarasının altında
  değil **sol kenarda** (Y kırmızı); konuyu kullanıcı **zaten elle yazıyor**. Cevap
  anahtarı "Doğru cevap: (X)", tablolar "Tablo (Soru N)" etiketli. En önemlisi:
  sonuç artık el yazısından değil **daireli şık ↔ anahtar karşılaştırmasından**
  türetiliyor (`sonucHesapla`); çelişki `sCakisma`'da saklanıyor. EXIF sorun
  çıkarmadı (ölçüldü: tarayıcı otomatik döndürüyor).
- **§294 · analiz filtreleri.** Sayfa 0'da etiket+ders çip filtresi · sayfa 2'de bar
  artık BAŞARI oranı (en zayıf ders en üstte, en boş, en kırmızı) ve ders satırı
  tıklanınca o dersin haritası açılıyor (geri oku) · sayfa 3'te ders filtresi +
  "etiket etiket grupla" (ikisi birlikte çalışır).
- **§295–§298 · ilk gerçek okuma denemesi "load failed" verdi.** İstek gidiyor,
  yanıt dönmüyordu (Gemini panelinde RPM hareketi vardı). Ölçüm: 1568 px foto ≈
  500 KB base64, üç sayfa tek istekte ≈ 1.5 MB. Çözüm: `GORUS_PARTI=2` ikişerli
  partiler · `GORUS_ZAMAN` + `AbortController` · bir kez otomatik yeniden deneme ·
  `wakeLock` · hata metni sebebi (telefonun uyuması) doğru söylüyor.
  §296 ayarlar menüsü **yeniden katlanabilir** (`<details id="dpAyarDet">`), ama
  anahtar yokken açık geliyor ve özette "anahtar gerekli/tanımlı" yazıyor —
  §294'ün daima-açık kutusu kullanıcı isteğiyle geri alındı.
  §297 okuma sonunda eksik E/AK/B/U kodları soru soru soruluyor.
  §298 okuma sonrası özet: soru numarası aralığı + dersler + "kısmi yükleme"
  bildirimi + "önce cevap anahtarı ekle" seçeneği.
- **§299 · 75 fotoğraf / 375 MB ölçeği.** Kullanıcı denemenin tamamını + anahtarı
  çekti. Ölçüldü: 75 foto = 556 MB data URL, 38 istek. Eski yol hepsini birden
  bellekte tutup tek hatada her şeyi çöpe atıyordu. Artık **`fotoKaynak` tembel**
  (foto sırası gelince okunur, orijinal hemen bırakılır — heap artışı 15 MB),
  **`gorusAkis` kısmi başarı** döndürür (`{sorular, basarisiz[]}`), 429 geçici
  sayılır, okunamayan gruplar sayfa numarasıyla bildirilip **yalnız onlar** tekrar
  denenir. Karışık yığında cevap anahtarı sayfaları `sayfaTur:"anahtar"` ile
  ayrılır. ⚠ Parti-içi foto numarası genel sıraya çevrilir — eskiden kırpma
  ikinci partiden sonra yanlış fotoğrafa bakıyordu. Kapı: `kaynak/olcek_test.js`.
- **§300 · ilk gerçek kullanımın üç kusuru.** (a) "İncele ve kaydet" kartı
  `#atKart`'a çiziliyordu, o da `#atlasKat` İÇİNDE — katman kapalıyken 0×0,
  görünmüyordu; artık panelin içinde (`#dpIncele`, `OMR_DURUM.hedef`).
  (b) `#cark{touch-action:pan-x}` yüzünden sağa kaydırma gerçek dokunuşta
  ölüyordu (tarayıcı `touchcancel` gönderiyor) → `none`. **Fare ile test etmek
  dokunma hareketini doğrulamaz.** (c) Yeşil "analiz hazır" bildirimi hiç
  üretilmemişti → `#carkAnaliz` çarkın iç bükey alanını dolduruyor, hem dokunma
  hem sağa kaydırma açıyor. Ayrıca 200↔24 kip değişimi okunan sonucu siliyordu.
  Kapı: `kaynak/analiz_test.js`.
- **Gerçek cevap anahtarı sayfaları:** telefonla YAN çekiliyor (metin 90° dönük),
  bir karede İKİ sayfa, etiketler `Tablo (Soru N)` **ve** `Şekil (Soru N)`,
  soru kutusunda gömülü etiketsiz görseller (mikroskop/radyoloji), cilt
  kıvrımında kesik sütunlar → istem "tamamlama, `[…]` ile işaretle" diyor.
- **§301 · ilk gerçek tam tur (15 soru + 34 anahtar sayfası).** İlk gerçek zamanlama:
  8 istek ≈ 1.5–2 dk, 17 istek ≈ 3 dk (kullanıcı beyanı). Beş kusur: (a) kod kuyruğu
  her çizimde listeyi yeniden hesaplayıp **her ikinci soruyu atlıyordu** (68→34);
  (b) `if(!coz)return` çözüm metni boş gelen kayıtları atıyordu — oysa D/Y için
  gereken **doğru şık**; üstelik "0 kaydedildi + hepsi net eşleşti" çelişkisi vardı;
  (c) **kısmi tarama soru kırılımını hiç saklamıyordu** → cevap anahtarı bağlanamıyor,
  analizde görünmüyordu; artık `kismi:true` ile `D.denemeler`'e de yazılıyor ve
  `sirali()` bunları eliyor (net/parakete etkilenmez); (d) yeşil bildirim kaydırınca
  kendisi de kayıyordu → dolgu sabit, etiket kayıyor, alt katman `carkSolukla` ile
  soluklaşıyor; (e) kalan süre ortalama yerine **ortanca** ile hesaplanıyor.
  İstem: güven kodu **iki konumda** aranıyor (sol kenarda D/Y/B'nin ALTI · şıkların
  sağı) ve **eğik el yazısı** uyarısı eklendi — ⚠ gerçek fotoğrafla doğrulanmadı.
  Kapı: `kaynak/gercek_akis_test.js`.
- **§302 · AI Studio panosu (gerçek).** Hesap **Free tier** — tüketicideki Gemini
  Pro aboneliği **API kotasına yansımıyor** (açık nokta kapandı). Turda başarı
  %100, hiç hata/429 yok → dayanıklılık makinesi gerçekte hiç tetiklenmedi.
  `gemini-flash-lite-latest` şu an **Gemini 3.5 Flash Lite**'a çözümleniyor.
  Ölçülen israf: 131 soruluk kök listesi 17 anahtar isteğinde ~53K token
  tutuyordu → `KOK_SINIR=60` üstünde kökler düşürülüyor, %62 kısalma
  (15 750 → 6 028 karakter), ~41K token tasarruf. ⚠ Ödün: uzun listede model
  eşleşme güvenini yalnız numaraya dayıyor.
- **§303 · üst panel yeniden tasarlandı (yarım kalan iş kapandı).** Üç okuma kutusu
  tek cam şeride girdi; bantlar (sayaç|ritim) · (orb'lar|nav) · ölçü şeridi, ≥760 px'te
  iki bant. PARAKETE en büyük tipografi. Ölçek `clamp()` ile sürekli, yükseklik ekseni
  `min(vw,vh)` ile katıldı. **HTML ve JS değişmedi** — `.ok{display:contents}` sayesinde
  tüm id'ler ve `.ok.tkl.gor` anahtarı aynen çalışıyor. Ölçülen: taşma sıfır,
  panel 163→131 px (320'de %23→%19), 834'te 159→139 px. Yol boyunca üç kusur daha:
  dokunma hedefi 28 px'e düşmüştü · nav "tamamlandı" düğmesine biniyordu ·
  "tamamlanan" rozeti HİÇ görünmüyormuş (`.gor` eklenmiyordu, §303 öncesinden).
  ⚠ `overflow-x:clip` taşmayı gizlediği için hiçbir kapı yakalamamıştı.
  Kapı: `kaynak/ust_test.js`; `cark_test.js`'te 15 bayat iddia güncellendi.
- **YARIM KALAN · TASARIM:** power-up paneli, matris ve seyir sayfalarının görsel
  tasarımı (beğenilen referans: `.glAnh` altın gradyan anahtar, `.glS` satır düzeni,
  §217 daire tamamlama düğmesi).
- ⚠ **Gerçek API hiç çağrılmadı.** Bir isteğin kaç saniye sürdüğü bilinmiyor;
  38 isteğin toplam süresi hakkında sayı verilmemeli. §285–§298 kanıtı tamamen sahte `fetch` ve elle
  okunmuş yer gerçeği üzerinden. Sıradaki iş: kullanıcı anahtarı yenileyip gerçek
  okuma denesin, istem doğruluğu gerçek çıktıya göre ayarlansın.
- Bilinen açık noktalar: FT Geriatri 0.51 soru (kullanıcı onaylı varsayım) ·
  D_ORAN ±0.57 belirsizliği · potansiyel-gerçek ~0.42 net farkı (bilinçli muhafazakâr,
  §205) · yinelenen deneme kaydı denetimsiz (bilinçli) · Fizyoloji/Histo aralığı
  kullanıcı beyanı ≠ SORU.den (net grubu ortak, etkisiz) · `kural_test.py` ve
  `kos.js` koşmuyor (`eko.py` / `tam_test.js` repoda yok).
- Geçmiş oturumların süreç analizi ve otomasyon/düzeltme adayları: `icgoru.md`.
