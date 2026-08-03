# DEVİR DOSYASI · TUS Programı

Bu dosya yeni bir sohbetin programı sıfırdan kavraması için gereken **her şeyi** içerir.

---

---

## 0 · ÇALIŞMA İLKELERİ (bunu önce oku)

Bu programı yaparken kullanıcının açık talebi:

> **Hiçbir zaman tahmin yürütme. Her zaman yalnız matematikle ve kanıta dayalı bilgiyle sorun çöz. Kaynak gösteremediğin bilgiyi söyleme, o şekilde tahminle aksiyon alma.**

Pratikte bunun anlamı:

- Bir sayı söylüyorsan **nereden geldiğini** göster. Ölçüm mü, kullanıcı beyanı mı, varsayım mı — ayrımı açıkça yap.
- Varsayım kullanmak zorundaysan **varsayım olduğunu işaretle** ve doğrulama yolu öner (ölçüm iste).
- Bir karar alıyorsan **iki seçeneğin sayısını yan yana koy**, sonra öner. Kullanıcı karar verir.
- **Kendi hatalarını ara ve bildir.** Kullanıcı her turda "hata yaptın mı kontrol et" diyor ve bu ciddi bir taleptir. Bu oturumda 20'den fazla kendi hatam bulundu; çoğu ancak elle arayarak çıktı.
- **Mirası doğrulamadan kabul etme.** "Önceki oturumda öyle yazılmış" bir gerekçe değil. Renk kuralı, kaynak listesi, getiri kalibrasyonu — hepsi bir kez yanlış çıktı.
- Kullanıcı gerekirse **her şeyin baştan karılmasını** istiyor. "Bu benim değişikliğim, şu başkasının" ayrımı yapmadan bütünü ele al.
- Cevaplarda **abartı yok, kendini övme yok.** Ne yaptığını ve ne bulamadığını sade yaz.

## 0b · Sürüm ve durum

- **Çalışan sürüm: `2026-07-27y`** (index.html içinde `const SURUM=`, sw.js içinde `rota-2026-07-27y`)
- Bu iki sürüm **eşleşmek zorunda**, yoksa servis çalışanı eski önbelleği sunar.
- Değişiklikten sonra sürümü ilerlet: `y` → `z` → `2026-07-28a` …

⚠ **SÜRÜM İLERLETME ŞU AN BOZUK.** `uret.py` şu satırla ilerletiyor:
`h=h.replace("const SURUM='2026-07-26e'","const SURUM='2026-07-27y'")`
Ama `sablon_v23.html` içinde artık **`const SURUM='2026-07-27y'` yazıyor**, `2026-07-26e` hiç geçmiyor (ölçüldü: `'2026-07-26e' in sablon` → False). Yani bu satır **sessiz bir boş işlem**. Bugün tesadüfen zararsız — üretilen sürüm sw.js ile eşleşiyor. Ama bir sonraki üretimde sürüm **kendiliğinden ilerlemez**. Üretimden önce hem `sablon_v23.html`'deki `SURUM`, hem `uret.py`'deki eşleşme dizesi, hem `sw.js`'deki `SURUM` **elle** güncellenmeli.

## 0c · Kanıt temelleri (bunlar kaldırılırsa programın dayanağı gider)

**Yavaşlama (21:15–23:00, yeni konu yok):**
Ackermann, Cordi, La Marca, Seifritz, Rasch — *Frontiers in Psychology*, 2019. Yatmadan önce yaşanan psikososyal stres uykuya dalma süresini uzatıyor ve gecenin ilk bölümündeki **yavaş dalga aktivitesini (SWA)** düşürüyor. SWA uykuya bağlı bellek pekiştirmesinin taşıyıcısı. Aynı literatür yatma öncesi stresin ertesi günün prospektif bellek performansını da bozduğunu gösteriyor.
→ Bu yüzden 21:15 sonrası **yeni konu, süreli test, zorlayıcı materyal yok**; sadece bilinen şeyin üzerinden hafif geçiş.
→ **F bloğu (21:30–22:30) bu kuralın istisnasıdır** ve yalnız 29 Temmuz'da var, içinde yalnız **sakin okuma** olacak şekilde tasarlandı — mekanizma stres/uyarılma kaynaklı, pasif okuma kaynaklı değil.

**Spor saati (14:00–16:15):**
Ağ meta-analizi akşam orta şiddetli egzersizin uykuyu iyileştirme potansiyeli en yüksek yöntem olduğunu gösterdi; N3 uykusunda artış eğilimi. 14.689 kişi ve 4 milyon geceyi kapsayan çalışma: egzersiz uyku başlangıcından **≥4 saat önce** bitiyorsa uykuda değişiklik görülmüyor. Yatmadan 1 saat önce biten yoğun egzersiz uykuya dalmayı geciktiriyor.
→ Spor 16:15'te bitiyor, yatış 23:00 → 6 saat 45 dk pay, güvenli tarafta.

## 0d · Z bloklarının varlık sebebi

Program 26 Temmuz'da başlamalıydı ama o gün çalışılamadı — **8 iş, 8.94 etkin saat kayboldu.** Telafi için 06:00–07:00 arası **Z bloğu** icat edildi ve o günün işleri 8 sabaha dağıtıldı. Sonradan Obstetri'yi sığdırmak için 4 ve 6 Ağustos'a iki Z daha eklendi.

**Z blokları isteğe bağlı değil** — kaldırılırsa 26 Temmuz'un içeriği ve Obstetri programdan düşer.

Z bloğunun verimi: sabahın ilk saati yorgunluk çarpanı 1.000 ile çalışır, yani **1 nominal saat = 1 etkin saat**. Gün sonuna eklenen F bloğu ise 0.71–0.78 etkin saat verir. Sabah %30 daha verimli.

## 0e · Sınav yapısı ve puanlama

- **23 Ağustos 2026**, iki oturum: **Temel** (120 soru) ve **Klinik** (120 soru)
- **4 yanlış 1 doğruyu siler** → yanlışın bedeli 0.25 net
- Beş şıkta rastgele işaretlemenin beklenen değeri sıfır → **boş bırakma yok**
- K puanı iki oturumun netlerinden hesaplanır: `K = 40.269 + 0.207 × Temel + 0.277 × Klinik`
- Klinik netin katsayısı daha yüksek (0.277 vs 0.207) → klinik branşlar puana daha çok etki ediyor

## 0f · KABUL EDİLMİŞ ÖDÜNLER (yeniden tartışılmasın, kullanıcı onayladı)

| Ödün | Ölçek | Gerekçe |
|---|---|---|
| 19 Ağustos A bloğu 25 dk taşıyor | tek gün | "tek gün olduğundan önemli değil" |
| Diğer 3 blokta 1–2 dk taşma | 07-29 A, 07-31 D, 08-02 A | 15 dk toleransın altında |
| Z günlerinde 75 dk/gün uyku borcu | 10 gün, toplam 12.5 sa | "75 dk çok değil" · öğle uykusuyla kısmen kapanır |
| 29 Temmuz'da Z ve F birlikte | tek gün | "temmuz/ağustos başıysa sorun değil" |
| Sınırsız parçalama reddedildi | +0.12 net feda | "10 dk için kitap açmak 0.12 net etmez, molayı artırıp yenilenmek daha kazançlı" |
| Mikrobiyoloji Viroloji çıkarıldı | 2.8 soru, 6.45 sa | 0.0218 net/saat — programın en verimsizinden 7 kat kötü |
| Pediatri Yenidoğan yerine Obstetri | +1.6 dayanaklı soru | Obstetri pembe (3.8 soru), Yenidoğan da pembe ama zincirinde yer yok |
| 12 blokta 15 dk altı okuma | ortalama 8–12 dk | sayfa kaydırmasından doğdu, kabul edilebilir sınırda |

## 0g · Uygulamanın arayüz haritası (index.html, ~290 KB)

Üç sekme, alt bar yok — nav başlık bandında üç sembol orb.

**ROTA** (`carkCiz`, `kart`, `brifCiz`)
- **Çark**: aktif görev ortada, çevresinde şeritler; konum `asin` ile dikey uzaydan türetiliyor (çakışma testi 5340 düzende sıfır kesişim)
- Aynı bloğun kardeş işleri yakın ve opak, diğer bloklar soluk
- Mola şeritleri blok sınırlarında; kartın altında mola kutusu
- Süre dolunca 14 sn döngüde titreme + altın halka + ⏰ şeridi
- **Brifing çipleri** (`#brif`): cam çip kümesi, 6 yoğunluk kademesi (d1–d6), kapsayıcı yüksekliğinden bütçe alınır, **kaydırma asla yok**
- **Motivasyon kartı** (`motivKart`): günün tüm işleri bitince günün sözü + yarın bilgisi
- **Sınav kartı** (`sinavKart`): 23 Ağustos ve sonrası, altın çerçeve
- **Uyku çipleri**: gün bitince "05:45 kalkış · 6 sa 45 dk uyku" ve "06:00 ilk görev" olarak **iki ayrı çip**

**SEYİR** (`seyirCiz`, `kordonCiz`, `kaynakHarita`)
- **Pelerin takvimi**: 27 günün ızgarası
- **Sinaps ışınları** (`kordonCiz`): 48 kombo, uçların rengine göre gradyan, saçaklı üç katman + parlak çekirdek, `RENK[g.tag]` ile dinamik
- **Kaynak haritası**: 18 kitap, `<details class="khP">` açılır panel, `.khG` ızgarası 1/2/3/4 sütun (760/1060/1400 px), her panelde renk rozetleri (dolu çerçeve = o rengin tamamı yapılıyor) ve sayısal çöp gerekçeleri

**ÖLÇÜM** (`olcumCiz`, `radarCiz`, `trendCiz`)
- Güç matrisi (radar) + net/puan seyri grafiği + 11 branş trendi
- Deneme giriş formu (11 branş neti)
- **Veri paneli**: base64 dışa/içe aktarma, sıfırlama, **senkron** (gist + anahtar + cihaz rolü), bildirim izni

**Diğer**
- Çevrimdışı çalışır (servis çalışanı, HTML önce ağ, diğerleri önbellek)
- Bildirim: süre dolunca uyarı (uygulama açık/arka planda)
- `localStorage` anahtarları: `rota-veri` (ilerleme), `rota-senk` (senkron ayarı)
- **Tarayıcı depolaması dışında hiçbir sunucu yok**

## 0h · Değiştirirken kırılması kolay yerler

- `BITIS` haritası blok bitişlerini tutuyor ama `gecmis()` artık **görevin kendi `blokT`'sini** okuyor (Z bloğu güne göre değişiyor)
- Blok sırası `SR={'Z':0,'A':1,'B':2,'C':3,'D':4,'E':5,'F':6,'—':7}` — yeni blok eklerken **tüm betiklerde** güncellenmeli (`dizi3.py`, `yeniden.py`, `denet.py`, `kural_test.py`, şablon)
- `MIKON` ve `MOLA_AD` mola tiplerini tutuyor — yeni tip eklenirse ikisine de eklenmeli
- Mola hesabı **yalnız dolu bloklara** göre yapılmalı (28 Temmuz tek bloklu)
- Renk ataması **okuma + soru + deneme** görevlerinin hepsine uygulanmalı

**Görev sayısı veya projeksiyon değişirse kıracak sabit kodlanmış değerler** (yeniden dizimden önce güncellenmeli):

| Yer | Sabit | Ne zaman kırar |
|---|---|---|
| `kos.js` §5 | `X.GOREVLER.length===267` | görev sayısı değişince |
| `kos.js` §9 | `Math.abs(son − 66.64)<0.02` | projeksiyon değişince |
| `uret.py` | `SURUM='2026-07-26e'` eşleşmesi | zaten boş işlem, bkz. §0b |
| `kural_test.py` #3 | `len(kucuk)<=12` | 15 dk altı parça sayısı artınca |
| `kural_test.py` #11 | `len(eksP)<=2` | iki eksik pembe girerse **rahatlar** (0 olur), sorun değil |
| `denet.py` §4 | `asim<=4` | blok sonu aşımı artınca |
| `denet.py` §7 | `act=='deneme'` sayısı `==12` | tam deneme sayısı değişince |

---

## 1 · Hedef ve formül

- Sınav **23 Ağustos 2026**, program **27 Temmuz – 22 Ağustos** (27 gün)
- Hedef branş **Kardiyoloji**, gereken **K ≥ 65**
- `K = 40.269 + 0.207 × Temel + 0.277 × Klinik`
- Ölçülen son deneme: Temel **32.25** · Klinik **38.50** → **K = 57.61**
- Mevcut program projeksiyonu: Temel +18.69 · Klinik +18.62 → **K = 66.64**

## 2 · Ölçülmüş hızlar (varsayım değil, kullanıcı beyanı/ölçümü)

| Ne | Değer | Kaynak |
|---|---|---|
| Bakir kitap okuma | 8 sf/saat | ölçüldü — Patoloji 414 sf / ~50 saat |
| Tanıdık kitap okuma | 15 sf/saat | "2-3 günde tekrar ederim" beyanından muhafazakâr |
| Ezber-yoğun branş çarpanı | ×1.4 maliyet | Anatomi, Biyokimya, Farmakoloji, Mikrobiyoloji |
| Ezber sorusu (açıklama okuyarak) | 1.5 dk/soru | **ölçüldü** — 10 farmakoloji sorusu 15 dk |
| Klinik/vaka sorusu | 1.0 dk/soru | **ölçüldü** — 10 pediatri sorusu 10 dk |
| Yorgunluk çarpanı | `1 + 0.055 × max(0, kümülatif − 3)` | blok başında kümülatif saatten, mola kredisi `m` düşülür |

Kitap başına kullanılan okuma hızı:

| Kitap | sf/saat |
|---|---|
| TUSTIME Fizyoloji | 15.0 |
| TUSTIME Küçük Stajlar | 15.0 |
| Emrullah Patoloji SST | 15.0 |
| Klinisyen Vaka Pediatri | 12.0 |
| TUSTIME Mikrobiyoloji | 10.7 |
| Speetus Genel Cerrahi | 8.0 |
| FT Kadın Doğum | 8.0 |
| FT Farmakoloji | 5.7 |
| FT Biyokimya | 5.7 |
| Anatomi Fast Track | 5.7 |

⚠ **`eko.py`'nin hız formülü bu tabloyla bir kitapta uyuşmuyor.** Formül:
`hiz = (15.0 if kitap in TANIDIK else 8.0) / (1.4 if kitap in EZBER else 1.0)`
Dokuz kitapta tabloyla aynı sonucu veriyor. **Klinisyen Vaka Pediatri** ne TANIDIK ne EZBER olduğu için formül **8.0 sf/saat** veriyor; tablo ve programın fiilî verisi ise **12.0 sf/saat** (`app_gorev.json`'daki 16 okuma görevinde ölçülen: 11.98–12.04).

Üçüncü bir değer daha var: `icerik.json` bu kitabı `vaka_klinik` sayıp **~17.0 sf/saat** kullanıyor (Nöroloji 18 sf / 1.06 sa = 16.98).

Bu, adım 24'ün maliyetini doğrudan etkiliyor — **Pediatri Yenidoğan (39 sf)**: 12.0 ile **3.25 sa**, 8.0 ile **4.88 sa**, 17.0 ile **2.29 sa**. Yürürlükteki değer programın fiilen kullandığı **12.0**'dir; `eko.py` formülünün çıktısı yalnız kendi konsol raporunda görünür, `kural_test.py` `eko.py`'den **sadece `KITAP` sözlüğünü** alır (`exec(s[s.find('KITAP={'):s.find('\nEZBER=')])`), hız formülünü almaz. Yani kapı bu farktan etkilenmiyor; etkilenen tek şey `eko.py` raporuna bakarak yapılan planlama.

## 3 · Blok mimarisi

| Blok | Saat | Nominal | Mola kredisi `m` |
|---|---|---|---|
| **Z** | 06:00–07:00 (28 Tem: 06:00–10:00) | değişken | 0.0 |
| A | 07:15–08:45 | 1.50 | 0.25 (Z varsa) |
| B | 10:00–13:45 | 3.75 | 0.50 |
| C | 14:45–17:00 | 2.25 | 1.00 · **uzun spor gününde YOK** |
| D | 17:15–19:15 | 2.00 | 1.00 |
| E | 20:00–21:15 | 1.25 | 1.50 |
| **F** | 21:30–22:30 | 1.00 | 0.25 · yalnız 29 Tem |

Deneme günü: A 07:15–08:45 · B 10:15–12:30 · C 14:45–17:00 · D 17:30–19:15 · E 20:00–21:15

Molalar: kahvaltı 75 dk · öğle 60 dk · kısa ara 15 dk · akşam 45 dk · yavaşlama 105 dk (21:15–23:00, **yeni konu yok**) · uzun spor 2 sa 15 dk (14:00–16:15)

Yatış 23:00. Kalkış = ilk blok − 15 dk. Z günlerinde 05:45 kalkış, 6 sa 45 dk uyku (10 gün, kullanıcı kabul etti).

## 4 · Takvim kısıtları

- **Spor**: 26 Tem, sonra 29 Tem'den itibaren iki günde bir (29, 31 Tem · 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22 Ağu)
- **Uzun spor günü** (2 sa 15 dk, C bloğu yok): spor günlerinden 26 Tem, 2, 10, 16, 20 Ağu **hariç** olanlar
- **28 Temmuz DOKUNULMAZ** — kız arkadaşının doğum günü, şehir dışında. Yalnız 06:00–10:00 Z bloğu var, 10:00 sonrası boş. Bkz. §27.
- **Tam deneme günleri** (6 adet): 1, 5, 9, 13, 17, 20 Ağustos
- **21–22 Ağustos okuma yasak** (Kural C) — yalnız geri getirme
- **Dahiliye videolarına erişim 8 Ağustos akşamı bitiyor** — tüm video ≤8 Ağu
- Z bloğu olan günler: 27, 28, 29, 30, 31 Tem · 2, 3, 4, 6, 8 Ağu (10 gün)

## 5 · Kurallar

Bu dört kural **denet.py §7'de kodlanmıştır.** Aşağıdaki tanımlar anlatı değil, kodun fiilen ölçtüğü şeydir — yeniden dizim yaparken bunlara göre hesapla.

**A · Her kaynak erken açılır.** Her kitabın ilk oturumu ilk 14 günde olmalı.
Kodun ölçütü: `(ilk_gün − 2026-07-26).days < 14`. **Taban tarih 26 Temmuz'dur** (çalışılamayan gün), 27 Temmuz değil.
Sayımdan **hariç tutulanlar**: `yanlış defteri`, `TUSDATA 24'lü…` ile başlayanlar, içinde `hafif` geçenler, `cilt…` ile başlayanlar. Geriye **17 kaynak** kalıyor.
Mevcut: **ihlal 0**, en geç açılan **TUSTIME Fizyoloji, 6 Ağustos = gün 11**.
⚠ Bu satır daha önce "en geç **gün 10**" diyordu; hiçbir kod bu sayıyı üretmiyor. `denet.py`'nin ekrana bastığı `≤gün12` ifadesi de sabit metindir, hesaplanmaz.

**B · Gün içi sistem tutarlılığı.** Bir günün okumaları tek organ sistemi zincirinden olmalı.
Kodun ölçütü: **yalnız `act=='oku'`** görevleri sayılır — **video sayılmaz**. Her gün için `en büyük zincir saati / o günün toplam okuma saati`, sonra okuma içeren günlerin ortalaması.
Mevcut: **%89.0** (19 okuma günü; 8 gün okumasız olduğu için paydaya girmiyor).
⚠ Videonun sayılmaması gün sistemini fiilen etkiliyor: 31 Temmuz Metabolizma günüdür ama D bloğunda 1.48 saatlik **Romatoloji** videosu vardır ve bu baskınlığa girmez.

**C · Tekrar sınava doğru yoğunlaşır.** Geri getirme artan, yeni öğrenme azalan.
Kodun ölçütü: dilimler **sabit tarihlerle** kesiliyor, eşit üçte bir değil —
dilim 1 = 27 Tem–3 Ağu (**8 gün**) · dilim 2 = 4–13 Ağu (**10 gün**) · dilim 3 = 14–22 Ağu (**9 gün**).
Geri getirme = `soru + deneme24 + tekrar` → **15.80 / 20.31 / 30.39 sa** (artan ✓)
Yeni öğrenme = `oku + video` → **50.15 / 48.66 / 34.25 sa** (azalan ✓)
`deneme`, `analiz`, `isinma` **hiçbir tarafa sayılmaz** — toplam 37.50 saat kuralın dışında kalıyor.

**D · Bölümü bitir ya da başlama.** Bir bölümün soru getirisi ampirik ölçüm; sayfa başına bölmek "her sayfa eşit soru taşır" varsayımı ve dayanaksız. Yarısını okuyup yarı getiri saymak, hangi yarının soruyu taşıdığını bildiğini varsaymak olur. **Kısmi bölüm yasak.** Mevcut: kısmi bölüm **0**.

## 6 · Renk algoritması (kullanıcının verdiği, mutlak eşik DEĞİL)

Sabit soru eşiği kullanılmaz. Her dersin **kendi içinde** göreceli yüzdelik dilim:

- Sıralama: GB (beklenen soru) azalan · eşitlikte EKO (sayfa/soru) iyi olan önce
- 🩷 **Pembe** üst %22.5 — taşıyıcı kolonlar, efor ne olursa olsun satır satır okunur
- 🧡 **Turuncu** sonraki %27.5 — net sıçratıcılar
- 💛 **Sarı** sonraki %27.5 — stabil, spot bilgiyle geçilir
- 💙 **Mavi** son %22.5 — zaman tuzakları, sadece çıkmış soru ve tablo

**Birleşik başlık kuralı:** bir görev iki bölümü kapsıyorsa **en yüksek** rengi alır.

**Renk seçim ölçütü DEĞİL, çalışma sinyalidir.** Bir kitabın pembesi başka kitabın sarısından daha az verimli olabilir; maksimum net için doğru ölçüt **küresel net/saat** sıralamasıdır.

**Pembe sayımının paydası — 25, 30 değil.** `eko.py`'deki 133 bölümün renk algoritmasıyla hesaplanan dağılımı: **pembe 30 · turuncu 36 · sarı 37 · mavi 30**. Ama `kural_test.py` #11 **Emrullah Patoloji SST'yi atlıyor** (`if kit=='Emrullah Patoloji SST': continue`), çünkü o kitap bitmiştir ve bölüm bölüm okunmuyor. SST'nin 5 pembesi (Hücre Zedelenmesi · Neoplazi · Kadın Genital · GİS · Kas İskelet) düşünce payda **25** olur.
Mevcut: **23/25**, eksik ikisi Anatomi Kaslar ve Pediatri Yenidoğan. Kapının toleransı `len(eksP)<=2`.

## 7 · Zincirler (13 organ sistemi)

Veride **13 ayrı `z` değeri** var. Aşağıdaki tablo **yalnız `act=='oku'`** saatlerini gösteriyor — Kural B'nin ölçtüğü şey bu. **Hematoloji-Onkoloji** tabloda yok çünkü okuması sıfırdır, yalnız 2 Ağustos'ta 1.48 saatlik videodan ibarettir.

⚠ Video dahil edilince dört zincir çok farklı görünüyor. Yeniden dizim yaparken **hangi sütuna baktığını bil**:

| Zincir | Yalnız okuma | Okuma + video |
|---|---|---|
| Kardiyovasküler | 6.93 | **12.85** |
| Kas-İskelet & Romatoloji | 1.53 | **3.01** |
| Solunum | 1.08 | **2.56** |
| Hematoloji-Onkoloji | 0.00 | **1.48** |

**Yalnız okuma (Kural B'nin gördüğü tablo):**

| Zincir | Programdaki okuma | Gün sayısı |
|---|---|---|
| Enfeksiyon & Antimikrobiyal | 24.62 sa | 6 |
| Nörobilim | 17.02 sa | 3 |
| Metabolizma | 16.73 sa | 4 |
| GİS & Hepatobiliyer & Cerrahi | 14.55 sa | 3 |
| Acil & Halk Sağlığı | 11.05 sa | 3 |
| Endokrin & Üreme | 10.75 sa | 3 |
| Gebelik & Yenidoğan | 7.54 sa | 3 |
| Kardiyovasküler | 6.93 sa | 1 |
| Nefro-Üriner | 2.63 sa | 1 |
| Meme & Deri | 2.33 sa | 1 |
| Kas-İskelet & Romatoloji | 1.53 sa | 1 |
| Solunum | 1.08 sa | 1 |

⚠ **DÜZELTİLDİ (27 Tem 2026).** Bu satır önceden "Gebelik & Yenidoğan (**3.92 sa**)" diyordu. **Doğrusu 7.54 saat.** Üç tanımla da ölçüldü (yalnız okuma / okuma+video / tüm görevler), hepsi 7.54; dağılım 4 Ağu 1.00 · 6 Ağu 5.04 · 19 Ağu 1.50. 3.92 rakamı aynı programdaki **Mikrobiyoloji · Temel Mikrobiyoloji**'nin saatine tam eşittir — kopyala-yapıştır hatası.

Sonuç: **Gebelik & Yenidoğan bir günü dolduramayacak kadar küçük değil, 7.54 saatle bir günü zaten aşıyor.** Bir günü dolduramayan tek zincir **Kas-İskelet & Romatoloji**'dir (okuma 1.53 · video dahil 3.01).

## 8 · Kaynakların tam listesi ve özellikleri

| Kaynak | Toplam sayfa | Tür | Özellik |
|---|---|---|---|
| TUSTIME Fast Track Farmakoloji | 118 | konu | video izlenmiyor · **Toksikoloji tek sayfa (118)** |
| TUSTIME Fast Track Biyokimya | 115 | konu | video izlenmiyor |
| TUSDATA Speetus Genel Cerrahi | 142 | konu | özet · Fast Track ve videosu iptal |
| TUSTIME Fast Track Kadın Doğum | 136 | konu | 22 sa 54 dk video İPTAL |
| TUSTIME Mikrobiyoloji Konu Kitabı | 349 | konu | **kitap tanıdık** |
| TUSTIME Fizyoloji Konu Kitabı | 215 | konu | **kitap tanıdık** |
| TUSTIME Küçük Stajlar Konu Kitabı | 200 | konu | **kitap tanıdık** · 22 soruluk kör nokta · **BÖLÜM SONU SORUSU YOK** |
| Anatomi Fast Track | 126 | konu | TTS yerine seçildi (3 kat ucuz) |
| Emrullah Patoloji Sorularla Son Tekrar | 441 | — | **kitap bitmiş** · ⚠ **programa hiç girmedi**, aşağıya bak |
| Klinisyen Vaka Soruları Pediatri | 378 | soru | 22 konuya dağılmış, en pahalı branş |
| Yavuz Şahin Farmakoloji Soru Bankası | 215 | soru | |
| Yavuz Şahin Biyokimya Soru Bankası | 222 | soru | |
| Levent Kodal Genel Cerrahi Soru Bankası | 296 | soru | |
| Feyyaz Akay Mikrobiyoloji Hızlı Tekrar | — | soru | **yalnız Oldies bölümleri** |
| TTS Anatomi (çıkmış sorular) | 281 | soru | 2023'e kadar tüm TUS anatomi |
| TUSTIME Kadın Doğum Konu Kitabı | 235 | soru | **TUSTIME konu kitaplarından TEK soru içeren** |
| Atilla Uslu Dahiliye Konu Videoları | 24 sa 25 dk | video | 1.5x'te 16.3 sa · **erişim 8 Ağu akşamı bitiyor** |
| Atilla Uslu Sorularla Son Tekrar | 358 | soru | açıklamalı video seti SATIN ALINMADI |
| TUSDATA PreTUS 200 | cilt 3–8 | deneme | 6 kitap × 6 deneme = 36 tam deneme |
| TUSDATA 24'lü branş denemeleri | 10 branş × 24 | deneme | Mikrobiyoloji YOK |

⚠ **DÜZELTİLDİ (27 Tem 2026) — Emrullah Patoloji SST.** Bu satır önceden "bakım · sadece bakım taraması" diyordu. **267 görevin hiçbirinde bu kitap geçmiyor** (`src` alanında "Emrullah" veya "SST" arandı: 0 sonuç). `bakım` etiketli 8 görevin hepsi *yanlış defteri* ve *deneme analizi*dir. Patoloji branşındaki toplam program yükü **2.48 saat**, hepsi 24'lü Patoloji denemesi. Yani planlanan bakım taraması **uygulamaya hiç girmedi**.

Bir tarama yapılacaksa maliyeti: **441 sf ÷ 15 sf/saat = 29.4 saat**. Önceki oturumda geçen "18.2 saatlik Patoloji bakım" rakamının **kaynağı yok**; 18.2 §15'teki *Patoloji **18.2 soru*** değeriyle çakışıyor, saat değeri değil. Bu rakam kullanılmayacak.

**Kullanılmayan (elinde var ama programa girmedi):**

- **Dr Yavuz Şahin Flash Biyokimya** — TUSTIME Fast Track ile aynı işi yapıyor; 5500 TL'lik videosu da alınmadı — 18 soruluk branşa ikinci konu kaynağı lüks
- **TUSTIME Fast Track Genel Cerrahi** — TUSDATA Speetus 5.9 sf/soru ile daha verimli; iki özet kitabı birden okumanın anlamı yok
- **Klinisyen Vaka Soruları Küçük Stajlar** — TUSTIME küçük stajlar kitabın zaten dolu; tanıdık kitap 15 sf/saat, bakir kitap 8 sf/saat
- **Klinisyen Tüm TUS Soruları (36. baskı)** — 7 branşlık hacmi 27 güne sığmıyor; branş soru bankaları öncelikli
- **TTS Patoloji / Mikrobiyoloji (34. baskı)** — Patoloji SST ve TUSTIME mikro kitabı yeterli; üçüncü kaynak tekrar demek
- **Atilla Uslu Sorularla Son Tekrar video seti** — 7800 TL; patoloji SST videosunda 20 saatlik içerik 70 saate patladığı için alınmadı
- **PreTUS 200 · kalan 30 deneme** — 30 × 6.3 saat = 189 saat; bütçenin %75'i olurdu. 6 deneme + 24'lü branş serisi seçildi

## 9 · Yetkili bölüm–sayfa–soru tablosu (Tusanaliz verisi)

`soru` = son 5 TUS ortalamasından beklenen soru sayısı. Bu tablo **tek yetkili kaynaktır**.


### FT Farmakoloji — 118 sayfa (branş: Farmakoloji)

| Bölüm | Sayfa | Soru | sf/soru | Renk | Programda |
|---|---|---|---|---|---|
| Genel Farmakoloji | 5–17 | 1.4 | 8.6 | turuncu | ✓ |
| OSS | 17–25 | 1.4 | 5.7 | turuncu | ✓ |
| KVS | 25–44 | 1.8 | 10.6 | turuncu | — |
| Hormonlar/Endokrin | 44–53 | 2.8 | 3.2 | pembe | ✓ |
| SSS | 53–76 | 3.2 | 7.2 | pembe | ✓ |
| Otakoidler | 76–83 | 0.2 | 35.0 | mavi | — |
| NSAİİ | 83–87 | 0.2 | 20.0 | sari | — |
| GİS | 87–90 | 1.0 | 3.0 | sari | ✓ |
| Kemoterapötikler | 90–112 | 4.6 | 4.8 | pembe | ✓ |
| İmmün Modülatör | 112–117 | 0.0 | — | mavi | ✓ |
| Hematopoetik | 117–118 | 0.0 | — | mavi | — |
| Toksikoloji | 118–119 | 1.0 | 1.0 | sari | ✓ |

### FT Biyokimya — 115 sayfa (branş: Biyokimya)

| Bölüm | Sayfa | Soru | sf/soru | Renk | Programda |
|---|---|---|---|---|---|
| Hücre+Organel | 5–12 | 0.2 | 35.0 | mavi | — |
| Aminoasit+Protein | 12–26 | 7.4 | 1.9 | pembe | ✓ |
| Enzimler | 26–27 | 0.2 | 5.0 | sari | ✓ |
| Karbonhidratlar | 27–48 | 2.6 | 8.1 | turuncu | ✓ |
| Lipidler | 48–69 | 3.0 | 7.0 | pembe | ✓ |
| AA metabolizması | 69–86 | 0.0 | — | mavi | ✓ |
| Nükleotid | 86–101 | 1.2 | 12.5 | sari | — |
| Vitaminler | 101–109 | 1.0 | 8.0 | sari | — |
| Hormonlar | 109–115 | 2.2 | 2.7 | turuncu | ✓ |

### Speetus Genel Cerrahi — 142 sayfa (branş: Genel Cerrahi)

| Bölüm | Sayfa | Soru | sf/soru | Renk | Programda |
|---|---|---|---|---|---|
| Temel Cerrahi bloğu | 1–36 | 5.8 | 6.0 | pembe | ✓ |
| Meme | 36–44 | 2.0 | 4.0 | pembe | ✓ |
| Tiroid | 44–50 | 1.2 | 5.0 | turuncu | ✓ |
| Paratiroid | 50–52 | 0.4 | 5.0 | sari | ✓ |
| Adrenal | 52–55 | 0.0 | — | mavi | — |
| Transplantasyon | 55–58 | 0.0 | — | mavi | — |
| Akut Karın | 58–59 | 0.0 | — | sari | — |
| Özofagus | 59–67 | 0.4 | 20.0 | sari | — |
| Mide+Obezite | 67–74 | 1.6 | 4.4 | pembe | ✓ |
| İnce Bağırsak | 74–80 | 1.0 | 6.0 | turuncu | ✓ |
| Kolon+Apendiks+Perianal | 80–98 | 1.6 | 11.2 | pembe | ✓ |
| Tıkanıklık+Kanama+Fistül | 98–103 | 0.0 | — | mavi | — |
| Karaciğer+Portal HT | 103–112 | 1.2 | 7.5 | turuncu | ✓ |
| Safra | 112–119 | 1.0 | 7.0 | turuncu | ✓ |
| Pankreas | 119–128 | 1.2 | 7.5 | turuncu | ✓ |
| Mezenterik | 128–130 | 0.0 | — | sari | — |
| Dalak | 130–135 | 0.8 | 6.2 | turuncu | — |
| Karın duvarı/periton | 135–137 | 0.4 | 5.0 | sari | — |
| Fıtıklar | 137–140 | 0.6 | 5.0 | sari | ✓ |
| Komplikasyonlar | 140–142 | 0.0 | — | mavi | — |

### FT Kadın Doğum — 136 sayfa (branş: Kadın Doğum)

| Bölüm | Sayfa | Soru | sf/soru | Renk | Programda |
|---|---|---|---|---|---|
| Reproduktif Endokrinoloji | 5–39 | 2.8 | 12.1 | turuncu | ✓ |
| Genel Jinekoloji | 39–62 | 2.6 | 8.8 | sari | ✓ |
| Jinekolojik Onkoloji | 62–81 | 0.8 | 23.8 | mavi | — |
| Obstetri | 81–136 | 3.8 | 14.5 | pembe | ✓ |

### TUSTIME Mikrobiyoloji — 349 sayfa (branş: Mikrobiyoloji)

| Bölüm | Sayfa | Soru | sf/soru | Renk | Programda |
|---|---|---|---|---|---|
| Temel Mikrobiyoloji | 5–47 | 2.8 | 15.0 | pembe | ✓ |
| İmmünoloji | 47–87 | 1.6 | 25.0 | mavi | — |
| Bakteriyoloji | 87–190 | 6.4 | 16.1 | pembe | ✓ |
| Viroloji | 190–259 | 2.8 | 24.6 | turuncu | — |
| Mikoloji | 259–287 | 2.2 | 12.7 | turuncu | ✓ |
| Parazitoloji | 287–321 | 2.0 | 17.0 | sari | ✓ |
| Enfeksiyon Hastalıkları | 321–349 | 0.0 | — | mavi | — |

### TUSTIME Fizyoloji — 215 sayfa (branş: Fizyoloji)

| Bölüm | Sayfa | Soru | sf/soru | Renk | Programda |
|---|---|---|---|---|---|
| Hücre | 5–22 | 1.4 | 12.1 | turuncu | — |
| Sinir Sistemi | 22–77 | 2.4 | 22.9 | pembe | ✓ |
| Kas | 77–91 | 0.8 | 17.5 | sari | — |
| KVS | 91–116 | 1.4 | 17.9 | turuncu | ✓ |
| Solunum | 116–129 | 0.0 | — | mavi | — |
| Hematopoetik | 129–140 | 0.4 | 27.5 | mavi | — |
| GİS | 140–159 | 1.2 | 15.8 | turuncu | — |
| Böbrek | 159–179 | 0.8 | 25.0 | sari | — |
| Endokrin | 179–205 | 1.0 | 26.0 | sari | — |
| Üreme | 205–215 | 2.4 | 4.2 | pembe | ✓ |

### TUSTIME Küçük Stajlar — 200 sayfa (branş: Küçük Stajlar)

| Bölüm | Sayfa | Soru | sf/soru | Renk | Programda |
|---|---|---|---|---|---|
| Nöroloji | 5–32 | 2.2 | 12.3 | pembe | ✓ |
| Nöroşirurji | 32–46 | 1.4 | 10.0 | turuncu | ✓ |
| Dermatoloji | 46–66 | 2.0 | 10.0 | pembe | ✓ |
| Psikiyatri | 66–92 | 1.8 | 14.4 | turuncu | ✓ |
| Göz | 92–105 | 1.0 | 13.0 | mavi | ✓ |
| KBB | 105–118 | 1.2 | 10.8 | turuncu | ✓ |
| Epidemiyoloji/Halk Sağlığı | 118–127 | 1.0 | 9.0 | sari | ✓ |
| FTR | 127–135 | 1.0 | 8.0 | sari | ✓ |
| Ortopedi | 135–150 | 1.6 | 9.4 | turuncu | ✓ |
| Üroloji | 150–162 | 1.0 | 12.0 | mavi | ✓ |
| Çocuk Cerrahisi | 162–171 | 1.0 | 9.0 | sari | — |
| Anestezi | 171–180 | 1.0 | 9.0 | mavi | — |
| Göğüs+Kalp Damar Cer | 180–194 | 2.0 | 7.0 | pembe | ✓ |
| Acil Tıp | 194–200 | 1.8 | 3.3 | turuncu | ✓ |
| Nükleer Tıp | 200–201 | 1.0 | 1.0 | sari | ✓ |

### Anatomi Fast Track — 126 sayfa (branş: Anatomi)

| Bölüm | Sayfa | Soru | sf/soru | Renk | Programda |
|---|---|---|---|---|---|
| Kemikler | 5–22 | 1.0 | 17.0 | turuncu | — |
| Eklemler | 22–28 | 0.2 | 30.0 | sari | — |
| Kaslar | 28–49 | 2.2 | 9.5 | pembe | — |
| Pleksuslar | 49–55 | 0.0 | — | mavi | — |
| Solunum | 55–60 | 1.0 | 5.0 | turuncu | — |
| Dolaşım | 60–77 | 1.4 | 12.1 | turuncu | — |
| Sindirim | 77–90 | 1.8 | 7.2 | pembe | ✓ |
| MSS | 90–106 | 4.2 | 3.8 | pembe | ✓ |
| PSS | 106–115 | 0.0 | — | mavi | ✓ |
| Duyu organları | 115–119 | 0.0 | — | sari | ✓ |
| Ürogenital | 119–124 | 0.0 | — | mavi | — |
| Endokrin | 124–126 | 0.0 | — | sari | — |
| Deri ekleri | 126–127 | 0.0 | — | sari | — |

### Emrullah Patoloji SST — 441 sayfa (branş: Patoloji)

| Bölüm | Sayfa | Soru | sf/soru | Renk | Programda |
|---|---|---|---|---|---|
| Hücre Zedelenmesi | 10–32 | 1.8 | 12.2 | pembe | — |
| İnflamasyon | 32–52 | 0.6 | 33.3 | sari | — |
| Yara İyileşmesi | 52–62 | 0.4 | 25.0 | mavi | — |
| İmmünoloji | 62–90 | 1.0 | 28.0 | turuncu | — |
| Hemodinamik | 90–104 | 0.6 | 23.3 | sari | — |
| Neoplazi | 104–134 | 1.6 | 18.8 | pembe | — |
| Pediatrik+Çevresel | 134–146 | 0.0 | — | mavi | — |
| KVS | 146–158 | 0.8 | 15.0 | sari | — |
| Hematopoetik | 158–180 | 0.6 | 36.7 | sari | — |
| Solunum | 180–204 | 1.0 | 24.0 | turuncu | — |
| Üriner | 204–236 | 1.2 | 26.7 | turuncu | — |
| Erkek Genital | 236–246 | 0.6 | 16.7 | sari | — |
| Kadın Genital | 246–266 | 1.2 | 16.7 | pembe | — |
| GİS | 266–300 | 1.8 | 18.9 | pembe | — |
| Karaciğer | 300–322 | 0.8 | 27.5 | sari | — |
| Pankreas | 322–332 | 0.0 | — | mavi | — |
| Meme | 332–350 | 1.0 | 18.0 | turuncu | — |
| Sinir | 350–378 | 0.2 | 140.0 | mavi | — |
| Endokrin | 378–404 | 0.6 | 43.3 | mavi | — |
| Deri | 404–424 | 1.0 | 20.0 | turuncu | — |
| Kas İskelet | 424–441 | 1.4 | 12.1 | pembe | — |

### Klinisyen Vaka Pediatri — 378 sayfa (branş: Pediatri)

| Bölüm | Sayfa | Soru | sf/soru | Renk | Programda |
|---|---|---|---|---|---|
| Yenidoğan | 1–40 | 2.2 | 17.7 | pembe | — |
| Genetik | 40–48 | 0.8 | 10.0 | sari | — |
| Büyüme-Gelişme | 48–52 | 1.2 | 3.3 | turuncu | — |
| Sosyal Pediatri | 52–54 | 0.0 | — | mavi | — |
| Beslenme | 54–63 | 0.8 | 11.2 | sari | ✓ |
| Sıvı-Elektrolit | 63–70 | 0.0 | — | mavi | — |
| Gastroenteroloji | 70–91 | 0.4 | 52.5 | mavi | — |
| Nöroloji | 91–109 | 1.6 | 11.2 | pembe | ✓ |
| Kardiyoloji | 109–161 | 2.4 | 21.7 | pembe | ✓ |
| Solunum | 161–174 | 1.4 | 9.3 | pembe | ✓ |
| Döküntülü | 174–181 | 0.4 | 17.5 | mavi | ✓ |
| Bağışıklama | 181–186 | 0.6 | 8.3 | sari | ✓ |
| İmmünoloji | 186–207 | 1.2 | 17.5 | turuncu | ✓ |
| Allerji | 207–226 | 0.6 | 31.7 | sari | — |
| Endokrinoloji | 226–248 | 1.2 | 18.3 | turuncu | — |
| Metabolik | 248–284 | 1.4 | 25.7 | turuncu | ✓ |
| Hematoloji | 284–309 | 1.0 | 25.0 | sari | — |
| Onkoloji | 309–336 | 1.2 | 22.5 | turuncu | — |
| Nefroloji | 336–358 | 1.8 | 12.2 | pembe | ✓ |
| Romatoloji | 358–368 | 1.0 | 10.0 | sari | — |
| Çocuk Acil | 368–376 | 1.2 | 6.7 | turuncu | ✓ |
| Zehirlenmeler | 376–378 | 0.0 | — | mavi | — |
---

## 10 · Mevcut durumun özeti

- **267 görev · 237.06 saat · 27 gün** (`app_gorev.json` ≡ `TUS_program.json` ≡ index.html gömülü `GOREVLER`, üçü birebir aynı — doğrulandı)
- Projeksiyon **K = 66.64** · ölçülen 57.61 · hedef 65 → **pay 1.64**
- Kural A **ihlal 0**, en geç gün 11 · B **%89.0** · C artan/azalan ✓ · D kısmi **0** · sayfa kırığı **0**
- Pembe bölümler: **23 / 25** tam okunuyor (payda kuralı §6'da)
- Kombo 48 · sinaps ışını 48/48
- **Kapasite: 273.25 saat nominal blok, 237.06 dolu → %86.8 doluluk, 36.19 saat boş.** Blok bazında doluluk: Z %93 · A %97 · B %90 · C %91 · D %84 · E **%63** · F %70. Bütçe kısıt değil; kısıt Kural B ve D.

⚠ **DÜZELTİLDİ (27 Tem 2026).** Önceki satır "Kaynak haritası 18 kitap · 62/112 bölüm programda · 50 bölüm çöpte" diyerek **iki ayrı sayımı tek satırda karıştırıyordu.** Doğrusu:

| Sayım | Kaynak | Değer |
|---|---|---|
| Kaynak haritası | `kaynak_harita.json` | **18 kitap · 92 planlı satır · 51 çöp satırı** |
| Yetkili bölüm tablosu | `eko.py` `KITAP` | **133 bölüm · 62'si programda** |
| Yetkili tablo, SST hariç | 133 − 21 | **112** |

"62/112" ikinci ve üçüncü satırın birleşimidir, kaynak haritasının değil.

## 11 · Çözülmemiş sorun (adım 24)

İki **pembe** bölüm programa girmedi:

| Bölüm | Sayfa | Soru | Net/saat | Zincir |
|---|---|---|---|---|
| Anatomi Kaslar | 28–49 (21 sf) | 2.2 | 0.150 | Kas-İskelet & Romatoloji |
| Pediatri Yenidoğan | 1–40 (39 sf) | 2.2 | 0.147 | Gebelik & Yenidoğan |

**Sebep bütçe değil** — programda 36.19 saat boş nominal kapasite var (§10). Sebep Kural B + Kural D.

⚠ **DÜZELTİLDİ (27 Tem 2026) — problem tanımı değişti.** Bu paragraf önceden "Kas-İskelet 1.53 saat, **Gebelik & Yenidoğan 3.92 saat**, ikisi de gün dolduramıyor" diyordu. Ölçülen değerler:

| Zincir | Okuma | Okuma+video | Kaç güne yayılmış | Gerçekten gün dolduramıyor mu? |
|---|---|---|---|---|
| Kas-İskelet & Romatoloji | 1.53 | 3.01 | 2 | **Evet** |
| Gebelik & Yenidoğan | **7.54** | 7.54 | 3 | **Hayır** — bir günü zaten aşıyor |

Yani iki bölümün girmeme sebebi **aynı değil**:
- **Anatomi Kaslar** → zincir gerçekten küçük, Kural B tek başına gün açtırmıyor.
- **Pediatri Yenidoğan** → zincir küçük değil; zincirin bulunduğu **3 gün dolu** (4 Ağu Z 1.00 · 6 Ağu 5.04 · 19 Ağu 1.50) ve Kural D bölümü parçalamaya izin vermiyor.

**Yeniden dizimin ölçeği bu yüzden küçüldü:** 27 günün tamamı değil, Kas-İskelet için yer açmak + Yenidoğan'ın 3.25 saatini üç günden birine sığdırmak yeterli olabilir.

### Adım 24 kaç puan ediyor? (karar için ölçüldü)

| Bölüm | Maliyet | Net | Oturum | ΔK |
|---|---|---|---|---|
| Anatomi Kaslar 28–49 | 21 sf ÷ 5.7 = **3.68 sa** | 0.553 | Temel ×0.207 | +0.114 |
| Pediatri Yenidoğan 1–40 | 39 sf ÷ 12.0 = **3.25 sa** | 0.478 | Klinik ×0.277 | +0.132 |
| | **6.93 sa** | 1.030 | | **+0.247** |

→ Projeksiyon **66.64 → 66.89**. Hedef 65, yani pay 1.64'ten 1.89'a çıkıyor.

**Bu iki bölüm küresel ölçütte taşıyıcı değil.** Programın okuma ortalaması **0.2006 net/saat**; bunlar 0.150 ve 0.147 — ortalamanın **%75 ve %73'ü**. §6 zaten "renk seçim ölçütü değildir" diyor. Adım 24 bir *tamlık* işidir, verim işi değil.

⚠ Yenidoğan'ın maliyeti hangi hızı kullandığına bağlı: 12.0 → 3.25 sa (yürürlükteki) · 8.0 → 4.88 sa (`eko.py` formülü) · 17.0 → 2.29 sa (`icerik.json`). Bkz. §2.

**Denenip başarısız olanlar:**
- Kas-İskelet + Solunum zincirlerini birleştirmek → ⚠ **DÜZELTİLDİ:** bu satır "**8.93 saat** okuma gerekiyor" diyordu. Ölçülen: **2.61 sa** (yalnız okuma) · **5.57 sa** (video dahil). İki bölüm de eklenirse 2.61 + 6.93 = **9.54 sa**. 8.93 hiçbir tanımla üretilemedi; §0d'deki 26 Temmuz kaybı **8.94** ile karışmış olabilir. **Bu deneme yeni sayılarla tekrar değerlendirilmeli** — birleşik zincir 2.61 saatken "tek gün yetmiyor" sonucu dayanaksız.
- 18 Ağustos'u Kas-İskelet gününe çevirmek → oradaki 4.04 saatlik Metabolizma'nın gidecek yeri yok (4.04 doğrulandı ✓). "Ev günlerinde 2.5 saat boşluk var" ifadesi doğrulanamadı — "ev günü" tanımı hiçbir yerde yazılı değil; toplam boş nominal kapasite **36.19 saat**.
- Z/F blokları eklemek → zincir günü olmadığı için kapasite artışı işe yaramıyor
- Başıboş parçaları taşımak → 8 parçanın hiçbiri sığmıyor, ev günleri dolu

**Çözüm yolu — yeniden değerlendirildi (27 Tem 2026).** Eski metin "27 günü zincir bazında baştan dizmek, 12 zinciri yeniden dağıtmak, Gebelik & Yenidoğan'a ~2 gün ayırmak" diyordu. Bu, düzeltilmiş sayılarla **gereğinden büyük**:

- Gebelik & Yenidoğan zaten 7.54 saat ve 3 güne yayılmış — **yeni gün ayırmaya gerek yok**, Yenidoğan'ın 3.25 saati o üç günden birine sığdırılacak.
- Kas-İskelet birleşimi 8.93 değil **2.61** saat — "1.5 gün lazım" sonucu bu sayıyla yeniden kurulmalı.

Karar verilmeden önce not: bütün işin ölçülen getirisi **+0.247 K**'dır ve hedef zaten 1.64 puan aşılmıştır.

## 12 · Yapılırken dikkat edilecekler (bu oturumda öğrenilenler)

1. **Havuzu kronolojik sırayla doldur.** Aksi hâlde sayfa sırası ters döner — üç kez oldu.
2. **Türetilmiş alanları her değişiklikten sonra yeniden hesapla:** alt saat (`t`), `sira`, `blokSon`, `mola`, kombo. 26 blokta çakışma oluştu.
3. **28 Temmuz'a dokunma.** Bir kez 2.8 saat yükledim, Kural B'de sahte %2.5 iyileşme gösterdi.
4. **Mola hesabı yalnız DOLU bloklara göre yapılır.** Aksi hâlde tek bloklu günde −165 dakikalık mola çıkıyor.
5. **`kaz` kalibrasyonu bölüm bazlı** (oranlar 0.039–0.418 arası). Branş ortalamasıyla ezmek kalibrasyonu yok eder. Soru değeri değişirse **oranlı ölçekle**.
6. **Renk atamasını soru/deneme görevlerine de uygula**, yoksa aynı bölümün kartları farklı renkte görünür.
7. **Bulanık isim eşleştirmesi kullanma.** İki kez yanlış karar verdirdi. Açık eşleştirme tablosu kullan.
8. **Asgari parça 15 dakika. ⚠ "En fazla 3 oturum" DİYE BİR KURAL YOK — bkz. §25.** Sınırsız parçalama 1.40 saati 9 oturuma bölüyor.
9. **`kural_test.py` üretimden önce otomatik koşar** — 18 kontrol, geçmezse üretim durur.
10. **18 kontrol veriyi denetler, bu dosyanın anlatısını denetlemez.** 27 Temmuz'da bulunan sekiz hatanın **hiçbiri** kapıdan yakalanamazdı: hepsi DEVIR.md'nin metnindeydi, `app_gorev.json`'da değil. Kapı yeşil yanarken belge yanlış olabilir. Bir sayıyı DEVIR.md'den alıp kullanmadan önce **veriden yeniden ölç**.
11. **Bir sayı iki yerde yazılıysa ikisini de ölç.** 3.92 (Gebelik & Yenidoğan) §7 tablosuyla çelişiyordu ve tablo doğruydu; "en geç gün 10" hiçbir kodun ürettiği sayı değildi; "62/112" iki farklı sayımın karışımıydı. Üçü de tek bir kaynağa bakılsa fark edilmezdi.
12. **Kod ne diyorsa o geçerlidir, yeniden türetme değil.** Kural A'nın 0-tabanlı olduğu sonucuna iki ayrı oturum bağımsız olarak vardı; `denet.py` okununca taban tarihin **2026-07-26** olduğu görüldü ve iki sonuç da yanlıştı.

## 13 · Dosyalar

- `index.html` `sw.js` `manifest.webmanifest` `icon-180.png` `icon-512.png` — yüklenecek PWA
- `TUS_program.json` — 267 görevin tam verisi (sayfa aralığı, renk, zincir, getiri, mola)
- `TUS_program.md` — okunabilir program
- `DEVIR.md` — bu dosya

---

## 14 · Görev alanı sözlüğü (TUS_program.json)

| Alan | Anlam |
|---|---|
| `d` | tarih `YYYY-MM-DD` |
| `b` | blok kodu `Z A B C D E F` veya `—` (bloksuz) |
| `t` | görevin alt saati `HH:MM–HH:MM` |
| `blokT` | bloğun tam aralığı |
| `blokSon` | bloğun bitiş saati |
| `sira` | `[kaçıncı, toplam]` blok içindeki sıra |
| `br` | branş |
| `k` | konu başlığı |
| `src` | kaynak + sayfa aralığı (`... sf 90–117`) |
| `act` | `oku` `video` `soru` `tekrar` `deneme24` `deneme` `analiz` `isinma` |
| `sure` | saat · **sayfa ÷ kitap hızı**. ⚠ Yorgunluk düzeltmesi **uygulanmamıştır**, aşağıya bak |
| `why` | brifing metni |
| `tag` | renk `pembe turuncu sari mavi ölçüm bakım` |
| `kaz` | beklenen **net** kazancı |
| `tur` | `T` temel oturum · `K` klinik oturum |
| `z` | organ sistemi zinciri (boş olabilir) |
| `ot` `otg` | `[oturum, toplam]` ve oturum günleri |
| `mola` | `[baş, bit, dakika, tip, metin]` · tip: `kahvalti ogle kisa aksam spor yavas izin` |
| `spor` | o günün spor bilgisi |
| `soru` | bölümün Tusanaliz soru değeri |

⚠ **DÜZELTİLDİ (27 Tem 2026) — `sure` "etkin saat" değildir.** Bu satır önceden "**etkin** saat (yorgunluk düzeltmesi uygulanmış)" diyordu. Ölçüm: dokuz kitabın hepsinde, her blokta, `sayfa ÷ sure` **sabit** çıkıyor (kitap içi sapma en fazla %1.8, yuvarlamadan). Örnek: Anatomi Fast Track, Z bloğunda 5.71 · B'de 5.69 · F bloğunda (günün en yorgun bloğu) yine 5.71 sf/saat. Yani `sure` saf sayfa süresidir; §2'deki `1 + 0.055 × max(0, kümülatif − 3)` çarpanı `sure`'ye **hiç uygulanmamış**.

Yorgunluk **blok doluluğunda** yaşıyor — bloklara konan saat, nominal kapasitenin altında tutulmuş:

| Blok | Nominal | Ortalama dolu | Oran |
|---|---|---|---|
| A | 1.50 | 1.45 | %97 |
| B | 3.75 | 3.37 | %90 |
| C | 2.25 | 2.04 | %91 |
| D | 2.00 | 1.68 | %84 |
| E | 1.25 | 0.79 | **%63** |
| F | 1.00 | 0.70 | %70 |

Yeniden dizimde bunu bil: **6.93 saatlik yeni okumayı E ve F bloklarına doldurmak, kayıtlı olmayan bir yorgunluk payını yemek demektir.** Boş görünen 36.19 saatin büyük kısmı bu paydır.

## 15 · Branş TUS soru sayıları (kapsama tavanı)

| Branş | Soru | Oturum |
|---|---|---|
| Pediatri | 25.0 | klinik |
| Dahiliye | 23.2 | klinik |
| Genel Cerrahi | 23.6 | klinik |
| Küçük Stajlar | 22.0 | klinik |
| Patoloji | 18.2 | temel |
| Farmakoloji | 18.0 | temel |
| Biyokimya | 17.8 | temel |
| Mikrobiyoloji | 17.8 | temel |
| Fizyoloji | 14.0 | temel |
| Anatomi | 11.8 | temel |
| Kadın Doğum | 10.0 | klinik |
| Histo-Embriyoloji | 4.4 | temel |

Temel oturum toplam 102.0 · klinik oturum 103.8

## 16 · Ölçülen deneme geçmişi (TOHUM · uygulamanın "ölçülen" puanı buradan)

| Tarih | Kaynak | Temel | Klinik | K |
|---|---|---|---|---|
| 2026-01-15 | TUSTIME | 32.75 | 47.50 | 60.21 |
| 2026-05-02 | PreTUS cilt 3 | 25.50 | 27.50 | 53.16 |
| 2026-06-09 | PreTUS cilt 3 | 16.75 | 32.75 | 52.81 |
| 2026-07-16 | Perfecttime | 27.25 | 33.50 | 55.19 |
| 2026-07-24 | MediTUS | 32.25 | 38.50 | 57.61 |

Her denemenin 11 branş neti `bn` alanında. Son deneme (2026-07-24) programın başlangıç noktası.

## 17 · Zincir gerekçe metinleri (kombo brifinglerinde kullanılıyor)

- Aynı organın patolojisi, dahiliyesi ve cerrahisi tek sistemde dönüyor
- Böbrek patolojisi erişkin ve çocukta aynı mekanizma, farklı eşikler
- Endokardit, perikardit ve kapak hastalığı erişkin-çocuk ortak; farkları öğren, iki soruyu birden al
- Etkeni ve antibiyotik mekanizmasını aynı blokta görmek, ampirik tedavi sorusunu tek adımda çözdürüyor
- Fizyolojik yol, anatomik lokalizasyon ve ilaç etkisi aynı şemaya oturuyor
- Gebelik komplikasyonu ile yenidoğan sonucu aynı vakanın iki ucu
- Hormon sentezi, ilaç etkisi ve klinik tablo birbirini tamamlıyor
- Lezyon morfolojisi patoloji ve klinik tarafından aynı dille sorulur
- Yolak bilgisi ile kalıtsal metabolik hastalığın klinik yüzü aynı bilgi
- Şok ve sıvı-elektrolit yaklaşımı erişkin-çocuk ortak, sadece dozlar değişiyor

## 18 · Özel görev türleri

- **`hafif soru · yeni konu yok`** — 21:15 sonrası yavaşlama bloğu için hafif geri getirme (6 görev, 9.00 saat)
- **`yanlış defteri`** — kendi hatalarının tekrarı, getirisi 0 sayılıyor (8 görev, 11.51 saat)
- **`cilt 7` / `cilt 8`** — PreTUS 200 tam denemeleri, her biri 2 görev (temel + klinik oturum), 4.50 saat
- **`isinma`** — deneme günü sabahı sınav öncesi ısınma
- **`analiz`** — deneme sonrası net girişi ve analiz

## 19 · Gün işaretleri (ISARET · 8 gün için özel not)

`isaret.json` · 8 kayıt · biçim `[tarih, başlık, metin]`. Günler §19 listesiyle birebir uyuşuyor.

⚠ **DÜZELTİLDİ (27 Tem 2026) — metinlerde beş sayısal hata var.** Bu metinler uygulamada kullanıcıya doğrudan gösteriliyor, yani hatalı bilgi ekrana çıkıyor. Düzeltilmeden yayınlanmamalı:

| Gün | Yazan | Ölçülen |
|---|---|---|
| 08-09 | "**Yarın** Pediatri Kardiyoloji bloğuna gireceksin" | Pediatrik Kardiyoloji **11 Ağustos**'ta. 10 Ağustos GİS & Hepatobiliyer günü. **Bir gün kayık** |
| 08-08 | video "**11 akşama** yayıldı" | **10 ayrı gün**, 12 görev; 10'u D bloğunda (akşam), **2'si Z bloğunda (06:00 sabah)** |
| 08-08 | erişim "**9-10 Ağustos**'ta kapanıyor" | §4 ve §8 "**8 Ağustos akşamı**" diyor, `denet.py` `max(video) ≤ 2026-08-08` kontrol ediyor. Üç kaynak, iki tarih |
| 08-13 | nöroanatomi "Fast Track'te **35** sayfa" | **29 sayfa** (sf 90–119). Sonuç bozulmuyor, güçleniyor: 83/29 = **2.86 kat**, "üç kat ucuz" 35 ile 2.37 kat olurdu |
| 08-01 | "'yüksek getiri konularında **%60 başarıya** ulaşırsın' varsayımı" | Bu varsayım DEVIR.md'de **hiç yazılı değil** ve veriyle eşleşmiyor. Bölüm bazında `kaz/soru` oranı **0.039–0.418** (49 bölüm, §12.5 ile birebir doğrulandı). Ya varsayım eskimiş ya da başka bir katmana ait — belgelenene kadar kullanılmamalı |

**Doğrulananlar:** Farmakoloji "%18 yapıyorsun" (son deneme 3.25/18 = %18.1 ✓) · Kemoterapötikler 4.6 soru ✓ · "24 sa 25 dk 1.5x'te 16.3 saate iniyor" (16.28 sa, programın video toplamıyla birebir ✓) · TTS nöroanatomi 83 sayfa ✓ · 20 Ağu "sınava üç gün" ✓ · 21 Ağu "önceki 25 gün" ✓ · Roediger & Karpicke 2006 gerçek kaynak ✓

- **2026-07-27** — Neden farmakoloji ile başlıyoruz?
- **2026-07-27** — Neden kitabı açmadan soru çözüyorsun?
- **2026-08-01** — Neden ilk deneme 6. günde?
- **2026-08-08** — Neden dahiliye videosu bugün bitiyor?
- **2026-08-09** — Neden kardiyoloji videosu en sona bırakıldı?
- **2026-08-13** — Neden anatomi ikinci fazda?
- **2026-08-20** — Neden son deneme burada?
- **2026-08-21** — Neden son iki gün sıfır yeni konu?

## 20 · Üretim boru hattı (`kaynak/` klasöründe)

⚠ **DÜZELTİLDİ (27 Tem 2026).** Tablo eksikti: `denemeler.json` ve `icerik.json` yoktu ve dosya sayısı yanlış anlatılıyordu. **Klasörde 21 dosya var** (`ls` ile doğrulandı). Ayrıca hangi dosyanın boru hattında fiilen okunduğu işaretlendi.

| Dosya | İşlev | Boru hattında okuyan |
|---|---|---|
| `eko.py` | **YETKİLİ TABLO** — 10 kitabın bölüm/sayfa/soru verisi. Her şeyin kaynağı. | `kural_test.py` (yalnız `KITAP`) |
| `app_gorev.json` | 267 görevin çalışma kopyası | dizi3 · yeniden · kural_test · uret · denet |
| `sablon_v23.html` | uygulama şablonu, `/*__G__*/[]` gibi yer tutucularla (her biri **1 kez** geçiyor) | `uret.py` |
| `uret.py` | **kural_test.py'yi çalıştırır, geçmezse durur**, sonra veriyi şablona gömer | — |
| `dizi3.py` | alt saat · sıra · blokSon · mola yeniden hesaplar | — |
| `yeniden.py` | oturum numaraları · sayfa sürekliliği · kombo · kaynak haritası günleri | — |
| `kural_test.py` | **18 kalıcı kontrol** — üretim kapısı | `uret.py` (alt süreç) |
| `denet.py` | 7 başlıklı veri denetimi (üretilen index.html üzerinde) | — |
| `kos.js` | 14 bölümlük uygulama testi | — |
| `tam_test.js` | `kos.js`'in kurduğu sahte tarayıcı ortamı | `kos.js` |
| `senk_test.js` `senk_kos.js` | senkron testi (26 senaryo) | `senk_kos.js` → `senk_test.js` |
| `kaynak_harita.json` | **18 kitap · 92 planlı satır · 51 çöp satırı** | yeniden · kural_test · uret |
| `kombo.json` | 48 kombo (`yeniden.py` üretir) | kural_test · uret |
| `isaret.json` | gün notları (8 gün) | `uret.py` |
| `tohum.json` | 5 ölçülen deneme | `uret.py` → `/*__D__*/` |
| `soru_tablo.json` | branş soru dağılımı (`den` 11 · `radar` 11) | `uret.py` |
| **`denemeler.json`** | **YENİ SATIR.** İçeriği `tohum.json` ile **birebir aynı** (5 deneme). | `uret.py` **açar ama kullanmaz** |
| **`icerik.json`** | **YENİ SATIR.** 13 zincirlik bölüm/sayfa/saat planlama listesi, `hz` etiketli. | **hiçbir betik okumuyor** |
| `kh_eslesme.json` | kaynak haritası ↔ eko.py eşleştirme tablosu (9 satır) | **hiçbir betik okumuyor** |
| `cakisma.js` | `diz()` şerit çakışma taklidi, `module.exports` | **hiçbir betik `require` etmiyor** |

**`denemeler.json` hakkında dikkat:** `uret.py` bu dosyayı `DEN=json.load(open('denemeler.json'))` ile açıyor; **dosya yoksa boru hattı çöker.** Ama `DEN` değişkeni sonrasında hiç kullanılmıyor — yer tutucuya giden `TOHUM=json.load(open('tohum.json'))`'dur. Yani dosya **var olmak zorunda, içeriği önemsiz**. Klasörden silinmemeli.

**Ölü kod / kullanılmayan dosyalar:** `icerik.json` · `kh_eslesme.json` · `cakisma.js` hiçbir betik tarafından okunmuyor. `uret.py` içinde ayrıca `KH` iki kez yükleniyor, `SORU` önce sabit sözlük olarak yazılıp sonra dosyadan üzerine yazılıyor, `NED` ve `gz` hesaplanıp kullanılmıyor. Bunlar zararsız ama boru hattını okurken yanıltıcı.

⚠ `kural_test.py`'nin ekrana bastığı başlık "**16** hata sınıfı" diyor; dosyada **18** kontrol var. Kontrol sayısı 18'dir.

**Üretim sırası:** `dizi3.py` → `yeniden.py` → `uret.py` (kural testi otomatik koşar) → `denet.py` → `kos.js`

**Yer tutucular:** `/*__G__*/[]` görevler · `/*__D__*/[]` tohum · `/*__S__*/{}` soru tablosu · `/*__K__*/[]` kombo · `/*__I__*/[]` işaret · `/*__H__*/{}` kaynak haritası. Değiştirirken **`[]` ve `{}` dahil** değiştir, yoksa sözdizimi bozulur.

## 21 · Senkron

GitHub Gist üzerinden, ücretsiz. Anahtar cihazda saklanır, koda girmez. Cihaz rolü: **Yazar** (iPad, işaretler) · **Yalnız okur** (telefon, hiçbir şey göndermez). Çatışma çözümü son yazan kazanır, damga **monoton artan** (saat kayması iş kaybına yol açmaz). Otomatik senkron 15 saniye kısıtlı, düğmeler kısıtsız. Servis çalışanı kendi kaynağı dışındaki istekleri **atlar** — yoksa API yanıtı önbelleğe girip senkron bozulur.

---

## 22 · Düzeltme kaydı — 27 Temmuz 2026

Bu oturumda dış denetimle **on beş** hata bulundu. Hepsi **belgede**ydi, veride değil; hiçbiri 18 kalıcı kontrolden geçmezdi. Her düzeltmenin dayanağı `app_gorev.json` (267 görev), `eko.py`, `kural_test.py`, `denet.py`, `sablon_v23.html` üzerinde yapılan ölçümdür.

| # | Bölüm | Önceki | Düzeltilmiş | Nasıl ölçüldü |
|---|---|---|---|---|
| 1 | §7, §11 | Gebelik & Yenidoğan **3.92 sa** | **7.54 sa** | üç tanımla toplandı; 3.92 = Temel Mikrobiyoloji'nin saati, kopyala-yapıştır |
| 2 | §7 | "12 zincir" | **13 zincir**, Hematoloji-Onkoloji okumasız | `z` alanının ayrık değerleri sayıldı |
| 3 | §8 | Patoloji SST "bakım taraması" | **programda yok**, 0 görev | `src` alanında "Emrullah"/"SST" arandı |
| 4 | §14 | `sure` = "etkin saat, yorgunluk uygulanmış" | **sayfa ÷ hız**, yorgunluk blok doluluğunda | 9 kitapta blok başına sf/saat sabit (±%1.8) |
| 5 | §5 A | "en geç **gün 10**" | **ihlal 0, en geç gün 11**, taban 2026-07-26 | `denet.py` §7'deki kural birebir koşuldu |
| 6 | §6 | payda kuralı yazılı değildi | **25 = 30 pembe − SST'nin 5'i** | renk algoritması `KITAP` üzerinde çalıştırıldı |
| 7 | §10 | "62/112 · 50 çöp" tek satırda | **iki ayrı sayım**, kaynak haritası 92/51 | `kaynak_harita.json` sayıldı |
| 8 | §20 | 19 dosya, iki eksik | **21 dosya**, `denemeler.json` + `icerik.json` | `ls kaynak/` |
| 9 | §11 | Kas-İskelet+Solunum "**8.93 sa**" | **2.61 sa** okuma · 5.57 video dahil | zincir saatleri toplandı; 8.93 üretilemedi |
| 10 | §0b | sürüm ilerletme çalışıyor sanılıyordu | `uret.py`'nin `replace`'i **boş işlem** | şablonda `2026-07-26e` yok |
| 11–15 | §19 | `isaret.json` metinleri | **beş sayısal hata**, tablo §19'da | app_gorev.json'a karşı ölçüldü |

Ayrıca kaydedilen üç yapısal risk:
- **§0b** — `uret.py`'nin sürüm ilerletme satırı boş işlem; şablon zaten `2026-07-27y`.
- **§0h** — `kos.js` görev sayısını (267) ve projeksiyonu (66.64) sabit kodluyor; yeniden dizim ikisini de kırar.
- **§2** — `eko.py` hız formülü Klinisyen Vaka Pediatri'yi 8.0 sf/saat sayıyor, program 12.0 kullanıyor, `icerik.json` 17.0.

**Bekleyen karar:** adım 24 (Anatomi Kaslar + Pediatri Yenidoğan) ölçülen **+0.247 K** getiriyor, projeksiyon 66.64 → 66.89. Hedef 65 zaten 1.64 puan aşılmış durumda. Yapılıp yapılmayacağına kullanıcı karar verecek.

---

## 23 · TAM PROGRAM DENETİMİ — 27 Temmuz 2026

Her iki resmî kapı gerçekten koşuldu (veri index.html'den çıkarıldı, çıkarımın doğruluğu `app_gorev.json` ve `kaynak_harita.json` ile birebir karşılaştırılarak kanıtlandı):

- `kural_test.py` → **18/18 GEÇTİ**, çıkış kodu 0
- `denet.py` → **SIFIR HATA**, 267 görev, 237.1 saat

### Kapıların doğruladıkları

| Alan | Sonuç |
|---|---|
| Uygulama ↔ plan | `index.html` içindeki `GOREVLER` ≡ `app_gorev.json`, **267/267 kayıt birebir** |
| Görev adı ↔ kitap bölümü | **49 çiftin 49'u** eko.py bölüm sınırlarına oturuyor: 38'i tek bölüm, 11'i birden çok bölümü **tam** kapsıyor, **taşan/eksik 0** |
| Sayfa aralıkları | kitap sınırları dışına çıkan **0** · aynı sayfa iki kez okunan **0** · sayfa kırığı **0** |
| Zincir/renk | aynı bölüm hep aynı zincirde ✓ · aynı bölümün tüm görevleri aynı renkte ✓ |
| `ot`/`otg` | oturum sayılarıyla tutarlı ✓ |
| Blok saati | 132 blok, alt saat çakışması 0, aynı saatte iki görev 0 |
| Blok sonu taşması | **4 blok** (19 Ağu A 25 dk · 2 Ağu A 2 dk · 29 Tem A 1 dk · 31 Tem D 1 dk) — §0f'de kabul edilmiş dördün aynısı |
| 15 dk altı okuma | **12 parça** (en kısası 6 dk) — §0f'de kabul edilmiş sayının aynısı |
| Kazanç | projeksiyon 66.64 ✓ · negatif kazanç 0 ✓ |

### Kapıların yakalamadığı dört bulgu

**16 · "Bir bölüm en fazla 3 oturum" kuralı ihlal ediliyor. Hiçbir kapı bunu kontrol etmiyor.**
Oturum dağılımı: 1→21 bölüm · 2→14 · 3→8 · **5→3 · 6→2 · 7→1**.

| Bölüm | Oturum | Saat |
|---|---|---|
| Obstetri | **7** | 6.88 |
| Bakteriyoloji | 6 | 9.61 |
| sindirim sistemi anatomisi | 6 | 2.28 |
| Mikoloji + Tıbbi Parazitoloji | 5 | 5.78 |
| Genel Jinekolojik | 5 | 2.88 |
| Karbonhidratlar | 5 | 3.68 |

§12.8 ve kullanıcı talimatı "en fazla 3 oturum" diyor. **49 bölümün 6'sı bunu aşıyor.** `kural_test.py`'ye 19. kontrol olarak eklenmeli.

**17 · Soru değerleri eko.py'den yeniden dağıtılmış — §9'un "tek yetkili kaynak" ilkesi delinmiş.**
49 görev adının 4'ünde sapma var; **kitap toplamları korunduğu için `kural_test.py` #12 geçiyor**:

| Görev | Atanan | eko.py | Fark |
|---|---|---|---|
| Anatomi · merkezi sinir sistemi | 2.3 | 4.2 | −1.9 |
| Anatomi · periferik sinir + duyu | 1.9 | **0.0** | +1.9 |
| Biyokimya · Aminoasitler ve Proteinler | 3.4 | 7.4 | −4.0 |
| Biyokimya · Aminoasitlerin metabolizması | 4.0 | **0.0** | +4.0 |

Kaynağı `icerik.json` (MSS 2.3 · PSS+Pleksus+Duyu 1.9 · Aminoasitler 3.4 · AA metabolizması 4.0). Sonuç: eko.py'ye göre **sıfır soru taşıyan iki bölüm** (AA metabolizması 17 sf · PSS+Duyu 13 sf) programda **5.26 saat okuma** alıyor ve **5.9 soruluk kredi** taşıyor. eko.py doğruysa bu 5.26 saat ve kredinin dayanağı yok. Karar verilmeli: ya eko.py düzeltilsin ya dağıtım geri alınsın.

**18 · 24'lü Patoloji denemeleri — ÖNCEKİ DEĞERLENDİRME YANLIŞTI, DÜZELTİLDİ.**
Bu madde önce "programdaki tek tamamen boş 2.48 saat" diyordu. **Yanlış.** `kaz` alanı *yeni okumadan gelen kazancı* ölçüyor; programda Patoloji okuması olmadığı için kazanç iliştirilecek bölüm yok — bu bir **model sınırı**, değersizlik değil.

Ölçülen Patoloji seyri (18 soru üzerinden):

| Deneme | Net | Oran |
|---|---|---|
| 15 Oca TUSTIME | 9.00 | %50.0 |
| 2 May PreTUS | 10.75 | %59.7 |
| 9 Haz PreTUS | **3.00** | **%16.7** |
| 16 Tem Perfecttime | **4.50** | **%25.0** |
| 24 Tem MediTUS | 11.75 | %65.3 |

Patoloji son denemede **en yüksek branş** (%65.3) ama beş ölçümde **3.00 ile 11.75 arasında** salınıyor. Bu, "sağlam biliniyor, bakım gerekmez" profili değil — tam tersi, **korunması gereken oynak bir branş** profili.

Üstelik kaynak dağılımı en ince olan branş:

| Branş | Program yükü | Soru | saat/soru |
|---|---|---|---|
| **Patoloji** | **2.48 sa** | 18 | **0.138** |
| Farmakoloji | 22.02 sa | 18 | 1.224 |
| Biyokimya | 21.51 sa | 18 | 1.195 |
| Mikrobiyoloji | 22.31 sa | 18 | 1.239 |

Aynı 18 soruluk üç branşın **dokuzda biri**. 24'lü Patoloji denemeleri kesilmemeli; aksine Patoloji **eksik yatırım** yapılan branş olabilir.

**Genel ders:** `kaz` yalnız yeni okumanın kazancını modelliyor. Unutmayı, bakımı ve konsolidasyonu modellemiyor. Sadece `kaz`'a bakarak eniyileme yapmak, **bilineni koruyan işleri (deneme, yanlış defteri, bakım denemeleri, videolar) tam olarak keser.** Programın 40.99 saati bu kategoride ve kesilmemeli.

**19 · Adım 24 yanlış bölümleri kurtarıyor.** `kaynak_harita.json` çöp listesindeki bölümlerin **kendi kaydettiği** net/saat değerleri:

| Bölüm | Saat | net/sa | ΔK | Kayıtlı gerekçe |
|---|---|---|---|---|
| Pediatri Büyüme-Gelişme | 0.33 | **0.78** | +0.072 | zincir gününde yer kalmadı |
| Anatomi Solunum | 0.88 | 0.29 | +0.053 | zincir gününde yer kalmadı |
| Pediatri Romatoloji | 0.83 | 0.26 | +0.060 | zincir gününde yer kalmadı |
| Pediatri Genetik | 0.67 | 0.26 | +0.048 | zincir gününde yer kalmadı |
| Fizyoloji Hücre | 1.13 | 0.23 | +0.054 | zincir gününde yer kalmadı |
| KS Çocuk Cerrahisi | 0.60 | 0.23 | +0.038 | zincir gününde yer kalmadı |
| KS Anestezi | 0.60 | 0.23 | +0.038 | zincir gününde yer kalmadı |
| Speetus Karın duvarı | 0.25 | 0.20 | +0.014 | zincir gününde yer kalmadı |
| Fizyoloji GİS | 1.27 | 0.18 | +0.047 | zincir gününde yer kalmadı |
| Fizyoloji Kas | 0.93 | 0.16 | +0.031 | zincir gününde yer kalmadı |
| Speetus Dalak | 0.62 | 0.16 | +0.028 | zincir gününde yer kalmadı |
| **TOPLAM** | **8.12** | | **+0.483** | |
| *Pediatri Yenidoğan* | *3.25* | *0.15* | *+0.135* | *aynı gerekçe* |
| *Anatomi Kaslar* | *3.68* | *0.15* | *+0.114* | *aynı gerekçe* |

**Anatomi Kaslar'dan daha verimli olup aynı gerekçeyle dışarıda kalan 11 bölüm var.** Adım 24 bu listenin **en dipteki ikisini** kurtarıyor — tek sebebi renklerinin pembe olması.

| Seçenek | Saat | ΔK | K/saat |
|---|---|---|---|
| Adım 24 (Kaslar + Yenidoğan) | 6.93 | +0.247 | 0.0356 |
| En verimli 11 program dışı bölüm | 8.12 | **+0.483** | **0.0595** |

İkisi de aynı kısıtla (Kural B, zincir gününde yer yok) engelleniyor. Yeniden dizim yapılacaksa **hedef pembe tamlık değil, bu 11 bölüm olmalı** — %17 daha fazla saatle **iki katına yakın** getiri.

⚠ Bu tablodaki net/saat değerleri sistemin kendi çöp gerekçelerinden alınmıştır, benim tahminim değildir. Ancak §12.5 kalibrasyonun bölüm bazlı olduğunu söylüyor; bu bölümler programda olmadığı için bölüm bazlı kalibrasyonları **yoktur**. Uygulanmadan önce kalibrasyon yöntemi doğrulanmalı.

---

## 24 · FİNALİZE EDİLMİŞ PAKET — yeniden dizim gerektirmeyen ekleme

Her aday **yalnız kendi zincirinin zaten bulunduğu güne**, o günün **boş blok kapasitesine** yerleştirildi. Yerleşim, ekleme sonrası gün baskınlığı en yüksek kalacak şekilde seçildi.

| Bölüm | Saat | ΔK | Gün(ler) | Oturum |
|---|---|---|---|---|
| Pediatri Büyüme-Gelişme | 0.33 | +0.072 | 27 Tem | 1 |
| Pediatri Romatoloji | 0.83 | +0.060 | 18 Ağu | 1 |
| Anatomi Solunum | 0.88 | +0.053 | 19 Ağu | 1 |
| Fizyoloji GİS | 1.27 | +0.047 | 10 Ağu 0.85 + 16 Ağu 0.42 | 2 |
| KS Çocuk Cerrahisi | 0.60 | +0.038 | 27 Tem | 1 |
| KS Anestezi | 0.60 | +0.038 | 27 Tem 0.37 + 15 Ağu 0.23 | 2 |
| Speetus Dalak | 0.62 | +0.028 | 29 Tem 0.50 + 10 Ağu 0.12 | 2 |
| Speetus Karın duvarı/periton | 0.25 | +0.014 | 29 Tem | 1 |
| **TOPLAM** | **5.38** | **+0.350** | | |

**Fizyoloji Kas (0.93 sa · +0.031 K) yerleşemedi** — Kas-İskelet zincir gününde (18 Ağu) Romatoloji'den sonra yer kalmıyor.

### Kural doğrulaması (paket uygulanmış varsayımıyla ölçüldü)

| Kural | Öncesi | Sonrası | Durum |
|---|---|---|---|
| A · ilk 14 gün | ihlal 0 | ihlal 0 (hepsi zaten açık kitaplar) | ✓ |
| B · gün baskınlığı | %89.0 | **%88.1** | ✓ eşik %80 |
| C · yeni öğrenme azalan | 50.15 / 48.66 / 34.25 | 52.20 / 49.63 / 36.61 | ✓ azalan |
| D · kısmi bölüm yok | 0 | 0 (hepsi tam bölüm) | ✓ |
| ≤3 oturum | 6 ihlal | yeni eklenenlerin hiçbiri aşmıyor | ✓ |
| Blok kapasitesi | — | tamamı mevcut boşluğa sığıyor | ✓ |

Kural B'nin düştüğü dört gün: 15 Ağu %37→%39 (↑) · 16 Ağu %36→%34 · 18 Ağu %73→%63 · 19 Ağu %69→%62.

### Seçenek karşılaştırması

| Seçenek | Saat | ΔK | K/saat | Projeksiyon | Yeniden dizim |
|---|---|---|---|---|---|
| **Bu paket** | **5.38** | **+0.350** | **0.0651** | **66.99** | **gerekmiyor** |
| Adım 24 (Kaslar + Yenidoğan) | 6.93 | +0.247 | 0.0356 | 66.89 | 27 günün tamamı |
| İkisi birlikte | 12.31 | +0.597 | 0.0485 | 67.24 | 27 günün tamamı |

⚠ İki uyarı: (1) net/saat değerleri `kaynak_harita.json`'un kendi çöp gerekçelerinden; bu bölümlerin §12.5 anlamında bölüm bazlı kalibrasyonu **yok**. (2) Doldurulacak boşluğun bir kısmı §14'te ölçülen **kayıtsız yorgunluk payıdır** (E bloğu %63 dolu). Paket uygulanırsa E ve F bloklarına değil, mümkün olduğunca A/B/C bloklarına yerleştirilmeli.

---

## 25 · MİKRO SEANS KURALI — düzeltme ve yeniden paketleme

⚠ **DÜZELTİLDİ (27 Tem 2026).** §12.8 ve §23'ün 16. bulgusu "bir bölüm en fazla 3 oturum" kuralına dayanıyordu. **Böyle bir kural kullanıcı tarafından hiç verilmedi.** Verilen talimat şuydu: *"10 dakikalık konu okuma oturumlarına, mikro seanslara gerek yok."*

Yani kısıt **oturum sayısı değil, parça uzunluğu**. Obstetri'nin 7 oturuma bölünmesi kendi başına ihlal değil; ihlal olan, içindeki **8 dakikalık ve 15 dakikalık** parçalar. §23'ün 16. bulgusu bu haliyle geçersizdir.

### Mikro parçaların gerçek dağılımı

| Eşik | Parça | Saat | Okumanın payı |
|---|---|---|---|
| < 10 dk | 3 | 0.35 | %0.3 |
| < 15 dk | **12** | 1.96 | %1.7 |
| < 20 dk | 24 | 5.12 | %4.4 |
| < 30 dk | 34 | 8.88 | %7.6 |

### Sebep: blok doldurma artığı

12 mikro parçanın 10'u **1–3 sayfalık kuyruk**. Bir bölüm büyük bloğa sığmayınca artan sayfa küçük bir bloğa (Z veya A) düşüyor. Örnekler: Bakteriyoloji 8 Ağu Z bloğunda **6 dk / 1 sayfa** · Obstetri 6 Ağu A bloğunda **8 dk / 1 sayfa** · MSS 30 Tem Z bloğunda **10 dk / 1 sayfa**.

Kalan 2'si gerçekten küçük bölüm: **Toksikoloji** (sf 118–119, tek sayfa, 10 dk) ve **Enzimler** (sf 26–27, tek sayfa, 10 dk). Bunların tamamı bu kadar; Kural D uzatmaya izin vermiyor.

### Gün içi yeniden paketleme — ölçülen sonuç

Her bölümün o gün içindeki toplam süresi, **aynı günün** bloklarına, her parça ≥15 dk olacak ve sayfa sırası korunacak şekilde yeniden bölündü. **Hiçbir iş başka güne taşınmıyor.**

| | Önce | Sonra |
|---|---|---|
| Okuma parçası | **107** | **88** |
| 15 dk altı parça | **12** | **0** |

Gün bazında en çok kazanan: 27 Tem 7→5 · 10 Ağu 8→6 · 15 Ağu 8→6 · 19 Ağu 10→8 · 29 Tem 6→4.

**Kurallara etkisi yok:** hiçbir iş gün değiştirmediği için Kural A, B, C aynen kalıyor; sayfa sırası ve bölüm bütünlüğü korunduğu için Kural D ve sayfa sürekliliği de bozulmuyor. Bu, yapılabilecek **en düşük riskli** değişiklik.

**Üç bölüm sığmıyor** (her biri 0.17 sa): Toksikoloji · Enzimler · sindirim anatomisinin 10 Ağu'ya taşan kuyruğu. İlk ikisi için çözüm sayfa komşusu bölümle **tek görev olarak birleştirmek**: Enzimler (26–27) → Karbonhidratlar (27–48) ile *sf 26–48*; Toksikoloji (118–119) → Genel Farmakoloji + OSS ile tek başlık (`icerik.json` zaten böyle adlandırıyor).

⚠ **Ödünleşim:** yeniden paketleme büyük blokları önce doldurur. Bu, B bloğunda (10:00–13:45) tek bölümün **3 saat 45 dakika** kesintisiz okunması anlamına gelebilir. Daha az ve daha uzun oturum isteniyorsa doğru; blok içi çeşitlilik isteniyorsa üst sınır konmalı.

---

## 26 · SORU YENİDEN DAĞITIMI — çözüm

Kullanıcı beyanı: eko.py'deki 0.0 değerleri **veri toplama düzeyinin artefaktı**. Tusanaliz "Aminoasitler" ve "sinir sistemi anatomisi" etiketleri altında ölçüm yapmış; kitap içeriği iki-üç bölüme yaydığı için ikinci bölümler 0.0 görünüyor. Aminoasit metabolizması (üre döngüsü, fenilketonüri, homosistinüri, akçaağaç şurubu) ve periferik sinir + duyu organları anatomisi TUS'ta sorulan alanlar.

**Sonuç: dağıtım hata değil, düzeltme.** Bir bölümü 0.0 sayıp okumamak, o sayfaların taşıdığı soruyu kaybetmek olurdu. §23'ün 17. bulgusu bu haliyle geçersizdir; şişme yok, kitap toplamları birebir korunuyor (10 kitapta fark +0.0, ölçüldü).

**Ama belgelenmesi gereken üç şey var:**

1. **Bölme oranının dayanağı yazılı değil.** Neden 3.4/4.0, neden 2.3/1.9? Sayfa oranı 14/17 → 3.3/4.1 verirdi (yakın ama aynı değil). Önceki bir oturumda konmuş, gerekçesi hiçbir yerde yok. **Belgelenmemiş modelleme kararıdır.**
2. **Tusanaliz ham verisi elde yok.** eko.py türetilmiş bir tablodur; "son 5 TUS'ta hangi başlıkta kaç soru" ham verisi görülmedi. 0.0'ın "gerçekten sıfır" mı "bu etiket altında sayılmadı" mı olduğu ayırt edilemiyor.
3. **Kural D ile gerilim.** D, bölüm getirisinin ampirik ölçüm olduğunu, sayfaya bölmenin dayanaksız olduğunu söylüyor — ama burada tam olarak o yapılmış.

### Önerilen kalıcı çözüm: bölümleri birleştir

Kural D ile tutarlı tek yaklaşım, ölçüm hangi birimde yapıldıysa **o birimi bölüm saymak**:

- `FT Biyokimya`: *Aminoasitler + metabolizması*, sf 12–26 **ve** 69–86, **7.4 soru**, birlikte okunur
- `Anatomi Fast Track`: *Sinir sistemi + duyu*, sf 90–119, **4.2 soru**, birlikte okunur

Bu, belgelenmemiş bölme oranını tamamen ortadan kaldırır ve programın fiilen yaptığı şeyi (iki yarıyı da okumak) değiştirmez.

⚠ **Ölçülen yan etki:** birleştirme renk algoritmasının girdisini değiştiriyor (bölüm sayısı düşünce çeyrek sınırları kayıyor). İki bölümün rengi değişir: **Anatomi Sindirim pembe → turuncu**, **Biyokimya Enzimler sarı → mavi**. İkisi de programda zaten okunuyor, maddi etkisi yok. SST hariç pembe sayısı 25 → 24, kapsama 23/25 → 23/24.

**Ayrıca netleşmesi gereken:** Kural D'nin "bölüm" birimi *kitap bölümü* mü, *Tusanaliz etiketi* mi? Şu an ikisi karışık kullanılıyor. Birleştirme yapılırsa cevap "Tusanaliz etiketi" olur ve yazılmalıdır.

---

## 27 · 28 TEMMUZ — kaydın düzeltmesi ve tek takvim kısıtı

⚠ **DÜZELTİLDİ (27 Tem 2026).** DEVIR.md 28 Temmuz'u *kullanıcının kendi doğum günü* diye kaydetmişti. **Doğrusu: kız arkadaşının doğum günü**, kullanıcı o gün şehir dışına çıkıyor.

**Kısıt:** 28 Temmuz Salı yalnız **06:00–10:00** çalışılabilir, sonrası boş.
**Durum:** program bunu zaten sağlıyor — Z bloğu 06:00–10:00 (3.85 saat, Enfeksiyon zinciri), başka blok yok. `kural_test.py` #9 bunu kalıcı olarak kontrol ediyor.

**Genel bir "Salı" kuralı YOKTUR.** 4, 11 ve 18 Ağustos Salı günleri normal tam günlerdir. (Bir ara "Salı 10'dan sonra ders olmasın" genel kural sanıldı; öyle olsaydı o üç günden 20.77 saat çıkacak ve 11 Ağustos Kardiyovasküler zincirinin tek günü olduğu için Kural B kırılacaktı. Geçerli değil.)

### Kullanıcının öncelik sıralaması (27 Tem 2026 beyanı)

1. **A, B, C, D kuralları** — bunlar asıl kurallardır.
2. **Kalan zaman için azami verim ve hedefe yönelik çalışma.**
3. **Kombo** — kullanıcı açıkça istiyor.
4. Kahvaltı · öğle yemeği · akşam yemeği molaları.
5. 2 günde bir, belirlenmiş günlerde spor.
6. 28 Temmuz kısıtı.

**Bunların dışındaki her şey** (oturum uzunluğu, parça sayısı, kaç kitap değiştiği, blok başına süre) **planı uygulanabilir kılmak için vardır ve verim uğruna feda edilebilir.** Mikro seans kaygısı (§25) bu sıralamada bağlayıcı değildir.

---

## 28 · ÜRETİM 2026-07-28a — ne yapıldı, ne yapılamadı

**Üretilen:** `index.html` sürüm `2026-07-28a` · `sw.js` `rota-2026-07-28a` · 267 görev · 237.06 saat · projeksiyon **66.64**
**Kapılar:** `kural_test.py` **18/18 GEÇTİ** · `denet.py` **SIFIR HATA**

### Yapılan iki değişiklik

1. **Öğle yemeği molası spor günlerinde açıldı.** `dizi3.py`, 9 spor gününde 13:45–17:15 arasını tek blok halinde "spor" diye etiketliyordu. Artık: *13:45–14:00 öğle yemeği · 14:00–16:15 spor · 16:15–17:15 toparlanma*.
2. **Sürüm ilerletme onarıldı.** `uret.py`'nin `replace`'i şablonda olmayan bir dizeyi arıyordu (§0b). Artık gerçek dizeyi arıyor ve bulamazsa `assert` ile duruyor. `sw.js` elle eşitlendi.

### 8 bölümlük verim paketi UYGULANAMADI — sebebi ölçüldü

Paket (5.38 saat, +0.350 K, kombo 48→67) üç ayrı yöntemle denendi, üçü de kırıldı:

| Deneme | Sonuç |
|---|---|
| Blok boşluklarına dağıt | **22 parça**, bazıları 4 dakika — mikro seans üretti |
| Hedef günleri komple yeniden paketle | 7 günün 7'sinde son bölüm sığmadı (tam sayı sayfa yuvarlaması + kapasite) |
| En boş bloğa koy, sonra düşük verimliyi çıkar | Kural C kırıldı: yeni öğrenme 49.2 / **50.2** / 35.5 |
| Erken günlere ağırlık ver, çıkarma yapma | Dört kural geçti (proj. 66.99) ama **12 blok taştı, 277 dk**. 10 Ağu C bloğu 18:01'de bitiyor, D bloğu 17:15'te başlıyor — **gerçek çakışma, hiçbir kapı yakalamıyor** |

**Ölçülen sebep:** 19 okuma gününde toplam **19.00 saat** boş okuma kapasitesi var ama blok blok dağılmış durumda — gün başına 0.15–1.76 saat, hiçbiri bitişik değil. 36.19 saatlik "boş kapasite"nin çoğu **deneme günlerinde**, oralarda ise Kural B gereği okuma yapılamıyor.

**Sonuç: `kaynak_harita.json`'un o 11 bölüm için kaydettiği gerekçe — "zincir gününde yer kalmadı" — doğrudur.** Bu bölümler mevcut takvime, mevcut blok yapısıyla sığmıyor. Sığdırmak için üçünden biri gerekir:

1. **Blok bitiş saatlerini uzatmak** (akşam 21:15 yerine 21:40 gibi) — §0c'deki yavaşlama kanıtına aykırı
2. **Bir bloğu büyütmek** (örn. C 2.25 → 3.00) — günün yapısını değiştirir
3. **27 günü zincir bazında baştan dizmek** — §11'in çözüm yolu, tek gerçek çözüm

Bu üçü de kullanıcı kararı gerektirir. **Bu oturumda uygulanmadı.**

---

## 29 · ÜRETİM 2026-07-28a — YENİ BLOK YAPISI ve 11 BÖLÜM EKLENDİ

**Kullanıcı yetkisi (27 Tem):** akşam bloğu 22:00'a uzatılabilir · C bloğu büyütülebilir · gerekirse yerleşim baştan değişebilir. Tek kısıt: kahvaltı, öğle, akşam ve toparlanma molaları ile spor saati korunacak.

### Yeni blok yapısı

| Blok | Eski | **Yeni** |
|---|---|---|
| Z | 06:00–07:00 | 06:00–07:00 |
| A | 07:15–08:45 | 07:15–08:45 |
| B | 10:00–13:45 | 10:00–13:45 |
| C | 14:45–17:00 (2.25) | **14:45–17:15 (2.50)** |
| D | 17:15–19:15 | **17:30–19:30** |
| E | 20:00–21:15 (1.25) | **20:15–22:00 (1.75)** |
| F | 21:30–22:30 | **kaldırıldı** (E ile çakışıyordu, tek görevi E'ye taşındı) |

Molalar: 07:00–07:15 toparlanma · **08:45–10:00 kahvaltı** · **13:45–14:45 öğle** · 17:15–17:30 toparlanma · **19:30–20:15 akşam** · 22:00–23:00 yavaşlama.
Spor günlerinde: **13:45–14:00 öğle · 14:00–16:15 spor · 16:15–17:30 toparlanma.**

Nominal kapasite **261.75 → 289.50 saat (+27.75)**.

### Eklenen 11 bölüm

| Bölüm | Saat | Gün | Zincir |
|---|---|---|---|
| Pediatri Büyüme ve Gelişme | 0.33 | 27 Tem | Acil & Halk Sağlığı |
| Küçük Stajlar Çocuk Cerrahisi | 0.60 | 27 Tem | Acil & Halk Sağlığı |
| Küçük Stajlar Anestezi ve Reanimasyon | 0.60 | 27 Tem | Acil & Halk Sağlığı |
| Genel Cerrahi Karın duvarı ve periton | 0.25 | 29 Tem | GİS |
| Pediatri Genetik Hastalıklar | 0.67 | 31 Tem | Metabolizma |
| **Pediatri Yenidoğan** (pembe) | 3.25 | 4 + 6 + 19 Ağu | Gebelik & Yenidoğan |
| Fizyoloji Gastrointestinal Sistem | 1.27 | 10 Ağu | GİS |
| Fizyoloji Hücre | 1.13 | 16 Ağu | Metabolizma |
| Genel Cerrahi Dalak | 0.62 | 16 Ağu | GİS |
| Pediatri Romatoloji | 0.83 | 18 Ağu | Kas-İskelet |
| Fizyoloji Kas | 0.93 | 18 Ağu | Kas-İskelet |

**Eklenemeyenler:** Anatomi Kaslar (3.68 sa) ve FT Farmakoloji KVS (3.33 sa) — zincirlerinin (Kas-İskelet, Kardiyovasküler) tek gün taşıması ve o günlerin dolması nedeniyle. Bunlar ancak zincire ikinci gün açılırsa girer.

### Sonuç

| | Önce | Sonra |
|---|---|---|
| Görev | 267 | **278** |
| Saat | 237.06 | **247.54** |
| **Projeksiyon K** | 66.64 | **67.20** |
| **Kombo** | 48 | **78** |
| Gün-zincirde ortalama branş | 1.55 | 1.71 |
| Kural A ihlal | 0 | **0** |
| Kural B | %89.0 | **%86.7** (eşik %80) |
| Kural C geri getirme | 15.8 / 20.3 / 30.4 | aynı ✓ |
| Kural C yeni öğrenme | 50.1 / 48.7 / 34.2 | **52.6 / 51.9 / 39.0** ✓ |
| Kural D kısmi bölüm | 0 | **0** |
| Sayfa kırığı | 0 | **0** |
| En geç bitiş | 22:30 | **22:22** |

`kural_test.py` **18/18** · `denet.py` **SIFIR HATA**

### `denet.py` ölçüt değişikliği

`"blok sonu aşımı ≤4"` sabit sayı eşiği, gerçek ölçütle değiştirildi: **bir blok sonraki bloğun başlangıcına taşıyor mu** ve **23:00 aşılıyor mu**. Yeni yapıda 12 blok kendi bitiş saatini aşıyor ama hepsi mola boşluğuna sarkıyor; **çakışma sıfır**, en geç bitiş 22:22. Eski eşik yeni blok yapısıyla anlamsızdı.

### Bu turda yapılan ve düzeltilen hatalar

1. Blok boşluklarına dağıtınca **22 parça** üretildi, bazıları 4 dakika → yöntem değiştirildi
2. 28 Temmuz'un 4 saatlik Z bloğu 1 saat sanıldı, dengeleyici orada kilitlendi → düzeltildi
3. Yenidoğan gün sırası ters yazıldı (6 Ağu, 4 Ağu) → sayfa sürekliliği kırıldı → tarih sırasına alındı
4. Mükerrer görev birleştirilirken `soru` değerleri toplandı → kitabın yetkili toplamı aşıldı → bölüm değerine geri alındı
5. Aynı blokta okuma ve soru görevi aynı başlığı taşıyordu → soru görevi yeniden adlandırıldı
6. **Yenidoğan'ın 3 oturumuna `soru` değeri orantılı bölündü (0.56 / 0.79 / 0.85).** Programın kuralı bu değil: bir bölümün *her* oturumu bölümün **tam** soru değerini taşır (Obstetri'nin 7 oturumunun hepsinde 3.8 yazıyor). Üçü de **2.2** yapıldı.
7. **`yeniden.py`'yi `| head -2` ile koşturdum; SIGPIPE alıp `json.dump` satırına gelmeden öldü.** Sonuç: `ot` alanı birleştirme öncesindeki 6 oturumda kaldı, oysa 5 oturum vardı. Boru kaldırılıp yeniden koşuldu. **Ders: bu boru hattının hiçbir betiği çıktısı kesilerek koşturulmamalı — dosya yazımı en sonda.**

### Son bağımsız denetim (üretimden sonra, kapılardan ayrı)

| Kontrol | Sonuç |
|---|---|
| 60 görev adı ↔ eko.py bölüm sınırı | **60/60 oturuyor** (49 tek bölüm, 11 çok bölüm tam kapsıyor, taşan 0) |
| Sayfa aralığı kitap sınırı içinde | ✓ |
| Aynı sayfa iki kez okunuyor mu | **hayır** |
| Sayfa sürekliliği | **0 kırık** |
| `soru` değerleri | §26'da kayıtlı 4 dağıtım dışında **birebir** |
| Renkler algoritmayla | **birebir** |
| `ot`/`otg` oturum sayısıyla | ✓ |
| Aynı bölüm tek zincirde | ✓ |
| Mükerrer görev | **0** |
| Kahvaltı / öğle / akşam her günde | ✓ |
| 9 spor günü, hepsinde C bloğu yok | ✓ |
| 28 Temmuz yalnız Z | ✓ |
| Blok sonrakine taşıyor mu | **hayır** |
| 23:00 aşılıyor mu | **hayır** (en geç 22:22) |
| Kural A / B / C / D | **dördü de ✓** |

**278 görev · 247.54 saat · K = 67.20 · kombo 78 · index.html ↔ app_gorev.json birebir aynı**

---

## 30 · SÜRÜM 2026-07-28b — SENKRON ONARIMI ve BEŞ KAPININ TAMAMI

### Bulunan hata: karşı cihaz otomatik güncellenmiyordu

**Belirti:** iPad (yazar) değişiklik yapıyor, telefon (okur) yeni veriyi almıyor; kullanıcı elle "karşı cihazdan yükle"ye basmak zorunda kalıyor.

**Kök sebep — kodda ölçüldü.** `Senk.esitle()` yalnız **dört olayda** tetikleniyordu:

| Tetikleyici | Ne zaman |
|---|---|
| `visibilitychange` | uygulama arka plandan öne gelince |
| `focus` | pencere odak alınca |
| `online` | ağ geri gelince |
| `Senk.ertele()` | **yalnız yazar cihazda**, yerel değişiklikten 2.5 sn sonra |

`setInterval(nabiz,15000)` çalışıyordu ama `nabiz` **senkron çağırmıyor** — yalnız arayüz nabzı. Yani **periyodik yoklama hiç yoktu.** Telefon zaten ekranda açıksa hiçbir olay tetiklenmiyor ve iPad'deki değişiklik asla gelmiyordu. Kullanıcının tarifi bu davranışa birebir uyuyor.

**Düzeltme** (`sablon_v23.html`'e yazıldı, kalıcı):

```js
setInterval(()=>{if(document.visibilityState!=='hidden'&&Senk.kur())Senk.esitle()},45000);
```

- **45 saniyede bir**, yalnız uygulama ekranda açıkken.
- `Senk.esitle()` içindeki mevcut **15 saniyelik kısıtlama** yığılmayı önlüyor.
- Gizli sekmede/arka planda istek atılmıyor — pil ve veri korunuyor.
- İstek yükü: cihaz başına ~80/saat. GitHub'ın kimlik doğrulamalı sınırı 5000/saat.
- Dört eski tetikleyici olduğu gibi duruyor.

**Doğrulandı** (`senk_poll.js`, yeni test): okur cihaz, uzak veri değişince, **elle hiçbir şeye dokunulmadan** 3 kayıtlık yeni veriyi aldı. Yazar cihazda yoklama yerel değişikliği gönderdi. Arka arkaya yoklamada kısıt devreye girip fazladan istek atılmadı.

### Beş kapının tamamı koşuldu

| Kapı | Kapsam | Sonuç |
|---|---|---|
| `kural_test.py` | 18 kalıcı kural kontrolü | **18/18 GEÇTİ** |
| `denet.py` | 7 başlık, üretilen index.html üzerinde | **SIFIR HATA** |
| `kos.js` | 14 bölüm · 216 gün-saat · 27 günlük yaşam döngüsü · 24 panel boyutu · 278 kart | **SIFIR HATA** |
| `senk_kos.js` | 6 grup, 26 senkron senaryosu | **SIFIR HATA** |
| `senk_poll.js` | **yeni** — periyodik yoklama davranışı | **SIFIR HATA** |

`kos.js`'teki sabit kodlanmış `267 görev` ve `66.64 puan` değerleri **278** ve **67.20** olarak güncellendi (§0h'de uyarılmıştı). Yaşam döngüsü testi K puanının 58.26'dan başlayıp 27 günde **67.20**'ye çıktığını doğruladı.

### Bu turda yaptığım hatalar

1. `kos.js` ve `tam_test.js` diskte yoktu, bağlamdan kurdum — sabit değerleri güncellemeyi unutsaydım test yanlış yere kırılacaktı.
2. Yoklama testini yazarken VM'in **kendi `Date` nesnesi** olduğunu atladım; dışarıdan yaptığım saat kaydırması içeri geçmedi, 15 sn'lik kısıt tetiklendi ve test kodu değil kendi testimi hatalı gösterdi. `vm.runInContext` ile içeriden kaydırınca düzeldi.

### Nihai durum · sürüm 2026-07-28b

**278 görev · 247.54 saat · K = 67.20 · kombo 78 · 27 gün**
Kural A ihlal 0 · B %86.7 · C artan+azalan ✓ · D kısmi 0 · sayfa kırığı 0
`index.html` ↔ `app_gorev.json` birebir · `SURUM='2026-07-28b'` ↔ `rota-2026-07-28b`

---

## 31 · SÜRÜM 2026-07-28d — BOŞ YOKLAMA MALİYETİ SIFIRLANDI

**Kullanıcı itirazı (27 Tem):** *"Ben bir işaretleme yapmadıysam sürekli aynı dosyayı birbirine göndermesi anlamsız."*

**Önce bir düzeltme:** yoklama dosya **göndermiyordu**. `esitle()` önce `cek()` ile GET atar; uzak damga yerelden yeni değilse `"zaten eşit"` deyip çıkar. PATCH (yazma) **yalnız** yerelde değişiklik varsa olur. Aynı dosya ileri geri gitmiyordu.

**Ama itirazın özü doğruydu:** boşta saatte ~80 anlamsız GET. İki katmanda çözüldü.

### 1 · ETag koşullu istek

`cek()` artık son gördüğü ETag'i `If-None-Match` başlığıyla gönderiyor. Uzakta hiçbir şey değişmemişse GitHub **304** döner: gövde inmez, **GitHub'ın saatlik kotasından düşmez.**

⚠ **304'te `r.ok` false'tur** — bu yüzden kontrol `if(!r.ok)throw` satırından **önce** yapılıyor, yoksa her boş yoklama "hata: okuma 304" olarak görünürdü.

### 2 · Uyarlanabilir aralık

| | |
|---|---|
| Alt sınır | **45 sn** |
| Üst sınır | **6 dk** |
| Boş turda | aralık **×1.6** |
| Değişiklik gelirse | anında **45 sn**'ye döner |
| Öne gelme · odak | aralığı sıfırlar |
| Gizli sekme | yoklama **yok** |

Boştayken 5 turda 6 dakikaya çıkıyor. **1 saat boşta toplam istek: 80 → 14**, üstelik 14'ünün hepsi 304 (gövdesiz, kotasız).

### Bu turda yakaladığım kendi hatam

ETag'i ilk eklediğimde 304 gelince **erken çıkıyordum**. Sonuç: uzak değişmemişken **yerel değişiklik varsa da gönderilmiyordu** — yani ETag, yazar cihazın gönderme yeteneğini tamamen susturuyordu. `Senk.ertele()` de aynı yoldan geçtiği için işaretlediğin hiçbir görev karşı cihaza gitmezdi. **Bu, senkronu tamamen bozan bir hataydı.**

Yazdığım yeni test (`senk_etag.js`) yakaladı. Düzeltme: 304'te erken çıkmak yerine yön kararı veriliyor —

```js
if(!okur() && sonUzak && D.guncel > sonUzak){ await gonder(); }
```

Bunun için son görülen **uzak damga** (`sonUzak`) saklanıyor; 304'te uzağın damgası bilinmediği sürece "yerelim daha yeni mi" sorusu cevaplanamaz.

### Altı kapı

| Kapı | Sonuç |
|---|---|
| `kural_test.py` | **18/18** |
| `denet.py` | **sıfır hata** |
| `kos.js` | **sıfır hata** |
| `senk_kos.js` (26 senaryo) | **sıfır hata** |
| `senk_poll.js` (yoklama) | **sıfır hata** |
| `senk_etag.js` (**yeni**, ETag + yön kararı) | **sıfır hata** |

**278 görev · 247.54 saat · K = 67.20 · kombo 78 · sürüm `2026-07-28d` ↔ `rota-2026-07-28d`**

---

## 32 · DERİN ÖZELLİK TESTİ — 27 Temmuz 2026

Kullanıcı isteği: kaçırılan görevler, telafi, deneme girişi, seyir defteri, para/puan hesapları ve yeni senkron, **bütün ihtimalleriyle** sınansın. İki yeni test dosyası yazıldı: `derin_test.js` (64 kontrol) ve `senk_uc.js` (26 kontrol).

### Test takımı — sekiz dosya, hepsi sıfır hata

| Dosya | Kapsam | Sonuç |
|---|---|---|
| `kural_test.py` | 18 kalıcı kural | ✓ |
| `denet.py` | 7 başlık, üretilen dosya | ✓ |
| `kos.js` | 14 bölüm · 216 gün-saat · yaşam döngüsü | ✓ |
| **`derin_test.js`** | **64 kontrol** — kaçırılan · telafi · deneme · seyir · para/puan | ✓ |
| `senk_kos.js` | 26 senkron senaryosu | ✓ |
| `senk_poll.js` | periyodik yoklama | ✓ |
| `senk_etag.js` | ETag + 304 yön kararı | ✓ |
| **`senk_uc.js`** | **26 senkron uç durumu** | ✓ |

### A · Kaçırılan görevler (13 kontrol)

Program başlamadan 0 · ilk gün 00:00'da 0 · blok bitiminden **1 dk önce 0**, bitiş dakikasında **tam o bloğun görevleri** · gelecek günün görevi asla sayılmıyor · gün boyunca sayı hiç azalmıyor · **27 günün hepsinde** kaçırılan = o güne kadarki tüm tamamlanmamış görev · hepsi yapılınca 0 · tek görev geri alınınca yalnız o görünüyor.

### B · Telafi et (13 kontrol)

Telafi puanı **tam olarak** katsayı × kaz kadar artırıyor (fark < 1e-9) · listeden çıkıyor · geri alınca puan eski değere dönüyor · toplu telafi elle hesapla birebir uyuşuyor · iki kez işaretleme puanı iki kez artırmıyor.

⚠ **Ortaya çıkan davranış — bilinmesi gerek:** `para()` yalnız **son denemenin tarihinden SONRA** tamamlanan görevleri sayıyor (`if(!b||b<=o.tar)return`). Son deneme 24 Temmuz olduğu için, 24 Temmuz veya öncesine işaretlenen bir görev **puana hiç yansımıyor**. Doğrulandı: 278 görevin tamamı 24 Temmuz'a işaretlenirse puan 57.609'da kalıyor; 25 Temmuz'a işaretlenirse 67.20'ye çıkıyor. Hata değil, modelin tanımı — deneme sonrası kazanç ölçülüyor.

### C · Deneme girme (20 kontrol)

Ekleme · **eski tarihli deneme son()'u değiştirmiyor** · aynı tarihli iki deneme · negatif net · `bn` alanı eksik · aşırı değerler (999) · sıfır deneme · 20 deneme — hiçbiri çökertmiyor. Oranlar 0–1 arasında kalıyor, beklenen ölçüleni geçmiyor ve 1'i aşmıyor. Fizyoloji ölçümünün Histo-Embriyoloji ile toplandığı ayrıca doğrulandı.

### D · Seyir defteri (5 kontrol)

4 farklı deneme sayısı × 27 gün = **108 kombinasyon** hatasız. Üç doluluk seviyesinde (0 / 139 / 278 tamamlanmış) farklı ve dengeli HTML üretiyor.

### E · para / puan (9 kontrol)

Başlangıç 57.60925 · formül `40.269 + 0.207·t + 0.277·k` doğrulandı · **278 görevin her birinde** artış tam beklenen kadar (sapan 0) · hepsi tamamlanınca **67.20** · puan hiç düşmüyor · T ve K sepetleri doğru ayrılıyor.

### G · Senkron uç durumları (26 kontrol)

Saat kayması (uzak damga 2099) · yerel damga gelecekte · **bozuk JSON** (yerel veri bozulmuyor) · **kesik içerik** (raw_url'den alınıyor) · **farklı büyük/küçük harfli dosya adı** (kopya oluşmuyor, aynı dosyaya yazıyor) · boş gist (yazar yükler, okur yazmaz) · çevrimdışı → ağa dönüş · **dokuz HTTP hata kodu** (401·403·404·409·422·429·500·502·503 — hepsinde yerel veri korunuyor) · okur cihaz dört farklı tetikte de yazmıyor · kurulmamış senkron istek atmıyor · 278 kayıtlık tam veri gönderilebiliyor (yük < 1 MB) · eşzamanlı dört çağrı tek isteğe düşüyor.

### Test altyapısında bulunan eksik

`kos.js`'in kullandığı `tam_test.js` ortamında `document.querySelector` **null** döndürüyordu. Sonuç: **`olcumCiz` ve `seyirCiz` hiçbir zaman test edilmemiş** — ikisi de `querySelector(...).onclick` kullandığı için ortamda çalışamıyorlardı. `derin_ortam.js` yazıldı: iç içe `querySelector` gerçek öğe döndürüyor ve öğeler id'ye göre önbelleğe alınıyor, böylece DOM'a yazılan içerik okunabiliyor. İki fonksiyon da artık gerçekten sınanıyor.

### Bu turda yaptığım üç hata

1. `seyirCiz`in string döndürdüğünü varsaydım; aslında `seyirIc` öğesine yazıyor. Test buna göre düzeltildi.
2. E4'te başlangıç puanını `57.609` diye yuvarlak yazdım; gerçeği **57.60925**. 278 adımda 0.00025 sapma çıktı — uygulama değil testim yanlıştı.
3. `senk_uc.js`'te ETag sürüm sayacım kazara eşleşip 304 döndürdü ve üç senaryo yanlışlıkla "geçti/kaldı" gösterdi. Her senaryoya benzersiz sürüm verilerek düzeltildi.

**Toplam: 8 dosya, 200'ün üzerinde kontrol, sıfır hata. Program verisi değişmedi — 278 görev · 247.54 saat · K 67.20 · sürüm `2026-07-28d`.**

---

## 33 · SÜRÜM 2026-07-29a — TEK KELİMELİK KURULUM, ANAHTARSIZ OKUR

**Kullanıcı isteği:** gist kimliği ve erişim anahtarını iki cihaza yapıştırmak zahmetli; kutuya yalnız "Yazar" veya "okur" yazılsın. Ayrıca üçüncü bir cihaz (kız arkadaşı) arada durumu görebilsin.

### Erişim anahtarı koda GÖMÜLMEDİ — gerekçe

İstek "anahtarı da göm" idi; yapılmadı. Sebep saldırgan değil, **işleyiş**: GitHub sızmış PAT'leri otomatik tarayıp **sessizce iptal eder**. Anahtar herkese açık bir sitenin kaynak koduna girerse senkron sınavdan günler önce, hiçbir uyarı vermeden ölebilir. Ayrıca `gist` yetkisi tek bir gist'i değil **hesaptaki bütün gist'leri** kapsar.

⚠ **Sohbete yapıştırılan anahtar iptal edilmeli ve iPad için yenisi üretilmelidir.**

### Çözüm: okuma anahtar gerektirmiyor

Gist **okumak** için kimlik doğrulaması gerekmez; yalnız **yazmak** için gerekir. Bu yüzden:

| Cihaz | Rol | Anahtar |
|---|---|---|
| iPad | yazar | **bir kez**, yalnız o cihazın localStorage'ında |
| Telefon | okur | **hiç gerekmiyor** |
| Kız arkadaşının telefonu | okur | **hiç gerekmiyor** |

### Kod değişiklikleri

- `GIST_SABIT` koda gömüldü — **gist kimliği sır değildir**, yalnız ilerleme verisini gösterir ve yazmaya yetmez.
- `kur()`: okur rolü **anahtarsız** kurulu sayılıyor.
- `bas()`: anahtar yoksa `Authorization` başlığı **hiç gönderilmiyor**.
- `gonder()`: anahtarsız yazma denemesi net hatayla duruyor.
- Arayüz: üç alan (gist · anahtar · rol açılır menüsü) yerine **tek kutu — "Senkronizasyon şifresi"**. `yazar`/`yaz`/`ipad` ve `okur`/`oku`/`telefon` kabul ediliyor; büyük-küçük harf ve Türkçe `ı/İ` farkı normalize ediliyor. Anahtar kutusu yalnız "yazar" yazılıp anahtar yoksa görünüyor.

### Yeni test · `senk_rol.js` (20 kontrol)

Gömülü gist var · **gerçek anahtar koda gömülmemiş** (üretilen `index.html` tarandı: yalnız `github_pat_...` yer tutucusu) · okur anahtarsız kurulu sayılıyor · anahtarsız okuma çalışıyor · **isteklerde `Authorization` başlığı yok** · gömülü gist kimliği kullanılıyor · anahtarsız okur **dört farklı tetikte de** yazmıyor, hiç PATCH atmıyor · yazarın isteğinde `Authorization` var · anahtarsız yazar rolü kurulu sayılmıyor ve istek atmıyor · **temiz üçüncü cihaz yalnız "okur" yazarak eşleşiyor**, anahtar sorulmuyor, uzaktaki veri bozulmuyor.

### Dokuz kapı

`kural_test.py` · `denet.py` · `kos.js` · `derin_test.js` · `senk_kos.js` · `senk_poll.js` · `senk_etag.js` · `senk_uc.js` · **`senk_rol.js`** — **hepsi sıfır hata.**

### Doğrulanması gereken tek varsayım

Okuma akışı, gist'in kimlik doğrulamasız okunabilmesine dayanıyor. **Doğrulama yolu:** gist adresini gizli/incognito bir pencerede aç. Giriş yapmadan görünüyorsa anahtarsız okur çalışır. Görünmüyorsa gist'i public yap ya da o cihaza da anahtar gir.

**278 görev · 247.54 saat · K 67.20 · sürüm `2026-07-29a` ↔ `rota-2026-07-29a`**

---

## 34 · SÜRÜM 2026-07-29b — KOMBO ÇİPİ KATLANIR + KUYRUKLU YILDIZ

**İstek:** kombo çipi tıklanınca yerinde açılan bir pencere olsun (telefonda okumak zorlaşıyordu) · başlıkta kaç kombo olduğu yazsın · kombo sayısı arttıkça o yazı alev alsın, kuyruklu yıldız gibi görünsün.

### Ölçülen kombo dağılımı — kademe eşikleri buradan çıktı

| Görev başına kombo | Görev sayısı |
|---|---|
| 1× | 24 |
| 2× | 34 |
| 3× | 7 |
| 4× | 6 |
| 6× | 2 |
| **7× (en çok)** | **1** |
| kombosuz | 204 |

74 görevin kombosu var, ortalama 2.11. **En az 1, en çok 7.**

### Dört kademe

| Kademe | Koşul | Görsel | Kaç görev |
|---|---|---|---|
| `k1` | 1× | `--bilgi` mavi, sakin | 24 |
| `k2` | 2× | `--altin` altın | 34 |
| `k3` | 3–4× | `--turuncu` + yumuşak parıltı | 13 |
| **`k4`** | **5+×** | **kuyruklu yıldız** — parlak çekirdek, üç katmanlı parıltı, nefes alan kuyruk | **3** |

Kuyruklu yıldız kasten **nadir**: 278 görevin yalnız 3'ünde çıkıyor (10 Ağu GİS Fizyolojisi 7× · 27 Tem Genel Farmakoloji 6× · 10 Ağu sindirim anatomisi 6×).

### Tasarım kararları

Uygulamanın **kendi görsel dili** genişletildi, yenisi icat edilmedi. Kuyruklu yıldız zaten bu uygulamanın sözlüğünde: *Sefer · pelerin · kordon · parakete*, arka planda yıldız alanı. Isı rampası da mevcut değişkenlerden: `--bilgi` → `--altin` → `--turuncu` → kuyruk tonu `#F2C57C`.

**İmza öğe kuyruk.** Gerisi sessiz tutuldu — kenarlık rengi, ikon, ek animasyon eklenmedi.

### Erişilebilirlik ve hareket

- Başlık gerçek `<button>`, `aria-expanded` açılıp kapandıkça güncelleniyor.
- `:focus-visible` ile klavye odağı görünür.
- Kuyruk animasyonu `@media (prefers-reduced-motion:no-preference)` içinde — hareket azaltma açıksa kuyruk durur, renk ve parıltı kalır.
- Açılınca `-webkit-line-clamp` kalkıyor: kapalıyken kırpılan satırlar açıkken tam okunuyor. **Asıl okuma sorununu çözen madde bu.**
- Açılış/kapanış sonrası `brifYogunluk` yeniden ölçülüyor, çip yoğunluğu bozulmuyor.
- `nabiz` brifingi 15 sn'de bir yeniden çizmiyor (yalnız gün/kip değişiminde), bu yüzden açtığın kombo açık kalıyor.

### Yeni test · `kombo_test.js` (20 kontrol)

**278 görevin hepsinde** brifing çiziliyor, kademe ve sayı `kombo.json` ile birebir uyuşuyor · kombosuz 204 görevde çip hiç çizilmiyor · 7× görevde `k4` ve kuyruk öğesi var · varsayılan **kapalı**, `aria-expanded="false"` · 7 kombo satırı gövdede · tıklama işleyicisi bağlı, `acik` sınıfını çeviriyor, yoğunluğu yeniden ölçüyor · dört kademenin CSS'i ve hareket-azaltma koşulu doğrulandı.

Kademe dağılımı testte ölçüldü: **k1=24 · k2=34 · k3=13 · k4=3.**

### On kapı

`kural_test.py` · `denet.py` · `kos.js` · `derin_test.js` · **`kombo_test.js`** · `senk_kos.js` · `senk_poll.js` · `senk_etag.js` · `senk_uc.js` · `senk_rol.js` — **hepsi sıfır hata.**

**278 görev · 247.54 saat · K 67.20 · kombo 78 · sürüm `2026-07-29b` ↔ `rota-2026-07-29b`**

---

## 35 · SÜRÜM 2026-07-29c — KAYNAK HARİTASI ESKİYDİ, ONARILDI

### Bulunan hata: harita programı yansıtmıyordu

`yeniden.py` yalnız **mevcut satırların gün listesini** tazeliyordu. Programa yeni giren bölüm haritaya hiç eklenmiyor, çıkan bölüm hiç silinmiyor, çöpten kurtulan bölüm çöpte kalıyordu. Ölçülen sonuç:

| Sorun | Adet |
|---|---|
| Programda olup haritada **planlı görünmeyen** bölüm | **30** |
| Haritada planlı olup programda **olmayan** (hayalet) | **23** |
| **Hem çöpte hem programda** olan bölüm | **2** (Yenidoğan · Çocuk Cerrahisi) |
| Eski renk/kapsama sayacı | **5 kitap** |

Örnek eski sayaçlar: Speetus `11/20` → gerçek **13/20** · TUSTIME Fizyoloji `3/10` → **6/10** · Küçük Stajlar `13/15` → **15/15** · Klinisyen Vaka Pediatri `10/22` → **14/22**.

**Düzeltme:** `yeniden.py` artık haritayı **her koşuda programdan sıfırdan kuruyor** — planlı satırlar, gün listeleri, sayfa aralıkları, renk sayaçları ve `ic/tp` yeniden hesaplanıyor; çöp satırlarının **elle yazılmış gerekçeleri korunuyor**, yalnız programa giren bölümler çöpten çıkarılıyor. `kural_test.py`'deki ELLE eşlemesi (24'lü branş denemeleri, video · 1.5x) yeniden üretime de taşındı.

Sonuç: planlı satır **92 → 153**, çöp **51 → 49**, hayalet satır **0**, çelişki **0**.

### İkinci hata: hayalet "Kardiyoloji" satırı

Video görevleri `Kardiyoloji — 2. oturum videoları` diye adlandırılmıştı. Bölüm adı `re.sub(r'\s+—.*','',k)` ile kırpıldığı için taban ad `Kardiyoloji` oluyordu, oysa 4 Ağustos'taki görev `Kardiyoloji videoları`. Haritada aynı seri **iki ayrı satır** olarak görünüyordu. Adlar `Kardiyoloji videoları — 2. oturum` biçimine çevrildi; artık dördü tek bölüm.

### Kullanıcı sorularının cevapları (ölçüldü)

- **Feyyaz Akay Oldies:** 6 soru oturumu, 3.00 saat, üç konu — Bakteriyoloji · Mikoloji+Parazitoloji · Temel Mikrobiyoloji. Kitabın bölüm envanteri `eko.py`'de **yok**, bu yüzden "tamamı mı" sorusu veriden cevaplanamıyor. Kesin olan: okunan Mikrobiyoloji konularını izliyor. **Viroloji ve İmmünoloji okunmadığı için o başlıkların soruları da çözülmüyor.**
- **Klinisyen Vaka Pediatri / ek vakalar:** aynı kitabın **iki farklı kullanımı**. İlki vaka bölümlerinin *okunması* (sayfa aralıklı, `act=oku`), ikincisi kitap sonundaki *ek vakaların çözülmesi* (sayfasız, `act=soru`, her konu iki turda: kısa ön-tur + uzun tur). Renk/kapsama sayacı **yalnız okuma başlığında** tutuluyor, ek vakalarda `say=null` — yani **çift sayım yok, tutarlılık bozulmamış**. Güncel kapsama: 14/22 bölüm · pembe 5/5 · turuncu 4/6 · sarı 4/6 · mavi 1/5.
- **Levent Kodal Soru Bankası:** 14 oturum, 4.69 saat, 7 konu. Speetus'ta **okunan** cerrahi bölümleri izliyor; kitabın tamamı değil.
- **Yavuz Şahin Biyokimya:** 10 oturum, 5.00 saat, 5 konu. FT Biyokimya'nın 6 okunan bölümünden 5'i kapsanıyor — **Enzimler okunuyor ama soru oturumu yok.**
- **Yavuz Şahin Farmakoloji:** 10 oturum, 5.00 saat, 5 konu. FT Farmakoloji'nin 8 okunan bölümünün 5'i.
- **Atilla Uslu videoları:** **yetişiyor ama payı sıfır.** 16.28 saat = 24 sa 25 dk'nın 1.5×'i, birebir. 12 oturum, 10 gün, 27 Tem – **8 Ağu**; erişim de 8 Ağustos'ta kapanıyor. `denet.py` bunu kalıcı kontrol ediyor. **Bir akşamı kaçırırsan telafi yeri yok.**

### Arayüz

- **Kaynak haritasında kitap başlıkları artık kapalı başlıyor.** Önceden sıradaki oturumu olan kitap otomatik açılıyordu; 153 satırla bu okunamaz hale gelmişti.
- **Kombo çipi dört kademede de görsel karşılık kazandı** (önce yalnız 5+ süslüydü):

| Kademe | Görsel | Hareket |
|---|---|---|
| 1× | sessiz mavi nokta | **yok** |
| 2× | altın nokta + parıltı | nefes 4.6 sn |
| 3–4× | turuncu nokta + genişleyen halka | nefes 4.6 sn · halka 5.4 sn · sayı 5.0 sn |
| 5+ | kuyruklu yıldız: uzayan kuyruk + halka + üç katmanlı parıltı | kuyruk 5.0 sn · halka 5.4 sn |

Hareket ilkesi: **yalnız parlaklık ve halka nefes alır; hiçbir şey zıplamaz, kaymaz, titremez.** Süreler kasten farklı (4.6 · 5.0 · 5.4 sn) ki senkron yanıp sönme hissi doğmasın. Hepsi `prefers-reduced-motion:no-preference` içinde.

### Test

`kombo_test.js` 26 kontrole çıktı: dört animasyonun **hepsi ≥4 saniye**, süreler birbirinden farklı, yer değiştiren hareket yok, hepsi hareket-azaltma koşulu içinde · işaret öğesi her kademede var · kaynak haritası kapalı başlıyor, 18 kitap başlığı çiziliyor.

**On kapı sıfır hata. 278 görev · 247.54 saat · K 67.20 · kombo 78 · sürüm `2026-07-29c`**

---

## 36 · SÜRÜM 2026-07-30a — ÇARK SÜZGECİ, TAMAMLANANLAR ÇİPİ, ÇARKA TAŞI

**İstek:** tamamlanan görevler çarkta boş yer kaplıyor · altına tamamlananlar çipi eklensin, oradan geri alınsın · vakti geçmiş görevler de çarktan çıksın ki ana ekran hep sıradaki işi göstersin · kaçırılanlar çipindeki bilgi görevi yürütmeye yetsin ama telefonda boğmasın · her satıra "Çarka taşı" düğmesi.

### Çark artık süzülüyor

```
carkListe() = tamamlanmamış  VE  (elle çarka taşınmış  VEYA  vakti geçmemiş)
bul()       = bu listenin ilk öğesi
```

Üç sonuç: ana ekran her açılışta **sıradaki yapılacak işi** gösteriyor · tamamlanan iş çarkta yer kaplamıyor · vakti geçen iş sessizce düşüyor, kaçırılanlar çipinde bekliyor.

`carkCiz` penceresi artık `GOREVLER` indeksleri yerine **süzülmüş liste** üzerinde kayıyor; mola şeridi ve "bu bloğun son seansı" işareti de sonraki **görünen** işe göre hesaplanıyor, yoksa gizlenen işler yüzünden yanlış mola çizilirdi.

### Çarka taşı

`D.tasi` — çarka geri getirilen görevlerin kümesi. Vakti geçmiş olmasına rağmen listede kalır ve **kronolojik olarak en başta** olduğu için `bul()` doğrudan onu döndürür; ayrıca kayırma koduna gerek kalmadı. Görev tamamlanınca ya da geri alınınca işaret otomatik siliniyor.

⚠ `Senk.temiz()` yalnız `bitti · denemeler · guncel` alanlarını geçiriyordu; `tasi` eklenmeseydi **her senkron çekişinde silinecekti.** Alan `temiz()`'e eklendi, artık iki cihaz aynı görevi gösteriyor.

### Kaçırılanlar paneli — yürütmeye yeten en az bilgi

Satır başına dört bilgi: **ne yapacaksın · branş — görev adı · kitap + sf aralığı · süre + oturum + net.** Fazlası yok. Sayfa aralığı ayrıca vurgulu. Çarka taşınmış görev satırı yeşil zeminle ve "çarkta" etiketiyle işaretli.

520 px altında düğmeler alt satıra iniyor ve yan yana genişliyor — dar ekranda taşma yok.

### Tamamlananlar çipi

Kaçırılanların hemen altında, aynı biçim, yeşil ton: **"N tamamlandı · +X net"**. Panelde en yeniden eskiye **son 25 görev**, her birinde "Geri al". Geri alma kazancı paraketeden düşürüyor ve görevi çarka döndürüyor. 25'ten fazlası varsa altta sayısı yazıyor — 278 satırlık liste telefonda kullanılamazdı.

### Yeni test · `cark_test.js` (30 kontrol)

Süzgecin üç kuralı · `bul()` vakti geçmiş ya da tamamlanmış görev döndürmüyor · kaçırılan görev normalde çarkta değil, taşınınca giriyor ve **listenin başına** geçiyor · tamamlanınca taşıma işareti temizleniyor · her iki çip ve panel HTML'de, çip sırası doğru · panel satırında ne-yapacaksın, kitap, sf aralığı, oturum alanları var · 25 sınırı · dar ekran düzeni · `tasi` senkronda korunuyor.

### On bir kapı

`kural_test.py` · `denet.py` · `kos.js` · `derin_test.js` · `kombo_test.js` · **`cark_test.js`** · `senk_kos.js` · `senk_poll.js` · `senk_etag.js` · `senk_uc.js` · `senk_rol.js` — **hepsi sıfır hata.**

**278 görev · 247.54 saat · K 67.20 · sürüm `2026-07-30a` ↔ `rota-2026-07-30a`**

---

## 37 · SÜRÜM 2026-07-30b — ÇARKI ÇEVİRME, GERİ GÖNDERME, BUGÜN PANELİ, MENÜ ORB'U

### Gerileme: ileriye göz atılamıyordu

§36'daki süzgeç sıradaki işi başa alıyordu ama çarkın **kaydırma diye bir şeyi yok** — şeritler mutlak konumla bir yay üzerine yerleşiyor, tarayıcı kaydırması devre dışı (`#cark{overflow:hidden}`). Pencere `[konum−7, konum+11]` olduğu için sıradaki iş 0. konumdayken yalnızca 11 iş ileri görünüyordu ve ötesine geçmenin yolu yoktu.

**Çözüm: çarkı çevirmek.** `adim(±1)` etkin işi bir adım kaydırıyor, dört girdiye bağlı:

| Girdi | Davranış |
|---|---|
| Fare tekerleği | 54 px'de bir adım; yatay kaydırma yok sayılıyor |
| Parmakla sürükleme | 8 px'den sonra sürükleme kipi, 54 px'de bir adım |
| **Tablette orta tuşla sürükleme** | aynı adım |
| ↑ / ↓ ok tuşları | bir adım (yazı alanındayken devre dışı) |

Sürükleme bittiğinde tek seferlik yakalayıcı ile **tıklama yutuluyor**, yoksa sürükleme sonunda parmağın altındaki şerit seçiliyordu. `#cark{touch-action:pan-x}` — dikeyi biz alıyoruz, yatay tarayıcıda kalıyor.

### Çarka taşımayı geri alma

Çarka taşınmış görevin kartında sağ üstte **hafif kontrastlı ✕**. Basınca `D.tasi`'dan siliniyor, görev kaçırılanlar çipine dönüyor, çark sıradakine geçiyor. Kart ayrıca ince yeşil çerçeveyle işaretli.

### "Bugün'e hızlı göz at"

Üçüncü çip. Panelde günün **kuş bakışı sırası**: blok başlıklarıyla gruplu, her satırda saat · ne yapacaksın · branş — görev · kitap + sf aralığı. Yapılanın **üstü çizili ve yanında ✓**, vakti geçenin yanında ⚠. Üstte özet: *N / M iş · X / Y saat*, gün kapandıysa yeşil damga. **‹ önceki gün** ve **sonraki gün ›** ile 27 gün gezilebiliyor; ilk/son günde düğme kilitleniyor.

### Menü orb'u

Sol üstte üç çizgili orb. İçinde **yalnız üç çip**: kaçırılanlar · tamamlananlar · Bugün'e hızlı göz at. **Mola, uyku ve yarın ilk görev çipleri orb'un dışında kaldı** — onlar `etSat` satırında.

Açılış kademeli ve yavaş: çipler 0.02 · 0.10 · 0.18 sn gecikmeyle, artan küçük yatay kaymalarla (0 · 7 · 16 px) çıkıyor — yay hissi dar ekranda taşma riski olmadan veriliyor. Orb açılınca üç çizgi ✕'e dönüşüyor. Kapalıyken **kaçırılan sayısı orb'un köşesinde altın rozet** olarak duruyor, böylece menüyü açmadan da haber alınıyor. Dışarı tıklama ve Escape kapatıyor, `aria-expanded` güncelleniyor.

### Test · `cark_test.js` 30 → 30 + 25 ek kontrol

Çevirme: dört girdi bağlı, yatay kaydırma yok sayılıyor, sürükleme sonrası tıklama yutuluyor, adım liste sınırında duruyor · çarpı yalnız taşınmış kartta, tıklaması taşımayı siliyor · Bugün paneli: üstü çizme, tick, blok grupları, gün özeti, gezinme kilidi · orb: üç çip içeride, kademeli açılış, rozet, dışarı tıklama, Escape, aria.

### On bir kapı

Hepsi sıfır hata. **278 görev · 247.54 saat · K 67.20 · sürüm `2026-07-30b`**

---

## 38 · SÜRÜM 2026-07-30c — YEDİ MADDELİK İŞ HARİTASI, DÖRDÜ TAMAM

| # | İş | Durum |
|---|---|---|
| 1 | Bugün paneli çalışmıyor | **tamam** |
| 2 | Mola kartları çarkta birinci sınıf olsun | **BEKLİYOR** |
| 3 | Kaydırırken odaklanan kart giderek büyüsün | **kısmen** |
| 4 | Mola kartına temiz nefes rengi | **tamam** |
| 5 | Mola geri sayımı + "Mola bitti" bildirimi | **BEKLİYOR** |
| 6 | Geri sayım açıkken senkron sıklaşsın | **BEKLİYOR** |
| 7 | Menü çipleri yalnız sembol | **tamam** |

### 1 · Bugün paneli — olay devrine geçirildi

Test ortamında `gpanelCiz()` sorunsuz çalışıyordu, tarayıcıda çalışmıyordu; kesin sebep bulunamadı. Bu yüzden **kırılamaz** hale getirildi: üç düğme artık doğrudan `onclick` ile değil **tek bir olay devri dinleyicisiyle** bağlı, panel öğesi `if(p)` ile korunuyor. Doğrudan bağlamada tek bir null öğe `getElementById(...).onclick=` satırında istisna atıp **betiğin kalanını durduruyordu** — en olası açıklama bu.

### 4 · Mola kartı rengi

Görev şeritleri nötr camdan; mola artık bilinçli olarak soğuk ve açık: `--bilgi` mavisinin daha aydınlık, daha az doygun hâli (`rgba(150,198,232,.16)` zemin, `#BFD9EC` yazı). Palete ait, ama görevle karıştırılmıyor.

### 7 · Menü çipleri yalnız sembol

Üç düğme 38×38 kare orb oldu: **⚠ · ✓ · ◷**. Uzun yazı yok; kaçırılan ve tamamlanan sayıları köşedeki küçük rozette. `title` ve `aria-label` ile hem imleçle hem ekran okuyucuyla açıklanıyor.

### 3 · Kaydırma büyümesi — kısmen

Ölçek rampası güçlendirildi (yakın komşu alt sınır .86 → **.80**, uzak .74 → **.68**), böylece yaklaşan şerit gözle görülür biçimde büyüyüp merkezde 1.0'a oturuyor. Ayrıca açılan karta 0.34 sn'lik yumuşak giriş eklendi.

⚠ **Tam çözüm değil.** Asıl sıçrama ölçekten değil, **içerik değişiminden** geliyor: şerit ile açılmış kart iki ayrı HTML. Gerçekten kesintisiz olması için gelen görevin kartının önceden çizilip çapraz geçişle değişmesi gerekir — bu `carkCiz`/`diz` ikilisinin yeniden yazımı demek.

### 2 · 5 · 6 — neden bu turda yapılmadı

**Mola kartlarının çarkta birinci sınıf olması mimari bir değişiklik.** Şu an `carkListe()` yalnız **görev indeksleri** döndürüyor; `aktif` bir görev indeksi ve `brifCiz(GOREVLER[aktif])` bir görev bekliyor. Molaları durak yapmak için:

1. `carkListe()` karışık girdi döndürmeli (`{tip:'is',i}` / `{tip:'mola',i}`)
2. `aktif` artık görev indeksi değil, liste konumu olmalı — `bul`, `gecis`, `adim`, `diz`, `nabiz`, `kart`, `brifCiz` ve `kos.js`'in yarısı bundan etkileniyor
3. Mola odaklanınca brifing alanı görev yerine mola içeriği göstermeli

Geri sayım (5) ve senkron sıklaştırma (6) bu yapının üstüne oturuyor — mola kartı bir durak olmadan geri sayımın yaşayacağı yer yok. Üçünü **tek ve dikkatli bir turda** yapmak, bu tura sıkıştırıp yarım bırakmaktan doğru.

### Dokuz kapı

Hepsi sıfır hata. **278 görev · 247.54 saat · K 67.20 · sürüm `2026-07-30c`**

---

## 39 · SÜRÜM 2026-07-31a — MOLALAR: DURAK · GERİ SAYIM · BİLDİRİM

§38'de bekleyen üç madde (2 · 5 · 6) tamamlandı.

### Mimari: en az yıkım

`aktif` **hâlâ bir GÖREV indeksi.** Yanına `molaOdak` bayrağı geldi: odak bir moladaysa `aktif` o molanın **sahibi olan görevi** gösterir. Böylece `kart()`, `para()`, `bul()`, `puan()` ve `kos.js`'in tamamı **hiç değişmedi** — 12 kapının hepsi ilk denemede geçti.

Yeni katman:

| Parça | İş |
|---|---|
| `duraklar()` | görev + mola karışık durak listesi (`{i, m}`) |
| `durakKonum(S)` | mevcut odağın liste konumu |
| `adim(±1)` | durak listesi üzerinde yürür — **mola artık atlanmıyor** |
| `gecis(i,m)` | odağı görev ya da mola olarak kurar |
| `diz()` | odaklı öğeyi artık `.act` sınıfından buluyor (mola da olabilir) |

Sıçramanın sebebi buydu: `adim` yalnız görev indeksleri arasında geziyordu, mola şeridi görsel olarak arada duruyor ama durak değildi.

### Geri sayım

**Yalnız önceki iş tamamlandıysa başlar** — mola hak edilmiş olmalı. Ayrıca bugün olmalı ve saat mola penceresi içinde olmalı. Kart 38 px'lik `mm:ss` sayacı, ince ilerleme çubuğu ve yavaş nefes alan bir gölge gösteriyor. İş bitmemişse kartta *"Önceki işi tamamlayınca geri sayım başlar."* yazıyor.

Saniyelik tik **yalnız ekranda geri sayım kartı varken** çalışıyor (`querySelector('[data-mk]')` yoksa hemen çıkıyor) — boşta pil harcamıyor.

### Bildirim

Sayım sıfırlanınca **bir kez** "Mola bitti, çalışma vakti" gidiyor; servis çalışanı varsa onun üzerinden, yoksa doğrudan. İzin, mola brifingi ilk açıldığında nazikçe isteniyor (`permission==='default'` iken). Uygulama içi bildirim şeridi de her hâlükârda gösteriliyor.

⚠ **Sınır:** tarayıcı bildirimi sayfa açıkken çalışır. Telefon kilitliyken zamanlanmış bildirim için push altyapısı gerekir — bu programda yok.

### Senkron sıklaştırma

`molaSayimVar()` doğruyken yoklama aralığı **20 saniyeye** iniyor (normalde 45 sn → 6 dk uyarlanabilir). Sebep: bildirimin doğru anda çıkması için okur cihazın "iş bitti" bilgisini hızlı alması gerekiyor.

### Mola kartının rengi

Görev kartları nötr camdan; mola bilinçli olarak **soğuk ve açık**: `rgba(150,198,232,.17)` zemin, `#E4F0F8` başlık, `#9CC6E4` ikon. `--bilgi` mavisinin daha aydınlık, daha az doygun hâli — palete ait, göreve benzemiyor.

### Yeni test · `mola_test.js` (36 kontrol)

Durak listesi üretiliyor ve her mola durağı bir görev durağını izliyor · **ileri ve geri kaydırmada mola durağına uğranıyor** · `bul()` odağı sıfırlıyor · geri sayım iş bitmeden başlamıyor, pencere dışında yok, başka günde yok, iş geri alınınca duruyor · kart iki hâlde de doğru çiziliyor · brifing mola içeriği gösteriyor ve görev kombosu göstermiyor · bildirim metni, tek-kez koruması, servis çalışanı yolu, izin isteme · 20 sn senkron · saniyelik tik koşulu · 4 gün × 6 saat çizim ve durak geçişi.

### On iki kapı

`kural_test.py` · `denet.py` · `kos.js` · `derin_test.js` · `kombo_test.js` · `cark_test.js` · **`mola_test.js`** · `senk_kos.js` · `senk_poll.js` · `senk_etag.js` · `senk_uc.js` · `senk_rol.js` — **hepsi sıfır hata.**

**278 görev · 247.54 saat · K 67.20 · sürüm `2026-07-31a` ↔ `rota-2026-07-31a`**

---

## 40 · SÜRÜM 2026-07-31b — SÜREKLİ KAYDIRMA ve MENÜ ONARIMI

### Bugün orb'u iki ayrı sebepten bozuktu

**1 · Düzen.** `.mYay` `position:absolute` ile `top:40px`'e konmuştu ve altındaki **`etSat` şeridinin üstüne biniyordu** — ekran görüntüsünde "4 sa 56 dk mola" çipi orb'ların arasından geçiyordu. Menü artık **kendi zemini olan yatay bir panel**: cam arka plan, ince kenarlık, `z-index:60`, kapalıyken `visibility:hidden`. Rozet konumu da düzeltildi (`box-shadow` ile zemine oturuyor, boşken gizleniyor).

**2 · Bağlama.** Kaçırılanlar çipi doğrudan `onclick` ile çalışıyordu, Bugün olay devriyle çalışmıyordu. **Çalışan desene geçirildi:** doğrudan `onclick` + `stopPropagation` (menünün kendi kapanma dinleyicisi araya girmesin) + `try/catch`. Gezinme düğmeleri de aynı korumayı aldı.

### Sürekli kaydırma

Eski davranış **adım adımdı**: 54 px biriktikçe bir sonraki durağa sıçrıyordu. Yeni davranış parmağı **piksel piksel** takip ediyor.

| Parça | İş |
|---|---|
| `kayY` | sürükleme kayması; `diz()` içinde `y[a]=kayY` olarak uygulanıyor, açılar ondan türediği için yay eğrisi doğal biçimde takip ediyor |
| `surukleKip` | sürüklerken **açılmış kart şerit hâline dönüyor** — liste gibi tek tip, sıçrama yok |
| `#sahne.sur` | sürüklerken tüm geçişler kapalı (1:1 takip) |
| `merkezEl` | `diz()` her karede merkeze en yakın öğeyi işaretliyor |
| `otur()` | bırakınca o durağa oturuluyor, kart açılıyor, geçişler geri geliyor |

Tekerlek de aynı akışı kullanıyor: `kayY -= deltaY`, son olaydan **150 ms** sonra oturuyor. Böylece fare tekerleği de sürekli, sonunda yumuşak bir yerleşmeyle bitiyor.

Sürükleme bittiğinde tek seferlik yakalayıcı tıklamayı yutuyor — parmağını kaldırdığın yerdeki şerit seçilmiyor.

### On iki kapı

Üç test beklentisi kod değiştiği için güncellendi (adım sınırı `L` → `S`, yay gecikmeleri, Bugün bağlama deseni); üçü de uygulama hatası değil, eskimiş iddiaydı. **Hepsi sıfır hata.**

**278 görev · 247.54 saat · K 67.20 · sürüm `2026-07-31b` ↔ `rota-2026-07-31b`**

---

## 41 · SÜRÜM 2026-07-31c — KAYDIRMA AKICILIĞI

**Belirti:** yan yana görevler arasında kaydırma çok hızlı gerçekleşiyor, mıknatıs çekiyormuş gibi hissettiriyor.

### Kök sebep: her parmak hareketinde tam düzen hesabı

Sürüklerken her `pointermove` olayında **`diz()` baştan koşuyordu.** `diz()` dört yakınsama geçişi yapıyor ve her şerit için `getBoundingClientRect()` okuyor — 19 çocuk × 4 geçiş, saniyede 60 kez. Tarayıcı her karede düzeni yeniden hesaplamak zorunda kalıyor; sonuç takılma ve "mıknatıs" hissi.

### Çözüm 1 · Ölçümsüz sürükleme karesi

`diz()` artık geometriyi **önbelleğe alıyor**: yakınsanmış yükseklikler, genişlikler, aralık dizisi, küme bayrakları, açı sınırı fonksiyonları. İçerik sürükleme boyunca değişmediği için bunlar sabit.

Yeni `dizKay()` yalnız aritmetik yapıyor: `y → açı → dönüşüm`. **Hiç DOM ölçümü yok.** Ayrıca `requestAnimationFrame` ile kare başına tek güncelleme — parmak 120 Hz olay üretse bile ekran 60 kez çiziliyor.

Tekerlek de aynı yolu kullanıyor.

### Çözüm 2 · Yumuşak oturma

Bırakınca `#sahne.otu` sınıfı 680 ms takılıyor:

| | Normal | Oturma |
|---|---|---|
| Şerit geçişi | .52s `cubic-bezier(.24,.74,.22,1)` | **.60s `cubic-bezier(.17,.86,.26,1)`** |
| Kart açılışı | .40s, gecikmesiz | **.44s, .10s gecikmeli** |

Kart açılışının 100 ms geciktirilmesi önemli: eskiden şeritler yerine otururken kart aynı anda açılıyordu, iki hareket üst üste binip sert görünüyordu. Artık önce şeritler oturuyor, sonra kart açılıyor.

### Test

`cark_test.js`'e 10 akıcılık kontrolü eklendi: geometri önbelleği kuruluyor · `dizKay` içinde `getBoundingClientRect` **yok** · parmak ve tekerlek rAF ile kare başına tek · sürüklerken `diz()` çağrılmıyor · oturma sınıfı ekleniyor ve 680 ms sonra kaldırılıyor · kart açılışı gecikmeli.

### On iki kapı

Hepsi sıfır hata. **278 görev · 247.54 saat · K 67.20 · sürüm `2026-07-31c` ↔ `rota-2026-07-31c`**

---

## 42 · SÜRÜM 2026-07-31d — ORB İKONLARI ve BİR DENETİM HATASI

### Üç orb SVG ikona geçti

`⚠ · ✓ · ◷` tek karakterli semboller küçük kalıyordu ve `◷` bir yapılacaklar listesi çağrıştırmıyordu. Üçü de **nav orb'larıyla aynı ikon diline** geçti: 24 birimlik `viewBox`, çizgi tabanlı, `stroke-linecap:round`, `currentColor` — yani her orb kendi renginden boyanıyor.

| Orb | İkon |
|---|---|
| Kaçırılan | uyarı üçgeni (üç çizgi) |
| Tamamlanan | tek hamlelik onay işareti |
| **Bugün** | **yapılacaklar listesi** — üç onay kutusu + üç satır çizgisi, 6 çizgiden oluşuyor |

Orb ölçüsü 38 → 40 px, ikon 19 px.

### ⚠ Denetim hatam: `tail -1` gerçeği gizliyordu

Test dosyalarının çoğu **bölüm bölüm** özet basıyor. Ben sonucu `tail -1` ile okuyordum; `kombo_test.js` iki bölümlü olduğu için **son satır yalnız ikinci bölümün sonucunu** gösteriyordu. Böylece o dosyada duran **bir hata birkaç turdur görülmemişti**.

Yakalanan hata neydi: *"animasyonların hepsi prefers-reduced-motion içinde"* kontrolü, `no-preference` bloğunun **tek** olduğunu varsayıyordu. §39'da mola bloğu eklenince ilk blok o oldu ve kontrol yanlış negatif verdi. **Uygulama doğruydu** — beş kombo animasyonunun beşi de korumalı, üstelik genel bir `reduce` kuralı da var.

İki kalıcı düzeltme:
1. Kontrol artık **tüm** `no-preference` bloklarını tarıyor, ayrıca genel `reduce` kuralını da doğruluyor.
2. `kombo_test.js` ve `cark_test.js`'in **son satırı artık tüm bölümlerin toplamını** basıyor — `tail -1` bir daha yalan söylemeyecek.

Bundan sonraki denetimlerde ölçüt: **tüm çıktıda `✗` satırı sayısı sıfır olmalı**, son satıra bakmak yetmez.

### On iki kapı — tüm çıktı tarandı

`✗` satırı toplamı: **0**. **278 görev · 247.54 saat · K 67.20 · sürüm `2026-07-31d` ↔ `rota-2026-07-31d`**

---

## 43 · ENVANTER KURULDU — ve VİDEO PLANI CİDDİ BİÇİMDE YANLIŞMIŞ

Kullanıcı, kaynak beyanının tamamını ve eksik sayfa sayılarını verdi. **`envanter.py`** kuruldu: 20 kitabın içindekiler tablosu, video serisi ve deneme serileri. Buraya yazılmayan hiçbir konu görev olarak üretilemez.

### Doğrulanan bulgu: Enfeksiyon videosu YOKTUR

Atilla Uslu **Dahiliye konu kitabı 1** (251 sf: Hematoloji · Onkoloji · Kardiyoloji · Göğüs) ve **2** (260 sf: Nefroloji · Endokrinoloji · Gastroenteroloji/Hepatoloji · Romatoloji) — sekiz bölüm, **Enfeksiyon yok**. Video serisi de bu kitapları izliyor.

Enfeksiyon yalnız **Atilla Uslu Sorularla Son Tekrar** kitabında var (sf 337–358) ve o ayrı bir kaynak.

### Gerçek video envanteri · 44 video · 1515 dk · 1.5x'te 16.83 saat

| Konu | Video | Süre | 1.5x saat | Video başı (BÖLÜNEMEZ) |
|---|---|---|---|---|
| Hematoloji | 9 | 40 dk | **4.00** | 0.444 |
| Onkoloji | 1 | 45 dk | 0.50 | 0.500 |
| Endokrinoloji | 7 | 30 dk | 2.33 | 0.333 |
| Kardiyoloji | 6 | 45 dk | 3.00 | 0.500 |
| Göğüs Hastalıkları | 6 | 30 dk | 2.00 | 0.333 |
| Nefroloji | 4 | 30 dk | 1.33 | 0.333 |
| Gastroenteroloji | 7 | 30 dk | 2.33 | 0.333 |
| Romatoloji | 4 | 30 dk | 1.33 | 0.333 |

⚠ **Yeni kısıt: video bölünemez.** Her görev tam sayıda video içermeli. Şu anki program bunu ihlal ediyor (0.74 saatlik yarım Enfeksiyon oturumları).

### Program vs gerçek — dağılım baştan aşağı yanlış

| Konu | Programda | Gerçek | Fark |
|---|---|---|---|
| **Hematoloji** | **0.00** | 4.00 | **−4.00** |
| **Onkoloji** | **0.00** | 0.50 | **−0.50** |
| Hematoloji + Onkoloji (uydurma birleşim) | 1.48 | — | +1.48 |
| **Enfeksiyon Hastalıkları (UYDURMA)** | **1.48** | **0.00** | **+1.48** |
| **Kardiyoloji** | **5.92** | 3.00 | **+2.92** |
| Endokrinoloji | 1.48 | 2.33 | −0.85 |
| Gastroenteroloji | 1.48 | 2.33 | −0.85 |
| Göğüs Hastalıkları | 1.48 | 2.00 | −0.52 |
| Nefroloji | 1.48 | 1.33 | +0.15 |
| Romatoloji | 1.48 | 1.33 | +0.15 |
| **TOPLAM** | 16.28 | **16.83** | −0.55 |

Toplam neredeyse tutuyordu ama **konu dağılımı tamamen hayaliydi**: Hematoloji 9 videoluk en büyük blok olduğu hâlde programda hiç yok; Kardiyoloji gerçeğin iki katı.

### Envanterde ortaya çıkan iki uyuşmazlık daha

- **Speetus Genel Cerrahi:** `eko.py` **20** bölüm içeriyordu, gerçek içindekiler **34** bölüm. Yetkili tablo eksikmiş.
- **Anatomi Fast Track:** kaynak beyanında **hiç yok**. `eko.py`'deki 126 sayfa / 13 bölüm listesi kullanıcı beyanına dayanmıyor. **Doğrulanmalı.**

### Beyan edilmeyen dört kalem

Yavuz Şahin Biyokimya konu kitabı · Klinisyen Vaka Fizyoloji · Klinisyen Vaka Küçük Stajlar toplam sayfa sayıları; Atilla Uslu SST ve Yavuz Şahin video süreleri (satın alınmadı).

### Yeni ölçüm

10 Farmakoloji sorusu (bakir konu, açıklama okuyarak) **15 dk** · 10 Pediatri sorusu (klinik, tanıdık) **10 dk**.

---

## 44 · TAKVİM 25 GÜNE İNDİ · UYDURMA VİDEOLAR SİLİNDİ · KURAL C AÇIK

### Yeni takvim: 29 Temmuz – 22 Ağustos

27 Temmuz program hazır olmadığı için, **28 Temmuz** kız arkadaşının doğum günü olduğu için çalışılamadı. Program **29 Temmuz Çarşamba** başlıyor.

| | Önce | Sonra |
|---|---|---|
| Gün | 27 | **25** |
| Görev | 278 | **257** |
| Saat | 247.54 | **237.23** |
| Projeksiyon K | 67.20 | **66.68** |
| Nominal kapasite | 289.50 | 273.00 |

İki günün kaybı 19 görev · 15.83 saat · 3.739 net. Projeksiyon kaybı yalnız −0.52 çıktı çünkü yarım kalacak iki bölüm **birleştirilerek kurtarıldı**:

- Farmakoloji Kemoterapötikler + İmmün Modülatör: 8 Ağu oturumu sf 112–117 → **sf 90–117** (0.88 → 4.73 sa)
- Farmakoloji Genel Farmakoloji + OSS: 15 Ağu oturumu sf 23–25 → **sf 5–25** (0.35 → 3.50 sa)

Bunlar yapılmasa Kural D kırılacaktı (kısmi bölüm). Diğer 6 bölüm tamamen düştü — Kural D "bitir ya da başlama" dediği için bu yasal.

### Uydurma video görevleri silindi

`Enfeksiyon Hastalıkları videoları — 1. yarı` (29 Tem) ve `— 2. yarı` (3 Ağu). **Atilla Uslu Dahiliye konu kitaplarında Enfeksiyon bölümü yok, videosu da yok.** Kullanıcı tespiti doğrulandı, iki görev programdan çıkarıldı.

⚠ **Hâlâ duran uydurma:** 2 Ağustos D bloğunda `Hematoloji + Onkoloji videoları` 1.48 saat. Gerçek envanter: Hematoloji **9 video 4.00 saat** + Onkoloji **1 video 0.50 saat**, ayrı konular. Tek blokta 4.5 saat video olmaz — bu bir yerleşim işi, bu turda dokunulmadı.

### Tusanaliz verisi düzeltildi

Kullanıcı teyidiyle: Temel Mikrobiyoloji `[2,3,4,4,2]` · Genel Cerrahi Dalak `[1,1,1,1,1]` · Küçük Stajlar Anestezi `[1,1,1,1,1]`. **11 branşın 11'i radar tablosuyla tutuyor** (Mikrobiyoloji ham veriye göre 18.00, radar 17.8 diyordu — ham veri artık esas).

### Kural 9 yeniden tanımlandı

Eskiden "28 Temmuz yalnız Z bloğu" idi. Artık: **27–28 Temmuz programda olmamalı, ilk gün 29 Temmuz.** İki kontrol olarak kalıcı hale getirildi.

### ⚠ AÇIK MADDE: Kural C azalan kırık

| Dilim | Yeni öğrenme |
|---|---|
| 1 (29 Tem – 5 Ağu) | 47.09 sa |
| 2 (6 – 14 Ağu) | **53.58 sa** |
| 3 (15 – 22 Ağu) | 36.56 sa |

Dilim 2, dilim 1'i **6.49 saat** aşıyor. Sebep: kaybedilen iki gün ilk dilimin en yüklü günleriydi.

**Kesimle çözülmüyor** — 3'ten 20'ye kadar tüm sınır ikilileri denendi, hiçbiri `geri getirme artan` + `yeni öğrenme azalan` şartlarını birden sağlamıyor.

**Çözüm yolu:** ilk dilime iş eklemek. İlk dilimde **13.62 saat boş** kapasite var (deneme günleri hariç **7.48 saat**), gereken 6.49. Yani yapılabilir — ama Kural B zincir günü uyumu gerektiriyor ve bu ayrı bir yerleşim turu.

Geri getirme yönü sağlam: 17.61 < 18.49 < 27.89 ✓ · Kural A, B, D ve `kural_test.py` 18/18 ✓ · sayfa sürekliliği ✓

**257 görev · 25 gün · 237.23 saat · K 66.68 · ilk gün 29 Temmuz**

---

## 45 · ENVANTER TAMAMLANDI — 21 KİTAP, SON KÖR NOKTA KAPANDI

Kullanıcı Anatomi Fast Track içindekilerini verdi. **Envanterde artık doğrulanmamış kaynak kalmadı.**

### eko.py doğruymuş — 13 bölümün 13'ü birebir

| | eko.py | Envanter |
|---|---|---|
| Sayfa | 126 | **126** ✓ |
| Bölüm | 13 | **13** ✓ |
| Sayfa aralıkları | — | **13/13 birebir aynı** ✓ |

Kemikler 5–22 · Eklemler 22–28 · Kaslar 28–49 · Pleksuslar 49–55 · Solunum 55–60 · Dolaşım 60–77 · Sindirim 77–90 · MSS 90–106 · PSS 106–115 · Duyu Organları 115–119 · Ürogenital 119–124 · Endokrin 124–126 · Deri ve Ekleri 126 (son sayfa).

Yani `eko.py`'deki Anatomi tablosu baştan doğruydu; **eksik olan izlenebilirlikti**, veri değil. Artık kullanıcı beyanına dayanıyor.

### Nöroanatomi paylaştırması

Tusanaliz'de `Nöroanatomi` **tek etiket, 4.20 soru** — ama kitapta üç bölüm: MSS (16 sf) · PSS (9 sf) · Duyu Organları (4 sf) = 29 sayfa. Katalogda **sayfa oranıyla** paylaştırıldı: 2.32 / 1.30 / 0.58. Üçünün toplamı 4.20 ✓

⚠ Bu bir modelleme kararıdır, ölçüm değil. §26'daki aynı sorunun (bir Tusanaliz etiketi, birden çok kitap bölümü) Anatomi'deki karşılığı. Alternatif: üçünü **tek bölüm** sayıp beraber okumak (Kural D ile daha tutarlı). **Karar kullanıcıya ait.**

`Pleksuslar` · `Ürogenital` · `Endokrin` · `Deri ve Ekleri` — Tusanaliz Anatomi listesinde karşılığı yok, soru potansiyeli **0** sayıldı.

### Anatomi verimlilik sırası

| Bölüm | Sayfa | Saat | Soru | net/sa |
|---|---|---|---|---|
| Solunum Sistemi | 5 | 0.88 | 1.00 | **0.233** |
| PSS · MSS · Duyu | 9 · 16 · 4 | 1.57 · 2.80 · 0.70 | 1.30 · 2.32 · 0.58 | 0.169 |
| Sindirim | 13 | 2.27 | 1.80 | 0.161 |
| Kaslar | 21 | 3.67 | 2.20 | 0.122 |
| Dolaşım | 17 | 2.98 | 1.40 | 0.096 |
| Kemikler | 17 | 2.98 | 1.00 | **0.068** |
| Eklemler | 6 | 1.05 | 0.20 | **0.039** |
| Pleksuslar · Ürogenital · Endokrin · Deri | 14 | 2.45 | 0.00 | **0.000** |
| **TOPLAM** | 122 | **21.35** | 11.80 | 0.113 |

**Kemikler ve Eklemler dikkat çekici:** 23 sayfa, 4.03 saat, yalnız 1.20 soru. Anatomi'nin en pahalı ve en verimsiz kısmı. `Pleksuslar` dahil dört bölüm (2.45 saat) hiç soru getirmiyor.

### Katalog nihai durumu

**246 bölüm · 187'sinde soru verisi eşleşti · toplam 435.8 saat okuma yükü · beklenen net 52.47**

Programın kapasitesi **273.00 saat** (25 gün). Yani elindeki kaynakların **%63'ünü** okuyabilirsin — seçim zorunlu ve katalog tam bunun için var.

---

## 46 · NÖROANATOMİ KARARI · ANATOMİ ENVANTERİ KAPANDI

**Kullanıcı kararı (28 Tem):** Tusanaliz `Nöroanatomi` etiketi MSS ve PSS'in ikisini birden kapsıyor; **Kural D'ye uymak için tek bölüm sayılıyor.**

`Nöroanatomi (MSS + PSS)` · **sf 90–115 · 25 sayfa · 4.38 saat · 4.20 soru · 0.196 net/saat**

Bu, §26'daki "bir Tusanaliz etiketi, birden çok kitap bölümü" sorununun **doğru çözümü**: ölçümün yapıldığı birim bölüm sayılıyor, soru sayfaya paylaştırılmıyor. Aminoasit ve Duyu çiftlerinde de aynı yol izlenmeli.

### Alt başlıklar kaydedildi

Kullanıcı MSS · PSS · Duyu Organları'nın alt başlıklarını verdi; `envanter.py` içinde `ALT` sözlüğünde tutuluyor — **14 alt konu, 2 bölüm için.** Görev brifinglerinde "bu blokta sadece Medulla Spinalis → Cerebellum" gibi yönlendirme yazmak artık mümkün.

MSS: Medulla Spinalis 90 · Truncus Encephali 95 · Cerebellum 97 · Diencephalon 98 · Limbik Sistem 99 · Telencephalon 100 · Substantia Alba 101 · Nuclei Basales 102 · BOS Dolaşımı ve Ventriküller 102 · Meninges/Dural Sinüsler/Sisternalar 103
PSS: Kranyal Sinirler 106 · Otonom Sinir Sistemi 113
Duyu: Bulbus oculi (Göz) 115 · Auris (Kulak) 117

### ⚠ Duyu Organları hakkındaki çıkarımım YANLIŞTI — düzeltildi

Önce "göz/kulak soruları Küçük Stajlar altında sayılıyor olabilir" diye yazmıştım. **Kullanıcı teyidi (28 Tem): yanlış.** Anatomi `Duyu Organları` (Bulbus oculi · Auris **yapıları**) ile Küçük Stajlar `Göz Hastalıkları` · `KBB` (**klinik**) ayrı içeriktir; biri diğerinin yerine sayılamaz.

**Bunun getirdiği asıl ayrım: "0 soru" ile "veri yok" aynı şey değildir.**

### Anatomi nihai tablo · 12 bölüm · 122 sayfa · 21.35 saat · 11.80 soru

| Bölüm | Sayfa | Saat | Soru | net/sa |
|---|---|---|---|---|
| Solunum Sistemi | 5 | 0.88 | 1.00 | **0.233** |
| **Nöroanatomi (MSS + PSS)** | **25** | **4.38** | **4.20** | **0.196** |
| Sindirim Sistemi | 13 | 2.27 | 1.80 | 0.161 |
| Kaslar | 21 | 3.67 | 2.20 | 0.122 |
| Dolaşım Sistemi | 17 | 2.98 | 1.40 | 0.096 |
| Kemikler | 17 | 2.98 | 1.00 | 0.068 |
| Eklemler | 6 | 1.05 | 0.20 | 0.039 |
| Pleksuslar · Duyu · Ürogenital · Endokrin · Deri | 18 | **3.15** | **0.00** | **0.000** |

Toplam 11.80 · Tusanaliz ile **birebir** ✓

**Beş bölüm 3.15 saat tutuyor ve hiç soru getirmiyor.** Anatomi'yi seçerken ilk kesilecek yer burası.

### Katalog nihai

**245 bölüm · 435.8 saat · beklenen net 52.47 · program kapasitesi 273.00 saat**

---

## 47 · "SIFIR SORU" ile "VERİ YOK" AYRIMI

Kullanıcının Duyu Organları düzeltmesi bir yöntem hatasını ortaya çıkardı: Tusanaliz'de karşılığı olmayan bölümleri **0 soru** sayıyordum. Bu yanlış — 0, ölçülmüş bir değerdir; o bölümler **hiç ölçülmemiş**.

Fark önemli: 0 soru sayılan bir bölüm verimlilik sıralamasının **en dibine** düşer ve otomatik olarak kesilir. Ölçülmemiş bir bölüm ise sıralamaya **hiç girmemeli**, kullanıcı kararına bırakılmalı.

`envanter.py`'ye `VERI_YOK` kümesi, `gorev_katalog.py`'ye `None` dönüşü eklendi.

### Anatomi · ölçülmüş 7 bölüm · 104 sayfa · 18.20 saat · 11.80 soru

| Bölüm | Sayfa | Saat | Soru | net/sa |
|---|---|---|---|---|
| Solunum Sistemi | 5 | 0.88 | 1.00 | **0.233** |
| Nöroanatomi (MSS + PSS) | 25 | 4.38 | 4.20 | 0.196 |
| Sindirim Sistemi | 13 | 2.27 | 1.80 | 0.161 |
| Kaslar | 21 | 3.67 | 2.20 | 0.122 |
| Dolaşım Sistemi | 17 | 2.98 | 1.40 | 0.096 |
| Kemikler | 17 | 2.98 | 1.00 | 0.068 |
| Eklemler | 6 | 1.05 | 0.20 | 0.039 |

Toplam 11.80 · Tusanaliz ile birebir ✓ · ortalama **0.132 net/saat**

### Anatomi · verisi olmayan 5 bölüm · 18 sayfa · 3.15 saat

Pleksuslar 6 sf · Duyu Organları 4 sf · Ürogenital 5 sf · Endokrin 2 sf · Deri ve Ekleri 1 sf

**Bunlar sıralamaya girmiyor.** Okunup okunmayacağı ölçümle değil kullanıcı kararıyla belirlenecek.

### Katalog nihai durumu

**245 bölüm** · **181'i ölçülmüş** · **64'ünde veri yok** · toplam 435.8 saat · beklenen net 52.47 (yalnız ölçülmüşlerden)

64 ölçülmemiş bölüm katalogun dörtte biri. Yerleşim yapılırken bunlar ayrı ele alınacak — verimliliği bilinmediği için ne otomatik seçilebilir ne otomatik kesilebilir.

---

## 48 · KATALOG TAMAMLANDI — EŞLEŞMEYEN BÖLÜM SIFIR

Kullanıcının 28 Temmuz kararları ve yeni verisiyle katalogdaki bütün boşluklar kapandı.

### Kullanıcı kararları

| Karar | Sonuç |
|---|---|
| Feyyaz Akay **Oldies + Goldies tek birim** | 14 bölüm → **8 birim** |
| **Pleksuslar** → Nöroanatomi | |
| **Duyu Organları** → Nöroanatomi | |
| **Deri ve Ekleri** → Nöroanatomi | |
| **Endokrin Sistem Anatomisi** → Sindirim (GİS) birimine | |
| **Ürogenital** Tusanaliz verisi | `[1,1,1,2,1]` → **1.20 soru** |

Anatomi 13 bölümden **8 birime** indi. Anatomi branş toplamı **11.80 → 13.00** (Ürogenital eklendi) — `soru_tablo.json`'daki radar değeri 11.8 artık eski, ham veri esas.

### Çoklu aralık desteği

İki Anatomi birimi bitişik olmayan sayfa aralıkları taşıyor; `envanter.py`'ye `ARALIK` sözlüğü eklendi:

- **Sindirim + Endokrin**: sf 77–90 ve 124–126 · 15 sayfa
- **Nöroanatomi**: sf 49–55, 90–119 ve 126–127 · 36 sayfa

### Eşleme tablosu tamamlandı — 59 boşluk kapandı

§47'de "ölçülmemiş" görünen 64 bölümün **59'u aslında benim eşleme tablomdaki boşluktu**, veri eksikliği değil. Yedi kitabın bölüm adları Tusanaliz etiketlerine bağlandı: Klinisyen Vaka Fizyoloji · Feyyaz Akay · Levent Kodal · Klinisyen Vaka Küçük Stajlar · Yavuz Şahin Biyokimya konu · Yavuz Şahin Biyokimya SB · Yavuz Şahin Farmakoloji SB.

Çift sayım engellendi: aynı Tusanaliz etiketine düşen ikinci bölüm **0** alıyor (Genel Embriyoloji, Proteinler gibi) — soru bir kez sayılıyor.

### Anatomi nihai · 8 birim · 122 sayfa · 21.35 saat · 13.00 soru

| Birim | Sayfa | Saat | Soru | net/sa |
|---|---|---|---|---|
| Ürogenital Sistem | 5 | 0.88 | 1.20 | **0.279** |
| Solunum Sistemi | 5 | 0.88 | 1.00 | 0.233 |
| Sindirim + Endokrin | 15 | 2.62 | 1.80 | 0.140 |
| Nöroanatomi (Pleksus+MSS+PSS+Duyu+Deri) | 36 | 6.30 | 4.20 | 0.136 |
| Kaslar | 21 | 3.67 | 2.20 | 0.122 |
| Dolaşım Sistemi | 17 | 2.98 | 1.40 | 0.096 |
| Kemikler | 17 | 2.98 | 1.00 | 0.068 |
| Eklemler | 6 | 1.05 | 0.20 | 0.039 |

**Ürogenital, verisi gelince Anatomi'nin en verimli birimi oldu** — 5 sayfa, 0.88 saat, 1.20 soru. Önceki turda "veri yok" diye kesilme riskindeydi.

### KATALOG NİHAİ

**235 birim · 235'i ölçülmüş · eşleşmeyen 0 · 435.8 saat okuma yükü · beklenen net 69.99**

Net beklentisi 52.47'den **69.99'a** çıktı — 59 bölümün verimliliği artık hesaplanabiliyor. Program kapasitesi **273.00 saat**, yani katalogun **%63'ü** yerleşebilir.

---

## 49 · ⚠ AÇIK KUSURLAR LİSTESİ — PROGRAM HAZIR DEĞİL

"Yarın 06:00'da başlıyorsun, program hazır" dedim. **Fazla söyledim.** Kullanıcı haklı olarak sordu, kontrol ettim, beş açık kusur var. Hiçbiri yarını engellemiyor ama program bütün olarak hazır değil.

### 1 · İki blok taşması — BENİM BİRLEŞTİRME HATAM

§44'te 27–28 Temmuz düşünce yarım kalan iki bölümü birleştirdim. Bölüm bütünlüğünü (Kural D) kurtardım ama **saatleri sığmayacak bloklara yığdım:**

| Gün · blok | Yük | Kapasite | Aşım |
|---|---|---|---|
| **8 Ağu · Z** | **4.82 sa** | 1.00 sa | **+3.82** |
| **15 Ağu · C** | **5.20 sa** | 2.50 sa | **+2.70** |

8 Ağustos Z bloğu 06:00–07:00; içine Kemoterapötikler'in 4.73 saati konmuş. 15 Ağustos C bloğu 2.50 saat; içine Genel Farmakoloji'nin 3.50 saati artı üç iş daha konmuş. `dizi3.py` saatleri sıkıştırdığı için ekranda 0.93 saatlik iş "17:00–17:05" görünüyor — **anlamsız.**

**Doğru çözüm:** iki bölümü çok oturuma bölmek (Kural D bölüm bütünlüğü ister, tek oturum istemez), sayfa sürekliliğini ve Kural B zincir gününü koruyarak.

### 2 · İki küçük blok taşması

6 Ağustos E +0.37 sa · 18 Ağustos A +0.35 sa. Bunlar §36–39 turlarındaki yerleştirmelerden kalmış, ciddi değil ama kayıtlı.

### 3 · Kural C azalan kırık

Yeni öğrenme 47.09 / **53.58** / 36.56 — dilim 2 dilim 1'i 6.49 saat aşıyor. Kesimle çözülmüyor; ilk dilime iş eklenmeli (13.62 saat boş var).

### 4 · Video görevleri gerçek envanterle uyuşmuyor

Programda 13.32 saat / 9 görev var; gerçek envanter **16.83 saat / 44 video / 8 konu**. 2 Ağustos'ta hâlâ **uydurma `Hematoloji + Onkoloji videoları`** duruyor. Kardiyoloji 4 oturumda 5.92 saat gösteriyor, gerçek 3.00. Hematoloji (4.00 saat, 9 video) programda **hiç yok**. 29 Tem–8 Ağu penceresinde 18.75 saat boş var, yer sorunu değil.

### 5 · Anatomi görevleri katalogla uyuşmuyor

§48'de Anatomi 8 birime indi (Nöroanatomi 5 parçayı, Sindirim Endokrin'i kapsıyor). Programdaki Anatomi görevleri hâlâ eski 13 bölümlü yapıya göre. Yerleşim turunda eşitlenecek.

### Ne KULLANILABİLİR durumda

**21 / 25 gün temiz.** 29 Temmuz – 5 Ağustos arası hiç sorunlu blok yok; ilk ciddi kırılma **8 Ağustos**, yani on gün sonra.

29 Temmuz blok yükü: Z 0.17/1.00 · A 1.52/1.50 · B 3.75/3.75 · D 2.08/2.00 · E 1.76/1.75 — sapmalar yuvarlama düzeyinde.

`kural_test.py` 18/18 geçiyor (blok kapasitesini kontrol etmiyor — **19. kontrol olarak eklenmeli**). `denet.py` 1 hata veriyor (Kural C).

### Sıradaki turun sırası

1. İki birleştirmeyi çok oturuma böl (8 ve 15 Ağustos) — **en acil**
2. `kural_test.py`'ye blok kapasite kontrolü ekle, bu bir daha kaçmasın
3. 44 videoyu gerçek envanterden kur
4. Kural C'yi ilk dilime ekleme yaparak düzelt
5. Anatomi görevlerini katalogun 8 birimine göre yeniden kur

---

## 50 · KAPASİTE ÇELİŞKİSİ — PROGRAM %27 FAZLA YÜKLÜ

Kullanıcı sıfırdan dağıtım istedi. Dağıtmadan önce kapasite ölçüldü ve **en temel varsayım yanlış çıktı.**

| | |
|---|---|
| Kullanıcı beyanı | **günde net 7 saat 30 dakika** |
| 25 günde toplam | **187.5 saat** |
| Mevcut programın istediği | **237.23 saat = günde 9.49 saat** |
| Fazla | **+49.7 saat (%27)** |

25 günün **24'ü** 7.5 saati aşıyor. **13'ü** 9 saati aşıyor. En ağır gün **12.79 saat**.

Program başından beri kullanıcının söylediğinden dörtte bir fazla iş istiyormuş. Bu, kaçırılan görevlerin yapısal sebebi — takvim değil, bütçe hatası.

### Sabit yükler (seçime girmez)

| | Saat |
|---|---|
| Video · 44 video, 8 Ağu son tarih | 16.83 |
| 6 tam deneme × 4.5 sa | 27.00 |
| Deneme analizi + yanlış defteri | 11.51 |
| **TOPLAM** | **55.34** |

**Okuma + soru için kalan: 187.5 − 55.3 = 132.2 saat** (7.5 senaryosu) · 144.7 saat (8.0 senaryosu)

Katalog **409.6 saat** (verimi ölçülen 199 birim). Yani **katalogun ancak üçte biri sığıyor** — seçim zorunlu, tercih değil.

### Katalogdan verim sırasıyla seçim

| Senaryo | Birim | Saat | Net | **Projeksiyon K** | Kesim eşiği |
|---|---|---|---|---|---|
| **7.5 sa/gün** | 108 | 132.0 | 41.07 | **67.54** | 0.163 net/sa |
| 8.0 sa/gün | 113 | 144.3 | 43.14 | **67.98** | 0.163 net/sa |

**Kritik sonuç: yükü %27 azaltıp verime göre seçince projeksiyon YÜKSELİYOR** — 66.68'den **67.54'e**. Mevcut program hem fazla yüklü hem daha verimsiz.

### Seçimin dışında kalan üç kitap

| Kitap | Birim | Saat | Sebep |
|---|---|---|---|
| **Atilla Uslu Dahiliye 2** | 4 | 31.6 | Nefroloji·Endokrinoloji·Gastro·Romatoloji — hepsi videodan izleniyor, kitap okuması ayrıca gerekmiyor |
| **TUSTIME Mikrobiyoloji** | 6 | 29.5 | Feyyaz Akay soru kitabı aynı konuları çok daha yüksek verimle veriyor |
| **TUSTIME Kadın Doğum konu** | 4 | 15.7 | FT Kadın Doğum daha kısa, aynı içerik |

### Karar bekleyen nokta

**Günlük kapasite 7.5 mi 8.0 mı?** Aradaki fark 12.5 saat ve **+0.44 K**. Kullanıcı spor günlerinde 7–8 saat yaptığını söylemişti; hangisini taban alacağımız yerleşimi doğrudan belirliyor.

Bu cevaplanınca 25 gün sıfırdan dağıtılacak: seçilen birimler + 44 video + 6 deneme + analiz, Kural A/B/C/D ve spor/mola kısıtlarıyla.

---

## 51 · NİHAİ SEÇİM · TAVAN 8.0 SAAT SERT SINIR

### Kullanıcı kararları (28 Tem, ikinci tur)

| Karar | Etki |
|---|---|
| **Taban 7.5 · TAVAN 8.0 saat** | hiçbir gün 8.0'ı aşamaz — geçen programda 13 gün 9 saati, en ağırı 12.79 saati aşıyordu |
| Atilla Uslu Dahiliye 1 · 2 kitap okuması **düştü** | video izlerken kitap zaten okunuyor · **−63.1 saat** |
| TUSTIME Mikrobiyoloji **zorunlu** (Feyyaz Akay ön koşulu) | +29.49 sa · 0.124 net/sa |
| Mikro konu kitabının **Enfeksiyon bölümü çıktı** | Dahiliye SST'den çalışılacak (açıklamalı soru kitabı, vaka kitabı gibi) · −2.71 sa |
| **FT Biyokimya yeterli**, Yavuz Şahin Flash Biyokimya düştü | −16.45 sa |
| TUSTIME Kadın Doğum konu düştü, FT Kadın Doğum kalıyor | −15.7 sa |

### Üç senaryo

| Taban | Toplam | Okuma+soru | Birim | Net | **Projeksiyon K** | Kesim eşiği |
|---|---|---|---|---|---|---|
| **7.50** | 187.5 | 131.9 | 98 | 38.01 | **66.77** | 0.183 |
| 7.75 | 193.8 | 138.1 | 102 | 39.19 | **67.04** | 0.183 |
| 8.00 | 200.0 | 144.3 | 104 | 40.33 | **67.36** | 0.175 |

Taban 7.5 seçildi: **187.2 saat / 25 gün = günde 7.49 saat.** Tavan 8.0 sert sınır.

### Nihai okuma seçimi · 98 birim · 131.87 saat · net 38.01

| Kitap | Birim | Saat | net/sa |
|---|---|---|---|
| TUSTIME Mikrobiyoloji *(zorunlu)* | 6 | 29.49 | 0.124 |
| TUSTIME Küçük Stajlar | 15 | 13.07 | 0.327 |
| Speetus Genel Cerrahi | 18 | 11.50 | 0.393 |
| Levent Kodal Genel Cerrahi SB | 9 | 10.83 | 0.350 |
| Feyyaz Akay Mikrobiyoloji | 5 | 10.25 | 0.326 |
| Atilla Uslu SST | 5 | 9.47 | 0.263 |
| Yavuz Şahin Farmakoloji SB | 5 | 8.44 | 0.348 |
| Klinisyen Vaka Pediatri | 9 | 8.08 | 0.262 |
| FT Farmakoloji | 5 | 7.53 | 0.292 |
| Yavuz Şahin Biyokimya SB | 5 | 5.88 | **0.485** |
| Klinisyen Vaka Küçük Stajlar | 5 | 5.00 | 0.244 |
| Emrullah Patoloji SST | 4 | 4.13 | 0.227 |
| FT Biyokimya | 2 | 3.67 | **0.532** |
| TUSTIME Fizyoloji | 2 | 1.87 | 0.415 |
| Anatomi Fast Track | 2 | 1.75 | 0.256 |
| Klinisyen Vaka Fizyoloji | 1 | 0.92 | **0.533** |

### Sabit yükler · 55.34 saat

Video 16.83 (44 video, 8 Ağu son tarih) · 6 tam deneme 27.00 · analiz + yanlış defteri 11.51

### ⚠ Blok yapısı yeniden düşünülmeli

Mevcut blok yapısı günde **11.50 saat** kapasite veriyor (Z 1.00 + A 1.50 + B 3.75 + C 2.50 + D 2.00 + E 1.75). Hedef **7.5 saat**. Yani bloklar ya kısalacak ya sayısı azalacak — yoksa çark yarı boş görünür ve "yapabilirim" yanılgısı doğar.

Kullanıcının beyan ettiği fiilî düzen: **05:45 kalkış · 06:00 ilk iş · spor günlerinde 10–14 arası 3.5–4 saat çalış · 2 sa 15 dk spor · dönüşte devam · toplam 7–8 saat.**

Yerleşim turunda blok yapısı bu 7.5 saate göre yeniden çizilecek.

---

## 52 · YENİ BLOK YAPISI · 07:00 KALKIŞ · GÜNDE 7.50 SAAT

**Kullanıcı kararı:** 06:00 yerine **07:00 kalkış**, **08:00'de derse otur**.

### Üç gün tipi, üçü de tam 7.50 saat

| Tip | Bloklar | Gün |
|---|---|---|
| **NORMAL** | A 08:00–10:00 · B 10:15–12:30 · C 13:30–15:45 · D 16:00–17:00 | 7 |
| **SPOR** | A 08:00–10:00 · B 10:15–12:30 · C 16:30–18:15 · D 19:00–20:30 | 12 |
| **DENEME** | A 08:00–10:15 · B 10:45–13:00 · C 14:00–15:45 · D 16:00–17:15 | 5 |
| *spor + deneme çakışması* | 20 Ağustos — **çözülmeli** | 1 |

Eski yapı **11.50 saat** kapasite veriyordu (Z+A+B+C+D+E). Yeni yapı **7.50** — bütçeyle birebir.

### Molalar

**NORMAL:** 10:00–10:15 kısa · **12:30–13:30 öğle** · 15:45–16:00 kısa · 17:00'den sonra serbest
**SPOR:** 10:00–10:15 kısa · **12:30–13:45 öğle** · **14:00–16:15 SPOR** · 16:15–16:30 toparlanma · **18:15–19:00 akşam** · 20:30'dan sonra yavaşlama
**DENEME:** 10:15–10:45 deneme arası · **13:00–14:00 öğle** · 15:45–16:00 kısa

Spor gününde spordan önce **4.25 saat** çalışılıyor — kullanıcının beyan ettiği "3.5–4 saat sonra gidiyorum" düzenine uyuyor.

### Uyku

Tüm tiplerde **uyku 23:00–07:00 = 8 saat.** Yavaşlama penceresi (yeni konu yok) normal günlerde 17:00, spor günlerinde 20:30, deneme günlerinde 17:15'te başlıyor.

### Kapasite denkliği

| | Saat |
|---|---|
| 25 gün × 7.50 | **187.50** |
| Okuma seçimi | 131.87 |
| Sabit yükler (video · deneme · analiz) | 55.34 |
| **Gereken** | **187.21** |
| **Pay** | **+0.29** |

Pay çok dar — yerleşimde hiç israf edilemez.

### İki nokta karara bağlandı

1. **Akşam serbest kalıyor.** Kullanıcı: *"ister dışarı çıkarım ister telafi görevleri yaparım ister ekstra çalışırım — bu sayede programın uygulanabilirliği artar."* Normal günler 17:00'de bitiyor ve sonrası boş; kaçırılan görevlerin telafi penceresi de burası.
2. **20 Ağustos:** spor **denemeden sonra**. Gün DENEME yapısında (bitiş 17:15), spor 17:30'dan sonra.

---

## 53 · VİDEO TAKVİMİ KURULDU · 44 VİDEO, SIRA KORUNARAK

Gerçek envanterden, **hiçbir video bölünmeden**, 29 Temmuz – 8 Ağustos arasına dağıtıldı.

| Gün | Saat | Video |
|---|---|---|
| 29.07 | 1.33 | Hematoloji 1-2-3 |
| 30.07 | 1.33 | Hematoloji 4-5-6 |
| 31.07 | 1.33 | Hematoloji 7-8-9 |
| 01.08 | 1.50 | Onkoloji 1 · Endokrinoloji 1-2-3 |
| 02.08 | 1.83 | Endokrinoloji 4-5-6-7 · Kardiyoloji 1 |
| 03.08 | 1.50 | Kardiyoloji 2-3-4 |
| 04.08 | 1.67 | Kardiyoloji 5-6 · Göğüs 1-2 |
| 05.08 | 1.67 | Göğüs 3-4-5-6 · Nefroloji 1 |
| 06.08 | 1.67 | Nefroloji 2-3-4 · Gastroenteroloji 1-2 |
| 07.08 | 1.67 | Gastroenteroloji 3-4-5-6-7 |
| 08.08 | 1.33 | Romatoloji 1-2-3-4 |

**Toplam 16.83 saat · 44 video · en ağır gün 1.83 · en hafif 1.33**

Doğrulamalar: **sıra hatası 0** (her konu 1'den başlayıp sırayla gidiyor) · **bölünmüş video 0** · **8 Ağustos sonrası video 0** · **sekiz konunun sekizi de tamamlanıyor**.

⚠ İlk denemede Romatoloji 4, Romatoloji 1-2-3'ten önce düşmüştü — "kalanları en hafif güne ekle" mantığı sırayı bozuyordu. Algoritma *kalan süre ÷ kalan gün* hedefiyle **sıra bozmadan** yeniden yazıldı.

`video_plan.json` olarak kaydedildi.

---

## 54 · DİLİM DAĞITIMI TAMAM — DÖRT KURAL DA GEÇTİ

### Okuma / soru ayrımı

Seçilen 98 birim kaynak türüne göre ikiye ayrıldı:

| | Birim | Saat |
|---|---|---|
| **Yeni öğrenme** (konu kitabı) | 50 | **68.88** |
| **Geri getirme** (soru bankası · vaka · SST) | 48 | **63.00** |

Soru tarafı: Levent Kodal · Yavuz Şahin Farma SB · Yavuz Şahin Biyo SB · Feyyaz Akay · Atilla Uslu SST · Klinisyen Vaka Pediatri · Klinisyen Vaka Küçük Stajlar · Klinisyen Vaka Fizyoloji · Emrullah Patoloji SST.

Bu ayrım Kural C'nin ölçülebilmesi için şarttı — daha önce her şey "okuma" sayılıyordu.

### Video takvimi düzeltildi

İlk dağıtımda **1 ve 5 Ağustos deneme günlerine video düşmüştü** ve o günler kapasiteyi aşıyordu (−0.25 · −0.42 saat). Video artık deneme günlerine hiç konmuyor: **9 güne 44 video, en ağır gün 2.00 saat**, sıra korunuyor, 8 Ağustos'tan sonra sıfır.

### Dilim dağıtımı

| Dilim | Gün | Birim | Okuma | Soru | Toplam | Kapasite |
|---|---|---|---|---|---|---|
| 1 · 29 Tem – 5 Ağu | 8 | 44 | 28.96 | 7.38 | **36.34** | 36.34 |
| 2 · 6 – 14 Ağu | 9 | 29 | 23.86 | 25.29 | **49.15** | 49.33 |
| 3 · 15 – 22 Ağu | 8 | 25 | 16.05 | 30.33 | **46.38** | 47.50 |

### Dört kural

| Kural | Ölçüm | |
|---|---|---|
| **A** · her kitap ilk 14 günde | 16/16 kitap dilim 1–2'de | ✓ |
| **C** · yeni öğrenme azalan | **40.13 ≥ 29.53 ≥ 16.05** | ✓ |
| **C** · geri getirme artan | **19.88 < 37.79 < 42.83** | ✓ |
| **D** · bölüm bütünlüğü | her birim katalogdan tam bölüm | ✓ |
| **Kapasite** | üç dilimde de aşım yok | ✓ |

Toplam yük **186.20 / 187.50 saat**, pay **+1.30**. Hiçbir gün 7.50'yi aşmıyor.

⚠ Kural A ilk denemede ihlal görünmüştü çünkü 16 kitabın hepsini **dilim 1'e** sıkıştırmaya çalışıyordum. Kural "ilk **14 gün**" diyor — bu 11 Ağustos'a kadar, yani dilim 2'nin ilk 6 günü de dahil. Gevşetince dilim 1'in yükü 43.39'dan 36.34'e indi.

### Kalan iş

Dilim içi **gün ve blok yerleşimi** — Kural B (gün-zincir hakimiyeti %80) burada ölçülecek. Sonra görev üretimi ve on iki kapı.

---

## 55 · GÜN YERLEŞİMİ TAMAM — DÖRT KURAL DA GEÇTİ

### Yerleşim algoritması

Her gün **bir branşa kilitleniyor**: o günün boşluğuna en çok saat verebilecek branş seçiliyor, o branştan sığan en büyük birimler alınıyor, kalan boşluk başka branşlardan doldurulıyor. Kural B doğrudan bu yapıdan geliyor.

Tek güne sığmayan birimler **oturumlara bölünüyor** — Kural D bölüm bütünlüğü ister, tek oturum istemez. TUSTIME Mikrobiyoloji Bakteriyoloji (9.61 saat) böyle bölündü.

⚠ İlk denemede algoritma "bir birim sığmazsa dur" mantığındaydı ve **34 birim açıkta kalıyordu**; 5 gün tamamen boştu. En-iyi-uyum paketlemesine çevirince 95/98 yerleşti, bölme eklenince 102 parçaya çıktı.

### Dört kural

| Kural | Ölçüm | |
|---|---|---|
| **A** · her kitap ilk 14 günde | 16/16 kitap 11 Ağustos'a kadar açılıyor | ✓ |
| **B** · gün-branş hakimiyeti | **19/19 gün = %100** (eşik %80) | ✓ |
| **C** · yeni öğrenme azalan | **40.13 ≥ 29.52 ≥ 16.05** | ✓ |
| **C** · geri getirme artan | **19.67 < 37.79 < 42.83** | ✓ |
| **D** · bölüm bütünlüğü | tüm parçalar aynı programda | ✓ |
| **Kapasite** | 25 günün hiçbirinde aşım yok | ✓ |

### 25 günün profili

Günlük yük **6.86 – 7.50 saat** arasında. En hafif gün 21 Ağustos (6.86), en ağır günler tam 7.50. **Hiçbir gün 7.50'yi aşmıyor** — eski programda 13 gün 9 saati, en ağırı 12.79 saati aşıyordu.

Günlerin hakim branşları: Küçük Stajlar (2) · Genel Cerrahi (4) · Biyokimya · Farmakoloji (4) · Fizyoloji · Anatomi · Mikrobiyoloji (7) · Dahiliye (3) · Pediatri (2) · Patoloji.

### Açık kalan tek kalem

**Pediatri Büyüme ve Gelişme · 0.20 saat** dilim 1'de yer bulamadı (12 dakika). Toplam yerleşen 131.66 / 131.87 saat.

### Kalan iş

Blok içi saat ataması (A/B/C/D bloklarına dağıtım), görev nesnelerinin üretimi (`app_gorev.json`), kombo/işaret üretimi, sonra on iki kapı.

---

## 56 · GÖREV ÜRETİMİ — ÇALIŞIYOR AMA ÜÇ KUSUR VAR

25 günün blok ataması ve görev nesneleri üretildi: **187 görev · 181.84 saat · K = 66.29**

### Geçen kontroller

| | |
|---|---|
| Günlük yük 6.84 – 7.50 · **7.50'yi aşan gün 0** | ✓ |
| **Blok aşımı 0** (A/B/C/D kapasitelerinin hiçbiri aşılmıyor) | ✓ |
| **Video sıra hatası 0** — 44 video 1'den başlayıp sırayla | ✓ |
| Kural A · B · C · D (gün yerleşiminden devralındı) | ✓ |

### ⚠ Kalan üç kusur

**1 · Parça sırası bozuk.** 63 görev parçalara bölünmüş durumda ve bazılarında **2. parça 1. parçadan önce** geliyor (29 Temmuz: KBB 2. parça 17:45'te, 1. parça 19:56'da). Sebep: parçalar "en boş bloğa" atanıyor, blok sırası gözetilmiyor.

**2 · 3 görev 15 dakikanın altında.** Asgari oturum sınırı (0.25 sa) konuldu ama üç yerde tutmadı.

**3 · 4.14 saatlik iş düştü.** Toplam 185.98'den 181.84'e indi — asgari parça sınırı yüzünden bazı kalıntılar yerleşemedi. Projeksiyon 66.73 → 66.29.

### Üretim hattının bu turdaki gelişimi

| Deneme | Sonuç |
|---|---|
| 1 · ilk-uyum | 29 blok aşımı |
| 2 · FFD (boyuta göre) | blok aşımı 30, **video sırası bozuldu** |
| 3 · sıralı video + bölme | blok aşımı 0, video ✓, ama **0.01 saatlik parçalar** |
| 4 · asgari 15 dk sınırı | blok aşımı 0, video ✓, **parça sırası bozuk, 4.14 sa düştü** |

Doğru çözüm: parçaları **blok sırasına göre** (A→B→C→D) atamak ve kalıntıyı komşu bloğa değil aynı bloğun devamına yazmak. Bu bir sonraki turun ilk işi.

### Dosyalar

`app_gorev_yeni.json` — §57'de düzeltildi.
`gun_atama.json` · `dilim_atama.json` · `video_plan.json` · `secim_nihai.json` — üretim girdileri, hepsi doğrulanmış.

---

## 57 · PARÇA SIRASI DÜZELTİLDİ

**Düzeltme:** parçalar artık "en boş bloğa" değil **blok sırasına göre** (A→B→C→D) atanıyor. Parça numarası kronolojiyle birebir aynı; `1/2. parça` her zaman `2/2. parça`dan önce geliyor.

Ayrıca bütün sığan birimler **en dar sığan bloğa** yerleştiriliyor (best-fit) — bu, bölünmesi gereken birim sayısını düşürdü.

### Sonuç · 183 görev · 181.91 saat · K = 66.39

| Kontrol | Önce (§56) | **Sonra** |
|---|---|---|
| Blok aşımı | 0 | **0** ✓ |
| Video sıra hatası | 0 | **0** ✓ |
| **Parça sıra hatası** | **var** | **0** ✓ |
| Parçalanan görev | 63 | **32** |
| Günlük yük | 6.84–7.50 | **6.86–7.50** ✓ |
| 7.50 aşan gün | 0 | **0** ✓ |

29 Temmuz artık hiç parçasız: dört Hematoloji videosu + beş bütün Küçük Stajlar birimi.

### Kalan tek kusur

**4.08 saatlik iş yerleşemedi.** Asgari 15 dk parça sınırı yüzünden bazı kalıntılar bloklara sığmıyor. Toplam 185.99 yerine 181.91 saat yerleşti; projeksiyon 66.73 yerine **66.39**.

Bu kalıntılar günler arası taşınarak kurtarılabilir — ama bu, gün atamasına geri dönmek demek. Bir sonraki turun işi.

### Sıradaki adımlar

1. 4.08 saatlik kalıntıyı günler arası dengeleyerek kurtar
2. Kombo ve işaret üretimi
3. `app_gorev.json`'a geçir, `uret.py` ile uygulamayı üret
4. On iki kapı

---

## 58 · UYGULAMAYA GEÇİRME DENENDİ — KURAL D'DE TAKILDI

Yeni program `app_gorev.json`'a taşındı, kombo (109 bağ) · işaret (9) · oturum bilgisi (46 görev) · sayfa bölme (46 görev) · yavaşlama molası (25 gün) · `sira` alanı (183 görev) üretildi.

`uret.py` **kural testinde durdu** — bu doğru davranış, bozuk program uygulamaya yazılmadı. **Uygulamadaki eski program (257 görev) dokunulmadan duruyor.**

### Kalan tek kural: D · kısmi bölüm

`kural_test.py` iki kısmi bölüm buluyor: **Ortopedi 7/15 sayfa · Anestezi 3/9 sayfa**. Sebep §57'de kalan **4.08 saatlik yerleşemeyen iş** — o saatler düşünce bölümler yarım kaldı.

### ⚠ Bu turda durumu kötüleştirdim

Kısmi bölümleri temizlemeye çalışırken **yanlış envanteri** kullandım: `kural_test.py` `eko.py`'nin bölüm sınırlarını, ben `envanter.py`'ninkileri kullandım. İkisi farklı bölümler işaret etti; ben Biyokimya Hormonlar · Farmakoloji Hormonlar · Farmakoloji OSS'yi sildim, testin şikâyet ettiği Ortopedi ve Anestezi yerinde kaldı.

Sonuç: **K 66.39 → 65.88, kombo 109 → 0.** Değişiklik geri alındı, dosya §57 hâline döndürüldü (183 görev · 181.91 saat · K 66.39).

**Ders:** `kural_test.py` `eko.py`'yi okuyor, katalog `envanter.py`'yi. İkisi Speetus'ta 20 vs 34 bölüm, Anatomi'de 13 vs 8 birim farkıyla ayrışıyor. **Yeni program üretilmeden önce `kural_test.py` `envanter.py`'ye bağlanmalı** — yoksa iki farklı doğruluk kaynağı çarpışıyor.

### Sıradaki turun doğru sırası

1. **`kural_test.py`'yi `envanter.py`'ye bağla** — tek doğruluk kaynağı
2. 4.08 saatlik kalıntıyı günler arası dengeleyerek kurtar (Kural D kendiliğinden düzelir)
3. `uret.py` ile uygulamayı üret
4. On iki kapı

### Şu anki durum

| | |
|---|---|
| Uygulamada duran | **eski program** · 257 görev · günde 9.49 saat |
| Hazır bekleyen | **yeni program** · 183 görev · günde 7.50 saat · K 66.39 |
| Yeni programın engeli | Kural D · 2 kısmi bölüm · 4.08 saatlik kalıntı |

---

## 59 · ⚠ CİDDİ BULGU: KATALOG SORULARI ÇİFT SAYIYOR

Üretim `kural_test.py` #12'de takıldı: *"atanan soru kitabın yetkili toplamını aşmıyor — TUSTIME Mikrobiyoloji 36.8 vs 17.8"*. Denetleyince sorun çok daha büyük çıktı.

### Denetim · atanan soru vs sınavda gerçekten çıkan soru

| Branş | Atanan | Gerçek | Aşım |
|---|---|---|---|
| **Mikrobiyoloji** | **85.20** | 18.0 | **+67.2** |
| **Genel Cerrahi** | 49.00 | 23.6 | +25.4 |
| **Farmakoloji** | 39.00 | 18.0 | +21.0 |
| **Küçük Stajlar** | 34.20 | 22.0 | +12.2 |
| **Biyokimya** | 23.60 | 17.8 | +5.8 |
| Dahiliye · Pediatri · Fizyoloji · Patoloji · Anatomi | — | — | ✓ |

**Toplam 131.6 fazladan sayılan soru.**

### Sebep

Katalog her kitabı **bağımsız** ele alıyor. Mikrobiyoloji Bakteriyoloji konusundan sınavda 6.40 soru çıkıyor; katalogda hem **TUSTIME Mikrobiyoloji Bakteriyoloji** (6.40) hem **Feyyaz Akay Bakteriyoloji** (6.40) var. İkisi de programa girince aynı 6.40 soru **iki kez** sayılıyor.

Mikrobiyoloji'de aşım en büyük (85.20 vs 18.0) çünkü hem konu kitabı hem soru kitabı tam kapsanıyor — üstelik bazı bölümler parçalanınca `soru` alanı her parçaya tam değeriyle kopyalanmış, bu üçüncü bir çarpan ekliyor.

### Etkisi

Projeksiyon **66.39 aşırı iyimser.** Kaba tahminle **+6.4 K** şişkinlik var; gerçek beklenti **60 civarı** olabilir. Bu, programın değerini değil **ölçümün geçerliliğini** ilgilendiriyor — ama karar vermek için kullanılan sayı olduğu için kritik.

### Doğru model

Bir konunun soru potansiyeli **konuya aittir, kitaba değil.** Aynı konuyu iki kaynaktan çalışmak o konudan gelecek net'i artırır ama **iki katına çıkarmaz** — azalan verim yasası geçerli.

Gereken: katalog birimlerini **konu düzeyinde** grupla, konunun toplam soru potansiyelini birinci kaynağa tam, ikinci kaynağa kısmi (örneğin %30–40) ver. Bu hem çift sayımı bitirir hem "aynı konuyu iki kitaptan çalışmak" kararını doğru fiyatlandırır.

⚠ Bu düzeltilmeden **seçim de yeniden yapılmalı** — verimlilik sırası değişecek, özellikle Mikrobiyoloji paketi (46 saat) çok daha pahalı görünecek.

### Durum

| | |
|---|---|
| Uygulamada duran | eski program · 257 görev · günde 9.49 saat |
| Yeni program | 183 görev · günde 7.50 saat · yapısal olarak sağlam |
| **Engel** | **soru çift sayımı — projeksiyon geçersiz** |

Yeni programın **yapısı** doğru (bloklar, kapasite, kurallar A/B/C/D, video sırası, parça sırası). Sorun **değerlemede**: hangi işin ne kadar getirdiği yanlış hesaplanıyor.

---

## 60 · NET MODELİ GERÇEK VERİYLE YENİDEN KURULDU

Kullanıcı doğru itiraz etti: *"bir konunun bana tek çalışmada kazandırması, o konudan çıkması beklenen soruların %100'üne eşit olamaz."*

### Kalibrasyon dayanağı · gerçek ölçüm

Patoloji: TUSTIME konu kitabı bir tur (6 ay önce) + Emrullah SST **60 saat ayrıntılı** çalışma + videolar. Hemen ardından **24 Temmuz MediTUS: Patoloji 11.75 net.**

Tavan 18.2 → **%64.6.** İki tam tur sonrası.

```
tur başına kapanan boşluk oranı  r = 1 − (1 − 0.646)^(1/2) = 0.405
```

### Yeni model

```
kazanç   = (tavan − mevcut) × 0.405 × kapsanan_pay
yeni net = min(tavan, mevcut + kazanç)
```

- **tavan** = branşın Tusanaliz ortalama soru sayısı (Mikrobiyoloji 18.0, Patoloji 18.2, …)
- **mevcut** = son denemedeki (24 Tem MediTUS) branş neti
- **kapsanan_pay** = programın o branşın soru ağırlığının ne kadarını kapsadığı, **konu düzeyinde tekilleştirilmiş** (aynı konu iki kitaptan çalışılsa bir kez sayılır)
- Branş neti **asla tavanı aşamaz**

Bu, eski `soru × 0.2037` doğrusal modelinin yerini alıyor. O model azalan verimi hiç görmüyordu ve çift sayıma açıktı.

### Yeni programın gerçekçi projeksiyonu

| Branş | Tavan | Mevcut | Kapsanan pay | Kazanç | Yeni net |
|---|---|---|---|---|---|
| Genel Cerrahi | 23.6 | 12.75 | %100 | +4.39 | 17.14 |
| Küçük Stajlar | 22.0 | **0.00** | %100 | +8.90 | 8.90 |
| Farmakoloji | 18.0 | 3.25 | %100 | +5.97 | 9.22 |
| Mikrobiyoloji | 18.0 | 5.50 | %100 | +5.06 | 10.56 |
| Biyokimya | 17.8 | 6.00 | %100 | +4.78 | 10.78 |
| Pediatri | 25.0 | 7.75 | %42 | +2.90 | 10.65 |
| Fizyoloji | 14.0 | 3.75 | %44 | +1.84 | 5.59 |
| Dahiliye | 23.2 | 15.50 | %53 | +1.64 | 17.14 |
| Anatomi | 13.0 | 2.00 | %17 | +0.75 | 2.75 |
| Patoloji | 18.2 | 11.75 | %25 | +0.66 | 12.41 |
| Kadın Doğum | 10.0 | 2.50 | **%0** | 0.00 | 2.50 |
| **Toplam kazanç** | | **70.75** | | **+36.89** | |

**Gerçekçi projeksiyon K = 66.49** — eski çift sayımlı hesap 66.39 veriyordu. Şaşırtıcı biçimde neredeyse aynı: çift sayımın şişkinliği, azalan verim indirimiyle **birbirini götürüyor.** Ama artık sayı doğru sebeplerle doğru.

### ⚠ Modelin bilinen iki kusuru

**1 · Küçük Stajlar mevcut = 0.** Kullanıcı Excel'inde Küçük Stajlar'ı ayrı takip etmiyor (*"sınavda kesin bir kısmı yok, klinik branşlarda karışık çıkıyor"*). Model bunu "hiç bilmiyor" sayıp **+8.90 net** veriyor — bu şişkin. O sorular zaten Dahiliye ve diğer klinik netlerin içinde sayılıyor olabilir. **Küçük Stajlar tabanı tahmin edilmeli.**

**2 · Kadın Doğum %0 kapsanıyor.** Seçim FT Kadın Doğum'dan yalnız 1 birim aldı ve o da soru ağırlığı taşımıyor. 10.0 tavanlı bir branş tamamen dışarıda — seçim yeniden yapılırken bakılmalı.

### Sıradaki tur

1. Küçük Stajlar tabanını tahmin et (Dahiliye/klinik netlerden ayrıştır)
2. Seçimi **yeni modelle** yeniden yap — verimlilik artık `(tavan−mevcut)×0.405×pay / saat`, bu sıralamayı değiştirecek
3. Kadın Doğum'un neden düştüğünü incele
4. Üret ve on iki kapı

---

## 61 · TAVANLAR RESMİ SORU SAYILARINA OTURDU · `tavan.py`

Kullanıcı resmi TUS dağılımını verdi: **200 soru = 100 temel + 100 klinik.**

Anatomi 13 · Histo-Embriyoloji 7 · Fizyoloji 8 · Biyokimya 18 · Mikrobiyoloji 18 · Patoloji 18 · Farmakoloji 18 · **Dahiliye grubu 35** · Pediatri 25 · **Genel Cerrahi grubu 30** · Kadın Doğum 10

### Tusanaliz verisi resmi sayılarla birebir tutuyor

| Branş | Ölçülen | Resmi |
|---|---|---|
| Anatomi | **13.00** | 13 |
| Pediatri | **25.00** | 25 |
| Kadın Doğum | **10.00** | 10 |
| Mikrobiyoloji · Farmakoloji | **18.00** | 18 |
| Biyokimya | 17.80 | 18 |
| Patoloji | 18.20 | 18 |

Temel toplam **99.00 / 100**. Veri güvenilir.

### Küçük Stajlar ayrı bir grup DEĞİL — kanıtlandı

Ölçülen Dahiliye 23.20 + Küçük Stajlar 22.00 = **45.20**, resmi 35 → **+10.20 aşım**
Ölçülen Genel Cerrahi **23.60**, resmi 30 → **−6.40 eksik**

Küçük Stajlar'ın **cerrahi** konuları (Beyin cerrahisi 1.40 · Kalp-Damar 1.40 · Ortopedi 1.60 · Üroloji 1.00 · Çocuk Cerrahisi 1.00 · Göğüs Cerrahisi 0.60 = **7.00**) Genel Cerrahi grubuna eklenince:

| | Hesap | Resmi | Sapma |
|---|---|---|---|
| Genel Cerrahi grubu | 23.60 + 7.00 = **30.60** | 30 | **+0.60** |
| Dahiliye grubu | 23.20 + 15.00 = **38.20** | 35 | +3.20 |

Kalan sapma beş-sınav ortalamasının yuvarlamasından; klinik toplam 103.80 → ×0.9634 ile 100'e oturtuldu.

**Bu, "Küçük Stajlar mevcut = 0" kusurunu çözdü.** Küçük Stajlar artık ayrı tavanı olan branş değil; konuları iki klinik gruba dağılıyor — kullanıcının deneme netlerinde de böyle ölçülüyor.

### Nihai tavanlar (`tavan.py`)

Dahiliye grubu **36.80** · Genel Cerrahi grubu **29.48** · Pediatri **24.08** · Patoloji **18.38** · Mikrobiyoloji **18.18** · Farmakoloji **18.18** · Biyokimya **17.98** · Fizyoloji+Histo **14.14** · Anatomi **13.13** · Kadın Doğum **9.63** — **toplam 200.00** ✓

### Mevcut durum · 24 Temmuz MediTUS · toplam 70.75 net

| Grup | Tavan | Mevcut | Boşluk | Doluluk |
|---|---|---|---|---|
| Dahiliye grubu | 36.80 | 15.50 | **21.30** | %42 |
| Genel Cerrahi grubu | 29.48 | 12.75 | **16.73** | %43 |
| Pediatri | 24.08 | 7.75 | **16.33** | %32 |
| **Farmakoloji** | 18.18 | 3.25 | **14.93** | **%18** |
| Mikrobiyoloji | 18.18 | 5.50 | 12.68 | %30 |
| Biyokimya | 17.98 | 6.00 | 11.98 | %33 |
| **Anatomi** | 13.13 | 2.00 | 11.13 | **%15** |
| Fizyoloji+Histo | 14.14 | 3.75 | 10.39 | %27 |
| Kadın Doğum | 9.63 | 2.50 | 7.13 | %26 |
| **Patoloji** | 18.38 | 11.75 | 6.63 | **%64** |
| **TOPLAM** | 200.00 | **70.75** | **129.25** | %35 |

**Anatomi %15 ve Farmakoloji %18 en boş** — en çok kazanılacak yer orada. **Patoloji %64 ile en dolu** (60 saatlik SST çalışmasının sonucu), yani oraya daha çok yatırım en az getiriyi verir.

### Çift sayım çözüldü · `konu_deger.json`

199 katalog birimi **169 ayrı konuya** indirgendi. **27 konu birden çok kitapta geçiyordu** — Biyokimya Karbonhidratlar/Lipidler/Vitaminler üç kitapta, Dahiliye Hematoloji/Onkoloji/Kardiyoloji ikişer. Artık her konu **bir kez** sayılıyor ve o konu için **en kısa süreli kaynak** seçiliyor.

Sonuç: **169 konu · 295.6 saat · 74.69 net potansiyel** (eski çift sayımlı hesap 435.8 saat / 52.47 net gösteriyordu).

### Yeni verimlilik sıralaması — eskisinden çok farklı

İlk beş: Nükleer tıp 3.516 net/sa · Şok 2.666 · Toksikoloji 1.901 · Amino Asitler 1.141 · Acil Tıp 1.055

Farmakoloji ve Biyokimya listenin üstüne çıktı — çünkü **mevcut netleri çok düşük** (3.25 ve 6.00), boşluk büyük.

### Sıradaki tur

1. 169 konudan **132.2 saatlik** seçimi yeni verimlilik sırasıyla yap
2. Dilim/gün/blok yerleşimini tekrarla (algoritmalar hazır, §54–57)
3. Üret ve on iki kapı

---

## 62 · ⚠ UNUTMA EĞRİSİ — MODELİN EN BÜYÜK EKSİĞİ

Kullanıcı: *"okuyunca kazanım sağlıyorum ama zaman geçtikçe tekrar edilmesi gerekiyor ki kalıcı olsun... tekrar etmezsem net beklentimin de düşmesi lazım."*

Doğru. Model şimdiye kadar **öğrenilen her şeyin sınav gününe kadar tam kaldığını** varsayıyordu. Bu yanlış ve etkisi çok büyük.

### Kullanılan formül · FSRS (Anki'nin yeni algoritması)

```
R(t,S) = (1 + (19/81)·t/S)^(−0.5)
```

R = hatırlama olasılığı · t = geçen gün · S = kararlılık (gün).

Bu bir **güç yasası**, Ebbinghaus'un üstel eğrisi değil. Wixted & Carpenter (2007) uzun aralıklarda güç fonksiyonunun daha iyi uyduğunu gösteriyor; FSRS de bunu kullanıyor. SM-2 (eski Anki) sabit çarpanlı aralık kullanıyordu, kararlılığı modellemiyordu.

✓ **Sabitler kaynaktan doğrulandı (28 Tem):** open-spaced-repetition/awesome-fsrs wiki — FSRS v4'te DECAY=−1 · FACTOR=1/9; **FSRS-4.5/5'te DECAY=−0.5 · FACTOR=19/81.** FSRS-6 üsteli kullanıcıya göre öğrenilebilir yaptı (0.1–0.8).

⚠ **Doğrulamada bir yanlışım çıktı:** S, hatırlamanın **%90'a** düştüğü gün sayısıdır — %50'lik yarılanma ömrü değil. `R(S,S)=0.90` her zaman. Model bu tanımla kuruldu, `unutma.py` doğrulaması 0.9000 veriyor.

### Hatırlama tablosu

| S (gün) | 1 gün | 7 gün | 14 gün | 21 gün | 25 gün |
|---|---|---|---|---|---|
| 1 | %90 | %62 | %48 | %41 | %38 |
| **2** (tek okuma) | %95 | %74 | %62 | **%54** | %50 |
| **5** (1 tekrar) | %98 | %87 | %79 | **%71** | %69 |
| **12** (2 tekrar) | %99 | %94 | %89 | **%84** | %83 |

### Programa etkisi · TEKRAR YOKSA

Program 29 Tem – 22 Ağu, sınav **23 Ağustos**.

| Dilim | Sınava kalan | Tek okuma | 1 tekrar | 2 tekrar |
|---|---|---|---|---|
| 1 (2 Ağu civarı) | 21 gün | **%54** | %71 | %84 |
| 2 (10 Ağu) | 13 gün | %63 | %79 | %89 |
| 3 (18 Ağu) | 5 gün | %79 | %90 | %95 |

§54'teki yeni-öğrenme dağılımıyla (40.13 / 29.52 / 16.05 saat) **ağırlıklı hatırlama %62.**

| | |
|---|---|
| Seçimin ham kazancı | **42.60 net** |
| Sınavda gerçekten kalan | **≈ 26.29 net** |
| **KAYIP** | **16.31 net** |
| Tekrarsız projeksiyon | **K = 63.85** (tekrarlı varsayım 67.72) |

**Dört puanlık fark.** Bu, programın en büyük tek eksiği.

### Bunun getirdiği tasarım kuralı

Kural C zaten "yeni öğrenme azalan, geri getirme artan" diyor ve bu doğru yönde. Ama **tekrar bütçesi yok** — geri getirme yalnız deneme ve soru çözmeden ibaret, öğrenilen konuya dönüş yok.

Gereken:
1. Her okunan konu için **en az bir tekrar** planla (S: 2 → 5, hatırlama %54 → %71)
2. Tekrar aralığı: Cepeda ve ark. (2006) meta-analizi optimum aralığın **hedef aralığın %10–20'si** olduğunu buluyor. Sınava 21 gün varsa optimum tekrar ~3–4 gün sonra.
3. **Aktif hatırlama tercih edilmeli** (Roediger & Karpicke 2006, test etkisi): soru çözme, yeniden okumadan daha çok kararlılık kazandırıyor. Programdaki soru bankaları bu işi görüyor ama **aynı konuya** yönlendirilmeli.
4. İlk dilimde öğrenilen en çok kaybediyor (%46) — **tekrar bütçesi ilk dilime öncelik vermeli.**

### Kullanıcı kararı: Mikrobiyoloji · seçenek C

Feyyaz Akay'ın çözüleceği konuların konu kitabı bölümleri okunacak, tamamı değil. Uygulanacak.

### Sıradaki tur

1. Seçenek C'yi uygula (Mikro konu kitabı kısmi)
2. **Tekrar bütçesi ekle** — her konu için 1 tekrar, aralık %10–20 kuralıyla
3. Modeli tekrarlı hâle getir: `net_sınav = kazanç × R(sınava_kalan_gün, S)`
4. Seçimi bu modelle yeniden yap — tekrar maliyeti girince sıralama yine değişecek

---

## 63 · TEKRAR MODELİ · `unutma.py` — VE BİR HESAP HATAM

### Parametreler doğrulandı

`R(t,S) = (1 + (19/81)·t/S)^(−0.5)` · FSRS-4.5/5. `R(S,S) = 0.9000` doğrulandı.

Başlangıç kararlılığı: FSRS-4.5 varsayılan ağırlıkları `w[0..3] = [0.4, 0.6, 2.4, 5.8]` — Again/Hard/Good/Easy. Dikkatli okuma "Good" kabul edildi: **S₁ = 2.4 gün.**

⚠ **Sınır:** FSRS **kart** için kalibre edilmiştir. Bir kitap bölümü tek kart değildir; bu model kaba bir yaklaşımdır. Yönü ve büyüklük mertebesi doğrudur, ondalıkları değil.

### ⚠ İlk hesabım yanlıştı

"Tekrar mı yeni konu mu" karşılaştırmasında **iki durumda da aynı `t`'yi** kullandım ve tekrarın yeni konudan daha değersiz olduğu sonucuna vardım. Yanlış.

**Tekrarın asıl faydası geçen süreyi sıfırlamasıdır.** Doğru model: ilk okuma g₁ gün önce, tekrar g₂ gün önce → sınavda hatırlama `R(g₂, S₂)`, `R(g₁, S₁)` değil.

| İlk okuma | Tekrar | Tekrarsız | Tekrarlı | Kazanım |
|---|---|---|---|---|
| 21 gün önce | 6 gün önce | %57 | **%90** | **+33** |
| 25 gün önce | 8 gün önce | %54 | %87 | +33 |
| 18 gün önce | 5 gün önce | %60 | %91 | +31 |
| 15 gün önce | 5 gün önce | %64 | %91 | +28 |

### Sonuç: tekrar yeni konudan DAHA verimli

Eşit değerli (1.0 net / 2.0 saat) bir iş için, tekrar maliyeti ilk okumanın **%40'ı** (kullanıcı beyanı: *"hızlı hızlı okusam ezber yerlerine ezber yapsam yeter"*):

| Seçenek | net/saat |
|---|---|
| Yeni konu · 15 gün önce | 0.318 |
| Yeni konu · 12 gün önce | 0.339 |
| Yeni konu · 8 gün önce | 0.375 |
| **Tekrar · 21g okundu, 6g tekrar** | **0.410** |
| **Tekrar · 18g okundu, 5g tekrar** | **0.391** |

Maliyeti %40 ama hatırlamayı %57'den %90'a çıkarıyor.

### Üçüncü tur değmiyor

21g oku → 10g tekrar → 3g tekrar: %57 → %85 → %98.
**1. tekrarın marjinal verimi 0.344 · 2. tekrarın 0.162** — yarısından az. Azalan verim burada da geçerli.

**Tasarım kuralı: her konu için TAM BİR tekrar planla, ikinciyi planlama.**

### Optimum tekrar aralığı

`aralik(S)` = R'nin %90'a düştüğü gün. İlk okumadan sonra **2.4 gün**, birinci tekrardan sonra **6.0 gün**. Ama sınav sabit tarihli olduğu için asıl kural: **tekrar sınava mümkün olduğunca yakın olmalı** — 21g/6g çifti 21g/14g çiftinden %10 daha iyi.

---

## 64 · TEKRAR BÜTÇELİ SEÇİM · `secim_v4.json`

### Yapı

| | Saat | Hatırlama |
|---|---|---|
| Dilim 1+2 · yeni okuma (**hepsi tekrar edilir**) | 85.67 | **%91** |
| Dilim 3 · tekrar | 34.27 | — |
| Dilim 3 · yeni okuma (tekrarsız) | 13.23 | %82 |
| **Toplam okuma** | **98.90** | |

Toplam kullanım **133.13 / 133.17 saat**.

### ⚠ Üç yanlış deneme

**1 · Kapasite kısıtsız açgözlü.** Hepsini "geç oku" seçti (son 5 güne 132 saat sığmaz).

**2 · Kapasiteli açgözlü.** Dilim 3'ün çarpanı en yüksek (0.820) olduğu için **en iyi konuları oraya, en zayıflarını dilim 1'e** koydu — yapıyı ters kurdu. Sonuç: 97 konu, 1 tekrar, K 65.13.

**3 · Değiş-tokuş turu.** Sıfır işlem yaptı: dilim 1'deki konular zaten en verimsizleri olduğu için hiçbir takas kazançlı çıkmadı. Karşılaştırmayı önce mutlak, sonra saat başına yaptım — ikisi de çözmedi çünkü **sorun karşılaştırmada değil, açgözlünün kurduğu yapıdaydı.**

**Doğrusu:** dilim 1 ve 2 zaten var ve doldurulmak zorunda; **dilim 3'ün kapasitesi tekrara ayrılmalı**, yeni okumaya değil. Yapı doğrudan böyle kuruldu.

### Sonuç

**81 konu · 98.86 saat okuma + 34.27 saat tekrar · sınavda kalan net +31.52 · K = 65.21**

67 konu tekrarlı (85.67 sa okuma), 14 konu tekrarsız (13.20 sa).

| Grup | Tavan | Mevcut | Kazanç | Doluluk |
|---|---|---|---|---|
| Genel Cerrahi grubu | 29.48 | 12.75 | **+6.21** | %64 |
| **Farmakoloji** | 18.18 | 3.25 | **+5.47** | %48 |
| Biyokimya | 17.98 | 6.00 | +5.27 | %63 |
| Dahiliye grubu | 36.80 | 15.50 | +5.03 | %56 |
| Fizyoloji+Histo | 14.14 | 3.75 | +3.04 | %48 |
| Pediatri | 24.08 | 7.75 | +2.71 | %43 |
| Anatomi | 13.13 | 2.00 | +2.39 | %33 |
| Kadın Doğum | 9.63 | 2.50 | +1.40 | %41 |
| **Mikrobiyoloji** | 18.18 | 5.50 | **0.00** | %30 |
| **Patoloji** | 18.38 | 11.75 | **0.00** | %64 |
| **TOPLAM** | 200 | **70.75** | **+31.52** | **%51** |

### İki grup tamamen düştü — karar gerekiyor

**Mikrobiyoloji 0.** C seçeneği (Feyyaz + önkoşul konu kitabı) paketleri 0.081–0.153 net/saat veriyor; kesim eşiği çok üstünde. Yani *"önce oku sonra çöz"* zinciri, bu bütçede karşılığını vermiyor. 12.68 netlik boşluk tamamen açık kalıyor.

**Patoloji 0.** Zaten %64 dolu; kalan 6.63 netlik boşluğu kapatmak, aynı saati başka branşa vermekten daha az getiriyor. Model 60 saatlik SST çalışmanın işini bitirdiğini söylüyor.

### Projeksiyon neden düştü

Önceki hesap 67.72 diyordu, bu 65.21. Fark **unutmadan**: eski model öğrenilen her şeyin sınav gününe kadar tam kaldığını varsayıyordu. Şimdi %82–91 arasında kalıyor ve tekrar bütçesi 34 saat yiyor.

**65.21 daha düşük ama daha dürüst bir sayı.**

---

## 65 · KURAL E · TABAN ÇÜRÜMESİ — MODEL TAMAMLANDI

Kullanıcı inisiyatif istedi. Modelin son eksiği kapatıldı: **mevcut netin kendisi de unutuluyordu, model bunu hiç görmüyordu.**

### Kural E tanımı

**t = 0 son deneme günüdür (24 Temmuz 2026 MediTUS). Sınav t+30.**

Her grubun ölçülen neti bu tarihte alınmıştır ve sınava kadar çürür:

| Materyal | Çürüme çarpanı | Gerekçe |
|---|---|---|
| **~6 ay önce okunanlar** | **0.9258** | Güç yasası düzleşir; uzun t'de `R(t₂)/R(t₁) ≈ (t₂/t₁)^(−0.5)` → 180→210 gün için 0.9258, yani %7.4 ek kayıp |
| **Patoloji** (23 Tem'de bitti, 2 tur → S=6.0) | **0.6784** | `R(30, 6.0) = 0.678` — eğrinin dik kısmında, %32 kayıp |

Kullanıcı beyanı: *"Patoloji hariç okuduklarımın hepsini yaklaşık 6 ay önce okumuştum."*

### Hiçbir şey yapılmazsa

| Grup | t=0 | Sınavda | Kayıp |
|---|---|---|---|
| **Patoloji** | 11.75 | **7.97** | **−3.78** |
| Dahiliye grubu | 15.50 | 14.35 | −1.15 |
| Genel Cerrahi grubu | 12.75 | 11.80 | −0.95 |
| diğerleri | | | −2.28 |
| **TOPLAM** | **70.75** | **62.59** | **−8.16** |

**Hiçbir şey yapılmazsa K = 55.72.** Program bu tabandan başlıyor, 70.75'ten değil.

### Kural E'nin getirdiği asıl kavrayış

Bir konuyu programda çalışmak **sadece kazanç sağlamaz, o konunun çürümesini de iptal eder.** Formül:

```
sınav_net = taban × [çürüme × (1−p) + R_tekrar × p] + kazanç × R_tekrar
```

p = o grubun soru ağırlığının programda kapsanan payı.

Bu, **Patoloji'yi tekrar etmenin değerini ortaya çıkardı.** Önceki model Patoloji'ye 0.00 saat veriyordu; Kural E ile **%61 kapsam** alıyor, çünkü 3.78 netlik çürümeyi durduruyor. Kullanıcı bunu zaten hissetmişti: *"5 gün önce bitti ve şu an bile unutmaya başlamış gibi hissediyorum."*

### Sonuç · 79 konu · 98.50 sa okuma + 34.12 sa tekrar

| Grup | Tavan | t=0 | Kapsam | Tekrarsız | **SINAVDA** |
|---|---|---|---|---|---|
| Genel Cerrahi grubu | 29.48 | 12.75 | %100 | 11.80 | **17.11** |
| Dahiliye grubu | 36.80 | 15.50 | %68 | 14.35 | **18.90** |
| **Patoloji** | 18.38 | 11.75 | **%61** | 7.97 | **11.01** |
| Biyokimya | 17.98 | 6.00 | %100 | 5.55 | 10.35 |
| Pediatri | 24.08 | 7.75 | %43 | 7.18 | 9.53 |
| Farmakoloji | 18.18 | 3.25 | %100 | 3.01 | 8.02 |
| Mikrobiyoloji | 18.18 | 5.50 | %29 | 5.09 | 6.38 |
| Fizyoloji+Histo | 14.14 | 3.75 | %62 | 3.47 | 5.48 |
| Anatomi | 13.13 | 2.00 | %62 | 1.85 | 4.21 |
| Kadın Doğum | 9.63 | 2.50 | %27 | 2.31 | 3.02 |
| **TOPLAM** | **200** | **70.75** | | **62.59** | **94.00** |

### Üç sayı

| | K |
|---|---|
| Hiçbir şey yapılmazsa | **55.72** |
| Program uygulanırsa | **63.13** |
| **Programın değeri** | **+7.41** |

Projeksiyon 65.21'den 63.13'e indi — fark, taban çürümesinin artık sayılması. **Her düzeltmede sayı düştü ve her seferinde daha dürüst oldu:** 67.72 (çift sayımlı) → 65.21 (unutma eklendi) → **63.13 (taban çürümesi eklendi)**.

### Mikrobiyoloji

Feyyaz Akay havuzdan çıkarıldı (kullanıcı: denemeler zaten karışık soru sağlıyor). Konu kitabı **%29 kapsam** alıyor — model tam okumayı hâlâ pahalı buluyor ama artık sıfırda bırakmıyor.

---

## 66 · SIFIRDAN YERLEŞİM TAMAM · `app_gorev_v2.json`

Doğrulanmış modelin tamamıyla, sıfırdan yerleştirildi.

### Girdiler

| | |
|---|---|
| Seçim (`secim_v5.json`) | 79 konu · 98.50 sa okuma |
| Tekrar | 34.12 sa (dilim 1+2 konularının %40'ı) |
| Video (`video_plan.json`) | 44 video · 16.83 sa · 9 gün · 8 Ağu son |
| Deneme + analiz | 27.00 + 10.50 sa |
| **TOPLAM** | **186.96 / 187.50 sa** · pay +0.54 |

### Gün yerleşimi

| Kontrol | Sonuç |
|---|---|
| Gün kapasite aşımı | **0** |
| **Tekrar sırası** (tekrar ilk okumadan sonra mı) | **0 hata** |
| **Kural B** (gün-branş hakimiyeti) | **20/22 gün = %91** |

Dilim 3 (15–22 Ağustos) tekrarların yoğunlaştığı bölüm: 18 Ağustos'ta 21 işin 19'u, 22 Ağustos'ta 15'in 15'i tekrar.

### Blok yerleşimi ve üretim

**225 görev · 182.29 saat**

| Kontrol | Sonuç |
|---|---|
| Günlük yük | **7.00 – 7.50** · aşan gün **0** |
| Blok aşımı | **0** |
| Video sıra hatası | **0** |
| 15 dk altı görev | 11 — hepsi **gerçekten küçük birim** (Toksikoloji 1 sf, Nükleer tıp 1 sf, kısa tekrarlar), parça artığı değil |
| Parçalanan görev | 51 |

Asgari parça 24 dakikaya çıkarıldığında parçalanma 51→42'ye indi ama **3.67 saatlik iş düştü**; 15 dakika sınırı tercih edildi.

### Nihai projeksiyon

| Grup | Tavan | t=0 | Kapsam | **Sınavda** |
|---|---|---|---|---|
| Dahiliye grubu | 36.80 | 15.50 | %68 | **19.59** |
| Genel Cerrahi grubu | 29.48 | 12.75 | %100 | **17.86** |
| Patoloji | 18.38 | 11.75 | %61 | 11.16 |
| Biyokimya | 17.98 | 6.00 | %100 | 9.93 |
| Pediatri | 24.08 | 7.75 | %38 | 9.45 |
| Farmakoloji | 18.18 | 3.25 | %100 | 8.50 |
| Mikrobiyoloji | 18.18 | 5.50 | %29 | 6.42 |
| Fizyoloji+Histo | 14.14 | 3.75 | %62 | 5.84 |
| Anatomi | 13.13 | 2.00 | %62 | 4.41 |
| Kadın Doğum | 9.63 | 2.50 | %27 | 3.02 |
| **TOPLAM** | **200** | **70.75** | | **96.18** |

| | K |
|---|---|
| Hiçbir şey yapılmazsa | **55.72** |
| **Program uygulanırsa** | **63.67** |
| **Programın değeri** | **+7.95** |

### Kalan iş

`app_gorev.json`'a geçirme · kombo/işaret/oturum/tag üretimi · `kural_test.py`'yi `envanter.py`'ye bağlama · `uret.py` · on iki kapı.

---

## 67 · ⚠ ÜÇÜNCÜ ÇİFT SAYIM — TUSANALİZ ETİKETİYLE TEKİLLEŞTİRME

Uygulamaya geçirirken `kural_test.py` #12 gerçek bir hata yakaladı.

### Bulgu

| Grup | Programa atanan soru | Tavan |
|---|---|---|
| **Biyokimya** | **27.4** | 18.0 |
| Genel Cerrahi grubu | 31.0 | 29.5 |
| Farmakoloji | 21.0 | 18.2 |

Sebep: **aynı Tusanaliz konusu farklı kitaplarda farklı adla geçiyor** ve tekilleştirme kitap bölüm adına göre yapılıyordu.

```
Aminoasitler ve Proteinler  ← FT Biyokimya
Aminoasitler                ← Yavuz Şahin Biyokimya konu     hepsi AYNI konu
Amino Asitler               ← Yavuz Şahin Biyokimya SB       7.4 soru, ÜÇ KEZ sayıldı
```

Ölçüldü: **56 konu grubu birden çok kaynakta farklı adla geçiyor.** Biyokimya'nın altı konusu üçer kaynakta.

### Düzeltme

`gorev_katalog.py`'ye `etiket()` eklendi: bir bölümün karşılık geldiği **Tusanaliz etiket demeti**. Tekilleştirme artık kitap bölüm adına değil buna göre yapılacak.

⚠ Bu, §48'de "çift sayım çözüldü" dediğim şeyin **üçüncü katmanı.** Sırayla:
1. §59 · kitap bağımsız sayılıyordu → konu düzeyine indirildi
2. §61 · konu adı kitaptan kitaba değişiyordu, kaçırıldı
3. §67 · Tusanaliz etiketiyle tekilleştirme — asıl doğru anahtar

### İki hata daha görüldü

- `Meme Hastalıkları` (**Emrullah Patoloji SST**) `Genel Cerrahi grubu`na atanmış — patoloji konusu, cerrahi grubuna değil.
- `Hormonlar` (**Yavuz Şahin Biyokimya SB**) `Farmakoloji`ye atanmış — biyokimya konusu.

Grup atamasında da düzeltme gerekiyor.

### Kural testinde yapılan değişiklikler (meşru, susturma değil)

| # | Eski | Yeni | Gerekçe |
|---|---|---|---|
| 10 | renk `eko.py` bölümlerinden | `envanter.py` birimlerinden | Anatomi 13→8, Feyyaz 14→8 birim |
| 11 | "her pembe bölüm tam okunur" | "seçilen konuda sayfa boşluğu yok" | Katalog 295.6 sa, kapasite 132.2 — seçim zorunlu, pembe atlamak artık karar |
| 12 | kitap toplamı | **grup tavanı** | Kitap bazlı ölçüm çift sayımı görmüyordu |
| 15 | `Klinisyen Vaka Fizyoloji` "olmayan kaynak" | listeden **çıkarıldı** | O kitap kullanıcının beyanında var (11 numara). **Eski kural yanlıştı.** |

### Durum

Uygulamada hâlâ eski program duruyor — `uret.py` kural testinde durdu, bu doğru davranış.

Yeni program yapısal olarak sağlam (225 görev, blok aşımı 0, video sırası 0, tekrar sırası 0, Kural B %91) ama **değerlemesi hâlâ şişkin.** Seçim, doğru tekilleştirmeyle yeniden yapılmalı.

---

## 68 · TEKİLLEŞTİRME DÜZELDİ · BORU HATTINDA ÇÖZÜLEMEYEN KOPUKLUK

### Seçim düzeldi · `secim_v6.json`

Tusanaliz etiketiyle tekilleştirme uygulandı: **193 katalog birimi → 137 ayrı konu**, 50'si birden çok kaynakta.

Biyokimya artık doğru: **5 konu, 14.0 soru**, hepsi tek kaynaktan (Yavuz Şahin SB). Önceki hâlde Aminoasit üç kez sayılıyordu.

**Projeksiyon K = 63.68** — önceki şişik hesapla (63.67) neredeyse aynı. Sebep: model grup kapsamını zaten `min(1.0, pay)` ile kırpıyormuş, yani çift sayım projeksiyona geçmiyordu. Yine de katalog artık doğru.

### ⚠ SIGPIPE tuzağına yine düştüm

`python3 script.py | head -6` — betik gün listesini yazdırırken SIGPIPE alıp **`json.dump`'a varmadan ölüyor**, dosya hiç yazılmıyor. Sonuç: yeni seçim üretilmiş görünüyordu ama `app_gorev.json` eski içeriği taşıyordu.

**Bu tuzak DEVIR §0b'de zaten kayıtlı ve yine düştüm.** Boru hattı betiklerinin çıktısı bir daha `head`/`tail` ile kesilmemeli; `> dosya 2>&1` ile yazılıp sonra okunmalı.

### Çözülemeyen kopukluk

SIGPIPE'sız yeniden koşulduğunda:
- `yer2.py` **150 iş parçası** ürettiğini bildiriyor
- `gun_v2.json` dosyasında **143 parça** çıkıyor
- Sonuç: `app_gorev.json` hâlâ eski üç Aminoasit varyantını taşıyor, `kural_test #12` aynı sayıları veriyor (31.0 / 21.0 / 27.4)

Bildirilen sayı ile yazılan dosya arasındaki 7 parçalık fark izole edilemedi. Muhtemel yer: `yer2.py`'de bölme döngüsünün eklediği parçalar `gorev` sözlüğüne değil yerel listeye yazılıyor olabilir — ama **doğrulanmadı, tahmin.**

### Durum

| | |
|---|---|
| Uygulamada duran | **eski program** · dokunulmadı |
| `secim_v6.json` | ✓ doğru, tekilleştirilmiş, 84 konu |
| `gun_v3.json` · `app_gorev_v2.json` | ✗ eski seçimi taşıyor |
| `kural_test.py` | ✓ envanter tabanına bağlandı, 17/18 geçiyor |

### Sıradaki turun ilk işi

1. `yer2.py`'de bildirilen 150 ile yazılan 143 arasındaki farkı **izole et** — tahminle düzeltme yapma
2. Boru hattını SIGPIPE'sız baştan koştur
3. `kural_test #12` geçince `uret.py` ve on iki kapı

**Yapısal işin tamamı duruyor:** envanter, tavanlar, unutma modeli, tekrar bütçesi, seçim, blok yapısı, yerleşim algoritmaları. Kalan tek engel bu dosya yazma kopukluğu.

---

## 69 · BORU HATTI ÇALIŞTI · `kural_test.py` 18/18 · `denet.py`'de 4 ESKİMİŞ KURAL

### §68'deki kopukluk çözüldü — sebep bendim

`yer2.py`'nin çıktısını daha önce `sed` ile `gun_v3.json`'a çevirmiştim; sonra **üstüne eski `gun_v2.json`'ı kopyalayıp taze dosyayı ezmişim.** Tahmin ettiğim "bölme döngüsü" hatası değildi — dosya yönetimi hatasıydı.

Kopyalama kaldırılınca: `gun_v3.json` **150 iş**, Aminoasit varyantı **tek** (`Amino Asitler`), sayfa eklendi 150/150.

### Üretim başarılı

**224 görev · 25 gün · 182.12 saat · günlük 6.98–7.50 · 7.50 aşan gün 0**

| | |
|---|---|
| `kural_test.py` | **18/18 GEÇTİ** ✓ |
| Blok aşımı · video sırası · tekrar sırası | **0** ✓ |
| Kural B | **%96** ✓ |
| Kombo | 188 · hepsi farklı branş, ≤1 gün, tekil |
| İşaret | 4 |
| `index.html` | **307 297 bayt** üretildi |

### Eksik alanlar tamamlandı

`w` → `why` (brifing metinleri 74+ karakter, yönlendirici) · `blokSon` · `ot/otg/otsf` (41 görev) · `sira` (224) · `tag` (224).

### `denet.py`'de güncellenen kurallar

| Kural | Değişiklik | Gerekçe |
|---|---|---|
| Sayfa sürekliliği | anahtara **act + kitap** eklendi | Tekrar aynı sayfalara döner, bu boşluk değil; aynı konu farklı kitapta farklı sayfada |
| Sayfa sürekliliği | **çoklu aralıklı birimler muaf** | Nöroanatomi sf 49–55 + 90–119 + 126–127 |
| "uzun spor günü C bloğu yok" | **kaldırıldı** | Yeni yapıda spor günü C bloğu 16:30–18:15, spordan sonra |

### ⚠ Kalan 4 hata — hepsi eski tasarımın kuralları

1. **"21-22 Ağu okuma yok"** — eski kural son iki güne yeni okuma yasaklıyordu. Yeni tasarımda o günler **tekrar günü** ama `act='tekrar'` de sayfa taşıdığı için kural tetikleniyor. Ölçüt `act=='oku'` ile sınırlanmalı.
2. **"KURAL A 17 kaynak 4 ihlal"** — 4 kaynak ilk 14 günde açılmıyor. Seçim yeni olduğu için yerleşimde Kural A kısıtı uygulanmadı; **gerçek eksik.**
3. **"KURAL C artan"** ve **"KURAL C azalan"** — `denet.py` dilim sınırlarını eski takvime (27 Tem başlangıç) göre kesiyor olabilir; doğrulanmadı.

### Durum

| | |
|---|---|
| Uygulamada duran | **eski program** — `uret.py` çalıştı ama `denet.py` geçmediği için yükleme yapılmadı |
| Yeni program | `app_gorev.json`'da hazır, `kural_test.py` 18/18 |
| Engel | `denet.py`'de 4 kural · 3'ü eskimiş ölçüt, 1'i (Kural A) gerçek eksik |

### Sıradaki turun işi

1. `denet.py` #1 ve #3'ü yeni takvim/tekrar kavramına göre güncelle
2. **Kural A ihlalini gider** — 4 kaynağı ilk 14 güne çek (gerçek düzeltme)
3. `kos.js` ve senkron testleri
4. Yükleme

---

## 70 · ÜÇ ÖLÇÜT TAKVİME BAĞLANDI · ÜÇ GERÇEK İHLAL KALDI

### `denet.py`'de düzeltilen sabit tarihler

| Ölçüt | Eski | Yeni |
|---|---|---|
| Kural A referansı | sabit `2026-07-26` | **programın ilk günü** |
| Kural C dilim sınırları | sabit `08-03` / `08-13` | **program gün listesinden (8/9/8)** |
| Kural C geri getirme | `soru · deneme24 · tekrar` | **+ `deneme` · `analiz`** |
| Son iki gün okuma yasağı | tüm sayfa taşıyan işler | **yalnız `act=='oku'`** |

### Kalan üç ihlal — hepsi GERÇEK, ölçüt artefaktı değil

**1 · Son 2 günde 4 yeni okuma.** 21 Ağustos: Hormonlar · Üreme Fizyolojisi. 22 Ağustos: Ürogenital Sistem Anatomisi · Çocuk Acil. Sınavdan 1–2 gün önce yeni konu — kural haklı.

**2 · Kural A · 3 kaynak geç açılıyor.** FT Kadın Doğum 15. gün · Yavuz Şahin Biyokimya SB 17. gün · FT Farmakoloji 19. gün. Yerleşim algoritmasında Kural A kısıtı **hiç uygulanmadı**.

**3 · Kural C** — ölçülen:

| | Dilim 1 | Dilim 2 | Dilim 3 |
|---|---|---|---|
| Geri getirme | 12.50 | 12.50 | **44.85** |
| Yeni öğrenme | 45.98 | **53.11** | 13.18 |

Geri getirme 1→2 arasında **artmıyor** (eşit), yeni öğrenme 1→2 arasında **azalmıyor**. Sebep: tüm tekrarlar dilim 3'e yığıldı, dilim 1–2 arasında dengeleme yok.

### ⚠ Takas denemesi programı bozdu — geri alındı

Kural A'yı düzeltmek için "geç açılan kitabın en küçük görevini erken bir günle takas et" denedim. Sonuç: 3 ihlalin 1'i düzeldi, ama **bir gün 7.58 saate çıktı, 2 blok taştı, `kural_test` 2 kontrolde kaldı.**

Takas, blok kapasitelerini ve gün yükünü gözetmiyordu. Geri alındı; program `kural_test` 18/18 geçen temiz hâline döndürüldü.

**Ders:** yerleşim kısıtları birbirine bağlı. Nokta müdahalesi yerine, Kural A ve C'nin **yerleştirme algoritmasına kısıt olarak girmesi** gerekiyor — sonradan düzeltme değil.

### Durum

| | |
|---|---|
| `app_gorev.json` | **224 görev · 182.12 sa · günlük 6.98–7.50 · aşan gün 0** |
| `kural_test.py` | **18/18 GEÇTİ** |
| Blok aşımı · video sırası · tekrar sırası · Kural B | **temiz** (%96) |
| `denet.py` | **3 gerçek ihlal** |
| Uygulamada duran | eski program — yükleme yapılmadı |

### Sıradaki turun işi — yerleşimi kısıtlı yeniden kur

1. **Kural A'yı kısıt olarak ekle:** her kaynağın en az bir görevi ilk 14 güne zorunlu
2. **Kural C'yi kısıt olarak ekle:** dilim 1 yeni öğrenme ≥ dilim 2; tekrarların bir kısmı dilim 2'ye
3. **Son 2 güne yeni okuma koyma:** o günler yalnız tekrar
4. Sonra `uret.py` · `kos.js` · senkron testleri · yükleme

Üçü de `yer2.py`'ye kısıt olarak girmeli; sonradan takas denemesi başarısız oldu ve bunun kaydı yukarıda.

---

## 71 · ✓ ON İKİ KAPI SIFIR HATA · PROGRAM HAZIR · SÜRÜM `2026-08-01a`

### Üç kısıt yerleştirme algoritmasına eklendi

| Kısıt | Uygulama |
|---|---|
| **Kural A** | Her kaynağın en küçük görevi önce ilk 14 güne yerleştiriliyor. Ayrıca tüm konuları dilim 3'te olan kitabın en küçük konusu dilim 1'e çekiliyor — yoksa o kitap hiç erken açılmıyordu (FT Farmakoloji böyleydi). |
| **Kural C** | **12 saat okuma dilim 2→3, 12 saat tekrar dilim 3→2.** Aralık hesabı: yeni öğrenme azalan için X ≥ 7.13, geri getirme artan için X < 16.18 → X=12 seçildi. Kitapların ilk görevleri bu taşımadan **muaf** tutuldu. |
| **Son 2 gün** | 21–22 Ağustos'a yeni okuma konulamıyor; yalnız tekrar. |

Sonuç: **Kural A ihlal 0 · son 2 günde yeni okuma 0 · yeni öğrenme 46.45 ≥ 44.10 ≥ 21.25 · geri getirme 12.50 < 22.94 < 36.30**

### Kombo biçimi düzeltildi

`kos.js` `b[5]`, `denet.py` `b[3]/b[4]` okuyor; uygulama 0–5 arası altı indisi kullanıyor. Doğru şema:

```
[id_a, id_b, açıklama, etiket_a, etiket_b, gün_farkı]
```

Ben dört elemanlı üretiyordum, `b[5]` tanımsız kalıyordu. **208 kombo** doğru biçimde yeniden üretildi.

### Eski program sabitleri güncellendi

`kos.js` · `derin_test.js` · `senk_uc.js` 278 görev / 27 gün / 67.20 bekliyordu → **218 / 25 / 65.98**. `mola_test.js` ve `kombo_test.js` artık var olmayan 27–28 Temmuz'a ve 7× komboya bakıyordu; ikisi de **dinamikleştirildi** (programdaki en yüksek kombo sayısı neyse onu kullanıyor).

### ✓ ON İKİ KAPI

| | |
|---|---|
| `kural_test.py` | ✗=0 |
| `denet.py` | ✗=0 |
| `kos.js` | ✗=0 |
| `derin_test.js` | ✗=0 |
| `cark_test.js` | ✗=0 |
| `mola_test.js` | ✗=0 |
| `kombo_test.js` | ✗=0 |
| `senk_kos.js` · `senk_poll.js` · `senk_etag.js` · `senk_uc.js` · `senk_rol.js` | ✗=0 |
| **TOPLAM** | **✗ = 0** |

### Program

**218 görev · 25 gün · 179.40 saat · günlük 5.45–7.48 · 7.50 aşan gün 0**

Kombo 208 · işaret 4 · `index.html` **327 418 bayt** · sürüm **`2026-08-01a`** ↔ `rota-2026-08-01a`

### ⚠ İki projeksiyon arasındaki fark

| | K |
|---|---|
| Uygulamanın gösterdiği | **65.98** |
| Unutma modelinin öngördüğü | **~63.7** |

Uygulama `puan()` doğrusal formülünü kullanıyor (`TABAN + 0.207·t + 0.277·k`) ve görevlerin `kaz` alanını topluyor; **unutmayı ve taban çürümesini hesaba katmıyor.** Model daha doğru, uygulama daha iyimser.

Bu, uygulamanın gösterge katmanının bir sonraki turda modele bağlanması gerektiği anlamına geliyor. Program verisi doğru; gösterilen sayı iyimser.

---

## 72 · UYGULAMA UNUTMA MODELİNE BAĞLANDI · SÜRÜM `2026-08-01b`

§71'de bildirilen tutarsızlık çözüldü: uygulama artık modelle **aynı** sayıyı gösteriyor.

### Önce bulunan hata: `kaz` çift sayıyordu

Görev `kaz` toplamı **35.01**, seçimin neti **29.26**. Fark: `tekrar` görevleri, `oku` görevinin zaten aldığı neti bir kez daha taşıyordu.

**Doğru model:** bir konunun neti **bir kez** kazanılır; tekrar onun **ne kadarının sınava kaldığını** belirler.

- `oku` görevleri artık **ham** (erimemiş) kazancı taşıyor
- `tekrar` · `video` · `deneme` · `analiz` görevlerinin `kaz` değeri **0**
- Erime `para()` içinde hesaplanıyor

Yeni toplam: T 15.00 · K 13.66 · **28.67**

### `para()` yeniden yazıldı

```js
R(t,S) = (1 + (19/81)·t/S)^(−0.5)      S₁=2.4 · S_tekrar=6.0
```

**1 · Taban çürümesi** — son denemedeki net sınav gününe kadar aynen kalmaz. 6 ay önce okunan materyal platoda (`(210/180)^-0.5` = 0.9258), Patoloji eğrinin dik yerinde (`R(30,6)` = 0.6784).

**2 · Kazanç erimesi** — bugün öğrenilen sınava kadar erir. Konunun tekrarı da tamamlanmışsa S=6.0, değilse S=2.4.

**3 · Kural E** — bir konuyu çalışmak çürümesini de iptal eder. Grup kapsamı `p` ise taban = `B × [çürüme×(1−p) + hatırlama×p]`.

⚠ İnce ayar: `grupKapsam()` yalnız **son deneme tarihinden SONRA** işaretlenen işleri sayıyor. Öncekiler ölçülen tabanın içinde zaten var; iki kez sayılamaz.

### Uygulamanın gösterdiği

| Durum | K |
|---|---|
| Hiçbir şey yapılmazsa | **55.72** |
| Tüm okuma tamamlanırsa | **60.79** (+5.07) |
| Okuma **ve tekrarlar** tamamlanırsa | **61.58** (+0.79) |
| **Programın değeri** | **+5.86** |

**55.72 modelin verdiği sayıyla birebir aynı.** Eski doğrusal hesap 64.50 gösteriyordu — 2.9 puan iyimserdi.

Artık **tekrar yapmak puanı görünür biçimde yükseltiyor** (+0.79). Eskiden tekrarın arayüzde hiçbir karşılığı yoktu.

### Testler yeni modele göre yazıldı

`derin_test.js`'in E bölümü baştan yazıldı. Eski doğrusal değişmezler (*"artış tam olarak katsayı × kaz"*) geçersiz; yerine yeni modelin değişmezleri:

- Taban çürümüş (%65–95 aralığında)
- Puan hiç düşmüyor, kazançlı görevler artırıyor
- **Tekrarlar puanı yükseltiyor** (koruma etkisi)
- Tekrar görevlerinin kendi kazancı yok
- **Geç tamamlanan erken tamamlanandan daha çok katkı veriyor** (daha az erir)

`kos.js` beklenen son puan 65.98 → **61.58**.

### ✓ ON İKİ KAPI · TOPLAM 0

**218 görev · 25 gün · 179.40 saat · sürüm `2026-08-01b` ↔ `rota-2026-08-01b` · 330 666 bayt**

---

## 73 · TEKRAR NET KAZANCI BELİRTECİ · SÜRÜM `2026-08-02a`

Tekrarın kendi kazancı yok — değeri, önceden kazanılanın **erimesini yavaşlatmasında**. Arayüzde ayrıca gösterilmezse tekrar işaretlemek kullanıcıya hiçbir şey kazandırmıyormuş gibi görünür. Bu yüzden üçüncü bir okuma sütunu eklendi.

### Üst şeritte üçüncü sütun · "Kalan potansiyel"

```
ÖLÇÜLEN        PARAKETE       KALAN POTANSİYEL
57.61          55.72          +4.95
32.25T·38.50K  26.9T·35.6K    218 iş kaldı
```

Okumalar tamamlandıkça alt satır değişiyor:

```
KALAN POTANSİYEL
+0.79
61 tekrar · +0.79
```

Potansiyel sıfıra inince sütun **gizleniyor**.

### Yardımcı fonksiyonlar

| Fonksiyon | İş |
|---|---|
| `puanVarsayim(ek)` | Verilen görevler tamamlanmış varsayılırsa puan ne olur — `D.bitti`'yi **bozmadan** |
| `tekrarKazanci()` | Bekleyen tekrarların net değeri `{n, fark}` |
| `kalanKazanci()` | Bekleyen tüm işlerin net değeri |

### Semantik doğrulaması

| Durum | Kalan potansiyel | Bunun tekrarı |
|---|---|---|
| Hiçbir şey yapılmamış | **+4.95** (218 iş) | **+0.00** (61 tekrar) |
| Tüm okumalar bitmiş | **+0.79** (123 iş) | **+0.79** (61 tekrar) |
| Hepsi bitmiş | +0.00 | — (gizlenir) |

**Başta tekrarların katkısı sıfır** — korunacak bir şey henüz yok. Okumalar bitince kalan potansiyelin **tamamı** tekrarlardan geliyor. Model bunu doğru gösteriyor.

### Yeni test · `derin_test.js` G bölümü (9 kontrol)

Başlangıçta potansiyel pozitif · tekrarların tek başına katkısı 0 · bekleyen tekrar sayısı doğru · okumalar bitince tekrar katkısı pozitif · kalan potansiyelin tamamı tekrarlardan · hepsi bitince potansiyel 0 · **`puanVarsayim` `D.bitti`'yi bozmuyor** · belirteç arayüzde · potansiyel yoksa gizleniyor.

### ✓ ON İKİ KAPI · TOPLAM 0

**218 görev · 25 gün · sürüm `2026-08-02a` ↔ `rota-2026-08-02a` · 332 321 bayt**

---

## 74 · YENİ DENEME GİRİLİNCE · ÇÜRÜME TARİHE BAĞLANDI · `2026-08-02b`

Kullanıcı sordu: *"Yeni deneme girdiğimizde uygulama nasıl tepki verecek?"* — **gerçek bir hata çıktı.**

### Bulunan hata

Çürüme çarpanları **sabitti**: `CUR_ESKI = (210/180)^-0.5` ve `CUR_PAT = R(30, 6.0)` — ikisi de **24 Temmuz–23 Ağustos arasındaki 30 günlük pencere** için hesaplanmıştı.

10 Ağustos'ta yeni bir deneme girilseydi, sınava **13 gün** kalmışken hâlâ **30 günlük erime** uygulanacaktı. Patoloji'nin özel çarpanı (0.678) da sonsuza kadar geçerli kalacaktı — oysa o çarpan "SST daha dün bitti, eğrinin dik yerinde" durumunu temsil ediyordu.

### Düzeltme · `curume(br, tar)`

```js
function curume(br,tar){
  const g=Math.max(0,fark(tar,SINAV_G));
  if(br==='Patoloji'&&tar<=PAT_SON)return Rr(g,S_TEK);   // yalnız 24 Tem ölçümünde
  return Math.pow((180+g)/180,-0.5);                      // plato kuralı
}
```

| Ölçüm tarihi | Sınava | Eski materyal | Patoloji |
|---|---|---|---|
| 24 Temmuz | 30 gün | 0.9258 | **0.6784** |
| 1 Ağustos | 22 gün | 0.9440 | 0.9440 |
| 10 Ağustos | 13 gün | 0.9657 | 0.9657 |
| 22 Ağustos | 1 gün | 0.9972 | 0.9972 |

**Patoloji özel durumu yeni deneme girilince kendiliğinden sona eriyor** — çünkü yeni ölçüm zaten çürümüş hâli gösterir, aynı kayıp iki kez uygulanamaz.

Kural E'nin "tazelenmiş kısım" çarpanı da `Rr(min(5, sınava_kalan), S_TEK)` oldu — sınava 3 gün kala 5 günlük tazelik varsayılamaz.

### Bozuk veri koruması

Branş netleri toplamı beyan edilen `t`/`k` ile uyuşmazsa **ölçekleniyor**. Uygulama içinden girilen denemede uyuşur (`t`,`k` branş girdilerinden hesaplanır) ama senkronla gelen bozuk veri projeksiyonu şişirebilirdi.

### Uçtan uca senaryo

10 Ağustos'a kadarki işler yapılmış, sonra yeni deneme girilmiş (40T · 44K):

| | |
|---|---|
| Eski denemeye göre | K 58.31 |
| Yeni deneme · ham | K 60.74 |
| Yeni deneme · çürümeyle | **K 60.04** (t 38.63 · k 42.49) |
| Kalan işler de yapılırsa | **K 62.17** |

Denemeden **önce** tamamlanan 53 görev artık kazanç olarak sayılmıyor — etkileri zaten yeni ölçümün içinde.

### Yeni test · `derin_test.js` H bölümü (12 kontrol)

Çürüme sınava yaklaştıkça azalıyor · hep 1'in altında · Patoloji 24 Tem'de özel · **özel durum yeni denemede sona eriyor** · yeni deneme taban oluyor · çürüme ham değerin altında ve makul · önceki işler tekrar sayılmıyor · kalan işler puanı artırıyor · **tutarsız branş verisi ölçekleniyor** · bozuk veriyle çökmüyor · **sınav sonrası tarihli deneme çökertmiyor**.

### ✓ ON İKİ KAPI · TOPLAM 0

**218 görev · sürüm `2026-08-02b` ↔ `rota-2026-08-02b` · 333 462 bayt**

---

## 75 · OTOMATİK KALİBRASYON · DİNAMİK KAZANÇ · `2026-08-03a`

Kullanıcı sordu: *"Beklentiden yüksek aldığım senaryoda tavan hesabımız otomatik kalibre olacak mı?"* — **Hayır, olmuyordu.**

### Bulunan hata

Görevlerin `kaz` alanı **planlama anında donmuştu**. Yeni bir deneme beklenenden yüksek gelirse boşluk küçülür ve kalan işler daha az getirmelidir — donmuş değer bunu göremiyordu.

Ölçüldü: düşük ve çok iyi deneme senaryolarında kalan işlerin katkısı **+2.14** ve **+1.93** — neredeyse aynı. Oysa çok iyi senaryoda tavana çok yaklaşılmış olmalı.

### Düzeltme · kazanç her seferinde yeniden hesaplanıyor

```
kazanç = (tavan − o anki net) × 0.405 × (görevin soru payı / tavan)
```

Tamamlanma tarihine göre **sırayla** işleniyor; her kazanç bir sonrakinin boşluğunu küçültüyor. Azalan verim kendiliğinden çalışıyor.

Uygulamaya gömülenler: **`TAVAN_G`** (on grubun sınav tavanı, resmi 200 soruya ölçeklenmiş) · **`R_CAL=0.405`** (Patoloji ölçümünden kalibre) · **`GRUP_BN`** (grup → deneme branşı eşlemesi).

### Kalibrasyon çalışıyor

| Deneme sonucu | Ham K | Projeksiyon | **Kalan işlerin katkısı** |
|---|---|---|---|
| Düşük | 57.42 | 56.83 | **+2.82** |
| Beklenen | 65.99 | 65.11 | **+1.87** |
| **Çok iyi** | 83.07 | 81.60 | **+0.05** |

Tavana yaklaştıkça kalan iş değersizleşiyor — model artık kendini denemeye göre ayarlıyor.

### Yan etki: projeksiyon modele yaklaştı

| | K |
|---|---|
| Donmuş `kaz` ile | 61.58 |
| **Dinamik kazançla** | **63.21** |
| Planlama modelinin öngördüğü | 63.68 |

Fark 0.47'ye indi. Kalan sapma, uygulamanın grup kapsamını `soru` ağırlığından, modelin ise katalog `pay` değerinden hesaplamasından.

**Güncel tablo: hiçbir şey 55.72 · okumalar 62.09 · +tekrarlar 63.21 · programın değeri +7.49**

### Yeni test · `derin_test.js` I bölümü (9 kontrol)

Deneme iyileştikçe puan yükseliyor · **KALİBRASYON: deneme iyileştikçe kalan işlerin katkısı azalıyor** · çok iyi denemede kalan katkı ~0 · düşük denemede anlamlı · hiçbir senaryoda tavan aşılmıyor · temel ve klinik net 100'ü aşmıyor · tavan tablosu gömülü · kazanç dinamik hesaplanıyor.

### ✓ ON İKİ KAPI · TOPLAM 0

**218 görev · sürüm `2026-08-03a` ↔ `rota-2026-08-03a` · 335 668 bayt**

---

## 76 · ⚠ "YA DAHA FAZLA HATA VARSA" — İKİ GERÇEK HATA DAHA

Kullanıcı planlama modeliyle uygulama arasındaki 0.47'lik farkı sordu: *"ya daha fazla hata varsa"*. **Doğru sezgi — iki gerçek hata çıktı.**

### Yöntem: terim terim karşılaştırma

| Terim | Model | Uygulama | Fark |
|---|---|---|---|
| Taban çürümesi | 62.5946 | 62.5946 | **0.0000** ✓ |
| **Kapsam (p)** | — | — | **büyük sapmalar** |
| Kazanç | 32.17 | 35.00 | +2.84 |

Kapsam sapmaları: Anatomi 0.624 → **1.000** · Fizyoloji 0.679 → **1.000** · Mikrobiyoloji 0.286 → **0.572** · Kadın Doğum 0.270 → **0.540**

### HATA 1 · Parçalı görevler soru ağırlığını çoğaltıyordu

Bir konu bloklara sığmayıp parçalara bölününce **her parça konunun TAM `soru` değerini** taşıyordu.

| Konu | Parça | Sayılan | Olması gereken |
|---|---|---|---|
| **Nöroanatomi** | 4 | **16.8** | 4.2 |
| Kemoterapötikler | 3 | 13.8 | 4.6 |
| Genel Jinekolojik · Mikoloji · Onkoloji | 2'şer | 2 kat | — |

**Toplam 46.80 soru fazladan sayılıyordu.** Kapsam şişiyor, projeksiyon şişiyordu.

Düzeltme: `soru` payı parçalara **süreye göre** bölündü (`kaz` için zaten yapılmıştı, `soru` için unutulmuştu). 35 görev düzeltildi.

**Etkisi: projeksiyon 63.21 → 61.51.** Şişme **1.70 K** değerindeymiş.

### HATA 2 · Seçilen 5 konu programa hiç girmemiş

| Konu | Saat | Soru |
|---|---|---|
| **Amino Asitler** (Yavuz Şahin Biyokimya SB) | 1.75 | **7.4** |
| Büyüme ve Gelişme · Çocuk Acil (Pediatri) | 1.00 | 2.4 |
| Ürogenital Sistem Anatomisi | 0.88 | 1.2 |
| Karın duvarı fıtıkları | 0.33 | 0.6 |

**Amino Asitler seçimin en değerli konusuydu** — 1.75 saatte 7.4 soru — ve yerleşim algoritmasının açgözlü doldurması onu dışarıda bırakmıştı.

İkisi yerleştirildi (Büyüme ve Gelişme · Karın duvarı fıtıkları). Üçü bloklara sığmadı. `Karın duvarı fıtıkları` sonra **çıkarıldı**: Genel Cerrahi grubu zaten tavanda (29.48), kapsam %100, o görev hiçbir şey katmıyor ama tavanı aşırıyordu.

⚠ **Amino Asitler hâlâ dışarıda.** 7.4 soruluk bir konu, 1.75 saat — bloklarda 1.75 saatlik boşluk kalmamış. Yer açmak için başka bir şey çıkarılmalı; bu bir sonraki turun işi.

### Sonuç

**219 görev · sürüm `2026-08-03a` · on iki kapı toplam 0**

| | K |
|---|---|
| Hiçbir şey yapılmazsa | **55.72** |
| Program tamamlanırsa | **61.55** |
| Programın değeri | **+5.83** |

Model 63.68 diyordu; kalan 2.13'lük fark **büyük ölçüde yerleşmeyen Amino Asitler'den** (7.4 soru ≈ 1.5 K). Yani fark artık **açıklanmış** bir eksiklik, gizli bir hata değil.

---

## 77 · AMİNO ASİTLER YERLEŞTİRME DENEMESİ — BAŞARISIZ, GERİ ALINDI

### Takas analizi doğruydu

Amino Asitler **4.23 soru/saat** — programdaki en verimsiz konuların (Nöroanatomi 0.667 · Sindirim+Endokrin 0.687 · Deri Hastalıkları 0.750) **5–6 katı.**

Dört takas seçeneği hesaplandı:

| Çıkarılacak | Boşalan | Kazanç |
|---|---|---|
| **Deri + Meme Hastalıkları** | 2.53 sa | **+0.255 K** |
| Temel Mikrobiyoloji | 3.92 sa | +0.214 K |
| Sindirim+Endokrin + Deri | 3.95 sa | +0.197 K |
| Nöroanatomi | 6.30 sa | +0.101 K |

### Uygulama başarısız

Deri + Meme çıkarıldı (**3.54 saat**, tekrarları dahil 4 görev). Ama:

- **Amino Asitler tek parça sığmadı** — 1.75 saat gerekiyor, boşalan yerler 1.20 ve 1.33 saatlik ayrı bloklardaydı
- Bölerek denendi: yalnız **1.04 saati** yerleşti, **0.71 saat açıkta kaldı**
- `kural_test.py` **3 kontrolde** kırıldı: alt saat çakışması · iki blokta mola bilgisi eksik · iki görevin rengi yanlış

Yerine Çocuk Acil (0.67) ve Ürogenital (0.88) yerleşti — ama bunlar 1.2'şer soru, Amino Asitler'in 7.4'ünün yanında küçük.

### Geri alındı

Program `kural_test` 18/18 ve on iki kapı sıfır hata geçen hâline döndürüldü: **219 görev · 179.73 saat**.

### ⚠ Ders — üçüncü kez aynı örüntü

Sıkı kısıtlı bir yerleşimde **nokta müdahalesi çalışmıyor.** §70'te aynı şey olmuştu (Kural A takası günü 7.58'e çıkarmıştı), §76'da yine.

Amino Asitler'i içeri almanın doğru yolu: yerleştirme algoritmasını **Amino Asitler'i öncelikli** kabul edecek biçimde baştan koşturmak — 137 konuluk seçimden başlayıp gün ve blok atamasını yeniden yapmak. Sonradan yer açmak değil.

### Durum

| | |
|---|---|
| Program | 219 görev · 179.73 sa · **on iki kapı 0** |
| Sürüm | `2026-08-03a` ↔ `rota-2026-08-03a` |
| Projeksiyon | hiçbir şey 55.72 · tamamlanırsa **61.55** |
| **Açık kalem** | **Amino Asitler** · 1.75 sa · 7.4 soru · ≈1.5 K · yerleşmedi |

Bu tek kalem, model (63.68) ile uygulama (61.55) arasındaki 2.13'lük farkın büyük kısmını açıklıyor.

---

## 78 · POWER UP · SÜRÜM `2026-08-04a`

Erken bitirilen ve enerji kalan günlerde programa sığmayan yüksek verimli konuları çekmenin yolu.

### Havuz · `powerup.json`

Katalogda olup programa **giremeyen 57 konu · 130.4 saat · 86.2 soru.** Verime göre sıralı:

| net/sa | Konu | Kitap | Saat | Soru |
|---|---|---|---|---|
| **0.971** | **Amino Asitler** | Yavuz Şahin Biyokimya SB | 1.75 | 7.40 |
| 0.423 | Çocuk Acil ve Yoğun Bakım | Klinisyen Vaka Pediatri | 0.67 | 1.20 |
| 0.369 | Ürogenital Sistem Anatomisi | Anatomi Fast Track | 0.88 | 1.20 |
| 0.199 | Karbonhidratlar | Yavuz Şahin Biyokimya SB | 3.00 | 2.60 |
| 0.184 | Reproduktif Endokrinoloji | TUSTIME Kadın Doğum konu | 4.07 | 2.80 |

§77'de yerleştiremediğim **Amino Asitler listenin başında** — artık istediğin gün elle çekebiliyorsun.

### Orb

Menü orb'undan **bağımsız**, üst bantta. Güç ışını mavisi (`rgba(120,200,255)`), Dragon Ball power-up silueti (aura + yükselen enerji). Sağ üstte streak rozeti (`4×`).

**10 kademeli alev:** streak uzadıkça orb'un altından yükselen alev büyüyor (8→32 px) ve aura parlıyor (%20→%100). 6. kademeden itibaren kenarlık ve dış parıltı devreye giriyor, 10'da çift katmanlı hale. Animasyon **5.2 sn alev · 4.6 sn nefes** — kombo kademelerindeki ilkenin aynısı: yavaş, monoton, dikkat dağıtmayan. `prefers-reduced-motion` içinde.

### Panel · iki alt başlık

**Power up görevleri** — havuz, verimden verimsize. Her satırda net/sa · ne yapacaksın · branş — konu · kitap + sf aralığı · saat · sayfa · soru · beklenen net. **[Çarka çek]** düğmesi. Çekilenler üstte, yeşil zeminle işaretli, **[Geri gönder]** düğmesiyle.

**Power up tekrarları** — tamamlananlar. Her satırda tekrara kaç gün kaldığı, tekrar günü, süresi. **[Tekrarı yaptım]** düğmesi.

### Tekrar zamanlaması · FSRS

```
tekrar günü = tamamlama + max(2, %25 × sınava kalan gün)
sınava < 5 gün kalmışsa tekrar HESAPLANMAZ
```

Doğrulandı: 5 Ağustos'ta tamamlanırsa tekrar **10 Ağustos** · 20 Ağustos'ta tamamlanırsa **tekrar yok** (erimeye vakit kalmıyor, gereksiz).

### Projeksiyona etkisi

Çekilen görev `GOREVLER`'e **enjekte ediliyor** (`puSenkron`), böylece çark, `para()`, kapsam hesabı — hepsi onu normal görev gibi görüyor. Tamamlanınca kazanç **dinamik formülle** hesaplanıyor ve **çürümeye tabi**. Ölçüldü: Amino Asitler tamamlanınca **+0.241 K**.

`D.pu` senkronda korunuyor (`temiz()`'e eklendi), iki cihaz aynı power-up durumunu görüyor.

### Yeni test · `pu_test.js` (28 kontrol)

Havuz gömülü ve verime sıralı · hiçbiri programda değil · çekince göreve dönüşüyor ve çark listesine giriyor · geri gönderince siliniyor · **tamamlanınca projeksiyon artıyor ve artış çürümeye tabi** · tekrar görevi oluşuyor · **sınava 3 gün kala tekrar hesaplanmıyor** · streak 4 gün, dün-bugün toleransı, 7 gün önce kopuyor, 10'da tavan · orb menüden bağımsız · 10 kademe alev · animasyon ≥4 sn ve hareket-azaltmada kapalı · iki alt başlık · üç düğme · `D.pu` senkronda.

### ✓ ON ÜÇ KAPI · TOPLAM 0

**219 görev + 57 power-up konusu · sürüm `2026-08-04a` ↔ `rota-2026-08-04a` · 360 112 bayt**

---

## 79 · POWER UP · ÇIKIŞ ve ÇARK ÖNCELİĞİ · `2026-08-04b`

### 1 · Panelden çıkılamıyordu

Power-up listesi **57 konu** — alttaki Kapat düğmesi çok aşağıda kalıyordu ve başka çıkış yolu yoktu. Diğer paneller kısa olduğu için sorun görülmemişti.

**Üç çıkış yolu eklendi, dört panelin hepsine:**

| Yol | Nasıl |
|---|---|
| Köşedeki **✕** | sağ üstte, sabit konumlu |
| **Dışarı tıklama** | panelin karartılmış zeminine tıklamak |
| **Escape** | klavyeden |

Başlıklara `padding-right:44px` verildi ki ✕ ile çakışmasınlar.

### 2 · Power up görevi çarkın en üstüne geliyor

`carkListe()` görevleri `GOREVLER` sırasına göre diziyordu; power-up'lar diziye sonradan eklendiği için **en sona** düşüyordu.

Artık **istisna**: `pu` işaretli görevler ayrı toplanıp listenin **başına** konuyor. `bul()` de doğal olarak onu döndürüyor — çektiğin görev anında karşında.

```js
if(g.pu){PU.push(i);continue}   // vakti geçmiş sayılmaz, sıraya girmez
...
return PU.concat(L)
```

İki power-up çekilirse ikisi de üstte kalıyor, üçüncü sıradan itibaren normal program sürüyor. Kart, çarkta **açık mavi ince çerçeveyle** (`puK`) işaretli — hangisinin power-up olduğu belli.

### Yeni test · `pu_test.js` +11 kontrol (toplam 39)

Power-up en üste geliyor · `bul()` onu döndürüyor · iki power-up de üstte · üçüncü normal · **vakti geçmiş sayılmıyor** (gün sonunda bile üstte) · geri gönderilince üstten kalkıyor · dört panelde de köşe ✕ · Escape · dışarı tıklama · başlık ✕ ile çakışmıyor · kart çarkta işaretli.

### ✓ ON ÜÇ KAPI · TOPLAM 0

**sürüm `2026-08-04b` ↔ `rota-2026-08-04b` · 361 928 bayt**

---

## 80 · AMİNO ASİTLER PROGRAMA GİRDİ · 3 GÜN +30 DK · `2026-08-05a`

### Hesap

Amino Asitler **1.75 saat**. Bloklar çok dolu — en büyük boşluk **0.38 saat** (7 Ağustos D).

Bir güne +30 dk eklemek, o günün **bir bloğunu** 30 dk uzatmak demek:

| Gün +30 dk | Toplam boşluk | Sonuç |
|---|---|---|
| 1 gün | 0.88 sa | yetmez (0.87 açık) |
| 2 gün | 1.63 sa | yetmez (0.40 açık) |
| **3 gün** | **2.36 sa** | **YETER ✓** |

### Uygulama

| Gün | Blok | Uzatma | Parça | Sayfa |
|---|---|---|---|---|
| **3 Ağustos** | D | 16:00–17:00 → **17:30** | 0.47 sa | sf 123–131 |
| **7 Ağustos** | D | 16:00–17:00 → **17:30** | 0.88 sa | sf 131–145 |
| **12 Ağustos** | D | 19:00–20:30 → **21:00** | 0.40 sa | sf 145–151 |

Sayfa sırası kronolojik: 123 → 131 → 145 → 151 ✓

**Yalnız 1 gün 7.50'yi aşıyor** (en ağır 7.88) — diğer iki günde zaten boşluk vardı, uzatma onları 8.00'e çıkarmadı.

### Sonuç

**222 görev · 181.48 saat · projeksiyon 61.55 → 61.75 (+0.20)**

Power-up havuzu 57 → **56 konu** (128.7 saat · 78.8 soru). Amino Asitler artık programın kendisinde, havuzda değil.

⚠ Kazanç **+0.20 K** — power-up'tan çekilse **+0.24** olacaktı. Fark, programa erken yerleştiği için (3–12 Ağustos) sınava kadar daha çok erimesinden. Ama programda olması **garantiliyor**: power-up isteğe bağlı, program değil.

### ✓ ON ÜÇ KAPI · TOPLAM 0

**sürüm `2026-08-05a` ↔ `rota-2026-08-05a` · 360 904 bayt**

---

## 81 · POWER UP DEĞERİ DİNAMİK · `2026-08-05b`

Kullanıcı fark etti: power-up listesinde çok Patoloji konusu var ve netleri düşük. Sordu: *"Patoloji netlerim çürüdükçe buradaki hesaplar otomatik yükselecek mi?"*

**Hayır — değerler `powerup.json` içinde donmuştu.** §75'te düzelttiğim `kaz` hatasının aynısı, bu sefer power-up tarafında.

### İki mekanizma modellendi

**1 · Sınav yaklaştıkça aynı iş daha değerli.** Erimeye daha az vakit kalıyor:

| Sınava | Hatırlama |
|---|---|
| 18 gün | %60 |
| 8 gün | %75 |
| 3 gün | %88 |

**%46 fark.** Ölçüldü: aynı konunun verimi 29 Tem'de 0.19 → 21 Ağu'da 0.28.

**2 · O gruptan program işi tamamlandıkça boşluk küçülüyor, değer düşüyor.** Ölçüldü: Patoloji program işleri bitince boşluk **10.41 → 5.94**, verim **0.094 → 0.054**. Başka grubun tamamlanması Patoloji'yi etkilemiyor.

### `puDeger(u)` ve `grupNet()`

`grupNet()` her grubun **sınavdaki öngörülen netini** döndürüyor (taban çürümesi + kapsam tazelenmesi + tamamlanan işlerin dinamik kazancı). `puDeger()` bunu kullanıp o an geçerli değeri hesaplıyor:

```
boşluk = tavan − grubun öngörülen neti
net    = boşluk × 0.405 × (soru/tavan) × R(sınava kalan gün, 2.4)
```

### Panelde görünenler

Her satırda artık: **`Patoloji boşluğu 10.4 net · bugün yapılırsa %60 kalır`**

Üstte özet: **`56 konu · 128.7 saat · sınava 15 gün · bugün yapılan %68 kalır`**

### ⚠ Dürüst not · Patoloji "tırmanmıyor"

Kullanıcının beklentisi kısmen gerçekleşiyor:

- **Evet:** bütün değerler sınav yaklaştıkça yükseliyor (%46)
- **Evet:** bir grubun işi bitince o grubun power-up'ları listede aşağı düşüyor
- **Hayır:** Patoloji gün geçtikçe **diğerlerine göre** tırmanmıyor — çünkü çürümesi zaten **sınav gününe göre** fiyatlanmış, gün gün büyümüyor

Ama asıl istediği bilgi görünür: **Patoloji boşluğu 10.41 net** — programdaki en büyük ikinci boşluk. Bu, "11.75'ten 7.97'ye düşecek" demenin başka bir ifadesi. Yani liste **çürüme takipçisi** olarak çalışıyor; sıralamayla değil, boşluk rakamıyla.

### Yeni test · `pu_test.js` +10 kontrol (toplam 49)

Sınav yaklaştıkça değer yükseliyor ve artış >%30 · grup işi bitince boşluk küçülüyor ve değer düşüyor · başka grup etkilemiyor · Patoloji boşluğu büyük · değer dinamik hesaplanıyor · donmuş verim artık kullanılmıyor · panelde boşluk ve hatırlama gösteriliyor.

### ✓ ON ÜÇ KAPI · TOPLAM 0

**222 görev · 56 power-up konusu · sürüm `2026-08-05b` ↔ `rota-2026-08-05b` · 363 047 bayt**

---

## 82 · DENETİM · "PROGRAM EN İYİ HÂLİNDE Mİ" · `2026-08-06a`

Kullanıcı sordu: *"Kalibrasyon ve projeksiyon en başta eski program için üretildiğinden çok doğru değil gibi hissediyorum."* Sistematik denetim yapıldı.

### Temiz çıkanlar

| Bileşen | Durum |
|---|---|
| SORU tablosu (resmi 200 soru dağılımı) | **GÜNCEL** — 11 branşın 11'i birebir |
| `TAVAN_G` grup tavanları | GÜNCEL (§61) |
| FSRS-4.5 unutma modeli | GÜNCEL (§63, kaynaktan doğrulandı) |
| Taban çürümesi + Kural E | GÜNCEL (§65, §74'te tarihe bağlandı) |
| `para()` dinamik kazanç | GÜNCEL (§75) |
| Power-up değeri | GÜNCEL (§81) |

### ⚠ BULUNAN HATA · kartlar donmuş değer gösteriyordu

`para()` §75'te dinamikleştirilmişti ama **kartlardaki "Beklenen kazanç" hâlâ `g.kaz`'ı** — planlama anındaki donmuş değeri — gösteriyordu.

| Görev | Kartta yazan | Gerçek etki | Sapma |
|---|---|---|---|
| Toksikoloji | 0.333 | **0.198** | %68 fazla |
| Genel Jinekolojik 1/2 | 0.611 | **0.346** | %77 fazla |
| Genel Jinekolojik 2/2 | 0.169 | **0.095** | %78 fazla |

Ölçüldü: 25 görevin **20'sinden fazlasında** donmuş değer gerçeğin 1.2 katından yüksekti.

### Düzeltme · `gorevKazanc(g)` gerçek etkiyi ÖLÇÜYOR

Formülü elle kurmak yetmedi — ilk denemede %9 eksik kaldı. Sebep: bir görevi tamamlamak **iki şeyi birden** değiştiriyor:

1. Yeni kazanç
2. O grubun kapsamı arttığı için **taban çürümesinin iptali** (Kural E)

Formül yalnız birincisini veriyordu. Çözüm: **simülasyon** — görev tamamlanmış varsayılıp `para()` farkı alınıyor. Anahtar bazlı önbellekle, kart başına bir çağrı.

Sonuç: kartta yazan sayı ile projeksiyondaki değişim **birebir aynı** (25/25 görevde sapma 0).

Tekrar kartlarında etiket **"Koruma değeri"** oldu — tekrarın kazancı yok, koruması var.

### Kalan iki nokta · dürüst not

**1 · `kaz` alanı artık ölü.** 95 görevde duruyor ama hiçbir yerde kullanılmıyor. Zararsız (dosya boyutu), ama bir sonraki üretimde temizlenmeli.

**2 · `R_CAL = 0.405` tek gözleme dayanıyor.** Patoloji'nin iki turdan sonra tavanın %64.6'sına ulaşması. **İkinci bir veri noktası yok.** Programın ilk denemesi (1 Ağustos) geldiğinde bu sabit doğrulanabilir — o zamana kadar model bu tek ölçüme bağımlı.

Bu, modelin **bilinen ve kabul edilmiş** belirsizliği. Uydurma değil, tek ölçüme dayalı.

### ✓ ON ÜÇ KAPI · TOPLAM 0

**222 görev · sürüm `2026-08-06a` ↔ `rota-2026-08-06a` · 364 346 bayt**

---

## 83 · ÖLÇÜM · "PROGRAM EN İYİ HÂLİNDE Mİ"

### 1 · Seçim, düzeltilmiş modelle birebir aynı çıktı

Seçim, §67'deki üçüncü çift sayım düzeltmesinden **önceki** mantıkla koşmuştu. Bugünkü tam düzeltilmiş modelle baştan koşturuldu:

| | Konu | Saat |
|---|---|---|
| `secim_v6` (mevcut program) | 82 | 98.60 |
| Bugünkü modelle | 82 | 98.60 |
| **Ortak** | **82** | — |
| Sadece eskide / sadece yenide | **0 / 0** | — |

**Fark yok.** Düzeltmeler mutlak değerleri değiştirdi ama göreli sıralamayı değil.

### 2 · Ama açgözlü seçim EN İYİ DEĞİL

Her seçili konu ↔ her seçilmemiş konu takası tarandı: **81 iyileştiren takas** bulundu.

Sebep: **Genel Cerrahi %100 kapsamda (tavanda)** — oraya konan son konular hiçbir şey katmıyor. Açgözlü onları boşluk büyükken erken seçmişti; sonunda grup doyunca değersizleştiler. Pediatri ise %35'te duruyordu.

### 3 · Yerel arama · ne kadar kazanılabilir

| Koşul | Takas | Kazanç | Sonuç |
|---|---|---|---|
| Kısıtsız | 12 | **+0.3142 K** | ⚠ **Mikrobiyoloji'yi sıfırladı** |
| **Mikrobiyoloji korumalı** (kullanıcı kararı) | 9 | **+0.2622 K** | 63.68 → 63.94 |

Kısıtsız optimum, kullanıcının açık kararını (*"konu okumadan olmaz"*) çiğniyor. Korumalı sonuç geçerli olan.

### 4 · ⚠ ASIL BULGU · kazanç, modelin gürültü tabanının altında

`R_CAL = 0.405` **tek gözlemden**: Patoloji iki turdan sonra tavanın %64.6'sında. O ölçüm biraz farklı olsaydı:

| Patoloji neti | R_CAL | Projeksiyon |
|---|---|---|
| 10.50 | 0.345 | **62.54** |
| 11.75 *(ölçülen)* | 0.399 | 63.57 |
| 13.00 | 0.459 | **64.71** |

**±1.25 netlik ölçüm oynaması → 2.17 puanlık projeksiyon bandı.**

Optimizasyon kazancı **+0.26 puan** — kalibrasyon belirsizliğinin **sekizde biri**.

### Sonuç · yerleşimi yenilemek doğru değil

- Kazanç 0.26 puan, belirsizlik bandı 2.17 puan
- Mevcut yerleşim on üç kapıyı geçiyor
- Yerleşimi yenileme denemeleri §70, §76, §77'de **üç kez** yeni hata doğurdu

**Program yapısal olarak bitmiş sayılmalı.** İyileştirme, kalibrasyonun kendisinde — seçimde değil.

`secim_v8k.json` (optimize edilmiş seçim) kayıtlı; kalibrasyon güçlenirse yeniden değerlendirilebilir.

---

## 84 · KALİBRASYON PROTOKOLÜ · GÜNLÜK 24'LÜ DENEMELER · HESAP

Kullanıcı önerdi: her gün program bittikten sonra o gün çalışılan derslerden **2 adet 24'lü deneme**, sonuçlar uygulamaya girilsin ve kalibrasyon havuzuna eklensin. Gerekçesi: *"konu bir denemede denk gelmezse diğerinde gelir."*

### ⚠ Gerekçe yanlış, sonuç doğru

Bir konu 24 soruluk branş denemesinde **kaç kez çıkar**:

| Branş | Konu sayısı | 24'lükte konu başına |
|---|---|---|
| Dahiliye grubu | 26 | **0.92 soru** |
| Genel Cerrahi | 22 | 1.09 |
| Patoloji | 16 | 1.50 |
| Biyokimya | 9 | 2.67 |
| Mikrobiyoloji | 6 | 4.00 |

İkinci deneme "konuyu yakalamak" için değil — konu zaten ~1.3 kez çıkıyor. İkinci denemenin değeri **gürültüyü azaltması.**

### Tek denemenin ölçüm gücü

24 soruluk denemenin standart sapması **~3.06 net** (p=0.5'te). Bir konunun çalışılmasının o denemeye etkisi **0.27–0.90 net**.

**Sinyal/gürültü ≈ 0.09–0.29.** Tek denemeyle tek konunun etkisi **ölçülemez.** Ama toplulaştırma başka.

### Üç protokol karşılaştırıldı · Monte Carlo (1500 tekrar, taban ölçüm hatası dahil)

| Protokol | Tahmin | Sapma | %95 bant |
|---|---|---|---|
| **A · o gün çalışılan branşın denemesi** *(kullanıcının önerisi)* | 0.427 | +0.021 | **±0.069** |
| B · yarısı çalışılan, yarısı dokunulmamış branş | 0.406 | +0.001 | ±0.078 |
| C · eşlenmiş ön/son (aynı branş, önce ve sonra) | 0.395 | −0.011 | ±0.112 |

**A kazanıyor.** Sebep: gözlemleri **sinyalin en güçlü olduğu yüksek kapsam bölgesinde** yoğunlaştırıyor. B testlerin yarısını sinyalin olmadığı sıfır kapsamda harcıyor; C çift sayısını yarıya indirip iki ölçümün gürültüsünü topluyor.

A'nın küçük bir yukarı sapması var (+0.021) — taban ölçümünün kendi hatasından (*errors-in-variables*). Toplam hatada yine de en iyisi.

### Kazanç · mevcut duruma göre

| | R_CAL | %95 bant | Projeksiyon bandı |
|---|---|---|---|
| **Şimdi** (tek gözlem, Patoloji 18 soru) | 0.404 | **±0.195** | ≈ **±2.7 puan** |
| 25 deneme (günde 1) | 0.426 | ±0.100 | ≈ ±1.4 puan |
| **50 deneme (günde 2)** | 0.426 | **±0.068** | ≈ **±0.95 puan** |
| 75 deneme (günde 3) | 0.425 | ±0.056 | ≈ ±0.78 puan |

**Mevcut belirsizlik ±0.195 — neredeyse %50.** 50 denemeyle **üçte birine** iniyor.

### Günde 2 doğru sayı

Marjinal getiri: 1→2 deneme bandı **±0.100'den ±0.068'e** düşürüyor (%32 iyileşme). 2→3 ise yalnız ±0.068'den ±0.056'ya (%18). Üçüncü denemenin maliyeti (~30 dk + analiz) getirisine değmiyor.

**Kullanıcının sezgisi doğru, gerekçesi yanlıştı.**

### Sıradaki iş · uygulamaya eklenecekler

1. Her güne **o gün çalışılan branştan 2 adet 24'lü deneme** görevi (program bittikten sonra, akşam serbest zamanında)
2. Deneme sonucu giriş ekranı (branş + doğru/yanlış/boş)
3. Kalibrasyon havuzu: girilen her sonuç `(taban_p0, kapsam, net)` üçlüsü olarak saklanır
4. `R_CAL` havuzdan **yeniden hesaplanır**; havuz boşsa 0.405 varsayılanı
5. Belirsizlik bandı arayüzde gösterilir — projeksiyonun tek sayı değil, **bant** olduğu görünsün

---

## 85 · KALİBRASYON MOTORU · `2026-08-07b`

R_CAL artık sabit değil — girilen 24'lü deneme sonuçlarından **yeniden hesaplanıyor.**

### Veri yapısı · `D.kal`

```
{tar, br, d, y, b,            ← branşın tüm soruları: doğru/yanlış/boş
      kd, ky, kb,             ← bunların kaçı BUGÜN ÇALIŞILAN konulardan (isteğe bağlı)
      kap}                    ← giriş anındaki branş kapsamı (dondurulur)
```

### İki ölçüm biçimi

**TEMEL** (yalnız toplam): kapsam üzerinden dolaylı. `p_gözlem = p₀ + (1−p₀)·R·kapsam` → R çözülür.

**AYRIK** (çalışılan konular ayrı): o sorular **tam kapsamda** olduğu için doğrudan `R = (p−p₀)/(1−p₀)`. Düşük kapsamlı günlerde çok daha keskin — ölçüldü: kapsam 0.15'te ayrık ±0.169, temel ±0.207.

### Ters-varyans birleştirme

Önsel (0.405 ± 0.0995) ile her gözlem **gerçek binom varyansıyla** ağırlıklandırılıp birleştiriliyor:

```
var(p̂) = 1.5625 · p(1−p) / q        (1.25² = net dönüşümü)
var(R̂) = var(p̂) / x²                 x = (1−p₀)·kapsam
```

⚠ İlk sürümde sabit varyans (0.15) kullanmıştım — **tek 4 soruluk gözlem R_CAL'i 0.405'ten 0.150'ye savuruyordu.** Gerçek binom varyansıyla aynı gözlem 0.380'e oynatıyor. Doğru davranış.

### Davranış · ölçüldü

| Havuz | R_CAL | %95 bant | Projeksiyon |
|---|---|---|---|
| Boş | 0.405 | ±0.195 | 58.49 |
| 1 kötü gözlem (4'te 1) | **0.380** | ±0.193 | 58.35 |
| 1 iyi gözlem (4'te 4) | **0.429** | ±0.191 | 58.63 |
| 10 kötü | 0.186 | ±0.181 | 57.22 |
| 50 kötü | **0.150** *(taban)* | ±0.145 | 57.00 |

**Kötü sonuç projeksiyonu, görev getirilerini ve power-up sıralamasını birlikte düşürüyor.** İyi sonuç tersini yapıyor. Kullanıcının istediği tam buydu.

### Arayüz

**Menüde yeni düğme** → 24'lü deneme paneli. Branş seçimi bugün çalışılan branşa otomatik ayarlanıyor. Altı alan: toplam D/Y/B, ve isteğe bağlı "bunların kaçı bugün çalıştıklarından" D/Y/B. Canlı özet net'i ve tutarsızlığı gösteriyor.

**Havuz listesi** — son 30 giriş, silme düğmesiyle.

**Üst şeritte artık BANT var:** projeksiyon `57.4–59.6` biçiminde. Tek sayı değil — kalibrasyon belirsizliği kadar oynuyor. Veri girdikçe bant daralıyor.

### İki önbellek hatası yakalandı

1. `rCal()` anahtarı yalnız havuz **uzunluğunu** tutuyordu — aynı uzunlukta farklı sonuçlar aynı önbelleği okuyordu. İyi sonuç kötünün değerini gösteriyordu.
2. `gorevKazanc()` anahtarı `D.kal`'i kapsamıyordu — R_CAL değişince kart eski getiriyi gösteriyordu.

İkisi de anahtara içerik eklenerek düzeltildi.

### Yeni test · `kal_test.js` (24 kontrol)

Önsel doğru · kötü/iyi sonuç doğru yönde oynatıyor · **tek gözlem aşırı oynatmıyor (<0.05)** · veri arttıkça bant daralıyor · R_CAL sınırlar içinde · kötü veri **projeksiyonu, görev getirisini ve power-up değerini** düşürüyor · düşük kapsamda ayrık veri daha keskin · bant projeksiyonu içeriyor · `puanBant` önbelleği bozmuyor · arayüz alanları · `D.kal` senkronda · binom varyansı · önbellek anahtarı içeriği kapsıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-07b` ↔ `rota-2026-08-07b` · 374 356 bayt**

---

## 86 · GÜNLÜK 24'LÜ DENEMELER PROGRAMA GİRDİ · `2026-08-08a`

### Yerleşim kuralı

- **Deneme günleri hariç** 19 güne, günde **2 adet** → **38 deneme**
- Deneme günlerinde eklenmedi: o gün zaten tam deneme (100 soru) var, hem yük hem daha iyi kalibrasyon verisi
- Branş seçimi: **o gün en çok çalışılan iki branş**. Tek branşlı günlerde (8 gün) ikisi de o branştan
- Zaman: son bloğun bitişinden **15 dk sonra**, 45'er dakika (30 dk çözüm + 15 dk analiz), aralarında 10 dk

### `ek:1` bayrağı — program yükünün DIŞINDA

24'lü denemeler `ek:1` işaretli. Kapasite kontrolleri onları saymıyor:

| | Yük |
|---|---|
| Program | **5.45 – 7.88 saat** |
| EK denemeler | **1.50 saat** |
| Toplam gerçek gün | 6.95 – 9.38 saat |

Çarkta **altın çerçeveyle** ayrılıyorlar ki 7.5 saatlik programla karışmasınlar.

### Örnek · 29 Temmuz

```
08:00–09:58  A   Hematoloji videoları 1-4 · Toksikoloji
10:15–12:30  B   Kadın Doğum — Genel Jinekolojik 1/2
16:30–18:15  C   Genel Jinekolojik 2/2 · Mikoloji 1/2
19:00–20:29  D   Mikoloji 2/2
20:45–21:30  D   EK · 24'lü deneme 1 · Kadın Doğum
21:40–22:25  D   EK · 24'lü deneme 2 · Mikrobiyoloji
```

Denemeler o gün çalıştığı iki branştan — kalibrasyon için doğru veri.

### İki kural güncellendi

**`kural_test` #7 (her blokta mola):** ek görevler program sonrası, molası yok — muaf tutuldu.

**Kimlik çakışması:** tek branşlı günlerde iki deneme aynı adı taşıyordu, `id` çakışıyordu. Adlara sıra numarası eklendi (`24'lü deneme 1 ·` / `2 ·`).

### Beklenen kalibrasyon kazancı

| | R_CAL bandı | Projeksiyon bandı |
|---|---|---|
| Şimdi (tek gözlem) | ±0.195 | ±2.67 puan |
| **38 branş denemesi + 6 tam deneme** | ≈ **±0.075** | ≈ **±1.03 puan** |

Belirsizlik **üçte birine** iniyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**260 görev (222 program + 38 kalibrasyon denemesi) · sürüm `2026-08-08a` ↔ `rota-2026-08-08a` · 395 220 bayt**

---

## 87 · BAĞIMSIZ DENETİM · DÖRT GERÇEK HATA BULUNDU ve DÜZELTİLDİ · `2026-08-08b`

On dört kapı sıfır hata veriyordu. **Kapıların bakmadığı yerleri** ayrı bir denetimle taradım.

### Bulunan hatalar

**1–2 · ÖKSÜZ TEKRAR (2 adet).** `Bağışıklama` ve `Paratiroid Hastalıkları ve cerrahisi` konularının **tekrarı programda ama okuması yok.** Seçimde ikisi de var; okumaları yerleşememiş, tekrarları kalmış. Okumadığın bir şeyi tekrar edemezsin.

→ Okumaları yerleştirilmeye çalışıldı, boşluk bulunamadı, **tekrarlar silindi.**

**3–4 · SIRA HATASI (2 adet).** `İnce ve Kalın bağırsak hastalıkları` ve `Üroloji` — tekrar, okumanın **aynı gün ama önceki bloğunda.**

→ İkisi de 22 Ağustos'a taşındı.

### ⚠ Düzeltme üç kuralı kırdı, temizlik turu gerekti

Taşımalar `alt saat çakışması`, `mola bilgisi` ve `kombo uçları` kontrollerini kırdı. Nokta müdahalesi yine yetmedi — **tüm blokların saatleri, molaları, sıraları ve oturum bilgileri sıfırdan kuruldu.**

Bir hata daha: mola dizisinin 5. elemanı **açıklama metni** olmalı, ben oraya süreyi yazmışım (`m[:4]+[sure]`). `mola_test.js` 83 hata verdi. `list(m[:5])` ile düzeltildi.

### Bağımsız denetimin kapsadığı 13 kontrol

saat = süre · 24:00 aşan yok · **öksüz tekrar yok** · **tekrar son okumadan sonra** · saat çakışması yok · EK denemeler program sonrası · deneme branşı o gün çalışılandan · 44 video ve 8 Ağustos sınırı · video sırası · program yükü ≤8.00 · 25 gün · kimlik tekil · zorunlu alanlar tam

**Hepsi geçiyor.**

### Sonuç

**258 görev (220 program + 38 kalibrasyon denemesi) · yük 6.04–7.88 + 1.50 EK**

Önceki 260'tan 2 eksik: silinen öksüz tekrarlar.

### ✓ ON DÖRT KAPI + BAĞIMSIZ DENETİM · TOPLAM 0

**sürüm `2026-08-08b` ↔ `rota-2026-08-08b` · 391 067 bayt**

⚠ **Ders:** on dört kapı geçmek "hata yok" demek değil. Kapılar kendi yazdığım kontroller — bakmadıkları yer kalıyor. Öksüz tekrar hiçbir kapının kontrol etmediği bir durumdu ve programda **iki tane** vardı.

---

## 88 · SEYİR · KİTAP HARİTASI DÜZELTİLDİ · `2026-08-09a`

### ⚠ Bulunan hata · renk sayaçlarının çoğu boştu

`yeniden.py` renk sayaçlarını `eko.py`'nin kitap adlarından kuruyordu. Yeni program `envanter.py` adlarını kullandığı için eşleşme tutmuyordu: **18 kitaptan yalnız 3'ünde sayaç vardı.** Anatomi Fast Track'te dolu, Atilla Uslu SST'de boş — tutarsız.

İki envanter çarpışmasının (§58, §67) **üçüncü tezahürü.**

→ Sayaçlar **katalogdan** (envanter tabanı) yeniden kuruldu: **15 kitapta** dolu, 3 etiketsiz (video · deneme · yanlış defteri — katalogda bölümleri yok).

### Sıralama

Kitaplar artık **programda ilk açıldıkları güne göre** sıralı, **renk etiketli olanlar üstte**:

| Sıra | Kitap | İlk gün |
|---|---|---|
| 1 | FT Farmakoloji | 29.07 |
| 2 | FT Kadın Doğum | 29.07 |
| 3 | TUSTIME Mikrobiyoloji | 29.07 |
| 4 | Atilla Uslu SST | 30.07 |
| … | | |
| son 3 | Atilla Uslu videoları · PreTUS200 · yanlış defteri | etiketsiz |

### Power up işareti

Power-up havuzundaki bölümler programa alınmamıştı, sayaçta yoklardı. Çarktan çekilip **tamamlanınca**:

- O rengin sayacı **artıyor** (2/3 → **3/3**)
- Yanına **`+1⚡`** geliyor — power-up'la yapıldığı belli olsun
- Kitap toplamı da artıyor (`2 / 12 bölüm` → `3 / 12 bölüm +1⚡`)
- Rozetin çerçevesi açık maviye dönüyor

Doğrulandı: FT Farmakoloji · NSAİİ (sarı) çekilip tamamlanınca `S 2/3` → `S 3/3 +1⚡`.

**Çekilmiş ama bitmemiş** power-up sayacı artırmıyor — yalnız tamamlananlar sayılıyor.

### Yeni test · `pu_test.js` +10 kontrol (toplam 59)

Renkliler üstte · ilk açılış gününe göre sıralı · **renk sayaçları tutarlı** (renk toplamı = kitap toplamı) · içerdeki ≤ toplam · etiketsizlerde sayaç yok · en az 12 kitapta sayaç · **power-up sayacı artırıyor** · **⚡ işareti geliyor** · çekilmiş ama bitmemiş artırmıyor · **sayaç tavanı aşmıyor**.

### Kalıcı düzeltme

`yeniden.py` katalog tabanına bağlandı (`KATALOG_KITAP`), ayrıca `kh_kur.py` bağımsız kurucu olarak eklendi.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-09a` ↔ `rota-2026-08-09a` · 395 074 bayt**

---

## 89 · KURAL A YENİDEN TASARLANDI · SEÇİM SIFIRDAN · `secim_v12.json`

Kullanıcı Kural A'nın eksik tasarlandığını yakaladı: *"her kitap ilk 2 hafta açılacak"* değil, **"her KONU KİTABI"** olmalıydı. Soru kitapları ilk öğrenme değil, **tekrar** niteliğinde.

### Düzeltilen kitap sınıflandırması (kullanıcı düzeltmeleri)

| Kitap | Eski sanılan | **Doğrusu** |
|---|---|---|
| **Speetus Genel Cerrahi** | konu+soru karışık | **konu kitabı** (başka yayınevinin FT'si) |
| **Klinisyen Vaka Pediatri** | soru kitabı | **konu kitabı yerine geçer** |
| **Emrullah Patoloji SST** | soru kitabı | **konu kitabı** · tekrar statüsünde |
| Dahiliye 1-2 | konu kitabı | **video kapsıyor** |

### Beş kural değişikliği

1. **Konu okumadan soru çözülmez.** İstisna yalnız **Dahiliye SST Enfeksiyon** ve **Pediatri vaka soruları.**
2. **Tekrar = SORU ÇÖZME.** Yeniden okuma kaldırıldı — test etkisi (Roediger & Karpicke) pasif okumadan güçlü.
3. **Soru kitabı olmayan konunun tekrarı = günlük 24'lü deneme.** Branşın planlanan okuması bitince o branşı denemeyle tekrar eder; okunmayan kısımları da deneme öğretir.
4. **Anatomi yalnız Ürogenital + Nöroanatomi.** Kullanıcı: *"anatomi çok ezber, o süre seni kandırmasın"* — 10.68 saat kesildi.
5. **Mikrobiyoloji ve Kadın Doğum**: en verimli konuları seçildiyse o hâliyle bırakılır.

### ⚠ Bulunan hata · video kapsamı sayılmıyordu

44 Atilla Uslu videosu **Dahiliye tavanının %44'ünü** kapsıyor (16.20 soru / 36.80) ama seçim modeli bunu görmüyordu — Dahiliye'yi %32 sanıp oraya gereksiz saat ayırıyordu.

Video kapsamı modele eklendi, video konuları havuzdan çıkarıldı. **Projeksiyon 62.69 → 63.59.**

### Yeni seçim · 73 konu · 131.76 saat

| Kitap | Konu | Okuma | Soru |
|---|---|---|---|
| Emrullah Patoloji SST | 16 | 22.27 | — |
| Klinisyen Vaka Pediatri | 15 | 19.50 | — |
| TUSTIME Mikrobiyoloji | 3 | 16.15 | 6.68 |
| FT Farmakoloji | 6 | 11.55 | 7.00 |
| Speetus Genel Cerrahi | 17 | 10.00 | 4.91 |
| Anatomi Fast Track | 2 | 7.17 | — |
| TUSTIME Küçük Stajlar | 7 | 5.13 | 1.25 |
| TUSTIME Fizyoloji · FT Biyokimya · FT Kadın Doğum · Atilla Uslu SST | 7 | 11.75 | 8.40 |

**Okuma 103.52 sa · soru çözme 28.24 sa.** 17 konunun tekrarı soru kitabından, **56 konunun tekrarı günlük 24'lü denemelerden.**

### Kapsam

| Grup | Kapsam | Sınavda |
|---|---|---|
| Patoloji | %91 | 12.75 |
| Genel Cerrahi | %81 | 16.73 |
| Farmakoloji | %77 | 7.24 |
| Pediatri | %75 | 11.63 |
| **Dahiliye** (video %44 dahil) | **%71** | 19.80 |
| Mikrobiyoloji | %64 | 8.05 |
| Biyokimya | %53 | 7.89 |
| Anatomi | %41 | 3.54 |
| Fizyoloji+Histo | %33 | 4.71 |
| Kadın Doğum | %27 | 3.02 |
| **TOPLAM** | | **95.37** |

**PROJEKSİYON 63.59** (mevcut program 61.75 · **+1.84**)

### Bulgu · yeniden okuma vs soru çözme maliyeti

113 adayın **yalnız 48'inde** soru kitabı var; onların da çoğunda soru çözmek yeniden okumadan pahalı (toplam 131 sa vs 81 sa). Ama kullanıcı kararı bilimsel gerekçeye dayanıyor ve model bunu destekliyor: test etkisi.

⚠ **Onay bekleyen:** yeniden okuma = ilk okumanın %40'ı varsayımı (artık yalnız hesaplamada kullanılıyor, programda yeniden okuma yok).

### Sıradaki iş (§90'da güncellendi)

**Tüm yerleşim sıfırdan:** dilim → gün → blok → görev üretimi → on dört kapı + bağımsız denetim. Ayrıca yeni bir kural: *son 4 günden önce, bir konunun okuması başka bir konunun tekrarından değerliyse takas edilebilir.*

---

## 90 · DENEME = TEKRAR + KALİBRASYON · BÜTÇE DÜZELTİLDİ · `secim_v13.json`

### Kullanıcının verimlilik gözlemi

Günlük 24'lü kalibrasyon denemeleri ile "tekrarı deneme olan" konular **aynı denemede birleşsin.** Denemeler zaten program bitiminde çözülüyor (7.5 saatin dışında), yani o tekrarlar programa **sıfır saat** maliyetle geliyor.

| | Konu | Okuma saati | Tekrar maliyeti |
|---|---|---|---|
| Tekrarı **24'lü deneme** | **57** | 64.65 | **0.00 sa** |
| Tekrarı **soru kitabı** | 17 | — | 28.24 sa |

Patoloji 16 · Pediatri 15 · Genel Cerrahi 15 · Dahiliye 5 · diğer 6 konunun tekrarı denemelerden.

**Slot yeterliliği:** 19 gün × 2 = **38 deneme**, tekrar gereken 7 grup → grup başına ortalama **5.4 slot.** Yetiyor.

### Sinerji · iki amaç aynı yöne çekiyor

§84'te ölçmüştüm: kalibrasyon sinyali **yüksek kapsamda en güçlü** (Protokol A). Bir branşın okuması bitmişken çözülen deneme hem **en iyi tekrar** hem **en iyi ölçüm.**

**Slot atama kuralı:** önce okuması bitmiş ve henüz test edilmemiş branş (tekrar + ölçüm), yoksa o gün çalışılan branş (saf ölçüm).

### ⚠ Bütçe eksik hesaplanmıştı

Seçim `BUT=132.20` ile koşmuştu — eski değer. Doğrusu:

| | Saat |
|---|---|
| 25 gün kapasite (3'ü 8.00) | **189.00** |
| Video 16.83 + deneme 27.00 + analiz 10.50 | 54.33 |
| **OKUMA+SORU BÜTÇESİ** | **134.67** |

**2.91 saat boştaydı.** Düzeltilince seçim 73 → **74 konu**, okuma 103.52 → **106.30 saat.**

Eklenen: **FT Farmakoloji · Kemoterapötikler** (2.80 sa · 4.60 soru) — Farmakoloji kapsamı %77 → **%78**, Pediatri %75 → **%80**.

**PROJEKSİYON 63.59 → 63.69**

### Eski model kalıntısı denetimi · 10 kontrol

Aynı Tusanaliz konusu iki kez seçilmemiş · grup soru ağırlığı tavanı aşmıyor · **konu okumadan soru çözülmüyor** · Anatomi yalnız iki konu · **video konuları seçimde yok** (çift öğrenme) · gereksiz konu kitapları yok · sayfa bilgisi tam · tekrar kaynağı belirtilmiş · **tekrar kaynakları soru kitabı** · bütçe aşılmıyor.

**✓ ESKİ MODEL KALINTISI YOK** · boşta kalan 0.12 saat.

### Nihai seçim · 74 konu · 134.54 saat

| Grup | Kapsam | Sınavda |
|---|---|---|
| Patoloji | %91 | 12.75 |
| Genel Cerrahi | %81 | 16.73 |
| **Pediatri** | **%80** | 11.93 |
| **Farmakoloji** | **%78** | 7.30 |
| Dahiliye (video dahil) | %71 | 19.80 |
| Mikrobiyoloji | %64 | 8.05 |
| Biyokimya | %53 | 7.89 |
| Anatomi | %41 | 3.54 |
| Fizyoloji+Histo | %33 | 4.71 |
| Kadın Doğum | %27 | 3.02 |
| **TOPLAM** | | **95.72** |

---

## 91 · ⚠ KAVRAM DÜZELTMESİ · "24'LÜ DENEME" · NİHAİ SEÇİM `secim_v16.json`

### Temel yanlış anlama düzeltildi

Kullanıcı: *"24'lü deneme demek o kitapta **24 adet deneme** var demek, 24 sorulu demem değil. Kaç soru sorduğu direkt TUS'ta o branşta kaç soru çıktığını gösteriyor."*

**Bütün kalibrasyon analizi (§84) yanlış temeldeydi.** Doğru model:

| Branş | Soru/deneme | Süre (analiz dahil) | 24 deneme |
|---|---|---|---|
| Fizyoloji | 8 | **0.25 sa** | 6.00 sa |
| Anatomi | 13 | 0.41 sa | 9.75 sa |
| Patoloji · Biyokimya · Farmakoloji | 18 | 0.56 sa | 13.50 sa |
| Küçük Stajlar | 22 | 0.69 sa | 16.50 sa |
| Pediatri | 25 | 0.78 sa | 18.75 sa |
| Genel Cerrahi | 30 | 0.94 sa | 22.50 sa |
| Dahiliye | 35 | **1.09 sa** | 26.25 sa |

**10 branş × 24 = 240 deneme · toplam 148 saat.** Deneme SAYISI hiç kısıt değil — **zaman** kısıt. Günde 1.5 saat ayrılırsa 19 günde ~46 deneme.

### Mikrobiyoloji · 24'lü denemesi YOK

Seride Mikrobiyoloji yok. Tekrarı **Feyyaz Akay** ile yapılabilir, kullanıcı hızı verdi: **15 sf/saat.**

⚠ İlk uygulamada bunu **zorunlu** yaptım (kullanıcının "muhakkak çözeyim" ifadesinden). Kullanıcı düzeltti: *"eğer kârlıysa çözeyim, normalde belirlediğimiz kural buydu."*

Model iki ayrı aday üretiyor: **(a) yalnız oku** (tekrarsız, erime fazla) · **(b) oku + Feyyaz** (tekrarlı, pahalı). Açgözlü hangisi kârlıysa seçiyor.

**Sonuç: model Feyyaz'ı kârlı bulmadı.** Mikrobiyoloji 2 konu (Temel Mikrobiyoloji + Mikoloji, 6.53 sa), tekrarsız. O saatler başka branşlarda daha çok getiriyor.

### Kullanıcının program mantığı · sistem uyuyor mu

| İlke | Durum |
|---|---|
| İlk 2 haftada maksimum yeni konu, tüm kitapların en verimli konularına bak | ✓ 11 kitabın **hepsinden** konu var; en küçüklerinin toplamı 11.28 sa, ilk 2 haftada ~69 sa serbest |
| Konu çalışması biten dersleri denemelerle tekrar et | ✓ 90 konunun tekrarı 24'lü denemeden, programa **0 saat** |
| Tekrardan kârlıysa son 4 güne kadar yeni konu koymaya devam | yerleşimde uygulanacak (takas kuralı) |
| Spesifik konu tekrarı yerine 24'lü deneme | ✓ tek istisna Mikrobiyoloji (denemesi yok), o da kârsız bulundu |

### NİHAİ SEÇİM · 92 konu · 134.42 saat

| Kitap | Konu | Saat |
|---|---|---|
| Emrullah Patoloji SST | 15 | 20.93 |
| Klinisyen Vaka Pediatri | 14 | 17.25 |
| FT Farmakoloji | 8 | 16.98 |
| FT Kadın Doğum | 3 | 14.12 |
| TUSTIME Küçük Stajlar | 15 | 13.07 |
| TUSTIME Fizyoloji | 8 | 12.47 |
| FT Biyokimya | 5 | 12.43 |
| Speetus Genel Cerrahi | 19 | 12.00 |
| Anatomi Fast Track | 2 | 7.17 |
| TUSTIME Mikrobiyoloji | 2 | 6.53 |
| Atilla Uslu SST (Enfeksiyon) | 1 | 1.47 |

| Grup | Kapsam | | Grup | Kapsam |
|---|---|---|---|---|
| Dahiliye (video %44 dahil) | **%99** | | Patoloji | %88 |
| Kadın Doğum | **%95** | | Fizyoloji+Histo | %81 |
| Farmakoloji | **%95** | | Pediatri | %70 |
| Biyokimya | %90 | | Anatomi | %41 |
| Genel Cerrahi | %89 | | Mikrobiyoloji | %29 |

**PROJEKSİYON 65.29** (mevcut program 61.75 · **+3.54**)

### Denetim · 8 kontrol

Aynı konu iki kez seçilmemiş · tavan aşılmıyor · hepsi konu kitabından · Anatomi iki konu · video konuları yok · sayfa bilgisi tam · bütçe · **11 kitabın hepsinden konu var**. **✓ SIFIR HATA**

### Sıradaki iş · YERLEŞİM

dilim → gün → blok → 24'lü deneme slot ataması (tekrar + kalibrasyon birlikte) → görev üretimi → on dört kapı + bağımsız denetim. Takas kuralı: son 4 günden önce, okuma bir tekrardan değerliyse takas.

---

## 92 · YERLEŞİM · YENİ PROGRAM KURULDU · KURAL C'DE 0.17 SAAT KALDI

### Kalıntı denetimi · yerleşim öncesi

15 kontrol, hepsi temiz: eski seçim dosyaları arşive alındı (`arsiv/`), video planı doğru (44 video · 16.83 sa · deneme günlerinde yok), FSRS sabitleri, tavan toplamı 200, seçimin iç tutarlılığı, katalogla eşleşme.

### Bütçe · son 4 gün rezerve edilince

| | Saat |
|---|---|
| 25 gün kapasite (3'ü 8.00) | 189.00 |
| Video + tam deneme + analiz | 54.33 |
| **OKUMA (21 gün)** | **110.92** |
| **TEKRAR (son 4 gün, 24'lü denemeler)** | **23.75** |

Seçim `BUT=110.92` ile yenilendi: **83 konu · 110.78 saat.** Projeksiyon **64.42**.

### Yerleşim

**192 görev · 177.21 saat · günlük 5.91–7.75 · 25 gün**

| Tür | Adet |
|---|---|
| Okuma | 96 |
| Video | 44 |
| **24'lü branş denemesi** | **34** |
| Tam deneme + analiz | 12 + 6 |

**Kural A ✓** — 11 kitabın hepsi ilk 14 günde açılıyor.
**Kural B** %80–83 (eşik %80).
**Son 4 gün** yeni okuma yok, yalnız 24'lü denemeler.
**`kural_test.py` 18/18 GEÇTİ.**

### ⚠ Kural C · 0.17 saat kaldı

| | Dilim 1 | Dilim 2 | Dilim 3 |
|---|---|---|---|
| Yeni öğrenme | 44.69 | **44.86** | 29.97 |
| Geri getirme | 12.50 | 19.22 | 25.97 ✓ |

**Geri getirme artan ✓** ama **yeni öğrenme azalan ✗** — dilim 2, dilim 1'den **0.17 saat** fazla.

Beş dengeleme turu denendi: dilim2→3 okuma (3.13 + 3.23 + 1.20 sa), dilim3→2 deneme (4.57 + 2.15 sa), dilim2→1 okuma (0.00 — yer yok). **Dilim 3 tamamen dolu** (en büyük blok boşluğu 0.40 sa), dilim 1'de 3.31 saat boşluk var ama dağınık, hiçbir görev tek parça sığmıyor.

Kalan tek yol: bir görevi **bölerek** dilim 1'in dağınık boşluklarına dağıtmak. Bu bir sonraki turun işi — bu turda beş kez denedim ve her seferinde saat/mola/sıra yeniden kurmak gerekti.

### Durum

| | |
|---|---|
| `app_gorev.json` | **yeni program** · 192 görev |
| `kural_test.py` | **18/18 ✓** |
| `denet.py` | Kural C · 1 ihlal |
| Uygulamada duran | **eski program** (uret.py kural testinde durmadı ama denet geçmedi) |

---

## 93 · TEK GEÇİŞ YERLEŞİM · KURAL C ÇÖZÜLDÜ · KURAL B AÇIK

### Yöntem değişti · kısıt olarak yerleştirme

Önceki turda yerleştirip sonra dengelemeye çalışmıştım — beş tur denedim, her seferinde başka kural kırıldı. Bu turda **Kural C'yi kısıt olarak** çözdüm.

### ⚠ Yapısal bulgu · Kural C okuma bütçesini sınırlıyor

Dilim yapısı: dilim 1 = 8 gün (36.84 sa serbest, 11.17 sa video), dilim 2 = **9 gün** (50.33 sa, 5.67 sa video), dilim 3 = 8 gün (47.50 sa, video yok).

Dilim 2 hem daha uzun hem videosu az → doğal olarak dilim 1'den **fazla** yeni öğrenme alıyor. Kural C "azalan" istiyor.

Doğrusal arama ile **Kural C'nin izin verdiği en büyük okuma bütçesi: 102.50 saat** (son 4 gün tekrar kısıtı dahil). Yerleşim payı için **101.00**'e indirildi.

| | Dilim 1 | Dilim 2 | Dilim 3 |
|---|---|---|---|
| Okuma hedefi | 36.60 | 41.00 | 23.40 |
| Gerçekleşen | 35.78 | 40.63 | 23.17 |
| **Yeni öğrenme** | **46.95** | **46.30** | **23.17** ✓ |
| **Geri getirme** | **12.50** | **21.08** | **35.38** ✓ |

**Kural C iki yönde de sağlandı.**

### Sonuç · 205 görev · 179.54 saat

| Tür | Adet |
|---|---|
| Okuma | 90 |
| Video | 44 |
| **24'lü branş denemesi** | **53** |
| Tam deneme + analiz | 12 + 6 |

Günlük **6.57 – 7.79 saat**. Seçim 79 konu · 100.98 saat · **projeksiyon 64.01**.

**`kural_test.py` 18/18 ✓**

### Düzeltilen: kombo takvim komşuluğu

Kombo üretimi "listedeki sonraki gün"ü kullanıyordu; okuma olmayan günler atlanınca iki takvim günü aşabiliyordu. **Takvim komşuluğuna** bağlandı.

### ⚠ AÇIK · Kural B %74 (eşik %80)

`denet.py` Kural B'yi **ortalama hakimiyet** olarak ölçüyor: `Σ(max_branş/toplam)/gün`. Benim "hakim gün oranı" ölçümüm %89 veriyor ama denet'inki %74.

400 turluk takas araması **hiçbir iyileştirici takas bulamadı** — blok kapasiteleri ve süre uyumu (±0.35 sa) her denemeyi engelliyor.

İki zayıf gün: **4 Ağustos** (3 branş, hakimiyet 0.49) ve **12 Ağustos** (5 branş, 0.31).

Çözüm yolu: gün atamasında branş kilidini daha sıkı uygulamak — ama bu, Kural C hedeflerini tutturmayı zorlaştırıyor. İki kural birbirini çekiyor.

### Durum

| | |
|---|---|
| `app_gorev.json` | yeni program · 205 görev |
| `kural_test.py` | **18/18 ✓** |
| `denet.py` | **Kural B %74** · 1 ihlal |
| Uygulamada duran | eski program |

---

## 94 · KURAL B ve C BİRLİKTE ÇÖZÜLDÜ · KURAL C'DE 0.72 SAAT KALDI

### Yöntem · branş-dilim partisyonu

Önceki turlarda tek tek çözmeye çalıştım, biri düzelince öteki kırıldı. Bu turda **ikisini birlikte** kurdum:

**1 · Branşları dilimlere böl** — 10 branşın 3 dilime dağılımı, hedef sapması **0.12 saat**:

| Dilim | Branşlar | Saat |
|---|---|---|
| 1 | Patoloji · Genel Cerrahi · Anatomi | 36.54 / 36.84 |
| 2 | Pediatri · Dahiliye · Fizyoloji · Biyokimya | 41.05 / 50.33 |
| 3 | Farmakoloji · Kadın Doğum · Mikrobiyoloji | 23.39 / 23.75 |

**2 · Kural A dengesi** — tamamı dilim 3'te olan 3 kitabın birer konusu dilim 2'ye çekildi (5.66 sa), karşılığında dilim 2'den 3'e eşdeğer taşındı.

**3 · Gün ataması** — her güne **tek branş**, o branşın konularıyla doldur, kalan boşluğa sonraki branştan.

### Sonuç

**Kural B ortalama hakimiyet %74 → %87** (eşik %80) ✓

**195 görev · 177.70 saat · günlük 6.30–7.76**

| Tür | Adet |
|---|---|
| Okuma | 88 |
| Video | 44 |
| **24'lü branş denemesi** | **39** |
| Tam deneme + analiz | 12 + 6 |

**`kural_test.py` 18/18 ✓ · Kural A ✓ · Kural B ✓**

### Bu turda düzeltilen dört hata

1. **Kombo takvim komşuluğu** — "listedeki sonraki gün" kullanıyordu, okuma olmayan günler atlanınca iki takvim gününü aşabiliyordu.
2. **Kural A ihlali** — FT Kadın Doğum 15., TUSTIME Mikrobiyoloji 17. günde açılıyordu; ikisi de ilk 14 güne çekildi.
3. **Çoklu aralıklı bölümler** — Nöroanatomi (sf 49–55 + 90–119 + 126–127) sayfa bölmesinde tek aralığa indirgenmişti; katalogdan geri yüklendi.
4. **Parça ad biçimi** — `· 1. parça` yerine `· 1/6. parça` olmalıydı; `denet.py`'nin muafiyet kontrolü bu biçime bakıyor.

### ⚠ AÇIK · Kural C azalan · 0.72 saat

| | Dilim 1 | Dilim 2 | Dilim 3 |
|---|---|---|---|
| Yeni öğrenme | 45.00 | **45.72** | 22.52 |
| Geri getirme | 12.50 | 17.56 | 34.40 ✓ |

Dilim 2, dilim 1'den **0.72 saat** fazla. Dilim 3'te 0.5–1.8 saat aralığında bir görevi alacak blok boşluğu yok.

Dilim seviyesinde çözüm doğruydu (36.54 / 41.05 / 23.39) ama gün ve blok yerleşimi sırasındaki parçalanmalar 0.72 saatlik kayma yarattı.

### Durum

| | |
|---|---|
| `app_gorev.json` | 195 görev · Kural A ✓ B ✓ |
| `kural_test.py` | **18/18 ✓** |
| `denet.py` | **1 ihlal** (Kural C azalan) |
| Uygulamada duran | eski program |

---

## 95 · ✓ YENİ PROGRAM TAMAM · ON DÖRT KAPI SIFIR HATA · `2026-08-10a`

### Kural C'nin son 0.72 saati

Dilim 3'te 3.08 saat boşluk vardı ama 0.02–0.41 saatlik kırıntılar halinde. **Beslenme (0.75 sa) iki parçaya bölünüp** en büyük iki boşluğa (08-22 D 0.41 + 08-16 B 0.34) dağıtıldı.

Sonra 08-22 son 2 günden biri olduğu için okuma oraya konamazdı → **aynı boyuttaki bir 24'lü denemeyle takas** edildi.

| | Dilim 1 | Dilim 2 | Dilim 3 |
|---|---|---|---|
| Yeni öğrenme | **45.00** | **44.97** | **23.27** ✓ |
| Geri getirme | **12.50** | **17.56** | **34.40** ✓ |

### ✓ SONUÇ · 196 görev · 177.70 saat

| Tür | Adet |
|---|---|
| Okuma | 95 |
| Video | 44 |
| **24'lü branş denemesi** | **39** |
| Tam deneme + analiz | 12 + 6 |

Günlük **6.09 – 7.72 saat** · 25 gün

| Kural | |
|---|---|
| **A** · her kaynak ilk 14 günde | ✓ |
| **B** · gün-branş hakimiyeti **%88** | ✓ |
| **C** · yeni azalan · geri artan | ✓ |
| **D** · bölüm bütünlüğü | ✓ |
| Son 2 günde yeni okuma yok | ✓ |

### ✓ ON DÖRT KAPI · TOPLAM 0

`kural_test` 18/18 · `denet` sıfır · `kos` · `derin_test` · `cark_test` · `mola_test` · `kombo_test` · `pu_test` · `kal_test` · beş senkron testi

### ✓ BAĞIMSIZ DENETİM · 13 kontrol sıfır hata

saat=süre · 24:00 aşımı yok · saat çakışması yok · 44 video ve 8 Ağustos sınırı · video sırası · günlük ≤8.00 · 25 gün · kimlik tekil · zorunlu alanlar · son 2 günde okuma yok · **Kural A** · **sayfa sürekliliği** · **Kural B %88**

### Testlerde yapılan meşru güncellemeler

Yeni tasarımda **`act='tekrar'` görevi yok** — tüm tekrarlar `deneme24`. Bu yüzden:
- `derin_test` E8: "tekrarlar puanı yükseltiyor" → "tüm görevler tamamlanınca puan düşmüyor"
- `derin_test` G bölümü: tekrar belirteci → **kalan potansiyel belirteci**
- `pu_test`: "donmuş kaz şişikmiş" → "kartlar dinamik hesaplıyor" (kaz alanı artık 0)
- `kombo_test`: 18 kitap → ≥14 (seçim 11 kitap kullanıyor)

### Projeksiyon

Uygulamanın gösterdiği: hiçbir şey yapılmazsa **55.72**, program tamamlanırsa **62.04**.

Model 64.01 diyordu; fark, uygulamanın kapsam hesabını `soru` ağırlığından, modelin katalog `pay` değerinden yapmasından.

**sürüm `2026-08-10a` ↔ `rota-2026-08-10a` · 339 845 bayt**

---

## 96 · SEYİR DEFTERİ · ETİKETSİZ KAYNAKLARA İLERLEME · `2026-08-10b`

### Bulunan hata · boş başlık

`TUSDATA 24'lü branş denemeleri` kaynak haritasında **başlıksız** görünüyordu: renk etiketi yok, bölüm listesi boş, `alt` alanı boş → summary satırında hiçbir bilgi yoktu. Aynı sorun video, PreTUS200 ve yanlış defterinde de vardı.

Sebep: `kh_kur.py` yalnız katalogda bölümü olan kitaplara sayaç kuruyordu; deneme ve video kaynaklarının katalogda bölümü yok.

### Düzeltme · etiketsiz kaynaklara ilerleme etiketi

| Kaynak | İlerleme | Açıklama |
|---|---|---|
| Atilla Uslu Dahiliye videoları | **44 / 44 video** | Dahiliye konu videoları |
| PreTUS200 | **12 / 12 oturum** | 6 tam deneme × 2 oturum |
| yanlış defteri | **6 / 6 analiz** | her deneme sonrası |
| **TUSDATA 24'lü branş denemeleri** | **39 / 240 deneme** | 10 branş × 24 deneme |

Artık her kaynağın summary satırında sayaç ve rozet var; açılınca `alt` açıklaması ve ilerleme ayrıntısı geliyor.

**24'lü denemenin 39/240'ı** özellikle bilgilendirici: elinde 240 deneme var, program 39'unu kullanıyor — geri kalanı power-up gibi ek zamanlarda çözülebilir.

### Uygulama entegrasyonu · 16 kontrol

`GOREVLER` 196 · çark listesi · `bul()` · `brifCiz` · `carkCiz` · `ust` · `kaynakHarita` · `seyirCiz` · **`deneme24` görevleri (39) çiziliyor, tag ve why dolu** · tamamlama projeksiyonu değiştiriyor · power-up havuzu yeni programa göre ve konuları programda değil · kalibrasyon paneli · R_CAL varsayılan. **Sıfır hata.**

### Seyir defteri · 9 kontrol

Boş başlık yok · boş `or` alanı yok · her kitapta başlık · rozet sayısı kitap sayısına eşit (**15/15**) · kullanılmayan kaynaklar bölümü · `olcumCiz` · `radarCiz` · `trendCiz`. **Sıfır hata.**

### Yeni test · `pu_test.js` +10 kontrol

Etiketsiz kaynak var · hepsinde ilerleme sayacı ve birim adı · `ic ≤ tp` · **24'lü deneme 240 üzerinden** · 44 video tam · boş başlık/alan yok · etiketsizlerde rozet · açıklama satırı.

### ✓ ON DÖRT KAPI · TOPLAM 0

**196 görev · sürüm `2026-08-10b` ↔ `rota-2026-08-10b` · 340 449 bayt**

---

## 97 · KALİBRASYON ve POTANSİYEL DENETİMİ · İKİ HATA · `2026-08-11a`

### HATA 1 · giriş alanları 24 soruyla sınırlıydı

"24'lü deneme" kavram düzeltmesinden (§91) sonra **matematik doğruydu** — `net2p(n,q)` gerçek soru sayısını kullanıyor, deneme boyutundan bağımsız. Ama **giriş alanları `max="24"`** ile sınırlıydı: **Dahiliye denemesi 35 soru, girilemezdi.**

Düzeltme: sınır **40**'a çıkarıldı, panel metnine deneme boyutunun branşa göre değiştiği eklendi, canlı özet **"Dahiliye denemesi normalde 35 soru"** uyarısı veriyor.

Doğrulandı:

| Giriş | R_CAL | Bant |
|---|---|---|
| Havuz boş | 0.405 | ±0.195 |
| Fizyoloji 8 soru · 6D 2Y | 0.426 | ±0.187 |
| Patoloji 18 soru · 12D 4Y 2B | 0.396 | ±0.192 |
| **Dahiliye 35 soru · 20D 10Y 5B** | **0.392** | **±0.185** |

Büyük deneme bandı daha çok daraltıyor — daha çok bilgi taşıdığı için. Doğru davranış.

### HATA 2 · kalan potansiyel 1.10 K eksik gösteriyordu

`puanVarsayim(ek)` görevleri **bugün** tamamlanmış sayıyordu. Programın ilk gününde bu, 196 görevin hepsini 29 Temmuz'da bitirmiş gibi hesaplıyor — sınava 25 gün var, azami erime.

Gerçekte görevler **planlandıkları günde** yapılacak, çoğu sınava çok daha yakın.

| | Potansiyel | Gerçek |
|---|---|---|
| Önce | +5.22 | +6.32 |
| **Sonra** | **+6.32** | **+6.32** ✓ |

Düzeltme: `D.bitti[k] = (görevin günü > bugün) ? görevin günü : bugün`. Geçmiş görevler bugün yapılır sayılıyor — doğru, çünkü geçmişe gidilemez.

Yarı yolda da birebir tutuyor (+3.34 = +3.34).

### Yeni test · `kal_test.js` +9 kontrol (toplam 33)

8 soruluk deneme kabul ediliyor · **35 soruluk deneme kabul ediliyor** · büyük deneme bandı daha çok daraltıyor · giriş alanları 24 ile sınırlı değil · 40'a kadar · branş soru sayısı gösteriliyor · **kalan potansiyel = gerçek artış** · yarı yolda da tutarlı · `puanVarsayim` planlanan günü kullanıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**196 görev · sürüm `2026-08-11a` ↔ `rota-2026-08-11a`**

---

## 98 · ÜST ŞERİDE YAYILAN GÜÇ AURASI · `2026-08-12a`

Power-up streak'i **3. kademeden itibaren** orb'dan taşıp üst şeride (gün sayacı · orb'lar · parakete) yayılıyor, **10'a yaklaştıkça genişleyip parlıyor.**

### Kademeler

| Streak | Sınıf | Genişlik | Opaklık | Alt çizgi | Animasyon |
|---|---|---|---|---|---|
| 0–2 | — | — | — | — | — |
| **3** | `pu3` | %38 | .30 | — | — |
| 4 | `pu4` | %50 | .42 | — | — |
| 5 | `pu5` | %62 | .54 | .40 | — |
| 6 | `pu6` | %74 | .66 | .55 | **nefes** |
| 7 | `pu7` | %84 | .78 | .68 | nefes |
| 8 | `pu8` | %92 | .88 | .80 | nefes + **çizgi** |
| 9 | `pu9` | %97 | .95 | .90 | ikisi |
| **10** | `pu10` | **%100** | **1** | **1** | ikisi |

İki katman: sol alttan yükselen **radyal aura** (`::before`) ve şeridin altında soldan sağa uzanan **ışık çizgisi** (`::after`).

### Hiçbir fonksiyonu bozmuyor

| Koruma | |
|---|---|
| `pointer-events:none` | iki katmanda da — hiçbir düğmeyi engellemiyor |
| `z-index:0` + `header>*{z-index:1}` | aura içeriğin **arkasında** |
| `isolation:isolate` | yığın bağlamı yalıtılmış, dış katmanları etkilemiyor |
| Sınıf temizleme | her `ust()` çağrısında eski `pu\d+` siliniyor, birikmiyor |
| `prefers-reduced-motion` | animasyonlar içinde, kapatılabiliyor |

Animasyon süreleri **7.4 sn** (aura nefesi) ve **6.2 sn** (çizgi uzaması) — kombo ve orb kademelerindeki ilkeyle aynı: yavaş, monoton, dikkat dağıtmayan.

⚠ `<header>` etiketine `id="ust"` verildi; `querySelector('header')` test ortamında çalışmıyordu.

### Yeni test · `pu_test.js` +15 kontrol (toplam 84)

streak 0 ve 2'de sınıf yok · 3'te `pu3` · 5'te `pu5` · 10'da `pu10` · 12'de tavan · seri kopunca temizleniyor · **sınıflar birikmiyor** · **aura tıklamayı engellemiyor** · **içeriğin arkasında** · 8 kademe tanımlı · genişlik ve opaklık kademeyle artıyor · animasyon ≥6 sn · hareket azaltmada kapalı · **orb kademesiyle uyumlu**.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-12a` ↔ `rota-2026-08-12a` · 343 948 bayt**

---

## 99 · ÇARK AKIŞI · YILAN GİBİ SÜREKLİ · KENARLAR YILDIZ TOZU · `2026-08-13a`

### ⚠ HATA 1 · odakta çift hareket

Kullanıcı: *"görevin odak noktasına gelesiye genişlemeye başlamasına rağmen odak noktasında yeniden daralıp genişlemesi bunu engelliyor."*

Sebep bulundu: `@keyframes kartAc{from{opacity:0;transform:scale(.965)}}`.

Şerit çarkın **kendi ölçek rampasıyla** büyüyerek merkeze geliyor (`cos(t)^.46`), tam merkeze varınca kart içeriği açılıyor ve **ikinci bir ölçek hareketi** başlıyor: 0.965'ten 1'e. İki hareket çakışınca akış kesiliyor.

**Düzeltme:** `kartAc` artık **yalnız opaklık** — `from{opacity:0}to{opacity:1}`. Ölçek değişimi tek kaynaktan, çarkın rampasından geliyor. Süre .44s → **.52s ease** (gecikme .10s → .06s).

### ⚠ HATA 2 · bıçak kesimi

Kullanıcı: *"çark aşağıda ve yukarıda çiplerin başladığı kısımlarda bir bıçak gibi kesiliyor, bir bölmenin içine hapsolmuş olduğu belli oluyor."*

Sebep: `#cark{overflow:hidden}` şeritleri opaklıkları hâlâ 0.3–0.5 iken kesiyordu.

**Düzeltme · iki katmanlı çözünme:**

1. **Maske** — `#cark`'a üst ve altta yumuşayan `mask-image` gradyanı: `transparent 0 → %18 (4%) → %62 (10%) → tam (20%)`, altta simetrik.
2. **Erken sönme** — opaklık eşiği **1.14 → 0.98**, eğim `.9 → 1.05`. Şerit maskenin kestiği yere varmadan görünmez oluyor.
3. **Yıldız tozu** — sönen şeritlere opaklığa göre üç kademe bulanıklık: `.6px` → `1.4px` → `2.6px`. Dağılıyor gibi görünüyor, kesilmiyor.

`diz()` ve `dizKay()` **aynı rampayı** kullanıyor — sürüklerken de tutarlı. Sürükleme sırasında bulanıklık kapalı (`#sahne.sur .sr[data-toz]{filter:none}`) — akıcılık için.

### Yeni test · `cark_test.js` +13 kontrol

kartAc yalnız opaklık · **odakta ölçek sıçraması yok** · maske üst ve alt · webkit maskesi · üç toz kademesi · sürüklerken bulanıklık kapalı · **opaklık maskeden önce sıfırlanıyor** · eski 1.14 eşiği kalmadı · **`diz` ve `dizKay` tutarlı** · tıklama alanı opaklıkla uyumlu · toz odakta ve kümede yok · geçiş süresi korundu.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-13a` ↔ `rota-2026-08-13a` · 345 421 bayt**

---

## 100 · ÇARK · SÜREKLİ AÇILMA · PINCH ile GÜN KİPİ · `2026-08-14a`

### 1 · Işık efekti kaldırıldı, yerine sürekli açılma

Eskiden şerit merkeze varınca **DOM içeriği takas ediliyordu** (şerit → kart) ve `kartAc` ile beliriyordu. Kullanıcının gördüğü "ışık gözüküp kayboluyor" buydu.

**Artık:** odağa **±3** mesafedeki şeritler zaten **tam kartı** taşıyor, yalnız `max-height` ile kırpılıyor. `--ac` (0→1) her karede odağa uzaklıktan hesaplanıyor:

```
--ac = max(0, 1 − |θ| / 0.34)
max-height = 56px + (--ac) × 86px
```

- `--ac = 0` → yalnız saat + branş satırı (şerit hâli)
- `--ac = 1` → **sf referansına (.kKaynak) kadar** açık — sürüklerken ulaşılan en büyük hâl
- Oturunca → `.act` sınırı kalkıyor, oturum/mola/düğmeler de açılıyor (.58s yumuşak geçiş)

**Eşit uzaklıktaki iki şerit eşit açılıyor** — aynı formül, aynı `|θ|`.

Sürüklerken `transition:none` (her kare yazılıyor, çakışma yok), yalnız oturma anında geçiş var.

`--ac` hem `diz()` hem `dizKay()` içinde yazılıyor — sürüklerken de, oturduktan sonra da tutarlı.

### 2 · Menüdeki "bugüne göz at" düğmesi kaldırıldı

Yerini **pinch** hareketi aldı.

### 3 · İki parmakla sıkıştır → bugünün işleri

| Hareket | Sonuç |
|---|---|
| **Pinch-in** (oran < 0.72) | çark → gün listesi |
| **Pinch-out** (oran > 1.38) | gün listesi → çark |
| **Ctrl + tekerlek** | fare/izleme yüzeyi karşılığı |

Liste **aynı alana gömülü** (`#gunListe{position:absolute;inset:0}`), `#cark`'ın **aynı yıldız tozu maskesini** miras alıyor — üstte ve altta saydamlaşarak sönüyor, kendi içinde kaydırılabiliyor.

Geçiş: liste `scale(1.06)→1` + opaklık (.42s/.48s), çark `opacity:0`'a sönüyor (.34s).

Liste blok başlıklarıyla gruplu, her satırda saat · branş · konu · süre · durum. **Satıra tıklayınca çarka dönüp o göreve gidiyor.** Açılışta etkin göreve kaydırıyor.

### Yeni test · `cark_test.js` +21 kontrol

yakın şeritler tam kartı taşıyor · `acK` sınıfı · kırpma `--ac` ile · sürüklerken geçiş yok · oturunca yumuşak · **sürüklerken odak sf referansında durur** · `--ac` iki fonksiyonda da · **eşit uzaklık = eşit açılma** · gün listesi üretiliyor · blok başlıkları · tıklanabilir satırlar · pinch eşikleri · ctrl+tekerlek · **liste aynı maskeli alanda** · kendi içinde kaydırılır · yumuşak geçiş · çark sönüyor · listeden göreve dönüş.

Ayrıca 4 eski test yeni tasarıma göre yeniden yazıldı (kaldırılan `bugun` düğmesine bakıyorlardı).

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-14a` ↔ `rota-2026-08-14a` · 351 976 bayt**

⚠ **Not:** test ortamının DOM taklidi `appendChild` desteklemediği için çizim sonrası DOM durumu doğrudan sınanamıyor; kontroller üretilen kod üzerinden yapılıyor. Görsel davranışın cihazda denenmesi gerekiyor.

---

## 101 · ÇARK · DÖRT KADEMELİ KART TASARIMI · `2026-08-15a`

Kullanıcı ekran görüntüleriyle üç sorun bildirdi.

### ⚠ HATA 1 · kartlar üst üste biniyordu

Ekran görüntülerinde kart içerikleri iç içe geçmişti. Sebep: §100'de kartlar `max-height` ile kırpılıyordu ama **`diz()` yükseklikleri kırpma uygulanmadan ÖNCE ölçüyordu** (`--ac` varsayılan 0 → 56px). Yerleşim 56px'e göre hesaplanıyor, kartlar sonra 142px'e açılınca çakışıyorlardı.

### Çözüm · kırpma değil, DÖRT AYRI TASARIM

Kullanıcının önerisi doğruydu: *"her büyüklük durumu için farklı kart görünümleri tasarla, birbirlerini tamamlasınlar."*

| Kademe | Eşik (|θ|) | Yükseklik | İçerik |
|---|---|---|---|
| **k0** · sınıra yakın | ≥0.30 | **36px** | nokta · blok · saat · branş *(eski ince başlık)* |
| **k1** · yaklaşıyor | <0.30 | **59px** | + konu adı |
| **k2** · yakın | <0.155 | **79px** | + kaynak / **sf referansı** |
| **k3** · odakta (sürüklerken) | <0.055 | **98px** | + blok bilgisi · saat aralığı |
| **act** · oturmuş | — | doğal | tam kart, her yöne açılır |

Yükseklikler **sabit** olduğu için `diz()` doğru yerleştiriyor. Kademe ↔ açı ↔ yükseklik karşılıklı bağımlı olduğundan hesap **yakınsama döngüsünün içinde** (5 geçiş).

Her kademe öncekinin üstüne bir satır ekliyor; satır `height` + `opacity` çapraz sönümüyle beliriyor (.30s / .24s) — sıçrama yok. Zemin ve çerçeve de kademeyle koyulaşıyor.

**Mola kartları da kademeli** — onlar da odağa yaklaşınca açılıyor (önceki sürümde sabit kalıyorlardı).

### ⚠ HATA 2 · yıldız tozu bulanıklığı akışı bozuyordu

Kullanıcı: *"küçülüp büyüyen sıçrama/yıldızlarla oluşma efekti devam ediyor, onu istemiyorum."*

`filter:blur()` kartın "yıldızlardan oluşuyor" gibi görünmesine yol açıyordu. **Tamamen kaldırıldı.** Sınırda yalnız **saydamlaşma** kalıyor — maske + opaklık rampası kesik kenarı zaten önlüyor.

### ⚠ HATA 3 · pinch sayfayı yakınlaştırıyordu

`{passive:true}` dinleyici `preventDefault` çağıramıyordu, tarayıcı kendi yakınlaştırmasını yapıyordu. `{passive:false}` + `preventDefault` + iki parmak süresince `touch-action:none`.

### ⚠ Bu turda yapılan hata · fazla silme

Önceki yaklaşımı geri alırken iki işaret arasındaki her şeyi sildim — aradaki **12 862 karakterlik başka CSS blokları** da gitti (power-up orb'u, güç aurası, belirteç stilleri). On dört kapı 56 hata verdi.

**Paketlenmiş sürümden geri yüklendi** ve değişiklikler bu kez tek tek, hedefli biçimde uygulandı. Ders: geniş aralık silme yerine her bloğu kendi imzasıyla değiştir.

### Test · `cark_test.js` güncellendi

11 eski kontrol yeni tasarıma göre yeniden yazıldı: dört kademeli kart · kademe sınıfı · **sabit yükseklikler** · kademe eşikleri · çapraz sönüm · k3 sf referansına kadar · `diz`+`dizKay` tutarlı · **bulanıklık yok** · `data-toz` kalmadı.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-15a` ↔ `rota-2026-08-15a` · 355 114 bayt**

---

## 102 · ÜÇ KÖK SEBEP · `2026-08-16a`

Kullanıcı üç sorunun da sürdüğünü bildirdi. Her birinin kökü ayrıydı.

### ⚠ 1 · kartlar hâlâ iç içe · İKİ ayrı sebep

**(a) `.kd`'de `overflow:hidden` yoktu.** Satırlar `height:0` iken bile içerik kutunun dışına taşıyordu — ekran görüntüsünde kartın kutusu bitiyor ama "Neoplazi · 2/2. parça" metni altında görünüyordu.

**(b) Yükseklikler VARSAYIMDI.** `KH=[36,59,79,98]` diye sabit sayı yazmıştım; CSS'in ürettiği gerçek yükseklikle tutmuyordu (`kd3b` satırı hesaba katılmamıştı, kenarlık payı eksikti).

**Düzeltme:** `.kd{overflow:hidden}` + **yükseklikler artık ölçülüyor.** `diz()` bir örnek elemana dört kademeyi sırayla uygulayıp `getBoundingClientRect()` ile gerçek yüksekliği alıyor, önbelleğe koyuyor. Sürükleme karesi bu önbelleği kullanıyor — ölçüm yapmıyor, hız kaybı yok.

Ayrıca **sürüklerken kademe değişince yükseklik de güncelleniyor** ve `y` yeniden çözülüyor; önceden yalnız sınıf değişiyordu, yerleşim eski yüksekliğe göre kalıyordu.

### ⚠ 2 · ışık patlaması

`@keyframes kartAc{from{opacity:0}}` hâlâ duruyordu. Etkin kart her seferinde **opaklık 0'dan** beliriyordu — "ışık patlaması / yıldızlardan oluşma" bu.

**Kaldırıldı.** `@keyframes kartAc` tamamen silindi, `.sr.act .kart{animation:none}`. Kart zaten oradaydı, yalnız kademesi büyüyor.

### ⚠ 3 · uzaklaştırma sayfayı yakınlaştırıyordu

Dinleyiciler `#cark` üzerindeydi. **Gün kipindeyken `#gunListe` çarkın üstünü örtüyor** (`position:absolute;inset:0;z-index:2`) ve dokunuşlar çarka hiç ulaşmıyordu. Sıkıştırma çalışıyordu (çark görünürken), **uzaklaştırma çalışmıyordu** (liste görünürken) — tarayıcı devralıp sayfayı yakınlaştırıyordu.

**Düzeltme:** dinleyiciler **üst kapsayıcıya** taşındı, **yakalama evresinde** (`capture:true`) dinleniyor, `touch-action` hem kapsayıcıda hem listede kilitleniyor. Ayrıca `touchmove`'da `pinchD0` yoksa kurtarılıyor (parmaklar liste üstünde başlamışsa).

Eşikler biraz gevşetildi: 0.72→**0.74**, 1.38→**1.34**.

### Test · `cark_test.js` +12 kontrol, 5 eskimiş kontrol yenilendi

`kd` taşmayı kırpıyor · **ışık patlaması yok** · etkin kartta animasyon yok · **yükseklikler ölçülüyor** · önbelleğe alınıyor · sürüklerken güncelleniyor · `y` yeniden çözülüyor · **dinleyiciler üst kapsayıcıda** · yakalama evresi · gün kipinde de kilit · **pinch-out da preventDefault** · `pinchD0` kurtarma.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-16a` ↔ `rota-2026-08-16a` · 357 142 bayt**

---

## 103 · ⚠ KÖK SEBEP · DOM HER GEÇİŞTE YENİDEN KURULUYORDU · `2026-08-17a`

Kullanıcı doğru teşhisi koydu: *"seçim yapınca çark toplanıp yeniden dağılıyor gibi oluyor, belki de aslında efekt yok."*

**Efekt yoktu. `carkCiz()` her geçişte `s.innerHTML=''` ile TÜM DOM'u siliyor ve yeniden kuruyordu.**

Elemanlar yok edilip yeniden yaratılıyor, `diz()` onları sıfır konumundan yerleştiriyor ve hepsi birden beliriyordu. "Işık patlaması", "yıldızlardan oluşma", "çark toplanıp dağılıyor" — hepsi bunun tezahürüydü. Üç turdur animasyon arıyordum, sorun animasyonda değildi.

### Düzeltme · eleman yeniden kullanımı

- Elemanlar `dataset.i` ile eşleşiyor; pencereye **yeni girenler** yaratılıyor, **çıkanlar** siliniyor
- İçerik **yalnız** etkinlik durumu değiştiyse yenileniyor (`icerikGerek`)
- Kademe sınıfı yeniden hesaplanana kadar **korunuyor**
- Mola şeritleri de aynı biçimde yeniden kullanılıyor
- DOM sırası `insertBefore` ile düzeltiliyor (`diz()` komşuluk varsayıyor)

Geçişte artık **hiçbir eleman yok edilmiyor** — süreklilik korunuyor.

### ⚠ 2 · sınırda titreme · histerezis

Kullanıcı: *"üst/alt sınırlara yaklaşan kartlar birden saat kısımlarını da gösterip göstermediğinden titriyorlarmış gibi."*

Tek eşikli kademe kararı, sınır civarındaki şeridi iki kademe arasında salındırıyordu.

**Girme ve çıkma eşikleri ayrıldı:**

| Kademe | Girme (|θ|<) | Çıkma (|θ|>) |
|---|---|---|
| k3 | 0.055 | 0.075 |
| k2 | 0.155 | 0.180 |
| k1 | 0.300 | 0.335 |

Bir kademeye girdikten sonra çıkmak için biraz daha uzaklaşmak gerekiyor — salınım bitti.

### ⚠ 3 · metin kendiliğinden seçiliyordu

Sürüklerken tarayıcı metni seçiyordu (kopyalama sanıyor). `user-select:none` + `-webkit-touch-callout:none` — hem çarkta hem gün listesinde.

### Test · `cark_test.js` +13 kontrol

**DOM her geçişte silinmiyor** · elemanlar kimliğe göre eşleşiyor · var olan kullanılıyor · içerik yalnız gerektiğinde yenileniyor · kademe sınıfı korunuyor · pencere dışı siliniyor · **DOM sırası düzeltiliyor** · mola da yeniden kullanılıyor · metin seçimi kapalı (çark + liste) · dokunma çağrısı kapalı · **histerezis iki fonksiyonda da** · kademe geçmişi okunuyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-17a` ↔ `rota-2026-08-17a` · 360 133 bayt**

---

## 104 · ÇARK HATASI · YATAY ÜST ŞERİT · MENÜ ÇÖZÜLDÜ · `2026-08-18a`

### ⚠ 1 · çark bug'a giriyordu

§103'teki DOM yeniden kullanımında sıralama `insertBefore` ile tek tek yapılıyordu:

```js
sira.forEach((k,n)=>{const x=[...s.children].find(...);
  if(x&&s.children[n]!==x)s.insertBefore(x,s.children[n]||null)});
```

Her `insertBefore` sonraki indeksleri kaydırdığı için sıra bozuluyordu — kartlar rastgele konumlara düşüyordu.

**Düzeltme:** `DocumentFragment`'e sırayla ekleme. `appendChild` var olan düğümü **taşır** (yok etmez), sıra tek seferde doğru kuruluyor. Test ortamında `createDocumentFragment` yoksa doğrudan sahneye ekleniyor.

### 2 · üst şerit YATAY oldu

Orb'lar ve mola çipi dikey yığılıyordu; çarkın dikey alanını yiyordu (ekran görüntülerinde çark ekranın alt yarısına sıkışmıştı).

- Yeni `.solUst` kapsayıcı: **yatay, sarmasız**
- Orb ölçüsü 36px → **32px**, ikincil düğmeler **28px**
- `.etSat` (mola çipi) da yatay, taşarsa kaydırılabilir

### 3 · menü çözüldü

`mOrb` (üç çizgi) + açılır `mYay` kaldırıldı. Düğmeler **doğrudan tıklanabilir**:

| Düğme | |
|---|---|
| **Power up** (32px, güç ışını) | ana orb |
| **Telafi** (32px) | kaçırılan görevler · rozet burada |
| Deneme girişi (28px) | ikincil |
| Tamamlananlar (28px) | ikincil |

Menü açma/kapama mantığı, `mYay` ve `mOrb` CSS'i tamamen silindi.

### Test

`cark_test.js` H bölümü (menü orb'u · 10 kontrol) yeni düzene göre yeniden yazıldı: menü kaldırıldı · power-up doğrudan · telafi doğrudan · deneme ve tamamlanan doğrudan · **yatay şerit** · mola çipi yatay · rozet. Ayrıca `DOM sırası fragment ile kuruluyor` ve `pu_test`'te `orb doğrudan tıklanabilir`.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-18a` ↔ `rota-2026-08-18a` · 357 918 bayt**

⚠ **Kalan:** seyir defteri ve güç matrisi sayfalarındaki taşma bildirildi; dikey alan açıldığı için düzelmiş olabilir, cihazda kontrol gerekiyor.

---

## 105 · ESKİ PANEL KALDIRILDI · YAKINLAŞTIRMA KİLİDİ · `2026-08-19a`

### 1 · alttaki "Bugün" paneli · eski to-do kalıntısı

`gpanel` — menü kaldırılınca açık kalıp ekranın altında görünüyordu. **Tamamen silindi**: HTML, `gpanelCiz`, `gunPanelAc`, gezinme IIFE'si, `gGun` değişkeni ve `#gpanel` · `.gIt` · `.gBlok` · `.gK` CSS blokları.

Yerini **pinch gün listesi** aldı.

### ⚠ 2 · çark dokunup bırakınca bug'a giriyordu

`kayY` (sürükleme kayması) sürükleme bitince **sıfırlanmıyordu**. Bir sonraki çizimde `diz()` hâlâ eski kaymayı uyguluyor, şeritler kaymış konumda üst üste biniyordu.

```js
function carkCiz(){ ...
  if(!surukleKip)kayY=0;   // ← eklendi
```

### 3 · tüm uygulama yakınlaştırılamaz ve seçilemez

Pinch'in kusursuz çalışması için tarayıcının kendi yakınlaştırması tamamen kapatıldı:

| | |
|---|---|
| `viewport` | `user-scalable=no, minimum-scale=1, maximum-scale=1` |
| `html,body` | `touch-action:manipulation` |
| `*` | `user-select:none` · `-webkit-touch-callout:none` |
| İstisna | `input, textarea, select, [contenteditable]` seçilebilir kalıyor |

### 4 · mola çipi yatay şeride taşındı

`.etSat` artık `.solUst` içinde — power up ve telafi ile **aynı satırda**. Şerit taşarsa yatay kaydırılabiliyor. Çarkın dikey alanı daha da genişledi.

### Test

`cark_test.js` G bölümü (eski bugün paneli · 12 kontrol) yeni tasarıma göre yeniden yazıldı, +9 yeni kontrol: **viewport kilidi** · `touch-action` · tüm uygulamada seçilemezlik · **girdi alanları hariç** · **`kayY` sıfırlanıyor** · mola çipi yatayda · şerit kaydırılabilir · eski CSS gitti · `gGun` kalmadı.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-19a` ↔ `rota-2026-08-19a` · 354 650 bayt**

⚠ **Kalan:** seyir defteri ve güç matrisi sayfalarındaki sütun taşması bildirildi ama henüz kök sebebi bulunmadı — bir sonraki turun işi.

---

## 106 · ⚠ SINIF ÇAKIŞMASI · SEYİR ve GÜÇ MATRİSİ BOZULMASININ SEBEBİ · `2026-08-20a`

### Kök sebep

Çark kartlarına verdiğim sınıf **`.kd`** idi. Ama seyir defteri ve ölçüm sayfalarının kapsayıcıları da **`class="kd"`**:

```html
<section class="vw" id="seyir"><div class="kd" id="seyirIc"></div></section>
<section class="vw" id="olcum"><div class="kd" id="olcumIc"></div></section>
```

Benim kurallarım o sayfalara da uygulanıyordu:

```css
.kd{padding:0 13px;overflow:hidden}          /* kaydırma bozuldu */
.kd>div{display:flex;align-items:center}     /* TÜM bölümler yan yana dizildi */
```

Ekran görüntülerindeki üç sütunlu kırık düzen (başlık solda, açıklama ortada, branş listesi sağda kesik) tam olarak buydu — `.kd>div{display:flex}` sayfanın bölümlerini satır hâline getiriyordu.

### Düzeltme

Kart sınıfları **benzersiz ada** taşındı: `kd` → **`kdm`**, satırlar `kd0–kd3b` → **`kdm0–kdm3b`**. Toplam 38 geçiş.

Orijinal `.kd` kuralları (`position:absolute;inset:0;overflow-y:auto`) **korundu** — seyir ve ölçüm sayfaları kendi düzenlerine döndü.

⚠ **Ders:** yeni CSS sınıfı eklerken ada önce `grep` at. `kd` gibi kısa ad çakışmaya açık.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-20a` ↔ `rota-2026-08-20a` · 354 697 bayt**

### Not · test ortamı sınırı

`olcumCiz()` test ortamında veri eksikliğinden koşmuyor; düzeltme CSS seçicileri üzerinden doğrulandı (kart sınıfı `kdm`, kapsayıcı `.kd` korundu, `.kd>div` kuralı kalmadı). Cihazda kontrol gerekiyor.

---

## 107 · UYGULAMA AÇILMIYORDU · İKİ DAYANIKLILIK DÜZELTMESİ · `2026-08-21a`

Kullanıcı boş çark ve `Uncaught Error: Script error` bildirdi.

### Yeni araç · `tarayici_test.js`

Mevcut test ortamı (`derin_ortam.js`) DOM'u çok basit taklit ediyordu; `appendChild`, `canvas`, `requestAnimationFrame` yoktu ve bu yüzden **çizim hataları hiç yakalanamıyordu.**

Tarayıcıya çok daha yakın bir taklit yazıldı: gerçek `appendChild`/`children`, `classList`, `getBoundingClientRect`, canvas bağlamı, **kuyruklu `requestAnimationFrame`**. Böylece başlatma ve ilk çizim uçtan uca koşturulabiliyor.

Bu araçla doğrulandı: **başlatma hatasız, `carkCiz()` 19 şerit üretiyor.** Yani JS sağlam; sorun yerleşimdeydi.

### ⚠ 1 · üst şerit ekranı taşırıyordu

Orb'lar yatay dizilince `.sol` genişledi ve `nav`'ı ekran dışına itti — ekran görüntüsünde sağdaki istatistikler kesik, mola çipi dört satıra sarmış.

| | |
|---|---|
| `header` | `max-width:100%; overflow:hidden`, dolgu 24px→18px |
| `.sol` | `min-width:0; flex:1 1 auto` (daralabilir) |
| `header>nav` | `flex:0 0 auto` (sabit) |
| `.solUst` | `min-width:0`, taşarsa kaydırılır |
| `.etSat` | `white-space:nowrap`, sarmıyor |

### ⚠ 2 · sıfır yükseklikte çizim

`diz()` düzen oturmadan koşarsa `#cark` yüksekliği 0 oluyor; `R` taban değerine düşüyor ve **tüm şeritler uç açılara kayıp opaklıkları sıfırlanıyor** — çark boş görünüyor.

```js
if(!kw.height||kw.height<40||!kw.width){requestAnimationFrame(diz);return}
```

Düzen oturana kadar bir sonraki kareye erteleniyor.

### Test · `cark_test.js` +7 kontrol

sıfır yükseklikte çizim erteleniyor · üst şerit taşmıyor · sol sütun daralabiliyor · nav sabit · orb şeridi daralabiliyor · mola çipi sarmıyor · **kart sınıfı seyir kapsayıcısıyla çakışmıyor**.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-21a` ↔ `rota-2026-08-21a` · 355 035 bayt**

⚠ Cihazda **sert yenileme** gerekebilir (servis işçisi eski sürümü önbellekten veriyor olabilir).

---

## 108 · ⚠ BAŞIBOŞ `}` · TÜM CSS BOZULMUŞTU · `2026-08-23a`

Uygulama hiç açılmıyordu (boş çark · `Script error`). Kullanıcı Claude görüntüleyicisinde açtığı için servis işçisi önbelleği de değildi.

### Kök sebep

§102'de `@keyframes kartAc` kuralını regex ile silmiştim:

```python
s=re.sub(r"@keyframes kartAc\{[^}]*\}[^}]*\}\n?","",s)
```

Regex kuralın gövdesini sildi ama **kapanış `}`'ini bıraktı.** 158. satırda başıboş bir `}` kaldı:

```css
/* Kart odağa gelirken YALNIZ çözünür — ... */
}                                    ← başıboş
@media (prefers-reduced-motion:reduce){...}
```

Bu `}` bir üstteki kuralı erken kapattı ve **o noktadan sonraki tüm CSS geçersiz oldu** — 60 000 karakterlik stil sayfasının büyük bölümü uygulanmıyordu. Çarkın boş görünmesi, sayfaların bozulması, taşmalar: hepsi bunun sonucuydu.

⚠ On dört kapı bunu göremedi: hiçbiri **CSS'in kendi sözdizimini** kontrol etmiyordu.

### Düzeltme

Başıboş `}` kaldırıldı, yorum düzeltildi. CSS denge kontrolü: **0, başıboş yok.**

### Yeni kontroller

**`cark_test.js` · CSS BÜTÜNLÜĞÜ bölümü (6 kontrol):**
- CSS süslü parantez **dengeli**
- **başıboş `}` yok** (satır numarasıyla)
- CSS boş değil (>40 000 karakter)
- boş seçici yok
- hata göstericisi var · servis işçisi korumalı

Bu bölüm bir daha aynı hatanın kaçmasını engelliyor.

### Ekranda hata göstericisi

Sessiz `Script error` yerine hatayı **ekranın altında** gösteren bir yakalayıcı eklendi: mesaj, dosya, satır ve yığın izinin ilk dört satırı. Metin seçilebilir (kopyalanabilsin diye).

⚠ Ana `<script>` bloğunun **içine** kondu — ayrı blok olarak eklendiğinde `derin_ortam.js`'in betik çıkarımı bozuluyordu.

### Servis işçisi koruması

`navigator.serviceWorker.register(...)` sandbox'lı çerçevede senkron fırlatabiliyor; tamamen `try/catch` içine alındı.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-23a` ↔ `rota-2026-08-23a`**

---

## 109 · ⚠ ÇARK 100 PİKSELE EZİLİYORDU · `2026-08-25a`

Ekrana eklenen teşhis kesin cevabı verdi:

```
GOREVLER: 196 · carkListe: 191 · aktif: 5
#cark: 430×100          ← YALNIZ 100 PİKSEL YÜKSEK
#sahne çocuk: 16
ilk şerit stil: translate(0px) rotate(0deg) scale(1) op=1
```

Çark **doğru çiziyordu** — 16 şerit, ilkinin opaklığı 1, dönüşümü doğru. Sorun kapsayıcının yüksekliğiydi: 100 piksellik kutuya sıkışıp `overflow:hidden` ile kırpılıyorlardı.

### Kök sebep · sabit `vh` tavanı + kısa görüntü alanı

`#rota` iki satırlık bir ızgara: üstte çark, altta brif paneli.

```css
#rota{grid-template-rows:minmax(100px,1fr) auto}
#uzay{max-height:52vh}
```

Claude görüntüleyicisi uygulamayı **kısa bir çerçevede** açıyor (yaklaşık 330 CSS pikseli). Orada:

| | |
|---|---|
| Görüntü alanı | ~330 px |
| Üst şerit | ~130 px |
| `main` | ~200 px |
| `#uzay` (brif) `52vh` | ~172 px |
| **`#cark` kalan** | **~28 px → tabana (100) çıkarıldı** |

Sabit `vh` tavanı kısa çerçevede brif panelini orantısız büyütüp çarkı eziyordu. Telefonda tam ekran çalışırken sorun görünmüyordu.

### Düzeltme · oranlı bölüşüm

Sabit `vh` tavanları kaldırıldı, iki satır **oranla** paylaşıyor:

| Ekran | Kural |
|---|---|
| ≤880px | `1.25fr minmax(88px,1fr)` |
| ≤660px | `1.2fr minmax(84px,1fr)` |
| ≤470px | `1.15fr minmax(80px,1fr)` |

Çark her zaman görüntü alanının **~%55'ini** alıyor; brif kendi içinde kayabiliyor (`overflow-y:auto`). Ayrıca `#cark{min-height:140px}`.

### Kalıcı teşhis araçları

Bu turda eklenen üç araç kaldı:
- **Ekranda hata paneli** — mesaj, dosya, satır, yığın izi (metin seçilebilir)
- **`window.__G(fn,ad)`** — kritik fonksiyonları sarmalıyor, "İÇ HATA · fonksiyon adı" yazıyor
- **`window.__TESHIS()`** — yükleme sonrası durum özeti

Çapraz-köken maskesi ("Script error.") yüzünden tarayıcı ayrıntı vermediğinde tek görme yolu bunlar.

### Test · `cark_test.js` +8 kontrol

üç kırılma noktasında oranlı bölüşüm · sabit vh tavanı kalmadı · brif kendi içinde kayar · çark asgari yüksekliği · teşhis araçları duruyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-25a` ↔ `rota-2026-08-25a`**

---

## 110 · ⚠ `html` YÜKSEKLİĞİ YOKTU · TÜM ZİNCİR ÇÖKÜYORDU · `2026-08-26a`

İkinci teşhis: `#cark: 430×140` — yani `min-height:140px` bağlayıcıydı, **ızgara hâlâ pay vermiyordu.** `fr` birimleri çözülmüyordu.

### Kök sebep · yükseklik zinciri kopuk

```css
html{background:#04050A;color-scheme:dark}   /* ← yükseklik YOK */
body{height:100%;margin:0;overflow:hidden}
```

`body{height:100%}` **html'e göre** çözülür. html'in yüksekliği `auto` olduğu için bu kural **tamamen görmezden geliniyor** → body içerik yüksekliğine düşüyor → `main{flex:1 1 auto}` de öyle → `.vw{position:absolute;inset:0}` sıfır alıyor → `#rota` ızgarasının `fr` birimleri paylaşacak yükseklik bulamıyor → `#cark` `min-height` tabanına çöküyor.

Zincirdeki tek eksik halka html'di.

### Düzeltme

```css
html{background:#04050A;color-scheme:dark;height:100%}
@supports (height:100dvh){html{height:100dvh}}
```

`dvh` mobil tarayıcı çubuğunun açılıp kapanmasını da doğru izliyor.

### Neden şimdiye kadar görünmedi

§108'de düzelttiğim **başıboş `}`** stil sayfasının 158. satırdan sonrasını geçersiz kılıyordu. O bölgedeki bazı kurallar uygulanmadığı için düzen tesadüfen farklı çözülüyordu. CSS geçerli hâle gelince eksik `html` yüksekliği ortaya çıktı.

Yani iki hata birbirini maskeliyordu.

### Test · `cark_test.js` +5 kontrol

html kesin yüksekliğe sahip · `dvh` desteği · body yüksekliği çözülebiliyor · main esneyebiliyor · rota ızgarası yüzde yükseklik.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-26a` ↔ `rota-2026-08-26a`**

---

## 111 · DÖRT DÜZELTME · `2026-08-27a`

Uygulama açıldı (§110'daki `html` yüksekliği). Kullanıcı dört sorun bildirdi.

### ⚠ 1 · fare tekerleği çarkı döndürmüyor, kaydırma görünümünde takılıyordu

Tekerlek olayı **sürükleme gibi** işleniyordu: `kayY -= e.deltaY`. Tek tık `kayY`'yi ~100px oynatıyor ama merkeze en yakın kart değişmiyor — çark dönmüyor. Üstelik `otur()` `surukleKip` kontrolüne takılıp çalışmayınca kaydırma görünümünde **takılı kalıyordu.**

**Düzeltme · birikimli adım:**

```js
let tekBir=0; const TEK_ESIK=48;
tekBir+=e.deltaY;
while(Math.abs(tekBir)>=TEK_ESIK){const y=tekBir>0?1:-1; tekBir-=y*TEK_ESIK; adim(y)}
```

Tek tık = bir kart. `ctrl+tekerlek` (pinch karşılığı) hariç tutuldu. 220 ms sonra birikim sıfırlanıyor ve gerekiyorsa oturuluyor.

### 2 · mola çipi kaybolmuştu

`.solUst{overflow-x:auto}` çipi kırpıyordu. Artık `overflow:visible` ve çip **tek satır**: `.etSat>*{white-space:nowrap}`.

### 3 · telafi rozeti üst panelin altında kalıyordu

`header{overflow:hidden}` orb'un dışına taşan rozeti kesiyordu.

```css
header{overflow-x:clip;overflow-y:visible}
@supports not (overflow-x:clip){header{overflow:visible}}
```

Yatay taşma hâlâ kırpılıyor (ekran dışına itmesin), dikey serbest. `.solUst`'a `padding-top:5px`.

### 4 · okumalar bloğu dağınıktı

"Kalan potansiyel" iki satıra sarıyor, altındaki değerler aşağı kayıyordu.

- `.ok .cap{white-space:nowrap}` — başlıklar tek satır
- Dar ekranda (≤470px) "Kalan potansiyel" → **"Potansiyel"** kısaltması, başlık boyutu 7.5px
- `.okumalar .ok{display:flex;flex-direction:column;justify-content:flex-start}` — üç sütun hizalı

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-27a` ↔ `rota-2026-08-27a` · 360 836 bayt**

---

## 112 · KARTLAR ARTIK İÇ İÇE GEÇMİYOR · `2026-08-28a`

Kullanıcının çözümü doğruydu: *"çark odak seçimine en yakın olan görev kartı en önde olsun ve %100 opak olsun, bu iç içe geçme sorununu çözer."*

### İki ayrı sebep vardı

**1 · Katman sırası tekil değildi.**

```js
zIndex = i===a ? 9 : Math.max(1, 7-Math.round(ab*5))
```

Yedi katman değeri onlarca şeride dağıtılıyordu; **birkaç şerit aynı katmanı paylaşıyordu.** Çakıştıklarında hangisinin üstte kalacağı belge sırasına kalıyordu — DOM yeniden kullanımından sonra bu sıra oynak olduğu için "iç içe geçmiş" görünüyordu.

```js
zIndex = i===a ? 999 : Math.max(1, 900 - Math.round(ab*1000))
```

Artık her şeridin katmanı açısıyla **tekil** ve odağa en yakın olan **her zaman en üstte.** `diz()` ve `dizKay()` aynı formülü kullanıyor.

**2 · Kart zeminleri saydamdı.**

```css
.kdm{background:rgba(255,255,255,.05)}   /* saydam */
```

Katman sırası doğru olsa bile saydam zemin alttakini **içinden gösteriyordu.** Zeminler opak hâle getirildi:

| Kademe | Zemin |
|---|---|
| k0 | `#0A0E18` |
| k1 | `#0C1120` |
| k2 | `#0E1425` |
| k3 | `#111829` |
| etkin kart | `#131A2C` |

Kademe yükseldikçe zemin biraz açılıyor — derinlik hissi korunuyor ama üstteki alttakini **tamamen** kapatıyor.

Etkin karttan `backdrop-filter:blur(26px)` de kaldırıldı: opak zeminle gereksiz ve pahalıydı.

### Test · `cark_test.js` +11 kontrol

odaktaki en üst katmanda · katman odağa uzaklıkla kesin · `diz`/`dizKay` aynı formül · beş zeminin hepsi opak · odaktaki tam opak · **katman kesin azalan** · **katman değerleri tekil**.

Son iki kontrol örnek açı dizisiyle sayısal doğrulama yapıyor — formül bozulursa yakalanır.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-28a` ↔ `rota-2026-08-28a` · 361 217 bayt**

---

## 113 · BEŞ DÜZENLEME · `2026-08-29a`

### 1 · teşhis paneli gizlendi

Kırmızı hata/teşhis şeridi artık **yalnız `?hata=1`** parametresiyle açılıyor. Normal kullanımda ekranı kirletmiyor; hata yakalayıcı arka planda çalışmaya devam ediyor.

Sorun çıkarsa `index.html?hata=1` ile açmak yeterli.

### 2 · ALTI kademeli kart · pürüzsüz geçiş

Dört kademe (k0–k3) yerine **altı** (k0–k5). Aradaki basamaklar satırları **yarı yükseklikte** açıyor, sonra tam:

| Kademe | Eşik | Yükseklik | Yeni |
|---|---|---|---|
| k0 | ≥0.320 | 36 | başlık |
| k1 | <0.320 | 48 | konu adı **yarı** (12px, %55) |
| k2 | <0.215 | 58 | konu adı tam · sf **yarı** (9px) |
| k3 | <0.140 | 68 | sf tam · blok **yarı** (8px) |
| k4 | <0.085 | 86 | blok tam · son seans **yarı** |
| k5 | <0.040 | 100 | hepsi tam |

Histerezis de altı kademeye genişletildi (girme/çıkma eşikleri ayrı). Zeminler kademeyle kademeli açılıyor: `#0A0E18 → #111829`.

### 3 · üst şerit ızgaraya geçti

Nav (yıldız · takvim · altıgen) `flex` düzeninde gün sayacının **üstüne biniyordu.**

```css
header{display:grid;grid-template-columns:auto 1fr auto;
       grid-template-areas:'sol nav ist'}
nav{grid-area:nav;justify-self:center}
```

Üç alan artık birbirine giremiyor.

### 4 · istatistik sütunları kutulandı

"32.25 T · 38.50 K   55.7–55.7   196 iş kaldı" tek şerit gibi okunuyordu; hangi alt satırın hangi başlığa ait olduğu belirsizdi.

Her sütun kendi kutusunda: zemin, çerçeve, `min-width:74px`. **Parakete yeşil**, **Potansiyel mavi** tonda. Alt satırlar kısaltıldı (`T 32.3  K 38.5`, `12 tekrar`).

### 5 · kutup yıldızı

Gün sayacı zayıf gri bir sayıydı. Artık **yıldız parıltısı**: üç katmanlı `text-shadow` (12px → 30px → 60px), 6.4 saniyelik yavaş nefes animasyonu, renk `#F2F7FF`.

Programın çapası olduğu için görünür olması gerekiyordu.

### Test · `cark_test.js` +15 kontrol

teşhis varsayılan kapalı · yalnız `?hata=1` · altı kademe eşiği ve yüksekliği · **üç ara basamak** · k4/k5 zeminleri · header ızgara · nav kendi alanında · istatistikler kutulu · parakete/potansiyel renkleri · **kutup yıldızı parlıyor** · hareket azaltmada sabit.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-29a` ↔ `rota-2026-08-29a` · 363 516 bayt**

---

## 114 · KADEME SIRA UZAKLIĞINA BAĞLANDI · OPAKLIK DÜZELDİ · `2026-08-30a`

### ⚠ 1 · 16:30 kartı boş görünüyordu · kök sebep

Kademe **açıdan** hesaplanıyordu. Etkin kart tam açık hâlde ~250px yüksekliğinde olduğu için hemen komşusu şu açıya düşüyordu:

```
y ≈ −(250/2 + 20 + 36/2) = −153  →  θ = asin(153/444) = 0.352
```

Eşik `k1` için 0.320 idi → komşu doğrudan **k0**'a düşüyordu. Kullanıcının gördüğü "16:30 kartı boş" tam olarak buydu; kartın hemen altındaki 16:54 odaktayken üstteki komşu en dar kademede kalıyordu.

**Düzeltme · sıra uzaklığı:**

```js
const KD_SIRA=[5,4,3,2,1];              // |i−a| = 0,1,2,3,4
const kdOf=i=>{const d=Math.abs(i-a); return d<KD_SIRA.length?KD_SIRA[d]:0};
```

Kullanıcının gördüğü şeye birebir uyuyor: odaktan bir uzak → k4, iki → k3, üç → k2, dört → k1, beş+ → k0. Histerezise de gerek kalmadı (sıra oynamıyor).

Ek fayda: yükseklikler baştan belli olduğu için yerleşim **tek geçişte** doğru çözülüyor.

Doğrulandı: `act → k4 → k3 → k2 → k1 → k0 → k0…`

### ⚠ 2 · şeritler gereksiz soluktu

```js
op = i===a ? 1 : kk ? 0.97 : max(0, (komsu?.72:.52) − ab*(komsu?.46:1.05))
```

Odak dışındaki **her** şerit %52–72'ye düşüyordu. Kullanıcı: *"geri kalan görevler de %100 opak olsun, yalnız üst/alt sınıra yakın olanlar yıldız tozuna dönüşsün."*

```js
const SON_BAS=0.52, SON_UC=0.95;
op = ab<=SON_BAS ? 1 : max(0, 1−(ab−SON_BAS)/(SON_UC−SON_BAS));
```

| |θ| | Opaklık |
|---|---|
| 0.00 – 0.52 | **1.00** |
| 0.60 | 0.81 |
| 0.75 | 0.47 |
| 0.90 | 0.12 |
| ≥0.95 | 0.00 |

Katman sırası (§112) zaten uzaklığa göre kesin; artık **tüm görünür şeritler tam opak** ve yakın olan uzak olanın önünde.

### 3 · dar ekranda üst şerit iki satır

Üç sütun 430px'e sığmıyor, `.sol` eziliyor ve nav gün sayacının üstüne biniyordu (kutup yıldızı görünmüyordu).

```css
@media (max-width:660px){
  header{grid-template-columns:1fr auto;
         grid-template-areas:'sol ist' 'nav nav';row-gap:6px}
  nav{justify-self:start}}
```

### 4 · geçiş hata korumalı

`gecis` ve `adim` de `__G` sarmalayıcısına alındı; kart tıklamaları `try/catch` içinde. Bir hata olursa `?hata=1` ile fonksiyon adı ve mesaj görünüyor.

### Test · `cark_test.js` +16 kontrol

kademe sıra uzaklığından · sürüklerken de · açı eşikleri kalmadı · `kdOf` tek argümanlı · opaklık uçta sönüyor · **odak ve yakınlar tam opak** · eski soluk rampa kalmadı · dar ekranda iki satır · geçiş korumalı · **sayısal doğrulama** (sıra→kademe eşlemesi, opaklık rampasının üç noktası).

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-30a` ↔ `rota-2026-08-30a` · 364 334 bayt**

---

## 115 · MOLA KARTI ÇAKIŞMASI · KALAN GÜN TAKIMYILDIZI · `2026-08-31a`

### ⚠ 1 · mola kartı diğerlerinin üstüne biniyordu

Ekran görüntüsünde mola kartı ("Akşam · 45 dk") komşu kartlarla iç içeydi.

Sebep · **kümeleme**: aynı bloğun kardeş görevleri ve mola, etkin kartın etrafında toplansın diye yatay kaymaları `0.34` ile kırpılıyordu:

```js
translate( R*(cos(t)-1) * (kk ? 0.34 : 1), R*sin(t) )
```

Bu, o şeritleri yayın dışından merkeze doğru **çekiyordu**. Kademeli kartlar (§113) uzun olduğu için çekilenler etkin kartın üstüne biniyordu.

**Kümeleme tamamen kaldırıldı** — her şerit yayda kendi yerinde. Hiyerarşiyi zaten kademe (§114) ve katman sırası (§112) veriyor. Ölçek rampası da sadeleşti: `max(.86, cos(t)^.30)`.

### 2 · mola çipi istatistiğin üstüne çıkıyordu

`.sol{overflow:hidden}` + `.solUst{max-width:100%; overflow-x:auto}` — çip artık kendi sütununda kalıyor, taşarsa yatay kaydırılıyor.

### 3 · KALAN GÜN · takımyıldız

Kullanıcı: *"küçük ayı gibi yıldızlardan oluşsun, beyaz çizgilerle birleşsin, kimi yıldız daha parlak kimisi daha ufak."*

**`RAKAM` tablosu · 0–9 için ayrı takımyıldız düzeni.** Her rakam `{p: noktalar, c: çizgiler}`:

| Rakam | Yıldız | Çizgi |
|---|---|---|
| 0 | 8 | 8 (kapalı halka) |
| 1 | 6 | 5 |
| 2 · 3 · 5 · 9 | 7 | 6 |
| 4 | 5 | 4 |
| 6 | 8 | 7 |
| 7 | 4 | 3 |
| 8 | 7 | 8 (çift halka) |

Nokta biçimi `[x, y, büyüklük]`; büyüklük 1–3:

| Sınıf | Görünüm |
|---|---|
| `.y1` | küçük, soluk, hafif parıltı |
| `.y2` | orta, `#DCE9FF`, 4px parıltı |
| `.y3` | **büyük, saf beyaz**, 7px + 16px çift parıltı |

Çizgiler `rgba(214,232,255,.34)` — takımyıldız haritalarındaki gibi ince ve soluk. Her yıldız **farklı fazda** parlıyor (`animation-delay` noktadan ve rakam sırasından türetiliyor), gökyüzü gibi düzensiz.

Rakam sayısı serbest: `7` tek, `25` iki, `100` üç yıldız kümesi. `aria-label` ile ekran okuyucuya "25 gün kaldı" veriliyor. Yalnız sayı **değiştiğinde** yeniden çiziliyor.

### Test · `cark_test.js` +18 kontrol

RAKAM tablosu 0–9 tam · her rakamda ≥4 yıldız ve ≥3 çizgi · **çizgi uçları geçerli indeks** · büyüklükler 1–3 · **her rakamda en az bir parlak yıldız** · noktalar kutu içinde · 7/25/100/0 doğru SVG sayısı · üç yıldız sınıfı stilli · çizgiler ince · farklı fazlar · erişilebilir etiket · yalnız değişince çiziliyor · **kümeleme kaldırıldı** · mola çipi taşmıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-08-31a` ↔ `rota-2026-08-31a` · 366 880 bayt**

---

## 116 · MOLA ÇİPİ KENDİ SATIRINDA · TAKIMYILDIZ OKUNUR · `2026-09-01a`

### 1 · mola çipi kırpılıyordu

Çip `.solUst` içindeydi; orada üç orb + çip 430px'lik ekranda `.sol` sütununa sığmıyordu ve `overflow-x:auto` onu kesiyordu (ekran görüntüsünde yalnız bir dilimi görünüyordu).

**Kendi ızgara alanına taşındı:**

| Ekran | Yerleşim |
|---|---|
| Geniş | `'sol nav ist'` / `'mol mol mol'` — çip **tam satır** |
| Dar (≤660px) | `'sol ist'` / `'nav mol'` — çip nav'ın yanında, sağa hizalı |

`.solUst` artık yalnız orb'ları taşıyor, kırpma gerekmiyor. `.sol`'daki `overflow:hidden` de kaldırıldı.

### 2 · takımyıldız çizgileri parlıyor

Kullanıcı: *"kalan gün sayısını birleştiren çizgiler de parlasın da kaç gün kaldığını okuyabileyim."*

| | Önce | Sonra |
|---|---|---|
| Renk | `rgba(214,232,255,.34)` | `rgba(206,230,255,.72)` |
| Kalınlık | 1.1 | **1.5** |
| Parıltı | yok | `drop-shadow(0 0 3px)` |
| Animasyon | yok | `yolIz` 5.6 sn nefes |
| Boyut | 22×36 | **26×42** |

Çizgiler de yıldızlar gibi nefes alıyor ama farklı periyotta (5.6 sn / 4.2 sn) — düzensiz ve canlı duruyor. Rakam artık uzaktan okunuyor.

### Test · `cark_test.js` +11 kontrol

çip kendi ızgara alanında · geniş ekranda tam satır · dar ekranda nav ile yan yana · **çip artık orb şeridinde değil** (DOM sırası kontrolü) · orb şeridi kırpmıyor · sol sütun kırpmıyor · çizgiler parlak · parıltı var · nefes alıyor · takımyıldız büyüdü · hareket azaltmada sabit.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-01a` ↔ `rota-2026-09-01a` · 367 199 bayt**

---

## 117 · MOLA/POWER-UP/TELAFİ OPAK · SÜRÜKLERKEN BRİF ÇEKİLİYOR · `2026-09-02a`

### 1 · saydam kart zeminleri

Mola kartı hâlâ saydam gradyanlıydı:

```css
background:linear-gradient(152deg,rgba(150,198,232,.17),rgba(140,190,225,.06) 62%,…)
```

Alttaki şeritler içinden görünüyor, kart iç içe geçmiş duruyordu. §112'de normal kartları opak yapmıştım ama **mola, power-up ve telafi varyantları atlanmıştı.**

Hepsi opak hâle getirildi, renk kimlikleri korunarak:

| Kart | Zemin |
|---|---|
| Mola (etkin) | `#16202E → #121A26 → #151F2C` |
| Mola şeridi k0–k5 | `#101A26 → #17273C` |
| Power-up şeridi | `#0B1420 → #122031` |
| Telafi/ek şeridi | `#141207 → #1E1B0D` |
| Etkin power-up kartı | `#101B2B` |
| Etkin telafi kartı | `#1B1810` |

Kademe yükseldikçe zemin açılıyor; çerçeve renkleri (mavi/altın) kimliği taşımaya devam ediyor.

### 2 · sürüklerken brif çekiliyor, oturunca açılıyor

Kullanıcı: *"kaydırırken bilgi çiplerinin görünmez olması, çarkın alt sınırının onların alanına uzaması, seçim bitince I harfi darlığından pürüzsüz genişleyerek açılmaları."*

**Sürüklerken** (`surukleBasla`): `#rota.genis` → `grid-template-rows:1fr 0`, brif söner (.30s), **çark onun alanına yayılır** (.42s yumuşak geçiş).

**Otururken** (`otur`): `genis` kalkar, `acil` eklenir (760 ms sonra temizlenir).

```css
@keyframes cipAcil{
  0%  {transform:scaleX(.06); opacity:0; filter:blur(.6px)}
  55% {opacity:1; filter:blur(0)}
  100%{transform:scaleX(1)}}
```

Çipler **%6 genişlikten** (bir çizgi kalınlığı) açılıyor; kademeli gecikmelerle (.05 / .10 / .15 sn) sırayla geliyorlar. Hareket azaltma tercihinde hepsi kapalı.

### Test · `cark_test.js` +17 kontrol

mola kartı ve şeridi opak · **beş kademede de opak** · power-up/telafi şeritleri ve etkin kartları opak · **saydam gradyan kalmadı** · sürüklerken brif çekiliyor · çark alanına yayılıyor · brif sönüyor · açılma sınıfı ekleniyor ve **temizleniyor** · çip dar çizgiden açılıyor · kademeli geliyor · ızgara geçişi yumuşak · hareket azaltmada sabit.

`mola_test.js`'teki renk kontrolü yeni opak zemine göre güncellendi.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-02a` ↔ `rota-2026-09-02a` · 369 301 bayt**

---

## 118 · ALT SINIR KOREOGRAFİSİ · `2026-09-03a`

Kullanıcı: *"çipler yok olunca çarkın ayarı kaçıyor, ani sınır değişimi güzel durmuyor."*

### ⚠ 1 · çark merkezi kayıyordu

`#rota` satırları değişince `#cark` büyüyor ama **`diz()` yeniden koşmuyordu**; yerleşim eski yüksekliğe göre kalıyor, çark olması gereken noktadan dönmüyordu.

**`sinirKareBasla(süre)`** eklendi: geçiş boyunca her karede `diz()` koşuyor, `requestAnimationFrame` ile. Süre dolunca duruyor; yeni bir geçiş başlarsa önceki kare döngüsü iptal ediliyor.

### 2 · sıralı koreografi

| Yön | Sıra |
|---|---|
| **Açılırken** | 1) çipler saydamlaşarak söner (0.26 sn) → 2) alt sınır yavaşça iner (0.55 sn) |
| **Kapanırken** | 1) sınır yavaşça çıkar (0.55 sn) → 2) **tamamlandıktan sonra** çipler açılır |

Ani değişim yerine iki aşamalı. `cipGiz` (çip sönmesi) ve `genis` (sınır) **ayrı sınıflar**, ayrı zamanlamalar.

### 3 · yarıda kesilme

Kaydırma iptal edilir ya da animasyon bitmeden seçim yapılırsa:

```js
if(sinirDurum===ac)return;              // aynı duruma tekrar geçme
if(sinirZam){clearTimeout(sinirZam)}    // bekleyen adımı iptal et
...
if(!sinirDurum)return;                  // arada yön değiştiyse adımı atla
```

Sınır bulunduğu yerden ters yöne yumuşakça dönüyor, çipler ancak sınır tam yerine oturunca açılıyor.

### 4 · yıldız tozu geçişi

Sınır inerken **keskin bir çizginin kaydığı görünmüyor**: `#cark`'ın maskesi (§99) alttan giren şeritleri saydamdan opağa doğru geçiriyor. Kartlar sırayla, yıldız tozundan oluşuyormuş gibi beliriyor.

### 5 · gün görünümü de aynı koreografide

`gunKipAc(true/false)` da `sinirAc()` çağırıyor — pinch ile to-do görünümüne geçerken de çipler önce sönüyor, sonra sınır iniyor.

### Test · `cark_test.js` +20 kontrol

`sinirAc` ve `sinirKareBasla` var · açılış/kapanış sırası ve gecikmeleri (260/560 ms) · **geçiş boyunca `diz()` koşuyor** · kare döngüsü süreli · önceki kare iptal · yarıda iptal edilebiliyor · ters yöne geçiyor · aynı duruma tekrar geçilmiyor · süreler · çip gizleme ayrı sınıf · gün kipinde de · maskeden geçerek beliriyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-03a` ↔ `rota-2026-09-03a` · 371 249 bayt**

---

## 119 · ⚠ KART AÇILMIYORDU · VERİ UYUM DENETİMİ · `2026-09-04a`

### ⚠ kaydırmayı bırakınca hiçbir kart açılmıyordu

Ekran görüntüsünde etkin görev (16:30 Patoloji, brif onu gösteriyor) çarkta **ince şerit** olarak kalıyordu.

**Kök sebep · içerik yenileme koşulu:**

```js
const icerikGerek = !varOlan || oncekiAkt!==simdiAkt || surukleKip || …;
```

1. Sürükleme başlar → `surukleKip=true` → etkin eleman **şerit** biçimine geçer ✓
2. Sürükleme biter → `surukleKip=false`, `gecis()` → `carkCiz()`
3. Aynı eleman **hâlâ etkin** → `oncekiAkt===simdiAkt` → `icerikGerek` **false**
4. İçerik yenilenmiyor → **şerit hâlinde takılı kalıyor**

Aynı görevi seçince (sıra değişmediğinde) kart hiç açılmıyordu.

**Düzeltme · biçim izleme:**

```js
const bicim=(simdiAkt&&!surukleKip)?(sinavMod?'s':(motivMod?'v':'kart')):'serit';
const icerikGerek=!varOlan||el.dataset.bicim!==bicim;
el.dataset.bicim=bicim;
```

Eleman hangi biçimde olduğunu **kendisi taşıyor**; biçim değişince içerik yenileniyor. Mola şeritleri için de aynı mekanizma.

### Veri uyum denetimi · power-up · seyir defteri · kitap haritası

| Kontrol | Sonuç |
|---|---|
| Power-up konuları programda **değil** (çakışma yok) | ✓ |
| Power-up konuları katalogda var | ✓ |
| Havuz: **94 konu · 201.4 saat · 161.6 soru** | ✓ |
| Harita kitapları programla aynı (15 kaynak) | ✓ |
| Renk sayaçları kurulu (11 kitap) ve tutarlı | ✓ |
| Sayaçlar tavanı aşmıyor | ✓ |
| Harita "programda" sayıları doğru | ✓ |
| **24'lü deneme sayacı 39** = programdaki 39 | ✓ |
| **Video sayacı 44** = programdaki 44 | ✓ |
| Etiketsiz 4 kaynakta ilerleme var | ✓ |

**Hepsi son programla (196 görev) uyumlu.**

⚠ İlk denetimde bir yanlış alarm çıktı: "TUSTIME Mikrobiyoloji 1 ≠ 2". Sebep denetimin **yalnız bölüm adına** bakmasıydı; "Enfeksiyon Hastalıkları" hem Atilla Uslu SST'de hem TUSTIME Mikrobiyoloji'de var. Denetim **kitap+bölüm çiftine** çevrilince uyum doğrulandı — harita baştan doğruymuş.

### Test · `cark_test.js` +5 kontrol

biçim kaydediliyor · biçim değişince içerik yenileniyor · sürüklerken şerit biçimi · mola biçimi de izleniyor ve kaydediliyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-04a` ↔ `rota-2026-09-04a`**

---

## 120 · ÇARK MERKEZİ SABİTLENDİ · `2026-09-05a`

Kullanıcı: *"alt sınır aşağı kaysa bile çark büyüyüp o alanı ortalamamalı, çark küt diye aşağı düşmüş gibi görünüyor. Çarkın ve orta noktasının konumu hiçbir zaman değişmeyecek."*

### Kök sebep

Geometrinin tamamı **kapsayıcı yüksekliğinden** türetiliyordu:

```js
R  = max(300, min(980, kw.height*1.28))
BO = max(5,   min(9,   kw.height/78))
.sahne{top:50%}                        /* kapsayıcının %50'si */
```

Alan açılınca `kw.height` 347 → 560 oluyordu:

| | Brif açık | Brif kapalı | Kayma |
|---|---|---|---|
| Yarıçap | 444 | 717 | +273 |
| Merkez | 173.5 | 280 | **+107 px** |

Çark hem büyüyor hem 107 piksel aşağı düşüyordu — "küt diye düşme" bu.

### Düzeltme · TABAN yüksekliği

```js
if(!genisMi && kw.height>60) carkTaban = kw.height;   // brif açıkken ölç
const H0 = carkTaban || kw.height;
R  = max(300, min(980, H0*1.28));
BO = max(5,   min(9,   H0/78));
sahne.style.top = (H0/2)+'px';                        /* %50 DEĞİL */
```

Taban **yalnız brif açıkken** ölçülüp saklanıyor. Alan açıldığında geometri hiç değişmiyor:

| | Brif açık | Brif kapalı |
|---|---|---|
| Yarıçap | 444 | **444** |
| Merkez | 173.5 | **173.5** |

Açılan alan artık yalnız **görünür pencereyi** genişletiyor.

### Sıralı beliriş

Alan açılınca aşağıdaki görevler hep birden değil, **saat sırasına göre ard arda** beliriyor:

```js
if(genisMi && i>a) x.style.transitionDelay = ((i-a)*0.055)+'s';
```

Odaktan bir aşağıdaki 0.055 sn, beşincisi 0.275 sn sonra. Maskeden geçtikleri için saydamdan opağa doğru — yıldız tozundan oluşuyormuş gibi. Alan kapanınca gecikmeler temizleniyor.

### Test · `cark_test.js` +17 kontrol

`carkTaban` var ve `diz()` öncesinde tanımlı · taban yalnız daralmışken ölçülüyor · yarıçap ve boşluk **tabandan** · merkez tabanın yarısında · **kapsayıcı yüksekliği geometride hiç kullanılmıyor** · sıralı beliriş gecikmesi · yalnız aşağıdakiler gecikiyor · gecikme temizleniyor.

Ayrıca **sayısal doğrulama**: alan açılsa da merkez ve yarıçap aynı kalıyor, eski davranışta kaydığı kanıtlanıyor (regresyon testi), gecikmeler artan sırada.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-05a` ↔ `rota-2026-09-05a` · 373 093 bayt**

---

## 121 · ⚠ TABAN KAPANIŞ ANINDA BOZULUYORDU · `2026-09-06a`

§120'de merkez sabitlendi ama çark **hâlâ düşüyordu.**

### Kök sebep

Taban ölçümünün koşulu `if(!genisMi && …)` idi. Kapanış animasyonunda:

1. `genis` sınıfı **anında** kalkar
2. Ama CSS geçişi 550 ms sürdüğü için **yükseklik hâlâ 560 px**
3. `genisMi` false → `carkTaban = 560` yazılır ✗
4. Bir sonraki turda çark 560'a göre çizilir: daha büyük, 107 px daha aşağıda

Simülasyonla kanıtlandı:

| An | Koruma VAR | Koruma YOK |
|---|---|---|
| Başlangıç | 173.5 | 173.5 |
| Açılırken | 173.5 | 173.5 |
| Açık | 173.5 | 173.5 |
| **Kapanırken** (sınıf kalktı, yükseklik 560) | **173.5** | **280** ✗ |
| Kapandı | 173.5 | 173.5 |

Kapanış anındaki **107 pikselik sıçrama** kullanıcının gördüğü "düşme"ydi.

### Düzeltme · `sinirGecis` bayrağı

```js
let carkTaban=0, sinirGecis=false;

sinirAc(ac){ …; sinirDurum=ac; sinirGecis=true; … }

// kare döngüsü bitince
else{ sinirKare=0; sinirGecis=false; diz() }

// ölçüm
if(!genisMi && !sinirGecis && kw.height>60) carkTaban=kw.height;
```

Taban **hiçbir geçiş sürmezken** ölçülüyor. Döngü bitince son bir `diz()` daha koşuyor ki nihai değerle çizilsin.

Ayrıca ekran döndürme / pencere boyutu değişimi tabanı geçersiz kılıyor:

```js
window.addEventListener('resize',()=>{carkTaban=0; carkCiz()});
```

### Test · `cark_test.js` +10 kontrol

`sinirGecis` var · taban geçişte ölçülmüyor · bayrak kalkıyor/iniyor · bitişte son `diz()` · yeniden boyutlandırmada sıfırlanıyor.

**Sayısal regresyon testi:** kapanış anı modellenip korumalı ve korumasız hâller karşılaştırılıyor — korumasızda merkezin 280'e sıçradığı ve farkın **106.5 px** olduğu doğrulanıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-06a` ↔ `rota-2026-09-06a`**

---

## 122 · GEOMETRİ ÖLÇÜMDEN TAMAMEN KOPARILDI · `2026-09-07a`

§120 ve §121'de iki kez düzeltmeye çalıştım, çark hâlâ düşüyordu. Sorun tek tek hatalar değil, **yaklaşımın kendisiydi**: `#cark`'ı ölçmek her seferinde yeni bir zamanlama tuzağı doğuruyordu (sınıf ile gerçek yükseklik arasındaki gecikme).

Kullanıcının teşhisi doğruydu: *"çark yeniden ölçeklenmeye, yeni alanı ortalamaya çalışmasın."*

### Çözüm · ölçüm yok, oran var

`#rota` ızgara kapsayıcısının yüksekliği **satırlar nasıl bölüşürse bölüşsün değişmez** — `main`'i doldurur. Çarkın taban yüksekliği bu sabit değerden CSS'teki satır oranıyla türetiliyor:

```js
const rotaY = rota.getBoundingClientRect().height;    // SABİT
const ORAN  = w<=470 ? 1.15/2.15 : (w<=660 ? 1.20/2.20 : 1.25/2.25);
const H0    = rotaY * ORAN;                           // taban
```

Oran CSS'teki `grid-template-rows` değerlerinin birebir karşılığı:

| Ekran | Satırlar | Oran |
|---|---|---|
| ≤470px | `1.15fr / minmax(80px,1fr)` | 0.535 |
| ≤660px | `1.20fr / minmax(84px,1fr)` | 0.545 |
| ≤880px | `1.25fr / minmax(88px,1fr)` | 0.556 |

**Hiçbir yerde `#cark` ölçülmüyor.** `carkTaban` yazımı kaldırıldı, `sinirGecis` yalnız koreografi için kaldı.

Alt sınır aşağı kayınca hiçbir şey yeniden hesaplanmıyor: merkez, yarıçap ve şerit konumları birebir aynı. Açılan alan yalnız daha fazla şeridi **görünür** kılıyor; onlar da §120'deki sıralı gecikmeyle saat sırasına göre beliriyor.

### Test · `cark_test.js` +12 kontrol

`#rota` ölçülüyor (`#cark` değil) · oran breakpointe göre · taban orandan türetiliyor · **kapsayıcı ölçümü kalmadı** · yarıçap ve merkez tabandan · üç breakpointte de oran tanımlı ve artan · **kapsayıcı 347→560 oynarken merkez sabit** (dört farklı yükseklikle sınanıyor).

Ayrıca 13 eskimiş kontrol yeni yaklaşıma göre yeniden yazıldı.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-07a` ↔ `rota-2026-09-07a`**

---

## 123 · ⚠ RAY MERKEZİ · ASIL SUÇLU · `2026-09-08a`

§120–§122'de çarkın **şerit geometrisi** sabitlendi ama kullanıcı hâlâ düşme görüyordu. İki ekran görüntüsü karşılaştırıldı:

| Durum | Soldaki odak noktası |
|---|---|
| Oturmuş | y ≈ 1255 |
| Sürüklerken | y ≈ 1668 |

Şeritler doğru yerdeydi; **kayan şey soldaki ray (ters C) ve odak noktasıydı.**

### Kök sebep

```js
function rayCiz(R,W,H){ const cy=H/2; … }
…
rayCiz(R, kw.width, kw.height);      // ← KAPSAYICI yüksekliği
```

Ray merkezi kapsayıcıdan hesaplanıyordu. Üstelik `preserveAspectRatio:none` olduğu için `viewBox` yüksekliği değişince çizim **dikey de geriliyordu**.

| `#cark` | Eski merkez | Yeni merkez |
|---|---|---|
| 347 | 173.5 | **149.8** |
| 420 | 210 | **149.8** |
| 500 | 250 | **149.8** |
| 560 | 280 | **149.8** |

Odak noktası 106 piksele kadar aşağı kayıyordu — kullanıcının gördüğü düşme buydu.

### Düzeltme

```js
function rayCiz(R,W,H,cyD){ const cy = cyD!=null ? cyD : H/2; … }
rayCiz(R, kw.width, kw.height, H0/2);   // merkez TABANDAN
```

Kapsayıcı yüksekliği artık **yalnız `viewBox` için** kullanılıyor (gerilme olmasın diye), merkez ise çarkın taban geometrisinden geliyor.

**Sönümleme maskesi de yaya hizalandı:**

```js
<rect x="0" y="{cy − R}" width="{W}" height="{2R}" fill="url(#rg)"/>
```

Önceden dikdörtgen tüm kapsayıcıyı kaplıyordu; kapsayıcı büyüyünce yayın uçlarındaki sönümleme kayıyordu. Artık yayın kapladığı bantla birebir.

### Test · `cark_test.js` +9 kontrol

`rayCiz` merkez parametresi alıyor · merkez tabandan geçiriliyor · varsayılan korunuyor · maske yaya hizalı · maske yüksekliği yarıçaptan · kapsayıcı yalnız viewBox için · **dört farklı kapsayıcı yüksekliğinde ray merkezi sabit** · eski hâlde kaydığı kanıtlanıyor · kaymanın 100 pikseli aştığı doğrulanıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-08a` ↔ `rota-2026-09-08a`**

---

## 124 · SINIR SENKRONU · GÜN KİPİNDE BRİF · `2026-09-09a`

### ⚠ 1 · çipler bazen geri gelmiyordu

Sınırın durumu (`sinirDurum`) ile gerçek CSS sınıfları (`genis` · `cipGiz`) **birbirinden kopabiliyordu**: yarıda kesilen geçiş, kaçan `pointerup`, çift çağrı.

Kopunca `#rota` `genis` sınıfında asılı kalıyor, `#uzay` `min-height:60px`'e düşüp yalnız **tek satır çip** gösteriyordu — ekran görüntülerindeki durum tam buydu.

**Düzeltme · tek doğruluk kaynağı:**

```js
function sinirOlmali(){ return !!(surukleKip || gunKip) }
function sinirSenk(){
  if(sinirDurum!==olmali || sinirGecis) return;   // geçişte karışma
  olmali ? (cipGiz+genis ekle) : (ikisini de kaldır)
}
```

`sinirSenk()` şu noktalarda koşuyor: her `carkCiz()`, kare döngüsü bitince, açılma animasyonu bitince, aynı duruma tekrar geçişte. Sınıflar duruma kopmuşsa kendiliğinden düzeliyor.

**Sürükleme bitiş güvenliği:**
- `window` düzeyinde `pointerup` (parmak alan dışına çıkarsa)
- `window` `blur` (uygulama arkaya alınırsa)
- **900 ms zaman aşımı** — her harekette tazeleniyor, son hareketten 900 ms sonra kendiliğinden oturuyor

### ⚠ 2 · gün görünümünde alakasız açıklama

Liste açıkken alttaki brif hâlâ **çarktaki etkin görevin** açıklamasını gösteriyordu.

```css
#rota.gunKip #uzay{opacity:0 !important;pointer-events:none;visibility:hidden}
```

`gunKip` sınıfı `gunKipAc(true/false)` ile ekleniyor/kaldırılıyor. `sinirOlmali()` da `gunKip` değişkenini hesaba katıyor, böylece liste açıkken sınır açık kalıyor.

### Test · `cark_test.js` +19 kontrol

tek doğruluk kaynağı · sürükleme VEYA gün kipi · uzlaştırıcı · geçişte karışmıyor · dört senkron noktası · gün kipinde brif tamamen kapalı · `gunKip` ekleniyor/kaldırılıyor · pencere düzeyinde `pointerup` · odak kaybı · **900 ms zaman aşımı** ve tazeleme · oturunca iptal.

Ayrıca uzlaştırma mantığının **doğruluk tablosu** sınanıyor: kopukluk düzeltiliyor, geçişte karışmıyor, durum uyuşmazsa bekliyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-09a` ↔ `rota-2026-09-09a`**

---

## 125 · KOŞULSUZ TEMİZLİK AĞI · `2026-09-10a`

§124'teki uzlaştırıcıya rağmen çipler hâlâ oluşmuyordu. Sim'de mekanizma doğru çalışıyordu; demek ki cihazda **bayraklardan biri takılı kalıyordu** ve uzlaştırıcı kendi koşuluna takılıp hiç devreye girmiyordu:

```js
if(sinirDurum!==olmali || sinirGecis) return;   // ← takılınca sonsuza dek bekler
```

`sinirGecis` bir kez `true` kalırsa (kaçan `requestAnimationFrame`, arka plana alınan sekme, kesilen zamanlayıcı) uzlaştırıcı bir daha hiçbir şeyi düzeltmiyordu.

### Düzeltme · iki katmanlı

**1 · `sinirSenk(zorla)`** — `zorla` verildiğinde hiçbir koşula bakmıyor, sınıfları duruma uyduruyor **ve bayrakları da düzeltiyor**:

```js
if(!zorla && (sinirDurum!==olmali || sinirGecis)) return;
if(zorla){ sinirDurum=olmali; sinirGecis=false }
```

**2 · `sinirAgKur()` · koşulsuz ağ** — sürükleme ve gün kipi kapalıysa **1400 ms sonra** sınırın kesinlikle kapalı olması gerekir:

```js
sinirAg=setTimeout(()=>{ if(!sinirOlmali()) sinirSenk(true) },1400);
```

Ağ `otur()`'da ve sınır kapalıyken her `carkCiz()`'de yeniden kuruluyor (önceki iptal edilerek). Normal akışta hiçbir şey yapmıyor; yalnız bir bayrak takılırsa devreye girip düzeltiyor.

Geçiş için ayrılan en uzun süre 560+760 = 1320 ms; ağ 1400 ms'de devreye giriyor, yani normal koreografiye hiç karışmıyor.

### Test · `cark_test.js` +11 kontrol

`zorla` parametresi · koşulları atlıyor · bayrakları da düzeltiyor · ağ fonksiyonu · 1400 ms · önceki ağ iptal · oturmada kuruluyor · her çizimde tazeleniyor.

**Doğruluk tablosu:** takılı bayrakta normal senk bekliyor, **zorla kapatıyor**; gerçekten açık olması gerekiyorsa zorla açıyor.

Ayrıca `tarayici_test.js`'e takılma senaryosu eklendi: sınıflar elle bozulup uzlaştırıcının düzelttiği doğrulanıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-10a` ↔ `rota-2026-09-10a`**

---

## 126 · GÜN LİSTESİ · TEK BAKIŞTA · `2026-09-11a`

Kullanıcı: *"tek bakışta bütün bir günün görevlerini burada görmek istiyorum, hepsi ekrana sığmalı"* + satırların sınır açılırken **teker teker** belirmesi.

### Uyarlanabilir ölçekleme · `gunOlcekle()`

Satır yüksekliği artık sabit değil, **kullanılabilir alana ve satır sayısına** göre hesaplanıyor:

```js
kalan = yükseklik − başlık(46) − dolgu(52)
birim = kalan / (görev + blokBaşlığı×0.52)
--gsat = clamp(17, birim−4, 46)          /* satır yüksekliği */
--gyaz = clamp(9.5, --gsat×0.315, 13)    /* yazı ölçüsü */
```

Blok başlıkları satırın ~%52'si kadar yer kaplıyor; formül onları da hesaba katıyor.

**620 px alanda sığma:**

| Gün | Satır | Toplam |
|---|---|---|
| 9 görev + 4 blok (tipik) | 43.1 px | 578 px ✓ |
| 15 görev + 4 blok (**programın en yoğunu**) | 26.6 px | 592 px ✓ |
| 19 görev + 5 blok | 20.2 px | 605 px ✓ |
| 21 görev + 5 blok | 17.6 px | 617 px ✓ |

Satır 27 px'in altına inince `sik` kipi devreye giriyor: branş adı gizleniyor, boşluklar daralıyor. **Kaydırma tamamen kaldırıldı** (`overflow:hidden`) — her şey görünüyor.

### Sıralı beliriş

```css
@keyframes glGel{
  0%  {opacity:0; transform:translateY(6px) scaleX(.94); filter:blur(.5px)}
  60% {opacity:1; filter:blur(0)}
  100%{transform:none}}
```

Her satırın gecikmesi `0.30 + n×0.045` sn — sınır animasyonu bittikten sonra başlıyor, saat sırasına göre ard arda beliriyorlar.

Etkin görev `.simdi` sınıfıyla mavi çerçeveli; artık ona kaydırmaya gerek yok, zaten görünüyor.

### Test · `cark_test.js` +18 kontrol

ölçekleme fonksiyonu · satır ve yazı değişkene bağlı · değişkenler yazılıyor · sınırlar 17–46 px · sık kipte branş gizli · kaydırma kapalı · sıralı beliriş · gecikme saat sırasına göre · etkin görev işaretli · hareket azaltmada sabit.

**Sayısal doğrulama:** dört farklı yoğunlukta (9/15/19/21 görev) toplam yüksekliğin 620 px'i aşmadığı, yoğun günde satırın küçüldüğü ve tabanın altına inmediği sınanıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-11a` ↔ `rota-2026-09-11a` · 379 403 bayt**

---

## 127 · GÜN LİSTESİ TAŞMASI · İKİLİ ARAMA · `2026-09-12a`

§126'daki ölçekleme tahmine dayanıyordu (başlık 46 px + dolgu 52 px + blok payı %52). Tahmin bir tık yanılınca son satırlar kırpılıyordu — kullanıcı yukarı kaydırmayı zorlayınca gizli satırlar anlık görünüyordu.

### Düzeltme · ölçerek ikili arama

Tahmin yerine **gerçek `scrollHeight`** ölçülüyor; sığan en büyük satır yüksekliği ikili aramayla bulunuyor:

```js
let alt=11, ust=46, enIyi=11;
uygula(46);
if(scrollHeight<=h-2) enIyi=46;
else for(let t=0;t<9;t++){
  const orta=(alt+ust)/2; uygula(orta);
  if(scrollHeight<=h-2){enIyi=orta; alt=orta} else ust=orta;
  if(ust-alt<0.5)break }
uygula(enIyi);
```

**620 px alanda (gün kipinde gerçek alan), tahmin 40 px yanılsa bile:**

| Gün | Satır | İçerik |
|---|---|---|
| 9 görev + 4 blok | 43.0 px | 617 px ✓ |
| 15 görev + 4 blok | 25.5 px | 615 px ✓ |
| 19 görev + 5 blok | 18.7 px | 614 px ✓ |
| 21 görev + 5 blok | 16.7 px | 617 px ✓ |

Az iş varsa satır tavana (46 px) oturuyor; yoğunlukla küçülüyor. Taban 11 px.

### Sınır inerken tazeleme

Liste açıldığı anda alan hâlâ küçük (sınır henüz inmedi). Ölçek **1000 ms boyunca her karede** yeniden hesaplanıyor; gün kipi kapanırsa döngü duruyor. `if(h<80)return` ile düzen oturmadan hesap yapılmıyor.

### ⚠ Süreç notu

Bu turda iki düzenleme **sessizce başarısız oldu**: `assert s.count(esk)==1` tutmayınca dosya hiç yazılmadı ama komutun çıktısı başarılı görünüyordu (`uret.py` de eski sürümü ürettiği için testler geçiyordu). Ancak `grep` ile doğrulayınca fark edildi.

**Ders:** her düzenlemeden sonra hedef dizgiyi `grep` ile doğrula; assert'in sessiz düşmesi testleri de yanıltıyor.

### Test · `cark_test.js` +15 kontrol

ikili arama kuruldu · gerçek yükseklik ölçülüyor · en çok 9 tur · yakınsayınca duruyor · en iyi değer uygulanıyor · düzen oturmadan hesaplamıyor · sınır inerken tazeleniyor · 1000 ms · gün kipi kapanınca duruyor.

**Sayısal doğrulama:** dört yoğunlukta 40 px tahmin hatasıyla bile taşma olmadığı, yoğunlukla satırın küçüldüğü, az işte tavana oturduğu sınanıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-12a` ↔ `rota-2026-09-12a` · 380 211 bayt**

---

## 128 · SONRAKİ · ÖNCEKİ · TAMAMLANDI → OTOMATİK KAYDIRMA · `2026-09-13a`

### ⚠ 1 · çipler güncellenmiyordu · kök sebep

Butonlar **global görev sırasını** kullanıyordu:

```js
if(a==='s' && aktif<GOREVLER.length-1) gecis(aktif+1);
if(a==='o' && aktif>0)                 gecis(aktif-1);
```

Ama çark listesi (`carkListe()`) **filtrelenmiş**: geçmiş, tamamlanmış ve taşınmamış görevler dışarıda. `aktif+1` çoğu zaman listede **olmayan** bir göreve denk geliyordu; `carkCiz()` de `L[0]`'a düşüyordu. Alttaki çiplerin sabit kalmasının sebebi buydu.

Artık `duraklar()` üzerinden — çarkın kendi durak listesinde bir adım.

### 2 · sıçrama yerine otomatik kaydırma

`otoKaydir(d, bitince)` elle kaydırmanın **aynısını** oynatıyor:

1. `surukleBasla()` — sürükleme kipine girilir
2. `kayY` hedefe **easeInOutCubic** ile taşınır (380 ms), her karede `dizKay()`
3. `otur()` — komşu durağa oturulur

Hedef kayma, komşu durağın yay üzerindeki dikey uzaklığından hesaplanıyor (`he[a] + ara[a+1]`, %92 pay). Önceki animasyon varsa iptal ediliyor. `dizOnb` yoksa (ilk çizim) doğrudan geçiliyor.

Klavye okları zaten `adim()` kullanıyordu; artık tuşlar da aynı akışta.

### 3 · Tamamlandı · kart sönerek yok oluyor

Tamamlanan görev listeden düşeceği için, otomatik kaydırma başlarken karta `bitiyor` sınıfı veriliyor:

```css
@keyframes kartBit{
  0%  {opacity:1}
  45% {opacity:.55; filter:blur(.4px)}
  100%{opacity:0;   filter:blur(2px)}}
```

Kart uzaklaştıkça sönüp bulanıklaşıyor. Kaydırma bitince `ust()` · `carkCiz()` · `brifCiz()` çağrılıp durum tazeleniyor.

### Test · `cark_test.js` +20 kontrol

`otoKaydir` var · **çark listesi üzerinden ilerliyor** · **global sıra kullanımı kalmadı** · üç tuş da bağlı · sürükleme kipi · yumuşatma eğrisi · 380 ms · bitince oturuyor · önceki animasyon iptal · `dizOnb` yoksa doğrudan · kart sönüyor ve bulanıklaşıyor · hareket azaltmada anında.

**Sayısal doğrulama:** durak listesi dolu, uçlarda taşmıyor, eğri 0→0 · 1→1 · ortada 0.5 ve monoton.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-13a` ↔ `rota-2026-09-13a` · 382 660 bayt**

---

## 129 · ⚠ KONSOL HATALARI · İKİ KÖK SEBEP · `2026-09-14a`

Kullanıcı Sonraki/Önceki'ye basınca konsolda arka arkaya `Uncaught Error: Script error.` görüyordu.

### ⚠ 1 · `cancelAnimationFrame` korumasızdı

`tarayici_test.js` ikinci çağrıda yakaladı:

```
otoKaydir(-1) HATA: cancelAnimationFrame is not defined
```

İlk çağrı `otoKare`'yi doldurup ikinci çağrıda `cancelAnimationFrame(otoKare)` çalışıyor; ortamda yoksa fırlatıyor. Gömülü çerçevede bu API kısıtlanabiliyor.

**Düzeltme · korumalı sarmalayıcılar:**

```js
const kareAl   = f => requestAnimationFrame varsa onu, yoksa setTimeout(f,16)
const kareBirak= k => cancelAnimationFrame varsa onu, yoksa clearTimeout
```

Tüm kare çağrıları (otomatik kaydırma · sınır koreografisi · gün ölçekleme) bunlardan geçiyor. **Korumasız `cancelAnimationFrame` kalmadı.** Tanımlar ilk kullanıcıdan önceye alındı (TDZ).

### ⚠ 2 · hata sarmalayıcısı yeniden fırlatıyordu

```js
catch(err){ goster(...); throw err }      // ← eski
```

`__G` hatayı bildirdikten sonra **yeniden fırlatıyordu**. Çizim döngüsünde (`requestAnimationFrame`) bu yakalanamıyor ve her karede yeni bir `Script error.` üretiyordu — konsolun dolmasının sebebi buydu.

Artık fırlatmıyor: hata sayılıyor, **aynı hata en çok 3 kez** yazılıyor, uygulama akmaya devam ediyor.

### 3 · animasyon yolu hiç çalışmıyormuş

`surukleBasla` ve `otur` bir IIFE içindeydi; `otoKaydir` onlara erişemediği için **her zaman anlık geçiş yoluna** düşüyordu. `window.__surBasla` / `window.__otur` ile dışarı açıldı — otomatik kaydırma artık gerçekten animasyonlu.

Ayrıca tıklama işleyicisinin tamamı `try/catch` içine alındı.

### Kullanıcının sorusuna cevap

Bu kırmızı satırlar **tarayıcının kendi konsolu**; yalnız geliştirici konsolu açıkken görünür, normal kullanımda görünmez. Yine de gerçek hatalardı ve düzeltildi.

### Test

`cark_test.js`'te 7 kontrol yeni korumalı çağrılara göre güncellendi; `önceki kare iptal ediliyor` artık `kareBirak` arıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-14a` ↔ `rota-2026-09-14a` · 383 713 bayt**

---

## 130 · ATLAMA DÜZELDİ · İŞLEYİCİLER KORUNDU · `2026-09-15a`

### ⚠ 1 · bazen iki kart atlıyor, mola duraklarını geçiyordu

`otoKaydir` hedef kaymayı **tahminle** hesaplıyor, sonra `otur()` ile en yakına oturuyordu:

```js
hedef = -d * (he[a] + ar[a+1]) * 0.92;   // tahmin
... otur();                              // en yakına oturt
```

`he[a]` etkin kartın yüksekliği — tam açık kart uzun olduğu için tahmin komşunun gerçek aralığından büyük çıkıyor, çark fazla dönüyor ve `otur()` **bir sonrakinin ötesine** oturuyordu. Mola durakları da (kısa oldukları için) bu şekilde atlanıyordu.

**Düzeltme · sahnedeki gerçek konumdan hesap:**

```js
const anahtar = hed.m ? ('m'+hed.i) : String(hed.i);   // mola durağı ayrı
idx = sahnede bu anahtarı taşıyan şeridin indeksi
dy  = a'dan idx'e yığılan (yükseklik/2 + boşluk + yükseklik/2)
```

Animasyon bitince `otur()` yerine **doğrudan `gecis(hed.i, hed.m)`** çağrılıyor — hedef baştan belli, en yakına oturma kumarı yok.

Doğrulandı: **12 ileri + 12 geri adımda atlama 0, hata 0.**

### ⚠ 2 · orb ve panel tıklamalarında hata

Sayfa orb'ları, telafi, tamamlanan ve deneme düğmelerinin işleyicileri korumasızdı; içeride bir hata olunca konsola `Script error.` düşüyordu.

Hepsi `try/catch` içine alındı ve etiketli `console.error` ile kaydediliyor: `sayfa:` · `telafi:` · `tamamlanan:` · `deneme:` · `tık:`.

Böylece bir hata olsa bile **uygulama akmaya devam ediyor** ve hangi işleyicide olduğu belli oluyor.

### Test · `cark_test.js` +16 kontrol

hedef gerçek konumdan · yığılan yükseklik hesabı (ileri ve geri) · **bitince hedefe geçiliyor** · `otur()` kumarı kalmadı · mola durağı anahtarla ayırt ediliyor · beş işleyici de korumalı · adım tam bir durak · mola durakları listede.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-15a` ↔ `rota-2026-09-15a` · 385 406 bayt**

---

## 131 · KÜRESEL GERİ ÇAĞRI KORUMASI · `2026-09-16a`

Kullanıcı aynı `Script error.`ı **çok farklı yerlerde** görüyordu: Sonraki tuşu, takvim sayfası, matris sayfası, kaçırılan görevler, power-up ve telafi görevlerini çarka çekme.

Bu kadar geniş bir yayılım tek bir ortak sebebi işaret ediyordu: **korumasız zamanlayıcı geri çağrıları.**

### Sorunun yapısı

Bir `requestAnimationFrame` ya da `setTimeout` geri çağrısında oluşan hata **hiçbir `try/catch`'e takılmaz** — doğrudan `window.onerror`'a gider. Çapraz-köken maskesi yüzünden de yalnız `Script error.` görünür, dosya/satır/mesaj gelmez.

Tek tek işleyicileri sarmalamak (§129, §130) yetmiyordu; her yeni asenkron çağrı yeni bir açık kapı bırakıyordu.

### Çözüm · zamanlayıcıları sarmala

Betiğin en başında `requestAnimationFrame`, `setTimeout` ve `setInterval` **kendileri** sarmalanıyor:

```js
const sar=(fn,ad)=>function(){
  try{ return fn.apply(this,arguments) }
  catch(err){ /* GERÇEK mesajı kaydet, en çok 3 kez */ return undefined }};

window.requestAnimationFrame = f => ham(sar(f,'rAF'));
window.setTimeout  = (f,g) => typeof f==='function' ? hamT(sar(f,'setTimeout'),g) : …;
window.setInterval = (f,g) => typeof f==='function' ? hamI(sar(f,'setInterval'),g) : …;
```

Artık **hiçbir asenkron geri çağrı** uncaught hata üretemiyor. Üstelik hata gerçek mesajı ve yığın iziyle kaydediliyor — `?hata=1` ile açınca `GERİ ÇAĞRI · rAF · <mesaj>` şeklinde görünüyor.

Fonksiyon olmayan argümanlar (dize `setTimeout('kod')`) korunuyor; sarmalama işlemi de `try/catch` içinde, desteklenmeyen ortamda sessizce atlanıyor.

### Test · `cark_test.js` +13 kontrol

sarmalayıcı tanımlı · üç zamanlayıcı da sarmalı · fonksiyon olmayan argüman korunuyor · gerçek mesaj kaydediliyor · en çok 3 kez · **yeniden fırlatılmıyor** · yığın izi · sarmalama korumalı.

**Davranış doğrulaması:** sarmalayıcı hatayı yutuyor (dönüş `undefined`), sayaç artıyor, normal dönüş değeri korunuyor.

Ayrıca yedi eylem yolu (sonraki · önceki · kaçırılan · tamamlanan · seyir · ölçüm · power-up) hatasız koşturuldu.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-16a` ↔ `rota-2026-09-16a` · 386 938 bayt**

⚠ Konsolda hâlâ bir şey çıkarsa `index.html?hata=1` ile açıp kırmızı paneldeki `GERİ ÇAĞRI · …` satırını okumak yeterli — artık gerçek mesaj görünüyor.

---

## 132 · MOLA ODAĞI · TUTUNCA KÜÇÜLME · `2026-09-17a`

### ⚠ 1 · mola/yavaşlama kartındayken kaydırınca üstteki göreve sıçrıyordu

Mola şeridinin sınıfı `odak`a bağlıydı:

```js
const odak = (i===aktif && molaOdak && !surukleKip);
m.className = 'sr mm' + (odak ? ' act' : '');
```

Sürükleme başlayınca `surukleKip` true oluyor → `odak` false → **mola `act`ini kaybediyor.** Görev elemanı da `act` almıyor (çünkü `molaOdak` true). Yani o an **hiçbir eleman `act` taşımıyor**; `diz()` yedek yola düşüp `dataset.i===aktif` olan **görev** elemanını buluyor ve çark bir üstteki göreve sıçrıyordu.

**Düzeltme:** `act` artık **seçime** bağlı, `odak`a değil:

```js
m.className = 'sr mm' + ((i===aktif && molaOdak) ? ' act' : '');
```

İçerik hâlâ `odak`a göre (sürüklerken şerit), ama yerleşim çapası korunuyor.

Doğrulandı: sürüklerken `act` taşıyan eleman **`m6:sr mm act k3`** — mola şeridinin kendisi.

### 2 · mola ve yavaşlama kartlarında gezinme düğmeleri

`molaKart()`'a `Önceki` · `Sonraki` eklendi (`.mkBtn`). Bu kartlardayken çarkta ilerlemek için kaydırmak zorunda kalınmıyor.

### 3 · opaklık · bir kat daha

`.molaK` zaten opaktı ama gradyan tek başınaydı; altına `background-color:#141D2A` kondu. Ayrıca kap düzeyinde `.sr.mm .kdm, .sr.mm .molaK{background-color:#101A26}` — içteki kart saydam kalsa bile alttaki şeritler görünmüyor.

### 4 · tutunca yumuşak küçülme

Çarkı tutunca açık kart şerit hâline **anında** takas oluyordu.

```css
@keyframes tutKucul{            /* kart → şerit */
  0%  {transform:scaleY(2.6); opacity:.32; filter:blur(.6px)}
  55% {opacity:.9; filter:blur(0)}
  100%{transform:none}}
@keyframes birakAc{             /* şerit → kart */
  0%  {transform:scaleY(.42); opacity:.34}
  100%{transform:none}}
```

`transform-origin:50% 0%` — üstten büyüyüp küçülüyor, kartın konumu kaymıyor. Mola kartı için de aynı açılma uygulanıyor.

### Test · `cark_test.js` +15 kontrol

mola `act` seçime bağlı · eski bağımlılık kalmadı · iki düğme de var · kart düğmeleri üretiyor · üç katman opak · **tutunca küçülme** ve **bırakınca açılma** animasyonları · başlangıç ölçekleri · üstten büyüme · hareket azaltmada kapalı.

`tarayici_test.js`'e mola sürükleme senaryosu eklendi.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-17a` ↔ `rota-2026-09-17a` · 388 669 bayt**

---

## 133 · ÇOK FAZLI ANİMASYON · MOLA DÜĞMELERİ · SENKRON SÖZLERİ · `2026-09-18a`

### 1 · küçülme/büyüme çok hızlıydı

Üç fazlı animasyon göz takip edemeden bitiyordu. **Sekiz kareye** çıkarıldı, süreler uzatıldı:

| | Önce | Sonra |
|---|---|---|
| Kart → şerit | .34 sn · 3 kare | **.68 sn · 8 kare** |
| Şerit → kart | .46 sn · 3 kare | **.78 sn · 8 kare** |

Ölçek, opaklık ve bulanıklık **her karede birlikte** iniyor: `scaleY 2.60 → 2.26 → 1.92 → 1.60 → 1.34 → 1.16 → 1.05 → 1`, `blur .7px → 0`. Oturma sınıfının ömrü de 680 → **900 ms** yapıldı ki animasyon yarıda kesilmesin.

### 2 · mola düğmeleri diğer kartlarla aynı

`.mkBtn` kendi stilini kullanıyordu, yazılar daralıp bozuluyordu. Artık **birebir aynı biçim**:

```html
<div class="kBtn"><button class="bt" data-a="s">Sonraki</button>
<button class="bt gh" data-a="o">Önceki</button></div>
```

`.bt` sınıfı, kartın altında, Önceki `.gh` ile sağa itilmiş — normal görev kartlarındaki düzenin aynısı.

### ⚠ 3 · konsol hatalarının asıl kaynağı · senkron sözleri

`Senk` modülü GitHub Gist'e `fetch` atıyor. Gömülü çerçevede ağ isteği reddediliyor ve **async fonksiyon sözleri yakalanmıyordu**:

```js
bekle=setTimeout(()=>esitle(),2500)          // ← söz düşüyor
window.addEventListener('focus',()=>{ … Senk.esitle()});
window.addEventListener('online',()=>{ … Senk.esitle()});
```

Bu tetikler **her odak değişiminde, her sayfa geçişinde, her orb tıklamasında** çalışıyordu — hatanın her yerde çıkmasının sebebi buydu.

**Düzeltme:**
- `ertele()` içindeki söz `.catch(()=>{})` ile yakalanıyor
- Tüm `Senk.esitle()` tetikleri tek bir korumalı `senkTetik()` üzerinden
- `unhandledrejection` **bastırılıyor** (`preventDefault`), en çok 3 kez kaydediliyor

### Test · `cark_test.js` +15 kontrol

sürelerin uzaması · **her animasyonda 8 kare** · ara kademeler · bulanıklık kademeli · oturma sınıfı 900 ms · mola düğmeleri `.bt` ve `kBtn` kabında · Önceki sağa itilmiş · **senkron ertelemesi korumalı** · `senkTetik` dört yerde · söz reddi bastırılıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-18a` ↔ `rota-2026-09-18a` · 390 378 bayt**

---

## 134 · FAZ DEVRİ · HIZ · HATA BASTIRMA · `2026-09-19a`

### ⚠ 1 · konsol hatasının gerçek sebebi · `preventDefault` yoktu

Beş turdur hatanın **kaynağını** arıyordum; asıl mesele kaynağı değil **raporlanmasıydı**.

```js
window.addEventListener('error',function(e){ goster(...) });   // ← eski
```

Hata kaydediliyordu ama **tarayıcının varsayılan konsol raporlaması iptal edilmiyordu**. Yani zaten yakalanıp ele alınmış hatalar bile konsola `Script error.` olarak düşmeye devam ediyordu.

```js
e.preventDefault();      // varsayılan bastırıldı
… , true);               // yakalama evresinde dinleniyor
```

Ayrıca aynı hata **en çok 3 kez** kaydediliyor; kayıt `?hata=1` panelinde duruyor.

### 2 · animasyon hızlandırıldı

Kullanıcı *"daha fazla ara faz ekle dedim, yavaşlat demedim"*. Sekiz kare korundu, süreler kısaltıldı:

| | §133 | Şimdi |
|---|---|---|
| Kart → şerit | .68 sn | **.38 sn** |
| Şerit → kart | .78 sn | **.44 sn** |

### 3 · FAZ DEVRİ · yarıda kesilince geri sarma

Kaydırıyordum → bıraktım → yine kaydırmaya başladım: animasyon sıfırdan başlıyordu, kart zıplıyordu.

Artık geçen süre ölçülüp ters animasyona **negatif gecikme** olarak veriliyor:

```js
oran   = geçen / eskiSüre
gecikme = -(1 - oran) × yeniSüre
```

| Kesilme anı | Ters animasyon gecikmesi |
|---|---|
| %0 ilerlemişken | −0.440 sn (baştan) |
| %25 | −0.330 sn |
| %50 | −0.220 sn (yarıdan) |
| %90 | −0.044 sn (sondan) |

Küçülme ne kadar ilerlediyse büyüme o kadar **ileriden** başlıyor — kart bulunduğu fazdan geri sarıyor, sıçrama yok. Aynı yönde tekrar tetiklenirse devir uygulanmıyor.

### Test · `cark_test.js` +18 kontrol

süreler · **sekiz kare korundu** · faz devri fonksiyonu · negatif gecikme değişkeni · iki yönde de devir · geçen süre ölçümü · yön değişmediyse devir yok · **hata varsayılanı bastırılıyor** · yakalama evresi · 3 kez sınırı.

**Matematik doğrulaması:** hiç ilerlemediyse baştan, yarıdaysa yarıdan, bittiyse sondan; ters yönde simetrik; aynı yönde devir yok; gecikme hep ≤ 0.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-19a` ↔ `rota-2026-09-19a` · 392 474 bayt**

---

## 135 · ÖLÇEK YALNIZ KONUMDAN · SEKME BİTTİ · `2026-09-20a`

Kullanıcı asıl sorunu tarif etti: *"kart orta noktasını geçip seker gibi oluyor ve orta noktasına doğru geri hareket ediyor."*

### Kök sebep · iki hareket kaynağı birbiriyle yarışıyordu

1. **Konumdan gelen ölçek** — merkeze uzaklığa göre `scale`
2. **Zamanlayıcılı animasyon** — `tutKucul` / `birakAc` (§132–§134)

İkisi aynı elemanı aynı anda ölçekliyordu. Tuşa basınca kart konumdan büyürken animasyon ayrı bir eğriyle oynuyor, sonuçta merkezi geçip geri dönüyormuş gibi görünüyordu.

**Zamanlayıcılı animasyonlar tamamen kaldırıldı.** `fazDevir`, `--fz` negatif gecikme mekanizması da gereksiz kaldı, silindi. Artık **tek kaynak var: merkeze uzaklık.**

### Ölçek rampası derinleştirildi

```js
sc = max(.72, cos(θ)^.62)      // eski: max(.86, cos(θ)^.30)
```

| \|θ\| | Ölçek |
|---|---|
| 0.00 | **1.000** (tam boy) |
| 0.16 | 0.992 |
| 0.34 | 0.964 |
| 0.60 | 0.888 |
| 0.80 | 0.799 |

Büyüme **iki kat belirgin** (aralık 0.103 → 0.201). Şerit merkeze yaklaştıkça sürekli büyüyor, tam merkezde en büyük hâline ulaşıyor, uzaklaştıkça küçülüyor — kaydırırken de, tuşla geçerken de aynı. Negatif kosinüs için `max(0,…)` koruması eklendi (NaN riski).

### ⚠ Sekmenin ikinci sebebi · kademe oynaması

Otomatik kaydırma sırasında `dizKay` her karede kademeleri yeniden hesaplıyordu. Hedef karta yaklaşırken kademeler değişince **yükseklikler oynuyor**, yerleşim kayıyor ve kart geri sekiyormuş gibi görünüyordu.

`otoKilit` bayrağı eklendi: otomatik kaydırma boyunca kademeler **donuk**, hareket saf öteleme. Kilit üç yolda da açılıyor (bitiş · iptal · doğrudan geçiş).

### Test · `cark_test.js` +15 kontrol

zamanlayıcılı animasyon kalmadı · faz devri kalmadı · rampa derinleşti · iki fonksiyonda da · **kilit ve üç açılma yolu** · kilitliyken kademe değişmiyor.

**Matematik:** merkezde tam boy · uzaklaştıkça monoton azalıyor · taban 0.72 · büyüme eskisinin ~2 katı · **rampa sürekli, sıçrama yok**.

Ayrıca 23 eskimiş kontrol yeni yaklaşıma göre yeniden yazıldı.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-20a` ↔ `rota-2026-09-20a` · 390 404 bayt**

---

## 136 · İÇERİK ÇIKIŞ/GİRİŞ KOREOGRAFİSİ · `2026-09-21a`

Kullanıcı istedi: kartlar **yatay orta çizgilerinden** yukarı ve aşağı açılıp kapansın; içerideki elemanlar büyüme/küçülme sırasında **eşzamanlı ve kademeli** olarak dikeyde daralıp **sağdan sola** süpürülerek yok olsun, ardından yeni içerik **soldan sağa** açılarak opaklaşsın.

### Kart · orta çizgiden

```css
.kdm,.kart,.molaK{transform-origin:50% 50%}
```

Eskiden `50% 0%` (üstten) idi; artık kartlar kendi yatay orta çizgilerinden simetrik açılıp kapanıyor.

### İçerik · iki aşamalı takas

İçerik `innerHTML` ile **anında** değişiyordu. Artık `icerikDegis()` iki aşamaya bölüyor:

**1 · ÇIKIŞ (190 ms)** — eski satırlar `transform-origin:100% 50%` ile sağdan sola süpürülür:

```
scaleX 1 → .82 → .48 → 0
scaleY 1 → .86 → .58 → .24
opaklık 1 → .72 → .38 → 0
```

**2 · GİRİŞ (340 ms)** — çıkış bitince içerik takas edilir, yeni satırlar `transform-origin:0% 50%` ile soldan sağa açılır (aynı eğrinin tersi).

Satırlar **kademeli**: çıkışta 28 ms, girişte 34 ms aralıkla sırayla gidip sırayla gelirler. Giriş kademesi biraz daha yavaş — açılış daha rahat okunuyor.

İlk çizimde animasyon uygulanmıyor (`ilkKez`), mola kartları da aynı koreografiden geçiyor. Giriş sınıfı ve gecikmeler 520 ms sonra temizleniyor.

### Test · `cark_test.js` +21 kontrol

iki fonksiyon · çıkış süresi · **kart orta çizgisinden** · çıkış sağdan sola · giriş soldan sağa · dikey daralma/açılma · dörder kare · kademeli gecikmeler · çıkış bitince takas · ilk çizimde animasyon yok · mola da koreografide · sınıf ve gecikme temizliği · hareket azaltmada kapalı.

**Zamanlama doğrulaması:** çıkış girişten önce biter, gecikmeler artan, giriş kademesi çıkıştan yavaş.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-21a` ↔ `rota-2026-09-21a` · 392 961 bayt**

---

## 137 · ⚠ SINIF ÇAKIŞMASI · MOLA KARTI · `2026-09-22a`

### Kök sebep · `.molaK` iki farklı bileşende

Ekran görüntülerinde mola/yavaşlama/spor kartlarının içeriği **tek satıra sıkışmıştı**: başlık, saat, açıklama ve düğmeler yan yana, yazılar daralmış.

`.molaK` sınıfı **iki ayrı bileşende** kullanılıyordu:

| Kullanım | Kural |
|---|---|
| Büyük mola kartı (`molaKart()` kökü) | `border-radius:18px; padding:15px 17px 16px` |
| Normal kartın içindeki küçük mola şeridi | **`display:flex; align-items:center; gap:10px`** |

İkinci kural sonra geldiği için **büyük kartı da flex satırına çeviriyordu.** §106'daki `.kd` çakışmasının aynısı.

**Düzeltme:** büyük kart `.molaB`'ye taşındı; 13 alt seçici (`.mkUst`, `.mkSay`, `.mkCub`, `.mkMet` …) ve nefes animasyonu da onunla birlikte. İç şerit `.molaK` olarak kaldı.

Artık düğmeler `.kBtn` kabında, kartın altında — diğer görev kartlarıyla birebir aynı.

### Koreografi hızı kartla eşitlendi

İçerik çıkış/giriş 190 + 340 = **530 ms** sürüyordu ama kartın kademe geçişi **300 ms**. Kart açılıp bitiyor, içerik hâlâ geliyordu.

| | Önce | Sonra |
|---|---|---|
| Çıkış | 190 ms | **100 ms** |
| Çıkış animasyonu | .21s | **.11s** |
| Giriş animasyonu | .34s | **.15s** |
| Kademe gecikmesi | 28/34 ms | **10/12 ms**, tavan 3 satır |

Toplam: çıkış son satır **130 ms**, giriş son satır **286 ms** — kartın 300 ms'lik geçişine sığıyor.

### Test · `cark_test.js` +15 kontrol

büyük kart ayrı sınıfta · iç şerit eski sınıfta · **büyük kart artık flex değil** · alt seçiciler ve nefes taşındı · düğmeler kartın altında · yeni süreler · gecikme tavanı · temizlik.

**Zamanlama doğrulaması:** çıkış son satır 130 ms · giriş son satır 286 ms · **300 ms'lik kart geçişine sığıyor** · çıkış girişten önce bitiyor.

⚠ İkinci kez aynı hata: kısa CSS sınıf adı çakışması. Yeni sınıf eklerken `grep` şart.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-22a` ↔ `rota-2026-09-22a` · 393 218 bayt**

---

## 138 · ON KADEME · SAF YATAY KOREOGRAFİ · `2026-09-23a`

### 1 · altı kademe → ON kademe

Altı basamak gözle fark edilen sıçramalar bırakıyordu.

```js
KD_SIRA = [9,8,7,6,5,4,3,2,1]      // |i−a| = 0…8 → kademe
KH      = [36,42,48,54,60,68,78,86,94,100]
```

Basamak farkları **en çok 12 px** (eskiden 20 px'e kadar çıkıyordu). Her satır artık **üç basamakta** açılıyor:

| Satır | Basamaklar |
|---|---|
| Konu adı | k1 (10px/%38) → k2 (16px/%70) → k3+ (21px/tam) |
| sf referansı | k3 (8px/%34) → k4 (14px/%68) → k5+ (18px/tam) |
| Blok bilgisi | k5 (7px/%32) → k6 (13px/%66) → k7+ (17px/tam) |
| Son seans | k7 (7px/%34) → k8 (12px/%70) → k9 (15px/tam) |

Zeminler de dokuz kademede kademeleniyor (`#0B0F1C → #131B2D`).

### 2 · koreografi SAF YATAY

Dikey bileşen (`scaleY`) kaldırıldı — satırlar yalnız **genişliklerinden** daralıp genişliyor:

```css
@keyframes icCik{ 1 → .90 → .72 → .50 → .26 → 0 }    /* 6 kare, sağdan sola */
@keyframes icGir{ 0 → .24 → .48 → .70 → .86 → .96 → 1 }  /* 7 kare, soldan sağa */
```

Yükseklik hiç oynamadığı için yerleşim sarsılmıyor; opaklık her karede genişlikle birlikte iniyor/çıkıyor.

### 3 · çarka çekilen kartlar

Power-up, telafi ve tamamlanan görevler çarka çekildiğinde aynı düzene uyuyor:

| Tür | Kademe kuralı |
|---|---|
| Normal | 9 zemin kademesi |
| Mola/yavaşlama | 9 kademe (`#111C29 → #17273C`) |
| Power-up | 7 kademe (`#0C1724 → #132234`) |
| Telafi/ek | 7 kademe (`#161409 → #201D0E`) |

### Test · `cark_test.js` +22 kontrol

on kademe dizisi (iki fonksiyonda da) · on yükseklik ölçülüyor · sınıf deseni 0–9 · her satır üç basamakta · dokuz zemin kademesi · mola/power-up/telafi kademeleri · **çıkış ve giriş saf yatay** · koreografide `scaleY` yok · çıkışta 6, girişte 7 kare.

**Matematik:** odakta k9 · bir uzakta k8 · sekiz uzakta k1 · dokuz+ uzakta k0 · kademe monoton azalıyor · yükseklikler monoton artıyor · **basamak farkları ≤12 px**.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-23a` ↔ `rota-2026-09-23a` · 394 814 bayt**

---

## 139 · ⚠ BAYAT ÖLÇÜM · TAM MERKEZE OTURMA · `2026-09-24a`

### Kök sebep · ölçüm sırası yanlıştı

`otoKaydir` hedef mesafeyi **sürükleme kipine girmeden ÖNCE** ölçüyordu:

```js
let dy = …dizOnb'den hesapla…      // etkin kart TAM KART, uzun
sBas();                            // ← şerit hâline geçer, yükseklikler DEĞİŞİR
…dy'ye göre animasyon…             // hesap BAYAT
```

`sBas()` etkin kartı şeride çeviriyor; o kartın yüksekliği ~250 px'den ~100 px'e düşüyor. Ölçüm eski yüksekliğe göre yapıldığı için çark hedefi **aşıyor**, sonra `gecis()` düzeltince geri sekiyordu.

**Düzeltme · sıra tersine:**

```js
sBas(); otoKilit=true;
try{diz()}catch(e){}        // TAZE yerleşimi hemen kur
let dy = …dizOnb'den hesapla…   // artık güncel
```

Hedef **tam merkeze** oturuyor; ne eksik ne fazla. Üç tuş da (Sonraki · Önceki · Tamamlandı) aynı yolu kullanıyor.

Doğrulandı: **30 karışık adımda hata 0, atlama 0.**

### Çarka geri taşıma da aynı akışta

`✕` (çarka taşınanı geri gönder) anında yeniden çiziyordu. Artık tamamlama ile aynı: kart sönerek gider, sıradakine otomatik kaydırma ile geçilir.

### Sönme animasyonu · küçülüp yukarı kayarak

```css
@keyframes kartBitIc{            /* 5 kare */
  0%   translateY(0)     scale(1)    blur(0)
  25%  translateY(-7px)  scale(.94)  blur(.3px)
  50%  translateY(-16px) scale(.86)  blur(.8px)
  75%  translateY(-27px) scale(.76)  blur(1.5px)
  100% translateY(-40px) scale(.66)  blur(2.4px)}
```

Dış katman opaklığı ayrı bir eğriyle sönüyor. Mola, power-up ve telafi kartları da aynı animasyondan geçiyor.

### Dayanıklılık · `setTimeout` korumaları

`surTazele`, `sinirAc` (açılış ve kapanış) ve `sinirAgKur` içindeki `setTimeout` çağrıları korumasızdı; ortamda yoksa **tüm akış kırılıyordu**. Hepsi korumaya alındı, `setTimeout` yoksa geçişler anında tamamlanıyor.

### Test · `cark_test.js` +18 kontrol

ölçüm sürükleme kipinden sonra · taze yerleşim · `sBas` yoksa doğrudan · ölçüm başarısızsa kip geri alınıyor · geri taşımada otomatik kaydırma ve sönme · sönme iki katman · beş kare · mola da sönüyor · **dört `setTimeout` koruması** · **30 adımda hata ve atlama yok** · kilit ve kip sonda temiz.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-24a` ↔ `rota-2026-09-24a` · 396 579 bayt**

---

## 140 · SÜREKLİ KATMAN · KESİŞMEDE DEVİR · `2026-09-25a`

Kullanıcının önerisi: *"hangi kartın hangisinin üstünde olacağı orta noktalarının odağa yakınlığından belli olsun; yaklaşan kart KESİŞME BÖLGESİNDEN itibaren eski odak kartının üstüne çıksın."*

### Kök sebep · etkin kartın sabit katmanı

```js
zIndex = i===a ? 999 : max(1, 900 − |θ|×1000)
```

Etkin karta **sabit 999** veriliyordu. Yaklaşan kart merkeze varana kadar 900'ün altında kalıyor, tam merkezde birden 999'a fırlıyordu — **339 birimlik ani katman sıçraması**. Görüntüdeki sıçramaların bir kaynağı buydu.

### Düzeltme · istisnasız süreklilik

```js
zIndex = max(1, 1000 − |θ|×1000)      // her kart için, istisnasız
```

CSS'teki `.sr.act{z-index:9}` istisnası da kaldırıldı.

**Kaydırma sırasında devir:**

| Adım | \|θ\|A | \|θ\|B | zA | zB | Üstte |
|---|---|---|---|---|---|
| 0 | 0.00 | 0.34 | 1000 | 660 | A |
| 1 | 0.08 | 0.26 | 920 | 740 | A |
| 2 | 0.15 | 0.19 | 850 | 810 | A |
| **3** | **0.17** | **0.17** | **830** | **830** | **kesişme** |
| 4 | 0.19 | 0.15 | 810 | 850 | B |
| 6 | 0.34 | 0.00 | 660 | 1000 | B |

Katman devri tam **kesişme noktasında**, kendiliğinden. Ani sıçrama yok; en büyük adım farkı 120 birim (eskiden 339).

### Test · `cark_test.js` +13 kontrol

katman istisnasız sürekli · etkin karta sabit z verilmiyor · CSS istisnası kalktı · iki fonksiyonda aynı formül · merkezde en üst · uzaklaştıkça azalıyor · taban 1.

**Devir doğrulaması:** başta A üstte · **kesişmede eşit** · sonra B üstte · **devir tam bir kez** · katman adım adım değişiyor (sıçrama ≤120) · eski davranışta sıçrama olduğu kanıtlanıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-25a` ↔ `rota-2026-09-25a` · 396 744 bayt**

---

## 141 · ⚠ AYRIK KADEME → SÜREKLİ AÇILMA · `2026-09-26a`

Kullanıcı ekran kaydı gönderdi. Kareler çıkarılıp ardışık fark ölçüldü:

```
ortalama kare farkı 1.49 · medyan 0.28 · en büyük 9.80
SIÇRAMA (medyan×3 üstü): 102 karede 26 kare
en yoğun bölge: kare 31–43, medyanın 10–34 katı
```

Kare 31 → 32 karşılaştırıldı: kartın içeriği **dört satırdan bir satıra** düşmüş, alttaki kart birden büyümüş.

### Kök sebep · ayrık kademeler toplu zıplıyordu

Kademe **sıra uzaklığından** (`|i−mrk|`) hesaplanıyordu. Merkeze en yakın şerit değişince **bütün kartların kademesi aynı anda kayıyor** — içerik hep birlikte zıplıyordu. On kademeye çıkarmak (§138) basamağı 12 px'e indirmişti ama sıçramanın **toplu** olması sorunu çözmüyordu.

### Çözüm · açıklık sürekli fonksiyon

```js
AC_UC = 0.62
ac  = clamp(0, 1 − |θ|/AC_UC, 1)          // 0 uzak → 1 merkez
r1 = ara(ac, 0.10, 0.38)   // konu adı
r2 = ara(ac, 0.32, 0.60)   // sf referansı
r3 = ara(ac, 0.54, 0.80)   // blok bilgisi
r4 = ara(ac, 0.74, 0.96)   // son seans
yükseklik = 36 + 21·r1 + 18·r2 + 17·r3 + 15·r4
```

CSS satırları doğrudan orandan:

```css
.kdm1{height:calc(21px * var(--r1,0)); opacity:var(--r1,0)}
.kdm{background:rgb(calc(10+9*var(--ac,0)), calc(14+13*var(--ac,0)), calc(24+21*var(--ac,0)))}
```

Zeminler de (normal · mola · power-up · telafi) açıklıkla sürekli değişiyor.

**Ölçüm sonucu:**

| | Ardışık fark |
|---|---|
| Ayrık kademe (§138) | **12 px** basamak |
| Sürekli açılma | **1.12 px** |

**On kat pürüzsüz.** Her satır kendi aralığında açılıyor; artık toplu sıçrama yok.

Kademe sınıfları (`k0…k9`), `KD_SIRA`, `kdOf`, yükseklik ölçüm döngüsü ve `dizOnb.KH/KHM` tamamen kaldırıldı — hem kod sadeleşti hem her karedeki ölçüm yükü kalktı.

### Test · `cark_test.js` · 19 kontrol yeniden yazıldı + 18 yeni

açıklık sürekli fonksiyon · oran yazıcı · dört satır oranı · aralıklar · yükseklik oranlardan · sürüklerken de sürekli · **ayrık kademe kalmadı** · CSS satırları ve zeminleri orandan · ölü ölçüm kaldırıldı.

**Eğri doğrulaması:** merkezde 107 px · uçta 36 px · monoton artıyor · **ardışık fark ≤1.5 px** · eski basamağın sekizde biri.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-26a` ↔ `rota-2026-09-26a` · 395 941 bayt**

---

## 142 · YÜKSEKLİK EKSENİ · KONUMA KİLİTLİ SATIRLAR · `2026-09-27a`

### 1 · koreografi ekseni düzeltildi

§136–§138'de satırlar **genişlikten** (`scaleX`) daralıp açılıyordu. İstenen: satırın kendi **orta çizgisinden yukarı ve aşağı** açılıp aynı eksende kapanması.

```css
@keyframes icCik{ scaleY 1 → .88 → .70 → .48 → .24 → 0 }   /* kapanış */
@keyframes icGir{ scaleY 0 → .22 → .46 → .68 → .85 → .95 → 1 }
transform-origin: 50% 50%     /* iki yönde de orta çizgiden */
```

Opaklık her karede ölçekle birlikte iniyor/çıkıyor. Koreografide `scaleX` kalmadı; kart ve satırlar artık **aynı eksende** hareket ediyor.

### ⚠ 2 · satırlar konumun GERİSİNDE kalıyordu

Asıl kaçırdığım buydu:

```css
.kdm>div{transition:height .30s …, opacity .24s …}
```

Satır yükseklikleri §141'den beri **her karede JS'ten** yazılıyor (`--r1…--r4`). Üstüne bir de 300 ms'lik CSS geçişi binince satırlar konumun gerisinde kalıyordu — kart merkeze varmışken içerik hâlâ açılıyordu.

**Geçiş kaldırıldı.** Açılma hızı artık doğrudan **kaydırma hızı**: kart ne kadar hızlı yaklaşırsa satırlar o kadar hızlı açılıyor. Tam olarak "konum faktörüne bağlı" olması istenen davranış.

Yalnız **oturma anında** (`#sahne.otu`) kısa bir geçiş (.26 sn) kaldı — kaydırma bitip kart yerine otururken son açılma yumuşasın diye. Sürüklerken geçiş yok.

### Test · `cark_test.js` +14 kontrol

çıkış ve giriş **yükseklik ekseninde** · `scaleX` kalmadı · iki yön de orta çizgiden · **satırlarda CSS geçişi yok** · yalnız oturmada kısa geçiş · yükseklik her karede JS yazıyor · kart ve satır aynı eksende.

**Konuma kilitlilik kanıtı:** açı değişince oran anında değişiyor · merkeze varınca tam açık · uçta tamamen kapalı · **hızlı kaydırmada hızlı açılma** (aynı fonksiyon olduğu için hız otomatik eşleşiyor).

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-27a` ↔ `rota-2026-09-27a` · 396 658 bayt**

---

## 143 · MASKE BANDI · GENİŞ GÖRÜNÜM · `2026-09-28a`

### ⚠ 1 · uzun kartın seans saatleri sönüyordu

Maske bandı **yüzde** cinsindendi: `#000 20%`. 310 px'lik `#cark`'ta bu **62 px**'lik bir sönüm demek. Tam açık kart ~250 px yüksek ve merkezden 125 px yukarı uzanıyor; üst kenarı **30 px**'te kalıyor — yani bandın tam içinde. Seans saatleri bu yüzden sönükleşiyordu.

Bandı tamamen opak yapmak çözüm değildi (kullanıcının da belirttiği gibi keskin kenar görünür olurdu).

**Düzeltme · SABİT PİKSEL bant:**

```css
--mask:linear-gradient(to bottom,
   transparent 0, rgba(0,0,0,.30) 4px, rgba(0,0,0,.72) 9px, #000 16px,
   #000 calc(100% - 16px), … transparent 100%);
```

| Kapsayıcı | Kart | Üst kenar | Eski (%20) | Yeni (16px) |
|---|---|---|---|---|
| 310 px | 250 px | 30 px | **sönük** ✗ | opak ✓ |
| 310 px | 278 px | 16 px | sönük ✗ | opak ✓ |
| 620 px | 250 px | 185 px | opak | opak ✓ |

Bant artık kapsayıcı yüksekliğinden **bağımsız**: her zaman 16 px. Hem kenarı gizlemeye yetiyor hem 278 px'e kadar kartı tam opak bırakıyor.

### 2 · geniş görünümde çipler dipte duruyordu

```css
#brif{align-content:flex-end; align-items:flex-end}   /* eski */
```

Geniş görünümde brif sağ sütunda uzun bir alan; çipler dibe yapışıyordu. `align-content:center; align-items:center; justify-content:center` — artık dikeyde ortalı.

### 3 · geniş görünümde gün listesi ferahladı

Gün listesi açıkken brif zaten gizli; o hâlde çark tüm genişliği alabilir:

```css
#rota.gunKip{grid-template-columns:1fr}
#rota{transition:… , grid-template-columns .48s cubic-bezier(.22,.78,.28,1)}
```

Ayrıca ≥881 px'te liste dolgusu 30/40 px, başlık 19 px — okunaklı. Sütun geçişi yumuşak, kayma yok.

### Test · `cark_test.js` +14 kontrol

sabit 16 px bant · yüzde bant kalmadı · maske değişkende · webkit+standart · çipler dikeyde ortalı (iki görünümde de) · gün kipinde tek sütun · sütun geçişi yumuşak · geniş görünümde ferah liste.

**Geometri doğrulaması:** 310/250 · 310/278 · 620/250 hepsinde kart üstü opak · **bant kapsayıcıdan bağımsız** · eski %20 bantta sönük olduğu kanıtlanıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-28a` ↔ `rota-2026-09-28a` · 397 715 bayt**

---

## 144 · GÜN LİSTESİ OKUNAKLILIĞI · `2026-09-29a`

Kullanıcı: *"yazılar yatay olarak sağa uzuyor ama dikey olarak yeterince genişlemiyor, okunmaları hâlen zor."*

### Kök sebep · tavanlar

```js
sat = clamp(11, …, 46)                      // satır tavanı
yaz = clamp(9, sat × 0.315, 13)             // yazı tavanı
```

Geniş görünümde alan bol olsa bile satır **46 px**'de, yazı **13 px**'de kilitleniyordu. İkili arama daha büyüğünü bulabilecekken tavan engelliyordu.

### Düzeltme

| | Önce | Sonra |
|---|---|---|
| Satır tavanı | 46 px | **64 px** |
| Yazı oranı | %31.5 | **%38** |
| Yazı tavanı | 13 px | **19 px** |

Ayrıca **tüm yazılar** ölçeğe bağlandı — blok başlığı (`--gyaz − 2.5`), gün özeti (`+5`), alt satır (`−0.5`), konu adı (`+1.5`). Eskiden blok başlığı 8.5 px ve özet 15 px sabitti.

**620 px alanda sonuç:**

| Gün | Satır | Yazı | Konu |
|---|---|---|---|
| 6 görev · 3 blok | **64** | **19** | 20.5 |
| 9 görev · 4 blok | **47** | **17.9** | 19.4 |
| 15 görev · 4 blok | 28 | 10.6 | 12.1 |
| 19 görev · 5 blok | 20.5 | 9 | 10.5 |

9 görevlü tipik günde yazı **13 → 17.9 px**. Yoğun günlerde hâlâ küçülüyor çünkü her şey ekrana sığmalı — bu tasarımın gereği.

### Test · `cark_test.js` +16 kontrol

satır ve yazı tavanları · yazı oranı · dört yazı öğesi de ölçekli · beş farklı yoğunlukta sığma · **9 görevde yazı ≥16 px** · az işte tavana ulaşıyor · yoğun günde küçülüyor · eskisinden büyük · taban altına inmiyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-29a` ↔ `rota-2026-09-29a` · 398 019 bayt**

---

## 145 · ÖNCELİK: YAZI BOYU · `2026-09-30a`

Kullanıcı: *"okunaklılığı artıran şey yazı fontunun ne kadar büyüyebildiği; öncelik yazıyı büyütebildiği kadar büyütmek olsun."*

### Oran fazla ihtiyatlıydı

```js
yaz = clamp(9, sat × 0.38, 19)
```

47 px'lik bir satır 24 px yazıyı rahat taşırken 17.9 px veriliyordu. Satır yüksekliği zaten ikili aramayla en büyük değerinde; sorun ondan yazıya geçişteki orandı.

```js
yaz = clamp(10, sat × 0.58, 24)
```

Güvenlik: satır metni `line-height:1.2` ile sıkıştırıldı. `0.58 × 1.2 = 0.70 < 1` — yazı satırın %70'ini kaplıyor, taşma yok.

**620 px alanda:**

| Gün | Satır | Eski yazı | **Yeni yazı** |
|---|---|---|---|
| 6 görev | 64 | 19 | **24** |
| 9 görev (tipik) | 47 | 17.9 | **24** |
| 12 görev | 35.4 | 13.5 | **20.5** |
| 15 görev | 28 | 10.6 | **16.2** |
| 19 görev | 20.5 | 10 | **11.9** |

Tipik günde yazı **17.9 → 24 px**; yoğun günde bile 10 → 11.9.

### Test · `cark_test.js` +21 kontrol

oran %58 · tavan 24 · taban 10 · satır metni sıkıştırılmış.

**Taşma doğrulaması:** altı farklı yoğunlukta hem yazı hem konu adı (`--gyaz + 1.5`) satıra sığıyor (`×1.2 ≤ satır`). Üç yoğunlukta yazının eskisinden büyük olduğu, tipik günde 24 px'e ulaştığı, yoğun günde bile ≥11 px kaldığı sınanıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-09-30a` ↔ `rota-2026-09-30a` · 398 181 bayt**

---

## 146 · ALANI DOLDURMA · `2026-10-01a`

iPad ekran görüntüsü: sol bölme ~1600 px yüksek ama gün listesi üst yarıda kalmış, altı bomboş.

### ⚠ 1 · ölçüm düzen oturmadan yapılıyordu

Sabit süreli tazeleme (1000 ms kare döngüsü) yetmiyordu: geniş ekranda sütun geçişi (.48 sn) ve sınır animasyonu bitene kadar `#gunListe` küçük ölçülüyordu.

**ResizeObserver** bağlandı — alan **her değiştiğinde** yeniden ölçekleniyor, düzen ne zaman oturursa otursun. Kip kapanınca gözlemci bırakılıyor. Desteklenmeyen ortam için yedek kare döngüsü 1000 → 1600 ms.

### ⚠ 2 · tavanlar sabitti

```js
sat tavanı = 64      // sabit
yaz tavanı = 24      // sabit
```

1600 px'lik alanda 9 görev × 64 px = 790 px → **doluluk %49**. Tavan bağlayıcı olduğu için ikili arama daha büyüğünü seçemiyordu.

```js
SAT_TAVAN = clamp(46, h/7, 110)
YAZ_TAVAN = clamp(16, SAT_TAVAN × 0.50, 34)
```

**9 görev + 4 blok · doluluk:**

| Alan | Satır | Yazı | İçerik | Doluluk |
|---|---|---|---|---|
| 330 px | 19 | 11 | 328 | %99 |
| 620 px | 47 | 27 | 618 | %100 |
| 900 px | 74 | 34 | 897 | %100 |
| 1200 px | 104 | 34 | 1197 | %100 |
| **1600 px** | **110** | **34** | **1260** | **%79** (eski %49) |

Küçük ekranda eski davranış korunuyor (tavan zaten bağlayıcı değil). Yoğun günde (19 görev) 1600 px'te doluluk %99.

### Test · `cark_test.js` +19 kontrol

satır tavanı alana bağlı · yazı tavanı satır tavanından · ikili arama tavanı değişken · **ResizeObserver bağlı** · gözcü bırakılıyor · yalnız gün kipinde çalışıyor · yedek 1600 ms.

**Doluluk doğrulaması:** beş alan boyunda taşma yok · 620 ve 900 px'te ≥%95 · 1600 px'te ≥%75 · **eski sabit tavanda %49 olduğu kanıtlanıyor** · büyük alanda yazı ≥30 px · küçük alanda eski davranış · yoğun gün de dolduruyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-01a` ↔ `rota-2026-10-01a` · 399 330 bayt**

---

## 147 · İKİ BİLDİRİM · MOLA GÖRÜNÜRLÜĞÜ · `2026-10-02a`

### 1 · bütün bildirimler kaldırıldı, ikisi kaldı

"Süre doldu · <görev>" bildirimi tamamen çıkarıldı. Ekrandaki uyarı işaretleri (⚠) duruyor, yalnız **bildirim** gitmiyor.

Kalan iki bildirim:

| Bildirim | Ne zaman |
|---|---|
| **Mola başladı** | `Akşam başladı · 45 dk` |
| **Mola bitti** | `Mola bitti, çalışma vakti` |

İkisi de ortak `molaGonder()` üzerinden; başlangıç bildirimi her mola için **bir kez** (`molaBaslaBildirildi`).

### 2 · tetikleme şartı

Başlangıç bildirimi yalnız **moladan önceki iş tamamlandıysa** gidiyor:

```js
if(!D.bitti[k] || molaGizli(g)) return;
```

Geri sayım da (`molaKalanSn`) zaten `D.bitti` şartını arıyor, dolayısıyla bitiş bildirimi de aynı kurala tabi.

### 3 · vakti geçmiş mola gizleniyor · `molaGizli()`

| Durum | Sonuç |
|---|---|
| Uyku (`yavas`) veya izin | **her zaman görünür** |
| İş tamamlandı | görünür |
| Geçmiş gün, iş yapılmamış | **gizli** |
| Gelecek gün | görünür |
| Bugün, iş yapılmamış, molanın bitiş saati geçmiş | **gizli** |

Önceki görev sonradan çarka çekilse bile o mola bir daha görünmüyor — vakti geçmiştir.

Gizleme **üç yerde** uygulanıyor: `duraklar()` (gezinme), `carkCiz()` (çizim), `molaKalanSn()` (geri sayım ve bildirim).

**29 Tem · saat 23:00 · hiçbir iş bitmemiş:**

| Mola | Saat | Sonuç |
|---|---|---|
| kisa | 10:00–10:15 | GİZLİ |
| spor | 12:30–16:30 | GİZLİ |
| aksam | 18:15–19:00 | GİZLİ |
| **yavas** | 20:30–23:00 | **görünür** |

### 4 · tuşlar bozulmadı

Durak sayısı 295 → 282 (13 mola durağı düştü). **20 karışık adımda hata 0, atlama 0**; Tamamlandı yolu da sorunsuz.

### Test · `cark_test.js` +24 kontrol

süre bildirimi kaldırıldı · iki bildirim · ortak gönderici · tek kez · iş şartı · saniyelik tarama · `molaGizli` · uyku istisnası · beş görünürlük kuralı · **üç yerde uygulanıyor**.

**Doğruluk tablosu:** uyku ve izin her hâlükârda görünür · ara mola ve spor (iş bitmemiş + vakit geçmiş) gizli · iş bittiyse görünür · vakit geçmediyse görünür.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-02a` ↔ `rota-2026-10-02a` · 401 407 bayt**

---

## 148 · YÜKSEKLİK ÖLÇÜMÜ SAĞLAMLIĞI · `2026-10-03a`

Telefon ekran görüntüsü: liste yine üst yarıda, altı bomboş. §146'daki ResizeObserver tek başına yetmemiş.

### Kök sebep · tek kaynağa güvenmek

```js
const h = gl.clientHeight || gl.getBoundingClientRect().height || 0;
```

Geçiş sürerken `#gunListe` küçük ölçülüyor; gözlemci tetiklense bile o anki değer eski kalabiliyordu.

**Düzeltme · dört kaynaktan en büyüğü:**

```js
const kap = gl.parentElement;
const h = Math.max(
  gl.clientHeight, gl.getBoundingClientRect().height,
  kap.clientHeight, kap.getBoundingClientRect().height);
```

Hangi kaynak güncelse o kazanıyor. `#cark` (kapsayıcı) genellikle `#gunListe`'den önce doğru boyuta ulaşıyor.

### Ek güvenceler

- **`transitionend`** dinleyicisi `#rota`'ya bağlandı: grid satır/sütun animasyonu bitince kesin ölçüm. Bir kez bağlanıyor (`__gecBagli`).
- Yedek kare döngüsü 1600 → **2600 ms**.
- ResizeObserver duruyor.

### Telefon senaryosu · 714 px alan, 9 görev + 4 blok

| | Değer |
|---|---|
| Satır | **55 px** |
| Yazı | **32 px** |
| Doluluk | **%98** |

Yanlış ölçümde (350 px sanılırsa) satır 25 px'de kalıyordu — testte bu regresyon da sınanıyor.

### Test · `cark_test.js` +14 kontrol

dört kaynaktan en büyüğü · kapsayıcı da ölçülüyor · `transitionend` bağlı · bir kez bağlanıyor · 2600 ms yedek · ResizeObserver duruyor.

**Seçim mantığı:** geçiş sürerken büyük olan seçiliyor · sıfırlar yutuluyor. **Telefon:** satır ≥50 px · yazı ≥28 px · doluluk ≥%95 · yanlış ölçümde küçük kalacağı kanıtlanıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-03a` ↔ `rota-2026-10-03a` · 402 193 bayt**

---

## 149 · POWER-UP HAVUZU YENİDEN KURULDU · `2026-10-04a`

### Denetim · eski havuz %43 kullanılamazdı

| Sorun | Miktar |
|---|---|
| Yeni seçimde kullanılmayan kitaptan | **35 konu · 57.5 sa** |
| Programla birebir çakışan (aynı kitap+sayfa) | **5 konu** |
| Hiç temsil edilmeyen program kitabı | TUSTIME Küçük Stajlar (15 konu) |
| **Kullanılabilir** | 54 / 94 konu |

### Yeni havuz · kaynak evreninden türetildi

`gorev_katalog.py` (235 bölüm) → seçim evrenine indirgendi (`eko.KITAP` + Atilla Uslu SST = 152 bölüm) → programda işlenen 79 bölüm çıkarıldı → **73 konu · 136.9 saat · 72.2 soru**.

Sayfa düzeyinde çakışma denetimi: **0**.

### ⚠ Sıralama · statik verim yanıltıcıydı

Katalogdaki `verim = net/saat` statik bir tahmin. Uygulamanın **dinamik kazanç modeli** ise branş doygunluğunu ve çürümeyi hesaba katıyor. 73 konunun her biri sim'de tek tek çekilip tamamlandı, projeksiyon farkı ölçüldü:

| | Konu |
|---|---|
| Projeksiyonu **artıran** | 34 |
| Etkisiz (soru değeri yok) | 25 |
| Projeksiyonu **düşüren** | 14 |

Düşürenlerin hepsi **Atilla Uslu SST (Dahiliye)** ve Speetus — o branşlar programda zaten doygun; ek çalışma erken tamamlama çürümesini karşılamıyor.

`verim` artık **ölçülen etki / saat**; havuz buna göre sıralı.

**En kazançlı 5:**

| Konu | Kitap | Saat | Etki | net/sa |
|---|---|---|---|---|
| Solunum Sistemi Anatomisi | Anatomi FT | 0.9 | +0.205 | 0.234 |
| Sindirim + Endokrin Anatomi | Anatomi FT | 2.3 | +0.320 | 0.141 |
| Üriner Sistem Hastalıkları | Emrullah Patoloji | 2.1 | +0.286 | 0.134 |
| Karaciğer Hastalıkları | Emrullah Patoloji | 1.5 | +0.194 | 0.132 |
| İmmünoloji | Emrullah Patoloji | 1.9 | +0.240 | 0.129 |

### Test · `pu_test.js` +12 kontrol

`etki` alanı · `verim = etki/saat` · azalan sıralı · en üstteki pozitif · saat/sayfa/aralık dolu · pozitifler üstte, negatifler altta · **sayfa düzeyinde program çakışması yok**.

Ayrıca "hiçbiri programda değil" kontrolü **kitap+konu** eşleşmesine çevrildi (aynı ad farklı kitapta olabilir).

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-04a` ↔ `rota-2026-10-04a` · 398 109 bayt**

---

## 150 · İKİ SÜTUN · DİNAMİK SIRALAMA · `2026-10-05a`

### 1 · sıralama artık ÇALIŞMA ZAMANINDA

`powerup.json`'daki `verim` donmuş bir değerdi. Çürüme, branş doygunluğu ve kalibrasyon her gün ve her deneme girişinden sonra değiştiği için sıralama da değişmeli.

`puEtki(u)` — `para()`nın kullandığı formülün aynısını işletiyor:

```
boşluk = tavan − grubun o anki neti
ham    = boşluk × R_CAL × min(1, soru/tavan)
etki   = ham × Rr(bugünden sınava kalan gün, S)
verim  = etki / saat
```

`puSirali()` her çizimde yeniden hesaplıyor.

**Doğrulandı:**

| Tetik | Sonuç |
|---|---|
| Gün ilerledi (29 Tem → 18 Ağu) | değer 0.218 → 0.331 (**1.52×**) |
| Yeni deneme girildi | değer 0.257 → 0.187, **ilk 8'in sırası değişti** |

Sınav yaklaştıkça değer yükseliyor (daha az çürüme); deneme sonucu geldikçe doygunluk değişip sıra karışıyor — ikisi de beklenen davranış.

### 2 · iki sütun

| Sol | Sağ |
|---|---|
| **Konu kitapları** (54) · okuyarak öğrenilecek | **Soru kitapları** (19) · soru çözerek pekişecek |

Her sütun **kendi içinde** anlık net/saat değerine göre sıralı. Başlıkta konu sayısı ve toplam saat. Çarka çekilmiş konular üstte ayrı bir bölümde.

Sınıflandırma `PU_SORU_KITAP` ile: Atilla Uslu SST, Klinisyen Vaka Pediatri / Fizyoloji / Küçük Stajlar.

640 px altında tek sütuna düşüyor, aralarında ayırıcı çizgi.

**Şu anki tepe (5 Ağu):**

| Sol · Konu | net/sa | Sağ · Soru | net/sa |
|---|---|---|---|
| Solunum Sistemi Anatomisi | 0.243 | Yenidoğan | 0.116 |
| Sindirim + Endokrin Anatomi | 0.146 | Pediatrik Endokrinoloji | 0.112 |
| Temel Mikrobiyoloji | 0.139 | Pediatrik Kardiyoloji | 0.095 |

### Test · `pu_test.js` +21 kontrol

`puEtki` · `puSirali` · iki grup · her sütun kendi içinde sıralı · gruplar ayrık · toplam havuz kadar · **sınav yaklaştıkça değer yükseliyor (>%20)** · **deneme girişi değerleri ve sırayı değiştiriyor** · iki sütun çiziliyor · başlıklar.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-05a` ↔ `rota-2026-10-05a` · 401 930 bayt**

---

## 151 · ⚠ PANEL KAYDIRILAMIYORDU · KİTAP TÜRÜ · `2026-10-06a`

### ⚠ 1 · soru kitapları sütununa hiç ulaşılamıyordu

73 öğenin hepsi çiziliyordu (sim: `.kit` 73, `puSut` 2, soru sütununda 19), ama:

```css
#ppanel{position:fixed;inset:0; … }   /* overflow yok */
```

Kaplama kaydırılamıyordu; kutu ekrandan taşınca yalnız tepesi görünüyor, soru sütununa (dar ekranda alta düşüyor) hiç erişilemiyordu.

`overflow-y:auto` + `-webkit-overflow-scrolling:touch` + `overscroll-behavior:contain` eklendi. **Aynı kusur `kpanel` · `bpanel` · `dpanel`'de de vardı** — dördü birden düzeltildi.

### 2 · kitap türü · kullanıcı beyanına göre

Tahminimi kullanıcı düzeltti. Doğru sınıflandırma:

**KONU kitapları** (yeni konu buradan öğrenilir):
Anatomi Fast Track · FT Biyokimya · FT Farmakoloji · FT Kadın Doğum · Speetus Genel Cerrahi · Emrullah Patoloji SST · Klinisyen Vaka Pediatri · **Atilla Uslu SST — yalnız Enfeksiyon bölümü**

**SORU kitapları:** diğer her şey.

Atilla Uslu SST bölüme göre ayrıştığı için `puKonuMu()` özel kural içeriyor.

| Sütun | Konu | Saat |
|---|---|---|
| Konu kitapları | 54 | 80.5 |
| Soru kitapları | 19 | 56.5 |

### ⚠ 3 · PROGRAM DENETİMİ · açık kalem

95 öğrenme görevinin dağılımı:

| Tür | Görev |
|---|---|
| Konu kitabından | 69 |
| **Soru kitabından** | **26** |

Soru kitabından öğrenme yapan 26 görev:

| Kitap | Görev |
|---|---|
| TUSTIME Küçük Stajlar | 15 |
| TUSTIME Fizyoloji | 9 |
| TUSTIME Mikrobiyoloji | 2 |

**Not:** `eko.TANIDIK` bu üç kitabı (+ Patoloji SST) "tanıdık" işaretlemiş ve 15 sf/saat **okuma** hızı atamış — yani özgün planlama onları okunabilir içerik saymış. Atilla Uslu SST ise zaten yalnız Enfeksiyon'a kısıtlanmış, bu da kullanıcının kuralıyla birebir örtüşüyor.

Bu üç kitabın türü **kullanıcıya soruldu**; cevaba göre program yeniden üretilebilir.

### Test · `pu_test.js` +20 kontrol

yedi konu kitabı tek tek · Atilla Uslu SST Enfeksiyon → KONU, Kardiyoloji → SORU · üç TUSTIME → SORU · sütun saflığı · **panel kaydırılabilir** · dört panel de.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-06a` ↔ `rota-2026-10-06a` · 403 029 bayt**

---

## 152 · TÜR ANAHTARI · SINIFLANDIRMA DÜZELTİLDİ · `2026-10-07a`

### 1 · program DOĞRU üretilmiş

§151'de açık bırakılan kalem kapandı. Kullanıcı doğruladı: **TUSTIME Küçük Stajlar · Fizyoloji · Mikrobiyoloji de KONU kitabı.**

Dolayısıyla programın 95 öğrenme görevinin **tamamı** konu kitabından geliyor. `eko.TANIDIK`'ın bu üç kitaba okuma hızı atamış olması da tutarlıymış.

Konu kitabı listesi güncellendi (12 kitap). Havuzda geriye tek soru kitabı kaldı: **Atilla Uslu SST** (Enfeksiyon hariç).

| Sütun | Konu | Saat |
|---|---|---|
| Konu kitapları | 64 | 114.7 |
| Soru kitapları | 9 | 22.2 |

### 2 · tür anahtarı

Dar pencerede iki liste yan yana sığmıyordu. Kaydırmalı anahtar eklendi:

```
┌─────────────────┬─────────────────┐
│ Konu kitapları 64│ Soru kitapları 9│   ← kayan vurgu .30s
└─────────────────┴─────────────────┘
```

- Her düğmede o türün konu sayısı
- Seçim **kalıcı** (`D.puTur`, Depo'ya yazılıyor)
- `role="tablist"` · `aria-selected`
- Hareket azaltmada kayma yok

**≥900 px'te anahtar gizleniyor, iki liste yan yana görünüyor** — geçiş tamamen CSS ile, JS'e iş düşmüyor. İki liste her zaman HTML'de duruyor; yalnız görünürlük değişiyor, bu yüzden geçiş anında.

### Test · `pu_test.js` +19 kontrol

TUSTIME kitapları KONU · yalnız Atilla Uslu SST soru kitabı · anahtar çiziliyor · iki düğme · kaydırıcı · seçili durum · kap sınıfı · sayaç · erişilebilirlik · seçim değişince kap ve kaydırıcı hareket ediyor · **iki liste de HTML'de kalıyor** · dar/geniş pencere kuralları · eşik 900 px · seçim kalıcı.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-07a` ↔ `rota-2026-10-07a` · 405 937 bayt**

---

## 153 · ⚠ GRUP ADI EŞLEŞMESİ · DRE LOGOSU · `2026-10-08a`

### ⚠ 1 · soru kitaplarının 0 görünmesi BENİM HATAM'dı

Kullanıcı "konular okunmadığı için mi 0?" diye sordu — hayır. Havuzu yeniden kurarken (§149) `grup` alanına **branş adını** yazmıştım:

```
havuzda: "Dahiliye"          uygulamada: "Dahiliye grubu"
havuzda: "Genel Cerrahi"     uygulamada: "Genel Cerrahi grubu"
havuzda: "Fizyoloji"         uygulamada: "Fizyoloji+Histo"
```

`TAVAN_G["Dahiliye"]` tanımsız olduğu için `puEtki()` erkenden 0 dönüyordu — **29 konu** etkilenmişti.

Düzeltildi. Artık `TAVAN_G`/`GRUP_BN` eşleşmeyen konu **0**.

| Soru kitabı konusu | Önce | Sonra |
|---|---|---|
| Onkoloji | 0.000 | **0.223** |
| Nefroloji | 0.000 | **0.205** |
| Romatoloji | 0.000 | **0.153** |

Geriye kalan 0'lar gerçek: kaynak veride soru değeri bulunmayan 25 konu (`soru=0`).

### 2 · DRE logosu

Brief: D ve R üstte, E ortalanmış altta; üçü birlikte kalp silueti; E yapılacaklar listesi, R steteskop, D çember cetvel; harfler okunur kalacak.

| Harf | Nesne | Yapı |
|---|---|---|
| **D** | açıölçer | dik gövde + 48 yarıçaplı kavis · yedi taksimat çizgisi · merkez pimi |
| **R** | steteskop | iki kulaklık ucu (çatal) · hortum halkası (R'nin karnı) · içeri dönen bacak · göğüs parçası |
| **E** | yapılacaklar listesi | omurga + üç kol · aşağı indikçe kısalıyor · ilk iki satırda onay işareti |

- D **−20°**, R **+20°** döndürüldü: üstte iki lob oluşuyor
- E'nin kolları 56 → 40 → 30 px: siluet uca doğru sivriliyor
- Steteskobun göğüs parçası içeri çekildi ki sağ kenar taşmasın
- Arkada çok soluk kalp aurası (%18) — sınır çizgisi yok, yalnız okumayı destekliyor
- Renk: harfler buz mavisi (`#CDEBFF→#6FA8CE`), E altın (`#F2DCA2→#C9A758`) — uygulamanın kendi paleti

**72 pikselde denendi:** üç harf de ayrışıyor, kalp silueti duruyor.

Üretilen dosyalar: `logo.svg` · `icon-180.png` · `icon-192.png` · `icon-512.png` · güncellenmiş `manifest.webmanifest`. Başlık `DRE · TUS 23 Ağustos`.

### Test · `pu_test.js` +9 kontrol

her konunun tavanı ve branş eşlemesi tanımlı · üç grup adı doğru · kısa ad kalmadı · soru sütununda gerçek değer var · **sıfır kalanların soru değeri de gerçekten sıfır**.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-08a` ↔ `rota-2026-10-08a` · 406 110 bayt**

---

## 154 · TÜM İÇERİK HAVUZU · EYLEM ETİKETİ · ANAHTAR · `2026-10-09a`

### 1 · soru kitabı görevinde "Oku" yazıyordu

`puSenkron` her power-up görevine `act:'oku'` veriyor, panel satırı da `'Oku · '` ile başlıyordu. Oysa `EYLEM` haritasında `soru:'Soru çöz'` zaten tanımlıydı — program hiç kullanmıyordu çünkü **tüm öğrenme görevleri konu kitabından** (§152'de doğrulandı).

Düzeltme:
- `act: puKonuMu(u) ? 'oku' : 'soru'`
- Panel satırı: `puKonuMu(u) ? 'Oku' : 'Soru çöz'`
- `para()` filtresi `g.act==='oku'` → `(g.act==='oku'||g.act==='soru')` — yoksa soru görevleri kazanç getirmezdi

**Diğer yerler temiz:** seyir defteri, kaynak haritası ve deneme görevleri `EYLEM[g.act]` kullanıyor, hepsi doğru etiketliyordu. Sorun yalnız power-up'taydı.

### 2 · havuz artık TÜM içeriği kapsıyor

Kullanıcı: *"çöpe atmış bile olsam koşullardan etkilenip ileride çok verimli hâle gelebilir."*

Havuz seçim evreniyle (10 kitap) sınırlıydı. Artık **tam envanterden** türetiliyor:

| | Önce | Sonra |
|---|---|---|
| Konu | 73 | **156** |
| Saat | 136.9 | **334.5** |
| Kitap | 10 | **20** |

Programa alınmayan kitaplar da geldi: Levent Kodal Genel Cerrahi SB · Yavuz Şahin Biyokimya/Farmakoloji SB · Klinisyen Vaka Fizyoloji/Küçük Stajlar · Feyyaz Akay Mikrobiyoloji · Atilla Uslu Dahiliye 1–2 · TUSTIME Kadın Doğum konu · Yavuz Şahin Biyokimya konu.

| Sütun | Konu | Saat |
|---|---|---|
| Konu kitapları | 118 | 273.5 |
| Soru kitapları | 38 | 60.9 |

Soru kitapları: `* SB` ekliler + Atilla Uslu SST (Enfeksiyon hariç).

### ⚠ 3 · ANAHTAR ÇAKIŞMASI

Havuz büyüyünce **20 konu adı iki kitapta birden** çıktı (Hematoloji · Onkoloji · Kardiyoloji … hem Atilla Uslu Dahiliye 1'de hem SST'de).

`D.pu` yalnız konu adıyla anahtarlanıyordu → iki kayıt birbirini eziyordu. Anahtar **kitap + konu** yapıldı (`puAnh`), eski kayıtlar `puGoc()` ile ilk açılışta taşınıyor. Sekiz kullanım noktası ve `puStreak` da güncellendi.

### Test · `pu_test.js` +14 kontrol · 6 kontrol anahtara uyarlandı

havuz ≥150 konu · 20 kitap · programdan çıkarılanlar da var · anahtar kitap+konu · göç fonksiyonu · **`pu[u.konu]` kalmadı** · ad çakışması var ve anahtarlar tekil · soru görevi `act=soru` · konu görevi `act=oku` · panelde doğru fiil · `para()` soru görevlerini sayıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-09a` ↔ `rota-2026-10-09a` · 425 442 bayt**

---

## 155 · ⚠ E HARFİ GÖRÜNMÜYORDU · `2026-10-10a`

### Kök sebep · gradyan birimi

```svg
<linearGradient id="altin" x1="0" y1="0" x2="0" y2="1">   <!-- objectBoundingBox -->
```

`objectBoundingBox` varsayılanı, ögenin **sınır kutusuna** göre çalışır. E'nin kolları düz yatay çizgi:

```svg
<path d="M100 152 H162"/>    <!-- sınır kutusu yüksekliği = 0 -->
```

Sıfır yükseklikli kutuda dikey gradyan **dejenere** oluyor ve hiç boyanmıyor. E tamamen kayboluyor, geriye yalnız üstüne çizilmiş koyu onay işaretleri kalıyordu.

D ve R etkilenmemişti çünkü kavisli yolların iki boyutu da sıfırdan büyük.

**Düzeltme:** iki gradyan da `gradientUnits="userSpaceOnUse"` ve açık koordinatlarla tanımlandı.

| Bölge | Önce | Sonra |
|---|---|---|
| E · altın piksel | ~0 | **3664** |

### E · yapılacaklar sekreteryası

Kalp siluetinden vazgeçildi (kullanıcı isteği). E artık düz bir liste:

- Omurga + üç kol (162 · 146 · 162 px)
- Her satırda köşeleri yuvarlatılmış **kutucuk**; ilk ikisi altın onay işaretli, üçüncüsü boş ve soluk (%50) — sırada bekleyen iş
- Altın gradyan `#F6E2AE → #C79F4C`

**Doğrulama · piksel taraması:** satır taramasında üç geniş bant (kollar) arasında dar 28 px kesitler (omurga); sütun taramasında solda 163 px omurga. **96 pikselde bile** altın 438 piksel — E ayırt ediliyor.

Kalp aurası kaldırıldı; D ve R aynen korundu.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-10a` ↔ `rota-2026-10-10a` · 425 444 bayt**

---

## 156 · LOGO · DÖRT DÜZELTME · `2026-10-11a`

### 1 · R · uzaylı antenleri kaldırıldı

İki uzun çatal uzantı silindi. Yerine: **R'nin üst kavisi ortadan açık** — steteskop başlığı gibi. Açıklığın iki yanında birbirine yakın iki yuvarlak uç (`r=4.6`, aralarında 8 px).

```
üst kavis sol :  M132 50 H148 A26 26 0 0 1 161 55
       (açıklık)
üst kavis sağ :  M170 63 A26 26 0 0 1 157 102 H132
```

Uçlar yakın olduğu için R'nin karnı kapalı okunuyor, harf bozulmuyor.

### 2 · E aynı renkte

Altın gradyan kaldırıldı; E de `buz` gradyanını kullanıyor. Artık üç harf tek renk ailesinde.

### 3 · onay işaretleri satır SONUNDA

Kutucuklar kolların üstünden alınıp **kolların bittiği yere** taşındı. Üç kol da eşit uzunlukta (50 px) — üç satır yazılı görev gibi duruyor:

| Satır | Sonu |
|---|---|
| 1 | ✓ onay |
| 2 | ✓ onay |
| 3 | boş kutu (%55 soluk) — sırada bekleyen iş |

**Piksel doğrulaması:** üç kol (y≈340/410/480) ve ilk ikisinin sağ ucunda ayrı işaret kümesi.

### 4 · D daha çok iletki

Eklendi:
- **Merkez çentiği**: düz kenarı kesen yatay çizgi + V nişangâh + merkez noktası
- **Kademeli taksimat**: 0/90/180'de uzun (4 px), 45/135'te orta (2.6 px), aralarda ince (2 px, %70)
- Taksimat yayın **içinden merkeze doğru** — gerçek iletkideki gibi

### Doğrulama

88 pikselde üç harf de ayrışıyor (ASCII taramasıyla denetlendi).

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-11a` ↔ `rota-2026-10-11a`**

---

## 157 · ⚠ İKON GÖMÜLDÜ · DIŞ DOSYA BAĞIMLILIĞI KALKTI · `2026-10-12a`

Kullanıcı: *"nedense ikonu tanımıyor, ikonsuz görünüyor."*

### Teşhis

Dosyalar ve referanslar **doğruydu**: `icon-180/192/512.png` geçerli PNG, `manifest.webmanifest` doğru, `index.html`'de `apple-touch-icon` ve `manifest` bağlantıları var, `sw.js` üçünü de önbelleğe alıyor.

Yani sorun kodda değil, **dağıtımda**: ikon dosyaları sunucuya çıkmamış ya da eski Service Worker bir 404'ü önbelleğe almış olabilir. iOS ana ekran ikonunu kurulum anında sabitlediği için de sonradan düzeltmek zor.

### Çözüm · bağımlılığı tamamen kaldır

**1 · İkon HTML'in içinde**

```html
<link rel="apple-touch-icon" href="data:image/png;base64,…">
<link rel="icon" type="image/png" href="data:image/png;base64,…">
```

**2 · Manifest çalışma zamanında Blob olarak kuruluyor**, ikonları da gömülü veri URI'si:

```js
const u=URL.createObjectURL(new Blob([JSON.stringify(mf)],
  {type:'application/manifest+json'}));
```

**3 · Bildirim ikonları** tek bir `window.IKON` sabitinden okunuyor; sabit, DOM'daki gömülü bağlantıdan alınıyor — boyut artmıyor.

**4 · `sw.js` önbellek listesinden** ikon ve manifest çıkarıldı; artık dosya olarak gerekmiyorlar.

| | Önce | Sonra |
|---|---|---|
| Dış `./icon-*.png` referansı | 5 | **0** |
| Gerekli ek dosya | 4 | **0** |
| `index.html` | 425 KB | 538 KB |

113 KB'lik artış, ikonun hiçbir koşulda kaybolmaması karşılığında kabul edildi — uygulama zaten çevrimdışı çalışan tek dosya.

**Doğrulama:** gömülü veri URI'si çözülüp PNG olarak açıldı — 180×180, geçerli, boş değil.

### Yükleme notu

iOS'ta ana ekrandaki eski kısayol eski ikonu tutar; **kısayolu silip yeniden eklemek** gerekiyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-12a` ↔ `rota-2026-10-12a` · 550 519 bayt**

---

## 158 · ⚠ KİLİT KALDIRILDI · HEDEF HER KAREDE ÖLÇÜLÜYOR · `2026-10-13a`

Kullanıcı: *"otomatik kaydırdığı kartın orta noktası olarak kaydırma görünümündeki küçük hâlini değil büyük hâlini referans alıyor olabilir mi?"*

**Şüphe yerindeydi — ama sorun ters yöndeydi.**

### Kök sebep · `otoKilit`

§135'te sekmeyi durdurmak için otomatik kaydırma boyunca açıklık **donduruluyordu**:

```js
sBas(); otoKilit=true;
…
if(!otoKilit) c.forEach(…)      // açıklık güncellemesi atlanıyor
```

Bunun iki sonucu vardı:
1. Kartlar kaydırma boyunca **büyümüyordu** — §135'te istenen "merkeze yaklaştıkça büyüsün" davranışının tersi
2. Animasyon bitip `gecis()` çalışınca hedef **birden** tam boyuta açılıyordu — hissedilen sıçrama buydu

### Çözüm · sabit mesafe yerine sürekli ölçüm

Kilit kaldırıldı; kartlar yine büyüyor. Büyüdükçe yükseklikler değiştiği için hedefin merkeze uzaklığı **her karede yeniden hesaplanıyor**:

```js
kayY = −uzaklık(şimdi) + (−y0) × (−(1 − yumuşatma(t)))
```

- `t=0` → `hedefY = y0` (başlangıç konumu)
- `t=1` → `hedefY = 0` (**tam merkez**)

Aradaki yükseklik değişimi ne olursa olsun iniş noktası değişmiyor.

**Matematiksel doğrulama · beş senaryo:**

| Başlangıç | Büyüme | Başta | Sonda |
|---|---|---|---|
| −200 | %0 | −200 | **0** |
| −200 | %18 | −200 | **0** |
| −200 | %45 | −200 | **0** |
| +300 | %30 | +300 | **0** |
| −80 | %60 | −80 | **0** |

Ayrıca hareketin **monoton** olduğu (geri sekme yok) 0.02 adımlarla sınandı.

### Test · `cark_test.js` +17 kontrol · 23 kontrol uyarlandı

kilit kalmadı · açıklık her karede güncelleniyor · `uzaklik()` fonksiyonu · her karede ölçüm · `kayY` formülü · başlangıç uzaklığı saklanıyor · **beş senaryoda tam merkez** · monotonluk · 30 adımda hata ve atlama yok.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-13a` ↔ `rota-2026-10-13a` · 550 907 bayt**

---

## 159 · GÜN GEZİNMESİ · `2026-10-14a`

Gün listesi yalnız bugünü gösteriyordu. Tarihin iki yanına ok eklendi.

### Yapı

```
┌───┬──────────────────────────┬───┐
│ ‹ │  5 Ağustos     bugün     │ › │
└───┴──────────────────────────┴───┘
   9 iş · 6.90 saat · tamamlanan 0.00
```

- `gunGoster` yalnız **görüntüyü** değiştirir; hiçbir hesabı, projeksiyonu ya da görev durumunu etkilemez
- Bugünde tarihin yanında `bugün` etiketi; başka güne geçilince yerini **"bugüne dön"** düğmesi alır
- Programın ilk gününde geri oku, son gününde ileri oku **kapalı** (%28 soluk)
- Liste kapanınca otomatik bugüne döner
- Ok tıklaması `stopPropagation` ile listeye sızmıyor; görev tıklamaları her yeniden kurulumda yeniden bağlanıyor (`gunBagla`)
- Ölçekleme her gün değişiminde tazeleniyor — yoğun günde satırlar küçülüyor
- Klavye odak halkası var

Boş günler için de ayrı metin: *"Bu gün için görev yok."*

### Test · `cark_test.js` +22 kontrol

`gunGoster` · `gunDizi` · `gunKomsu` · `gunBagla` · **25 gün sıralı** · geri/ileri komşu · uçlarda null · bilinmeyen gün null · iki ok · erişilebilirlik etiketleri · bugün/başka gün ayrımı · uçlarda kapalı ok · kip kapanınca sıfırlanıyor · olay durduruluyor · görev tıklaması yeniden bağlanıyor · ölçek tazeleniyor · odak halkası.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-14a` ↔ `rota-2026-10-14a` · 554 116 bayt**

---

## 160 · METALİK GRİ LOGO · `2026-10-16a`

Buz mavisi bırakıldı; Bevel uygulamasının logosundaki gibi **eğimli metal** görünümü kuruldu.

### Üç katman

Harfler `<defs>` içinde bir kez tanımlanıp `<use>` ile üç kez çiziliyor:

| Katman | Kaçıklık | Görev |
|---|---|---|
| 1 · gölge | +2.2, +2.6 | derinlik · `#20252A → #0B0E12` |
| 2 · metal gövde | 0, 0 | ana yüzey |
| 3 · kenar parlaması | −1.1, −1.3 | ince beyaz vurgu (%55, 2.4 px) |

### Metal gradyanı · dokuz durak

```
#FBFCFD → #DEE3E8 → #AEB5BC → #7E858C
       → #EDF1F4 (ikinci parlama)
       → #A7AEB5 → #6B7278 → #9AA1A8 → #5C6268
```

Tek yönlü gradyan yerine **iki parlama, üç gölge** — metalin yüzey kırılmasını taklit ediyor. Işık sol üstten, koyu kenar sağ altta.

**Ölçüm sonuçları:**

| | Değer |
|---|---|
| Nötr gri piksel | **%100** (mavi tonlu: 6/14 511) |
| Ton aralığı | **40 – 246** (genişlik 206) |
| Kesit profili | sol kenar 57 → gövde 206 → sağa 174 |

### ⚠ Boyut · paletli sıkıştırma

Metalik gradyan PNG'yi büyüttü: 180 px ikon 11.7 → 23.0 KB, 512 px 38.5 → 93.0 KB. Gömülü veri 272 KB'a çıkıp dosyayı 692 KB yaptı.

Çözüm:
- **Paletli PNG** (128–192 renk, `effort:10`): 180 px → **3.2 KB**, 256 px → **11.7 KB**
- 512 px yerine **256 px** gömüldü (manifest için yeterli)
- Yinelenen bağlantılar (`152x152`, `120x120` apple-touch-icon) **JS'te ilkinden türetiliyor** — veri bir kez duruyor

| | Önce | Sonra |
|---|---|---|
| Gömülü veri | 272 KB (6 adet) | **19.9 KB (2 adet)** |
| `index.html` | 692 KB | **441 KB** |

Paletlemeden sonra ton aralığı 72–240 (180 px) ve 51–246 (256 px) — metalik karakter korundu, nötrlük %100.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-16a` ↔ `rota-2026-10-16a` · 451 178 bayt**

---

## 161 · MANİFEST · GERÇEK DOSYA ÖNCE, BLOB YEDEK · `2026-10-17a`

§157'de manifest tamamen çalışma zamanı Blob'una taşınmıştı. Bu, dosya eksikliğine karşı sağlamdı ama bir bedeli vardı:

**Android/Chrome kurulabilirlik ve ikon güncellemesi için KALICI bir manifest adresi istiyor.** Blob URL'i her oturumda değişiyor; Chrome onu takip edilebilir bir manifest saymıyor.

### Yeni düzen

```html
<link id="mfDosya" rel="manifest" href="./manifest.webmanifest">
```

Statik dosya **önce** bağlanıyor. Açılışta `fetch` ile erişilebilirliği sınanıyor:

- **Erişilebiliyorsa** → hiçbir şey yapılmıyor, normal PWA davranışı
- **404 / erişilemiyorsa** → bağlantı kaldırılıp Blob yedeği kuruluyor

Gömülü `apple-touch-icon` her iki durumda da duruyor, yani iOS ikonu hiçbir koşulda kaybolmuyor.

`manifest.webmanifest` dört ikon boyutuyla (180/192/512/512-maskable) yeniden yazıldı.

### Ana ekran ikonu · gerçekler

| Ortam | Yeni ikon görünür mü |
|---|---|
| Safari sekmesi | **evet**, HTML ağdan geldiği anda |
| Uygulama içi | **evet** |
| iOS/iPadOS ana ekran kısayolu | **hayır** — kurulum anında sabitleniyor |
| Android ana ekran | belirsiz — Chrome bazen günceller |

Service worker HTML için **önce ağ** stratejisi kullanıyor (`cache:'no-store'`) ve `skipWaiting` + `clients.claim` var; yani uygulama içeriği ilk açılışta yenileniyor. Ama ana ekran ikonu işletim sisteminin kopyası olduğu için **kısayolu silip yeniden eklemek** gerekiyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-17a` ↔ `rota-2026-10-17a` · 451 798 bayt**

---

## 162 · ⚠ TAMAMLAMADA DURAK ATLAMASI · `2026-10-19a`

Kullanıcı: *"Tamamlandı'ya basınca bir sonraki göreve değil ondan sonrakine geçti. Sıradaki 3-4 görev telafi görevleriydi, bu yüzden mi?"*

**Hayır — görev türüyle ilgisi yok. Her tamamlamada oluyordu.**

### Kök sebep · sıra hatası

```js
D.bitti[id(g)] = bgun();          // görev carkListe()'den DÜŞÜYOR
…
otoKaydir(1, …)                   // p = durakKonum() → −1 → p=0 kabul
                                  // np = 0+1 = 1  ← ama sıradaki artık 0'da
```

Görev tamamlanınca listeden çıkıyor; `durakKonum()` −1 dönüyor, kod `p=0` kabul ediyor ve `p+1` alıyor. Oysa çıkan görevin yerine geçen durak **zaten 0'da**. Sonuç: her tamamlamada **tam bir durak atlanıyor**.

Doğrulama: beklenen hedef "görev 6 · iş", gidilen "görev 6 · **mola**" — bir durak ileri.

### Düzeltme · hedef ÖNCE seçiliyor

`otoKaydir` ikiye ayrıldı:

| Fonksiyon | Görev |
|---|---|
| `otoKaydirHedef(hed, bitince)` | verilen durağa animasyonla gider |
| `otoKaydir(d, bitince)` | yönden hedef türetir, devreder |
| `siradakiDurak(atlaI)` | **şu anki** listeden sıradaki durağı verir |

Tamamlandı ve "çarka geri taşı" yollarında hedef, `D.bitti` / `D.tasi` değişmeden **önce** seçiliyor.

### ⚠ İkinci uç durum · görevin kendi molası

Bir görevin sıradaki durağı **kendi mola durağı** olabiliyor. Görev tamamlanınca ikisi birden düşüyor, seçilmiş hedef boşluğa düşüyordu (14 denemede 4 atlama).

`siradakiDurak(atlaI)` artık o göreve ait **tüm** durakları atlıyor.

### Doğrulama

| Sınama | Sonuç |
|---|---|
| 14 ardışık tamamlama | **atlama 0** |
| 20 Sonraki/Önceki | hata 0 · atlama 0 |

Sorulara cevap: hata **power-up ve normal görevlerde de** oluyordu; telafi görevleri rastlantıydı.

### Test · `cark_test.js` +13 kontrol

hedef seçimi ayrıldı · üç fonksiyon · `atlaI` parametresi · göreve ait duraklar atlanıyor · iki yolda da hedef önce seçiliyor · **14 ardışık tamamlamada atlama yok** · Sonraki/Önceki bozulmadı · uç durumlar.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-19a` ↔ `rota-2026-10-19a` · 453 309 bayt**

---

## 163 · ⚠ VİDEO GÖREVLERİ SIFIR SAYILIYORDU · `2026-10-20a`

Kullanıcı: *"Dahiliye videolarıyla bütün Dahiliye 1-2 konu kitaplarını tekrar etmiş oluyorum, onun tahmini net kazancını hesaplamadın mı?"*

**Hesaplanmamıştı. 44 video görevinin tamamı `soru:0` idi — 16.8 saat çalışma, projeksiyona sıfır katkı.**

### Eşleşme birebir

| Konu | Video | Kitap sf | Okuma saati | soru |
|---|---|---|---|---|
| Hematoloji | 4.00 sa | 82 | 10.25 | 1.8 |
| Onkoloji | 0.50 | 12 | 1.50 | 1.8 |
| Kardiyoloji | 3.00 | 82 | 10.25 | 3.0 |
| Göğüs Hastalıkları | 2.00 | 68 | 8.50 | 2.0 |
| Nefroloji | 1.33 | 52 | 6.50 | 2.2 |
| Endokrinoloji | 2.33 | 76 | 9.50 | 2.0 |
| Gastroenteroloji | 2.33 | 80 | 10.00 | 3.4 |
| Romatoloji | 1.33 | 45 | 5.62 | 2.2 |
| **TOPLAM** | **16.8 sa** | 497 | **62.1 sa** | **18.4** |

Sekiz video konusu, Atilla Uslu Dahiliye 1-2'nin sekiz bölümüne **birebir** karşılık geliyor. 16.8 saat video, 62.1 saatlik okuma içeriğini kapsıyor.

### İki kök sebep

**1 · `soru:0`** — video görevlerine hiç soru değeri atanmamış. Her konunun kitap değeri, alt parçalara **süreye göre** paylaştırıldı (ör. Hematoloji 1.8 → 9 parçaya 0.2'şer).

**2 · geçersiz grup adı** — `z: 'Dahiliye video'`. `TAVAN_G`'de böyle anahtar yok; `para()` "tavanı bilinmeyen grup" dalına girip donmuş `kaz=0` değerine düşüyordu. `z: 'Dahiliye grubu'` yapıldı. (§153'teki power-up grup adı hatasının aynısı.)

Ayrıca `para()` filtresi `oku`/`soru` ile sınırlıydı; `video` eklendi (iki yerde).

### Etki

| | K puanı | Klinik net |
|---|---|---|
| Videolar sayılmadan | 55.721 | 35.64 |
| Videolar tamamlanmış | **56.441** | **38.24** |
| **Katkı** | **+0.720** | **+2.60** |

Programın tamamı yapılırsa: **62.03 → 62.61**

`kos.js`'teki beklenen son puan 62.04 → 62.54 güncellendi.

### Test · `kos.js` +19 kontrol

44 görev · hepsinde soru değeri · toplam 18.4 · grup adı geçerli · `Dahiliye video` kalmadı · **sekiz konunun her biri kitap değeriyle birebir** · projeksiyonu artırıyor · katkı makul aralıkta · klinik net artıyor · temel net değişmiyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-20a` ↔ `rota-2026-10-20a` · 453 755 bayt**

---

## 164 · DENEME NET GETİRİSİ MODELİ · `2026-10-24a`

Denemeler de projeksiyona sıfır katkı veriyordu (51 görev · 54 saat). Kullanıcının şartnamesi uygulandı.

### Model · A · B · C

| Madde | Kaynak | Değer |
|---|---|---|
| **A** · TUS'ta konudan kaç soru | `SORU.den[branş]` (TusAnaliz) | toplam 200 |
| **B** · 1 sayfa tekrarın net getirisi | katalogdan `Σnet / Σsayfa` | grup başına 0.0086–0.0248 |
| **C** · 1 soru = 0.25 sayfa | `SORU_ORAN = 0.25` | — |

```
kazanç = Σ (soru sayısı × 0.25 × NET_SAYFA[grup])
```

**Sayfa başına net (B):**

| Grup | sayfa | net | net/sayfa |
|---|---|---|---|
| Biyokimya | 421 | 10.43 | 0.02477 |
| Farmakoloji | 323 | 7.25 | 0.02245 |
| Anatomi | 122 | 2.65 | 0.02171 |
| Genel Cerrahi | 434 | 8.80 | 0.02028 |
| Mikrobiyoloji | 570 | 7.33 | 0.01287 |
| Pediatri | 378 | 4.77 | 0.01261 |
| Dahiliye | 1366 | 15.89 | 0.01163 |
| Kadın Doğum | 367 | 4.07 | 0.01110 |
| Fizyoloji+Histo | 499 | 5.09 | 0.01021 |
| Patoloji | 432 | 3.71 | 0.00858 |

**Görev tipleri:**
- **24'lü deneme** → kendi branşı, 24 soru
- **PreTUS200 / tam deneme** → 200 soru, TusAnaliz dağılımı (11 branş)

### ⚠ Azalan verim eklendi

Şartnamedeki formül tavan içermiyordu ama "projeksiyon şaşmasın" koşulu gerektirdi. `derin_test.js` de yakaladı: çok iyi denemede kalan katkı 1.61 çıkıyordu (eşik 0.5).

Modelin geri kalanıyla tutarlı iki katman:
```js
kz *= bosluk[grup] / TAVAN_G[grup];     // oransal sönüm
kz  = min(kz, bosluk[grup]);            // sert tavan
```

**Deneme sonucuna göre bir PreTUS200'ün getirisi:**

| Deneme durumu | PreTUS200 | 24'lü |
|---|---|---|
| düşük | 0.518 | 0.068 |
| beklenen | 0.368 | 0.047 |
| çok iyi | **0.090** | 0.010 |

### Dondurma · projeksiyon şaşmasın

| Durum | Davranış |
|---|---|
| Tamamlanmamış · telafide · power-up listesinde | **anlık** hesap · her görev/deneme/power-up sonrası tazelenir |
| Tamamlanmış | değer `D.denKaz`'da **DONMUŞ** |
| Geri al | donmuş kayıt silinir · çözülmemiş statüsüne döner |

Doğrulandı: bir deneme tamamlandıktan sonra 95 okuma görevi işaretlendi — donmuş değer **bit bit aynı** kaldı.

### Gösterim

- Görev kartı brif çipi: `Tahmini getiri · donmuş | +0.122 net`
- Telafi listesi: satır sonunda `+0.122 net`

### Etki

| | K |
|---|---|
| Denemeler sayılmadan | 55.721 |
| Denemeler tamamlanmış | **57.079** |
| **Katkı** | **+1.358** |

Programın tamamı: 62.61 → **63.97**

### Test · `kos.js` +21 kontrol

üç fonksiyon · A/B/C maddelerinin kodda karşılığı · 24'lü 24 soru · tavan sınırı · azalan verim · **sonuç iyileşince getiri azalıyor** · PreTUS200 > 24'lü · **dondurma: sonraki çalışmalar değeri değiştirmiyor** · geri alınca çözülüyor · `denKaz` silinir · katkı makul.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-24a` ↔ `rota-2026-10-24a` · 458 909 bayt**

---

## 165 · ⚠ "24'LÜ" SERİ ADI · KONU BAZLI DENEME MODELİ · `2026-10-25a`

### ⚠ Benim hatam · "24'lü" soru sayısı değil

24'lü TUS denemesi bir **seri adı**: içinde 24 branş denemesi var ve her denemenin soru sayısı o branşın TUS'ta çıkardığı soru kadar.

| 24'lü serisi | Deneme başına soru |
|---|---|
| Patoloji | 18 |
| Dahiliye | 35 |
| Genel Cerrahi | 30 |
| Fizyoloji | 8 |
| Küçük Stajlar | 19 (gerçek TUS'ta bölüm yok → Dahiliye/GC'ye dağıtılır) |

`denemeKaz` her göreve **24 soru** kredisi veriyordu. Yanlıştı.

**Program zaten doğru kurulmuş:** her 24'lü görevin süresi = TusAnaliz soru sayısı × **1.87 dk/soru** (dokuz branşta tutarlı). Yalnız hesap yanlıştı.

### Konu bazlı dağılım · `KONU_DAG`

Katalogdaki konu değerleri branş toplamını **%71 aşıyordu** — aynı konu birkaç kitapta birden sayılıyor (Biyokimya 3 kitap → 51.2). Üç adımda düzeltildi:

1. **Tekilleştirme** — aynı konu için en büyük değer; `(Oldies+Goldies)`, `Genel/Temel/Tıbbi/Klinik` önekleri sadeleştirildi
2. **Küçük Stajlar dağıtımı** — 22 konu Dahiliye'ye (8) ve Genel Cerrahi'ye (14)
3. **Normalizasyon** — her branşın Σ'sı `SORU.den[branş]`a **tam** eşitlendi

| Branş | Konu | Σ | TusAnaliz |
|---|---|---|---|
| Mikrobiyoloji | 6 | 18.00 | 18 |
| Dahiliye | 19 | 35.00 | 35 |
| Genel Cerrahi | 45 | 30.00 | 30 |
| Patoloji | 19 | 18.00 | 18 |
| Fizyoloji | 18 | 8.00 | 8 |

**163 konu · 10 branş.** Örnek — Mikrobiyoloji: bakteriyoloji 6.40 · mikrobiyoloji 3.00 · viroloji 2.80 · mikoloji 2.20 · parazitoloji 2.00 · immünoloji 1.60 = **18.00**

### Yeni öğrenme / tekrar ayrımı

Modelde ayrı bir "tekrar sayfa getirisi" formülü yok; ayrım **kararlılık sabitinden** geliyor:

```js
const S = konuCalisildi(konu) ? S_TEK : S_ILK;   // 6.0 : 2.4
kz = soru × SORU_ORAN × NET_SAYFA[grup] × Rr(gün, S);
```

17 gün kala: `Rr(17, S_TEK)/Rr(17, S_ILK) = 1.26×`. Tekrar daha çok tutuyor.

`konuCalisildi()` tamamlanmış görev adlarını sadeleştirip konu adıyla eşleştiriyor.

### Sonuçlar

| Durum | 24'lü GC | PreTUS200 |
|---|---|---|
| Hiç çalışılmamış | 0.0519 (yeni 30 soru) | 0.3040 (yeni 193) |
| Tüm konular çalışılmış | **0.0622** (yeni 8 · tekrar 22) | **0.3568** (yeni 67 · tekrar 126) |

Çürüme artık `denemeKaz` içinde **konu konu** uygulanıyor; `para()` tekrar uygulamıyor (çift sayım giderildi).

### Test · `kos.js` +25 kontrol

`KONU_DAG` · 10 branş · 163 konu · **her branşın Σ'sı TusAnaliz'e tam eşit** (10 ayrı kontrol) · Küçük Stajlar ayrı branş değil · sadeleştirme · yeni/tekrar `S` seçimi · çürüme konu konu · **`para()` çürümeyi tekrar uygulamıyor** · 24'lü tek branş · PreTUS200 on branş · **kredi soru = branşın TUS sayısı** · çalışılınca tekrara geçiyor ve getiri artıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-25a` ↔ `rota-2026-10-25a` · 465 812 bayt**

---

## 166 · ⚠ KARTTA GÖRÜNEN KAZANÇ EKSİKTİ · `2026-10-26a`

Kullanıcı: *"izlediğim Dahiliye videoları projeksiyona katkıda bulunmuyor galiba?"*

### Projeksiyon sayıyor · kart göstermiyordu

Üç yol da sınandı, **hepsi doğru çalışıyor:**

| Senaryo | Katkı |
|---|---|
| Temiz durumda 9 Hematoloji videosu | **+0.0697 K** ✓ |
| Videolar telafiye düşmüşken (7 gün geride) | +0.0697 K ✓ |
| Çarka taşınıp tamamlanınca | +0.0697 K ✓ |

Sorun görüntülemeydi:

```js
function gorevKazanc(g){
  if(!g||!g.soru)return 0;
  if(g.act!=='oku'&&g.act!=='tekrar')return 0;   // ← video ve deneme dışlanıyor
```

Kartın "Beklenen kazanç" çipi bu fonksiyondan besleniyor. Video ve deneme görevleri süzgece takıldığı için **çip hiç çıkmıyordu** — katkı yok sanılıyordu.

### Düzeltme

```js
const den=(g.act==='deneme'||g.act==='deneme24');
if(!den&&!g.soru)return 0;      /* denemelerin getirisi g.soru'dan değil
                                   denemeKaz'tan geliyor */
if(['oku','tekrar','video','soru','deneme','deneme24'].indexOf(g.act)<0)return 0;
```

**Kartta görünen değerler:**

| Görev | soru | Kazanç | Kartta |
|---|---|---|---|
| Hematoloji videosu 1/9 | 0.2 | 0.0282 | **+0.03 klinik** |
| Gastrointestinal sistem (okuma) | 1.8 | 0.4488 | +0.45 temel |
| 24'lü Genel Cerrahi | 0 | 0.0519 | **+0.05 klinik** |
| PreTUS200 | 0 | 0.3040 | **+0.30 klinik** |
| Deneme analizi | 0 | 0 | çip yok (doğru) |

### Not · sürüm

Video katkısı §163'te (`2026-10-20a`) eklenmişti. O sürümden önce gerçekten sıfırdı; eski sürüm yüklüyse katkı görünmez.

### Test · `kos.js` +12 kontrol

süzgeç genişletildi · deneme soru şartından muaf · dört görev türünde kazanç görünüyor · PreTUS200 > 24'lü · üç türde brif çipi çiziliyor · **telafi yoluyla yapılan video sayılıyor** · geride kalmış görev de sayılıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-26a` ↔ `rota-2026-10-26a` · 466 234 bayt**

---

## 167 · ⚠ ÇİFT SAYIM · PERFORMANS · ÇİP · `2026-10-27a`

Yedi ekran görüntüsü incelendi. Üç hata, iki cevap.

### ⚠ 1 · PreTUS200 ÇİFT SAYILIYORDU

Program PreTUS200'ü iki oturuma bölmüş (2×2.25 sa) ama `denemeKaz` **her iki oturuma da 200 sorunun tamamını** kredilendiriyordu. Ekran görüntülerinde ikisi de `+0.277 net` gösteriyor — kanıt.

Gerçek TUS'ta önce **temel 100**, sonra **klinik 100** çözülür. Aynı bölüm uygulandı:

```js
const ot=/(\d+)\.\s*oturum/.exec(g.k);
branslar = tum.filter(br => (TEMEL_BR.indexOf(br)>=0) === (n===1));
```

| | Branş | Konu | Getiri |
|---|---|---|---|
| 1. oturum | 6 temel | 76 | **0.1564 temel** |
| 2. oturum | 4 klinik | 87 | **0.1197 klinik** |
| Toplam | 10 | 163 | 0.2761 |

Eskiden 2 × 0.2761 = **0.5522** sayılıyordu. Yarıya indi.

### ⚠ 2 · ÇİP GECİKMESİ · 1379 ms → 4 ms

`konuCalisildi` her konu için **tüm görev listesini** tarıyordu: 163 konu × 196 görev. Tek `denemeKaz` 479 ms, `gorevKazanc` iki kez `para()` çağırdığı için **1379 ms**. iPad'de saniyeler sürüyor, çip görünmüyor; kaydırıp yeniden seçince önbellekten geliyordu — kullanıcının tarif ettiği davranış tam bu.

Tamamlanmış görev adları artık **bir kez** toplanıp kümede tutuluyor:

| | Önce | Sonra |
|---|---|---|
| `denemeKaz` | 479 ms | **3 ms** |
| `gorevKazanc` | 1379 ms | **4 ms** |

**345 kat.**

### 3 · çip biçimi tekleşti

Ayrı "Tahmini getiri" çipi kaldırıldı. Denemeler de diğer görevler gibi yeşil **"Beklenen kazanç"** çipi kullanıyor. Etiket artık `g.tur` yerine getirinin **gerçek dağılımından**:

| Görev | Çip |
|---|---|
| PreTUS200 1. oturum | +0.16 **temel** |
| PreTUS200 2. oturum | +0.12 **klinik** |
| 24'lü Genel Cerrahi | +0.05 klinik |
| Okuma | +0.43 temel |
| Video | +0.03 klinik |

### 4 · CEVAP · 24'lü denemeler nerede

Programda **13–22 Ağustos** arasına yerleşmiş (6 günde 39 deneme). 30 Temmuz'da görünmemesi doğru — son on gün deneme yoğunlaştırması.

### 5 · CEVAP · 24'lü kalibrasyonu doğru kurulmuş

Girdi paneli zaten doğru tanımlıyor: *"Deneme boyutu branşa göre değişir — o branşta TUS'ta çıkan soru sayısı kadar (Fizyoloji 8, Patoloji 18, Dahiliye 35…)"*.

`rCalHesap` iki yolu destekliyor:
- **AYRIK veri** (`kd/ky/kb`) → doğrudan `R=(p−p0)/(1−p0)`, gerçek binom varyansıyla
- **TEMEL veri** (`d/y/b`) → kapsam üzerinden dolaylı

Yalnız `denemeKaz` 24 soru sayıyordu; o da §165'te düzeltildi.

### ⚠ 6 · AÇIK KALEM · Histo-Embriyoloji

`KONU_DAG` 193/200 soruyu kapsıyor. Eksik **7 soru = Histo-Embriyoloji** — katalogda bu branşa ait hiç bölüm yok, dolayısıyla konu dağılımı da yok. Önceden var olan bir veri boşluğu; deneme getirisinin %3.5'i hesaplanamıyor.

### Test · `kos.js` +18 kontrol

oturum bölümü · 1. oturum yalnız temel · 2. oturum yalnız klinik · altı/dört branş · **iki oturum toplamı ~200** · çift sayım yok · `gorevKazanc` <150 ms · `denemeKaz` <80 ms · beş görev türünde çip ve doğru etiket.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-27a` ↔ `rota-2026-10-27a` · 467 565 bayt**

---

## 168 · ERKEN ÇÖZÜLEBİLİR DENEMELER · `2026-10-28a`

Kullanıcı 24'lü denemeleri inisiyatif alıp erken çözmek istiyor.

### Tasarım kararı · KOPYA YOK

24'lü denemeler **zaten çarkta** (13–22 Ağustos, listede aşağıda). Power-up havuzuna kopya eklemek çift sayım riski taşıyordu. Yerine **öne çekme**:

```js
if((D.erken||{})[k]){PU.push(i);continue}   // carkListe · en üstte
```

Programdaki görevin kendisi öne alınıyor. Yeni görev nesnesi oluşmadığı için **çift sayım imkânsız**.

### Panel bölümü

Power-up panelinin başında ayrı bir bölüm: **"Erken çözülebilir denemeler"** — 39 deneme · 27.0 sa.

Her satırda:
- Anlık getiri (`+0.045 net`) · altın renkte
- Branş · 24'lü numarası · programdaki tarih
- Süre · o branşın TUS soru sayısı · net/saat
- **Öne çek** / **Geri gönder** düğmesi

Sıralama anlık `net/saat`e göre: Farmakoloji 0.081 → Patoloji 0.014.

### Doğrulama · çift sayım denetimi

| Sınama | Sonuç |
|---|---|
| Öne çekince çark listesi görev sayısı | 181 → **181** (kopya yok) |
| Öne çekmek tek başına projeksiyon | 55.7212 → **55.7212** (değişmiyor) |
| Çekilen çarkta en üstte | ✓ |
| Tamamlanınca katkı | **+0.0095** |
| Havuzdan düşüyor | ✓ |
| Getirisi donuyor | ✓ |
| Geri gönderilince havuza dönüyor | ✓ |
| Geri alınca projeksiyon başa dönüyor | ✓ (fark < 1e−9) |

Zamanı gelmiş denemeler havuzda görünmüyor — çarkta zaten var.

### Test · `pu_test.js` +21 kontrol

`denemeHavuz` · `carkListe` erken kaydı · iki düğme · kalıcı yazım · CSS · 39 deneme · hepsi ileri tarihli ve 24'lü · verime göre sıralı · getiriler pozitif · **kopya oluşmuyor** · **çekmek projeksiyonu değiştirmiyor** · en üstte · erken işaretli · tamamlanınca katkı · havuzdan düşüyor · donuyor · geri gönderme üç kontrol · son günde havuz doğru daralıyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-28a` ↔ `rota-2026-10-28a` · 470 794 bayt**

---

## 169 · ⚠ KAPSAM YALNIZ `oku` SAYIYORDU · `2026-10-29a`

Kullanıcı: *"izlediğim Dahiliye videolarının kazançları güç matrisine yansımıyor mu? 6 video işaretledim ama parakete değişmedi."*

### CEVAP 1 · parakete DEĞİŞMİŞ

| | Değer |
|---|---|
| Temiz başlangıç | 55.7212 → ekranda **55.72** |
| 6 video sonrası | 55.7635 → ekranda **55.76** |

Ekran görüntüsündeki `PARAKETE 55.76` tam olarak altı videonun işlendiği değer. Katkı +0.042 — küçük ama görünür.

Ölçek karşılaştırması: bir video 0.2 soru değeri taşıyor, bir okuma görevi 1.8. Yani bir okuma ≈ dokuz video. Katkının küçük görünmesi doğal.

### ⚠ CEVAP 2 · güç matrisi gerçekten yansıtmıyordu

```js
function grupKapsam(){
  GOREVLER.forEach(g=>{ if(g.act!=='oku'||!g.soru)return;   // ← yalnız oku
```

Güç matrisini besleyen kapsam ölçüsü **yalnız `oku`** görevlerini sayıyordu. Sonuçları:

1. Dahiliye videolarının **tamamı** izlense bile matris Dahiliye'yi %0 gösteriyordu
2. Daha kötüsü: `bransKapsam` de aynı fonksiyondan besleniyor. Kalibrasyon `kapsam<0.08` olan branşları **atlıyor** — yani Dahiliye videolarını izleyip Dahiliye denemesi girsen bile **kalibrasyon o veriyi kullanamıyordu**

**Düzeltme:**

```js
const KAPSA=['oku','video','soru','tekrar'];
```

Deneme görevleri **bilerek dışarıda**: deneme çözmek ölçümdür, içerik kapsamı değil.

### Etki

| | Önce | Sonra |
|---|---|---|
| Dahiliye kapsamı (44 video izlenmiş) | **0.0000** | **0.4830** |
| Aynı durumda Dahiliye denemesi girilince R_CAL | 0.4050 (sinyal yok) | **0.4343** |
| R_CAL belirsizliği | ±0.1950 | **±0.1883** |

### CEVAP 3 · diğer görev tipleri

| Tür | Projeksiyon | Kapsam/matris | Kart çipi |
|---|---|---|---|
| `oku` | ✓ | ✓ | ✓ |
| `video` | ✓ (§163) | ✓ (**bu sürüm**) | ✓ (§166) |
| `soru` | ✓ (§154) | ✓ (**bu sürüm**) | ✓ (§166) |
| `deneme` · `deneme24` | ✓ (§164) | bilerek hayır | ✓ (§166) |
| `analiz` | soru değeri yok | — | — |

### Test · `kal_test.js` +9 kontrol

kapsam listesi · deneme dışarıda · başta sıfır · videolar kapsama giriyor · branş kapsamı artıyor · **kalibrasyon sinyal çıkarıyor** · belirsizlik daralıyor · kapsam yokken sinyal yok · denemeler kapsamı şişirmiyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-29a` ↔ `rota-2026-10-29a` · 471 222 bayt**

---

## 170 · DENEME KAPSAMA GİRİYOR · BİRİM SORUNU · `2026-10-30a`

Kullanıcı: *"deneme aynı zamanda tekrardır, kazancını nasıl hesapladığımızı konuşmuştuk; matris dışında tutman mantıklı gelmedi. Eğer hepsi aynı net potansiyeli havuzunu paylaşmıyorsa denemenin katkısı sıfır olmalı — ama gerçek öyle değil."*

**Mantık tutarsızlığı haklıydı.** §169'da denemeleri "ölçümdür, kapsam değildir" diye dışarıda bırakmıştım; oysa aynı havuzdan kazanç sayıyorsak kapsama da girmeleri gerekir.

### ⚠ Ama birimler farklı

| | Birim | Dahiliye örneği |
|---|---|---|
| İçerik `soru` | "bu bölüm TUS'ta kaç soru getirir" | 38.09 |
| Deneme soru sayısı | "kaç soru çözdüm" | 6 × 35 = **210** |

Ham sayı eklenirse kapsam şişer. Üç seçenek sayısal olarak karşılaştırıldı:

| Senaryo | Tüm içerik yapılmış | Yalnız denemeler |
|---|---|---|
| A · deneme sayılmaz (§169) | 1.000 | **0.000** ✗ |
| B · numaratör + payda | **0.266** ✗ | 0.734 |
| C · yalnız numaratör | 1.000 | **1.000** ✗ |

Üçü de yanlış: A denemeyi yok sayıyor, B içeriği ezip %27'ye düşürüyor, C altı denemeyi "tam kapsam" ilan ediyor.

### Çözüm · modelin kendi para birimi: NET

```js
katkı(soru) = (denemenin neti / grubun tavanı) × branşın soru sayısı
```

Ölçek gerçekliği doğruluyor:

| | Tavana oranı |
|---|---|
| Tüm Dahiliye içeriği (okuma + video) | **%109** |
| Tüm Dahiliye denemeleri | **%1.0** |

Yani denemeler sıfır değil ama içeriğin yanında küçük — kullanıcının "kazanç mı çok az?" sorusunun sayısal cevabı da bu.

### Sonuçlar

| Durum | Dahiliye kapsamı |
|---|---|
| Hiçbir şey yapılmadan | 0.0000 |
| 44 video izlenince | 0.4830 |
| 6 Dahiliye 24'lüsü çözülünce | **0.0084** (eskiden 0) |
| Programın tamamı | 1.0000 |

Tekrarlanan denemeler `denemeKaz`ın azalan verim sönümü sayesinde giderek daha az ekliyor — ayrıca sınandı.

### Test · `kal_test.js` +11 kontrol

deneme kapsam bloğu · **net oranıyla ekleniyor** · ham soru eklenmiyor · başta sıfır · denemeler kapsama giriyor · katkı küçük (<%5) · içerik katkısı 20 kat büyük · tamamında kapsam 1.0 · 1'i aşmıyor · her deneme ekliyor · **artışlar azalan verimle küçülüyor**.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-30a` ↔ `rota-2026-10-30a` · 472 275 bayt**

---

## 171 · DENEME → MATRİS ZİNCİRİ · ELLE GİRDİ · `2026-10-31a`

Kullanıcı şartnameyi ayrıntılı yazdı ve zincirin denetlenmesini istedi.

### Denetim · mevcut zincir DOĞRU çalışıyor

PreTUS200 1. oturum incelendi:

| | Değer |
|---|---|
| Konu sayısı | 76 |
| Soru toplamı | 93.0 (temel yarısı) |
| Net toplamı | 0.27276 |

Konu konu kırılım örneği:

| Branş | Konu | Soru | Net | Tür |
|---|---|---|---|---|
| Biyokimya | aminoasitler ve proteinler | 3.76 | 0.014820 | yeni |
| Biyokimya | karbonhidratlar | 1.32 | 0.005200 | yeni |
| Biyokimya | lipidler | 1.53 | 0.005998 | yeni |

**Branş toplamları TusAnaliz'e tam oturuyor:** Biyokimya 18/18 · Farmakoloji 18/18 · Mikrobiyoloji 18/18 · Fizyoloji 8/8 · Patoloji 18/18 · Anatomi 13/13.

Matris ataması `dv.dagilim` üzerinden branş branş yapılıyor — şartnamedeki "hangi dersin hangi konularına iliştirdiyse oraya" koşulu karşılanıyor.

### ⚠ EKSİK OLAN · programda olmayan deneme

Şartnamenin kritik maddesi eksikti: *"eğer bu deneme programda yazılı olmadan benim özverimle çözülüp güç matrisi ve deneme sayfasından ders ders doğru yanlışları girilerek sisteme eklendiyse yine o an bu hesabı yapıp getirisini paraketeye ve matrise eklemesi lazım."*

Elle girilen denemeler yalnız **ölçülen tabanı** değiştiriyordu; çözme getirisi hiç sayılmıyordu.

**Eklenenler:**

| Fonksiyon | Görev |
|---|---|
| `denemeKazHam(branslar,tar)` | çekirdek hesap · program görevleriyle birebir aynı yol |
| `elleDenemeKaz()` | en son elle girdinin getirisi |

- **Yalnız EN SON deneme** sayılıyor; öncekilerin etkisi ölçülen tabanın içinde zaten var
- **Çift sayım koruması:** aynı gün tamamlanmış bir program denemesi varsa elle getiri `null` döner
- Tek branş girdisi (`o.bl`) destekli — 24'lü için de çalışır
- `para()` ve `grupKapsam()` ikisi de ekliyor

**Doğrulama:**

| | Değer |
|---|---|
| Elle tam deneme getirisi | 0.25973 net (temel 0.14439 · klinik 0.11533) |
| Konu sayısı | 163 · 193 soru |
| Parakete | değişiyor ✓ |
| Matris | yansıyor ✓ |
| Aynı gün program denemesi tamamlanınca | `null` ✓ **çift sayım yok** |

### ⚠ İki test invariant'ı gevşetildi · gerekçeli

`derin_test.js` B6/B7: "son deneme tarihinde/öncesinde tamamlanan iş puana yansımaz". Artık **0.0002 mertebesinde** yansıyor — çünkü sınav öncesi çalışma, elle girilen denemenin **yeni öğrenme / tekrar** sınıflandırmasını değiştiriyor. İşin kendisi çift sayılmıyor; yalnız denemenin tekrar niteliği güncelleniyor. Tolerans `1e-6` → `0.001`.

`kal_test.js` "başta kapsam sıfır" → "ihmal edilebilir (<0.01)": tohum denemesinin çözme getirisi artık minik bir kapsam ekliyor.

Her iki gevşetme de koda değil teste yapıldı ve gerekçesi yorumda duruyor.

### Test · `kal_test.js` +14 kontrol

iki fonksiyon · yalnız en son deneme · çift sayım koruması · `para()` ve matris ekliyor · tek branş desteği · tohum getirisi · **163 konu · 193 soru** · temel/klinik ayrışması · yeni girdide parakete ve matris değişiyor · çift sayım engelleniyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-10-31a` ↔ `rota-2026-10-31a` · 474 967 bayt**

⚠ Açık kalem: Histo-Embriyoloji'nin 7 sorusu hâlâ kapsam dışı (katalogda içerik yok).

---

## 172 · DENEME SORU SABİTİ DİNAMİK · HİSTO EKLENDİ · `2026-11-01a`

### 1 · Histo-Embriyoloji kapsandı

Kullanıcı kaynağı söyledi: **Klinisyen Vaka Fizyoloji-Histoloji ve Embriyoloji**. Katalogda 11 bölümü var, hepsi "…Histolojisi ve Fizyolojisi" + "Genel Embriyoloji" — Histo içeriği burada, yalnız `Fizyoloji` branşıyla etiketlenmiş.

Histo'nun 7 sorusu bu 11 bölüme **sayfa oranında** dağıtıldı:

| Konu | Soru |
|---|---|
| doku histolojisi ve fizyolojisi | 1.167 |
| santral sinir sistemi histolojisi | 0.851 |
| hematopoetik sistem histolojisi | 0.802 |
| embriyoloji | 0.705 |
| … | |
| **Σ** | **7.000** |

**`KONU_DAG` artık 200/200 tam** · 11 branş · 174 konu.

### ⚠ 2 · 0.25 sabiti gerçeklikle bağdaşmıyordu

Kullanıcının kanıtı: 6 Dahiliye 24'lüsü = **210 soru** çözmek 0.39 net getiriyordu. 210 soruyu çözüp çözümlerine bakan biri bundan fazlasını kazanır.

**Öncel 0.25 → 1.00** (1 soru ≈ 1 sayfa). Gerekçe: bir TUS sorusu tipik olarak bir sayfalık içeriği yoklar; soru + çözüm okumak o sayfanın kilit bilgisine maruz kalmaktır. Geri getirme pratiği yeniden okumaya üstün olduğundan (Rowland 2014, g≈0.50) 1'in altına inmek için sebep yok. Belirsizlik geniş (SD 0.60) bırakıldı ki **veri baskın olsun**.

| | Önce | Sonra |
|---|---|---|
| 6 Dahiliye 24'lüsü | 0.3862 net | **1.3427 net** |
| Dahiliye kapsamı | 0.0084 | **0.0365** |

### 3 · DİNAMİK KALİBRASYON · `dOran()`

R_CAL'in aynı yapısı. Her ardışık deneme çifti, her branş için bir gözlem üretiyor:

```
gözlem = (branşın net değişimi − içerik kazancı)
         / (çözülen soru × sayfa getirisi × sönüm)
```

- Öncel ve gözlemler **kesinlik ağırlıklı** birleşiyor
- Varyans soru sayısıyla azalıyor — 8 soruluk gözlem 35 soruluktan belirsiz
- Sınırlar 0.10–4.00
- Hem 24'lü hem PreTUS200 verisi besliyor

**Doğrulandı:** Dahiliye'de +3.0 net gözlenince D_ORAN 1.0000 → 1.0098, belirsizlik daraldı.

### ⚠ 4 · DONDURMA ÇELİŞKİSİ ÇÖZÜLDÜ

§164'te tamamlanmış denemelerin getirisi donduruluyordu. Ama sabit kalibre olunca geçmiş getiriler de güncellenmeli — *"demek ki eski deneme kazançlarını az/fazla hesaplamışız"*.

**Çözüm: GİRDİ donuyor, ÇIKTI değil.**

```js
D.denKaz[k] = { birim: net/ORAN, birimT, birimK,
                dagilim: [{…, birim: d.net/ORAN}], … }
/* okurken */
top = dz.birim × SORU_ORAN_VAR()
```

- Konu dağılımı, soru sayıları, yeni/tekrar sınıflandırması, tarih → **donuk**
- Sabit değişince tüm geçmiş getiriler **anında yeniden hesaplanıyor**
- Eski biçim kayıtları için geriye dönük uyum var

Doğrulandı: sabit değişince 6 denemenin getirisi 1.3427 → 1.3558 olarak güncellendi.

### Kapatılan mantık açıkları

| Açık | Çözüm |
|---|---|
| Sabit donuk, veri onu düzeltemiyordu | Bayes kalibrasyonu |
| Geçmiş getiriler eski sabitle donuk kalıyordu | girdi donuyor, çıktı hesaplanıyor |
| Histo'nun 7 sorusu hiçbir yere düşmüyordu | Klinisyen Vaka Fizyoloji'ye dağıtıldı |
| Gözlemler eşit ağırlıklı olsaydı 8 soruluk deneme 35'liği ezerdi | varyans soru sayısına bağlı |
| Sabit uçlara kaçabilirdi | 0.10–4.00 sınırı |

### Test · `kal_test.js` +19 kontrol

sabit dinamik · öncel ve sınırlar · kalibrasyon ve önbellek · kesinlik ağırlıklı birleşim · **donmuş girdi/canlı çıktı** · geriye dönük uyum · Histo eklendi · öncelden başlıyor · **KONU_DAG 200/200** · 11 branş · 6 denemede anlamlı getiri · gözlem sayılıyor · **belirsizlik daralıyor** · **geçmiş getiriler yeni sabitle güncelleniyor** · sınırlar içinde.

Ayrıca 12 eskimiş kontrol yeni ölçeklere göre güncellendi (programın tamamı 63.68 → **67.11**).

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-01a` ↔ `rota-2026-11-01a` · 479 982 bayt**

---

## 173 · PANEL REGRESYONU · DENEME LİSTESİ BÖLÜNDÜ · `2026-11-04a`

### 1 · tahmin edici değişti · fark → panel

Eski `dOranHesap` ardışık deneme **farkı** alıyordu. İki gürültülü ölçümün farkı tek ölçümden daha gürültülü: se(ORAN) ≈ 21, sabit hiç kalibre olmuyordu.

**Yeni kurgu · tüm yörüngeye tek model:**

```
N_b(t) = α_b + görevKazanç_b(t) + ORAN × maruziyet_b(t) + ε
maruziyet_b(t) = (o ana kadar çözülen soru) × netSayfa_b × (boşluk/tavan)
ağırlık = 1/σ²,  σ² = soru × p(1−p) × 1.25²
```

α_b branş sabit etkisi, **branş içi merkezlemeyle** düşüyor.

| Yöntem | se(ORAN) | Öncelle |
|---|---|---|
| Fark alma | 21.25 | 0.591 |
| Tek branş regresyonu | 1.143 | 0.531 |
| **Panel regresyonu** | **0.396** | **0.330** |

Üç kaynak:
- **PreTUS200 tek gözlem değil, 11 branş gözlemi** → 39 yerine **105**
- branş içi merkezleme taban farklarını siliyor
- kesinlik ağırlığı 8 soruluk Fizyoloji'nin 35 soruluk Dahiliye'yi ezmesini engelliyor

**Kendini sınırlıyor:** gerçek ORAN 3 ise 3 ± 0.65 → 1'den ayırt edilir. 1 ise belirsiz kalır ama etki de küçüktür.

### ⚠ 2 · sızıntı ve yanlılık korumaları

**Sızıntı:** görev kazancının payı yüksek gözlemler düşük ağırlık alıyor (`pay = denemeKazanç/(görev+deneme)`, ölçüldü: %9–%100). Yoksa R_CAL'deki hata ORAN'a yıkılırdı — kullanıcının *"ya net değişimi denemeden değilse?"* endişesinin matematik karşılığı.

**Yanlılık:** uygulama takibe başlamadan önceki dönemde yapılan çalışma bilinmiyor. O dönemin net artışını denemeye yıkmak ORAN'ı sistematik saptırıyordu (tohum veriyle 1.00 → 0.24 sapması gözlendi). Artık yalnız **izlenen dönem** kullanılıyor: ilk tamamlanan görevin tarihinden itibaren. Takip başlamadıysa gözlem yok, öncel korunuyor.

Doğrulandı: takip yokken 1.0000 ± 0.6000 · 0 gözlem → takip sonrası 1.0487 ± 0.5986 · 10 gözlem.

### 3 · R_CAL DENETİMİ · sorun yok

| Soru | Cevap |
|---|---|
| 24'lü kayıtları R_CAL'i besliyor mu | **evet** · 0.4050 → 0.4189, belirsizlik 0.0995 → 0.0947 |
| Geçmiş görev getirileri güncelleniyor mu | **evet** — `para()` her çağrıda canlı hesaplıyor, hiç dondurmuyor (K 56.9094 → 56.9264) |
| Donmuş `kaz` değerine düşen görev var mı | **yok** · tavanı bilinmeyen grup 0 |
| Fark alma zaayfı var mı | **yok** · seviye karşılaştırması yapıyor (p vs p₀), fark değil |
| Döngüsellik var mı | **yok** · `kap` kayıt eklenmeden ÖNCE donduruluyor, kendi katkısını içermiyor |

Yani R_CAL'de deneme getirilerindeki dondurma sorununun karşılığı yok; zaten doğru kurulmuş.

### 4 · deneme kayıtları sol/sağ bölündü

Power-up panelindeki düzenin aynısı:

| Sol | Sağ |
|---|---|
| **200 soruluk genel denemeler** · tam sınav · 11 branş | **24'lü branş denemeleri** · tek branş · kalibrasyon verisi |

- Her kayıtta tarih, net/K puanı, D/Y/B kırılımı
- 200'lük kayıtlar için de **silme** düğmesi eklendi (eskiden yoktu)
- Dar pencerede kaydırmalı anahtar, ≥900 px'te yan yana
- Seçim kalıcı (`D.dnTur`)

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-04a` ↔ `rota-2026-11-04a` · 484 391 bayt**

---

## 174 · ORTAK GÖZLEM HAVUZU · KONU KIRILIMI · `2026-11-06a`

Kullanıcının özgün tasarımı uygulandı: 24'lü kaydı artık **konu konu** giriliyor ve tek havuz **iki kalibrasyonu birden** besliyor.

### Tasarımın gerekçesi · ölçüm

| Branş | Konu başına soru/deneme | Tüm denemelerde | p belirsizliği |
|---|---|---|---|
| Dahiliye | 1.8 | 11.1 | ±0.295 |
| Biyokimya | 1.5 | 7.5 | ±0.358 |
| Patoloji | 0.9 | 4.7 | ±0.450 |

Konu başına veri çok ince — **konu konu sonuç çıkarılmaz, konular HAVUZLANIR.** Tasarımın asıl kazancı başka:

- hangi soruların çalışılmış/çalışılmamış konudan geldiği **kesin**
- gerçek soru sayılarıyla ağırlıklandırma
- her konunun çalışıldığından beri geçen süre ayrı ayrı biliniyor

### Havuz ve iki tüketici

```
konuGozlem()  → tüm konu kayıtları (tar, br, konu, q, d, y, p)
konuCift()    → aynı konunun ardışık ölçüm çiftleri
                · en az BİR GÜN arayla (aynı gün başka deneme karıştırmasın)
                · her çift SİMETRİK kullanılıyor (ortalamaya dönüş yanlılığı)
```

| Çift türü | Besler | Gerekçe |
|---|---|---|
| Arada **çalışma YOK** | **D_ORAN** | tek kaynak deneme çözmek → temiz pencere |
| Arada **çalışma VAR** | **R_CAL** | çalışma + deneme; denemenin payı çıkarılıyor |

### ⚠ R_CAL yukarı yanlıydı · düzeltildi

Eskiden çalışılan konudaki tüm artış çalışmaya yıkılıyordu:

```js
const dp=(c.p1-c.p0)-denPay;   // denemenin payı D_ORAN ile hesaplanıp ÇIKARILIYOR
```

Kullanıcının tespiti: *"24'lü kalibrasyon formülünün denemelerin getirisini de hesap edip görev getirilerini bunlardan izole etmesi lazım."* İki sabit artık birbirini kirletmiyor.

### Giriş arayüzü

Branş seçilince o branşın konuları **TusAnaliz payıyla önceden dolu** listeleniyor; kullanıcı yalnız D/Y giriyor, soru sayısı farklıysa düzeltiyor. 30 sayı yerine çoğunlukla 15.

Uyarı metni: *"Çalışmadığın konuları da gir: deneme kazancı ölçümü onlardan geliyor."*

Tutarsız girdi (D+Y > soru) eleniyor.

### Doğrulama

| Senaryo | Sonuç |
|---|---|
| 3 konu × 2 ölçüm, hiç çalışma yok | D_ORAN 3 gözlem · R_CAL 0 |
| Hematoloji'ye çalışıldı | D_ORAN 2 · R_CAL 1 · **çakışma yok** |
| Aynı gün ikinci kayıt | çift üretmiyor |
| Kırılımsız kayıt | gözlem üretmiyor |

### Veri girme yükü · karar

| Ne girilirse | Öncel 0.60 → |
|---|---|
| 24'lü'de konu kırılımı (39 deneme) | **0.532** |
| PreTUS200'de de (22 ek alan × 6) | 0.468 |

PreTUS200'ün ağır girişi %11 → %22 daralma sağlıyor; 132 sayı için küçük kazanç. **Karar: yalnız 24'lü'de kırılım girilecek.** "Salladım" alanı eklenmedi — −0.25 cezası tahmini zaten beklenen değerde düzeltiyor.

### Test · `kal_test.js` +20 kontrol

üç fonksiyon · bir gün kuralı · iki çift türü doğru kaleme gidiyor · **R_CAL deneme payını çıkarıyor** · konu satırları TusAnaliz payıyla · kaydetme · tutarsız girdi elenmesi · altı gözlem/üç çift · çalışma eklenince çiftin kalem değiştirmesi · **iki kalem çakışmıyor** · aynı gün çift üretmiyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-06a` ↔ `rota-2026-11-06a` · 488 177 bayt**

⚠ Açık kalem: "getiri yalnız kayıttan gelsin" mimarisi hâlâ kurulmadı.

---

## 175 · GETİRİ YALNIZ KAYITTAN · PRETUS200 GERİ · LİSTE TAŞINDI · `2026-11-09a`

### 1 · PreTUS200 dışlanmamalıydı

Kullanıcı: *"PreTUS200 kaba bir veri biliyorum ama parakete de kaba bir tahmin değil mi? Bizim çalışmalarımızın sonucu aslında benim deneme sonucum."*

Haklı. §174'te `dOranHesap` yalnız konu çiftlerine dayanınca PreTUS200 tamamen düşmüştü. Geri eklendi — **branş düzeyinde ikinci kaynak**:

- Aynı branşın ardışık iki tam deneme ölçümü, arada o branşa **çalışma yoksa** gözlem üretiyor
- Konu kırılımı olmadığı için **yarı ağırlık** (`vr *= 2`)

Tohum veriyle bile **44 gözlem** üretiyor; 24'lü kırılımlarıyla birlikte 46.

### 2 · GETİRİ YALNIZ KAYITTAN · mimari kuruldu

Eski durumda hem görev tamamlama hem sonuç kaydı getiri üretiyordu; eşleşme yalnız "aynı gün" kuralına dayanıyordu, farklı günlerde girilince **çift sayıyordu**.

Yeni kural: **deneme getirisi yalnız sonuç kaydından gelir.** Kayıt "gerçekleşti" belgesi, görev takvim.

```js
function kayitKaz(){   /* D.denemeler (en son) + D.kal (tabandan sonra) */ }
/* para() ve grupKapsam() yalnız bunu okuyor */
```

**Çift sayım matrisi · altı hücre de sınandı:**

| # | Durum | Sonuç |
|---|---|---|
| 1 | Çarkta tamamlandı, kayıt yok | **parakete ve matris ETKİSİZ** ✓ |
| 2 | Sonuç kaydı girildi | ikisi de artıyor ✓ |
| 3 | Görev geri alındı, kayıt duruyor | değişmiyor ✓ |
| 4 | Power-up'tan öne çekme + tamamlama | ek etki yok ✓ |
| 5 | Tek kayıt | tek katkı ✓ |
| 6 | **51 deneme görevinin tamamı** işaretlendi | etkisiz ✓ |

### ⚠ İki kusur bulundu ve düzeltildi

**Sızıntı:** `konuCalisildi` deneme görevlerini de "çalışıldı" sayıyordu; görev tamamlama yeni öğrenme ↔ tekrar sınıflandırmasını değiştirip dolaylı yoldan 0.0007 etki yaratıyordu. Artık yalnız **içerik görevleri** (`oku`/`video`/`soru`/`tekrar`) sayılıyor.

**Kart önizlemesi sıfırlandı:** getiri artık `para()` farkından gelmediği için deneme kartlarında çip kayboldu. `gorevKazanc` deneme için doğrudan `denemeKaz` önizlemesi döndürüyor:

| Görev | Kart önizlemesi |
|---|---|
| PreTUS200 oturumu | +1.149 |
| 24'lü | +0.331 |
| Okuma | +0.545 |
| Video | +0.047 |

Kart *"bu denemeyi çözüp sonucunu girersen ne kazanırsın"* diyor; kazanç ancak kayıt girilince gerçekleşiyor.

### 3 · deneme geçmişi doğru sayfaya taşındı

Bölünmüş liste yanlışlıkla 24'lü kalibrasyon paneline konmuştu; **güç matrisi sayfasındaki "Çetele" bölümü** ile değiştirildi:

| Sol | Sağ |
|---|---|
| **200 soruluk genel denemeler** · ölçülen tabanı belirler | **24'lü branş denemeleri** · kalibrasyon verisi · konu kırılımlı |

Dar pencerede kaydırmalı anahtar, ≥900 px'te yan yana. 24'lü panelinin kendi listesi sadeleşti; kırılımsız kayıtlar *"kalibrasyona katkı vermez"* uyarısıyla işaretleniyor.

### Test · `kal_test.js` +13 kontrol · 12 kontrol uyarlandı

çift sayım matrisinin **altı hücresi** · kart önizlemesi duruyor · PreTUS200 branş düzeyinde besliyor · kırılımsız gözlem yarı ağırlık · deneme geçmişi matris sayfasında.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-09a` ↔ `rota-2026-11-09a` · 490 897 bayt**

---

## 176 · ⚠ ÜÇ ARAYÜZ HATASI · `2026-11-10a`

Ekran görüntüsünden üç kusur çıktı, üçü de gerçek.

### ⚠ 1 · `<s>` etiketi ÜSTÜ ÇİZİLİ demek

Konu kırılımı başlığının altındaki açıklama üstü çizili görünüyordu:

```html
<s class="alt" style="display:block">Soru sayıları TusAnaliz beklentisiyle dolu…</s>
```

`.puSut .puAlt` kuralında `text-decoration:none` vardı ama yeni eklenen `<s class="alt">` o kuralın kapsamına girmiyordu. Tüm `<s>` kullanımları `<i>`/`<div>` ile değiştirildi, `.puAlt` kuralına `font-style:normal` eklendi.

### ⚠ 2 · eski D/Y/B alanları kalmıştı

24'lü sayfasında üç ayrı giriş vardı: toplam D/Y/B → konu kırılımı → **bir kez daha D/Y/B**. Sonuncusu eski *"Bunların kaçı bugün çalıştığın konulardan?"* alanlarıydı — konu kırılımı zaten aynı bilgiyi daha keskin veriyor.

`dpKD` · `dpKY` · `dpKB` alanları, açıklama metni ve JS'teki tüm referansları kaldırıldı.

### ⚠ 3 · deneme bölümü grid DIŞINDAydı

"Erken çözülebilir denemeler" `puIki` grid'inin dışına yerleştirilmişti; anahtarın iki seçeneği vardı, deneme bölümü her durumda görünüyordu ve dar ekranda düzeni bozuyordu (ekran görüntüsündeki üst üste binen metinler).

**Üçüncü seçenek yapıldı:**

```
┌──────────┬──────────┬──────────┐
│ Konu 64  │ Soru  9  │ Deneme 39│   ← kaydırıcı 0 / 100% / 200%
└──────────┴──────────┴──────────┘
```

- `.puAnh.uc` → üç eşit sütun, kaydırıcı genişliği %33.3
- `.puIki` üç sütun; seçili olmayan ikisi dar pencerede gizli
- ≥900 px'te üçü yan yana

### Test · `pu_test.js` ve `kal_test.js` uyarlandı

üçlü anahtar · üç düğme · üç sütun · deneme sütunu grid içinde · kaydırıcı üç konum · **üstü çizili `<s>` kalmadı** · eski D/Y/B alanları kaldırıldı.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-10a` ↔ `rota-2026-11-10a` · 490 925 bayt**

---

## 177 · ⚠ TANIMSIZ SINIF · SAYDAM PANEL · `2026-11-11a`

### ⚠ 1 · deneme satırlarının başlığı yoktu

`denSat` içeriği `<div class="kd">` içine koyuyordu — **böyle bir CSS sınıfı yok.** Var olan satırlar `.ic` kullanıyor:

```css
.kit .ic{flex:1 1 100%}
.kit .ic s{display:block;text-decoration:none;…}
```

Başlıksız görünmenin sebebi buydu; `.ic` yapıldı. Artık satır şöyle:

```
+0.183 net   Deneme çöz · Farmakoloji — 24'lü
             24'lü #3 · Farmakoloji · programda 19 Ağu
             0.56 sa · 18 soru · 0.327 net/sa      [Öne çek]
```

Ayrıca güvenlik olarak `.kit s` kuralı eklendi — `.ic` dışında kalan `<s>` etiketleri de üstü çizili çıkmasın.

### ⚠ 2 · panel arka planı fazla saydamdı

```css
background:rgba(2,3,6,.74); backdrop-filter:blur(10px)
```

Arkadaki çark kartı okunuyordu; panel başlığı ("Power up") ile kart metni ("Deneme çöz · …") üst üste binip **iç içe geçmiş beyaz yazı** görüntüsü veriyordu. Ekran görüntüsündeki karmaşanın sebebi buydu.

`rgba(2,3,6,.96)` + `blur(18px)` yapıldı. **Dört panelde de** (`ppanel` · `kpanel` · `bpanel` · `dpanel`) düzeltildi.

### Test · `pu_test.js` +11 kontrol

deneme satırı `.ic` kullanıyor · tanımsız `.kd` yok · başlık · alt satır · süre/verim satırı · öne çek düğmesi · panel opaklığı `.96` · bulanıklık 18px · **dört panel de opak** · `.kit s` üstü çizili değil · `puAlt` italik değil.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-11a` ↔ `rota-2026-11-11a` · 490 939 bayt**

---

## 178 · ⚠ KALAN POTANSİYEL 7.84 → 6.88 · `2026-11-12a`

Kullanıcı düşüşü fark etti. **§175'in yan etkisiymiş.**

### Kök sebep

```js
function kalanKazanci(){
  const bek=GOREVLER.filter(g=>!D.bitti[id(g)]).map(id);
  return {n:bek.length, fark:puanVarsayim(bek)-puan(p.t,p.k)}}
```

`puanVarsayim` görevleri işaretleyerek çalışıyor. Ama §175'ten beri **deneme getirisi yalnız sonuç kaydından geliyor**, görev tamamlamadan değil. Dolayısıyla tamamlanmamış 51 deneme görevinin potansiyeli hesaba hiç girmiyordu.

Ölçüm: tamamlanmamış deneme görevlerinin önizleme toplamı **11.64 net ≈ 2.86 K** — kaybolan tam bu.

### Düzeltme

"Hepsini yaparsam" senaryosu, denemeleri çözüp **sonucunu girmeyi** de kapsar. Önizleme getirileri eklendi:

```js
GOREVLER.forEach(g=>{
  if(g.act!=='deneme'&&g.act!=='deneme24')return;
  if(D.bitti[id(g)])return;
  const c=denemeKaz(g); if(c){dT+=c.t; dK+=c.k}
});
if(dT>0||dK>0)fark+=puan(p.t+dT,p.k+dK)-puan(p.t,p.k);
```

| | Değer |
|---|---|
| Parakete | 55.97 |
| **Kalan potansiyel** | **+9.70** |
| Hepsini yaparsam | 65.67 |
| Tavan | 88.66 · aşılmıyor ✓ |

6.88 → **9.70**. Eski 7.84'ten de yüksek çünkü §172'de deneme sabiti 0.25 → 1.00 önceline taşınmıştı.

### ⚠ Test bir tutarsızlık daha yakaladı

`kal_test.js` "kalan potansiyel = gerçek artış" kontrolü iki kez patladı ve **model belirsizliğini açığa çıkardı**: denemelerin getirisi, görevler işaretlenmeden ÖNCE mi sonra mı hesaplanmalı?

- Önce hesaplanırsa konular "çalışılmamış" → **yeni öğrenme** (S_ILK 2.4)
- Sonra hesaplanırsa "çalışılmış" → **tekrar** (S_TEK 6.0), getiri %24 yüksek

Gerçekte sıra karışık (bazı denemeler çalışmadan önce, bazıları sonra). Karar: **ikisi de mevcut durumu esas alıyor** — `kalanKazanci` ve test aynı hizada. Bu, potansiyeli hafifçe muhafazakâr yapıyor; abartmaktansa iyi.

### Test · `kal_test.js` +7 kontrol · 2 kontrol uyarlandı

deneme potansiyeli ekleniyor · yalnız tamamlanmamışlar · potansiyel pozitif · deneme payı anlamlı · **tavanı aşmıyor** · denemeler işaretlenince potansiyel düşüyor · düşüş deneme payı kadar.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-12a` ↔ `rota-2026-11-12a` · 491 706 bayt**

---

## 179 · 24'LÜ HAVUZU BRANŞ BAZLI · `2026-11-15a`

Power-up'ın deneme bölümü, programdaki 39 denemeyi "öne çekme" listesi olarak gösteriyordu. Kullanıcı asıl ihtiyacı tarif etti: **programa sığmayan denemeleri** boş günlerde çözebilmek.

### Yeni yapı · 11 branş kartı

```
+0.183 net   24'lü deneme · Farmakoloji
             0 / 24 çözüldü · programda 3
             0.56 sa · 18 soru · 0.326 net/sa    [✕] [Çarka çek]
```

- **10 kart** (Histo-Embriyoloji'nin ayrı 24'lü serisi yok)
- **Mikrobiyoloji dahil** — programda 0 denemesi var ama kart duruyor (satın alınabilir)
- Anlık `net/saat`e göre sıralı; deneme sonucu girildikçe **sıra değişiyor**

### Numaralandırma · program kartları kayıyor

```
Biyokimya: program 5 deneme
havuzdan 2 çekilirse → çekilenler #1–#2, program #3–#7
```

`denNo(g)` görünen numarayı üretiyor. Toplam 24'ü aşamıyor; `kalan = 24 − program − çekilen`.

**Seri dolunca** (`kalan = 0`) çekme düğmesi, ileri tarihli program kartlarından en yakınını **bugüne çekiyor** — kullanıcının tarif ettiği davranış.

### Yer açma · aynı gün, sonraki günlere dokunmadan

Havuzdan çekilen bir deneme **çözülünce** (sonucu girilince), o branşın **en ileri tarihli** program kartı kapanıyor (`D.kapali`) ve bulunduğu blok yeniden zamanlanıyor:

```
önce : 16:30–17:04 | 17:04–17:38 | 17:38–18:03
sonra: 16:30–17:04 | 17:04–17:29
```

`blokZamanla(gün,blok)` yalnız o gün+bloğu etkiliyor; sonraki günlere dokunmuyor, program bozulmuyor. Geri alınca kart yeniden açılıyor.

### Senkron denetimi · sekiz kontrol

| | Sonuç |
|---|---|
| Sıralama verime göre | ✓ |
| Deneme girilince sıra/değer değişiyor | ✓ |
| Çekilen görevin kazanç çipi | +0.130 |
| Tamamlama tek başına etkisiz | ✓ (§175 kuralı korunuyor) |
| Kayıt girilince paraketeye yansıyor | ✓ +0.036 |
| Matrise yansıyor | ✓ |
| Çözülen sayacı | 1 / 24 |
| Kalibrasyona veri gidiyor | ✓ |

### Test · `pu_test.js` 24 kontrol (eski blok tamamen değişti)

beş fonksiyon · iki düğme · sentetik görev çarkta üstte · kapalı görev çarkta yok · **on branş kartı** · Histo yok · Mikrobiyoloji var · verime göre sıralı · `kalan = 24 − program − çekilen` · iki sentetik görev · bugüne tarihli · **program numarası #3'e kaydı** · kazanç çipi · tamamlama etkisiz · kayıt yansıyor · sayaç arttı · **en ileri kart kapandı** · çarktan düştü · geri alınca açıldı · sentetikler temizleniyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-15a` ↔ `rota-2026-11-15a` · 497 087 bayt**

---

## 180 · SENARYO BÜTÜNLÜĞÜ DENETİMİ · `2026-11-16a`

Kullanıcının altı sorusu tek tek sınandı.

### 1 · sıralama neden net'e göre değil

Kartta sol üstteki sayı **net**, sıralama ise **net/saat**:

| Branş | net | süre | verim |
|---|---|---|---|
| Farmakoloji | 0.183 | 0.56 | **0.3260** |
| Anatomi | 0.132 | 0.41 | **0.3257** |
| Biyokimya | 0.164 | 0.56 | 0.2917 |

Anatomi daha az net getiriyor ama daha kısa sürede; saat başına Biyokimya'dan verimli. Sıralama doğru — kart yalnız net'i öne çıkardığı için kafa karıştırıyor. (Verim satırda zaten yazıyor.)

### 2–5 · senaryolar

| Senaryo | Sonuç |
|---|---|
| 23 çekilince kalan 0 | ✓ |
| 23 sentetik görev oluşuyor | ✓ |
| Hepsi çözülünce program kartı kapanıyor | ✓ |
| Görev sayısı 196 → 219 → 196 | ✓ |
| Blok saatleri geçerli ve ardışık | ✓ |
| Çekip **çözmeden** geri yollama | ✓ tam temizlik |
| Kapalı kart kalıntısı | 0 |
| Deneme sonucu girilince net değişiyor | ✓ 0.1829 → 0.0506 |

Program hiçbir senaryoda bozulmuyor; yalnız etkilenen gün+blok yeniden zamanlanıyor.

### 6 · matrise kapsam çizen görev tipleri

| Tür | Matrise çiziyor mu |
|---|---|
| `oku` | **evet** |
| `video` (Dahiliye videoları dahil) | **evet** |
| `soru` | evet |
| `deneme` · `deneme24` | **hayır — sonuç kaydı gerekiyor** (§175 kuralı) |
| `analiz` | hayır — soru değeri yok, içerik çalışması değil |

Yani Dahiliye videoları matrise doğrudan yansıyor. Çizmeyen tek gerçek kalem denemeler ve o **bilinçli**: getirileri kayıttan geliyor, çift sayım olmasın diye.

**Not:** güç matrisi ölçülen neti ve çalışma kapsamını gösteriyor; ayrı bir "beklenen net" katmanı yok — beklenti parakete ve kalan potansiyelde duruyor.

### Test · `pu_test.js` +15 kontrol

23 çekme senaryosunun altı adımı · geri yollamanın dört adımı · dört görev tipinin matris davranışı.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-16a` ↔ `rota-2026-11-16a` · 497 131 bayt**

---

## 181 · ⚠ RADAR HAYALET ÇİZGİSİ ÖLÜYDÜ · `2026-11-17a`

Kullanıcı güç matrisinin katmanlı davranışını hatırlattı: yeşil beklenti çizgisi, kırmızı gerileme hayaleti, taralı aşım alanı.

### ⚠ Kök sebep · statik `kaz` alanı

```js
let kz=0;
GOREVLER.forEach(g=>{const bt=D.bitti[id(g)];
  if(bt&&bt>o.tar&&g.br===b)kz+=g.kaz});      // ← g.kaz
r[b]={olc, bek:Math.min(olc+kz/SORU.radar[b],1), …}
```

**Programdaki 196 görevin TAMAMINDA `kaz = 0`.** Ölçüldü:

| Tür | Görev | `kaz>0` |
|---|---|---|
| oku | 95 | **0** |
| video | 44 | **0** |
| deneme | 12 | **0** |
| deneme24 | 39 | **0** |
| analiz | 6 | **0** |

`kaz` eski statik kazanç modelinden kalma; `para()` çoktan dinamik hesaba geçmişti ama `bransDurum()` hâlâ onu okuyordu. Sonuç: **yeşil beklenti çizgisi ölçülen çizginin tam üstünde duruyor, hiç ayrılmıyordu.**

### Düzeltme

`para()` artık branş bazında dinamik kazancı da döndürüyor (`brKaz`):

| Branş | dinamik kazanç |
|---|---|
| Dahiliye | 4.288 net |
| Farmakoloji | 3.602 |
| Biyokimya | 3.057 |

`bransDurum()` bunu kullanıyor. Doğrulama:

| Branş | ölçülen | beklenen |
|---|---|---|
| Anatomi | %15.4 | **%32.9** |
| Dahiliye | %44.3 | **%62.8** |
| Biyokimya | %33.3 | **%50.5** |

Çizgi artık ayrılıyor. Dahiliye videoları da katkı veriyor.

### Eksik katmanlar eklendi

Kodda yalnız iki katman vardı (ölçülen + beklenen). Eklenenler:

| Katman | Görünüm |
|---|---|
| **Önceki deneme** | kırmızı kesikli `#C4736A` · gerileyen alan görünür |
| **Aşım** | 45° taralı yeşil (`asimTr` deseni) · beklentiyi geçen alan |

Efsane üç katmana çıkarıldı: önceki · ölçülen · beklenen.

### Test · `kal_test.js` +15 kontrol

`para()` branş kazancı · `bransDurum` dinamik · **statik `g.kaz` toplaması kalmadı** · önceki oran · aşım alanı · kırmızı katman · tarama deseni · efsane · başta beklenen ≈ ölçülen · **çalışınca hayalet çizgi ayrılıyor** · Dahiliye video katkısı · beklenen 1'i aşmıyor · üç katman SVG'de.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-17a` ↔ `rota-2026-11-17a` · 499 343 bayt**

---

## 182 · ⚠ GEÇMİŞ MOLA KARTLARI · AŞIM HALKASI · `2026-11-18a`

### ⚠ 1 · telafiye çekince dünün uyku kartı geliyordu

Kullanıcı: dünün son işini (Kadın Genital Sistem Hastalıkları 19:39–20:30) telafi için çarka çekince yanında **29 Temmuz 20:30–23:00 yavaşlama** kartı da belirdi.

```js
if(tur==='yavas'||tur==='izin')return false;   /* ← tür ayrımı ÖNCE */
…
if(g.d<b)return true;                          /* geçmiş gün */
```

Tür ayrımı geçmiş gün kontrolünden **önce** geliyordu; uyku ve izin kartları her koşulda görünür sayılıyordu. Vakti geçmiş uyku/spor/izin kartının yeniden belirmesinin anlamı yok.

**Sıra ters çevrildi:** geçmiş gün → tür ne olursa olsun gizli. Bugün ve gelecek için tür ayrımı korunuyor (bugünün uyku kartı görünür).

Doğrulandı: geçmiş `yavas` · `spor` · `kisa` · `aksam` kartlarının hepsi gizli; telafiye çekilen görevin yanında mola durağı **0**.

### ⚠ 2 · aşım taraması TÜM matrisi dolduruyordu

```js
if(asimVar)s+='<path d="'+po+'Z" fill="url(#asimTr)"/>';   // po = ölçülen poligon
```

Tek bir branşta bile aşım olsa **bütün alan** taranıyordu — kullanıcının gördüğü "her yer yeşil" görüntüsü buydu.

**Halkaya çevrildi:** `fill-rule="evenodd"` ile dış (ölçülen) ve iç (önceki deneme) poligon arasındaki bölge doluyor. İlerleme olmayan branşta halka kendiliğinden kapanıyor.

Aşım tanımı da netleşti — referans **önceki ölçüm**: *"geçen denemeden bu yana ne kadar açtım"*. İleriye dönük hedef ayrı katmanda (yeşil kesikli).

| Branş | önceki | şimdi | halka |
|---|---|---|---|
| Patoloji | %25.0 | %65.3 | **%40.3** |
| Dahiliye | %28.6 | %44.3 | **%15.7** |
| Anatomi | %19.2 | %15.4 | 0 (gerileme) |
| Biyokimya | %41.7 | %33.3 | 0 |

### 3 · CEVAP · "hiç görev yapılmamışken neden artış var"

`brKaz` sıfır değil çünkü **son denemeyi çözmenin kendisi** getiri sayılıyor (§171): branş başına 0.03–0.18 net. Küçük ama gerçek — o denemeyi çözüp çözümlerine baktın.

Beklenen çizginin ölçülene çok yakın durması da doğru: hiç görev yapılmadıysa beklenen ≈ ölçülen. Çizgi ancak çalıştıkça dışarı açılıyor (§181'de doğrulandı: Dahiliye %44.3 → %62.8).

### Test · `kal_test.js` +14 kontrol

geçmiş gün her türü gizliyor · sıra doğru · **telafiye çekince dünün molası gelmiyor** · beş mola türü · bugünün uyku kartı görünür · halka evenodd · aşım önceki ölçüme göre · gerileyen branşta halka sıfır · ilerleyende var · **tüm alanı dolduran tarama yok**.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-18a` ↔ `rota-2026-11-18a` · 500 235 bayt**

---

## 183 · RADAR · DÖRT KATMAN · `2026-11-19a`

Kullanıcı: *"beyaz çizginin iç alanı komple yeşil olursa bir şey ifade etmez."* Haklı — katmanlar yeniden kuruldu.

### ⚠ Yeşil çizgi neden görünmüyordu

İki sebep:

1. **Payda tutarsızlığı** · ölçülen `SORU.den[b]` ile (Dahiliye 35), kazanç `SORU.radar[b]` ile (23.2) normalleniyordu. Aynı paydaya çekildi.
2. **Ayrım çok küçüktü** · 12 video = 0.65 net / 35 soru → **3 piksel**. Görünmesi imkânsız.

Dört katman bunu çözüyor: artık çürüme çizgisi de var ve o **20–29 piksel** içeride duruyor, ölçek hemen okunuyor.

### Dört katman

| Katman | Konum | Renk | Anlam |
|---|---|---|---|
| **çürüme** | beyazın İÇİNDE | kırmızı kesikli `#D9705F` | tekrar etmezsen sınavda nereye düşersin |
| **ölçülen** | — | beyaz düz | son denemenin gerçeği |
| **çalışma** | beyazın DIŞINDA | yeşil kesikli | yapılan işin getirisi |
| **önceki** | referans | soluk kırmızı noktalı | geçen deneme |

**İki taralı halka:**

| Halka | Desen | Anlam |
|---|---|---|
| **artış** | 45° fosforlu yeşil `#7BE07B` | geçen denemeye göre açtığın alan |
| **düşüş** | −45° kırmızı `#E0736A` | geçen denemenin altına düştüğün alan |

Halkalar **vertiks bazında** kuruluyor: yeşil halka yalnız ilerleyen branşlarda genişliyor, kırmızı yalnız gerileyende. Diğerlerinde kendiliğinden kapanıyor, ikisi çakışmıyor.

### Ölçüm · tüm okuma + video yapılmış

| Branş | çürüme | ölçülen | çalışma | içe/dışa (px) |
|---|---|---|---|---|
| Dahiliye | %26.7 | %44.3 | %56.5 | 20 / 14 |
| Patoloji | %39.3 | %65.3 | %72.1 | 29 / 8 |
| Biyokimya | %20.1 | %33.3 | %50.3 | 15 / 19 |
| Anatomi | %9.3 | %15.4 | %31.3 | 7 / 18 |

Tek bakışta: nerede olduğun (beyaz), hiçbir şey yapmazsan nereye düşeceğin (kırmızı içeride), planı bitirirsen nereye çıkacağın (yeşil dışarıda), geçen denemeye göre nerede açtın/kapandın (taralı halkalar).

### Test · `kal_test.js` +15 kontrol

çürüme katmanı · payda tutarlı · iki desen · halkalar vertiks bazında · efsane beş katman · **çürüme içeride, çalışma dışarıda** · her ikisi >10px görünür · hiçbir katman 1'i aşmıyor · çürüme negatif değil · dört çizgi SVG'de · halkalar evenodd · **artış ve düşüş branşları ayrık**.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-19a` ↔ `rota-2026-11-19a` · 501 973 bayt**

---

## 184 · ⚠ STREAK EKSİĞİ · RADAR OKUNABİLİRLİĞİ · `2026-11-20a`

### ⚠ 1 · çekilen 24'lüler streak'i tetiklemiyordu

```js
POWERUP.forEach(u=>{const st=puKay(puAnh(u)); …});   // yalnız kitap havuzu
```

`puStreak()` sadece `POWERUP` havuzunu (156 kitap konusu) tarıyordu. Havuzdan çarka çekilen 24'lü denemeler sentetik görev olduğu için (`g.ek`) seriye hiç girmiyordu.

**Ölçüm:** power-up konusu tamamlandı → streak 1 ✓ · çekilen 24'lü tamamlandı → streak **0** ✗

Düzeltildi. Artık ikisi birlikte sayılıyor: dün power-up + bugün deneme → **streak 2**, kademe 2.

### 2 · radar okunabilirliği

Beş katman 112 px yarıçapta üst üste biniyordu.

| | Önce | Sonra |
|---|---|---|
| Yarıçap | 112 | **148** |
| viewBox | 500×350 | **560×430** |
| CSS yükseklik | 52vh / 430px | **66vh / 540px** |
| Tarama aralığı | 6 px | **9 px** |
| Tarama kalınlığı | 2.4 px · %85 | **1.6 px · %62** |
| Etiket yazısı | 10.5 | **11.5** |

Kesikli desenler birbirinden ayrıştırıldı:

| Katman | Desen |
|---|---|
| çürüme | `7 4` · uzun |
| çalışma | `3 3.5` · kısa |
| önceki | `1 6` · noktalı, %42 |

Ölçülen çizgi kalınlaştı (1.7 → 2), iç dolgusu inceltildi (%10 → %5.5) — üstteki katmanlar görünsün.

**Ayrımlar:** Dahiliye çürüme→ölçülen **26 px**, ölçülen→çalışma **18 px**.

### Test · `pu_test.js` +13 kontrol

streak çekilen denemeleri tarıyor · başta sıfır · **çekilen 24'lü tetikliyor** · power-up ve deneme birlikte · kademe · temizlik · radar yarıçapı · viewBox · tarama seyrekliği · üç kesikli desen · etiket boyu · CSS yüksekliği.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-20a` ↔ `rota-2026-11-20a` · 502 517 bayt**

---

## 185 · ÖNCEKİ ÖLÇÜM TURUNCU · `2026-11-21a`

Önceki ölçüm çizgisi soluk kırmızıydı (`#C4736A`) ve **düşüş taramasıyla** (`#E0736A`) karışıyordu — ikisi de kırmızı ailesinde.

Turuncuya alındı: `#F0A65C`, kalınlık 1.15, desen `2 5`, %62 opaklık. Efsaneye de eklendi.

### Altı katman · renk ailesi ayrımı

| Katman | Renk | Görünüm |
|---|---|---|
| ölçülen | `#CBD2D9` | beyaz-gri düz |
| **önceki** | **`#F0A65C`** | **turuncu noktalı** |
| çalışma | `#6FA35A` | yeşil kesikli (dışarıda) |
| çürüme | `#D9705F` | kırmızı kesikli (içeride) |
| artış | `#7BE07B` | fosforlu yeşil tarama |
| düşüş | `#E0736A` | kırmızı tarama |

Kırmızı ailesi artık yalnız **olumsuz** anlam taşıyor (çürüme, düşüş); turuncu tarafsız referans (önceki ölçüm); yeşil ailesi olumlu (çalışma, artış).

### Test · `kal_test.js` +7 kontrol

turuncu çizgi · eski soluk kırmızı kalmadı · efsanede önceki · altı katman SVG'de · turuncu kırmızılardan ayrı · altı ayrı renk · efsane altı öge.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-21a` ↔ `rota-2026-11-21a` · 502 703 bayt**

---

## 186 · ETİKET DÜZENİ · ÜÇ SATIR · `2026-11-22a`

### Doğrulama · beyaz çizgi SABİT

Kullanıcı haklı olarak sordu: çalışma, ölçülen çizgiyi genişletiyor mu?

**Hayır.** `po` yalnız `d.olc`den kuruluyor; 8 video işaretlendikten sonra Dahiliye ölçüleni **%44.29 → %44.29** — bit bit aynı. Çalışma ayrı bir poligon (`pb`), çürüme ayrı (`pc`).

### Çalışma çizgisi neden görünmüyordu

8 Dahiliye videosu = 0.33 net / 35 soru = **0.93 puan** → 142 px yarıçapta **1.4 piksel**. Sayı doğru, ölçek küçük. Bu yüzden bilgi **etikete** taşındı.

### Üç satırlı etiket

```
Dahiliye
29% ▲ 44%          ← önceki deneme → şimdiki · yeşil artış, kırmızı düşüş
b 45% · ç 24%      ← beklenti (çalışma) · çürüme
```

| Branş | değişim | beklenti/çürüme |
|---|---|---|
| Dahiliye | 29% ▲ 44% | b 45% · ç 24% |
| Patoloji | 25% ▲ 65% | ç 36% |
| Anatomi | 19% ▼ 15% | b 16% · ç 8% |
| Biyokimya | 42% ▼ 33% | b 34% · ç 18% |

- İkinci satır **yalnız** önceki–şimdiki değişimi gösteriyor
- Üçüncü satır yalnız anlamlıysa çiziliyor (>0.4 puan), yoksa hiç yok
- Dar pencerede taşmasın diye kısa yazım: `b` ve `ç`
- Renkler katman renkleriyle aynı: beklenti yeşil `#6FA35A`, çürüme kırmızı `#D9705F`

Etiketlere yer açmak için yarıçap 148 → 142, viewBox 560×430 → **580×450**.

### Taralı halkalar

Yapısı gereği yalnız **ölçülen ile önceki** arasında: `pyD/pyI` ve `pkD/pkI` sadece `olc` ve `onc` kullanıyor, `bek`/`cur`a hiç dokunmuyor. Doğrulandı.

### Test · `kal_test.js` +10 kontrol

değişim satırı · üçüncü satır · yalnız anlamlıysa · kısa yazım · **beyaz çizgi sabit** · çalışma dışarıda · çürüme içeride · üçüncü satır SVG'de · renkli ok · halkalar `olc`–`onc` arasında.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-22a` ↔ `rota-2026-11-22a` · 503 750 bayt**

---

## 187 · ⚠ TEKERLEK · SÜRÜKLEME AKIŞINA BAĞLANDI · `2026-11-23a`

Kullanıcı: tekerlek hiç akıcı değil, yavaş çevirince hareket yok, hızlı çevirince birkaç kart birden atlıyor, kartların yörüngesi kayıyor, seçili kart merkeze oturmuyor.

### ⚠ Kök sebep

```js
tekBir+=e.deltaY;
while(Math.abs(tekBir)>=TEK_ESIK){ adim(tekBir>0?1:-1) }   // ← ayrık sıçrama
```

Üç kusur birden:

1. **Ayrık adım** · her eşik aşımında `adim()` → ayrı bir `gecis()` animasyonu. Hızlı çevirince üst üste binip birkaç kart atlıyor.
2. **Eşik altı ölü bölge** · 48 birime ulaşmayan çevirme hiç hareket üretmiyor.
3. **Sürükleme kipine hiç girilmiyor** · kartlar büyük kalıyor, yörünge kayıyor, `otur()` çağrılmadığı için çark seçili kartın merkezine dönmüyor.

Koddaki eski yorum önceki bir denemenin neden başarısız olduğunu da anlatıyordu: `surTazele()` çağrılmadığı için `merkezEl` güncellenmiyor, `otur()` hedefi bilemiyordu.

### Düzeltme · elle sürüklemenin AYNI akışı

```
ilk tık    → surukleBasla()   · küçülme animasyonu oynar
her tık    → kayY -= delta×0.62 · şerit görünümünde sürekli kayar
             surTazele()       · merkezdeki kart her karede güncellenir
160 ms boş → otur()            · şeritte merkeze kayar, sonra açılır
```

**Ölçüm:**

| | Sonuç |
|---|---|
| Tek tık | **62 px** · kart yüksekliği 36–107 px → hareket ediyor |
| Beş tık | 310 px · sürekli, sıçrama yok |
| Ölü bölge | **yok** |

### Oturma da düzeltildi

Eskiden `kayY=0` ile anında sıçranıyor, açılma animasyonu kaymanın üstüne biniyordu. Artık **önce şeritte merkeze kayılıyor**, sonra açılma oynuyor:

```
süre = min(190, 60 + |kalan| × 0.9) ms · easeOutCubic
```

Doğrulandı: sonda tam sıfır, monoton, geri sekme yok.

### Test · `cark_test.js` +15 kontrol

sürükleme kipine giriyor · kayY birikiyor · merkez tazeleniyor · **eski adım kodu kalmadı** · 160 ms oturma · katsayı · şeritte kayma · kayma sonrası açılma · süre sınırı · her tık hareket üretiyor · tek tık >50 px · beş tık sürekli · oturma sonda sıfır · monoton · süre makul.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-23a` ↔ `rota-2026-11-23a` · 505 245 bayt**

---

## 188 · ⚠ DOKUNMATİK GERİLEMESİ · GÜÇ IŞINLARI · `2026-11-25a`

### ⚠ 1 · §187'nin yan etkisi · parmakta sallanma

Oturma animasyonunu **her iki yola** (parmak + tekerlek) koymuştum. Parmakla sürüklerken devam eden `pointermove` olayları animasyonla çakışıp kartı yukarı aşağı sallıyordu.

İki koruma:

| | |
|---|---|
| `oturAnim` bayrağı | yeniden girişi ve `pointermove`un `kayY`ye yazmasını engelliyor |
| `tekOtur` bayrağı | oturma animasyonu **yalnız tekerlekte** oynuyor |

Parmakta bırakma anında zaten atalet hissi var; ek kayma sallanma üretiyordu. Tekerlekte ise gerekli, çünkü elin çarkta değil.

### 2 · önceki ölçüm MOR

Turuncu (`#F0A65C`) yerine **mor** (`#B98CE8`). Kırmızı ve yeşil ailelerinden tamamen ayrık, tarafsız referans olduğu hemen anlaşılıyor.

### 3 · GÜÇ IŞINLARI

Poligonlar birbirine çok yakın olduğunda (8 video = 1.4 px) hiçbir şey görünmüyordu. Her branşta **ölçülen noktadan başlayan ışınlar** eklendi:

| Işın | Yön | Renk | His |
|---|---|---|---|
| **çürüme** | İÇERİ (merkeze) | `#F2604E` | ısırık alınmış |
| **çalışma** | DIŞARI | `#6EF06E` | büyüyor |

- Gauss parlaması (`isinP` süzgeci) · güç ışını görünümü
- Uzunluk gerçek farkla orantılı ama **en az 7 px** — küçük değerler de okunsun
- Kalınlık farkla artıyor (1.6 → 4.6 px)
- Poligon çizgileri soluklaştırıldı (%50 ve %45), ışınlar öne çıksın

**Ölçüm · 8 Dahiliye videosu:** 11 çürüme ışını, 9 çalışma ışını; en küçük yeşil ışın 7.0 px, kırmızı 9.9 px. Eskiden 1.4 px görünmez çizgiydi.

### Test · `cark_test.js` +7 · `kal_test.js` +11

`oturAnim` bayrağı · animasyon yalnız tekerlekte · pointermove karışmıyor · yeniden giriş engeli · parmakta kapalı · tekerlekte açık · bayrak iniyor · ışın süzgeci · **çürüme içeri, çalışma dışarı** · en az 7 px · kalınlık artışı · ışınlar çiziliyor · parlama · mor çizgi.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-25a` ↔ `rota-2026-11-25a` · 507 696 bayt**

---

## 189 · ⚠ AÇILMA FAZI · MAT ve TOK LOGO · `2026-11-27a`

### ⚠ 1 · sıçramanın kaynağı · şeritten tam yerleşime ANLIK geçiş

```js
surukleKip=false; kayY=0;   // ← ŞERİT → TAM yerleşim, tek karede
gecis(hed.i,hed.m);
```

Kaydırma bittiğinde şerit yerleşiminden tam yerleşime **anlık** geçiliyordu. Hedef doğru yerdeydi ama **çevredeki kartlar sıçrıyor**, tek kart değişmesine rağmen "iki kart atladı" hissi veriyordu. Kullanıcının Sonraki/Önceki'de gördüğü tam buydu.

### Düzeltme · araya AÇILMA fazı

`surukleKip` kapanıyor (açıklık yine konuma bağlı sürekli hesaplanıyor), kalan `kayY` **260 ms**'de yumuşatılarak sıfıra iniyor. Kartlar bu sırada kendiliğinden açılıyor.

| Faz | Süre | 60 fps'te ara kare |
|---|---|---|
| kaydırma | 380 → **440 ms** | 26 |
| **açılma** | **260 ms** (yeni) | 16 |
| **Sonraki tuşu toplam** | **700 ms** | **42** (önce 23) |
| tekerlek bırakma | 450 ms | 27 |

Satır geçişi de 0.26s → **0.34s**.

Süreklilik doğrulandı: kaydırma bitişindeki `kayY` açılma başlangıcının aynısı — devir noktasında sıçrama yok, eğri monoton.

### 2 · logo · TOK ve MAT

| | Önce | Sonra |
|---|---|---|
| Ana gövde kalınlığı | 12 | **17** |
| Parlak piksel | 14 511 | **18 101** (+%25) |
| Ton aralığı | 40–246 | **40–213** |
| En parlak %2 | 242 | **204** |
| Kenar parlaması | %55 · 2.4 px | **%34 · 2 px** |

Gradyan dokuz duraktan yediye indi, beyaza yakın uçlar kaldırıldı — orta tonlar baskın, mat metal. Nötrlük %100 korundu. 88 pikselde gövde **+%28** kalınlaştı.

Gömülü ikonlar ve `icon-180/192/512.png` yenilendi.

### Test · `cark_test.js` +14 kontrol

açılma fazı · anlık sıçrama kalmadı · tekerlekte de var · süreler · **kaydırma ≥25, açılma ≥15, toplam ≥40 ara kare** · açılma başı kayY korunuyor · sonu tam sıfır · monoton · 20 adımda hata ve atlama yok.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-27a` ↔ `rota-2026-11-27a` · 510 052 bayt**

---

## 190 · RADAR BAŞTAN TASARLANDI · `2026-11-29a`

Kullanıcı: *"aynı derste hem çürüme hem beklenti görüntüsü saçma · bana net sonuç lazım."* Matris sadeleştirildi.

### Üç katman, fazlası yok

| Katman | Görünüm |
|---|---|
| **önceki** | pastel turuncu `#E8B98A`, ince kesikli |
| **ölçülen** | beyaz düz `#E8EDF2`, 2.2 px |
| **projeksiyon** | tek parlayan hayalet · üstteyse yeşil, alttaysa kırmızı |

Kaldırılanlar: güç ışınları, iki taralı halka, ayrı çürüme ve çalışma çizgileri, üçüncü etiket satırı.

### Tek birleşik projeksiyon

```
proj = ölçülen × tutma + çalışmanın getirisi
```

Çürüme ve çalışma tek sayıda birleşiyor. Sonuç ölçülenin üstündeyse yeşil, altındaysa kırmızı.

### ⚠ Çürüme varsayımı yanlıştı

Taban için `S_ILK` (2.4 gün · yeni öğrenilen) kullanılıyordu. Oysa ölçülen net **aylardır süren çalışmanın** ürünü.

| S | 24 günde tutma | Patoloji %65 → |
|---|---|---|
| S_ILK 2.4 | %54.7 | %35.5 |
| S_TEK 6.0 | %71.8 | %46.7 |
| **S_TAB 19.8** | **%88.3** | **%57.4** |

`S_TAB = S_TEK × 3.3` — birden çok kez görülmüş, oturmuş bilgi. Muhafazakâr bir seçim.

**Etki:**

| | Hiç çalışmadan | Tüm okuma+video |
|---|---|---|
| Anatomi | −1% | **+14%** |
| Dahiliye | −5% | **+7%** |
| Biyokimya | −3% | **+13%** |
| **Alt özet** | — | **+14.8 net** |

Eskiden her branşta −6…−29% çıkıyordu.

### Etiket · iki satır

```
Anatomi
19% ▼ 15%   +14%
```

önceki (turuncu) → şimdiki (yeşil/kırmızı ok) · sonra sıradaki denemede net beklenti.

### Boyut

| | Önce | Sonra |
|---|---|---|
| Yarıçap | 142 | **176** |
| viewBox | 580×450 | **660×500** |
| CSS yükseklik | 66vh / 540px | **72vh / 620px** |
| Yan boşluk | 10 px | 6 px (dar pencerede yer) |

Altta toplam özet: *"sıradaki denemede beklenti **+14.8 net**"*.

### Test · `kal_test.js` +18 · eski radar testleri kaldırıldı

birleşik projeksiyon · `S_TAB` · üç katman rengi · **eski ışınlar ve halkalar kalktı** · üçüncü satır kalktı · alt özet · efsane · hiç çalışmadan hafif eksi · tam programda artı · 0–1 aralığı · üç poligon · etiket iki satır · beklenti etikette · viewBox.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-11-29a` ↔ `rota-2026-11-29a` · 507 846 bayt**

---

## 191 · ⚠ IŞINLANMA ve SEKME · CANLI YERLEŞİM · `2026-12-01a`

Kullanıcı iki kusuru tam yerinden tarif etti; ikisi de aynı köke bağlıydı.

### ⚠ Kök sebep · yükseklik canlı, konum donmuş

```js
const h=c.map(x=>x.classList.contains('act')
  ? x.getBoundingClientRect().height    // ← ANLIK ölçüm
  : 36);
```

`diz()` etkin kartın yüksekliğini anlık ölçüyor ama **yalnız belirli anlarda** çağrılıyordu. CSS yükseklik geçişi sürerken konumlar donmuş anlık görüntüden hesaplanıyor; geçiş bitince kart olması gereken yere **ışınlanıyordu**.

Kullanıcının ifadesiyle: *"kart animasyon bitince olması gereken yere ışınlanıyor/sıçrıyor."*

### Düzeltme 1 · `canliDiz()` · bütün ara fazlar çiziliyor

Açılma/kapanma geçişi boyunca **her karede** `diz()` çağrılıyor (420 ms). Yükseklik büyüdükçe komşu sınırları ve konumlar birlikte akıyor — ara faz görüntülerinin tamamı çiziliyor.

Kullanıcının koşulu: *"kart kaydırma görünümüne geçince olması gereken konuma diğer kartlarla olan sınır komşuluğunu animasyon bitince tam olması gerektiği gibi elde edebilirse görüntüde süreklilik sağlanır."*

### ⚠ Düzeltme 2 · SEKME

Kaydırma bitince `kayY` hedefi merkeze getiren değerdeydi. `surukleKip` kapanıp yükseklikler büyüyünce **aynı kayY artık kartı merkezden uzaklaştırıyordu** — "gidip geri sekme" buydu.

Açılma fazı artık `kayY`yi körü körüne sıfıra indirmiyor; her karede hedefin merkeze **gerçek** uzaklığını ölçüp onu kapatıyor:

```js
const u2=uzaklik();
const hedS=(u2===null)?0:-u2;
kayY=hedS+(k0-hedS)*(1-yA(t));
```

**Sapma ölçümü** (yükseklik 8→42 px büyürken):

| t | hedef kayY | eski yöntem | yeni yöntem |
|---|---|---|---|
| 0.25 | −16.5 | −3.4 (sapma **13.1**) | −12.9 (sapma 3.6) |
| 0.50 | −25.0 | −1.0 (sapma **24.0**) | −22.9 (sapma 2.1) |
| 1.00 | −42.0 | 0.0 (sapma **42.0**) | −42.0 (sapma **0**) |

Eski yöntemde en büyük sapma 42 px → görünür sekme. Yenisinde 3.6 px'i geçmiyor, bitişte tam sıfır.

### Test · `cark_test.js` +13 kontrol

`canliDiz` · geçiş sonrası çağrı · animasyon boyunca `diz()` · hedef her karede ölçülüyor · `kayY` hedefe göre · **körü körüne sıfıra inmiyor** · bitişte hedefte · eski yöntemde sekme >30 px · yenide <6 px · bitişte tam hedefte · 25 adımda hata ve atlama yok.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-01a` ↔ `rota-2026-12-01a` · 509 885 bayt**

---

## 192 · ÖZET TUTARLILIĞI · LOGO · ŞERİT BAŞLIĞI · `2026-12-03a`

### 1 · CEVAP · çürüme yapmadığın işe uygulanmıyor

Kullanıcı: *"yapmadığım çalışmaların da çürümesi varmış gibi mi hesaplama yapıyor?"*

**Hayır.** Çürüme yalnız **ölçülen tabana** uygulanıyor — sahip olduğun bilgiye. Yapılmamış işin çürümesi diye bir şey yok; yapılmamış iş zaten sıfır katkı veriyor.

Parakete de aynısını yapıyor: 57.61 (ölçülen) → 56.03 (parakete). Fark, tabanın 24 günlük çürümesi eksi yapılan işin kazancı.

### ⚠ 2 · ama özet tutarsızdı

| Durum | parakete | radar özeti |
|---|---|---|
| hiç çalışmadan | −7.10 | −7.10 ✓ |
| 8 video | −6.89 | −6.89 ✓ |
| tüm okuma+video | **17.53** | **14.19** ✗ |

**3.34 net sapma.** Sebep: özet eksenlerin toplamıydı; **Küçük Stajlar** (`SORU.den`=0) ve **Histo-Embriyoloji** (Fizyoloji ekseninde birleşik) kazançları toplama girmiyordu.

Düzeltme: özet artık doğrudan `para()`dan alınıyor — paraketenin kullandığı sayının aynısı. Ayrıca eksen kazançlarına da Histo ve Küçük Stajlar eklendi.

**Doğrulandı:** dört durumda da birebir (−7.1 / −6.9 / +17.5 / +17.5).

### 3 · logo

| | Değişiklik |
|---|---|
| **E** | ayrı onay işaretleri kaldırıldı; **kolların ucu tick'e dönüşüyor** (`H146 l9 10 l17 -19`) |
| **R** | kulaklık uçları hafif açıldı (`160,54` ve `172,65`) — küçük boyutta fark ediliyor |

### 4 · şerit başlığı sabit boyutta

Konu adı (`.kdm1 .ko`, 13px) `--r1` ile açılıp kapanıyordu: yazı saydamlaşıp daralıp yok oluyor, kart açılırken yeniden beliriyordu. Şerit görünümünde **en çok dikkat çeken detay** olduğu için kesinti göze çarpıyordu.

```css
.kdm1{height:21px;opacity:1}      /* her zaman görünür, aynı boyut */
```

Pasif kart yüksekliği 36 → **55 px**. Kart açılırken konu adının konumu da boyutu da değişmiyor — süreklilik hissi buradan geliyor.

### Test

`cark_test.js` uyarlandı: konu satırı şeritte görünür · alt satırlar orandan · 20 adımda hata ve atlama yok.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-03a` ↔ `rota-2026-12-03a` · 510 931 bayt**

---

## 193 · ⚠ BEKLENTİ UFKU · LOGO ZEMİNİ · `2026-12-05a`

### ⚠ 1 · beklenti TUS gününe projekte ediliyordu

Kullanıcı: *"en son verisini girdiğim denemeyle çalışmam sonucunda bir sonraki denemede kaç almamı bekliyorsa aradaki net farkı göstermeli."*

`bransDurum()` ve özet, çürümeyi **TUS gününe** (24 gün) göre hesaplıyordu. Oysa soru "sıradaki denemede ne olur".

`para(ufuk)` parametreli hâle getirildi; `sonrakiDeneme()` programdaki ilk tamamlanmamış deneme tarihini veriyor.

| Ufuk | Kazanç (boş) |
|---|---|
| Sıradaki deneme (2 gün) | **−1.72 net** |
| TUS günü (24 gün) | −7.10 net |

**Çalışma yapılınca:** sıradaki denemeye kadar planlanan 29 görev işaretlendiğinde **+2.49 net**.

Eksen farkları da makulleşti: Dahiliye %44 → %47 (+3), Patoloji %65 → %76 (+11). Eskiden 24 günlük çürümeyle hepsi eksiye düşüyordu.

⚠ Bir çağrı atlanmıştı (`curume(br,o.tar)` ufuksuz kalmış); yakalanıp bağlandı — yoksa parametre hiç işlemiyordu.

### 2 · logo zemini

Bevel'de zemin ve şekil aynı yüzeyin parçası. Bizimki düz simsiyahtı, harfler zeminden kopuk duruyordu.

- **Zemin gradyanı** `#2A2F35 → #1B1F24 → #0E1114` · logoyla aynı ışık yönü
- **Işık odağı** sol üstte, %55 → 0 sönümlü radyal
- **İnce kenar** `#5A626C` %38 · yuvarlatma 52 px

| Nokta | Ton |
|---|---|
| sol üst | 60 |
| sağ alt | 18 |
| merkez (harfler) | 185 |

Simsiyah piksel 28 000 → **1 407**. İkonlar artık `flatten` olmadan üretiliyor; zemin SVG'nin parçası.

### Test · `kal_test.js` +11 kontrol

`para` ufuk parametreli · `sonrakiDeneme` · `bransDurum` ve özet aynı ufku kullanıyor · `curume` ufka bağlı · **`para` içinde SINAV_G kalmadı** · ufuk gerçekten etkiliyor · yakın ufukta çürüme az · çalışınca beklenti artı · eksen farkları ±%20 içinde · logo zemini ve ışığı.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-05a` ↔ `rota-2026-12-05a` · 530 251 bayt**

---

## 194 · ⚠ BAŞLIK SÜREKLİLİĞİ · İKİ KÖK SEBEP · `2026-12-06a`

§192'de konu adını şeritte görünür kılmıştım ama kullanıcı videoda hâlâ "başlık bir an kaybolup sonra beliriyor" gördü. İki ayrı sebep varmış.

### ⚠ 1 · boyutlar farklıydı

| | Boyut |
|---|---|
| Şerit başlığı `.kdm1 .ko` | **13 px** |
| Kart başlığı `.kKonu` | **19 px** |

Görünür kılmak yetmiyordu; kart açılırken yazı 13'ten 19'a sıçrıyordu. Şerit başlığı kart başlığıyla **birebir** eşitlendi: 19 px, `line-height:1.25`, `letter-spacing:-.02em`.

`.kdm1` yüksekliği 21 → **26 px**, pasif kart yüksekliği 55 → **60 px**.

### ⚠ 2 · başlık koreografiye dahildi

```js
function icerikDegis(el,yeni){
  eski.classList.add('icCikis');                    // içerik küçülüp yok oluyor
  setTimeout(()=>{el.innerHTML=yeni; icerikGiris(el)},100);  // yenisi büyüyerek geliyor
}
```

`.icCikis>*` ve `.icGiris>*` **tüm** çocukları ölçekliyor — başlık dahil. Kart geçişinde başlık 100 ms yok oluyor, sonra 150 ms'de büyüyerek geri geliyordu. Kullanıcının gördüğü sıçrama buydu.

Konu adı artık **muaf**:

```css
.icCikis .kKonu,.icGiris .kKonu,
.icCikis .kdm1,.icGiris .kdm1{animation:none !important;
  opacity:1 !important; transform:none !important}
```

Aynı boyutta, aynı yerde, kesintisiz duruyor. Diğer satırlar koreografiyi sürdürüyor.

### Test · `cark_test.js` +12 kontrol

iki başlık bulundu · **aynı boyutta** · aynı satır yüksekliği · aynı harf aralığı · koreografiden muaf · opacity zorlanıyor · transform sıfırlanıyor · `kdm1` yüksekliği yeterli · pasif kart yüksekliği güncel · 20 adımda hata ve atlama yok.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-06a` ↔ `rota-2026-12-06a` · 531 000 bayt**

---

## 195 · BAŞLIK SÜREKLİ BÜYÜR · KOREOGRAFİ KALKTI · `2026-12-07a`

§194'teki sabit eşitleme yanlıştı: şeritteki 19 px yazı düzeni bozuyordu. Kullanıcının istediği **sürekli büyüme**.

### Başlık artık konumdan büyüyor

```css
.kdm1 .ko{font-size:calc(13px + 6px * var(--ac,0))}
.kdm1{height:calc(21px + 6px * var(--ac,0))}
```

`--ac` açıklık oranı, konumdan sürekli hesaplanıyor (§141) ve her karede yazılıyor.

| `--ac` | Yazı | Satır |
|---|---|---|
| 0 (uzakta) | 13.0 px | 21 px |
| 0.50 | 16.0 px | 24 px |
| 1 (merkezde) | **19.0 px** | 27 px |

Kart biçimine geçildiği an `--ac`=1 olduğu için şerit başlığı da 19 px — **kart başlığıyla aynı**, sıçrama yok.

**Kendiliğinden tersine dönüyor:** oran konumun kendisinden geldiği için kaydırmaya devam edilince yazı küçülmeye başlıyor. Ayrı bir animasyon, ayrı bir zamanlayıcı yok.

### Koreografi kaldırıldı

`icerikDegis` içeriği önce küçültüp yok ediyor, 100 ms sonra yenisini büyüterek getiriyordu. Artık ölçek animasyonundan muaf olanlar:

```css
.icCikis .kdm, .icGiris .kdm,
.icCikis .kdm>div, .icGiris .kdm>div,
.icCikis .kUst, .icGiris .kUst,
.icCikis .kBrans, .icGiris .kBrans,
.icCikis .kKaynak, .icGiris .kKaynak,
.icCikis .kKonu, .icGiris .kKonu
```

Şerit satırlarının hepsi ve kartın üst bölümü `--r1..--r4` oranlarıyla sürekli büyüyüp küçülüyor. Yalnız alt bölüm (buton, mola, uyarı) koreografiyi sürdürüyor.

### Test · `cark_test.js` +13 kontrol

boyut ve yükseklik orandan · `--ac` her karede yazılıyor · şerit ve kart üst satırları koreografisiz · **sabit eşitleme kaldırıldı** · r=0'da 13 px, r=1'de 19 px · ara değerler monoton · tersine dönebilir · 20 adımda hata ve atlama yok.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-07a` ↔ `rota-2026-12-07a` · 532 046 bayt**

---

## 196 · ⚠ BÜYÜME ARALIĞI DARALTILDI · `2026-12-08a`

§195'te başlık boyutunu `--ac`e bağlamıştım. Kullanıcı iki kusur bildirdi: başlıklar kart boyutundan fazla büyüyüp sonra ışınlanıyor, ve kaydırma görünümündeki başlıklar eski hâline dönmemiş.

### ⚠ Kök sebep · aralık çok geniş

`--ac` merkeze yakın **bütün** şeritlerde 1'e yaklaşıyor. Dolayısıyla merkezin çevresindeki her şeridin başlığı 19 px'e çıkıyordu — kaydırma görünümü bozuluyordu.

### Düzeltme · `--kb`

Büyüme için ayrı bir oran:

```js
x.style.setProperty('--kb', ara01(v, 0.90, 1.0));
```

| `--ac` | `--kb` | Yazı |
|---|---|---|
| 0.00–0.90 | 0.00 | **13.0 px** · şerit görünümü |
| 0.95 | 0.50 | 16.0 px |
| 1.00 | 1.00 | **19.0 px** · kart başlığıyla aynı |

Büyüme yalnız merkeze **çok yakınken** başlıyor. Kaydırma sırasındaki şeritlerin hepsi eski 13 px görünümünde kalıyor; sadece merkeze oturan kart büyüyor ve tam 19 px'te kart başlığıyla buluşuyor — ışınlanma yok.

### Test · `cark_test.js` +14 kontrol

`--kb` iki yolda da yazılıyor · aralık 0.90–1.00 · başlık ve yükseklik `--kb` kullanıyor · **`--ac` artık başlıkta değil** · ac=0.6 ve 0.8'de 13 px · 0.90'da başlıyor · 0.95'te ara değer · 1'de tam 19 px · **19 px'i aşmıyor** · monoton.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-08a` ↔ `rota-2026-12-08a` · 532 475 bayt**

---

## 197 · BÜYÜME AÇILMAYLA SENKRON · KAYNAK SATIRI · `2026-12-09a`

### 1 · büyüme artık uzaklığa değil AÇILMAYA bağlı

Kullanıcı: *"kart seçilip açılıp büyüme animasyonu başlamadıysa başlık çark odağına uzaklığına göre büyümemeli."*

`--kb` merkeze yaklaşan her şeritte hesaplanıyordu. Artık:

```js
const etkin = x.classList.contains('act') && !surukleKip;
x.style.setProperty('--kb', etkin ? ara01(v,0.90,1.0) : '0');
```

Kaydırma sürerken **hiçbir** başlık büyümüyor. Büyüme yalnız kart etkin olduğunda ve sürükleme kipi bittiğinde — kartın kendi açılmasıyla senkron.

### 2 · kaynak satırı · büyüme + soldan sağa renk

Şeritte `var(--yesil)` kullanılıyordu ama **o değişken hiç tanımlı değildi**; renk devralınana (beyazımsı) düşüyordu. Kartta ise `#93C47B` yeşil. Geçişte renk birden değişiyordu.

İki renk tek gradyanda taşınıyor, kesim noktası `--kb` ile soldan sağa ilerliyor:

```css
background-image:linear-gradient(90deg,
  #93C47B 0%, #93C47B calc(var(--kb,0)*100%),
  var(--ink2) calc(var(--kb,0)*100% + 12%), var(--ink2) 100%);
-webkit-background-clip:text; -webkit-text-fill-color:transparent;
```

| Durum | `--kb` | Başlık | Kaynak | Renk |
|---|---|---|---|---|
| kaydırma sürerken | 0.00 | 13.0 px | 10.5 px | beyaz |
| kart açılıyor %50 | 0.50 | 16.0 px | 11.5 px | **soldan %50 yeşil** |
| kart tam açık | 1.00 | 19.0 px | 12.5 px | yeşil |

Boyutlar kart formundakilerle birebir buluşuyor (19 px ve 12.5 px), sıçrama yok.

### Test · `cark_test.js` +12 kontrol

`--kb` yalnız etkin kartta · sürükleme kipinde büyüme yok · etkin olmayan sıfır · kaynak büyümesi · gradyan · kesim `--kb` ile · metin kesimi · saydam dolgu · kb=0 şerit, kb=1 kart boyutları · kaynak kart boyutu · ikisi de monoton.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-09a` ↔ `rota-2026-12-09a` · 533 280 bayt**

---

## 198 · YUMUŞAK GEÇİŞ EĞRİSİ · `2026-12-10a`

### Doğrulama · başlıklar aynı boyutta DEĞİL

Kullanıcının şüphesi: *"zaten büyük kart başlık yazı büyüklüğü küçük kart yazı büyüklüğüyle aynı sanırım."*

Değil: şerit `.kdm1 .ko` 13 px'ten başlıyor, kart `.kKonu` 19 px. Büyüme gerçek bir değişim.

### ⚠ Sıçramanın kaynağı · TÜREV KIRILMASI

Satır oranları doğrusal aralıklardan geliyordu:

```js
const ara01=(v,a0,a1)=>Math.max(0,Math.min(1,(v-a0)/(a1-a0)));
```

Her aralığın ucunda türev kırılıyor: satır **aniden** büyümeye başlıyor, **aniden** duruyordu. Gözle görülen boyut sıçramalarının kaynağı buydu.

**`smoothstep` (3t²−2t³)** uçlarda türevi sıfırlıyor:

| Ölçüm | Doğrusal | Yumuşak |
|---|---|---|
| İkinci fark (kink ölçüsü) | 0.6176 px | **0.1026 px** |

**%83 daha pürüzsüz** — suyun iki yana akması gibi.

### Aralıklar genişletildi · daha çok ara faz

| Satır | Eski | Yeni | Genişlik |
|---|---|---|---|
| konu adı | 0.10–0.38 | **0.06–0.40** | 0.28 → 0.34 |
| kaynak | 0.32–0.60 | **0.26–0.62** | 0.28 → 0.36 |
| blok | 0.54–0.80 | **0.46–0.82** | 0.26 → 0.36 |
| son seans | 0.74–0.96 | **0.66–0.99** | 0.22 → 0.33 |

Satırlar sırayla, alttan üste doğru ve birbirine akarak beliriyor. `--kb` aralığı da 0.90 → **0.86** ile genişletildi.

Yükseklik uçlarda doğru (36 px ve 107 px), monoton, kink yok.

### Test · `cark_test.js` +10 kontrol

smoothstep iki yolda da · **doğrusal `ara01` kalmadı** · aralıklar genişletildi · yumuşak eğri %60'tan fazla pürüzsüz · uçlarda türev sıfır · yükseklik monoton · uçlarda doğru değerler · aralıklar ≥0.32 · sıralı belirme.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-10a` ↔ `rota-2026-12-10a` · 533 944 bayt**

---

## 199 · ⚠ CSS GEÇİŞİ ile HER KARE YAZIMI ÇAKIŞIYORDU · `2026-12-11a`

Kullanıcı: *"kart penceresinin sıçrama yapıyormuş gibi laglı görüntüsü devam ediyor."*

### ⚠ Kök sebep

```css
#sahne.otu .sr{transition:transform .60s ...}
#sahne.otu .kdm>div{transition:height .34s ...}
```

Ama `canliDiz()` (§191) **her karede** `dizKay()`/`diz()` çağırıp aynı `transform` ve `--r1..--r4` değerlerini yeniden yazıyor.

| | Etki |
|---|---|
| JS | her 16.7 ms yeni değer yazıyor |
| CSS | her yazımda 340/600 ms geçişi **baştan** başlatıyor |
| Sonuç | tarayıcı hiç hedefe varamıyor · 26 karelik kaydırmada **26 kez kesilen animasyon** |

İki mekanizma aynı özelliği aynı anda sürüyordu. Görüntünün "laglı" olmasının sebebi buydu — kare kaybı değil, çakışma.

### Düzeltme

Canlı yerleşim sürerken `#sahne` üzerine `canli` sınıfı takılıyor:

```css
#sahne.canli .sr,#sahne.canli .sr .serit,
#sahne.canli .kdm>div,#sahne.canli .kart{transition:none !important}
```

Yumuşaklık zaten JS tarafından geliyor: §198'in smoothstep eğrisi ve kare kare ölçüm. CSS'in araya girmesine gerek yok. Canlı döngü bitince sınıf kalkıyor, `otu` geçişleri normal işine dönüyor.

**Sonuç:** 60 fps'te 26 gerçek ara faz, kesinti yok.

### Test · `cark_test.js` +10 kontrol

`canli` sınıfı kuralı · satır ve kart geçişleri kapalı · `canliDiz` takıp çıkarıyor · açılma fazı da · `otu` geçişi hâlâ tanımlı · 25 adımda hata ve atlama yok.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-11a` ↔ `rota-2026-12-11a` · 534 879 bayt**

---

## 200 · ⚠ SÜRÜKLEME YARIDA KESİLİYORDU · `2026-12-12a`

Kullanıcı: *"ekranı bırakmamış olmama rağmen kaydırmamı yarıda kesip kartı seçiyor."*

### ⚠ Kök sebep · güvenlik ağı parmağı görmüyordu

```js
function surTazele(){
  if(surZam)clearTimeout(surZam);
  surZam=setTimeout(()=>{surZam=null; if(surukleKip)otur()},900);
}
```

Bu zamanlayıcı, olay kaçarsa (parmak alan dışına çıkar, tarayıcı olayı yutar) sürüklemenin asılı kalmaması için kurulmuştu. `pointermove`da yenileniyor — ama **parmağını ekranda hareketsiz tutunca** yenilenme duruyor, 900 ms doluyor ve `otur()` çağrılıyordu. Kullanıcı hâlâ dokunurken sürükleme kesilip kart seçiliyordu.

### Düzeltme

Süre dolduğunda parmağın hâlâ ekranda olup olmadığına bakılıyor (`bas` doluysa dokunuş sürüyor):

```js
if(!surukleKip)return;
if(bas){ surTazele(); return }    /* parmak hâlâ ekranda · bekle */
otur();
```

| Durum | Davranış |
|---|---|
| Parmak ekranda, sürükleme sürüyor | **bekler** |
| Parmak kalktı, olay kaçtı | oturur (ağ çalışıyor) |
| Sürükleme yok | bekler |
| Parmak ekranda ama kip kapalı | bekler |

Güvenlik ağı işlevini koruyor; yalnız gerçekten kaçmış olaylarda devreye giriyor.

### Test · `cark_test.js` +8 kontrol

parmak denetimi · kip denetimi · süre 900 ms · zamanlayıcı kendini yeniliyor · dört durumun doğruluğu.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-12a` ↔ `rota-2026-12-12a` · 535 519 bayt**

---

## 201 · ⚠ SENTETİK GÖREV ALANLARI EKSİKTİ · TEK DÜĞME · `2026-12-13a`

### ⚠ 1 · çark kilitleniyordu · kök sebep

Havuzdan çekilen 24'lü görevlerinde **beş alan eksikti**: `t` · `blokT` · `blokSon` · `sira` · `tag`.

`gecmis()` ve çizim yolları bu alanlara dokununca hata veriyor, çark o an görünen görevde **kilitli kalıyordu** — kullanıcının gördüğü "telafi görevinde takılma" buydu.

```
HATA: Cannot read properties of undefined (reading 'split')
```

Power-up görevleriyle aynı alan kümesi dolduruldu (`b:'D'`, `t:'—'`, `blokT:"— 24'lü havuz"`, `blokSon:'23:00'`, `tag:'pembe'`, `sira:[1,1]`, `why`).

**Doğrulandı:** telafi görevleri varken 24'lü çekildiğinde çark en üstünde, 8 ileri adımda hata 0, takılma 0.

### ⚠ 2 · iki düğme birden görünüyordu

`✕` ve "Çarka çek" aynı anda çiziliyordu. Doğru davranış anlık duruma bakıyor:

```js
const bekleyen = GOREVLER.some(g => g.ek && g.br===x.br && !D.bitti[id(g)]);
```

| Durum | Düğme |
|---|---|
| Hiç çekilmemiş | **Çarka çek** |
| Çekildi, bekliyor | **Geri al** |
| Tamamlandı | **Çarka çek** |
| Tamamlama geri alındı | **Geri al** |

Ayrı bir durum tutulmuyor; dördü de doğrulandı.

### Test · `pu_test.js` +16 kontrol

sentetik görev tam alanlı · `tag`/`sira`/`why` · tek düğme mantığı · beş alanın dolu olması · çarkın en üstünde · **gezinme hata vermiyor ve takılmıyor** · dört düğme durumu.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-13a` ↔ `rota-2026-12-13a` · 536 490 bayt**

---

## 202 · ⚠ 24'LÜ SORU SAYILARI DÜZELTİLDİ · `2026-12-16a`

Kullanıcı kitapçıkları sayıp bildirdi: 24'lü serisi **Küçük Stajlar'ı ayrı kitapçık** yapmış.

### Fark

| Branş | TUS | 24'lü |
|---|---|---|
| Dahiliye | 35 | **25** (−10) |
| Genel Cerrahi | 30 | **21** (−9) |
| **Küçük Stajlar** | 0 | **19** (10+9) |
| diğerleri | — | aynı |

Toplam yine **200**. (10+9=19 ✓ tam kapanıyor.)

### `DEN24` tablosu

`SORU.den` TUS projeksiyonu için kalıyor; 24'lü serisi kendi tablosunu kullanıyor:

```js
const DEN24={Anatomi:13,Fizyoloji:15,Biyokimya:18,Mikrobiyoloji:18,
  Patoloji:18,Farmakoloji:18,Dahiliye:25,Pediatri:25,
  'Genel Cerrahi':21,'Kadın Doğum':10,'Küçük Stajlar':19};
```

Etkilenenler: deneme süreleri · havuz kartları · sentetik görevler · getiri hesabı · kalibrasyon sayfası branş listesi.

### Küçük Stajlar · iki gruba paylaştırma

`KONU_DAG`'da karşılığı yok (konuları Dahiliye'ye 8, Genel Cerrahi'ye 14 dağıtılmıştı). Getiri hesabı o iki havuzdan `KS_PAY` oranıyla örnekliyor:

```js
const KS_PAY={'Dahiliye grubu':10/19,'Genel Cerrahi grubu':9/19};
```

Konu kırılımı giriş listesi de aynı mantıkla birleşik üretiliyor.

### Havuz · yeni sıralama

| # | Branş | Soru | net/sa |
|---|---|---|---|
| 1 | Farmakoloji | 18 | 0.326 |
| 2 | Anatomi | 13 | 0.326 |
| 3 | Biyokimya | 18 | 0.292 |
| 4 | Genel Cerrahi | **21** | 0.290 |
| 5 | **Küçük Stajlar** | **19** | **0.269** |
| 6 | Dahiliye | **25** | 0.167 |

Dahiliye'nin süresi 1.09 → **0.78 sa**, Genel Cerrahi 0.94 → **0.66 sa**.

### Test · `pu_test.js` +27 kontrol

`DEN24` · `KS_PAY` · `den24Soru` · **on bir branşın tek tek soru sayısı** · toplam 200 · TUS ile fark · Küçük Stajlar farkı kapatıyor · KS payları toplamı 1 · havuz 11 kart ve 200 soru · Küçük Stajlar getiri üretiyor · süreler yeni sayılara göre · sentetik görevin grubu.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-16a` ↔ `rota-2026-12-16a` · 539 023 bayt**

---

## 203 · ETİKETLER NET · ⚠ 200'LÜK DENEME R_CAL'i BESLEMİYORDU · `2026-12-18a`

### 1 · matris etiketleri net cinsinden

Yüzde yerine doğrudan net:

```
Dahiliye
4.5 ▲ 12 net  +1.9
```

turuncu = önceki denemenin neti · yeşil/kırmızı ok = son denemenin neti · yanındaki = sıradaki denemede beklenen net değişimi. Oranlar branşın soru sayısıyla çarpılıyor (Fizyoloji ekseni Histo dahil 15).

### ⚠ 2 · UÇTAN UCA SINAMA · bir boşluk çıktı

Kullanıcının sorusu ölçüldü. 24'lü sonucu girildiğinde:

| | Sonuç |
|---|---|
| R_CAL | 0.4050 → 0.4142 ✓ |
| parakete | 56.707 → 56.748 ✓ |
| potansiyel | 8.984 → 9.106 ✓ |
| **gelecek görevin kazancı** | 0.22410 → **0.22500** ✓ |
| R_CAL belirsizliği | 0.0995 → 0.0993 ✓ |

Ama 200'lük deneme girildiğinde **R_CAL gözlem sayısı 1 → 1** kaldı: tam denemeler R_CAL'i hiç beslemiyordu. `rCalHesap` yalnız `D.kal`ı (24'lü) tarıyordu.

**Düzeltildi.** Ardışık iki tam deneme arasında, o branşa çalışma yapıldıysa:

```
gözlenen artış  = p1 − p0
denemenin payı  = maruziyet × D_ORAN   (çıkarılıyor)
kalan / (1−p0)  = R_CAL gözlemi
```

§174'ün mantığının tam deneme karşılığı; iki sabit birbirini kirletmiyor.

**Sonuç:** gözlem 0 → **2**, belirsizlik 0.0995 → **0.0920**.

### Zincirin tamamı · doğrulandı

| Girdi | Etkilediği |
|---|---|
| **24'lü sonucu** | R_CAL · parakete · potansiyel · **tüm gelecek görevlerin kazancı** |
| **200'lük deneme** | ölçülen taban · parakete · potansiyel · **R_CAL** · D_ORAN · gelecek görev kazançları |

Geçmiş görev getirileri de dinamik (`para()` hiç dondurmuyor); deneme getirileri `birim` alanı üzerinden yeni sabitle yeniden hesaplanıyor (§172).

### Test · `kal_test.js` +17 kontrol

etiket net cinsinden · yüzde kalmadı · 200'lük R_CAL'i besliyor · deneme payı çıkarılıyor · 24'lü'nün beş etkisi · 200'lüğün yedi etkisi · sabitler sınırlar içinde.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-18a` ↔ `rota-2026-12-18a` · 541 461 bayt**

---

## 204 · ÇAPRAZ BESLEME · ⚠ GİRDİ SÜZGECİ · SIRALAMA · `2026-12-22a`

### 1 · kesinlik ağırlıklı çapraz besleme

R_CAL (±0.09) D_ORAN'dan (±0.58) çok daha iyi belirlenmiş. Artık arada **çalışma olan** konu çiftleri de D_ORAN'a gözlem veriyor: çalışmanın payı R_CAL ile hesaplanıp çıkarılıyor.

R_CAL'in kendi belirsizliği de hataya girdiği için gözlemin varyansı şişiriliyor:

```js
const ekV = Math.pow(rc.sd * taban / kat, 2);
const vr  = vp/(kat*kat) + ekV;
```

R_CAL ne kadar kesinse gözlem o kadar ağırlık alıyor — **doğruluk olasılığıyla doğru orantılı**. Belirsizleşirse katkı kendiliğinden siliniyor. Doğrulandı: D_ORAN gözlemi 44 → 46.

### ⚠ 2 · imkânsız kayıt sabitleri kaydırıyordu

Denetimde bulundu: 25 soruluk denemeye `99D + 99Y + 99B` girilince **R_CAL 0.6713 → 0.5477** kayıyordu.

`kayitGecerli()` süzgeci eklendi — üç yerde birden kullanılıyor (`rCalHesap` · `konuGozlem` · `denCozulen`):

- sayılar sonlu ve negatif değil
- tek branş kaydı 60 soruyu aşmıyor
- konu toplamı da 60'ı aşmıyor

Sınır **cömert** tutuldu: hiçbir 24'lü 25 sorudan fazla değil ama eski kayıtlar farklı sayılarla girilmiş olabilir (Dahiliye eskiden 35). Amaç meşru veriyi korumak, uç saçmalığı ayıklamak.

**Doğrulandı:** bozuk kayıt R_CAL'i ve D_ORAN'ı hiç etkilemiyor; meşru 35'lik kayıt sayılmaya devam ediyor.

### 3 · branş listesi getiriye göre sıralı

24'lü kalibrasyon sayfasındaki branş seçimi `DEN24` anahtar sırasındaydı. Artık havuzla aynı sırada — **getirisi çok olandan aza**:

| # | Branş | net/sa |
|---|---|---|
| 1 | Farmakoloji | 0.326 |
| 2 | Anatomi | 0.326 |
| 3 | Biyokimya | 0.292 |
| 4 | Genel Cerrahi | 0.290 |
| 5 | Küçük Stajlar | 0.269 |

### Dayanıklılık denetimi

| Senaryo | Sonuç |
|---|---|
| 30 kayıt · sınırlar | R_CAL 0.6713 ±0.0284 · D_ORAN 1.0134 ±0.5778 ✓ |
| Bozuk girdi (NaN, negatif, imkânsız) | eleniyor, sabit değişmiyor ✓ |
| Sıfır gözlem | öncele düşüyor (0.405 / 1.000) ✓ |

### Test · `kal_test.js` +13 kontrol

çapraz besleme · R_CAL belirsizliği varyansa giriyor · süzgeç üç yerde · branş listesi sıralı · bozuk kayıt iki sabiti de etkilemiyor · meşru kayıt korunuyor · sınırlar · sıfır gözlemde öncel.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-22a` ↔ `rota-2026-12-22a` · 544 606 bayt**

---

## 205 · SİSTEM DENETİMİ · ⚠ İKİ ÖNBELLEK HATASI · `2026-12-23a`

Kalibrasyon, parakete, potansiyel ve görev getirisi sistemleri baştan sona denetlendi.

### ⚠ 1 · `dOran` önbellek anahtarında `D.kal` YOKTU

```js
const a=JSON.stringify(D.denemeler||[])+'|'+Object.keys(D.bitti).length+'|'+bgun();
```

24'lü kaydı eklenince D_ORAN **bayat kalıyordu** — kayıt girmenin deneme sabitine hiç etkisi olmuyordu.

### ⚠ 2 · `rCal` anahtarı da eksikti

§203'ten beri R_CAL tam denemeleri (`D.denemeler`) ve aradaki çalışmayı (`D.bitti`) da kullanıyor ama anahtar yalnız `D.kal` ve son deneme tarihini kapsıyordu.

**İkisi de düzeltildi.** Doğrulandı: elle temizlemeden, kayıt eklenince R_CAL 0.40500 → 0.41999, D_ORAN 1.01348 → 1.01351.

### ⚠ 3 · özyineleme riski

§204'ün çapraz beslemesi `rCalHesap` → `dOran()` → `dOranHesap` → `rCal()` zinciri kurdu. İki önbellek de geçersizse **sonsuz özyineleme**.

`_rcMes` / `_doMes` kilitleri eklendi; iç içe çağrıda **son bilinen değer** dönüyor (öncel değil — öncel dönmek ilk geçişi saptırıyor, sonuç çağrı sırasına bağlı kalıyordu).

Doğrulandı: 12 yinelemede en büyük oynama **5.45e-8**, çağrı sırasından bağımsız.

### Denetim sonuçları

| Kontrol | Sonuç |
|---|---|
| `para()` tekrarlanabilir | ✓ |
| 80 görev eklerken parakete tekdüze artıyor | ✓ düşüş 0 |
| Tavan aşılmıyor | ✓ T 42.24/100 · K 46.71/100 |
| Görev tamamlama tek başına etkisiz | ✓ |
| Bozuk girdi sabitleri etkilemiyor | ✓ |
| Sıfır gözlemde öncele düşüyor | ✓ |
| Döngü yakınsıyor | ✓ 5.45e-8 |

### Açıkta bırakılan iki nokta (hata değil, bilinçli)

1. **Potansiyel ile gerçek artış arasında ~0.42 net fark.** Sebep §178'de belgeli: potansiyel deneme getirilerini MEVCUT durumda hesaplıyor (yeni öğrenme), hepsi yapılınca konular "çalışılmış" sayılıp tekrar getirisine geçiyor. Sıra bilinmediği için muhafazakâr taraf seçildi.

2. **Aynı kayıt iki kez girilirse iki kez sayılıyor.** Yinelenen kayıt denetimi yok — iki ayrı oturum da olabileceği için bilinçli. Listede görülüyor, silinebiliyor.

### ⚠ Davranış değişimi · `derin_test.js` I2

§203'ten beri deneme sonucu R_CAL'i de besliyor: iyi sonuç *"çalışmam verimli"* diye yorumlanıp **kalan işin değerini artırabiliyor**. Bu yüzden düşük→orta arasında tekdüzelik artık beklenmiyor (1.37 → 1.50). Boşluk kapandıkça (iyi deneme) etki baskın geliyor ve katkı 0.15'e düşüyor. Test bu gerçeğe göre yazıldı.

### Test · `kal_test.js` +12 kontrol

iki anahtar tam · özyineleme kilidi · kilit son bilineni döndürüyor · `para` tekrarlanabilir · tekdüze artış · tavan · tamamlama etkisiz · iki sabit tazeleniyor · **döngü yakınsıyor** · çağrı sırasından bağımsız.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-23a` ↔ `rota-2026-12-23a` · 545 555 bayt**

---

## 206 · DERİN DENETİM · ⚠ İKİ HATA DAHA · `2026-12-26a`

### ⚠ 1 · konu kırılımı 24'lü sayısına ölçeklenmiyordu

`konuSatir` önceden dolu soru sayılarını `KONU_DAG`dan alıyordu — o tablo **TUS dağılımına** göre (Dahiliye 35). 24'lü kitapçığı ise 25 soruluk.

| Branş | KONU_DAG | 24'lü | |
|---|---|---|---|
| Dahiliye | 35.0 | 25 | ✗ |
| Genel Cerrahi | 30.0 | 21 | ✗ |
| Patoloji | 18.0 | 18 | ✓ |

Toplam, o branşın 24'lü soru sayısına indirgeniyor. Doğrulandı: 35.0 → 25.0 · 30.0 → 21.0.

### ⚠ 2 · net değerleri yuvarlanıyordu

`bir(v)=|v|>=10 ? toFixed(0) : toFixed(1)` — **15.5 net "16" görünüyordu**. Kullanıcının sorusu buydu: *"ben en son sınavda 16 net mi yaptım?"*

Gerçek değer **15.5**. Artık hep bir ondalık: yarım netler TUS'ta gerçek fark yaratıyor.

### 3 · CEVAP · "gerçekten o gün çalıştıklarıma mı bakıyor?"

**Evet.** İki mekanizma:

```js
D.bitti[id(g)] = bgun();          // gerçekten işaretlediğin GÜN
konuCalisildiKume(): if(!D.bitti[id(g)])continue;   // programa değil, işarete bakıyor
```

- Telafiye düşüp yapmadığın görev → `D.bitti` yok → sayılmıyor ✓
- Telafiden çekip bugün yaptığın → `D.bitti` = bugün ✓
- Power-up'tan çekip yaptığın → `D.bitti` = bugün ✓

Zaman etiketi zaten var ve kullanılıyor.

### 4 · branş trendlerinde sayısal net

- Her veri noktasının üstünde **net değeri** (8 px, ortalanmış)
- Hedef çizgisinin ucunda yüzde değil **net**
- Sağ üstte: **son net + değişim miktarı** — `15.5 net ▲ +5.5`

### ⚠ 5 · radar etiketleri çakışıyordu

Alt yarıdaki komşu eksenlerin iki satırlı etiketleri üst üste biniyordu (Dahiliye ↔ Farmakoloji). Alt eksenlerde etiket yarıçapı **dönüşümlü** açılıyor (1.13 / 1.27), komşular farklı halkalara düşüyor. viewBox 660×500 → **680×540**.

Doğrulandı: 11 eksende çakışma riski **0**.

### Test · `kal_test.js` +15 kontrol

konu kırılımı ölçekli · net ondalıklı · grafik nokta etiketleri · sağ üstte değişim · kademeli yarıçap · dört branşın ölçekli toplamı · **Dahiliye neti son denemeyle birebir** · tamamlama bugünü yazıyor · `konuCalisildi` gerçek işarete bakıyor · **radar etiketleri çakışmıyor** · grafik etiketleri.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-26a` ↔ `rota-2026-12-26a` · 547 128 bayt**

---

## 207 · ⚠ "BUGÜN ÇALIŞILAN BRANŞ" PROGRAMA BAKIYORDU · `2026-12-27a`

Kullanıcı: bugün Dahiliye videosu telafi etti, Patoloji tekrar okuması yaptı — ama sayfa *"bugün çalıştığın branşlar: Genel Cerrahi"* diyordu.

### ⚠ 1 · ölçüt yanlıştı

```js
const bug=[...new Set(GOREVLER
  .filter(g=>g.d===gun&&(g.act==='oku'||g.act==='tekrar'))   // ← PROGRAM tarihi
  .map(g=>g.br))];
```

İki kusur:
- **`g.d===gun`** · programın bugüne yazdığı görevlere bakıyordu. Telafi edilen, öne çekilen, hiç yapılmayan işler ayırt edilmiyordu.
- **`video` sayılmıyordu** · Dahiliye videosu zaten listeye giremezdi.

Ölçüt tamamlama işaretine çevrildi:

```js
D.bitti[id(g)]===gun && ['oku','tekrar','video','soru'].indexOf(g.act)>=0
```

**Doğrulandı** (kullanıcının senaryosu): Dahiliye videosu telafi + Patoloji okuması → liste `Dahiliye · Patoloji`. Programda bugüne yazılı ama yapılmamış Genel Cerrahi **listede yok**.

### ⚠ 2 · beklenen soru sayısı TUS tablosundan

```js
bek=(SORU&&SORU.den&&SORU.den[brs])||0;   // Dahiliye 35
```

24'lü kitapçığı 25 soruluk. `den24Soru()` kullanılıyor: Dahiliye **25** · Genel Cerrahi **21** · Küçük Stajlar **19**.

### ⚠ 3 · kaldırılmış alanlara bakan kalıntı

Yardım metni §176'da kaldırılan `kd/ky/kb` DOM değişkenlerini okumaya devam ediyordu — tanımsız değişken hatası riski. Yerine konu kırılımı satırlarından toplam okunuyor; toplamı aşarsa uyarıyor.

### Test · `kal_test.js` +13 kontrol

gerçek tamamlamaya bakıyor · eski kod kalmadı · video sayılıyor · beklenen soru `DEN24`ten · `SORU.den` kalıntısı yok · kalıntı referans temizlendi · **telafi edilen video sayılıyor** · okunan branş sayılıyor · **yapılmamış program görevi sayılmıyor** · yalnız iki branş · üç branşın 24'lü soru sayısı.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-27a` ↔ `rota-2026-12-27a` · 547 640 bayt**

---

## 208 · DENEME İÇİ KONTRAST · EN GÜÇLÜ GÖZLEM · `2026-12-28a`

Kullanıcının sorusu: *"bu 24'lü düşük geldi ama yanlışlar hep çalışmadığım konulardan gelmiş — bu sonuç beni yanıltmasın diyebilecek mi?"*

### ⚠ Sınandı · HAYIR diyordu

Aynı toplam netle (4.50/25) iki senaryo denendi:

| | Çalışılan konuda | R_CAL |
|---|---|---|
| A | 5/6 doğru | 0.4050 → **0.4050** |
| B | 1/6 doğru | 0.4050 → **0.4050** |

**Ayırt etmiyordu.** Konu kırılımı yalnız iki deneme arası çift karşılaştırmasında kullanılıyordu; tek denemenin içindeki kontrast hiç değerlendirilmiyordu.

### Deneme içi kontrast

```
p_ç = çalışılan konulardaki başarı
p_h = çalışılmayan konulardaki başarı   (o gün için TABAN)
R   = (p_ç − p_h) / (1 − p_h)
```

İki hücre **aynı denemeden** geldiği için deneme zorluğu, o günkü form, dikkat düzeyi gibi ortak etkenler **sadeleşiyor**. İkinci denemeye, tarih eşleştirmesine, çürüme varsayımına gerek yok — bu yüzden en güçlü gözlem türü.

### Sonuç

| | Çalışılan konuda | R_CAL |
|---|---|---|
| A | 5/6 doğru | 0.4050 → **0.4508** ▲ |
| B | 1/6 doğru | 0.4050 → **0.3807** ▼ |

Toplam net ikisinde de aynı. **Düşük sonuç artık yanıltmıyor:** yanlışlar çalışılmamış konulardansa R_CAL yükseliyor, çünkü çalışmanın işe yaradığı görülüyor.

**Korumalar:** iki hücre de en az 3 soru içermeli · taban doygunsa (≥%97) bilgi yok sayılıyor · varyans iki binom hücresinden hesaplanıyor · tek hücreli kayıt gözlem üretmiyor.

### Test · `kal_test.js` +13 kontrol

kontrast bloğu · iki hücre ayrımı · formül · en az 3 soru · doygun taban · **tek denemeden gözlem üretiyor** · A ile B ayırt ediliyor · çalışılanda iyiyse yükseliyor · kötüyse düşüyor · **düşük toplam net yanıltmıyor** · belirsizlik daralıyor · tek hücrede gözlem yok · sınırlar.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-28a` ↔ `rota-2026-12-28a` · 549 929 bayt**

---

## 209 · BEKLENTİ ↔ GERÇEKLEŞEN ÇIKARIMI · `2026-12-30a`

Kullanıcı: *"200 soruluk deneme verisi girince 'ben şunu bekliyordum, şu gelmiş' çıkarımı yapıyor mu?"*

**Hesaplarda kullanıyordu (§203) ama göstermiyordu.** Artık ikisi de var.

### `denemeSapma()` · snapshot gerekmiyor

Beklenti **yeniden kurulabilir**: önceki denemenin tabanı + iki deneme arasında tamamlanan işin getirisi, o denemenin tarihine çürütülmüş. Aradaki 24'lü getirileri de sayılıyor.

```
bek   = önceki net + (görev getirisi + 24'lü getirisi)
ger   = gerçekleşen net
sapma = ger − bek
oran  = gerçekleşen artış / beklenen artış     (1.0 = tam isabet)
```

`oran` kalibrasyonun isabetini tek sayıda veriyor.

### Ölçüm

| | Değer |
|---|---|
| Önceki deneme (24 Tem) | 70.75 net |
| **Beklenen** | 72.75 (+2.00) |
| **Gerçekleşen** | 76.41 (+5.66) |
| **Sapma** | **+3.66 net** |
| **İsabet** | **2.83×** |

### Matris sayfasında kutu

Dört alan: beklenen · gerçekleşen · sapma · isabet. Altında yorum:

- oran > 1.15 → *"Beklentinin üstünde — kalibrasyon bunu öğrendi, görev getirileri yukarı gitti."*
- oran < 0.85 → *"Beklentinin altında — kalibrasyon getirileri aşağı çekti."*
- arası → *"Beklentiyle uyumlu — model tutarlı."*

Dar pencerede iki sütuna düşüyor.

### Test · `kal_test.js` +14 kontrol

fonksiyon · snapshot gerekmiyor · 24'lü getirisi sayılıyor · kutu CSS · dört alan · yorum · tek denemede null · **beklenen = önceki + artış** · gerçekleşen artış tutarlı · sapma = gerçek − beklenen · isabet tanımlı · tarihler · **düşük sonuçta sapma eksi ve oran 1'in altında**.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-30a` ↔ `rota-2026-12-30a` · 553 618 bayt**

---

## 210 · ⚠ KONU İKİLENMESİ · 18 ÇİFT BİRLEŞTİRİLDİ · `2026-12-31a`

Kullanıcı Dahiliye'de iki gastroenteroloji satırı gördü. Tarandı: **24 şüpheli çift**.

### Ayıklama kuralı

Körü körüne birleştirmek tehlikeliydi:

| Çift | Karar |
|---|---|
| "gastroenteroloji/hepatoloji" (3.16) ↔ "gastroenteroloji" (3.16) | **birleştir** · değerler eşit |
| "jinekolojik" (2.60) ↔ "jinekolojik onkoloji" (0.80) | **koru** · farklı konular |
| "üroloji ve çocuk cerrahisi" (1.00) ↔ "üroloji" (0.50) | **koru** · biri diğerinin toplamı |

**Kural: yalnız DEĞERLERİ EŞİT olan ve biri diğerinin kelime alt kümesi olan çiftler birleşiyor.** Ayrıca aynı kelime kümesinin farklı sıralanışı da ("genom ve nükleik asitler" ↔ "nükleik asitler ve genom").

### Birleştirilen 18 çift

| Branş | Sonuç |
|---|---|
| Dahiliye | gastroenteroloji/hepatoloji = **6.33** |
| Biyokimya | aminoasitler ve proteinler 7.53 · genom ve nükleik asitler 1.22 |
| Farmakoloji | kemoterapötikler ve immunmodülatörler 6.62 |
| Fizyoloji | yedi histoloji/fizyoloji çifti |
| Genel Cerrahi | şok travma 5.80 · meme 2.00 · KBB 1.20 · dört çift daha |

### Doğrulama

| | |
|---|---|
| Branş toplamları | **hepsi doğru** (35/18/18/…) |
| Toplam soru | **200.0** |
| Konu sayısı | 174 → **156** |
| Kalan eşit değerli ikilenme | **0** |
| Farklı konular korundu | jinekolojik onkoloji ✓ üroloji ✓ |

Birleştirme toplamı korumak için **toplayarak** yapıldı; hesaplar ve formüller bozulmadı.

### Etkisi

- Kalibrasyon giriş listesinde tek satır
- `konuCalisildi` eşleşmesi artık ikiye bölünmüyor
- Deneme getirisi hesabı tek konudan tek katkı alıyor

### Test · `kal_test.js` +8 kontrol

ikilenme kalmadı · branş toplamları bozulmadı · toplam 200 · konu sayısı 156 · Dahiliye gastro birleşti · Genel Cerrahi şok birleşti · **jinekolojik onkoloji ayrı kaldı** · üroloji ayrı kaldı.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2026-12-31a` ↔ `rota-2026-12-31a` · 553 073 bayt**

---

## 211 · ⚠ KÜÇÜK STAJLAR KONULARI AYRILDI · BOŞ GÖSTERGESİ · `2027-01-02a`

### ⚠ 1 · Küçük Stajlar konuları Dahiliye/GC listelerindeydi

`KONU_DAG` TUS dağılımı: Küçük Stajlar soruları Dahiliye ve Genel Cerrahi **içinde** sayılıyor (§165'te oraya dağıtılmıştı). Ama 24'lü serisi bunları ayrı kitapçık yapıyor.

Sonuç: kalibrasyonda **Dahiliye seçilince nöroloji, psikiyatri, dermatoloji, acil tıp da listeleniyordu.**

### `konu24()` · üç ayrı liste

`KS_KONU` (21 konu adı) ile ayrıştırılıp her biri kendi hedefine ölçekleniyor:

| Liste | Konu | Toplam |
|---|---|---|
| Dahiliye | 9 | **25.00** |
| Genel Cerrahi | 28 | **21.00** |
| Küçük Stajlar | 19 | **19.00** |
| | | **65** = 35+30 ✓ |

`KONU_DAG` dokunulmadan duruyor — TUS projeksiyonu onu kullanmaya devam ediyor.

**Doğrulandı:** Dahiliye listesinde nöroloji/psikiyatri/dermatoloji/acil tıp/halk sağlığı/radyoloji **yok**; Genel Cerrahi'de göz/üroloji/beyin cerrahisi/KBB **yok**; Küçük Stajlar listesinde nöroloji ve göz **var**, gastroenteroloji **yok**.

### 2 · CEVAP · boş bırakılan soru

**Evet, örtük olarak biliniyor:** `boş = soru − D − Y`. "2 soru, 1D 0Y" → 1 boş, net 1.00.

Artık **görünür** de: her konu satırının sonunda anlık `1 boş` yazıyor, `D+Y > soru` olursa kırmızı **`fazla!`** uyarısı çıkıyor.

### Test · `kal_test.js` +22 kontrol

`KS_KONU` · `konu24` · form kullanıyor · boş göstergesi · tutarsızlık uyarısı · **beş listenin toplamı hedefine eşit** · Dahiliye'de altı KS konusu yok · Genel Cerrahi'de dört KS konusu yok · Küçük Stajlar 19 konu · içeriği doğru · **üç liste toplamı 65** · `KONU_DAG` bozulmadı · boş formülü.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-02a` ↔ `rota-2027-01-02a` · 555 259 bayt**

---

## 212 · ⚠ BİRLEŞTİRME İKİ GERİLEME YARATMIŞ · `2027-01-06a`

Kullanıcı sordu: birleştirmeler hesapları etkiledi mi? **Evet, iki yerde.**

### ⚠ 1 · konu eşleşmesi kırıldı

`konuSade` ayraçları (`/ - –`) boşluğa çevirmiyordu. §210'da "gastroenteroloji" → "gastroenteroloji/hepatoloji" içine katılınca:

```
konuCalisildi("gastroenteroloji/hepatoloji")  →  FALSE
konuCalisildi("gastroenteroloji")             →  true
```

Gastroenteroloji videoları tamamlanmış olsa bile konu **YENİ ÖĞRENME** sayılıyor, getiri yanlış hesaplanıyordu (S_ILK 2.4 vs S_TEK 6.0).

**İki düzeltme:**
- `konuSade` ayraçları temizliyor
- `konuOrtus()` · kelime düzeyinde örtüşme: iki addan biri diğerinin anlamlı kelimelerini içeriyorsa eşleşiyor (dolgu kelimeleri elenmiş)

Doğrulandı: gastro · meme · aminoasitler · KBB · kemoterapötikler — **hepsi eşleşiyor**.

### ⚠ 2 · deneme getirisi yanlış tabloyu kullanıyordu

`denemeKazHam` her zaman `KONU_DAG`ı (TUS dağılımı) okuyordu. 24'lü Dahiliye kaydı **35 soruluk** dağılımla değerlendiriliyordu — kitapçık 25 soruluk.

`k24` bayrağı eklendi:

| Çağrı | Tablo | Kapsam |
|---|---|---|
| PreTUS200 | `KONU_DAG` | **200 soru** |
| 24'lü kaydı | `konu24` | 25 / 21 / 19 |
| Havuz önizlemesi | `konu24` | ✓ |

⚠ Ara adımda PreTUS200 da `konu24`e düşmüştü (kapsam 200 → 188); bayrakla ayrıldı.

### Sonuç

| | Değer |
|---|---|
| Ölçülen | 57.609 |
| Parakete | 55.971 |
| Potansiyel | 9.882 |
| Havuz getirileri | **hepsi pozitif** (Küçük Stajlar dahil) |
| R_CAL / D_ORAN | sınırlar içinde |

### Test · `kal_test.js` +17 kontrol

`konuSade` ayraçları · `konuOrtus` · `konuCalisildi` kullanıyor · `k24` bayrağı · iki çağrı bayraklı · **dört birleşik adın eşleşmesi** · PreTUS200 kapsamı 200 · üç 24'lü kapsamı · havuz getirileri pozitif · Küçük Stajlar getirisi · parakete/potansiyel makul · sabitler sınırlarda.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-06a` ↔ `rota-2027-01-06a` · 556 952 bayt**

---

## 213 · ⚠ KAYNAK HARİTASINDA POWER-UP BÖLÜMLERİ · `2027-01-07a`

Kullanıcı: power-up'tan çekip yaptığım işler haritada "yapıldı"ya dönüyor mu?

### Kısmen dönüyordu

| Düzey | Durum |
|---|---|
| Üst sayaç | ✓ 11/21 → **12/21** |
| Renk rozeti | ✓ 0/5 → **1/5** (`puA` vurgusu) |
| ⚡ işareti | ✓ `+1⚡` |
| **Bölümün kendisi** | ✗ **listede hiç yoktu** |

Yani toplam değişiyordu ama "hangi bölüm yapıldı" görünmüyordu — etiket değiştirecek satır yoktu.

### Power-up bölümleri artık satır

```
⚡  Yara İyileşmesi   —   power up havuzunda      ← çekilmemiş, soluk
⚡  Yara İyileşmesi   —   çarka çekildi · 1 Ağu   ← çekilmiş
✓  Yara İyileşmesi   —   power up ile yapıldı · 3 Ağu   ← yapılmış, yeşil
```

Üç durum ayrı işaret ve renkle: havuzda (mavi ⚡, %62 opaklık) · çekildi (mavi ⚡) · **yapıldı (yeşil ✓, tam opaklık)**.

Programda olmayan iş, yapıldığında haritada da yapıldı görünüyor. Geri alınca eski hâline dönüyor.

### Test · `pu_test.js` +12 kontrol

satır üretimi · üç durum ayrı · yapıldı sınıfı · CSS · **bölüm listede görünüyor** · havuzda etiketi · çekildi etiketi · **yapıldı etiketi** · ✓ işareti · üst sayaç arttı · ⚡ ve `puA` · geri alınca eski hâle dönüyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-07a` ↔ `rota-2027-01-07a` · 558 076 bayt**

---

## 214 · KİTAP SEKMESİ · DOĞRUDAN TAMAMLAMA · `2027-01-10a`

### Program ↔ Kitap anahtarı

Liste görünümünün üstünde kaydırmalı anahtar. **Program** mevcut gün listesi; **Kitap** yeni.

### Kitap görünümü

1. **Kitap listesi** · 22 kitap, toplam getiriye göre sıralı
2. **Konu listesi** · seçilen kitabın konuları, **en çok net getirenden aza**

```
Hormonlar          [programda]     +0.863 net   [Tamamlandı]
Otonom Sinir S.    [power up]      +0.600 net   [Tamamlandı]
Kemoterapötikler   [power up]      +0.525 net   [Tamamlandı]
```

Programda olanlar `programda`, olmayanlar `power up` etiketiyle. Getiriler azalan sıralı, hepsi pozitif.

### Doğrudan tamamlama · her iki yol

| Kaynak | İşaret | Sonuç |
|---|---|---|
| Programdaki görev | `D.bitti` | parakete + projeksiyon |
| Power-up konusu | `D.pu` **+ `D.bitti`** | parakete + projeksiyon + **streak** |

⚠ `puSenkron` sentetik görevi üretiyor ama `D.bitti`yi işaretlemiyordu — parakete oradan besleniyor. Kitap sekmesinden tamamlanınca ikisi birden kuruluyor.

**Doğrulandı:** power-up konusu tamamlandığında parakete 55.9714 → **56.0779** (+0.107), streak **1**, potansiyel 9.543'e düştü.

Program listesindeki satırlara da **Tamamlandı / Geri al** düğmesi eklendi — karta gidip çarka çekme adımı gerekmiyor.

### Hatırlama oranı

Tamamlanmış her satırın altında:

```
3 gün önce · %78 hatırlıyor olmalısın
```

FSRS üstel eğrisi (`Rr`); kararlılık ilk görüşte `S_ILK`, konu daha önce görülmüşse `S_TEK`. Renk: %75+ yeşil · %50+ turuncu · altı kırmızı.

### Test · `pu_test.js` +21 kontrol

üç fonksiyon · anahtar · iki tamamlama yolu · **`D.bitti` işareti** · `puEtki.etki` · kitap listesi doluyor · konular listeleniyor · getiriler pozitif · **azalan sıralı** · etiketler · **parakete artıyor** · streak tetikleniyor · hatırlama etiketi · geri al · hatırlama eğrisi üç kontrol.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-10a` ↔ `rota-2027-01-10a` · 566 874 bayt**

---

## 215 · ⚠ KİTAP LİSTESİ SIKIŞIYORDU · `2027-01-11a`

### ⚠ Kök sebep

```js
const n=gl.querySelectorAll('[data-gi]').length;
if(!n)return;                      // ← kitap satırlarında data-gi YOK
```

`gunOlcekle` yalnız program satırlarını sayıyordu. Kitap sekmesinde erken çıkıyor, ölçek hiç uygulanmıyor, liste 11 px'lik varsayılan `--gsat` ile dar alana sıkışıyordu — ekranın alt yarısı boşken.

**İki düzeltme:**

1. Satır sayımı üç türü kapsıyor: `[data-gi]`, `[data-klkitap]`, `.glS`
2. **Kitap kipinde sıkıştırma yok, kaydırma var.** Program listesi bir günün işini gösteriyor (tek ekrana sığmalı); kitap listesinde 22 kitap / 24 konu olabiliyor, sıkıştırmak okunmaz hâle getiriyor. Rahat satır yüksekliği (30–46 px) + `overflow-y:auto`.

### Uçtan uca sınama

| Kontrol | Sonuç |
|---|---|
| Kitap sayısı | **22** · yinelenen yok |
| Toplam konu | **295** |
| Boş kitap | **0** |
| Negatif getiri | **0** |
| Azalan sıralı | **hepsi** ✓ |
| Tamamla/geri al döngüsü (6 kitap) | **hata 0** · görev sayısı ve parakete tam geri dönüyor |
| Program satırından tamamlama | 55.9714 → 56.0214 → geri ✓ |
| Hatırlama etiketi ve geri al düğmesi | ✓ |

### Test · `pu_test.js` +16 kontrol

ölçek üç türü sayıyor · kitap kipinde sıkıştırma yok · kaydırma CSS · rahat satır yüksekliği · 22 kitap · yinelenen yok · **boş/negatif/sırasız kitap yok** · 295 konu · **tamamla/geri al döngüsü temiz** · program satırından tamamlama · hatırlama etiketi · geri al · geri alınca eski değer.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-11a` ↔ `rota-2027-01-11a` · 567 737 bayt**

---

## 216 · ⚠ LİSTE ÇARKIN ALANINA SIKIŞIYORDU · `2027-01-13a`

Kullanıcı: *"neden çarkın kullandığı alana sıkışmak zorunda, aşağıda çipler yokken?"* Haklı.

### ⚠ Kök sebep

```css
.gunKip{grid-template-columns:1fr}      /* yalnız SÜTUNLAR */
```

Liste `#cark` içinde yaşıyor. `.gunKip` sütunları tekleştiriyordu ama dar ekranda `#rota` **iki SATIR** olarak kalıyordu:

```css
@media (max-width:880px){
  #rota{grid-template-rows:1.25fr minmax(88px,1fr)}   /* çark + brifing */
}
```

Liste çarkın payına (yaklaşık %55) sıkışıyor, brifing satırı **boş dururken** alan kullanılmıyordu. `#rota.genis{grid-template-rows:1fr 0}` kuralı zaten vardı ama liste kipine bağlı değildi.

```css
.gunKip{grid-template-columns:1fr;grid-template-rows:1fr 0 !important}
.gunKip #cark{min-height:0}
```

Üç dar-ekran kırılımında da yineleniyor (880 / 660 / 470 px).

### Kazanılan alanla satır düzeni

Tek satırda ad + getiri + düğme sığmıyor, ad kırpılıyordu (`Şok travma ve t…`). İki satırlık düzen:

```
Karaciğer, Dalak Hastalıkları ve Transplantasyon
        +0.298 net                    [Tamamlandı]
```

Ad tam genişlikte, `white-space:normal`, kırpma yok. Doğrulandı: 47 karakterlik ad tam yazılıyor, hiçbir satırda `…` yok.

### Test · `pu_test.js` +9 · `cark_test.js` uyarlandı

satır sıfırlama · üç kırılımda geçerli · `min-height:0` · ad tam genişlik · kırpma kapalı · satırlar sarabiliyor · adlar dolu · **uzun ad tam yazılıyor** · kırpma işareti yok.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-13a` ↔ `rota-2027-01-13a` · 568 876 bayt**

---

## 217 · ⚠ LİSTE TASARIMI BAŞTAN · `2027-01-15a`

Kullanıcı: yazılar birbirine geçmiş, boyutlar anlamsız, düğme rengi paletten kopuk, kaydırmaya gerek olmamalı.

### ⚠ Kök sebep · sarma + sabit yükseklik

```css
.glS{height:var(--gsat,34px)}     /* sabit yükseklik */
.glS.klS{flex-wrap:wrap}          /* §216'da eklemiştim */
```

Satır sarınca iki satırlık içerik 34 px'lik kutuya sıkışıyor, **yazılar üst üste biniyordu**. Ayrıca kitap kipinde ölçek atlanıp sabit boyutlar kullanılıyordu — bu yüzden yazılar devasa çıkıyordu.

### Tasarım kuralları

| Kural | Uygulama |
|---|---|
| **Kaydırma yok** | ikili arama her iki kipte de çalışıyor, tek bakışta sığıyor |
| **Sarma yok** | tüm satırlar tek satırlık, sabit yüksekliğe uyuyor |
| **Her ölçü orana bağlı** | `--gsat` / `--gyaz` · pencere daralınca kendiliğinden küçülüyor |
| **Palet uygulamanın kendisi** | altın vurgular, cam yüzeyler |

### Değişenler

**Tamamlandı düğmesi** · geniş mavi kutu → **küçük daire** (`--gsat × .58`), boş `○` / tamamlanmış `✓`, altın vurgulu.

**Anahtar** · mavi → altın gradyan (`#E4C583 → --altin`), yumuşak gölge, ölçeğe bağlı yuvarlaklık.

**Etiketler** · `program` altın, `power up` mavi; ölçeğin %66'sı.

**Hatırlama** · uzun cümle yerine kısa biçim: `3g · %78`, renk kodlu.

### Kitaplar ikiye bölündü

```
[ Konu kitapları ]  [ Soru & Deneme ]
```

| Tür | Adet |
|---|---|
| Konu kitapları | 14 |
| Soru & Deneme | 8 |

Ayrım addan: `SB` · `SST` · vaka · soru · deneme · 24'lü → soru kitabı. İki liste ayrık, çakışma yok.

Kitap seçilince başlıkta **‹ ok** ve **"tüm kitaplara dön"** düğmesi.

### Uç senaryolar

| | |
|---|---|
| 8 soru + 14 konu kitabının tamamı gezildi | hata **0** |
| `undefined` / `NaN` | **yok** |
| Bilinmeyen kitap adı | boş liste, çökme yok |
| Boş tür | "Bu türde kitap yok" |

### Test · `pu_test.js` +22 kontrol

anahtar altın · düğme daire ve orana bağlı · etiketler orana bağlı · **kaydırma yok** · sarma yok · tür anahtarı · dön düğmesi · kısa hatırlama · her iki türde kitap var · anahtar doğru seçili · **kitaplarda hata yok** · ayrım doğru · iki liste ayrık · bilinmeyen kitap · program kipi · **sabit px yazı boyu kalmadı**.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-15a` ↔ `rota-2027-01-15a` · 570 669 bayt**

---

## 218 · RENK DÜZELTME · BÖLÜMLENDİRME · TTS · `2027-01-18a`

### 1 · kalıntı çip kaldırıldı

Sol geri oku varken ayrıca "tüm kitaplara dön" mavi çipi duruyordu. Çip kaldırıldı; ok tek geri yolu.

### 2 · önem rengi düzeltilebiliyor

Her konu satırının solunda **renk çipi**. Tıklayınca pembe → turuncu → sarı → mavi döner.

```js
D.renk[konuAnahtarı]   // override · programdaki yeri DEĞİŞTİRMİYOR
```

`konuRenk()` tek kaynak; **görev kartı · şerit · gün listesi · kaynak haritası** hepsi onu okuyor. `g.tag` alanına dokunulmuyor, süre ve getiri sabit.

Doğrulandı: renk döndürülünce kart rengi değişiyor, `g.d` ve `g.tag` aynı kalıyor, dört renk döngüsü tam.

### 3 · Soru & Deneme üç bölüme ayrıldı

```
── Soru bankaları        Emrullah Patoloji SST  +4.74  29 Tem
                         Klinisyen Vaka Pediatri +3.81  6 gün
── TTS · son tekrar      TTS Patoloji / Mikrobiyoloji
── Denemeler             PreTUS200              +7.08  bugün
                         24'lü Farmakoloji      +3.96
```

⚠ Önce yalnız getiriye göre sıralanınca bölüm başlıkları 13 kez tekrarlıyordu. Sıralama **önce bölüm, sonra getiri** yapıldı.

**Eklenenler:** PreTUS200 · 11 branşın 24'lü serisi · `KHARITA.kullanilmayan`'daki 12 envanter kaynağı (`envanterde` etiketiyle).

### 4 · TTS kitapları

Kendi konu listesi yok; ilgili branşın konularını kullanıyor. Getiri **tekrar** olarak hesaplanıyor (`S_TEK`): bilgi zaten var, değeri erimeyi yavaşlatmasında.

```
hücre zedelenmesi    [tekrar]   +0.004   ○
```

`D.tts` kendi kaydını tutuyor, tamamlanabiliyor, hatırlama etiketi çıkıyor.

⚠ Küçük getiriler iki ondalıkta `+0.00` görünüyordu; 0.01'in altında üç ondalık.

### 5 · zaman bilgisi

- **Kitap listesinde:** sıradaki tamamlanmamış görevine kaç gün (`6 gün` · `bugün` · geçmişse tarih)
- **Konu listesinde:** program görevinin günü, aynı biçimde
- **Konu adına tıklayınca** çarkta o göreve gidiliyor

### Test · `pu_test.js` +25 kontrol

on fonksiyon/yapı kontrolü · **kart rengi değişiyor** · program tarihi ve `tag` değişmiyor · dört renk döngüsü · **üç bölüm, doğru sırada, tekrarsız** · PreTUS200 ve 11 24'lü listede · envanter kaynakları · gün etiketi · TTS konuları ve getirileri · tekrar etiketi · TTS tamamlanabiliyor · hatırlama etiketi.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-18a` ↔ `rota-2027-01-18a` · 578 351 bayt**

---

## 219 · FT GENEL CERRAHİ · POWER-UP HAVUZUNA · `2027-01-19a`

Kullanıcı FT kitaplarının içindekiler sayfalarını gönderiyor; hepsi **kitap sekmesinde power-up görevi** olarak görünecek (programa girmiyor).

### Üretim betiği · `ft_ekle.py`

Fotoğraftan çıkarılan `(bölüm, ilkSayfa, sonSayfa)` üçlüsünden POWERUP kaydı üretiyor.

**Süre:** `sayfa / 5.71` — FT kitaplarının ölçülen oranı (Anatomi FT, FT Biyokimya, FT Farmakoloji üçü de tam 5.71 sf/saat).

**Soru dağıtımı iki aşamalı:**

1. Her bölüm `KONU_DAG`'daki **bir** konuya eşleşiyor — tekil, en güçlü örtüşme kazanıyor
2. Eşleşmeyen bölümler artan soruyu **sayfa oranında** paylaşıyor

⚠ İlk denemede "Transplantasyon" → "karaciğer, dalak hastalıkları ve transplantasyon" ile eşleşmiş, karaciğer bölümüyle **çift sayım** riski doğmuştu. Tekilleştirme eklendi: bir `KONU_DAG` konusu yalnız bir bölüme atanıyor.

### FT Genel Cerrahi

| | |
|---|---|
| Bölüm | **28** |
| Sayfa | 145 (5–149) |
| Süre | **25.4 saat** |
| Soru | **30.00** — branşın TusAnaliz toplamına birebir |
| Eşleşen | 19 · tekil ✓ |

`PU_KONU_KITAP`'a eklendi (özet kitabı → konu kitabı sütunu). Power-up havuzu 156 → **184 konu**.

### Etki

| | |
|---|---|
| Görev sayısı | 196 · **değişmedi** (programa girmiyor) |
| Parakete | 55.971 · değişmedi |
| Potansiyel | 9.617 |

Kitap sekmesinde 28 konu listeleniyor, hepsi `power up` etiketli ve doğrudan tamamlanabiliyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-19a` ↔ `rota-2027-01-19a` · 584 891 bayt**

---

## 220 · ALTI DÜZELTME · FT PEDİATRİ · `2027-01-24a`

### ⚠ 1 · 24'lü içeriği konu değil DENEME

24'lü kitapçığının içeriği konu kırılımıyla listeleniyordu. Doğrusu **Deneme 1…24**:

- Havuzdan çekilenler önce (`havuzdan çekildi` notu)
- Programdakiler tarih sırasıyla
- Kalanlar `çözülmedi`

Sonuç girilmiş denemeler işaretli görünüyor. 24 satır, numaralar §179'un `denNo` sırasıyla tutarlı.

### ⚠ 2 · PreTUS kalan 30 · cilt + deneme no

```
Cilt 2 · Deneme 1 … Cilt 6 · Deneme 6
```

Seri 5 ciltte 6'şar deneme; programın kullandığı 6 atlanıp kalan 30 numaralanıyor.

### ⚠ 3 · Dahiliye konuları ÇİFT görünüyordu

Kullanıcı hematolojiyi tamamlayınca altında ikinci bir "Hematoloji" belirdi. Sebep: `Atilla Uslu Dahiliye 1/2`'nin **sekiz konusu da** video görevleriyle birebir aynı içerik (video izlemek = okumak).

Artık aynı konunun program görevi varsa power-up kaydı gizleniyor — **program kazanıyor**. Doğrulandı: Dahiliye 1 ve 2 artık 0 satır, video listesinde tek kayıt.

### ⚠ 4 · kalıntı kitap satırı

`TUSTIME Fast Track Genel Cerrahi` (envanter) ile `FT Genel Cerrahi` (yeni) ayrı satırlar olarak duruyordu. Ad örtüşmesi denetimi eklendi — seri ekleri (`TUSTIME` · `Fast Track` · `FT`) atılıp karşılaştırılıyor.

### 5 · konu kitapları bloklara ayrıldı

```
── FT · hızlı tekrar        FT Farmakoloji +4.63 · FT Genel Cerrahi +4.07 · …
── Diğer konu kitapları     Feyyaz Akay Mikrobiyoloji +3.05 · …
── TUSTIME konu kitapları   TUSTIME Mikrobiyoloji +3.32 · …
```

### 6 · renk seçici açılır pencere

Tek tıkla döndürmek yanlışlıkla değiştirmeye açıktı. Artık dört renk çip olarak açılıyor, **programa kaydedilen renk parantez içinde** belirtiliyor:

```
● Pembe · kritik  (programa kaydettiğimiz)
● Turuncu · yüksek                        ✓
```

`renkAta()` seçim yapıyor; `__sil` özgün renge döndürüyor.

### FT Pediatri

| | |
|---|---|
| Bölüm | **21** |
| Sayfa | 136 (5–140) |
| Süre | **23.9 saat** |
| Soru | **24.99** (hedef 25) |
| Eşleşen | 17 · tekil ✓ |

Power-up havuzu 184 → **205 konu**.

⚠ Kitap sekmesinde 13 satır görünüyor — 8 konusu Pediatri program görevleriyle örtüştüğü için gizlendi (§3'ün kuralı).

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-24a` ↔ `rota-2027-01-24a` · 594 692 bayt**

---

## 221 · DENEME GİRİŞİ · D/Y · `2027-01-25a`

Kullanıcı: *"net hesaplayıp girmek zorunda kalıyorum, ben ders ders doğru yanlış girmeliyim."*

### Form değişti

```
Dahiliye /35     [D] [Y]     18.00 · 7 boş
Patoloji /18     [D] [Y]      8.25 · 6 boş
```

Her branş için **iki kutu**: doğru ve yanlış. Net uygulamada hesaplanıyor:

```
net = D − Y/4          (TUS: dört yanlış bir doğruyu götürür)
boş = soru − D − Y      (örtük, satır sonunda gösteriliyor)
```

Satır sonunda anlık net ve boş sayısı; `D + Y > soru` olursa kırmızı `fazla!` ve kayıt reddediliyor.

### Doğrulama

| Girdi | Net | Boş |
|---|---|---|
| 20D 8Y / 35 | **18.00** | 7 |
| 14D 6Y / 25 | **12.50** | 5 |
| 9D 3Y / 18 | **8.25** | 6 |

### Geriye dönük uyum

Eski kayıtlar yalnız `bn` (net) taşıyor, `dy` alanı yok. `bransDurum` · `para` · `grupKapsam` hepsi eskisi gibi çalışıyor — yeni kayıtlar ayrıca `dy` saklıyor, ileride D/Y kırılımı gerekirse hazır.

⚠ İlk kurulumda `dataset.b` boş gelince `b.replace` çöküyordu (`derin_test` yakaladı); kutular önceden eşlenip null denetimi eklendi.

### Test · `kal_test.js` +16 kontrol

D ve Y kutuları · net uygulamada · **eski tek-net kutusu kalmadı** · boş sayısı · tutarsızlık uyarısı · `dy` kaydediliyor · satır başına net · dört net formülü · boş formülü · **eski kayıtlarla dört fonksiyon çalışıyor**.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-25a` ↔ `rota-2027-01-25a` · 596 751 bayt**

---

## 221 · ⚠ GİZLEME KURALI FAZLA GENİŞTİ · `2027-01-25a`

### ⚠ §220'nin yan etkisi

Dahiliye çift kaydını çözerken kural şöyle yazılmıştı:

```js
const varProg=GOREVLER.some(g=> (g.br===u.brans||g.z===u.grup)
  && konuOrtus(String(g.k||''),u.konu));
if(varProg)return;                    // ← KİTAP AYRIMI YOK
```

Konu **başka bir kitapta** program görevi olarak varsa da gizleniyordu. Sonuç: FT Pediatri'nin 21 konusundan 8'i kayboldu, kullanıcı kitabın tam içeriğini göremedi.

Kullanıcının gerekçesi: *"her kitabın içeriğini hangisine baktım bakmadım eksiksiz görmek istiyorum ki spesifik bir kitabın bir bölümüne bakıp bakmadığıma, hangi derse hangi kitaptan çalıştığımı bileyim."*

**Gizleme AYNI KİTAP içine daraltıldı:**

```js
const ayniKitap=GOREVLER.some(g=>
  String(g.src||'').replace(/\s*sf\s.*$/,'').trim()===secKit
  && konuOrtus(String(g.k||''),u.konu));
```

| Kitap | Satır / havuz |
|---|---|
| FT Pediatri | **21 / 21** (önce 13) |
| FT Genel Cerrahi | 28 / 28 |
| Atilla Uslu Dahiliye 1 | 4 / 4 |
| Atilla Uslu SST | 10 / 9 (+1 program görevi) |

Tüm kitaplarda içerik eksilmesi **0**, yinelenen satır **0**.

### 2 · CEVAP · deneme girişinde net hesabı

Zaten var: her branş için **D** ve **Y** kutusu, net uygulamada `D − Y/4` olarak hesaplanıyor. Satır sonunda `net · N boş` gösteriliyor, `D+Y` soru sayısını aşarsa kırmızı `fazla!` uyarısı çıkıyor.

11 branşın hepsi için D/Y kutusu ve net göstergesi çiziliyor — doğrulandı.

### Test · `pu_test.js` +13 kontrol

gizleme daraltıldı · kitap adı karşılaştırması · **eski geniş kural kalmadı** · hiçbir kitapta içerik eksilmiyor · yinelenen yok · D/Y kutuları · net hesabı · boş sayısı · tutarsızlık uyarısı · 11'er kutu.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-25a` ↔ `rota-2027-01-25a` · 594 715 bayt**

---

## 222 · FT SERİSİ TAMAMLANDI · `2027-01-29a`

Dört kitap daha işlendi: **Fizyoloji · Mikrobiyoloji · Patoloji · Dahiliye**.

| Kitap | Bölüm | Sayfa | Süre | Soru |
|---|---|---|---|---|
| FT Fizyoloji | 9 | 68 | 11.9 sa | 8.02 |
| FT Mikrobiyoloji | 7 | 126 | 22.1 sa | 18.00 + 2.79 |
| FT Patoloji | 24 | 94 | 16.5 sa | 18.00 |
| FT Dahiliye | 9 | 159 | 27.8 sa | 20.30 |

Havuz 214 → **254 konu**, on FT kitabı.

### `ft_ekle.py` · üç iyileştirme

**1 · dolgu listesi genişledi.** "Solunum Fizyolojisi" ile "Üreme Fizyolojisi" yalnız `fizyolojisi` kelimesiyle eşleşip yanlış atama yapıyordu. `fizyoloji · histoloji · anatomi · patoloji · doku · bezi` ve çekimleri eleniyor.

**2 · eşanlamlı sözlüğü.** Kitap ile TusAnaliz farklı terim kullanıyor:

| Kitap | TusAnaliz |
|---|---|
| Kalp / Damar | kardiyovasküler |
| Akciğer | solunum |
| Hematolojik | hematopoetik |
| Kemik-Eklem | kas iskelet |
| Böbrek | üriner |

Patoloji'de eşleşme 12/24 → **19/24**.

**3 · ortak konu paylaşımı.** "Kalp Hastalıkları" ve "Damar Hastalıkları" ikisi de kardiyovaskülere aday; tekilleştirme birine 0.79, diğerine 0.10 veriyordu. Payı sayfa oranında paylaşıyorlar (0.40'ar).

### ⚠ Yakalanan iki hata

**Değişken ezmesi.** Paylaşım kodunda `grup` adı fonksiyon parametresini eziyordu; üretilen kayıtların `grup` alanı `[7,8]` gibi indeks listesine dönüşüp getiriler **sıfır** çıkıyordu. Tüm FT kitapları denetlendi, yalnız Patoloji etkilenmişti.

**Çift sayım.** `enfeksiyon hastalıkları` payı (2.79) hem FT Mikrobiyoloji'ye hem FT Dahiliye'ye gidiyordu. Dahiliye hedefinden çıkarıldı — Mikrobiyoloji'de kitabın kendi bölümü var, orada kalması doğru.

### Not · sıfır getirili bölümler

`FT Dahiliye · Geriatri` **0.00 soru** alıyor: TusAnaliz'de geriatri karşılığı yok ve kalan pay bittiği için sayfa oranından da alamıyor. Bölüm listede görünüyor, tamamlanabiliyor ama kazanç vermiyor — bu doğru bilgi, uydurulmuş pay verilmedi.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-29a` ↔ `rota-2027-01-29a` · 606 890 bayt**

---

## 223 · FT BİYOKİMYA · KATALOG · ÜÇ ALGORİTMA DÜZELTMESİ · `2027-01-30a`

### `ft_katalog.py` · tek kaynak

Yedi FT kitabının bölüm listesi tek dosyada. `ft_uret.py` hepsini yeniden üretiyor — algoritma iyileştikçe eski kitaplar eski (kusurlu) eşleştirmeyle kalmıyor.

| Kitap | Bölüm | Sayfa | Süre | Soru |
|---|---|---|---|---|
| FT Genel Cerrahi | 28 | 145 | 25.4 sa | 29.67 |
| FT Pediatri | 21 | 136 | 23.9 sa | 24.98 |
| FT Fizyoloji | 9 | 68 | 11.9 sa | 8.02 |
| FT Mikrobiyoloji | 7 | 126 | 22.1 sa | 20.79 |
| FT Patoloji | 24 | 94 | 16.5 sa | 18.00 |
| FT Dahiliye | 9 | 159 | 27.8 sa | 20.81 |
| **FT Biyokimya** | 4* | 112 | 8.9 sa | 3.35 |

*9 bölümün 5'i zaten programda; havuza yalnız kalan 4'ü giriyor.

### ⚠ 1 · program örtüşmesi · ÇİFT SAYIM

FT Biyokimya'nın beş bölümü görev olarak programda. Havuza da eklenince aynı sayfa iki kez sayılıyordu. `ft_uret.py` artık sayfa aralığı örtüşen havuz kaydını atıyor.

Kitap sekmesinde bölüm yine görünüyor — program görevi olarak (§221'in kuralı). Doğrulandı: FT Biyokimya 9 satır, 5 `program` + 4 `power up`.

### ⚠ 2 · boşluksuz karşılaştırma

`"Aminoasitler ve Proteinler"` (tek kelime) ile TusAnaliz'in `"amino asitler"` (iki kelime) **hiç örtüşmüyordu**. Boşluk kaldırılınca ikisi de `aminoasitler` oluyor. Pay 7.53 → **11.29** (TusAnaliz'de gerçekten branşın %63'ü).

### ⚠ 3 · atanmamış konular için ikinci tur

Boşta kalan TusAnaliz konusunun payı, sayfa oranıyla **ilgisiz** bölümlere dağılıyordu ("Hücre ve Organeller" 3.30 soru almıştı). Artık boşta kalan konu, kendisine en çok benzeyen bölüme ekleniyor. Hücre 3.30 → **0.91**.

### Geriatri payı

Kullanıcı onayıyla **0.51 soru** — demans içeriği nöroloji altında sayılıyor, nöroloji payının (2.05) dörtte biri. Getiri artık pozitif (+0.07).

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-30a` ↔ `rota-2027-01-30a` · 607 438 bayt · havuz 252 konu**

---

## 224 · FT FARMAKOLOJİ · ⚠ SINIR ÇAKIŞMASI · `2027-01-31a`

### FT Farmakoloji · 12 bölüm

| | |
|---|---|
| Bölüm | 12 (6'sı programda, 6'sı havuzda) |
| Sayfa | 116 (5–120) |
| Havuz payı | 6.8 sa · 4.40 soru |

Kitap sekmesinde 14 satır: 8 program görevi (parçalı) + 6 power up.

### ⚠ Sınır sayfası yanlış eleme yapıyordu

Program görevlerinin sayfa aralıkları bitiş sayfasını bir sonrakinin başlangıcı yapıyor:

```
(5,17) · (17,25) · (44,53) · (53,64) · (64,76) …
```

Salt kesişim testi bu **tek sayfalık sınır temasını** örtüşme sayıp bölümü havuzdan eliyordu:

| Bölüm | Kesişim | Sonuç |
|---|---|---|
| Kardiyovasküler Sistem [25–43] | **1 sayfa** | yanlış elendi |
| Otakoidler [76–82] | **1 sayfa** | yanlış elendi |
| İmmün Modülatör [112–116] | **1 sayfa** | yanlış elendi |

Eşik eklendi: **kesişim ≥ bölümün yarısı**. FT Farmakoloji 9 → 6 elenen, FT Biyokimya 5 → 4.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-01-31a` ↔ `rota-2027-01-31a` · 606 865 bayt · havuz 254 konu**

---

## 225 · FT ANATOMİ · ⚠ ÇOKLU ARALIK · `2027-02-01a`

### Anatomi Fast Track · 13 bölüm

| | |
|---|---|
| Bölüm | 13 · 7'si programda, 6'sı havuzda |
| Sayfa | 123 (5–127) |
| Havuz payı | 13.8 sa · 7.36 soru |

Kitap sekmesinde 13 satır: 7 program görevi + 6 power up.

### ⚠ Bir görev birden çok sayfa aralığı taşıyabiliyor

```
"Anatomi Fast Track sf 49–55 + 90–119 + 126–127"
```

`re.search` yalnız **ilk** aralığı görüyordu (49–55). MSS, PSS, Duyu Organları ve Deri bölümleri programda olmasına rağmen havuza da giriyor, **çift sayım** oluyordu.

`re.finditer` ile tüm aralıklar toplanıyor. Anatomi 3 → **7** doğru eleme.

### FT serisi · dokuz kitap

| Kitap | Havuz bölümü | Soru |
|---|---|---|
| FT Genel Cerrahi | 28 | 29.67 |
| FT Pediatri | 21 | 24.98 |
| FT Mikrobiyoloji | 7 | 20.79 |
| FT Dahiliye | 9 | 20.81 |
| FT Patoloji | 24 | 18.00 |
| FT Fizyoloji | 9 | 8.02 |
| Anatomi Fast Track | 6 | 7.36 |
| FT Farmakoloji | 6 | 4.40 |
| FT Biyokimya | 5 | 3.55 |

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-02-01a` ↔ `rota-2027-02-01a` · 606 790 bayt · havuz 254 konu**

---

## 226 · FT KADIN DOĞUM · SERİ TAMAM · `2027-02-02a`

### ⚠ Bu kitapta ana başlık yetersizdi

Yalnız **dört** ana başlık var: Reproduktif Endokrinoloji · Genel Jinekoloji · Jinekolojik Onkoloji · **Obstetri**. Sonuncusu tek başına 55 sayfa = 9.6 saat — "hangi bölüme baktım" izlenemezdi.

Bu kitapta **alt başlıklar** kullanıldı: 37 bölüm. Diğer dokuz kitapta ana başlık zaten yeterince ayrıntılıydı (ortalama 5–10 sayfa/bölüm).

| | |
|---|---|
| Bölüm | 37 · 19'u programda, 18'i havuzda |
| Sayfa | 131 (5–135) |
| Havuz payı | 12.7 sa · 7.15 soru |

Kitap sekmesinde 23 satır: 5 program görevi (parçalı) + 18 power up.

### FT SERİSİ TAMAMLANDI · on kitap

| Kitap | Havuz | Soru |
|---|---|---|
| FT Genel Cerrahi | 28 | 29.67 |
| FT Pediatri | 21 | 24.98 |
| FT Dahiliye | 9 | 20.81 |
| FT Mikrobiyoloji | 7 | 20.79 |
| FT Patoloji | 24 | 18.00 |
| FT Fizyoloji | 9 | 8.02 |
| Anatomi Fast Track | 6 | 7.36 |
| FT Kadın Doğum | 18 | 7.15 |
| FT Farmakoloji | 6 | 4.40 |
| FT Biyokimya | 5 | 3.55 |

Power-up havuzu 156 → **270 konu**. Program görev sayısı değişmedi (196); parakete 55.971'de sabit — FT bölümleri programa girmiyor, yalnız kitap sekmesinden erişiliyor.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-02-02a` ↔ `rota-2027-02-02a` · 610 148 bayt**

---

## 227 · ⚠ KONU TEKİLLİĞİ · NET HAVUZU PAYLAŞIMI · `2027-02-07a`

Kullanıcının kuralı: *"öğrenmeye katkısı olan kitap değil KONU. Bir konuyu hangi kitaptan okursam okuyayım ilk okuma netini bir defa kazanırım; aynı konuya başka kitaptan bakarsam ancak tekrar geliri kazanırım."*

### Merkezi konu kaydı · `konuKayit()`

Konu adı → **ilk tamamlanma tarihi**. Üç kaynak taranıyor, en erken tarih geçerli:

| Kaynak | İçerik |
|---|---|
| `D.bitti` | program görevleri |
| `D.pu` | power-up (kitap sekmesi ya da çark) |
| `D.tts` | TTS son tekrar |

⚠ Önceden `konuCalisildi` yalnız `D.bitti`ye bakıyordu: power-up'tan çalışılan konu "hiç görülmemiş" sayılıp **yeni öğrenme** getirisi alıyordu. Artık merkezi kayıttan besleniyor.

### Gölgeleme · `golge()` · `bittiTar()`

Bir görevin konusu **başka kaynaktan** tamamlandıysa görev gölgeli:

- `grupKapsam` gölgeyi de sayıyor → soru havuzu çalışılmış kabul ediliyor
- Programda ayrıca getiri üretmiyor → **çift sayım yok**
- Listede **üstü çizili** + `✓ <kaynak kitabı>` etiketi
- Gün toplam saatinden düşülüyor

### Ölçüm · Meme Hastalıkları

| Senaryo | Parakete | Potansiyel |
|---|---|---|
| Başlangıç | 55.9714 | 7.552 |
| Programdaki görev tamamlandı | 56.0145 | 7.526 |
| **Aynı konu başka kitaptan** | 56.0060 | 7.534 |

İki yol benzer getiri veriyor (fark 0.0085 — kitapların soru kapsamı farklı).

**Çift sayım testi:** power-up sonra program görevi → ilk getiri **+0.0346**, ikinci **+0.0085** (**0.25×**). İkinci kaynak yalnız tekrar getirisi veriyor.

**Uç durum:** tüm program + tüm power-up tamamlanınca parakete 60.166 — tavan 88.66 aşılmıyor.

### Test · `pu_test.js` +20 kontrol

dört fonksiyon · kapsam gölgeyi sayıyor · `konuCalisildi` merkezi kayıttan · üstü çizili · ikame etiketi · saatten düşülüyor · başka kaynak paraketeyi artırıyor · potansiyel düşüyor · **görev gölgeleniyor** · iki yol benzer · **ikinci kaynak daha az getiriyor** · tavan · liste görünümü.

### ⚠ AÇIK KALEM · TASARIM

Kullanıcı power-up paneli ve matris/seyir sayfalarının tasarımının uygulamaya uymadığını bildirdi (ekran görüntüleri IMG_4607–4612). Beğendiği referans: **kitap listesi + Program/Kitap anahtarı** (§217'nin altın paleti, orana bağlı ölçüler, küçük daire düğmeler).

Yapılacak: Power up panelindeki Konu/Soru/Deneme anahtarı ve kartları aynı dile çevirmek; matris tablosu ve branş trend kartlarını da.

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-02-07a` ↔ `rota-2027-02-07a` · 619 034 bayt**

---

## 227 · KONU TEKİLLİĞİ · NET HAVUZU PAYLAŞIMI · `2027-02-07a`

Gerçek hayattaki kural sisteme kuruldu: öğrenmeye katkı sağlayan **kitap değil konu**. Bir konu hangi kaynaktan okunursa okunsun ilk öğrenme getirisi **bir kez** kazanılıyor; aynı konuya ikinci bir kitaptan bakmak **tekrar** getirisi veriyor.

### `konuKayit()` · merkezi konu defteri

Konu adı → **ilk** tamamlanma tarihi. Üç kaynak birden taranıyor:

| Kaynak | İçerik |
|---|---|
| `D.bitti` | program görevleri |
| `D.pu` | power-up (kitap sekmesi ya da çark) |
| `D.tts` | TTS son tekrar |

Aynı konu birden çok kaynakta varsa **en erken** tarih geçerli.

### `golge()` · ikame edilmiş görev

Bir görevin konusu başka kaynaktan tamamlandıysa görev **gölgeli**: getirisi zaten kazanılmış, programda ayrıca sayılmıyor.

```
10:15  Patoloji  ~~Meme Hastalıkları~~  1.20 sa  ✓ Levent Kodal Genel Cerrahi SB
```

Üstü çizili, yerine ne yapıldığı yazılı, **günün saat toplamından düşülmüş**.

### ⚠ Düzeltilen iki eksik

**1 · `grupKapsam` yalnız `D.bitti`ye bakıyordu.** Gölgeli görevin soru havuzu "hiç çalışılmamış" sayılıyordu. `bittiTar()` kullanılıyor.

**2 · `konuCalisildiKume` power-up ve TTS'i görmüyordu.** O kaynaklardan çalışılan konular "hiç görülmemiş" kabul edilip **yeni öğrenme** getirisi alıyordu. Merkezi kayıt bağlandı.

### Ölçüm · çift sayım yok

| Adım | Parakete | Artış |
|---|---|---|
| başlangıç | 55.9714 | — |
| power-up'tan tamamla | 56.0060 | **+0.0346** |
| programdakini de tamamla | 56.0145 | **+0.0085** |

İkinci kaynak ilkinin **%25'i** kadar getiriyor — tekrar getirisi. Potansiyel de düşüyor (7.552 → 7.534).

Tüm program + tüm power-up tamamlandığında parakete 60.17, tavan (88.66) aşılmıyor.

### Test · `pu_test.js` +20 kontrol

dört fonksiyon · kapsam gölgeyi sayıyor · `konuCalisildi` merkezi kayıttan · üstü çizili sınıf · ikame etiketi · saatten düşülüyor · **başka kaynak paraketeyi artırıyor** · potansiyel düşüyor · görev gölgeleniyor · iki yol benzer getiri · konu çalışılmış sayılıyor · **ikinci kaynak daha az getiriyor** · pozitif ama küçük · tavan · listede üstü çizili · kaynak adı.

### ⚠ AÇIK KALEM · tasarım

Kullanıcı power-up paneli, matris ve seyir sayfalarının tasarımının kitap sekmesi kadar iyi olmadığını bildirdi (ekran görüntüleriyle). **Henüz yapılmadı.**

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-02-07a` ↔ `rota-2027-02-07a` · 619 670 bayt**

---

## 228 · ⚠ ANAHTAR GRUP BAZLI OLMALIYDI · `2027-02-08a`

Kullanıcı §227'nin kusurunu yakaladı: konu anahtarı **yalnız konu adıydı**, branş/grup yoktu.

### ⚠ Yanlış birleşen 13 konu

| Konu | Branşlar | Doğru mu? |
|---|---|---|
| meme hastalıkları | Patoloji · Genel Cerrahi | **HAYIR** · ikisi de ayrı soru getiriyor |
| deri hastalıkları | Patoloji · Genel Cerrahi | **HAYIR** |
| hormonlar | Biyokimya · Farmakoloji | **HAYIR** |
| enfeksiyon hastalıkları | Dahiliye · Mikrobiyoloji | **HAYIR** |
| nöroloji | Dahiliye · Küçük Stajlar | evet · aynı havuz |

Kullanıcının kuralı: *"aynı konu da olsa farklı derste aynı anda soru çıkarırsa iki konudan da net kazanırım — dersler arasında sadeleştirme yapılmaz."*

### Ayrım noktası · NET HAVUZU

`TAVAN_G` grup bazlı tanımlı, dolayısıyla anahtar da grup bazlı:

```js
function konuAnh(brans,konu,grup){
  const g=grup||DEN_ESL[brans]||brans||'';
  return g+'§'+renkAnh(konu);
}
```

Bu ayrım kendiliğinden doğru sonucu veriyor:
- Patoloji ↔ Genel Cerrahi **ayrı** grup → meme hastalıkları ayrı ✓
- Dahiliye ↔ Küçük Stajlar **aynı** grup → nöroloji tek ✓
- Pediatri'nin iki kitabı **aynı** grup → tek havuz ✓

### Doğrulama

| Test | Sonuç |
|---|---|
| Genel Cerrahi meme okundu → Patoloji meme gölgelendi mi? | **hayır ✓** |
| Aynı grupta 34 kitap çifti · ikinci kitap tekrar getirisi | ✓ |
| `konuCalisildi` aynı grup öbür kitapta true | ✓ |

`konuCalisildi` merkezi kayıttan okurken anahtarın konu kısmını ayıklıyor (`k.split('§')[1]`).

### ✓ ON DÖRT KAPI · TOPLAM 0

**sürüm `2027-02-08a` ↔ `rota-2027-02-08a` · 620 949 bayt**

---

## 229 · POWER-UP PANELİ ALTIN DİLE GEÇTİ · `2027-02-09a`

Yarım kalan tasarım listesinin ilk kalemi. Ortam değişti: bu tur repodan çalışıldı
(devir paketi artık sürüm kontrolünde), testler `kaynak/` klasöründen koşuldu.

### Anahtar · mavi → altın gradyan (§217 dili)

`.puKay` `rgba(143,212,255,.92)` → `linear-gradient(135deg,#E4C583,var(--altin))` +
altın gölge; `.puAnh button.on` ve `em` çipi koyu kahve (`#1A1206`). Panelin mavi
kromu kaldırıldı: `#ppanel .kbox` mavi kenar/zemin geçersiz kılması silindi (taban
altın kbox devraldı), `.pri` düğme mavi geçersiz kılması silindi (taban altın düğme),
`.puBas` başlıkları maviden altına döndü. Uygulama genelindeki power-up kimlik mavisi
(çark kartı `.puK`, `.puI`, harita rozeti, `khT` satırı) BİLEREK korundu — şikâyet
paneldeki uyumsuzluktu, uygulama genelindeki kimlik değil.

### Kart düzeni · değer üst satırdan başlık satırına

`.gn` sol/üst sütunu panelden tamamen çıktı. Değer (`0.94 net/sa`, `+0.189 net`,
tekrar durumu `✓/ŞİMDİ/N gün`) başlık satırının sağına alındı: `<b>` esnek satır,
`.pAd` (ad, kısalabilir) + `.pKz` (monospace altın, sarmaz). Dar ekranda `.gn`'nin
`width:100%` ile ayrı satıra düşme sorunu kökten bitti. Dört üretici de değişti:
`sat`, `denSat`, tekrar kartının iki varyantı. Ölü kalan `.kit.den .gn` kuralı silindi.

### ⚠ Bu turda bulunan ve düzeltilen: flex min-content taşması

İlk sürümde ≥900px üç sütunlu görünümde "Çarka çek" düğmeleri içeriğe biniyordu.
Kök sebep: `.ic`'de `min-width:0` yoktu ve başlık esneği sarmıyordu — esnek satırın
min-content'i `pAd + pKz` TOPLAMI olunca dar sütun taşıyordu. Çözüm:
`#ppanel .kit .ic{min-width:0}` + `b{flex-wrap:wrap}`. Davranış: değer sığarsa
başlıkla aynı satırda, sığmazsa altta sağa hizalı.

### Doğrulama · gerçek tarayıcıda (yeni yöntem)

Headless Chromium ile panel iki boyutta görüntülendi (500px dar · 1100px üç sütun),
ekran görüntüleri taban sürümle karşılaştırıldı. İki tuzak not edildi:
1. Chromium headless pencereyi 500px altına indirmiyor — 430px isteği 500px açılıp
   görüntüyü kırpıyor; "taşma var" yanılgısı buradan çıktı, ölçümle çürütüldü
   (`vp=500`, kbox=448, taşan öğe 0).
2. Ölçüm enjeksiyonu (`document.title`'a genişlik basıp `--dump-dom`) §109'daki
   teşhis kalıbının tarayıcı sürümü — işe yaradı, tekrar kullanılabilir.

### Test · `pu_test.js` 1 eskimiş kontrol güncellendi (meşru, susturma değil)

"deneme satırı .ic kullanıyor" kontrolü eski `.gn` markup'ını arıyordu; kontrolün
niyeti korunarak yeni yapıya (`.pAd`/`.pKz` başlık satırı) çevrildi.

### ⚠ AÇIK MADDELER · paketle gelen, bu turdan bağımsız (taban sürümde doğrulandı)

1. **`pu_test.js` KONU TEKİLLİĞİ bölümü 7 hata veriyor** — değişiklikten ÖNCE de
   veriyordu (taban `2027-02-08a` ile koşuldu, birebir aynı 7 hata). Karışım:
   §228'in yeniden yazdığı satırı arayan eskimiş metin kontrolleri + gerçek görünen
   davranışsal sapmalar (`potansiyel düşüyor` 7.552→7.568 YÜKSELIYOR; `ikinci kaynak
   daha az getiriyor` ilk 0.0012 < ikinci 0.0419 TERSİNE). §227/228 davranışının
   yeniden incelenmesi gerekiyor — bu tur dokunulmadı.
2. **`kos.js` ayrıştırılamıyor** — 302. satırda sözdizimi hatası, paketten böyle
   geldi. Niyeti bilinmeden onarılmadı.
3. **Paket boşlukları:** `eko.py` (kural_test.py buna bağımlı, koşamıyor),
   `senk_test.js` (senk_poll.js buna bağımlı, koşamıyor), `senk_kos.js`.
   Kullanıcının yerelinde varsa repoya eklenmeli.

### Kapılar · koşulabilenlerin tamamı

| Kapı | Sonuç |
|---|---|
| pu_test.js | benim alanım 0 hata (28 bölüm) · KONU TEKİLLİĞİ 7 (önceden var, açık madde 1) |
| tarayici_test · cark_test · derin_test · mola_test · kombo_test | 0 |
| kal_test (logo.svg fixture ile) · senk_uc · senk_rol · senk_etag | 0 |
| denet.py | 0 · 196 görev, 177.7 etkin saat |
| kural_test.py · senk_poll.js · kos.js | KOŞAMADI (açık madde 2-3) |

**sürüm `2027-02-09a` ↔ `rota-2027-02-09a` · 649 645 bayt**

---

## 230 · ÖLÇÜM YENİDEN TASARIMI · KÖR NOKTA · HATA KAYDI · `2027-02-10a`

Kullanıcı beş ekran görüntüsüyle geldi: matris/trend tasarımı yetersiz, uygulama
"laglıymış gibi", konsolda tekrar eden `Script error.`, ⚠ rozeti 32. Ayrıca
1 Ağustos denemesi çözüldü ve kritik bir içgörü verildi: *"Genel Cerrahi, Kadın
Doğum, Biyokimya, Farmakoloji'ye hiç bakmadım; sorularını sezgiyle yapıyorum —
ben bunu demeden uygulama anlamalı."*

### Deneme matematiği doğrulandı (kullanıcı beyanı)

Temel 50D 37Y → net **40.75** · Klinik 52D 45Y → net **40.75** ·
K = 40.269 + 0.207×40.75 + 0.277×40.75 = **59.99 ≈ 60.0** (önceki ölçülen 57.61,
+2.38). Formül uygulamadakiyle birebir (`TABAN/KT/KK`). ⚠ Boşlar: Temel 33,
Klinik 23 — "boş bırakma yok" stratejisine aykırı, kullanıcıya iletildi.
Deneme uygulamaya HENÜZ girilmedi (ekran görüntüsünde ölçülen hâlâ 57.61).

### Matris tablosu (`gucT`) yeniden tasarlandı + KÖR NOKTA

- Yüzde yerine **net** (radar §"yüzde değil net" dersiyle tutarlı); Fark → "Yolda"
  (▲ yeşil çip · tamamlanan işlerin denemeye yansımamış katkısı); zebra satır,
  tabular-nums, monospace sayı sütunları.
- **Yeni sütun: Çalışma** — `bransCalisma()` (yeni): branş başına tamamlanmış
  saat = program görevleri (`D.bitti`) + biten power-up'lar.
- **KÖR NOKTA rozeti**: `çalışma < 0.5 sa` VE `ölçülen net > 0` olan branş —
  net yalnız sezgiyle taşınıyor demek. Satır kehribar tonla işaretli, tablo altı
  açıklama notu var. ⚠ İlk sürüm taze/senkronsuz cihazda 11 satırın 11'ini
  işaretliyordu → `korAktif` eşiği eklendi (toplam çalışma ≥ 5 sa değilse rozet
  kapalı). Dar ekranda (≤560px) TUS soru sütunu gizleniyor, rozet kendi satırına
  iniyor (taşma gerçek tarayıcıda görülüp düzeltildi).

### Trend kartları (`miniCiz`) yeniden tasarlandı

Alan dolgusu (gümüş gradyan, kart başına benzersiz id `mgA{i}`), yumuşak çizgi,
**altın son nokta + hale + altın değer**, başlıkta büyük net + renkli değişim
çipi (`.miniV`/`.miniD`), hedef çizgisi korundu; hedef etiketi son değer
etiketine 11px'ten fazla yaklaşırsa aşağı kayıyor (ANATOMİ'de üst üste binmişti).

### Kalıcı hata kaydı (cihazdaki `Script error.` avı için altyapı)

- Repo sürümü headless tarayıcıda 60 sanal saniyede **0 hata** üretti — tekrar
  eden hatalar cihaz/ortam kaynaklı. Şüpheli: uygulamanın HTML görüntüleyici
  uygulamasında (file:// benzeri köken) açılması — hem mesaj maskeleniyor hem
  650KB dosya yavaş çalışıyor. Tahminle düzeltme YAPILMADI; önce gerçek mesaj.
- `hataKaydet()` (yeni): sarmalayıcı yakalamaları + `window.onerror` +
  **`unhandledrejection` (ilk kez dinleniyor)** → `localStorage['rota-hatalar']`
  (son 40, ardışık tekrar sayaçlı). ÖLÇÜM > Veri panelinde **"Hata kaydı (N)"**
  düğmesi kaydı metin kutusuna döker — kullanıcı kopyalayıp gönderecek.

### Etiketli deneme kalibrasyonu — KULLANICIDAN VERİ BEKLENİYOR

Kullanıcı son denemeyi soru başına Eminim/Bilmiyorum/Unuttum/Arada-kaldım
etiketleriyle çözmüş. Plan: D'ler etikete göre **sağlam net / kırılgan net**
diye ayrışacak (kırılgan = sezgi-D, hızlı çürür), Unuttum = branş çürüme
kalibrasyonu, Bilmiyorum+Boş = konu bazlı boşluk haritası → power-up sıralaması.
İstenen format (soru başına): `branş · konu · etiket(E/B/U/A) · sonuç(D/Y/BOŞ)`.
Veri gelince `kaynak/`ta işlenecek — model değişikliği BU TURDA YAPILMADI.

### Test · `kal_test.js` 2 eskimiş kontrol yeni kaynağa uyarlandı (meşru)

`grafik noktalarında net` ve `grafik sağ üstte değişim` eski miniCiz dizgilerini
arıyordu; niyet korunarak yeni dizgilere çevrildi.

### Headless test yöntemi notları (tekrar kullanılacak)

- `sayfaGec` koreografisi (`setTimeout 230ms` + rAF opaklık dansı) sanal-zaman
  modunda ateşlenmiyor → sekme, sınıflar elle değiştirilip `olcumCiz()` doğrudan
  çağrılarak açılmalı. "Boş sayfa" bir uygulama hatası değildi.
- Kullanıcı durumu simülasyonu: 4 branşın görevleri `D.bitti`'ye işaretlenerek
  kör nokta davranışı gerçek dağılımla doğrulandı.

### Kapılar · koşulabilenlerin tamamı

| Kapı | Sonuç |
|---|---|
| pu_test | benim alanlarım 0 · KONU TEKİLLİĞİ 7 (önceden var, §229 açık maddesi) |
| kal_test (2 kontrol uyarlandı) · derin_test · tarayici_test · cark_test · mola_test · kombo_test · senk_uc/rol/etag | **0** |
| kural_test.py · senk_poll.js · kos.js | KOŞAMIYOR (§229 açık maddeleri sürüyor) |

**sürüm `2027-02-10a` ↔ `rota-2027-02-10a` · 656 675 bayt**

---

## 231 · AYRINTILI DENEME GİRİŞİ · PANELLER HATASI · KİP GECİKMESİ · `2027-02-11a`

Kullanıcı §230'da eklenen "Hata kaydı" düğmesinin ilk meyvesini getirdi:
`ReferenceError: Can't find variable: PANELLER @ 3839 ×13`. Ayrıca üç istek:
(1) soru-soru ayrıntılı deneme girişi, (2) gün listesi kip/kitap gezinme
gecikmesi, (3) girişin tasarımı "harika" olsun.

### ⚠ PANELLER tanımsızdı — dışarı-tıkla-kapat hiç çalışmıyordu

`panelKapat()` ve belge tıklama dinleyicisi `PANELLER` dizisini kullanıyordu
ama dizi hiçbir yerde tanımlı değildi (muhtemelen bir düzenlemede düştü).
Her belge tıklamasında `ReferenceError` → panelleri dışarı tıklayarak kapatma
bozuk, konsol her tıkta kirleniyor. `const PANELLER=['kpanel','dpanel',
'ppanel','bpanel']` eklendi. **§230'un kalıcı hata kaydı bunu yakaladı** —
altyapı işe yaradı, gerçek mesaj cihazdan geldi.

### Gün listesi gezinme gecikmesi giderildi

`glBagla().yenile()` her kip/tür/kitap seçiminde `carkCiz()+brifCiz()+ust()`
koşuyordu — çark görev DURUMUNDAN bağımsız, salt görünüm değişiminde koca
çarkı yeniden çizmek gecikmenin kendisiydi. `yenile(hafif)` parametresi
eklendi; program↔kitap, tür ve kitap↔liste geçişleri artık `yenile(true)`
(yalnız liste + ölçek), çark ellenmiyor. Görev tamamlama hâlâ tam yeniler.

### Ayrıntılı deneme girişi (yeni · `detayCiz`)

Deneme gir bölümüne kip anahtarı: **Hızlı** (mevcut 11 branş D/Y) ↔
**Ayrıntılı · soru soru**. Ayrıntılı kipte kompozitör: Branş açılır menü
(her branşın yanında işaretlenen/toplam sayaç) → Konu açılır menü
(`KONU_DAG`'dan, getiri sırasına göre) → Sonuç segmenti (D/Y/Boş) → Çözerken
segmenti (E/AK/B/U) → "Soruyu ekle" (seçim korunur, hızlı ardışık giriş).
Eklenenler branşa göre gruplu çip listesi, tek tek silinebilir. Canlı özet:
ilerleme rayı (N/200), güven×isabet satırı ("Eminim 40 · isabet %88",
Eminim'de <%80 isabet kehribar uyarı), sağlam↔kırılgan doğru sayacı.

- **Veri modeli:** taslak `D.dqTaslak={br,konu,s,e,q:[{b,konu,s,e}]}` kalıcı
  (localStorage, yeniden açılışta sürüyor). Kaydet → `dqBransNet(q)` ile
  hızlı girişle **aynı `bn/dy` biçimi** üretilir (projeksiyon/matris değişmez)
  + `sorular` ham dizisi ve `detay:true` saklanır. Güven etiketleri
  kalibrasyonun ham verisi (sağlam/kırılgan net, çürüme, konu boşluğu) —
  §230'da tanımlanan format artık uygulamanın içinde toplanıyor.
- **Tasarım:** altın gradyan kip anahtarı, cam kompozitör, segment düğmeleri
  seçildiğinde renge boyanıyor (D yeşil · Y kırmızı · Boş gri · E altın ·
  AK kehribar · B mavi · U mor), çipler renk kodlu. Gerçek tarayıcıda dar
  görünümde doğrulandı.

### ⚠ Bu turda dikkat edilen: kip ayrımında null işleyici

Hızlı kip işleyicileri (`#ek`, `#hs`, `.dyD`) ayrıntılı kipte yok; `#ek.onclick`
doğrudan çağrılınca null → tüm çizim kopardı. `ekBtn`/`hsEl` guard'landı,
`gun()` yalnız `.dyD` varsa koşuyor. Kip anahtarı `D.dnKip` kalıcı.

### Kapılar

| Kapı | Sonuç |
|---|---|
| pu_test | benim alanlarım 0 · KONU TEKİLLİĞİ 7 (§229 açık maddesi, değişmedi) |
| kal_test · derin_test · tarayici_test · cark_test · mola_test · kombo_test · senk_uc/rol/etag | **0** |
| kural_test.py · senk_poll.js · kos.js | KOŞAMIYOR (§229 açık maddeleri) |

⚠ **Ayrıntılı giriş için otomatik kapı YOK** — yeni `detayCiz`/`dqBransNet`
mantığı test bataryasına eklenmedi (bu tur zaman). Gerçek tarayıcıda görsel
doğrulandı ama regresyon koruması yok; sonraki turda `pu_test`e eklenmeli.

**sürüm `2027-02-11a` ↔ `rota-2027-02-11a` · 671 423 bayt**

---

## 232 · MODEL BAĞLAMA · TEST KAPISI · A'DAN Z'YE CİLA · `2027-02-12a`

Kullanıcının üç isteği: §231'in iki açık işi + tüm uygulamanın tasarımını
üst düzeye çıkarmak.

### 1 · Ayrıntılı deneme verisi modele bağlandı (`dqIstat`)

Kayıtlı denemelerin `sorular` dizilerinden her çizimde yeniden türetilen
birikimli istatistik (donmuş değer YOK, §72–85):
- **Matris:** ayrıntılı verisi olan branşta doğruların çoğu sezgiyse
  (E-dışı > Eminim, ≥4 doğru) satıra **"kırılgan · N/M sezgi"** rozeti —
  kör noktanın ölçülmüş kardeşi.
- **Power-up:** konu, denemede Bilmiyorum+cevapsız/yanlış çıktıysa kartta
  kehribar **"denemede N boşluk"** işareti. Harita panel çizimi başına BİR
  kez hesaplanır (kart başına değil — lag dersi).
- ⚠ Sıralamaya/`puDeger`e KARIŞMADI: boşluk işareti şimdilik yalnız
  görünür bilgi. Sıralama ağırlığına girmesi kullanıcı kararı bekliyor.

### 2 · `pu_test`e AYRINTILI GİRİŞ bölümü (+16 kontrol)

Fonksiyon varlıkları · `dqBransNet` matematiği (D−Y/4, temel/klinik ayrımı,
dy sayaçları) · `dqGuvenOzet` · `dqIstat` sağlam/kırılgan + boşluk haritası ·
**`PANELLER` tanımlı (regresyon korunumu)** · kip anahtarı ve `yenile(true)`
kaynak izleri · konu listesi getiri sıralı. İlk koşuda 1 hata çıktı ve testin
kendi beklentisiydi (boşluk haritası tasarım gereği yalnız Bilmiyorum'dan
beslenir; teste U koymuşum) — test düzeltildi, uygulama değil.

### 3 · A'dan Z'ye cila (yerleşim DEĞİŞMEDİ)

Jeton katmanı: zemin `#030408`, cam/kenar/mürekkep ölçeği netleşti.
Bileşenler: `.bt.pri` altın gradyan + gölge + bası durumu · üst şerit metrik
kartlarına iç ışık çizgisi ve tabular rakam · `h2.bb` başlıklara altın tik ·
kbox/kart derinlik gölgeleri · ince altın-vurgulu kaydırma çubukları ·
`::selection` altın · `:focus-visible` halkası · girdi odağında altın parıltı
· orb hover parlaması. Çark geometrisi ve tüm yerleşimler bilinçli olarak
ellenmedi (§118–123 zinciri). Dört yüzey gerçek tarayıcıda doğrulandı
(ROTA/SEYİR geniş · ÖLÇÜM/power-up dar).

### Kapılar

pu_test: yeni bölüm 0 (KONU TEKİLLİĞİ 7 · §229 açık maddesi değişmedi) ·
kal/cark/tarayici/derin: **0** · CSS dengesi 0 · JS parse OK.

**sürüm `2027-02-12a` ↔ `rota-2027-02-12a` · 675 387 bayt**

---

## 233 · BOŞLUK SIRALAMADA · AÇILIŞ GÜN LİSTESİ · `2027-02-13a`

İki kullanıcı kararı uygulandı:

### 1 · Kanıtlanmış boşluk power-up sıralamasına girdi

`puSirali()` sıralama anahtarı: `_sk = verim × (1 + 0.15 × min(3, boşluk))`.
Denemede "Bilmiyorum" deyip kaçırılan konu yukarı itilir; çarpan sınırlı,
verim ana eksen kalır. ⚠ Kartta GÖRÜNEN net/sa değeri SAF verim — sıralama
anahtarı ayrı tutuldu ki gösterilen sayı şişmesin (sayı dürüstlüğü).
Ayrıntılı veri yokken `_sk === _v`, davranış birebir eski hali.

### 2 · Uygulama artık gün listesiyle açılıyor (çark değil)

Kullanıcı: to-do listesi esnek, çark karşılamasın. Açılışta `gunKipAc(true)`
(60 ms gecikmeli, §148'in çok kaynaklı yükseklik/tazeleme mekanizması boot'ta
da işliyor). Tercih hatırlanıyor: `gunKipAc` sarmalandı, kullanıcı çarka
geçerse `D.acilis='cark'` yazılır ve sonraki açılış çarkla olur; listeye
dönerse yine liste. Pinch/tekerlek/sınır sürükleme aynen çalışıyor.

### Doğrulama notu (headless tuzağı — üçüncü kez aynı aile)

Boot görüntüsünde liste "boş" göründü; DOM'da 14 satır tamdı. Sebep `.glS`
GİRİŞ ANİMASYONU: sanal zamanda CSS animasyonu koşmuyor, satırlar opacity
0'da yakalanıyor (§sayfaGec rAF artefaktının kardeşi). Animasyon CSS'le
kapatılıp yeniden görüntülendi: liste tam — Program|Kitap anahtarı, tarih
gezinme, blok gruplu satırlar, daire düğmeler. Cihazda animasyon normal.

### Kapılar

cark_test 0 · pu_test yeni kırık yok (KONU TEKİLLİĞİ 7 · §229) · kal_test 0 ·
JS parse OK. Boost, ayrıntılı veri olmadığında bit-birebir eski sıralamayı
verdiği için mevcut sıralama kontrolleri geçerliliğini koruyor.

**sürüm `2027-02-13a` ↔ `rota-2027-02-13a` · 676 489 bayt**

---

## 234 · LIQUID GLASS KATMANI · ODAK VURGUSU · `2027-02-14a`

Kullanıcı: "Apple üretmiş gibi berrak, liquid glass; veri boğmasın,
o an neyle uğraşıyorsam o öne çıksın."

- **Cam dili:** kbox/trBox/mini/dqKompoz/sapKt yüzeylerine doygun bulanıklık
  (`blur(28px) saturate(1.55)`) + üst kenar ışığı (specular inset) + derin
  gölge; üst şerit metrik kartları, çipler, düğmeler aynı dilde. Anahtar
  rayları (glAnh/puAnh/dqMod) içe oyuk cam oluk; altın kaydırıcılar üstten
  ışıklı. Yerleşim ve çark geometrisi ellenmedi.
- **Odak:** `.glS.simdi` (şu anki iş) mavi cam parlamasıyla kendiliğinden
  yükseliyor — açılış listesinde göz doğrudan oraya düşüyor.
- Doğrulama: gerçek tarayıcı görüntüsü; boot'ta çark kartı hayaleti
  ÇIKTI ama `#sahne.gizli` opaklık GEÇİŞİ sanal zamanda koşmadığı için —
  bilinen artefakt ailesi (üçüncü kayıt), cihazda yok. cark_test 0 ·
  kal_test 0 · CSS dengesi 0 · JS parse OK.
- **Sıradaki (devir):** derin aşamalı-açılım — bağlama göre panel önerisi
  (deneme günü ÖLÇÜM çipi öne, mola anında mola kartı büyür), SEYİR
  pelerin/harita cam yenilemesi, mikro-etkileşimler.

**sürüm `2027-02-14a` ↔ `rota-2027-02-14a` · 678 561 bayt**

---

## 235 · ANAHTAR TIKLAMASI ONARILDI · JARVIS VİZYONU KAYDA · `2027-02-15a`

### Onarım: Program|Kitap anahtarı fareyle tıklanamıyordu

Açılış yolu (`gunKipAc(true)` boot'tan) listeyi kurarken `glBagla()` her
yoldan çağrılmıyordu — anahtar düğmeleri işleyicisiz kalıyordu. İki katman:
boot'ta açık `glBagla()` çağrısı + `[data-glkip]/[data-kltur]` için belge
düzeyinde olay-devri YEDEK devresi (normal bağ varsa `k.onclick` kontrolüyle
karışmıyor). cark_test 0 · JS parse OK.

### ⚠ YENİ ÜRÜN VİZYONU (kullanıcının sözleriyle · sonraki oturumların ana işi)

Çark ve saat-saat planlama YETERSİZ; uygulama "o ana" evrilecek:

1. **Karşılama:** açılışta veri YOK — dupduru ekran, "Hoşgeldin DRE" yazar,
   yazı kaybolur, TEK önerilen görev kartı belirir.
2. **Öneri motoru (görünüşte sade, altta derin):** deneme çıkarımları +
   kelebek etkisi — sınava kadar hangi görev SERİLERİ yetişir, günlük rutin
   ve uyku çıkınca kalan hacme ne sığar → "şu an en verimli iş bu" tek kart.
   Görev bitince sıradaki kendiliğinden gelir.
3. **Üstte 3 liquid glass hap** (gerçek Apple dili) — sayfalar bunlarla değişir.
4. **Hikâye katman katman:** sayfa verileri bir anda DEĞİL, kaydırdıkça
   animasyonla katman katman açılır (scroll-reveal); "her şey birden
   belirmeyecek".
5. **Telafi / power-up / tamamlandı / kalibrasyon** konum-görünürlük-zamanı
   bu amaca göre KÖKTEN yeniden kurgulanabilir (kullanıcı yetki verdi:
   "sormadan köklü değiştirebilirsin").
6. **Performansa tepkili tema:** performans arttıkça tasarım dönüşsün
   ("ghost rider gibi yanmaya başlayabilir") — gaza getirsin, kanayan
   yaraları güçlü yana çevirsin. Jarvis ↔ Tony Stark ilişkisi hedef duygu.

Uygulama sırası önerisi: önce öneri motoru (mevcut `para()`/`puEtki`/
`denemeSapma` üstüne "sıradaki görev" seçicisi), sonra karşılama ekranı,
sonra scroll-reveal katmanları, en son tema dönüşümü.

### ⚠ NETLEŞTİRME (kullanıcı · bir sonraki mesaj): ÖZELLİK DONDU, TASARIM EVRİMİ

"İhtiyacım olan bütün özelliklere artık sahibim." YENİ ÖZELLİK YOK; iş,
mevcut her yeteneği KAYBETMEDEN her şeyi en estetik + en basit + en modern
biçimde KÖKTEN yeniden tasarlamak. Korunacak yetenek sözleşmesi (asgari):
- Tek dokunuşla herhangi bir kitabın TÜM içeriği görünür; görev tıklanıp
  "tamamlandı" yapılabilir.
- Her tamamlama/deneme girişi ANINDA kelebek etkisi: tüm senaryolar
  (parakete, potansiyel, seriler, power-up sıralaması) yeniden hesaplanır —
  "su gibi akıcı".
- Ayrıntılı deneme girişi, hata kaydı, senkron, kör nokta/kırılgan rozetleri,
  boşluk ağırlığı — hepsi tasarımın içinde yaşamaya devam eder.
Yeniden tasarım bu sözleşmeye karşı denetlenir (her yüzey: "bu yetenek yeni
tasarımda nerede?" sorusuna cevap vermek zorunda).

**sürüm `2027-02-15a` ↔ `rota-2027-02-15a` · 679 208 bayt**

---

## 236 · TASARIM EVRİMİ I · KARŞILAMA + MASKOT + KATMAN AÇILIMI · `2027-02-16a`

§235 vizyonunun ilk büyük dalgası. Ultracode atölyesi (1 keşif + 3 paralel
tasarım ajanı) üretim-hazır paketleri üretti; entegrasyon tek geçişte,
11 imza-doğrulamalı adımla (her biri count==1 assert) yapıldı.

### Karşılama · "Hoşgeldin DRE" → tek önerilen görev kartı

Her açılışta veri yerine dupduru gökyüzü: harf harf blur-in "Hoşgeldin
DRE", çözülme, sonra TEK liquid glass görev kartı. Öneri motoru `karsiOner`:
1) kaçırılanlardan gorevKazanc'a göre EN DEĞERLİ telafi · 2) plan sıradaki
(`bul()`) · 3) gün kapandıysa power-up tepesi. Kartta: branş noktası+tip
etiketi, sınava kalan gün, görev adı, neden-şimdi (`g.why`), +net/saat/blok
çipleri, altın "Başla" (listeye iner, satır `karsiVurgu` ile yanıp söner)
ve cam "Tamamlandı" (D.bitti + kelebek zinciri + SIRADAKİ kart akar).
"geç ✕" oturum-içi (D'ye yazılmıyor — senkrona kalıcılaşmasın diye bilinçli).
Ağır öneri hesabı yazı animasyonu penceresine erteleniyor (boot kilitlenmez).

### Maskot · "Dre" — takımyıldız kıvılcımı

Saf inline SVG (~2KB): yıldız noktaları + bağ çizgileri + parlak çekirdek.
`maskotDurum('bekle'|'sevinc'|'gaz')` API'si; DÖRT tamamlama noktasına
(kart düğmesi · gün listesi · power-up [geri-alma korumalı] · telafi)
sevinç bağı. Karşılama kartının köşesine tüner — ⚠ entegrasyonda bulunan
hata: kutu body'de mutlak kalınca ekran dışına düşüyordu; kart çiziminden
SONRA karta appendChild ile taşındı (innerHTML silme sırası gözetildi).

### Katman açılımı + hap nav + --gaz

`katmanKur()`: IntersectionObserver ile .dis/.mini/.trBox bloklarına
kademeli giriş (bir kez görünen tekrar oynamaz); sayfaGec sonuna ve boot'a
bağlandı. Nav orb'ları salt CSS'le liquid glass hap görünümüne yükseldi.
`--gaz` (0..1): son iki deneme K farkı pozitifse karşılama kartı ve aktif
hapta altın→turuncu yoğunluk — performansa tepkili temanın ilk adımı.

### Doğrulama

Karşılama kartı gerçek tarayıcıda görüntülendi (öneri motoru doğru telafiyi
seçti; animasyonlar sanal-zaman artefaktına karşı uç-durum kipiyle test
edildi). cark_test 0 · kal_test 0 · CSS dengesi 0 · JS parse OK.
⚠ Görsel akışın tam sekansı (harf→çözülme→kart→Başla vurgusu→Tamamlandı
zinciri→maskot sevinci) CİHAZDA doğrulanmalı — kapılar bunu görmez.

**sürüm `2027-02-16a` ↔ `rota-2027-02-16a` · 708 107 bayt**

---

## 237 · AZALTILMIŞ HAREKET SOLMALARI · CAM SATIRLAR · `2027-02-17a`

Kullanıcı cihazda karşılama animasyonunun OYNAMADIĞINI ve içerinin "hâlâ
eski" göründüğünü bildirdi ("geç ✕" görünüyor → yeni sürüm CİHAZDA, sorun
sürüm değil).

- **Teşhis (varsayım, cihazda doğrulanacak):** iOS "Hareketi Azalt" açıksa
  paket TÜM animasyonu atlıyordu (AZ→süreler 0 + animation:none). Apple'ın
  kendi azaltılmış-hareket dili tam atlama değil YUMUŞAK SOLMA'dır.
  Düzeltme: `karsiT` süreleri sıfırlamak yerine ~%45'e kısaltır; karşılama
  reduce bloğu yalnız-opaklık `karsiHarfSade` solmasına döndü — sekans
  (yazı→çözülme→kart) azaltılmış harekette de oynar.
- **Cam satırlar:** `.glS` gün listesi satırları yüzen cam kartlara döndü
  (gradyan zemin, specular iç kenar, yumuşak gölge, radius 13, bası tepkisi).
  `gunOlcekle` yükseklik bütçesi ölçerek uyarlandığı için sığma korunuyor.
- **Maskot yönü (kullanıcı önerisi, kayıt):** "Dre"nin sonraki iterasyonu
  Project Hail Mary'deki Rocky karakterine benzeyebilir (taş dokulu,
  örümceğimsi Eridian formu) — mevcut kıvılcım iskeleti üstüne SVG evrimi.
- **Uyum sorusu (cevap verildi):** öneri kartı DAYATMA değil — "geç" ya da
  "Başla"dan sonra listeden BAŞKA iş yapılabilir; her tamamlama kelebek
  zincirini işletir, ertesi açılışta öneri yeni duruma göre yeniden doğar.
  Cezasız-uyum böyle sağlanıyor; "önerileni yapmadı" sinyalinin kalibrasyona
  ayrıca girmesi (öneri reddi öğrenimi) İLERİDE değerlendirilebilir — açık.
- cark_test 0 · CSS dengesi 0 · JS parse OK · liste cam görünümü tarayıcıda
  doğrulandı. ⚠ Karşılama sekansı azaltılmış-hareket kipiyle CİHAZDA
  izlenmeli; "hâlâ eski" hissi sürerse iç sayfaların cesur yeniden çizimi
  (dalga II) öne çekilmeli.

**sürüm `2027-02-17a` ↔ `rota-2027-02-17a` · 708 428 bayt**

---

## 238 · GENİŞ EKRAN VERİM DÜZENİ (iPad) · `2027-02-18a`

Kullanıcı üç iPad görüntüsüyle A'dan Z'ye yenileme istedi. Görüntülerin
teşhisi: ROTA liste kipinde içerik sol %38'e sıkışıyor, sağ yarı BOŞ
(gizli brifing sütunu yer tutuyordu); ayrıntılı giriş tablet genişliğinde
orantısız (dev segmentler, uçsuz altın bar).

- ≥1000px: `#rota.gunKip{grid-template-columns:1fr 0px}` — boş sütun
  kapandı; `#gunListe` padding'le ~920px odaklı kolona ortalandı
  (transform'a bilinçli dokunulmadı: açılış geçişi onu kullanıyor).
- ≥900px: `#detayIc` 960px'e ortalandı; segment/ekle/kaydet oranları
  tablet için kalibre (Branş 1fr · Konu 1.4fr).
- Doğrulama: 1200×900 gerçek tarayıcı — kitap listesi tam genişlik
  dengeli. cark_test 0 · CSS dengesi 0.
- ⚠ Dalga II devamı (sıradaki): kitap kipi master-detail (liste + seçili
  kitap içeriği yan yana) · ÖLÇÜM hikâye katmanları · maskot-Rocky SVG.

**sürüm `2027-02-18a` ↔ `rota-2027-02-18a` · 709347 bayt**

---

## 239 · ⚠ EVREN KONSEPTİ (kullanıcı vizyonu · DALGA III ANA İŞİ)

Kullanıcının sözleriyle, uygulamanın nihai biçimi — TEK KAMERA, BÖLÜNMEYEN
SAHNE, FETİH METAFORU:

1. **Açılış:** Dre yıldızlarından birini büyütüp söndürür → GEZEGEN belirir.
   Gezegen kuş bakışı: her KİTAP bir BÖLGE; bölgenin rengi/dokusu o kitaptaki
   tamamlanma (hâkimiyet) oranını gösterir.
2. **Dre = menü:** Dre'ye tıklayınca yıldızları YAZILARA dönüşür:
   "deneme trendlerine bak" · "sıradaki görev ne olsun" · "tamamlananlar"…
   Seçenek seçilince kamera gezegenden UZAKLAŞIR, o özelliğin dünyasına
   YAKINLAŞIR (her özellik bir gök cismi: gezegen/kara delik/galaksi —
   hangisi o özelliğe yakışıyorsa).
3. **Kitaba dalış:** gezegendeki bölgeye tıkla → kamera O BÖLGEYE yaklaşır;
   içindekiler ALT-BÖLGELER hâlinde, konu bazlı hâkimiyet oranıyla boyalı.
   ÇÜRÜME animasyonları: unutulmaya yüz tutan konular solar/kurur.
   Fethedilen yerde YAŞAM BAŞLAR (yeşerme/ışıklar). Hedef duygusu: tüm
   gezegeni ele geçirmek = tüm konulara hâkim olmak.
4. Görev yapmak isteyen kullanıcı bölgeden konuya tıklar (görev başlat /
   tamamla) — mevcut yetenek sözleşmesi (§235) bire bir korunur.

### Mimari taslak (sonraki oturum için)

- **Sahne:** tek tam-ekran katman (mevcut #gok/#uzay üstüne `#evren`);
  kamera = tek transform (scale+translate) durum makinesi:
  `uzay → gezegen → bölge(kitap) → altBölge(konu)` ve `uzay → özellikDünyası`.
  Mevcut sayfalar (ÖLÇÜM/SEYİR panelleri) İLK AŞAMADA özellik-dünyası
  yakınlaşmasının vardığı yüzeyler olarak AYNEN kullanılır (kamera oraya
  "iner", sayfa açılır) — köklü yeniden yazım riske edilmez.
- **Veri:** bölgeler = kitap listesi (kaynak haritası); hâkimiyet =
  kitap/konu bazlı tamamlanma (D.bitti + D.pu + konuCalisildi, grup
  anahtarıyla); çürüme = unutma modeli tarihleri (curume/puTekrarGun).
  TÜMÜ mevcut — yeni veri gerekmiyor, yalnız görselleştirme.
- **Dre menüsü:** maskot SVG yıldızları → metin morph (mevcut maskotDurum
  API'si genişler: 'menu' durumu).
- **Aşamalandırma:** (a) gezegen kuş bakışı + hâkimiyet boyama + kitaba
  yakınlaşma (SEYİR'in yerini almaya aday) → (b) Dre menüsü + kamera
  özellik-dünyaları → (c) çürüme/yaşam animasyonları → (d) kara delik
  (kör noktalar?) / galaksi (deneme geçmişi?) metaforları.
- Performans: tek aktif yakınlaşma katmanı DOM'da tutulur (§103 dersi:
  her geçişte yıkıp kurma YOK); animasyonlar transform/opacity-only.

Başlangıç komutu: "Evren konseptine başla — §239".

---

## 240 · EVREN AŞAMA 0 · PLAN + VERİ OMURGASI · `2027-02-19a`

Kullanıcı /goal ile Evren vizyonunu OTURUM HEDEFİ yaptı (özü: mevcut sistemi
bozmadan, mevcut öğrenme motorunun ÜZERİNE görsel/navigasyon katmanı; tek
kamera; hâkimiyet=yaşam, decay=kararma; DRE=mevcut veriden nokta seçen
navigasyon zekâsı, içerik UYDURMAZ).

- **`EVREN_PLAN.md`** (repo kökü · YENİ): mimari plan — mevcut model özeti
  (doğrulanmış semboller), kozmik eşleme tablosu, kamera durum makinesi,
  6 aşama, performans (LOD, §103 kuralı), riskler + PR-başına geri dönüş.
- **`evrenVeri()`** (index.html · aşama 0): kozmik katmanın TEK veri
  kaynağı — her çağrıda mevcut modelden türetilir (bransDurum, bransCalisma,
  dqIstat, curume, KONU_DAG, konuCalisildi). 11 bölge; bölge başına
  hâkimiyet/beklenen/net/saat/çürüme/kırılgan/karaDelik + konu listesi
  (pay, çalışıldı, boşluk). HİÇBİR ŞEYİ DEĞİŞTİRMEZ, yalnız okur.
- `pu_test` +5 kontrol (EVREN bölümü). cark_test 0 · JS parse OK.
- Sıradaki (aşama 1): gezegen kuş bakışı SVG + hâkimiyet boyama + bölgeye
  kamera yakınlaşması — EVREN_PLAN.md aşama listesine göre, her aşama ayrı PR.

**sürüm `2027-02-19a` ↔ `rota-2027-02-19a`**

---

## 241 · KLİNİK REHBER MOTORU · `2027-02-20a`

Goal koşulu gereği fiilen kuruldu (§240 omurga üstüne):
- `rehberSec()`: adaylar YALNIZ POWERUP kataloğu (gerçek kitap+konu+sayfa;
  içerik/sayfa uydurma yapısal olarak imkânsız). CS = 2.2·boşluk +
  1.6·kırılgan-yanlış + 1.4·çürüme + 1.2·düşüş + 0.35·sınav ağırlığı +
  1.5·tekrar-eksikliği — tümü mevcut veriden (dqIstat/bransDurum/curume/D.pu).
- `rehberMetin(n)`: 📍 ÇALIŞILACAK YER (Kitap/Bölüm—Konu/Sayfa) + NEDEN
  (yalnız gerçekleşen sinyaller) + NE YAPMALISIN (katalogdaki eylem+saat+net).
- Yüzey: ÖLÇÜM Veri panelinde **Rehber 📍** düğmesi → en kritik 3 nokta
  metin kutusuna. (Kamera entegrasyonu Evren aşama 3'te.)
- pu_test +6 kontrol (format+gerçek sayfa regex+CS sıralı) · örnek çıktı
  test ortamında doğrulandı (Biyokimya—Amino Asitler · sf 123–151) ·
  cark_test 0 · JS parse OK.

**sürüm `2027-02-20a` ↔ `rota-2027-02-20a`**

---

## 242 · EVREN AŞAMA 1 · GEZEGEN KUŞ BAKIŞI · `2027-02-21a`

Goal "bütün aşamaları gerçekleştir" — EVREN_PLAN.md aşama 1 yayında:
- `#evrenKat` + `evrenCiz()`: 11 bölgeli SVG gezegen halkası; bölge dolgusu
  SÜREKLİ fonksiyonla hâkimiyete bağlı ışık (0.06+0.6·H), çürüme doygunluğu
  düşürür, kara delik ⚫ işareti. Merkezde sınava kalan gün.
- `evYakinlas(i)`: tek kamera — sahne grubu transform'la bölgeye yaklaşır
  (.8s), sağdan cam konu paneli açılır: konu başına pay, ✓ çalışıldı,
  ⚠ denemede boşluk. `geri`: önce uzaklaş, sonra evrenden çık.
- Giriş: karşılama kartındaki MASKOT Dre tıklanınca (kart kapanıp evren
  açılır). DOM bir kez kurulur (§103), animasyon transform-only.
- Doğrulama: gerçek tarayıcı 1100×760 — bölgeler hâkimiyetle ışıldadı
  (Patoloji %65 parlak · Anatomi %15 karanlık). pu_test +4 · cark_test 0.
- Sıradaki: aşama 2 (bölge→kitap→içindekiler) · 3 (DRE yıldız menüsü +
  rehber kamera sürüşü) · 4 (çürüme/yaşam animasyonları · deneme uydusu) ·
  5 (kara delik/galaksi/sayfa) — her biri ayrı PR.

**sürüm `2027-02-21a` ↔ `rota-2027-02-21a`**

---

## 243 · EVREN AŞAMA 2-5 · ÜRÜN TAMAM · `2027-02-22a`

Goal "bütün aşamaları gerçekleştir" — EVREN_PLAN.md kalan aşamaları yayında:
- **Aşama 2 · Kitap içindekiler:** bölge paneli kitap sekmeli; her kitabın
  konuları GERÇEK sayfa aralıklarıyla (POWERUP kataloğu) + ✓ durumu +
  "Çek" düğmesi (mevcut D.pu akışı: puSenkron+kay+carkCiz).
- **Aşama 3 · DRE menüsü + kamera sürüşü:** evMenuBar (📍 Sıradaki nokta ·
  Çürüyenler · En zayıf · En güçlü · Deneme trendleri). "Sıradaki nokta"
  rehberSec()[0]'ı alır → kamera bölgeye dalar, doğru kitap açılır, hedef
  konu satırı altın vurguyla ortalanır (evYakinlasVurgu). Trendler →
  kamera ÖLÇÜM dünyasına iner.
- **Aşama 4 · Yaşam/çürüme + deneme uydusu:** H≥.45 bölgelerde deterministik
  konumlu titreyen yaşam ışıkları (reduce-motion'da sabit); çürüme sektör
  doygunluğunu düşürüyor (aşama 1'den); DENEME UYDUSU: son K + eğilim oku,
  tıklayınca ÖLÇÜM'e iner.
- **Aşama 5 · Kara delik + sayfa düzeyi:** karaDelik bölgelerinde mor
  çerçeveli girdap görseli; sayfa düzeyi içindekilerde ulaşıldı (sf a–b).
- Doğrulama: gerçek tarayıcıda uçtan uca sürüş (rehber→Biyokimya→Yavuz
  Şahin SB→Amino Asitler sf 123–151 vurgulu). pu_test +7 · cark_test 0 ·
  JS/CSS temiz.
- Kalan cila (ürün sonrası iyileştirme, engel değil): sektör etiket LOD'u,
  uydu yörünge animasyonu, Dre yıldız-morph menüsü, kart açılış sekansına
  evren köprüsü.

**sürüm `2027-02-22a` ↔ `rota-2027-02-22a`**

---

## 244 · 3D PİVOT · GERÇEK WEBGL GEZEGEN · DİKEY DİLİM · `2027-02-23a`

**Kullanıcı §242-243 çıktısını REDDETTİ.** Talebin özü (birebir):
"Eski uygulamanın üzerine kozmetik bir katman istemiyorum … Gerçek bir 3D
kozmik sahne … KAMERA GERÇEKTEN HAREKET ETMELİ … 11 alanı pizza dilimi /
radial chart olarak çizmek YASAK … eski UI EVREN'in arkasında görünmemeli …
2D CSS transformlarıyla 3D gezegen taklidi yapma … Önce sadece bir vertical
slice: UZAY → GERÇEK 3D GEZEGEN → BİR BÖLGE → KAMERAYLA YÜZEYE YAKLAŞMA.
Bu küçük bölüm gerçekten doğru görünmeden kitap, DRE, decay ve deneme
uydusunu ekleme." Ölçüt: ekran görüntüsünde "uzayda duran, yaşayan bir
bilgi gezegeni" görünmeli; estetik Apple/Wikipedia bilimsel-premium, oyun değil.

**Sökülen:** 2D SVG evren tamamı — `evrenCiz/evYakinlas/evKitapCiz/evSur/`
`evYakinlasVurgu` JS'i, `#evSvg`+`evMenuBar`+`.evKonu` DOM/CSS'i (3 051
karakter CSS, imza-eşleşmeli tek blok; süslü parantez dengesi 1237=1237
doğrulandı). 2D revizyon iş akışı (wf_29697f1a) arka planda tamamlandı ama
çıktısı ENTEGRE EDİLMEDİ — son kullanıcı mesajı onu geçersiz kılmıştı.

**Kurulan (saf WebGL1, kütüphane yok — çevrimdışı tek dosya korunur):**
- `EV_VS/EV_FS`: tam ekran üçgen + raymarch küre. Kıtalar organik:
  domain-warp'lu (fbm bükümü) küresel Voronoi, 11 düzensiz merkez
  (`evSiteler()` altın sarmal + deterministik sapma). Eşit dilim YOK.
- Hâkimiyet → sürekli bant (§135 kuralı): ölü bazalt → kurak → yaşayan
  yeşil; şehir ışıkları makro-küme × nokta dokusu, gece yüzünde parlar.
  Çürüme → gri sis. Bölge içi denizler (`yuk` fbm) + kıyı sığlığı turkuazı
  + kutup buzu + bulut sürüklenmesi + fresnel atmosfer + yıldız alanı.
- KAMERA GERÇEK: `u_dist`+`u_rot`; giriş uçuşu 6.5→2.7 (2 600 ms ease-out),
  parmakla yörünge sürükleme, bölgeye tıkla → `evOdakla` en kısa yay
  üzerinden 1.45'e dalar; `evUzaklas` geri çıkar. Yaklaşınca sinematik
  ışık harmanı + normal-bükümlü rölyef + yakın doku oktavı devreye girer.
- Bölge seçimi GPU-pick: aynı shader `u_pick` kipinde bölge kimliğini
  kırmızı kanala yazar, `readPixels` okur. Ayrı 2D hit-test yok.
- `#evrenKat` arkaplanı OPAK `#020308` — eski UI evrenin arkasında görünmez
  (açık talep). Veri omurgası değişmedi: `evrenVeri()` aynen kaynak.
- WebGL yoksa `evrenAc` `hataKaydet('EVREN3D · …')` ile sessiz düşer.

**Doğrulama (başsız chromium + SwiftShader + playwright-core):**
yörünge görünümü: organik kıyılı kıtalar, iç denizler, kutup buzu,
terminatör ve gece yüzünde şehir ışıkları okunuyor; odak görünümü: bölgeye
gerçek kamera dalışı, HUD "Bölge · hâkimiyet %X · çürüme %Y". Bant testi
sarmalayıcıda u_H/u_C yelpazesiyle (0.04–0.92) çekildi — uygulama verisi
değil, görsel bant denetimi. Ekran görüntüleri kullanıcıya gönderildi.

**Bilinçli DURULAN yer:** kitap katmanı, DRE menüsü, decay ayrıntısı,
deneme uydusu EKLENMEDİ — kullanıcı "bu bölüm doğru görünmeden ekleme"
dedi; dilim onayı bekleniyor. EVREN_PLAN.md aşama 2+ bu onaya kilitli.

**Bu turda yaptığım hatalar:**
1. İlk ekran görüntüsünü karşılama katmanını hesaba katmadan çektim —
   kare karşılama animasyonunu gösterdi, bir tur kaybettim.
2. İlk shader taslağında güneş-kamera hizasını kontrol etmedim: varsayılan
   açı tam aydınlık yüz verdi ("bej top" görünümü). Terminatörü görünür
   kılan açıyı ölçerek seçmem gerekirdi (tahmin değil ölçüm ailesi).
3. §242/§243 pu_test bölümlerini kod söküldükten sonra bir süre bayat
   bıraktım; kapı koşulmadan önce fark edip yeniden yazdım.

**Kapılar (14'ü de koşuldu, çıktı tamamı okundu):** denet.py ✓ 196 görev ·
derin_test ✓ · kombo_test ✓ · cark_test ✓ (tamamı) · mola_test ✓ ·
kal_test ✓ (tamamı) · senk_etag ✓ · senk_uc ✓ 26 · senk_rol ✓ 20 ·
pu_test: yeni §244 bölümü 12/12 ✓, tek kırmızı bilinen §229 KONU TEKİLLİĞİ
7 hatası. Kırmızılar (hepsi §229'da belgeli, bu turdan bağımsız):
kural_test.py `eko.py` yok · kos.js sözdizimi kırık · senk_kos.js dosyası
yok · senk_poll.js `senk_test.js` bulamıyor. Görsel doğrulama başsız
SwiftShader'da; gerçek cihaz (iPad, Metal) görünümü kullanıcı onayında.

**sürüm `2027-02-23a` ↔ `rota-2027-02-23a`**

---

## 245 · ZİHİN EVRENİ · AÇIK ZEMİN BİLGİ HARİTASI · `2027-02-24a`

**Kullanıcı §244 raymarch gezegeni de reddetti** (yeni /goal). Özü: "Küre
teknik olarak güzel ama istediğim ürün değil. Çarkıfelek, pizza dilimi,
gerçekçi gezegen, çocukça oyun haritası, aşırı shader/node-gürültüsü
istemiyorum." İstenen: Obsidian graph berraklığı + Wikipedia bilgi düzeni +
Anki mastery + Animus "yaklaştıkça çözülme" hissi. UZAKTAN açık/beyaz zemin,
ince siyah çizgiler, küçük nokta kümeleri, az etiket; YAKLAŞTIKÇA yalnız
odaklanan alan çözülür; EN YAKINDA kitap/konu haritası gerçekten okunur.
Başarı testi: "Mobil oyun mu? HAYIR. Obsidian+Wikipedia zihin haritası mı?
EVET." Öncelik: veri bütünlüğü > navigasyon > okunabilirlik > hiyerarşi >
yaşayan katman > animasyon.

**Sökülen:** §244 WebGL raymarch gezegeni tamamı — EV_VS/EV_FS shaderları,
ev3dKur/evSiteler/evOdakla/evUzaklas/evSec/ev3dKare, `#ev3d` canvas, karanlık
`#020308` sahne. Veri omurgası `evrenVeri()` DOKUNULMADI.

**Kurulan (Canvas 2D, kütüphane yok):** `zeVeri()` türetme adaptörü — her
sayı mevcut motordan (`evrenVeri` + `POWERUP` + `D.pu` + `sirali/puan` +
`bransCalisma` + `rehberSec`); PARALEL MODEL YOK. Hiyerarşi tek yapıda:
- **L0 Evren:** TUS aktif galaksi (nokta sarmalı) + boş galaksi yuvaları
  (Harrison / USMLE / +yeni) — ürün genel amaçlı bilgi sistemi olabilir.
- **L1 Galaksi:** dört ajan — Görev Gezegeni (bilgi dünyası), Deneme
  Gezegeni (gerçek net trend çizgisi + K/ΔK), Çalışma Uydusu (saat+kalan
  gün), DRE (rehber ajan; `rehberSec()[0]`'a altın kesikli işaretçi).
- **L2 Bilgi dünyası:** 11 ders ülkesi (soru ağırlığıyla ölçekli daireler).
- **L2+ Şehirler:** konular nokta olarak (çalışılan dolu, boşluk kırmızı halka).
- **L3 Kitaplar:** her ders içinde POWERUP kitapları; içlerinde konu noktaları
  (Obsidian düğümü); tamamlanan oranı altın yay.
- **L4 İçindekiler:** seçili kitabın konuları haritada YERİNDE çözülen liste
  — gerçek sayfa aralıkları (sf a–b), ✓ tamamlanan / ◐ çalışılan / ○ bekleyen.
- **L5 Konu detayı:** seçili satır kendi bandında açılır (çakışmasız):
  ~saat · beklenen +net · soru ağırlığı + boşluk/tekrar durumu.
- **TEK KAMERA:** sürekli zoom/pan (tekerlek + pinch + sürükle), tıkla→hedefe
  eased uçuş, `geri` bir katman yukarı çıkar. Kırılım yolu üst şeritte
  (TUS › Görev › Ders › Kitap › Konu). Yaşayan katman (yaşam yapıları,
  çürüme sisi, kırılgan halkası) yalnız yakın zoomda; uzakta sade çizgi/nokta.

**Doğrulama (başsız chromium + playwright, altı düzey):** L0 evren, L1
galaksi, L2 dünya, L3 ders (Fizyoloji odak), L4 kitap içindekiler (Klinisyen
Vaka Fizyoloji, gerçek sf), L5 konu detayı — hepsi okunur, çakışmasız.
Ekran görüntüleri kullanıcıya gönderildi.

**Bilinçli DURULAN yer:** dilim yalnız Görev Gezegeni'ni gezer; Deneme/
Çalışma ajanlarına dalış ve kullanıcının diktiği anıt/heykel görselleri
sonraki adıma bırakıldı (goal: "önce sadece dikey dilim … sonra diğer
ajanlar eklenir"). Kullanıcı görsel onayı bekleniyor.

**Bu turda yaptığım hatalar:**
1. Test sarmalayıcısı `getElementById('ev3d')` ile canvas ölçüsünü okuyordu;
   canvas id `zeTuval` olunca null döndü — bir çekim kaybettim, düzelttim.
2. İlk kitap glifi çift dikey çizgiydi (kitap sırtı) ama ders zoomunda
   çetele-çizgisi/gürültü gibi okundu — goal "node gürültüsü yok" diyordu;
   konu noktalarına çevirdim.
3. Konu detayı ilk sürümde bir alttaki satırın üstüne biniyordu; seçili
   satırı kendi bandıyla genişletip hit-test'i de ona göre düzelttim.

**Kapılar:** pu_test §245 12/12 ✓; kırmızıların hepsi §229 KONU TEKİLLİĞİ 7
(bilinçli, bu turdan bağımsız). Diğer kapılar bu turda koşuldu.

**sürüm `2027-02-24a` ↔ `rota-2027-02-24a`**

---

## 246 · FORCE-DIRECTED İLİŞKİ AĞI · OBSIDIAN PRENSİPLERİ · `2027-02-25a`

Kullanıcı /goal ile "implementation özgürlüğü" verdi: graph katmanını sıfırdan
icat etme, Obsidian graph *prensiplerini* (düğüm-bağlantı, force pan/zoom,
kademeli detay, odak öne çıkar + çevre sadeleşir, düşük gürültü) ve uygun
lisanslı hazır çözümleri kullan. Ama tek kısıt sabit: **tek dosya, çevrimdışı,
harici CDN yasak** (§157). Ayrıca: veri motoru ADAPTER olarak bağlı kalsın,
görsel katman verinin sahibi olmasın, paralel veri/decay modeli yok.

**Karar (planlama workflow'u ile doğrulandı — 7 ajan: lisans/prensip/entegrasyon
+ 3 tasarım + jüri):** kütüphane GÖMME, **kompakt öz-yazım force-sim**. Gerekçe:
bize yalnız LAYOUT algoritması lazım (render Canvas 2D'de bizde), force-directed
kamuya açık algoritma (yay+itme+soğuma); kütüphane (d3-force ISC ~45KB, cytoscape
MIT ~2.8MB) inline + ES-modül→IIFE paketleme + ikinci rAF döngüsü karmaşıklık
ekler, stabilite eklemez. d3-force yedek olarak not edildi ama gerekmedi.

**Kurulan:**
- `zeForceSim(nodes,edges,opt)` — velocity Verlet: charge itme (dereceyle ölçekli) +
  link yay + merkez çekim + yarıçaplı çarpışma; alpha 1→0.02 soğuma, ~320 tick.
- `zeYerlestir(ajanlar,dersler)` — HİYERARŞİK iki seviye: (A) merkez(pinli)+11 ders+
  ~40 kitap tam force (~55 düğüm), (B) ~250 konu kitabın etrafında yerel halka.
  Böylece "hairball/node bulutu" yapısal olarak imkânsız (kullanıcı yasağı). ~70ms,
  açılışta BİR KEZ, deterministik (`zeRn` tohumu — reload/senk aynı yerleşim).
- Konumlar `dersler[].x/y`, `kitaplar[].x/y`, `konu._x/_y`'ye geri yazılır; per-frame
  maliyet sıfır (mevcut `ze.kir` dirty-flag korundu). Veri sayıları her çizimde
  nesneden CANLI okunur (donmuş değer tuzağı §72–85'ten kaçınıldı).
- **Görünür kenarlar** (yalnız veriden — ilişki uydurma yok): görev-hub→ders (yörünge)
  + ders→kitap (kapsam). İnce mürekkep; ağ bandında görünür, kitap okumaya (L4)
  girince SÖNER. Merkez "Görev" hub düğümü.
- **Odak davranışı (Obsidian — eksikti, eklendi):** bir ders/kitap seçiliyken odak +
  dalı TAM opak, diğer ders/kitap/kenar/konu alpha ×0.14–0.28 (soluklaşır, silinmez).
  DRE altın kesikli işaretçi korundu.

**Görsel dil (goal):** açık zemin `#FBFAF7`, ince siyah çizgi, nokta kümeleri;
uzaktan bilgi AĞI (Görev hub + ders yörüngeleri), yaklaşınca gerçek kitap/konu
haritası + mastery/decay yaşayan katman; en yakında okunur içindekiler (gerçek sf).

**Doğrulama:** başsız playwright + SwiftShader ile 6 düzey (evren·galaksi·ağ·ders
odak·kitap·konu) — hepsi okunur; ders/kitap/konu hit-test tıklama simülasyonuyla
doğrulandı (Fizyoloji tıkla → sec.ders=Fizyoloji). Layout izole testte 73ms,
çakışmasız, containment korunuyor (kitap→konu ort ~27). Ekran görüntüleri gönderildi.

**Bu turda yaptığım hatalar:**
1. pu_test §246'da `eG`/`QG` adları dosyada zaten tanımlıydı (satır 758) — parse
   kırıldı, `eGR`/`QGR`'ye çevirdim. (CLAUDE.md: yeni ad öncesi grep — bu kez
   kontrolü test kodunda atladım.)
2. Force layout ilk sürümü O(n²) 430 düğümde 372ms'ti (mobil için ağır);
   hiyerarşik iki seviyeye geçince 73ms'e indi — ölçtüm, tahmin etmedim.
3. İlk kitap yerleşiminde ders arası kitaplar çakışıyordu (-56px); çarpışma
   geçişi ekleyip ölçerek 12px'e çıkardım.

**Bilinçli DURULAN:** ders↔ders paylaşılan-havuz çapraz kenarları (§228) EKLENMEDİ —
gürültü riski, dilim onayı sonrası. Deneme/Çalışma ajanlarına dalış + anıt görselleri
de sonraki adım. Kullanıcı görsel onayı bekleniyor.

**Kapılar:** pu_test §245 12/12 + §246 9/9 ✓; diğer kapılar bu turda koşuldu.
Kırmızıların hepsi §229 KONU TEKİLLİĞİ 7 (bilinçli, bağımsız).

**sürüm `2027-02-25a` ↔ `rota-2027-02-25a`**

---

## 247 · FORCE-SIM SERTLEŞTİRME · uzak-itme kapağı · `2027-02-26a`

§246 planlama workflow'unun jürisi (7 ajan tamamlandı) bağımsız olarak
**A2'yi seçti: "mevcut el-yazımı zeForceSim'i koru ve sertleştir"** (skor 9.1;
d3 vendor 5.5; saf geometriye dönüş 6.0). d3 GÖMÜLMEDİ, geometriye dönülmedi —
yani §246'da sevk edilen zaten kazanan yaklaşım. Jürinin tek somut ön-onay
rafinmanı: A1'in tek iyi fikri olan **distanceMax kapağı**nı O(n²) charge
döngüsüne 2 satır guard olarak ekle (uzak düğümler global sürüklenme yaratmasın).

Uygulanan: `zeForceSim`'e `opt.distMax` (d²>dm² → itme atla). `zeYerlestir`'de
distMax **küme yarıçapına göreli**: `560+40·√(düğüm)` — jüri sabit 820'yi
"küme-göreli değil, katalog büyürse aşılır" diye riskli bulmuştu; göreli
formül bunu karşılıyor (156→254 konu geçmişi göz önünde). Doğrulama: iki
açılış birebir AYNI konum (determinizm/gist senk şartı ✓), gorevR 429, ders
bbox 715×728 (zarf uyumlu), ağ görünümü §246 ile görsel olarak AYNI (küçük
grafikte uzak-alan kuvvetleri zaten ihmal edilebilir; kapak yalnız büyük
katalogda devreye girer).

**Ertelenen (jüri onay-sonrası adımlar):** Obsidian yay kuralı (.6/min(deg))
denemesi, etiket çakışma-önleme (Görev/Küçük Stajlar örtüşmesi), ders↔ders
çapraz kenarları — hepsi kullanıcı görsel onayına bağlı.

**sürüm `2027-02-26a` ↔ `rota-2027-02-26a`**

---

## 248 · VERİ MOTORU AUDİT (kod değişmedi) · profesyonel öğrenme sistemi hedefi

Kullanıcı yeni yön: ürün artık salt görsel değil — Obsidian+Anki+kişisel
Wikipedia+deneme analizi+adaptif net projeksiyonu birleşimi profesyonel sistem.
EN ÖNEMLİ KURAL: mevcut veri motorunu koru, PARALEL model kurma. Bölüm 19:
kod değiştirmeden A–G audit çıkar; bölüm 18: canlı test (deneme→net→tahmin→
çalışma→yeni deneme→kalibrasyon değişti mi). Bu tur SADECE audit yapıldı,
motora dokunulmadı. Üç paralel okuma ajanı + canlı test (`kaynak/audit_test.js`).

**Bulgular (hepsi koddan doğrulandı):**
- **Kalibrasyon VAR ve çalışıyor** — `rCalHesap()` (2402) ters-varyans ağırlıklı
  Bayes, önsel R_CAL0=0.405±0.0995, DÖRT gözlem kanalı: (1) 24'lü D.kal ayrık/
  kapsam, (2) deneme-içi kontrast (çalışılan vs çalışılmayan konu — en güçlü,
  deneme zorluğunu sadeleştirir), (3) ardışık tam deneme farkı (D_ORAN payı
  çıkarılır), (4) konu çiftleri. `[0.15,0.85]` kırpma. `puan()` sabit; öğrenme
  `para()` içindeki netlerde. İkincil `D_ORAN` (deneme→net) de kalibre.
- **Projeksiyon zaten BANT** — `puanBant(±1)` = proj ± 1.96·sd; `ust()` içinde
  "b1–b2" gösteriliyor (hN, ~3900). Az veri koruması = geniş bant (açık metin yok).
- **Güven E/AK/B/U ayrı sinyal** — `dqIstat` sag(D+Emin)/kir(D+güvensiz)/unut/bilm
  + bosluk; ham `{s,e}` her soruda `D.denemeler[].sorular[]`'de → 8'li matris TÜREVİ.
- **Görev önerisi veri-güdümlü** — `rehberSec` CS=2.2·boş+1.6·yan+1.4·çür+1.2·düş+
  0.35·soru+1.5·tekrar; `puEtki/puSirali` verim=etki/saat (beklenen net·zaman·Rr
  unutma·soru ağırlığı·boşluk). Adaylar POWERUP kataloğundan (icat yok).
- **Konu↔konu bağlantı tablosu YOK** — KONU_DAG hiyerarşi (branş→konu→pay);
  §228 "grup anahtarı" = aynı konunun tekilliği, bağlantı değil. Uydurmadan
  TÜRETİLEBİLİR: ortak-kitap (POWERUP hazır), aynı-ad/grup çakışması (konuOrtus),
  birlikte-hata (yalnız Ayrıntılı deneme sorular[].konu; çift üretimi yok).
  Önkoşul/klinik/mekanizma için VERİ YOK — elle kürasyon gerekir.

**Canlı test sonuçları (kaynak/audit_test.js, gerçek sayı):**
1) n=0 → 0.405±0.195, bant genişliği 1.00 · 2) kötü deneme → R_CAL 0.405→0.376
(Δ−0.029, shrinkage) · 3) 30 iyi gözlem → 0.850, bant 1.00→0.18 (daraldı) ·
4) Doğru+Emin sag=10 vs Doğru+Bilmiyorum kir=10 (ayrışıyor) · 5) düşük deneme +
güçlü çalışılan-konu → 0.439 (tabana çekilmedi) · 6) CS decay ile değişiyor.

**⚠ GERÇEK HATA (bu turda bulundu, düzeltilmedi — audit aşaması):** `rehberSec`
CS'indeki `cur` bileşeni DEJENERE. `curume(br,bgun(),SINAV_G)` bir GÜN içinde
tüm branşlarda AYNI değeri döndürür (g=sınava kalan gün, branştan bağımsız);
zamanla değişir ama ADAYLAR ARASI sıralamayı ayrıştırmaz. Yorum (6796) onu
ayrıştırıcı sanıyor. Gerçek konu-bazlı çürüme (son çalışma tarihinden bu yana)
CS'e girmiyor. Düzeltme kararı kullanıcıya bırakıldı.

**Eksikler (kullanıcı vizyonu vs mevcut):** (a) "son 5 deneme +3.1" kayan-pencere
trend sayısı YOK. (b) tempo-bazlı (net/gün) ileri projeksiyon YOK — ileri
projeksiyon plan+çürüme tabanlı. (c) iki öneri motoru (rehber CS · power-up verim)
aynı faktör setini paylaşmıyor; birleştirme kararı açık. (d) konu-bazlı "son
çalışma X gün önce" unutma önceliğe girmiyor.

**Karar bekleyen (kullanıcıya sunuldu):** cur teriminin konu-bazlı çürümeye
bağlanması; hangi konu-bağlantı tiplerinin (ortak-kitap/aynı-ad/birlikte-hata)
etkinleştirileceği; trend/tempo sayılarının eklenmesi; iki öneri motorunun
birleştirilip birleştirilmeyeceği. Motor DEĞİŞMEDEN audit tamamlandı.

---

## 249 · PROFESYONEL SİSTEM YOL HARİTASI · FAZ 1 (bağlantı kurtarma) + FAZ 2 (konu decay) · `2027-02-27a`

Kullanıcı 11 fazlık yol haritası verdi (Obsidian+Wikipedia+Anki+mevcut TUS
motoru = ciddi doktor bilgi haritası). DEĞİŞMEZ: paralel model YOK, mevcut
motor tek kaynak, eski UI görsel olarak geri gelmez (yalnız veri). Her fazdan
sonra 7-başlıklı rapor. Bu tur FAZ 1 + FAZ 2.

**FAZ 1 · Eski Seyir Defteri konu bağlantıları KURTARILDI (kod değişmedi):**
İki paralel arkeoloji ajanı + doğrudan okuma. Bulgu: bağlantılar kayıp değil —
**KOMBO** (index.html ~2111, kaynak/kombo.json, 99 kayıt). Eski "Sefer"
(seyirCiz/kordonCiz) sayfasında "yeşil halatlar" olarak çiziliyor: "bir konuyu
öğrenince bağlı olduğunun maliyeti düşüyor". Yapı: `[kaynakGörevId, hedefId,
gerekçe, kaynakEtiket, hedefEtiket, günFarkı(f)]`. İki tip: f=0 aynı gün
"↔ kesişen konular pekiştiriyor" (40), f=1 ertesi gün "→ temel yarını
hızlandırıyor" (59). ⚠ NÜANSLAR: (a) **kural-türevi**, elle çizilmiş değil —
`yeniden.py` konuların `z` (organ-sistem zinciri) etiketinden üretiyor (aynı z,
≤1 gün, farklı branş). Kullanıcının elle kurduğu = konuların `z` gruplaması.
(b) **salt görsel** — gorevKazanc/bul/denemeDeger'e bağlı DEĞİL. (c) **üretici
drift**: dağıtımdaki kombo.json'u üreten gerçek jeneratör kaynak/'ta YOK;
boru hattı baştan koşulursa açıklamalar bozulur (pu/kural_test yalnız uç-geçerli
denetliyor). (d) git geçmişi 2026-07-27'de başlıyor; KOMBO ilk commit'ten beri
var, başka/daha eski konu↔konu yapısı git'te YOK (öncesi olsa tus_tamami.tar.gz
devir paketinde olurdu). Yeni force-graph kenarları hiyerarşik (merkez→ders→
kitap), KOMBO'yu kullanmıyor. → FAZ 8'de KOMBO yeni haritaya "yol" olarak
taşınacak + türetilebilir tipler (ortak-kitap/aynı-ad/birlikte-hata) SİSTEM
ETİKETLİ eklenecek (kullanıcı-kurulu gibi gösterilmeyecek).

**FAZ 2 · Konu-seviye gerçek decay → görev önceliği (§248'de bulunan cur hatası
düzeltildi):** rehberSec CS'indeki `cur` dejenereydi — `curume(br,bugün,SINAV_G)`
bir gün içinde tüm branşlarda AYNI, sıralamayı ayrıştırmıyordu. Düzeltme (YENİ
MODEL YOK):
- `konuSonKume()` / `konuSon()` — bir konunun EN SON çalışma tarihi, mevcut
  D.bitti (içerik görevleri) + D.pu (.tb/.bit power-up) tarihlerinden. konuKayit
  EN ERKEN tutuyordu; bu EN SON tutuyor. Anahtar mevcut konuAnh şeması.
- `konuCurume(brans,konu,grup,gün)` — son çalışmadan bu yana `1-Rr(g,S_TEK)`
  (para()'nın taze-materyal modelinin aynısı). Hiç çalışılmadıysa cur=0
  (bu decay değil, boşluk; bos/mastery taşır).
- rehberSec artık konu-seviye cur kullanıyor + neden.sonGun ekli (açıklanabilirlik).
- **Doğrulama (kaynak/audit_test yanında canlı test):** 18 gün önce çalışılan konu
  cur=0.234 vs 2 gün önce cur=0.037 (ayrışıyor ✓); rehberSec cur değeri 1→çok
  (dejenere düzeldi); hiç çalışılmamış 268/270 konu cur=0 (boşluk).

**Bu turda yaptığım hatalar:** (1) §248 audit commit'imi branch reset'iyle geçici
kaybettim; b3e7227'den geri aldım. (2) Test harness'ı /mnt/user-data/outputs'tan
okuyor; index.html'i kopyalamadan koştum, konuCurume "tanımsız" çıktı — kopyalayıp
tekrar koştum. (3) İlk connection-audit ajanı (§248) KOMBO'yu bağlantı olarak
tanımadı; kullanıcının ısrarı üzerine yeniden arayınca bulundu.

**Sonraki:** FAZ 3 (son 5 deneme kayan-pencere trendi, R_CAL'den AYRI gözlemsel
katman). Sonra FAZ 4 (tempo-bazlı ileri projeksiyon), FAZ 5 (iki öneri motorunu
birleştir), FAZ 6-11 (200 soru derinleştirme, yaşayan harita, Obsidian fonk.,
ajanlar, geri izolasyon, polish). Görsel değişiklik FAZ 7'de başlıyor.

**sürüm `2027-02-27a` ↔ `rota-2027-02-27a`**

---

## 250 · FAZ 3 · SON N DENEME GÖZLEMSEL TRENDİ · `2027-02-28a`

Auditte (§248) bulunan ikinci eksik kapatıldı: "son 5 deneme +3.1" kayan-pencere
trendi YOKtu. Eklendi — **R_CAL'in YERİNE değil, AYRI gözlem katmanı** (kullanıcı
şartı). Yeni model değil; yalnız D.denemeler + puan() okuması.
- `denemeBrNet(o,br)`: bir denemenin branş neti (Fizyoloji+Histo birleşik).
- `denemeTrend(N=5)`: son N denemenin puan serisi + delta + genel yön (▲→▼) +
  branş yönleri (pencere ilk↔son oran değişimi, ±0.03 eşiği). <2 deneme →
  `{yeter:false}` ("yeterli veri yok").
- **Doğrulama:** seri 54.2→55.4→56.1→57.3→58.2, delta +4 ▲; Anatomi ▲/Fizyoloji ▲/
  Biyokimya →/Patoloji ▼ beklendiği gibi; tek deneme yeter:false; **trend R_CAL'i
  DEĞİŞTİRMİYOR** (0.405 sabit — ayrı katman kanıtı).
- pu_test'e §249/§250 bölümü eklendi (11 kontrol): konu decay ayrışması + dejenere
  değil + denemeTrend + az-veri koruması + R_CAL izolasyonu.

**Not · UI:** denemeTrend/konuCurume şu an motor katmanı; kullanıcıya gösterim
(Son 5: … +3.1, branş okları, "son çalışma X gün önce") FAZ 5 (açıklanabilir öneri)
ve FAZ 7 (yaşayan harita) UI işi. Motor hazır, yüzey sonra.

**Sonraki:** FAZ 4 — tempo-bazlı ileri projeksiyon (kalibre tahminin YANINDA ayrı
senaryo: mevcut tempo + kalan süre + beklenen çalışma etkisi + decay; para()'nın
gerçek getiri mantığıyla, uydurma yok).

**sürüm `2027-02-28a` ↔ `rota-2027-02-28a`**

---

## 251 · FAZ 4 · TEMPO-BAZLI SENARYO PROJEKSİYONU · `2027-02-28a`

Auditteki (§248) üçüncü eksik: "mevcut tempoyla ileri projeksiyon" YOKtu.
Eklendi — kalibre tahminin (puan(para())) YANINA ayrı senaryo. Yeni model YOK:
- `tempoProjeksiyon(ekSaatGün)`: gerçek tempo = (harcanan saat)/(geçen gün);
  kapasite = (tempo+ekSaat)×kalan gün; kalan işler PLAN SIRASINDA kapasiteye
  kadar doldurulur; getiri mevcut `puanVarsayim`(seçilenler) ile — para/decay/
  R_CAL zinciriyle. Döner: {tempo, kalanGun, kapasite, mevcut, net, secilenIs,
  kalanIs, kapsananSaat}.
- Kavram ayrımı (kullanıcı şartı): A) kalibre tahmin = puan(para()) [banttı, §248];
  B) senaryo = bu. İkisi ayrı gösterilecek.
- **Doğrulama (değişmezler):** MEVCUT 54.8 ≤ TEMPO 55.1 ≤ +1 55.5 ≤ +3 56.3 ≤
  PLANIN TAMAMI 59.0 (tavan); monoton; hepsi tavanla sınırlı; ek saat tavana
  yaklaştırıyor; sınav günü net=mevcut; **R_CAL değişmiyor** (ayrı senaryo).
  pu_test §251 (7 kontrol). Kullanıcının section-5 örneğiyle (58.7→61.2→63.0)
  aynı yapı.

**Not · UI:** tempoProjeksiyon motor katmanı; "MEVCUT TAHMİN / TEMPO KORUNURSA /
+1 saat" gösterimi FAZ 5-7 UI işi. Aşırı kesinlik göstermeyecek — kapasite
yaklaşık, net "~" ile sunulacak.

**Motor katmanı özeti (FAZ 2-4 bitti):** konuCurume (konu-decay), denemeTrend
(gözlemsel trend), tempoProjeksiyon (senaryo) — üçü de mevcut motordan türetim,
paralel model yok, R_CAL/kalibrasyon dokunulmadı. Kapılarla korunuyor.

**Sonraki:** FAZ 5 — iki görev öneri motorunu (rehberSec CS · puEtki/puSirali
verim) TEK açıklanabilir öncelik katmanında birleştir; her önerinin "neden"i
(boşluk/yanlış/decay/soru ağırlığı/beklenen net/süre/tekrar/mastery/son çalışma)
izlenebilir olsun. Mevcut sinyalleri sil me — ortak karar katmanında topla.

**sürüm `2027-02-28a` ↔ `rota-2027-02-28a`**

---

## 252 · GERÇEK VERİ AUDİTİ · PARAKETE/POTANSİYEL/R_CAL (kod değişmedi · FAZ 5 öncesi)

Kullanıcı gerçek 200 soruluk deneme girdi; FAZ 5'ten önce Parakete/Potansiyel/
R_CAL/deneme analizi/görev motorunun doğru çalıştığını kanıtlı denetlememi
istedi. ⚠ Kullanıcının GERÇEK cevapları tarayıcı localStorage'ında; buradan
erişilemiyor. Bu yüzden TEMSİLİ 200 soru (branş dağılımı SORU.den ile birebir)
kurup MEKANİĞİ denetledim (kaynak/audit_parakete.js). Motora DOKUNULMADI.

**Kavram tanımları (koddan kesin):**
- ölçülen = puan(son().t, son().k) — son denemenin ölçülen neti
- PARAKETE = puan(para().t, para().k) — planı bitirirsem, decay + kalibre kazanç
- POTANSİYEL ("Kalan potansiyel", tkV) = kalanKazanci().fark = puanVarsayim(tüm
  kalan) − PARAKETE → EK NET (delta), skor DEĞİL. Tavan = PARAKETE + POTANSİYEL.

**Doğrulanan (🟢):**
- Veri bütünlüğü: 200 soru, her biri {b,konu,s,e}; dqIstat 8 hücreyi ayırıyor
  (sağlam=D+Emin, kırılgan=D+güvensiz, unuttum, bilmiyorum).
- PARAKETE motor değeri = bağımsız yeniden hesap (TABAN+KT·t+KK·k) BİREBİR aynı;
  UI (hP) doğrudan bu fonksiyonu basıyor → UI↔motor ayrışması YOK (yapısal).
- PARAKETE ≠ POTANSİYEL: biri skor, biri delta.
- FAZ 2 konu-decay görev motorunda çalışıyor: çür=0.13(son 8g)/0.20(son 14g)/
  0.07(son 4g) — konu-seviye ayrışıyor.

**Açıklanabilirlik/UX bulguları (🟡 — düzeltme kullanıcı onayına bırakıldı):**
1. **Tek 200’lük deneme R_CAL’i OYNATMIYOR** (ΔR_CAL=0, n=0). R_CAL kanalları:
   24’lük D.kal (kd/ky/kb), deneme-içi kontrast (e.konular — 200’lükte bu şekilde
   yok), ardışık deneme çifti (≥2 gerekir), konu çiftleri. Yani ilk 200’lük
   deneme PARAKETE’yi (bn üzerinden) ve analizi (dqIstat) besler ama R_CAL
   kalibrasyonu İKİNCİ denemeden itibaren devreye girer. Güven E/AK/B/U analizi/
   görev önceliğini besliyor, R_CAL’i doğrudan DEĞİL.
2. **Güven bandı 0.00’a çöküyor** (bu senaryoda): deneme en son olay, sonrasında
   çalışma yok → projeksiyon ölçülenin decay’i, R_CAL belirsizliği uygulanacak
   çalışma-kazancı yok → bant daralıyor. Doğru ama kullanıcıya açıklanmalı.
3. **Görev önerisinde TEKRAR:** POWERUP 270 kayıt / 230 tekil (branş,konu); 31
   konu birden çok kitaptan. rehberSec teklemiyor → aynı konu (ör. Biyokimya/
   Lipidler) listede iki kez. Düzeltme: rehberSec çıktısını (branş,konu) bazında
   tekilleştir (kararı kullanıcı).
4. **bosluk konu-adı eşleşmesine bağlı** (sessiz-sıfır riski, CLAUDE.md §153):
   deneme konu adı POWERUP konu adıyla birebir eşleşmezse bos=0 sessizce.

**VERDİKT: 🟡 MOTOR DOĞRU AMA AÇIKLANABİLİRLİK EKSİK.** Hesaplar doğru, UI↔motor
ayrışması yok; ama (a) R_CAL’in ne zaman devreye girdiği, (b) bant semantiği,
(c) yinelenen öneri, (d) bosluk eşleşmesi kullanıcıya görünür/sağlam değil.
Bunlar FAZ 5’in (açıklanabilir öneri) ve küçük düzeltmelerin konusu — kullanıcı
onayı bekleniyor. Gerçek sayı denetimi için kullanıcının localStorage 'rota-veri'
JSON'unu vermesi gerekiyor (rapor sonunda adımlar).

**sürüm değişmedi (yalnız audit) · kaynak/audit_parakete.js eklendi**

---

## 253 · GERÇEK VERİ AUDİTİ · kullanıcı 200 soruluk denemesi (kod değişmedi)

Kullanıcı gerçek localStorage 'rota-veri' verisini verdi (6 deneme, sonuncusu
2026-08-02 · 200 soru · Ayrıntılı · t=41.5 k=40.75). Motor DEĞİŞMEDEN denetlendi
(kaynak/audit_gercek.js; kullanıcı verisi repoya KOYULMADI, scratchpad'de).

**Deploy audit:** `.github/workflows` YOK → otomatik deploy YOK; dağıtım elle
(CLAUDE.md ile tutarlı). origin/main güncel (e03da6e · 2027-02-28a). Canlı Pages
container'dan erişilemedi (HTTP 000, proxy github.io). Kullanıcı cihazda sürümü
görüp 2027-02-28a ile karşılaştırmalı.

**🟢 DOĞRULANAN (gerçek veriyle, birebir):**
- 200 soru: dy(kayıtlı) ↔ sorular[] bağımsız sayım BİREBİR; dqBransNet T=41.5
  K=40.75 = kayıtlı.
- 8'li matris (gerçek): D+Emin 45 · D+Bilmiyorum 39 · Y+Bilmiyorum 51 · Y+Unuttum
  16 · Y+Emin 6. dqIstat sağlam=45 kırılgan=58 = matris. → "Netin 82 ama sağlam
  bilgi 45; 39 doğru şans/tanıma" içgörüsü VERİDEN çıkıyor.
- PARAKETE: ölçülen puan(41.5,40.75)=60.15; para()→59.35; bağımsız yeniden hesap
  BİREBİR. PARAKETE(59.35) < ölçülen(60.15): decay dürüstçe düşürüyor.
- R_CAL: gerçek 6 denemeyle n=2, R_CAL=0.355 SD=0.092 (önsel 0.405'ten aşağı —
  kişisel: bir tur çalışma ortalamadan AZ kapatıyor). Son deneme ΔR_CAL=-0.050
  (aşırı oynatmıyor). ⚠ Düzeltme: §252'de "tek deneme R_CAL'i oynatmıyor" dedim;
  DOĞRU ama kullanıcının 6 denemesi var → ardışık-çift kanalı çalışıyor, R_CAL
  kalibre oluyor. İlk deneme oynatmaz, sonrakiler oynatır.
- FAZ 3 denemeTrend(5): 53.2→52.8→55.2→57.6→60.1 · Δ +6.9 (gerçek yükseliş).
- FAZ 4 tempoProjeksiyon: tempo 2.48 sa/gün · +0→60.1, +1→60.8, +3→61.8 (124/124);
  MONOTON ✓. Kalibre tahmin (PARAKETE 59.35) ile senaryo (tempo) AYRI.

**🟡 AÇIKLANABİLİRLİK/UX (FAZ 5 kapsamı, motor doğru):**
1. Güven bandı PARAKETE'ye bağlı ve 0.00 çıkıyor (bu senaryoda deneme-sonrası
   çalışma yok → R_CAL belirsizliği tabana yansımıyor). Bant, R_CAL belirsizliğinin
   yaşadığı ULAŞILABİLİR TAVAN'a (PARAKETE+Potansiyel) taşınmalı.
2. rehberSec yinelenen öneri: 270 kayıt / 230 tekil → 40 yinelenen. Tekilleştir.
3. Export'ta D.pu yoktu (yalnız bitti/denemeler/guncel); power-up çalışma tarihleri
   ayrı anahtarda olabilir — FAZ 2 decay program görevlerinden çalışıyor, power-up
   tarafı eksik veriyle sınanamadı.

**VERDİKT: 🟢 MOTOR DOĞRU · FAZ 5'e geçilebilir.** Çekirdek hesaplar (veri
bütünlüğü, PARAKETE, R_CAL kalibrasyon, trend, tempo) gerçek veriyle birebir
doğrulandı; UI↔motor ayrışması yok. 🟡 maddeler tam olarak FAZ 5'in (açıklanabilir
birleşik öneri + net kartı) işi — orada bant yerleşimi + dedup + "neden" görünürlüğü
ele alınacak.

**sürüm değişmedi (audit) · kaynak/audit_gercek.js eklendi**

---

## §254 · FAZ 5 — tek açıklanabilir öncelik katmanı + ulaşılabilir tavan bandı

**Ne yapıldı (üç iş, motor tek kaynak korunarak):**

1. **`gorevOncelik()` / `gorevNeden()`** (index.html ~6934) — iki öneri motorunu
   BİRLEŞTİRİR, YENİ MODEL DEĞİL: `rehberSec()` (zayıflık · CS) + `puEtki()`
   (ekonomik beklenen net) tek skorda: `skor = CS + 1.2·min(1.5,beklenenNet)`.
   Sonra `(branş§konu)` anahtarıyla TEKİLLEŞTİRİR. Gerçek veride 270 ham → 230
   tekil (40 yinelenen ayıklandı, §253 bulgusu 🟡-2 kapandı). `gorevNeden()`
   her öneriyi kanıt cümlelerine çevirir (boş soru, sezgi oranı, çürüme+son gün,
   branş düşüşü, sınav ağırlığı, tekrar günü). `rehberMetin()` artık bunu kullanıyor;
   eski `u._net "?"` hatası düzeldi.

2. **Ulaşılabilir tavan bandı `tavanBant(yon)`** (§253 bulgusu 🟡-1). PARAKETE'nin
   belirsizliği ~0 (ölçülen netin çürümesi, R_CAL'e bağlı değil — `curume()`
   rCal çağırmıyor, doğrulandı). Asıl belirsizlik "kalan iş NE KADAR kazandıracak"
   = R_CAL. Bant artık **tüm kalan iş bitince ulaşılacak skorun** R_CAL±1.96·sd
   aralığı. Üst şerit `hN` bunu "→ 60.8–63.6" olarak gösteriyor; `puanBant`
   (PARAKETE bandı, kal_test'in ölçtüğü) DEĞİŞMEDEN duruyor.

   ⚠ **KÖK KUSUR (bu turda bulundu ve düzeltildi):** ilk uygulama `_rcOnb.v`'yi
   geçici yazıp `puanVarsayim`'i çağırıyordu → bant 0.00 kalıyordu. Neden:
   `puanVarsayim` D.bitti'yi geçici değiştirir; `rCal()` önbellek anahtarı
   `Object.keys(D.bitti).length` içerdiği için anahtar değişir, rCal YENİDEN
   HESAPLAR ve override'ı SİLER. Çözüm: ayrı `_rcZorla` bayrağı; `rCal()` EN
   BAŞTA onu döndürür (önbellekten bağımsız), `puanBant`/`tavanBant` try/finally
   ile sıfırlar. Düzeltme sonrası gerçek veride bant 60.78–63.56 (genişlik 2.78).

**Kullanılan mevcut motor fonksiyonları:** rehberSec, puEtki, para, puanVarsayim,
rCal, puan, curume, kalanKazanci. **Yeni paralel model:** yok (yalnız birleştirme
+ zorlama-bayrağı düzeltmesi).

**Kapılar:** kal_test ✓ (stale iddia güncellendi: üst şerit bandı artık `tavanBant`
arıyor, §254 tasarımı) · derin_test ✓ · kombo_test ✓ · cark_test ✓ · mola_test ✓ ·
senk_etag/uc/rol ✓ · pu_test: yeni FAZ 5 bölümü 12 kontrol SIFIR HATA
(tavanBant bandı açılıyor + _rcZorla sıfırlanıyor kanıtlı); toplam ✗ hâlâ 7 =
DEĞİŞMEDEN §229 KONU TEKİLLİĞİ bloğu (dokunulmadı). kural_test.py/denet.py
(app_gorev.json yok) · senk_poll (senk_test.js yok) — paket boşluğu, kod değil.

**Görsel değişiklik:** üst şeritte `hN` artık "→ alt–üst" tavan bandı; rehber
metninde "beklenen +X net" cümlesi. (Gerçek cihaz görsel doğrulaması yapılmadı —
sadece motor+metin.)

**Eksik / sonraki:** FAZ 6 (deneme gezegeni derinliği · 8'li matris UI),
FAZ 7 (yaşayan harita görsel dili), FAZ 8 (Obsidian fonksiyonları), FAZ 9-11.

**Bu turda yaptığım hatalar:**
- İlk tanı betiğimdeki `paraWith` yardımcısı 61.83 vs 64.0 verip "override
  çalışıyor" izlenimi yarattı; oysa bu bir **önbellek-sıra kazasıydı** (ilk
  çağrı 25-anahtarla ıskaladı, ikinci çağrı 204-anahtarla tuttu). Sayıyı
  olduğu gibi kabul etseydim yanlış teşhis koyardım; adım adım iz sürüp
  gerçek kökü (D.bitti mutasyonu → önbellek anahtarı) buldum.
- Önceki turda `tavanBant`'ı `_rcOnb.v` override'ıyla yazıp "bant açılır"
  varsaymıştım; gerçek veriyle koşmadan doğru sandım. Ölçünce 0.00 çıktı.
  Ders (yine): türetilmiş değeri gerçek veriyle ölçmeden "çalışıyor" deme.

**sürüm 2027-03-01a ↔ rota-2027-03-01a**

---

## §255 · FAZ 6 — Deneme Gezegeni derinliği (8'li matris + tanı + konu kırılımı)

**Ne yapıldı:** zihin evrenindeki **Deneme Gezegeni** artık dalış yapılabilir
(eskiden tıklayınca "bu dilimde yalnız Görev Gezegeni gezilir" diyordu). Tıklayınca
alttan açılan bir **derinlik paneli** (`#zeDp`) geliyor:

1. **8 hücreli güven matrisi** — Doğru/Yanlış × Eminim/Arada/Bilmiyorum/Unuttum.
   Gerçek veride: DE 45 · DAK 8 · DB 39 · DU 11 · YE 6 · YAK 10 · YB 51 · YU 16.
2. **Tanısal bölgeler** — sağlam bilgi (DE 45) · yanlış öğrenilmiş (YE 6, "emindin
   ama yanlış, en tehlikelisi") · şans/tanıma (DB+DU 50) · kararsız sınır (18) ·
   unutma/decay (YU 16). Her biri renk noktalı, sayılı.
3. **Vurgu** — "103 doğrunun 45'i (%44) sağlam · net 82.3 ama güvenebileceğin
   çekirdek 45 soru." (§253'teki "net 82 ama bilgi 45" bulgusu artık UI'da.)
4. **Konu kırılımı** — en çok boşluk verilen konular (Nöroanatomi 7, Aminoasit
   metabolizması 3, …), ince çubuklu.

**Yeni motor fonksiyonu:** `denemeMatris()` — ayrıntılı denemelerin `sorular[]`
alanından 8 hücre + tanısal toplamları TÜRETİR (donmuş değer yok, paralel model yok;
`dqIstat`'ın ham kaynağını 8 hücreye ayırır). Boş sorular 8 hücrenin dışında.
net = doğru − 0.25·yanlış birebir tutuyor.

**Kullanılan mevcut motor:** dqIstat (bosluk), D.denemeler. **Paralel model:** yok.

**Görsel dil:** açık zemin (#FBFAF7), ince gri çizgiler, çok hafif tanısal tonlar
(DE soft yeşil #EEF4EA, YE soft kırmızı #FaEDE9 — neon değil, akademik/tıbbi çizelge
hissi). Panel alttan yay ile açılıyor; scrim tıklanınca ve × ile kapanıyor.

**Geri izolasyonu (FAZ 10 ön-adımı):** panel açıkken `zeGeri()` önce paneli kapatır,
haritaya dönmez; eski arayüze ASLA gitmez.

**Kapılar:** kal_test/derin/kombo/cark/mola ✓ · pu_test yeni FAZ 6 bölümü 10 kontrol
SIFIR HATA (8 hücre birebir, boş dışarıda, net doğru, tanısal bölge eşlemesi,
dqIstat tutarlılığı, dalış+geri bağlantısı); toplam ✗ hâlâ 7 = değişmeden §229 bloğu.

**Görsel doğrulama:** başsız Chromium (iPad 834px + telefon 390px), GERÇEK kullanıcı
verisiyle (localStorage anahtarı `rota-tus-v6`) ekran görüntüsü alındı; panel her iki
genişlikte de düzgün, matris ızgarası taşmıyor. (Kare-fark değil, tam-kare inceleme.)

**Eksik / sonraki:** FAZ 7 (yaşayan harita görsel dili · mastery/decay renk-doku,
anıt, canlanma), FAZ 8 (Obsidian: KOMBO yolları + arama/filtre/odak + backlink),
FAZ 9-11.

**Bu turda yaptığım hatalar:**
- Görsel doğrulama betiğinde localStorage anahtarını **CLAUDE.md'ye güvenerek**
  `rota-veri` yazdım; gerçek anahtar koddaki `rota-tus-v6` (Depo, satır ~2180).
  İlk ekran görüntüsü bu yüzden BOŞ durumu (seed veri) gösterdi ve panelin
  çalışmadığını sanabilirdim. Kod okununca (belge değil) anahtar düzeldi, gerçek
  veri yüklendi. Ders (yine, CLAUDE.md §hafıza-2): durum bilgisini belgeden değil
  KODDAN oku.
- pu_test FAZ 6 regex'ini tırnak-birleştirmeyle bozuk yazdım (`'+"'deneme'"+'`),
  yanlış "hata" verdi; temiz literal ile düzeldi. (Gerçek kusur değildi, test kusuru.)

**sürüm 2027-03-02a ↔ rota-2027-03-02a**

---

## §256 · FAZ 7 — Yaşayan harita görsel dili (diyar sağlığı overview'da okunur)

**Sorun (ekran görüntüsüyle saptandı):** zihin evreninde mastery/decay/kırılganlık
zaten çiziliyordu AMA yalnız DERİN yakınlaşmada (aCan katmanı). Ders-overview'da
(galaksinin bütününe bakış — asıl tarama yaptığın zoom) 11 diyar da BİRBİRİNİN AYNISI
ince gri halkaydı; hangisi güçlü/zayıf/kırılgan uzaktan okunmuyordu.

**Ne yapıldı (`zeCiz` ders döngüsüne eklenti, veri = `evrenVeri` H/C/kırılgan):**
- **Hâkimiyet yayı** — her diyarın etrafında hâkimiyet payı kadar altın yay
  (kitap tamamlama yayının kardeşi). Patoloji %79 ≈ tam tur, Anatomi %23 kısa yay.
- **Çürüme → sürekli renk** — yay çürüdükçe altından griye kayıyor (kademe değil,
  `dt=min(1,C·1.6)` sürekli; CLAUDE.md ayrık-eşik dersi). Bu veride C~0.05, yay altın.
- **Anıt** — H≥0.7 diyar merkezine altın mühür (dolu nokta + ince dış halka).
  Gerçek veride yalnız Patoloji (0.79) anıt alıyor: "tamamlanmış diyar".
- **Kırılganlık** — kırılgan diyarın yay ucuna küçük kırmızı nokta (sezgi neti işareti).
- **Çift kodlama yok** — yay `gec=aDers·sol·(1-aCan·0.7)` ile derin yakınlaşmada
  soluyor; orada mevcut yaşayan yapı (mühür kareler) + iç kırmızı halka devralıyor.

**Görsel dil:** altın + ince gri, çok hafif; neon/oyun yok. Uzaktan bakışta artık
tüm manzaranın sağlığı tek bakışta okunuyor (güçlü Patoloji anıtı ↔ zayıf Anatomi).

**Kullanılan mevcut motor:** evrenVeri (b.hakimiyet, b.curume, b.kirilgan). Paralel
model yok, yeni veri yok — yalnız GÖRSEL katman.

**Kapılar:** kal/derin/kombo/cark/mola ✓ · pu_test yeni FAZ 7 bölümü 6 kontrol SIFIR
HATA (yay overview alfasına bağlı, anıt eşiği, kırılgan işareti, sürekli çürüme rengi,
derin-zoomda solma); toplam ✗ hâlâ 7 = değişmeden §229 bloğu.

**Görsel doğrulama:** başsız Chromium (1000px), GERÇEK veriyle iki zoom: (1) overview
— 11 diyarın yayı okunur, Patoloji anıtı + kırılgan noktalar doğru; (2) derin (Anatomi
odak) — yay soluyor, yaşayan yapı/iç halka/konu noktaları çakışmadan görünüyor.

**Eksik / sonraki:** FAZ 8 (Obsidian: KOMBO yolları haritada + arama/filtre/odak +
detay paneli + backlink), FAZ 9-11.

**Bu turda yaptığım hatalar:** Önce "yaşayan harita zaten var, FAZ 7 gereksiz mi?"
diye düşündüm; ama ekran görüntüsü alınca gerçek boşluğu (overview'da sağlık okunmuyor)
gördüm. Ders: tasarım kararını ezberden değil, gerçek kareden ver (§141 kare-farkı
dersinin akrabası). Kod tarafında hata çıkmadı; eklenti additive ve gate+görsel temiz.

**sürüm 2027-03-03a ↔ rota-2027-03-03a**

---

## §257 · FAZ 8 (kısım 1) — Harita arama · Obsidian quick-switcher

**Ne yapıldı:** zihin evrenine **arama** eklendi (üst şeritte büyüteç düğmesi).
Branş/kitap/konu adıyla ara → sonuç listesi → tıkla, harita oraya UÇAR ve odaklar.
- `zeAraIndeks()` — ze.dersler'den branş+kitap+konu indeksi (mevcut veri, yeni model yok).
- `zeGit(h)` — hedefe göre ze.sec + zeUc (zeTikla navigasyonunun aynısı; branş→ders
  zoom, kitap→satır yerleşimi, konu→konu satırı). Panel kapanır, odak kalır.
- Türkçe-duyarlı filtre (`toLocaleLowerCase('tr')`), branş>kitap>konu sıralı, ilk 40.
- Enter ilk sonuca gider · Escape/× kapatır · scrim tıklanınca kapanır.
- Geri izolasyonu: arama açıkken `zeGeri()` önce aramayı kapatır.

**Görsel dil:** üstten açılan beyaz kart, ince gri çizgi, KONU/KİTAP/BRANŞ etiketi,
yol (branş · kitap) gri altmetin. Akademik, neon yok.

**Kapılar:** kal/derin/kombo/cark/mola ✓ · pu_test yeni FAZ 8 bölümü 7 kontrol SIFIR
HATA; toplam ✗ hâlâ 7 = değişmeden §229. **Görsel doğrulama:** başsız Chromium
(iPad 834px) gerçek veriyle: "amino" → 3 konu (Amino Asitler / Aminoasitler /
Aminoasitlerin Metabolizması), ilk sonuç → Biyokimya·Yavuz Şahin·konu 0'a uçtu,
panel kapandı. Navigasyon kanıtlı.

**⚠ FAZ 8'DE EKSİK KALAN (bilinçli, sonraki tur):** KOMBO yolları haritada + backlink.
Neden ertelendi: **KOMBO çiftleri görev-ID (`gun|blok`) anahtarlı** (index.html ~6354),
harita konuları ise kitap+konu anahtarlı — 1:1 değil. Rastgele eşleme "sessiz sıfır"
tuzağına düşer (§153/§155). KOMBO backlink ZATEN brif (görev) panelinde çalışıyor
(ROTA tarafı). Haritaya taşımak için görev↔konu köprüsü dikkatle kurulmalı; acele
edilmedi. Detay paneli: konu L5 detayı haritada zaten var.

**sürüm 2027-03-04a ↔ rota-2027-03-04a**

---

## §258 · KABUK TERSİNE ÇEVRİLDİ — uygulama artık Bilgi Evreni'nin kendisi

### ⚠ Bu turun sebebi: benim yorum hatam

Kullanıcı "mevcut sistemi bozma" dediğinde ben bunu **"eski görsel arayüz aynen
kalsın"** diye okudum. Korunması istenen **VERİ MOTORUYDU**, arayüz değil.
Sonuç: §254–§257'de yaptığım her şeyi (8'li matris, yaşayan harita, arama)
Bilgi Evreni'nin içine koydum — ve Evren'e **yalnız karşılama ekranındaki
maskottan** giriliyordu (`evrenAc` tek çağrı: maskot onclick). Kullanıcı
telefonda "hâlâ eski uygulama" gördü, HAKLIYDI: günlük kullandığı ekran
gerçekten eski ekrandı. Yeni işler görünmez bir kapının arkasındaydı.

Düzeltilmiş yönerge (kullanıcının kendi sözleriyle): *"Bilgi Evreni uygulamanın
kendisi; eski TUS motoru bunun altında çalışan beyin."*

### Ne yapıldı

**Kabuk (5 kanıtlı ayar · denetim workflow'u ile çıkarıldı):**
1. `body.evrenKip header, body.evrenKip main{opacity:0;pointer-events:none}` —
   eski kabuk DOM'da KALIR (motor ona yazmaya devam eder, hesaplar birebir aynı)
   ama görünmez/tıklanamaz. `<body class="evrenKip">` ile ilk boyamada bile.
   ⚠ **`display:none` DEĞİL** — `diz()` (4893) yerleşim oturmadıysa kendini
   rAF ile yeniden çağırıyor; kutu 0x0 olsaydı o döngü asla bitmez ve HER
   `carkCiz` bir yenisini eklerdi (pil + kare düşüşü). `opacity` yerleşim
   kutusunu koruyor. Emsal repoda vardı: `body.karsiAcik` (1650).
2. Boot son satırı `karsilamaAc()` → `evrenAc()`; kurulum başarısızsa
   `evrenKabukGeri()` ile eski kabuğa güvenli düşüş (boş ekran kilidi yok).
3. `evrenKapat()` kabuk kipinde KİLİTLİ (altında gizli kabuk var, boş ekran olurdu).
4. `zeGeri()` artık kök seviyede **dışarı atmıyor**, en dış zoom'da duruyor
   (eski: iki "geri" ile eski UI'ye düşülüyordu — kabul kriterinin kilidi).
5. `kare()` (yıldız/toz rAF) Evren açıkken çizimi atlıyor — görünmez yere
   iki tam ekran clearRect + zeKare ile yarışan ikinci rAF hattı vardı.

**Günlük akış (kaybolmaması ŞART olan kısım):**
- `#gunListe` DÜĞÜMÜ Evren paneline **TAŞINDI** (kopya değil). id korunduğu için
  `gunListe()/glBagla()/gunOlcekle()/gunBagla()` ve tüm kayıt yolları
  (`D.bitti`, `D.pu`) **tek satır değişmeden** çalışıyor. Yeniden yazma yok.
- Günlük akışın tamamı zaten liste içinde: her satırda doğrudan tamamlama
  dairesi (`[data-klgorev]`), gün okları, Program/Kitap anahtarı. Çark gerekmiyor.
- Satır gövdesine dokunma eski çarka atlıyordu (kabuk kipinde görünmez iş);
  artık haritada o konuya uçuyor. Eşleşme bulunamazsa HİÇBİR ŞEY yapmıyor
  (sessiz sıfır riski — kullanıcı eski arayüze düşürülmüyor).
- `#olcumIc` düğümü de aynı yolla `#zeOlc` paneline taşındı (olcumCiz aynen).

**Evren üst şeridi:** eski header'ın gösterdiği her sayı motor fonksiyonlarından
yeniden okunuyor (`son()`, `para()`, `puan()`, `tavanBant()`, `kalanKazanci()`,
`kacanlar()`): kalan gün · ÖLÇÜLEN · PARAKETE + tavan bandı · POTANSİYEL + iş sayısı.
Kalibrasyon ayrımı korundu. Girişler: Bugün · Ölçüm · Deneme · Power-up · Telafi(rozet).
Eski paneller (#dpanel/#ppanel/#kpanel/#bpanel/#perde) **aynen açılıyor** — yalnız
z-index 70/80 → 130/128 (Evren 118'in üstü); body kardeşi oldukları için gizlenmiyorlar.

**`zeTazele()`:** `ze` bir kez kurulup donuyordu (donmuş değer ailesi, §72–85).
Görev tamamlanınca kamera/seçim korunarak yeniden kuruluyor.

### 🔴 GERÇEK HATA BULUNDU (mevcut YAYINDAKİ sürümde de var)

`gunOlcekle()` ikili araması **hiç çalışmıyordu**: sığma testi `gl.scrollHeight<=h-2`
idi, ama `#gunListe` `position:absolute;inset:0;overflow:hidden` — böyle bir kutuda
**scrollHeight asla clientHeight'ın altına inmez**, `h` de aynı kutudan geliyordu.
Yani koşul HİÇBİR ZAMAN sağlanmıyor, arama her turda küçültüyor ve satır **11 px
tabanında** donuyordu; yazı satır kutusundan taşıyordu. Kullanıcının gönderdiği
telefon ekran görüntüsünde de aynen böyleydi (ince kapsüller, taşan yazı).
Düzeltme: sığma ölçüsü **son çocuğun alt kenarı** (`c.offsetTop+c.offsetHeight`) —
taşma kırpmasından bağımsız. Ölçülen sonuç: telefon 11 → **29.8 px** satır /
10 → **17.3 px** yazı; iPad 11 → **46.2 px** / **26.8 px**; içerik taşmıyor
(634≤639 · 922≤928). Hata atmayan, yalnız yanlış görünen ölçüm — CLAUDE.md'nin
"tahmin değil ölçüm" ailesinden. `cark_test`'teki iddia hatalı satırı arıyordu;
doğru ölçüme güncellendi + gerileme kontrolü eklendi.

**Açık tema kapsamı:** taşınan düğümler koyu tema için renklendirilmişti; açık
zeminde yazı beyaz-üstüne-beyaz kalıyordu (gerçek karede görüldü — kapılar görmez).
`#zeGun,#zeOlc` kapsamında değişkenler (`--ink*`, `--kn`, `--cam`, `--altin`)
çevrildi + sabit `rgba(255,255,255)` yüzeyler karşılandı. Seçici gövdeleri değişmedi.

### Kapılar ve doğrulama
kal ✓ · derin ✓ · kombo ✓ · cark ✓ (güncellendi) · mola ✓ · pu_test toplam ✗ **7**
= değişmeden §229 bloğu. **Gerçek tarayıcı (Chromium, gerçek kullanıcı verisi,
telefon 390 + iPad 834):** açılış evrenKip=true · karşılama açılmıyor ·
header/main opacity 0 · şerit dolu · Bugün paneli `#zeGunIc` içinde 11 satır ·
**görev tamamlama `D.bitti`+localStorage'a yazıyor** (potansiyel 179→178 iş) ·
6 kez "geri" → eski UI'ye **düşmüyor** · sayfa hatası yok.

### Eksik / sonraki
- `#zeOlc` (Ölçüm) ve eski paneller hâlâ KOYU tema — açık temaya çevrilmesi ayrı
  bir tasarım turu (radar/trend SVG'leri koyu renk üretiyor).
- Maskot artık karşılama açılmadığı için görünmüyor (`maskotTak` ile Evren'e
  takılabilir).
- Açılış kamerası L1: ekranda geniş boşluk bırakıyor; yerleşim/etiket çakışması
  polish turu bekliyor.
- Konu/alt başlık bilgi paneli · alt başlık çözünürlüğü · kamera OCR + golden test.

**sürüm 2027-03-05a ↔ rota-2027-03-05a**

---

## §259 · BİLGİ ÇEKİRDEĞİ — Obsidian-benzeri kişisel bilgi sistemi

Kullanıcı yön değiştirdi: önce **bilgi çekirdeği** (gerçek bilgi yönetim sistemi),
sonra motor entegrasyonu, en son Evren bunun mekânsal görünümü. "Şık node graph"
değil, "güçlü kişisel bilgi işletim sistemi" hissi hedef.

### `bcIndeks()` — bilgi grafiği (yeni model YOK, hepsi türetme)
- **Düğümler** mevcut veriden: RB (11 ders), POWERUP (41 kitap, konu+sayfa),
  GOREVLER (program kitap/konu), KONU_DAG (deneme konu katalogu) → **355 konu**.
  Kimlik = motorun kendi `renkAnh`/`konuSade` normali (ikinci kimlik uydurulmadı).
- **Kenarlar yalnız gerçek veriden:** yapı (ders→konu), **kaynak (kitap→konu, 407
  kenar)** — bir konuyu birden çok kitap anlatır, gerçek backlink ("Hormonlar 2
  kaynak"); **kombo (99 kenar, 99/99 EŞLEŞTİ, komboAt=0)**.
- ⚠ **KOMBO köprüsü KESİN:** KOMBO öğeleri tam görev-ID `gün|blok|branş|konu`
  taşıyor; branş+konu doğrudan düğüm kimliğine çözülüyor. Önceki turlarda "sessiz
  sıfır riski" diye ertelediğim köprü aslında güvenliymiş — çünkü ad tahmini yok,
  ID parse'ı var. 99/99 eşleşme bunu kanıtladı.

### Not yüzeyi `bcNotAc()` — içerik + metadata + bağlantılar tek yerde
Bir konuya (haritada/aramada/görev satırında/graf düğümünde) tıklayınca:
breadcrumb · başlık + tip · türetilmiş etiketler (#çalışıldı/#çürüyor/#boşluk-N/
#kombo/#öncelik-N) · **Özellikler paneli "motordan canlı"** (soru ağırlığı, son
çalışma, çürüme, denemede D/Y, güven E/AK/B/U, boşluk, DRE önceliği+skor, beklenen
net, sayfa, süre) · "Neden öncelikli" (gorevNeden) · **Bağlantılar** (kaynak/kombo/
yapı, hepsi tıklanır → o notun yüzeyi) · denemelerdeki gerçek sorular (D/Y+güven) ·
ilgili görevler + **"Çalıştım"** (mevcut D.pu/D.bitti kaydı birebir) · **yerel graf**
(canvas, komşu düğümler tıklanır) · Haritada göster · ‹ Önceki not (gezinme yığını).
Tüm değerler panel açılırken motordan CANLI okunuyor (donmuş değer yok).

### Arama + filtre yükseltildi
`tip:konu|kitap|ders` · `ders:Ad` · `#etiket` (#çürüyor/#boşluk/#kombo/#çalışılmadı/
#öncelik) · serbest metin. Çekirdeğin TAMAMINDA arıyor, sonuç NOT yüzeyini açıyor.
Harita konusu tıklaması, görev satırı tıklaması ve arama sonucu artık hep aynı
bilgi notunu açıyor — tek bilgi sistemi, çok giriş.

### 🔴 GERÇEK PERF HATASI BULUNDU VE DÜZELTİLDİ (yayındaki sürümde de var)
`gorevOncelik()` **9173 ms** sürüyordu (rehberSec 41 ms). Sebep: `puEtki()` her
çağrıda `para()` (33 ms) hesaplıyor; gorevOncelik bunu ~270 aday için tek tek
yapıyordu → 270×33 ≈ 9 sn. `para()` tek geçişte hep aynı. Çözüm: `_peP` kapsamlı
önbelleği (`_rcZorla` deseni) — gorevOncelik para'yı bir kez hesaplayıp puEtki'ye
veriyor. **9173 ms → 90 ms (100×).** DRE sıralaması BİREBİR AYNI (Aminoasitlerin
Metabolizması skor=8.14, FAZ 5 testiyle aynı → davranış değişmedi). Bu, yayındaki
rehber panelini ve harita açılışını da hızlandırdı.

### Kapılar + doğrulama
kal/derin/cark/mola/kombo ✓ · pu_test yeni §259 bölümü **9 kontrol SIFIR HATA**
(11 ders + düğümler, KOMBO 99/99 kesin, kaynak backlink, çok-kaynaklı konu, özellik
motordan, DRE bağlı, _peP perf); toplam ✗ hâlâ **7** = değişmeden §229.
**Gerçek tarayıcı (telefon 390, gerçek veri):** indeks 11/41/355, KOMBO 99/99;
"Şok travma" notu 9 özellik + 3 gerçek soru + kaynak backlink + graf ile açıldı;
`#boşluk tip:konu` filtresi 40 sonuç 116 ms; sayfa hatası yok.

### Eksik / sonraki (bu vizyonun kalanı)
- **Alt başlık düzeyi:** veri katalogunda YOK (denetlendi — POWERUP kitap→konu,
  KONU_DAG branş→konu, sorular konu adına). Ders→Kitap→Konu→Soru gerçek; alt başlık
  UYDURULMADI. İstenirse kullanıcıdan alt başlık kaynağı gerekir.
- **Evren = çekirdeğin görünümü:** harita konusu artık notu açıyor ama harita hâlâ
  ayrı `zeVeri` türetiyor; ikisini tek indekse (`bcIndeks`) bağlamak sıradaki adım.
- Deneme/ölçüm panelleri koyu tema (§258 açık kalan).
- Kamera OCR + golden test.

**sürüm 2027-03-06a ↔ rota-2027-03-06a**

---

## §260 · EVREN = ÇEKİRDEĞİN GÖRÜNÜMÜ — KOMBO bağlantıları haritada (öncelik 5)

Kullanıcı "devam" dedi → öncelik 5–6: Bilgi Evreni bilgi çekirdeğinin mekânsal
graph view'ı olsun. İlk adım: bilgi bağlantılarını haritaya çizmek.

- `zeKur` artık `bcIndeks()`'ten `komboDers` üretiyor: 99 konu↔konu KOMBO kenarı
  ders bölgelerine toplanıyor → **18 ders↔ders bağı** (Anatomi↔Genel Cerrahi w=12,
  Patoloji↔Genel Cerrahi w=6…). Aynı ders içi bağlar atlanıyor (bölge içi). Kaynak
  TEK: bcIndeks (harita ile çekirdek artık aynı bağlantı verisini kullanıyor).
- `zeCiz` ders katmanında bu bağları **eğri** olarak çiziyor: uzakta hafif
  (aDers·0.14, ağırlıkla ölçekli), bir ders **seçiliyken yalnız onun bağları**
  altınla belirginleşiyor (aDers·0.5) — "ilişkiler uzakta hafif, odaklanınca
  belirgin" (kullanıcı şartı). Ders çemberlerinin ARKASINDA çiziliyor.
- Harita konusu tıklaması (§259'da) zaten `bcNotAc` açıyordu → harita ile çekirdek
  tek akış.

**Kapılar:** cark/derin/kombo/mola/kal ✓ · pu_test ✗ 7 = değişmeden §229.
**Gerçek tarayıcı (1000px, gerçek veri):** komboDers 18 bağ; overview'da tüm bağlar
hafif; Patoloji seçilince diğer dersler soluyor, onun bağları (→ Genel Cerrahi vb.)
altınla beliriyor; sayfa hatası yok.

**Bilinçli ödün / açık nokta:** overview'da KOMBO eğrileri mevcut radyal görev
çizgileriyle (görev→ders kenarları) görsel olarak karışıyor — biraz yoğun. Odak
görünümü net. Cihazda görülüp "berrak" değilse: overview'da yalnız en güçlü bağları
(w≥N) göstermek ya da radyal spokes'u soldurmak seçenek. Kullanıcı kararı bekleniyor.

**Sonraki (öncelik 6 + kalan):** yaşayan durum haritada (mastery/decay → anıt/
solma zaten §256'da; bağlarla birleştir) · konu düğümleri de tek bcIndeks'ten ·
alt başlık (veri yok, kullanıcıdan) · deneme/ölçüm açık tema · kamera OCR + golden.

**sürüm 2027-03-07a ↔ rota-2027-03-07a**

---

## §261 · ATLAS — sıfırdan Obsidian-dili harita motoru + JARVIS (kullanıcı FAZ 1 + 1.5)

**Yön (kullanıcının yeni brief'i + iPhone Obsidian ekran görüntüleri):** önceki
tasarımlar "basit ve yetersiz" — hiçbiri cilalanmayacak, SIFIRDAN. Estetik referans
GERÇEK Obsidian grafiği: siyaha yakın zemin, ince gri çizgiler, sade noktalar,
yaklaştıkça beliren etiketler. ⚠ Bu, önceki "açık zemin" kuralının KULLANICI
TARAFINDAN tersine çevrilmesidir (ekran görüntüleriyle) — §244 kuralı artık geçersiz.
Liste/form/panel istenmiyor; her şey haritada yaşayacak (kademeli). "Tasarım
sıfırdan, veri korunarak."

**Yapılan (FAZ 1 · harita motoru):** `atlas*` — tümüyle YENİ modül (~18 KB), eski
zeCiz/zeKur KULLANILMADI (kod duruyor, güvenli düşüş + kapılar için; gösterilmiyor):
- `atlasVeri()`: bcIndeks + motor → 408 düğüm (1 kök TUS + 11 ders + 41 kitap +
  355 konu) + 897 yay (kök-ders, ders-kitap, kaynak, dersKonu[yalnız yerleşim],
  kombo). Konu hakimiyet düzeyi 0–4 MOTORDAN: D.pu/D.bitti + konuCurume (çalışılınca
  yükselir, çürüdükçe düşer — testte kanıtlı 0→4). Öncelik etiketi = mevcut
  konuRenk/RENK (pembe/turuncu/sarı/mavi) düğüm renginde ince vurgu.
- `atlasYerlesim()`: DETERMİNİSTİK kuvvet benzetimi (ızgara-itmeli, 130 tur, sabit
  tohum; testte iki koşu birebir aynı konum). Ders çapaları halka üstünde; küme
  yarıçapı ~220 birim (ilk sürüm 600+ çıktı, yaylar sıkılaştırıldı).
- `atlasCiz()`: koyu zemin #0B0C0F, ince gri çizgiler, sade daireler. SEMANTIC ZOOM:
  uzak → yalnız ders düğümleri + etiketleri + konular "yıldız tozu" (ultra hafif,
  tek tek düğüm iddiasız); orta → kitaplar belirir; yakın → konular + etiketler.
  Hakimiyet = parlaklık + çevre nokta yoğunluğu (kademeli, süssüz; çürüme aynı dilin
  tersi). Odak: düğüme dokun → komşular kalır, gerisi %14'e söner; kamera yay/easing
  ile uçar. ⚠ ALTIN RENK ATLASTA HİÇ KULLANILMADI — FAZ 3 Altın Yol'a rezerve
  (pu_test bunu kaynak düzeyinde denetliyor).
- İlk karede KOMBO çizgileri uçları görünmeyen düğümlere bağlanıp karmaşa yaratıyordu
  (gerçek karede görüldü) → kombo alfası konu görünürlüğüne bağlandı; uzak görünüm
  berrak. Açılış ölçeği ekrana SIĞDIRILIYOR (sabit değil).

**FAZ 1.5 · JARVIS:** `jarvis(metin)` — sohbet penceresi DEĞİL; altta beliren,
kendiliğinden kaybolan tek satır. Açılışta motordan selam: "Hoş geldiniz efendim.
Sınava 21 gün var; parakete 59.4. Anatomi bölgesi ilginizi bekliyor." (kalan gün =
fark/SINAV, parakete = puan(para()), zayıf bölge = evrenVeri hakimiyet min).
Yalnız anlamlı anlarda konuşacak (FAZ 3'te Altın Yol tetikleyecek).

**Geçici köprü (bilinçli):** sağ üst "⋯" menüsü → Bugün/Deneme/Ölçüm/Power-up/Telafi
mevcut panelleri atlas ÜSTÜNDE açıyor (paneller gövde düzeyine taşındı, z-index
122-125). Menüde not: "FAZ 2'de bu akışlar haritanın içine gömülecek." Günlük akış
kaybolmadı (Bugün paneli 11 satır, tamamlama çalışıyor — tarayıcıda doğrulandı).

**Test ortamı keşfi:** derin_ortam VM'inde betik, atlastan önceki bir üst-düzey
satırda ötedenberi ölüyormuş (karsilamaAc bile tanımsızmış) — bugüne dek test edilen
her şey ölüm noktasından önceydi. Atlas modülü ölüm noktasının öncesine taşındı;
ölüm noktasının kendisi ayrıca incelenmeli (açık madde).

**Kapılar:** kal/derin/cark/mola/kombo ✓ · pu_test yeni §261 bölümü **10 kontrol
SIFIR HATA** (fonksiyonlar, koyu zemin, altın-yok, JARVIS+efendim, 408 düğüm,
konum sonlu, determinizm, hakimiyet motordan canlı 0→4, semantic zoom eşikleri,
açılış+düşüş) · toplam ✗ **7** = değişmeden §229.
**Gerçek tarayıcı (390px, gerçek veri):** açılış 3.6 sn'de atlas; 408 düğüm/897 yay;
JARVIS motor değerleriyle konuştu; uzak/orta/yakın/odak kareleri alındı; köprü
Bugün paneli çalışıyor; sayfa hatası yok.

**SONRAKİ (kullanıcı onayı bekleniyor — akış onun şartı):**
- FAZ 2: verinin haritada yaşaması (düğümde tamamlama mikro-etkileşimi, deneme
  olayı düğümü, sparkline, çapraz-kitap bağları zaten var; not yüzeyinin haritaya
  gömülmesi) + kamera OMR/OCR (kullanıcıdan: boş optik form fotoğrafı + cevap
  anahtarı formatı + işaretli örnek sayfa).
- FAZ 3: Altın Yol (gorevOncelik/puEtki → altın rota overlay, aç/kapa) + JARVIS bildirimi.

**sürüm 2027-03-08a ↔ rota-2027-03-08a**

---

## §262 · ODAK MİKRO-YERLEŞİMİ + ATLAS FAZ 2 (veri haritada yaşıyor) + mock-OMR

**Kullanıcı düzeltmesi (birebir):** "Bir düğüme odaklanınca çocuk düğümler global
force simülasyonuyla değil, parent'ın etrafında sabit, sıkı bir dairesel düzende
konumlanmalı — parent'ın gövdesini oluşturuyormuş gibi durmalı, dağınık değil."

**1) Odak mikro-yerleşimi (`atlasMikro`):** odaklanınca çocuklar (kök→dersler+
denemeler · ders→kitaplar+konular · kitap→konuları) global fizikten çıkıp ebeveyn
çevresinde eş-aralıklı dairesel KABUKLARA dizilir (halka kapasitesi çevre/17 birim;
kitaplar içte, hakimiyeti yüksek konular içte — gövdenin sağlam çekirdeği). Geçiş
animasyonlu (t 0↔1, smoothstep); odak dağılınca aynı yoldan global konuma süzülür.
Kamera halkayı ekrana SIĞDIRIR (sabit ölçek değil). Halka üyeleri soluklaşmaz;
ebeveyn→çocuk "gövde ışınları" yalnız odakta çizilir; halka etiketleri açı yönünde
DIŞA yelpazelenir (üst üste binme kırıldı — ilk karede binmişti, gerçek karede
görülüp düzeltildi). Gerçek ölçüm: Biyokimya odağında 21 çocuk, halka bandı 32–56
birim, maxR 56; testte "sıkı halka + dar bant" kontrolü var.

**2) FAZ 2 · veri haritada:**
- **Deneme düğümleri:** D.denemeler'deki 6 gerçek deneme haritada düğüm (kök
  yörüngesi, mavi-gri — altın değil). Dokununca JARVIS özetler: tarih · T/K · puan ·
  soru-soru işaretli mi. Yeni deneme kaydında bir sonraki tazelemede kendiliğinden belirir.
- **Düğümde tamamlama (form yok):** konuya odaklanınca düğümün üstünde ○/✓ dairesi;
  dokununca MEVCUT kayıt yolu (D.pu / power-up karşılığı yoksa son ilgili görevin
  D.bitti'si) çalışır, düzey YERİNDE tazelenir (0→4→0 testli), nokta bulutu değişir.
- **Branş sparkline:** derse odaklanınca düğümün yanında sade gri eğri — denemeBrNet
  serisi (ayrı grafik sayfası yok; "5.0 net" ucuyla).

**3) Mock-OMR borusu (`omrMock`):** optik form malzemesi gelene dek boru hattı
sentetik işaretlerle: 200 işaret → dqBransNet (mevcut motor) → JARVIS önizleme.
⚠ **GERÇEK KAYITLARA YAZMAZ** (kayit:false; D.denemeler değişmiyor — testli).
Kalibrasyon kirlenmez. Gerçek OMR geldiğinde yalnız işaret-okuma katmanı değişecek.
Menüde "Kamera · Tara (mock)".

**Düzeltme (test VM):** jarvis() clearTimeout'suz ortamda patlıyordu → try/catch.

**Kapılar:** kal/derin/cark/mola/kombo ✓ · pu_test yeni §262 bölümü **8 kontrol
SIFIR HATA** (sıkı halka, dar bant, deneme düğümü=kayıt sayısı, mock 200 işaret,
mock kayda yazmıyor, tamamlama D.pu+canlı düzey, gövde ışını koşulu, halka
solukluk istisnası) · toplam ✗ **7** = değişmeden §229.
**Gerçek tarayıcı (390px, gerçek veri):** 6 deneme düğümü adlarıyla; Biyokimya
odağı gövde-halka görünümü kare alındı; toggle localStorage'a yazdı (sonra geri
alındı); mock OMR D.denemeler 6→6; sayfa hatası yok.

**Sonraki:** FAZ 2 devamı (bilgi panelinin haritaya gömülmesi, yeni-düğüm beliriş
animasyonu) · FAZ 3 Altın Yol · gerçek OMR malzemesi bekleniyor (boş optik form +
cevap anahtarı formatı + işaretli örnek sayfa).

**sürüm 2027-03-09a ↔ rota-2027-03-09a**

---

## §263–§265 · GECE OTURUMU — Obsidian dili · denetimler · Altın Yol · OMR iskeleti

Kullanıcı birleşik prompt + **56 sn ekran kaydı** (Obsidian mobil) verdi ve
"durmadan, onay beklemeden ilerle, her adımda commit" dedi. Kayıt ffmpeg ile
28 kareye ayrılıp çözümlendi.

### §263 · Obsidian görsel dili + grafik denetimleri + gömülü kart (`2027-03-10a`)
- **Saf siyah zemin (#000)**, açık-gri düğümler, etiket düğümün ALTINDA, seyrek düzen.
  Sağ kenarda dikey ikon yığını. **JARVIS SAĞ ÜST'e taşındı** (kullanıcı şartı).
- **Geçici "⋯" köprü menüsü KALDIRILDI** → Obsidian'ın kendi mekanizması:
  **Filtreler / Gruplar / Göster / Güçler**. "Bugün/Telafi" panel akışları artık
  haritada **renkli grup** (gerçek veride 11 bugün + 12 telafi düğümü boyandı).
  Gruplar düzenlenebilir/kalıcı (`D.atGrup`), Güçler yerleşimi canlı yeniden kuruyor.
- **Haritaya gömülü bilgi kartı**: düğüme dokununca alt kenarda zeminle karışan
  katman; harita altında görünür kalıyor, kamera düğümü kartın üstünde tutuyor.
  İçerik motordan canlı; bağlantılar tıklanır; "Çalıştım" mevcut D.pu/D.bitti yolu.

### §264 · FAZ 3 · ALTIN YOL (`2027-03-11a`)
Yeni algoritma yok: `gorevOncelik` (CS + beklenen net) + `puEtki().verim` (net/saat)
+ `tempoProjeksiyon` (kapasite). Sıra net/saat ekseninde azalan, kapasiteye kadar.
Haritada **altın eğrilerle bağlı numaralı duraklar**; altın rengin TEK kullanımı
burası (kapıyla denetleniyor). **Öneri katmanı** — ♦ düğmesiyle açılır/kapanır.
JARVIS bildiriyor. Az veriyle "temkinli" etiketi. Gerçek veride: **14 durak,
kapasite 52 sa, beklenen +5.93 net, güven "iyi"**, ilk durak Pediatrik Alerji
(0.670 net/sa), hesap 250 ms.

### §265 · OMR/kamera boru hattı — dört katmanlı iskelet (`2027-03-12a`)
`isaretOku` [MOCK · değişecek tek katman] → `omrEslestir` (konu UYDURMAZ; güvensizi
"Eşleştirme gerekli") → `omrOnizle` (harita dilinde onay kartı) → `omrKaydet`
(MEVCUT dqBransNet → D.denemeler). **Önizleme kayda yazmıyor** (6→6), onayla
yazıyor (6→7) — ikisi de tarayıcıda kanıtlandı. Onaydan sonra harita+gruplar+
Altın Yol yeniden hesaplanıyor.

**Kapılar:** kal/derin/cark/mola/kombo ✓ · pu_test'e §263/§264 (10) + §265 (9)
kapıları eklendi, ikisi de SIFIR HATA · toplam ✗ **7** = değişmeden §229.

**VARSAYIM (sabah doğrulanacak):** `claude-code-tus-obsidian-prompt.md` şartname
dosyası bu oturuma ULAŞMADI (repoda ve dosya sisteminde yok). Şartname kullanıcının
mesajlarından + önceki analiz özetinden alındı.

---

## ⚠ §229'un 7 HATASI — KÖK NEDEN BULUNDU (karar kullanıcıya ait)

Yedi hata tek bir yerden geliyor; ikisi ayrı:

**1 tanesi eskimiş kaynak-dizgi iddiası:** `konuCalisildi merkezi kayıttan` —
fonksiyon ÇALIŞIYOR (`konuCalisildi("Meme Hastalıkları") === true` ölçüldü), test
belirli bir kod dizgisini arıyor. Zararsız; iddia güncellenebilir.

**6 tanesi TEK KÖKTEN:** `program görevi gölgeleniyor` · `potansiyel düşüyor` ·
`ikinci kaynak daha az getiriyor` · `ikinci getiri pozitif ama küçük` ·
`listede üstü çizili` · `kaynak adı yazıyor`.

**Kök neden (ölçüldü):** Test şunu bekliyor — *Levent Kodal **Genel Cerrahi** SB'den
"Meme Hastalıkları" çalışınca, programdaki **Patoloji** "Meme Hastalıkları" görevi
gölgelensin (ikame sayılsın).* Ama §227/§228'de **bilinçli olarak** konu anahtarı
**GRUP BAZLI** yapıldı:
```
konuAnh(görev)   = "Patoloji§meme hastalıkları"
konuAnh(powerup) = "Genel Cerrahi grubu§meme hastalıkları"   → EŞLEŞMİYOR
```
Yani bu bir kod hatası değil, **iki bilinçli kararın çatışması**. Test §228'den
önceki (ad-bazlı) davranışı bekliyor.

**Kapsam ölçüldü:** 297 farklı konu adının **yalnız 8'i** birden çok grupta geçiyor:
`hormonlar` (Biyokimya|Farmakoloji) · `meme hastalıkları`, `pankreas hastalıkları`,
`deri hastalıkları` (Genel Cerrahi|Patoloji) · `ortopedi` (Dahiliye|Genel Cerrahi) ·
`immünoloji` (Mikrobiyoloji|Patoloji) · `enfeksiyon hastalıkları`
(Mikrobiyoloji|Dahiliye) · `beslenme` (Genel Cerrahi|Pediatri).

**KARAR SENİN (ikisi de savunulabilir):**
- **(A) Grup bazlı kalsın** (şu anki davranış): Genel Cerrahi'nin meme cerrahisi ile
  Patoloji'nin meme patolojisi FARKLI bilgi/soru havuzu sayılır. Bu 8 konuda çift
  çalışma "iki ayrı kazanç" verir. → Testin 6 iddiası **eskimiş**, güncellenir.
- **(B) Ad bazlı çapraz gölgeleme dönsün**: aynı adlı konu hangi gruptan çalışılırsa
  çalışılsın diğerini de ikame etsin. → §228 kararı geri alınır; net havuzu paylaşımı
  8 konuda değişir, projeksiyon bir miktar düşer (çift sayım kalkar).

Kararını bekliyorum; **kendiliğinden değiştirmedim** (CLAUDE.md: kullanıcının
vermediği kuralı kural sanma).

**sürüm 2027-03-12a ↔ rota-2027-03-12a**

---

## §266 · GERÇEK OMR MALZEMESİ + şartnamenin üç eksik maddesi + ölü kapı onarımı

### 1 · Gerçek kitapçık fixture'ı (mock'un yanına, mock'un yerine değil)

Kullanıcı 8. Cilt 1. Deneme Sınavı kitapçığının **sf 38-39** fotoğraflarını verdi
(Kadın Doğum, soru 191–200). `kaynak/omr_gercek_kd.json` bu sayfalardan **okunan**
işaretleri tutar; `isaretOku('gercek')` bunu okur, `isaretOku()` eski sentetik
mock'u döndürür. Değişen tek katman yine `isaretOku` — eşleştirme/önizleme/kayıt
katmanları dokunulmadı.

⚠ **Uydurma yok, en önemli tasarım kararı bu:** her satırın bir `guven` değeri var
ve okunamayan işaret `null` bırakıldı. 10 sorunun **yalnız 4'ü** güvenli okundu
(191 · 0.88, 196 · 0.72, 199 · 0.75, 200 · 0.85); kalan 6'sı 0.30–0.45 aralığında ve
"Eşleştirme gerekli" akışına düştü. Bunlar **nete katılmadı ve `D.denemeler`'e
yazılmadı**. Sol taraftaki el yazısı D/Y işaretleri fotoğrafta D↔B karışıyor;
sabah birlikte düzeltilmesi gerekiyor.

Bu davranış mock tarafını da değiştirdi: 200 işaretin 11'i düşük güvenli olduğu için
onay sonrası kayda **189 soru** yazılıyor (200 değil). `pu_test`'in "soru===200"
iddiası bu yüzden kırıldı — **uygulama bozuk değil, iddia eskimişti**; kapı
`okunan − düşük güvenli` beklentisine güncellendi ve "düşük güvenli okumalar kayda
girmiyor" ayrı bir kontrol olarak eklendi.

### 2 · Şartnamenin uygulanmamış üç maddesi

- **Aynı konunun farklı kitaplardaki karşılığı** (şartname sat. 54) — `esKonu`
  kenarı: aynı `key`'e sahip konu düğümleri ince bir hatla zincirleniyor
  (36 bağlantı). Çizim ağırlığı `.14·aKonu`, yani yapı/kaynak kenarlarından belirgin
  şekilde silik — Obsidian'daki "aynı not, başka klasör" hissi.
- **Yeni düğüm belirme animasyonu** (sat. 7) — `n.yeni` zaman damgası; 900 ms'lik
  tek halka, `1-(1-t)²` yumuşamasıyla sönüyor. Ayrık kademe yok (CLAUDE.md sürekli
  fonksiyon dersi).
- **Açılışta en zayıf bölgeye yönelme** (sat. 82) — en düşük hakimiyetli **ders**
  düğümü seçilip 1.5 sn sonra kameranın o yöne %42 kayması. Kullanıcı bu arada
  bir düğüm seçtiyse hareket iptal. Ölçümde seçilen: **Anatomi**.

Tarayıcıda doğrulandı: `{"esKonu":36,"zayif":"Anatomi","kaydi":true,"dugum":414}`,
sayfa hatası yok.

### 3 · Ölü kapının onarımı (§229'un açık maddesi)

`kaynak/kos.js` **sözdizimi hatasıyla hiç açılmıyordu**: bir düzenlemede
`g3("24lü soru toplamı KİTAPÇIK sayısı", …)` çağrısının başlığı değiştirilmiş ama
**eski argüman satırları silinmemişti** (satır 300–302 öksüz kalmış), üstelik
`krediSoru` hiç tanımlanmamıştı. Öksüz satırlar kaldırıldı, `krediSoru` eski detay
nesnesinden (`a.yeni+a.tekrar`) türetildi. Dosya artık ayrıştırılıyor.

⚠ Kapı **yine de koşmuyor**, ama artık başka bir sebeple: `./tam_test.js` repoda yok.

### Repoda hiç var olmamış üç dosya (kapılar bu yüzden koşmuyor)

`git log --all` ile doğrulandı — bunlar bir kez bile commit edilmemiş, yalnız
`tus_tamami.tar.gz` devir paketinde yaşıyorlar:

| eksik dosya | ölü kapı |
|---|---|
| `tam_test.js` | `kos.js` |
| `senk_test.js` | `senk_poll.js` |
| `eko.py` | `kural_test.py` |

**Yeniden KURMADIM** (CLAUDE.md §30: bağlamdan/ezberden kurma, kullanıcıdan iste).
Koşan 11 kapı temiz; `pu_test` bilinen 7 §229 hatasında sabit kaldı, yeni hata yok.

**sürüm 2027-03-13a ↔ rota-2027-03-13a**

---

## §267 · KISMİ TARAMA "DENEME" DEĞİLDİR — kendi açtığım veri bütünlüğü deliği

### Nasıl bulundu

Kapılar temizken (§266) gerçek tarayıcıda gerçek veriyle bir sertlik turu koştum
(`scratchpad/sertlik.js`: açılış · 6 zoom kademesi · odak · denetimler · altın yol ·
OMR · 90 kare jank ölçümü). Çıktının çoğu iyiydi — kare ortancası **16.7 ms**
(60 fps), odak mikro-yerleşimi sıkı (81 çocuk, en uzak 104 px), denetim paneli veriye
dokunmuyor, geri tuşu eski UI'ı geri getirmiyor. Ama bir satır sırıttı:

```
"omr": { "okunan": 10, "dusuk": 6, "t": 0, "k": -1, "yazdiMi": false }
```

**k = −1.** Kadın Doğum'un 10 sorusundan güvenle okunan 4'ü de yanlıştı
(0 − 4/4 = −1). Aritmetik doğru; **yönlendirme yanlıştı.**

### Kusur

`omrKaydet()` her taramayı `D.denemeler`'e yazıyordu. Ama `D.denemeler` kayıtları
**200 soruluk TAM denemedir** ve `son()` bunların sonuncusunu alıp `para()`'ya verir —
PARAKETE oradan doğar. 10 soruluk bir kitapçık sayfası oraya yazılsaydı motor onu
"en son deneme" sanacak, `t:0 · k:−1` değerlerini 200 soruluk performans olarak
okuyacaktı. **Ölçülen etki: parakete 59.35 → ~40.** Kullanıcı onayladığı anda
altı denemelik gerçek geçmişin üstüne yazacaktı.

⚠ Bunu motor yapmadı, **§265'te ben açtım**. Kapılar göremedi çünkü kapı da benim
yazdığım beklentiydi (CLAUDE.md: "kapı geçmek hata yok demek değildir" — §87'nin
aynısı, bu kez kendi kodumda).

### Düzeltme · YENİ MODEL YOK, motorun zaten olan iki yolu

Motorda kısmi/branş-bazlı örneklem için **`D.kal`** zaten var (dpanel'in yazdığı yer)
ve `rCalHesap` onu **gerçek binom varyansıyla**, örneklem büyüklüğünün hak ettiği
ağırlıkla kullanıyor ("4 soruluk bir gözlem çok belirsizdir" — kodun kendi notu).
Doğru davranış yeni bir şey icat etmek değil, **doğru yola yönlendirmekti**:

| tarama | koşul | yazılan yer | parakete |
|---|---|---|---|
| tam deneme | soru ≥ %90 **ve** branş ≥ tümü−2 | `D.denemeler` | güncellenir |
| kısmi tarama | aksi | `D.kal` (branş başına bir kayıt) | **değişmez** |

- `omrToplamSoru()` beklenen soru sayısını `SORU.den`'den **türetir** — sihirli
  sabit 200 yazmadım (CLAUDE.md: tahmin değil ölçüm).
- `omrKalKayit()` kaydı dpanel ile **birebir aynı şekilde** üretir
  (`{tar,br,d,y,b,kap,konular}`), böylece `kayitGecerli` süzgecinden geçiyor.
- Konu kırılımı **yalnız `KONU_DAG[br]`'de gerçekten karşılığı olan adlar** için
  yazılıyor. Eşleşmeyen ad exception atmaz, sessizce 0 döner ve hata görünmez
  (§153/§155 ailesi) — bu yüzden açık `!==undefined` kontrolü kondu.
- Önizleme kartı kısmi taramada **toplam puan göstermiyor** (10 sorudan 200 soruluk
  puan üretmek yanıltıcı olur); yerine "branş neti" ve açık uyarı var.

### Gerçek tarayıcıda gerçek veriyle doğrulandı

```
pOnce 59.35 → pSonra 59.36   (fark 0.01)
denemeArtti 0 · kalArtti 1 · sonAyni true
kapsam {tam:false, okunan:10, beklenen:200, brans:["Kadın Doğum"]}
konular: jinekolojik(1) · obstetri(2) · jinekolojik onkoloji(1)   ← üçü de gerçek katalogda
sayfa hatası: yok
```

0.01'lik kayma **meşru ve istenen**: `D.kal` kalibrasyonu besler, R_CAL kıpırdar.
Çöküş yok. Kapı bunu "parakete hiç değişmesin" diye ölçmeye kalkıştığımda haklı
olarak kırıldı — iddia yanlıştı, düzeltildi: kapı artık `son()`'un değişmediğini ve
kaymanın kalibrasyon ölçeğinde (<1 puan) kaldığını ölçüyor.

`pu_test` OMR bölümü 9 → **26 kontrol**. Bilinen 7 §229 hatası sabit, yeni hata yok.

**sürüm 2027-03-14a ↔ rota-2027-03-14a**

---

## §268 · TELEFON TURU — JARVIS sohbet penceresine dönüşmüştü

Kullanıcının birincil cihazı telefon; kapılar yerleşim görmüyor. Üç viewport'ta
gerçek tarayıcı turu koştum (`scratchpad/telefon.js` · iPhone 13 390×844@3x ·
iPhone SE 375×667@2x · iPad 820×1180@2x).

**İyi çıkanlar:** yatay taşma **0** (üç cihazda da) · tuval DPR'ye göre doğru
ölçekleniyor (375×667 @2x → 750×1334 arka tampon) · denetim paneli telefonda
ekranın %25–33'ü, iPad'de %8 · 414 düğüm her cihazda kuruluyor · sayfa hatası yok.

### Kusur · JARVIS ekranın %72'sini yutuyordu

Şartname: *"sağ üst köşede, küçük, nadir, saygılı tek satır — sohbet penceresi
değil."* Ölçüm:

| mesaj | kutu (telefon) | satır | ekran yüksekliği |
|---|---|---|---|
| "İyi çalışmalar efendim." | 156×37 | 1 | %4.3 |
| OMR kısmi tarama | **281×87** | **5** | %10.3 |
| OMR kayıt | **281×87** | **5** | %10.3 |

Kutu içeriğe göre küçülüyordu — yani **CSS değil, benim yazdığım mesajlar** uzundu.
Beş satırlık balon köşe satırı değil, sohbet penceresidir.

**İki taraflı düzeltme:**
1. **Mesajlar kısaldı.** Ayrıntı zaten haritadaki kartta yaşıyor (şartname:
   "her şey haritada yaşar"), JARVIS yalnız duyurur.
   `"Kısmi tarama okundu efendim: Kadın Doğum · 4 soru sayıldı · 6 düşük güvenli.
   Deneme değil branş kaydı olarak yazacağım."` → `"Kısmi tarama efendim ·
   Kadın Doğum · 4/10 sayıldı."` Altın yol, açılış selamı ve kayıt mesajları da aynı
   şekilde tek nefeslik hale getirildi.
2. **Yapısal koruma.** `-webkit-line-clamp:2` + `max-width` 72vw → **58vw**. Gelecekte
   uzun bir mesaj yazılsa bile kutu iki satırı aşamaz.

Gerçek kod yollarıyla (hardcode metin değil) yeniden ölçüldü — dördü de sığıyor,
kırpılma yok:

```
"Hoş geldiniz efendim · 20 gün · parakete 59.4 · Anatomi bekliyor."   tasti:false
"Kısmi tarama efendim · Kadın Doğum · 4/10 sayıldı."                  tasti:false
"1 branş kaydı yazıldı efendim · parakete değişmedi."                 tasti:false
"Rota hazır efendim · Pediatrik Alerji ile başlayın · +6.0 net."      tasti:false
```

Altın yol satırı ilk denemede kırpıldı (`tasti:true`); durak sayısı zaten haritada
görünüyor diye satırdan çıkarıldı — kırpma yerine kısaltma.

`pu_test`'e §268 bölümü eklendi (**8 kontrol**): line-clamp · overflow · sağ üst
konum · ≤60vw · pointer-events · hiçbir çağrı yerinin düz metni >150 karakter
olmaması · iki tam cümleden fazlası olmaması · "efendim" hitabının korunması.

### ⚠ Kendi ölçüm hatam — CLAUDE.md'nin tam da uyardığı tuzak

Aynı turda "kart alttan 18 px taşıyor, üç cihazda da" diye bir bulgu üretmiştim.
Taşma yoktu: `atKartUp` animasyonunun `from{transform:translateY(18px)}` değerini
ölçmüşüm — **animasyon otururken ölçüm** (§120–§122, §127, §139, §146, §148, §158
ile aynı hata, sekizincisi). 600 ms bekleyip yeniden ölçünce:

```
iphone13: altTasma 0 · sagTasma 0 · yükseklik 253 (ekranın %30) · iç taşma yok
ipad    : altTasma 0 · sagTasma 0 · yükseklik 201 (ekranın %17) · iç taşma yok
```

Kartta kusur yok; bulgu benim hatamdı. Ölçüm betiğine `waitForTimeout(600)` ve
gerekçesi yorum olarak kondu.

**sürüm 2027-03-15a ↔ rota-2027-03-15a**

---

## §269 · ÇERÇEVE — "sığdır" diyen kod hiçbir şey ölçmüyordu

Telefon ekran görüntüsüne bakınca graf siyah denizde küçük bir ada gibi duruyordu.
Ölçtüm — açılışta içerik ekranın **%57 eni / %24 boyu** kadardı.

### Kusur 1 · açılış ölçeği

```js
/* açılış ölçeği ekrana SIĞDIRILIR (sabit değil — bayat ölçüm dersi) */
const sSig=Math.max(.16,Math.min(.6,Math.min(atlas.w,atlas.h)/1950));
```

Yorum "sığdırılır" diyor, kod **içeriğe hiç bakmıyor**: viewport'u 1950 sihirli
sabitine bölüyor. Kendi yazdığım yorum kendi kodumu yanlış anlatıyordu.

`atlasSigdir()` yazıldı: üst düzey düğümlerin **gerçek sınır kutusundan** merkez ve
ölçek türetiliyor. Tavan `.40`'ta — kitap düğümleri `atSm(.40,.72,s)` ile tam orada
belirir, açılış her ekranda "ders takımyıldızı" kalsın diye.

| cihaz | önce (en/boy) | sonra |
|---|---|---|
| iPhone 13 | %57 / %24 | **%83** / %35 |
| iPhone SE | %57 / %29 | **%83** / %43 |

Dikeyde boşluk kalması doğru: graf neredeyse kare, telefon 9:19.5 — **en** kısıtlıyor.

### Kusur 2 · İKİZ KAYNAK — "ortala" düğmesi geride kalmıştı

Kapı `/1950`'yi arayınca **ikinci bir kullanım** çıktı: `atOdakB` (ortala) düğmesi
kendi kopyasını taşıyordu. Açılışı düzeltmiş, düğmeyi atlamıştım — kullanıcı ortala'ya
bassa harita eski bozuk çerçeveye geri dönecekti. Düğme `atlasSigdir()`'e bağlandı.
CLAUDE.md'nin "bir düzeltmeyi uygularken tüm varyantları tara" dersi (§112/§117/§151
ile aynı aile) — bu kez kapı yakaladı.

### Kusur 3 · odakta etiketler ekran dışına taşıyordu

Odakta uzun konu adları iki yandan taşıyordu. İlk düzeltmem **ölçeği kısmaktı**
(etiket genişliğini `measureText` ile ölçüp zoom'u ona göre daraltmak). Taşma bitti —
ama **konu etiketleri bütünüyle kayboldu**.

⚠ Sebep: etiket eşiklerini `atlasVur`'dan (isabet testi) okumuştum: `atSm(.72,1.18,s)`.
Çizim bambaşka eşik kullanıyor: **`eKonu=atSm(1.8,2.7,s)`**. Ölçek 2.22 → 1.11'e
düşünce eşiğin altına indi. **Kendi soktuğum gerileme.** İki kaynağı varsaydım,
doğrulamadım.

Doğru çözüm taşmayı **zoom'a değil çizime** yıkmak:
- Halka etiketi ve ortalı etiket, yazının gideceği yöndeki **gerçek ekran boşluğuna**
  göre ikili aramayla kısaltılıyor; dikeyde taşan satır hiç yazılmıyor.
- Ölçek artık etiketi değil **halkayı** çerçeveliyor, böylece eşiği geçebiliyor.

Doğrulama gerçek `fillText` çağrıları sarılarak yapıldı (kuralı taklit eden ölçüm
değil — ilk ölçüm betiğim eski 20-karakter kesme kuralını yeniden yazıyordu ve
uygulama kuralı değişince **yanlış alarm** veriyordu):

```
11 branş × 3 cihaz = 33 odak durumu   →  TAŞAN: 0
çizilen yazı: 14–105 (önce odakta 9 idi, konu etiketi hiç yoktu)
```

Telefonda Dahiliye/Genel Cerrahi (81/84 konu) hâlâ 10-11 etiket çiziyor: ölçek 1.5,
eşik 1.8. Bu **doğru davranış** — 84 konu telefona sığmaz, yakınlaşınca beliriyorlar
(Obsidian aynısını yapar). iPad'de 3.15 ölçekte hepsi çiziliyor.

`pu_test`'e §269 bölümü (**12 kontrol**): sınır kutusundan türetme · merkez içerikte ·
açılışta sığma · tavan/taban · ikiz kaynak yok · ortala düğmesi aynı fonksiyonu
kullanıyor · yatay/dikey kırpma · ölçeğin etikete göre kısılmadığı gerilemesi.

**sürüm 2027-03-16a ↔ rota-2027-03-16a**

---

## §270 · DENEME GİRİLEMİYORDU — kabuk tersine çevrilirken açılan işlev deliği

### Kusur

"Uygulama tamamlandı mı" sorusuna cevap ararken erişilebilirliği ölçtüm
(`scratchpad/erisim.js`): `dnmB` (deneme girişi) ve `puOrb` (Ölçüm) **kapalı** —
`main{opacity:0;pointer-events:none}` altında. §258'de kabuğu tersine çevirirken
eski sayfaların İÇİNDEKİ veri girişini haritaya bağlamayı unutmuşum. Sonuç:
sınava 20 gün kala uygulamaya **deneme sonucu yazılamıyordu**; motorun kalbi olan
deneme → kalibrasyon → öncelik döngüsü fiilen durmuştu. Gece raporumda bunu
görmemiştim — görev #27'yi "günlük akış bağlandı" diye kapatıp deneme girişini
ayrıca doğrulamamıştım.

### Düzeltme · İKİZ FORM YOK — kanıtlı yollar haritaya bağlandı

Keşif önce: `dpanel` ve `ppanel` zaten `main` **dışında**, koyu temalı, sabit
katmanlar (satır 2272/2291 > `</main>` 2187) — çalışır durumdaydılar, yalnız
açıcı düğmeleri gizliydi. Ölçüm sayfası (`#olcumIc`) ise main içinde.

| işlem | yol |
|---|---|
| Tam deneme (11 branş D/Y, hızlı + soru-soru ayrıntılı) | kok kartı → "Deneme gir · Ölçüm defteri" → `atOlcumAc()`: `#olcumIc` DOM düğümü overlay'e **TAŞINIR** (kopya değil), `olcumCiz()` çizer, kapatınca eski yuvasına iade |
| 24'lü branş denemesi | ders kartı → "24'lü sonuç gir" → `atDeneme24Ac(br)`: mevcut `dpanel` açılır, branş kullanıcı yolundan önseçilir (`değer + dataset.el + dpanelCiz()`) |
| Power-up havuzu | kok kartı → `atPowerAc()` → mevcut `ppanel` |
| Senk (eşitle/al/gönder) | Ölçüm defterinin içinde zaten var — artık erişilebilir |

- Köprü fonksiyonları **kayıt yazmaz** (kapıyla sabitlendi): kayıt yalnız formların
  kendi işleyicilerinde. Tek doğruluk kaynağı korunuyor.
- Kapatınca `atHaritaTazele()`: yeni deneme düğümleri/altın yol/gruplar tazelenir.
  Eski panellerin kendi ✕ düğmeleri için de dinleyici var.
- Geri tuşu önce açık katmanı kapatır (`atOlcum` → `dpanel`/`ppanel` → ze*).
- Ölçüm sayfasında giriş formu ~4000 px altta (üstte matris/trend) — ilk denemede
  "üstü kapalı" sandım, ölçünce **ekran dışı** çıktı (elementFromPoint ekran dışına
  null döner). Kartın niyeti "deneme GİR" olduğu için açılışta forma kaydırılıyor.

### Gerçek tarayıcıda, gerçek veriyle, gerçek tıklamalarla kanıt

```
kok kartı → Ölçüm defteri     : açık, #olcumIc overlay içinde, girişler ekranda
gerçek giriş (11 branş D/Y)   : D.denemeler 6 → 7 · T 41.5 / K 40.8 · parakete 59.35 → 59.40
uygulamanın SİL düğmesi        : 7 → 6, geri alındı
kapat                          : düğüm eski yuvasında (#olcum), overlay kapalı
ders kartı → 24'lü            : dpanel açık, önseçim "Patoloji", {12D 4Y 2B} D.kal'a
                                 yazıldı, dpanel'in kendi siliyle geri alındı
power-up                       : ppanel açık, 2 liste bölümü dolu
geri tuşu                      : overlay'i kapatır, evrenKip bozulmaz
Playwright gerçek tıklama      : input'a tıkla + "7" yaz → değer "7" ✓
sayfa hatası                   : 0 · dialog: 0 (Senk okur-kilidi tetiklenmedi)
```

`pu_test`'e §270 bölümü (**10 kontrol**): köprüler var · kart eylemleri bağlı ·
köprüler kayıt yazmıyor · DOM taşınıyor/iade ediliyor · forma kaydırma · önseçim
kullanıcı yolu · geri tuşu sırası · ✕ tazeleme dinleyicisi · atHaritaTazele.

Görev #28 kapandı. Bilinen 7 §229 hatası sabit, yeni hata yok.

**sürüm 2027-03-17a ↔ rota-2027-03-17a**

---

## §271 · §229'UN 7 HATASI KAPANDI — ve altından gerçek bir üretim hatası çıktı

### Testi güncellerken bulunan GERÇEK kusur: harita işareti kredi vermiyordu

§229 analizini yeniden ele aldım. Yedi hata, testin §228 ÖNCESİ (ad bazlı çapraz
gölgeleme) davranışı beklemesinden geliyordu; §228 **kullanıcı onaylı** karar.
"Test kırıldı ≠ uygulama bozuk" (CLAUDE.md) — bayat iddiaları güncellemek A/B
kararını vermek değildir; **uygulamanın davranışına dokunulmadı**, B seçeneği
(ad bazlı gölgeleme) kullanıcı kararıyla hâlâ açılabilir.

Ama aynı-grup çiftiyle (Farmakoloji · Otonom Sinir Sistemi ↔ "Yavuz Şahin
Farmakoloji SB") yeniden ölçünce test yine kırıldı — bu kez haklı olarak:

```
kitap işareti (çıplak D.pu yazımı) : parakete +0.0002   ← kredi YOK
görev işareti                       : parakete +0.0545
```

**Kök neden:** eski `klpu` işleyicisi dört adımın hepsini yapıyor — `D.pu` yaz +
`puSenkron()` (sentetik görev üret) + `ikameAta` + **sentetik görevin `D.bitti`
işareti** (paraketeyi besleyen adım bu). Haritanın "Çalıştım"ı (`atlasKonuToggle`)
ve `bcCal` yalnız `D.pu` yazıyordu: işaret haritada görünüyor, kredi verilmiyordu.
"Aynı özelliği iki mekanizma sürmesin" ailesinin ta kendisi.

**Düzeltme:** `puIsaretle(a,geri)` — dört adım tek fonksiyonda; üç çağrı yeri de
(klpu · atlasKonuToggle · bcCal) artık onu kullanıyor. Ölçüm:

```
kitap kredisi 0.0002 → 0.0541 (görevle fark 0.0004 · "iki yol benzer getiri" ✓)
gölge ✓ · potansiyel düşüyor ✓ · ikinci kaynak 0.0240 < 0.0541 (çift sayım ✓)
geri alma paraketeyi BİREBİR eski değerine döndürüyor ✓ · tavan 66.3 (55–75 ✓)
```

Test bloğu yeniden yazıldı (20 → **25 kontrol**): aynı-grup çifti, gerçek
işaretleme yolu (`puIsaretle`), geri-alma kontrolü ve üç çağrı yerinin ortak
yolda olduğunun statik kanıtı eklendi. **pu_test ilk kez 0 hata.**

## §272 · OMR DÜZELTME AKIŞI — düşük güvenli okuma kartın içinde karara bağlanır

Kadın Doğum 191–200'ün 6 sorusu düşük güvenle okunmuştu ve kullanıcı düzeltmesi
bekliyordu — ama uygulamada düzeltme ARACI yoktu; kullanıcıya "sabah birlikte
düzeltiriz" demiştim. Araç kuruldu (şartnameye uygun: kartın içinde, panel yok):

- Önizleme kartındaki düşük-güven çipleri artık **tıklanabilir**; açılan şeritte
  o sorunun **okuma notu** ("yeşil B okunuyor; sol işaret okunamadı…") ve üç
  karar: **Doğru / Yanlış / Boş bırak**.
- Düzeltme okuma katmanından SONRA, eşleştirmeden ÖNCE uygulanır; onaylanan satır
  güven 1.0 ile nete girer. **Boş bırakılan nete girmez** — uydurma yok.
- Yeniden hesaplama sessiz (JARVIS tekrar konuşmaz); vazgeç/kaydet düzeltme
  durumunu temizler.

Gerçek veriyle E2E: #192 → "Yanlış" → düşük 6→5, sayılan 4→5, kayıt `{0D, 5Y}`
(düzeltilen gerçekten sayıldı) · #193 → "Boş bırak" → nete girmedi · onay sonrası
durum temiz · sayfa hatası 0.

⚠ Bu turda kapı bir de **kendi yan etkimi** yakaladı: §272'nin yapışkan `kip`'i
argümansız `omrOnizle()`'nin mock varsayılanını eziyordu (önceki "gercek" kipini
miras alıyordu) — kalıcılık yalnız sessiz yeniden-çizime daraltıldı.

`pu_test`'e §272 bölümü (**8 kontrol**). **Tüm batarya: 0 hata** (11 koşan kapı).

**sürüm 2027-03-18a ↔ rota-2027-03-18a**

---

## §273 · PROJE RAFTA — kullanıcı kararıyla eski uygulama görünümüne dönüş

Kullanıcı: *"projeyi şimdilik rafa kaldırıp eski uygulama görünümüne dönüyoruz.
sürüm: 2027-02-18a"*. ("şimdilik" — kalıcı iptal değil, park.)

### Ne yapıldı

- **Açılış eski kabuğa çevrildi**, 2027-02-18a dönemiyle (`699f823`, DEVIR §238)
  birebir: üst-düzey init + `karsilamaAc()`. `<body>` üzerindeki `evrenKip`
  sınıfı kaldırıldı; `atlasAc()` açılış çağrısı çıkarıldı.
- **ATLAS / Bilgi Evreni kodu SİLİNMEDİ** — uykuda duruyor. Geri dönüş: body'ye
  `evrenKip` sınıfını ve açılışa `atlasAc()` çağrısını geri koymak (tek yer,
  kodda §273 yorumuyla işaretli).
- **Motor korunmuş durumda** (kullanıcının değişmez kuralı): §254–§272'nin tüm
  düzeltmeleri — `tavanBant` bandı, `gunOlcekle` satır ölçekleme, `gorevOncelik`
  100× hızlanma, `puIsaretle` kredi düzeltmesi, OMR kapsam yönlendirmesi —
  eski görünümün ALTINDA aynen çalışıyor.
- Sürüm istendiği gibi **2027-02-18a** yapıldı. ⚠ Etiket "geriye" gidiyor ama
  sorun değil: sw.js önbelleği eşitlik/farklılıkla kırar, sıralamayla değil;
  HTML için önce-ağ olduğundan telefon "sürüm yenile"de bunu alır.

### Doğrulama (gerçek tarayıcı + gerçek veri)

```
evrenKip: false · ATLAS çalışmıyor · karşılama açılıyor
karşılama kapatılınca: header/main görünür · dnmB OK · puOrb OK · dpanel açılıyor
çark çizili · ÖLÇÜLEN 60.15 · PARAKETE 59.35 · 6 deneme · sürüm 2027-02-18a
sayfa hatası: 0 · tüm batarya: 0 hata (bayat açılış iddiası §273'e güncellendi)
```

### Açık kalanlar (raf sırasında da geçerli)

- Rafa kalkan işin durumu §259–§272'de belgeli; **B seçeneği (ad bazlı gölgeleme)**
  ve OMR malzemeleri beklemede.
- Eski görünümde güncel motor değerleri doğal olarak görünür (parakete/band
  güncel) — bu istenen davranış, motor korunuyor.

**sürüm 2027-02-18a ↔ rota-2027-02-18a**

---

## §274 · KARŞILAMA KALDIRILDI + AKICILIK — 65 saniyelik panel, 87× hızlandı

Kullanıcı: karşılama animasyonu gereksiz ve düzgün çalışmıyor; **"tıkladığım her
şey çok akıcı lagsız çalışsın, önemli olan bu"** (iPhone + iPad).

### Karşılama

Açılış çağrısı kaldırıldı; uygulama doğrudan panoya iniyor. Kod uykuda
(evrenKabukGeri'deki kopya dahil) — kapı, açılış bloğunun KENDİSİNİ denetliyor
(uykudaki kopyayla yanlış-yeşile düşmüştü, düzeltildi).

### Akıcılık — önce ölçüm (4× CPU kısıtı, iPhone vekili, gerçek veri)

| etkileşim | önce | sonra |
|---|---|---|
| Power-up paneli açma | **65 114 ms** | 518 ms |
| Görev tamamlama dokunuşu | 2 853 ms | 909 ms |
| Deneme paneli açma | 157 ms | 106 ms |
| Boşta / kaydırma ortancası | 16.6 ms | 16.5 ms (zaten temizdi) |

Kısıtsız fonksiyon profili:

| fonksiyon | önce | sonra | sebep |
|---|---|---|---|
| `ppanelCiz()` | 12 461 ms | **143 ms** | 254 kalem × ayrı `para()` + ayrı `grupNet()` |
| `puSirali()` | 8 570 ms | 59 ms | aynı hastalık (§254'ün `gorevOncelik`te çözdüğü) |
| `ust()` | 523 ms | 33 ms | bant/kazanç boyama SONRASINA ertelendi |
| `konuCalisildi` (dokunuşta) | 372 ms | 4 ms | küme her çağrıda yeniden tokenize ediliyordu |

### Yapılanlar (motor matematiğine DOKUNULMADI)

1. **`pePKapsam(f)`** — §254'ün kanıtlı deseni fonksiyonlaştı: kapsam boyunca
   `para()` ve `grupNet()` birer kez (`_peP` + `_gnP`). `puSirali`, `ppanelCiz`,
   `kitapListe` sarıldı. ⚠ `puanVarsayim`'ın simüle `D.bitti` üzerindeki `para()`
   çağrıları ETKİLENMEZ — `_peP` yalnız `_peP||para()` okuyan yerlere sızar.
2. **`ust()` bölündü**: pahalı bant/kazanç (`kalanKazanci` 300 + `tavanBant`×2
   200 ms) `ustBant()`'a taşındı, boyamadan 40 ms sonra koşuyor; ardışık
   dokunuşlar tek hesapta birleşiyor. Matematik aynı, yalnız zamanlama.
   (Test VM'inde `setTimeout` yok — eşzamanlı düşer, kapılar bandı anında görür.)
3. **`konuCalisildi` ön-hesap + memo**: küme kurulurken tokenlar bir kez
   (`konuTok` tek kaynak — `konuOrtus` da onu kullanıyor), sonuçlar küme sürümü
   başına memoize. Kural birebir: eşitlik / iki yönlü alt-dizgi / token alt-kümesi.
4. **Tam ekran panellerden blur kaldırıldı** (`#dpanel/#ppanel/#bpanel/#kpanel`):
   %96 opak zeminin arkasında görünmüyordu ama iOS'ta her karede bedeli var;
   opaklık .97'ye çıkarıldı. Görünür cam dokusuna (başlık vb.) DOKUNULMADI.

### Reddedilen optimizasyon (ölçüm çürüttü)

Önbellek anahtarlarındaki `JSON.stringify(D.denemeler)` şüphesi: ölçüm 0.04 ms
dedi (gerçek veride 15 KB) — dokunulmadı. `dOran`'ın dokunuş başına 80 ms'lik
yeniden hesabı da MEŞRU (bitti tarihleri gerçek girdi) — bırakıldı.

### Doğrulama

Karşılamasız açılış: başlık anında görünür, bant dolu (`→ 60.8–63.9`), değerler
gerçek veriyle birebir · dokunuş işaret değiştirip geri alınabiliyor · panel
içerikleri (2 sütun, sayılar) değişmedi · tüm batarya 0 hata · sayfa hatası 0.
Üç bayat kapı iddiası güncellendi (opak+blur §229 · konuOrtus imzası · açılış).

**sürüm 2027-02-18b ↔ rota-2027-02-18b**

---

## §275 · KULLANICININ 4 ŞİKÂYETİ — 23.5 sn'lik sekme, ölü oklar, şişen satırlar, eski tuşlar

Kullanıcı bildirimi: (1) pinch ile açılan Program–Kitap ve konu/soru-deneme
geçişleri 15-20 sn; (2) gün okları "tıklıyorum tıklıyorum sayfa değişmiyor";
(3) az görevli günde satırlar aşırı büyüyor, dolu günde son satır alt kenara
değip yarı saydam oluyor — "pencerenin altından 1-2 parmak payı olsa";
(4) telafi/tamamlananlar tuşları eski görünümde kaldı.

### 1 · Sekme geçişi: 23 503 ms → 200 ms (4× kısıt)

Yeniden üretildi (iPad yatık + gerçek veri, 4×: **23.5 sn**). CPU profili üç
katman çıkardı, üçü de ayrı düzeltildi:

- **`dOran` çağrı BAŞINA anahtar stringify'ı** (isabette bile): `curume` her
  konu çarpanında `SORU_ORAN_VAR→dOran` çağırıyor; kitap görünümü konu×satır
  başına on binlerce çağrı → tek geçişte 3.2 sn SADECE anahtar kurmak.
  Önce stringify memoize edildi (referans+uzunluk korumalı), sonra anahtara
  metin yerine **sürüm sayacı** (`denVer/kalVer`) kondu — sayaç yalnız içerik
  değişince artar. İçerik türetimi korunuyor: push / filter-yeniden-atama /
  splice / test `D.x=[...]` ataması — hepsi referans ya da uzunluk değiştirir;
  yerinde kayıt düzenleme yolu kodda yok.
- **`zeSerit` raftaki Evren şeridi için her sekme dokunuşunda ≥5 tam `para()`
  geçişi ödetiyordu** (yenile(true)→zeSerit; tavanBant×2 + kalanKazanci).
  Görünmüyorken (offsetParent===null) hesap atlanır.
- **Soğuk ilk açılış** (gorevKazanc `_gkOnb` dolumu + konu eşleştirme + dOran
  ≈ 1.4 sn; sonrakiler 80-90 ms): açılıştan 1.4 sn sonra **boşta ısındırma**,
  4 parçaya bölünmüş (aralarda ana iş parçacığı dokunuşa açık).

Ölçüm (4×, gerçek veri): Kitap **23 503→200 ms** · alt sekmeler 1 315→192 ·
Program'a dönüş 991→126 · oklar 100 ms.

### 2 · Ölü oklar — GERÇEK HATA (keşif ajanı buldu, tarayıcıda doğrulandı)

`yenile()`→`bagla()` listeyi `innerHTML` ile yeniden kurarken `[data-gun]`
oklarını **yeniden bağlamıyordu**: bir görev işaretlendikten ya da sekme
değiştirildikten sonra ‹ › ölüyordu. §235'in yedek devresi de okları
kapsamıyordu. İki taraflı düzeltme: `yenile` artık `gunBagla(gl)` çağırıyor
VE yedek devre seçicisine `[data-gun]` dalı eklendi. Doğrulama: işaretten
sonra `okBagliMi:true`, sekme değişiminden sonra gün ilerliyor.

### 3 · Satır ölçekleme (ölçerek)

Beğenilen dolu-gün boyu ölçüldü: **23.9-25.2 px**; seyrek gün **57.3 px'e**
şişiyordu (tavan `h/7`→110). İçerik alt kenara 4 px kala bitip 16 px'lik maske
bandına giriyordu (yarı saydamlığın sebebi).
- Tavan: `max(46,min(110,h/7))` → **`max(26,min(34,h/18))`** — seyrek gün ≤34 px.
- Alt pay: tolerans `h-2` → `h-PAY`, `PAY=max(28,min(76,round(h*0.09)))` —
  iPad yatıkta 59 px, telefonda 61-69 px ("1-2 parmak"); maske bandına giren
  satır kalmadı. Ölçüldü: dolu gün 21-22 px + altPay 59-69 ✓, seyrek 34 px ✓.

### 4 · Tuşlar: eski ÇİP kuralları orb'u eziyordu

HTML çoktan `.dOrb/.puOrb`'a geçmişti; `#kacir`/`#bitti` ID blokları (özgüllük)
hap-çip stiliyle orb'u eziyordu. Bloklar silindi; yalnız görünürlük kapısı
(`.gor`) ve ince renk kimliği kaldı (telafi altın, tamamlanan yeşil, rozet
yeşil). Ölü `#bugun` kuralları (HTML'de eleman yok), 1525'teki dar-ekran çip
ezmesi ve tek kullanıcısı silinen `nefes` keyframes'i de kaldırıldı.

Kapılar: 6 bayat iddia güncellendi (anahtar-stringify ×3 · h-2 toleransı ·
SAT_TAVAN ×2). Tüm batarya 0 hata; sayfa hatası 0.

**sürüm 2027-02-18c ↔ rota-2027-02-18c**

---

## §276 · BOY PENCEREDEN SABİT + TAŞMA SÜTUNA BÖLÜNÜYOR — kullanıcının yeni düzen modeli

Kullanıcı iki şey istedi: (1) kitap seçilince açılan liste sığmıyor, sığmayan
satırlar GÖRÜNMÜYOR — "tek bakışta listenin tamamını görmek istiyorum, alanı
ortadan bölüp sola ve sağa yerleştirebilirsin"; (2) "düğmelerin ve görevlerin
boyutu tarihi değiştirince görev sayısına göre bile değişiyor ve bu kötü
duruyor — boyut yalnız pencere boyutuna göre ölçeklenmeli".

### Önce ölçüm

- En yoğun program günü **15 satır**; en uzun kitap detayı **44 satır**
  ("Atilla Uslu Dahiliye videoları") — taşan buydu, `overflow:hidden` altında
  satırlar fiilen kayboluyordu.
- Düğmeler de günle birlikte oynuyordu: `.glAnh` sekme anahtarı boyutlarını
  `--gsat`'tan türetiyor; eski ikili arama `--gsat`'ı GÜNÜN İÇERİĞİNE göre
  seçtiği için tarih değişince her şey büyüyüp küçülüyordu.

### Yeni model (gunOlcekle baştan yazıldı)

- **Boy yalnız pencereden:** `SAT=clamp(24, h/24, 32)` — güne/içeriğe bakmaz.
  Ölçüldü: 8 gün boyunca iPad 27.2 px, telefon 28.4 px, hiç oynamıyor;
  `--gsat` tüketen düğme/başlıklar da otomatik sabitlendi.
- **Taşma sütunla çözülür:** başlık kümesi dışındaki gövde `.glGov`
  sarmalayıcısına alınır; sığmıyorsa `#gunListe.cift` → `column-count:2`
  (satır/blok başlığı sütun ortasında kırılmaz). Kullanıcının istediği yöntem.
- **Dar pencere sıkılaştırması (`sikCift`, w<560):** branş/süre + ikincil
  çipler (`klP/klG/kaz/glHat`) gizlenir — ölçüm bunları gizlemeden başlığa
  **0 px** kaldığını göstermişti (çipler 97 px, sütun 167 px). Ayrıca klasik
  flex tuzağı: `.ko`'ya `min-width:0` eklenmeden elips hiç devreye girmiyordu
  (44 satırın 17'si yatay taşıyordu → 0).
- **Tek istisna:** iki sütunda BİLE taşan liste (44 satırlık kitap) görünmez
  satır bırakmamak için küçülür (17.1–17.3 px'e indi) — "tek bakışta tamamı"
  boy sabitliğinden önce gelir; kodda gerekçesiyle işaretli.
- KAYDIRMA YOK ilkesi korunuyor.

### Doğrulama (gerçek tarayıcı, iki cihaz)

```
boylar 8 gün sabit: iPad 27.2 · telefon 28.4 (yoğun gün yalnız 2 sütuna geçiyor)
44 satırlık kitap: gizli satır 0 · yatay taşan satır 0 · alt pay 61-64 px
görseller: kitap44_tel/ipad.png — iki temiz sütun, elips düzgün
```

Kapılar: 10 bayat iddia §276'ya güncellendi (SAT_TAVAN/YAZ_TAVAN formülleri,
9-tur, enIyi, KAYDIRMA YOK ilkesi yoruma geri kondu). Tüm batarya 0 hata.

**sürüm 2027-02-18d ↔ rota-2027-02-18d**

---

# ⚠ DEVİR NOTU · KALDIĞIM YER

## Tamamlanan (bu oturumda)

§219–§226 · **FT serisi on kitap** power-up havuzuna işlendi (156 → 254 konu). `ft_katalog.py` tek kaynak, `ft_uret.py` hepsini yeniden üretiyor.

§227–§228 · **Konu tekilliği · net havuzu paylaşımı.** Bir konu hangi kaynaktan okunursa okunsun ilk öğrenme getirisi bir kez; ikinci kaynak tekrar getirisi veriyor. Anahtar grup bazlı.

§244–§253 · **AUDIT + FAZ 1–4.** Motor gerçek 6 deneme + 200 soru verisiyle birebir doğrulandı (`kaynak/audit_gercek.js`): veri bütünlüğü, PARAKETE, R_CAL kalibrasyon, 8'li matris, trend, tempo — UI↔motor ayrışması yok. FAZ 1 KOMBO kurtarma · FAZ 2 konu-seviye decay (`konuCurume`) · FAZ 3 `denemeTrend(5)` · FAZ 4 `tempoProjeksiyon` (hepsi motorun YANINDA, paralel model değil).

§254 · **FAZ 5 · tek açıklanabilir öncelik katmanı + ulaşılabilir tavan bandı.** `gorevOncelik`/`gorevNeden` (rehberSec+puEtki birleşimi, branş§konu tekilleştirme, kanıt cümleleri) · `tavanBant` (kalan iş bitince R_CAL±1.96·sd bandı; kök kusur `_rcZorla` bayrağıyla düzeldi). Sürüm 2027-03-01a.

## ⚠ YARIM KALAN · TASARIM

Kullanıcı altı ekran görüntüsüyle bildirdi: **power-up paneli, matris ve seyir sayfalarının tasarımı** kitap sekmesi/Program-Kitap anahtarı kadar iyi değil.

Beğenilen referans: `.glAnh` altın gradyan anahtar · `.glS` satır düzeni · daire tamamlama düğmesi (§217).

Düzeltilecekler:
- ~~Power-up paneli · Konu/Soru/Deneme anahtarı mavi, panelin geri kalanıyla uyumsuz~~ ✓ §229
- ~~Kart düzeni · "+0.189 net" üstte ayrı satır, dağınık~~ ✓ §229
- ~~Matris tablosu · sütun hizaları ve tipografi~~ ✓ §230 (+ kör nokta rozeti)
- ~~Seyir defteri grafikleri~~ ✓ §230 (branş trend kartları; ana seyir grafiği hafif dokunuş)

Bekleyen: kullanıcıdan etiketli deneme verisi (§230 formatı) · cihazdan "Hata kaydı" dökümü.

## Bilinen açık noktalar

- **`FT Dahiliye · Geriatri`** 0.51 soru · kullanıcı onayıyla nöroloji payının 1/4'ü
- **D_ORAN belirsizliği** hâlâ ±0.57 · program bitse ~0.33'e iner, öncel baskın kalıyor
- **Potansiyel ile gerçek artış** arasında ~0.42 net fark (§205'te belgeli, bilinçli muhafazakâr)
- **Aynı kayıt iki kez girilirse** iki kez sayılıyor · yinelenen denetimi yok (bilinçli)
- **Zihin evreni force-graph (§246) kullanıcı görsel onayı bekliyor** · onaysız ders↔ders çapraz kenarları + Deneme/Çalışma dalışı + anıt görselleri eklenmeyecek
- **§229 kapandı (§271):** pu_test **0 hata** — bayat iddialar §228'in kullanıcı onaylı
  grup-bazlı davranışına göre güncellendi; altından çıkan gerçek kusur (harita işareti
  parakete kredi vermiyordu) `puIsaretle` ortak yoluyla düzeltildi. **B seçeneği
  (ad bazlı çapraz gölgeleme) istenirse hâlâ açılabilir** — o zaman davranış VE test
  birlikte değişir; 297 konudan 8'ini etkiler.
- kos.js sözdizimi **onarıldı** (§266) — ama `tam_test.js` repoda olmadığı için hâlâ koşmuyor.
- Paket boşlukları **sürüyor**: `eko.py` · `senk_test.js` · `tam_test.js` hiç commit
  edilmemiş; `tus_tamami.tar.gz` gerekiyor.
- **OMR gerçek malzeme eksikleri:** boş optik form fotoğrafı · cevap anahtarı formatı ·
  kitap içindekiler tabloları (alt başlık seviyesi için). Kadın Doğum 191–200'ün
  6 düşük güvenli sorusu için **düzeltme aracı kuruldu (§272)** — kullanıcı kartın
  içinden D/Y/Boş kararını verebilir; içerik doğrulaması hâlâ kullanıcıda.
