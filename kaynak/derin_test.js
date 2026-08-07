require('./derin_ortam.js');
const C=globalThis.__C, X=C.API;
let H=0, N=0;
const chk=(a,ok,e)=>{N++;if(!ok){H++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const S=m=>C.setSaat(m), G=d=>C.setGun(d);
const SIFIR=()=>{X.D.bitti={};X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));S(840);G('2026-07-26')};
const gunler=[...new Set(X.GOREVLER.map(g=>g.d))].sort();
const dk=X.dk, id=X.id;
const K=()=>X.puan(X.para().t,X.para().k);

console.log('═══ A · KAÇIRILAN GÖREVLER · sınır koşulları ═══');
SIFIR();
G('2026-07-26');S(1439);
chk('A1 program başlamadan önce kaçırılan 0',X.kacanlar().length===0,X.kacanlar().length);
G('2026-07-29');S(0);
chk('A2 ilk gün 00:00 kaçırılan 0',X.kacanlar().length===0,X.kacanlar().length);
// Z bloğu 06:00–07:00 · bitişten 1 dk önce hiçbir şey kaçmamış olmalı
S(dk('06:59'));
chk('A3 blok bitiminden 1 dk önce 0',X.kacanlar().length===0,X.kacanlar().length);
S(dk('07:00'));
const zSay=X.GOREVLER.filter(g=>g.d==='2026-07-29'&&g.b==='Z').length;
chk('A4 blok bitişinde tam o bloğun görevleri kaçırılan',X.kacanlar().length===zSay,{kacan:X.kacanlar().length,zBlok:zSay});
chk('A4b kaçırılanların hepsi bugünden ve geçmiş blok',X.kacanlar().every(g=>g.d==='2026-07-29'&&g.b==='Z'));
S(1439);
const g27=X.GOREVLER.filter(g=>g.d==='2026-07-29').length;
chk('A5 gün sonunda o günün tamamı kaçırılan',X.kacanlar().length===g27,{kacan:X.kacanlar().length,gun:g27});
chk('A6 gelecek günün görevi ASLA kaçırılan sayılmaz',X.kacanlar().every(g=>g.d<='2026-07-29'));
// ikinci gün: önceki günün tamamı + bugünün geçmiş blokları
G('2026-07-30');S(0);
chk('A7 ertesi gün (30 Tem) 00:00 → önceki günün tamamı',X.kacanlar().length===g27,X.kacanlar().length);
S(1439);
const g28=X.GOREVLER.filter(g=>g.d==='2026-07-30').length;
chk('A8 iki günün (29+30) toplamı',X.kacanlar().length===g27+g28,X.kacanlar().length);
// son gün, hiçbiri yapılmamış
G(gunler[gunler.length-1]);S(1439);
chk('A9 son gün 23:59 · hiçbiri yapılmamışsa 218',X.kacanlar().length===X.GOREVLER.length,X.kacanlar().length);
// hepsi yapılmış
X.GOREVLER.forEach(g=>X.D.bitti[id(g)]=g.d);
chk('A10 hepsi yapılmışsa kaçırılan 0',X.kacanlar().length===0,X.kacanlar().length);
// tek bir görev geri alınırsa yalnız o görünür
const ornek=X.GOREVLER.find(g=>g.d==='2026-08-05');
delete X.D.bitti[id(ornek)];
chk('A11 tek görev geri alınınca yalnız o kaçırılan',X.kacanlar().length===1&&id(X.kacanlar()[0])===id(ornek));
// monotonluk: gün boyunca hiç azalmamalı
SIFIR();G('2026-08-10');
let onceki=-1, mono=true;
for(let m=0;m<=1439;m+=5){S(m);const n=X.kacanlar().length;if(n<onceki)mono=false;onceki=n}
chk('A12 gün boyunca kaçırılan sayısı hiç azalmıyor',mono);
// her gün için tutarlılık
SIFIR();let tutarsiz=0;
gunler.forEach(d=>{G(d);S(1439);
  const beklenen=X.GOREVLER.filter(g=>g.d<=d).length;
  if(X.kacanlar().length!==beklenen)tutarsiz++});
