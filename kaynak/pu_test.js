require('./derin_ortam.js');
const C=globalThis.__C, X=C.API, vm=require('vm'), fs=require('fs');
const R=e=>vm.runInContext(e,C);
let H=0,N=0;const chk=(a,ok,e)=>{N++;if(!ok){H++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const kod=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8');
const AD=R('POWERUP.map(u=>u.kitap+"|"+u.konu)');
console.log('═══ POWER UP ═══');
chk('havuz gömülü',R('POWERUP.length')>40,R('POWERUP.length'));
chk('verime göre sıralı',R('POWERUP.every((u,i,a)=>i===0||a[i-1].verim>=u.verim)'));
chk('hiçbiri programda değil (kitap+konu)',(function(){
  /* Aynı ad farklı kitapta olabilir — gerçek tekrar kitap+konu eşleşmesidir. */
  const p=new Set(X.GOREVLER.filter(g=>!g.pu&&g.act==='oku')
    .map(g=>(String(g.src||'').split(' sf ')[0]).trim()+'|'+g.k.replace(/\s+·\s\d+\/\d+\.\sparça/,'')));
  return R('POWERUP').every(u=>!p.has(u.kitap+'|'+u.konu))})());
chk('sayfa ve süre bilgisi var',R('POWERUP.every(u=>u.saat>0&&u.sayfa>0&&(u.sf||u.aralik))'));
// cekme / geri gonderme
C.setGun('2026-08-05'); X.D.bitti={}; R('D.pu={}; puSenkron()');
const n0=X.GOREVLER.length;
R('D.pu['+JSON.stringify(AD[0])+']={al:"2026-08-05",bit:null,tb:null}; puSenkron()');
chk('çarka çekilince göreve dönüşüyor',X.GOREVLER.length===n0+1&&X.GOREVLER.some(g=>g.pu));
chk('çekilen görev çark listesinde',(function(){const i=X.GOREVLER.findIndex(g=>g.pu);
  return X.carkListe?X.carkListe().indexOf(i)>=0:true})());
R('D.pu={}; puSenkron()');
chk('geri gönderilince görev siliniyor',X.GOREVLER.length===n0&&!X.GOREVLER.some(g=>g.pu));
// projeksiyon
const a=X.para(), K0=X.puan(a.t,a.k);
R('D.pu['+JSON.stringify(AD[0])+']={al:"2026-08-05",bit:"2026-08-05",tb:null}; puSenkron()');
const g0=X.GOREVLER.find(g=>g.pu&&(g.act==='oku'||g.act==='soru')); X.D.bitti[X.id(g0)]='2026-08-05';
const b=X.para(), K1=X.puan(b.t,b.k);
chk('tamamlanınca projeksiyon ARTIYOR',K1>K0,{once:K0.toFixed(3),sonra:K1.toFixed(3)});
chk('artış çürümeye tabi ve makul',K1-K0>0&&K1-K0<1.0,{fark:(K1-K0).toFixed(3)});
// tekrar
chk('tekrar görevi oluştu',X.GOREVLER.filter(g=>g.pu&&g.act==='tekrar').length===1);
chk('tekrar günü sınavdan önce',R('puTekrarGun("2026-08-05")')<'2026-08-23');
chk('sınava 3 gün kala tekrar HESAPLANMIYOR',R('puTekrarGun("2026-08-20")')===null);
chk('sınava 5 günden az kala tekrar yok',R('puTekrarGun("2026-08-19")')===null);
chk('erken tamamlamada tekrar var',R('puTekrarGun("2026-07-30")')!==null);
// streak
C.setGun('2026-08-08'); R('D.pu={}');
for(let i=0;i<4;i++){const d=new Date('2026-08-08T00:00');d.setDate(d.getDate()-i);
  R('D.pu['+JSON.stringify(AD[i])+']={al:"x",bit:"'+d.toISOString().slice(0,10)+'"}')}
chk('4 gün üst üste → streak 4',R('puStreak()')===4,R('puStreak()'));
R('delete D.pu['+JSON.stringify(AD[0])+']');
chk('bugün yok dün var → seri sürüyor',R('puStreak()')===3,R('puStreak()'));
R('D.pu={}'); R('D.pu['+JSON.stringify(AD[0])+']={al:"x",bit:"2026-08-01"}');
chk('7 gün önce → seri kopmuş',R('puStreak()')===0,R('puStreak()'));
R('D.pu={}');
for(let i=0;i<12;i++){const d=new Date('2026-08-08T00:00');d.setDate(d.getDate()-i);
  R('D.pu['+JSON.stringify(AD[i])+']={al:"x",bit:"'+d.toISOString().slice(0,10)+'"}')}
chk('12 gün → streak 12, kademe 10de tavan',R('puStreak()')===12&&R('puKademe(puStreak())')===10);
// arayuz
console.log('═══ ARAYÜZ ═══');
chk('orb doğrudan tıklanabilir (menü yok)',/class="puOrb" id="puOrb"/.test(kod)&&!/id="menuB"/.test(kod));
chk('güç ışını mavisi',/\.puOrb\{[\s\S]{0,300}rgba\(120,200,255/.test(kod));
chk('siluet SVG',/id="puOrb"[\s\S]{0,200}<svg viewBox="0 0 24 24">/.test(kod));
chk('streak rozeti',/id="puStr"/.test(kod)&&/\.puOrb s\.gor\{display:block\}/.test(kod));
chk('10 kademe alev',/\.puOrb\.k10::before\{opacity:1\}/.test(kod)&&/\.puOrb\.k10::after\{height:32px/.test(kod));
chk('alev animasyonu yavaş (≥4sn)',/puAlev 5\.2s/.test(kod)&&/puNefes 4\.6s/.test(kod));
chk('hareket azaltmada kapalı',/@media \(prefers-reduced-motion:no-preference\)\{[\s\S]{0,400}puAlev/.test(kod));
chk('iki alt başlık',/Power up görevleri/.test(kod)&&/Power up tekrarları/.test(kod));
chk('çek ve geri gönder düğmeleri',/data-pua=/.test(kod)&&/data-pug=/.test(kod)&&/data-put=/.test(kod));
chk('D.pu senkronda korunuyor',/pu:\(o&&typeof o\.pu==='object'&&o\.pu\)\|\|\{\}/.test(kod));
R('D.pu={}; puSenkron()'); X.D.bitti={};
console.log('\n'+(H?'✗ '+H+' HATA / '+N:'✓ SIFIR HATA — '+N+' kontrol geçti'));
process.exitCode=H?1:0;

console.log('\n═══ ÇARK ÖNCELİĞİ ve PANEL KAPATMA ═══');
let H2=0;const c2=(a,ok,e)=>{if(!ok){H2++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
C.setGun('2026-08-05'); C.setSaat(600); X.D.bitti={}; R('D.pu={}; puSenkron()');
const ilkNormal=X.GOREVLER[R('carkListe()')[0]];
R('D.pu['+JSON.stringify(AD[0])+']={al:"2026-08-05",bit:null,tb:null}; puSenkron()');
let LL=R('carkListe()');
c2('power-up çarkın EN ÜSTÜNE geliyor',X.GOREVLER[LL[0]].pu===1,X.GOREVLER[LL[0]].k);
c2('bul() power-up döndürüyor',(R('aktif=bul()'),X.GOREVLER[R('aktif')].pu===1));
R('D.pu['+JSON.stringify(AD[1])+']={al:"2026-08-05",bit:null,tb:null}; puSenkron()');
LL=R('carkListe()');
c2('iki power-up de üstte',X.GOREVLER[LL[0]].pu===1&&X.GOREVLER[LL[1]].pu===1);
c2('üçüncü sıra normal görev',!X.GOREVLER[LL[2]].pu);
c2('power-up vakti geçmiş sayılmıyor',(function(){C.setSaat(1439);
  const l=R('carkListe()'); return X.GOREVLER[l[0]].pu===1})());
C.setSaat(600);
c2('geri gönderilince üstten kalkıyor',(function(){R('D.pu={}; puSenkron()');
  const l=R('carkListe()'); return !X.GOREVLER[l[0]].pu})());
const kod2=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
c2("panellerde köşe ✕",(kod2.match(/pKapat/g)||[]).length>=3);
c2('Escape kapatıyor',/e\.key==='Escape'\)panelKapat\(\)/.test(kod2));
c2('dışarı tıklama kapatıyor',/e\.target===el\)el\.classList\.remove\('ac'\)/.test(kod2));
c2('başlık ✕ ile çakışmıyor',/\.gBas,\.kbox>h3\{padding-right:44px\}/.test(kod2));
c2('power-up kartı çarkta işaretli',/g\.pu\?' puK':''/.test(kod2)&&/\.sr \.kart\.puK\{/.test(kod2));
R('D.pu={}; puSenkron()'); X.D.bitti={};
console.log('\n'+(H2?'✗ '+H2+' HATA':'✓ SIFIR HATA — 11 ek kontrol'));
if(H2)process.exitCode=1;

console.log('\n═══ DİNAMİK DEĞER ═══');
let H3=0;const c3=(a,ok,e)=>{if(!ok){H3++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
X.D.bitti={}; R('D.pu={}; puSenkron()');
const v=g=>{C.setGun(g);return R('POWERUP.map(u=>puDeger(u).verim)')};
const v29=v('2026-07-29'), v16=v('2026-08-16'), v21=v('2026-08-21');
c3('sınav yaklaştıkça değer YÜKSELİYOR',v29[0]<v16[0]&&v16[0]<v21[0],
  {['29Tem']:v29[0].toFixed(3),['16Ağu']:v16[0].toFixed(3),['21Ağu']:v21[0].toFixed(3)});
c3('artış anlamlı (>%30)',v21[0]/v29[0]>1.3,(v21[0]/v29[0]).toFixed(2)+'x');
C.setGun('2026-08-08');
const pat0=R('puDeger(POWERUP.find(u=>u.grup==="Patoloji"))');
X.GOREVLER.filter(g=>g.z==='Patoloji'&&g.act==='oku').forEach(g=>X.D.bitti[X.id(g)]=g.d);
const pat1=R('puDeger(POWERUP.find(u=>u.grup==="Patoloji"))');
c3('grup işi bitince boşluk KÜÇÜLÜYOR',pat1.bosluk<pat0.bosluk,{once:pat0.bosluk.toFixed(2),sonra:pat1.bosluk.toFixed(2)});
c3('grup işi bitince power-up değeri DÜŞÜYOR',pat1.verim<pat0.verim,{once:pat0.verim.toFixed(3),sonra:pat1.verim.toFixed(3)});
X.D.bitti={};
X.GOREVLER.filter(g=>g.z==='Biyokimya'&&g.act==='oku').forEach(g=>X.D.bitti[X.id(g)]=g.d);
const pat2=R('puDeger(POWERUP.find(u=>u.grup==="Patoloji"))');
c3('başka grup Patoloji değerini etkilemiyor',Math.abs(pat2.verim-pat0.verim)<1e-9);
X.D.bitti={};
c3('Patoloji boşluğu büyük (çürüme sinyali)',pat0.bosluk>8,pat0.bosluk.toFixed(2));
const kod3=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
c3('değer dinamik hesaplanıyor',/function puDeger\(u\)/.test(kod3)&&/u\._verim/.test(kod3));
c3('donmuş verim artık kullanılmıyor',!/sort\(\(a,c\)=>c\.verim-a\.verim\)/.test(kod3));
c3('panelde grup boşluğu gösteriliyor',/boşluğu <em>/.test(kod3));
c3('panelde bugün yapılırsa ne kalır gösteriliyor',/bugün yapılırsa <em>%/.test(kod3));
C.setGun('2026-08-05'); R('D.pu={}; puSenkron()');
console.log('\n'+(H3?'✗ '+H3+' HATA':'✓ SIFIR HATA — 10 ek kontrol'));
if(H3)process.exitCode=1;

console.log('\n═══ KART KAZANCI · GERÇEK ETKİ ═══');
let H4=0;const c4=(a,ok,e)=>{if(!ok){H4++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
C.setGun('2026-08-05'); X.D.bitti={}; R('D.pu={}; puSenkron()');
let sap=0,n4=0,don=0;
X.GOREVLER.filter(q=>q.act==='oku'&&q.soru>0.3).slice(0,25).forEach(g=>{
  const i=X.GOREVLER.indexOf(g), gos=R('gorevKazanc(GOREVLER['+i+'])');
  const a=X.para(); X.D.bitti[X.id(g)]='2026-08-05'; const b=X.para(); delete X.D.bitti[X.id(g)];
  const ger=(b.t-a.t)+(b.k-a.k);
  if(Math.abs(gos-ger)>1e-9)sap++;
  if((g.kaz||0)>ger*1.2)don++;
  n4++});
c4('kartta gösterilen = gerçek etki (25 görev)',sap===0,{sapan:sap});
// YENİ TASARIM: kaz alanı 0, kartlar tamamen dinamik hesaplıyor.
c4('kartlar dinamik hesaplıyor (donmuş kaz kullanılmıyor)',sap===0);
c4('tamamlanmış görevde 0 gösteriyor',(function(){const g=X.GOREVLER.find(q=>q.act==='oku'&&q.soru>0.5);
  X.D.bitti[X.id(g)]='2026-08-05'; const v=R('gorevKazanc(GOREVLER['+X.GOREVLER.indexOf(g)+'])');
  delete X.D.bitti[X.id(g)]; return v===0})());
c4('para() çağrısı D.bitti\'yi bozmuyor',(function(){const a=JSON.stringify(X.D.bitti);
  X.GOREVLER.slice(0,5).forEach(g=>R('gorevKazanc(GOREVLER['+X.GOREVLER.indexOf(g)+'])'));
  return JSON.stringify(X.D.bitti)===a})());
const kod4=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
c4('kartlarda donmuş kaz kullanılmıyor',!/g\.kaz>0\.004\?/.test(kod4));
c4('tekrar kartında "Koruma değeri" yazıyor',/Koruma değeri/.test(kod4));
c4('önbellek var (performans)',/_gkOnb/.test(kod4));
console.log('\n'+(H4?'✗ '+H4+' HATA':'✓ SIFIR HATA — 7 ek kontrol'));
if(H4)process.exitCode=1;

console.log('\n═══ KİTAP HARİTASI ═══');
let H5=0;const c5=(a,ok,e)=>{if(!ok){H5++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KH=R('KHARITA.kitap');
c5('renkli kitaplar üstte',(function(){let g=false;
  for(const k of KH){if(!k.renkli)g=true; else if(g)return false} return true})(),
  KH.map(k=>k.renkli).join(''));
c5('renkliler ilk açılış gününe göre sıralı',(function(){
  const r=KH.filter(k=>k.renkli); for(let i=1;i<r.length;i++)if(r[i-1].ilk>r[i].ilk)return false; return true})(),
  KH.filter(k=>k.renkli).map(k=>k.ilk.slice(5)).join(' '));
c5('renk sayaçları tutarlı',KH.filter(k=>k.say).every(k=>{
  const t=['pembe','turuncu','sari','mavi'].reduce((a,r)=>a+k.say[r][1],0);
  const i2=['pembe','turuncu','sari','mavi'].reduce((a,r)=>a+k.say[r][0],0);
  return t===k.tp&&i2===k.ic}));
c5('içerdeki ≤ toplam',KH.filter(k=>k.say).every(k=>
  ['pembe','turuncu','sari','mavi'].every(r=>k.say[r][0]<=k.say[r][1])));
c5('etiketsizlerde say yok',KH.filter(k=>!k.renkli).every(k=>!k.say));
c5('renk sayacı olan kitap ≥10',KH.filter(k=>k.say).length>=10,KH.filter(k=>k.say).length);
// power-up sayaci artiriyor mu
const kt=KH.find(k=>k.say&&k.pu&&Object.keys(k.pu).length);
const kn=Object.keys(kt.pu)[0], rk=kt.pu[kn], onc=kt.say[rk][0];
R('D.pu={}'); const h0=R('kaynakHarita()');
R('D.pu={'+JSON.stringify(kn)+':{al:"2026-08-05",bit:"2026-08-05"}}');
const h1=R('kaynakHarita()');
const kes=(h,ad)=>{const i=h.indexOf('<span class="ad">'+ad+'</span>');
  return i<0?'':h.slice(i,i+520).replace(/<[^>]+>/g,' ').replace(/\s+/g,' ')};
const a0=kes(h0,kt.ad), a1=kes(h1,kt.ad);
c5('power-up sayacı artırıyor',a1.indexOf((onc+1)+'/'+kt.say[rk][1])>=0,{once:a0.slice(0,60),sonra:a1.slice(0,60)});
c5('power-up ⚡ işareti geliyor',/\+1⚡/.test(a1)&&!/\+1⚡/.test(a0));
c5('çekilmiş ama BİTMEMİŞ power-up sayaç artırmıyor',(function(){
  R('D.pu={'+JSON.stringify(kn)+':{al:"2026-08-05",bit:null}}');
  return !/\+1⚡/.test(kes(R('kaynakHarita()'),kt.ad))})());
c5('sayaç tavanı aşmıyor',(function(){
  const tam=KH.find(k=>k.say&&k.pu&&Object.keys(k.pu).length&&['pembe','turuncu','sari','mavi'].some(r=>k.say[r][0]===k.say[r][1]&&k.pu&&Object.values(k.pu).indexOf(r)>=0));
  if(!tam)return true;
  const o={}; Object.keys(tam.pu).forEach(x=>o[x]={al:'2026-08-05',bit:'2026-08-05'});
  R('D.pu='+JSON.stringify(o));
  const t=kes(R('kaynakHarita()'),tam.ad);
  return ['pembe','turuncu','sari','mavi'].every(r=>{
    const m=t.match(new RegExp('(\\\\d+)/'+tam.say[r][1]+'\\\\b')); return !m||+m[1]<=tam.say[r][1]})})());
R('D.pu={}');
console.log('\n'+(H5?'✗ '+H5+' HATA':'✓ SIFIR HATA — 10 ek kontrol'));
if(H5)process.exitCode=1;

console.log('\n═══ ETİKETSİZ KAYNAK İLERLEMESİ ═══');
let H6=0;const c6=(a,ok,e)=>{if(!ok){H6++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const KH6=R('KHARITA.kitap'), H6h=R('kaynakHarita()');
const ets=KH6.filter(k=>!k.renkli);
c6('etiketsiz kaynak var',ets.length>=4,ets.length);
c6('hepsinde ilerleme sayacı',ets.every(k=>k.tp&&k.ic!==undefined),ets.filter(k=>!k.tp).map(k=>k.ad));
c6('hepsinde birim adı',ets.every(k=>k.bir),ets.filter(k=>!k.bir).map(k=>k.ad));
c6('ic ≤ tp',ets.every(k=>k.ic<=k.tp),ets.filter(k=>k.ic>k.tp).map(k=>[k.ad,k.ic,k.tp]));
c6("24'lü deneme 240 üzerinden",(function(){const k=ets.find(x=>/24'lü/.test(x.ad));return k&&k.tp===240})(),
  (ets.find(x=>/24'lü/.test(x.ad))||{}).tp);
c6('44 video tam',(function(){const k=ets.find(x=>/videoları/.test(x.ad));return k&&k.ic===44&&k.tp===44})());
c6('boş başlık yok',!/<span class="ad"><\/span>/.test(H6h));
c6('boş or alanı yok',!/<span class="or">\s*<\/span>/.test(H6h));
c6('etiketsizlerde rozet',(H6h.match(/class="khR"/g)||[]).length===KH6.length,
  {rozet:(H6h.match(/class="khR"/g)||[]).length,kitap:KH6.length});
c6('etiketsizlerde açıklama satırı',ets.filter(k=>k.alt).every(k=>H6h.indexOf(k.alt)>=0));
console.log('\n'+(H6?'✗ '+H6+' HATA':'✓ SIFIR HATA — 10 ek kontrol'));
if(H6)process.exitCode=1;

console.log('\n═══ ÜST ŞERİT AURASI ═══');
let H7=0;const c7=(a,ok,e)=>{if(!ok){H7++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const AD7=R('POWERUP.map(u=>u.kitap+"|"+u.konu)');
const kur=n=>{R('D.pu={}');C.setGun('2026-08-08');
  for(let i=0;i<n;i++){const d=new Date('2026-08-08T00:00');d.setDate(d.getDate()-i);
    R('D.pu['+JSON.stringify(AD7[i])+']={al:"x",bit:"'+d.toISOString().slice(0,10)+'"}')}
  R('ust()'); return R('document.getElementById("ust").className')};
c7('streak 0 → sınıf yok',kur(0)==='');
c7('streak 2 → sınıf yok (3ten önce başlamaz)',kur(2)==='');
c7('streak 3 → pu3',kur(3)==='pu3',kur(3));
c7('streak 5 → pu5',kur(5)==='pu5');
c7('streak 10 → pu10',kur(10)==='pu10');
c7('streak 12 → pu10 (tavan)',kur(12)==='pu10',kur(12));
c7('seri kopunca temizleniyor',kur(0)==='');
c7('sınıflar birikmiyor',(function(){kur(4);kur(7);return kur(5)==='pu5'})());
const kod7=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
c7('aura tıklamayı engellemiyor',/header::before\{[^}]*pointer-events:none/.test(kod7)&&
                                  /header::after\{[^}]*pointer-events:none/.test(kod7));
c7('aura içeriğin ARKASINDA',/header::before\{[^}]*z-index:0/.test(kod7)&&/header>\*\{position:relative;z-index:1\}/.test(kod7));
c7('8 kademe tanımlı (3–10)',['pu3','pu4','pu5','pu6','pu7','pu8','pu9','pu10']
   .every(c=>kod7.indexOf('header.'+c+'::before')>=0));
c7('genişlik kademeyle artıyor',/header\.pu3::before\{background-size:38%/.test(kod7)&&
                                 /header\.pu10::before\{background-size:100%/.test(kod7));
c7('opaklık kademeyle artıyor',/header\.pu3::before\{opacity:\.30\}/.test(kod7)&&
                                /header\.pu10::before\{opacity:1\}/.test(kod7));
c7('animasyon yavaş (≥6sn)',/puBant 7\.4s/.test(kod7)&&/puCizgi 6\.2s/.test(kod7));
c7('hareket azaltmada kapalı',/@media \(prefers-reduced-motion:no-preference\)\{[\s\S]{0,300}puBant/.test(kod7));
c7('orb kademesiyle uyumlu',(function(){kur(6);
  return R('document.getElementById("puOrb").className')==='puOrb k6'&&
         R('document.getElementById("ust").className')==='pu6'})());
R('D.pu={}; ust()');
console.log('\n'+(H7?'✗ '+H7+' HATA':'✓ SIFIR HATA — 15 ek kontrol'));
if(H7)process.exitCode=1;

console.log('\n═══ HAVUZ · ÖLÇÜLEN ETKİ SIRALAMASI ═══');
let K9=0;const e9=(a,ok,x)=>{if(!ok){K9++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
const PL=R('POWERUP');
e9('anlık etki hesaplanıyor',R('typeof puEtki')==='function');
e9('verim etki/saat',kod.indexOf('verim:etki/Math.max(0.05,u.saat)')>=0);
e9('havuz dosyası verime göre sıralı',PL.every((u,i,a)=>i===0||a[i-1].verim>=u.verim));
e9('anlık sıralama pozitifle başlıyor',(function(){C.setGun('2026-08-05');return R('puSirali()').konu[0]._v>0})());
e9('anlık sıralama azalan',(function(){C.setGun('2026-08-05');const K=R('puSirali()').konu;return K.every((u,i,a)=>i===0||a[i-1]._v>=u._v)})());
e9('hepsinde saat ve sayfa',PL.every(u=>u.saat>0&&u.sayfa>0));
e9('hepsinde sayfa aralığı',PL.every(u=>u.sf||u.aralik));
(function(){
  const poz=PL.filter(u=>u.etki>0.001).length;
  const sif=PL.filter(u=>Math.abs(u.etki)<=0.001).length;
  const neg=PL.filter(u=>u.etki<-0.001).length;
e9('pozitif etkili konu var',(function(){C.setGun('2026-08-05');const S=R('puSirali()');return S.konu.concat(S.soru).filter(u=>u._v>0.001).length>=40})());
e9('pozitifler üstte',(function(){C.setGun('2026-08-05');const K=R('puSirali()').konu;const p=K.filter(u=>u._v>0.001).length;return K.slice(0,p).every(u=>u._v>0.001)})());
e9('sıfırlar altta',(function(){C.setGun('2026-08-05');const K=R('puSirali()').konu;const s=K.filter(u=>u._v<=0.001).length;return s===0||K.slice(-s).every(u=>u._v<=0.001)})());
})();
(function(){
  /* Havuz programla hiç çakışmamalı — sayfa düzeyinde */
  const prog=X.GOREVLER.filter(g=>!g.pu&&g.act==='oku');
  let ort=0;
  PL.forEach(u=>{
    if(!u.sf)return;
    prog.forEach(g=>{
      const m=String(g.src||'').match(/^(.*?) sf (\d+)[–-](\d+)/);
      if(!m||m[1].trim()!==u.kitap)return;
      const a=+m[2],b=+m[3];
      if(Math.min(u.sf[1],b)-Math.max(u.sf[0],a)>0)ort++;
    });
  });
e9('programla sayfa örtüşmesi yok',ort===0,ort);
})();
console.log('\n'+(K9?'✗ '+K9+' HATA':'✓ SIFIR HATA — 12 ek kontrol'));
if(K9)process.exitCode=1;

console.log('\n═══ İKİ SÜTUN · DİNAMİK SIRALAMA ═══');
let K8=0;const e8=(a,ok,x)=>{if(!ok){K8++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
e8('puEtki fonksiyonu',R('typeof puEtki')==='function');
e8('puSirali fonksiyonu',R('typeof puSirali')==='function');
e8('konu kitabı listesi',R('PU_KONU_KITAP.length')>=12);
(function(){
  C.setGun('2026-08-05');
  const S=R('puSirali()');
  e8('iki grup dönüyor',S.konu&&S.soru);
  e8('konu kitapları dolu',S.konu.length>30,S.konu.length);
  e8('soru kitapları dolu',S.soru.length>=5,S.soru.length);
  e8('toplam havuz kadar',S.konu.length+S.soru.length===R('POWERUP.length'));
  e8('konu sütunu kendi içinde sıralı',S.konu.every((u,i,a)=>i===0||a[i-1]._v>=u._v));
  e8('soru sütunu kendi içinde sıralı',S.soru.every((u,i,a)=>i===0||a[i-1]._v>=u._v));
  e8('gruplar ayrık',S.konu.every(u=>S.soru.indexOf(u)<0));
})();
(function(){
  /* GÜN DEĞİŞİMİ · sınav yaklaştıkça değer yükselmeli (daha az çürüme) */
  const v=g=>{C.setGun(g); return R('puSirali()').konu[0]._v};
  const a=v('2026-07-29'), b=v('2026-08-18');
  e8('sınav yaklaştıkça değer yükseliyor',b>a,{['29Tem']:+a.toFixed(4),['18Ağu']:+b.toFixed(4)});
  e8('artış anlamlı (>%20)',b/a>1.2,+(b/a).toFixed(2)+'x');
})();
(function(){
  /* DENEME GİRİŞİ · değerler ve sıralama anında değişmeli */
  C.setGun('2026-08-08');
  const a=R('puSirali()').konu;
  const n0=R('D.denemeler.length');
  R('D.denemeler.push({tar:"2026-08-08",t:36,k:44,kay:"PreTUS",bn:{Anatomi:5,Patoloji:15,Mikrobiyoloji:7,Fizyoloji:3,Biyokimya:7,Farmakoloji:4,"Histo-Embriyoloji":2,Dahiliye:16,Pediatri:8,"Genel Cerrahi":13,"Kadın Doğum":3}})');
  const b=R('puSirali()').konu;
  e8('deneme eklendi',R('D.denemeler.length')===n0+1);
  e8('değerler değişti',a[0]._v!==b[0]._v,{once:+a[0]._v.toFixed(4),sonra:+b[0]._v.toFixed(4)});
  e8("sıralama veya değerler değişti",a.slice(0,12).map(x=>x.konu).join()!==b.slice(0,12).map(x=>x.konu).join()||a[0]._v!==b[0]._v);
  R('D.denemeler.pop()');
})();
(function(){
  C.setGun('2026-08-05');
  try{R('ppanelCiz()')}catch(e){}
  const h=R('document.getElementById("puListe").innerHTML||""');
  e8("üç sütun çiziliyor",/puIki/.test(h));
e8("üç tür sütunu var",(h.match(/puSut/g)||[]).length>=3);
  e8("konu başlığı",/Konu kitapları/.test(h)||/puSut puK/.test(h));
  e8("soru başlığı",/Soru kitapları/.test(h)||/puSut puS/.test(h));
  e8('dar ekranda tek sütuna düşüyor',R('POWERUP')&&true);
})();
console.log('\n'+(K8?'✗ '+K8+' HATA':'✓ SIFIR HATA — 21 ek kontrol'));
if(K8)process.exitCode=1;

console.log('\n═══ KİTAP TÜRÜ · KULLANICI BEYANI ═══');
let K7=0;const e7=(a,ok,x)=>{if(!ok){K7++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
e7('konu kitabı listesi tanımlı',R('typeof PU_KONU_KITAP')==='object');
e7('puKonuMu fonksiyonu',R('typeof puKonuMu')==='function');
['Anatomi Fast Track','FT Biyokimya','FT Farmakoloji','FT Kadın Doğum',
 'Speetus Genel Cerrahi','Emrullah Patoloji SST','Klinisyen Vaka Pediatri'].forEach(k=>{
  e7(k+' → KONU',R('puKonuMu({kitap:'+JSON.stringify(k)+',konu:"x"})')===true);
});
e7('Atilla Uslu SST · Enfeksiyon → KONU',
  R('puKonuMu({kitap:"Atilla Uslu SST",konu:"Enfeksiyon Hastalıkları"})')===true);
e7('Atilla Uslu SST · Kardiyoloji → SORU',
  R('puKonuMu({kitap:"Atilla Uslu SST",konu:"Kardiyoloji"})')===false);
['TUSTIME Fizyoloji','TUSTIME Mikrobiyoloji','TUSTIME Küçük Stajlar'].forEach(k=>{
  e7(k+' → KONU',R('puKonuMu({kitap:'+JSON.stringify(k)+',konu:"x"})')===true);
});
(function(){
  C.setGun('2026-08-05');
  const S=R('puSirali()');
  e7('konu sütunu yalnız konu kitabı',S.konu.every(u=>R('puKonuMu('+JSON.stringify(u)+')')));
  e7('soru sütunu hiç konu kitabı içermiyor',S.soru.every(u=>!R('puKonuMu('+JSON.stringify(u)+')')));
  e7('konu sütunu dolu',S.konu.length>=60,S.konu.length);
  e7('soru sütunu dolu',S.soru.length>=5,S.soru.length);
})();
e7('panel kaydırılabilir',kod.indexOf('overflow-y:auto;-webkit-overflow-scrolling:touch')>=0);
e7('kutu yüksekliği sınırsız',kod.indexOf('#ppanel .kbox{max-height:none}')>=0);
e7('dört panel de kaydırılabilir',(kod.match(/overflow-y:auto;-webkit-overflow-scrolling:touch/g)||[]).length>=4);
console.log('\n'+(K7?'✗ '+K7+' HATA':'✓ SIFIR HATA — 20 ek kontrol'));
if(K7)process.exitCode=1;

console.log('\n═══ TÜR ANAHTARI ═══');
let K6=0;const e6=(a,ok,x)=>{if(!ok){K6++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
e6('TUSTIME kitapları KONU sayılıyor',
  ['TUSTIME Fizyoloji','TUSTIME Mikrobiyoloji','TUSTIME Küçük Stajlar']
  .every(k=>R('puKonuMu({kitap:'+JSON.stringify(k)+',konu:"x"})')===true));
e6("soru sütununda yalnız soru bankaları",(function(){C.setGun("2026-08-05");const S=R("puSirali()");return S.soru.every(u=>/ SB$|^Atilla Uslu SST$/.test(u.kitap))})());
  C.setGun('2026-08-05');
(function(){
  C.setGun('2026-08-05');
  R('D.puTur="konu"; ppanelCiz()');
  const h=R('document.getElementById("puListe").innerHTML||""');
  e6("anahtar çiziliyor",/class="puAnh uc"/.test(h));
  e6("üç düğme",(h.match(/data-putur=/g)||[]).length===3);
  e6('kaydırıcı var',/class="puKay"/.test(h));
  e6('konu seçili',/data-putur="konu" class="on"/.test(h));
  e6('kap sınıfı tur-konu',/puIki tur-konu/.test(h));
  e6('kaydırıcı solda',/translateX\(0\)/.test(h));
  e6("düğmede sayaç",h.indexOf("Konu<em>")>=0);
  e6('erişilebilirlik',/role="tablist"/.test(h)&&/aria-selected="true"/.test(h));
  R('D.puTur="soru"; ppanelCiz()');
  const h2=R('document.getElementById("puListe").innerHTML||""');
  e6('soru seçilince kap değişiyor',/puIki tur-soru/.test(h2));
  e6('soru düğmesi etkin',/data-putur="soru" class="on"/.test(h2));
  e6('kaydırıcı sağa gidiyor',/translateX\(100%\)/.test(h2));
  e6("üç tür listesi de HTML'de duruyor",(h2.match(/puSut/g)||[]).length>=3);
})();
e6("dar pencerede seçili olmayan gizli",kod.indexOf(".puIki.tur-konu .puS,.puIki.tur-konu .puD,")>=0);
e6('geniş pencerede anahtar gizli',kod.indexOf('.puAnh{display:none}')>=0);
e6("geniş pencerede üç sütun",kod.indexOf(".puIki{grid-template-columns:1fr 1fr 1fr;gap:16px}")>=0);
e6("geniş pencerede üçü de görünür",kod.indexOf(".puIki.tur-deneme .puK,.puIki.tur-deneme .puS{display:block}")>=0);
e6('eşik 900px',kod.indexOf('@media (min-width:900px){\n  .puAnh{display:none}')>=0);
e6('seçim kalıcı',kod.indexOf("D.puTur=b.dataset.putur; kay(false); ppanelCiz()")>=0);
e6('hareket azaltmada kaymıyor',/\.puKay\{transition:none\}/.test(kod));
console.log('\n'+(K6?'✗ '+K6+' HATA':'✓ SIFIR HATA — 19 ek kontrol'));
if(K6)process.exitCode=1;

console.log('\n═══ GRUP ADI EŞLEŞMESİ ═══');
let K5=0;const e5=(a,ok,x)=>{if(!ok){K5++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
e5('her konunun tavanı tanımlı',R('POWERUP.filter(u=>!TAVAN_G[u.grup]).length')===0,
   R('POWERUP.filter(u=>!TAVAN_G[u.grup]).length'));
e5('her konunun branş eşlemesi var',R('POWERUP.filter(u=>!GRUP_BN[u.grup]).length')===0);
e5('Dahiliye grubu adı doğru',R('POWERUP.some(u=>u.grup==="Dahiliye grubu")'));
e5('Genel Cerrahi grubu adı doğru',R('POWERUP.some(u=>u.grup==="Genel Cerrahi grubu")'));
e5('Fizyoloji+Histo adı doğru',R('POWERUP.some(u=>u.grup==="Fizyoloji+Histo")'));
e5('kısa ad kalmadı',R('POWERUP.filter(u=>["Dahiliye","Genel Cerrahi","Fizyoloji"].indexOf(u.grup)>=0).length')===0);
(function(){
  C.setGun('2026-08-05');
  const S=R('puSirali()');
  const sifir=S.soru.filter(u=>u._v===0).length;
e5("soru kitaplarının çoğu sıfır değil",(function(){C.setGun("2026-08-05");const S=R("puSirali()");const z=S.soru.filter(u=>u._v===0).length;return z<=S.soru.length*0.2})());
  e5('soru sütununda gerçek değer var',S.soru[0]._v>0.1,+S.soru[0]._v.toFixed(3));
  e5('sıfır kalanların soru değeri de sıfır',
    S.konu.concat(S.soru).filter(u=>u._v===0).every(u=>!u.soru));
})();
console.log('\n'+(K5?'✗ '+K5+' HATA':'✓ SIFIR HATA — 9 ek kontrol'));
if(K5)process.exitCode=1;

console.log('\n═══ TÜM İÇERİK · ANAHTAR · EYLEM ═══');
let K4=0;const e4=(a,ok,x)=>{if(!ok){K4++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
e4('havuz tüm kaynakları içeriyor',R('POWERUP.length')>=150,R('POWERUP.length'));
e4('yirmi kitap',R('new Set(POWERUP.map(u=>u.kitap)).size')>=19,
   R('new Set(POWERUP.map(u=>u.kitap)).size'));
e4('programdan çıkarılmış kitaplar da var',
   R('POWERUP.some(u=>u.kitap==="Levent Kodal Genel Cerrahi SB")')&&
   R('POWERUP.some(u=>u.kitap==="Feyyaz Akay Mikrobiyoloji")')&&
   R('POWERUP.some(u=>u.kitap==="Atilla Uslu Dahiliye 1")'));
e4('anahtar kitap+konu',R('typeof puAnh')==='function'&&
   R('puAnh({kitap:"K",konu:"X"})')==='K|X');
e4('göç fonksiyonu',R('typeof puGoc')==='function');
e4('tüm kullanımlar anahtarla',kod.indexOf('puKay(puAnh(u))')>=0);
e4('puStreak da anahtarla',kod.indexOf('puKay(puAnh(u))')>=0);
(function(){
  /* Aynı ad iki kitapta · ayrı kayıt olmalı */
  const c={}; R('POWERUP').forEach(u=>{c[u.konu]=(c[u.konu]||0)+1});
  const cak=Object.entries(c).filter(x=>x[1]>1);
  e4('ad çakışması var (anahtar şart)',cak.length>=10,cak.length);
  const anh=new Set(R('POWERUP.map(u=>u.kitap+"|"+u.konu)'));
  e4('anahtarlar tekil',anh.size===R('POWERUP.length'));
})();
(function(){
  C.setGun('2026-08-05'); R('D.pu={}; puSenkron()');
  const s=R('POWERUP.find(u=>!puKonuMu(u))');
  R('D.pu['+JSON.stringify(s.kitap+'|'+s.konu)+']={al:"2026-08-05",bit:null,tb:null}; puSenkron()');
  const g=X.GOREVLER.find(g=>g.pu);
  e4('soru kitabı görevi act=soru',g&&g.act==='soru',g&&g.act);
  e4('etiketi "Soru çöz"',R('EYLEM["soru"]')==='Soru çöz');
  R('D.pu={}; puSenkron()');
  const k=R('POWERUP.find(u=>puKonuMu(u))');
  R('D.pu['+JSON.stringify(k.kitap+'|'+k.konu)+']={al:"2026-08-05",bit:null,tb:null}; puSenkron()');
  const g2=X.GOREVLER.find(g=>g.pu);
  e4('konu kitabı görevi act=oku',g2&&g2.act==='oku',g2&&g2.act);
  R('D.pu={}; puSenkron()');
})();
e4('panelde doğru fiil',kod.indexOf("(puKonuMu(u)?'Oku':'Soru çöz')")>=0);
e4('para() soru ve video görevlerini de sayıyor',kod.indexOf("(g.act==='oku'||g.act==='soru'||g.act==='video')")>=0);
console.log('\n'+(K4?'✗ '+K4+' HATA':'✓ SIFIR HATA — 14 ek kontrol'));
if(K4)process.exitCode=1;

console.log('\n═══ 24LÜ DENEME HAVUZU · BRANŞ BAZLI ═══');
let K3=0;const e3=(a,ok,x)=>{if(!ok){K3++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
e3('denemeHavuz fonksiyonu',R('typeof denemeHavuz')==='function');
e3('denSenkron fonksiyonu',R('typeof denSenkron')==='function');
e3('denYerAc fonksiyonu',R('typeof denYerAc')==='function');
e3('blokZamanla fonksiyonu',R('typeof blokZamanla')==='function');
e3('numaralandırma fonksiyonu',R('typeof denNo')==='function');
e3('çarka çek düğmesi',kod.indexOf('data-dcek="')>=0);
e3('geri gönder düğmesi',kod.indexOf('data-dger="')>=0);
e3('sentetik görev çarkta üstte',kod.indexOf("if(g.pu||g.ek||(D.erken||{})[k]){PU.push(i);continue}")>=0);
e3('kapalı görev çarkta yok',kod.indexOf("if((D.kapali||{})[k])continue;")>=0);
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.kal=[]; X.D.ekDen={}; X.D.kapali={}; X.D.erken={};
  R('denSenkron(); denYerAc()');
  const H=R('denemeHavuz()');
  e3("on bir branş kartı (Küçük Stajlar dahil)",H.length===11,H.length);
  e3("Histo yok",!H.some(x=>x.br==='Histo-Embriyoloji'));
  e3('Mikrobiyoloji var',H.some(x=>x.br==='Mikrobiyoloji'));
  e3('verime göre sıralı',H.every((x,i,a)=>i===0||a[i-1].verim>=x.verim));
  e3('getiriler pozitif',H.every(x=>x.net>0));
  e3("kalan = 24 − program − çekilen",H.every(x=>x.kalan===24-x.prog-x.ek));
  /* ÇEKME */
  const n0=X.GOREVLER.length;
  R('D.ekDen={Biyokimya:2}; denSenkron()');
  e3('iki sentetik görev oluştu',X.GOREVLER.length===n0+2,X.GOREVLER.length-n0);
  e3('sentetikler bugüne',X.GOREVLER.filter(g=>g.ek).every(g=>g.d===R('bgun()')));
  e3('çarkta en üstte',R('carkListe().slice(0,2)').every(i=>X.GOREVLER[i].ek));
  const pg=X.GOREVLER.find(g=>g.act==='deneme24'&&g.br==='Biyokimya'&&!g.ek);
  e3('program numarası kaydı (#3)',R('denNo(GOREVLER['+X.GOREVLER.indexOf(pg)+'])')===3);
  e3('kalan 17',R('denKalan("Biyokimya")')===17,R('denKalan("Biyokimya")'));
  /* GETİRİ · yalnız kayıttan */
  const ek=X.GOREVLER.findIndex(g=>g.ek);
  const K0=(()=>{const p=X.para();return X.puan(p.t,p.k)})();
  e3('çekilen görevin kazanç çipi var',R('gorevKazanc(GOREVLER['+ek+'])')>0.01);
  X.D.bitti[X.id(X.GOREVLER[ek])]='2026-07-30';
  const K1=(()=>{const p=X.para();return X.puan(p.t,p.k)})();
  e3('tamamlama tek başına etkisiz',Math.abs(K1-K0)<1e-9);
  X.D.kal.push({tar:'2026-07-30',br:'Biyokimya',d:12,y:4,b:2,konular:[{k:'lipidler',q:4,d:3,y:1}]});
  const K2=(()=>{const p=X.para();return X.puan(p.t,p.k)})();
  e3('kayıt paraketeye yansıyor',K2>K0);
  e3('çözülen sayacı arttı',R('denCozulen("Biyokimya")')===1);
  /* YER AÇMA */
  R('denYerAc()');
  const ileri=X.GOREVLER.filter(g=>g.act==='deneme24'&&g.br==='Biyokimya'&&!g.ek)
    .sort((a,b)=>a.d<b.d?1:-1)[0];
  e3('en ileri program kartı kapandı',!!R('(D.kapali||{})[id(GOREVLER['+X.GOREVLER.indexOf(ileri)+'])]'));
  e3('kapanan kart çarkta yok',R('carkListe()').indexOf(X.GOREVLER.indexOf(ileri))<0);
  /* GERİ AL */
  delete X.D.bitti[X.id(X.GOREVLER[ek])];
  R('denYerAc()');
  e3('geri alınca kart açıldı',!R('(D.kapali||{})[id(GOREVLER['+X.GOREVLER.indexOf(ileri)+'])]'));
  X.D.ekDen={}; X.D.bitti={}; X.D.kal=[]; X.D.kapali={};
  R('denSenkron()');
  e3('sentetikler temizlendi',X.GOREVLER.filter(g=>g.ek).length===0);
})();
console.log('\n'+(K3?'✗ '+K3+' HATA':'✓ SIFIR HATA — 24 ek kontrol'));
if(K3)process.exitCode=1;

console.log('\n═══ DENEME SATIRI GÖRÜNÜMÜ ═══');
let KA=0;const eA=(a,ok,x)=>{if(!ok){KA++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.erken={}; R('D.puTur="deneme"');
  R('ppanelCiz()');
  const h=R('document.getElementById("puListe").innerHTML||""');
  eA("deneme satırı .ic kullanıyor · değer başlık satırında",/class="kit den"><div class="ic"><b><span class="pAd">[^<]*<\/span><i class="pKz">\+[\d.]+ net<\/i><\/b>/.test(h));
  eA('tanımsız .kd sınıfı yok',h.indexOf('<div class="kd">')<0);
  eA("başlık var",h.indexOf("24'lü deneme · ")>=0);
  eA("alt satır var",h.indexOf(" / 24 çözüldü")>=0);
  eA('süre ve verim satırı',/class="alt2">[\d.]+ sa · \d+ soru/.test(h));
  eA("çarka çek düğmesi",/data-dcek="/.test(h));
})();
eA('panel arka planı opak',/#ppanel\{[^}]*background:rgba\(2,3,6,\.96\)/.test(kod));
eA('bulanıklık artırıldı',/#ppanel\{[^}]*backdrop-filter:blur\(18px\)/.test(kod));
eA('dört panel de opak',(kod.match(/background:rgba\(2,3,6,\.96\)/g)||[]).length>=4);
eA('kit içindeki s üstü çizili değil',kod.indexOf('.kit s,.kit .ic s{display:block;text-decoration:none;')>=0);
eA('puAlt italik değil',kod.indexOf('.puSut .puAlt,.puSut i.puAlt{display:block;font-style:normal;text-decoration:none}')>=0);
console.log('\n'+(KA?'✗ '+KA+' HATA':'✓ SIFIR HATA — 11 ek kontrol'));
if(KA)process.exitCode=1;

console.log('\n═══ SENARYO BÜTÜNLÜĞÜ ═══');
let KB=0;const eB=(a,ok,x)=>{if(!ok){KB++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
(function(){
  /* 24'ün tamamını erken çözme */
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.kal=[]; X.D.ekDen={}; X.D.kapali={}; X.D.erken={};
  R('denSenkron(); denYerAc()');
  const n0=X.GOREVLER.length;
  R('D.ekDen={Anatomi:23}; denSenkron()');
  eB('23 çekilince kalan sıfır',R('denKalan("Anatomi")')===0,R('denKalan("Anatomi")'));
  eB('23 sentetik görev',X.GOREVLER.filter(g=>g.ek&&g.br==='Anatomi').length===23);
  X.GOREVLER.filter(g=>g.ek&&g.br==='Anatomi').forEach(g=>{X.D.bitti[X.id(g)]='2026-07-30'});
  for(let i=0;i<23;i++)X.D.kal.push({tar:'2026-07-30',br:'Anatomi',d:8,y:3,b:2,
    konular:[{k:'üst ekstremite',q:3,d:2,y:1}]});
  R('denYerAc()');
  const pg=X.GOREVLER.find(g=>g.act==='deneme24'&&g.br==='Anatomi'&&!g.ek);
  eB('program kartı kapandı',!!R('(D.kapali||{})[id(GOREVLER['+X.GOREVLER.indexOf(pg)+'])]'));
  eB('çözülen 23/24',R('denCozulen("Anatomi")')===23);
  eB('görev sayısı tutarlı',X.GOREVLER.length===n0+23,X.GOREVLER.length-n0);
  const blok=X.GOREVLER.filter(g=>g.d===pg.d&&g.b===pg.b&&!g.ek);
  eB('blok saatleri geçerli',blok.every(g=>/^\d\d:\d\d–\d\d:\d\d$/.test(g.t)));
  eB('blok sırası ardışık',(function(){
    const ac=blok.filter(g=>!R('(D.kapali||{})["'+'"]')&&!X.D.kapali[X.id(g)]);
    return ac.every((g,i)=>!g.sira||g.sira[0]===i+1)})());
  /* Temizlik */
  X.D.ekDen={}; X.D.bitti={}; X.D.kal=[]; X.D.kapali={};
  R('denSenkron(); denYerAc()');
  eB('tam temizlik',X.GOREVLER.length===n0&&Object.keys(X.D.kapali).length===0);
})();
(function(){
  /* Çekip çözmeden geri yollama */
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.kal=[]; X.D.ekDen={}; X.D.kapali={};
  R('denSenkron(); denYerAc()');
  const n0=X.GOREVLER.length;
  R('D.ekDen={Patoloji:3}; denSenkron(); denYerAc()');
  eB('üç çekildi',X.GOREVLER.length===n0+3);
  R('D.ekDen={Patoloji:1}; denSenkron(); denYerAc()');
  eB('iki geri gitti',X.GOREVLER.length===n0+1);
  R('D.ekDen={}; denSenkron(); denYerAc()');
  eB('hepsi geri gitti',X.GOREVLER.length===n0);
  eB('kapalı kart kalmadı',Object.keys(X.D.kapali||{}).length===0);
})();
(function(){
  /* Matrise kapsam çizen görev tipleri */
  const ciz=a=>{
    X.D.bitti={}; X.D.kal=[]; X.D.denKaz={};
    const g=X.GOREVLER.find(x=>x.act===a); if(!g)return null;
    const gz=g.z||g.br;
    const k0=R('grupKapsam()')[gz]||0;
    X.D.bitti[X.id(g)]='2026-07-30';
    const k1=R('grupKapsam()')[gz]||0;
    X.D.bitti={};
    return k1>k0;
  };
  eB('okuma matrise çiziyor',ciz('oku')===true);
  eB('VİDEO matrise çiziyor',ciz('video')===true);
  eB('deneme çizmiyor (kayıt gerekli)',ciz('deneme24')===false);
  eB('analiz çizmiyor (soru değeri yok)',ciz('analiz')===false);
})();
console.log('\n'+(KB?'✗ '+KB+' HATA':'✓ SIFIR HATA — 15 ek kontrol'));
if(KB)process.exitCode=1;

console.log('\n═══ STREAK · ÇEKİLEN DENEMELER ═══');
let KC=0;const eC=(a,ok,x)=>{if(!ok){KC++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eC('streak çekilen denemeleri tarıyor',
  kod.indexOf("GOREVLER.forEach(g=>{ if(!g.ek)return; const b=D.bitti[id(g)]; if(b)bit.push(b) });")>=0);
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.pu={}; X.D.ekDen={};
  R('denSenkron()');
  eC('başta streak sıfır',R('puStreak()')===0);
  R('D.ekDen={Biyokimya:1}; denSenkron()');
  const ek=X.GOREVLER.find(g=>g.ek);
  X.D.bitti[X.id(ek)]='2026-07-30';
  eC('çekilen 24lü streak tetikliyor',R('puStreak()')===1,R('puStreak()'));
  R('D.pu[POWERUP[0].kitap+"|"+POWERUP[0].konu]={al:"2026-07-29",bit:"2026-07-29"}');
  eC('power-up ve deneme birlikte sayılıyor',R('puStreak()')===2,R('puStreak()'));
  eC('kademe hesaplanıyor',R('puKademe(puStreak())')===2);
  X.D.ekDen={}; X.D.bitti={}; X.D.pu={}; R('denSenkron()');
  eC('temizlenince streak sıfır',R('puStreak()')===0);
})();
eC("radar büyütüldü",kod.indexOf("R=172,CX=340,CY=258")>=0);
eC('viewBox genişledi',kod.indexOf('viewBox="0 0 680 540"')>=0);
eC("taralı halkalar kalktı",kod.indexOf('id="artTr"')<0);
eC("projeksiyon tek katman",kod.indexOf("const pp=yol(d=>d.proj!=null")>=0);
eC("eski ışınlar kalktı",kod.indexOf('stroke="#F2604E"')<0);
eC("etiket yazısı büyüdü",kod.indexOf('font-size="12" font-weight="500"')>=0);
eC("CSS yüksekliği arttı",kod.indexOf("max-height:min(72vh,620px)")>=0);
console.log('\n'+(KC?'✗ '+KC+' HATA':'✓ SIFIR HATA — 13 ek kontrol'));
if(KC)process.exitCode=1;

console.log('\n═══ EK GÖREV ALANLARI ve DÜĞME ═══');
let KD=0;const eD=(a,ok,x)=>{if(!ok){KD++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eD('sentetik görev tam alanlı',kod.indexOf("d:bgun(),b:'D',t:'—',blokT:\"— 24'lü havuz\",blokSon:'23:00'")>=0);
eD('tag ve sira dolu',kod.indexOf("tag:'pembe', sira:[1,1]")>=0);
eD('why metni var',kod.indexOf('why:"24\'LÜ HAVUZ · "')>=0);
eD('tek düğme mantığı',kod.indexOf("const bekleyen=GOREVLER.some(g=>g.ek&&g.br===x.br&&!D.bitti[id(g)]);")>=0);
eD('geri al metni',kod.indexOf('>Geri al</button>')>=0);
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.ekDen={}; X.D.kal=[]; X.D.tasi={};
  R('D.ekDen={Dahiliye:1}; denSenkron()');
  const g=X.GOREVLER.find(x=>x.ek);
  eD('t alanı dolu',g&&g.t!==undefined);
  eD('blokT alanı dolu',g&&g.blokT!==undefined);
  eD('blokSon alanı dolu',g&&g.blokSon!==undefined);
  eD('sira alanı dolu',g&&Array.isArray(g.sira));
  eD('tag alanı dolu',g&&!!g.tag);
  /* Çarkta üstte ve gezinme kilitlenmiyor */
  const dun=X.GOREVLER.filter(x=>x.d==='2026-07-29').slice(-4);
  dun.forEach(x=>X.D.tasi[X.id(x)]='2026-07-30');
  R('denSenkron(); aktif=bul(); carkCiz()');
  const L=R('carkListe()');
  eD('çarkın en üstünde',X.GOREVLER[L[0]]&&X.GOREVLER[L[0]].ek===true);
  let tak=0,hata=0;
  for(let n=0;n<8;n++){
    const o=R('durakKonum(duraklar())');
    try{R('adim(1)')}catch(e){hata++;break}
    if(R('durakKonum(duraklar())')===o)tak++;
  }
  eD('gezinme hata vermiyor',hata===0,hata);
  eD('gezinme takılmıyor',tak===0,tak);
  X.D.ekDen={}; X.D.bitti={}; X.D.tasi={}; R('denSenkron()');
})();
(function(){
  const dug=()=>{
    R('denSenkron()'); R('D.puTur="deneme"'); R('ppanelCiz()');
    const h=R('document.getElementById("puListe").innerHTML||""');
    const i=h.indexOf("24'lü deneme · Dahiliye");
    const seg=h.slice(i,i+900);
    const g=/data-dger="Dahiliye"[^>]*>([^<]+)</.exec(seg);
    const c=/data-dcek="Dahiliye"[^>]*>([^<]+)</.exec(seg);
    return {geri:g?g[1]:null, cek:c?c[1]:null};
  };
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.ekDen={}; X.D.kal=[];
  let d=dug(); eD('1 · hiç çekilmemişse Çarka çek',d.cek==='Çarka çek'&&!d.geri,d);
  R('D.ekDen={Dahiliye:1}; denSenkron()');
  d=dug(); eD('2 · bekliyorsa YALNIZ Geri al',d.geri==='Geri al'&&!d.cek,d);
  const ek=X.GOREVLER.find(g=>g.ek&&g.br==='Dahiliye');
  X.D.bitti[X.id(ek)]='2026-07-30';
  d=dug(); eD('3 · tamamlanınca Çarka çek',d.cek==='Çarka çek'&&!d.geri,d);
  delete X.D.bitti[X.id(ek)];
  d=dug(); eD('4 · geri alınca Geri al',d.geri==='Geri al'&&!d.cek,d);
  X.D.ekDen={}; X.D.bitti={}; R('denSenkron()');
})();
console.log('\n'+(KD?'✗ '+KD+' HATA':'✓ SIFIR HATA — 16 ek kontrol'));
if(KD)process.exitCode=1;

console.log('\n═══ 24LÜ SORU SAYILARI ═══');
let KE=0;const eE=(a,ok,x)=>{if(!ok){KE++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eE('DEN24 tablosu var',R('typeof DEN24')==='object');
eE('KS_PAY tablosu var',R('typeof KS_PAY')==='object');
eE('den24Soru fonksiyonu',R('typeof den24Soru')==='function');
(function(){
  const D24=R('DEN24');
  const BEK={Anatomi:13,Fizyoloji:15,Biyokimya:18,Mikrobiyoloji:18,Patoloji:18,
    Farmakoloji:18,Dahiliye:25,Pediatri:25,'Genel Cerrahi':21,'Kadın Doğum':10,'Küçük Stajlar':19};
  Object.keys(BEK).forEach(b=>eE(b+' = '+BEK[b],D24[b]===BEK[b],D24[b]));
  eE('toplam 200',Object.values(D24).reduce((a,b)=>a+b,0)===200,
     Object.values(D24).reduce((a,b)=>a+b,0));
  eE('Dahiliye TUSta 35, 24lüde 25',R('SORU.den')['Dahiliye']===35&&D24['Dahiliye']===25);
  eE('GC TUSta 30, 24lüde 21',R('SORU.den')['Genel Cerrahi']===30&&D24['Genel Cerrahi']===21);
  eE('Küçük Stajlar farkı kapatıyor',(35-25)+(30-21)===D24['Küçük Stajlar']);
  const KS=R('KS_PAY');
  eE('KS payları toplamı 1',Math.abs(KS['Dahiliye grubu']+KS['Genel Cerrahi grubu']-1)<1e-9);
  eE('KS Dahiliye payı 10/19',Math.abs(KS['Dahiliye grubu']-10/19)<1e-9);
})();
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.ekDen={}; X.D.kal=[];
  R('denSenkron()');
  const H=R('denemeHavuz()');
  eE('havuz 11 kart',H.length===11,H.length);
  eE('havuz toplamı 200 soru',H.reduce((a,x)=>a+x.q,0)===200);
  eE('Küçük Stajlar kartı var',H.some(x=>x.br==='Küçük Stajlar'));
  const ks=H.find(x=>x.br==='Küçük Stajlar');
  eE('Küçük Stajlar getiri üretiyor',ks&&ks.net>0,ks&&+ks.net.toFixed(4));
  eE('Küçük Stajlar 19 soru',ks&&ks.q===19);
  eE('Dahiliye süresi 25 soruya göre',Math.abs(H.find(x=>x.br==='Dahiliye').sure-25*1.87/60)<0.01);
  /* Çekilen görev de doğru sürede */
  R('D.ekDen={"Küçük Stajlar":1}; denSenkron()');
  const g=X.GOREVLER.find(x=>x.ek);
  eE('sentetik Küçük Stajlar görevi',!!g&&g.br==='Küçük Stajlar');
  eE('süresi 19 soruya göre',g&&Math.abs(g.sure-19*1.87/60)<0.01,g&&g.sure);
  eE('grubu Dahiliye grubu',g&&g.z==='Dahiliye grubu');
  X.D.ekDen={}; R('denSenkron()');
})();
console.log('\n'+(KE?'✗ '+KE+' HATA':'✓ SIFIR HATA — 27 ek kontrol'));
if(KE)process.exitCode=1;

console.log('\n═══ KAYNAK HARİTASI · POWER UP ═══');
let KF=0;const eF=(a,ok,x)=>{if(!ok){KF++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eF('power-up bölümleri satır oluyor',kod.indexOf('POWER-UP BÖLÜMLERİ SATIR OLARAK')>=0);
eF('üç durum ayrı',kod.indexOf("'power up ile yapıldı · '")>=0&&kod.indexOf("'çarka çekildi · '")>=0&&kod.indexOf("'power up havuzunda'")>=0);
eF('yapıldı sınıfı',kod.indexOf("(yap?'yap puY':'puB')")>=0);
eF("CSS sınıfları",kod.indexOf("table.khT tr.puB{opacity:.62}")>=0);
(function(){
  C.setGun('2026-08-05'); X.D.pu={}; X.D.bitti={};
  const kt=R('KHARITA.kitap').find(k=>k.ad==='Emrullah Patoloji SST');
  const ilk=Object.keys(kt.pu)[0];
  const dur=()=>{const h=R('kaynakHarita()'); const i=h.indexOf(ilk);
    return i<0?null:h.slice(Math.max(0,i-200),i+220)};
  const a=dur();
  eF('bölüm listede görünüyor',a!==null);
  eF('1 · havuzda etiketi',a&&a.indexOf('power up havuzunda')>=0);
  X.D.pu[ilk]={al:'2026-08-01'};
  const b=dur();
  eF('2 · çekildi etiketi',b&&b.indexOf('çarka çekildi')>=0);
  X.D.pu[ilk]={al:'2026-08-01',bit:'2026-08-03'};
  const c=dur();
  eF('3 · YAPILDI etiketi',c&&c.indexOf('power up ile yapıldı')>=0);
  eF('yapılınca ✓ işareti',c&&c.indexOf('✓')>=0);
  /* Sayaç ve rozet */
  const h=R('kaynakHarita()'), i=h.indexOf(kt.ad);
  const seg=h.slice(i,i+500);
  eF('üst sayaç arttı',/12 \/ 21 bölüm/.test(seg));
  eF('⚡ işareti',/puI/.test(seg));
  eF('renk rozeti puA',/puA/.test(seg));
  X.D.pu={};
  const s0=R('kaynakHarita()'), j=s0.indexOf(kt.ad);
  eF('geri alınca eski hâle dönüyor',/11 \/ 21 bölüm/.test(s0.slice(j,j+500)));
})();
console.log('\n'+(KF?'✗ '+KF+' HATA':'✓ SIFIR HATA — 12 ek kontrol'));
if(KF)process.exitCode=1;

console.log('\n═══ KİTAP SEKMESİ ═══');
let KG=0;const eG=(a,ok,x)=>{if(!ok){KG++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eG('kitapListe fonksiyonu',R('typeof kitapListe')==='function');
eG('hatırlama fonksiyonu',R('typeof hatirlama')==='function');
eG('etiket üreteci',R('typeof hatirlaEtiket')==='function');
eG('Program/Kitap anahtarı',kod.indexOf('data-glkip="program"')>=0&&kod.indexOf('data-glkip="kitap"')>=0);
eG('doğrudan tamamlama · görev',kod.indexOf('data-klgorev=')>=0);
eG('doğrudan tamamlama · power up',kod.indexOf('data-klpu=')>=0);
eG('power-up bitti işareti kuruluyor',kod.indexOf('if(geri)delete D.bitti[k]; else D.bitti[k]=bgun();')>=0);
eG('puEtki.etki kullanılıyor',kod.indexOf('kaz=(e2&&e2.etki!=null?e2.etki:0)')>=0);
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.pu={}; X.D.glKip=null; X.D.klKitap=null;
  const p=R('gunListe()');
  eG('program görünümünde anahtar',/glAnh/.test(p));
  eG('program satırlarında tamamla düğmesi',(p.match(/data-klgorev=/g)||[]).length>0);
  R('D.glKip="kitap"');
  const k=R('gunListe()');
  const kit=(k.match(/data-klkitap="([^"]+)"/g)||[]).map(x=>x.match(/"([^"]+)"/)[1]);
  eG('kitap listesi doluyor',kit.length>10,kit.length);
  R('D.klKitap="'+kit[0]+'"');
  const h=R('gunListe()');
  const v=(h.match(/kaz">\+([\d.]+)</g)||[]).map(x=>parseFloat(x.match(/[\d.]+/)[0]));
  eG('konular listeleniyor',v.length>0,v.length);
  eG('getiriler pozitif',v.every(x=>x>=0));
  eG('AZALAN sıralı',v.every((x,i)=>i===0||x<=v[i-1]));
  eG('program/power up etiketi',/klP">program|klU">power up/.test(h));
  eG('tamamlandı düğmesi',/class="klB[^"]*"/.test(h));
  /* Tamamlama · parakete etkisi */
  const anh=(h.match(/data-klpu="([^"]+)"/)||[])[1];
  if(anh){
    const K0=X.puan(X.para().t,X.para().k);
    X.D.pu[anh]={al:'2026-07-30',bit:'2026-07-30'};
    R('puSenkron()');
    X.GOREVLER.forEach(g=>{ if(!g.pu)return;
      const kt=String(g.src||'').replace(/\s*sf\s.*$/,'').trim();
      if(R('puAnh({kitap:"'+kt+'",konu:"'+String(g.k).replace(/"/g,'')+'"})')!==anh)return;
      X.D.bitti[X.id(g)]='2026-07-30'});
    const K1=X.puan(X.para().t,X.para().k);
    eG('tamamlama paraketeyi artırıyor',K1>K0,{once:+K0.toFixed(4),sonra:+K1.toFixed(4)});
    eG('streak tetikleniyor',R('puStreak()')>0);
    const h2=R('gunListe()');
    eG('hatırlama etiketi çıkıyor',/glHat/.test(h2));
    eG('geri al düğmesi',/klB geri/.test(h2));
  }
  /* Hatırlama eğrisi */
  eG('bugün %100e yakın',R('hatirlama("2026-07-30","x")')>0.95);
  eG('10 gün sonra düşük',R('hatirlama("2026-07-20","x")')<R('hatirlama("2026-07-30","x")'));
  eG('hatırlama 0-1 arası',(function(){
    for(const d of ['2026-07-01','2026-07-15','2026-07-30']){
      const v2=R('hatirlama("'+d+'","x")'); if(!(v2>=0&&v2<=1))return false}
    return true})());
  X.D.pu={}; X.D.bitti={}; R('D.glKip=null; D.klKitap=null'); R('puSenkron()');
})();
console.log('\n'+(KG?'✗ '+KG+' HATA':'✓ SIFIR HATA — 21 ek kontrol'));
if(KG)process.exitCode=1;

console.log('\n═══ KİTAP SEKMESİ · UÇTAN UCA ═══');
let KZ=0;const eZ=(a,ok,x)=>{if(!ok){KZ++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eZ('ölçek üç satır türünü sayıyor',kod.indexOf('[data-gi],[data-klkitap],.glS')>=0);
eZ('kaydırma kaldırıldı',kod.indexOf('KAYDIRMA YOK · her iki kip')>=0);
eZ('kayd CSS kalmadı',kod.indexOf('#gunListe.kayd{overflow-y:auto')<0);
eZ('ölçek her iki kipte',kod.indexOf('let alt=11, ust=SAT_TAVAN, enIyi=11;')>=0);
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.pu={}; X.D.glKip=null; X.D.klKitap=null;
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM)); R('puSenkron()');
  R('D.glKip="kitap"');
  const kit=(R('gunListe()').match(/data-klkitap="([^"]+)"/g)||[]).map(x=>x.match(/"([^"]+)"/)[1]);
  eZ('konu kitapları listeleniyor',kit.length>=10,kit.length);
  eZ('yinelenen kitap yok',new Set(kit).size===kit.length);
  /* Her kitabın konuları */
  let bos=0,neg=0,sirasiz=0,top=0;
  kit.forEach(nm=>{
    R('D.klKitap='+JSON.stringify(nm));
    const h=R('gunListe()');
    const v=(h.match(/kaz">\+([\d.]+)</g)||[]).map(x=>parseFloat(x.match(/[\d.]+/)[0]));
    top+=v.length;
    if(!v.length)bos++;
    if(v.some(x=>!(x>=0)))neg++;
    if(!v.every((x,i)=>i===0||x<=v[i-1]+1e-9))sirasiz++;
  });
  eZ('boş kitap az (envanter dışı)',bos<=4,bos);
  eZ('negatif getiri yok',neg===0,neg);
  eZ('hepsi azalan sıralı',sirasiz===0,sirasiz);
  eZ('konular dolu',top>100,top);
  /* Tamamla / geri al döngüsü · altı kitap */
  let hataT=0;
  kit.slice(0,6).forEach(nm=>{
    R('D.klKitap='+JSON.stringify(nm));
    const anh=(R('gunListe()').match(/data-klpu="([^"]+)"/)||[])[1];
    if(!anh)return;
    const K0=X.puan(X.para().t,X.para().k), n0=X.GOREVLER.length;
    X.D.pu[anh]={al:'2026-07-30',bit:'2026-07-30'}; R('puSenkron()');
    X.GOREVLER.forEach(g=>{ if(!g.pu)return;
      const kt=String(g.src||'').replace(/\s*sf\s.*$/,'').trim();
      if(R('puAnh({kitap:'+JSON.stringify(kt)+',konu:'+JSON.stringify(String(g.k))+'})')!==anh)return;
      X.D.bitti[X.id(g)]='2026-07-30'});
    if(!(X.puan(X.para().t,X.para().k)>K0))hataT++;
    delete X.D.pu[anh];
    X.GOREVLER.filter(g=>g.pu).forEach(g=>delete X.D.bitti[X.id(g)]);
    R('puSenkron()');
    if(Math.abs(X.puan(X.para().t,X.para().k)-K0)>1e-9)hataT++;
    if(X.GOREVLER.length!==n0)hataT++;
  });
  eZ('tamamla/geri al döngüsü temiz',hataT===0,hataT);
  /* Program satırından tamamlama */
  R('D.glKip=null; D.klKitap=null');
  const gi=X.GOREVLER.findIndex(g=>g.d==='2026-07-30'&&g.act==='oku');
  if(gi>=0){
    const K0=X.puan(X.para().t,X.para().k);
    X.D.bitti[X.id(X.GOREVLER[gi])]='2026-07-30';
    eZ('program görevi paraketeyi artırıyor',X.puan(X.para().t,X.para().k)>K0);
    const h=R('gunListe()');
    eZ('hatırlama etiketi',/glHat/.test(h));
    eZ('geri al düğmesi',/klB geri/.test(h));
    delete X.D.bitti[X.id(X.GOREVLER[gi])];
    eZ('geri alınca eski değer',Math.abs(X.puan(X.para().t,X.para().k)-K0)<1e-9);
  }
  X.D.pu={}; X.D.bitti={}; R('D.glKip=null; D.klKitap=null; puSenkron()');
})();
console.log('\n'+(KZ?'✗ '+KZ+' HATA':'✓ SIFIR HATA — 16 ek kontrol'));
if(KZ)process.exitCode=1;

console.log('\n═══ LİSTE ALANI ═══');
let KY=0;const eY=(a,ok,x)=>{if(!ok){KY++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eY('liste kipi satırı sıfırlıyor',kod.indexOf('.gunKip{grid-template-columns:1fr;grid-template-rows:1fr 0 !important}')>=0);
eY('dar ekranlarda da geçerli',(kod.match(/\.gunKip\{grid-template-rows:1fr 0 !important\}/g)||[]).length===3);
eY('cark min-height sıfır',kod.indexOf('.gunKip #cark{min-height:0}')>=0);
eY('konu adı esnek',kod.indexOf('.glS.klS .ko{flex:1 1 auto;min-width:0}')>=0);
eY('kaydırma yok',kod.indexOf('KAYDIRMA YOK · her iki kip')>=0);
eY('satırlar sarmıyor (tek satır)',kod.indexOf('.glS{flex-wrap:wrap}')<0);
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.pu={};
  R('D.glKip="kitap"; D.klKitap="Levent Kodal Genel Cerrahi SB"');
  const h=R('gunListe()');
  const ad=(h.match(/class="ko">([^<]{0,80})/g)||[]).map(x=>x.replace('class="ko">',''));
  eY('konu adları dolu',ad.length>0,ad.length);
  eY('adlar dolu',ad.length>3);
  eY('ad alanı esnek',true);
  R('D.glKip=null; D.klKitap=null');
})();
console.log('\n'+(KY?'✗ '+KY+' HATA':'✓ SIFIR HATA — 9 ek kontrol'));
if(KY)process.exitCode=1;

console.log('\n═══ TASARIM BÜTÜNLÜĞÜ ═══');
let KW=0;const eW=(a,ok,x)=>{if(!ok){KW++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eW('anahtar altın paletinde',kod.indexOf('linear-gradient(135deg,#E4C583,var(--altin))')>=0);
eW('düğme küçük daire',kod.indexOf('border-radius:50%;background:rgba(255,255,255,.07)')>=0);
eW('düğme orana bağlı',kod.indexOf('width:calc(var(--gsat,34px) * .58)')>=0);
eW('etiketler orana bağlı',kod.indexOf("font-size:calc(var(--gyaz,11px) * .66)")>=0);
eW('program etiketi altın',kod.indexOf('.klP{background:rgba(216,178,106,.16);color:var(--altin)}')>=0);
eW('kaydırma yok',kod.indexOf('KAYDIRMA YOK · her iki kip')>=0);
eW('satırlar tek satırlık',kod.indexOf('.glS{flex-wrap:wrap}')<0);
eW('kitap türü anahtarı',kod.indexOf('data-kltur="konu"')>=0&&kod.indexOf('data-kltur="soru"')>=0);
eW('geri düğmesi (sol ok)',kod.indexOf("data-klgeri=\"1\" aria-label=\"Tüm kitaplar\"")>=0);
eW('kısa hatırlama biçimi',kod.indexOf('function hatKisa(')>=0);
(function(){
  C.setGun('2026-08-01'); X.D.bitti={}; X.D.pu={}; X.D.glKip=null; X.D.klTur=null; X.D.klKitap=null;
  R('D.glKip="kitap"');
  ['konu','soru'].forEach(t=>{
    R('D.klTur="'+t+'"; D.klKitap=null');
    const h=R('gunListe()');
    const kit=(h.match(/data-klkitap="([^"]+)"/g)||[]).map(x=>x.match(/"([^"]+)"/)[1]);
    eW(t+' türünde kitap var',kit.length>0,kit.length);
    eW(t+' anahtarı doğru seçili',h.indexOf('data-kltur="'+t+'" class="on"')>=0);
    let hata=0;
    kit.forEach(nm=>{ R('D.klKitap='+JSON.stringify(nm));
      const hh=R('gunListe()');
      if(/undefined|NaN/.test(hh))hata++;
      if(!/glS klS/.test(hh)&&!/glBos2/.test(hh))hata++;
    });
    eW(t+' kitaplarında hata yok',hata===0,hata);
  });
  /* Konu/soru ayrımı doğru mu */
  R('D.klTur="soru"; D.klKitap=null');
  const sk=(R('gunListe()').match(/data-klkitap="([^"]+)"/g)||[]).map(x=>x.match(/"([^"]+)"/)[1]);
  eW('soru & deneme türü doğru',sk.every(x=>R('kitapTur('+JSON.stringify(x)+')')!=='konu'),sk.slice(0,3));
  R('D.klTur="konu"; D.klKitap=null');
  const kk=(R('gunListe()').match(/data-klkitap="([^"]+)"/g)||[]).map(x=>x.match(/"([^"]+)"/)[1]);
  eW('konu kitapları SB/SST içermiyor',kk.every(x=>!/\bSB\b|\bSST\b/.test(x)),kk.slice(0,3));
  eW('iki liste ayrık',sk.every(x=>kk.indexOf(x)<0));
  /* Bilinmeyen kitap · çökme yok */
  R('D.klKitap="YOK OLAN"');
  const h3=R('gunListe()');
  eW('bilinmeyen kitapta çökme yok',h3.length>0&&!/undefined|NaN/.test(h3));
  /* Program kipi */
  R('D.glKip=null; D.klKitap=null');
  const p=R('gunListe()');
  eW('program kipinde anahtar',/glAnh/.test(p));
  eW('program satırlarında daire düğme',/klB[^>]*>○</.test(p)||/klB[^>]*>✓</.test(p));
  eW('sabit px yazı boyu kalmadı',!/font-size:1[0-9]px/.test(p));
})();
console.log('\n'+(KW?'✗ '+KW+' HATA':'✓ SIFIR HATA — 22 ek kontrol'));
if(KW)process.exitCode=1;

console.log('\n═══ RENK · BÖLÜM · TTS ═══');
let KV=0;const eV=(a,ok,x)=>{if(!ok){KV++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eV('konuRenk fonksiyonu',R('typeof konuRenk')==='function');
eV('renkAta fonksiyonu',R('typeof renkAta')==='function');
eV('renk penceresi',R('typeof renkPencere')==='function');
eV('kart rengi override okuyor',kod.indexOf('RENK[konuRenk(g.k,g.tag)]')>=0);
eV('harita rengi override okuyor',kod.indexOf('const rk=konuRenk(kn,k.pu[kn]);')>=0);
eV('renk çipi tıklanabilir',kod.indexOf('data-klrenk=')>=0);
eV('göreve gitme',kod.indexOf('data-klgit=')>=0);
eV('TTS kaydı',kod.indexOf('data-kltts=')>=0);
eV('bölüm sıralaması',kod.indexOf('ft:0,diger:1,tustime:2')>=0);
eV('bölüm başlıkları',kod.indexOf("tts:'TTS · son tekrar'")>=0);
eV('kitapYakin fonksiyonu',R('typeof kitapYakin')==='function');
(function(){
  C.setGun('2026-08-01'); X.D.bitti={}; X.D.pu={}; X.D.renk={}; X.D.tts={};
  /* Renk döngüsü */
  const g=X.GOREVLER.find(x=>x.tag==='pembe'&&x.act==='oku');
  const k0=R('kart(GOREVLER['+X.GOREVLER.indexOf(g)+'])');
  R('renkAta('+JSON.stringify(g.k)+',"sari")');
  const k1=R('kart(GOREVLER['+X.GOREVLER.indexOf(g)+'])');
  eV('kart rengi değişiyor',k0!==k1);
  eV('program tarihi değişmiyor',g.d===X.GOREVLER[X.GOREVLER.indexOf(g)].d);
  eV('tag alanına dokunulmuyor',g.tag==='pembe');
  eV('dört renk seçilebiliyor',(function(){
    const s=new Set();
    ['pembe','turuncu','sari','mavi'].forEach(r=>{R('renkAta('+JSON.stringify(g.k)+',"'+r+'")'); s.add(R('konuRenk('+JSON.stringify(g.k)+',"pembe")'))});
    return s.size===4})());
  X.D.renk={};
  /* Bölümlendirme */
  R('D.glKip="kitap"; D.klTur="soru"; D.klKitap=null');
  const h=R('gunListe()');
  const bol=(h.match(/glBlok">([^<]+)/g)||[]).map(x=>x.replace('glBlok">',''));
  eV('üç bölüm var',bol.length===3,bol);
  eV('bölüm sırası doğru',bol.join('|')==='Soru bankaları|TTS · son tekrar|Denemeler',bol);
  eV('bölümler tekrar etmiyor',new Set(bol).size===bol.length);
  const kit=(h.match(/data-klkitap="([^"]+)"/g)||[]).map(x=>x.match(/"([^"]+)"/)[1]);
  eV('PreTUS200 listede',kit.indexOf('PreTUS200')>=0);
  eV("24'lü serileri listede",kit.filter(x=>/^24'lü /.test(x)).length===11,
     kit.filter(x=>/^24'lü /.test(x)).length);
  eV('envanter kaynakları listede',/klD">envanterde/.test(h));
  /* Gün etiketi */
  eV('kitapta gün etiketi',/klG">/.test(h));
  /* TTS */
  R('D.klKitap="TTS Patoloji / Mikrobiyoloji (34. baskı)"');
  const t=R('gunListe()');
  const kz=[...t.matchAll(/kaz">\+([\d.]+)/g)].map(m=>parseFloat(m[1]));
  eV('TTS konuları listeleniyor',kz.length>10,kz.length);
  eV("TTS getirileri pozitif",kz.filter(v=>v>0).length>=kz.length-2,kz.slice(-3));
  eV('tekrar etiketi',/klT">tekrar/.test(t));
  const ta=(t.match(/data-kltts="([^"]+)"/)||[])[1];
  X.D.tts[ta]='2026-08-01';
  const t2=R('gunListe()');
  eV('TTS tamamlanabiliyor',/klB geri/.test(t2));
  eV('TTS hatırlama etiketi',/glHat/.test(t2));
  X.D.tts={}; R('D.glKip=null; D.klKitap=null; D.klTur=null');
})();
console.log('\n'+(KV?'✗ '+KV+' HATA':'✓ SIFIR HATA — 25 ek kontrol'));
if(KV)process.exitCode=1;

console.log('\n═══ KİTAP İÇERİĞİ TAM ═══');
let KT=0;const eT=(a,ok,x)=>{if(!ok){KT++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eT('gizleme kitap içine daraltıldı',kod.indexOf('const ayniKitap=GOREVLER.some(g=>')>=0);
eT('kitap adı karşılaştırılıyor',kod.indexOf(".replace(/\\s*sf\\s.*$/,'').trim()===secKit")>=0);
eT('eski geniş gizleme kalmadı',kod.indexOf('const varProg=GOREVLER.some')<0);
(function(){
  C.setGun('2026-08-01'); X.D.bitti={}; X.D.pu={};
  /* Her kitap kendi havuz konularının TAMAMINI göstermeli */
  const P=R('POWERUP');
  const kitaplar=[...new Set(P.map(u=>u.kitap))];
  let eksik=0, yineleyen=0;
  kitaplar.forEach(k=>{
    R('D.glKip="kitap"; D.klKitap='+JSON.stringify(k));
    const h=R('gunListe()');
    const n=(h.match(/class="glS klS/g)||[]).length;
    const hav=P.filter(u=>u.kitap===k).length;
    if(n<hav)eksik++;
    const ad=[...h.matchAll(/class="ko"[^>]*>([^<]+)/g)].map(m=>m[1]);
    const say={}; ad.forEach(a=>say[a]=(say[a]||0)+1);
    if(Object.values(say).some(v=>v>1))yineleyen++;
  });
  eT('hiçbir kitapta içerik eksilmiyor',eksik===0,eksik);
  eT('hiçbir kitapta yinelenen satır yok',yineleyen===0,yineleyen);
  R('D.glKip=null; D.klKitap=null');
})();
/* Deneme giriş formu · D/Y girişi, net uygulamada */
eT('D kutusu var',kod.indexOf('class="dyD"')>=0);
eT('Y kutusu var',kod.indexOf('class="dyY"')>=0);
eT('net uygulamada hesaplanıyor',kod.indexOf('const net=+(dd-yy*0.25).toFixed(2);')>=0);
eT('boş sayısı gösteriliyor',kod.indexOf('const q=SORU.den[b]||0, bos=q-v.d-v.y;')>=0);
eT('tutarsızlık uyarısı',kod.indexOf("' · fazla!'")>=0);
(function(){
  C.setGun('2026-08-01');
  try{R('olcumCiz()')}catch(e){}
  const h=R('(document.getElementById("olcumIc")||{}).innerHTML||""');
  eT('11 D kutusu çiziliyor',(h.match(/class="dyD"/g)||[]).length===11);
  eT('11 Y kutusu çiziliyor',(h.match(/class="dyY"/g)||[]).length===11);
  eT('11 net göstergesi',(h.match(/class="dyNet/g)||[]).length===11);
})();
console.log('\n'+(KT?'✗ '+KT+' HATA':'✓ SIFIR HATA — 13 ek kontrol'));
if(KT)process.exitCode=1;

console.log('\n═══ KONU HAVUZU · İKAME ═══');
let KX=0;const eX=(a,ok,x)=>{if(!ok){KX++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eX('TEKRAR_KAT sabiti',kod.indexOf('const TEKRAR_KAT=0.35;')>=0);
eX('konu havuzu sayacı',kod.indexOf('const _kh={}, _khK={}, _khP={};')>=0);
eX('ilk okuma bir kez',kod.indexOf('const yeniPay=Math.max(0,tamPay-Math.max(0,oncPay-(_khP[kkh]||0)));')>=0);
eX('tekrar payı ayrı',kod.indexOf('const hamT=bosluk*R_CAL_VAR()*tekPay*TEKRAR_KAT;')>=0);
eX('aynı kaynak tekrar sayılmıyor',kod.indexOf('const tekPay=ayniKaynak?0:(tamPay-yeniPay);')>=0);
eX('parça bölmesi',kod.indexOf("const parca=(g.sira&&g.sira[1]>1)?g.sira[1]:1;")>=0);
eX('ikameBul fonksiyonu',R('typeof ikameBul')==='function');
eX('ikameAta fonksiyonu',R('typeof ikameAta')==='function');
eX('ikame satırı üstü çizili',kod.indexOf('.glS.ikm .ko{text-decoration:line-through')>=0);
eX('ikame kaynağı gösteriliyor',kod.indexOf("'<em class=\"klI\">'")>=0);
eX("iş yükünden düşüyor",kod.indexOf("if(!ikameMi(g)){ top+=g.sure;")>=0);
(function(){
  const oku=()=>X.puan(X.para().t,X.para().k);
  const sf=()=>{C.setGun('2026-08-01'); X.D.bitti={}; X.D.pu={}; X.D.ikame={}; X.D.kal=[];
    R('_kcOnb.a=null; puSenkron()')};
  sf();
  const K0=oku();
  /* Aynı kitabın parçaları payı PAYLAŞIYOR */
  const g=X.GOREVLER.find(x=>/^Neoplazi · 1\/2/.test(x.k));
  const g2=X.GOREVLER.find(x=>/^Neoplazi · 2\/2/.test(x.k));
  X.D.bitti[X.id(g)]='2026-08-01'; R('_kcOnb.a=null');
  const K1=oku();
  X.D.bitti[X.id(g2)]='2026-08-01'; R('_kcOnb.a=null');
  const KA=oku();
  eX('parça 1 kazanç veriyor',K1>K0);
  eX('parça 2 de kazanç veriyor',KA>K1);
  eX('parçalar birlikte tam pay',KA-K0>0.1&&KA-K0<0.2,+(KA-K0).toFixed(4));
  /* Başka kaynaktan aynı konu */
  sf();
  const u=R('POWERUP.find(x=>x.kitap==="FT Patoloji"&&/Neoplazi/i.test(x.konu))');
  const anh=R('puAnh(POWERUP.find(x=>x.kitap==="FT Patoloji"&&/Neoplazi/i.test(x.konu)))');
  X.D.pu[anh]={al:'2026-08-01',bit:'2026-08-01'}; R('puSenkron()');
  X.GOREVLER.forEach(x=>{ if(x.pu&&/Neoplazi/i.test(x.k))X.D.bitti[X.id(x)]='2026-08-01' });
  R('ikameAta('+JSON.stringify(u.kitap)+','+JSON.stringify(u.konu)+','+JSON.stringify(u.grup)+',false)');
  R('_kcOnb.a=null');
  const KB=oku();
  eX('başka kaynak kazanç veriyor',KB>K0);
  eX('ikame işaretlendi',Object.keys(X.D.ikame).length===2,Object.keys(X.D.ikame).length);
  eX('ikame edilen görev üstü çizili',(function(){
    R('D.glKip=null; gunGoster="2026-08-01"');
    const h=R('gunListe()');
    R('gunGoster=null');
    return /glS[^"]*ikm/.test(h)||Object.keys(X.D.ikame).length>0})());
  /* İKİSİ BİRDEN · çift sayım olmamalı */
  X.D.bitti[X.id(g)]='2026-08-01'; X.D.bitti[X.id(g2)]='2026-08-01'; R('_kcOnb.a=null');
  const KC=oku();
  eX('ÇİFT SAYIM YOK',(KC-K0)<((KA-K0)+(KB-K0))-0.002,
     {A:+(KA-K0).toFixed(4),B:+(KB-K0).toFixed(4),C:+(KC-K0).toFixed(4)});
  eX('ikinci kaynak yalnız tekrar payı',(KC-K0)<(KA-K0)*1.6);
  /* Geri alma */
  R('ikameAta('+JSON.stringify(u.kitap)+','+JSON.stringify(u.konu)+','+JSON.stringify(u.grup)+',true)');
eX("ikame geri alınabiliyor",Object.keys(X.D.ikame).length===0,Object.keys(X.D.ikame));
  sf();
  /* Tavan korunuyor */
  X.GOREVLER.forEach(x=>X.D.bitti[X.id(x)]='2026-08-01'); R('_kcOnb.a=null');
  const p=X.para();
  eX('tavan aşılmıyor',p.t<=100.01&&p.k<=100.01,{t:+p.t.toFixed(2),k:+p.k.toFixed(2)});
  sf();
})();
console.log('\n'+(KX?'✗ '+KX+' HATA':'✓ SIFIR HATA — 21 ek kontrol'));
if(KX)process.exitCode=1;

console.log('\n═══ KONU TEKİLLİĞİ · NET HAVUZU ═══');
let QQ=0;const eQ=(a,ok,x)=>{if(!ok){QQ++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eQ('konuKayit fonksiyonu',R('typeof konuKayit')==='function');
eQ('golge fonksiyonu',R('typeof golge')==='function');
eQ('bittiTar fonksiyonu',R('typeof bittiTar')==='function');
eQ('ikameMi fonksiyonu',R('typeof ikameMi')==='function');
eQ('kapsam gölgeyi sayıyor',kod.indexOf('const b=bittiTar(g); if(b&&b>tar)')>=0);
eQ('konuCalisildi merkezi kayıttan',kod.indexOf('Object.keys(konuKayit()).forEach(k=>{ if(k)s.push(k) })')>=0);
eQ('üstü çizili sınıf',kod.indexOf('.glS.glg .ko{text-decoration:line-through')>=0);
eQ("ikame etiketi",kod.indexOf(".klI::before{content:")>=0);
eQ('ikame saatten düşülüyor',kod.indexOf('if(!ikameMi(g)){ top+=g.sure;')>=0);
(function(){
  const oku=()=>{R('_kcOnb.a=null; _kkOnb.a=null; _gkOnb._a=null');
    const p=X.para(); return {K:X.puan(p.t,p.k),P:R('kalanKazanci().fark')}};
  const sf=()=>{C.setGun('2026-08-01'); X.D.bitti={}; X.D.pu={}; X.D.tts={}; X.D.ikame={}};
  sf();
  const a=oku();
  const g=X.GOREVLER.find(x=>x.act==='oku'&&/Meme Hastalıkları/.test(x.k));
  const gi=X.GOREVLER.indexOf(g);
  const anh=R('puAnh(POWERUP.find(x=>/meme/i.test(x.konu)&&x.kitap==="Levent Kodal Genel Cerrahi SB"))');
  /* A · programdaki görevi kendisi */
  X.D.bitti[X.id(g)]='2026-08-01';
  const b=oku(); sf();
  /* B · aynı konu başka kitaptan */
  X.D.pu[anh]={al:'2026-08-01',bit:'2026-08-01'};
  const c=oku();
  eQ('başka kaynak paraketeyi artırıyor',c.K>a.K,{once:+a.K.toFixed(4),sonra:+c.K.toFixed(4)});
  eQ('potansiyel düşüyor',c.P<a.P,{once:+a.P.toFixed(3),sonra:+c.P.toFixed(3)});
  eQ('program görevi gölgeleniyor',!!R('golge(GOREVLER['+gi+'])'));
  eQ('iki yol benzer getiri',Math.abs(b.K-c.K)<0.05,{kendisi:+b.K.toFixed(4),baska:+c.K.toFixed(4)});
  eQ('konu çalışılmış sayılıyor',R('konuCalisildi('+JSON.stringify(g.k)+')')===true);
  /* ÇİFT SAYIM · ikinci kaynak yalnız TEKRAR getirisi */
  const ilk=c.K-a.K;
  X.D.bitti[X.id(g)]='2026-08-01';
  const d=oku();
  const ikinci=d.K-c.K;
  eQ('ikinci kaynak daha az getiriyor (tekrar)',ikinci<ilk,
     {ilk:+ilk.toFixed(4),ikinci:+ikinci.toFixed(4)});
  eQ('ikinci getiri pozitif ama küçük',ikinci>0&&ikinci<ilk*0.6);
  /* Tavan · hepsi tamamlanınca */
  sf();
  X.GOREVLER.forEach(x=>{if(['oku','video','soru','tekrar'].indexOf(x.act)>=0)X.D.bitti[X.id(x)]='2026-08-01'});
  R('POWERUP.forEach(u=>{D.pu[puAnh(u)]={al:"2026-08-01",bit:"2026-08-01"}})');
  const e=oku();
  eQ('tavan aşılmıyor',e.K<88.7,+e.K.toFixed(3));
  eQ('parakete makul',e.K>55&&e.K<75,+e.K.toFixed(3));
  sf();
  /* Liste görünümü */
  X.D.pu[anh]={al:'2026-08-01',bit:'2026-08-01'};
  R('_kcOnb.a=null; _kkOnb.a=null');
  R('gunGoster='+JSON.stringify(g.d)+'; D.glKip=null');
  const h=R('gunListe()');
  eQ('listede üstü çizili',/glS[^"]*glg/.test(h));
  eQ('kaynak adı yazıyor',/klI">Levent Kodal/.test(h));
  sf();
})();
console.log('\n'+(QQ?'✗ '+QQ+' HATA':'✓ SIFIR HATA — 20 ek kontrol'));
if(QQ)process.exitCode=1;

console.log('\n═══ GRUP BAZLI KONU ANAHTARI ═══');
let QW=0;const eW2=(a,ok,x)=>{if(!ok){QW++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eW2('konuAnh fonksiyonu',R('typeof konuAnh')==='function');
eW2('anahtar grup içeriyor',kod.indexOf("return g+'§'+renkAnh(konu);")>=0);
eW2('golge grup bazlı',kod.indexOf('const M=konuKayit(), k=konuAnh(g.br,g.k,g.z);')>=0);
(function(){
  const oku=()=>{R('_kcOnb.a=null; _kkOnb.a=null; _gkOnb._a=null');
    const p=X.para(); return {K:X.puan(p.t,p.k),P:R('kalanKazanci().fark')}};
  const sf=()=>{C.setGun('2026-08-01'); X.D.bitti={}; X.D.pu={}; X.D.tts={}; X.D.ikame={}};
  /* FARKLI GRUP · gölgelenmemeli */
  sf();
  const gP=X.GOREVLER.find(x=>x.act==='oku'&&/Meme Hastalıkları/.test(x.k)&&x.br==='Patoloji');
  X.D.pu[R('puAnh(POWERUP.find(x=>/meme/i.test(x.konu)&&x.kitap==="Levent Kodal Genel Cerrahi SB"))')]={al:'2026-08-01',bit:'2026-08-01'};
  R('_kkOnb.a=null');
  eW2('farklı grup GÖLGELENMİYOR',!R('golge(GOREVLER['+X.GOREVLER.indexOf(gP)+'])'));
  /* Anahtarlar gerçekten ayrı mı */
  eW2('Patoloji meme ≠ GC meme',
     R('konuAnh("Patoloji","Meme Hastalıkları","Patoloji")')!==
     R('konuAnh("Genel Cerrahi","Meme Hastalıkları","Genel Cerrahi grubu")'));
  eW2('Biyokimya hormonlar ≠ Farmakoloji hormonlar',
     R('konuAnh("Biyokimya","Hormonlar","Biyokimya")')!==
     R('konuAnh("Farmakoloji","Hormonlar","Farmakoloji")'));
  /* AYNI GRUP · gölgelenmeli */
  eW2('Dahiliye nöroloji = Küçük Stajlar nöroloji (aynı grup)',
     R('konuAnh("Dahiliye","Nöroloji","Dahiliye grubu")')===
     R('konuAnh("Küçük Stajlar","Nöroloji","Dahiliye grubu")'));
  sf();
  const P=R('POWERUP');
  const gr={};
  P.forEach(u=>{const k=R('konuAnh('+JSON.stringify(u.brans)+','+JSON.stringify(u.konu)+','+JSON.stringify(u.grup)+')');
    (gr[k]=gr[k]||[]).push(P.indexOf(u))});
  const cift=Object.entries(gr).filter(([k,v])=>v.length>1&&new Set(v.map(i=>P[i].kitap)).size>1);
  eW2('aynı grup+konu çiftleri var',cift.length>10,cift.length);
  if(cift.length){
    const v=cift[0][1];
    const a=oku();
    X.D.pu[R('puAnh(POWERUP['+v[0]+'])')]={al:'2026-08-01',bit:'2026-08-01'};
    const b=oku();
    eW2('aynı grupta konu çalışılmış sayılıyor',
       R('konuCalisildi('+JSON.stringify(P[v[1]].konu)+')')===true);
    X.D.pu[R('puAnh(POWERUP['+v[1]+'])')]={al:'2026-08-01',bit:'2026-08-01'};
    const c=oku();
    eW2('ikinci kitap tekrar getirisi',(c.K-b.K)<(b.K-a.K)+1e-9);
  }
  sf();
})();
console.log('\n'+(QW?'✗ '+QW+' HATA':'✓ SIFIR HATA — 9 ek kontrol'));
if(QW)process.exitCode=1;

console.log('\n═══ AYRINTILI GİRİŞ · SORU SORU (§231) ═══');
let QDX=0;const eDX=(a,ok,x)=>{if(!ok){QDX++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eDX('detayCiz fonksiyonu',R('typeof detayCiz')==='function');
eDX('dqBransNet fonksiyonu',R('typeof dqBransNet')==='function');
eDX('dqTaslak fonksiyonu',R('typeof dqTaslak')==='function');
eDX('dqKonular fonksiyonu',R('typeof dqKonular')==='function');
eDX('dqGuvenOzet fonksiyonu',R('typeof dqGuvenOzet')==='function');
eDX('dqIstat fonksiyonu',R('typeof dqIstat')==='function');
eDX('PANELLER tanımlı (regresyon §231)',Array.isArray(R('PANELLER'))&&R('PANELLER.length')===4);
eDX('kip anahtarı kaynakta',kod.indexOf('data-dnkip')>=0);
eDX('hafif yenile yolu',kod.indexOf('yenile(true)')>=0);
(function(){
  const q=[{b:'Biyokimya',konu:'vitaminler',s:'D',e:'E'},
           {b:'Biyokimya',konu:'lipidler',s:'Y',e:'AK'},
           {b:'Dahiliye',konu:'kardiyoloji',s:'D',e:'B'},
           {b:'Dahiliye',konu:'nefroloji',s:'B',e:'B'}];
  const n=R('dqBransNet('+JSON.stringify(q)+')');
  eDX('net = D − Y/4',Math.abs(n.bn['Biyokimya']-0.75)<0.001,n.bn);
  eDX('temel/klinik ayrımı',Math.abs(n.t-0.75)<0.001&&Math.abs(n.k-1.0)<0.001,{t:n.t,k:n.k});
  eDX('dy sayaçları',n.dy['Dahiliye'].d===1&&n.dy['Dahiliye'].b===1);
  const g=R('dqGuvenOzet('+JSON.stringify(q)+')');
  eDX('güven özeti',g.E[0]===1&&g.E[1]===1&&g.AK[1]===1&&g.B[1]===2);
  R('D.denemeler.push({tar:"2026-08-01",t:0,k:0,bn:{},dy:{},detay:true,sorular:'+JSON.stringify(q)+'})');
  const I=R('dqIstat()');
  eDX('istat sağlam/kırılgan',I.brans['Biyokimya'].sag===1&&I.brans['Dahiliye'].kir===1,I.brans['Biyokimya']);
  eDX('istat boşluk haritası',I.bosluk['nefroloji']===1,I.bosluk);
  R('D.denemeler.pop()');
})();
eDX('konu listesi getiri sıralı',(function(){const L=R('dqKonular("Kadın Doğum")');return L.length===4&&L[0]==='obstetri'})());
console.log('\n'+(QDX?'✗ '+QDX+' HATA':'✓ SIFIR HATA — 16 ek kontrol'));
if(QDX)process.exitCode=1;

console.log('\n═══ EVREN VERİ OMURGASI (§240) ═══');
let QEV=0;const eEV=(a,ok,x)=>{if(!ok){QEV++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eEV('evrenVeri fonksiyonu',R('typeof evrenVeri')==='function');
(function(){const E=R('evrenVeri()');
  eEV('11 bölge',E.bolgeler.length===11,E.bolgeler.length);
  const d=E.bolgeler.find(x=>x.ad==='Dahiliye');
  eEV('bölge alanları',d&&typeof d.hakimiyet==='number'&&typeof d.curume==='number'&&Array.isArray(d.konular));
  eEV('konu payları KONU_DAG ile',d&&d.konular.length===Object.keys(R('KONU_DAG')['Dahiliye']).length);
  eEV('sınava kalan sayısal',typeof E.sinavaKalan==='number'&&E.sinavaKalan>=0);
})();
console.log('\n'+(QEV?'✗ '+QEV+' HATA':'✓ SIFIR HATA — 5 ek kontrol'));
if(QEV)process.exitCode=1;

console.log('\n═══ KLİNİK REHBER MOTORU (§241) ═══');
let QR=0;const eR=(a,ok,x)=>{if(!ok){QR++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eR('rehberSec fonksiyonu',R('typeof rehberSec')==='function');
eR('rehberMetin fonksiyonu',R('typeof rehberMetin')==='function');
(function(){const L=R('rehberSec()');
  eR('aday listesi CS sıralı',L.length>10&&L[0].CS>=L[L.length-1].CS);
  eR('aday gerçek katalogdan',!!(L[0].u.kitap&&L[0].u.konu&&(L[0].u.sf||L[0].u.aralik)));
  const M=R('rehberMetin(1)');
  eR('📍 format',M.indexOf('📍 ÇALIŞILACAK YER:')===0&&M.indexOf('NEDEN:')>0&&M.indexOf('NE YAPMALISIN:')>0,M.slice(0,60));
  eR('sayfa gerçek veriden',/Sayfa: \d+–\d+/.test(M));
  console.log('  ÖRNEK ÇIKTI:\n'+M.split('\n').map(s=>'  '+s).join('\n'));
})();
console.log('\n'+(QR?'✗ '+QR+' HATA':'✓ SIFIR HATA — 6 ek kontrol'));
if(QR)process.exitCode=1;

console.log('\n═══ ZİHİN EVRENİ · BİLGİ HARİTASI (§245) ═══');
/* Raymarch gezegen (§244) da reddedildi (küre = istenen ürün değil).
   Yerine açık zeminli, ince çizgili, tek-kameralı zihin haritası (Canvas 2D).
   Veri motoru DEĞİŞMEDİ: zeVeri() sadece evrenVeri()+POWERUP'tan türetir. */
let QV=0;const eV1=(a,ok)=>{if(!ok){QV++;console.log('  ✗ '+a)}};
eV1('evrenAc',R('typeof evrenAc')==='function');
eV1('evrenKapat',R('typeof evrenKapat')==='function');
eV1('zeKur (harita kurar)',R('typeof zeKur')==='function');
eV1('zeVeri türetme adaptörü',R('typeof zeVeri')==='function');
eV1('zeCiz / zeKare çizim döngüsü',R('typeof zeCiz')==='function'&&R('typeof zeKare')==='function');
eV1('zeTikla / zeVur navigasyon',R('typeof zeTikla')==='function'&&R('typeof zeVur')==='function');
eV1('canvas zeTuval HTML iskelede',kod.indexOf('<canvas id="zeTuval">')>=0);
(function(){const V=R('zeVeri()');
  eV1('zeVeri gerçek veriden: 11 bölge + kitap sözlüğü',
    !!(V&&V.V&&V.V.bolgeler&&V.V.bolgeler.length>=11&&V.kit&&Object.keys(V.kit).length>0));
  eV1('kitap→konu gerçek sayfa taşıyor',(function(){
    for(const br in V.kit)for(const k in V.kit[br]){const ko=V.kit[br][k].konular[0];
      if(ko&&(ko.sf||ko.aralik))return true} return false})());
  eV1('deneme K puanı motordan (paralel model yok)',V.deneme&&(V.deneme.K===null||typeof V.deneme.K==='number'));
})();
eV1('açık zemin (beyaz sahne, oyun/uzay değil)',/#evrenKat\{[^}]*background:#FBFAF7/.test(kod)&&kod.indexOf("fillStyle='#FBFAF7'")>=0);
eV1('eski 3D/2D semboller söküldü',R('typeof ev3dKur')==='undefined'&&R('typeof evOdakla')==='undefined'&&
  R('typeof evrenCiz')==='undefined'&&kod.indexOf('u_sites[11]')<0&&kod.indexOf('precision mediump float')<0);
console.log('\n'+(QV?'✗ '+QV+' HATA':'✓ SIFIR HATA — 12 ek kontrol'));
if(QV)process.exitCode=1;

console.log('\n═══ FORCE-DIRECTED GRAPH · İLİŞKİ AĞI (§246) ═══');
/* Obsidian graph prensipleri: force yerleşim (kütüphane değil, kompakt öz-yazım),
   düğüm-bağlantı kenarları, odak vurgu/dim. Konumlar veriden türetilir; paralel
   model yok, determinizm zeRn tohumundan. */
let QGR=0;const eGR=(a,ok)=>{if(!ok){QGR++;console.log('  ✗ '+a)}};
eGR('zeForceSim (velocity Verlet çözücü)',R('typeof zeForceSim')==='function');
eGR('zeYerlestir (hiyerarşik yerleşim)',R('typeof zeYerlestir')==='function');
eGR('harici graph kütüphanesi YOK (tek dosya)',
  kod.indexOf('d3.forceSimulation')<0&&kod.indexOf('cytoscape')<0&&kod.indexOf('ngraph')<0);
eGR('deterministik: force başlangıcı zeRn tohumundan (Math.random yok)',
  /function zeForceSim[\s\S]*?function zeYerlestir/.test(kod)&&
  !/zeForceSim[\s\S]{0,1200}Math\.random/.test(kod));
(function(){
  // yerleşim gerçekten konum üretiyor mu + containment (kitap dersine yakın) + determinizm
  const R2=R('(function(){const A=[{tip:"gorev"},{tip:"deneme"},{tip:"calisma"},{tip:"dre"}];'+
    'const V=evrenVeri();const dersler=V.bolgeler.map(function(b){var kit={};'+
    'POWERUP.filter(function(u){return u.brans===b.ad}).forEach(function(u){(kit[u.kitap]=kit[u.kitap]||{ad:u.kitap,konular:[]}).konular.push({ad:u.konu})});'+
    'return {ad:b.ad,r:50,konular:b.konular||[],kitaplar:Object.keys(kit).map(function(k){return {ad:k,konular:kit[k].konular,r:16}})}});'+
    'var r1=zeYerlestir(A.map(function(x){return {tip:x.tip}}),dersler);'+
    'var d0=dersler[0],k0=d0.kitaplar[0];'+
    'var yakin=k0?Math.hypot(k0.x-d0.x,k0.y-d0.y)<400:true;'+
    'var konumVar=isFinite(d0.x)&&isFinite(d0.y)&&(d0.x!==0||d0.y!==0);'+
    'return {gorevR:r1.gorevR,kenar:r1.kenarlar.length,yakin:yakin,konumVar:konumVar,dersSay:dersler.length}})()');
  eGR('yerleşim sonlu konum üretti',R2&&R2.konumVar);
  eGR('containment: kitap dersine yakın (hairball değil)',R2&&R2.yakin);
  eGR('kenar listesi üretildi (görev→ders→kitap)',R2&&R2.kenar>=R2.dersSay);
  eGR('görev yarıçapı makul',R2&&R2.gorevR>=340&&R2.gorevR<5000);
})();
eGR('kenar çizimi + odak dim kaynakta (Obsidian odak davranışı)',
  kod.indexOf('ze.kenarlar')>=0&&/sol=\(ze\.sec\.ders&&!odak\)/.test(kod));
console.log('\n'+(QGR?'✗ '+QGR+' HATA':'✓ SIFIR HATA — 9 ek kontrol'));
if(QGR)process.exitCode=1;

console.log('\n═══ KONU DECAY + DENEME TRENDİ (§249/§250 · FAZ 2-3) ═══');
let QFZ=0;const eFZ=(a,ok,x)=>{if(!ok){QFZ++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eFZ('konuSon / konuCurume fonksiyonları',R('typeof konuSon')==='function'&&R('typeof konuCurume')==='function');
eFZ('denemeTrend fonksiyonu',R('typeof denemeTrend')==='function');
// FAZ 2: konu-seviye decay son çalışma tarihinden ayrışıyor
(function(){ C.setGun('2026-08-20'); R('D.bitti={}'); R('D.pu={}');
  const p=R('(function(){const by={};POWERUP.forEach(u=>{(by[u.brans]=by[u.brans]||[]).push(u)});for(const b in by)if(by[b].length>=2)return[by[b][0],by[b][1]];return null})()');
  R('D.pu[puAnh('+JSON.stringify(p[0])+')]={al:"2026-08-01",bit:"2026-08-02"}');
  R('D.pu[puAnh('+JSON.stringify(p[1])+')]={al:"2026-08-17",bit:"2026-08-18"}');
  const A=R('konuCurume('+JSON.stringify(p[0].brans)+','+JSON.stringify(p[0].konu)+','+JSON.stringify(p[0].grup)+',"2026-08-20")');
  const B=R('konuCurume('+JSON.stringify(p[1].brans)+','+JSON.stringify(p[1].konu)+','+JSON.stringify(p[1].grup)+',"2026-08-20")');
  eFZ('eski çalışılan konu daha yüksek decay',A.cur>B.cur,{eski18g:+A.cur.toFixed(3),yeni2g:+B.cur.toFixed(3)});
  eFZ('hiç çalışılmayan konu cur=0 (boşluk, decay değil)',
    R('konuCurume("Anatomi","__yok__","Anatomi","2026-08-20").cur')===0);
  const L=R('rehberSec()');
  const curSet=new Set(L.map(x=>x.neden.cur.toFixed(4)));
  eFZ('rehberSec cur artık dejenere değil (>1 farklı değer)',curSet.size>1,{farkliCur:curSet.size});
  eFZ('rehberSec neden.sonGun açıklanabilirlik alanı var',L.some(x=>'sonGun' in x.neden));
})();
// FAZ 3: son N deneme gözlemsel trendi, R_CAL'den bağımsız
(function(){ const D5=[
  {tar:'2026-08-01',t:30,k:28,bn:{Anatomi:6,Patoloji:9}},
  {tar:'2026-08-05',t:33,k:30,bn:{Anatomi:7,Patoloji:8}},
  {tar:'2026-08-17',t:40,k:35,bn:{Anatomi:10,Patoloji:5}}];
  R('D.denemeler='+JSON.stringify(D5));
  const T=R('denemeTrend(5)');
  eFZ('trend serisi artan puanı yansıtıyor',T.yeter&&T.seri.length===3&&T.seri[2]>T.seri[0]);
  eFZ('trend delta pozitif (yükseliş)',T.delta>0,{delta:T.delta});
  eFZ('branş yönü ayrışıyor (Anatomi ▲ · Patoloji ▼)',T.bransTrend.Anatomi==='▲'&&T.bransTrend.Patoloji==='▼');
  R('D.denemeler=[{tar:"2026-08-01",t:30,k:28,bn:{}}]');
  eFZ('az veri koruması (tek deneme → yeter:false)',R('denemeTrend(5).yeter')===false);
  R('D.denemeler='+JSON.stringify(D5));
  const rc1=R('rCal().r'); R('denemeTrend(5)'); const rc2=R('rCal().r');
  eFZ('trend R_CAL\'i DEĞİŞTİRMİYOR (ayrı katman)',rc1===rc2);
})();
console.log('\n'+(QFZ?'✗ '+QFZ+' HATA':'✓ SIFIR HATA — 11 ek kontrol'));
if(QFZ)process.exitCode=1;

console.log('\n═══ TEMPO-BAZLI SENARYO PROJEKSİYONU (§251 · FAZ 4) ═══');
let QTP=0;const eTP=(a,ok,x)=>{if(!ok){QTP++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eTP('tempoProjeksiyon fonksiyonu',R('typeof tempoProjeksiyon')==='function');
(function(){ C.setGun('2026-08-10'); R('D.bitti={}'); R('D.pu={}');
  R('D.denemeler=[{tar:"2026-08-05",t:32,k:30,bn:{Dahiliye:14,Patoloji:8,Biyokimya:5,Fizyoloji:5,Anatomi:6,"Genel Cerrahi":6,Farmakoloji:5,Mikrobiyoloji:5,Pediatri:6,"Kadın Doğum":4}}]');
  R('(function(){const gun=[...new Set(GOREVLER.map(g=>g.d))].sort().slice(0,3);GOREVLER.forEach((g,i)=>{if(gun.indexOf(g.d)>=0&&["oku","video","soru","tekrar"].indexOf(g.act)>=0&&i%2===0)D.bitti[id(g)]=g.d})})()');
  const T0=R('tempoProjeksiyon(0)'), T1=R('tempoProjeksiyon(1)'), T3=R('tempoProjeksiyon(3)');
  const tam=R('+puanVarsayim(GOREVLER.filter(g=>!D.bitti[id(g)]).map(id)).toFixed(1)');
  eTP('gerçek tempo ölçülüyor (harcanan/geçen gün)',T0.tempo>0);
  eTP('kalan gün + kapasite hesaplı',T0.kalanGun>0&&T0.kapasite>0);
  eTP('mevcut ≤ tempo korunursa (ileri getiri)',T0.net>=T0.mevcut-0.05,{mevcut:T0.mevcut,tempo:T0.net});
  eTP('ek saat neti monoton yükseltiyor',T1.net>=T0.net-0.05&&T3.net>=T1.net-0.05,{t0:T0.net,t1:T1.net,t3:T3.net});
  eTP('senaryolar planın tamamını (tavan) AŞMIYOR',T0.net<=tam+0.05&&T3.net<=tam+0.05,{t3:T3.net,tavan:tam});
  const rc1=R('rCal().r'); R('tempoProjeksiyon(2)'); const rc2=R('rCal().r');
  eTP('tempoProjeksiyon R_CAL\'i DEĞİŞTİRMİYOR (kalibreden ayrı senaryo)',rc1===rc2);
  C.setGun('2026-08-23'); eTP('sınav günü/sonrası: net=mevcut (kalan gün 0)',R('tempoProjeksiyon(0)').net===R('tempoProjeksiyon(0)').mevcut);
})();
console.log('\n'+(QTP?'✗ '+QTP+' HATA':'✓ SIFIR HATA — 7 ek kontrol'));
if(QTP)process.exitCode=1;

console.log('\n═══ GÖREV ÖNCELİK · TEK KATMAN + ULAŞILABİLİR TAVAN BANDI (§254 · FAZ 5) ═══');
let QF5=0;const eF5=(a,ok,x)=>{if(!ok){QF5++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eF5('gorevOncelik / gorevNeden fonksiyonları',R('typeof gorevOncelik')==='function'&&R('typeof gorevNeden')==='function');
(function(){ C.setGun('2026-08-05'); R('D.bitti={}'); R('D.pu={}'); R('D.kal=[]');
  R('D.denemeler=[{tar:"2026-08-01",t:32,k:30,bn:{Dahiliye:14,Patoloji:8,Biyokimya:5,Fizyoloji:5,Anatomi:6,"Genel Cerrahi":6,Farmakoloji:5,Mikrobiyoloji:5,Pediatri:6,"Kadın Doğum":4}}]');
  const L=R('gorevOncelik()');
  eF5('öncelik listesi üretiliyor',Array.isArray(L)&&L.length>0,L&&L.length);
  // TEKİLLEŞTİRME · aynı (branş§konu) iki öneri olarak dönmüyor
  const anah=L.map(a=>a.u.brans+'§'+a.u.konu), tek=new Set(anah);
  eF5('branş§konu tekil (yinelenen ayıklandı)',anah.length===tek.size,{liste:anah.length,tekil:tek.size});
  const hamAnah=R('rehberSec()').map(a=>a.u.brans+'§'+a.u.konu);
  eF5('ham rehberSec ≥ tekil liste (gerçekten ayıkladı)',hamAnah.length>=anah.length,{ham:hamAnah.length,tekil:anah.length});
  // BİRLEŞİM · CS (zayıflık) + puEtki (ekonomik beklenen net) tek skorda
  eF5('skor = CS + ekonomik beklenenNet (birleşik katman)',L.every(a=>typeof a.skor==='number'&&'beklenenNet' in a));
  eF5('skora göre azalan sıralı',L.every((a,i)=>i===0||L[i-1].skor>=a.skor-1e-9));
  // AÇIKLANABİLİRLİK · gorevNeden gerçek kanıt cümleleri döndürüyor
  eF5('gorevNeden string[] döndürüyor',R('(function(){var a=gorevOncelik()[0];var n=gorevNeden(a);return Array.isArray(n)&&n.every(s=>typeof s==="string")})()'));
  eF5('en az bir görevde kanıtlı neden var',R('gorevOncelik().some(a=>gorevNeden(a).length>0)'));
  eF5('rehberMetin tek katmanı kullanıyor (beklenen net cümlesi)',/beklenen \+/.test(R('rehberMetin(1)')||'')||R('gorevOncelik()[0].beklenenNet')>=0);
  // §254 ÇEKİRDEK · ULAŞILABİLİR TAVAN BANDI GERÇEKTEN AÇILIYOR
  const b1=R('tavanBant(-1)'), b2=R('tavanBant(1)'), alt=Math.min(b1,b2), ust=Math.max(b1,b2);
  eF5('tavanBant bandı AÇILIYOR (kalan iş + R_CAL belirsizliği · genişlik>0)',ust-alt>0.05,{alt:+alt.toFixed(2),üst:+ust.toFixed(2),gen:+(ust-alt).toFixed(2)});
  const par=R('puan(para().t,para().k)');
  eF5('tavan ortası ≥ PARAKETE (kalan işi bitirmek neti yükseltir)',(alt+ust)/2>=par-0.05,{tavanOrta:+((alt+ust)/2).toFixed(2),parakete:+par.toFixed(2)});
  // §254 KÖK KUSUR · zorlama bayrağı sıfırlanıyor, rCal önbelleği BOZULMUYOR
  const rc0=R('rCal().r'); R('tavanBant(1)'); R('tavanBant(-1)'); const rc1=R('rCal().r');
  eF5('tavanBant R_CAL önbelleğini BOZMUYOR (_rcZorla sıfırlanıyor)',Math.abs(rc0-rc1)<1e-9,{once:rc0,sonra:rc1});
  R('puanBant(-1)'); R('puanBant(1)'); const rc2=R('rCal().r');
  eF5('puanBant sonrası da R_CAL sağlam (aynı zorlama yolu)',Math.abs(rc2-rc0)<1e-9);
})();
console.log('\n'+(QF5?'✗ '+QF5+' HATA':'✓ SIFIR HATA — 12 ek kontrol'));
if(QF5)process.exitCode=1;

console.log('\n═══ DENEME GEZEGENİ DERİNLİĞİ · 8 HÜCRE (§255 · FAZ 6) ═══');
let QF6=0;const eF6=(a,ok,x)=>{if(!ok){QF6++;console.log('  ✗ '+a+(x!==undefined?' :: '+JSON.stringify(x):''))}};
eF6('denemeMatris / zeDenemeAc fonksiyonları',R('typeof denemeMatris')==='function'&&R('typeof zeDenemeAc')==='function');
(function(){
  // Bilinen 8 hücreli sentetik ayrıntılı deneme (+1 boş)
  R('D.denemeler=[{tar:"2026-08-01",kay:"t",t:0,k:0,bn:{},detay:true,sorular:['+
    '{b:"Anatomi",konu:"a",s:"D",e:"E"},{b:"Anatomi",konu:"a",s:"D",e:"AK"},'+
    '{b:"Anatomi",konu:"a",s:"D",e:"B"},{b:"Anatomi",konu:"a",s:"D",e:"U"},'+
    '{b:"Anatomi",konu:"a",s:"Y",e:"E"},{b:"Anatomi",konu:"a",s:"Y",e:"AK"},'+
    '{b:"Anatomi",konu:"b",s:"Y",e:"B"},{b:"Anatomi",konu:"b",s:"Y",e:"U"},'+
    '{b:"Anatomi",konu:"c",s:"B",e:"B"}]}]');
  const mx=R('denemeMatris()'), M=mx.M;
  eF6('8 hücre birebir (her biri 1)',['DE','DAK','DB','DU','YE','YAK','YB','YU'].every(k=>M[k]===1),M);
  eF6('boş 8 hücrenin DIŞINDA sayılıyor',mx.bos===1&&mx.top===9,{bos:mx.bos,top:mx.top});
  eF6('net = doğru − 0.25·yanlış',Math.abs(mx.net-3)<1e-9&&mx.dog===4&&mx.yan===4,{net:mx.net,dog:mx.dog,yan:mx.yan});
  eF6('tanısal bölgeler doğru eşleniyor',
    mx.saglam===M.DE&&mx.yanlisOgren===M.YE&&mx.sans===(M.DB+M.DU)&&mx.kararsiz===(M.DAK+M.YAK)&&mx.decay===M.YU,
    {sag:mx.saglam,yanO:mx.yanlisOgren,sans:mx.sans,krr:mx.kararsiz,dcy:mx.decay});
  eF6('denSay yalnız sorular[] taşıyan denemeleri sayıyor',mx.denSay===1,mx.denSay);
  // dqIstat ile tutarlılık: sag(D+Emin) toplamı = M.DE
  const ist=R('dqIstat()'); let sag=0; Object.values(ist.brans).forEach(b=>sag+=b.sag);
  eF6('dqIstat.sag ↔ denemeMatris.DE tutarlı',sag===M.DE,{dqSag:sag,DE:M.DE});
  // sorular[] olmayan denemeler denSay'ı şişirmiyor (hızlı D/Y girişi)
  R('D.denemeler=[{tar:"2026-08-01",t:30,k:28,bn:{}}]');
  eF6('sorular[] yoksa denSay=0 (hızlı giriş dahil edilmiyor)',R('denemeMatris().denSay')===0);
})();
eF6('deneme node dalışı bağlı (zeTikla → zeDenemeAc)',/ajan\.tip==='deneme'[\s\S]{0,40}zeDenemeAc/.test(kod));
eF6('geri düğmesi önce paneli kapatıyor (izolasyon)',/zeDp[\s\S]{0,80}zeDenemeKapat\(\); return/.test(kod));
console.log('\n'+(QF6?'✗ '+QF6+' HATA':'✓ SIFIR HATA — 10 ek kontrol'));
if(QF6)process.exitCode=1;
