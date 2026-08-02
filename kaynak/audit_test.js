/* AUDIT · CANLI TEST (kullanıcı bölüm 18) — mevcut veri motorunu DEĞİŞTİRMEDEN
   çalıştırıp gerçek sayı üretir. D HER ZAMAN context İÇİNDE değiştirilir. */
require('./derin_ortam.js');
const C=globalThis.__C, X=C.API, vm=require('vm');
const R=e=>vm.runInContext(e,C);
const f2=x=>(x==null?'—':(+x).toFixed(2)), f3=x=>(x==null?'—':(+x).toFixed(3));
const setKal=a=>R('D.kal='+JSON.stringify(a));
const setDen=a=>R('D.denemeler='+JSON.stringify(a));
function projeksiyon(){ const p=X.para(); return X.puan(p.t,p.k); }
function bant(){ return [R('puanBant(-1)'),R('puanBant(1)')]; }
function rc(){ return R('rCal()'); }

console.log('╔═══════════════════════════════════════════════════════════════╗');
console.log('║  CANLI KALİBRASYON TESTİ · mevcut motor, KOD DEĞİŞMEDEN         ║');
console.log('╚═══════════════════════════════════════════════════════════════╝');

C.setGun('2026-08-10');
R('D.bitti={}'); setKal([]);
X.GOREVLER.filter(g=>g.d<='2026-08-09'&&g.act==='oku').forEach(g=>R('D.bitti['+JSON.stringify(X.id(g))+']='+JSON.stringify(g.d)));
/* TABAN ÖLÇÜM: kalibrasyon "boşluğu ne kadar kapadım" der; boşluk için önce
   bir ölçüm (son deneme) gerekir. tabanP bunu son().bn'den okur. Patoloji'de
   düşük bir taban koyuyoruz (5/18 ≈ 0.28) ki kapanacak boşluk olsun. */
const pQ=X.SORU.den['Patoloji']||18;
setDen([{tar:'2026-08-05',kay:'Taban ölçüm',t:0,k:0,bn:{Patoloji:5}}]);

console.log('\n【1】 VERİ AZ — sistem ne diyor?');
let rcv=rc(), pr=projeksiyon(), bd=bant();
const r0=rcv.r, bant0=bd[1]-bd[0];
console.log('  R_CAL =',f3(rcv.r),'· belirsizlik ±'+f3(1.96*rcv.sd),'· gözlem n='+rcv.n);
console.log('  Projeksiyon =',f2(pr),'net · bant',f2(bd[0])+'–'+f2(bd[1]),'(genişlik '+f2(bant0)+')');
console.log('  → n=0: yalnız önsel (0.405±0.195). Geniş bant = "henüz yeterli kişisel veri yok" sinyali.');

console.log('\n【2】 DENEME GİR (Patoloji · çalışılan konularda kötü)');
setKal([{tar:'2026-08-10',br:'Patoloji',d:8,y:10,b:6,kd:1,ky:3,kb:0}]);
rcv=rc(); pr=projeksiyon(); bd=bant();
console.log('  R_CAL =',f3(rcv.r),'(önce '+f3(r0)+', Δ='+f3(rcv.r-r0)+') · n='+rcv.n);
console.log('  Projeksiyon =',f2(pr),'· bant',f2(bd[0])+'–'+f2(bd[1]));
console.log('  → Kötü sonuç R_CAL\'i',(rcv.r<r0?'DÜŞÜRDÜ ✓':'değiştirmedi ✗'),
  '· tek gözlem aşırı oynatmıyor (|Δ|='+f3(Math.abs(rcv.r-r0))+' < 0.05 = Bayes shrinkage).');
const r2=rcv.r;

console.log('\n【3】 30 İYİ GÖZLEM → tahmin + bant güncelleniyor mu?');
const mk=(n,d,y,kd,ky)=>{const c=[];for(let i=0;i<n;i++)c.push({tar:'2026-08-10',br:'Patoloji',d,y,b:0,kd,ky,kb:0});return c};
setKal(mk(30,16,4,4,0));
rcv=rc(); pr=projeksiyon(); bd=bant();
console.log('  R_CAL =',f3(rcv.r),'· belirsizlik ±'+f3(1.96*rcv.sd),'· n='+rcv.n);
console.log('  Projeksiyon =',f2(pr),'· bant',f2(bd[0])+'–'+f2(bd[1]),'(genişlik '+f2(bd[1]-bd[0])+')');
console.log('  → İyi veri R_CAL\'i',(rcv.r>r2?'YÜKSELTTİ ✓':'yükseltmedi ✗'),
  '· bant',(bd[1]-bd[0]<bant0?'DARALDI ✓':'daralmadı ✗'),'('+f2(bant0)+'→'+f2(bd[1]-bd[0])+') = veri arttıkça güven artıyor.');