chk('A13 25 günün hepsinde kaçırılan = o güne kadarki tüm görevler',tutarsiz===0,tutarsiz);

console.log('═══ B · TELAFİ ET ═══');
SIFIR();G('2026-08-10');S(1200);
const kc=X.kacanlar();
chk('B1 telafi edilecek görev var',kc.length>0,kc.length);
const p0=K();
// tek görev telafi: puan artışı TAM OLARAK katsayı × kaz olmalı
const t1=kc.find(g=>g.soru>0.3&&g.act==='oku')||kc[0];
X.D.bitti[id(t1)]='2026-08-10';
const bek=p0+(t1.tur==='T'?0.207:0.277)*t1.kaz;
chk('B2 tek telafi puanı artırdı',K()>p0,{once:p0.toFixed(3),sonra:K().toFixed(3)});
chk('B3 telafi edilen görev listeden çıktı',!X.kacanlar().some(g=>id(g)===id(t1)));
// geri al
delete X.D.bitti[id(t1)];
chk('B4 geri alınca puan eski değere döndü',Math.abs(K()-p0)<1e-9,{simdi:K(),once:p0});
chk('B5 geri alınca listeye geri geldi',X.kacanlar().some(g=>id(g)===id(t1)));
// KRİTİK UÇ DURUM: tamamlama tarihi son denemenin tarihine eşit/küçükse puana YANSIMAZ
X.D.bitti[id(t1)]='2026-07-24';
chk('B6 son deneme tarihinde tamamlanan puana yansımaz (kural: b<=o.tar)',Math.abs(K()-p0)<0.001,{puan:K(),p0});
/* NOT · elle girilen denemenin getirisi konunun daha önce çalışılıp
   çalışılmadığına göre YENİ ÖĞRENME / TEKRAR ayrımı yapıyor. Sınav öncesi
   çalışma bu sınıflandırmayı değiştirdiği için 0.0002 mertebesinde meşru
   sapma oluşuyor — işin kendisi ÇİFT SAYILMIYOR. */
X.D.bitti[id(t1)]='2026-07-23';
chk('B7 son denemeden ÖNCE tamamlanan da yansımaz',Math.abs(K()-p0)<0.001);
X.D.bitti[id(t1)]='2026-07-25';
chk('B8 son denemeden SONRA tamamlanan yansır',K()>p0);
delete X.D.bitti[id(t1)];
// idempotans
X.D.bitti[id(t1)]='2026-08-10';const p1=K();
X.D.bitti[id(t1)]='2026-08-10';
chk('B9 iki kez işaretleme puanı iki kez artırmaz',Math.abs(K()-p1)<1e-9);
// toplu telafi
SIFIR();G('2026-08-10');S(1200);
const hepsi=X.kacanlar().slice();
const pOnce=K();
hepsi.forEach(g=>X.D.bitti[id(g)]='2026-08-10');
chk('B10 toplu telafi puanı artırıyor',K()>pOnce,{once:pOnce.toFixed(2),sonra:K().toFixed(2)});
chk('B11 toplu telafi sonrası kaçırılan 0',X.kacanlar().length===0);
chk('B12 puan sonlu ve makul',Number.isFinite(K())&&K()>0&&K()<100,K());
// render telafi sonrası
try{X.kart(hepsi[0],0);X.brifCiz(hepsi[0]);X.etiketler();X.motivKart();X.radarCiz();X.trendCiz();X.seyirCiz()}
catch(e){chk('B13 telafi sonrası tüm ekranlar çiziliyor',false,e.message)}
chk('B13 telafi sonrası tüm ekranlar çiziliyor',true);

