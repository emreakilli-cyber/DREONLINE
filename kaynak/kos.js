require('./tam_test.js');
const C=globalThis.__C, X=C.API;
let H=0;const chk=(a,ok,e)=>{if(!ok){H++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const S=m=>C.setSaat(m), G=d=>C.setGun(d), P=(u,p)=>C.setPanel(u,p);
const R=()=>{X.D.bitti={};X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));S(840);G('2026-07-26')};
// GÜNCELLENDİ: görev sayısı ve projeksiyon artık veriden okunuyor, sabit değil
const N=X.GOREVLER.length;

console.log('═══ 5 · VERİ BÜTÜNLÜĞÜ ═══');
chk('görev sayısı 196',N===196,N);
chk('kimlik tekil',new Set(X.GOREVLER.map(X.id)).size===N);
chk('25 gün',new Set(X.GOREVLER.map(g=>g.d)).size===25);
['d','b','t','blokT','sira','br','k','src','act','sure','why','tag','kaz','tur'].forEach(f=>
  chk('alan '+f,X.GOREVLER.every(g=>g[f]!==undefined&&g[f]!==null)));
chk('sure>0',X.GOREVLER.every(g=>g.sure>0));
chk('kaz sonlu',X.GOREVLER.every(g=>Number.isFinite(g.kaz)));
chk('tur T/K',X.GOREVLER.every(g=>g.tur==='T'||g.tur==='K'));
chk('tag renkli',X.GOREVLER.every(g=>X.RENK[g.tag]));
chk('act tanımlı',X.GOREVLER.every(g=>X.EYLEM[g.act]));
chk('why>25',X.GOREVLER.every(g=>g.why.length>25));
chk('saat biçimi',X.GOREVLER.every(g=>/^\d{2}:\d{2}–\d{2}:\d{2}$/.test(g.t)));
chk('oturum tutarlı',X.GOREVLER.filter(g=>g.ot).every(g=>g.ot[0]>=1&&g.ot[0]<=g.ot[1]&&g.otg.length===g.ot[1]));
chk('mola geçerli',X.GOREVLER.filter(g=>g.mola).every(g=>g.mola.length===5&&g.mola[2]>0&&X.MIKON[g.mola[3]]));
chk('sira tutarlı',X.GOREVLER.every(g=>g.sira[0]>=1&&g.sira[0]<=g.sira[1]));
console.log('  '+N+' görev · 14 alan · saat · oturum · mola · sıra');

console.log('\n═══ 6 · YARDIMCILAR ═══');
[[0,'0 dk'],[59,'59 dk'],[60,'1 sa'],[61,'1 sa 1 dk'],[120,'2 sa'],[135,'2 sa 15 dk']].forEach(([m,e])=>chk('sur('+m+')',X.sur(m)===e,X.sur(m)));
chk('dk sınırları',X.dk('00:00')===0&&X.dk('23:59')===1439);
chk('esc',X.esc('<a>&"')==='&lt;a&gt;&amp;&quot;');
chk('fark',X.fark('2026-07-26','2026-08-23')===28);
chk('puan',Math.abs(X.puan(32.25,38.5)-57.609)<0.01);
console.log('  sur · dk · esc · fark · puan');

console.log('\n═══ 7 · ZAMAN DAVRANIŞI (96 dilim) ═══');
let hataS=0, ilkKac=null, sonKac=null, monoton=true, once=-1;
for(let m=0;m<1440;m+=15){S(m);
  try{const kc=X.kacanlar().length;
    if(kc<once)monoton=false; once=kc;
    if(ilkKac===null&&kc>0)ilkKac=m; sonKac=kc;
    X.etiketler();X.bul();X.kart(X.GOREVLER[X.bul()],0);
    X.GOREVLER.filter(x=>x.d==='2026-07-26').forEach(x=>{X.sureDoldu(x);X.gecikme(x);X.suAnMi(x);X.gecmis(x)});
  }catch(e){hataS++;console.log('    ✗ '+m+' → '+e.message)}}
chk('96 dilim hatasız',hataS===0,hataS);
chk('kaçırılan monoton artıyor',monoton);
chk('00:00 kaçırılan 0',(S(0),X.kacanlar().length===0));
chk('bugün görev yok → kaçırılan 0',(S(1425),X.kacanlar().length===0),(S(1425),X.kacanlar().length));
chk('şu an bloğu tek',(()=>{S(600);return X.GOREVLER.filter(g=>X.suAnMi(g)).length<=1})());
console.log('  ilk kaçırılan '+Math.floor(ilkKac/60)+':'+String(ilkKac%60).padStart(2,'0')+' · gün sonu '+sonKac+' · monoton ✓');
R();

