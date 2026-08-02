/* GERÇEK VERİ AUDİTİ — kullanıcının localStorage 'rota-veri' verisi.
   MOTOR DEĞİŞMEDEN çalıştırılır; UI'nin göstereceği değerler = motor
   fonksiyonları, ham veriden bağımsız yeniden hesapla ve karşılaştır. */
require('./derin_ortam.js');
const C=globalThis.__C, X=C.API, vm=require('vm'), fs=require('fs');
const R=e=>vm.runInContext(e,C);
const f1=x=>(x==null?'—':(+x).toFixed(1)), f2=x=>(x==null?'—':(+x).toFixed(2)), f3=x=>(x==null?'—':(+x).toFixed(3));
const D=JSON.parse(fs.readFileSync('/tmp/claude-0/-home-user-DREONLINE/10ae9657-611e-5be0-9cd3-f5cadcb7a235/scratchpad/rota-veri.json','utf8'));

/* kullanıcının GERÇEK durumu · güncel tarihi 2026-08-02 */
C.setGun('2026-08-02');
R('D.bitti='+JSON.stringify(D.bitti));
R('D.denemeler='+JSON.stringify(D.denemeler));
R('D.pu={}'); R('D.kal=[]');

console.log('╔══════════════════════════════════════════════════════════════════╗');
console.log('║  GERÇEK VERİ AUDİTİ · senin 200 soruluk denemen · motor değişmedi  ║');
console.log('╚══════════════════════════════════════════════════════════════════╝');
const sr=R('sirali()');
console.log('\nDeneme sayısı:',sr.length,'· tamamlanan görev:',Object.keys(D.bitti).length);
console.log('Denemeler:', sr.map(o=>o.tar+'('+o.kay.slice(0,10)+')').join(' → '));

/* ── 1) VERİ BÜTÜNLÜĞÜ ── */
const son=D.denemeler[D.denemeler.length-1];
console.log('\n【1】 SENİN 200 SORULUK DENEMEN ('+son.tar+' · '+son.kay+')');
console.log('  soru sayısı:', son.sorular.length, son.sorular.length===200?'✓':'(≠200)');
console.log('  her soruda {b,konu,s,e}:', son.sorular.every(o=>o.b&&o.konu&&o.s&&o.e)?'tam ✓':'EKSİK ✗');
// dy (branş D/Y/B) ile sorular tutarlı mı — bağımsız say
const say={}; son.sorular.forEach(o=>{const b=say[o.b]=say[o.b]||{d:0,y:0,b:0};
  if(o.s==='D')b.d++; else if(o.s==='Y')b.y++; else b.b++;});
let dyOK=true; Object.keys(son.dy).forEach(br=>{ const a=son.dy[br], b=say[br]||{d:0,y:0,b:0};
  if(a.d!==b.d||a.y!==b.y||a.b!==b.b){dyOK=false; console.log('   ⚠ '+br+' dy kayıt {d:'+a.d+',y:'+a.y+',b:'+a.b+'} ≠ sorular {d:'+b.d+',y:'+b.y+',b:'+b.b+'}');}});
console.log('  dy (kayıtlı branş D/Y/B) ↔ sorular[] bağımsız sayım:', dyOK?'BİREBİR TUTUYOR ✓':'AYRIŞMA VAR ✗');
// bağımsız net: dqBransNet
R('window.__S='+JSON.stringify(son.sorular));
const net=R('dqBransNet(window.__S)');
console.log('  bağımsız net (dqBransNet): T='+f2(net.t)+' K='+f2(net.k)+' · KAYITLI: T='+f2(son.t)+' K='+f2(son.k),
  (Math.abs(net.t-son.t)<0.01&&Math.abs(net.k-son.k)<0.01)?'→ TUTUYOR ✓':'→ AYRIŞMA ✗');

