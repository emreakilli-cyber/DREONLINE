/* GERÇEK VERİ AUDİTİ (kullanıcı isteği) — PARAKETE / POTANSİYEL / R_CAL /
   8'li matris / görev motoru. MEVCUT MOTOR DEĞİŞMEDEN çalıştırılır.
   ⚠ Kullanıcının GERÇEK 200 cevabı tarayıcı localStorage'ında; buraya
   erişemiyorum. Bu yüzden TEMSİLİ bir 200 soruluk deneme kuruyorum (branş
   dağılımı SORU.den'e sadık) ve MEKANİĞİ denetliyorum: UI değeri = motor
   fonksiyonu mu, hesap tutarlı mı. Kullanıcı kendi verisiyle koşmak için
   sonda anlatılan export adımını uygular. */
require('./derin_ortam.js');
const C=globalThis.__C, X=C.API, vm=require('vm');
const R=e=>vm.runInContext(e,C);
const f1=x=>(x==null?'—':(+x).toFixed(1)), f2=x=>(x==null?'—':(+x).toFixed(2)), f3=x=>(x==null?'—':(+x).toFixed(3));

C.setGun('2026-08-20');
// program görevlerini gerçekçi biçimde tamamlanmış say (çalışma geçmişi)
R('D.bitti={}'); R('D.pu={}');
X.GOREVLER.filter(g=>g.d<='2026-08-19'&&['oku','video','soru','tekrar'].indexOf(g.act)>=0)
  .forEach(g=>R('D.bitti['+JSON.stringify(X.id(g))+']='+JSON.stringify(g.d)));

/* ── TEMSİLİ 200 SORULUK AYRINTILI DENEME ─────────────────────────────
   Branş başına soru sayısı = SORU.den (toplam 200). Her branşta gerçekçi
   doğru oranı + güven dağılımı (Emin/AK/Bilmiyorum/Unuttum), deterministik. */
const DEN=X.SORU.den, DB=X.DB, KONU_DAG=R('KONU_DAG');
const GUV=['E','AK','B','U'];
const sorular=[];
let idx=0;
Object.keys(DEN).forEach(br=>{
  const qn=Math.round(DEN[br]); if(!qn)return;
  const konular=Object.keys(KONU_DAG[br]||{});
  for(let i=0;i<qn;i++){ idx++;
    const konu=konular.length?konular[i%konular.length]:br;
    /* gerçekçi örüntü: her 5 sorudan ~3 doğru; güven konuya/indekse göre değişsin */
    const dogru = (idx*7)%10 < 6;            /* ~%60 doğru */
    let e;
    if(dogru){ e = (idx%5===0)?'B' : (idx%3===0)?'AK' : 'E'; }   /* çoğu Emin, bir kısmı AK/şans */
    else     { e = (idx%4===0)?'U' : (idx%3===0)?'AK' : 'B'; }   /* yanlışlar: unuttum/kararsız/boşluk */
    sorular.push({b:br, konu:konu, s:dogru?'D':'Y', e:e});
  }
});
console.log('╔════════════════════════════════════════════════════════════════╗');
console.log('║  GERÇEK VERİ AUDİTİ · PARAKETE/POTANSİYEL/R_CAL · motor değişmedi ║');
console.log('╚════════════════════════════════════════════════════════════════╝');
console.log('\nTemsili deneme: '+sorular.length+' soru (branş dağılımı SORU.den ile birebir)');

