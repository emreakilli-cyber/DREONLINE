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
- Tur sonu **on dört kapı**: `kural_test.py` · `denet.py` · `kos.js` · `derin_test.js` ·
  `kombo_test.js` · `cark_test.js` · `mola_test.js` · `pu_test.js` · `kal_test.js` ·
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

## Güncel durum işaretçisi (sürüm `2027-02-08a`, DEVIR sonundaki devir notu)

- FT serisi 10 kitap power-up havuzuna işlendi (156 → 254 konu); konu tekilliği /
  net havuzu paylaşımı grup bazlı anahtarla tamamlandı (§219–§228).
- **YARIM KALAN · TASARIM:** power-up paneli, matris ve seyir sayfalarının görsel
  tasarımı (beğenilen referans: `.glAnh` altın gradyan anahtar, `.glS` satır düzeni,
  §217 daire tamamlama düğmesi).
- Bilinen açık noktalar: FT Geriatri 0.51 soru (kullanıcı onaylı varsayım) ·
  D_ORAN ±0.57 belirsizliği · potansiyel-gerçek ~0.42 net farkı (bilinçli muhafazakâr,
  §205) · yinelenen deneme kaydı denetimsiz (bilinçli).
- Geçmiş oturumların süreç analizi ve otomasyon/düzeltme adayları: `icgoru.md`.
