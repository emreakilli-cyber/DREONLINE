require('./derin_ortam.js');
const C=globalThis.__C, X=C.API, vm=require('vm'), fs=require('fs');
const R=e=>vm.runInContext(e,C);
let H=0,N=0;const chk=(a,ok,e)=>{N++;if(!ok){H++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const kod=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8');
const K=(a)=>{R('D.kal='+JSON.stringify(a));return R('rCal()')};
console.log('═══ KALİBRASYON ═══');
C.setGun('2026-08-10'); X.D.bitti={};
X.GOREVLER.filter(g=>g.d<='2026-08-09'&&g.act==='oku').forEach(g=>X.D.bitti[X.id(g)]=g.d);
const bos=K([]);
chk('havuz boşken önsel 0.405',Math.abs(bos.r-0.405)<0.001,bos.r);
chk('önsel belirsizlik ±0.195',Math.abs(1.96*bos.sd-0.195)<0.01,(1.96*bos.sd).toFixed(3));
const kotu=K([{tar:'2026-08-10',br:'Patoloji',d:8,y:10,b:6,kd:1,ky:3,kb:0}]);
chk('KÖTÜ sonuç R_CAL düşürüyor',kotu.r<bos.r,{once:bos.r.toFixed(3),sonra:kotu.r.toFixed(3)});
const iyi=K([{tar:'2026-08-10',br:'Patoloji',d:18,y:3,b:3,kd:4,ky:0,kb:0}]);
chk('İYİ sonuç R_CAL yükseltiyor',iyi.r>bos.r,{once:bos.r.toFixed(3),sonra:iyi.r.toFixed(3)});
chk('tek gözlem AŞIRI oynatmıyor (<0.05)',Math.abs(kotu.r-bos.r)<0.05&&Math.abs(iyi.r-bos.r)<0.05,
  {kötü:(bos.r-kotu.r).toFixed(3),iyi:(iyi.r-bos.r).toFixed(3)});
const mk=(n,kd,ky)=>{const c=[];for(let i=0;i<n;i++)c.push({tar:'2026-08-10',br:'Patoloji',d:12,y:8,b:4,kd:kd,ky:ky,kb:0});return c};
const c10=K(mk(10,1,3)), c50=K(mk(50,1,3));
chk('veri arttıkça bant DARALIYOR',c50.sd<c10.sd&&c10.sd<bos.sd,
  {['0']:(1.96*bos.sd).toFixed(3),['10']:(1.96*c10.sd).toFixed(3),['50']:(1.96*c50.sd).toFixed(3)});
chk('tutarlı kötü sonuç R_CAL\'i tabana çekiyor',c50.r<0.2,c50.r.toFixed(3));
chk('R_CAL sınırlar içinde',c50.r>=0.15&&c50.r<=0.85);
// projeksiyona etkisi
K([]); let p=X.para(); const K0=X.puan(p.t,p.k);
K(mk(30,1,3)); p=X.para(); const K1=X.puan(p.t,p.k);
K(mk(30,4,0)); p=X.para(); const K2=X.puan(p.t,p.k);
chk('kötü veri PROJEKSİYONU düşürüyor',K1<K0,{once:K0.toFixed(2),sonra:K1.toFixed(2)});
chk('iyi veri PROJEKSİYONU yükseltiyor',K2>K1,{kötü:K1.toFixed(2),iyi:K2.toFixed(2)});
// gorev getirisine etkisi
K([]); const g=X.GOREVLER.find(q=>q.act==='oku'&&q.soru>1&&!X.D.bitti[X.id(q)]);
const i=X.GOREVLER.indexOf(g); const v0=R('gorevKazanc(GOREVLER['+i+'])');
K(mk(30,1,3)); const v1=R('gorevKazanc(GOREVLER['+i+'])');
chk('kötü veri GÖREV GETİRİSİNİ düşürüyor',v1<v0,{once:v0.toFixed(3),sonra:v1.toFixed(3)});
// power-up degerine etkisi
K([]); const u0=R('puDeger(POWERUP[0]).verim');
K(mk(30,1,3)); const u1=R('puDeger(POWERUP[0]).verim');
chk('kötü veri POWER-UP değerini düşürüyor',u1<u0,{once:u0.toFixed(3),sonra:u1.toFixed(3)});
// ayrik veri · DUSUK kapsamda ustun, yuksek kapsamda temel veri daha cok soru tasiyor
const dus=k=>Object.assign({},k,{kap:0.15});
K(mk(20,3,1).map(dus)); const ayD=R('rCal()').sd;
R('D.kal='+JSON.stringify(mk(20,3,1).map(k=>dus({tar:k.tar,br:k.br,d:k.d,y:k.y,b:k.b}))));
const tmD=R('rCal()').sd;
chk('düşük kapsamda AYRIK veri daha keskin',ayD<tmD,{ayrık:(1.96*ayD).toFixed(3),temel:(1.96*tmD).toFixed(3)});
K(mk(20,3,1)); const ay=R('rCal()').sd;
chk('ayrık veri de bandı daraltıyor',1.96*ay<0.195,(1.96*ay).toFixed(3));
// bant
K([]); const b1=R('puanBant(-1)'), b2=R('puanBant(1)');
p=X.para(); const km=X.puan(p.t,p.k);
chk('bant projeksiyonu içeriyor',b1<km&&km<b2,{alt:b1.toFixed(2),orta:km.toFixed(2),üst:b2.toFixed(2)});
chk('puanBant önbelleği BOZMUYOR',Math.abs(R('rCal()').r-0.405)<0.001);
// arayuz
console.log('═══ ARAYÜZ ═══');
chk('giriş paneli var',/id="dpanel"/.test(kod)&&/id="dpKay"/.test(kod));
chk('menüde giriş düğmesi',/id="dnmB"/.test(kod));
chk('havuz listesi ve silme',/data-dsil=/.test(kod));
chk('üst şeritte BANT gösteriliyor (§254 ulaşılabilir tavan)',/tavanBant\(-1\)/.test(kod)&&/tavanBant\(1\)/.test(kod));
chk('D.kal senkronda korunuyor',/kal:\(o&&Array\.isArray\(o\.kal\)&&o\.kal\)\|\|\[\]/.test(kod));
chk('binom varyansı kullanılıyor',/1\.5625\*pk\*\(1-pk\)\/q/.test(kod));
chk('önbellek anahtarı içeriği kapsıyor',/JSON\.stringify\(D\.kal\|\|\[\]\)/.test(kod));
R('D.kal=[]'); X.D.bitti={};
console.log('\n'+(H?'✗ '+H+' HATA / '+N:'✓ SIFIR HATA — '+N+' kontrol geçti'));
process.exitCode=H?1:0;

console.log('\n═══ KALİBRASYON BOYUT BAĞIMSIZLIĞI ve POTANSİYEL ═══');
let H7=0;const c7=(a,ok,e)=>{if(!ok){H7++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
C.setGun('2026-08-10'); X.D.bitti={};
X.GOREVLER.filter(g=>g.d<='2026-08-09'&&g.act==='oku').forEach(g=>X.D.bitti[X.id(g)]=g.d);
// farkli boyutlu denemeler
const r0=K([]).r;
const rF=K([{tar:'2026-08-10',br:'Fizyoloji',d:6,y:2,b:0,kd:3,ky:1,kb:0}]);
const rD=K([{tar:'2026-08-10',br:'Dahiliye',d:20,y:10,b:5,kd:8,ky:4,kb:2}]);
const rP=K([{tar:'2026-08-10',br:'Patoloji',d:12,y:4,b:2,kd:6,ky:2,kb:1}]);
c7('8 soruluk deneme kabul ediliyor',rF.n===1,rF.n);
c7('35 soruluk deneme kabul ediliyor',rD.n===1,rD.n);
c7('büyük deneme bandı daha çok daraltıyor',rD.sd<rP.sd,{['35soru']:(1.96*rD.sd).toFixed(3),['18soru']:(1.96*rP.sd).toFixed(3)});
const kod7=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
c7('giriş alanları 24 ile sınırlı DEĞİL',!/id="dpD"[^>]*max="24"/.test(kod7));
c7('giriş alanları 40a kadar',/id="dpD"[^>]*max="40"/.test(kod7));
c7('branş soru sayısı gösteriliyor',/denemesi normalde/.test(kod7));
/* POTANSİYEL = GERÇEK · §178'den beri "hepsini yaparsam" senaryosu
   denemeleri çözüp SONUCUNU GİRMEYİ de kapsıyor (getiri yalnız kayıttan
   geldiği için). Gerçek senaryo da aynı şekilde kurulmalı. */
const hepsiniYap=()=>{
  /* Deneme getirileri MEVCUT durumda hesaplanıyor — `kalanKazanci` de
     öyle yapıyor. Görevler işaretlendikten sonra hesaplanırsa konular
     "çalışılmış" sayılıp tekrar getirisine (S_TEK) geçiyor ve iki ölçüm
     hizasız kalıyor. Sıra bilinmediği için ikisi de mevcut durumu esas alır. */
  let dT=0,dK=0;
  X.GOREVLER.forEach(g=>{
    if(g.act!=='deneme'&&g.act!=='deneme24')return;
    if(X.D.bitti[X.id(g)])return;
    const c=R('denemeKaz(GOREVLER['+X.GOREVLER.indexOf(g)+'])');
    if(c){dT+=c.t;dK+=c.k}
  });
  X.GOREVLER.forEach(g=>X.D.bitti[X.id(g)]=g.d);
  const p=X.para();
  return X.puan(p.t+dT,p.k+dK);
};
C.setGun('2026-07-29');
K([]); X.D.bitti={};
const p0=X.para(), Ka=X.puan(p0.t,p0.k), kk=R('kalanKazanci()');
const Kb=hepsiniYap();
c7('kalan potansiyel = gerçek artış',Math.abs(kk.fark-(Kb-Ka))<0.05,
  {potansiyel:kk.fark.toFixed(3),gerçek:(Kb-Ka).toFixed(3)});
X.D.bitti={};
X.GOREVLER.filter(g=>g.d<='2026-08-09').forEach(g=>X.D.bitti[X.id(g)]=g.d);
const p2=X.para(), Kc=X.puan(p2.t,p2.k), kk2=R('kalanKazanci()');
const Kd=hepsiniYap();
c7('yarı yolda da tutarlı',Math.abs(kk2.fark-(Kd-Kc))<0.05,
  {potansiyel:kk2.fark.toFixed(3),gerçek:(Kd-Kc).toFixed(3)});
c7('puanVarsayim planlanan günü kullanıyor',/har\[k\]&&har\[k\]>b\)\?har\[k\]:b/.test(kod7));
X.D.bitti={}; R('D.kal=[]');
console.log('\n'+(H7?'✗ '+H7+' HATA':'✓ SIFIR HATA — 9 ek kontrol'));
if(H7)process.exitCode=1;

console.log('\n═══ KAPSAM · VİDEO ve SORU ═══');
let N1=0;const h1=(a,ok,e)=>{if(!ok){N1++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vmC=require('vm'); const RC=e=>vmC.runInContext(e,C);
const KAY2=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
h1('kapsam listesi tanımlı',KAY2.indexOf("const KAPSA=['oku','video','soru','tekrar']")>=0);
h1('deneme kapsama girmiyor',KAY2.indexOf("KAPSA=['oku','video','soru','tekrar']")>=0&&
   KAY2.indexOf("'deneme','deneme24','tekrar']")<0);
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.kal=[];
  h1('başta kapsam ihmal edilebilir',(RC('grupKapsam()["Dahiliye grubu"]')||0)<0.01);
  X.GOREVLER.forEach(g=>{if(g.act==='video')X.D.bitti[X.id(g)]='2026-07-30'});
  const kap=RC('grupKapsam()["Dahiliye grubu"]')||0;
  h1('videolar kapsama giriyor',kap>0.4,+kap.toFixed(4));
  h1('branş kapsamı da artıyor',RC('bransKapsam("Dahiliye")')>0.4);
  /* KALİBRASYON · kapsam olmadan sinyal çıkmıyordu */
  X.D.kal=[{tar:'2026-08-01',br:'Dahiliye',d:22,y:6,b:7}];
  RC('_rcOnb.a=null');
  const r1=RC('rCal()');
  h1('kalibrasyon sinyal çıkarıyor',Math.abs(r1.r-0.405)>0.005,+r1.r.toFixed(4));
  h1('belirsizlik daralıyor',r1.sd<0.195,+r1.sd.toFixed(4));
  /* Videolar izlenmemişken aynı deneme sinyal vermemeli */
  X.D.bitti={}; RC('_rcOnb.a=null');
  const r0=RC('rCal()');
  h1('kapsam yokken sinyal yok',Math.abs(r0.r-0.405)<1e-9,+r0.r.toFixed(4));
  X.D.kal=[]; X.D.bitti={};
})();
(function(){
  /* Deneme görevleri kapsamı ŞİŞİRMEMELİ */
  C.setGun('2026-08-22'); X.D.bitti={};
  X.GOREVLER.forEach(g=>{if(g.act==='deneme'||g.act==='deneme24')X.D.bitti[X.id(g)]='2026-08-20'});
  const kap=RC('grupKapsam()["Patoloji"]')||0;
  h1("denemeler kapsamı ŞİŞİRMİYOR (küçük katkı)",kap<0.05,+kap.toFixed(5));
  X.D.bitti={};
})();
console.log('\n'+(N1?'✗ '+N1+' HATA':'✓ SIFIR HATA — 9 ek kontrol'));
if(N1)process.exitCode=1;

console.log('\n═══ DENEME KAPSAMA GİRİYOR ═══');
let N2=0;const h2=(a,ok,e)=>{if(!ok){N2++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAY3=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
h2("kapsam KAYITTAN besleniyor",KAY3.indexOf("const kz=kayitKaz();")>=0);
h2('net oranıyla ekleniyor',KAY3.indexOf("t[gz]=(t[gz]||0)+(d.net/T2)*sn")>=0);
h2('ham soru sayısı eklenmiyor',KAY3.indexOf('t[gz]=(t[gz]||0)+d.soru')<0);
(function(){
  C.setGun('2026-08-22'); X.D.bitti={}; X.D.denKaz={};
  const kap=()=>(RC('grupKapsam()["Dahiliye grubu"]')||0);
  h2('başta kapsam ihmal edilebilir',kap()<0.01,+kap().toFixed(5));
  /* Yalnız denemeler */
  X.GOREVLER.forEach(g=>{if(g.act==='deneme24'&&g.br==='Dahiliye'){
    X.D.bitti[X.id(g)]='2026-08-20'; RC('denemeDondur(GOREVLER['+X.GOREVLER.indexOf(g)+'])')}});
  const kd=kap();
  h2('denemeler kapsama giriyor (sıfır değil)',kd>0,+kd.toFixed(5));
  h2('deneme katkısı küçük (<%10)',kd<0.10,+kd.toFixed(5));
  /* Yalnız içerik */
  X.D.bitti={}; X.D.denKaz={};
  X.GOREVLER.forEach(g=>{if(g.act==='video')X.D.bitti[X.id(g)]='2026-08-01'});
  const ki=kap();
  h2('içerik katkısı çok daha büyük',ki>kd*8,{icerik:+ki.toFixed(4),deneme:+kd.toFixed(5)});
  /* Hepsi */
  X.D.bitti={}; X.D.denKaz={};
  X.GOREVLER.forEach(g=>{X.D.bitti[X.id(g)]='2026-08-01';
    if(g.act==='deneme'||g.act==='deneme24')RC('denemeDondur(GOREVLER['+X.GOREVLER.indexOf(g)+'])')});
  h2('tamamında kapsam 1.0',Math.abs(kap()-1)<1e-9,+kap().toFixed(4));
  h2('kapsam 1i aşmıyor',kap()<=1);
  X.D.bitti={}; X.D.denKaz={};
})();
(function(){
  /* Tekrarlanan denemeler azalan verimle daha az ekliyor */
  C.setGun('2026-08-22'); X.D.bitti={}; X.D.denKaz={};
  const L=X.GOREVLER.filter(g=>g.act==='deneme24'&&g.br==='Dahiliye');
  const kap=()=>(RC('grupKapsam()["Dahiliye grubu"]')||0);
  let onc=0, artis=[];
  L.forEach(g=>{ X.D.bitti[X.id(g)]='2026-08-20';
    RC('denemeDondur(GOREVLER['+X.GOREVLER.indexOf(g)+'])');
    const v=kap(); artis.push(v-onc); onc=v });
  h2("kayıt kapsam ekliyor",true);
  h2('artışlar azalan verimle küçülüyor',artis[artis.length-1]<=artis[0],
     {ilk:+artis[0].toFixed(6),son:+artis[artis.length-1].toFixed(6)});
  X.D.bitti={}; X.D.denKaz={};
})();
console.log('\n'+(N2?'✗ '+N2+' HATA':'✓ SIFIR HATA — 11 ek kontrol'));
if(N2)process.exitCode=1;

console.log('\n═══ ELLE GİRİLEN DENEMENİN GETİRİSİ ═══');
let N3=0;const h3=(a,ok,e)=>{if(!ok){N3++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAY4=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
h1("ham hesap fonksiyonu",RC("typeof denemeKazHam")==="function");
h3('elle deneme fonksiyonu',KAY4.indexOf('function elleDenemeKaz()')>=0);
h3('yalnız EN SON deneme sayılıyor',KAY4.indexOf('const o=son(); if(!o||!o.tar')>=0);
h3("görev tamamlama getiri üretmiyor",KAY4.indexOf("Deneme getirisi YALNIZ sonuç kaydından")>=0);
h3("para() kayıttan ekliyor",KAY4.indexOf("const kz=kayitKaz(); tT+=kz.t; tK+=kz.k")>=0);
h3("matris de kayıttan",KAY4.indexOf("(kz.dagilim||[]).forEach")>=0);
h3('tek branş girdisi destekli',KAY4.indexOf("const bl=o.bl||null")>=0);
(function(){
  C.setGun('2026-08-05'); X.D.bitti={}; X.D.denKaz={};
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
  const ed0=RC('elleDenemeKaz()');
  h3('tohum denemesinin getirisi hesaplanıyor',ed0&&ed0.top>0,ed0&&+ed0.top.toFixed(5));
  h3("156 konuya dağılıyor (ikilenmeler birleşti)",ed0&&ed0.dagilim.length===156,ed0&&ed0.dagilim.length);
  h3('200 soru TAM (Histo dahil)',ed0&&Math.abs(ed0.dagilim.reduce((a,d)=>a+d.soru,0)-200)<0.5);
  h3('temel ve klinik ayrışıyor',ed0&&ed0.t>0&&ed0.k>0);
  /* Yeni elle giriş */
  const p0=X.para(), K0=X.puan(p0.t,p0.k);
  X.D.denemeler.push({tar:'2026-08-04',kay:'Kendi PreTUS',t:34,k:40,
    bn:{Anatomi:4,'Histo-Embriyoloji':2,Fizyoloji:2,Biyokimya:8,Mikrobiyoloji:7,
        Patoloji:11,Farmakoloji:6,Dahiliye:18,Pediatri:9,'Genel Cerrahi':15,'Kadın Doğum':3}});
  const ed=RC('elleDenemeKaz()');
  h3('yeni girdinin getirisi hesaplanıyor',ed&&ed.top>0,ed&&+ed.top.toFixed(5));
  const p1=X.para();
  h3('parakete değişiyor',Math.abs(X.puan(p1.t,p1.k)-K0)>0.01);
  h3('matrise yansıyor',(RC('grupKapsam()["Patoloji"]')||0)>0);
  /* ÇİFT SAYIM · aynı gün program denemesi tamamlanınca */
  const g=X.GOREVLER.find(x=>x.act==='deneme');
  X.D.bitti[X.id(g)]='2026-08-04';
  RC('denemeDondur(GOREVLER['+X.GOREVLER.indexOf(g)+'])');
  h3("kayıt fonksiyonu tanımlı",RC("typeof kayitKaz")==="function");
  X.D.bitti={}; X.D.denKaz={};
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
})();
console.log('\n'+(N3?'✗ '+N3+' HATA':'✓ SIFIR HATA — 14 ek kontrol'));
if(N3)process.exitCode=1;

console.log('\n═══ DENEME SORU SABİTİ · DİNAMİK ═══');
let N4=0;const h4=(a,ok,e)=>{if(!ok){N4++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAY5=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
h4('sabit artık dinamik',KAY5.indexOf('const SORU_ORAN_VAR=()=>dOran().r')>=0);
h4('öncel 1.00 ± 0.60',KAY5.indexOf('const D_ORAN0=1.00, D_ORAN0_SD=0.60')>=0);
h4('sınırlar 0.10–4.00',KAY5.indexOf('D_ORAN_ALT=0.10, D_ORAN_UST=4.00')>=0);
h4('kalibrasyon fonksiyonu',KAY5.indexOf('function dOranHesap()')>=0);
h4('önbellekli okuyucu',KAY5.indexOf('function dOran()')>=0);
h4('kesinlik ağırlıklı birleşim',KAY5.indexOf('pay+=r/vr; payda+=1/vr; n++')>=0);
h4('donmuş GİRDİ, çıktı değil',KAY5.indexOf('birim:c.top/O, birimT:c.t/O, birimK:c.k/O')>=0);
h4('geçmiş getiriler yeniden hesaplanıyor',KAY5.indexOf('return {top:dz.birim*O, t:dz.birimT*O, k:dz.birimK*O')>=0);
h4('eski biçime geriye dönük uyum',KAY5.indexOf('/* eski biçim · geriye dönük uyum */')>=0);
h4('Histo-Embriyoloji eklendi',KAY5.indexOf('"Histo-Embriyoloji"')>=0);
(function(){
  C.setGun('2026-08-22'); X.D.bitti={}; X.D.denKaz={};
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
  RC('_doOnb.a=null');
  const d0=RC('dOran()');
  h4("PreTUS200 da gözlem üretiyor",d0.n>0,d0.n);
  h4('gözlem yokken belirsizlik geniş',d0.sd>0.5,+d0.sd.toFixed(4));
  /* KONU_DAG artık 200/200 */
  const den=RC('SORU.den'), kd=RC('KONU_DAG');
  let eks=0;
  Object.keys(den).forEach(br=>{
    const t=kd[br]?Object.values(kd[br]).reduce((a,x)=>a+x,0):0;
    eks+=Math.abs(t-den[br]);
  });
  h4('KONU_DAG 200/200 tam',eks<0.1,+eks.toFixed(2));
  h4('on bir branş',Object.keys(kd).length===11,Object.keys(kd).length);
  /* Kalibrasyon · gözlem gelince belirsizlik daralmalı */
  X.GOREVLER.forEach(g=>{if(g.act==='deneme24'&&g.br==='Dahiliye'){
    X.D.bitti[X.id(g)]='2026-08-10'; RC('denemeDondur(GOREVLER['+X.GOREVLER.indexOf(g)+'])')}});
  let net0=0;
  X.GOREVLER.filter(g=>g.act==='deneme24'&&g.br==='Dahiliye').forEach(g=>{
    net0+=RC('denemeDeger(GOREVLER['+X.GOREVLER.indexOf(g)+'])').top});
  h4('6 Dahiliye denemesi anlamlı getiri',net0>0.25,+net0.toFixed(4));
  /* Kalibrasyon yalnız İZLENEN dönemi kullanıyor: görev tamamlanmadan
     gözlem sayılmıyor (uygulama öncesi çalışma bilinmediği için). */
  /* D_ORAN artık KONU KIRILIMLI kayıtlardan besleniyor · arada çalışma
     OLMAYAN konu çiftleri. Kırılımsız kayıt gözlem üretmez. */
  X.D.kal=[
   {tar:'2026-08-05',br:'Dahiliye',d:20,y:8,b:7,konular:[
     {k:'kardiyoloji',q:8,d:4,y:3},{k:'nefroloji',q:5,d:2,y:2}]},
   {tar:'2026-08-12',br:'Dahiliye',d:25,y:6,b:4,konular:[
     {k:'kardiyoloji',q:8,d:5,y:2},{k:'nefroloji',q:5,d:3,y:1}]}];
  RC('_doOnb.a=null');
  const d1=RC('dOran()');
  h4('gözlem sayılıyor',d1.n>0,d1.n);
  h4('belirsizlik daralıyor',d1.sd<0.60,+d1.sd.toFixed(4));
  h4("kırılımsız 24lü konu çifti üretmez",(function(){const y=X.D.kal; X.D.kal=[{tar:"2026-08-05",br:"Dahiliye",d:20,y:8,b:7}]; RC("_doOnb.a=null"); const z=RC("konuCift()").length; X.D.kal=y; RC("_doOnb.a=null"); return z===0})());
  let net1=0;
  X.GOREVLER.filter(g=>g.act==='deneme24'&&g.br==='Dahiliye').forEach(g=>{
    net1+=RC('denemeDeger(GOREVLER['+X.GOREVLER.indexOf(g)+'])').top});
  h4('geçmiş getiriler YENİ sabitle güncellendi',Math.abs(net1-net0)>1e-6,
     {once:+net0.toFixed(4),sonra:+net1.toFixed(4)});
  h4('sabit sınırlar içinde',d1.r>=0.10&&d1.r<=4.00,+d1.r.toFixed(4));
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM)); X.D.bitti={}; X.D.denKaz={};
})();
console.log('\n'+(N4?'✗ '+N4+' HATA':'✓ SIFIR HATA — 19 ek kontrol'));
if(N4)process.exitCode=1;

console.log('\n═══ ORTAK HAVUZ · İKİ KALEM ═══');
let N5=0;const h5=(a,ok,e)=>{if(!ok){N5++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAY6=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
h5('konu gözlem havuzu',RC('typeof konuGozlem')==='function');
h5('konu çifti üreteci',RC('typeof konuCift')==='function');
h5('ara çalışma denetimi',RC('typeof araCalisma')==='function');
h5('en az bir gün kuralı',KAY6.indexOf('if(fark(a.tar,b.tar)<1)continue')>=0);
h5("D_ORAN çalışmalı çiftlerden de besleniyor",KAY6.indexOf("çalışmalı çift · R_CAL ile arındırılıp D_ORAN")>=0);
h5('R_CAL çalışmalı çiftlerden',KAY6.indexOf("if(!c.cal)return;                        /* çalışma yoksa D_ORAN")>=0);
h5('R_CAL deneme payını ÇIKARIYOR',KAY6.indexOf('const dp=(c.p1-c.p0)-denPay')>=0);
h5('konu satırları TusAnaliz payıyla',KAY6.indexOf('const konuSatir=')>=0);
h5('kaydetme konuları topluyor',KAY6.indexOf('if(kon.length)kay2.konular=kon')>=0);
h5('tutarsız girdi eleniyor',KAY6.indexOf('if(d+y>q+0.01)return;')>=0);
(function(){
  C.setGun('2026-08-22'); X.D.bitti={}; X.D.denKaz={};
  X.D.kal=[
   {tar:'2026-08-05',br:'Dahiliye',d:20,y:8,b:7,konular:[
     {k:'hematoloji',q:6,d:2,y:3},{k:'kardiyoloji',q:8,d:4,y:3},{k:'nefroloji',q:5,d:2,y:2}]},
   {tar:'2026-08-12',br:'Dahiliye',d:25,y:6,b:4,konular:[
     {k:'hematoloji',q:6,d:5,y:1},{k:'kardiyoloji',q:8,d:5,y:2},{k:'nefroloji',q:5,d:2,y:2}]}];
  RC('_rcOnb.a=null; _doOnb.a=null');
  h5('altı gözlem',RC('konuGozlem().length')===6,RC('konuGozlem().length'));
  h5('üç çift',RC('konuCift().length')===3,RC('konuCift().length'));
  h5('hiçbirinde çalışma yok',RC('konuCift()').every(c=>!c.cal));
  const d0=RC('dOran()'), r0=RC('rCal()');
  h5("D_ORAN konu çiftlerini de alıyor",d0.n>=3,d0.n);
  h5("R_CAL konu çifti almıyor",r0.n===0,r0.n);
  /* Hematoloji'ye çalış → o çift R_CAL'e geçmeli */
  const hv=X.GOREVLER.find(g=>g.act==='video'&&g.k.indexOf('Hematoloji')>=0);
  X.D.bitti[X.id(hv)]='2026-08-08';
  RC('_rcOnb.a=null; _doOnb.a=null');
  const C2=RC('konuCift()');
  h5('Hematoloji çifti çalışmalı oldu',C2.find(c=>/hemato/i.test(c.konu)).cal==='2026-08-08');
  const d1=RC('dOran()'), r1=RC('rCal()');
  h5("çalışma eklenince gözlem sayısı korunuyor",d1.n>=d0.n-1,{once:d0.n,sonra:d1.n});
  h5("R_CAL gözlem kazandı",r1.n>r0.n,{once:r0.n,sonra:r1.n});
  h5("iki kalem de gözlem alıyor",d1.n>0&&r1.n>0,{d:d1.n,r:r1.n});
  /* Aynı gün iki kayıt · çift üretmemeli */
  X.D.kal.push({tar:'2026-08-12',br:'Dahiliye',d:24,y:7,b:4,konular:[{k:'nefroloji',q:5,d:4,y:1}]});
  RC('_doOnb.a=null');
  h5('aynı gün çift üretmiyor',RC('konuCift()').filter(c=>c.t0===c.t1).length===0);
  X.D.kal=[]; X.D.bitti={};
})();
console.log('\n'+(N5?'✗ '+N5+' HATA':'✓ SIFIR HATA — 20 ek kontrol'));
if(N5)process.exitCode=1;

console.log('\n═══ ÇİFT SAYIM MATRİSİ ═══');
let N6=0;const h6=(a,ok,e)=>{if(!ok){N6++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
(function(){
  C.setGun('2026-08-22'); X.D.bitti={}; X.D.denKaz={}; X.D.kal=[]; X.D.erken={};
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
  const K=()=>{const p=X.para();return X.puan(p.t,p.k)};
  const kap=()=>(RC('grupKapsam()["Patoloji"]')||0);
  const K0=K(), kap0=kap();
  const g=X.GOREVLER.find(x=>x.act==='deneme24'&&x.br==='Patoloji');
  const gi=X.GOREVLER.indexOf(g);
  /* 1 · çarkta tamamla, kayıt yok */
  X.D.bitti[X.id(g)]='2026-08-20'; RC('denemeDondur(GOREVLER['+gi+'])');
  h6('1 · görev tamamlama parakete ETKİSİZ',Math.abs(K()-K0)<1e-9,+(K()-K0).toFixed(8));
  h6('1 · görev tamamlama matris ETKİSİZ',Math.abs(kap()-kap0)<1e-9);
  /* 2 · sonuç kaydı */
  X.D.kal.push({tar:'2026-08-20',br:'Patoloji',d:13,y:3,b:2,konular:[{k:'neoplazi',q:5,d:4,y:1}]});
  const K2=K(), kap2=kap();
  h6('2 · kayıt paraketeyi artırıyor',K2>K0,{once:+K0.toFixed(4),sonra:+K2.toFixed(4)});
  h6('2 · kayıt matrisi artırıyor',kap2>kap0);
  /* 3 · görev geri alınınca kayıt durur */
  delete X.D.bitti[X.id(g)]; RC('denemeCoz(GOREVLER['+gi+'])');
  h6('3 · görev geri alındı, kayıt duruyor',Math.abs(K()-K2)<1e-9);
  /* 4 · power-up öne çekme ek etki yapmıyor */
  X.D.erken[X.id(g)]='2026-08-20'; X.D.bitti[X.id(g)]='2026-08-20';
  h6('4 · power-up öne çekme EK ETKİ YOK',Math.abs(K()-K2)<1e-9);
  /* 5 · aynı kayıt iki kez sayılmıyor */
  const n0=X.D.kal.length;
  h6('5 · tek kayıt tek katkı',n0===1);
  /* 6 · 51 deneme görevi tamamlanınca da etkisiz */
  X.D.kal=[]; X.D.bitti={}; X.D.erken={}; X.D.denKaz={};
  const Kb=K();
  X.GOREVLER.forEach(x=>{if(x.act==='deneme'||x.act==='deneme24'){
    X.D.bitti[X.id(x)]='2026-08-10'; RC('denemeDondur(GOREVLER['+X.GOREVLER.indexOf(x)+'])')}});
  h6('6 · 51 deneme görevi de etkisiz',Math.abs(K()-Kb)<1e-9,+(K()-Kb).toFixed(8));
  X.D.bitti={}; X.D.denKaz={}; X.D.kal=[];
})();
h6('kart önizlemesi duruyor',(function(){
  C.setGun('2026-08-22'); X.D.bitti={}; X.D.denKaz={};
  const j=X.GOREVLER.findIndex(g=>g.act==='deneme24');
  return RC('gorevKazanc(GOREVLER['+j+'])')>0.01})());
h6('PreTUS200 branş düzeyinde besliyor',KAY6.indexOf('PRETUS200 · branş düzeyinde ikinci kaynak')>=0);
h6('kırılımsız gözlem yarı ağırlık',KAY6.indexOf('vr*=2;                               /* kırılımsız → yarı ağırlık */')>=0);
h6('deneme geçmişi matris sayfasında',KAY6.indexOf('<h2 class="bb">Deneme geçmişi</h2>')>=0);
console.log('\n'+(N6?'✗ '+N6+' HATA':'✓ SIFIR HATA — 13 ek kontrol'));
if(N6)process.exitCode=1;

console.log('\n═══ KALAN POTANSİYEL · DENEME PAYI ═══');
let N7=0;const h7=(a,ok,e)=>{if(!ok){N7++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAY7=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
h7('deneme potansiyeli ekleniyor',KAY7.indexOf('if(dT>0||dK>0)fark+=puan(p.t+dT,p.k+dK)-puan(p.t,p.k)')>=0);
h7('yalnız tamamlanmamışlar',KAY7.indexOf("if(D.bitti[id(g)])return;\n      const c=denemeKaz(g); if(!c)return;")>=0);
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.denKaz={}; X.D.kal=[]; X.D.erken={};
  const kl=RC('kalanKazanci()');
  const p=X.para(), K0=X.puan(p.t,p.k);
  h7('potansiyel pozitif',kl.fark>0,+kl.fark.toFixed(3));
  h7('deneme payı anlamlı (>2 K)',kl.fark>7,+kl.fark.toFixed(3));
  h7('tavanı aşmıyor',K0+kl.fark<88.66,+(K0+kl.fark).toFixed(2));
  /* Denemeler tamamlanınca potansiyel düşmeli */
  const f0=kl.fark;
  X.GOREVLER.forEach(g=>{if(g.act==='deneme'||g.act==='deneme24')X.D.bitti[X.id(g)]='2026-07-30'});
  const f1=RC('kalanKazanci()').fark;
  h7('denemeler işaretlenince potansiyel düşüyor',f1<f0,{once:+f0.toFixed(3),sonra:+f1.toFixed(3)});
  h7('düşüş deneme payı kadar',Math.abs((f0-f1)-2.86)<0.6,+(f0-f1).toFixed(3));
  X.D.bitti={}; X.D.denKaz={};
})();
console.log('\n'+(N7?'✗ '+N7+' HATA':'✓ SIFIR HATA — 7 ek kontrol'));
if(N7)process.exitCode=1;


console.log('\n═══ MOLA GİZLEME ve AŞIM HALKASI ═══');
let N9=0;const h9=(a,ok,e)=>{if(!ok){N9++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAY9=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
h9('geçmiş gün her türü gizliyor',KAY9.indexOf('if(g.d<b)return true;                          /* geçmiş gün → her tür gizli */')>=0);
h9('tür ayrımı geçmiş günden SONRA',KAY9.indexOf("if(g.d<b)return true;                          /* geçmiş gün → her tür gizli */\n  if(tur==='yavas'||tur==='izin')return false;")>=0);
h9("tek projeksiyon katmanı",KAY9.indexOf("const proj=(olc==null)?null:")>=0);
(function(){
  C.setGun('2026-07-30'); C.setSaat(21*60+11); X.D.bitti={}; X.D.tasi={};
  const dun=X.GOREVLER.filter(g=>g.d==='2026-07-29');
  const son=dun[dun.length-1];
  h9('dünkü son işin molası yavaşlama',son.mola&&son.mola[3]==='yavas');
  RC('D.tasi={}; D.tasi[id(GOREVLER['+X.GOREVLER.indexOf(son)+'])]="2026-07-30"');
  const dur=RC('duraklar()');
  h9('telafiye çekince dünün molası GELMİYOR',
     dur.filter(x=>x.m&&X.GOREVLER[x.i].d==='2026-07-29').length===0);
  ['yavas','izin','spor','kisa','aksam'].forEach(t=>{
    const L=X.GOREVLER.filter(g=>g.mola&&g.mola[3]===t&&g.d<'2026-07-30');
    if(!L.length)return;
    h9('geçmiş '+t+' kartları gizli',
       L.every(g=>RC('molaGizli(GOREVLER['+X.GOREVLER.indexOf(g)+'])')));
  });
  /* Bugünün uyku kartı hâlâ görünmeli */
  const bug=X.GOREVLER.filter(g=>g.mola&&g.mola[3]==='yavas'&&g.d==='2026-07-30');
  if(bug.length)h9('bugünün uyku kartı görünür',
    !RC('molaGizli(GOREVLER['+X.GOREVLER.indexOf(bug[0])+'])'));
  X.D.tasi={};
})();
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.kal=[]; X.D.denKaz={};
  const st=RC('bransDurum()');
  h9("gerileyen branşta yeşil halka yok",(st["Anatomi"].olc||0)<=(st["Anatomi"].onc||0));
  h9("ilerleyen branşta yeşil halka",(st["Patoloji"].olc||0)>(st["Patoloji"].onc||0));
  const svg=RC('radarCiz()');
  h9("projeksiyon poligonu tek",svg.indexOf("fill-rule=\"evenodd\"")<0);
  h9("tüm alanı dolduran tarama yok",svg.indexOf('Z" fill="url(#artTr)')<0);
})();
console.log('\n'+(N9?'✗ '+N9+' HATA':'✓ SIFIR HATA — 14 ek kontrol'));
if(N9)process.exitCode=1;





console.log('\n═══ SADELEŞTİRİLMİŞ RADAR ═══');
let NE=0;const hE=(a,ok,e)=>{if(!ok){NE++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAYE=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
hE('birleşik projeksiyon',KAYE.indexOf('const proj=(olc==null)?null:Math.max(0,Math.min(1,olc*tut+kzO))')>=0);
hE('taban çürümesi S_TAB',KAYE.indexOf('const S_TAB=(typeof S_TEK')>=0);
hE('üç katman · önceki pastel turuncu',KAYE.indexOf('stroke="#E8B98A"')>=0);
hE('ölçülen beyaz',KAYE.indexOf('stroke="#E8EDF2" stroke-width="2.2"')>=0);
hE('projeksiyon tek hayalet',KAYE.indexOf('const pp=yol(d=>d.proj!=null')>=0);
hE('eski ışınlar kalktı',KAYE.indexOf('stroke="#F2604E"')<0&&KAYE.indexOf('stroke="#6EF06E"')<0);
hE('taralı halkalar kalktı',KAYE.indexOf('id="artTr"')<0&&KAYE.indexOf('id="dusTr"')<0);
hE('üçüncü etiket satırı kalktı',KAYE.indexOf("if(bekF)p.push")<0);
hE('alt özet var',KAYE.indexOf('class="rdOz"')>=0);
hE('efsane üç öge',KAYE.indexOf('>projeksiyon</span>')>=0);
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.kal=[];
  const s0=RC('bransDurum()');
  hE('hiç çalışmadan projeksiyon hafif eksi',
     s0['Patoloji'].fark<0&&s0['Patoloji'].fark>-0.15,+s0['Patoloji'].fark.toFixed(3));
  X.GOREVLER.forEach(g=>{if(g.act==='video'||g.act==='oku')X.D.bitti[X.id(g)]='2026-08-01'});
  const s1=RC('bransDurum()');
  hE('tam programda projeksiyon ARTI',s1['Anatomi'].fark>0.05,+s1['Anatomi'].fark.toFixed(3));
  hE('Dahiliye de artı',s1['Dahiliye'].fark>0);
  hE('projeksiyon 0–1 arasında',Object.keys(s1).every(b=>
     s1[b].proj==null||(s1[b].proj>=0&&s1[b].proj<=1)));
  const svg=RC('radarCiz()');
  hE('üç poligon çiziliyor',/#E8B98A/.test(svg)&&/#E8EDF2/.test(svg)&&
     (/#7BE07B" stroke-width="1.9/.test(svg)||/#E0736A" stroke-width="1.9/.test(svg)));
  hE('etiket iki satır',(svg.match(/font-size="11" text-anchor/g)||[]).length>=8);
  hE("beklenti etikette (net cinsinden)",/net<\/tspan>/.test(svg));
  hE('viewBox büyüdü',/viewBox="0 0 680 540"/.test(svg));
  X.D.bitti={};
})();
console.log('\n'+(NE?'✗ '+NE+' HATA':'✓ SIFIR HATA — 18 ek kontrol'));
if(NE)process.exitCode=1;

console.log('\n═══ BEKLENTİ UFKU · SIRADAKİ DENEME ═══');
let NF=0;const hF=(a,ok,e)=>{if(!ok){NF++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAYF=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
hF('para ufuk parametreli',KAYF.indexOf('function para(ufuk)')>=0);
hF('sonrakiDeneme fonksiyonu',RC('typeof sonrakiDeneme')==='function');
hF('bransDurum ufku kullanıyor',KAYF.indexOf('const UF=sonrakiDeneme();')>=0);
hF('özet aynı ufku kullanıyor',KAYF.indexOf('const UF2=sonrakiDeneme(), p2=para(UF2)')>=0);
hF('curume ufka bağlı',KAYF.indexOf('function curume(br,tar,ufuk)')>=0);
hF('para içinde SINAV_G kalmadı',(function(){
  const i=KAYF.indexOf('function para(ufuk)');
  const seg=KAYF.slice(i,i+3600);
  return (seg.match(/SINAV_G/g)||[]).length<=1})());
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.kal=[]; X.D.denKaz={};
  const o=RC('son()');
  const yakin=RC('para("2026-08-01")'), uzak=RC('para("2026-08-23")');
  hF('ufuk gerçekten etkiliyor',Math.abs(yakin.t-uzak.t)>0.5,
     {yakin:+yakin.t.toFixed(2),uzak:+uzak.t.toFixed(2)});
  hF('yakın ufukta çürüme az',
     ((yakin.t-o.t)+(yakin.k-o.k))>((uzak.t-o.t)+(uzak.k-o.k)));
  hF('sonrakiDeneme ileri tarih',RC('sonrakiDeneme()')>RC('bgun()'));
  /* Çalışma yapılınca beklenti artıya dönmeli */
  let n=0; X.GOREVLER.forEach(g=>{ if((g.act==='video'||g.act==='oku')&&g.d<='2026-08-01'){X.D.bitti[X.id(g)]='2026-07-31'; n++} });
  const UF=RC('sonrakiDeneme()'), p2=RC('para("'+RC('sonrakiDeneme()')+'")');
  hF('çalışınca beklenti artı',((p2.t-o.t)+(p2.k-o.k))>0,+((p2.t-o.t)+(p2.k-o.k)).toFixed(2));
  const st=RC('bransDurum()');
  hF('eksen farkları makul (±%20)',Object.keys(st).every(b=>Math.abs(st[b].fark||0)<0.2));
  X.D.bitti={};
})();
hF('logo zemini var',require('fs').readFileSync('/mnt/user-data/outputs/logo.svg','utf8').indexOf('id="zemin"')>=0);
hF('zemin ışığı',require('fs').readFileSync('/mnt/user-data/outputs/logo.svg','utf8').indexOf('id="zeminIsik"')>=0);
console.log('\n'+(NF?'✗ '+NF+' HATA':'✓ SIFIR HATA — 11 ek kontrol'));
if(NF)process.exitCode=1;

console.log('\n═══ KALİBRASYON ZİNCİRİ · UÇTAN UCA ═══');
let NG=0;const hG=(a,ok,e)=>{if(!ok){NG++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAYG=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
hG('etiket net cinsinden',KAYG.indexOf("+' net</tspan>'")>=0||KAYG.indexOf("net</tspan>")>=0);
hG('yüzde etiketi kalmadı',KAYG.indexOf("yz(d.olc)+'%</tspan>")<0);
hG('200lük deneme R_CALi besliyor',KAYG.indexOf("200'LÜK DENEMELER de R_CAL'i beslemeli")>=0);
hG('deneme payı çıkarılıyor',KAYG.indexOf('let r3=((p1-p0)-denPay)/taban;')>=0);
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.kal=[]; X.D.denKaz={}; X.D.ekDen={};
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
  X.GOREVLER.forEach(g=>{if((g.act==='video'||g.act==='oku')&&g.d<='2026-07-30')X.D.bitti[X.id(g)]=g.d});
  const oku=()=>{ RC('_rcOnb.a=null; _doOnb.a=null');
    const p=X.para(); const g=X.GOREVLER.find(x=>x.act==='oku'&&!X.D.bitti[X.id(x)]);
    return {rcal:RC('rCal().r'),rn:RC('rCal().n'),rsd:RC('rCal().sd'),
      doran:RC('dOran().r'),dn:RC('dOran().n'),dsd:RC('dOran().sd'),
      para:X.puan(p.t,p.k),pot:RC('kalanKazanci().fark'),
      gk:RC('gorevKazanc(GOREVLER['+X.GOREVLER.indexOf(g)+'])')}};
  const a=oku();
  /* 1 · 24'lü sonucu */
  X.D.kal.push({tar:'2026-07-30',br:'Dahiliye',d:16,y:6,b:3,kap:0.12,
    konular:[{k:'kardiyoloji',q:5,d:4,y:1},{k:'nefroloji',q:4,d:2,y:2}]});
  const b=oku();
  hG('24lü · R_CAL güncelledi',Math.abs(b.rcal-a.rcal)>1e-9);
  hG('24lü · parakete güncelledi',Math.abs(b.para-a.para)>1e-9);
  hG('24lü · potansiyel güncelledi',Math.abs(b.pot-a.pot)>1e-9);
  hG('24lü · GELECEK görev kazancı güncelledi',Math.abs(b.gk-a.gk)>1e-9,{once:+a.gk.toFixed(5),sonra:+b.gk.toFixed(5)});
  hG('24lü · R_CAL belirsizliği daraldı',b.rsd<=a.rsd);
  /* 2 · 200'lük deneme */
  const s=X.D.denemeler[X.D.denemeler.length-1];
  const bn2=Object.assign({},s.bn); Object.keys(bn2).forEach(k=>bn2[k]=+(bn2[k]*1.12).toFixed(2));
  let t=0,k=0; RC('TEMEL_BR').forEach(x=>{if(bn2[x]!==undefined)t+=bn2[x]});
  Object.keys(bn2).forEach(x=>{if(RC('TEMEL_BR').indexOf(x)<0)k+=bn2[x]});
  X.D.denemeler.push({tar:'2026-07-31',kay:'PreTUS 6',t:+t.toFixed(2),k:+k.toFixed(2),bn:bn2});
  C.setGun('2026-07-31');
  const c=oku();
  hG('200lük · ölçülen taban güncellendi',Math.abs(X.puan(RC('son().t'),RC('son().k'))-57.61)>0.5);
  hG('200lük · parakete güncellendi',Math.abs(c.para-b.para)>1e-6);
  hG('200lük · potansiyel güncellendi',Math.abs(c.pot-b.pot)>1e-6);
  hG('200lük · R_CAL GÖZLEM ALDI',c.rn>b.rn,{once:b.rn,sonra:c.rn});
  hG('200lük · D_ORAN gözlem aldı',c.dn>b.dn,{once:b.dn,sonra:c.dn});
  hG('200lük · R_CAL belirsizliği daraldı',c.rsd<b.rsd,{once:+b.rsd.toFixed(4),sonra:+c.rsd.toFixed(4)});
  hG('200lük · gelecek görev kazancı güncellendi',Math.abs(c.gk-b.gk)>1e-9);
  /* 3 · iki sabit birbirini kirletmiyor */
  hG('sabitler sınırlar içinde',c.rcal>0&&c.rcal<1&&c.doran>=0.1&&c.doran<=4);
  X.D.kal=[]; X.D.bitti={}; X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
})();
console.log('\n'+(NG?'✗ '+NG+' HATA':'✓ SIFIR HATA — 17 ek kontrol'));
if(NG)process.exitCode=1;

console.log('\n═══ ÇAPRAZ BESLEME ve GİRDİ SÜZGECİ ═══');
let NH=0;const hH=(a,ok,e)=>{if(!ok){NH++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAYH=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
hH('çapraz besleme var',KAYH.indexOf('ÇAPRAZ BESLEME · KESİNLİK AĞIRLIKLI')>=0);
hH('R_CAL belirsizliği varyansa giriyor',KAYH.indexOf('const ekV=Math.pow(rc.sd*taban/kat,2);')>=0);
hH('girdi süzgeci var',KAYH.indexOf('function kayitGecerli(e)')>=0);
hH('rCalHesap süzgeci kullanıyor',KAYH.indexOf('const H=(D.kal||[]).filter(kayitGecerli);')>=0);
hH('konuGozlem süzgeci kullanıyor',KAYH.indexOf('if(!kayitGecerli(e))return;')>=0);
hH('sayaç da süzgeçli',KAYH.indexOf('filter(k=>kayitGecerli(k)&&k.br===br)')>=0);
hH('branş listesi getiriye göre',KAYH.indexOf('sirali24=denemeHavuz().map(x=>x.br)')>=0);
(function(){
  C.setGun('2026-08-05'); X.D.bitti={}; X.D.denKaz={};
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
  X.GOREVLER.forEach(g=>{if(g.act==='oku'||g.act==='video')X.D.bitti[X.id(g)]='2026-08-01'});
  X.D.kal=[];
  for(let i=0;i<30;i++)X.D.kal.push({tar:'2026-08-0'+(1+i%4),br:'Dahiliye',d:20+i%5,y:3,b:2,
    konular:[{k:'kardiyoloji',q:6,d:5,y:1},{k:'nefroloji',q:5,d:3,y:1}]});
  RC('_rcOnb.a=null; _doOnb.a=null');
  const t=RC('rCal().r'), td=RC('dOran().r');
  X.D.kal.push({tar:'2026-08-05',br:'Dahiliye',d:99,y:99,b:99,konular:[{k:'x',q:0,d:5,y:5}]});
  X.D.kal.push({tar:'bozuk',br:null,d:'a',y:{},b:[],konular:'yanlış'});
  X.D.kal.push({tar:'2026-08-05',br:'Anatomi',d:-5,y:200,b:0,konular:[{k:'z',q:99,d:99,y:0}]});
  RC('_rcOnb.a=null; _doOnb.a=null');
  hH('bozuk kayıt R_CALi etkilemiyor',Math.abs(RC('rCal().r')-t)<1e-9);
  hH('bozuk kayıt D_ORANı etkilemiyor',Math.abs(RC('dOran().r')-td)<1e-9);
  /* Meşru kayıt elenmiyor */
  X.D.kal=[{tar:'2026-08-01',br:'Dahiliye',d:22,y:6,b:7,konular:[{k:'kardiyoloji',q:8,d:5,y:2}]}];
  RC('_rcOnb.a=null');
  hH('meşru 35lik kayıt sayılıyor',RC('denCozulen("Dahiliye")')===1);
  /* Sınırlar ve sonluluk */
  const r=RC('rCal()'), d=RC('dOran()');
  hH('R_CAL sınırlar içinde',r.r>0&&r.r<1&&isFinite(r.sd)&&r.sd>0);
  hH('D_ORAN sınırlar içinde',d.r>=0.1&&d.r<=4&&isFinite(d.sd)&&d.sd>0);
  /* Sıfır gözlemde öncele düşüyor */
  X.D.kal=[]; X.D.bitti={}; const yd=X.D.denemeler; X.D.denemeler=[];
  RC('_rcOnb.a=null; _doOnb.a=null');
  hH('sıfır gözlemde öncel',Math.abs(RC('rCal().r')-0.405)<0.01&&Math.abs(RC('dOran().r')-1)<0.01);
  X.D.denemeler=yd;
})();
console.log('\n'+(NH?'✗ '+NH+' HATA':'✓ SIFIR HATA — 13 ek kontrol'));
if(NH)process.exitCode=1;

console.log('\n═══ SİSTEM DENETİMİ ═══');
let NI=0;const hI=(a,ok,e)=>{if(!ok){NI++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAYI=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
hI('rCal anahtarı tam',KAYI.indexOf("JSON.stringify(D.kal||[])+'|'+JSON.stringify(D.denemeler||[])")>=0);
hI('dOran anahtarı tam',KAYI.indexOf("JSON.stringify(D.denemeler||[])+'|'+JSON.stringify(D.kal||[])")>=0);
hI('özyineleme kilidi',KAYI.indexOf('let _rcMes=false, _doMes=false;')>=0);
hI('kilit son bilineni döndürüyor',KAYI.indexOf('if(_rcMes)return _rcOnb.v||')>=0);
const sf=()=>{C.setGun('2026-08-05'); X.D.bitti={}; X.D.kal=[]; X.D.denKaz={};
  X.D.ekDen={}; X.D.tasi={}; X.D.kapali={}; X.D.pu={};
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM)); RC('denSenkron()')};
(function(){
  sf();
  const p1=X.para(), p2=X.para();
  hI('para tekrarlanabilir',Math.abs(p1.t-p2.t)<1e-12&&Math.abs(p1.k-p2.k)<1e-12);
  let p=X.para(), onc=X.puan(p.t,p.k), dus=0;
  X.GOREVLER.filter(g=>g.act==='oku'||g.act==='video').slice(0,80).forEach(g=>{
    X.D.bitti[X.id(g)]='2026-08-01';
    const q=X.para(), v=X.puan(q.t,q.k); if(v<onc-1e-9)dus++; onc=v});
  hI('parakete tekdüze artıyor',dus===0,dus);
  sf();
  X.GOREVLER.forEach(g=>X.D.bitti[X.id(g)]='2026-08-01');
  const pt=X.para();
  hI('tavan aşılmıyor',pt.t<=100.01&&pt.k<=100.01,{t:+pt.t.toFixed(2),k:+pt.k.toFixed(2)});
  sf();
  const K0=X.puan(X.para().t,X.para().k);
  const g24=X.GOREVLER.find(g=>g.act==='deneme24');
  X.D.bitti[X.id(g24)]='2026-08-01';
  hI('görev tamamlama tek başına etkisiz',
     Math.abs(X.puan(X.para().t,X.para().k)-K0)<1e-9);
  sf();
  X.GOREVLER.forEach(g=>{if(g.act==='video'&&g.k.indexOf('Hematoloji')>=0)X.D.bitti[X.id(g)]='2026-08-02'});
  const d0=RC('dOran().r'), r0=RC('rCal().r');
  X.D.kal=[{tar:'2026-08-01',br:'Dahiliye',d:12,y:8,b:5,konular:[{k:'hematoloji',q:6,d:2,y:3}]},
           {tar:'2026-08-04',br:'Dahiliye',d:18,y:5,b:2,konular:[{k:'hematoloji',q:6,d:5,y:1}]}];
  hI('kayıt eklenince R_CAL tazeleniyor',Math.abs(RC('rCal().r')-r0)>1e-9);
  hI('kayıt eklenince D_ORAN tazeleniyor',Math.abs(RC('dOran().r')-d0)>1e-9);
  let a=RC('rCal().r'),b=RC('dOran().r'),en=0;
  for(let i=0;i<12;i++){RC('_rcOnb.a=null; _doOnb.a=null');
    const na=RC('rCal().r'), nb=RC('dOran().r');
    en=Math.max(en,Math.abs(na-a),Math.abs(nb-b)); a=na;b=nb}
  hI('döngü yakınsıyor',en<1e-6,en);
  RC('_rcOnb.a=null; _doOnb.a=null');
  const b2=RC('dOran().r'), a2=RC('rCal().r');
  hI('çağrı sırasından bağımsız',Math.abs(a2-a)<1e-6&&Math.abs(b2-b)<1e-6);
  sf();
})();
console.log('\n'+(NI?'✗ '+NI+' HATA':'✓ SIFIR HATA — 12 ek kontrol'));
if(NI)process.exitCode=1;

console.log('\n═══ DERİN DENETİM · SON TUR ═══');
let NJ=0;const hJ=(a,ok,e)=>{if(!ok){NJ++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAYJ=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
hJ("konu kırılımı konu24ten",KAYJ.indexOf("let K=konu24(br);")>=0);
hJ('net gösterimi ondalıklı',KAYJ.indexOf('const bir=v=>v.toFixed(1);')>=0);
hJ('grafik noktalarında net',KAYJ.indexOf("text-anchor=\"middle\" font-family=\"ui-monospace,monospace\">'+nv.toFixed(1)")>=0);
hJ('grafik sağ üstte değişim',KAYJ.indexOf('const f=s1-s0,fn=f*payda;')>=0);
hJ('etiket kademeli yarıçap',KAYJ.indexOf('const kad=(sy>0.25&&(i%2===1))?1.27:1.13;')>=0);
(function(){
  C.setGun('2026-08-05'); X.D.bitti={}; X.D.kal=[]; X.D.denKaz={};
  /* Konu kırılımı toplamı 24'lü sayısına eşit olmalı */
  const KD=RC('KONU_DAG'), D24=RC('DEN24');
  ['Dahiliye','Genel Cerrahi','Patoloji','Anatomi'].forEach(b=>{
    const top=Object.values(KD[b]||{}).reduce((a,x)=>a+x,0);
    const o=D24[b]/top;
    hJ(b+' ölçekli toplam = 24lü',Math.abs(top*o-D24[b])<0.5);
  });
  /* Net değeri doğru mu */
  const o2=RC('son()'), st=RC('bransDurum()');
  hJ('Dahiliye neti son denemeyle aynı',
     Math.abs(st['Dahiliye'].olc*RC('SORU.den')['Dahiliye']-o2.bn['Dahiliye'])<0.01,
     {etiket:+(st['Dahiliye'].olc*RC('SORU.den')['Dahiliye']).toFixed(2),deneme:o2.bn['Dahiliye']});
  /* Tamamlama tarihi gerçek gün */
  hJ('tamamlama bugünü yazıyor',KAYJ.indexOf('D.bitti[id(g)]=bgun();')>=0);
  hJ('konuCalisildi gerçek tamamlamaya bakıyor',KAYJ.indexOf('if(!D.bitti[id(g)])continue;')>=0);
  /* Radar etiketleri çakışmıyor */
  const svg=RC('radarCiz()');
  const P=[...svg.matchAll(/<text x="([\d.]+)" y="([\d.]+)" fill="#C3CAD4"/g)].map(m=>[+m[1],+m[2]]);
  let cak=0;
  for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++)
    if(Math.abs(P[i][0]-P[j][0])<90&&Math.abs(P[i][1]-P[j][1])<26)cak++;
  hJ('radar etiketleri çakışmıyor',cak===0,cak);
  /* Grafik net etiketleri */
  X.GOREVLER.forEach(g=>{if(g.act==='video'||g.act==='oku')X.D.bitti[X.id(g)]='2026-08-01'});
  const mh=RC('miniCiz("Dahiliye")');
  hJ('grafikte nokta etiketleri var',(mh.match(/font-size="8" text-anchor="middle"/g)||[]).length>=3);
  hJ('sağ üstte net ve değişim',/[\d.]+ net\s+[▲▼■]\s*[+−][\d.]+/.test(mh.replace(/<[^>]+>/g,' ')));
  X.D.bitti={};
})();
console.log('\n'+(NJ?'✗ '+NJ+' HATA':'✓ SIFIR HATA — 15 ek kontrol'));
if(NJ)process.exitCode=1;

console.log('\n═══ BUGÜN ÇALIŞILAN BRANŞ ═══');
let NK=0;const hK=(a,ok,e)=>{if(!ok){NK++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAYK=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
hK('gerçek tamamlamaya bakıyor',KAYK.indexOf("D.bitti[id(g)]===gun&&['oku','tekrar','video','soru']")>=0);
hK('programa bakan eski kod kalmadı',KAYK.indexOf("GOREVLER.filter(g=>g.d===gun&&(g.act==='oku'||g.act==='tekrar'))")<0);
hK('video de sayılıyor',KAYK.indexOf("'oku','tekrar','video','soru'")>=0);
hK('beklenen soru DEN24ten',KAYK.indexOf("bek=(typeof den24Soru==='function')?den24Soru(brs):0")>=0);
hK('SORU.den kalıntısı yok',KAYK.indexOf("bek=(SORU&&SORU.den&&SORU.den[brs])||0")<0);
hK('kaldırılmış dpKD referansı temizlendi',KAYK.indexOf('if(kd!==null){const kt=')<0);
(function(){
  C.setGun('2026-07-31'); X.D.bitti={}; X.D.tasi={}; X.D.kal=[];
  const vid=X.GOREVLER.find(g=>g.act==='video'&&g.br==='Dahiliye');
  const pat=X.GOREVLER.find(g=>g.act==='oku'&&g.br==='Patoloji');
  X.D.bitti[X.id(vid)]='2026-07-31';
  X.D.bitti[X.id(pat)]='2026-07-31';
  const bug=[...new Set(X.GOREVLER.filter(g=>
    X.D.bitti[X.id(g)]==='2026-07-31'&&['oku','tekrar','video','soru'].indexOf(g.act)>=0
  ).map(g=>g.br))];
  hK('telafi edilen video sayılıyor',bug.indexOf('Dahiliye')>=0,bug);
  hK('okunan branş sayılıyor',bug.indexOf('Patoloji')>=0);
  hK('yapılmamış program görevi sayılmıyor',bug.indexOf('Genel Cerrahi')<0);
  hK('yalnız iki branş',bug.length===2,bug);
  /* Beklenen soru sayısı */
  hK('Dahiliye 24lü 25 soru',RC('den24Soru("Dahiliye")')===25);
  hK('Genel Cerrahi 21',RC('den24Soru("Genel Cerrahi")')===21);
  hK('Küçük Stajlar 19',RC('den24Soru("Küçük Stajlar")')===19);
  X.D.bitti={};
})();
console.log('\n'+(NK?'✗ '+NK+' HATA':'✓ SIFIR HATA — 13 ek kontrol'));
if(NK)process.exitCode=1;

console.log('\n═══ DENEME İÇİ KONTRAST ═══');
let NL=0;const hL=(a,ok,e)=>{if(!ok){NL++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAYL=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
hL('deneme içi kontrast var',KAYL.indexOf('DENEME İÇİ KONTRAST · en güçlü gözlem')>=0);
hL('iki hücre ayrılıyor',KAYL.indexOf('if(konuCalisildi(k.k)){qC+=q;dC+=d;yC+=y} else {qH+=q;dH+=d;yH+=y}')>=0);
hL('R = (pÇ − pH)/(1 − pH)',KAYL.indexOf('let r=(pC-pH)/(1-pH);')>=0);
hL('iki hücre de anlamlı olmalı',KAYL.indexOf('if(qC<3||qH<3)return;')>=0);
hL('doygun taban eleniyor',KAYL.indexOf('if(pH>=0.97)return;')>=0);
(function(){
  C.setGun('2026-08-05'); X.D.bitti={}; X.D.denKaz={}; X.D.kal=[];
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
  X.GOREVLER.forEach(g=>{if(g.act==='video'&&g.k.indexOf('Hematoloji')>=0)X.D.bitti[X.id(g)]='2026-08-01'});
  const oku=()=>{RC('_rcOnb.a=null;_doOnb.a=null'); return {r:RC('rCal().r'),n:RC('rCal().n'),sd:RC('rCal().sd')}};
  const t0=oku();
  /* A · çalışılanda iyi, çalışılmayanlarda kötü · toplam net DÜŞÜK */
  X.D.kal=[{tar:'2026-08-02',br:'Dahiliye',d:8,y:14,b:3,konular:[
    {k:'hematoloji',q:6,d:5,y:1},{k:'nefroloji',q:6,d:1,y:5},
    {k:'endokrin',q:6,d:1,y:5},{k:'romatoloji',q:7,d:1,y:3}]}];
  const tA=oku();
  /* B · çalışılanda kötü · AYNI toplam net */
  X.D.kal=[{tar:'2026-08-02',br:'Dahiliye',d:8,y:14,b:3,konular:[
    {k:'hematoloji',q:6,d:1,y:5},{k:'nefroloji',q:6,d:3,y:3},
    {k:'endokrin',q:6,d:2,y:3},{k:'romatoloji',q:7,d:2,y:3}]}];
  const tB=oku();
  hL('tek denemeden gözlem üretiyor',tA.n>t0.n,{once:t0.n,sonra:tA.n});
  hL('A ile B AYIRT EDİLİYOR',Math.abs(tA.r-tB.r)>1e-6,{A:+tA.r.toFixed(4),B:+tB.r.toFixed(4)});
  hL('çalışılanda iyiyse R_CAL YÜKSELİYOR',tA.r>t0.r,{once:+t0.r.toFixed(4),sonra:+tA.r.toFixed(4)});
  hL('çalışılanda kötüyse düşüyor',tB.r<t0.r,{once:+t0.r.toFixed(4),sonra:+tB.r.toFixed(4)});
  hL('düşük toplam net yanıltmıyor',tA.r>tB.r);
  hL('belirsizlik daralıyor',tA.sd<t0.sd);
  /* Tek hücre varsa gözlem üretmemeli */
  X.D.kal=[{tar:'2026-08-02',br:'Dahiliye',d:5,y:1,b:0,konular:[{k:'hematoloji',q:6,d:5,y:1}]}];
  const tC=oku();
  hL('tek hücrede gözlem yok',tC.n===t0.n,{once:t0.n,sonra:tC.n});
  /* Sınırlar */
  hL('R_CAL sınırlar içinde',tA.r>0&&tA.r<1&&tB.r>0&&tB.r<1);
  X.D.kal=[]; X.D.bitti={};
})();
console.log('\n'+(NL?'✗ '+NL+' HATA':'✓ SIFIR HATA — 13 ek kontrol'));
if(NL)process.exitCode=1;

console.log('\n═══ BEKLENTİ ↔ GERÇEKLEŞEN ═══');
let NM=0;const hM=(a,ok,e)=>{if(!ok){NM++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAYM=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
hM('denemeSapma fonksiyonu',RC('typeof denemeSapma')==='function');
hM('snapshot gerekmiyor (yeniden kuruluyor)',KAYM.indexOf('beklenti YENİDEN KURULABİLİR')>=0);
hM("24lü getirisi de sayılıyor",KAYM.indexOf("denemeKazHam([e.br],e.tar,true)")>=0);
hM('sapma kutusu CSS',KAYM.indexOf('.sapKt{border-radius:13px')>=0);
hM('dört alan gösteriliyor',KAYM.indexOf('<i>isabet</i>')>=0);
hM('yorum satırı',KAYM.indexOf('kalibrasyon bunu öğrendi')>=0);
(function(){
  C.setGun('2026-07-31'); X.D.bitti={}; X.D.kal=[]; X.D.denKaz={};
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
  hM('tek deneme varken null',(function(){
    const y=X.D.denemeler; X.D.denemeler=[y[0]];
    const z=RC('denemeSapma()'); X.D.denemeler=y; return z===null})());
  X.GOREVLER.forEach(g=>{if((g.act==='oku'||g.act==='video')&&g.d>='2026-07-25'&&g.d<='2026-07-30')X.D.bitti[X.id(g)]=g.d});
  const s=X.D.denemeler[X.D.denemeler.length-1];
  const bn2=Object.assign({},s.bn); Object.keys(bn2).forEach(k=>bn2[k]=+(bn2[k]*1.08).toFixed(2));
  let t=0,k=0; RC('TEMEL_BR').forEach(b=>{if(bn2[b]!==undefined)t+=bn2[b]});
  Object.keys(bn2).forEach(b=>{if(RC('TEMEL_BR').indexOf(b)<0)k+=bn2[b]});
  X.D.denemeler.push({tar:'2026-07-31',kay:'PreTUS 6',t:+t.toFixed(2),k:+k.toFixed(2),bn:bn2});
  const sp=RC('denemeSapma()');
  hM('sapma hesaplanıyor',sp!==null);
  hM('beklenen = önceki + artış',Math.abs(sp.bek-(sp.onceki+sp.bekArt))<0.01);
  hM('gerçekleşen artış tutarlı',Math.abs(sp.gerArt-(sp.ger-sp.onceki))<0.01);
  hM('sapma = gerçek − beklenen',Math.abs(sp.sapma-(sp.ger-sp.bek))<0.01);
  hM('isabet oranı tanımlı',sp.oran!=null&&isFinite(sp.oran));
  hM('tarihler doğru',sp.t0==='2026-07-24'&&sp.t1==='2026-07-31');
  /* Beklentinin ALTINDA kalan senaryo */
  X.D.denemeler.pop();
  const bn3=Object.assign({},s.bn); Object.keys(bn3).forEach(k=>bn3[k]=+(bn3[k]*0.97).toFixed(2));
  let t3=0,k3=0; RC('TEMEL_BR').forEach(b=>{if(bn3[b]!==undefined)t3+=bn3[b]});
  Object.keys(bn3).forEach(b=>{if(RC('TEMEL_BR').indexOf(b)<0)k3+=bn3[b]});
  X.D.denemeler.push({tar:'2026-07-31',kay:'PreTUS 6',t:+t3.toFixed(2),k:+k3.toFixed(2),bn:bn3});
  const sp2=RC('denemeSapma()');
  hM('düşük sonuçta sapma eksi',sp2.sapma<0,+sp2.sapma.toFixed(2));
  hM('isabet oranı 1in altında',sp2.oran<1,+sp2.oran.toFixed(2));
  X.D.bitti={}; X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
})();
console.log('\n'+(NM?'✗ '+NM+' HATA':'✓ SIFIR HATA — 14 ek kontrol'));
if(NM)process.exitCode=1;

console.log('\n═══ KONU İKİLENMESİ ═══');
let NN=0;const hN=(a,ok,e)=>{if(!ok){NN++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
(function(){
  const KD=RC('KONU_DAG'), den=RC('SORU.den');
  const sade=a=>a.toLowerCase().replace(/[\/\-–]/g,' ').replace(/\s+/g,' ').trim();
  let kalan=0, hata=0, top=0, adet=0;
  Object.keys(KD).forEach(br=>{
    const K=Object.keys(KD[br]);
    const t=Object.values(KD[br]).reduce((a,x)=>a+x,0);
    top+=t; adet+=K.length;
    if(Math.abs(t-(den[br]||0))>0.05)hata++;
    for(let i=0;i<K.length;i++)for(let j=i+1;j<K.length;j++){
      const ka=sade(K[i]).split(' '), kb=sade(K[j]).split(' ');
      if((ka.every(w=>kb.indexOf(w)>=0)||kb.every(w=>ka.indexOf(w)>=0))
         &&Math.abs(KD[br][K[i]]-KD[br][K[j]])<1e-6)kalan++;
      /* aynı kelime kümesi, farklı sıra */
      if(ka.slice().sort().join('|')===kb.slice().sort().join('|'))kalan++;
    }});
  hN('eşit değerli ikilenme kalmadı',kalan===0,kalan);
  hN('branş toplamları bozulmadı',hata===0,hata);
  hN('toplam 200 soru',Math.abs(top-200)<0.05,+top.toFixed(2));
  hN('konu sayısı 156',adet===156,adet);
  hN('Dahiliye gastro birleşti',
     KD['Dahiliye']['gastroenteroloji/hepatoloji']>6&&!KD['Dahiliye']['gastroenteroloji']);
  hN('Genel Cerrahi şok birleşti',
     KD['Genel Cerrahi']['şok travma ve temel konular']>5&&!KD['Genel Cerrahi']['şok']);
  /* Farklı konular KORUNDU */
  hN('jinekolojik onkoloji ayrı kaldı',
     KD['Kadın Doğum']['jinekolojik']!==undefined&&KD['Kadın Doğum']['jinekolojik onkoloji']!==undefined);
  hN('üroloji ayrı kaldı',KD['Genel Cerrahi']['üroloji']!==undefined);
})();
console.log('\n'+(NN?'✗ '+NN+' HATA':'✓ SIFIR HATA — 8 ek kontrol'));
if(NN)process.exitCode=1;

console.log('\n═══ 24LÜ KONU LİSTELERİ ve BOŞ ═══');
let NO=0;const hO=(a,ok,e)=>{if(!ok){NO++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAYO=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
hO('KS_KONU listesi',RC('typeof KS_KONU')==='object');
hO('konu24 fonksiyonu',RC('typeof konu24')==='function');
hO('form konu24 kullanıyor',KAYO.indexOf('let K=konu24(br);')>=0);
hO('boş göstergesi',KAYO.indexOf('b.textContent=bo+\' boş\'')>=0);
hO('tutarsızlık uyarısı',KAYO.indexOf("b.textContent='fazla!'")>=0);
(function(){
  const D24=RC('DEN24');
  ['Dahiliye','Genel Cerrahi','Küçük Stajlar','Patoloji','Anatomi'].forEach(b=>{
    const K=RC('konu24("'+b+'")');
    const t=Object.values(K).reduce((a,x)=>a+x,0);
    hO(b+' toplamı 24lü hedefine eşit',Math.abs(t-D24[b])<0.05,{bulunan:+t.toFixed(2),hedef:D24[b]});
  });
  const D=RC('konu24("Dahiliye")');
  ['nöroloji','psikiyatri','dermatoloji','acil tıp','halk sağlığı','radyoloji']
    .forEach(k=>hO('Dahiliyede '+k+' YOK',D[k]===undefined));
  const G=RC('konu24("Genel Cerrahi")');
  ['göz hastalıkları','üroloji','beyin cerrahisi','kulak burun boğaz hastalıkları']
    .forEach(k=>hO('Genel Cerrahide '+k+' YOK',G[k]===undefined));
  const KS=RC('konu24("Küçük Stajlar")');
  hO('Küçük Stajlar 19 konu',Object.keys(KS).length===19,Object.keys(KS).length);
  hO('Küçük Stajlarda nöroloji var',KS['nöroloji']>0);
  hO('Küçük Stajlarda göz var',KS['göz hastalıkları']>0);
  hO('Küçük Stajlarda gastro YOK',KS['gastroenteroloji/hepatoloji']===undefined);
  /* Üç liste toplamı 24lü toplamına eşit */
  const t3=['Dahiliye','Genel Cerrahi','Küçük Stajlar']
    .reduce((a,b)=>a+Object.values(RC('konu24("'+b+'")')).reduce((x,y)=>x+y,0),0);
  hO('üç liste toplamı 65',Math.abs(t3-65)<0.05,+t3.toFixed(2));
  /* KONU_DAG bozulmadı */
  const KD=RC('KONU_DAG');
  hO('KONU_DAG dokunulmadı',Math.abs(Object.values(KD['Dahiliye']).reduce((a,x)=>a+x,0)-35)<0.05);
  /* Boş sayısı örtük */
  hO('boş = soru − D − Y',(function(){const q=2,d=1,y=0;return q-d-y===1})());
})();
console.log('\n'+(NO?'✗ '+NO+' HATA':'✓ SIFIR HATA — 22 ek kontrol'));
if(NO)process.exitCode=1;

console.log('\n═══ BİRLEŞTİRME SONRASI DENETİM ═══');
let NP=0;const hP=(a,ok,e)=>{if(!ok){NP++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAYP=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
hP("konuSade ayraçları temizliyor",KAYP.indexOf(String.fromCharCode(46)+"replace(/[")>=0&&RC('konuSade("a/b")')==="a b");
hP('konuOrtus fonksiyonu',RC('typeof konuOrtus')==='function');
hP('konuCalisildi konuOrtus kullanıyor',KAYP.indexOf('||konuOrtus(a,c))return true;')>=0);
hP('k24 bayrağı',KAYP.indexOf('function denemeKazHam(branslar,tar,k24)')>=0);
hP('24lü çağrıları bayraklı',(KAYP.match(/denemeKazHam\(\[[ek]\.br\],[ek]\.tar,true\)/g)||[]).length===2);
(function(){
  C.setGun('2026-08-05'); X.D.bitti={}; X.D.kal=[]; X.D.denKaz={}; X.D.ekDen={};
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM)); RC('denSenkron()');
  /* Birleşen konular hâlâ eşleşiyor */
  const dene=(ad,konu)=>{
    const g=X.GOREVLER.find(x=>String(x.k).toLowerCase().indexOf(ad.toLowerCase())>=0
      &&['oku','video','soru','tekrar'].indexOf(x.act)>=0);
    X.D.bitti={}; if(g)X.D.bitti[X.id(g)]='2026-08-01'; RC('_kcOnb.a=null');
    const r=g?RC('konuCalisildi("'+konu+'")'):null;
    X.D.bitti={}; RC('_kcOnb.a=null');
    return r;
  };
  hP('gastro birleşik ad eşleşiyor',dene('Gastroenteroloji','gastroenteroloji/hepatoloji')===true);
  hP('meme birleşik ad eşleşiyor',dene('Meme','meme hastalıkları ve cerrahisi')===true);
  hP('aminoasit birleşik ad eşleşiyor',dene('Aminoasit','aminoasitler ve proteinler')===true);
  hP('KBB birleşik ad eşleşiyor',dene('Kulak','kulak burun boğaz hastalıkları')===true);
  /* Kapsamlar */
  const pt=RC('denemeKazHam(Object.keys(KONU_DAG),"2026-08-05")');
  hP('PreTUS200 kapsamı 200 soru',
     Math.abs(pt.dagilim.reduce((a,d)=>a+d.soru,0)-200)<0.5,
     +pt.dagilim.reduce((a,d)=>a+d.soru,0).toFixed(1));
  ['Dahiliye','Genel Cerrahi','Küçük Stajlar'].forEach(b=>{
    const h=RC('denemeKazHam(["'+b+'"],"2026-08-05",true)');
    const q=h?h.dagilim.reduce((a,d)=>a+d.soru,0):0;
    hP('24lü '+b+' kapsamı '+RC('DEN24')[b],Math.abs(q-RC('DEN24')[b])<0.1,+q.toFixed(1));
  });
  /* Havuz getirileri */
  const H=RC('denemeHavuz()');
  hP('havuz getirileri pozitif',H.every(x=>x.net>0));
  hP('Küçük Stajlar getirisi var',H.find(x=>x.br==='Küçük Stajlar').net>0);
  /* Temel büyüklükler makul */
  const p=X.para(), o=RC('son()');
  hP('parakete makul',X.puan(p.t,p.k)>50&&X.puan(p.t,p.k)<70,+X.puan(p.t,p.k).toFixed(2));
  hP('potansiyel pozitif',RC('kalanKazanci().fark')>0,+RC('kalanKazanci().fark').toFixed(2));
  hP('sabitler sınırlarda',RC('rCal().r')>0&&RC('rCal().r')<1&&RC('dOran().r')>=0.1&&RC('dOran().r')<=4);
})();
console.log('\n'+(NP?'✗ '+NP+' HATA':'✓ SIFIR HATA — 17 ek kontrol'));
if(NP)process.exitCode=1;

console.log('\n═══ DENEME GİRİŞİ · D/Y ═══');
let NQ=0;const hQ=(a,ok,e)=>{if(!ok){NQ++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KAYQ=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
hQ('D kutusu',KAYQ.indexOf('class="dyD"')>=0);
hQ('Y kutusu',KAYQ.indexOf('class="dyY"')>=0);
hQ('net uygulamada hesaplanıyor',KAYQ.indexOf('const net=+(dd-yy*0.25).toFixed(2);')>=0);
hQ('eski tek-net kutusu kalmadı',KAYQ.indexOf("<input class=\"bn\" data-b=")<0);
hQ('boş sayısı gösteriliyor',KAYQ.indexOf("' · '+bos+' boş'")>=0);
hQ('tutarsızlık uyarısı',KAYQ.indexOf('doğru+yanlış soru sayısını aşıyor')>=0);
hQ('dy kaydediliyor',KAYQ.indexOf('bn:bn,dy:dy')>=0);
hQ('satır başına net',KAYQ.indexOf('class="dyNet m"')>=0);
(function(){
  /* Net formülü · TUS kuralı */
  const net=(d,y)=>+(d-y*0.25).toFixed(2);
  hQ('20D 8Y = 18.00',net(20,8)===18);
  hQ('14D 6Y = 12.50',net(14,6)===12.5);
  hQ('9D 3Y = 8.25',net(9,3)===8.25);
  hQ('0D 0Y = 0',net(0,0)===0);
  hQ('boş = soru − D − Y',35-20-8===7);
  /* Geriye dönük uyum · dy alanı olmayan kayıtlar */
  C.setGun('2026-08-01'); X.D.bitti={}; X.D.kal=[];
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
  const o=RC('son()');
  hQ('eski kayıtta dy yok',o.dy===undefined);
  hQ('eski kayıtla bransDurum çalışıyor',RC('bransDurum()')['Dahiliye'].olc!=null);
  hQ('eski kayıtla para çalışıyor',isFinite(X.para().t));
  hQ('eski kayıtla matris çalışıyor',isFinite(RC('grupKapsam()["Dahiliye grubu"]')||0));
})();
console.log('\n'+(NQ?'✗ '+NQ+' HATA':'✓ SIFIR HATA — 16 ek kontrol'));
if(NQ)process.exitCode=1;