/* ── 1) VERİ BÜTÜNLÜĞÜ · uygulamanın kendi yoluyla kaydet ── */
// dqBransNet ile bn hesapla (dqKaydet aynen bunu yapıyor)
R('window.__S='+JSON.stringify(sorular));
const net=R('dqBransNet(window.__S)');
R('D.denemeler=[{tar:"2026-08-20",kay:"AUDIT temsili",t:'+net.t+',k:'+net.k+',bn:'+JSON.stringify(net.bn)+',dy:'+JSON.stringify(net.dy)+',sorular:window.__S,detay:true}]');
const kayit=R('D.denemeler[0]');
console.log('\n【1】 VERİ BÜTÜNLÜĞÜ');
console.log('  kaydedilen soru sayısı :', kayit.sorular.length, kayit.sorular.length===200?'✓':'✗');
console.log('  her soruda {b,konu,s,e} :', kayit.sorular.every(o=>o.b&&o.konu&&o.s&&o.e)?'tam ✓':'EKSİK ✗');
console.log('  toplam net T/K         :', f2(net.t), '/', f2(net.k), '(dqBransNet = ΣD−0.25·Y)');
// dqIstat 8 hücreyi ayırıyor mu
const ist=R('dqIstat()');
let sag=0,kir=0,unut=0,bilm=0; Object.values(ist.brans).forEach(b=>{sag+=b.sag;kir+=b.kir;unut+=b.unut;bilm+=b.bilm});
console.log('  dqIstat toplam         : sağlam(D+Emin)='+sag+' kırılgan(D+güvensiz)='+kir+' unuttum='+unut+' bilmiyorum='+bilm);

/* ── 5) 8'Lİ MATRİS ── */
console.log('\n【5】 8’Lİ DENEME MATRİSİ (Doğru/Yanlış × Emin/AK/Bilmiyorum/Unuttum)');
const M={}; ['D','Y'].forEach(s=>GUV.forEach(e=>M[s+e]=0));
sorular.forEach(o=>{ if(M[o.s+o.e]!==undefined)M[o.s+o.e]++; });
const pad=(x,n)=>String(x).padStart(n);
console.log('           '+['Emin','AK','Bilmiyorum','Unuttum'].map(x=>pad(x,11)).join(''));
['D','Y'].forEach(s=>{
  console.log('  '+pad(s==='D'?'DOĞRU':'YANLIŞ',7)+'  '+GUV.map(e=>pad(M[s+e],11)).join(''));
});
const topD=M.DE+M.DAK+M.DB+M.DU, topY=M.YE+M.YAK+M.YB+M.YU;
console.log('  → Doğru '+topD+' · Yanlış '+topY+' · net '+f2(topD-topY*0.25));
console.log('  A) Bildiğim halde hata (Yanlış+Emin): '+M.YE+'  → kavramsal hata / yanlış öğrenme sinyali');
console.log('  B) Bilmeden doğru (Doğru+Bilmiyorum): '+M.DB+'  → şans/tanıma, kırılgan');
console.log('  C) Kararsız (AK) doğru '+M.DAK+' · AK yanlış '+M.YAK+'  → bilgi sınırı');

/* ── 2) PARAKETE ── */
console.log('\n【2】 PARAKETE  (UI: hP/hN · kod: puan(para().t, para().k))');
const p=R('para()'), parakete=R('puan(para().t,para().k)');
const o=R('son()'), olculen=R('puan(son().t,son().k)');
// bağımsız yeniden hesap: puan formülü sabitlerden
const TABAN=R('TABAN'),KT=R('KT'),KK=R('KK');
const paraketeReco=TABAN+KT*p.t+KK*p.k;
console.log('  TABAN='+TABAN+' KT='+KT+' KK='+KK+' · para()={t:'+f2(p.t)+', k:'+f2(p.k)+'}');
console.log('  motor PARAKETE          :', f2(parakete));
console.log('  bağımsız yeniden hesap  :', f2(paraketeReco), Math.abs(parakete-paraketeReco)<1e-9?'→ BİREBİR AYNI ✓':'→ AYRIŞMA ✗');
console.log('  ölçülen (son deneme)    :', f2(olculen));

/* ── güven bandı ── */
const b1=R('puanBant(-1)'), b2=R('puanBant(1)');
console.log('  güven bandı (puanBant±1):', f2(b1)+' – '+f2(b2), '(genişlik '+f2(b2-b1)+')');

/* ── 3) POTANSİYEL ── */
console.log('\n【3】 POTANSİYEL  (UI: tkV "Kalan potansiyel" · kod: kalanKazanci().fark)');
const kk=R('kalanKazanci()');
console.log('  kalanKazanci().fark     :', f2(kk.fark), '· kalan iş:', kk.n);
console.log('  = puanVarsayim(tüm kalan) − PARAKETE → EK net (delta), skor DEĞİL');
console.log('  ULAŞILABİLİR TAVAN = PARAKETE + POTANSİYEL =', f2(parakete)+' + '+f2(kk.fark)+' = '+f2(parakete+kk.fark));

