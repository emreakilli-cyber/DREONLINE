/* ══ DOM KAPISI · GERÇEK TARAYICI · §284 ═══════════════════════════
   NEDEN VAR: `derin_ortam.js` harness'i DOM'u TAKLİT ediyor; olay bağlama
   (onclick) orada YOK. Bu yüzden "düğme bağsız kaldı" sınıfı kusurlar tüm
   kapılardan temiz geçiyordu — kullanıcı 2 Ağustos Endokrin videosunda
   bildirdi: gün oklarıyla (‹ ›) başka güne geçince tamamlama daireleri ÖLÜ
   DÜĞMEye dönüyor, dokunuş satıra baloncuklanıp kullanıcıyı ÇARKA IŞINLIYOR.

   Bu kapı GERÇEK Chromium'da GERÇEK dokunma/tıklama ile çalışır.
   Kullanıcı verisi KULLANILMAZ (kişisel) — uygulamanın kendi tohum verisi.

   Koşum: NODE_PATH=/opt/node22/lib/node_modules node kaynak/dom_test.js  */
const YOL='/mnt/user-data/outputs/index.html';
const KROM='/opt/pw-browsers/chromium';
/* Modül adı ortama göre değişiyor: küresel kurulumda `playwright`,
   yerel kurulumda `playwright-core`. İkisi de denenir. */
let chromium;
for(const ad of ['playwright','playwright-core']){
  try{ chromium=require(ad).chromium; if(chromium)break }catch(e){}
}
if(!chromium){ console.log('⚠ playwright yok — DOM kapısı ATLANDI (kusur değil)'); process.exit(0) }
const fs=require('fs');
if(!fs.existsSync(YOL)){ console.log('⚠ '+YOL+' yok — önce kopyala'); process.exit(1) }
if(!fs.existsSync(KROM)){ console.log('⚠ Chromium yok — DOM kapısı ATLANDI'); process.exit(0) }

