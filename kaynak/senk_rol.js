/* Anahtarsız OKUR akışı + gömülü gist + yazar akışı */
const fs=require('fs'),vm=require('vm');
let js=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8').split('<script>')[1].split('</script>')[0];
js=js.slice(0,js.indexOf('/* ══ GEÇİŞ ══ */'));
js=js.replace(/const Gok=\(\(\)=>\{[\s\S]*?\}\)\(\);/,'const Gok={boyut(){},ciz(){}};');
js=js.replace(/const Toz=\(\(\)=>\{[\s\S]*?return\{boyut,fuzyon,dagil,kur,dongu\}\}\)\(\);/,'const Toz={boyut(){},fuzyon(a,b){b&&b()},dagil(){},kur(){},dongu(){}};');
js=js.replace(/function kare[\s\S]*?requestAnimationFrame\(kare\);/,'');
js=js.replace(/const AZ=[^;]+;/,'const AZ=true;');
let LS={},UZAK=null,surum=1,istek=[];
const ls={getItem:k=>k in LS?LS[k]:null,setItem:(k,v)=>{LS[k]=String(v)},removeItem:k=>{delete LS[k]}};
async function sunucu(url,opt){
  opt=opt||{}; const m=opt.method||'GET';
  const h=opt.headers||{};
  istek.push({m,url,auth:h['Authorization']||null,inm:h['If-None-Match']||null});
  if(m==='GET'){
    if(h['If-None-Match']==='"v'+surum+'"')return{ok:false,status:304,headers:{get:()=>'"v'+surum+'"'}};
    return{ok:true,status:200,headers:{get:k=>k==='etag'?'"v'+surum+'"':null},
      json:async()=>UZAK===null?({files:{}}):({files:{'rota.json':{content:JSON.stringify(UZAK),truncated:false}}})};
  }
  UZAK=JSON.parse(JSON.parse(opt.body).files['rota.json'].content); surum++;
  return{ok:true,status:200,headers:{get:()=>null},json:async()=>({})};
}
const el=()=>{const o={textContent:'',innerHTML:'',className:'',style:{},value:'',clientHeight:300,clientWidth:420,scrollHeight:280,
 classList:{_s:new Set(),toggle(){},add(){},remove(){},contains:()=>false},dataset:{},appendChild(){},setAttribute(){},
 insertAdjacentHTML(){},parentElement:null,getBoundingClientRect:()=>({width:420,height:300,left:0,top:0,right:420,bottom:300}),
 addEventListener(){},onclick:null,oninput:null,children:[],remove(){},focus(){}};
 o.querySelector=()=>el(); o.querySelectorAll=()=>[el(),el()]; return o};
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
vm.runInContext(js+';globalThis.API={Senk,D,kay};',c);
const X=c.API, ileri=ms=>vm.runInContext('Date.now=()=>'+(Date.now()+ms)+';',c);
let H=0,N=0,kay=0; const gec=()=>{kay+=30000;ileri(kay);surum++};
const chk=(a,ok,e)=>{N++;if(!ok){H++;console.log('  ✗ '+a+(e!==undefined?' :: '+JSON.stringify(e):''))}};
(async()=>{
console.log('═══ H · ANAHTARSIZ OKUR AKIŞI ═══');
const kod=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8');
chk('H1 gist kimliği koda gömülü',/GIST_SABIT='[0-9a-f]{32}'/.test(kod));
chk('H2 gerçek erişim anahtarı koda GÖMÜLMEMİŞ',!/github_pat_[A-Za-z0-9_]{20,}/.test(kod),
    (kod.match(/github_pat_[A-Za-z0-9_]{0,30}/g)||[]).slice(0,2));
chk('H3 arayüzde tek kutu: Senkronizasyon şifresi',/Senkronizasyon şifresi/.test(kod)&&/id="snkS"/.test(kod));
chk('H4 yazar/okur kelimeleri tanınıyor',/'okur','oku','okuyucu','telefon'/.test(kod.replace(/\[|\]/g,''))||/okuyucu/.test(kod));

// OKUR: anahtar yok
X.Senk.yazAyar({rol:'oku'});
chk('H5 okur cihaz anahtarsız KURULU sayılıyor',X.Senk.kur()===true);
chk('H6 rol okur',X.Senk.okur()===true);
UZAK={bitti:{a:'1',b:'2'},denemeler:[],guncel:'2099-01-01T00:00:00.000Z'};
X.D.bitti={};X.D.guncel=new Date(0).toISOString();
istek=[]; let d=await X.Senk.esitle('elle');
chk('H7 anahtarsız okuma çalıştı',Object.keys(X.D.bitti).length===2,{durum:d});
chk('H8 istekte Authorization başlığı YOK',istek.length>0&&istek.every(r=>r.auth===null),istek[0]);
chk('H9 gömülü gist kimliği kullanıldı',istek[0].url.indexOf('e185dbe04ba69223a4fd35e40059b7f0')>=0,istek[0].url);
// okur yazmaya çalışırsa
const uzakOnce=JSON.stringify(UZAK);
gec(); X.D.bitti.yeni='9'; X.D.guncel='2099-12-31T00:00:00.000Z';
for(const z of ['elle','gonder','cek',undefined]){gec(); await X.Senk.esitle(z)}
chk('H10 anahtarsız okur HİÇBİR tetikte yazmadı',JSON.stringify(UZAK)===uzakOnce);
chk('H11 hiç PATCH isteği atılmadı',istek.every(r=>r.m!=='PATCH'));

console.log('═══ I · YAZAR AKIŞI ═══');
gec(); X.Senk.yazAyar({tok:'gecerli_anahtar',rol:'yaz'});
chk('I1 yazar cihaz kurulu',X.Senk.kur()===true&&X.Senk.okur()===false);
UZAK={bitti:{a:'1'},denemeler:[],guncel:'2026-01-01T00:00:00.000Z'};
X.D.bitti={a:'1',b:'2',c:'3'};X.D.guncel='2099-12-31T00:00:00.000Z';
istek=[]; d=await X.Senk.esitle('elle');
chk('I2 yazar gönderdi',Object.keys(UZAK.bitti).length===3,{durum:d});
chk('I3 yazarın isteğinde Authorization VAR',istek.some(r=>r.auth==='Bearer gecerli_anahtar'),istek.map(r=>r.auth));
chk('I4 gömülü gist yazarda da kullanıldı',istek[0].url.indexOf('e185dbe04ba69223a4fd35e40059b7f0')>=0);
// anahtarsız yazar rolü → net hata
gec(); X.Senk.yazAyar({rol:'yaz'});
chk('I5 anahtarsız yazar KURULU sayılmıyor',X.Senk.kur()===false);
istek=[]; d=await X.Senk.esitle('elle');
chk('I6 anahtarsız yazar istek atmıyor',istek.length===0,istek.length);

console.log('═══ J · ÜÇÜNCÜ CİHAZ (kız arkadaşı, okur) ═══');
gec(); LS={}; X.Senk.yazAyar({rol:'oku'});
UZAK={bitti:{a:'1',b:'2',c:'3',d:'4'},denemeler:[],guncel:'2099-06-01T00:00:00.000Z'};
X.D.bitti={};X.D.guncel=new Date(0).toISOString();
istek=[]; d=await X.Senk.esitle('elle');
chk('J1 temiz üçüncü cihaz yalnız "okur" yazarak eşleşti',Object.keys(X.D.bitti).length===4,{durum:d});
chk('J2 anahtar hiç sorulmadı',istek.every(r=>r.auth===null));
chk('J3 uzaktaki veri bozulmadı',Object.keys(UZAK.bitti).length===4);
console.log('\n'+(H?'✗ '+H+' HATA / '+N:'✓ SIFIR HATA — '+N+' kontrol geçti'));
process.exitCode=H?1:0;
})();