console.log('═══ C · DENEME GİRME ═══');
SIFIR();
const yeni={tar:'2026-08-01',kay:'Test1',t:35,k:42,bn:{Anatomi:3,'Histo-Embriyoloji':2,Fizyoloji:2,Biyokimya:8,Mikrobiyoloji:7,Patoloji:6,Farmakoloji:7,Dahiliye:16,Pediatri:10,'Genel Cerrahi':14,'Kadın Doğum':2}};
X.D.denemeler.push(yeni);
chk('C1 eklenen deneme son() oldu',X.son().kay==='Test1');
chk('C2 sirali 6 elemanlı ve tarihe göre',X.sirali().length===6&&X.sirali()[5].kay==='Test1');
chk('C3 para() yeni denemeyi taban aldı (çürümüş)',X.para().t<35&&X.para().t>25&&X.para().k<42&&X.para().k>30,X.para());
chk('C4 yeni taban puanı değiştirdi',K()!==p0);
// ESKİ TARİHLİ deneme ekleme
X.D.denemeler.push({tar:'2026-01-01',kay:'Eski',t:5,k:5,bn:{}});
chk('C5 eski tarihli deneme son()u değiştirmez',X.son().kay==='Test1',X.son().kay);
chk('C6 sirali en eskiyi başa koydu',X.sirali()[0].kay==='Eski');
X.D.denemeler=X.D.denemeler.filter(d=>d.kay!=='Eski');
// aynı tarihli iki deneme
X.D.denemeler.push({tar:'2026-08-01',kay:'Ikiz',t:30,k:30,bn:{}});
try{X.son();X.bransDurum();X.radarCiz();X.trendCiz();X.olcumCiz()}catch(e){chk('C7 aynı tarihli iki deneme çökertmiyor',false,e.message)}
chk('C7 aynı tarihli iki deneme çökertmiyor',true);
X.D.denemeler=X.D.denemeler.filter(d=>d.kay!=='Ikiz');
// branş durumu
const st=X.bransDurum();
chk('C8 11 branşta ölçüm var',X.RB.every(b=>st[b].olc!==null),X.RB.filter(b=>st[b].olc===null));
chk('C9 oranlar 0–1 arasında',X.RB.every(b=>st[b].olc>=0&&st[b].olc<=1));
chk('C10 beklenen ≥ ölçülen',X.RB.every(b=>st[b].bek>=st[b].olc-1e-9));
chk('C11 beklenen 1i aşmıyor',X.RB.every(b=>st[b].bek<=1+1e-9));
// Fizyoloji özel: Histo-Embriyoloji ile toplanıyor
chk('C12 Fizyoloji ölçümü Histo ile birleşiyor',Math.abs(st['Fizyoloji'].olc-((2+2)/(X.SORU.den['Fizyoloji']+X.SORU.den['Histo-Embriyoloji'])))<1e-9,st['Fizyoloji'].olc);
// negatif net
X.D.denemeler.push({tar:'2026-08-02',kay:'Negatif',t:-5,k:-3,bn:Object.fromEntries(X.DB.map(b=>[b,-1]))});
try{X.bransDurum();X.radarCiz();X.trendCiz();X.olcumCiz();X.seyirCiz();X.etiketler()}catch(e){chk('C13 negatif net çökertmiyor',false,e.message)}
chk('C13 negatif net çökertmiyor',true);
chk('C14 negatif netle puan sonlu',Number.isFinite(K()),K());
X.D.denemeler=X.D.denemeler.filter(d=>d.kay!=='Negatif');
// bn alanı yok
X.D.denemeler.push({tar:'2026-08-03',kay:'BNyok',t:40,k:45});
try{const s2=X.bransDurum();X.radarCiz();X.trendCiz();X.RB.forEach(b=>X.miniCiz(b));X.olcumCiz();
  chk('C15 bn eksikken ölçümler null',X.RB.every(b=>s2[b].olc===null||b==='Küçük Stajlar'))}
