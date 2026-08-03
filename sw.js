/* Rota — çevrimdışı önbellek.
   HTML için ÖNCE AĞ: yeni sürüm yayınlanınca anında görünür, internet yoksa önbellekten açılır.
   Diğer dosyalar için önce önbellek, arkada sessizce tazelenir. */
const SURUM = 'rota-2027-03-11a';
const KABUK  = ['./', './index.html',   ];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(SURUM).then(c => c.addAll(KABUK)).then(() => self.skipWaiting()).catch(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== SURUM).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', e => { if (e.data === 'guncelle') self.skipWaiting(); });

self.addEventListener('fetch', e => {
  const istek = e.request;
  if (istek.method !== 'GET') return;

  /* KRİTİK: kendi kaynağımız dışındaki istekleri (GitHub API senkronu gibi) hiç ellemiyoruz.
     Yakalanırsa önbellekten bayat yanıt döner ve senkron karşı cihazdaki değişikliği göremez. */
  let url;
  try { url = new URL(istek.url); } catch (x) { return; }
  if (url.origin !== self.location.origin) return;
  if (istek.headers.get('authorization')) return;

  const htmlMi = istek.mode === 'navigate' ||
                 (istek.headers.get('accept') || '').includes('text/html');

  if (htmlMi) {                                   // ÖNCE AĞ
    e.respondWith(
      fetch(istek, { cache: 'no-store' })
        .then(yanit => {
          const kopya = yanit.clone();
          caches.open(SURUM).then(c => c.put('./index.html', kopya)).catch(() => {});
          return yanit;
        })
        .catch(() => caches.match('./index.html', { ignoreSearch: true })
                       .then(v => v || caches.match('./')))
    );
    return;
  }

  e.respondWith(                                  // ÖNCE ÖNBELLEK, arkada tazele
    caches.match(istek, { ignoreSearch: true }).then(bulunan => {
      const ag = fetch(istek).then(yanit => {
        const kopya = yanit.clone();
        caches.open(SURUM).then(c => c.put(istek, kopya)).catch(() => {});
        return yanit;
      }).catch(() => bulunan);
      return bulunan || ag;
    })
  );
});
