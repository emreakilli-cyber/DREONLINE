// Tarayıcıya daha yakın bir DOM taklidi ile başlatmayı dene
const fs=require('fs'), vm=require('vm');
const h=fs.readFileSync('/mnt/user-data/outputs/index.html','utf8');
const js=h.match(/<script>([\s\S]*)<\/script>/)[1];
const el=(t)=>{const o={tagName:t,children:[],style:{setProperty(){},removeProperty(){}},
  dataset:{},className:'',
  classList:{
    add(...a){const c=(''+o.className).split(/\s+/).filter(Boolean);
      a.forEach(x=>{if(c.indexOf(x)<0)c.push(x)}); o.className=c.join(' ')},
    remove(...a){o.className=(''+o.className).split(/\s+/).filter(x=>x&&a.indexOf(x)<0).join(' ')},
    contains(x){return (''+o.className).split(/\s+/).indexOf(x)>=0},
    toggle(x,v){v?this.add(x):this.remove(x)}},
  appendChild(c){const k=o.children.indexOf(c); if(k>=0)o.children.splice(k,1);
    o.children.push(c); c._p=o; return c},
  removeChild(c){const k=o.children.indexOf(c); if(k>=0)o.children.splice(k,1); return c},
  remove(){const p=o._p; if(p){const k=p.children.indexOf(o); if(k>=0)p.children.splice(k,1)}},
  insertBefore(c,r){const k=o.children.indexOf(c); if(k>=0)o.children.splice(k,1);
    const j=r?o.children.indexOf(r):-1;
    if(j>=0)o.children.splice(j,0,c); else o.children.push(c); c._p=o; return c},
  getBoundingClientRect(){return{width:340,height:40,top:0,left:0,right:340,bottom:40}},
  getContext(){return{fillRect(){},clearRect(){},beginPath(){},arc(){},fill(){},stroke(){},
    moveTo(){},lineTo(){},closePath(){},save(){},restore(){},translate(){},scale(){},
    createRadialGradient(){return{addColorStop(){}}},createLinearGradient(){return{addColorStop(){}}},
    set fillStyle(v){},set strokeStyle(v){},set globalAlpha(v){},set lineWidth(v){},
    set shadowBlur(v){},set shadowColor(v){},set font(v){},fillText(){},measureText(){return{width:10}}}},
  width:390,height:844,
  querySelector(sel){return null},querySelectorAll(sel){return[]},
  matches(){return false},closest(){return null},
  get firstChild(){return o.children[0]||null},
  get parentElement(){return o._p||null},
  addEventListener(){},removeEventListener(){},setAttribute(){},removeAttribute(){},
  getAttribute(){return null},contains(){return false},focus(){},scrollIntoView(){},
  set innerHTML(v){o._h=v},get innerHTML(){return o._h||''},
  set textContent(v){o._t=v},get textContent(){return o._t||''}};
  return o};
const store={}; const RAF=[];
const doc={createElement:el,createDocumentFragment:()=>el('frag'),
  getElementById(id){return store[id]||(store[id]=el('div'))},
  querySelector(s){return el('div')},querySelectorAll(){return[]},
  addEventListener(){},body:el('body'),documentElement:el('html'),
  createTextNode(){return el('t')}};
const ctx={document:doc,window:{addEventListener(){},matchMedia:()=>({matches:false,addEventListener(){}}),
  requestAnimationFrame:f=>{RAF.push({f:f,ad:(f.name||'anon')});return RAF.length},
  localStorage:{getItem(){return null},setItem(){},removeItem(){}},location:{href:'x',search:''},
  navigator:{onLine:true,serviceWorker:{register(){return Promise.resolve()}}},
  fetch:()=>Promise.resolve({ok:false,json:()=>({})}),performance:{now:()=>0},
  setTimeout(f){return 0},setInterval(){return 0},clearInterval(){},clearTimeout(){},
  devicePixelRatio:2,innerWidth:390,innerHeight:844},
  console, Math, Date, JSON, parseInt, parseFloat, isNaN, Object, Array, String, Number, Boolean, RegExp, Error, Set, Map, Promise};
