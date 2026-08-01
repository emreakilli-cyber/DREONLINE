require('./derin_ortam.js');
const C=globalThis.__C, X=C.API, vm=require('vm'), fs=require('fs');
const kod=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8');
const R=e=>vm.runInContext(e,C);
let H=0,N=0;const chk=(a,ok,e)=>{N++;if(!ok){H++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
const S=m=>C.setSaat(m), G=d=>C.setGun(d), id=X.id;
const SIF=()=>{X.D.bitti={};X.D.tasi={};R('molaOdak=false');S(840);G('2026-07-29')};

console.log('═══ A · MOLA DURAK OLDU ═══');
SIF(); G('2026-07-29'); S(300); R('aktif=bul()');
const S1=R('duraklar()');
chk('durak listesi üretiliyor',Array.isArray(S1)&&S1.length>0,S1&&S1.length);
chk('listede mola durağı var',S1.some(x=>x.m===true),S1.filter(x=>x.m).length+' mola durağı');
chk('mola durağı sahibi görevi taşıyor',S1.filter(x=>x.m).every(x=>typeof x.i==='number'));
chk('her mola durağı bir görev durağını izliyor',(function(){
  for(let p=0;p<S1.length;p++)if(S1[p].m&&(p===0||S1[p-1].i!==S1[p].i||S1[p-1].m))return false;
  return true})());
// adım molaya uğruyor mu
SIF(); G('2026-07-29'); S(300); R('aktif=bul(); molaOdak=false');
let ugradi=false, adimlar=0;
for(let k=0;k<25;k++){ if(!R('adim(1)'))break; adimlar++; if(R('molaOdak'))ugradi=true }
chk('ileri kaydırırken mola durağına UĞRUYOR',ugradi,{adim:adimlar});
chk('sıçrama yok: her adım tek durak',adimlar>0);
// geri de aynı
let geri=false;
for(let k=0;k<25;k++){ if(!R('adim(-1)'))break; if(R('molaOdak'))geri=true }
chk('geri kaydırırken de uğruyor',geri);
chk('bul() odağı sıfırlıyor',(R('aktif=bul()'),R('molaOdak')===false));

console.log('═══ B · GERİ SAYIM ═══');
SIF();
const mg=X.GOREVLER.find(g=>g.mola&&g.mola[2]>20&&g.d==='2026-07-29');
chk('molalı görev bulundu',!!mg,mg&&mg.k.slice(0,24));
G('2026-07-29');
const bas=X.dk(mg.mola[0]), bit=X.dk(mg.mola[1]);
S(bas+2);
chk('önceki iş BİTMEDİYSE geri sayım yok',R('molaKalanSn(GOREVLER.find(g=>id(g)==='+JSON.stringify(id(mg))+'))')===null);
X.D.bitti[id(mg)]='2026-07-29';
const k1=R('molaKalanSn(GOREVLER.find(g=>id(g)==='+JSON.stringify(id(mg))+'))');
chk('iş bitince geri sayım BAŞLIYOR',k1!==null&&k1>0,k1);
chk('kalan süre makul',k1<=(bit-bas-2)*60+60&&k1>0,{kalan:k1,pencere:(bit-bas)});
S(bas-1);
chk('mola başlamadan geri sayım yok',R('molaKalanSn(GOREVLER.find(g=>id(g)==='+JSON.stringify(id(mg))+'))')===null);
S(bit);
chk('mola bitince geri sayım yok',R('molaKalanSn(GOREVLER.find(g=>id(g)==='+JSON.stringify(id(mg))+'))')===null);
S(bas+2); G('2026-07-28');
chk('başka günde geri sayım yok',R('molaKalanSn(GOREVLER.find(g=>id(g)==='+JSON.stringify(id(mg))+'))')===null);
G('2026-07-29'); S(bas+2);
chk('molaSayimVar doğru',R('molaSayimVar()')===true);
X.D.bitti={};
chk('iş geri alınınca sayım durur',R('molaSayimVar()')===false);

console.log('═══ C · MOLA KARTI ═══');
X.D.bitti[id(mg)]='2026-07-29'; S(bas+2);
const kart=R('molaKart(GOREVLER.find(g=>id(g)==='+JSON.stringify(id(mg))+'),0)');
chk('kart çiziliyor',typeof kart==='string'&&kart.length>150,kart&&kart.length);
chk('geri sayım kartta',/data-mk=/.test(kart)&&/class="mkSay m"/.test(kart));
chk('ilerleme çubuğu var',/mkCub/.test(kart));
chk('say sınıfı geri sayımda',kod.indexOf('.molaB.say{animation:molaNefes')>=0);
X.D.bitti={};
const kart2=R('molaKart(GOREVLER.find(g=>id(g)==='+JSON.stringify(id(mg))+'),0)');
chk('iş bitmemişse yönlendirme metni',/Önceki işi tamamlayınca/.test(kart2));
chk('iş bitmemişse geri sayım yok',!/data-mk=/.test(kart2));

console.log('═══ D · MOLA BRİFİNGİ ═══');
SIF(); G('2026-07-29'); S(300);
const mi=X.GOREVLER.indexOf(mg);
R('gecis('+mi+',true)');
chk('gecis molaOdak kuruyor',R('molaOdak')===true);
const bh=String(C.brifOge().innerHTML);
chk('brifing mola içeriği gösteriyor',/Mola · /.test(bh),bh.slice(0,80));
chk('brifingde görev kombosu YOK',!/cKom/.test(bh));
R('molaOdak=false; aktif=bul()');

console.log('═══ E · BİLDİRİM ve SENKRON ═══');
chk('bildirim metni doğru',/Mola bitti, çalışma vakti/.test(kod));
chk('bildirim tek kez',/molaBildirildi\[k\]\)return; molaBildirildi\[k\]=1/.test(kod));
chk('servis çalışanı üzerinden gösteriliyor',/showNotification\('Rota'/.test(kod));
chk('izin nazikçe isteniyor',/Notification\.permission==='default'\)Notification\.requestPermission\(\)/.test(kod));
chk('geri sayımda senkron 20 sn',/molaSayimVar\(\)\)yokAra=20000/.test(kod));
chk('saniyelik tik yalnız kart varken',/const el=document\.querySelector\('\[data-mk\]'\); if\(!el\)return/.test(kod));
chk('sayım bitince bildirip yeniden çiziyor',/if\(k===null\)\{molaBildir\(g\);carkCiz\(\)/.test(kod));
chk('mola kartı ayrı renkte',kod.indexOf('background-color:#141D2A')>=0);
chk('nefes animasyonu yavaş ve azaltılabilir',/molaNefes 5\.2s/.test(kod)&&/@media \(prefers-reduced-motion:no-preference\)\{[\s\S]{0,240}molaNefes/.test(kod));

console.log('═══ F · ÇİZİM SAĞLAMLIĞI ═══');
let hata=0;
['2026-07-29','2026-07-31','2026-08-10','2026-08-22'].forEach(d=>{G(d);
  [0,400,700,900,1200,1439].forEach(m=>{S(m);
    try{R('aktif=bul(); carkCiz(); brifCiz(GOREVLER[aktif])');
      const St=R('duraklar()');
      if(St.length){R('gecis('+'St0'.replace('St0',String(St[St.length-1].i))+','+(St[St.length-1].m?'true':'false')+')')}
    }catch(e){hata++;console.log('    ✗ '+d+' '+m+' → '+e.message)}})});
chk('4 gün × 6 saat · çizim ve durak geçişi hatasız',hata===0,hata);
console.log('\n'+(H?'✗ '+H+' HATA / '+N:'✓ SIFIR HATA — '+N+' kontrol geçti'));
process.exitCode=H?1:0;