/* ── 5) 8’Lİ MATRİS (senin gerçek denemenden) ── */
console.log('\n【5】 SENİN 8’Lİ MATRİSİN (Doğru/Yanlış × Emin/AK/Bilmiyorum/Unuttum)');
const GUV=['E','AK','B','U'], M={}; ['D','Y'].forEach(s=>GUV.forEach(e=>M[s+e]=0));
let boslukSay=0;
son.sorular.forEach(o=>{ if(o.s==='B'){boslukSay++;return} if(M[o.s+o.e]!==undefined)M[o.s+o.e]++; });
const pad=(x,n)=>String(x).padStart(n);
console.log('            '+['Emin','AK','Bilmiyorum','Unuttum'].map(x=>pad(x,11)).join(''));
['D','Y'].forEach(s=>console.log('  '+pad(s==='D'?'DOĞRU':'YANLIŞ',8)+'  '+GUV.map(e=>pad(M[s+e],11)).join('')));
const topD=M.DE+M.DAK+M.DB+M.DU, topY=M.YE+M.YAK+M.YB+M.YU;
console.log('  (işaretsiz/boş "B" durum sorusu: '+boslukSay+')');
console.log('  → Doğru '+topD+' · Yanlış '+topY+' · net '+f2(topD-topY*0.25));
console.log('  A) YANLIŞ+EMİN (yanlış öğrenilmiş): '+M.YE);
console.log('  B) DOĞRU+BİLMİYORUM (şans/kırılgan): '+M.DB);
console.log('  C) DOĞRU+AK '+M.DAK+' · YANLIŞ+AK '+M.YAK+' (kararsızlık/sınır)');
console.log('  D) YANLIŞ+UNUTTUM (decay): '+M.YU+' · DOĞRU+EMİN (sağlam): '+M.DE);
// dqIstat ile aynı mı
const ist=R('dqIstat()');
let sag=0,kir=0,unut=0,bilm=0; Object.values(ist.brans).forEach(b=>{sag+=b.sag;kir+=b.kir;unut+=b.unut;bilm+=b.bilm});
console.log('  dqIstat: sağlam='+sag+'(=D+Emin '+M.DE+') kırılgan='+kir+'(=D+AK+B+U '+(M.DAK+M.DB+M.DU)+') unut='+unut+' bilm='+bilm,
  (sag===M.DE&&kir===(M.DAK+M.DB+M.DU))?'→ TUTUYOR ✓':'→ kontrol et');

/* ── 2) PARAKETE (gerçek) ── */
console.log('\n【2】 PARAKETE (senin verinle · UI hP = puan(para()))');
const p=R('para()'), parakete=R('puan(para().t,para().k)');
const o=R('son()'), olculen=R('puan(son().t,son().k)');
const TABAN=R('TABAN'),KT=R('KT'),KK=R('KK');
console.log('  son deneme (ölçülen) T='+f2(o.t)+' K='+f2(o.k)+' → ölçülen puan = '+f2(olculen));
console.log('  bağımsız: '+TABAN+'+'+KT+'·'+f2(o.t)+'+'+KK+'·'+f2(o.k)+' = '+f2(TABAN+KT*o.t+KK*o.k),
  Math.abs(olculen-(TABAN+KT*o.t+KK*o.k))<1e-9?'✓':'✗');
console.log('  para() (projeksiyon) t='+f2(p.t)+' k='+f2(p.k)+' → PARAKETE = '+f2(parakete));
console.log('  bağımsız yeniden hesap = '+f2(TABAN+KT*p.t+KK*p.k), Math.abs(parakete-(TABAN+KT*p.t+KK*p.k))<1e-9?'→ BİREBİR ✓':'→ ✗');
const b1=R('puanBant(-1)'), b2=R('puanBant(1)');
console.log('  güven bandı: '+f2(b1)+' – '+f2(b2)+' (genişlik '+f2(b2-b1)+')');

/* ── 3) POTANSİYEL ── */
console.log('\n【3】 POTANSİYEL ("Kalan potansiyel" = kalanKazanci().fark)');
const kk=R('kalanKazanci()');
console.log('  kalan iş: '+kk.n+' · Potansiyel (EK net) = '+f2(kk.fark));
console.log('  ULAŞILABİLİR TAVAN = PARAKETE + Potansiyel = '+f2(parakete)+' + '+f2(kk.fark)+' = '+f2(parakete+kk.fark));