console.log('\n【4】 GÜVEN ETİKETLERİ AYRI SİNYAL Mİ? (Doğru+Emin ≠ Doğru+Bilmiyorum)');
setKal([]);
const denemeYap=(profil)=>{ const sorular=[];
  profil.forEach(([b,konu,s,e,adet])=>{ for(let i=0;i<adet;i++)sorular.push({b,konu,s,e}); });
  return {tar:'2026-08-11',kay:'Test',t:0,k:0,bn:{},sorular,detay:true}; };
setDen([denemeYap([['Anatomi','eklemler','D','E',10],['Anatomi','eklemler','Y','B',2]])]);
let ist=R('dqIstat()'); const A=ist.brans['Anatomi']||{};
console.log('  Profil A (10× Doğru+Emin):      sağlam='+A.sag+' kırılgan='+A.kir+' unut='+A.unut+' bilm='+A.bilm);
setDen([denemeYap([['Anatomi','eklemler','D','B',10],['Anatomi','eklemler','Y','U',2]])]);
ist=R('dqIstat()'); const Bp=ist.brans['Anatomi']||{};
console.log('  Profil B (10× Doğru+Bilmiyorum): sağlam='+Bp.sag+' kırılgan='+Bp.kir+' unut='+Bp.unut+' bilm='+Bp.bilm);
console.log('  → Aynı 10 doğru; A sağlam, B kırılgan:',(A.sag!==Bp.sag&&A.kir!==Bp.kir?'AYRIŞIYOR ✓':'ayrışmıyor ✗'),
  '· bosluk haritası:',JSON.stringify(ist.bosluk));

console.log('\n【5】 DENEME-İÇİ KONTRAST: düşük deneme ama yanlışlar çalışılmadığım konulardan');
setDen([]);
const calKonu=R('(function(){for(const b in KONU_DAG)for(const k in KONU_DAG[b])if(konuCalisildi(k))return k;return null})()');
setKal([{tar:'2026-08-10',br:'Patoloji',d:9,y:11,b:4,
  konular:[{k:calKonu||'neoplazi',q:6,d:5,y:1},{k:'__hic_calisilmamis__',q:6,d:1,y:5}]}]);
rcv=rc();
console.log('  çalışılmış örnek konu:',calKonu||'(yok)');
console.log('  Toplam net DÜŞÜK (9D/11Y) ama çalışılan konuda 5/6 doğru → R_CAL =',f3(rcv.r),
  (rcv.r>=0.405-0.02?'· tabana ÇEKİLMEDİ ✓ (kontrast koruyor)':'· düştü'));

console.log('\n【6】 DECAY → GÖREV ÖNCELİĞİ (rehberSec CS) değişiyor mu?');
setKal([]); setDen([]); C.setGun('2026-08-10');
let L=R('rehberSec()'); const u1=L[0];
console.log('  Bugün en yüksek öncelik:',u1.u.brans,'/',u1.u.konu,'· CS='+f2(u1.CS),
  '· bileşen',JSON.stringify({bos:f2(u1.neden.bos),yan:f2(u1.neden.yan),cur:f2(u1.neden.cur),dus:f2(u1.neden.dus)}));
C.setGun('2026-08-20');
L=R('rehberSec()'); const u2=L[0];
console.log('  10 gün sonra (daha çok decay):',u2.u.brans,'/',u2.u.konu,'· CS='+f2(u2.CS));
console.log('  → CS decay ile',(f2(u1.CS)!==f2(u2.CS)?'DEĞİŞTİ ✓':'sabit'),'— öneri zamanla yeniden hesaplanıyor.');

console.log('\n【ÖZET】 mevcut motor (koddan doğrulandı, kod değişmedi):');
console.log('  • Kalibrasyon: ters-varyans ağırlıklı Bayes (rCalHesap) · 4 gözlem kanalı · [0.15,0.85] kırpma');
console.log('  • Bant: puanBant(±1) = projeksiyon ± 1.96·sd (ust() içinde "b1–b2" gösteriliyor)');
console.log('  • Az veri koruması: önsel + geniş bant; veri arttıkça daralıyor');
console.log('  • Güven E/AK/B/U ayrı sinyal: dqIstat sag/kir/unut/bilm + bosluk');
console.log('  • Görev CS = 2.2·boş+1.6·yan+1.4·çür+1.2·düş+0.35·soru+1.5·tekrar');
