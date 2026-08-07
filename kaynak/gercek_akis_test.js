/* ══ §301 · GERÇEK AKIŞ KAPISI ═══════════════════════════════════
   NEDEN VAR: Kullanıcı 15 soru sayfası + 34 cevap anahtarı sayfası ile
   gerçek bir tur yaptı. Beş kusur çıktı, beşi de kapılardan temiz geçmişti:
     1. "68 soru kodsuz" dedi, 34 soru sordu, "kalan 34 kodsuz" dedi.
        → kodKuyrukCiz listeyi HER ÇİZİMDE yeniden hesaplıyordu; kod verilen
          soru listeden düşerken indeks de ilerliyordu → her ikinci soru atlandı.
     2. 134 çözüm okundu, 0'ı kaydedildi ve "hepsi net eşleşti" yazdı.
        → `if(!coz)return` çözüm METNİ boş gelen kayıtları sessizce atıyordu;
          oysa D/Y için gereken DOĞRU ŞIK. Ayrıca özet çelişkiliydi.
     3. 131 soruluk kısmi tarama analizde hiç görünmedi ve cevap anahtarı
        bağlanacak soru bulamadı.
        → kısmi tarama YALNIZ toplulaştırılmış D.kal kaydına yazılıyordu.
     4. Yeşil bildirim sağa kaydırınca kendisi de kayıyordu.
     5. Kalan süre 7 dk → 3 dk zıpladı (soğuk ilk grup ortalamayı şişiriyor).
   Kullanıcı verisi KULLANILMAZ. Ağ çağrısı YOK.
   Koşum: NODE_PATH=/opt/node22/lib/node_modules node kaynak/gercek_akis_test.js */
const YOL='/mnt/user-data/outputs/index.html';
const KROM='/opt/pw-browsers/chromium';
let chromium;
for(const ad of ['playwright','playwright-core']){
  try{ chromium=require(ad).chromium; if(chromium)break }catch(e){}
}
if(!chromium){ console.log('⚠ playwright yok — GERÇEK AKIŞ kapısı ATLANDI'); process.exit(0) }
const fs=require('fs');
if(!fs.existsSync(YOL)){ console.log('⚠ '+YOL+' yok — ATLANDI'); process.exit(0) }