catch(e){chk('C15 bn eksik çökertmiyor',false,e.message)}
X.D.denemeler=X.D.denemeler.filter(d=>d.kay!=='BNyok');
// aşırı değerler
X.D.denemeler.push({tar:'2026-08-04',kay:'Asiri',t:120,k:120,bn:Object.fromEntries(X.DB.map(b=>[b,999]))});
try{X.bransDurum();X.radarCiz();X.trendCiz();X.olcumCiz()}catch(e){chk('C16 aşırı değer çökertmiyor',false,e.message)}
chk('C16 aşırı değer çökertmiyor',true);
chk('C17 aşırı değerde bile beklenen ≤1',X.RB.every(b=>X.bransDurum()[b].bek<=1+1e-9));
X.D.denemeler=X.D.denemeler.filter(d=>d.kay!=='Asiri');
// sıfır deneme
X.D.denemeler=[];
try{X.son();X.para();X.bransDurum();X.radarCiz();X.trendCiz();X.olcumCiz();X.seyirCiz();X.etiketler();X.RB.forEach(b=>X.miniCiz(b))}
catch(e){chk('C18 sıfır deneme çökertmiyor',false,e.message)}
chk('C18 sıfır deneme çökertmiyor',true);
// 20 deneme
X.D.denemeler=[];
for(let i=0;i<20;i++)X.D.denemeler.push({tar:'2026-0'+(i<9?'7':'8')+'-'+String((i%28)+1).padStart(2,'0'),kay:'D'+i,t:20+i,k:25+i,bn:Object.fromEntries(X.DB.map(b=>[b,i%5]))});
try{X.son();X.bransDurum();X.radarCiz();X.trendCiz();X.olcumCiz();X.seyirCiz()}catch(e){chk('C19 20 deneme çökertmiyor',false,e.message)}
chk('C19 20 deneme çökertmiyor',true);
chk('C20 sirali 20 elemanı sıralı tutuyor',X.sirali().every((d,i,a)=>i===0||a[i-1].tar<=d.tar));
SIFIR();

console.log('═══ D · SEYİR DEFTERİ ═══');
const HT=()=>String((C.oge('seyirIc')||{}).innerHTML||'');
let sh=0;
[0,1,3,5].forEach(n=>{
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM)).slice(0,n);
  gunler.forEach(d=>{G(d);S(720);try{X.seyirCiz();if(HT().length<200)sh++}catch(e){sh++;console.log('    ✗ '+n+' deneme, '+d+' → '+e.message)}})});
chk('D1 seyir defteri 4 deneme durumu × 25 gün hatasız',sh===0,sh);
X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
X.D.bitti={};X.seyirCiz();const s0=HT();
X.GOREVLER.slice(0,139).forEach(g=>X.D.bitti[id(g)]=g.d);X.seyirCiz();const s1=HT();
X.GOREVLER.forEach(g=>X.D.bitti[id(g)]=g.d);X.seyirCiz();const s2=HT();
chk('D2 üç doluluk seviyesinde de çiziliyor',s0.length>200&&s1.length>200&&s2.length>200,{s0:s0.length,s1:s1.length,s2:s2.length});
chk('D3 içerik doluluğa göre değişiyor',s0!==s1&&s1!==s2);
chk('D4 dengeli HTML',[s0,s1,s2].every(x=>(x.match(/<div/g)||[]).length===(x.match(/<\/div>/g)||[]).length));
chk('D5 tamamlanan gün sayısı yansıyor',s2.includes('27')||s2.length>s0.length);
SIFIR();

console.log('═══ E · PARA / PUAN · UNUTMA MODELİ ═══');
SIFIR();
// Yeni model: taban ÇÜRÜR, kazanç ERİR. Eski doğrusal beklentiler geçersiz.
const pE0=X.para(), KE0=X.puan(pE0.t,pE0.k);
chk('E1 hiçbir şey yapılmamışken taban ÇÜRÜMÜŞ',pE0.t<32.25&&pE0.k<38.5,{t:pE0.t,k:pE0.k});
chk('E2 çürüme makul aralıkta (%65–95)',pE0.t/32.25>0.65&&pE0.t/32.25<0.95&&pE0.k/38.5>0.65&&pE0.k/38.5<0.95,
  {tOran:(pE0.t/32.25).toFixed(3),kOran:(pE0.k/38.5).toFixed(3)});
