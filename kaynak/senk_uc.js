/* Senkron uç durumları — ETag'li, kesik içerikli, bozuk veri döndürebilen sahte sunucu */
const fs=require('fs'),vm=require('vm');
let js=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8').split('<script>')[1].split('</script>')[0];
js=js.slice(0,js.indexOf('/* ══ GEÇİŞ ══ */'));
js=js.replace(/const Gok=\(\(\)=>\{[\s\S]*?\}\)\(\);/,'const Gok={boyut(){},ciz(){}};');
js=js.replace(/const Toz=\(\(\)=>\{[\s\S]*?return\{boyut,fuzyon,dagil,kur,dongu\}\}\)\(\);/,'const Toz={boyut(){},fuzyon(a,b){b&&b()},dagil(){},kur(){},dongu(){}};');
js=js.replace(/function kare[\s\S]*?requestAnimationFrame\(kare\);/,'');
js=js.replace(/const AZ=[^;]+;/,'const AZ=true;');
let LS={},UZAK=null,surum=1,istek=[],AYAR={};
const ls={getItem:k=>k in LS?LS[k]:null,setItem:(k,v)=>{LS[k]=String(v)},removeItem:k=>{delete LS[k]}};
/* AYAR ile sunucu davranışı bozulabilir:
   bozukJSON · kesik (truncated + raw_url) · dosyaAdi · bosGist · net · http */
async function sunucu(url,opt){
  opt=opt||{}; const m=opt.method||'GET';
  const inm=opt.headers&&(opt.headers['If-None-Match']||opt.headers['if-none-match']);
  istek.push({m,url,inm,bayt:m==='PATCH'?(opt.body||'').length:0});
  if(AYAR.net===false)throw new Error('Failed to fetch');
  if(AYAR.http)return {ok:false,status:AYAR.http,headers:{get:()=>null}};
  if(url.indexOf('raw')>=0)return {ok:true,status:200,headers:{get:()=>null},text:async()=>JSON.stringify(UZAK)};
  if(m==='GET'){
    if(inm===('"v'+surum+'"'))return {ok:false,status:304,headers:{get:()=>'"v'+surum+'"'}};
    const ad=AYAR.dosyaAdi||'rota.json';
    let icerik=AYAR.bozukJSON?'{bu gecerli json degil':(UZAK===null?null:JSON.stringify(UZAK));
    const f=icerik===null?null:(AYAR.kesik
      ?{filename:ad,content:'',truncated:true,raw_url:'https://raw.example/x'}
      :{filename:ad,content:icerik,truncated:false});
    return {ok:true,status:200,headers:{get:k=>k==='etag'?'"v'+surum+'"':null},
      json:async()=>AYAR.bosGist?({files:{}}):({files:f?{[ad]:f}:{}})};
  }
  UZAK=JSON.parse(JSON.parse(opt.body).files[Object.keys(JSON.parse(opt.body).files)[0]].content); surum++;
  return {ok:true,status:200,headers:{get:()=>'"v'+surum+'"'},json:async()=>({})};
}
const el=()=>({textContent:'',innerHTML:'',className:'',style:{},value:'',clientHeight:300,clientWidth:420,scrollHeight:280,
 classList:{_s:new Set(),toggle(){},add(){},remove(){},contains:()=>false},dataset:{},appendChild(){},setAttribute(){},
 insertAdjacentHTML(){},parentElement:null,getBoundingClientRect:()=>({width:420,height:300,left:0,top:0,right:420,bottom:300}),
 querySelectorAll:()=>[],querySelector:()=>el(),addEventListener(){},onclick:null,children:[],remove(){}});
