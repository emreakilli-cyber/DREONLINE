# İÇGÖRÜ · Geçmiş Oturum Analizi — TUS Hazırlık (DREONLINE)

**Tarih:** 1 Ağustos 2026 · **Kapsam:** yalnız bu çalışma dizininin geçmiş Claude Code oturumları
**Nitelik:** yalnız teşhis — bu belgede hiçbir öneri uygulanmamıştır.

## Yöntem ve veri kaynakları

Bu uzak (remote) oturum taze bir container'da açıldı; geçmiş oturumların ham `.jsonl`
transcript'leri bu makinede mevcut değil (yerelde tek transcript şu anki oturuma ait).
Geçmiş oturumların en güvenilir izleri şunlardı ve analiz bunlar üzerinden yapıldı:

1. **`DEVIR.md`** — 7 766 satır, **158 numaralı oturum/tur kaydı** (§0–§158). Her `##` bölümü
   bir çalışma turudur; "bu turda yaptığım hatalar", "⚠" işaretli kök sebep analizleri ve tur
   sonu "kapı" denetimleri içerir. Fiilen oturum transcript'lerinin damıtılmış hâlidir.
2. **Repo artefaktları** — `index.html` (583 KB), `sablon_v23.html`, `cark_test.js`, `sw.js`,
   ikon/manifest dosyaları.
3. **Git geçmişi** — 33 commit (27 Tem – 1 Ağu), 31'i "Add files via upload".

Beş sub-agent DEVIR.md'yi bölge bölge taradı (§0–33, §34–70, §71–102, §103–131, §132–158),
altıncısı repo arkeolojisi yaptı. Aşağıdaki kümeler bu ~120 sinyalin birleştirilmiş hâlidir.

---

## Karar özeti