console.log('\n═══ 8 · 27 GÜN × 8 SAAT = 216 KOMBİNASYON ═══');
const gunler=[...new Set(X.GOREVLER.map(g=>g.d))].sort();
let hataG=0;
gunler.forEach(d=>{G(d);
  [0,440,540,660,900,1080,1196,1380].forEach(m=>{S(m);
    try{X.etiketler();X.bul();X.kacanlar();X.gunKapandi();X.sozSec();
      const g=X.GOREVLER[X.bul()];X.kart(g,0);X.brifCiz(g);X.motivKart();X.radarCiz();X.trendCiz()
    }catch(e){hataG++;console.log('    ✗ '+d+' '+m+' → '+e.message)}})});
chk('216 kombinasyon',hataG===0,hataG);
console.log('  216 gün-saat kombinasyonu hatasız');
R();

console.log('\n═══ 9 · YAŞAM DÖNGÜSÜ: 27 GÜNÜ GERÇEKÇİ YAŞA ═══');
let hataY=0, gunlukK=[];
gunler.forEach(d=>{G(d);
  const l=X.GOREVLER.filter(g=>g.d===d);
  l.forEach(g=>{const bit=X.dk(g.t.split('–')[1]); S(Math.min(1439,bit));
    X.D.bitti[X.id(g)]=d;
    try{X.kart(g,0);X.brifCiz(g);X.etiketler();X.para()}catch(e){hataY++}});
  S(1350);
  try{if(!X.gunKapandi())hataY++;X.motivKart();X.brifCiz(X.GOREVLER[X.bul()])}catch(e){hataY++}
  gunlukK.push(+X.puan(X.para().t,X.para().k).toFixed(2))});
chk('25 gün yaşam döngüsü',hataY===0,hataY);
chk('puan monoton artıyor',gunlukK.every((v,i)=>i===0||v>=gunlukK[i-1]-1e-9));
chk('son puan 62.85',Math.abs(gunlukK[gunlukK.length-1]-62.85)<0.02,gunlukK[gunlukK.length-1]);
console.log('  gün gün K puanı: '+gunlukK.slice(0,5).join(' → ')+' … → '+gunlukK[gunlukK.length-1]);
chk('kaçırılan sıfır',X.kacanlar().length===0);
R();

console.log('\n═══ 10 · GERİ ALMA VE TELAFİ ═══');
G('2026-08-10');S(1200);
const kc=X.kacanlar();
console.log('  10 Ağustos 20:00 → kaçırılan '+kc.length+' · beklemede +'+kc.reduce((a,g)=>a+g.kaz,0).toFixed(2)+' net');
const p0=X.para();
kc.forEach(g=>X.D.bitti[X.id(g)]='2026-08-10');
chk('telafi puanı artırdı',X.puan(X.para().t,X.para().k)>=X.puan(p0.t,p0.k));
chk('telafi sonrası kaçırılan 0',X.kacanlar().length===0);
X.GOREVLER.slice(0,40).forEach(g=>delete X.D.bitti[X.id(g)]);
chk('geri almada sonlu',Number.isFinite(X.para().t));
try{X.kart(X.GOREVLER[0],0);X.radarCiz();X.trendCiz();X.motivKart()}catch(e){chk('geri alma render',false,e.message)}
R();

