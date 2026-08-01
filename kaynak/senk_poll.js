require('./senk_test.js');const c=globalThis.__C,X=c.API;const vm=require('vm'),fs=require('fs');
let H=0;const chk=(a,ok,e)=>{console.log((ok?'  ✓ ':'  ✗ ')+a+(ok?'':' :: '+JSON.stringify(e)));if(!ok)H++};
// VM İÇİNDEKİ saati ileri al (dışarıdaki Date.now VM'e geçmiyor)
const ileri=ms=>vm.runInContext('Date.now=()=>'+(Date.now()+ms)+';',c);
(async()=>{
globalThis.__NET=true;
console.log('═══ PERİYODİK YOKLAMA · yeni davranış ═══\n');
const h=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8');
chk('uyarlanabilir yoklama zamanlayıcısı kurulu',
    /YOK_ALT=45000/.test(h)&&/YOK_UST=360000/.test(h)&&/function yokKur\(\)/.test(h)&&/yokKur\(\);/.test(h));
chk('yoklama gizliyken çalışmıyor',/visibilityState!=='hidden'&&Senk\.kur\(\)/.test(h));
chk('eski dört tetikleyici duruyor',/visibilitychange/.test(h)&&/'focus'/.test(h)&&/'online'/.test(h)&&/Senk\.ertele/.test(h));

X.Senk.yazAyar({gist:'g1',tok:'t1',rol:'oku'});
c.__setUZAK({bitti:{a:'1'},denemeler:X.TOHUM,guncel:'2026-08-01T00:00:00.000Z'});
X.D.bitti={};X.D.guncel=new Date(0).toISOString();
await X.Senk.esitle('elle');
chk('telefon başlangıçta 1 kayıtla eşit',Object.keys(X.D.bitti).length===1);

c.__setUZAK({bitti:{a:'1',b:'2',c:'3'},denemeler:X.TOHUM,guncel:'2026-08-02T00:00:00.000Z'});
chk('iPad değişiklik yaptı, telefon henüz eski veride',Object.keys(X.D.bitti).length===1);

ileri(20000);                      // 20 sn geç, 15 sn'lik kısıt aşıldı
const d=await X.Senk.esitle();     // setInterval'in yaptığı çağrının aynısı
chk('YOKLAMA elle dokunmadan yeni veriyi ALDI',Object.keys(X.D.bitti).length===3,{durum:d,bitti:Object.keys(X.D.bitti)});

c.__sifirla();
const d2=await X.Senk.esitle();
chk('15 sn kısıtı arka arkaya yoklamayı engelliyor',c.__cagri().length===0,{istek:c.__cagri().length,durum:d2});

X.Senk.yazAyar({gist:'g1',tok:'t1',rol:'yaz'});
c.__setUZAK({bitti:{a:'1'},denemeler:X.TOHUM,guncel:'2026-08-01T00:00:00.000Z'});
X.D.bitti={a:'1',z:'9'};X.D.guncel='2026-08-05T00:00:00.000Z';
ileri(60000);
const d3=await X.Senk.esitle();
chk('yazar cihazda yoklama yerel değişikliği GÖNDERİR',Object.keys(c.__UZAK().bitti).length===2,{durum:d3});

// gizli sekmede yoklama yapılmamalı — koşul document.visibilityState
c.document.visibilityState='hidden';
chk('gizliyken koşul false',!(c.document.visibilityState!=='hidden'));
c.document.visibilityState='visible';
console.log('\n'+(H?'✗ '+H+' HATA':'✓ SIFIR HATA — yoklama çalışıyor'));
process.exitCode=H?1:0;
})();
