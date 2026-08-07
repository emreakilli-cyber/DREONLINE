/* ══ §306 · UYKU / HRV KAPISI · GERÇEK DOKUNUŞ ═════════════════════
   NEDEN VAR: Kullanıcı Apple Sağlık uykusuna ve Bevel'deki HRV/enerji/
   stres değerlerine bakmak istedi. Tarayıcıdan HealthKit'e erişilemediği
   için veri CİHAZDAN uygulamaya veriliyor (Kısayollar JSON'u ya da elle).
   Bu kapı ayrıştırıcıyı (saat/dakika/İngilizce anahtar/bozuk JSON),
   kaydı, şerit özetini, kendi ortancasına göre uyarıyı, senkron beyaz
   listesini ve GERÇEK DOKUNMA HEDEFİNİ sınıyor.
   ⚠ Dokunma hedefi kontrolü boşuna değil: ilk koşumda dibe yapışık şerit
   "kaydet" düğmesinin üstüne biniyordu (§300'ün aynı sınıfı).
   Koşum: NODE_PATH=/opt/node22/lib/node_modules node kaynak/sag_test.js */
const DOSYA='/mnt/user-data/outputs/index.html';
const fs=require('fs');
if(!fs.existsSync(DOSYA)){ console.log('⚠ '+DOSYA+' yok — ATLANDI'); process.exit(0) }
let _c; for(const ad of ['playwright','playwright-core']){ try{_c=require(ad).chromium;if(_c)break}catch(e){} }
if(!_c){ console.log('⚠ playwright yok — UYKU/HRV kapısı ATLANDI'); process.exit(0) }
(async()=>{
 const br=await _c.launch({executablePath:'/opt/pw-browsers/chromium',args:['--enable-unsafe-swiftshader','--no-sandbox','--disable-gpu']});
 const pg=await br.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true});
 const err=[];pg.on('pageerror',e=>err.push(e.message));
 await pg.goto('file:///mnt/user-data/outputs/index.html');await pg.waitForTimeout(2600);
 let H=0;const chk=(a,ok,x)=>{if(!ok){H++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}else console.log('  ✓ '+a)};

 chk('boşta "verisi yok" diyor',/verisi yok/.test(await pg.evaluate(()=>sagH.textContent)));
 chk('kutu KAPALI başlıyor',!(await pg.evaluate(()=>sagKutu.classList.contains('ac'))));

 const b=await pg.locator('#sag').boundingBox();
 await pg.touchscreen.tap(b.x+b.width/2,b.y+b.height/2); await pg.waitForTimeout(400);
 chk('dokununca açılıyor',await pg.evaluate(()=>sagKutu.classList.contains('ac')));
 /* §306 · YAPIŞKAN ŞERİT ÇAKIŞMASI · gerçek dokunuş hedefi ölçülüyor
    (§300 dersi: görsel kutu doğru olsa da üstünde başka katman olabilir) */
 await pg.locator('#sagKay').scrollIntoViewIfNeeded(); await pg.waitForTimeout(200);
 const hed=await pg.evaluate(()=>{const q=sagKay.getBoundingClientRect();
   const e=document.elementFromPoint(q.left+q.width/2,q.top+q.height/2);
   return e?(e.id||e.className):'yok'});
 chk('"kaydet" dokunuşunu BAŞKA düğme çalmıyor',hed==='sagKay',hed);

 // format çeşitleri
 const c=await pg.evaluate(()=>[
   sagCoz('{"uyku":"7h20m","hrv":42,"dnb":52,"enerji":78,"stres":31}'),
   sagCoz('{"sleep":"6:45","hrv":38,"rhr":55,"date":"2026-08-06"}'),
   sagCoz('{"uyku":440}'),          // dakika
   sagCoz('{"uyku":7.5}'),          // saat
   sagCoz('{"zzz":1}'),             // tanınmayan
   sagCoz('bozuk')                  // JSON değil
 ]);
 chk('7h20m → 7.33 sa',c[0].kay.uyku===7.33,c[0]);
 chk('5 alan da okundu',c[0].okunan===5,c[0].okunan);
 chk('İngilizce anahtarlar + tarih',c[1].kay.uyku===6.75&&c[1].kay.dnb===55&&c[1].tar==='2026-08-06',c[1]);
 chk('440 dakika → 7.33 sa',c[2].kay.uyku===7.33,c[2].kay);
 chk('7.5 saat aynen',c[3].kay.uyku===7.5,c[3].kay);
 chk('tanınmayan alan SESSİZCE atılmıyor',c[4].okunan===0&&c[4].tanimsiz[0]==='zzz',c[4]);
 chk('bozuk JSON hata döndürüyor',!!c[5].hata,c[5]);

 // gerçek yapıştırma + kaydet
 await pg.fill('#sagT','{"uyku":"7h20m","hrv":42,"dnb":52,"enerji":78,"stres":31}');
 const dok=async sel=>{ await pg.locator(sel).scrollIntoViewIfNeeded();
   const q=await pg.locator(sel).boundingBox();
   await pg.touchscreen.tap(q.x+q.width/2,q.y+q.height/2); await pg.waitForTimeout(600) };
 await dok('#sagKay');
 const r=await pg.evaluate(()=>({m:sagM.textContent,h:sagH.textContent,
   d:JSON.parse(JSON.stringify(D.saglik)),dolu:document.getElementById('sag').classList.contains('dolu')}));
 chk('kaydedildi mesajı',/^✓/.test(r.m),r.m);
 chk('şerit özeti yazıyor',/7 sa 20 dk uyku · HRV 42/.test(r.h),r.h);
 chk('D.saglik yazıldı',r.d[Object.keys(r.d)[0]].hrv===42,r.d);
 chk('şerit dolu sınıfı aldı',r.dolu);

 // elle giriş (yapıştırma alanı boşken)
 await pg.fill('#sagU','6'); await pg.fill('#sagV','30');
 await dok('#sagKay');
 const r2=await pg.evaluate(()=>({m:sagM.textContent,v:D.saglik[bgun()]}));
 chk('elle giriş üstüne yazıyor',r2.v.uyku===6&&r2.v.hrv===30&&r2.v.kaynak==='elle',r2);

 // uyarı · kendi ortancasına göre
 const uy=await pg.evaluate(()=>{
   const g=bgun(); const S=D.saglik;
   ['2026-08-01','2026-08-02','2026-08-03','2026-08-04'].forEach(d=>S[d]={uyku:8,hrv:50});
   S[g]={uyku:5.5,hrv:35};
   return {uyari:sagUyari(),ozet:sagOzet()}});
 chk('kısa uyku uyarısı ÜRETİLİYOR',/uyku kendi ortancandan/.test(uy.uyari),uy.uyari);
 chk('düşük HRV uyarısı üretiliyor',/HRV ortancanın/.test(uy.uyari),uy.uyari);

 const m=await pg.evaluate(()=>kocDurumMetni());
 chk('durum metninde uyku satırı var',/uyku\/toparlanma · /.test(m),m.split('\n').find(x=>/toparlanma/.test(x)));

 const kod=fs.readFileSync(DOSYA,'utf8');
 chk('senkron beyaz listesinde saglik var',/saglik:\(o&&typeof o\.saglik==='object'&&o\.saglik\)\|\|\{\}/.test(kod));
 /* Uydurma UÇ NOKTA aranıyor — kelimenin kendisi değil (arayüz metni
    kullanıcıya HealthKit'in neden okunamadığını anlatıyor, o kalsın). */
 chk('uydurma sağlık/Bevel uç noktası YOK',
   !/https?:\/\/[^"'\s]*(?:health|bevel|tusbuddy)/i.test(kod),
   (kod.match(/https?:\/\/[^"'\s]*(?:health|bevel|tusbuddy)[^"'\s]*/i)||[])[0]);

 console.log('\nSAYFA HATASI: '+(err.join(' | ')||'(yok)'));
 console.log('\n═══ §306 · UYKU / HRV ═══');
 console.log(H?('✗ '+H+' HATA'):'✓ SIFIR HATA — 21 gerçek dokunuş kontrolü');
 await pg.evaluate(()=>{sagKutu.classList.remove('ac')});
 await pg.screenshot({path:'/tmp/sag_390.png'}).catch(()=>{});
 await br.close(); process.exitCode=H?1:0})();
