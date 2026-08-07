/* ══ §300 · ANALİZ AKIŞI KAPISI · GERÇEK TARAYICI · GERÇEK DOKUNMA ═══
   NEDEN VAR: Kullanıcı gerçek cihazda üç kusur bildirdi ve üçü de kapılardan
   temiz geçmişti:
     1. "İncele ve kaydet"e basınca ana ekrana atıyor, inceleyemiyorum.
        → inceleme kartı #atKart'a çiziliyordu; #atKart #atlasKat İÇİNDE ve o
          katman kapalıyken display:none → kart .ac alıyor ama 0×0, görünmez.
     2. Çarkın merkezini tutup sağa kaydırma çalışmıyor.
        → #cark{touch-action:pan-x} yüzünden tarayıcı yatay ekseni alıp
          touchcancel gönderiyordu. FARE ile çalıştığı için §291'de görülmedi.
     3. Yeşil "deneme analizi hazır" bildirimi çarkta hiç görünmüyor.
        → hiç üretilmemişti (§292 yalnız ritmik itmeyi eklemişti).
   Ayrıca: 200 ↔ 24'lü kipi arasında geçince okunan sonuç siliniyordu.

   Kullanıcı verisi KULLANILMAZ. Ağ çağrısı YOK.
   Koşum: NODE_PATH=/opt/node22/lib/node_modules node kaynak/analiz_test.js */
const YOL='/mnt/user-data/outputs/index.html';
const KROM='/opt/pw-browsers/chromium';
let chromium;
for(const ad of ['playwright','playwright-core']){
  try{ chromium=require(ad).chromium; if(chromium)break }catch(e){}
}
if(!chromium){ console.log('⚠ playwright yok — ANALİZ kapısı ATLANDI (kusur değil)'); process.exit(0) }
const fs=require('fs');
if(!fs.existsSync(YOL)){ console.log('⚠ '+YOL+' yok — ANALİZ kapısı ATLANDI'); process.exit(0) }