/* ── 4) R_CAL ── */
console.log('\n【4】 R_CAL (senin 6 denemenle)');
const rc=R('rCal()');
console.log('  R_CAL = '+f3(rc.r)+' · SD = '+f3(rc.sd)+' · gözlem n = '+rc.n);
// son denemeyi çıkarıp bak (bu deneme R_CAL'i ne kadar oynatmış)
R('window.__tumDen='+JSON.stringify(D.denemeler));
R('D.denemeler=window.__tumDen.slice(0,-1)'); const rcOnce=R('rCal()');
R('D.denemeler=window.__tumDen');
console.log('  son deneme ÇIKARILINCA: R_CAL='+f3(rcOnce.r)+' n='+rcOnce.n+' → son deneme etkisi ΔR_CAL='+f3(rc.r-rcOnce.r));

/* ── FAZ 3 trend + FAZ 4 tempo (gerçek 6 deneme) ── */
console.log('\n【FAZ3】 denemeTrend(5) — senin son denemelerin');
const tr=R('denemeTrend(5)');
if(tr.yeter===false)console.log('  yetersiz (n='+tr.n+')');
else{ console.log('  seri: '+tr.seri.join(' → ')+' · Δ(son-ilk) = '+(tr.delta>=0?'+':'')+tr.delta+' net');
  if(tr.bt){const yon=Object.entries(tr.bt).filter(x=>x[1]).map(x=>x[0]+' '+(x[1]>0.02?'▲':x[1]<-0.02?'▼':'→')); console.log('  branş yönü: '+yon.slice(0,8).join(' · '));}
}
console.log('\n【FAZ4】 tempoProjeksiyon — mevcut / +1 saat / +3 saat');
[0,1,3].forEach(ek=>{ const tp=R('tempoProjeksiyon('+ek+')');
  console.log('  +'+ek+' sa/gün: tempo='+f2(tp.tempo)+' → net '+f1(tp.net)+' (kapasite '+tp.kapasite+' sa, seçilen '+tp.secilenIs+'/'+tp.kalanIs+' iş)'); });
// monotonluk
const n0=R('tempoProjeksiyon(0)').net, n1=R('tempoProjeksiyon(1)').net, n3=R('tempoProjeksiyon(3)').net;
console.log('  monoton mu (0≤1≤3): '+(n0<=n1&&n1<=n3?'EVET ✓':'HAYIR ✗')+' ('+f1(n0)+'≤'+f1(n1)+'≤'+f1(n3)+')');

/* ── 8) GÖREV MOTORU ── */
console.log('\n【8】 rehberSec — senin verinle ilk 10 öneri');
const L=R('rehberSec()');
// tekilleştirilmemiş ham liste (bulgu: yinelenen)
const gorulen=new Set(), tekil=[];
L.forEach(a=>{const k=a.u.brans+'|'+a.u.konu; if(!gorulen.has(k)){gorulen.add(k);tekil.push(a);}});
tekil.slice(0,10).forEach((a,i)=>{ const n=a.neden;
  console.log('  '+(i+1)+'. '+a.u.brans+' / '+a.u.konu+'  CS='+f2(a.CS)+
    '  [boş '+f1(n.bos)+' · yanlışOran '+f2(n.yan)+' · çürüme '+f2(n.cur)+(n.sonGun!=null?'(son '+n.sonGun+'g)':'(hiç çalışılmamış)')+' · düşüş '+f2(n.dus)+' · soru '+f1(a.u.soru)+']');
});
console.log('  (ham liste '+L.length+' · tekil '+tekil.length+' → '+(L.length-tekil.length)+' yinelenen öneri ayıklandı)');

/* ── 6) DENEME→KONU: en zayıf noktaların ── */
console.log('\n【6】 SENİN ZAYIF KONULARIN (boşluk = Bilmiyorum+yanlış, ilk 10)');
const bos=Object.entries(ist.bosluk).sort((a,b)=>b[1]-a[1]).slice(0,10);
bos.forEach(([k,v])=>console.log('  '+String(k).slice(0,46).padEnd(46)+' · '+v+' soru'));

console.log('\n【bitti】 verdikt metinle.');