console.log('\n═══ 11 · DENEME AKIŞI ═══');
const bn={};X.DB.forEach(b=>bn[b]=Math.round(X.SORU.den[b]*0.58*4)/4);
let t=0,k=0;Object.entries(bn).forEach(([b,v])=>X.TEMEL.includes(b)?t+=v:k+=v);
X.D.denemeler.push({tar:'2026-08-01',kay:'D1',t:+t.toFixed(2),k:+k.toFixed(2),bn});
chk('deneme eklendi',X.son().kay==='D1');
chk('6 ölçüm sıralı',X.sirali().length===6&&X.sirali()[5].kay==='D1');
const st=X.bransDurum();
chk('11 branşta ölçüm',X.RB.every(b=>st[b].olc!==null));
chk('beklenen ≥ ölçülen',X.RB.every(b=>st[b].bek>=st[b].olc-1e-9));
chk('oranlar 0-1',X.RB.every(b=>st[b].olc>=0&&st[b].olc<=1&&st[b].bek<=1));
try{X.trendCiz();X.radarCiz();X.RB.forEach(b=>X.miniCiz(b))}catch(e){chk('6 ölçüm render',false,e.message)}
X.D.denemeler=X.D.denemeler.filter(x=>x.kay!=='D1');
chk('silince geri döndü',X.son().kay==='MediTUS');
X.D.denemeler.push({tar:'2026-08-02',kay:'Kötü',t:-2,k:0,bn:Object.fromEntries(X.DB.map(b=>[b,-0.5]))});
try{X.bransDurum();X.radarCiz();X.trendCiz()}catch(e){chk('negatif net',false,e.message)}
chk('negatif netle puan sonlu',Number.isFinite(X.puan(X.son().t,X.son().k)));
X.D.denemeler=X.D.denemeler.filter(x=>x.kay!=='Kötü');
X.D.denemeler.push({tar:'2026-08-03',kay:'BNyok',t:40,k:45});
try{X.bransDurum();X.radarCiz();X.trendCiz();X.RB.forEach(b=>X.miniCiz(b))}catch(e){chk('bn eksik',false,e.message)}
X.D.denemeler=X.D.denemeler.filter(x=>x.kay!=='BNyok');
X.D.denemeler=[];
try{X.son();X.para();X.bransDurum();X.radarCiz();X.trendCiz();X.etiketler();X.RB.forEach(b=>X.miniCiz(b))}catch(e){chk('sıfır deneme',false,e.message)}
console.log('  ekle · sil · negatif net · branş neti eksik · sıfır deneme');
R();

console.log('\n═══ 12 · ÇİP YOĞUNLUĞU (24 boyut) ═══');
let tas=0;
[[420,900],[360,800],[300,760],[196,700],[230,660],[200,620],[180,560],[165,500],[150,460],[140,420],
 [128,400],[118,380],[110,360],[100,340],[92,320],[84,300],[76,280],[70,196],[150,320],[120,300],
 [100,280],[85,196],[75,240],[68,230]].forEach(([u,p])=>{
  P(u,p);X.brifCiz(X.GOREVLER[0]);
  const ic=C.getIcerik(), b=u-14;
  if(ic>b+2){tas++;console.log('    ✗ '+u+'×'+p+' → içerik '+ic+' > bütçe '+b+' ('+C.getSinif().join(',')+')')}});
chk('24 boyutta taşma yok',tas===0,tas);
console.log('  24 panel boyutunda çip kümesi sığıyor');
P(300,420);

console.log('\n═══ 13 · SAYFA RENDER + VERİ TAŞIMA ═══');
['radarCiz','trendCiz','kaynakHarita','etiketler','motivKart'].forEach(f=>{try{chk(f,X[f]().length>40)}catch(e){chk(f,false,e.message)}});
try{X.RB.forEach(b=>X.miniCiz(b))}catch(e){chk('miniCiz',false,e.message)}
let kh=0;X.GOREVLER.forEach((g,i)=>{try{const s=X.kart(g,i);
  if(!s.includes('data-a="b"'))kh++;
  if((s.match(/<div/g)||[]).length!==(s.match(/<\/div>/g)||[]).length)kh++}catch(e){kh++}});
chk(N+' kart dengeli HTML',kh===0,kh);
X.GOREVLER.slice(0,20).forEach(g=>{X.D.bitti[X.id(g)]=g.d});
const kod=Buffer.from(unescape(encodeURIComponent(JSON.stringify(X.D))),'binary').toString('base64');
const geri=JSON.parse(decodeURIComponent(escape(Buffer.from(kod,'base64').toString('binary'))));
chk('base64 gidiş-dönüş',JSON.stringify(geri)===JSON.stringify(X.D));
chk('kod uzunluğu makul',kod.length>100&&kod.length<200000,kod.length);
console.log('  5 render fonksiyonu · '+N+' kartta dengeli HTML · base64 taşıma');
R();

console.log('\n═══ 14 · KURALLAR ═══');
const gs=new Set(X.GOREVLER.map(g=>g.d));
chk('kombo uçları geçerli',X.KOMBO.every(b=>new Set(X.GOREVLER.map(X.id)).has(b[0])&&new Set(X.GOREVLER.map(X.id)).has(b[1])));
chk('kombo ≤1 gün',X.KOMBO.every(b=>b[5]<=1));
chk('kombo farklı branş',X.KOMBO.every(b=>b[0].split('|')[2]!==b[1].split('|')[2]));
chk('işaret günleri geçerli',X.ISARET.every(i=>gs.has(i[0])));
chk('kaynak haritası günleri',X.KHARITA.kitap.every(kk=>kk.s.every(s=>s[3].every(d=>gs.has(d)))));
chk('çöp nedenli',X.KHARITA.kitap.every(kk=>kk.cop.every(cc=>String(cc[3]).length>10)));
chk('15 söz kaynaklı',X.SOZ.length===15&&X.SOZ.every(s=>s.length===3&&s[0].length>20&&s[2].length>3));
const bl={};X.GOREVLER.forEach(g=>{const kk=g.d+'|'+g.b;(bl[kk]=bl[kk]||[]).push(g)});
let cak=0,ayn=0,asm=0;
Object.values(bl).forEach(l=>{
  if(new Set(l.map(g=>g.t)).size===1&&l.length>1)ayn++;
  for(let i=1;i<l.length;i++)if(X.dk(l[i].t.split('–')[0])<X.dk(l[i-1].t.split('–')[1]))cak++;
  if(X.dk(l[l.length-1].t.split('–')[1])>X.dk(l[0].blokT.split('–')[1]))asm++});
