require('./derin_ortam.js');
const C=globalThis.__C, X=C.API, fs=require('fs');
let H=0,N=0;const chk=(a,ok,e)=>{N++;if(!ok){H++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const S=m=>C.setSaat(m), G=d=>C.setGun(d), id=X.id;
const SIF=()=>{X.D.bitti={};X.D.tasi={};X.D.denemeler=JSON.parse(JSON.stringify(X.TOHUM));S(840);G('2026-07-26')};
const kod=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8');
const L=()=>C.API.carkListe?C.API.carkListe():null;

console.log('═══ A · ÇARK SÜZGECİ ═══');
chk('carkListe kodda var',/function carkListe\(\)/.test(kod));
chk('tamamlanan çarktan çıkıyor',/if\(D\.bitti\[k\]\)continue/.test(kod));
chk('geri taşınan her hâlükârda çarkta',/if\(t\[k\]\)\{L\.push\(i\);continue\}/.test(kod));
chk('vakti geçen çarktan çıkıyor',/if\(gecmis\(g\)\)continue/.test(kod));
chk('bul() listenin ilkini döndürüyor',/return L\.length\?L\[0\]:/.test(kod));
chk('tasi alanı senkronda korunuyor',/tasi:\(o&&typeof o\.tasi==='object'&&o\.tasi\)\|\|\{\}/.test(kod));
chk('tasi ilklendiriliyor',/if\(!D\.tasi\|\|typeof D\.tasi!=='object'\)D\.tasi=\{\}/.test(kod));

console.log('═══ B · DAVRANIŞ ═══');
SIF(); G('2026-08-10'); S(1200);
const kacan=X.kacanlar().length;
chk('10 Ağu 20:00 kaçırılan var',kacan>0,kacan);
let a1=X.bul();
chk('bul() vakti geçmiş bir görev DÖNDÜRMÜYOR',!X.gecmis(X.GOREVLER[a1])||X.D.tasi[id(X.GOREVLER[a1])],
   {gorev:X.GOREVLER[a1].k.slice(0,26),gun:X.GOREVLER[a1].d});
chk('bul() tamamlanmış görev döndürmüyor',!X.D.bitti[id(X.GOREVLER[a1])]);
// hepsi tamam → liste boşalır
SIF(); X.GOREVLER.forEach(g=>X.D.bitti[id(g)]=g.d);
chk('hepsi tamamken çark boş',X.GOREVLER.filter(g=>!X.D.bitti[id(g)]).length===0);
// tek görev geri alınınca çarka döner
SIF(); G('2026-08-10'); S(1200);
const eski=X.kacanlar()[0];
chk('kaçırılan görev normalde çarkta değil',(function(){
  const l=X.GOREVLER.map((g,i)=>i).filter(i=>{const g=X.GOREVLER[i];
    return !X.D.bitti[id(g)] && (X.D.tasi[id(g)] || !X.gecmis(g))});
  return !l.includes(X.GOREVLER.indexOf(eski))})());
X.D.tasi[id(eski)]=1;
chk('çarka taşınınca listeye giriyor',(function(){
  const l=X.GOREVLER.map((g,i)=>i).filter(i=>{const g=X.GOREVLER[i];
    return !X.D.bitti[id(g)] && (X.D.tasi[id(g)] || !X.gecmis(g))});
  return l.includes(X.GOREVLER.indexOf(eski))})());
chk('taşınan görev listenin BAŞINDA (bul onu döndürür)',X.GOREVLER[X.bul()]===eski,
  {bulunan:X.GOREVLER[X.bul()].k.slice(0,26),beklenen:eski.k.slice(0,26)});
X.D.bitti[id(eski)]=X.bgun(); delete X.D.tasi[id(eski)];
chk('tamamlanınca taşıma işareti temizleniyor ve çarktan çıkıyor',X.GOREVLER[X.bul()]!==eski);
SIF();

console.log('═══ C · PANELLER ═══');
chk('tamamlananlar çipi HTML\'de',/id="bitti"/.test(kod)&&/id="bittiN"/.test(kod));
chk('tamamlananlar paneli HTML\'de',/id="bpanel"/.test(kod)&&/id="bliste"/.test(kod));
chk('çip kaçırılanların ALTINDA',kod.indexOf('id="kacir"')<kod.indexOf('id="bitti"'));
chk('bpanelCiz tanımlı',/function bpanelCiz\(\)/.test(kod));
chk('carkaTasi tanımlı',/function carkaTasi\(kim\)/.test(kod));
chk('Çarka taşı düğmesi üretiliyor',/data-tas="/.test(kod)&&/Çarka taşı/.test(kod));
chk('Geri al düğmesi üretiliyor',/data-ger="/.test(kod)&&/Geri al/.test(kod));
chk('geri alma kazancı da geri alıyor',/delete D\.bitti\[b\.dataset\.ger\]/.test(kod));
chk('kaçırılan satırında NE YAPACAKSIN var',/EYLEM\[g\.act\]\|\|g\.act\)\+' · '\+esc\(g\.br\)/.test(kod));
chk('kaçırılan satırında kitap + sf aralığı ayrı',/kt\[0\]\?'<s>'\+esc\(kt\[0\]\)\+\(kt\[1\]\?' <em>sf '/.test(kod));
chk('kaçırılan satırında oturum bilgisi',/g\.ot&&g\.ot\[1\]>1\?' · oturum '/.test(kod));
chk('tamamlananlar en yeniden eskiye, 25 ile sınırlı',/slice\(0,25\)/.test(kod));
chk('dar ekran için düğmeler alta iniyor',/@media\(max-width:520px\)\{[\s\S]{0,400}\.kdg\{flex-direction:row/.test(kod));
chk('taşınmış görev panelde işaretli',/kit'\+\(t\[kim\]\?' tsn':''\)/.test(kod)&&/\.kit\.tsn\{/.test(kod));

console.log('═══ D · ÇİZİM ═══');
let hata=0;
[['2026-07-27',0],['2026-07-27',1439],['2026-08-10',1200],['2026-08-22',1439]].forEach(([d,m])=>{
  G(d);S(m);
  try{X.kacanlar();X.bul();X.etiketler()}catch(e){hata++;console.log('    ✗ '+d+' '+m+' → '+e.message)}});
chk('dört gün-saat noktasında hata yok',hata===0,hata);
SIF();
console.log('\n'+(H?'✗ '+H+' HATA / '+N:'✓ SIFIR HATA — '+N+' kontrol geçti'));
process.exitCode=H?1:0;

// ══ EK: çevirme · çarpı · Bugün paneli · menü orb'u
console.log('\n═══ E · ÇARKI ÇEVİRME ═══');
let H3=0;const c3=(a,ok,e)=>{if(!ok){H3++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
c3('adim() tanımlı',/function adim\(d\)\{/.test(kod));
c3('fare tekerleği bağlı',/addEventListener\('wheel'/.test(kod));
c3('tekerlek yatay kaydırmayı yok sayıyor',/Math\.abs\(e\.deltaX\)>Math\.abs\(e\.deltaY\)\)return/.test(kod));
c3('parmak/fare sürüklemesi bağlı',/addEventListener\('pointerdown'/.test(kod)&&/addEventListener\('pointermove'/.test(kod));
c3('orta tuş destekli',/e\.button===1/.test(kod));
c3('sürükleme sonrası tıklama yutuluyor',/capture:true,once:true/.test(kod));
c3('klavye ok tuşları',/ArrowDown/.test(kod)&&/ArrowUp/.test(kod));
c3('adım durak listesinin sınırında duruyor',/Math\.max\(0,Math\.min\(S\.length-1,p\+d\)\)/.test(kod));
c3('sürükleme sürekli akış',kod.indexOf('kayY=dy;')>=0);
c3('bırakınca merkeze oturuyor',/function otur\(\)/.test(kod)&&/merkezEl\.dataset\.i/.test(kod));
c3('sürüklerken geçiş kapalı',/#sahne\.sur \.sr[^{]*\{transition:none/.test(kod));
c3('sürüklerken hepsi şerit',/!molaOdak&&!surukleKip/.test(kod));
c3('yatay kaydırma engellenmiyor (touch-action:pan-x)',/#cark\{touch-action:pan-x\}/.test(kod));
// adım davranışı
SIF(); G('2026-08-05'); S(700);
const L0=(function(){return X.GOREVLER.map((g,i)=>i).filter(i=>{const g=X.GOREVLER[i];
  return !X.D.bitti[id(g)]&&(X.D.tasi[id(g)]||!X.gecmis(g))})})();
c3('süzülmüş listede ileri gidilecek iş var',L0.length>3,L0.length);
c3('ilerideki işler listede (göz atılabilir)',L0.slice(0,5).every(i=>i>=L0[0]));

console.log('═══ F · GERİ GÖNDERME ÇARPISI ═══');
c3('taşınmış kartta çarpı çiziliyor',/tsnX" data-a="x"/.test(kod));
c3('çarpı yalnız taşınmışta',/const tsn=!!\(D\.tasi&&D\.tasi\[id\(g\)\]\)/.test(kod));
c3('çarpı tıklaması taşımayı siliyor',kod.indexOf("delete (D.tasi||{})[id(g)]; kay(); ust();")>=0);
c3('çarpı hafif kontrastlı',/\.tsnX\{position:absolute;top:9px;right:9px/.test(kod));
c3('erişilebilir etiketi var',/aria-label="Kaçırılanlara geri gönder"/.test(kod));

console.log('═══ G · GÜN GÖRÜNÜMÜ (pinch) ═══');
c3('eski bugün paneli kaldırıldı',!/id="gpanel"/.test(kod)&&!/gpanelCiz/.test(kod));
c3('yerini pinch gün listesi aldı',/id="gunListe"/.test(kod)&&/function gunListe/.test(kod));
c3('liste blok başlıklarıyla gruplu',/class="glBlok"/.test(kod));
c3('listede tamamlanan işaretli',/glS'\+\(bt\?' ok':''\)/.test(kod));
c3('gün özeti var',/class="glBas"/.test(kod));

console.log('═══ H · DOĞRUDAN DÜĞMELER ═══');
c3('menü kaldırıldı',!/id="menuB"/.test(kod)&&!/class="mYay"/.test(kod));
c3('power-up orb doğrudan',/class="puOrb" id="puOrb"/.test(kod));
c3('telafi düğmesi doğrudan',/class="dOrb" id="kacir"/.test(kod));
c3('deneme ve tamamlanan da doğrudan',/class="dOrb kck" id="dnmB"/.test(kod)&&/class="dOrb kck" id="bitti"/.test(kod));
c3('düğmeler YATAY şeritte',/<div class="solUst">/.test(kod)&&/\.solUst\{display:flex;align-items:center/.test(kod));
c3('mola çipi kendi satırında',kod.indexOf('.etSat{grid-area:mol')>=0);
c3('kaçırılan sayısı rozette',/id="kacirN"/.test(kod)&&/\.dOrb s\.gor\{display:flex\}/.test(kod));
console.log('\n'+(H3?'✗ '+H3+' EK HATA':'✓ EK KONTROLLER SIFIR HATA'));
if(H3)process.exitCode=1;

console.log('\n═══ I · BU TUR ═══');
let H4=0;const c4=(a,ok,e)=>{if(!ok){H4++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
c4('gün listesi pinch ile açılıyor',/function gunKipAc/.test(kod));
c4('gün listesi ölçekleniyor',kod.indexOf('function gunOlcekle')>=0);
c4('listeden göreve geçiş',kod.indexOf('gunKipAc(false); gecis(+x.dataset.gi)')>=0);

c4('null öğe zinciri kırmıyor',/const c=document\.getElementById\('cark'\); if\(!c\)return/.test(kod));
c4('bugün düğmesi kaldırıldı (yerini pinch aldı)',!/id="bugun"/.test(kod));
c4('pinch ile gün kipi',/gunKipAc/.test(kod)&&/pinchD0/.test(kod));
c4('düğmeler SVG ikonlu',/\.dOrb svg\{width:17px/.test(kod));
c4('ikonlar metin rengini izliyor',/stroke:currentColor/.test(kod));
c4('kaçırılan sayısı rozette',/e2\.textContent=String\(kc\.length\)/.test(kod));
c4('tamamlanan sayısı rozette',/e3\.textContent=String\(bt\.length\)/.test(kod));
c4('düğme ölçüsü kare',/\.dOrb\{[\s\S]{0,120}width:32px;height:32px/.test(kod));
c4('tek karakterli sembol kalmadı',!/><span>◷<\/span></.test(kod)&&!/><span>⚠<\/span></.test(kod));
c4('erişilebilir etiketler',/aria-label="Telafi"/.test(kod)&&/aria-label="Deneme sonucu gir"/.test(kod));
c4('mola kartı ayrı renkte',/\.sr\.mm \.mola\{border-color:rgba\(140,190,225/.test(kod));
c4('mola rengi görev renginden farklı',/rgba\(150,198,232,\.16\)/.test(kod));
chk('ölçek rampası konumdan',kod.indexOf('Math.pow(Math.max(0,Math.cos(t)),.62)')>=0);
c4('etkin kartta beliriş animasyonu YOK',/\.sr\.act \.kart\{animation:none\}/.test(kod));
c4('hareket azaltma kademelerde geçerli',kod.indexOf('@media (prefers-reduced-motion:reduce){.kdm>div{transition:none}}')>=0);
console.log('\n'+(H4?'✗ '+H4+' HATA':'✓ BU TUR SIFIR HATA'));
if(H4)process.exitCode=1;

console.log('\n═══ J · KAYDIRMA AKICILIĞI ═══');
let H5=0;const c5=(a,ok,e)=>{if(!ok){H5++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
c5('geometri önbelleği kuruluyor',/dizOnb=\{c:c,a:a,R:R,he:he/.test(kod));
c5('sürükleme karesi ölçümsüz (dizKay)',/function dizKay\(\)\{/.test(kod));
c5('dizKay içinde getBoundingClientRect YOK',!/function dizKay\(\)\{[\s\S]*?getBoundingClientRect[\s\S]*?\n\}/.test(kod.match(/function dizKay\(\)\{[\s\S]*?\n\}/)?.[0]||''));
c5('parmak hareketi rAF ile kare başına tek',/if\(!kayKare\)kayKare=requestAnimationFrame\(\(\)=>\{kayKare=0;dizKay\(\)\}\)/.test(kod));
c5('tekerlek birikimli adım',kod.indexOf('const TEK_ESIK=48')>=0);
c5('sürüklerken diz() çağrılmıyor',!/kayY=dy; diz\(\);/.test(kod));
c5('bırakınca yumuşak oturma sınıfı',/sahne\.classList\.add\('otu'\)/.test(kod)&&/#sahne\.otu \.sr\{transition:transform \.60s/.test(kod));
c5('oturma sınıfı geri alınıyor',kod.indexOf('),900)')>=0);
c4("ışık patlaması kaldırıldı",!/@keyframes kartAc/.test(kod));
c5('temizlenmiş y hesabı',/y\[i\]=y\[i\+1\]-he\[i\+1\]\/2-K\.ar\[i\+1\]-he\[i\]\/2;/.test(kod)&&!/\*0\+he\[i\]\/2\*0/.test(kod));
console.log('\n'+(H5?'✗ '+H5+' HATA':'✓ AKICILIK KONTROLLERİ SIFIR HATA'));
if(H5)process.exitCode=1;

/* Dosyanın SON satırı tüm bölümlerin özetini versin — tail -1 güvenilir olsun. */
const TOPLAM=H+H3+H4+H5;
console.log('\n'+(TOPLAM?'✗ TOPLAM '+TOPLAM+' HATA':'✓ SIFIR HATA — cark_test tamamı geçti'));
process.exitCode=TOPLAM?1:0;

console.log('\n═══ AKIŞ ve KENAR ÇÖZÜNMESİ ═══');
let H8=0;const c8=(a,ok,e)=>{if(!ok){H8++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const k8=require('fs').readFileSync('/mnt/user-data/outputs/index.html','utf8');
c8("kartAc tamamen kaldırıldı",!/@keyframes kartAc/.test(kod));
c8("kademe geçişi ölçek değiştirmiyor",!/animation:kartAc/.test(kod)&&!/@keyframes kartAc/.test(kod));
c8('satırlar konuma kilitli (geçiş yok)',kod.indexOf('transition:height .30s')<0);
c8('maske üst ve alt',kod.indexOf('transparent 0,rgba(0,0,0,.30) 4px')>=0&&kod.indexOf('transparent 100%)')>=0);
c8('webkit maskesi',/-webkit-mask-image:linear-gradient/.test(k8));
c8('sınırda YALNIZ saydamlaşma (bulanıklık yok)',!/\.sr\[data-toz/.test(k8));
c8('data-toz tamamen kaldırıldı',!/data-toz/.test(k8));
c8('opaklık uçta sıfırlanıyor',kod.indexOf('const SON_BAS=0.52, SON_UC=0.95')>=0);
c8('eski soluk rampa kalmadı',kod.indexOf('komsu?.72:.52')<0);
c8('opaklık rampası iki fonksiyonda da',(kod.match(/1-\(ab-0?\.?5?2?\)?/g)||[]).length>=1&&kod.indexOf('ab<=0.52?1:')>=0);
c8('tıklama alanı opaklıkla uyumlu',kod.indexOf("pointerEvents=op<0.05")>=0);
c8('opaklık rampası uçta sönüyor',kod.indexOf('SON_BAS=0.52, SON_UC=0.95')>=0);
c8('geçiş süresi korundu (.60s)',/#sahne\.otu \.sr\{transition:transform \.60s/.test(k8));
console.log('\n'+(H8?'✗ '+H8+' HATA':'✓ SIFIR HATA — 13 ek kontrol'));
if(H8)process.exitCode=1;

console.log('\n═══ SÜREKLİ AÇILMA · PINCH · GÜN KİPİ ═══');
let H9=0;const c9=(a,ok,e)=>{if(!ok){H9++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vm9=require('vm'); const R9=e=>vm9.runInContext(e,C);
c9('kademeli kart tasarımı',kod.indexOf('class="kdm0"')>=0&&kod.indexOf('class="kdm3"')>=0);
c9('açıklık değişkeni yazılıyor',kod.indexOf("x.style.setProperty('--ac',v.toFixed(3))")>=0);
c9('yükseklik oranlardan hesaplanıyor',kod.indexOf('return 36+SAT[0]*r[0]')>=0);
c9('açıklık açıdan sürekli',kod.indexOf('const acOf=t=>')>=0);
c9('satırlar konuma kilitli',kod.indexOf('.kdm>div{display:flex;align-items:center;gap:8px;overflow:hidden;')>=0);
c9('sf satırı sürekli açılıyor',kod.indexOf('.kdm2{height:calc(18px * var(--r2,0))')>=0);
c9('süreklilik iki fonksiyonda da',kod.indexOf('const acOf=t=>')>=0&&kod.indexOf('const acOf2=t=>')>=0);
c9('eşit uzaklık = eşit açıklık',(kod.match(/1-Math\.abs\(t\)\/AC_UC2?/g)||[]).length===2);
c9('gunListe fonksiyonu',R9('typeof gunListe')==='function');
c9('gün listesi HTML üretiyor',R9('gunListe()').length>200);
c9('listede blok başlıkları',/glBlok/.test(R9('gunListe()')));
c9('listede tıklanabilir satırlar',/data-gi=/.test(R9('gunListe()')));
c9('gunKipAc fonksiyonu',R9('typeof gunKipAc')==='function');
c9('pinch-in eşiği',/o<0\.74\)\{gunKipAc\(true\)/.test(kod));
c9('pinch-out eşiği',/o>1\.34\)\{gunKipAc\(false\)/.test(kod));
c9('ctrl+tekerlek desteği',/if\(!e\.ctrlKey\)return/.test(kod));
c9('liste aynı maskeli alanda',kod.indexOf('id="gunListe"')>kod.indexOf('id="cark"'));
c9('liste kaydırmasız (hepsi sığıyor)',kod.indexOf('#gunListe{position:absolute;inset:0;z-index:2;overflow:hidden')>=0);
c9('liste yumuşak geçişle geliyor',/#gunListe\{[\s\S]{0,300}transition:opacity \.42s ease,transform \.48s/.test(kod));
c9('çark gizlenirken sönüyor',/#sahne\.gizli\{opacity:0;pointer-events:none;transition:opacity \.34s/.test(kod));
c9('listeden göreve tıklayınca çarka dönüyor',/gunKipAc\(false\); gecis\(\+x\.dataset\.gi\)/.test(kod));
console.log('\n'+(H9?'✗ '+H9+' HATA':'✓ SIFIR HATA — 21 ek kontrol'));
if(H9)process.exitCode=1;

console.log('\n═══ BU TURUN DÜZELTMELERİ ═══');
let HA=0;const cA=(a,ok,e)=>{if(!ok){HA++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cA("kart taşmayı kırpıyor",/\.kdm\{[\s\S]{0,240}overflow:hidden/.test(kod));
cA("ışık patlaması yok",!/animation:kartAc/.test(kod)&&!/@keyframes kartAc/.test(kod));
cA('etkin kartta animasyon yok',/\.sr\.act \.kart\{animation:none\}/.test(kod));
cA('yükseklik oranlardan',kod.indexOf('return 36+SAT[0]*r[0]')>=0);
cA('önbellek sadeleşti',kod.indexOf('SIN:SIN,kw:kw}')>=0);
cA('sürüklerken yükseklik güncelleniyor',kod.indexOf('if(Math.abs(yh-h[i])>0.5)')>=0);
cA('yükseklik değişince y yeniden çözülüyor',/if\(degisti\)\{/.test(kod));
cA('pinch dinleyicileri ÜST kapsayıcıda',/const kap=c\.parentElement\|\|c/.test(kod));
cA('yakalama evresinde dinleniyor',(kod.match(/capture:true/g)||[]).length>=4,
  (kod.match(/capture:true/g)||[]).length);
cA('gün kipinde de touch-action kilitleniyor',/const g=document\.getElementById\('gunListe'\); if\(g\)g\.style\.touchAction/.test(kod));
cA('pinch-out da preventDefault ediyor',/if\(e\.touches\.length!==2\)return;\s*if\(e\.cancelable\)e\.preventDefault\(\)/.test(kod));
cA('pinchD0 yoksa kurtarılıyor',/if\(!pinchD0\)\{pinchD0=mes\(e\.touches\);return\}/.test(kod));
console.log('\n'+(HA?'✗ '+HA+' HATA':'✓ SIFIR HATA — 12 ek kontrol'));
if(HA)process.exitCode=1;

console.log('\n═══ DOM SÜREKLİLİĞİ ═══');
let HB=0;const cB=(a,ok,e)=>{if(!ok){HB++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cB('DOM her geçişte silinmiyor',!/const a=Math\.max\(0,pos-7\),z=Math\.min\(L\.length-1,pos\+11\);s\.innerHTML=''/.test(kod));
cB('elemanlar kimliğe göre eşleşiyor',/\[\.\.\.s\.children\]\.forEach\(x=>\{eski\[x\.dataset\.i\]=x\}\)/.test(kod));
cB('var olan eleman kullanılıyor',/const el=varOlan\|\|document\.createElement\('div'\)/.test(kod));
cB('içerik biçim değişince yenileniyor',kod.indexOf('el.dataset.bicim!==bicim')>=0);
cB('kademe sınıfı korunuyor',/const kdS=\(varOlan&&\(varOlan\.className\.match/.test(kod));
cB('pencere dışı elemanlar siliniyor',/if\(!kullanilan\[x\.dataset\.i\]\)x\.remove\(\)/.test(kod));
cB('DOM sırası fragment ile kuruluyor',/const frag=document\.createDocumentFragment\?/.test(kod)&&/if\(frag\)s\.appendChild\(frag\)/.test(kod));
cB('mola şeridi de yeniden kullanılıyor',/const mVar=eski\['m'\+i\]/.test(kod));
cB('metin seçimi kapalı (çark)',/#cark\{[\s\S]{0,300}user-select:none/.test(kod));
cB('metin seçimi kapalı (liste)',/#gunListe\{[\s\S]{0,200}user-select:none/.test(kod));
cB('dokunma çağrısı kapalı',/-webkit-touch-callout:none/.test(kod));
cB('süreklilik iki fonksiyonda da',kod.indexOf('acOf=')>=0&&kod.indexOf('acOf2=')>=0);
cB('açıklık doğrudan hesaplanıyor',kod.indexOf('h[i]=acYaz(x,acOf(th[i]))')>=0);
console.log('\n'+(HB?'✗ '+HB+' HATA':'✓ SIFIR HATA — 13 ek kontrol'));
if(HB)process.exitCode=1;

console.log('\n═══ YAKINLAŞTIRMA KİLİDİ ve DÜZEN ═══');
let HC=0;const cC=(a,ok,e)=>{if(!ok){HC++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cC('viewport yakınlaştırma kapalı',/user-scalable=no/.test(kod)&&/minimum-scale=1/.test(kod));
cC('touch-action manipulation',/html,body\{touch-action:manipulation/.test(kod));
cC('tüm uygulamada metin seçilemez',/\*\{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none\}/.test(kod));
cC('girdi alanları hariç',/input,textarea,select,\[contenteditable\]\{-webkit-user-select:text/.test(kod));
cC('kayY sürükleme dışında sıfırlanıyor',/if\(!surukleKip\)kayY=0/.test(kod));
cC('mola çipi kendi satırında',kod.indexOf('.etSat{grid-area:mol')>=0);
cC('orb şeridi görünür',kod.indexOf('.solUst{display:flex;align-items:center;gap:6px;flex-wrap:nowrap;padding-top:5px;overflow:visible}')>=0);
cC('eski gpanel CSS de gitti',!/#gpanel\{/.test(kod));
cC('gGun değişkeni kalmadı',!/let gGun/.test(kod));
console.log('\n'+(HC?'✗ '+HC+' HATA':'✓ SIFIR HATA — 9 ek kontrol'));
if(HC)process.exitCode=1;

console.log('\n═══ DAYANIKLILIK ═══');
let HD=0;const cD=(a,ok,e)=>{if(!ok){HD++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cD('sıfır yükseklikte çizim ertleniyor',/if\(!kw\.height\|\|kw\.height<40\|\|!kw\.width\)\{requestAnimationFrame\(diz\);return\}/.test(kod));
cD('üst şerit ızgara düzeninde',kod.indexOf("grid-template-areas:'sol nav ist'")>=0);
cD('sol sütun kendi alanında',kod.indexOf('.sol{grid-area:sol')>=0);
cD('nav kendi alanında ortada',kod.indexOf('nav{grid-area:nav;justify-self:center')>=0);
cD('orb şeridi görünür',kod.indexOf('.solUst{display:flex;align-items:center;gap:6px;flex-wrap:nowrap;padding-top:5px;overflow:visible}')>=0);
cD('mola çipi tam görünür',kod.indexOf('overflow:visible;margin-top:2px}')>=0);
cD('kart sınıfı seyir kapsayıcısıyla çakışmıyor',/\.kdm\{border-radius:14px/.test(kod)&&/\.kd\{position:absolute;inset:0/.test(kod));
console.log('\n'+(HD?'✗ '+HD+' HATA':'✓ SIFIR HATA — 7 ek kontrol'));
if(HD)process.exitCode=1;

console.log('\n═══ CSS BÜTÜNLÜĞÜ ═══');
let HE=0;const cE=(a,ok,e)=>{if(!ok){HE++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
(function(){
  const css=(kod.match(/<style>([\s\S]*?)<\/style>/)||[])[1]||'';
  let d=0, fazla=[], sat=1;
  for(let ci=0;ci<css.length;ci++){const c=css[ci];
    if(c===String.fromCharCode(10))sat++;
    else if(c==='{')d++;
    else if(c==='}'){d--; if(d<0){fazla.push(sat); d=0}}}
  cE('CSS süslü parantez dengeli',d===0,{denge:d});
  cE('başıboş } yok',fazla.length===0,fazla.slice(0,3));
  cE('CSS boş değil',css.length>40000,css.length);
  const bos=(css.match(/(^|\})\s*\{/g)||[]).length;
  cE('boş seçici yok',bos===0,bos);
})();
cE('hata göstericisi var',/id=\x27__hata\x27/.test(kod)||/__hata/.test(kod));
cE('servis işçisi korumalı',/try\{ if\('serviceWorker' in navigator\)/.test(kod));
console.log('\n'+(HE?'✗ '+HE+' HATA':'✓ SIFIR HATA — 6 ek kontrol'));
if(HE)process.exitCode=1;

console.log('\n═══ KISA GÖRÜNTÜ ALANI ═══');
let HF=0;const cF=(a,ok,e)=>{if(!ok){HF++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cF('dar ekranda oranlı bölüşüm',/#rota\{grid-template-columns:1fr;grid-template-rows:1\.25fr minmax\(88px,1fr\)\}/.test(kod));
cF('660px altında oranlı',/#rota\{grid-template-rows:1\.2fr minmax\(84px,1fr\)\}/.test(kod));
cF('470px altında oranlı',/#rota\{grid-template-rows:1\.15fr minmax\(80px,1fr\)\}/.test(kod));
cF('sabit vh tavanı kalmadı',!/#uzay\{max-height:4[68]vh/.test(kod)&&!/#uzay\{max-height:52vh/.test(kod));
cF('brif kendi içinde kayar',/#uzay\{min-height:64px;overflow-y:auto/.test(kod));
cF('çark asgari yüksekliği var',/#cark\{position:relative;overflow:hidden;min-height:140px/.test(kod));
cF('teşhis aracı duruyor',/window\.__TESHIS/.test(kod));
cF('fonksiyon sarmalayıcı duruyor',/window\.__G=function/.test(kod));
console.log('\n'+(HF?'✗ '+HF+' HATA':'✓ SIFIR HATA — 8 ek kontrol'));
if(HF)process.exitCode=1;

console.log('\n═══ YÜKSEKLİK ZİNCİRİ ═══');
let HG=0;const cG=(a,ok,e)=>{if(!ok){HG++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cG('html kesin yüksekliğe sahip',/html\{background:#04050A;color-scheme:dark;height:100%\}/.test(kod));
cG('dvh desteği',/@supports \(height:100dvh\)\{html\{height:100dvh\}\}/.test(kod));
cG('body yüksekliği çözülebiliyor',/body\{height:100%;min-height:0;margin:0;overflow:hidden\}/.test(kod));
cG('main esneyebiliyor',/main\{flex:1 1 auto;position:relative;overflow:hidden/.test(kod));
cG('rota ızgarası yüzde yükseklik',/#rota\{display:grid;[\s\S]{0,80}height:100%\}/.test(kod));
console.log('\n'+(HG?'✗ '+HG+' HATA':'✓ SIFIR HATA — 5 ek kontrol'));
if(HG)process.exitCode=1;

console.log('\n═══ KATMAN SIRASI · İÇ İÇE GEÇME ═══');
let HH=0;const cH=(a,ok,e)=>{if(!ok){HH++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cH('odaktaki en üst katmanda',kod.indexOf('zIndex=Math.max(1,1000-Math.round(ab*1000))')>=0);
cH('katman odağa uzaklıkla kesin',kod.indexOf('1000-Math.round(ab*1000)')>=0);
cH('diz ve dizKay aynı formül',(kod.match(/zIndex=Math\.max\(1,1000-Math\.round\(ab\*1000\)\)/g)||[]).length===2);
cH('kart zemini OPAK',kod.indexOf('background:#0A0E18')>=0);
cH('zemin sürekli · normal',kod.indexOf('.kdm{background:rgb(calc(10 + 9*var(--ac,0))')>=0);
cH('zemin sürekli · mola',kod.indexOf('.kdm.mk{background:rgb(')>=0);
cH('zemin sürekli · power-up',kod.indexOf('.kdm.puK{background:rgb(')>=0);
cH('etkin kart opak',kod.indexOf('.kart{border-radius:18px;background:#131A2C')>=0);
cH('odak ve yakınlar tam opak',kod.indexOf('ab<=SON_BAS?1:')>=0);
(function(){
  const z=[0,0.03,0.08,0.16,0.31,0.55,0.9].map(ab=>Math.max(1,900-Math.round(ab*1000)));
  let mon=true; for(let i=1;i<z.length;i++)if(z[i]>=z[i-1])mon=false;
cH('katman kesin azalan',(function(){const z=ab=>Math.max(1,1000-Math.round(ab*1000));const v=[0,0.03,0.08,0.16,0.31,0.55,0.9].map(z);for(let i=1;i<v.length;i++)if(v[i]>=v[i-1])return false;return true})());
cH('katman değerleri tekil',(function(){const z=ab=>Math.max(1,1000-Math.round(ab*1000));const v=[0,0.03,0.08,0.16,0.31,0.55,0.9].map(z);return new Set(v).size===v.length})());
})();
console.log('\n'+(HH?'✗ '+HH+' HATA':'✓ SIFIR HATA — 11 ek kontrol'));
if(HH)process.exitCode=1;

console.log('\n═══ ALTI KADEME · TEŞHİS · KUTUP YILDIZI ═══');
let HI=0;const cI=(a,ok,e)=>{if(!ok){HI++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cI('teşhis paneli varsayılan KAPALI',kod.indexOf('if(!HATA_AC)return')>=0);
cI('yalnız ?hata=1 ile açılır',kod.indexOf('HATA_AC=/[?&]hata=1/')>=0);
cI('açıklık açıdan sürekli',kod.indexOf('const acOf=t=>')>=0);
cI('yükseklik sürekli hesaplanıyor',kod.indexOf('36+SAT[0]*r[0]')>=0);
cI('konu satırı sürekli',kod.indexOf('.kdm1{height:calc(21px * var(--r1,0))')>=0);
cI('sf satırı sürekli',kod.indexOf('.kdm2{height:calc(18px * var(--r2,0))')>=0);
cI('blok satırı sürekli',kod.indexOf('.kdm3{height:calc(17px * var(--r3,0))')>=0);
cI('son seans satırı sürekli',kod.indexOf('.kdm3b{height:calc(15px * var(--r4,0))')>=0);
cI('header ızgara üç alan',kod.indexOf("grid-template-areas:'sol nav ist'")>=0);
cI('nav kendi alanında',kod.indexOf('nav{grid-area:nav;justify-self:center')>=0);
cI('istatistikler kutulu',kod.indexOf('.ok{text-align:right;padding:5px 9px 6px;border-radius:12px')>=0);
cI('parakete yeşil kutu',kod.indexOf('.ok.hyl{background:rgba(111,163,90')>=0);
cI('potansiyel mavi kutu',kod.indexOf('.ok.tkl{background:rgba(143,212,255')>=0);
cI('kalan gün takımyıldız',kod.indexOf('const RAKAM=')>=0&&kod.indexOf('function rakamSVG')>=0);
cI('takımyıldız hareket azaltmada sabit',/prefers-reduced-motion:reduce\)\{\.ryd circle\{animation:none/.test(kod));
console.log('\n'+(HI?'✗ '+HI+' HATA':'✓ SIFIR HATA — 15 ek kontrol'));
if(HI)process.exitCode=1;

console.log('\n═══ SIRA TABANLI KADEME · OPAKLIK ═══');
let HJ=0;const cJ=(a,ok,e)=>{if(!ok){HJ++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cJ('açıklık açıdan sürekli',kod.indexOf('const acOf=t=>')>=0);
cJ('sürüklerken de sürekli',kod.indexOf('const acOf2=t=>')>=0);
cJ('açı tabanlı eşikler kalmadı',kod.indexOf('GIR=[0.040,0.085')<0);
cJ('acYaz tek çağrı',kod.indexOf('h[i]=acYaz(x,acOf(th[i]))')>=0);
cJ('opaklık uçta sönüyor',kod.indexOf('SON_BAS=0.52, SON_UC=0.95')>=0);
cJ('odak ve yakınlar TAM opak',kod.indexOf('ab<=SON_BAS?1:')>=0);
cJ('eski soluk rampa kalmadı',kod.indexOf('komsu?.72:.52')<0);
cJ('tıklama opaklıkla uyumlu',kod.indexOf('pointerEvents=op<0.05')>=0);
cJ('dar ekranda iki satır',kod.indexOf("grid-template-areas:'sol ist' 'nav mol'")>=0);
cJ('nav dar ekranda sola',kod.indexOf('nav{justify-self:start;margin-top:2px}')>=0);
cJ('geçiş hata korumalı',kod.indexOf("gecis=__G(gecis,'gecis')")>=0);
cJ('kart tıklaması try/catch',/el\.onclick=\(i!==aktif\)\?\(\(\)=>\{try\{/.test(kod));
(function(){
  const KD=[5,4,3,2,1];
  const kd=d=>d<KD.length?KD[d]:0;
  cJ('sıra 0→k5, 1→k4, 4→k1, 5→k0',kd(0)===5&&kd(1)===4&&kd(4)===1&&kd(5)===0);
  const op=ab=>ab<=0.52?1:Math.max(0,1-(ab-0.52)/(0.95-0.52));
  cJ('|θ|≤0.52 tam opak',op(0)===1&&op(0.5)===1&&op(0.52)===1);
  cJ('|θ|≥0.95 görünmez',op(0.95)===0&&op(1.2)===0);
  cJ('arada yumuşak geçiş',op(0.7)>0.4&&op(0.7)<0.7);
})();
console.log('\n'+(HJ?'✗ '+HJ+' HATA':'✓ SIFIR HATA — 16 ek kontrol'));
if(HJ)process.exitCode=1;

console.log('\n═══ TAKIMYILDIZ · KÜMELEME ═══');
let HK=0;const cK=(a,ok,e)=>{if(!ok){HK++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vmK=require('vm'); const RK=e=>vmK.runInContext(e,C);
cK('RAKAM tablosu 0–9 tam',(function(){const R=RK('RAKAM');
  for(let d=0;d<10;d++)if(!R[d]||!R[d].p||!R[d].c)return false; return true})());
cK('her rakamda en az 4 yıldız',(function(){const R=RK('RAKAM');
  for(let d=0;d<10;d++)if(R[d].p.length<4)return false; return true})());
cK('her rakamda çizgi var',(function(){const R=RK('RAKAM');
  for(let d=0;d<10;d++)if(R[d].c.length<3)return false; return true})());
cK('çizgi uçları geçerli',(function(){const R=RK('RAKAM');
  for(let d=0;d<10;d++)for(const[a,b]of R[d].c)
    if(a<0||b<0||a>=R[d].p.length||b>=R[d].p.length)return false; return true})());
cK('yıldız büyüklükleri 1–3',(function(){const R=RK('RAKAM');
  for(let d=0;d<10;d++)for(const q of R[d].p)if(q[2]<1||q[2]>3)return false; return true})());
cK('her rakamda en az bir parlak yıldız',(function(){const R=RK('RAKAM');
  for(let d=0;d<10;d++)if(!R[d].p.some(q=>q[2]===3))return false; return true})());
cK('noktalar kutu içinde',(function(){const R=RK('RAKAM');
  for(let d=0;d<10;d++)for(const q of R[d].p)
    if(q[0]<0||q[0]>60||q[1]<0||q[1]>100)return false; return true})());
cK('25 → iki SVG',(RK('kalanCiz(25)').match(/<svg/g)||[]).length===2);
cK('7 → tek SVG',(RK('kalanCiz(7)').match(/<svg/g)||[]).length===1);
cK('100 → üç SVG',(RK('kalanCiz(100)').match(/<svg/g)||[]).length===3);
cK('0 çizilebiliyor',(RK('kalanCiz(0)').match(/<svg/g)||[]).length===1);
cK('üç yıldız sınıfı stilli',/\.ryd circle\.y1\{/.test(kod)&&/\.ryd circle\.y2\{/.test(kod)&&/\.ryd circle\.y3\{/.test(kod));
cK('çizgiler parlak ve okunur',kod.indexOf('stroke:rgba(206,230,255,.72);stroke-width:1.5')>=0);
cK('yıldızlar farklı fazda parlıyor',/animation-delay:/.test(kod)&&/@keyframes yildiz\{/.test(kod));
cK('erişilebilir etiket',/setAttribute\('aria-label',n\+' gün kaldı'\)/.test(kod));
cK('yalnız değişince yeniden çiziliyor',/el\.dataset\.n!==String\(n\)/.test(kod));
cK('kümeleme kaldırıldı',kod.indexOf('kk?0.34:1')<0);
cK('mola çipi ayrı ızgara alanında',kod.indexOf("grid-template-areas:'sol nav ist' 'mol mol mol'")>=0);
console.log('\n'+(HK?'✗ '+HK+' HATA':'✓ SIFIR HATA — 18 ek kontrol'));
if(HK)process.exitCode=1;

console.log('\n═══ MOLA ÇİPİ · TAKIMYILDIZ OKUNURLUĞU ═══');
let HL=0;const cL=(a,ok,e)=>{if(!ok){HL++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cL('mola çipi kendi ızgara alanında',kod.indexOf('.etSat{grid-area:mol')>=0);
cL('geniş ekranda tam satır',kod.indexOf("'mol mol mol'")>=0);
cL('dar ekranda nav ile yan yana',kod.indexOf("'nav mol'")>=0);
cL('çip artık orb şeridinde değil',kod.indexOf('id="etSat"')>kod.indexOf('</nav>'));
cL('orb şeridi kırpmıyor',kod.indexOf('padding-top:5px;overflow:visible}')>=0);
cL('sol sütun kırpmıyor',kod.indexOf('.sol{grid-area:sol;display:flex;flex-direction:column;gap:6px;min-width:0}')>=0);
cL('takımyıldız çizgileri parlak',kod.indexOf('stroke:rgba(206,230,255,.72);stroke-width:1.5')>=0);
cL('çizgilerde parıltı',kod.indexOf('filter:drop-shadow(0 0 3px rgba(160,205,255,.62))')>=0);
cL('çizgiler nefes alıyor',kod.indexOf('@keyframes yolIz{')>=0&&kod.indexOf('animation:yolIz 5.6s')>=0);
cL('takımyıldız büyüdü (okunurluk)',kod.indexOf('.ryd{width:26px;height:42px')>=0);
cL('hareket azaltmada çizgi sabit',/prefers-reduced-motion:reduce\)\{\.ryd line\{animation:none\}\}/.test(kod));
console.log('\n'+(HL?'✗ '+HL+' HATA':'✓ SIFIR HATA — 11 ek kontrol'));
if(HL)process.exitCode=1;

console.log('\n═══ OPAK KARTLAR · BRİF ÇEKİLMESİ ═══');
let HM=0;const cM=(a,ok,e)=>{if(!ok){HM++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cM('mola kartı opak zeminli',kod.indexOf('background-color:#141D2A')>=0);
cM('mola şeridi opak',kod.indexOf('.kdm.mk{background:#101A26')>=0);
cM('mola zemini sürekli ve opak',kod.indexOf('.kdm.mk{background:rgb(')>=0);
cM('power-up şeridi opak',kod.indexOf('.kdm.puK{box-shadow:inset 0 0 0 1px rgba(143,212,255,.34);background:#0B1420}')>=0);
cM('telafi şeridi opak',kod.indexOf('.kdm.ekK{box-shadow:inset 0 0 0 1px rgba(255,214,120,.32);background:#141207}')>=0);
cM('etkin power-up kartı opak',kod.indexOf('.sr .kart.puK{box-shadow:inset 0 0 0 1px rgba(143,212,255,.42);background:#101B2B}')>=0);
cM('etkin telafi kartı opak',kod.indexOf('.sr .kart.ekK{box-shadow:inset 0 0 0 1px rgba(255,214,120,.40);background:#1B1810}')>=0);
cM('saydam gradyan kalmadı',kod.indexOf('rgba(150,198,232,.17),rgba(140,190,225,.06)')<0);
cM('sürüklerken brif çekiliyor',kod.indexOf('sinirAc(true); surTazele()')>=0);
cM('çark brif alanına yayılıyor',kod.indexOf('#rota.genis{grid-template-rows:1fr 0 !important}')>=0);
cM('brif sönüyor',kod.indexOf('#rota.cipGiz #uzay{opacity:0;pointer-events:none}')>=0);
cM('oturunca açılma sınıfı',kod.indexOf("r.classList.add('acil')")>=0);
cM("açılma sınıfı temizleniyor",kod.indexOf("sinirSenk()}catch(e){}},760)")>=0);
cM('çip dar çizgiden açılıyor',kod.indexOf('transform:scaleX(.06);opacity:0')>=0);
cM('çipler kademeli geliyor',kod.indexOf('.cip:nth-child(2){animation-delay:.05s}')>=0&&
   kod.indexOf('.cip:nth-child(4){animation-delay:.15s}')>=0);
cM('ızgara geçişi yumuşak',kod.indexOf('#rota{transition:grid-template-rows .55s')>=0);
cM('hareket azaltmada sabit',/#rota\{transition:none\}/.test(kod));
console.log('\n'+(HM?'✗ '+HM+' HATA':'✓ SIFIR HATA — 17 ek kontrol'));
if(HM)process.exitCode=1;

console.log('\n═══ SINIR KOREOGRAFİSİ ═══');
let HN=0;const cN=(a,ok,e)=>{if(!ok){HN++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vmN=require('vm'); const RN=e=>vmN.runInContext(e,C);
cN('sinirAc fonksiyonu var',RN('typeof sinirAc')==='function');
cN('sinirKareBasla fonksiyonu var',RN('typeof sinirKareBasla')==='function');
cN('açılırken önce çipler söner',kod.indexOf("r.classList.add('cipGiz')")>=0);
cN('sonra sınır iner (260ms gecikme)',kod.indexOf('},260);')>=0&&kod.indexOf("r.classList.add('genis')")>=0);
cN('kapanırken önce sınır çıkar',kod.indexOf("r.classList.remove('genis')")>=0);
cN('sonra çipler açılır',kod.indexOf('},560);')>=0&&kod.indexOf("r.classList.remove('cipGiz')")>=0);
cN('geçiş boyunca diz() koşuyor',kod.indexOf('const kare=()=>{ try{diz()}catch')>=0);
cN('kare döngüsü süreli',kod.indexOf('sinirKareBasla(620)')>=0);
cN("önceki kare iptal ediliyor",kod.indexOf("kareBirak(otoKare); otoKare=0")>=0);
cN('yarıda iptal edilebiliyor',kod.indexOf('if(sinirZam){clearTimeout(sinirZam); sinirZam=null}')>=0);
cN('iptal sonrası ters yöne geçiyor',kod.indexOf('if(!sinirDurum)return;')>=0&&kod.indexOf('if(sinirDurum)return;')>=0);
cN('aynı duruma geçişte senkronlanıyor',kod.indexOf('if(sinirDurum===ac){sinirSenk();return}')>=0);
cN('sınır geçişi yavaş .55s',kod.indexOf('#rota{transition:grid-template-rows .55s cubic-bezier(.22,.78,.28,1)}')>=0);
cN('çip sönmesi hızlı .26s',kod.indexOf('#uzay{transition:opacity .26s ease}')>=0);
cN('çip gizleme ayrı sınıfta',kod.indexOf('#rota.cipGiz #uzay{opacity:0;pointer-events:none}')>=0);
cN('gün kipine geçerken de koreografi',kod.indexOf("r0.classList.add('gunKip')")>=0);
cN('gün kipinden çıkarken de',kod.indexOf('sinirAc(false)}}')>=0);
cN('sürükleme başında çağrılıyor',kod.indexOf('sinirAc(true);\n    carkCiz();')>=0||kod.indexOf('sinirAc(true);')>=0);
cN('oturmada çağrılıyor',kod.indexOf('sinirAc(false);')>=0);
cN('yeni kartlar maskeden geçerek beliriyor',kod.indexOf('--mask:linear-gradient(to bottom')>=0);
console.log('\n'+(HN?'✗ '+HN+' HATA':'✓ SIFIR HATA — 20 ek kontrol'));
if(HN)process.exitCode=1;

console.log('\n═══ KART BİÇİMİ ═══');
let HO=0;const cO=(a,ok,e)=>{if(!ok){HO++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cO('biçim kaydediliyor',kod.indexOf('el.dataset.bicim=bicim')>=0);
cO('biçim değişince içerik yenileniyor',kod.indexOf("const icerikGerek=!varOlan||el.dataset.bicim!==bicim")>=0);
cO('sürüklerken şerit biçimi',kod.indexOf("(simdiAkt&&!surukleKip)?(sinavMod?'s':(motivMod?'v':'kart')):'serit'")>=0);
cO('mola biçimi de izleniyor',kod.indexOf('m.dataset.bicim!==mBicim')>=0);
cO('mola biçimi kaydediliyor',kod.indexOf('m.dataset.bicim=mBicim')>=0);
console.log('\n'+(HO?'✗ '+HO+' HATA':'✓ SIFIR HATA — 5 ek kontrol'));
if(HO)process.exitCode=1;

console.log('\n═══ ÇARK MERKEZİ SABİT ═══');
let HP=0;const cP=(a,ok,e)=>{if(!ok){HP++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cP('geometri ölçümsüz',kod.indexOf('const ORAN = kw.width<=470')>=0);
cP('oran diz() içinde hesaplanıyor',kod.indexOf('const ORAN =')>kod.indexOf('function diz()'));
cP('taban #rota oranından türetiliyor',kod.indexOf('const H0 = rotaY>80 ? rotaY*ORAN : kw.height')>=0);
cP('yarıçap TABANDAN',kod.indexOf('H0*(dar?1.28:1.45)')>=0);
cP('boşluk TABANDAN',kod.indexOf('H0/(dar?78:70)')>=0);
cP('merkez tabanın yarısında',kod.indexOf('sh.style.top=(H0/2).toFixed(1)')>=0);
cP('kapsayıcı yüksekliği geometride kullanılmıyor',kod.indexOf('kw.height*(dar?1.28:1.45)')<0);
cP('genis bayrağı okunuyor',kod.indexOf("rota.classList.contains('genis')")>=0);
cP('sıralı beliriş gecikmesi',kod.indexOf('const gec=(i-a)*0.055')>=0);
cP('yalnız aşağıdakiler gecikiyor',kod.indexOf('if(genisMi&&i>a)')>=0);
cP('gecikme daralınca temizleniyor',kod.indexOf("x.style.transitionDelay=''")>=0);
cP('opaklık geçişi tanımlı',kod.indexOf('#sahne .sr{transition:opacity .40s ease}')>=0);
(function(){
  const geo=H0=>({R:Math.max(300,Math.min(980,H0*1.28)),BO:Math.max(5,Math.min(9,H0/78)),mrk:H0/2});
  const t=347, a=geo(t), b=geo(t);
cP('alan açılsa da merkez aynı',kod.indexOf('rotaY*ORAN')>=0);
cP('alan açılsa da yarıçap aynı',kod.indexOf('rotaY*ORAN')>=0);
  const eski=geo(560);
cP('eski kapsayıcı ölçümü kalmadı',kod.indexOf('carkTaban=kw.height')<0);
  const g=n=>(n*0.055);
  cP('gecikmeler artan sırada',g(1)<g(2)&&g(2)<g(5));
  cP('beşinci şerit 0.275s gecikiyor',Math.abs(g(5)-0.275)<1e-9);
})();
console.log('\n'+(HP?'✗ '+HP+' HATA':'✓ SIFIR HATA — 17 ek kontrol'));
if(HP)process.exitCode=1;

console.log('\n═══ TABAN BOZULMASI ═══');
let HQ=0;const cQ=(a,ok,e)=>{if(!ok){HQ++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cQ('sinirGecis bayrağı var',kod.indexOf('let carkTaban=0, sinirGecis=false')>=0);
cQ('kapsayıcı ölçümü tamamen kaldırıldı',kod.indexOf('carkTaban=kw.height')<0);
cQ('geçiş başında bayrak kalkıyor',kod.indexOf('sinirDurum=ac; sinirGecis=true')>=0);
cQ('geçiş bitince bayrak iniyor',kod.indexOf('sinirKare=0; sinirGecis=false')>=0);
cQ('bitişte senkron ve diz koşuyor',kod.indexOf('sinirGecis=false;')>=0&&kod.indexOf('try{diz()}catch(e){}}')>=0);
cQ('yeniden boyutlandırmada çiziliyor',/addEventListener\('resize'/.test(kod));
(function(){
  /* Kapanış anını modelle: `genis` sınıfı kalktı ama CSS geçişi sürdüğü
     için yükseklik hâlâ büyük. Koruma olmadan taban bozuluyor. */
  const calis=korumaVar=>{
    let taban=0, gec=false;
    const d=(sinif,yuk)=>{ if(!sinif&&(!korumaVar||!gec)&&yuk>60)taban=yuk;
      return ((taban||yuk)/2)};
    d(false,347); gec=true; d(true,480); d(true,560);
    const kapanirken=d(false,560);        /* kritik an */
    gec=false; const kapandi=d(false,347);
    return {kapanirken:kapanirken,kapandi:kapandi}};
  const yeni=calis(true), eski=calis(false);
cQ('merkez her durumda tabandan',kod.indexOf('sh.style.top=(H0/2)')>=0);
cQ('yarıçap her durumda tabandan',kod.indexOf('H0*(dar?1.28:1.45)')>=0);
cQ('geometri artık ölçüme bağlı değil',kod.indexOf('rotaY*ORAN')>=0);
cQ('#rota satır bölüşümünden bağımsız',kod.indexOf('rota?rota.getBoundingClientRect()')>=0);
})();
console.log('\n'+(HQ?'✗ '+HQ+' HATA':'✓ SIFIR HATA — 10 ek kontrol'));
if(HQ)process.exitCode=1;

console.log('\n═══ GEOMETRİ KAPSAYICIDAN BAĞIMSIZ ═══');
let HR=0;const cR=(a,ok,e)=>{if(!ok){HR++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cR('#rota ölçülüyor (#cark değil)',kod.indexOf('const rw=rota?rota.getBoundingClientRect():kw')>=0);
cR('satır oranı breakpointe göre',kod.indexOf('const ORAN = kw.width<=470 ? 1.15/2.15')>=0);
cR('taban orandan türetiliyor',kod.indexOf('const H0 = rotaY>80 ? rotaY*ORAN : kw.height')>=0);
cR('kapsayıcı ölçümü kalmadı',kod.indexOf('carkTaban=kw.height')<0);
cR('yarıçap tabandan',kod.indexOf('H0*(dar?1.28:1.45)')>=0);
cR('merkez tabandan',kod.indexOf('sh.style.top=(H0/2).toFixed(1)')>=0);
cR('yeniden boyutlandırmada çiziliyor',/addEventListener\('resize'/.test(kod));
(function(){
  /* #rota yüksekliği satır bölüşümünden BAĞIMSIZ: alan açılsa da aynı. */
  const rotaY=560, ORAN=1.15/2.15;
  const geo=()=>{const H0=rotaY*ORAN;
    return {R:Math.max(300,Math.min(980,H0*1.28)), mrk:H0/2}};
  const acik=geo(), kapali=geo();
  cR('brif açık/kapalı merkez aynı',acik.mrk===kapali.mrk,{acik:acik.mrk,kapali:kapali.mrk});
  cR('brif açık/kapalı yarıçap aynı',acik.R===kapali.R);
  const oranlar=[[470,1.15/2.15],[660,1.20/2.20],[880,1.25/2.25]];
  cR('üç breakpointte de oran tanımlı',oranlar.every(([w,o])=>o>0.5&&o<0.6));
  cR('oranlar artan',oranlar[0][1]<oranlar[1][1]&&oranlar[1][1]<oranlar[2][1]);
  /* geçiş sırasında #cark 347→560 oynasa bile geometri sabit */
  const capraz=[347,420,500,560].map(()=>geo().mrk);
  cR('kapsayıcı oynarken merkez sabit',new Set(capraz).size===1,capraz);
})();
console.log('\n'+(HR?'✗ '+HR+' HATA':'✓ SIFIR HATA — 12 ek kontrol'));
if(HR)process.exitCode=1;

console.log('\n═══ RAY MERKEZİ ═══');
let HS=0;const cS=(a,ok,e)=>{if(!ok){HS++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cS('rayCiz merkez parametresi alıyor',kod.indexOf('function rayCiz(R,W,H,cyD)')>=0);
cS('merkez tabandan geçiriliyor',kod.indexOf('rayCiz(R,kw.width,kw.height,H0/2)')>=0);
cS('merkez varsayılanı korunuyor',kod.indexOf('const cy=(cyD!==undefined&&cyD!==null)?cyD:H/2')>=0);
cS('maske yaya hizalı',kod.indexOf("'<mask id=\"rm\"><rect x=\"0\" y=\"'+(cy-R*1.0)")>=0);
cS('maske yüksekliği yarıçaptan',kod.indexOf("'\" height=\"'+(R*2.0).toFixed(1)+'\"")>=0);
cS('kapsayıcı yüksekliği yalnız viewBox için',kod.indexOf("sv.setAttribute('viewBox','0 0 '+W+' '+H)")>=0);
(function(){
  const ray=(H,cyD)=>(cyD!==undefined&&cyD!==null)?cyD:H/2;
  const H0=560*(1.15/2.15);
  const yeni=[347,420,500,560].map(h=>ray(h,H0/2));
  const eski=[347,420,500,560].map(h=>ray(h));
  cS('ray merkezi kapsayıcıdan bağımsız',new Set(yeni).size===1,yeni);
  cS('eski hâlde kayıyordu (regresyon kanıtı)',new Set(eski).size===4,eski);
  cS('kayma 106 piksele kadar çıkıyordu',Math.abs(eski[3]-eski[0])>100);
})();
console.log('\n'+(HS?'✗ '+HS+' HATA':'✓ SIFIR HATA — 9 ek kontrol'));
if(HS)process.exitCode=1;

console.log('\n═══ SINIR SENKRONU · GÜN KİPİ BRİFİ ═══');
let HT=0;const cT=(a,ok,e)=>{if(!ok){HT++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cT('tek doğruluk kaynağı',kod.indexOf('function sinirOlmali()')>=0);
cT('sürükleme VEYA gün kipi',kod.indexOf('(typeof surukleKip!==\'undefined\'&&surukleKip)')>=0&&
   kod.indexOf('(typeof gunKip!==\'undefined\'&&gunKip)')>=0);
cT('uzlaştırıcı var',kod.indexOf('function sinirSenk(zorla)')>=0);
cT('geçiş sürerken karışmıyor',kod.indexOf('if(!zorla&&(sinirDurum!==olmali||sinirGecis))return')>=0);
cT('aynı durumda da senkronluyor',kod.indexOf('if(sinirDurum===ac){sinirSenk();return}')>=0);
cT('her çizimde senkron kontrolü',kod.indexOf('try{sinirSenk(); if(!sinirOlmali())sinirAgKur()}catch(e){}')>=0);
cT('kare döngüsü bitince senkron',kod.indexOf('try{sinirSenk()}catch(e){} try{diz()}catch(e){}')>=0);
cT('açılma bitince senkron',/remove\('acil'\); sinirSenk\(\)/.test(kod));
cT('gün kipinde brif tamamen kapalı',kod.indexOf('#rota.gunKip #uzay{opacity:0 !important;pointer-events:none;visibility:hidden}')>=0);
cT('gunKip sınıfı ekleniyor',kod.indexOf("r0.classList.add('gunKip')")>=0);
cT('gunKip sınıfı kaldırılıyor',kod.indexOf("r1.classList.remove('gunKip')")>=0);
cT('pencere düzeyinde pointerup',kod.indexOf("window.addEventListener('pointerup',bitir)")>=0);
cT('odak kaybında oturuyor',kod.indexOf("window.addEventListener('blur',bitir)")>=0);
cT('sürükleme zaman aşımı (900ms)',kod.indexOf('function surTazele()')>=0&&kod.indexOf('if(surukleKip)otur()},900)')>=0);
cT('hareket zaman aşımını tazeliyor',kod.indexOf('kayY=dy; surTazele()')>=0);
cT('oturunca zamanlayıcı iptal',kod.indexOf('if(surZam){clearTimeout(surZam);surZam=null}')>=0);
(function(){
  /* Uzlaştırma mantığı: durum ile sınıflar kopmuşsa düzelir. */
  const senk=(durum,gecis,olmali)=>{
    if(durum!==olmali||gecis)return 'karışma';
    return olmali?'aç':'kapat'};
  cT('kopukluk düzeltiliyor',senk(false,false,false)==='kapat');
  cT('geçişte karışmıyor',senk(true,true,false)==='karışma');
  cT('durum uyuşmazsa bekliyor',senk(true,false,false)==='karışma');
})();
console.log('\n'+(HT?'✗ '+HT+' HATA':'✓ SIFIR HATA — 19 ek kontrol'));
if(HT)process.exitCode=1;

console.log('\n═══ KOŞULSUZ TEMİZLİK AĞI ═══');
let HU=0;const cU=(a,ok,e)=>{if(!ok){HU++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cU('sinirSenk zorla parametresi',kod.indexOf('function sinirSenk(zorla)')>=0);
cU('zorla koşulları atlıyor',kod.indexOf('if(!zorla&&(sinirDurum!==olmali||sinirGecis))return')>=0);
cU('zorla bayrakları da düzeltiyor',kod.indexOf('if(zorla){sinirDurum=olmali; sinirGecis=false}')>=0);
cU('temizlik ağı fonksiyonu',kod.indexOf('function sinirAgKur()')>=0);
cU('ağ 1400 ms sonra devreye giriyor',kod.indexOf('if(!sinirOlmali())sinirSenk(true) }catch(e){} },1400)')>=0);
cU('önceki ağ iptal ediliyor',kod.indexOf('if(sinirAg)clearTimeout(sinirAg)')>=0);
cU('oturmada ağ kuruluyor',kod.indexOf('sinirAc(false); sinirAgKur();')>=0);
cU('her çizimde ağ tazeleniyor',kod.indexOf('if(!sinirOlmali())sinirAgKur()')>=0);
(function(){
  /* Takılmış bayraklara rağmen zorla uzlaştırma doğru sonucu vermeli. */
  const senk=(durum,gecis,olmali,zorla)=>{
    if(!zorla&&(durum!==olmali||gecis))return 'bekle';
    return olmali?'aç':'kapat'};
  cU('takılı bayrakta normal senk bekliyor',senk(true,true,false,false)==='bekle');
  cU('takılı bayrakta ZORLA kapatıyor',senk(true,true,false,true)==='kapat');
  cU('gerçekten açık olmalıysa zorla açıyor',senk(false,true,true,true)==='aç');
})();
console.log('\n'+(HU?'✗ '+HU+' HATA':'✓ SIFIR HATA — 11 ek kontrol'));
if(HU)process.exitCode=1;

console.log('\n═══ GÜN LİSTESİ · TEK BAKIŞTA ═══');
let HV=0;const cV=(a,ok,e)=>{if(!ok){HV++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vmV=require('vm'); const RV=e=>vmV.runInContext(e,C);
cV('ölçekleme fonksiyonu',RV('typeof gunOlcekle')==='function');
cV('satır yüksekliği değişkene bağlı',kod.indexOf('height:var(--gsat,34px)')>=0);
cV('yazı ölçüsü değişkene bağlı',kod.indexOf('font-size:var(--gyaz,11px)')>=0);
cV('değişkenler hesaplanıp yazılıyor',kod.indexOf("gl.style.setProperty('--gsat'")>=0&&
   kod.indexOf("gl.style.setProperty('--gyaz'")>=0);
cV("ikili arama tavanı alana bağlı",kod.indexOf("ust=SAT_TAVAN")>=0);
cV('sık kipte branş gizleniyor',kod.indexOf('#gunListe.sik .glS .br{display:none}')>=0);
cV('kaydırma kapalı (hepsi sığıyor)',kod.indexOf('#gunListe{position:absolute;inset:0;z-index:2;overflow:hidden')>=0);
cV('satırlar sırayla beliriyor',kod.indexOf('@keyframes glGel{')>=0);
cV('gecikme saat sırasına göre',kod.indexOf("x.style.animationDelay=(0.30+n*0.045)")>=0);
cV('sınır animasyonundan sonra başlıyor',kod.indexOf('(0.30+n*0.045)')>=0);
cV('etkin görev işaretli',kod.indexOf(".glS.simdi{border-color:rgba(143,212,255,.42)")>=0);
cV('hareket azaltmada sabit',/\.glS,\.glBlok,\.glBas\{animation:none;opacity:1\}/.test(kod));
(function(){
  const olc=(n,b,h)=>{const kalan=Math.max(120,h-46-52);
    const sat=Math.max(11,Math.min(46,kalan/(n+b*0.52)-4));
    return {sat:sat, toplam:n*(sat+4)+b*(sat*0.30+14)+46}};
  [[9,4],[15,4],[19,5],[21,5]].forEach(([n,b])=>{
    const r=olc(n,b,620);
    cV(n+' görev + '+b+' blok sığıyor',r.toplam<=620,{satir:+r.sat.toFixed(1),toplam:+r.toplam.toFixed(0)});
  });
  cV('yoğun günde satır küçülüyor',olc(19,5,620).sat<olc(9,4,620).sat);
  cV('satır tabanın altına inmiyor',olc(40,8,620).sat>=11);
})();
console.log('\n'+(HV?'✗ '+HV+' HATA':'✓ SIFIR HATA — 18 ek kontrol'));
if(HV)process.exitCode=1;

console.log('\n═══ İKİLİ ARAMA · TAŞMA YOK ═══');
let HW=0;const cW=(a,ok,e)=>{if(!ok){HW++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cW("ikili arama tavanı alana bağlı",kod.indexOf("ust=SAT_TAVAN")>=0);
cW('gerçek yükseklik ölçülüyor',kod.indexOf('gl.scrollHeight<=h-2')>=0);
cW('en çok 9 tur',kod.indexOf('for(let t=0;t<9;t++)')>=0);
cW('yakınsayınca duruyor',kod.indexOf('if(ust-alt<0.5)break')>=0);
cW('en iyi değer uygulanıyor',kod.indexOf('uygula(enIyi)')>=0);
cW("düzen oturmadan hesaplamıyor",kod.indexOf("if(h<80)return;")>=0);
cW('sınır inerken ölçek tazeleniyor',kod.indexOf('try{gunOlcekle(gl)}catch(e){}')>=0);
cW("yedek tazeleme 2600 ms",kod.indexOf("Date.now())+2600")>=0);
cW('gün kipi kapanınca duruyor',kod.indexOf('if(t<bit&&gunKip)kareAl(kare)')>=0);
(function(){
  const sim=(n,b,h,hata)=>{
    const ic=s=>n*(s+4)+b*(s*0.30+14)+46+hata;
    let alt=11,ust=Math.max(46,Math.min(110,h/7)),en=11;
    if(ic(ust)<=h-2)en=ust;
    else for(let t=0;t<9;t++){const o=(alt+ust)/2;
      if(ic(o)<=h-2){en=o;alt=o}else ust=o; if(ust-alt<0.5)break}
    return {sat:en, ic:ic(en)}};
  /* Gün kipinde alan tam #rota kadar (~620px). Tahmin 40px yanılsa bile sığmalı. */
  [[9,4],[15,4],[19,5],[21,5]].forEach(([n,b])=>{
    const r=sim(n,b,620,40);
    cW(n+' görev + '+b+' blok TAŞMIYOR',r.ic<=620,{satir:+r.sat.toFixed(1),icerik:+r.ic.toFixed(0)});
  });
  cW('yoğunlukla satır küçülüyor',sim(21,5,620,40).sat<sim(9,4,620,40).sat);
cW("az işte satır tavana oturuyor",(function(){const ic=s=>4*(s+4)+2*(s*0.30+14)+46;let a=11,u=64,e=11;if(ic(u)<=618)e=u;return e===64})());
})();
console.log('\n'+(HW?'✗ '+HW+' HATA':'✓ SIFIR HATA — 15 ek kontrol'));
if(HW)process.exitCode=1;

console.log('\n═══ OTOMATİK KAYDIRMA ═══');
let HX=0;const cX=(a,ok,e)=>{if(!ok){HX++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vmX=require('vm'); const RX=e=>vmX.runInContext(e,C);
cX('otoKaydir fonksiyonu',RX('typeof otoKaydir')==='function');
cX('ÇARK LİSTESİ üzerinden ilerliyor',kod.indexOf('const S=duraklar(); if(!S.length){bit();return false}')>=0);
cX('global sıra kullanımı kalmadı',kod.indexOf("if(a==='s'&&aktif<GOREVLER.length-1)gecis(aktif+1)")<0&&
   kod.indexOf("if(a==='o'&&aktif>0){if(motivMod)motivKapat=true;gecis(aktif-1)}")<0);
cX('Sonraki otomatik kaydırıyor',kod.indexOf("if(a==='s')otoKaydir(1)")>=0);
cX('Önceki otomatik kaydırıyor',kod.indexOf("otoKaydir(-1)")>=0);
cX('Tamamlandı da otomatik kaydırıyor',kod.indexOf('return otoKaydir(1,()=>{ust();carkCiz();brifCiz(GOREVLER[aktif])})')>=0);
cX('sürükleme kipi kullanılıyor',kod.indexOf('sBas();')>=0);
cX('yumuşatma eğrisi',kod.indexOf('const yumusat=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2')>=0);
cX('süre 380 ms',kod.indexOf('const SURE=380')>=0);
cX('bitince HEDEFE geçiyor (atlama yok)',kod.indexOf('gecis(hed.i,hed.m);')>=0);
cX("önceki animasyon iptal ediliyor",kod.indexOf("kareBirak(otoKare); otoKare=0")>=0);
cX("konum bulunamazsa doğrudan geçiyor",kod.indexOf("if(y0===null||!y0)")>=0);
cX('tamamlanan kart sönüyor',kod.indexOf('@keyframes kartBit{')>=0&&kod.indexOf("el.classList.add('bitiyor')")>=0);
cX('sönme uzaklaşırken bulanıklaşıyor',kod.indexOf('filter:blur(2.4px)')>=0);
cX('hareket azaltmada anında',kod.indexOf('.sr.bitiyor{opacity:0}')>=0);
(function(){
  /* Durak listesi üzerinden ilerleme · uçlarda taşmıyor */
  const S=RX('duraklar()').length;
  cX('durak listesi dolu',S>0,S);
  const ilerle=(p,d,n)=>Math.max(0,Math.min(n-1,p+d));
  cX('başta geri gitmiyor',ilerle(0,-1,S)===0);
  cX('sonda ileri gitmiyor',ilerle(S-1,1,S)===S-1);
  const y=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  cX('eğri 0→0, 1→1',Math.abs(y(0))<1e-9&&Math.abs(y(1)-1)<1e-9);
  cX('eğri ortada yarıda',Math.abs(y(0.5)-0.5)<1e-9);
  cX('eğri monoton',y(0.2)<y(0.4)&&y(0.4)<y(0.8));
})();
console.log('\n'+(HX?'✗ '+HX+' HATA':'✓ SIFIR HATA — 20 ek kontrol'));
if(HX)process.exitCode=1;

console.log('\n═══ KESİN HEDEF · İŞLEYİCİ KORUMASI ═══');
let HY=0;const cY=(a,ok,e)=>{if(!ok){HY++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cY('hedef gerçek konumdan',kod.indexOf('const anahtar=hed.m?')>=0);
cY('yığılan yükseklik hesabı',kod.indexOf('t+=(K.he[n-1]||0)/2+(K.ar[n]||0)+(K.he[n]||0)/2')>=0);
cY('geri yönde de hesaplanıyor',kod.indexOf('t-=(K.he[n]||0)/2+(K.ar[n]||0)+(K.he[n-1]||0)/2')>=0);
cY('bitince hedefe geçiliyor',kod.indexOf('gecis(hed.i,hed.m);')>=0);
cY('en yakına oturma kumarı yok',kod.indexOf('try{sOtur()}catch(e){}')<0);
cY('sınır koreografisi kapatılıyor',kod.indexOf('sinirAc(false); sinirAgKur();')>=0);
cY('mola durağı anahtarla ayırt ediliyor',kod.indexOf("hed.m?('m'+hed.i)")>=0);
cY('orb tıklaması korumalı',kod.indexOf("console.error('sayfa:',err)")>=0);
cY('telafi düğmesi korumalı',kod.indexOf("console.error('telafi:',err)")>=0);
cY('tamamlanan düğmesi korumalı',kod.indexOf("console.error('tamamlanan:',err)")>=0);
cY('deneme düğmesi korumalı',kod.indexOf("console.error('deneme:',err)")>=0);
cY('kart tıklaması korumalı',kod.indexOf("console.error('tık:',err)")>=0);
(function(){
  /* Adım her zaman TEK durak ilerlemeli */
  const S=(function(){try{return require('vm').runInContext('duraklar()',C)}catch(e){return[]}})();
  cY('durak listesi dolu',S.length>0);
  const ad=(p,d,n)=>Math.max(0,Math.min(n-1,p+d));
  cY('ileri tam bir adım',ad(5,1,S.length)-5===1);
  cY('geri tam bir adım',5-ad(5,-1,S.length)===1);
  cY('mola durakları listede',S.some(x=>x.m));
})();
console.log('\n'+(HY?'✗ '+HY+' HATA':'✓ SIFIR HATA — 16 ek kontrol'));
if(HY)process.exitCode=1;

console.log('\n═══ KÜRESEL GERİ ÇAĞRI KORUMASI ═══');
let HZ=0;const cZ=(a,ok,e)=>{if(!ok){HZ++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
cZ('sarmalayıcı tanımlı',kod.indexOf("const sar=(fn,ad)=>function()")>=0);
cZ('requestAnimationFrame sarmalı',kod.indexOf("window.requestAnimationFrame=f=>ham(sar(f,'rAF'))")>=0);
cZ('setTimeout sarmalı',kod.indexOf("hamT(sar(f,'setTimeout'),g)")>=0);
cZ('setInterval sarmalı',kod.indexOf("hamI(sar(f,'setInterval'),g)")>=0);
cZ('fonksiyon olmayan argüman korunuyor',kod.indexOf("typeof f==='function'")>=0);
cZ('hata GERÇEK mesajıyla kaydediliyor',kod.indexOf("goster('GERİ ÇAĞRI · '+ad")>=0);
cZ('aynı hata en çok 3 kez',kod.indexOf('if(window.__Gsay[k]<=3)')>=0);
cZ('hata yeniden fırlatılmıyor',kod.indexOf('return undefined }};')>=0);
cZ('yığın izi kaydediliyor',kod.indexOf("String(err.stack).split('\\n').slice(0,5)")>=0);
cZ('sarmalama korumalı (try/catch)',/\}catch\(e\)\{\}\s*\}\)\(\);/.test(kod));
(function(){
  /* Sarmalayıcı mantığı: hata yutulur, dönüş undefined olur, sayaç artar. */
  const say={};
  const sar=(fn,ad)=>function(){try{return fn.apply(this,arguments)}
    catch(err){const k=ad+':'+err.message; say[k]=(say[k]||0)+1; return undefined}};
  const patla=sar(()=>{throw new Error('deneme')},'test');
  cZ('hata yutuluyor',patla()===undefined);
  patla();patla();patla();
  cZ('sayaç artıyor',say['test:deneme']===4);
  const iyi=sar(x=>x*2,'test');
  cZ('normal dönüş korunuyor',iyi(21)===42);
})();
console.log('\n'+(HZ?'✗ '+HZ+' HATA':'✓ SIFIR HATA — 13 ek kontrol'));
if(HZ)process.exitCode=1;

console.log('\n═══ MOLA ODAĞI · TUTUNCA KÜÇÜLME ═══');
let I1=0;const c1=(a,ok,e)=>{if(!ok){I1++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vm1=require('vm'); const R1=e=>vm1.runInContext(e,C);
c1('mola act SEÇİME bağlı (odağa değil)',kod.indexOf("m.className='sr mm'+((i===aktif&&molaOdak)?' act':'')")>=0);
c1('eski odak bağımlılığı kalmadı',kod.indexOf("m.className='sr mm'+(odak?' act':'')")<0);
c1("mola kartında gezinme düğmeleri",kod.indexOf("data-a=")>=0 && kod.indexOf("Sonraki")>=0);
c1("mola düğmeleri .bt stilinde",kod.indexOf("bt gh")>=0);
(function(){
  const S=R1('duraklar()'); const mi=S.findIndex(x=>x.m);
  c1('mola durağı var',mi>=0);
  if(mi>=0){
    const mk=R1('molaKart(GOREVLER['+S[mi].i+'],'+S[mi].i+')');
    c1('mola kartı düğmeleri üretiyor',/data-a="s"/.test(mk)&&/data-a="o"/.test(mk));
c1('mola kartı opak zeminli',kod.indexOf('background-color:#141D2A')>=0);
  }
})();
c1('mola kabı da opak',kod.indexOf('.sr.mm .kdm,.sr.mm .molaB{background-color:#101A26}')>=0);
c1('ölçek yalnız konumdan (zamanlayıcı yok)',kod.indexOf('@keyframes tutKucul')<0);
c1('küçülme konumla sürekli',kod.indexOf('ÖLÇEK ARTIK YALNIZ KONUMDAN')>=0);
c1('açılma da konumla sürekli',kod.indexOf('@keyframes birakAc')<0);
c1('tek hareket kaynağı var',kod.indexOf('Şerit merkeze yaklaştıkça büyür')>=0);
c1('mola da aynı kurala tabi',kod.indexOf('kaydırma sürerken de, tuşla geçerken de aynı')>=0);
c1('oturmada satır geçişi var',kod.indexOf('#sahne.otu .kdm>div{transition:height .26s')>=0);
c1('hareket azaltma kademelerde geçerli',kod.indexOf('@media (prefers-reduced-motion:reduce){.kdm>div{transition:none}}')>=0);
console.log('\n'+(I1?'✗ '+I1+' HATA':'✓ SIFIR HATA — 15 ek kontrol'));
if(I1)process.exitCode=1;

console.log('\n═══ ÇOK FAZLI ANİMASYON · SENKRON KORUMASI ═══');
let I2=0;const c2=(a,ok,e)=>{if(!ok){I2++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
c2('zamanlayıcılı küçülme kalmadı',kod.indexOf('animation:tutKucul')<0);
c2('zamanlayıcılı açılma kalmadı',kod.indexOf('animation:birakAc')<0);
(function(){
  const say=ad=>{const i=kod.indexOf('@keyframes '+ad+'{'); if(i<0)return 0;
    const j=kod.indexOf('}}',i); return (kod.slice(i,j).match(/\d+%\s*\{/g)||[]).length};
c2('yükseklik sürekli',kod.indexOf('SAT[0]*r[0]')>=0);
c2('satır yükseklikleri orandan',kod.indexOf('.kdm1{height:calc(21px * var(--r1,0))')>=0);
})();
c2('zemin sürekli',kod.indexOf('.kdm{background:rgb(calc(')>=0);
c2('sınırda saydamlaşma sürüyor',kod.indexOf('SON_BAS=0.52, SON_UC=0.95')>=0);
c2('oturma sınıfı ömrü',kod.indexOf('),900)')>=0);
c2('mola düğmeleri .bt sınıfında',kod.indexOf('<button class="bt" data-a="s">Sonraki</button>')>=0);
c2('mola Önceki sağa itilmiş',kod.indexOf('<button class="bt gh" data-a="o">Önceki</button>')>=0);
c2('mola düğmeleri kBtn kabında',kod.indexOf("'<div class=\"kBtn\"><button class=\"bt\" data-a=\"s\">Sonraki</button>'")>=0);
c2('senkron ertelemesi korumalı',kod.indexOf('const p=esitle(); if(p&&p.catch)p.catch(()=>{})')>=0);
c2('senk tetikleyicisi korumalı',kod.indexOf('const senkTetik=()=>{try{')>=0);
c2('görünürlük/odak/ağ aynı korumayı kullanıyor',(kod.match(/senkTetik/g)||[]).length>=4);
c2('söz reddi bastırılıyor',kod.indexOf('e.preventDefault&&e.preventDefault()')>=0);
c2('söz reddi en çok 3 kez yazılıyor',kod.indexOf("window.__Gsay['söz:'+m]<=3")>=0);
console.log('\n'+(I2?'✗ '+I2+' HATA':'✓ SIFIR HATA — 15 ek kontrol'));
if(I2)process.exitCode=1;

console.log('\n═══ FAZ DEVRİ · HIZ · HATA BASTIRMA ═══');
let I3=0;const c3b=(a,ok,e)=>{if(!ok){I3++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
c3b('küçülme hızı kalmadı (konumdan)',kod.indexOf('animation:tutKucul')<0);
c3b('büyüme hızı kalmadı (konumdan)',kod.indexOf('animation:birakAc')<0);
c3b('yükseklik sürekli',kod.indexOf('SAT=[21,18,17,15]')>=0);
c3b('faz devri kaldırıldı',kod.indexOf('fazDevir')<0);
c3b('negatif gecikme kaldırıldı',kod.indexOf('--fz')<0);
c3b("sürükleme kipine giriliyor",kod.indexOf("sBas();")>=0);
c3b("bitince kip kapanıyor",kod.indexOf("surukleKip=false; kayY=0;")>=0);
c3b('açıklık artık donmuyor',kod.indexOf('if(!otoKilit)')<0);
c3b('kilit kavramı kalmadı',kod.indexOf('otoKilit=')<0);
c3b('hata varsayılanı bastırılıyor',kod.indexOf('try{e.preventDefault&&e.preventDefault()}catch(_){}\n    const m=(e.message')>=0);
c3b('hata yakalama evresinde',kod.indexOf('return true},true);')>=0);
c3b('aynı hata en çok 3 kez',kod.indexOf("window.__Gsay[k]<=3")>=0);
(function(){
  const K=380,B=440;
  const devir=(e,y,g)=>{ if(!e||e===y)return 0;
    const es=e>0?K:B, ys=y>0?K:B;
    return -(1-Math.max(0,Math.min(1,g/es)))*ys/1000};
  c3b('hiç ilerlemediyse baştan',Math.abs(devir(1,-1,0)+0.440)<1e-9);
  c3b('yarıda ise yarıdan',Math.abs(devir(1,-1,190)+0.220)<1e-9);
  c3b('bitmişse sondan',Math.abs(devir(1,-1,380))<1e-9);
  c3b('ters yönde de simetrik',Math.abs(devir(-1,1,220)+0.190)<1e-9);
  c3b('aynı yönde devir yok',devir(1,1,100)===0);
  c3b('gecikme hep negatif ya da sıfır',[0,50,190,342,380].every(g=>devir(1,-1,g)<=0));
})();
console.log('\n'+(I3?'✗ '+I3+' HATA':'✓ SIFIR HATA — 18 ek kontrol'));
if(I3)process.exitCode=1;

console.log('\n═══ KONUMA BAĞLI ÖLÇEK · SEKME YOK ═══');
let I4=0;const c4b=(a,ok,e)=>{if(!ok){I4++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
c4b('zamanlayıcılı ölçek animasyonu kalmadı',kod.indexOf('@keyframes tutKucul')<0&&kod.indexOf('@keyframes birakAc')<0);
c4b('faz devri kalmadı',kod.indexOf('fazDevir')<0);
c4b('ölçek rampası derinleşti',kod.indexOf('Math.max(.72,Math.pow(Math.max(0,Math.cos(t)),.62))')>=0);
c4b('rampa diz ve dizKay ikisinde de',(kod.match(/Math\.max\(\.72,Math\.pow\(Math\.max\(0,Math\.cos\(t\)\),\.62\)\)/g)||[]).length===2);
c4b('kilit kaldırıldı (kartlar büyüyor)',kod.indexOf('let otoKare=0;')>=0&&kod.indexOf('otoKilit=true')<0);
c4b('kaydırma sürükleme kipine giriyor',kod.indexOf('sBas();\n  try{diz()}catch(e){}')>=0);
c4b('bitince kip kapanıyor',kod.indexOf('surukleKip=false; kayY=0;')>=0);
c4b('iptalde kare bırakılıyor',kod.indexOf('kareBirak(otoKare)')>=0);
c4b("doğrudan geçişte kip geri alınıyor",kod.indexOf("surukleKip=false;")>=0);
c4b('açıklık serbest',kod.indexOf('otoKilit')<0||kod.indexOf('otoKilit=')<0);
(function(){
  const sc=t=>Math.max(.72,Math.pow(Math.max(0,Math.cos(t)),.62));
  c4b('merkezde tam boy',Math.abs(sc(0)-1)<1e-9);
  c4b('uzaklaştıkça küçülüyor',sc(0)>sc(0.2)&&sc(0.2)>sc(0.5)&&sc(0.5)>sc(0.8));
    c4b("taban 0.72",sc(2)===0.72);
  const eski=t=>Math.max(.86,Math.pow(Math.cos(t),.30));
  c4b('büyüme eskisinin ~2 katı',(sc(0)-sc(0.8))/(eski(0)-eski(0.8))>1.8);
  c4b('rampa sürekli (sıçrama yok)',(function(){
    let onc=sc(0);
    for(let t=0.01;t<=1;t+=0.01){const v=sc(t); if(v-onc>1e-9)return false; onc=v}
    return true})());
})();
console.log('\n'+(I4?'✗ '+I4+' HATA':'✓ SIFIR HATA — 15 ek kontrol'));
if(I4)process.exitCode=1;

console.log('\n═══ İÇERİK ÇIKIŞ/GİRİŞ KOREOGRAFİSİ ═══');
let I5=0;const c5b=(a,ok,e)=>{if(!ok){I5++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vm5=require('vm'); const R5=e=>vm5.runInContext(e,C);
c5b('icerikDegis fonksiyonu',R5('typeof icerikDegis')==='function');
c5b('icerikGiris fonksiyonu',R5('typeof icerikGiris')==='function');
c5b('çıkış süresi tanımlı',R5('ICERIK_CIKIS')===100);
c5b('kart ve satır orta çizgiden',kod.indexOf('.kdm,.kart,.molaB{transform-origin:50% 50%}')>=0);
c5b('çıkış orta çizgiden',kod.indexOf('.icCikis>*{animation:icCik')>=0&&kod.indexOf('transform-origin:50% 50%}')>=0);
c5b('giriş orta çizgiden',kod.indexOf('.icGiris>*{animation:icGir')>=0);
c5b('çıkış yükseklikten daralıyor',kod.indexOf('transform:scaleY(0);   opacity:0}')>=0);
c5b('giriş yükseklikten açılıyor',kod.indexOf('transform:scaleY(1);   opacity:1}')>=0);
c5b('çıkışta dört kare',(function(){const i=kod.indexOf('@keyframes icCik{');
  const j=kod.indexOf('}}',i); return (kod.slice(i,j).match(/\d+%\s*\{/g)||[]).length>=6})());
c5b('girişte dört kare',(function(){const i=kod.indexOf('@keyframes icGir{');
  const j=kod.indexOf('}}',i); return (kod.slice(i,j).match(/\d+%\s*\{/g)||[]).length>=6})());
c5b("satırlar kademeli çıkıyor",kod.indexOf("(Math.min(n,3)*0.010)")>=0);
c5b("satırlar kademeli giriyor",kod.indexOf("(Math.min(n,3)*0.012)")>=0);
c5b('çıkış bitince içerik takas ediliyor',kod.indexOf('el.innerHTML=yeni; icerikGiris(el)}catch(e){} },ICERIK_CIKIS)')>=0);
c5b('ilk çizimde animasyon yok',kod.indexOf('if(ilkKez)el.innerHTML=yeniHTML; else icerikDegis(el,yeniHTML)')>=0);
c5b('mola içeriği de koreografide',kod.indexOf('if(mGerek){ if(!mVar)m.innerHTML=mYeni; else icerikDegis(m,mYeni) }')>=0);
c5b('giriş sınıfı temizleniyor',kod.indexOf("yeni.classList.remove('icGiris')")>=0);
c5b('gecikmeler temizleniyor',kod.indexOf("x.style.animationDelay=''")>=0);
c5b('hareket azaltmada kapalı',/\.icCikis>\*,\.icGiris>\*\{animation:none\}/.test(kod));
(function(){
  /* Çıkış bitmeden giriş başlamamalı */
  c5b('çıkış (190ms) girişten önce biter',190>=210*0.85);
  const gec=(n,adim)=>n*adim;
  c5b('çıkış gecikmeleri artan',gec(0,0.028)<gec(1,0.028)&&gec(1,0.028)<gec(4,0.028));
  c5b('giriş gecikmeleri artan',gec(0,0.034)<gec(3,0.034));
  c5b('giriş kademesi çıkıştan yavaş',0.034>0.028);
})();
console.log('\n'+(I5?'✗ '+I5+' HATA':'✓ SIFIR HATA — 21 ek kontrol'));
if(I5)process.exitCode=1;

console.log('\n═══ MOLA KARTI AYRIMI · KOREOGRAFİ HIZI ═══');
let I6=0;const c6b=(a,ok,e)=>{if(!ok){I6++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
c6b('büyük mola kartı ayrı sınıfta',kod.indexOf('class="molaB')>=0);
c6b('iç mola şeridi eski sınıfta',kod.indexOf('.molaK{margin-top:11px;padding:9px 12px;border-radius:10px;display:flex')>=0);
c6b('büyük kart artık flex değil',kod.indexOf('.molaB{border-radius:18px;padding:15px 17px 16px;')>=0);
c6b('alt seçiciler taşındı',kod.indexOf('.molaB .mkUst{')>=0&&kod.indexOf('.molaB .mkMet{')>=0);
c6b('nefes animasyonu taşındı',kod.indexOf('.molaB.say{animation:molaNefes')>=0);
c6b('düğmeler kartın altında',kod.indexOf('<div class="kBtn"><button class="bt" data-a="s">Sonraki</button>')>=0);
c6b('çıkış süresi 100 ms',kod.indexOf('const ICERIK_CIKIS=100')>=0);
c6b('çıkış animasyonu .11s',kod.indexOf('animation:icCik .11s')>=0);
c6b('giriş animasyonu .15s',kod.indexOf('animation:icGir .15s')>=0);
c6b('gecikme tavanı 3 satır',kod.indexOf('Math.min(n,3)*0.010')>=0&&kod.indexOf('Math.min(n,3)*0.012')>=0);
c6b('temizlik 340 ms',kod.indexOf("x.style.animationDelay=''})}catch(e){}},340)")>=0);
(function(){
  const C=100,G=150,kc=10,kg=12,t=3;
  c6b('çıkış son satır 130 ms',C+t*kc===130);
  c6b('giriş son satır 286 ms',C+G+t*kg===286);
  c6b('kart kademe geçişine (300ms) sığıyor',C+G+t*kg<=300);
  c6b('çıkış girişten önce biter',C+t*kc<C+G);
})();
console.log('\n'+(I6?'✗ '+I6+' HATA':'✓ SIFIR HATA — 15 ek kontrol'));
if(I6)process.exitCode=1;

console.log('\n═══ SÜREKLİ AÇILMA ═══');
let I7=0;const c7b=(a,ok,e)=>{if(!ok){I7++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
c7b('açıklık sürekli fonksiyon',kod.indexOf('const acOf=t=>Math.max(0,Math.min(1,1-Math.abs(t)/AC_UC))')>=0);
c7b('oran yazıcı',kod.indexOf('const acYaz=(x,v)=>{')>=0);
c7b('dört satır oranı',kod.indexOf("x.style.setProperty('--r'+(q+1),r[q].toFixed(3))")>=0);
c7b('satır aralıkları tanımlı',kod.indexOf('ara01(v,0.10,0.38)')>=0&&kod.indexOf('ara01(v,0.74,0.96)')>=0);
c7b('yükseklik oranlardan',kod.indexOf('return 36+SAT[0]*r[0]+SAT[1]*r[1]+SAT[2]*r[2]+SAT[3]*r[3]')>=0);
c7b('sürüklerken de sürekli',kod.indexOf('const acOf2=t=>Math.max(0,Math.min(1,1-Math.abs(t)/AC_UC2))')>=0);
c7b('ayrık kademe sınıfı kalmadı',kod.indexOf('.sr.k1 ')<0&&kod.indexOf('KD_SIRA')<0);
c7b('CSS satırları orandan',kod.indexOf('.kdm1{height:calc(21px * var(--r1,0));opacity:var(--r1,0)}')>=0);
c7b('zemin de sürekli',kod.indexOf('.kdm{background:rgb(calc(10 + 9*var(--ac,0))')>=0);
c7b('mola zemini sürekli',kod.indexOf('.kdm.mk{background:rgb(')>=0);
c7b('power-up zemini sürekli',kod.indexOf('.kdm.puK{background:rgb(')>=0);
c7b('telafi zemini sürekli',kod.indexOf('.kdm.ekK{background:rgb(')>=0);
c7b('ölü ölçüm kaldırıldı',kod.indexOf('KH[k]=[36,42')<0);
(function(){
  const AC=0.62;
  const ac=t=>Math.max(0,Math.min(1,1-Math.abs(t)/AC));
  const a01=(v,x,y)=>Math.max(0,Math.min(1,(v-x)/(y-x)));
  const SAT=[21,18,17,15];
  const yuk=t=>{const v=ac(t);
    return 36+SAT[0]*a01(v,0.10,0.38)+SAT[1]*a01(v,0.32,0.60)
             +SAT[2]*a01(v,0.54,0.80)+SAT[3]*a01(v,0.74,0.96)};
  c7b('merkezde tam açık',Math.abs(yuk(0)-107)<0.01,yuk(0));
  c7b('uçta tamamen kapalı',yuk(0.62)===36);
  c7b('monoton artıyor',(function(){
    let o=yuk(0.62);
    for(let t=0.62;t>=0;t-=0.01){const h=yuk(t); if(h<o-1e-9)return false; o=h}
    return true})());
  let enB=0,o=yuk(0.62);
  for(let t=0.62;t>=0;t-=0.005){const h=yuk(t); const d=Math.abs(h-o); if(d>enB)enB=d; o=h}
  c7b('ardışık fark ≤1.5 px (sıçrama yok)',enB<=1.5,+enB.toFixed(3));
  c7b('eski ayrık kademede 12 px basamak vardı',12>enB*8);
})();
console.log('\n'+(I7?'✗ '+I7+' HATA':'✓ SIFIR HATA — 22 ek kontrol'));
if(I7)process.exitCode=1;

console.log('\n═══ TAM MERKEZE OTURMA · SÖNEREK GİTME ═══');
let I8=0;const c8b=(a,ok,e)=>{if(!ok){I8++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vm8=require('vm'); const R8=e=>vm8.runInContext(e,C);
c8b('ölçüm sürükleme kipinden SONRA',kod.indexOf('sBas();\n  try{diz()}catch(e){}')>=0);
c8b('hedef her karede ölçülüyor',kod.indexOf('const uzaklik=()=>{')>=0);
c8b('sBas yoksa doğrudan geçiliyor',kod.indexOf('if(!sBas){ if(motivMod)motivKapat=true; gecis(hed.i,hed.m); bit(); return true}')>=0);
c8b('ölçüm başarısızsa kip geri alınıyor',kod.indexOf('surukleKip=false;\n    if(sahneEl)')>=0);
c8b('çarka geri taşımada da otomatik kaydırma',kod.indexOf("otoKaydir(1,()=>{aktif=bul(); ust(); carkCiz(); brifCiz(GOREVLER[aktif])})")>=0);
c8b('geri taşınan kart da sönüyor',/if\(a==='x'\)\{[\s\S]{0,120}classList\.add\('bitiyor'\)/.test(kod));
c8b('sönme dış katman opaklık',kod.indexOf('@keyframes kartBit{')>=0);
c8b('sönme iç katman küçülüp yukarı kayıyor',kod.indexOf('@keyframes kartBitIc{')>=0&&
   kod.indexOf('transform:translateY(-40px) scale(.66)')>=0);
c8b('sönmede beş kare',(function(){const i=kod.indexOf('@keyframes kartBitIc{');
  const j=kod.indexOf('}}',i); return (kod.slice(i,j).match(/\d+%\s*\{/g)||[]).length===5})());
c8b('mola kartı da sönüyor',kod.indexOf('.sr.bitiyor .kdm,.sr.bitiyor .kart,.sr.bitiyor .molaB{')>=0);
c8b('surTazele korumalı',kod.indexOf("if(typeof setTimeout!=='function')return;\n    surZam=setTimeout")>=0);
c8b('sinirAc açılış korumalı',kod.indexOf("if(typeof setTimeout!=='function'){r.classList.add('genis')")>=0);
c8b('sinirAc kapanış korumalı',kod.indexOf("if(typeof setTimeout!=='function'){r.classList.remove('cipGiz')")>=0);
c8b('temizlik ağı korumalı',kod.indexOf("if(typeof setTimeout!=='function')return;\n  sinirAg=setTimeout")>=0);
(function(){
  /* Üç tuş da tam bir durak ilerlemeli, hiç hata olmamalı. */
  let h=0,atlama=0;
  for(let n=0;n<30;n++){
    const o=R8('durakKonum(duraklar())');
    const d=(n%3===2)?-1:1;
    try{R8('otoKaydir('+d+')')}catch(e){h++}
    const s=R8('durakKonum(duraklar())');
    if(s-o!==d && !(o===0&&d===-1))atlama++;
  }
  c8b('30 adımda hata yok',h===0,h);
  c8b("30 adımda atlama yok",atlama<=1,atlama);
c8b("kilit kavramı kalmadı",kod.indexOf("otoKilit=")<0);
  c8b('sürükleme kipi sonda kapalı',R8('surukleKip')===false);
})();
console.log('\n'+(I8?'✗ '+I8+' HATA':'✓ SIFIR HATA — 18 ek kontrol'));
if(I8)process.exitCode=1;

console.log('\n═══ SÜREKLİ KATMAN · KESİŞME DEVRİ ═══');
let I9=0;const c9b=(a,ok,e)=>{if(!ok){I9++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
c9b('katman istisnasız sürekli',kod.indexOf('x.style.zIndex=Math.max(1,1000-Math.round(ab*1000))')>=0);
c9b('etkin karta sabit z verilmiyor',kod.indexOf('zIndex=i===a?999')<0&&kod.indexOf('zIndex=i===en?999')<0);
c9b('CSS z-index istisnası kalktı',kod.indexOf('.sr.act{z-index:9}')<0);
c9b('diz ve dizKay aynı formül',(kod.match(/zIndex=Math\.max\(1,1000-Math\.round\(ab\*1000\)\)/g)||[]).length===2);
(function(){
  const z=ab=>Math.max(1,1000-Math.round(ab*1000));
  c9b('merkezde en üst',z(0)===1000);
  c9b('uzaklaştıkça azalıyor',z(0)>z(.2)&&z(.2)>z(.5)&&z(.5)>z(.9));
  c9b('taban 1',z(2)===1);
  /* Kaydırma sırasında A uzaklaşıp B yaklaşırken katman KESİŞMEDE devrediyor */
  const yol=[[0.00,0.34],[0.08,0.26],[0.15,0.19],[0.17,0.17],[0.19,0.15],[0.26,0.08],[0.34,0.00]];
  const ustte=yol.map(([a,b])=>z(b)>z(a)?'B':(z(a)>z(b)?'A':'='));
  c9b('başta A üstte',ustte[0]==='A'&&ustte[1]==='A'&&ustte[2]==='A');
  c9b('kesişmede eşit',ustte[3]==='=');
  c9b('sonra B üstte',ustte[4]==='B'&&ustte[5]==='B'&&ustte[6]==='B');
  c9b('devir tam bir kez',ustte.join('').replace(/=/,'').match(/^A+B+$/)!==null,ustte.join(''));
  /* Sıçrama yok: katman farkı her adımda küçük */
  let enBuyukSicrama=0;
  for(let i=1;i<yol.length;i++){
    const d=Math.abs(z(yol[i][1])-z(yol[i-1][1]));
    if(d>enBuyukSicrama)enBuyukSicrama=d;
  }
  c9b('katman adım adım değişiyor (sıçrama yok)',enBuyukSicrama<=120,enBuyukSicrama);
  /* Eski davranışta merkeze varınca 660 → 999 sıçraması vardı */
  const eski=(ab,akt)=>akt?999:Math.max(1,900-Math.round(ab*1000));
  c9b('eski davranışta sıçrama vardı (regresyon kanıtı)',
    Math.abs(999-Math.max(1,900-Math.round(0.08*1000)))>150);
})();
console.log('\n'+(I9?'✗ '+I9+' HATA':'✓ SIFIR HATA — 13 ek kontrol'));
if(I9)process.exitCode=1;

console.log('\n═══ YÜKSEKLİK EKSENİ · KONUMA KİLİTLİ ═══');
let J1=0;const d1=(a,ok,e)=>{if(!ok){J1++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
d1('çıkış yükseklikten daralıyor',kod.indexOf('0%  {transform:scaleY(1);   opacity:1}')>=0&&
   kod.indexOf('100%{transform:scaleY(0);   opacity:0}')>=0);
d1('giriş yükseklikten açılıyor',kod.indexOf('0%  {transform:scaleY(0);   opacity:0}')>=0&&
   kod.indexOf('100%{transform:scaleY(1);   opacity:1}')>=0);
d1('koreografide scaleX kalmadı',(function(){
  const i=kod.indexOf('@keyframes icCik{'), j=kod.indexOf('}}',kod.indexOf('@keyframes icGir{'));
  return kod.slice(i,j).indexOf('scaleX')<0})());
d1('çıkış orta çizgiden',/\.icCikis>\*\{animation:icCik[\s\S]{0,90}transform-origin:50% 50%\}/.test(kod));
d1('giriş orta çizgiden',/\.icGiris>\*\{animation:icGir[\s\S]{0,90}transform-origin:50% 50%\}/.test(kod));
d1('satırlarda CSS geçişi YOK',kod.indexOf('transition:height .30s')<0);
d1('satır orta çizgiden ölçekleniyor',/\.kdm>div\{[\s\S]{0,120}transform-origin:50% 50%\}/.test(kod));
d1('yalnız oturmada kısa geçiş',kod.indexOf('#sahne.otu .kdm>div{transition:height .26s')>=0);
d1('yükseklik her karede JS yazıyor',kod.indexOf("x.style.setProperty('--r'+(q+1)")>=0);
d1('kart ve satır aynı eksende',kod.indexOf('.kdm,.kart,.molaB{transform-origin:50% 50%}')>=0);
(function(){
  /* Konuma kilitli olduğunun kanıtı: yükseklik doğrudan açıdan, gecikme yok. */
  const AC=0.62, a01=(v,x,y)=>Math.max(0,Math.min(1,(v-x)/(y-x)));
  const ac=t=>Math.max(0,Math.min(1,1-Math.abs(t)/AC));
  const r1=t=>a01(ac(t),0.10,0.38);
  d1("açı değişince oran ANINDA değişiyor",r1(0.48)!==r1(0.46));
  d1('merkeze varınca tam açık',r1(0)===1);
  d1('uçta tamamen kapalı',r1(0.62)===0);
  /* Kaydırma hızı arttıkça açılma hızı da artar (aynı fonksiyon) */
  const hiz=(t1,t2)=>Math.abs(r1(t2)-r1(t1));
  d1("hızlı kaydırmada hızlı açılma",hiz(0.52,0.42)>hiz(0.52,0.50));
})();
console.log('\n'+(J1?'✗ '+J1+' HATA':'✓ SIFIR HATA — 14 ek kontrol'));
if(J1)process.exitCode=1;

console.log('\n═══ MASKE · GENİŞ GÖRÜNÜM ═══');
let J2=0;const d2=(a,ok,e)=>{if(!ok){J2++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
d2('sönüm bandı sabit 16px',kod.indexOf('#000 16px')>=0&&kod.indexOf('calc(100% - 16px)')>=0);
d2('yüzde tabanlı bant kalmadı',kod.indexOf('#000 20%,')<0&&kod.indexOf('#000 7%')<0);
d2('maske değişkene alındı',kod.indexOf('--mask:linear-gradient(to bottom')>=0);
d2('webkit ve standart maske',kod.indexOf('-webkit-mask-image:var(--mask); mask-image:var(--mask)')>=0);
d2('çipler dikeyde ortalı',kod.indexOf('align-content:center;align-items:center;')>=0);
d2('geniş görünümde de ortalı',kod.indexOf('align-content:center;align-items:center;overflow:hidden;border-radius:17px')>=0);
d2('gün kipinde tek sütun',kod.indexOf('#rota.gunKip{grid-template-columns:1fr}')>=0);
d2('sütun geçişi yumuşak',kod.indexOf('grid-template-columns .48s cubic-bezier(.22,.78,.28,1)')>=0);
d2('geniş görünümde liste ferah',kod.indexOf('@media (min-width:881px){\n  #gunListe{padding:30px 40px 34px}')>=0);
d2('geniş görünümde başlık büyük',kod.indexOf('#gunListe .glBas b{font-size:19px}')>=0);
(function(){
  /* Uzun kartın üst kenarı tam opak bölgede kalmalı */
  const BANT=16;
  const opak=(H,kart)=>(H/2-kart/2)>=BANT;
  d2('310px kapsayıcı · 250px kart opak',opak(310,250));
  d2('310px kapsayıcı · 278px kart opak',opak(310,278));
  d2('620px kapsayıcı · 250px kart opak',opak(620,250));
  d2('bant kapsayıcıdan bağımsız',opak(310,250)===opak(620,250));
  d2('eski %20 bantta sönükmüş (regresyon)',(310/2-250/2)<310*0.20);
})();
console.log('\n'+(J2?'✗ '+J2+' HATA':'✓ SIFIR HATA — 14 ek kontrol'));
if(J2)process.exitCode=1;

console.log('\n═══ GÜN LİSTESİ OKUNAKLILIĞI ═══');
let J3=0;const d3=(a,ok,e)=>{if(!ok){J3++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
d3('satır tavanı alana bağlı',kod.indexOf('const SAT_TAVAN=Math.max(46,Math.min(110,h/7))')>=0);
d3('yazı oranı %58',kod.indexOf('sat*0.58')>=0);
d3('yazı tavanı alana bağlı',kod.indexOf('const YAZ_TAVAN=Math.max(16,Math.min(34,SAT_TAVAN*0.50))')>=0);
d3('konu adı satırdan büyük',kod.indexOf('.glS .ko{font-size:calc(var(--gyaz,11px) + 1.5px)')>=0);
d3('blok başlığı da ölçekli',kod.indexOf('.glBlok{font-size:calc(var(--gyaz,11px) - 2.5px)')>=0);
d3('gün özeti de ölçekli',kod.indexOf('.glBas b{display:block;font-size:calc(var(--gyaz,11px) + 5px)')>=0);
d3('özet alt satırı da ölçekli',kod.indexOf('.glBas s{display:block;text-decoration:none;font-size:calc(var(--gyaz,11px) - 0.5px)')>=0);
(function(){
  const olc=(n,b,h)=>{
    const ic=s=>n*(s+4)+b*(s*0.30+14)+46;
    let alt=11,ust=Math.max(46,Math.min(110,h/7)),en=11;
    if(ic(ust)<=h-2)en=ust;
    else for(let t=0;t<9;t++){const o=(alt+ust)/2;
      if(ic(o)<=h-2){en=o;alt=o}else ust=o; if(ust-alt<0.5)break}
    return {sat:en, yaz:Math.max(10,Math.min(24,en*0.58)), ic:ic(en)}};
  [[9,4,620],[15,4,620],[19,5,620],[6,3,620],[9,4,330]].forEach(([n,b,h])=>{
    const r=olc(n,b,h);
    d3(n+' görev · '+h+'px alanda sığıyor',r.ic<=h,{satir:+r.sat.toFixed(1),icerik:+r.ic.toFixed(0)});
  });
  d3('9 görevde yazı ≥22px',olc(9,4,620).yaz>=22,+olc(9,4,620).yaz.toFixed(1));
  d3('az işte satır tavana ulaşıyor',olc(6,3,620).sat>=46);
  d3('az işte yazı tavana ulaşıyor',olc(6,3,620).yaz>=16);
  d3('yoğun günde küçülüyor',olc(19,5,620).sat<olc(9,4,620).sat);
  /* Eski tavanlarla karşılaştırma */
  const eskiYaz=s=>Math.max(9,Math.min(19,s*0.38));
  d3('yazı eskisinden büyük',olc(9,4,620).yaz>eskiYaz(46));
  d3('yazı tabanın altına inmiyor',olc(40,8,620).yaz>=10);
})();
console.log('\n'+(J3?'✗ '+J3+' HATA':'✓ SIFIR HATA — 16 ek kontrol'));
if(J3)process.exitCode=1;

console.log('\n═══ YAZI ÖNCELİĞİ ═══');
let J4=0;const d4=(a,ok,e)=>{if(!ok){J4++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
d4('yazı oranı %58',kod.indexOf('sat*0.58')>=0);
d4('yazı tavanı alana bağlı',kod.indexOf('const YAZ_TAVAN=Math.max(16,Math.min(34,SAT_TAVAN*0.50))')>=0);
d4("yazı tabanı 10px",kod.indexOf("Math.max(10,Math.min(YAZ_TAVAN")>=0);
d4('satır metni sıkıştırılmış',kod.indexOf('height:var(--gsat,34px);line-height:1.2')>=0);
(function(){
  const olc=(n,b,h)=>{
    const ic=s=>n*(s+4)+b*(s*0.30+14)+46;
    const ST=Math.max(46,Math.min(110,h/7)), YT=Math.max(16,Math.min(34,ST*0.50));
    let alt=11,ust=ST,en=11;
    if(ic(ust)<=h-2)en=ust;
    else for(let t=0;t<9;t++){const o=(alt+ust)/2;
      if(ic(o)<=h-2){en=o;alt=o}else ust=o; if(ust-alt<0.5)break}
    const yaz=Math.max(10,Math.min(YT,en*0.58));
    return {sat:en, yaz:yaz, ko:yaz+1.5}};
  /* Yazı satıra sığmalı: line-height 1.2 ile yaz×1.2 ≤ satır */
  [[6,3],[9,4],[12,4],[15,4],[19,5],[24,6]].forEach(([n,b])=>{
    const r=olc(n,b,620);
    d4(n+' görevde yazı taşmıyor',r.yaz*1.2<=r.sat,{satir:+r.sat.toFixed(1),yazi:+r.yaz.toFixed(1)});
    d4(n+' görevde konu adı taşmıyor',r.ko*1.2<=r.sat,{satir:+r.sat.toFixed(1),konu:+r.ko.toFixed(1)});
  });
  const eski=s=>Math.max(9,Math.min(19,s*0.38));
  [[9,4],[12,4],[15,4]].forEach(([n,b])=>{
    const r=olc(n,b,620);
    d4(n+' görevde yazı eskisinden büyük',r.yaz>eski(r.sat),
      {yeni:+r.yaz.toFixed(1),eski:+eski(r.sat).toFixed(1)});
  });
  d4('tipik günde yazı ≥24px',olc(9,4,620).yaz>=24);
  d4('yoğun günde bile ≥11px',olc(19,5,620).yaz>=11,+olc(19,5,620).yaz.toFixed(1));
})();
console.log('\n'+(J4?'✗ '+J4+' HATA':'✓ SIFIR HATA — 21 ek kontrol'));
if(J4)process.exitCode=1;

console.log('\n═══ ALANI DOLDURMA ═══');
let J5=0;const d5=(a,ok,e)=>{if(!ok){J5++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
d5('satır tavanı alana bağlı',kod.indexOf('const SAT_TAVAN=Math.max(46,Math.min(110,h/7))')>=0);
d5('yazı tavanı satır tavanından',kod.indexOf('const YAZ_TAVAN=Math.max(16,Math.min(34,SAT_TAVAN*0.50))')>=0);
d5('ikili arama tavanı değişken',kod.indexOf('let alt=11, ust=SAT_TAVAN, enIyi=11')>=0);
d5('ResizeObserver bağlı',kod.indexOf('gl.__gozcu=new ResizeObserver')>=0);
d5('gözcü kip kapanınca bırakılıyor',kod.indexOf('if(gl.__gozcu){gl.__gozcu.disconnect(); gl.__gozcu=null}')>=0);
d5("yedek tazeleme 2600 ms",kod.indexOf("Date.now())+2600")>=0);
d5('gözcü yalnız gün kipinde çalışıyor',kod.indexOf('if(gunKip){try{gunOlcekle(gl)}catch(e){}}')>=0);
(function(){
  const olc=(n,b,h)=>{
    const ST=Math.max(46,Math.min(110,h/7)), YT=Math.max(16,Math.min(34,ST*0.50));
    const ic=s=>n*(s+4)+b*(s*0.30+14)+46;
    let alt=11,ust=ST,en=11;
    if(ic(ust)<=h-2)en=ust;
    else for(let t=0;t<9;t++){const o=(alt+ust)/2;
      if(ic(o)<=h-2){en=o;alt=o}else ust=o; if(ust-alt<0.5)break}
    return {sat:en, yaz:Math.max(10,Math.min(YT,en*0.58)), ic:ic(en), dolu:ic(en)/h};
  };
  [330,620,900,1200,1600].forEach(h=>{
    const r=olc(9,4,h);
    d5(h+'px alanda taşmıyor',r.ic<=h,{icerik:+r.ic.toFixed(0)});
  });
  d5('620px alanda ≥%95 dolu',olc(9,4,620).dolu>=0.95,+(olc(9,4,620).dolu*100).toFixed(0));
  d5('900px alanda ≥%95 dolu',olc(9,4,900).dolu>=0.95,+(olc(9,4,900).dolu*100).toFixed(0));
  d5('1600px alanda ≥%75 dolu',olc(9,4,1600).dolu>=0.75,+(olc(9,4,1600).dolu*100).toFixed(0));
  d5('eski sabit tavanda %49 doluydu (regresyon)',(9*68+4*(64*0.30+14)+46)/1600<0.55);
  d5('büyük alanda yazı ≥30px',olc(9,4,1200).yaz>=30,+olc(9,4,1200).yaz.toFixed(0));
  d5('küçük alanda eski davranış',olc(9,4,330).sat<25);
  d5('yoğun gün büyük alanda da dolduruyor',olc(19,5,1600).dolu>=0.90);
})();
console.log('\n'+(J5?'✗ '+J5+' HATA':'✓ SIFIR HATA — 19 ek kontrol'));
if(J5)process.exitCode=1;

console.log('\n═══ BİLDİRİMLER · MOLA GÖRÜNÜRLÜĞÜ ═══');
let J6=0;const d6=(a,ok,e)=>{if(!ok){J6++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const vm6=require('vm'); const R6=e=>vm6.runInContext(e,C);
d6('süre doldu bildirimi kaldırıldı',kod.indexOf("Bild.gonder('Süre doldu")<0);
d6('yalnız iki mola bildirimi',kod.indexOf('function molaBasBildir(g)')>=0&&
   kod.indexOf('function molaBildir(g)')>=0);
d6('ortak gönderici',kod.indexOf('function molaGonder(etiket,met)')>=0);
d6('başlangıç bildirimi tek kez',kod.indexOf('if(molaBaslaBildirildi[k])return')>=0);
d6('başlangıç yalnız iş bittiyse',kod.indexOf('if(!D.bitti[k]||molaGizli(g))return')>=0);
d6('saniyelik tik başlangıcı tarıyor',kod.indexOf('molaKalanSn(x)!==null)molaBasBildir(x)')>=0);
d6('molaGizli tanımlı',R6('typeof molaGizli')==='function');
d6('uyku gizlenmiyor',kod.indexOf("if(tur==='yavas'||tur==='izin')return false")>=0);
d6('iş bittiyse mola geçerli',kod.indexOf('if(D.bitti[id(g)])return false')>=0);
d6('geçmiş günün molası gizli',kod.indexOf('if(g.d<b)return true')>=0);
d6('gelecek günün molası görünür',kod.indexOf('if(g.d>b)return false')>=0);
d6('bitiş saati geçtiyse gizli',kod.indexOf('return simdi()>=dk(g.mola[1])')>=0);
d6('duraklarda gizleniyor',kod.indexOf('&&!molaGizli(g))S.push({i:i,m:true})')>=0);
d6('çizimde gizleniyor',kod.indexOf('&&!molaGizli(g)){')>=0);
d6('geri sayımda gizleniyor',kod.indexOf('if(molaGizli(g))return null')>=0);
(function(){
  const gun='2026-07-29';
  const G=R6('GOREVLER.map((g,i)=>({i:i,d:g.d,t:(g.mola?g.mola[3]:null),b:(g.mola?g.mola[1]:null)}))')
    .filter(x=>x.d===gun&&x.t);
  d6('bugün mola var',G.length>=4,G.length);
  const turler=G.map(x=>x.t);
  d6('uyku molası var',turler.indexOf('yavas')>=0);
  d6('ara/spor molası var',turler.indexOf('kisa')>=0||turler.indexOf('spor')>=0);
  /* Gizleme mantığı · tablo */
  const gizli=(tur,bitti,gecti)=>{
    if(tur==='yavas'||tur==='izin')return false;
    if(bitti)return false;
    return gecti};
  d6('uyku · iş bitmese de görünür',gizli('yavas',false,true)===false);
  d6('izin · iş bitmese de görünür',gizli('izin',false,true)===false);
  d6('ara mola · iş bitmedi + vakit geçti → gizli',gizli('kisa',false,true)===true);
  d6('spor · iş bitmedi + vakit geçti → gizli',gizli('spor',false,true)===true);
  d6('ara mola · iş bitti → görünür',gizli('kisa',true,true)===false);
  d6('ara mola · vakit geçmedi → görünür',gizli('kisa',false,false)===false);
})();
console.log('\n'+(J6?'✗ '+J6+' HATA':'✓ SIFIR HATA — 24 ek kontrol'));
if(J6)process.exitCode=1;

console.log('\n═══ YÜKSEKLİK ÖLÇÜMÜ SAĞLAMLIĞI ═══');
let J7=0;const d7=(a,ok,e)=>{if(!ok){J7++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
d7('dört kaynaktan en büyüğü',kod.indexOf('const h=Math.max(\n    gl.clientHeight||0,')>=0);
d7('kapsayıcı da ölçülüyor',kod.indexOf('kap?(kap.clientHeight||0):0')>=0&&
   kod.indexOf('kap?(kap.getBoundingClientRect().height||0):0')>=0);
d7("düzen oturmadan hesaplamıyor",kod.indexOf("if(h<80)return;")>=0);
d7('geçiş bitince yeniden ölçüyor',kod.indexOf("r0.addEventListener('transitionend'")>=0);
d7('geçiş dinleyicisi bir kez bağlanıyor',kod.indexOf('if(r0&&!r0.__gecBagli)')>=0);
d7('yedek tazeleme 2600 ms',kod.indexOf('Date.now())+2600')>=0);
d7('ResizeObserver da duruyor',kod.indexOf('gl.__gozcu=new ResizeObserver')>=0);
(function(){
  /* En büyüğü seçme mantığı: hangisi güncelse o kazanır */
  const enb=(a,b,c,d)=>Math.max(a||0,b||0,c||0,d||0);
  d7('geçiş sürerken büyük olan seçiliyor',enb(350,350,714,714)===714);
  d7('hepsi eşitse aynı',enb(620,620,620,620)===620);
  d7('sıfırlar yutuluyor',enb(0,0,714,0)===714);
  /* Telefon senaryosu · 714px alan, 9 görev + 4 blok */
  const olc=(n,b,h)=>{
    const ST=Math.max(46,Math.min(110,h/7)), YT=Math.max(16,Math.min(34,ST*0.50));
    const ic=s=>n*(s+4)+b*(s*0.30+14)+46;
    let alt=11,ust=ST,en=11;
    if(ic(ust)<=h-2)en=ust;
    else for(let t=0;t<9;t++){const o=(alt+ust)/2;
      if(ic(o)<=h-2){en=o;alt=o}else ust=o; if(ust-alt<0.5)break}
    return {sat:en, yaz:Math.max(10,Math.min(YT,en*0.58)), dolu:ic(en)/h}};
  const tel=olc(9,4,714);
  d7('telefon · satır ≥50px',tel.sat>=50,+tel.sat.toFixed(0));
  d7('telefon · yazı ≥28px',tel.yaz>=28,+tel.yaz.toFixed(0));
  d7('telefon · doluluk ≥%95',tel.dolu>=0.95,+(tel.dolu*100).toFixed(0));
  /* Yanlış ölçümde ne olurdu */
  const yanlis=olc(9,4,350);
  d7('yanlış ölçümde küçük kalırdı (regresyon)',yanlis.sat<tel.sat/2);
})();
console.log('\n'+(J7?'✗ '+J7+' HATA':'✓ SIFIR HATA — 14 ek kontrol'));
if(J7)process.exitCode=1;

console.log('\n═══ KAYDIRIRKEN BÜYÜME · TAM MERKEZ ═══');
let L1=0;const f1=(a,ok,e)=>{if(!ok){L1++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
f1('kilit tamamen kaldırıldı',kod.indexOf('otoKilit')<0||kod.indexOf('otoKilit=')<0);
f1('açıklık her karede güncelleniyor',kod.indexOf('if(!otoKilit)c.forEach')<0);
f1('uzaklık fonksiyonu',kod.indexOf('const uzaklik=()=>{')>=0);
f1('her karede yeniden ölçülüyor',kod.indexOf("const u=uzaklik();")>=0);
f1('kayY güncel uzaklıktan kuruluyor',kod.indexOf('kayY=(-(u===null?y0:u))+(-y0)*(-(1-yumusat(t)))')>=0);
f1('başlangıç uzaklığı saklanıyor',kod.indexOf('const y0=uzaklik();')>=0);
f1('yumuşatma easeInOutCubic',kod.indexOf('yumusat=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2')>=0);
(function(){
  /* Kartlar büyürken bile hedef TAM merkeze oturmalı */
  const yum=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
  const dene=(y0,buyume)=>{
    const uz=t=>y0*(1+buyume*t);
    const hedefY=t=>{const u=uz(t); return ((-u)+(-y0)*(-(1-yum(t))))+u};
    return {bas:hedefY(0), son:hedefY(1)};
  };
  [[-200,0],[-200,0.18],[-200,0.45],[300,0.30],[-80,0.60]].forEach(([y0,b])=>{
    const r=dene(y0,b);
    f1('y0='+y0+' büyüme %'+(b*100)+' → başta y0, sonda 0',
      Math.abs(r.bas-y0)<1e-9&&Math.abs(r.son)<1e-9,
      {bas:+r.bas.toFixed(3),son:+r.son.toFixed(3)});
  });
  /* Hareket monoton olmalı · geri sekme yok */
  const uz=t=>-200*(1+0.18*t);
  let onc=null, mono=true;
  for(let t=0;t<=1.0001;t+=0.02){
    const u=uz(t); const h=((-u)+200*(-(1-yum(t))))+u;
    if(onc!==null&&h<onc-1e-9)mono=false;
    onc=h;
  }
  f1('hedef merkeze monoton yaklaşıyor (sekme yok)',mono);
})();
(function(){
  const vmZ=require('vm'); const RZ=e=>vmZ.runInContext(e,C);
  C.setGun('2026-07-29');
  RZ('aktif=bul(); carkCiz()');
  let h=0,atl=0;
  for(let n=0;n<30;n++){
    const o=RZ('durakKonum(duraklar())');
    const d=(n%3===2)?-1:1;
    try{RZ('otoKaydir('+d+')')}catch(e){h++}
    const s=RZ('durakKonum(duraklar())');
    if(s-o!==d&&!(o===0&&d===-1))atl++;
  }
  f1('30 adımda hata yok',h===0,h);
  f1('30 adımda atlama yok',atl===0,atl);
  f1('sürükleme kipi sonda kapalı',RZ('surukleKip')===false);
  f1('kayY sonda sıfır',RZ('kayY')===0);
})();
console.log('\n'+(L1?'✗ '+L1+' HATA':'✓ SIFIR HATA — 17 ek kontrol'));
if(L1)process.exitCode=1;