ctx.globalThis=ctx; ctx.self=ctx; ctx.window.document=doc;
Object.assign(ctx,{requestAnimationFrame:ctx.window.requestAnimationFrame,
  setTimeout:ctx.window.setTimeout,setInterval:ctx.window.setInterval,
  clearInterval:ctx.window.clearInterval,clearTimeout:ctx.window.clearTimeout,
  localStorage:ctx.window.localStorage,navigator:ctx.window.navigator,
  location:ctx.window.location,fetch:ctx.window.fetch,performance:ctx.window.performance,
  matchMedia:ctx.window.matchMedia,addEventListener(){},innerWidth:390,innerHeight:844,
  devicePixelRatio:2});
vm.createContext(ctx);
try{vm.runInContext(js,ctx,{filename:'app.js'}); console.log('✓ başlatma hatasız')}
catch(e){console.log('✗ ÇALIŞMA HATASI: '+e.message);
  const st=(e.stack||'').split('\n').slice(0,4).join('\n'); console.log(st)}

console.log('bekleyen rAF: '+RAF.length);
// carkCiz doğrudan sına
try{
  const sahne=store['sahne'];
  console.log('GOREVLER: '+(typeof ctx.GOREVLER)+' '+(ctx.GOREVLER?ctx.GOREVLER.length:'YOK'));
  console.log('carkListe: '+ctx.carkListe().length);
  console.log('aktif: '+ctx.aktif);
  ctx.carkCiz();
  console.log('sahne çocuk: '+sahne.children.length);
  ctx.requestAnimationFrame&&null;
  try{ctx.diz&&ctx.diz()}catch(e){console.log('diz hata: '+e.message)}
  // takilma senaryosu
  try{
    const r=store['rota']||doc.getElementById('rota');
    ctx.sinirDurum=true; ctx.sinirGecis=true;
    r.className='vw on genis cipGiz';
    console.log('takılmış     : '+r.className);
    ctx.sinirSenk();
    console.log('normal senk  : '+r.className);
    ctx.sinirSenk(true);
    console.log('ZORLA senk   : '+r.className);
  }catch(e){console.log('senk hata: '+e.message)}
  // BUTON YOLLARI · tarayiciya yakin ortamda
  ['otoKaydir(1)','otoKaydir(-1)'].forEach(k=>{
    try{ctx.eval?0:0; vm.runInContext(k,ctx); console.log(k+' OK')}
    catch(e){console.log(k+' HATA: '+e.message+'\n   '+(e.stack||'').split('\n')[1])}
  });
  // MOLA ODAGI · surukleme sirasinda act korunuyor mu
  try{
    const S=vm.runInContext('duraklar()',ctx);
    const mi=S.findIndex(x=>x.m);
    vm.runInContext('gecis('+S[mi].i+',true)',ctx);
    vm.runInContext('surukleKip=true; carkCiz()',ctx);
    const kids=store['sahne'].children.map(x=>x.dataset.i+':'+x.className);
    const akt=kids.filter(k=>/\bact\b/.test(k));
    console.log('sürüklerken act: '+JSON.stringify(akt));
    vm.runInContext('surukleKip=false',ctx);
  }catch(e){console.log('mola senaryosu hata: '+e.message)}
  console.log('kademe sınıfları:');
  sahne.children.slice(0,9).forEach((x,i)=>console.log('   '+i+': '+x.className+' op='+(x.style.opacity||'-')+' z='+(x.style.zIndex||'-')));
}catch(e){console.log('carkCiz HATA: '+e.message); console.log((e.stack||'').split('\n').slice(1,3).join('\n'))}

let tur=0;
while(RAF.length&&tur<10){const o=RAF.shift(); const f=o.f; tur++; console.log('  tur '+tur+': '+o.ad+' (kuyruk '+RAF.length+')');
  try{f()}catch(e){console.log('rAF '+tur+' HATA: '+e.message);
    console.log((e.stack||'').split('\n').slice(1,3).join('\n')); break}}
console.log('rAF turları: '+tur+' · kalan kuyruk: '+RAF.length);
