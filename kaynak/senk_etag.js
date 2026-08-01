/* ETag'li ve uyarlanabilir yoklamalı senkronu, ETag DESTEKLEYEN sahte sunucuyla sınar */
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
  const inm=opt.headers&&(opt.headers['If-None-Match']||opt.headers['if-none-match']);
  istek.push({m,inm,gonderilenBayt:m==='PATCH'?(opt.body||'').length:0});
  if(m==='GET'){
    if(inm===('"v'+surum+'"')) return {ok:false,status:304,headers:{get:()=>'"v'+surum+'"'}};
    return {ok:true,status:200,headers:{get:k=>k==='etag'?'"v'+surum+'"':null},
      json:async()=>UZAK===null?({files:{}}):({files:{'rota.json':{content:JSON.stringify(UZAK),truncated:false}}})};
  }
  UZAK=JSON.parse(JSON.parse(opt.body).files['rota.json'].content); surum++;
  return {ok:true,status:200,headers:{get:()=>'"v'+surum+'"'},json:async()=>({})};
}
const el=id=>({id,textContent:'',innerHTML:'',className:'',style:{},value:'',clientHeight:300,clientWidth:420,scrollHeight:280,
 classList:{_s:new Set(),toggle(){},add(){},remove(){},contains:()=>false},dataset:{},appendChild(){},setAttribute(){},
 insertAdjacentHTML(){},parentElement:null,getBoundingClientRect:()=>({width:420,height:300,left:0,top:0,right:420,bottom:300}),
 querySelectorAll:()=>[],querySelector:()=>el('x'),addEventListener(){},onclick:null,children:[],remove(){}});
const c={console,localStorage:ls,fetch:sunucu,
 document:{getElementById:el,querySelectorAll:()=>[],querySelector:()=>null,addEventListener(){},createElement:()=>el('n'),visibilityState:'visible'},
 window:{matchMedia:()=>({matches:true}),addEventListener(){}},requestAnimationFrame:f=>f&&f(),
 getComputedStyle:()=>({color:'#fff',lineHeight:'20px',fontSize:'16px',fontFamily:'x',fontWeight:'400'}),
 setInterval:()=>{},setTimeout:(f,t)=>1,clearTimeout:()=>{},
 CSS:{escape:s=>s},innerWidth:420,innerHeight:900,performance:{now:()=>0},
 alert(){},confirm:()=>true,btoa:s=>Buffer.from(s,'binary').toString('base64'),
 atob:s=>Buffer.from(s,'base64').toString('binary'),navigator:{},
 unescape:s=>s,escape:s=>s,encodeURIComponent:encodeURIComponent,decodeURIComponent:decodeURIComponent};
vm.createContext(c);
vm.runInContext(js+';globalThis.API={Senk,D,kay,TOHUM};',c);
const X=c.API, ileri=ms=>vm.runInContext('Date.now=()=>'+(Date.now()+ms)+';',c);
let H=0;const chk=(a,ok,e)=>{console.log((ok?'  ✓ ':'  ✗ ')+a+(ok?'':' :: '+JSON.stringify(e)));if(!ok)H++};
(async()=>{
console.log('═══ ETag KOŞULLU İSTEK ═══\n');
X.Senk.yazAyar({gist:'g1',tok:'t1',rol:'oku'});
UZAK={bitti:{a:'1'},denemeler:X.TOHUM,guncel:'2026-08-01T00:00:00.000Z'};
X.D.bitti={};X.D.guncel=new Date(0).toISOString();
istek=[]; await X.Senk.esitle('elle');
chk('ilk okuma: If-None-Match yok, 200 döner',istek.length===1&&!istek[0].inm);
chk('veri alındı',Object.keys(X.D.bitti).length===1);

istek=[]; ileri(20000); const d1=await X.Senk.esitle();
chk('ikinci yoklama If-None-Match GÖNDERDİ',istek.length===1&&istek[0].inm==='"v1"',istek[0]);
chk('sunucu 304 döndü, durum "zaten eşit"',d1==='zaten eşit',d1);
chk('304 hata sayılmadı',d1.indexOf('hata')<0,d1);
chk('304 iken hiçbir şey GÖNDERİLMEDİ',istek.every(r=>r.gonderilenBayt===0));

// iPad değişiklik yaptı → sürüm artar, 200 dönmeli
UZAK={bitti:{a:'1',b:'2'},denemeler:X.TOHUM,guncel:'2026-08-02T00:00:00.000Z'}; surum=2;
istek=[]; ileri(60000); const d2=await X.Senk.esitle();
chk('değişiklik olunca 200 gelir ve veri alınır',Object.keys(X.D.bitti).length===2,{durum:d2});
istek=[]; ileri(100000); const d3=await X.Senk.esitle();
chk('sonraki boş yoklama yine 304',d3==='zaten eşit'&&istek[0].inm==='"v2"',{durum:d3,istek:istek[0]});

console.log('\n═══ YAZAR CİHAZ ═══');
X.Senk.yazAyar({gist:'g1',tok:'t1',rol:'yaz'});
X.D.bitti={a:'1',b:'2'};X.D.guncel='2026-08-02T00:00:00.000Z';
istek=[]; ileri(140000); const d4=await X.Senk.esitle();
chk('yazarda boş yoklama da 304, yazma yok',d4==='zaten eşit'&&istek.every(r=>r.gonderilenBayt===0),{durum:d4});
X.D.bitti.c='3'; X.D.guncel='2026-08-09T00:00:00.000Z';
istek=[]; ileri(200000); const d5=await X.Senk.esitle();
chk('yerel değişiklik varsa GÖNDERİR',d5==='bu cihazdan gönderildi'&&istek.some(r=>r.gonderilenBayt>0),{durum:d5});
istek=[]; ileri(260000); const d6=await X.Senk.esitle();
chk('gönderdikten sonra etiket tazelenir, sonraki tur eşit',d6==='zaten eşit',d6);

console.log('\n═══ UYARLANABİLİR ARALIK (koddan) ═══');
const h=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8');
chk('alt sınır 45 sn',/YOK_ALT=45000/.test(h));
chk('üst sınır 6 dk',/YOK_UST=360000/.test(h));
chk('boş turda 1.6 kat artıyor',/yokAra\*1\.6/.test(h));
chk('değişiklik gelince 45 sn\'ye döner',/yokAra=YOK_ALT/.test(h));
chk('öne gelme ve odak aralığı sıfırlıyor',(h.match(/yokSifirla\(\)/g)||[]).length>=3);
chk('gizliyken yoklama yok',/visibilityState!=='hidden'/.test(h));
let a=45000,n=0; while(a<360000){a=Math.min(360000,Math.round(a*1.6));n++}
console.log('    boştayken 45sn → '+n+' turda 6 dk\'ya çıkıyor');
let top=0,t=45000,gec=0; while(gec<3600000){top++;gec+=t;t=Math.min(360000,Math.round(t*1.6))}
console.log('    1 saat boşta toplam istek: '+top+' (eski sabit 45 sn: 80)');
console.log('\n'+(H?'✗ '+H+' HATA':'✓ SIFIR HATA'));
process.exitCode=H?1:0;
})();
