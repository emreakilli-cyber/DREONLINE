const fs=require('fs'),vm=require('vm');
let full=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8');
let js=full.split('<script>')[1].split('</script>')[0];
js=js.slice(0,js.indexOf('/* ══ GEÇİŞ ══ */'));
js=js.replace(/const Gok=\(\(\)=>\{[\s\S]*?\}\)\(\);/,'const Gok={boyut(){},ciz(){}};');
js=js.replace(/const Toz=\(\(\)=>\{[\s\S]*?return\{boyut,fuzyon,dagil,kur,dongu\}\}\)\(\);/,'const Toz={boyut(){},fuzyon(a,b){b&&b()},dagil(){},kur(){},dongu(){}};');
js=js.replace(/function kare[\s\S]*?requestAnimationFrame\(kare\);/,'');
js=js.replace(/const Depo=[\s\S]*?\}\}\)\(\);/,'const Depo={ok:true,oku:()=>({bitti:{},denemeler:JSON.parse(JSON.stringify(TOHUM))}),yaz:()=>{}};');
js=js.replace(/const AZ=[^;]+;/,'const AZ=true;');
{const i=js.indexOf('const simdi=()=>{'); const j=js.indexOf('};',i)+2;
 js=js.slice(0,i)+"const simdi=()=>(globalThis.__SAAT!==undefined?globalThis.__SAAT:840);"+js.slice(j);}
{const i=js.indexOf('const bgun=()=>{'); const j=js.indexOf('};',i)+2;
 js=js.slice(0,i)+"const bgun=()=>(globalThis.__GUN||'2026-07-26');"+js.slice(j);}
if(js.indexOf('globalThis.__SAAT')<0)throw new Error('SAAT enjeksiyonu tutmadi');
if(js.indexOf('globalThis.__GUN')<0)throw new Error('GUN enjeksiyonu tutmadi');
let UZ=300,PW=420;
function icerik(S,w){
  const kd=S.has('d6')?5:S.has('d5')?4:S.has('d4')?3:S.has('d3')?2:S.has('d2')?1:0;
  const et=[26,24,22,20,0,0][kd], ned=[112,96,74,52,40,20][kd], kom=[64,56,0,0,0,0][kd];
  let mtBlok;
  if(kd>=4)mtBlok=[0,0,0,0,24,0][kd];
  else{const mt=[30,28,26,24][kd],cw=[152,140,128,112][kd];
       mtBlok=Math.max(1,Math.ceil((4*cw)/Math.max(w-24,110)))*(mt+6)}
  return (et?et+6:0)+ned+6+mtBlok+(kom?kom+6:0)+8}
const uzayEl={get clientHeight(){return UZ},getBoundingClientRect:()=>({width:PW,height:UZ})};
const brifEl={innerHTML:'',get clientWidth(){return PW},get parentElement(){return uzayEl},
  classList:{_s:new Set(),add(...a){a.forEach(x=>this._s.add(x))},remove(...a){a.forEach(x=>this._s.delete(x))},contains(x){return this._s.has(x)},toggle(){}},
  get clientHeight(){return icerik(this.classList._s,PW)},
  get scrollHeight(){return icerik(this.classList._s,PW)},
  getBoundingClientRect(){return{width:PW,height:icerik(this.classList._s,PW)}},
  querySelector:()=>null,querySelectorAll:()=>[],addEventListener(){}};
const genel=()=>{const o={textContent:'',innerHTML:'',className:'',style:{},value:'',clientHeight:700,clientWidth:PW,scrollHeight:0,
 classList:{_s:new Set(),toggle(){},add(){},remove(){},contains:()=>false},dataset:{},appendChild(){},setAttribute(){},insertAdjacentHTML(){},
 getBoundingClientRect:()=>({width:PW,height:700,left:0,top:0,right:PW,bottom:700}),
 addEventListener(){},onclick:null,oninput:null,children:[],remove(){},focus(){},checked:false};
 o.querySelector=()=>genel(); o.querySelectorAll=()=>[genel(),genel()]; return o};
/* id'ye göre ÖNBELLEKLİ öğe: seyirCiz/olcumCiz DOM'a yazdığı için sonucu okuyabilelim */
const ONBELLEK={};
const ogeAl=k=>{if(!ONBELLEK[k])ONBELLEK[k]=genel();return ONBELLEK[k]};
const c={console,document:{getElementById:k=>k==='uzay'?uzayEl:(k==='brif'?brifEl:ogeAl(k)),
  querySelectorAll:()=>[genel(),genel()],querySelector:()=>genel(),addEventListener(){},createElement:genel},
  window:{matchMedia:()=>({matches:true}),addEventListener(){}},requestAnimationFrame:f=>f&&f(),
  getComputedStyle:()=>({color:'#fff',lineHeight:'20px',fontSize:'16px',fontFamily:'x',fontWeight:'400'}),
  setInterval:()=>{},CSS:{escape:s=>s},innerWidth:PW,innerHeight:900,performance:{now:()=>0},
  alert(){},confirm:()=>true,btoa:s=>Buffer.from(s,'binary').toString('base64'),
  atob:s=>Buffer.from(s,'base64').toString('binary'),navigator:{},
  unescape:s=>s,escape:s=>s,encodeURIComponent:encodeURIComponent,decodeURIComponent:decodeURIComponent};
vm.createContext(c);
vm.runInContext(js+`;globalThis.API={GOREVLER,TOHUM,SORU,KOMBO,KHARITA,ISARET,SOZ,RENK,EYLEM,MIKON,MOLA_AD,Bild,
 son,para,puan,id,esc,dk,simdi,fark,trT,sur,bgun,sinavKart,sinavGunu,
 kart,motivKart,brifCiz,brifYogunluk,seyirCiz,olcumCiz,kaynakHarita,radarCiz,trendCiz,miniCiz,etiketler,kordonCiz,
 bransDurum,gecmis,sureDoldu,gecikme,kacanlar,bul,suAnMi,gunKapandi,sozSec,sirali,
 RB,DB,TEMEL,D,SURUM,SINAV,BITIS,YKD};
 globalThis.setSaat=m=>{globalThis.__SAAT=m};
 globalThis.setGun=d=>{globalThis.__GUN=d};`,c);
c.setPanel=(u,p)=>{UZ=u;PW=p;brifEl.classList._s.clear()};
c.getSinif=()=>[...brifEl.classList._s];
c.getIcerik=()=>icerik(brifEl.classList._s,PW);
c.oge=k=>ONBELLEK[k];
c.brifOge=()=>brifEl;
globalThis.__C=c;
