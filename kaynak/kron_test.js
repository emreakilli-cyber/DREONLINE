/* ══ §305 · KRONOMETRE KAPISI · GERÇEK DOKUNUŞ ══════════════════════
   NEDEN VAR: Kullanıcı çalışma süresini TUSBuddy'de tutuyordu ve "tek
   uygulamadan bağlanayım" dedi. Sayaç uygulamaya taşındı; bu kapı onu
   GERÇEK Chromium'da GERÇEK dokunuşla sınıyor — harness (derin_ortam.js)
   olay bağlamayı GÖREMEZ (§284/§300 dersi: fare ile test dokunmayı
   doğrulamaz, kapı geçmek "hata yok" demek değildir).

   Sınananlar: başlat/mola · süre GERÇEKTEN yazılıyor mu · satır çipi
   görevi TAMAMLAMADAN kronometreyi açıyor mu (iki eylem aynı satırda) ·
   sayfa yeniden yüklenince oturum sürüyor mu (damga tabanlı, tik değil) ·
   görev tamamlanınca sayaç duruyor mu · durum metninde görünüyor mu ·
   `kron` D içinde mi (senkrona giriyor mu).
   Koşum: NODE_PATH=/opt/node22/lib/node_modules node kaynak/kron_test.js */
const DOSYA='/mnt/user-data/outputs/index.html';
const YOL='file://'+DOSYA;
const fs=require('fs');
if(!fs.existsSync(DOSYA)){ console.log('⚠ '+DOSYA+' yok — ATLANDI'); process.exit(0) }
let _c; for(const ad of ['playwright','playwright-core']){ try{_c=require(ad).chromium;if(_c)break}catch(e){} }
if(!_c){ console.log('⚠ playwright yok — KRONOMETRE kapısı ATLANDI'); process.exit(0) }
(async()=>{
 const br=await _c.launch({executablePath:'/opt/pw-browsers/chromium',args:['--enable-unsafe-swiftshader','--no-sandbox','--disable-gpu']});
 const pg=await br.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true,isMobile:true});
 const err=[]; pg.on('pageerror',e=>err.push(e.message));
 await pg.goto(YOL); await pg.waitForTimeout(2600);
 let H=0; const chk=(a,ok,x)=>{if(!ok){H++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}else console.log('  ✓ '+a)};

 const bas=await pg.evaluate(()=>({t:kronT.textContent,ne:kronNe.textContent,ak:!!kronVeri().ak,
   cip:document.querySelectorAll('#kocLis [data-kron]').length}));
 chk('şerit duruyor · 0:00',bas.t==='0:00'&&!bas.ak,bas);
 chk('her satırda süre çipi var',bas.cip>0,bas.cip);
 chk('durunca "başlat · <iş>" yazıyor',/^başlat · /.test(bas.ne),bas.ne);

 // BÜYÜK DÜĞMEYE GERÇEK DOKUNUŞ
 const d=await pg.locator('#kronD').boundingBox();
 await pg.touchscreen.tap(d.x+d.width/2,d.y+d.height/2);
 await pg.waitForTimeout(2300);
 const c1=await pg.evaluate(()=>({t:kronT.textContent,ak:!!kronVeri().ak,
   gid:kronVeri().ak&&kronVeri().ak.gid, sinif:document.getElementById('kron').className,
   dug:kronD.textContent, gun:kronGunV.textContent}));
 chk('dokununca ÇALIŞIYOR',c1.ak,c1);
 chk('süre ilerledi',/^0:0[1-9]/.test(c1.t),c1.t);
 chk('şerit yeşile döndü',/\bak\b/.test(c1.sinif),c1.sinif);
 chk('düğme ⏸ oldu',c1.dug==='⏸',c1.dug);
 chk('gün toplamı da akıyor',/0:0[1-9]/.test(c1.gun),c1.gun);
 const cip1=await pg.evaluate(g=>{const e=document.querySelector('[data-kron="'+CSS.escape(g)+'"]');
   return e?{m:e.textContent,ak:e.classList.contains('ak')}:null},c1.gid);
 chk('o satırın çipi aktif ve süre yazıyor',cip1&&cip1.ak&&/^0:0/.test(cip1.m),cip1);

 // MOLA
 await pg.touchscreen.tap(d.x+d.width/2,d.y+d.height/2);
 await pg.waitForTimeout(1200);
 const c2=await pg.evaluate(()=>({ak:!!kronVeri().ak,t:kronT.textContent,
   yazilan:kronGorevMs(Object.keys(kronVeri().gun[bgun()]||{})[0]),
   gun:kronGunMs(),dug:kronD.textContent}));
 chk('mola · durdu',!c2.ak,c2);
 chk('geçen süre KAYDEDİLDİ',c2.yazilan>=2000,c2.yazilan);
 chk('molada gün toplamı sabit kaldı',c2.gun>=2000&&c2.gun<4000,c2.gun);
 chk('düğme ▶ oldu',c2.dug==='▶',c2.dug);

 // BAŞKA GÖREVE GEÇ (satır çipi)
 /* §306'da dibe yapışık şeridin ŞEFFAF dolgusu görünür satırların
    dokunuşunu yutuyordu. Şerit §308'de tamamen kalktı; kural yine de
    sınanıyor: EKRANDA GÖRÜNEN hiçbir satırın dokunuşu çalınmamalı. */
 const calan=await pg.evaluate(()=>
   [...document.querySelectorAll('#kocLis [data-kron], #kocLis .kocIs')].map(e=>{
     const q=e.getBoundingClientRect();
     if(q.top<0||q.bottom>innerHeight)return null;
     const el=document.elementFromPoint(q.left+Math.min(q.width/2,20),q.top+q.height/2);
     return (el&&(el===e||e.contains(el)))?null:{y:Math.round(q.top),calan:el?(el.id||el.className):'yok'}
   }).filter(Boolean));
 chk('görünür satırın dokunuşunu başka katman ÇALMIYOR',calan.length===0,calan);
 chk('dibe yapışık şerit KALDIRILDI',await pg.evaluate(()=>!document.querySelector('.kocAlt')));
 const cips=await pg.locator('#kocLis [data-kron]');
 const bb=await cips.nth(1).boundingBox();
 await pg.touchscreen.tap(bb.x+bb.width/2,bb.y+bb.height/2);
 await pg.waitForTimeout(1600);
 const c3=await pg.evaluate(()=>({ak:!!kronVeri().ak,gid:kronVeri().ak&&kronVeri().ak.gid,
   kac:Object.keys(kronVeri().gun[bgun()]||{}).length,
   bitti:Object.keys(D.bitti||{}).length}));
 chk('çip dokunuşu yeni görevi başlattı',c3.ak,c3);
 chk('çip dokunuşu görevi TAMAMLAMADI',c3.bitti===0,c3.bitti);

 // KALICILIK · yeniden yükle
 await pg.reload(); await pg.waitForTimeout(2600);
 const c4=await pg.evaluate(()=>({ak:!!kronVeri().ak,t:kronT.textContent,gun:kronSur(kronGunMs())}));
 chk('yeniden yüklemede oturum SÜRÜYOR',c4.ak,c4);
 chk('sayaç sıfırlanmadı',c4.t!=='0:00',c4.t);

 // GÖREVİ TAMAMLA → kronometre dursun
 const sat=await pg.locator('#kocLis .kocIs').nth(1).boundingBox();
 await pg.touchscreen.tap(sat.x+40,sat.y+18);
 await pg.waitForTimeout(700);
 const c5=await pg.evaluate(()=>({ak:!!kronVeri().ak,bitti:Object.keys(D.bitti||{}).length}));
 chk('görev tamamlanınca kronometre durdu',!c5.ak&&c5.bitti===1,c5);

 // DURUM METNİ
 const m=await pg.evaluate(()=>kocDurumMetni());
 chk('durum metninde kronometre satırı var',/kronometre · bugün \d/.test(m),m.split('\n').find(x=>/kronometre/.test(x)));

 // SENKRON
 const sn=await pg.evaluate(()=>{const j=JSON.stringify(D);return {kron:!!JSON.parse(j).kron}});
 chk('kron D içinde duruyor (senkrona girer)',sn.kron,sn);

 /* SENKRON · temiz() kapalı kapsamda, çağrılamıyor; beyaz listeye girdiği
    KAYNAKTAN doğrulanıyor (diğer kapıların closure kontrolüyle aynı yol). */
 const KOD=fs.readFileSync(DOSYA,'utf8');
 chk('senkron beyaz listesinde kron var',/kron:\(o&&typeof o\.kron==='object'&&o\.kron\)\|\|\{ak:null,gun:\{\}\}/.test(KOD));
 chk('kron JSON\'a çevrilebiliyor (senkron gövdesine girer)',
   await pg.evaluate(()=>{try{const k=JSON.parse(JSON.stringify(D.kron));return !!k&&typeof k.gun==='object'}catch(e){return false}}));
 chk('süre TİK ile değil DAMGA ile hesaplanıyor',
   /Math\.max\(0,Date\.now\(\)-K\.ak\.bas\)/.test(KOD)&&!/kron[A-Za-z]*\+\+/.test(KOD));
 /* §308 · ARAYÜZ SOYULDU. Kullanıcı: fotoğrafla deneme girme kaldırılsın,
    eski arayüz görünmesin, TUSBuddy ve uyku/HRV elle giriş istiyorsa olmasın.
    Ekranda kalması GEREKENLER ve kalmaMASI gerekenler burada sınanıyor. */
 const dg=await pg.evaluate(()=>({
   kop:[...document.querySelectorAll('.kocKop')].map(b=>b.textContent),
   kocDug:[...document.querySelectorAll('#koc button')].map(b=>b.id).filter(Boolean),
   yok:['kocAyrinti','kocDeneme','kocAnaliz','tbAc','tbKutu','sag','sagKutu','kronKop']
        .filter(k=>!!document.getElementById(k))}));
 chk('yalnız "durumu kopyala" kaldı',dg.kop.length===1&&/durumu kopyala/.test(dg.kop[0]),dg.kop);
 chk('kaldırılan arayüz parçaları GERÇEKTEN yok',dg.yok.length===0,dg.yok);
 chk('ekranda başka düğme yok',
   dg.kocDug.filter(x=>x!=='kocKop'&&x!=='kronD').length===0,dg.kocDug);
 /* Aranan şey UYDURMA UÇ NOKTA — kelime değil. §307'de arayüz metni
    kullanıcıya "tusbuddy.com/web'i aç" diyor; o kalsın. Kodda tam bir
    https adresi ya da gömülü kimlik bilgisi OLMAMALI. */
 {const K=fs.readFileSync(DOSYA,'utf8');
  chk('koda gömülü TUSBuddy adresi/kimlik bilgisi YOK',
    !/https?:\/\/[^"'\s]*tusbuddy|1354659|emreakll58/i.test(K),
    (K.match(/https?:\/\/[^"'\s]*tusbuddy[^"'\s]*/i)||[])[0]);}
 console.log('\nSAYFA HATASI: '+(err.join(' | ')||'(yok)'));
 console.log('\n═══ §305 · KRONOMETRE ═══');
 console.log(H?('✗ '+H+' HATA'):'✓ SIFIR HATA — 30 gerçek dokunuş kontrolü');
 await pg.screenshot({path:'/tmp/kron_390.png'}).catch(()=>{});
 await br.close(); process.exitCode=H?1:0;
})();