| # | Küme | Karar |
|---|------|-------|
| 1 | Görsel doğrulama boşluğu (kanıt = kullanıcı ekran görüntüsü) | **YENİ SKILL/OTOMASYON** |
| 2 | Elle dağıtım ritüeli (GitHub web upload + elle sürüm eşitleme) | **YENİ SKILL/OTOMASYON** |
| 3 | Proje ilkelerinin oturuma otomatik yüklenmemesi (CLAUDE.md yok) | **DÜZELTME** |
| 4 | Üretim boru hattının buharlaşması (repo = dağıtım hedefi, kaynak deposu değil) | **DÜZELTME** |
| 5 | "Kapılar yeşil, hata sürüyor" — denetim bataryasının sahte güveni | **YENİ SKILL/OTOMASYON** |
| 6 | Veri bütünlüğü hata sınıfı (çift sayım, ikiz doğruluk kaynağı, donmuş değer) | **DÜZELTME + OTOMASYON** |
| 7 | Tek dosyalık dev index.html'in hata sınıfları | **DÜZELTME (kısmi)** |
| 8 | Varsayım/kavram kayması (hayali kural, yanlış anlaşılan terim) | **YENİ SKILL** (Küme 3 ile birlikte) |
| 9 | Kayıtlı ama kapatılmamış açık maddeler | **DÜZELTME (liste aşağıda)** |
| 10 | Yerleşim/seçim motorunun tekrar tekrar sıfırdan kurulması | **HİÇBİR ŞEY** |
| 11 | Model yeniden kurulumları ve K projeksiyonunun sürekli düşmesi | **HİÇBİR ŞEY** |
| 12 | UI "bayat ölçüm / ayrık değer" ders kalıpları | **HİÇBİR ŞEY** (yalnız Küme 3'e kural olarak girmeli) |

---

## KÜME 1 · Görsel doğrulama boşluğu — karar: YENİ SKILL/OTOMASYON

**Sinyal:** Projenin en pahalı ve en sık tekrarlayan döngüsü bu. Kapı bataryası her turda
"TOPLAM 0" derken, görsel/yerleşim kusurları neredeyse her zaman **kullanıcının ekran
görüntüsüyle** ortaya çıktı.

**Kanıt (DEVIR.md):**
- §132–158 bölgesinde 27 turun ~17'si kullanıcı gözlemi/ekran görüntüsüyle açılıyor.
- §103–131 bölgesinde en az 8 turda tek kanıt kaynağı ekran görüntüsü (§109, 112, 114, 115, 118, 119, 123, 124).
- Test ortamı gerçeği taklit edemiyor: `derin_ortam.js`'te `appendChild`/`canvas`/`rAF` yok,
  "çizim hataları hiç yakalanamıyordu" (§107); `querySelector` null → `olcumCiz`/`seyirCiz`
  **hiç test edilmemiş** (§32); "görsel davranış cihazda denenmeli" (§100).
- Kullanıcı kök sebebi geliştiriciden önce en az 3 kez koydu (§103, §112, §122).
- Çark merkezi 5 ardışık turda (§118–123) "düzeltildi" denip yeniden bozuldu; mola çipi 6 turda
  (§104–116); gün listesi okunaklılığı 5 turda (§143–148). Bu zincirlerin her adımı bir
  kullanıcı-ekran-görüntüsü turudur.
- En kesin teşhis yöntemi bir kez kullanıldı ve terk edildi: §141'de ekran kaydından kare
  çıkarıp sayısal sıçrama ölçümü (medyan kare farkı, sıçrayan kare tespiti) — sonraki görsel
  sorunlarda yine ekran görüntüsüne dönüldü.

**Aday:** Gerçek tarayıcıda (headless Chromium/Playwright — bu ortamda önyüklü) `index.html`'i
açıp (a) konsol hatası sıfır kontrolü, (b) kritik elemanların ölçü/konum doğrulaması
(`#cark` yüksekliği, kart açık/kapalı boyutları, üst şerit taşması), (c) referans ekran
görüntüleriyle piksel karşılaştırması, (d) sürükleme/geçiş sonrası kararlılık ölçümü yapan
bir koşucu. §141'deki kare-farkı yöntemi standartlaştırılabilir. Bu tek başına §99–158
arasındaki turların büyük bölümünün ilk seferde yakalanmasını sağlardı.

---

## KÜME 2 · Elle dağıtım ritüeli — karar: YENİ SKILL/OTOMASYON

**Sinyal:** Dağıtım tamamen elle: Claude çıktıyı üretiyor → kullanıcı indiriyor → GitHub web
arayüzünden sürükle-bırak yüklüyor → iOS'ta önbellek/kısayol temizliği. Sürüm damgası iki ayrı
dosyada elle eşitleniyor.

**Kanıt:**
- Git: 33 commit'in 31'i "Add files via upload", 2'si web arayüzü silme commit'i; tek yazar;
  `git commit -m` ile yazılmış tek mesaj yok. 29 kez `index.html`+`sw.js` ikilisi birlikte yüklendi.
- `sw.js:4` `SURUM='rota-2027-01-07a'` ↔ `index.html:1522` `SURUM='2027-01-07a'` — her turda
  **elle** eşitleniyor; DEVIR §0b bir dönem bu ilerletmenin **sessizce bozuk** olduğunu kaydediyor
  ("uret.py'nin replace'i şablonda olmayan dizeyi arıyor → sessiz boş işlem").
- Sürüm ↔ rota eşleşme beyanı 158 turun hemen hepsinin kapanış satırı (ör. §36–§158); bayt
  sayısı elle rapor ediliyor ve §156'da unutulmuş — ritüelin elle yürüdüğünün kanıtı.
- Elle yüklemenin enkazı: `icon-180.PNG`/`icon-180.png`, `icon-512.PNG`/`icon-512.png` ikizleri;
  `manifest.webmanifest` küçük harf `./icon-192.png` istiyor ama repoda yalnız `icon-192.PNG`
  var → **bugün hâlâ 404**. §157: ikonların sunucuya çıkmaması yüzünden koca bir tur harcandı,
  çözüm ikonları base64 gömmek oldu (+113 KB).
- iOS tarafı: "kısayolu silip yeniden eklemek gerekiyor" (§157) — teyit kaydı yok.
- `TUS program.json` (boşluklu) ↔ `TUS_program.json` (DEVIR'in kullandığı ad) ↔ `TUS_program.md`
  üçlüsü; `logo.svg` ve `TUS program.json` hiçbir koddan referans almıyor (ölü ağırlık).

**Aday:** "Yayınla" tek adımı: sürüm damgasını tek kaynaktan iki dosyaya otomatik basan, dosya
adı/büyük-küçük harf ve manifest bütünlüğünü doğrulayan, git commit+push ile dağıtan bir
skill/script. GitHub Pages kullanıldığı için push = dağıtım; "Add files via upload" ritüeli
tamamen ortadan kalkar. (Not: icon-192 404'ü Küme 9'da ayrıca düzeltme kalemi.)

---

## KÜME 3 · Proje ilkeleri oturuma otomatik yüklenmiyor — karar: DÜZELTME

**Sinyal:** Repoda **CLAUDE.md yok**. Oturumlar boyunca damıtılan çalışma ilkeleri DEVIR.md
§0'da yaşıyor ("Çalışma ilkeleri — bunu önce oku", "Mirası doğrulamadan kabul etme", "Kendi
hatalarını ara ve bildir", §0f "yeniden tartışılmasın" ödünleri, §0h kırılgan noktalar) —
ama bu dosya 389 KB ve bir sonraki oturumun bunu okuması tamamen gönüllü/elle.

**Kanıt:**
- Aynı hata sınıfının oturumlar arası tekrarı, ilkelerin taşınmadığını gösteriyor:
  - Kısa CSS sınıf adı çakışması **2 kez** (§106 `.kd`, §137 `.molaK` — ikincisinde "ikinci kez
    aynı hata, yeni sınıf eklerken grep şart" itirafı).
  - Çıktıyı kesen komut (SIGPIPE/`tail`/`head`) **3 kez** (§29 #7, §42, §68 — §68: "bu tuzak
    DEVIR §0b'de zaten kayıtlı ve yine düştüm").
  - "Önceki oturumda öyle yazılmış"ı doğrulamadan devralma: Kural A taban tarihinde **iki ayrı
    oturum bağımsız aynı yanlışa vardı** (§12.12).
  - Hayali kural: "bölüm başına en fazla 3 oturum" ve "Salı kuralı" kullanıcı hiç vermediği
    hâlde denetim bulgusu üretti (§25, §27).
  - Kavram kayması: "24'lü deneme = 24 soruluk deneme" yanlış anlaşılması **bütün §84 kalibrasyon
    analizini geçersiz kıldı** (§91); dört kitabın türü yanlış sınıflandırıldı (§89, §151–152).
- Kullanıcı sorusu → gizli hata mekanizması 10+ turda hata bulmanın baskın yolu oldu
  (§74, 75, 76, 81, 82, 89, 91, 99, 101, 102) — testler değil.

**Aday (düzeltme):** DEVIR §0/§0f/§0h + §12 derslerinin ~100 satırlık bir `CLAUDE.md`'ye
damıtılması (otomatik yüklenir): sabit kararlar, kırılgan noktalar, yasak komut kalıpları
(`| head`, geniş aralık silme), "yeni CSS sınıfı → önce grep", "kullanıcı terimlerini
varsaymadan teyit et", "her düzenlemeden sonra grep doğrulaması" (§127 dersi). Küme 8'in
(varsayım onay kapısı) doğal evi de burası.

---

## KÜME 4 · Üretim boru hattının buharlaşması — karar: DÜZELTME

**Sinyal:** DEVIR.md'nin tarif ettiği sistemin çoğu **repoda yok**. Repo bir kaynak deposu
değil, dağıtım hedefi olarak kullanılmış; boru hattı ve test bataryası oturum sandbox'larında
yaşayıp oturum kapanınca kaybolmuş.

**Kanıt:**
- §20 "kaynak/ klasöründe 21 dosya (ls ile doğrulandı)" → repoda **0/21**: `uret.py`, `dizi3.py`,
  `yeniden.py`, `denet.py`, `kural_test.py`, `eko.py`, `tavan.py`, `unutma.py`, tüm
  `secim_v*.json`, `app_gorev*.json`, `kaynak_harita.json`, `isaret.json`… hiçbiri yok.
- 14 kapının 13'ü repoda yok (`kos.js`, `derin_test.js`, `mola_test.js`, `kombo_test.js`,
  `senk_*.js`, `derin_ortam.js`…). Tek gelen `cark_test.js` de **koşamaz durumda**: ilk satırı
  `require('./derin_ortam.js')` (dosya yok) ve `fs.readFileSync('/mnt/user-data/outputs/index.html')`
  — eski oturum sandbox'ının mutlak yolu. Tek commit'te yüklenmiş, bir daha dokunulmamış.
- `sablon_v23.html` `SURUM='2026-10-13a'`ta donmuş; `index.html` elle 16 sürüm ileride
  (`2027-01-07a`), +1 715 satır büyümüş → **üretilen artefakt kaynak hâline gelmiş**, şablon ve
  boru hattı fiilen terk edilmiş. DEVIR §20 yer tutucu listesi 6 sayıyor, şablonda 7 var
  (`__P__` belgede hiç geçmiyor) — belge ile şablon ayrışmış.
- Bu buharlaşmanın ölçülmüş maliyetleri: §30 "kos.js ve tam_test.js diskte yoktu, bağlamdan
  kurdum"; §69 dosya ezme kazası (eski `gun_v2.json` tazenin üstüne kopyalandı, bir tur kayıp);
  sürüm dosyası patlaması (`secim_v4→v16`, `gun_v2/v3`) hangi dosyanın güncel olduğunun tabloyla
  takip edilmesini gerektirdi (§68).

**Aday (düzeltme):** İki yoldan biri seçilmeli — (a) boru hattı ve testler bir sonraki üretimde
yeniden oluşturulup repoya alınır (tek doğruluk kaynağı git olur; `cark_test.js` yolu
görelileştirilir, `derin_ortam.js` eklenir) ya da (b) boru hattı resmî olarak emekliye ayrılır
ve DEVIR §20 "tarihsel kayıt" diye işaretlenir. Şu anki ara durum (belge var, sistem yok) her
yeni oturumda yeniden-inşa maliyeti ve yanlış güven üretiyor.

---

## KÜME 5 · "Kapılar yeşil, hata sürüyor" — karar: YENİ SKILL/OTOMASYON

**Sinyal:** Tur sonu kapı bataryası (2 kapıdan 14 kapıya büyüdü) her turda elle koşulup
"TOPLAM 0" raporlandı; buna rağmen ertesi tur yeni kırık geldi. Kapılar **kendi yazdığı
kontroller** olduğu için bakılmayan yer hep kaldı; bağımsız denetimler her seferinde kapılar
temizken gerçek hata buldu.

**Kanıt:**
- §103–158 arasında "ON DÖRT KAPI · TOPLAM 0" 56/56 turda; hiç 0'dan farklı değer raporlanmadı.
- Bağımsız denetim turları: 7 ayrı denetim (§82, 87, 90, 91, 92, 95, 97), hepsinde kapılar
  temizken hata çıktı (§87: dört gerçek hata; ders: "on dört kapı geçmek 'hata yok' demek değil").
- Kapıların yapısal kör noktaları bizzat kayıtlı: CSS sözdizimini hiçbir kapı denetlemiyordu
  (§108 — başıboş `}` 60 000 karakterlik stili çökertti, 4 tur yanlış yerde arandı); blok
  çakışmasını hiçbir kapı yakalamıyordu (§28); kapılar **belgeyi** denetlemiyor (§12.10 — 27
  Temmuz'da bulunan 15 hatanın hepsi DEVIR metnindeydi, "kapı yeşil yanarken belge yanlış olabilir").
- Testlerin kendisi 6+ kez hatalıydı: `tail -1` gerçeği gizledi (§42), SIGPIPE dosya yazımını
  kesti (§29, §68), ETag sayacı kazara eşleşip senaryoları sahte geçirdi (§32), VM `Date`
  farkı (§30), yuvarlama (§32), sessizce yazılmayan düzenlemeyi eski `uret.py` çıktısı sakladı
  ve **testler yine geçti** (§127).
- Sabit kodlanmış beklentiler (`267 görev`, `66.64 puan`, tarihler) her yapısal değişiklikte
  elle güncellendi — §71, 95, 100, 101, 102, 135, 141'de toplu "eskimiş kontrol yeniden yazımı"
  turları (~100+ kontrol yeniden yazıldı).

**Aday:** Kapı koşusunun kendisi tek komutluk bir koşucuya bağlanmalı (skill): tüm kapıları
sırayla, **çıktı kesmeden** koşan, çıktının tamamını tarayan, sabit beklentileri programın
güncel özet dosyasından türeten, sonucu tek satır yerine ayrıntılı raporlayan bir sarmalayıcı.
Ayrıca her N turda bir "kapıların bakmadığı yer" bağımsız denetimini isteyen bir hatırlatma
kuralı (bu, §82/87/97'de kendini defalarca amorti etti). Not: bu küme, Küme 4 çözülmeden
(dosyalar repoya girmeden) uygulanamaz — bağımlılık sırası: 4 → 5.

---

## KÜME 6 · Veri bütünlüğü hata sınıfı — karar: DÜZELTME + OTOMASYON

**Sinyal:** Projenin sayısal omurgasında aynı üç hata ailesi dönüp durdu: (a) çift sayım,
(b) iki doğruluk kaynağının çarpışması, (c) planlama anında donan türetilmiş değerler.

**Kanıt:**
- Çift sayım **üç ayrı katmanda** geri geldi: §48 "çözüldü" → §59 "⚠ CİDDİ: 131.6 fazla soru"
  → §61 199→169 tekilleştirme → §67 "⚠ ÜÇÜNCÜ ÇİFT SAYIM" (56 konu grubu farklı adla;
  Aminoasitler üç kez sayılmış).
- İkiz doğruluk kaynağı: `eko.py` vs `envanter.py` bölüm sınırları (§43, §58 — yanlış envanterle
  temizlik, geri alındı, §67) ve envanter çarpışmasının "üçüncü tezahürü" (§88), başlıksız kitap
  (§96). Uygulama-model farkının kökü (`soru` ağırlığı vs katalog `pay`) **4 kez tespit edildi,
  hiç düzeltilmedi** (§71, 75, 76, 95).
- Donmuş değer: 5 tur (§72 `kaz` çift sayımı; §75 planlama anında donmuş `kaz`; §81 "aynı hatanın
  power-up kopyası"; §82 kartlarda eski değer — 25 görevin 20+'sında sapma; §85 önbellek anahtarı
  eksik). Ayrıca ad/anahtar eşleşmesi ailesi: §153 `grup` alanına branş adı (29 konu sessizce 0),
  §154 20 konu adı iki kitapta çakışıp kayıtları ezdi → anahtar `kitap+konu`ya taşındı.
- Hayalî envanter: video planındaki konu dağılımı "tamamen hayaliydi" (§43 — olmayan Enfeksiyon
  videosu, programda hiç olmayan Hematoloji); temel kapasite varsayımı hiç doğrulanmamıştı —
  program %27 fazla yüklü çıktı (§50).

**Aday:** (Düzeltme) tek yetkili kaynak ilkesinin veri katmanında da tamamlanması — `soru` vs
`pay` farkı gibi bilinen-ama-bırakılmış tutarsızlıkların kapatılması. (Otomasyon) üretim
sonrası şema+tekillik denetimi: anahtar benzersizliği (`kitap+konu`), toplamların yetkili
tabloyla mutabakatı, "türetilmiş alan tazeliği" (donmuş değer avcısı), envanter-program
mutabakatı. Bunların çoğu geçmişte tek tek elle keşfedildi; kalıcı denetime hiç bağlanmadı.

---

## KÜME 7 · Tek dosyalık dev index.html — karar: DÜZELTME (kısmi)

**Sinyal:** 583 KB, tek `<style>` (~1 268 satır), tek `<script>` (~4 390 satır), 178 641
karakterlik tek veri satırı. Tek dosya olması **bilinçli bir dağıtım kararı** (çevrimdışı PWA,
elle yükleme; §157'de dış dosya bağımlılığı bilerek sıfırlandı) — bu yüzden "parçala" önerisi
kararla çelişir. Ama tek-dosyanın türettiği hata sınıfları ölçülü önlemlerle kapatılabilir.

**Kanıt:**
- Başıboş `}` regex düzenlemesinden kaldı, o noktadan sonraki tüm CSS geçersiz oldu, semptomlar
  4 tur yanlış yerde arandı (§108). İki hata birbirini maskeledi (§108+§110).
- Kısa sınıf adı çakışması 2 kez (§106, §137). Geniş aralık silme kazası: 12 862 karakter CSS
  kayboldu, 56 hata, paketten geri yükleme (§101).
- Sessizce başarısız düzenleme (assert tutmayınca dosya yazılmadı, çıktı başarılı göründü) §127.
- Kopyala-yapıştır çoğaltması: aynı kusur 3–8 ayrı noktada (paneller §151, `setTimeout`'lar §139,
  gizleme mantığı §147, anahtar değişimi 8 nokta §154); CSS↔JS aynı sabitin iki kopyası (§122).
- Dosya 360 KB→551 KB büyüdü (§103→§158); büyüdükçe tek noktalı kırılmanın yarıçapı büyüyor.

**Aday (düzeltme):** Tek dosya kalarak: (a) CSS bütünlük kontrolünün (§108'de eklenen 6 kontrol)
gerçek bir CSS ayrıştırıcıyla değiştirilmesi, (b) düzenleme protokolü — blok imzasıyla değiştir,
sonrasında grep doğrulaması (§101+§127 dersleri; Küme 3'teki CLAUDE.md'ye kural olarak),
(c) sınıf adı çakışma denetiminin elle "grep at" kuralından otomatik kontrole çevrilmesi.

---

## KÜME 8 · Varsayım/kavram kayması — karar: YENİ SKILL (Küme 3 ile birleşik)

**Sinyal:** En pahalı tekil hatalar kod değil **varsayım** hatalarıydı: kullanıcının vermediği
kural "kural" sanıldı, terimler yanlış anlaşıldı, miras doğrulanmadan kabul edildi.

**Kanıt:** "3 oturum kuralı" ve "Salı kuralı" hayaldi, ikisi de denetim bulgusu üretti (§25,
§27); "24'lü deneme" yanlış anlamı bütün kalibrasyon analizini çöpe götürdü (§91); kaynağı
olmayan sayılar dolaştı ("gün 10", "18.2 sa", "8.93 sa", "%60" — §5A, §8, §11, §19); doğrulanmamış
varsayımlar sonradan yanlış çıktı (Duyu Organları çıkarımı §46; zorunluluk varsayımı §91);
yeniden-okuma %40 varsayımı hâlâ onaysız (§89).

**Aday:** DEVIR'de zaten filizlenen "⚠ doğrulanması gereken varsayım" pratiğinin
resmîleştirilmesi: her turda yeni varsayımlar ayrı bir bölümde listelenir ve kullanıcı onayı
almadan karar girdisi yapılamaz. Bu bir davranış kuralı olduğu için en ucuz uygulanışı Küme
3'teki CLAUDE.md; ayrıca "kaynağı olmayan sayı" avı (belgedeki her sayının üretildiği yer)
Küme 5'in belge-denetim kapısına aday.

---

## KÜME 9 · Açık maddeler envanteri — karar: DÜZELTME (uygulanmadı, yalnız liste)

DEVIR'de açılmış ve kapandığına dair kayıt bulunmayan maddeler:

1. **`icon-192.png` 404** — manifest küçük harf istiyor, repoda yalnız `icon-192.PNG` var
   (bugün hâlâ kırık; repo taramasıyla doğrulandı).
2. **Model ↔ uygulama projeksiyon farkı** — kök sebep (`soru` vs `pay`) 4 kez tespit edildi,
   hiç düzeltilmedi (§71, 75, 76, 95).
3. **`isaret.json` metinlerinde 5 sayısal hata** — "düzeltilmeden yayınlanmamalı" (§19);
   düzeltildiğine dair kayıt yok (dosya repoda da yok → Küme 4).
4. **GitHub PAT iptali** — "sohbete yapıştırılan anahtar iptal edilmeli" (§33); teyit yok.
   Anonim gist okuma varsayımı da ("gizli pencerede görünüyor mu") doğrulanmadı (§33).
5. **R_CAL tek gözleme dayalı** — ±0.19 belirsizlik bandı; gerçek deneme verisi girilmedi
   (§82–§97 boyunca açık).
6. **Ölü `kaz` alanı** — 95 görevde duruyor, temizlik "sonraki üretime" bırakıldı (§82).
7. **iOS ana ekran kısayolu** — eski ikonu tutuyor; silip yeniden ekleme teyidi yok (§157).
8. **`Script error.` gözlem modu** — küresel sarmalamayla bastırıldı ama "konsolda hâlâ bir şey
   çıkarsa ?hata=1 ile bak" notuyla açık bırakıldı (§131).
9. **Yeniden okuma = %40 varsayımı** — kullanıcı onayı bekliyor (§89).
10. **`soru=0` olan 25 konu** — veri eksikliği olarak kabul edildi, kaynak veri tamamlanmadı (§154).
11. **Ölü repo dosyaları** — `logo.svg` ve `TUS program.json` hiçbir koddan referans almıyor;
    `sablon_v23.html` 16 sürüm geride (Küme 4'ün parçası).

---

## KÜME 10 · Yerleşim/seçimin sıfırdan tekrar kurulması — karar: HİÇBİR ŞEY

Seçim motoru 6+ kez (secim_v4→v16), yerleşim 6+ turda sıfırdan koşuldu; Kural B↔C dengesi 4 tur
sürdü (§92–95); nokta müdahalesi 6 kez denendi ve hep kırıldı ("üçüncü kez aynı örüntü" §77).
**Neden hiçbir şey:** bunlar süreç israfı gibi görünse de kayıtlar tersini söylüyor — her
yeniden kurulum, gerçek bir veri/model düzeltmesinin (çift sayım, unutma eğrisi, kapasite)
zorunlu sonucuydu ve doğru ders zaten çıkarılmış durumda: "nokta müdahalesi yerine boru hattını
baştan koştur" (§77, §87). Bu bir araç eksikliği değil, problemin doğası. Otomasyona
dönüştürülecek kısmı zaten Küme 4+5'in kapsamında (boru hattının tek komutla koşulabilir olması).

## KÜME 11 · Model yeniden kurulumları ve K'nın sürekli düşmesi — karar: HİÇBİR ŞEY

Puan motoru 6 kez, kalibrasyon 4 kez yeniden kuruldu; K projeksiyonu 67.72→63.13 düştü.
**Neden hiçbir şey:** düşüşlerin her biri dürüstlük artışıydı ("her seferinde daha dürüst oldu"
§65); model artık simülasyon temelli ve unutma eğrisi içeriyor. Burada tekrar eden iş, hatalı
sürecin değil öğrenen sürecin izi. Kalıcı risk (R_CAL belirsizliği) Küme 9/5'te zaten listeli.

## KÜME 12 · UI ders kalıpları — karar: HİÇBİR ŞEY (yalnız kural olarak kaydedilmeli)

Tekrarlanan ve artık çözülmüş görünen mühendislik kalıpları: "bayat/erken ölçüm" (≥7 tur:
§107, 120, 121, 122, 127, 139, 146, 148, 158 — çözüm hep 'geçiş bitmeden ölçme / her karede
ölç / CSS'ten türet'), "ayrık-sabit değer → sürekli fonksiyon" (6 tur: §135, 140, 141, 143,
146, 158), "tahmin → gerçek ölçüm" (3 tur), "iki animasyon kaynağı aynı özelliği sürüyor"
(2 tur), "sessiz sıfır" ailesi (SVG dejenere gradyan §155, tanımsız `TAVAN_G` §153).
**Neden hiçbir şey:** bunlar için ayrı araç gerekmiyor; kodda son durumları sağlıklı. Tek
gereken, bir daha ihlâl edilmemeleri için Küme 3'teki CLAUDE.md'ye birer satırlık kural olarak
girmeleri.

---

## Önerilen ele alma sırası (yalnız teşhis — hiçbiri uygulanmadı)

1. **Küme 3** (CLAUDE.md) — en ucuz, her oturumu iyileştirir, Küme 8+12'yi de taşır.
2. **Küme 2** (dağıtım otomasyonu) — her turun sabit maliyetini siler; icon-404 türü enkazı bitirir.
3. **Küme 4** (boru hattını repoya al ya da emekliye ayır) — Küme 5 ve 6'nın ön koşulu.
4. **Küme 1** (görsel doğrulama koşucusu) — en yüksek getiri: turların çoğunun tetikleyicisi buydu.
5. **Küme 5 + 6** (kapı koşucusu + veri bütünlük denetimi) — 4'ten sonra.
6. **Küme 9** (açık maddeler) — küçük, bağımsız düzeltmeler; özellikle #1 ve #4 hızlı kapanır.
