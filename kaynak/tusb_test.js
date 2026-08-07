/* ══ §307 · TUSBuddy KÖPRÜSÜ KAPISI ════════════════════════════════
   NEDEN VAR: Kullanıcının isteği "TUSBuddy üyeliğime bağlı kronometre".
   TUSBuddy'nin belgelenmiş API'si yok ve uç nokta UYDURULMUYOR; onun
   yerine kullanıcı kendi tarayıcısından "Copy as cURL" ile GERÇEK isteği
   veriyor, uygulama onu tekrar oynatıyor.

   Bu kapı iki bölümden oluşuyor:
   A · cURL ayrıştırıcı + yer tutucular + güvenlik (şablon senkrona
       girmiyor, http reddediliyor, koda gömülü adres/şifre yok)
   B · UÇTAN UCA: yerel HTTPS sahte sunucu kurulup uygulamanın GERÇEKTE
       ne gönderdiği ölçülüyor — gövde alanları, 401'de kendiliğinden
       giriş yenileme, kuyruk, ve sunucu kapalıyken YEREL sayacın
       etkilenmemesi.
   Koşum: NODE_PATH=/opt/node22/lib/node_modules node kaynak/tusb_test.js */
const _fs=require('fs'), _cp=require('child_process'), _os=require('os');
const DOSYA='/mnt/user-data/outputs/index.html';
if(!_fs.existsSync(DOSYA)){ console.log('⚠ '+DOSYA+' yok — ATLANDI'); process.exit(0) }
let _c; for(const ad of ['playwright','playwright-core']){ try{_c=require(ad).chromium;if(_c)break}catch(e){} }
if(!_c){ console.log('⚠ playwright yok — TUSBuddy kapısı ATLANDI'); process.exit(0) }
/* Sahte sunucu için kendinden imzalı sertifika · geçiciye üretiliyor */
const SRT=_os.tmpdir()+'/tusb_kapi';
try{ _fs.mkdirSync(SRT,{recursive:true});
  if(!_fs.existsSync(SRT+'/k.pem'))
    _cp.execSync('openssl req -x509 -newkey rsa:2048 -keyout '+SRT+'/k.pem -out '+SRT+
      '/c.pem -days 30 -nodes -subj "/CN=localhost" -addext "subjectAltName=IP:127.0.0.1"',
      {stdio:'ignore'});
}catch(e){ console.log('⚠ openssl yok — B bölümü ATLANDI'); }
const SUNUCU_VAR=_fs.existsSync(SRT+'/k.pem');
async function bolumA(){
 console.log('═══ A · cURL AYRIŞTIRICI · GÜVENLİK ═══');
 const br=await _c.launch({executablePath:'/opt/pw-browsers/chromium',args:['--enable-unsafe-swiftshader','--no-sandbox','--disable-gpu']});
 const pg=await br.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true});
 const err=[];pg.on('pageerror',e=>err.push(e.message));
 await pg.goto('file:///mnt/user-data/outputs/index.html');await pg.waitForTimeout(2600);
 let H=0;const chk=(a,ok,x)=>{if(!ok){H++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}else console.log('  ✓ '+a)};

 // ── cURL AYRIŞTIRICI · gerçek Safari/Chrome çıktı biçimleri
 const c=await pg.evaluate(()=>[
  curlCoz(`curl 'https://api.ornek.com/v1/timer' -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer ABC123' --data-raw '{"start":"{{BAS}}","end":"{{BIT}}"}'`),
  curlCoz("curl \"https://api.ornek.com/x\" \\\n  -H \"Cookie: s=1\" \\\n  --data 'a=1' --compressed"),
  curlCoz(`curl 'https://api.ornek.com/y' -b 'sid=99' -H 'Content-Length: 12' -H 'Host: x' `),
  curlCoz(`curl $'https://api.ornek.com/z' -H $'X-A: b\\u0041'`),
  curlCoz('wget https://x'),
  curlCoz("curl 'http://api.ornek.com/x'"),
  curlCoz('curl -H "A: b"')
 ]);
 chk('POST + 2 başlık + gövde okundu',c[0].yontem==='POST'&&c[0].baslik.Authorization==='Bearer ABC123'&&/\{\{BAS\}\}/.test(c[0].govde),c[0]);
 chk('satır sonu ters bölüleri yutuluyor',c[1].url==='https://api.ornek.com/x'&&c[1].baslik.Cookie==='s=1'&&c[1].govde==='a=1',c[1]);
 chk('-b çereze, tarayıcının başlıkları atılıyor',c[2].baslik.Cookie==='sid=99'&&!c[2].baslik['Content-Length']&&!c[2].baslik.Host,c[2]);
 chk("$'...' biçimi okunuyor",c[3].url==='https://api.ornek.com/z',c[3]);
 chk('curl olmayan metin reddediliyor',!!c[4].hata,c[4]);
 chk('http (şifresiz) reddediliyor',!!c[5].hata,c[5]);
 chk('URL yoksa hata',!!c[6].hata,c[6]);

 // ── YER TUTUCU DOLDURMA
 const d=await pg.evaluate(()=>{
   const deg=tusbDegerler({bas:Date.parse('2026-08-07T09:00:00Z'),bit:Date.parse('2026-08-07T10:30:00Z'),gun:'2026-08-07',ad:'Dermatoloji'});
   return {sn:deg.SN,dk:deg.DK,tarih:deg.TARIH,ad:deg.BASLIK,
     govde:tusbDoldur('{"s":"{{BAS}}","n":{{SN}},"t":"{{BASLIK}}","x":"{{YOK}}"}',deg)}});
 chk('süre saniye/dakika doğru',d.sn===5400&&d.dk===90,d);
 chk('yer tutucular dolduruluyor',/"n":5400/.test(d.govde)&&/Dermatoloji/.test(d.govde),d.govde);
 chk('tanınmayan yer tutucu OLDUĞU GİBİ kalıyor',/\{\{YOK\}\}/.test(d.govde),d.govde);

 // ── UI · kutu açılıyor mu, kaydediyor mu
 await pg.evaluate(()=>{document.getElementById('sagKutu').classList.remove('ac')});
 await pg.evaluate(()=>tusbKutuAc());
 await pg.waitForTimeout(400);
 chk('TUSBuddy kutusu açıldı',await pg.evaluate(()=>tbKutu.classList.contains('ac')));
 const hed=await pg.evaluate(()=>{const q=tbSina.getBoundingClientRect();
   const e=document.elementFromPoint(q.left+q.width/2,q.top+q.height/2); return e?(e.id||e.className):'yok'});
 chk('"bağlantıyı sına" dokunuşu çalınmıyor',hed==='tbSina',hed);

 await pg.fill('#tbKayit',`curl 'https://api.ornek-yok.test/timer' -X POST -H 'Content-Type: application/json' --data-raw '{"sn":{{SN}}}'`);
 await pg.locator('#tbKay').scrollIntoViewIfNeeded();
 const k=await pg.locator('#tbKay').boundingBox();
 await pg.touchscreen.tap(k.x+k.width/2,k.y+k.height/2); await pg.waitForTimeout(500);
 const r=await pg.evaluate(()=>({m:tbM.textContent,kurulu:tusbKurulu(),
   dug:document.getElementById('tbAc').textContent,
   depo:JSON.parse(localStorage.getItem('rota-tusb')||'{}')}));
 chk('kaydedildi',/^✓ kaydedildi/.test(r.m)&&r.kurulu,r.m);
 chk('düğmede ✓ işareti',/✓/.test(r.dug),r.dug);
 chk('şablon YALNIZ localStorage rota-tusb içinde',!!r.depo.kayit&&r.depo.kayit.yontem==='POST',Object.keys(r.depo));
 chk('şablon D içine (gist senkronuna) GİRMİYOR',
   await pg.evaluate(()=>!/api\.ornek-yok/.test(JSON.stringify(D))));

 // ── ULAŞILAMAYAN ADRES · CORS/ağ hatası İNSAN DİLİNDE mi
 const sn=await pg.locator('#tbSina').boundingBox();
 await pg.touchscreen.tap(sn.x+sn.width/2,sn.y+sn.height/2); await pg.waitForTimeout(2500);
 const r2=await pg.evaluate(()=>({m:tbM.textContent,kuyruk:JSON.parse(localStorage.getItem('rota-tusb-kuyruk')||'[]').length}));
 chk('ulaşılamayan adres anlaşılır anlatılıyor',/tarayıcı isteği engelledi|CORS/.test(r2.m),r2.m.slice(0,150));
 chk('sınama kuyruğu ŞİŞİRMİYOR',r2.kuyruk===0,r2.kuyruk);

 // ── KRONOMETRE KÖPRÜDEN BAĞIMSIZ ÇALIŞIYOR MU
 await pg.evaluate(()=>{tbKutu.classList.remove('ac');document.body.classList.remove('sagAcik')});
 const d2=await pg.locator('#kronD').boundingBox();
 await pg.touchscreen.tap(d2.x+d2.width/2,d2.y+d2.height/2); await pg.waitForTimeout(2200);
 await pg.touchscreen.tap(d2.x+d2.width/2,d2.y+d2.height/2); await pg.waitForTimeout(1500);
 const r3=await pg.evaluate(()=>({gun:kronGunMs(),ak:!!kronVeri().ak,
   kuyruk:JSON.parse(localStorage.getItem('rota-tusb-kuyruk')||'[]').length,
   son:(JSON.parse(localStorage.getItem('rota-tusb')||'{}')).sonDurum}));
 chk('gönderim başarısızken YEREL sayaç yine de yazdı',r3.gun>=2000&&!r3.ak,r3);
 chk('başarısız oturum KUYRUĞA alındı (kaybolmadı)',r3.kuyruk===1,r3.kuyruk);
 chk('son durum kaydedildi',/^✗/.test(String(r3.son||'')),r3.son);

 const kod=_fs.readFileSync(DOSYA,'utf8');
 chk('koda gömülü TUSBuddy adresi/şifresi YOK',
   !/https?:\/\/[^"'\s]*tusbuddy|1354659|emreakll58/i.test(kod),
   (kod.match(/https?:\/\/[^"'\s]*tusbuddy[^"'\s]*/i)||[])[0]);

 console.log(' sayfa hatası: '+(err.join(' | ')||'(yok)'));
 await br.close(); return H}

async function bolumB(){
 console.log('\n═══ B · UÇTAN UCA · sahte TUSBuddy sunucusu ═══');
 if(!SUNUCU_VAR){ console.log('  ⚠ sertifika üretilemedi — ATLANDI'); return 0 }
 const https=require('https'), fs=_fs;
 return await new Promise(BITIR=>{
 const gelen=[]; let jeton='TAZE-1';
const srv=https.createServer({key:fs.readFileSync(SRT+'/k.pem'),cert:fs.readFileSync(SRT+'/c.pem')},(q,c)=>{
  let g=''; q.on('data',d=>g+=d); q.on('end',()=>{
    c.setHeader('Access-Control-Allow-Origin','*');
    c.setHeader('Access-Control-Allow-Headers','*');
    c.setHeader('Access-Control-Allow-Methods','*');
    if(q.method==='OPTIONS'){c.writeHead(204);return c.end()}
    gelen.push({yol:q.url,yontem:q.method,baslik:q.headers,govde:g});
    if(q.url==='/login'){ jeton='TAZE-'+(gelen.length); 
      c.writeHead(200,{'Content-Type':'application/json'});
      return c.end(JSON.stringify({data:{token:jeton}})) }
    if(q.url==='/timer'){
      const ok=(q.headers.authorization==='Bearer '+jeton);
      c.writeHead(ok?200:401,{'Content-Type':'application/json'});
      return c.end(JSON.stringify(ok?{ok:true,id:7}:{err:'jeton eski'})) }
    c.writeHead(404); c.end('{}') })});
srv.listen(0,'127.0.0.1',async()=>{
 const P=srv.address().port, K='https://127.0.0.1:'+P;
 const br=await _c.launch({executablePath:'/opt/pw-browsers/chromium',
   args:['--enable-unsafe-swiftshader','--no-sandbox','--disable-gpu','--ignore-certificate-errors']});
 const pg=await br.newPage({viewport:{width:390,height:844},hasTouch:true,isMobile:true,ignoreHTTPSErrors:true});
 const err=[];pg.on('pageerror',e=>err.push(e.message));
 await pg.goto('file:///mnt/user-data/outputs/index.html');await pg.waitForTimeout(2600);
 let H=0;const chk=(a,ok,x)=>{if(!ok){H++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}else console.log('  ✓ '+a)};

 await pg.evaluate(K=>{
   localStorage.setItem('rota-tusb-kuyruk','[]');
   const kayit=`curl '${K}/timer' -X POST -H 'Content-Type: application/json' -H 'Authorization: Bearer {{TOKEN}}' --data-raw '{"start":"{{BAS}}","end":"{{BIT}}","seconds":{{SN}},"title":"{{BASLIK}}","date":"{{TARIH}}"}'`;
   const giris=`curl '${K}/login' -X POST -H 'Content-Type: application/json' --data-raw '{"email":"x@y.z","password":"gizli"}'`;
   tusbKutuAc();
   document.getElementById('tbKayit').value=kayit;
   document.getElementById('tbGiris').value=giris;
   document.getElementById('tbYol').value='data.token';
   document.getElementById('tbKay').click();
 },K);
 await pg.waitForTimeout(400);
 chk('şablon kaydedildi',await pg.evaluate(()=>tusbKurulu()));

 // ── GERÇEK GÖNDERİM · kronometre çalıştır/durdur
 await pg.evaluate(()=>{tbKutu.classList.remove('ac');document.body.classList.remove('sagAcik')});
 const d=await pg.locator('#kronD').boundingBox();
 await pg.touchscreen.tap(d.x+d.width/2,d.y+d.height/2); await pg.waitForTimeout(2200);
 await pg.touchscreen.tap(d.x+d.width/2,d.y+d.height/2); await pg.waitForTimeout(2200);

 const tim=gelen.filter(g=>g.yol==='/timer');
 chk('kronometre durunca SUNUCUYA istek gitti',tim.length>=1,gelen.map(g=>g.yol));
 const g0=tim[0]||{};
 let j={}; try{ j=JSON.parse(g0.govde||'{}') }catch(e){}
 chk('POST + JSON içerik türü',g0.yontem==='POST'&&/application\/json/.test((g0.baslik||{})['content-type']||''),g0.baslik&&g0.baslik['content-type']);
 chk('süre saniye olarak GERÇEK değerle gitti',j.seconds>=2&&j.seconds<=6,j.seconds);
 chk('başlangıç/bitiş ISO damgası gitti',/^\d{4}-\d\d-\d\dT/.test(j.start||'')&&/^\d{4}-\d\d-\d\dT/.test(j.end||''),{s:j.start,e:j.end});
 chk('görev adı gitti',typeof j.title==='string'&&j.title.length>2,j.title);
 chk('tarih gitti',/^\d{4}-\d\d-\d\d$/.test(j.date||''),j.date);
 /* Jeton henüz yok → "Bearer " gider (Node başlığı budayıp "Bearer" gösterir). */
 chk('ilk istekte jeton BOŞTU (henüz giriş yapılmadı)',
   String(g0.baslik.authorization||'').trim()==='Bearer',g0.baslik.authorization);

 // ── 401 → OTOMATİK GİRİŞ → TEKRAR
 const gir=gelen.filter(g=>g.yol==='/login');
 chk('401 alınca giriş isteği KENDİLİĞİNDEN atıldı',gir.length>=1,gelen.map(g=>g.yol));
 const son=tim[tim.length-1];
 chk('yenilenen jetonla TEKRAR denendi ve KABUL EDİLDİ',
   tim.length>=2&&son.baslik.authorization==='Bearer '+jeton,{istek:tim.length,jeton:son&&son.baslik.authorization});
 const durum=await pg.evaluate(()=>JSON.parse(localStorage.getItem('rota-tusb')||'{}'));
 chk('sonuç "✓" olarak kaydedildi',/^✓/.test(durum.sonDurum||''),durum.sonDurum);
 chk('kuyruk BOŞ (gönderim başarılı)',
   (await pg.evaluate(()=>JSON.parse(localStorage.getItem('rota-tusb-kuyruk')||'[]'))).length===0);

 // ── KUYRUK · sunucu düşünce kaybolmuyor, dönünce gönderiliyor
 const oncekiTimer=gelen.filter(g=>g.yol==='/timer').length;
 await new Promise(r=>srv.close(r));
 await pg.touchscreen.tap(d.x+d.width/2,d.y+d.height/2); await pg.waitForTimeout(1800);
 await pg.touchscreen.tap(d.x+d.width/2,d.y+d.height/2); await pg.waitForTimeout(2000);
 const kq=await pg.evaluate(()=>JSON.parse(localStorage.getItem('rota-tusb-kuyruk')||'[]'));
 chk('sunucu kapalıyken oturum KUYRUĞA alındı',kq.length===1,kq.length);
 chk('sunucu kapalıyken yerel süre yine de yazıldı',await pg.evaluate(()=>kronGunMs()>4000));

 await new Promise(r=>srv.listen(P,'127.0.0.1',r));
 const n=await pg.evaluate(()=>tusbKuyrukBosalt());
 await pg.waitForTimeout(300);
 chk('sunucu dönünce kuyruk boşaldı',n===1&&
   (await pg.evaluate(()=>JSON.parse(localStorage.getItem('rota-tusb-kuyruk')||'[]'))).length===0,n);
 chk('kuyruktaki oturum da sunucuya ulaştı',gelen.filter(g=>g.yol==='/timer').length>oncekiTimer,
   gelen.filter(g=>g.yol==='/timer').length);

 console.log(' sayfa hatası: '+(err.join(' | ')||'(yok)'));
 console.log(' sunucuya ulaşan istekler: '+JSON.stringify(gelen.map(g=>g.yontem+' '+g.yol)));
 await br.close(); srv.close(); BITIR(H)})});}

(async()=>{
  const h=(await bolumA())+(await bolumB());
  console.log('\n═══ §307 · TUSBuddy KÖPRÜSÜ ═══');
  console.log(h?('✗ '+h+' HATA'):'✓ SIFIR HATA — 38 kontrol (22 ayrıştırıcı/güvenlik + 16 uçtan uca)');
  process.exit(h?1:0);
})();