let H=0,N=0;
const chk=(a,ok,x)=>{N++;if(!ok){H++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};

(async()=>{
 const br=await chromium.launch({executablePath:KROM,
   args:['--enable-unsafe-swiftshader','--no-sandbox','--disable-gpu']});
 const pg=await br.newPage({viewport:{width:430,height:932},deviceScaleFactor:2,
   hasTouch:true,isMobile:true});
 const sayfaHata=[]; pg.on('pageerror',e=>sayfaHata.push(e.message));
 await pg.goto('file://'+YOL);
 await pg.waitForTimeout(2600);

 console.log('═══ DOM · GÜN LİSTESİ BAĞLARI (§284) ═══');

 /* Yardımcı: satır + dairesinin durumu */
 const daire=(desen)=>pg.evaluate(d=>{
   const s=[...document.querySelectorAll('#gunListe .glS[data-gi]')]
     .find(x=>new RegExp(d,'i').test(x.textContent||''))
     ||document.querySelector('#gunListe .glS[data-gi]');
   if(!s)return null;
   const b=s.querySelector('[data-klgorev]');
   const r=b?b.getBoundingClientRect():null;
   return {gi:+s.dataset.gi, konu:((s.querySelector('.ko')||{}).textContent||'').trim(),
     daireVar:!!b, isleyici:!!(b&&typeof b.onclick==='function'),
     x:r?Math.round(r.x+r.width/2):null, y:r?Math.round(r.y+r.height/2):null};
 },desen||'.');
 const dur=()=>pg.evaluate(()=>({
   gunKip:(typeof gunKip!=='undefined'?gunKip:null),
   gun:(typeof gunGoster!=='undefined'?gunGoster:null),
   listeAc:document.getElementById('gunListe').classList.contains('ac'),
   satir:document.querySelectorAll('#gunListe .glS[data-gi]').length}));

 /* gün kipini aç (pinch karşılığı: gunKipAc — pinch dinleyicisinin çağırdığı yol) */
 await pg.evaluate(()=>{ try{gunKipAc(true)}catch(e){} });
 await pg.waitForTimeout(500);
 let d0=await dur();
 chk('gün listesi açık ve satır üretiyor',d0.satir>0,d0);

 const a0=await daire();
 chk('AÇILIŞ · tamamlama dairesi bağlı',a0&&a0.isleyici===true,a0);

 /* ── ‹ › GÜN OKLARI · her geçişten sonra daire bağlı KALMALI ── */
 const okBas=async(yon)=>{
   const k=await pg.evaluate(y=>{
     const o=[...document.querySelectorAll('#gunListe .glOk[data-gun]')].filter(x=>!x.disabled);
     const t=(y<0)?o[0]:o[o.length-1]; if(!t)return null;
     const r=t.getBoundingClientRect();
     return {x:Math.round(r.x+r.width/2),y:Math.round(r.y+r.height/2),hedef:t.dataset.gun};
   },yon);
   if(!k)return null;
   await pg.touchscreen.tap(k.x,k.y); await pg.waitForTimeout(500);
   return k;
 };
 for(let t=1;t<=3;t++){
   const k=await okBas(-1);
   if(!k){ chk('‹ ok '+t+' basılabildi',false); break }
   const a=await daire();
   chk('‹ '+t+'. geçişten sonra daire HÂLÂ bağlı (ölü düğme yok)',
     a&&a.isleyici===true,{tur:t,hedef:k.hedef,a});
   const g=await dur();
   chk('‹ '+t+'. geçişte gün listesi AÇIK kaldı',g.listeAc===true&&g.satir>0,g);
 }
 const kIleri=await okBas(1);
 if(kIleri){
   const a=await daire();
   chk('› ileri geçişten sonra daire bağlı',a&&a.isleyici===true,a);
 }

 /* ── DAİREYE DOKUN · tik atmalı, ÇARKA IŞINLAMAMALI ── */
 const hedef=await daire();
 if(hedef&&hedef.x!=null){
   const once=await pg.evaluate(gi=>!!D.bitti[id(GOREVLER[gi])],hedef.gi);
   await pg.touchscreen.tap(hedef.x,hedef.y);
   await pg.waitForTimeout(600);
   const s=await pg.evaluate(gi=>({bitti:!!D.bitti[id(GOREVLER[gi])],
     gunKip:(typeof gunKip!=='undefined'?gunKip:null),
     listeAc:document.getElementById('gunListe').classList.contains('ac')}),hedef.gi);
   chk('daireye DOKUNUNCA tamamlama durumu DEĞİŞİYOR',s.bitti!==once,{konu:hedef.konu,once,...s});
   chk('daireye DOKUNUNCA ÇARKA IŞINLAMIYOR (liste açık kalıyor)',
     s.gunKip===true&&s.listeAc===true,s);
   /* tik sonrası liste yeniden çizilir — daire yine bağlı olmalı */
   const a2=await daire();
   chk('tik sonrası yeniden çizimde daire yine bağlı',a2&&a2.isleyici===true,a2);
 } else chk('tıklanacak daire bulundu',false);

 /* ── SATIR GÖVDESİ · düğme koruması ── */
 const koruma=await pg.evaluate(()=>{
   const kod=[...document.querySelectorAll('*')].length;   /* dokunma yok, sadece kaynak kontrolü */
   return {
     glSatirBagla:typeof glSatirBagla==='function',
     glKur:typeof glKur==='function',
     kod:kod>0};
 });
 chk('§284 · tek yol fonksiyonları var (glKur + glSatirBagla)',
   koruma.glSatirBagla&&koruma.glKur,koruma);

 /* kaynakta korumasız [data-gi] bağlaması KALMAMALI */
 const kaynak=fs.readFileSync(YOL,'utf8');
 const bagBloklari=kaynak.split("querySelectorAll('[data-gi]')").slice(1)
   .map(s=>s.slice(0,320));
 chk('[data-gi] bağlamalarının HEPSİ düğme korumalı',
   bagBloklari.length>0&&bagBloklari.every(b=>/closest\('button'\)/.test(b)),
   {sayi:bagBloklari.length,
    korumasiz:bagBloklari.filter(b=>!/closest\('button'\)/.test(b)).map(b=>b.slice(0,90))});
 /* liste yeniden kurulup glBagla ATLANAN yol kalmamalı */
 const yenidenKur=kaynak.split('innerHTML=gunListe()').length-1;
 chk('gün listesi yeniden kurulum noktası azaltıldı (≤3, tek yol)',yenidenKur<=3,{nokta:yenidenKur});

 /* ── KİP ANAHTARI (Program ↔ Kitap) sonrası da bağlı ── */
 const kip=await pg.evaluate(async()=>{
   const b=document.querySelector('#gunListe [data-glkip="kitap"]');
   if(!b)return {yok:true}; b.click();
   await new Promise(r=>setTimeout(r,500));
   const kitap=document.querySelectorAll('#gunListe [data-klkitap]').length;
   const p=document.querySelector('#gunListe [data-glkip="program"]');
   if(p)p.click();
   await new Promise(r=>setTimeout(r,500));
   const s=document.querySelector('#gunListe .glS[data-gi]');
   const d=s&&s.querySelector('[data-klgorev]');
   return {kitapSayisi:kitap,geriDaireBagli:!!(d&&typeof d.onclick==='function')};
 });
 chk('Kitap kipine geçince kitap listesi geliyor',kip.kitapSayisi>0,kip);
 chk('Programa dönünce daire yine bağlı',kip.geriDaireBagli===true,kip);

 console.log('\n'+(H?('✗ '+H+' HATA / '+N+' kontrol'):('✓ SIFIR HATA — '+N+' DOM kontrolü')));
 console.log('SAYFA HATASI: '+(sayfaHata.length?JSON.stringify(sayfaHata.slice(0,3)):'(yok)'));
 if(sayfaHata.length)H++;
 await br.close();
 process.exit(H?1:0);
})().catch(e=>{console.error('DOM KAPISI ÇÖKTÜ:',e.message);process.exit(1)});