(async()=>{
 const br=await chromium.launch({executablePath:KROM,
   args:['--enable-unsafe-swiftshader','--no-sandbox','--disable-gpu']});
 const pg=await br.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,hasTouch:true});
 const h=[]; pg.on('pageerror',e=>h.push(e.message));
 await pg.goto('file://'+YOL); await pg.waitForTimeout(2700);

  /* §304: KOÇ ekranı artık AÇILIŞ ekranı (body.kocKip). Klasik arayüz
     altında duruyor ama opacity:0 + pointer-events:none oluyor —
     ölçüm ve dokunma testleri önce onu kapatmalı. */
  await pg.evaluate(()=>{try{kocKapat()}catch(e){document.body.classList.remove('kocKip')}});
  await pg.waitForTimeout(250);
 const R=[]; const chk=(a,ok,x)=>{R.push((ok?'  ✓ ':'  ✗ ')+a+(!ok&&x!==undefined?' :: '+JSON.stringify(x).slice(0,300):''));if(!ok)R.__f=(R.__f||0)+1};

 /* 1 · KOD KUYRUĞU · 68 eksikte 68 soru sorulmalı (34 değil) */
 const k=await pg.evaluate(async()=>{
   const ham=[]; for(let i=0;i<68;i++)ham.push({no:i+1,b:'Anatomi',konu:'',s:'D',e:null,sec:'C',metin:'s',guven:.9});
   OMR_VIZYON.ham=ham; OMR_VIZYON.mod='200';
   dpanelCiz(); kodKuyrukAc();
   let sorulan=0;
   for(let n=0;n<80;n++){
     const d=document.getElementById('dpOtoDurum');
     const b=d.querySelector('[data-kod="E"]');
     if(!b)break;
     sorulan++; b.click(); await new Promise(r=>setTimeout(r,4));
   }
   return {sorulan, kalanKodsuz:kodEksikler().length,
     bitisMetni:(document.getElementById('dpOtoDurum').textContent||'').replace(/\s+/g,' ').slice(0,90)};
 });
 chk('§301 · 68 eksik kodun 68\'i de soruldu (her ikinci soru atlanmıyor)',k.sorulan===68,k);
 chk('§301 · sonunda kodsuz soru kalmadı',k.kalanKodsuz===0,k);

 /* 2 · KISMİ TARAMA · soru kırılımı D.denemeler'e de yazılıyor */
 const p=await pg.evaluate(()=>{
   D.denemeler=[{tar:'2026-07-20',kay:'eski',t:40,k:38,bn:{},sorular:[{b:'Dahiliye',konu:'',s:'D',e:'E',no:1}]}];
   D.kal=[];
   const ham=[]; for(let i=1;i<=131;i++)ham.push({no:i,b:soruDers(i,'200',null)||'Anatomi',
     konu:'',s:(i%4?'D':'Y'),e:'E',sec:'C',metin:'soru '+i,guven:.95});
   OMR_VIZYON.ham=ham; OMR_VIZYON.mod='200'; OMR_VIZYON.ders24=null;
   omrOnizle('vision',true);
   const yol=OMR_DURUM.kayit.yol, ayrVar=!!(OMR_DURUM.kayit.ayrinti);
   const onceDen=D.denemeler.length, onceKal=D.kal.length;
   const ok=omrKaydet();
   return {yol,ayrVar,ok, denArtti:D.denemeler.length-onceDen, kalArtti:D.kal.length-onceKal,
     sonKayit:D.denemeler[D.denemeler.length-1],
     ayrSayi:ayrDenemeler().length, akisSec:AKIS.sec};
 });
 chk('kısmi tarama branş kaydı olarak yazılıyor (kalibrasyon)',p.yol==='kal'&&p.kalArtti>0,p);
 chk('§301 · soru kırılımı da D.denemeler\'e yazılıyor',p.denArtti===1&&p.sonKayit.sorular.length===131,
   {denArtti:p.denArtti,soru:p.sonKayit&&p.sonKayit.sorular.length});
 chk('§301 · kısmi kayıt kismi:true ile işaretli',p.sonKayit.kismi===true,p.sonKayit&&{kismi:p.sonKayit.kismi});
 chk('§301 · analiz listesinde görünüyor',p.ayrSayi===2,p);

 /* 3 · kısmi kayıt net/parakete hesabına GİRMİYOR */
 const n=await pg.evaluate(()=>({sonT:son().t,sonK:son().k,sonKay:son().kay,
   siraliSayi:(function(){try{return [...D.denemeler].filter(d=>d&&!d.kismi).length}catch(e){return -1}})()}));
 chk('§301 · son() kısmi kaydı GÖRMÜYOR (t=40 eski deneme)',n.sonT===40&&n.sonKay==='eski',n);

 /* 4 · CEVAP ANAHTARI · artık bağlanacak soru var; metinsiz kayıt da işleniyor */
 const c=await pg.evaluate(()=>{
   const di=D.denemeler.length-1;
   const coz=[];
   for(let i=1;i<=131;i++)coz.push({no:i,dogru:'C',coz:(i%3?('#'+i+' çözüm metni'):''),eslesme:0.95});
   const R=cevapEslestir(coz,di);
   return {yaz:R.yaz.length,kuyruk:R.kuyruk.length,sahipsiz:R.sahipsiz.length,
     metinsiz:R.metinsiz,bossuz:R.bossuz,hedefVar:R.hedefVar,hedefSoru:R.hedefSoru};
 });
 chk('§301 · çözümler artık soruya BAĞLANIYOR',c.yaz===131&&c.sahipsiz===0,c);
 chk('§301 · metni boş ama doğru şıkkı olan çözümler ATILMIYOR',c.metinsiz>0&&c.bossuz===0,c);

 /* 5 · hiç eşleşmeyince SEBEP yazılıyor ("hepsi net eşleşti" demiyor) */
 const y=await pg.evaluate(()=>{
   const R=cevapEslestir([{no:900,coz:'',dogru:''},{no:901,coz:'',dogru:''}],0);
   CEV_DURUM.tani={okunan:R.okunan,metinsiz:R.metinsiz,bossuz:R.bossuz,
     hedefSoru:R.hedefSoru,hedefVar:R.hedefVar};
   CEV_DURUM.kuyruk=R.kuyruk; CEV_DURUM.sahipsiz=R.sahipsiz; CEV_DURUM.gorsel=0;
   cevKuyrukCiz(0);
   return {met:(document.getElementById('dpCevDurum')||document.getElementById('dpOtoDurum')||{textContent:''})
     .textContent.replace(/\s+/g,' ').slice(0,260)};
 });
 chk('§301 · hiç işlenmeyince "hepsi net eşleşti" DEMİYOR',!/Hepsi net eşleşti/.test(y.met),y.met);
 chk('§301 · sebebi yazıyor',/Neden hiçbiri işlenmedi/.test(y.met),y.met);

 /* 6 · yeşil dolgu kaymıyor, etiket kayıyor, altı silikleşiyor */
 const g=await pg.evaluate(async()=>{
   try{gunKipAc(false)}catch(e){}
   carkDurtmeBasla();
   await new Promise(r=>setTimeout(r,200));
   carkSolukla(0.8);
   const a=document.getElementById('carkAnaliz');
   const et=a.querySelector('.caEt');
   const gl=document.getElementById('gunListe');
   return {dolguTransform:getComputedStyle(a).transform,
     glOpaklik:+getComputedStyle(gl).opacity,
     etVar:!!et};
 });
 chk('§301 · yeşil dolgu KAYMIYOR (transform yok)',
   g.dolguTransform==='none'||g.dolguTransform==='matrix(1, 0, 0, 1, 0, 0)',g);
 chk('§301 · kaydırınca altındaki çark silikleşiyor',g.glOpaklik<0.5,g);

 /* 7 · istem · güven kodunun İKİ konumu ve eğik yazı */
 const s=await pg.evaluate(()=>{
   const t=denemePrompt('200',null);
   return {ikiKonum:/D\/Y\/B harfinin hemen ALTINDA/.test(t)&&/şıkların SAĞINDA/.test(t),
     egik:/EĞİK \(italik\)/.test(t), ak:/"AK" İKİ HARFLİ/.test(t)};
 });
 chk('§301 · istem güven kodunun İKİ konumunu da söylüyor',s.ikiKonum,s);
 chk('§301 · istem eğik el yazısını uyarıyor',s.egik&&s.ak,s);

 /* 8 · §302 · İSTEM ŞİŞMESİ · uzun listede soru kökleri düşürülüyor
    (kullanıcının AI Studio panosu ~175K girdi tokenı gösterdi; ölçüldü:
     131 soruluk kök listesi 17 anahtar isteğinde tek başına ~53K token) */
 const t=await pg.evaluate(()=>{
   const mk=n=>{const S=[];for(let i=1;i<=n;i++)S.push({no:i,
     b:soruDers(i,'200',null)||'Anatomi',
     metin:'Kırk beş yaşında erkek hasta, üç haftadır süren halsizlik ve gece terlemesi…'});return S};
   const uzun=cevapAnahtarPrompt(mk(131)), kisa=cevapAnahtarPrompt(mk(8));
   const sat=uzun.split('\n').filter(x=>/^\s+#\d+/.test(x));
   return {uzunBoy:uzun.length, kisaBoy:kisa.length, satir:sat.length,
     ilk:sat[0]||'', son:sat[sat.length-1]||'',
     uzunKok:/Kırk beş yaşında/.test(uzun), kisaKok:/Kırk beş yaşında/.test(kisa),
     uyari:/soru kökleri verilmedi/.test(uzun), sinir:(typeof KOK_SINIR!=='undefined')?KOK_SINIR:null};
 });
 chk('§302 · uzun listede soru kökleri GÖNDERİLMİYOR',t.uzunKok===false,t);
 chk('§302 · kısa listede soru kökleri KORUNUYOR',t.kisaKok===true,t);
 chk('§302 · numara ve ders her hâlde duruyor',
   /^\s+#1 · /.test(t.ilk)&&/^\s+#131 · /.test(t.son)&&t.satir===131,
   {ilk:t.ilk,son:t.son,satir:t.satir});
 chk('§302 · köklerin verilmediği modele SÖYLENİYOR',t.uyari===true,t);
 chk('§302 · uzun istem kısaldı (%50\'den fazla)',t.uzunBoy<15750*0.5,
   {yeni:t.uzunBoy,eski:15750});

 console.log('\n═══ §301–§302 · GERÇEK AKIŞ ═══');
 console.log(R.join('\n'));
 console.log('\nSAYFA HATASI:',h.length?h.slice(0,3):'(yok)');
 console.log(R.__f?('\n✗ '+R.__f+' HATA'):'\n✓ SIFIR HATA');
 await br.close(); process.exit((R.__f||h.length)?1:0);
})().catch(e=>{console.error('HATA:',e.message);process.exit(1)});