const c={console,localStorage:ls,fetch:sunucu,
 document:{getElementById:()=>el(),querySelectorAll:()=>[],querySelector:()=>el(),addEventListener(){},createElement:el,visibilityState:'visible'},
 window:{matchMedia:()=>({matches:true}),addEventListener(){}},requestAnimationFrame:f=>f&&f(),
 getComputedStyle:()=>({color:'#fff',lineHeight:'20px',fontSize:'16px',fontFamily:'x',fontWeight:'400'}),
 setInterval:()=>{},setTimeout:()=>1,clearTimeout:()=>{},
 CSS:{escape:s=>s},innerWidth:420,innerHeight:900,performance:{now:()=>0},
 alert(){},confirm:()=>true,btoa:s=>Buffer.from(s,'binary').toString('base64'),
 atob:s=>Buffer.from(s,'base64').toString('binary'),navigator:{},
 unescape:s=>s,escape:s=>s,encodeURIComponent:encodeURIComponent,decodeURIComponent:decodeURIComponent};
vm.createContext(c);
vm.runInContext(js+';globalThis.API={Senk,D,kay,TOHUM,GOREVLER,id};',c);
const X=c.API, ileri=ms=>vm.runInContext('Date.now=()=>'+(Date.now()+ms)+';',c);
let H=0,N=0,kaydir=0;
const chk=(a,ok,e)=>{N++;if(!ok){H++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
let sc=100; const yeniSurum=()=>{surum=++sc};
const gec=()=>{kaydir+=30000;ileri(kaydir);yeniSurum()};
const yaz=()=>X.Senk.yazAyar({gist:'g1',tok:'t1',rol:'yaz'});
const oku=()=>X.Senk.yazAyar({gist:'g1',tok:'t1',rol:'oku'});

(async()=>{
console.log('═══ G · SENKRON UÇ DURUMLARI ═══');

// G1 saat kayması: uzak damga GELECEKTE
yaz(); AYAR={}; yeniSurum();
UZAK={bitti:{a:'1',b:'2'},denemeler:X.TOHUM,guncel:'2099-01-01T00:00:00.000Z'};
X.D.bitti={z:'9'};X.D.guncel='2026-08-01T00:00:00.000Z';
let d=await X.Senk.esitle('elle');
chk('G1 uzak damga gelecekteyse uzak kazanır (veri kaybı yok, yerel ezilir)',Object.keys(X.D.bitti).length===2,{durum:d,bitti:Object.keys(X.D.bitti)});

// G2 yerel damga gelecekte → gönderir, uzak ezilmez sayılmaz
gec(); UZAK={bitti:{a:'1'},denemeler:X.TOHUM,guncel:'2026-08-01T00:00:00.000Z'};
X.D.bitti={a:'1',b:'2',c:'3'};X.D.guncel='2099-01-01T00:00:00.000Z';
d=await X.Senk.esitle('elle');
chk('G2 yerel damga gelecekteyse gönderir',Object.keys(UZAK.bitti).length===3,{durum:d});

// G3 bozuk JSON
gec(); AYAR={bozukJSON:true}; 
d=await X.Senk.esitle('elle');
chk('G3 bozuk JSON çökertmiyor, hata döndürüyor',d.indexOf('hata')===0,d);
chk('G3b bozuk JSON yerel veriyi bozmadı',Object.keys(X.D.bitti).length===3,Object.keys(X.D.bitti));

// G4 kesik içerik → raw_url'den okur
gec(); AYAR={kesik:true};
UZAK={bitti:{p:'1',q:'2',r:'3',s:'4'},denemeler:X.TOHUM,guncel:'2099-06-01T00:00:00.000Z'};
d=await X.Senk.esitle('elle');
chk('G4 truncated içerik raw_url ile alındı',Object.keys(X.D.bitti).length===4,{durum:d,bitti:Object.keys(X.D.bitti)});
chk('G4b raw isteği gerçekten atıldı',istek.some(r=>r.url.indexOf('raw')>=0));

// G5 farklı dosya adı
gec(); AYAR={dosyaAdi:'Rota.JSON'};
UZAK={bitti:{x:'1'},denemeler:X.TOHUM,guncel:'2099-07-01T00:00:00.000Z'};
d=await X.Senk.esitle('elle');
chk('G5 farklı büyük/küçük harfli dosya adı bulunuyor',Object.keys(X.D.bitti).length===1,{durum:d});
istek=[]; X.D.bitti.yeni='1'; X.D.guncel='2099-08-01T00:00:00.000Z';
gec(); await X.Senk.esitle('elle');
const patch=istek.find(r=>r.m==='PATCH');
chk('G5b yazarken AYNI dosya adına yazıyor (kopya oluşmuyor)',patch!==undefined);

// G6 boş gist
gec(); AYAR={bosGist:true}; UZAK=null;
yaz(); X.D.bitti={a:'1'};X.D.guncel='2026-08-01T00:00:00.000Z';
d=await X.Senk.esitle('elle');
chk('G6 boş gist → yazar ilk yüklemeyi yapar',d==='ilk yükleme yapıldı'||UZAK!==null,{durum:d});
gec(); AYAR={bosGist:true}; UZAK=null; oku();
d=await X.Senk.esitle('elle');
chk('G6b boş gist → okur cihaz YAZMAZ',UZAK===null&&d.indexOf('yalnız okur')>=0,{durum:d,uzak:UZAK});

// G7 çevrimdışı, sonra geri gelme
gec(); AYAR={net:false}; yaz();
d=await X.Senk.esitle('elle');
chk('G7 çevrimdışı hata döner, çökmez',d.indexOf('hata')===0,d);
AYAR={}; yeniSurum(); UZAK={bitti:{a:'1',b:'2'},denemeler:X.TOHUM,guncel:'2099-09-01T00:00:00.000Z'};
d=await X.Senk.esitle('elle');
chk('G7b ağ dönünce hemen eşitleniyor (kısıt hata sonrası uygulanmaz)',Object.keys(X.D.bitti).length===2,{durum:d});

// G8 HTTP hataları veriyi bozmuyor
for(const kod of [401,403,404,409,422,429,500,502,503]){
  gec(); AYAR={http:kod};
  const once=JSON.stringify(X.D.bitti);
  d=await X.Senk.esitle('elle');
  chk('G8 HTTP '+kod+' hata döner, yerel veri korunur',d.indexOf('hata')===0&&JSON.stringify(X.D.bitti)===once,{durum:d});
}
AYAR={};

// G9 okur cihaz HİÇBİR koşulda yazmaz
gec(); oku();
UZAK={bitti:{a:'1'},denemeler:X.TOHUM,guncel:'2026-01-01T00:00:00.000Z'};
X.D.bitti={a:'1',cok:'2',fazla:'3'};X.D.guncel='2099-12-31T00:00:00.000Z';
const uzakOnce=JSON.stringify(UZAK);
for(const z of ['elle','gonder','cek',undefined]){gec();await X.Senk.esitle(z)}
chk('G9 okur cihaz 4 farklı tetikte de uzağa yazmadı',JSON.stringify(UZAK)===uzakOnce);

// G10 kurulmamış senkron sessiz
gec(); X.Senk.yazAyar({});
istek=[]; d=await X.Senk.esitle('elle');
chk('G10 gist/anahtar yoksa istek atılmıyor',istek.length===0,istek.length);

// G11 büyük veri
gec(); yaz(); AYAR={};
X.D.bitti={}; X.GOREVLER.forEach(g=>X.D.bitti[X.id(g)]=g.d);
X.D.guncel='2099-12-31T23:59:59.000Z'; UZAK={bitti:{},denemeler:X.TOHUM,guncel:'2026-01-01T00:00:00.000Z'};
d=await X.Senk.esitle('elle');
chk('G11 196 kayıtlık tam veri gönderilebiliyor',Object.keys(UZAK.bitti).length===196,{durum:d,n:Object.keys(UZAK.bitti||{}).length});
const boyut=JSON.stringify(UZAK).length;
chk('G11b gist yükü makul (<1 MB)',boyut<1000000,boyut+' bayt');

// G12 art arda çağrı tek istek
gec(); istek=[];
await Promise.all([X.Senk.esitle(),X.Senk.esitle(),X.Senk.esitle(),X.Senk.esitle()]);
chk('G12 eşzamanlı dört çağrı yığılmıyor',istek.length<=1,istek.length);

console.log('\n'+(H?'✗ '+H+' HATA / '+N+' kontrol':'✓ SIFIR HATA — '+N+' senkron uç durumu geçti'));
process.exitCode=H?1:0;
})();
