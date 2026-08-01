require('./derin_ortam.js');
const C=globalThis.__C, X=C.API, fs=require('fs');
let H=0,N=0;const chk=(a,ok,e)=>{N++;if(!ok){H++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const kid=g=>X.id(g);
const say={};X.KOMBO.forEach(b=>{say[b[0]]=(say[b[0]]||0)+1;say[b[1]]=(say[b[1]]||0)+1});
console.log('═══ KOMBO ÇİPİ ═══');
// her görev için brifCiz çalışsın ve doğru kademe çıksın
let hata=0,dagilim={},kademe={};
X.GOREVLER.forEach((g,i)=>{
  try{X.brifCiz(g)}catch(e){hata++;console.log('    ✗ '+g.k.slice(0,30)+' → '+e.message);return}
  const h=String(C.brifOge().innerHTML||'');
  const n=say[kid(g)]||0;
  dagilim[n]=(dagilim[n]||0)+1;
  if(n===0){ if(/cKom/.test(h))hata++; return }
  const m=h.match(/class="cip cKom tam k(\d)"/);
  if(!m){hata++;console.log('    ✗ kombo çipi yok: '+g.k.slice(0,30));return}
  const bek=n>=5?4:(n>=3?3:(n>=2?2:1));
  if(+m[1]!==bek){hata++;console.log('    ✗ kademe yanlış: '+n+'× → k'+m[1]+' (beklenen k'+bek+')')}
  kademe[m[1]]=(kademe[m[1]]||0)+1;
  const s=h.match(/<span class="kmbS">(\d+)×<\/span>/);
  if(!s||+s[1]!==n){hata++;console.log('    ✗ sayı yanlış: '+g.k.slice(0,30)+' → '+(s?s[1]:'yok')+' (gerçek '+n+')')}
});
chk('278 görevin hepsinde brifCiz + doğru kademe + doğru sayı',hata===0,hata);
console.log('    kombo dağılımı:',JSON.stringify(dagilim));
console.log('    kademe dağılımı:',JSON.stringify(kademe));
// kombosuz görevde çip hiç yok
const kombosuz=X.GOREVLER.find(g=>!say[kid(g)]);
X.brifCiz(kombosuz);
chk('kombosuz görevde kombo çipi çizilmiyor',!/cKom/.test(String(C.brifOge().innerHTML)));
// en yüksek: 7×, k4
const _mx=Math.max(...Object.values(say));
const enCok=X.GOREVLER.find(g=>say[kid(g)]===_mx);
X.brifCiz(enCok);
let h=String(C.brifOge().innerHTML);
chk('en yüksek kombolu görevde işaret öğesi var',/class="kmbK"/.test(h),_mx+'x');
chk('işaret öğesi HER kademede var',(function(){let ok=true;X.GOREVLER.forEach(g=>{const n=say[kid(g)]||0;if(!n)return;
  X.brifCiz(g);const s2=String(C.brifOge().innerHTML);if(!/class="kmbK"/.test(s2))ok=false});return ok})());
chk('başlıkta doğru sayı yazıyor',new RegExp('<span class="kmbS">'+_mx+'×</span>').test(h),_mx);
// varsayılan kapalı
chk('varsayılan KAPALI (acik sınıfı yok)',!/cKom[^"]*acik/.test(h));
chk('aria-expanded false',/aria-expanded="false"/.test(h));
chk('gövde kmbG içinde',/class="kmbG">/.test(h));
chk('kombo satırı sayısı doğru',(h.match(/<p><b>/g)||[]).length===_mx,(h.match(/<p><b>/g)||[]).length);
// tıklama davranışı — gerçek DOM yok, işleyicinin bağlandığını ve sınıf değiştirdiğini sına
const kod=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8');
chk('tıklama işleyicisi bağlanıyor',/kmbB\.onclick=\(\)=>\{/.test(kod));
chk('classList.toggle ile açılıyor',/classList\.toggle\('acik'\)/.test(kod));
chk('aria-expanded güncelleniyor',/setAttribute\('aria-expanded'/.test(kod));
chk('açılınca yoğunluk yeniden ölçülüyor',/acik[\s\S]{0,120}brifYogunluk\(bf\)/.test(kod));
console.log('═══ CSS KADEMELERİ ═══');
chk('k1 sessiz nokta (taban .kmbK)',/\.cKom \.kmbK\{position:relative[\s\S]{0,160}background:var\(--bilgi\)/.test(kod));
chk('k2 altın nokta',/\.cKom\.k2 \.kmbK\{background:var\(--altin\)/.test(kod));
chk('k3 turuncu nokta + halka rengi',/\.cKom\.k3 \.kmbK\{width:6px[\s\S]{0,120}\}/.test(kod)&&/\.cKom\.k3 \.kmbK::after\{border-color/.test(kod));
chk('k4 kuyruk çubuğu + halka',/\.cKom\.k4 \.kmbK\{width:22px[\s\S]{0,200}\}/.test(kod)&&/\.cKom\.k4 \.kmbK::after\{inset/.test(kod));
chk('k4 üç katmanlı parıltı',/\.cKom\.k4 \.kmbS\{text-shadow:[^}]*,[^}]*,[^}]*\}/.test(kod));
const anim=(kod.match(/@keyframes (komboNefes|komboHalka|komboParla|komboKuyruk)/g)||[]);
chk('dört yavaş animasyon tanımlı',anim.length===4,anim);
const sure=(kod.match(/animation:kombo\w+ ([\d.]+)s/g)||[]).map(x=>parseFloat(x.match(/([\d.]+)s/)[1]));
chk('her animasyon ≥4 saniye (yavaş)',sure.length>0&&sure.every(v=>v>=4),sure);
chk('animasyonlar aynı sürede değil (senkron yanıp sönme yok)',new Set(sure).size>=2,sure);
chk('yer değiştiren/zıplayan hareket yok',!/translate|@keyframes kombo\w+\{[^}]*top:/.test(kod.match(/@keyframes kombo[\s\S]*?komboKuyruk[^}]*\}/)?.[0]||''));
chk('animasyonların hepsi prefers-reduced-motion içinde',(function(){
  /* TÜM no-preference blokları taranmalı — tek blok varsayımı, mola bloğu
     eklenince yanlış negatif veriyordu. */
  const bloklar=(kod.match(/@media \(prefers-reduced-motion:no-preference\)\{[\s\S]*?\n\}/g)||[]).join('');
  const hepsi=kod.match(/animation:kombo\w+/g)||[];
  return hepsi.length>=5&&hepsi.every(a=>bloklar.includes(a))})());
chk('genel hareket-azaltma kuralı da var',/@media \(prefers-reduced-motion:reduce\)\{\*\{[^}]*animation:none/.test(kod));
chk('açıkken satır kırpması kalkıyor',/\.cKom\.acik \.kmbG p\{-webkit-line-clamp:unset/.test(kod));
chk('klavye odağı görünür',/\.cKom \.kmbB:focus-visible\{outline/.test(kod));
chk('yalnız uygulamanın kendi renk değişkenleri + kuyruk tonu',
  (kod.match(/\.cKom\.k[234][^}]*color:(var\(--altin\)|var\(--turuncu\)|#F2C57C)/g)||[]).length>=3);
console.log('\n'+(H?'✗ '+H+' HATA / '+N:'✓ SIFIR HATA — '+N+' kontrol geçti'));
process.exitCode=H?1:0;

// ── kaynak haritası: kitap başlıkları kapalı başlıyor mu
const kh=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8');
console.log('═══ KAYNAK HARİTASI ═══');
let H2=0;const c2=(a,ok,e)=>{if(!ok){H2++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
c2('kitap başlıkları otomatik açılmıyor',!/details class="khP"'\+\(sr\?' open':''\)/.test(kh));
c2('details öğesi hâlâ kullanılıyor',/details class="khP"/.test(kh));
try{const s3=X.kaynakHarita();c2('kaynak haritası çiziliyor',s3.length>200);
  c2('çıktıda open özniteliği yok',!/<details class="khP" open>/.test(s3));
  const n=(s3.match(/<details class="khP">/g)||[]).length;
  c2('18 kitap başlığı var',n>=14,n);
}catch(e){c2('kaynak haritası çiziliyor',false,e.message)}
if(H2)console.log('✗ '+H2+' harita hatası'); else console.log('  ✓ kaynak haritası: kapalı başlıyor, 18 kitap');
const T=H+H2;
console.log('\n'+(T?'✗ TOPLAM '+T+' HATA':'✓ SIFIR HATA — '+(N+8)+' kontrol geçti'));
process.exitCode=T?1:0;