/* ── 7) PARAKETE vs POTANSİYEL aynı mı ── */
console.log('\n【7】 PARAKETE vs POTANSİYEL — aynı şey mi?');
console.log('  ölçülen    :', f2(olculen), '(şu an ölçülen net)');
console.log('  PARAKETE   :', f2(parakete), '(planı bitirirsem, decay + kalibre kazanç)');
console.log('  POTANSİYEL :', f2(kk.fark), '(kalan işten gelecek EK net · delta)');
console.log('  → FARKLI kavramlar:', Math.abs(parakete-kk.fark)>0.5?'PARAKETE bir SKOR, POTANSİYEL bir DELTA ✓':'değerler yakın, dikkat');

/* ── 4) R_CAL kalibrasyon ── */
console.log('\n【4】 R_CAL · bu deneme kalibrasyonu nasıl oynattı');
R('D.denemeler=[]'); const rc0=R('rCal()');
R('D.denemeler=[{tar:"2026-08-20",kay:"AUDIT",t:'+net.t+',k:'+net.k+',bn:'+JSON.stringify(net.bn)+',dy:'+JSON.stringify(net.dy)+',sorular:window.__S,detay:true}]');
const rc1=R('rCal()');
console.log('  deneme ÖNCESİ : R_CAL='+f3(rc0.r)+' · SD='+f3(rc0.sd)+' · n='+rc0.n);
console.log('  deneme SONRASI: R_CAL='+f3(rc1.r)+' · SD='+f3(rc1.sd)+' · n='+rc1.n);
console.log('  ΔR_CAL='+f3(rc1.r-rc0.r)+' · |Δ|'+(Math.abs(rc1.r-rc0.r)<0.08?'<0.08 → tek deneme sistemi AŞIRI oynatmıyor ✓':'büyük — incele'));
console.log('  (güven E/AK/B/U bu kayıtta bn/net üzerinden; ayrık kd/ky/kb 24’lük D.kal kaydında)');

/* ── FAZ 3 trend + FAZ 4 tempo ── */
console.log('\n【+】 FAZ 3 trend & FAZ 4 tempo (tek deneme olduğu için sınırlı)');
const tr=R('denemeTrend(5)');
console.log('  denemeTrend(5):', tr.yeter===false?('yetersiz veri (n='+tr.n+') → "en az 2 ölçüm" ✓ dürüst'):JSON.stringify(tr.seri));
const tp=R('tempoProjeksiyon(0)');
console.log('  tempoProjeksiyon: tempo='+f2(tp.tempo)+' sa/gün · kapasite='+tp.kapasite+' sa · mevcut='+f1(tp.mevcut)+' → tempo net='+f1(tp.net)+' (seçilen '+tp.secilenIs+'/'+tp.kalanIs+' iş)');

/* ── 8) GÖREV MOTORU ── */
console.log('\n【8】 GÖREV MOTORU · rehberSec ilk 10 (bu denemeyi veri kabul ederek)');
const L=R('rehberSec()').slice(0,10);
L.forEach((a,i)=>{ const n=a.neden;
  console.log('  '+(i+1)+'. '+a.u.brans+' / '+a.u.konu+'  CS='+f2(a.CS)+
    '  [boş='+f2(n.bos)+' yan='+f2(n.yan)+' çür='+f2(n.cur)+(n.sonGun!=null?'(son '+n.sonGun+'g)':'')+' düş='+f2(n.dus)+' soru='+f1(a.u.soru)+']');
});

/* ── 6) DENEME→KONU: en zayıf konular ── */
console.log('\n【6】 DENEME → KONU (boşluk haritası · dqIstat.bosluk, ilk 8)');
const bos=Object.entries(ist.bosluk).sort((a,b)=>b[1]-a[1]).slice(0,8);
bos.forEach(([k,v])=>console.log('  '+String(k).slice(0,44).padEnd(44)+' boşluk '+v));
if(!bos.length)console.log('  (bosluk yalnız Bilmiyorum+yanlış konulardan; bu temside konu-adı eşleşmesine bağlı)');

console.log('\n【VERDİKT】 aşağıda metinle.');
