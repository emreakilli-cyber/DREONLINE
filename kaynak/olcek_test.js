/* ══ ÖLÇEK KAPISI · §299 · 75 FOTOĞRAF / 375 MB ═══════════════════
   NEDEN VAR: Kullanıcı bir denemenin TAMAMINI + cevap anahtarını çekti —
   75 fotoğraf, 375 MB, 5712×4284 px. O ana kadarki yol bütün fotoğrafları
   data URL olarak belleğe alıyordu (~556 MB) ve 38 istekten biri hata
   verince ÖNCEKİ HEPSİNİ çöpe atıyordu.

   Bu kapı şunları sınar:
     · akış usulü okuma — orijinaller bellekte TUTULMUYOR
     · kısmi başarı — ortadaki hata öncekileri çöpe atmıyor
     · okunamayan grupların SAYFA NUMARASIYLA bildirilmesi
     · yalnız başarısız grupların tekrar denenmesi
     · 429'un GEÇİCİ sayılması (sunucunun dediği kadar beklenip devam)
     · parti-içi fotoğraf numarasının genel sıraya çevrilmesi
       (kırpma ikinci partiden sonra YANLIŞ fotoğrafa bakıyordu)

   Kullanıcı verisi KULLANILMAZ (kişisel) — uygulamanın kendi tohum verisi.
   Ağ çağrıları taklit edilir; gerçek API çağrılmaz.

   Koşum: NODE_PATH=/opt/node22/lib/node_modules node kaynak/olcek_test.js  */
const YOL='/mnt/user-data/outputs/index.html';
const KROM='/opt/pw-browsers/chromium';
let chromium;
for(const ad of ['playwright','playwright-core']){
  try{ chromium=require(ad).chromium; if(chromium)break }catch(e){}
}
if(!chromium){ console.log('⚠ playwright yok — ÖLÇEK kapısı ATLANDI (kusur değil)'); process.exit(0) }
const fs=require('fs');
if(!fs.existsSync(YOL)){ console.log('⚠ '+YOL+' yok — ÖLÇEK kapısı ATLANDI'); process.exit(0) }