(async()=>{
 const br=await chromium.launch({executablePath:KROM,
   args:['--enable-unsafe-swiftshader','--no-sandbox','--disable-gpu']});
 const pg=await br.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,
   hasTouch:true,isMobile:true});
 const h=[]; pg.on('pageerror',e=>h.push(e.message));
 await pg.goto('file://'+YOL); await pg.waitForTimeout(2700);

  /* §304: KOÇ ekranı artık AÇILIŞ ekranı (body.kocKip). Klasik arayüz
     altında duruyor ama opacity:0 + pointer-events:none oluyor —
     ölçüm ve dokunma testleri önce onu kapatmalı. */
  await pg.evaluate(()=>{try{kocKapat()}catch(e){document.body.classList.remove('kocKip')}});
  await pg.waitForTimeout(250);
 const R=[]; const chk=(a,ok,x)=>{R.push((ok?'  ✓ ':'  ✗ ')+a+
   (!ok&&x!==undefined?' :: '+JSON.stringify(x).slice(0,240):''));if(!ok)R.__f=(R.__f||0)+1};

 /* gerçek dokunma ile kaydırma yardımcı */
 const kaydir=async(sec,b,s,y)=>{
   const k=await pg.evaluate(q=>{const e=document.querySelector(q);
     const r=e.getBoundingClientRect();return {x:r.x,y:r.y,w:r.width,h:r.height}},sec);
   const cdp=await pg.context().newCDPSession(pg);
   const x0=k.x+k.w*b, x1=k.x+k.w*s, yy=k.y+k.h*y;
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:x0,y:yy,id:1}]});
   for(let i=1;i<=12;i++){
     await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',
       touchPoints:[{x:x0+(x1-x0)*i/12,y:yy,id:1}]});
     await pg.waitForTimeout(16);
   }
   await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
   await cdp.detach().catch(()=>{});
   await pg.waitForTimeout(650);
 };

 /* ── 1 · touch-action · yatay eksen JS'e ait mi ── */
 const ta=await pg.evaluate(()=>({
   cark:getComputedStyle(document.getElementById('cark')).touchAction,
   analiz:(function(){const e=document.getElementById('carkAnaliz');
     return e?getComputedStyle(e).touchAction:null})()}));
 chk('#cark yatay ekseni tarayıcıya BIRAKMIYOR',ta.cark==='none',ta);
 chk('yeşil katman da touch-action:none',ta.analiz==='none',ta);

 /* ── 2 · YEŞİL BİLDİRİM · var mı, doluyor mu ── */
 await pg.evaluate(()=>{ try{gunKipAc(false)}catch(e){} });
 await pg.waitForTimeout(800);
 const y0=await pg.evaluate(()=>{
   const e=document.getElementById('carkAnaliz');
   return {varMi:!!e, acik:e?e.classList.contains('ac'):null};
 });
 chk('analiz beklemiyorken yeşil katman KAPALI',y0.varMi&&!y0.acik,y0);
 const y1=await pg.evaluate(()=>{
   carkDurtmeBasla();
   const e=document.getElementById('carkAnaliz');
   const c=document.getElementById('cark');
   const r=e.getBoundingClientRect(), rc=c.getBoundingClientRect();
   const st=getComputedStyle(e);
   return {acik:e.classList.contains('ac'), durt:c.classList.contains('durt'),
     metin:(e.textContent||'').replace(/\s+/g,' '),
     yesilMi:/rgba?\(\s*\d+,\s*2[0-2]\d/.test(st.backgroundImage)||
             st.backgroundImage.indexOf('96, 224, 150')>=0,
     alanOrani:+((r.width*r.height)/(rc.width*rc.height)).toFixed(2),
     bekliyor:!!D.analizBekliyor};
 });
 chk('§300 · yeşil bildirim ÜRETİLDİ ve açılıyor',y1.acik&&y1.durt,y1);
 chk('§300 · çarkın iç alanını DOLDURUYOR (tam kaplama)',y1.alanOrani>=0.99,y1);
 chk('§300 · ne olduğunu yazıyor',/Deneme analizi hazır/.test(y1.metin),y1.metin);
 chk('§300 · nasıl açılacağını söylüyor',/dokun/.test(y1.metin)&&/kaydır/.test(y1.metin),y1.metin);
 chk('durum kalıcı (D.analizBekliyor)',y1.bekliyor===true,y1);

 /* ── 3 · DOKUNARAK AÇILIYOR ── */
 await pg.tap('#carkAnaliz');
 await pg.waitForTimeout(700);
 const d1=await pg.evaluate(()=>({
   akis:document.getElementById('akis').classList.contains('ac'),
   yesil:document.getElementById('carkAnaliz').classList.contains('ac'),
   bekliyor:!!D.analizBekliyor}));
 chk('yeşil bildirime DOKUNUNCA analiz açılıyor',d1.akis===true,d1);
 chk('açılınca bildirim sönüyor ve bekleme kalkıyor',!d1.yesil&&!d1.bekliyor,d1);

 /* ── 4 · SAĞA KAYDIRARAK AÇILIYOR (yeşil katman üstünde) ── */
 await pg.evaluate(()=>{ const a=document.getElementById('akis');
   if(a)a.classList.remove('ac'); carkDurtmeBasla() });
 await pg.waitForTimeout(500);
 await kaydir('#carkAnaliz',0.30,0.85,0.5);
 const d2=await pg.evaluate(()=>({akis:document.getElementById('akis').classList.contains('ac')}));
 chk('yeşil bildirimi SAĞA KAYDIRINCA analiz açılıyor',d2.akis===true,d2);

 /* ── 5 · ÇARK MERKEZİNDEN SAĞA KAYDIRMA (bildirim yokken de) ── */
 await pg.evaluate(()=>{ const a=document.getElementById('akis');
   if(a)a.classList.remove('ac'); carkDurtmeDur() });
 await pg.waitForTimeout(400);
 await kaydir('#cark',0.30,0.85,0.5);
 const d3=await pg.evaluate(()=>({akis:document.getElementById('akis').classList.contains('ac')}));
 chk('§291 · çark merkezinden sağa kaydırma GERÇEK DOKUNUŞTA çalışıyor',d3.akis===true,d3);

 /* ── 6 · PROGRAM (pinch) GÖRÜNÜMÜNDE DE ── */
 await pg.evaluate(()=>{ const a=document.getElementById('akis');
   if(a)a.classList.remove('ac'); try{gunKipAc(true)}catch(e){} });
 await pg.waitForTimeout(800);
 await kaydir('#cark',0.30,0.85,0.5);
 const d4=await pg.evaluate(()=>({akis:document.getElementById('akis').classList.contains('ac'),
   gunKip:!!document.querySelector('#gunListe.ac')}));
 chk('program görünümünde de sağa kaydırma çalışıyor',d4.akis===true,d4);

 /* ── 7 · DİKEY SÜRÜKLEME BOZULMADI ── */
 await pg.evaluate(()=>{ const a=document.getElementById('akis');
   if(a)a.classList.remove('ac'); try{gunKipAc(false)}catch(e){} });
 await pg.waitForTimeout(900);
 const av=await pg.evaluate(()=>(typeof aktif!=='undefined'?aktif:null));
 const k=await pg.evaluate(()=>{const r=document.getElementById('cark').getBoundingClientRect();
   return {x:r.x,y:r.y,w:r.width,h:r.height}});
 const cdp=await pg.context().newCDPSession(pg);
 const xx=k.x+k.w*0.55, ya=k.y+k.h*0.62, yb=k.y+k.h*0.22;
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:xx,y:ya,id:1}]});
 for(let i=1;i<=14;i++){ await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',
   touchPoints:[{x:xx,y:ya+(yb-ya)*i/14,id:1}]}); await pg.waitForTimeout(16) }
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await cdp.detach().catch(()=>{});
 await pg.waitForTimeout(900);
 const as=await pg.evaluate(()=>({aktif:(typeof aktif!=='undefined'?aktif:null),
   akis:document.getElementById('akis').classList.contains('ac')}));
 chk('dikey sürükleme HÂLÂ çalışıyor (touch-action:none kırmadı)',
   as.aktif!==av,{once:av,sonra:as.aktif});
 chk('dikey sürükleme yanlışlıkla analizi AÇMIYOR',as.akis===false,as);

 /* ── 8 · "İNCELE VE KAYDET" PANELDE AÇILIYOR ── */
 const inc=await pg.evaluate(async()=>{
   const ham=[]; for(let i=0;i<8;i++){ const no=101+i;
     ham.push({no:no,b:'Dahiliye',konu:'',konuEl:'Hemato',s:(i<4?'D':null),
       e:'E',sec:'C',metin:'soru '+no,guven:(i<4?0.9:0.4)}) }
   OMR_VIZYON.ham=ham; OMR_VIZYON.mod='200'; OMR_VIZYON.ders24=null;
   dpanelCiz(); document.getElementById('dpanel').classList.add('ac');
   denIncele();
   await new Promise(r=>setTimeout(r,300));
   const ic=document.getElementById('dpIncele');
   const r=ic.getBoundingClientRect();
   return {hedef:OMR_DURUM.hedef, acik:ic.classList.contains('ac'),
     ekranda:!!(r.width>0&&r.height>0&&r.top<window.innerHeight&&r.bottom>0),
     panelAcik:document.getElementById('dpanel').classList.contains('ac'),
     kaydetVar:!!ic.querySelector('[data-omrkay]'),
     dusukCip:ic.querySelectorAll('[data-omrsec]').length,
     atlasKapali:!document.getElementById('atlasKat').classList.contains('ac')};
 });
 chk('§300 · inceleme kartı EKRANDA GÖRÜNÜYOR (0×0 değil)',inc.ekranda,inc);
 chk('§300 · panel KAPANMIYOR — kullanıcı ana ekrana atılmıyor',inc.panelAcik,inc);
 chk('§300 · kart panelin içine çiziliyor (atlas katmanı kapalıyken bile)',
   inc.hedef==='dpIncele'&&inc.atlasKapali,inc);
 chk('inceleme kartında kaydet düğmesi var',inc.kaydetVar,inc);
 chk('düşük güvenli sorular düzeltme çipi olarak listeleniyor',inc.dusukCip===4,inc);

 /* ── 9 · KAYDETME PANELDE SONUÇLANIYOR ── */
 const kay2=await pg.evaluate(async()=>{
   const once=(D.kal||[]).length+(D.denemeler||[]).length;
   document.querySelector('#dpIncele [data-omrkay]').click();
   await new Promise(r=>setTimeout(r,350));
   return {arttiMi:((D.kal||[]).length+(D.denemeler||[]).length)>once,
     kartKapandi:!document.getElementById('dpIncele').classList.contains('ac'),
     panelAcik:document.getElementById('dpanel').classList.contains('ac'),
     durum:(document.getElementById('dpOtoDurum').textContent||'').replace(/\s+/g,' ').slice(0,90)};
 });
 chk('kaydet gerçekten kayıt yazıyor',kay2.arttiMi,kay2);
 chk('kaydettikten sonra kart kapanıp panelde sonuç yazıyor',
   kay2.kartKapandi&&kay2.panelAcik&&/Kaydedildi/.test(kay2.durum),kay2);

 /* ── 10 · KİP DEĞİŞİMİ OKUMAYI SİLMİYOR ── */
 const kip=await pg.evaluate(async()=>{
   const ham=[]; for(let i=0;i<6;i++)ham.push({no:101+i,b:'Dahiliye',konu:'',
     s:'D',e:'E',sec:'C',metin:'s',guven:0.9});
   OMR_VIZYON.ham=ham; OMR_VIZYON.mod='200';
   DEN_OTO.mod='200'; denOtoKur();
   denOtoDurum('<div class="dpHazir"><b>Okundu · 6 soru</b></div>');
   document.querySelector('[data-dpmod="24"]').click();
   await new Promise(r=>setTimeout(r,250));
   const d=document.getElementById('dpOtoDurum');
   return {metin:(d.textContent||'').replace(/\s+/g,' ').slice(0,160),
     hamDuruyor:(OMR_VIZYON.ham||[]).length,
     donDugmesi:!!d.querySelector('[data-denger]'),
     atDugmesi:!!d.querySelector('[data-denat]')};
 });
 chk('§300 · kip değişince okuma SİLİNMİYOR',kip.hamDuruyor===6,kip);
 chk('§300 · okumanın durduğu SÖYLENİYOR',
   /Okunmuş 6 soru duruyor/.test(kip.metin),kip.metin);
 chk('§300 · geri dönüş ve atma seçenekleri sunuluyor',
   kip.donDugmesi&&kip.atDugmesi,kip);

 console.log('\n═══ §300 · ANALİZ AKIŞI KAPISI ═══');
 console.log(R.join('\n'));
 console.log('\nSAYFA HATASI:',h.length?h.slice(0,3):'(yok)');
 console.log(R.__f?('\n✗ '+R.__f+' HATA'):'\n✓ SIFIR HATA');
 await br.close(); process.exit((R.__f||h.length)?1:0);
})().catch(e=>{console.error('HATA:',e.message);process.exit(1)});