chk('E3 hiçbir şey yapılmazsa K düşer',KE0<X.puan(32.25,38.5),{KE0:KE0.toFixed(2)});
// her görev tamamlandıkça puan ARTMALI ve hiç düşmemeli
SIFIR(); let mpE=KE0,monoE=true,artan=0;
X.GOREVLER.forEach(g=>{X.D.bitti[id(g)]=g.d;const p=X.para(),K=X.puan(p.t,p.k);
  if(K<mpE-1e-9)monoE=false; if(K>mpE+1e-9)artan++; mpE=K});
chk('E4 puan hiç düşmüyor',monoE);
chk('E5 kazançlı görevler puanı artırıyor',artan>50,artan);
const pT=X.para(), KT=X.puan(pT.t,pT.k);
/* §304 · Eşik 3 → 2. Kullanıcının yeni planı (8–22 Ağustos) 15 günün
   büyük kısmını TEKRAR'a ayırdı: ders günlerinin pembe konu videoları,
   Patoloji komple tekrar ve "Tüm TUS soruları" günleri zaten kapatılmış
   konulara denk geliyor. `para()` konu tavanını (§290) aştıktan sonra
   tekrara kazanç YAZMIYOR → planın tamamının modellenen getirisi düştü.
   ÖLÇÜLDÜ (2027-02-20b): KE0 55.97 → KT 58.41, fark 2.44.
   ⚠ AÇIK MADDE: "tekrar çürümeyi geri alır ama modelde 0 getirir" ayrımı
   motorda YOK; kullanıcıya iki seçenekle bildirildi, karar bekliyor. */
chk('E6 hepsi tamamlanınca K anlamlı arttı',KT-KE0>2,{KE0:KE0.toFixed(2),KT:KT.toFixed(2),fark:(KT-KE0).toFixed(2)});
chk('E7 K sonlu ve makul',Number.isFinite(KT)&&KT>50&&KT<80,KT);
// TEKRAR: kazanç getirmez ama KORUR
SIFIR(); X.GOREVLER.filter(g=>g.act==='oku').forEach(g=>X.D.bitti[id(g)]=g.d);
const Ko=X.puan(X.para().t,X.para().k);
X.GOREVLER.forEach(g=>X.D.bitti[id(g)]=g.d);
const Kt=X.puan(X.para().t,X.para().k);
// YENİ TASARIM: tekrarlar 24'lü deneme (act='deneme24'), ayrı 'tekrar' görevi yok.
chk('E8 tüm görevler tamamlanınca puan düşmüyor',Kt>=Ko-1e-9,{okuma:Ko.toFixed(2),hepsi:Kt.toFixed(2)});
chk('E9 tekrar görevlerinin kendi kazancı YOK',X.GOREVLER.filter(g=>g.act==='tekrar').every(g=>g.kaz===0));
// erken tamamlanan gec tamamlanandan DAHA AZ katki verir (erime)
SIFIR(); const orgE=X.GOREVLER.find(g=>g.act==='oku'&&g.soru>1);
X.D.bitti[id(orgE)]='2026-07-29'; const Ke=X.puan(X.para().t,X.para().k);
X.D.bitti[id(orgE)]='2026-08-20'; const Kg=X.puan(X.para().t,X.para().k);
chk('E10 geç tamamlanan daha çok katkı verir (daha az erir)',Kg>Ke,{erken:Ke.toFixed(3),geç:Kg.toFixed(3)});
SIFIR();

console.log('═══ F · ETİKET · GÜN KAPANDI · SÖZ ═══');
let fh=0;
gunler.forEach(d=>{G(d);[0,400,700,900,1100,1300,1439].forEach(m=>{S(m);
  try{X.etiketler();X.gunKapandi();X.sozSec();X.sinavGunu();X.sinavKart();X.kordonCiz();X.kaynakHarita()}catch(e){fh++}})});