chk('aynı saatli çoklu',ayn===0);chk('alt saat çakışması',cak===0);
console.log('  '+X.KOMBO.length+' kombo · '+X.ISARET.length+' işaret · '+X.KHARITA.kitap.length+' kitap · '+X.SOZ.length+' söz · '+Object.keys(bl).length+' blok · blok sonu aşan '+asm);

console.log('\n'+(H?'✗ TOPLAM '+H+' HATA':'✓ TÜM TESTLER GEÇTİ — SIFIR HATA'));
process.exitCode=H?1:0;

console.log('\n═══ VİDEO NET KATKISI ═══');
let M1=0;const g1=(a,ok,e)=>{if(!ok){M1++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
(function(){
  const vi=X.GOREVLER.filter(g=>g.act==='video');
  g1('44 video görevi',vi.length===44,vi.length);
  g1('hepsinde soru değeri var',vi.every(g=>g.soru>0));
  g1('toplam 18.4 soru',Math.abs(vi.reduce((a,g)=>a+g.soru,0)-18.40)<0.02,
     +vi.reduce((a,g)=>a+g.soru,0).toFixed(2));
  g1('grup adı geçerli',vi.every(g=>g.z==='Dahiliye grubu'));
  g1('"Dahiliye video" grubu kalmadı',!X.GOREVLER.some(g=>g.z==='Dahiliye video'));
  g1('tavansız grup yok',!X.GOREVLER.some(g=>g.soru>0&&['Dahiliye video','Deneme günü'].indexOf(g.z)>=0&&g.soru>0));
  /* Sekiz konu · kitap değerleriyle birebir */
  const kon={};
  vi.forEach(g=>{const a=g.k.split(' videoları')[0]; kon[a]=(kon[a]||0)+g.soru});
  const bekl={'Hematoloji':1.8,'Onkoloji':1.8,'Endokrinoloji':2.0,'Kardiyoloji':3.0,
    'Göğüs Hastalıkları':2.0,'Nefroloji':2.2,'Gastroenteroloji':3.4,'Romatoloji':2.2};
  g1('sekiz konu',Object.keys(kon).length===8,Object.keys(kon).length);
  Object.keys(bekl).forEach(k=>
    g1(k+' değeri kitapla aynı',Math.abs((kon[k]||0)-bekl[k])<0.02,
      {video:+(kon[k]||0).toFixed(3),kitap:bekl[k]}));
})();
(function(){
  C.setGun('2026-08-22'); X.D.bitti={};
  const p0=X.para(), K0=X.puan(p0.t,p0.k);
  X.GOREVLER.forEach(g=>{if(g.act==='video')X.D.bitti[X.id(g)]='2026-08-10'});
  const p1=X.para(), K1=X.puan(p1.t,p1.k);
  g1('videolar projeksiyonu ARTIRIYOR',K1>K0,{once:+K0.toFixed(3),sonra:+K1.toFixed(3)});
  g1('katkı makul (0.3–2.0 K)',K1-K0>0.3&&K1-K0<2.0,+(K1-K0).toFixed(3));
  g1('klinik net artıyor',p1.k>p0.k,+(p1.k-p0.k).toFixed(2));
  g1('temel net değişmiyor (Dahiliye klinik)',Math.abs(p1.t-p0.t)<0.01);
  X.D.bitti={};
})();
console.log('\n'+(M1?'✗ '+M1+' HATA':'✓ SIFIR HATA — 19 ek kontrol'));
if(M1)process.exitCode=1;

const KAY=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
console.log('\n═══ DENEME NET GETİRİSİ ═══');
let M2=0;const g2=(a,ok,e)=>{if(!ok){M2++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vmD=require('vm'); const RD=e=>vmD.runInContext(e,C);
g2('denemeKaz fonksiyonu',RD('typeof denemeKaz')==='function');
g2('denemeDeger fonksiyonu',RD('typeof denemeDeger')==='function');
g2('dondur/çöz fonksiyonları',RD('typeof denemeDondur')==='function'&&RD('typeof denemeCoz')==='function');
g2('A · konu bazlı TusAnaliz dağılımı',KAY.indexOf('const KONU_DAG=')>=0);
g2('B · sayfa başına net tablosu',KAY.indexOf('const NET_SAYFA=')>=0);
g2('C · soru sabiti DİNAMİK',KAY.indexOf('const SORU_ORAN_VAR=()=>dOran().r')>=0);
g2('24lü branşın TUS soru sayısı',KAY.indexOf("if(g.act==='deneme24') branslar=[g.br]")>=0);
g2('tavan sınırı',KAY.indexOf('kz=Math.min(kz,bosluk[gz])')>=0);
g2('azalan verim',KAY.indexOf('kz*=bosluk[gz]/T2')>=0);
(function(){
  const i=X.GOREVLER.findIndex(g=>g.act==='deneme');
  const j=X.GOREVLER.findIndex(g=>g.act==='deneme24');
  const dene=bn=>{X.D.denemeler=[{tar:'2026-08-01',t:0,k:0,kay:'t',bn:bn}];
    return {p:RD('denemeKaz(GOREVLER['+i+'])').top, d:RD('denemeKaz(GOREVLER['+j+'])').top}};
  const dus=dene({Anatomi:2,'Histo-Embriyoloji':2,Fizyoloji:2,Biyokimya:6,Mikrobiyoloji:5,Patoloji:11,Farmakoloji:4,Dahiliye:15,Pediatri:8,'Genel Cerrahi':13,'Kadın Doğum':2});
  const bek=dene({Anatomi:5,'Histo-Embriyoloji':3,Fizyoloji:3,Biyokimya:10,Mikrobiyoloji:9,Patoloji:13,Farmakoloji:9,Dahiliye:20,Pediatri:12,'Genel Cerrahi':18,'Kadın Doğum':4});
  const iyi=dene({Anatomi:11,'Histo-Embriyoloji':6,Fizyoloji:7,Biyokimya:16,Mikrobiyoloji:16,Patoloji:17,Farmakoloji:16,Dahiliye:32,Pediatri:21,'Genel Cerrahi':27,'Kadın Doğum':8});
  g2('deneme sonucu iyileşince getiri AZALIYOR',dus.p>bek.p&&bek.p>iyi.p,
     {düşük:+dus.p.toFixed(4),beklenen:+bek.p.toFixed(4),iyi:+iyi.p.toFixed(4)});
  g2('24lü de aynı yönde',dus.d>bek.d&&bek.d>iyi.d);
  g2('çok iyide getiri küçük',iyi.p<0.60,+iyi.p.toFixed(4));
  g2('PreTUS200 > 24lü (200 vs branş sayısı)',dus.p>dus.d);
  X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));
})();
(function(){
  /* DONDURMA · tamamlanmış denemenin getirisi değişmemeli */
  C.setGun('2026-08-22'); X.D.bitti={}; X.D.denKaz={};
  const j=X.GOREVLER.findIndex(g=>g.act==='deneme24');
  const a1=RD('denemeDeger(GOREVLER['+j+'])');
  g2('tamamlanmadan donmuş değil',a1.donmus===false);
  RD('D.bitti[id(GOREVLER['+j+'])]="2026-08-10"; denemeDondur(GOREVLER['+j+'])');
  const a2=RD('denemeDeger(GOREVLER['+j+'])');
  g2('tamamlanınca donuyor',a2.donmus===true);
  X.GOREVLER.forEach(g=>{if(g.act==='oku')X.D.bitti[X.id(g)]='2026-08-11'});
  const a3=RD('denemeDeger(GOREVLER['+j+'])');
  g2('sonraki çalışmalar donmuş değeri DEĞİŞTİRMİYOR',Math.abs(a3.top-a2.top)<1e-12,
     {once:+a2.top.toFixed(6),sonra:+a3.top.toFixed(6)});
  RD('delete D.bitti[id(GOREVLER['+j+'])]; denemeCoz(GOREVLER['+j+'])');
  const a4=RD('denemeDeger(GOREVLER['+j+'])');
  g2('geri alınca çözülüyor',a4.donmus===false);
  g2('denKaz kaydı siliniyor',RD('!(D.denKaz||{})[id(GOREVLER['+j+'])]'));
  X.D.bitti={}; X.D.denKaz={};
})();
(function(){
  /* §175'ten beri deneme getirisi YALNIZ sonuç kaydından geliyor;
     görev tamamlama tek başına projeksiyonu etkilemiyor. */
  C.setGun('2026-08-22'); X.D.bitti={}; X.D.denKaz={}; X.D.kal=[];
  const p0=X.para(), K0=X.puan(p0.t,p0.k);
  X.GOREVLER.forEach(g=>{if(g.act==='deneme'||g.act==='deneme24'){
    X.D.bitti[X.id(g)]='2026-08-10'; RD('denemeDondur(GOREVLER['+X.GOREVLER.indexOf(g)+'])')}});
  const pT=X.para();
  g2('görev tamamlama TEK BAŞINA etkisiz',Math.abs(X.puan(pT.t,pT.k)-K0)<1e-9,
     {once:+K0.toFixed(4),sonra:+X.puan(pT.t,pT.k).toFixed(4)});
  /* Sonuç kaydı girilince etkilemeli */
  X.D.kal.push({tar:'2026-08-20',br:'Patoloji',d:13,y:3,b:2,
    konular:[{k:'neoplazi',q:5,d:4,y:1}]});
  const p1=X.para(), K1=X.puan(p1.t,p1.k);
  g2('sonuç kaydı projeksiyonu artırıyor',K1>K0,{once:+K0.toFixed(3),sonra:+K1.toFixed(3)});
  g2('katkı makul',K1-K0>0&&K1-K0<8,+(K1-K0).toFixed(4));
  X.D.bitti={}; X.D.denKaz={}; X.D.kal=[];
})();
console.log('\n'+(M2?'✗ '+M2+' HATA':'✓ SIFIR HATA — 21 ek kontrol'));
if(M2)process.exitCode=1;

console.log('\n═══ KONU BAZLI DENEME MODELİ ═══');
let M3=0;const g3=(a,ok,e)=>{if(!ok){M3++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vmK=require('vm'); const RK=e=>vmK.runInContext(e,C);
g3('KONU_DAG tablosu',RK('typeof KONU_DAG')==='object');
g3('on bir branş (Histo dahil)',RK('Object.keys(KONU_DAG).length')===11,RK('Object.keys(KONU_DAG).length'));
g3('156 konu (ikilenmeler birleşti)',RK('Object.values(KONU_DAG).reduce((a,o)=>a+Object.keys(o).length,0)')===156);
(function(){
  /* KRİTİK · her branşın konu toplamı TusAnaliz sayısını TAM sağlamalı */
  const den=RK('SORU.den');
  Object.keys(RK('KONU_DAG')).forEach(b=>{
    const t=RK('Object.values(KONU_DAG['+JSON.stringify(b)+']).reduce((a,x)=>a+x,0)');
    g3(b+' Σ = TusAnaliz',Math.abs(t-den[b])<0.01,{konuΣ:+t.toFixed(2),tusAnaliz:den[b]});
  });
})();
g3('Küçük Stajlar ayrı branş değil',!RK('KONU_DAG["Küçük Stajlar"]'));
g3('konu sadeleştirme',RK('typeof konuSade')==='function'&&
   RK('konuSade("Bakteriyoloji (Oldies+Goldies)")')==='bakteriyoloji');
g3('çalışılmışlık denetimi',RK('typeof konuCalisildi')==='function');
g3('yeni öğrenme S_ILK, tekrar S_TEK',KAY.indexOf('const S=eski?S_TEK:S_ILK')>=0);
g3("çürüme konu konu uygulanıyor",KAY.indexOf("n*pay*nps*Rr(gun,S)*SORU_ORAN_VAR()")>=0);
g3('para() çürümeyi TEKRAR uygulamıyor',KAY.indexOf('const r=Rr(fark(b,SINAV_G),S_ILK)')<0);
(function(){
  const j=X.GOREVLER.findIndex(g=>g.act==='deneme24');
  const pi=X.GOREVLER.findIndex(g=>g.act==='deneme');
  C.setGun('2026-08-05'); X.D.bitti={}; X.D.denKaz={};
  const a=RK('denemeKaz(GOREVLER['+j+'])'), pa=RK('denemeKaz(GOREVLER['+pi+'])');
  g3('24lü tek branş',new Set(a.dagilim.map(d=>d.br)).size===1);
  /* 1. oturum yalnız TEMEL branşlar (6), 2. oturum yalnız KLİNİK (4) */
  g3('PreTUS200 oturumu tek yarıyı kapsıyor',new Set(pa.dagilim.map(d=>d.br)).size<=7,
     new Set(pa.dagilim.map(d=>d.br)).size);
  /* ⚠ §266 ONARIM: bu çağrının başlığı bir düzenlemede değiştirilirken ESKİ argüman
     satırları silinmemiş, dosya sözdizimi hatasıyla hiç açılmıyordu (kapı ölüydü).
     krediSoru hiç tanımlanmamıştı; eski detay nesnesinden türetildi. */
  const krediSoru=a.yeni+a.tekrar;
  g3("24lü soru toplamı KİTAPÇIK sayısı",
     Math.abs(krediSoru-RK('DEN24')['Genel Cerrahi'])<0.5,
     {bulunan:+krediSoru.toFixed(1),kitapcik:RK('DEN24')['Genel Cerrahi']});
  g3('PreTUS200 oturumu ~100 soru',Math.abs(pa.yeni+pa.tekrar-100)<12,
     +(pa.yeni+pa.tekrar).toFixed(1));
  g3('başta hepsi yeni öğrenme',a.tekrar===0);
  /* Konular çalışılınca TEKRAR'a geçmeli ve getiri artmalı */
  X.GOREVLER.forEach(g=>{if(g.act==='oku'||g.act==='video')X.D.bitti[X.id(g)]='2026-08-01'});
  const b=RK('denemeKaz(GOREVLER['+j+'])');
  g3('çalışılınca tekrar sayısı artıyor',b.tekrar>a.tekrar,{once:a.tekrar,sonra:b.tekrar});
  g3('tekrar getirisi daha yüksek',b.top>a.top,{yeni:+a.top.toFixed(4),tekrar:+b.top.toFixed(4)});
  g3('S_TEK/S_ILK oranı 1.26×',Math.abs(RK('Rr(17,S_TEK)')/RK('Rr(17,S_ILK)')-1.26)<0.02);
  X.D.bitti={};
})();
console.log('\n'+(M3?'✗ '+M3+' HATA':'✓ SIFIR HATA — 25 ek kontrol'));
if(M3)process.exitCode=1;

console.log('\n═══ KARTTA GÖRÜNEN KAZANÇ ═══');
let M4=0;const g4=(a,ok,e)=>{if(!ok){M4++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vmZ=require('vm'); const RZ=e=>vmZ.runInContext(e,C);
g4('süzgeç genişletildi',KAY.indexOf("['oku','tekrar','video','soru','deneme','deneme24'].indexOf(g.act)<0")>=0);
g4("deneme kart önizlemesi ayrı yoldan",KAY.indexOf("return dv?Math.max(0,dv.top):0")>=0);
(function(){
  C.setGun('2026-08-05'); X.D.bitti={}; X.D.denKaz={}; X.D.tasi={};
  const dene=a=>{const j=X.GOREVLER.findIndex(g=>g.act===a);
    return j<0?null:{v:RZ('gorevKazanc(GOREVLER['+j+'])'),j:j}};
  const vi=dene('video'), ok=dene('oku'), d2=dene('deneme24'), dn=dene('deneme');
  g4('video kazancı görünüyor',vi&&vi.v>0.001,vi&&+vi.v.toFixed(5));
  g4('okuma kazancı görünüyor',ok&&ok.v>0.001);
  g4("24'lü kazancı görünüyor",d2&&d2.v>0.001,d2&&+d2.v.toFixed(5));
  g4('PreTUS200 kazancı görünüyor',dn&&dn.v>0.001,dn&&+dn.v.toFixed(5));
  g4('PreTUS200 > 24lü',dn&&d2&&dn.v>d2.v);
  /* Brif çipi gerçekten çiziliyor mu */
  [['video',vi],['deneme24',d2],['deneme',dn]].forEach(([ad,o])=>{
    if(!o)return;
    RZ('brifCiz(GOREVLER['+o.j+'])');
    const h=RZ('document.getElementById("brif").innerHTML||""');
    g4(ad+' brif çipi var',/Beklenen kazanç/i.test(h));
  });
  /* Telafi yolu · çarka taşınıp tamamlanınca projeksiyon artmalı */
  C.setGun('2026-08-05'); X.D.bitti={};
  const p0=X.para(), K0=X.puan(p0.t,p0.k);
  const hema=X.GOREVLER.filter(g=>g.act==='video'&&g.k.indexOf('Hematoloji')>=0);
  hema.forEach(g=>{X.D.tasi=X.D.tasi||{}; X.D.tasi[X.id(g)]='2026-08-05'});
  hema.forEach(g=>{X.D.bitti[X.id(g)]='2026-08-05'});
  const p1=X.para(), K1=X.puan(p1.t,p1.k);
  g4('telafi yoluyla yapılan video da sayılıyor',K1-K0>0.001,+(K1-K0).toFixed(4));
  g4('geride kalmış görev de sayılıyor (tarih önemsiz)',K1>K0);
  X.D.bitti={}; X.D.tasi={};
})();
console.log('\n'+(M4?'✗ '+M4+' HATA':'✓ SIFIR HATA — 12 ek kontrol'));
if(M4)process.exitCode=1;

console.log('\n═══ OTURUM BÖLÜMÜ · PERFORMANS · ÇİP ═══');
let M5=0;const g5=(a,ok,e)=>{if(!ok){M5++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vmO=require('vm'); const RO=e=>vmO.runInContext(e,C);
g5("oturum bölümü kuruldu",KAY.indexOf("oturum/.exec")>=0);
g5('1. oturum temel, 2. klinik',KAY.indexOf('branslar=tum.filter(br=>(TEMEL_BR.indexOf(br)>=0)===(n===1))')>=0);
g5('konu önbelleği',KAY.indexOf('function konuCalisildiKume()')>=0);
g5('çip etiketi getiriden',KAY.indexOf("et=(dv.t>0&&dv.k>0)?'net':(dv.t>0?'temel':'klinik')")>=0);
g5('ayrı "Tahmini getiri" çipi kalmadı',KAY.indexOf('Tahmini getiri')<0);
(function(){
  C.setGun('2026-07-30'); X.D.bitti={}; X.D.denKaz={};
  const dn=X.GOREVLER.filter(g=>g.act==='deneme');
  const o1=X.GOREVLER.indexOf(dn.find(g=>g.k.indexOf('1. oturum')>=0));
  const o2=X.GOREVLER.indexOf(dn.find(g=>g.k.indexOf('2. oturum')>=0));
  const c1=RO('denemeKaz(GOREVLER['+o1+'])'), c2=RO('denemeKaz(GOREVLER['+o2+'])');
  g5('1. oturum yalnız TEMEL',c1.t>0&&c1.k===0,{t:+c1.t.toFixed(4),k:c1.k});
  g5('2. oturum yalnız KLİNİK',c2.k>0&&c2.t===0,{t:c2.t,k:+c2.k.toFixed(4)});
  g5('1. oturum yedi temel branş (Histo dahil)',new Set(c1.dagilim.map(d=>d.br)).size===7);
  g5('2. oturum dört klinik branş',new Set(c2.dagilim.map(d=>d.br)).size===4);
  const tsoru=c1.yeni+c1.tekrar+c2.yeni+c2.tekrar;
  g5('iki oturum toplamı ~200 soru',Math.abs(tsoru-200)<10,+tsoru.toFixed(1));
  g5('çift sayım yok (oturumlar farklı)',Math.abs(c1.top-c2.top)>1e-6);
  /* PERFORMANS */
  RO('_gkOnb._a=null; _kcOnb={a:null,s:null}');
  const t0=Date.now(); RO('gorevKazanc(GOREVLER['+o1+'])');
  const sure=Date.now()-t0;
  g5('gorevKazanc hızlı (<150 ms)',sure<150,sure+' ms');
  RO('_kcOnb={a:null,s:null}');
  const t1=Date.now(); RO('denemeKaz(GOREVLER['+o1+'])');
  g5('denemeKaz hızlı (<80 ms)',Date.now()-t1<80,(Date.now()-t1)+' ms');
  /* ÇİP · beş görev türünde de doğru etiket */
  const cip=g=>{const j=X.GOREVLER.indexOf(g); RO('brifCiz(GOREVLER['+j+'])');
    const h=RO('document.getElementById("brif").innerHTML||""');
    const m=h.match(/Beklenen kazanç<\/u><b>([^<]*)/i); return m?m[1]:null};
  g5('1. oturum çipi "temel"',/temel/.test(cip(X.GOREVLER[o1])||''),cip(X.GOREVLER[o1]));
  g5('2. oturum çipi "klinik"',/klinik/.test(cip(X.GOREVLER[o2])||''),cip(X.GOREVLER[o2]));
  g5('okuma çipi var',!!cip(X.GOREVLER.find(g=>g.act==='oku'&&g.soru>0)));
  g5('video çipi var',!!cip(X.GOREVLER.find(g=>g.act==='video')));
  g5("24'lü çipi var",!!cip(X.GOREVLER.find(g=>g.act==='deneme24')));
  X.D.bitti={}; X.D.denKaz={};
})();
console.log('\n'+(M5?'✗ '+M5+' HATA':'✓ SIFIR HATA — 18 ek kontrol'));
if(M5)process.exitCode=1;
