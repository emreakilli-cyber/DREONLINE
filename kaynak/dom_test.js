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

 /* ══ §285–§289 · GEMINI + ANALİZ AKIŞI ═══════════════════════════ */
 console.log('\n═══ DOM · §285–§289 GEMİNİ / ANALİZ AKIŞI ═══');
 const g=await pg.evaluate(()=>({
   sag:(typeof gorusSaglayici==='function')?gorusSaglayici():null,
   model:(typeof gorusModel==='function')?gorusModel():null,
   uc:(typeof GEMINI_UC!=='undefined')?GEMINI_UC:null,
   fn:['konuZayiflik','denemeDersOzet','akisAc','akisGit','cevapAnahtarPrompt',
       'cevapEslestir','gorselKirp','GorselDepo','gorusCagir']
      .map(n=>[n,typeof eval(n)]).filter(x=>x[1]==='undefined').map(x=>x[0])
 }));
 chk('varsayılan okuma motoru GEMINI',g.sag==='gemini',g);
 chk('Gemini uç noktası doğru',/generativelanguage\.googleapis\.com\/v1beta\/models\//.test(g.uc||''),g.uc);
 chk('emekli 2.5-flash-lite varsayılan değil',!/2\.5-flash-lite/.test(g.model||''),g.model);
 chk('yeni katman fonksiyonlarının hepsi var',g.fn.length===0,g.fn);

 /* yorum mantığı · 8 kombinasyon + nötr */
 const y=await pg.evaluate(()=>{
   const mk=(kod,d,y2)=>{const k={top:d+y2,d:d,y:y2,bos:0,
     kod:{E:{d:0,y:0,bos:0,top:0},B:{d:0,y:0,bos:0,top:0},
          AK:{d:0,y:0,bos:0,top:0},U:{d:0,y:0,bos:0,top:0}}};
     k.kod[kod]={d:d,y:y2,bos:0,top:d+y2}; return konuYorum(k)};
   return {Ed:mk('E',5,1).tur, Ey:mk('E',1,5).tur, Bd:mk('B',5,1).tur, By:mk('B',1,5).tur,
     AKd:mk('AK',5,1).tur, AKy:mk('AK',1,5).tur, Ud:mk('U',5,1).tur, Uy:mk('U',1,5).tur,
     az:mk('E',1,0).tur};
 });
 chk('Eminim+Doğru → sağlam',y.Ed==='saglam',y);
 chk('Eminim+Yanlış → KÖR NOKTA',y.Ey==='kor',y);
 chk('Bilmiyorum+Doğru → ŞANSA DAYALI',y.Bd==='sans',y);
 chk('Bilmiyorum+Yanlış → sıfırdan',y.By==='bos',y);
 chk('Arada+Doğru → yarım',y.AKd==='yari',y);
 chk('Arada+Yanlış → bilgi eksiği',y.AKy==='eksik',y);
 chk('Unuttum+Doğru → sezgi',y.Ud==='sezgi',y);
 chk('Unuttum+Yanlış → unutuyorsun',y.Uy==='unut',y);
 chk('az veri → nötr (uydurma yorum yok)',y.az==='notr',y);

 /* sıralama kuralları */
 const s=await pg.evaluate(()=>{
   D.denemeler=[{tar:'2026-08-02',kay:'T',detay:true,sorular:[
     {b:'Dahiliye',konu:'kardiyoloji',s:'Y',e:'E'},{b:'Dahiliye',konu:'kardiyoloji',s:'Y',e:'E'},
     {b:'Dahiliye',konu:'nefroloji',s:'D',e:'B'},
     {b:'Patoloji',konu:'neoplazi',s:'D',e:'E'},{b:'Patoloji',konu:'neoplazi',s:'D',e:'E'},
     {b:'Patoloji',konu:'neoplazi',s:'D',e:'E'}]}];
   const Z=konuZayiflik(), Dz=denemeDersOzet(D.denemeler[0]);
   return {konuSirali:Z.every(x=>x.liste.every((k,i,a)=>i===0||a[i-1].top>=k.top)),
     dersSirali:Dz.every((x,i,a)=>i===0||a[i-1].yOran>=x.yOran),
     ilkDers:Dz[0]&&Dz[0].b, ilkOran:Dz[0]&&+Dz[0].yOran.toFixed(2),
     dahKonu:(Z.find(x=>x.b==='Dahiliye')||{liste:[]}).liste.map(k=>k.konu)};
 });
 chk('konular soru sayısına göre AZALAN',s.konuSirali,s);
 chk('dersler yanlış oranına göre AZALAN',s.dersSirali,s);
 chk('en yanlış ders başta (Dahiliye %67)',s.ilkDers==='Dahiliye'&&s.ilkOran>0.6,s);

 /* akış · 4 sayfa + responsive */
 const a=await pg.evaluate(async()=>{
   akisAc(0); await new Promise(r=>setTimeout(r,350));
   const el=document.getElementById('akis');
   const tasma=document.body.scrollWidth>document.body.clientWidth+1;
   akisGit(3); await new Promise(r=>setTimeout(r,350));
   const t3=document.body.scrollWidth>document.body.clientWidth+1;
   const say=AKIS.say; akisKapat();
   return {acik:el.classList.contains('ac')===false, cizgi:4, tasma, t3, say};
 });
 chk('akış açılıp kapanıyor',a.acik===true,a);
 chk('akışta YATAY TAŞMA yok (sayfa 0 ve 3)',!a.tasma&&!a.t3,a);
 chk('4. sayfaya gidilebiliyor',a.say===3,a);

 /* §285 · yanıt ayrıştırma sağlamlığı (thought parçası / MAX_TOKENS) */
 const yp=await pg.evaluate(()=>{
   const src=document.documentElement.outerHTML;
   const i=src.indexOf('const c0=(j&&j.candidates');
   const blok=src.slice(i,i+900);
   return {thoughtFiltre:/!p\.thought/.test(blok),
     bosBirlestir:/\.join\(''\)/.test(blok),
     maxTokens:/MAX_TOKENS/.test(blok),
     safBase64:/match\(\/\^data:\(\[\^;\]\+\);base64,\(\.\*\)\$\//.test(src)};
 });
 chk('yanıtta düşünme (thought) parçaları filtreleniyor',yp.thoughtFiltre,yp);
 chk('metin parçaları araya ekleme yapmadan birleşiyor (JSON bölünmez)',yp.bosBirlestir,yp);
 chk('MAX_TOKENS anlaşılır hataya çevriliyor',yp.maxTokens,yp);
 chk('görsel SAF base64 gönderiliyor (data: öneki soyuluyor)',yp.safBase64,yp);

 /* ══ §290–§292 · PROJEKSİYON + KAYDIRMA + DÜRTME ═════════════════ */
 console.log('\n═══ DOM · §290–§292 ═══');
 const pj=await pg.evaluate(()=>{
   const ad2=k=>{let m=String(k).match(/·\s*(\d+)\/(\d+)\.\s*parça/); if(m)return +m[2];
     m=String(k).match(/[—–-]\s*(\d+)\/(\d+)\s*$/); if(m)return +m[2]; return 1};
   const kotu=GOREVLER.filter(g=>gorevParca(g)!==ad2(g.k)).map(g=>g.k).slice(0,3);
   return {parcaKotu:kotu,
     vidKok:konuKok('Hematoloji videoları — 1/9'),
     kitKok:konuKok('Hematoloji'),
     vidKaynak:kaynakKok('Atilla Uslu Dahiliye videoları · 1.5x'),
     kitKaynak:kaynakKok('Atilla Uslu Dahiliye 1 sf 90–102'),
     bskKaynak:kaynakKok('Emrullah Patoloji SST sf 1–10')};
 });
 chk('parça sayısı TÜM görevlerde ad ile uyuşuyor',pj.parcaKotu.length===0,pj.parcaKotu);
 chk('video ile kitap AYNI konu kökünde',pj.vidKok===pj.kitKok,pj);
 chk('video ile Atilla Uslu kitabı AYNI kaynak kökünde',
   pj.vidKaynak===pj.kitKaynak&&pj.vidKaynak==='Atilla Uslu Dahiliye',pj);
 chk('ilgisiz kaynak birleşmiyor',pj.bskKaynak!==pj.vidKaynak,pj);

 /* konu tavanı: aynı konu iki kaynaktan tam pay ALMAMALI */
 const tv=await pg.evaluate(()=>{
   const T='2026-08-03';
   /* ⚠ TEST YALITIMI: önceki blok D.denemeler'i t/k/bn'siz sentetik kayıtla
      değiştiriyor; para() ondan NaN üretir. Motoru kendi tohumuna döndür. */
   D.denemeler=JSON.parse(JSON.stringify(TOHUM));
   const p0=()=>{const a=para();return +puan(a.t,a.k).toFixed(4)};
   D.bitti={}; const bas=p0();
   const vid=GOREVLER.filter(g=>/Hematoloji videoları/i.test(g.k));
   vid.forEach(g=>D.bitti[id(g)]=T);
   const sonra=p0();
   D.bitti={};
   return {bas,sonra,artis:+(sonra-bas).toFixed(4),video:vid.length};
 });
 chk('video serisi POZİTİF ama sınırlı kazanç veriyor',
   tv.artis>0&&tv.artis<0.05,tv);

 /* power-up: başka kaynaktan kapanmış konuya tam kazanç yazmamalı */
 const pu=await pg.evaluate(()=>{
   D.denemeler=JSON.parse(JSON.stringify(TOHUM));
   const u=POWERUP.find(x=>/Atilla Uslu Dahiliye/i.test(x.kitap));
   if(!u)return {yok:true};
   D.bitti={}; const t=puDeger(u).net;
   GOREVLER.forEach(g=>{ if(konuKok(g.k)===konuKok(u.konu))D.bitti[id(g)]='2026-08-03' });
   const t2=puDeger(u).net; const tk=puDeger(u).tekrar;
   D.bitti={};
   return {once:+t.toFixed(4),sonra:+t2.toFixed(4),tekrar:!!tk,konu:u.konu};
 });
 if(!pu.yok) chk('power-up · konu başka kaynaktan kapandıysa kazanç DÜŞÜYOR',
   pu.sonra<pu.once,pu);

 /* §291–§292 · kaydırma ve dürtme fonksiyonları + baloncuk kaldırıldı */
 const kd=await pg.evaluate(()=>{
   const src=document.documentElement.outerHTML;
   carkDurtmeBasla();
   const c=document.getElementById('cark');
   const durt=c.classList.contains('durt');
   const anim=getComputedStyle(c).animationName;
   carkDurtmeDur();
   return {durt,anim,durdu:!c.classList.contains('durt'),
     kayFn:typeof akisAc==='function',
     baloncukCagrisi:/el\.classList\.add\('gor'\)[\s\S]{0,80}denincele/i.test(src),
     merkezSart:/const merkezMi=\(x,y\)=>/.test(src),
     tekParmak:/e\.touches\.length!==1\)\{ sBitti\(\); return \}/.test(src)};
 });
 chk('§292 · dürtme başlıyor ve duruyor',kd.durt&&kd.anim==='carkDurt'&&kd.durdu,kd);
 chk('§292 · üst baloncuk çağrısı kaldırıldı',!kd.baloncukCagrisi,kd);
 chk('§291 · merkez şartı ve tek-parmak koruması var',kd.merkezSart&&kd.tekParmak,kd);

 /* ══ §293 · GERÇEK FOTOĞRAFTAN ÇIKAN DÜZELTMELER ═════════════════ */
 console.log('\n═══ DOM · §293 (gerçek fotoğraf) ═══');
 const g93=await pg.evaluate(()=>{
   const ist=denemePrompt('200',null);
   const cev=cevapAnahtarPrompt([{no:101,b:'Dahiliye',metin:'x'}]);
   /* karşılaştırmadan türetme */
   const t=[{sec:'E',dogru:'E'},{sec:'B',dogru:'C'},{sec:null,dogru:'A'},{sec:'A',dogru:null}]
     .map(o=>sonucHesapla(o));
   return {solKenar:/SOL KENAR BOŞLUĞUNA/.test(ist),
     kirmizi:/KIRMIZI/.test(ist),
     konuEl:/konuEl/.test(ist),
     dogruKalip:/Doğru cevap: \(E\)/.test(cev),
     tabloEtiket:/Tablo \(Soru 107\)/.test(cev),
     turet:t.join(','),
     fn:typeof sonucHesapla==='function'&&typeof cakismaListesi==='function'};
 });
 chk('§293 · istem D/Y/B yerini SOL KENAR diye tarif ediyor',g93.solKenar,g93);
 chk('§293 · istem kırmızı-Y ipucunu içeriyor',g93.kirmizi,g93);
 chk('§293 · istem elle yazılan konu etiketini (konuEl) istiyor',g93.konuEl,g93);
 chk('§293 · cevap anahtarı istemi "Doğru cevap: (X)" kalıbını biliyor',g93.dogruKalip,g93);
 chk('§293 · cevap anahtarı istemi "Tablo (Soru N)" etiketini biliyor',g93.tabloEtiket,g93);
 chk('§293 · sonuç anahtarla karşılaştırılarak türetiliyor (D,Y,B,null)',
   g93.turet==='D,Y,B,'||g93.turet==='D,Y,B,null',g93.turet);
 chk('§293 · türetme ve çakışma fonksiyonları var',g93.fn,g93);

 /* ══ §294 · FİLTRELER / BAŞARI BARI / DERS→HARİTA ════════════════ */
 console.log('\n═══ DOM · §294 ═══');
 const f94=await pg.evaluate(async()=>{
   D.denemeler=JSON.parse(JSON.stringify(TOHUM));
   D.denemeler.push({tar:'2026-08-02',kay:'T',detay:true,sorular:[
     {b:'Dahiliye',konu:'kardiyoloji',s:'Y',e:'E'},{b:'Dahiliye',konu:'kardiyoloji',s:'Y',e:'E'},
     {b:'Dahiliye',konu:'nefroloji',s:'D',e:'B'},{b:'Dahiliye',konu:'nefroloji',s:'D',e:'B'},
     {b:'Patoloji',konu:'neoplazi',s:'D',e:'E'},{b:'Patoloji',konu:'neoplazi',s:'D',e:'E'},
     {b:'Patoloji',konu:'neoplazi',s:'Y',e:'B'}]});
   AKIS.sec=D.denemeler.length-1; AKIS.ders=null; AKIS.etiket=null;
   AKIS.grupla=false; AKIS.geri=null;
   akisAc(2); await new Promise(r=>setTimeout(r,300));
   const sat=[...document.querySelectorAll('#akS2 .akDsr')];
   const oku=s=>{const t=(s.querySelector('.sy')||{}).textContent||'';
     const m=t.match(/(\d+)\/(\d+) doğru · %(\d+)/);
     const w=parseFloat(((s.querySelector('.akBar i')||{}).style||{}).width)||0;
     return {ad:(s.querySelector('b')||{}).textContent,yuzde:m?+m[3]:null,bar:Math.round(w)}};
   const L=sat.map(oku);
   /* derse tıkla → sayfa 0 filtreli + geri oku */
   sat[0].click(); await new Promise(r=>setTimeout(r,300));
   const drillSay=AKIS.say, drillDers=AKIS.ders;
   const grup=[...document.querySelectorAll('#akS0 .akGrupB b')].map(x=>x.textContent);
   const geriVar=!!document.querySelector('#akS0 [data-akgeri]');
   document.querySelector('#akS0 [data-akgeri]').click();
   await new Promise(r=>setTimeout(r,300));
   const geriSay=AKIS.say, geriDers=AKIS.ders;
   /* sayfa 3 · ders + gruplama birlikte */
   AKIS.ders=null; AKIS.grupla=false; akisGit(3);
   await new Promise(r=>setTimeout(r,300));
   const tum=document.querySelectorAll('#akS3 .akSk').length;
   const dr=[...document.querySelectorAll('#akS3 [data-akders]')].filter(b=>b.dataset.akders);
   const drAd=dr[0].dataset.akders; dr[0].click();
   await new Promise(r=>setTimeout(r,300));
   const filt=document.querySelectorAll('#akS3 .akSk').length;
   document.querySelector('#akS3 [data-akgrup]').click();
   await new Promise(r=>setTimeout(r,350));
   const grupSayisi=document.querySelectorAll('#akS3 .akGrup').length;
   const grupKart=document.querySelectorAll('#akS3 .akGrup .akSk').length;
   const halaDers=[...document.querySelectorAll('#akS3 .akSk .akSkB i')]
     .every(i=>i.textContent.trim()===drAd);
   AKIS.ders=null; AKIS.grupla=false; akisKapat();
   D.denemeler=JSON.parse(JSON.stringify(TOHUM));
   return {L,tiklanabilir:sat.every(s=>s.tagName==='BUTTON'),
     drillSay,drillDers,grupAd:grup,geriVar,geriSay,geriDers,
     tum,drAd,filt,grupSayisi,grupKart,halaDers};
 });
 chk('§294 · bar doluluğu = başarı yüzdesi',
   f94.L.every(x=>Math.abs(x.bar-x.yuzde)<=2),f94.L);
 chk('§294 · en başarısız ders en üstte ve en az dolu',
   f94.L[0].yuzde<=f94.L[f94.L.length-1].yuzde&&f94.L[0].bar<=f94.L[f94.L.length-1].bar,f94.L);
 chk('§294 · ders satırı tıklanabilir',f94.tiklanabilir,f94.tiklanabilir);
 chk('§294 · derse tıkla → sayfa 0, o derse filtreli',
   f94.drillSay===0&&f94.drillDers&&f94.grupAd.length===1,f94);
 chk('§294 · geri oku var ve sayfa 2ye dönüyor, filtreyi temizliyor',
   f94.geriVar&&f94.geriSay===2&&f94.geriDers===null,f94);
 chk('§294 · sayfa 3 ders filtresi daraltıyor',f94.filt>0&&f94.filt<f94.tum,f94);
 chk('§294 · ders filtresi + etiket gruplama BİRLİKTE doğru',
   f94.grupSayisi>0&&f94.grupKart===f94.filt&&f94.halaDers,f94);

 /* anahtar alanı erişilebilirliği · §296'da AYRI uyarı kutusu kaldırıldı
    (kullanıcı katlanabilir menüyü tercih etti); ölçülen şey artık:
    menü var mı, anahtar yokken açık geliyor mu, giriş alanı erişilebilir mi. */
 const ak94=await pg.evaluate(()=>{
   localStorage.removeItem('rota-gorus');
   const d=document.getElementById('dpAyarDet'); if(d)d.dataset.k='';
   dpanelCiz();
   const det=document.getElementById('dpAyarDet');
   const inp=document.getElementById('dpApiKey');
   return {menu:!!det,acik:!!(det&&det.open),input:!!inp};
 });
 chk('§296 · anahtar yokken ayar menüsü açık ve giriş alanı erişilebilir',
   ak94.menu&&ak94.acik&&ak94.input,ak94);

 /* ══ §295–§298 · DAYANIKLILIK / AKIŞ ═════════════════════════════ */
 console.log('\n═══ DOM · §295–§298 ═══');
 const d95=await pg.evaluate(()=>{
   const src=document.documentElement.outerHTML;
   return {
     parti:(typeof GORUS_PARTI==='number')&&GORUS_PARTI>=1&&GORUS_PARTI<=3,
     zaman:(typeof GORUS_ZAMAN==='number')&&GORUS_ZAMAN>=30000,
     dizi:typeof gorusDizi==='function',
     abort:/new AbortController\(\)/.test(src)&&/signal:ac\?ac\.signal:undefined/.test(src),
     yenidenDene:/for\(let deneme=0;deneme<2;deneme\+\+\)/.test(src),
     hataAyrim:/__ZAMAN__/.test(src)&&/__AG__/.test(src),
     uyandir:/wakeLock/.test(src),
     mesaj:(function(){ try{ return gorusHataMet(new Error('__AG__'),1,1) }catch(e){ return '' } })(),
     mesajZ:(function(){ try{ return gorusHataMet(new Error('__ZAMAN__'),1,1) }catch(e){ return '' } })(),
     /* §296 */
     katlanabilir:!!document.getElementById('dpAyarDet'),
     uyariKutusuYok:!/dpAnahtarUyari/.test(src),
     /* §297 */
     kodFn:typeof kodKuyrukAc==='function'&&typeof kodEksikler==='function'
   };
 });
 chk('§295 · fotoğraflar partiler hâlinde gönderiliyor',d95.parti&&d95.dizi,d95);
 chk('§295 · zaman aşımı AbortController ile kurulu',d95.abort&&d95.zaman,d95);
 chk('§295 · kopan bağlantıda otomatik yeniden deneme var',d95.yenidenDene,d95);
 chk('§295 · hata sebebi ayrıştırılıyor (zaman aşımı ≠ ağ)',d95.hataAyrim,d95);
 chk('§295 · hata mesajı WiFi suçlamıyor, uyku/çıkışı söylüyor',
   /uyursa|ekran açık/i.test(d95.mesaj)&&!/WiFi bağlı mı/i.test(d95.mesaj),d95.mesaj);
 chk('§295 · zaman aşımı mesajı ayrı ve yönlendirici',
   /zamanında gelmedi/i.test(d95.mesajZ)&&/daha az fotoğraf/i.test(d95.mesajZ),d95.mesajZ);
 chk('§295 · işlem sırasında ekran açık tutuluyor (wakeLock)',d95.uyandir,d95);
 chk('§296 · ayarlar katlanabilir (details) ve ayrı uyarı kutusu kaldırıldı',
   d95.katlanabilir&&d95.uyariKutusuYok,d95);
 chk('§297 · eksik güven kodu kuyruğu fonksiyonları var',d95.kodFn,d95);

 /* §296 · anahtar durumuna göre açık/katlı */
 const a96=await pg.evaluate(()=>{
   localStorage.removeItem('rota-gorus');
   const d=document.getElementById('dpAyarDet'); d.dataset.k=''; dpanelCiz();
   const yokAcik=d.open, yokOzet=(d.querySelector('summary')||{}).textContent||'';
   const c=Gorus.oku(); c.anahtar='AIzaX'; Gorus.yaz(c);
   d.dataset.k=''; dpanelCiz();
   const varAcik=d.open, varOzet=(d.querySelector('summary')||{}).textContent||'';
   localStorage.removeItem('rota-gorus');
   return {yokAcik,yokOzet,varAcik,varOzet};
 });
 chk('§296 · anahtar yokken AÇIK, varken KATLI',
   a96.yokAcik===true&&a96.varAcik===false,a96);
 chk('§296 · özet durumu yazıyor (gerekli / tanımlı)',
   /gerekli/.test(a96.yokOzet)&&/tanımlı/.test(a96.varOzet),a96);

 console.log('\n'+(H?('✗ '+H+' HATA / '+N+' kontrol'):('✓ SIFIR HATA — '+N+' DOM kontrolü')));
 console.log('SAYFA HATASI: '+(sayfaHata.length?JSON.stringify(sayfaHata.slice(0,3)):'(yok)'));
 if(sayfaHata.length)H++;
 await br.close();
 process.exit(H?1:0);
})().catch(e=>{console.error('DOM KAPISI ÇÖKTÜ:',e.message);process.exit(1)});