(async()=>{
 const br=await chromium.launch({executablePath:KROM,
   args:['--enable-unsafe-swiftshader','--no-sandbox','--disable-gpu',
         '--enable-precise-memory-info']});
 const pg=await br.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true});
 const h=[]; pg.on('pageerror',e=>h.push(e.message));
 /* Gemini çağrılarını taklit et · davranış window.__mod ile yönetilir */
 await pg.addInitScript(()=>{
   window.__cagri=0; window.__mod='ok'; window.__kotaKalan=0; window.__govde=[];
   const ger=window.fetch.bind(window);
   window.fetch=async(u,o)=>{
     const url=(typeof u==='string')?u:(u&&u.url)||'';
     if(url.indexOf('generativelanguage')>=0){
       window.__cagri++; const n=window.__cagri;
       window.__govde.push(o.body.length);
       if(window.__mod==='ortaKopuk'&&(n===5||n===6))throw new TypeError('Load failed');
       if(window.__mod==='kota'&&window.__kotaKalan>0){
         window.__kotaKalan--;
         return {ok:false,status:429,headers:{get:()=>'1'},
           text:async()=>'{"error":{"details":[{"retryDelay":"1s"}]}}',json:async()=>({})};
       }
       const parts=(JSON.parse(o.body).contents[0].parts)||[];
       const im=parts.filter(p=>p.inlineData).length;
       const q=[]; for(let i=0;i<im;i++){ const no=(n-1)*2+i+101;
         /* 'anahtarli' kipinde son iki istek CEVAP ANAHTARI sayfası döndürür */
         if(window.__mod==='anahtarli'&&n>=window.__anhBas){
           q.push({sayfaTur:'anahtar',foto:i+1}); continue }
         q.push({no:no,b:'?',s:null,e:'E',sec:'C',konu:'',konuEl:'Hemato',
           metin:'soru '+no,guven:0.9,foto:i+1,tablo:true,tabloAd:'T'+no,
           kutu:[0.1,0.1,0.5,0.5]}) }
       return {ok:true,status:200,headers:{get:()=>null},
         json:async()=>({candidates:[{content:{parts:[{text:JSON.stringify(q)}]},
           finishReason:'STOP'}]}), text:async()=>''};
     }
     try{return await ger(u,o)}catch(e){
       return {ok:false,status:0,headers:{get:()=>null},text:async()=>'',json:async()=>({})} }
   };
 });
 await pg.goto('file://'+YOL); await pg.waitForTimeout(2600);
 const R=[]; const chk=(a,ok,x)=>{R.push((ok?'  ✓ ':'  ✗ ')+a+
   (!ok&&x!==undefined?' :: '+JSON.stringify(x).slice(0,260):''));if(!ok)R.__f=(R.__f||0)+1};

 /* sahte "telefon fotoğrafı" File nesneleri */
 await pg.evaluate(()=>{
   window.__dosyalar=async(n,kenar)=>{
     kenar=kenar||1400;
     const c=document.createElement('canvas'); c.width=kenar; c.height=Math.round(kenar*4/3);
     const x=c.getContext('2d'); x.fillStyle='#fff'; x.fillRect(0,0,c.width,c.height);
     for(let k=0;k<40000;k++){ x.fillStyle=(k%3?'#111':'#999');
       x.fillRect((k*13)%c.width,(k*29)%c.height,2,2) }
     const blob=await new Promise(r=>c.toBlob(r,'image/jpeg',0.92));
     const out=[]; for(let i=0;i<n;i++)
       out.push(new File([blob],'IMG_'+(4000+i)+'.jpeg',{type:'image/jpeg'}));
     return out;
   };
   localStorage.setItem('rota-gorus',JSON.stringify({anahtar:'K'}));
 });

 /* 1 · 75 FOTOĞRAF → 38 İSTEK · AKIŞ */
 const p1=await pg.evaluate(async()=>{
   window.__cagri=0; window.__mod='ok';
   const F=await window.__dosyalar(75);
   const once=(performance.memory||{}).usedJSHeapSize||0;
   const il=[];
   const R=await gorusAkis(()=>'istem',fotoKaynak(F),(p,t,ek)=>il.push({p,t,ek}));
   const sonra=(performance.memory||{}).usedJSHeapSize||0;
   return {istek:window.__cagri,soru:R.sorular.length,basarisiz:R.basarisiz.length,
     toplam:R.toplam,ilerlemeSayi:il.length,son:il[il.length-1],
     heapMB:+((sonra-once)/1048576).toFixed(1),
     govdeMB:+(window.__govde.reduce((a,b)=>a+b,0)/window.__govde.length/1048576).toFixed(2)};
 });
 chk('75 fotoğraf 38 isteğe bölündü',p1.istek===38&&p1.toplam===38,p1);
 chk('75 sorunun tamamı toplandı',p1.soru===75,p1);
 chk('hiçbir grup düşmedi',p1.basarisiz===0,p1);
 chk('ilerleme her grupta bildirildi',p1.ilerlemeSayi===38,p1.ilerlemeSayi);
 chk('ilerlemede okunan sayı ve kalan süre taşınıyor',
   p1.son&&p1.son.ek&&p1.son.ek.okunan>0&&p1.son.ek.kalanSn!=null,p1.son);
 /* AKIŞ İSPATI · orijinaller tutulsaydı heap yüzlerce MB büyürdü */
 chk('AKIŞ · heap artışı sınırlı (<80 MB)',p1.heapMB<80,{heapMB:p1.heapMB});
 console.log('   ölçüm · istek gövdesi ort. '+p1.govdeMB+' MB · heap artışı '+p1.heapMB+' MB');

 /* 2 · KISMİ BAŞARI · ortadaki hata öncekileri çöpe atmıyor */
 const p2=await pg.evaluate(async()=>{
   window.__cagri=0; window.__mod='ortaKopuk';
   const F=await window.__dosyalar(20);
   const R=await gorusAkis(()=>'istem',fotoKaynak(F),()=>{});
   return {soru:R.sorular.length,basarisiz:R.basarisiz.length,bs:R.basarisiz[0]||null};
 });
 chk('ortadaki grup kopsa da diğerleri okundu (kısmi başarı)',
   p2.soru>0&&p2.soru<20&&p2.basarisiz===1,p2);
 /* 5. ve 6. İSTEK kopuyor → 5. grup = 9-10. fotoğraflar (grup başına 2 deneme) */
 chk('okunamayan grubun SAYFA NUMARALARI bildiriliyor',
   p2.bs&&p2.bs.ilk===9&&p2.bs.son===10,p2.bs);
 chk('okunamayan grubun sebebi anlaşılır yazılıyor',
   p2.bs&&/koptu/i.test(p2.bs.hata||''),p2.bs&&(p2.bs.hata||'').slice(0,80));

 /* 3 · YALNIZ BAŞARISIZ GRUP TEKRAR DENENİYOR */
 const p3=await pg.evaluate(async()=>{
   const F=await window.__dosyalar(20);
   window.__cagri=0; window.__mod='ortaKopuk';
   const R1=await gorusAkis(()=>'istem',fotoKaynak(F),()=>{});
   const ilk=window.__cagri;
   /* sayaç SIFIRLANMAZ: mock soru numarasını sayaçtan üretiyor */
   window.__mod='ok';
   const R2=await gorusAkis(()=>'istem',fotoKaynak(F),()=>{},
     {partiler:R1.basarisiz.map(x=>x.p),onceki:R1.sorular});
   return {tekrarIstek:window.__cagri-ilk,ilkSoru:R1.sorular.length,
     sonSoru:R2.sorular.length,sonBasarisiz:R2.basarisiz.length};
 });
 chk('tekrar denemede YALNIZ okunamayan grup gönderiliyor',p3.tekrarIstek===1,p3);
 chk('tekrar denemede önceki sonuçlar korunup tamamlanıyor',
   p3.sonSoru===20&&p3.sonBasarisiz===0,p3);

 /* 4 · 429 GEÇİCİ */
 const p4=await pg.evaluate(async()=>{
   const F=await window.__dosyalar(4);
   window.__cagri=0; window.__mod='kota'; window.__kotaKalan=2;
   const bek=[];
   const R=await gorusAkis(()=>'istem',fotoKaynak(F),
     (p,t,ek)=>{ if(ek&&ek.kotaBek)bek.push(ek.kotaBek) });
   return {soru:R.sorular.length,basarisiz:R.basarisiz.length,bek};
 });
 chk('429 sonrası beklenip devam ediliyor · iş çöpe gitmiyor',
   p4.soru===4&&p4.basarisiz===0,p4);
 chk('429 beklemesi bildiriliyor ve sunucunun dediği süreye uyuluyor',
   p4.bek.length>0&&p4.bek[0]===1,p4.bek);

 /* 5 · FOTOĞRAF NUMARASI GENEL SIRAYA ÇEVRİLİYOR */
 const p5=await pg.evaluate(async()=>{
   const F=await window.__dosyalar(6);
   window.__cagri=0; window.__mod='ok'; window.__kotaKalan=0;
   const R=await gorusAkis(()=>'istem',fotoKaynak(F),()=>{});
   return {fotolar:R.sorular.map(o=>o.foto)};
 });
 chk('foto numarası PARTİ-İÇİ değil GENEL sıraya çevrildi',
   p5.fotolar.join(',')==='1,2,3,4,5,6',p5.fotolar);

 /* 6 · BÜYÜK YÜKLEMEDE ÖN TARAMA ATLANIYOR, SEBEBİ SÖYLENİYOR */
 const p6=await pg.evaluate(async()=>{
   dpanelCiz();
   const F=await window.__dosyalar(30,700);
   await denemeOtoBasla(F);
   const d=document.getElementById('dpOtoDurum');
   return {met:(d.textContent||'').replace(/\s+/g,' ').slice(0,340),
     baslaDugme:!!d.querySelector('[data-denbasla]'),
     kaynakVar:!!(DEN_OTO.kaynak&&DEN_OTO.kaynak.sayi===30),
     topluYok:DEN_OTO.fotolar===null};
 });
 chk('büyük yüklemede fotoğraflar TOPLUCA belleğe alınmıyor',
   p6.kaynakVar&&p6.topluYok,p6);
 chk('istek sayısı önceden söyleniyor',/15 istekte/.test(p6.met),p6.met);
 chk('ön taramanın atlandığı ve NEDEN atlandığı söyleniyor',
   /ön bulanıklık taraması yapmıyorum/i.test(p6.met),p6.met);
 chk('okumayı kullanıcı başlatıyor (istemeden istek gitmiyor)',p6.baslaDugme,p6);

 /* 7 · ÖZET · okunamayan gruplar + tekrar düğmesi */
 const p7=await pg.evaluate(async()=>{
   D.denemeler=[{tar:'2026-08-01',kay:'t',t:30,k:28,bn:{}}];
   const F=await window.__dosyalar(20,700);
   window.__cagri=0; window.__mod='ortaKopuk';
   DEN_OTO.kaynak=fotoKaynak(F); DEN_OTO.fotolar=null; DEN_OTO.mod='200';
   DEN_OTO.ders24=null; DEN_OTO.birikim=null; DEN_OTO.basarisiz=null; DEN_OTO.mesgul=false;
   await denemeIsle();
   const d=document.getElementById('dpOtoDurum');
   return {met:(d.textContent||'').replace(/\s+/g,' ').slice(0,400),
     tekrar:!!d.querySelector('[data-denyeniden]'),
     incele:!!d.querySelector('[data-denincele]')};
 });
 chk('özet · okunamayan grup sayısı ve sayfaları yazıyor',
   /grup okunamadı/.test(p7.met)&&/#9–10/.test(p7.met),p7.met);
 chk('özet · diğer sayfaların kaybolmadığı söyleniyor',/kaybolmadı/.test(p7.met),p7.met);
 chk('özet · atlanan soru numaraları bildiriliyor',
   /soru numarası aradan atlandı/.test(p7.met),p7.met);
 chk('özet · "okunamayan grubu tekrar dene" düğmesi var',p7.tekrar,p7);
 chk('özet · yine de incelenip kaydedilebiliyor',p7.incele,p7);

 /* 8 · KARIŞIK YIĞIN · cevap anahtarı sayfaları kendiliğinden ayrılıyor
    (kullanıcı 75 fotoğrafı tek seferde çekiyor; elle ayıklamak zorunda kalmasın) */
 const p8=await pg.evaluate(async()=>{
   D.denemeler=[{tar:'2026-08-01',kay:'t',t:30,k:28,bn:{}}];
   const F=await window.__dosyalar(10,700);
   window.__cagri=0; window.__mod='anahtarli'; window.__anhBas=4;  /* 4-5. istek = 7-10. foto */
   DEN_OTO.kaynak=fotoKaynak(F); DEN_OTO.dosyalar=F; DEN_OTO.fotolar=null;
   DEN_OTO.mod='200'; DEN_OTO.ders24=null; DEN_OTO.birikim=null;
   DEN_OTO.basarisiz=null; DEN_OTO.anahtarIx=null; DEN_OTO.mesgul=false;
   await denemeIsle();
   const d=document.getElementById('dpOtoDurum');
   const cev=d.querySelector('[data-dencev]');
   return {met:(d.textContent||'').replace(/\s+/g,' ').slice(0,420),
     anhIx:DEN_OTO.anahtarIx, cevMetin:cev?cev.textContent:null,
     soru:(OMR_VIZYON.ham||[]).length};
 });
 chk('karışık yığında cevap anahtarı sayfaları tespit ediliyor',
   p8.anhIx&&p8.anhIx.length===4&&p8.anhIx[0]===6&&p8.anhIx[3]===9,p8.anhIx);
 chk('anahtar sayfalarından SORU çıkarılmıyor',p8.soru===6,p8);
 chk('kaç sayfanın anahtar olduğu ve aralığı yazıyor',
   /cevap anahtarı sayfası/.test(p8.met)&&/#7–10/.test(p8.met),p8.met);
 chk('düğme "bu sayfaları anahtar olarak oku" diyor (yeniden seçtirmiyor)',
   /sayfayı cevap anahtarı olarak oku/.test(p8.cevMetin||''),p8.cevMetin);

 /* 9 · ALT KÜME KAYNAĞI · yalnız seçilen fotoğraflar okunuyor */
 const p9=await pg.evaluate(async()=>{
   const F=await window.__dosyalar(10,700);
   const k=fotoKaynak(F,[6,7,8,9]);
   window.__cagri=0; window.__mod='ok'; window.__kotaKalan=0;
   const R=await gorusAkis(()=>'istem',k,()=>{});
   return {sayi:k.sayi,istek:window.__cagri,soru:R.sorular.length};
 });
 chk('alt küme kaynağı yalnız seçilen fotoğrafları gönderiyor',
   p9.sayi===4&&p9.istek===2&&p9.soru===4,p9);

 console.log('\n═══ §299 · ÖLÇEK KAPISI ═══');
 console.log(R.join('\n'));
 console.log('\nSAYFA HATASI:',h.length?h.slice(0,3):'(yok)');
 console.log(R.__f?('\n✗ '+R.__f+' HATA'):'\n✓ SIFIR HATA');
 await br.close(); process.exit((R.__f||h.length)?1:0);
})().catch(e=>{console.error('HATA:',e.message);process.exit(1)});