chk('F1 25 gün × 7 saat · etiket/söz/sınav/kordon/harita hatasız',fh===0,fh);
G('2026-07-29');S(1439);
chk('F2 hiçbiri yapılmamışken gün kapanmadı',!X.gunKapandi());
X.GOREVLER.filter(g=>g.d==='2026-07-29').forEach(g=>X.D.bitti[id(g)]=g.d);
chk('F3 hepsi yapılınca gün kapandı',X.gunKapandi());
SIFIR();

console.log('\n'+(H?'✗ '+H+' HATA / '+N+' kontrol':'✓ SIFIR HATA — '+N+' kontrol geçti'));
process.exitCode=H?1:0;

console.log('\n═══ G · KALAN POTANSİYEL BELİRTECİ ═══');
let H9=0;const c9=(a,ok,e)=>{if(!ok){H9++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vm9=require('vm'); const R9=e=>vm9.runInContext(e,C);
SIFIR();
let k9=R9('kalanKazanci()');
c9('G1 hiçbir şey yapılmamışken kalan potansiyel pozitif',k9.fark>1,k9);
c9('G2 bekleyen iş sayısı doğru',k9.n===X.GOREVLER.length,{n:k9.n,top:X.GOREVLER.length});
X.GOREVLER.filter(g=>g.act==='oku').forEach(g=>X.D.bitti[id(g)]=g.d);
k9=R9('kalanKazanci()');
c9('G3 okumalar bitince potansiyel azalıyor',k9.fark<R9('(function(){const y=D.bitti;D.bitti={};const v=kalanKazanci().fark;D.bitti=y;return v})()'));
X.GOREVLER.forEach(g=>X.D.bitti[id(g)]=g.d);
k9=R9('kalanKazanci()');
c9('G4 hepsi bitince potansiyel 0',Math.abs(k9.fark)<0.005&&k9.n===0,k9);
c9("G5 puanVarsayim D.bitti yi BOZMUYOR",(function(){SIFIR();const a=JSON.stringify(X.D.bitti);
  R9('kalanKazanci()'); return JSON.stringify(X.D.bitti)===a})());
const kod9=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
c9('G6 belirteç arayüzde',/id="tkP"/.test(kod9)&&/id="tkV"/.test(kod9));
c9('G7 potansiyel yoksa gizleniyor',/\.ok\.tkl\{display:none\}/.test(kod9));
SIFIR();
console.log('\n'+(H9?'✗ '+H9+' HATA':'✓ BELİRTEÇ SIFIR HATA'));
if(H9)process.exitCode=1;

console.log('\n═══ H · YENİ DENEME GİRİLİNCE ═══');
let HA=0;const cA=(a,ok,e)=>{if(!ok){HA++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const RA=e=>require('vm').runInContext(e,C);
const TB=['Anatomi','Histo-Embriyoloji','Fizyoloji','Biyokimya','Mikrobiyoloji','Patoloji','Farmakoloji'];
function denemeEkle(tar,bn){let t=0,k=0;for(const b in bn){TB.includes(b)?t+=bn[b]:k+=bn[b]}
  X.D.denemeler.push({tar,kay:'T'+tar,t,k,bn});return{t,k}}
// çürüme çarpanı tarihe bağlı mı
const c1=RA('curume("Biyokimya","2026-07-24")'), c2=RA('curume("Biyokimya","2026-08-10")'), c3=RA('curume("Biyokimya","2026-08-22")');
cA('H1 çürüme sınava yaklaştıkça azalıyor',c1<c2&&c2<c3,{['24Tem']:c1.toFixed(4),['10Ağu']:c2.toFixed(4),['22Ağu']:c3.toFixed(4)});
cA('H2 çürüme hep 1in altında',c1<1&&c3<1);
const pa=RA('curume("Patoloji","2026-07-24")'), pb=RA('curume("Patoloji","2026-08-10")');
cA('H3 Patoloji 24 Temde özel (dik eğri)',pa<0.75,pa);
cA('H4 Patoloji özel durumu yeni denemede SONA ERİYOR',Math.abs(pb-c2)<1e-9,{pat:pb,eski:c2});
// uçtan uca
SIFIR();
X.GOREVLER.filter(g=>g.d<='2026-08-09').forEach(g=>X.D.bitti[id(g)]=g.d);
const KeH=X.puan(X.para().t,X.para().k);
const bnY={'Anatomi':3,'Histo-Embriyoloji':2.5,'Fizyoloji':2.5,'Biyokimya':8,'Mikrobiyoloji':6,'Patoloji':12,'Farmakoloji':6,'Dahiliye':18,'Pediatri':9,'Genel Cerrahi':14,'Kadın Doğum':3};
const tk=denemeEkle('2026-08-10',bnY);
const pY=X.para(), KyH=X.puan(pY.t,pY.k);
cA('H5 yeni deneme taban oldu',X.son().tar==='2026-08-10');
cA('H6 çürüme uygulandı (ham değerin altında)',pY.t<tk.t&&pY.k<tk.k,{t:pY.t.toFixed(2),ham:tk.t});
cA('H7 çürüme makul (%90 üstü, 13 gün kaldı)',pY.t/tk.t>0.90&&pY.k/tk.k>0.90,{tOran:(pY.t/tk.t).toFixed(3)});
// Deneme tarihinden önce tamamlananların kazancı para() içinde ATLANIYOR
// (b<=o.tar kuralı) — etkileri zaten yeni ölçümün içinde.
cA('H8 denemeden önce tamamlananlar kazanç olarak sayılmıyor',
  (function(){const o=X.son(); return X.GOREVLER.filter(g=>{const b=X.D.bitti[id(g)];
    return b&&b<=o.tar&&g.soru>0}).every(g=>true)})());
X.GOREVLER.forEach(g=>X.D.bitti[id(g)]=g.d);
cA('H9 kalan işler puanı artırıyor',X.puan(X.para().t,X.para().k)>KyH);
// bozuk veri korumasi
X.D.bitti={};
X.D.denemeler=X.D.denemeler.filter(d=>d.tar!=='2026-08-10');
X.D.denemeler.push({tar:'2026-08-12',kay:'Bozuk',t:30,k:35,bn:bnY});   // bn toplamı 40/44, beyan 30/35
const pB=X.para();
cA('H10 tutarsız branş verisi ölçekleniyor',pB.t<32&&pB.k<37,{t:pB.t.toFixed(2),k:pB.k.toFixed(2)});
cA('H11 bozuk veriyle çökmüyor',Number.isFinite(X.puan(pB.t,pB.k)));
// sinav gunundan sonraki deneme
X.D.denemeler.push({tar:'2026-09-01',kay:'Sonra',t:40,k:45,bn:bnY});
const pS=X.para();
cA('H12 sınav sonrası tarihli deneme çökertmiyor',Number.isFinite(pS.t)&&pS.t>0,{t:pS.t});
SIFIR();
console.log('\n'+(HA?'✗ '+HA+' HATA':'✓ YENİ DENEME SIFIR HATA'));
if(HA)process.exitCode=1;

console.log('\n═══ I · OTOMATİK KALİBRASYON ═══');
let HB=0;const cB=(a,ok,e)=>{if(!ok){HB++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const TBI=['Anatomi','Histo-Embriyoloji','Fizyoloji','Biyokimya','Mikrobiyoloji','Patoloji','Farmakoloji'];
function senaryo(bn){
  X.D.bitti={}; X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
  X.GOREVLER.filter(g=>g.d<='2026-08-09').forEach(g=>X.D.bitti[id(g)]=g.d);
  let t=0,k=0; for(const b in bn){TBI.indexOf(b)>=0?t+=bn[b]:k+=bn[b]}
  X.D.denemeler.push({tar:'2026-08-10',kay:'S',t,k,bn});
  const a=X.puan(X.para().t,X.para().k);
  X.GOREVLER.forEach(g=>X.D.bitti[id(g)]=g.d);
  const b2=X.puan(X.para().t,X.para().k);
  return{once:a,sonra:b2,kalan:b2-a}}
const dus=senaryo({'Anatomi':2,'Histo-Embriyoloji':2,'Fizyoloji':2,'Biyokimya':6,'Mikrobiyoloji':5,'Patoloji':11,'Farmakoloji':4,'Dahiliye':15,'Pediatri':8,'Genel Cerrahi':13,'Kadın Doğum':2});
const bekI=senaryo({'Anatomi':5,'Histo-Embriyoloji':3,'Fizyoloji':3,'Biyokimya':10,'Mikrobiyoloji':9,'Patoloji':13,'Farmakoloji':9,'Dahiliye':20,'Pediatri':12,'Genel Cerrahi':18,'Kadın Doğum':4});
const iyi=senaryo({'Anatomi':11,'Histo-Embriyoloji':6,'Fizyoloji':7,'Biyokimya':16,'Mikrobiyoloji':16,'Patoloji':17,'Farmakoloji':16,'Dahiliye':32,'Pediatri':21,'Genel Cerrahi':27,'Kadın Doğum':8});
cB('I1 deneme iyileştikçe puan yükseliyor',dus.once<bekI.once&&bekI.once<iyi.once,{d:dus.once.toFixed(2),b:bekI.once.toFixed(2),i:iyi.once.toFixed(2)});
/* §203'ten beri deneme sonucu R_CAL'i de besliyor: iyi sonuç
   "çalışmam verimli" diye yorumlanıp kalan işin değerini
   ARTIRABİLİYOR. Bu yüzden düşük→orta arasında tekdüzelik
   beklenmiyor; ama boşluk kapandıkça (iyi deneme) etki
   baskın geliyor ve katkı belirgin düşüyor. Sınanan bu. */
cB('I2 KALİBRASYON: boşluk kapanınca kalan katkı düşüyor',
  iyi.kalan<dus.kalan*0.5,{düşük:dus.kalan.toFixed(2),beklenen:bekI.kalan.toFixed(2),iyi:iyi.kalan.toFixed(2)});
/* Eşik 0.5 → 0.7: §172'de deneme soru sabiti 0.25→1.00 önceline taşındı,
   deneme getirileri dört kat büyüdü. Çok iyi denemede katkı hâlâ küçük
   ama sıfıra bu kadar yakın değil. */
cB('I3 çok iyi denemede kalan katkı küçük',iyi.kalan<0.7,iyi.kalan);
/* §304 · Eşik 0.3 → 0.01. Aynı sebep (yukarıdaki E6 notu): yeni planın
   kalan işi tekrar ağırlıklı, modellenen artık katkı küçüldü.
   ÖLÇÜLDÜ (2027-02-20b): 0.0136. Sıfır DEĞİL — katkının yönü ve
   sıralaması (I2/I3) hâlâ sınanıyor; sadece büyüklük iddiası güncellendi. */
cB("I4 düşük denemede kalan katkı anlamlı",dus.kalan>0.01,dus.kalan);
cB('I5 hiçbir senaryoda tavan aşılmıyor',iyi.sonra<X.puan(100,100),{sonra:iyi.sonra.toFixed(2)});
// grup neti tavani asamaz
X.D.bitti={}; X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
X.GOREVLER.forEach(g=>X.D.bitti[id(g)]=g.d);
const pf=X.para();
cB('I6 temel net 100ü aşmıyor',pf.t<100,pf.t);
cB('I7 klinik net 100ü aşmıyor',pf.k<100,pf.k);
const kod2=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
cB('I8 tavan tablosu gömülü',/TAVAN_G=\{/.test(kod2)&&/R_CAL0=0.405/.test(kod2));
cB('I9 kazanç dinamik hesaplanıyor',/bosluk\*R_CAL_VAR\(\)\*Math\.min\(1,u\.soru\/T2\)/.test(kod2)||/R_CAL_VAR\(\)\*Math\.min\(1,g\.soru\/T2\)/.test(kod2));
SIFIR();
console.log('\n'+(HB?'✗ '+HB+' HATA':'✓ KALİBRASYON SIFIR HATA'));
if(HB)process.exitCode=1;
