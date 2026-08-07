/* ══ §303 · ÜST PANEL KAPISI · TAŞMA · YÜKSEKLİK · DOKUNMA HEDEFİ ═══
   NEDEN VAR: Kullanıcı "ekrana POTANSİYEL kısmı sığmıyor" dedi. Ölçüldü:
   390 px'de kart 356→430, yani ekranın 40 px DIŞINDA; 320 px'de Parakete de
   taşıyordu. Hiçbir kapı yakalamamıştı çünkü `header{overflow-x:clip}`
   taşmayı SESSİZCE kesiyordu — gövde yatay taşma bildirmiyordu.
   Bu kapı taşmayı KUTU KUTU ölçer (clip gizlese bile yakalar), panel
   yüksekliğini ekran oranıyla sınırlar ve dokunma hedeflerini
   elementFromPoint ile GERÇEKTEN ölçer (görünmez ::after alanları dahil;
   bir tur bu alanlar komşu düğmeyi ezdiği için o yol terk edildi).
   Kullanıcı verisi KULLANILMAZ — uygulamanın kendi tohum verisi.
   Koşum: NODE_PATH=/opt/node22/lib/node_modules node kaynak/ust_test.js */
const YOL='/mnt/user-data/outputs/index.html';
const KROM='/opt/pw-browsers/chromium';
let chromium;
for(const ad of ['playwright','playwright-core']){
  try{ chromium=require(ad).chromium; if(chromium)break }catch(e){}
}
if(!chromium){ console.log('⚠ playwright yok — ÜST PANEL kapısı ATLANDI'); process.exit(0) }
const fs=require('fs');
if(!fs.existsSync(YOL)){ console.log('⚠ '+YOL+' yok — ATLANDI'); process.exit(0) }

const OLC=[{ad:'kucuk',w:320,h:700},{ad:'dar',w:360,h:780},{ad:'telefon',w:390,h:844},
  {ad:'buyuk',w:430,h:932},{ad:'tablet',w:834,h:1112},{ad:'genis',w:1112,h:834}];
(async()=>{
 const br=await chromium.launch({executablePath:KROM,
   args:['--enable-unsafe-swiftshader','--no-sandbox','--disable-gpu']});
 let hata=0;
 for(const o of OLC){
  const pg=await br.newPage({viewport:{width:o.w,height:o.h},deviceScaleFactor:2,
    hasTouch:o.w<900,isMobile:o.w<900});
  const h=[]; pg.on('pageerror',e=>h.push(e.message));
  await pg.goto('file://'+YOL); await pg.waitForTimeout(2700);

  /* §304: KOÇ ekranı artık AÇILIŞ ekranı (body.kocKip). Klasik arayüz
     altında duruyor ama opacity:0 + pointer-events:none oluyor —
     ölçüm ve dokunma testleri önce onu kapatmalı. */
  await pg.evaluate(()=>{try{kocKapat()}catch(e){document.body.classList.remove('kocKip')}});
  await pg.waitForTimeout(250);
  const r=await pg.evaluate(()=>{
    const u=document.getElementById('ust');
    const W=window.innerWidth;
    const hucre=[...document.querySelectorAll('#ust .okumalar .cap, #ust .okumalar .v, #ust .okumalar .s')]
      .map(e=>{const b=e.getBoundingClientRect();
        return {t:(e.className||'').split(' ')[0], m:(e.textContent||'').trim().slice(0,16),
          sol:Math.round(b.left), sag:Math.round(b.right),
          tasti:(b.right>W+0.5||b.left<-0.5)}});
    /* GERÇEK dokunma hedefi: elementFromPoint ile ölç — görünmez ::after
       alanları da sayılsın (görsel kutu küçük olabilir). */
    /* GÖRÜNMEYEN düğme ölçülmez: tohum veride "tamamlanan"/"telafi"
       rozetli düğmeler .gor almadan gizli kalabiliyor. */
    const dok=[...document.querySelectorAll('#ust button')]
      .filter(b=>{const q=b.getBoundingClientRect(); return q.width>1&&q.height>1})
      .map(b=>{
      const q=b.getBoundingClientRect();
      const cx=q.left+q.width/2, cy=q.top+q.height/2;
      let sol=cx,sag=cx,ust=cy,alt=cy;
      const bende=x=>{const e=document.elementFromPoint(x[0],x[1]);return !!(e&&(e===b||b.contains(e)))};
      for(let d=1;d<=24;d++){ if(bende([cx-d,cy]))sol=cx-d; else break }
      for(let d=1;d<=24;d++){ if(bende([cx+d,cy]))sag=cx+d; else break }
      for(let d=1;d<=24;d++){ if(bende([cx,cy-d]))ust=cy-d; else break }
      for(let d=1;d<=24;d++){ if(bende([cx,cy+d]))alt=cy+d; else break }
      const dw=sag-sol, dh=alt-ust;
      return {id:b.id||b.className.split(' ')[0],w:Math.round(dw),h:Math.round(dh),
        kucuk:(dw<33||dh<33)}});
    /* nav düğmesinin GÖRÜNMEZ dokunma alanı ::after ile 34px */
    const navDok=[...document.querySelectorAll('#ust nav .orb')].map(b=>{
      const s=getComputedStyle(b,'::after');
      return {h:s.height};});
    return {ustY:Math.round(u.getBoundingClientRect().height),
      yuzde:Math.round(u.getBoundingClientRect().height/window.innerHeight*100),
      hucre, tasanHucre:hucre.filter(x=>x.tasti),
      dok, kucukDok:dok.filter(d=>d.kucuk).map(d=>d.id+' '+d.w+'×'+d.h),
      navDok,
      govdeTasma:document.body.scrollWidth>document.body.clientWidth+1,
      tklGor:document.querySelector('.ok.tkl').classList.contains('gor'),
      potansiyel:(document.getElementById('tkV')||{}).textContent};
  });
  const oran=r.ustY/o.h*100;
  const ok=(!r.tasanHucre.length&&!r.govdeTasma&&oran<19&&!r.kucukDok.length);
  if(!ok)hata++;
  console.log((ok?'✓ ':'✗ ')+o.ad.padEnd(8)+o.w+'×'+o.h+
    '  panel '+String(r.ustY).padStart(3)+'px (%'+r.yuzde+')'+
    '  taşan hücre: '+r.tasanHucre.length+
    '  gövde taşma: '+r.govdeTasma+
    '  potansiyel: '+r.potansiyel+(r.tklGor?' (görünür)':' (gizli)'));
  if(r.tasanHucre.length)console.log('    taşanlar:',JSON.stringify(r.tasanHucre));
  if(r.kucukDok.length)console.log('    ⚠ 34px altı dokunma hedefi:',r.kucukDok.join(', '),
    '· nav ::after yüksekliği:',r.navDok.map(x=>x.h).join(','));
  if(h.length)console.log('    sayfa hatası:',h.slice(0,2));
  await pg.close();
 }
 console.log('\n═══ §303 · ÜST PANEL ═══');
 console.log(hata?('✗ '+hata+' ölçüde sorun'):'✓ TÜM ÖLÇÜLERDE TEMİZ · taşma yok · panel <%19 · dokunma ≥33px');
 await br.close(); process.exit(hata?1:0);
})().catch(e=>{console.error(e.message);process.exit(1)});
