/* ============================================================
   Mother's Day Graphics — Shared JavaScript
   ============================================================ */

/* ── Wishlist ─────────────────────────────────────────────── */
const W={
  K:'mdg_wish',
  g(){try{return JSON.parse(localStorage.getItem(this.K))||[]}catch{return[]}},
  s(a){localStorage.setItem(this.K,JSON.stringify(a))},
  has(t){return this.g().includes(t)},
  toggle(t){const l=this.g(),i=l.indexOf(t);if(i>-1)l.splice(i,1);else l.push(t);this.s(l);this.badge();return i===-1},
  rm(t){this.s(this.g().filter(x=>x!==t));this.badge()},
  badge(){document.querySelectorAll('.wc').forEach(e=>{const c=this.g().length;e.textContent=c;e.style.display=c?'flex':'none'})}
};

function prodImg(p){return IB+p[1]}
function prodUrl(p){return AB+p[2]+AS}
function prodCat(p){return CN[p[3]]}

function card(p,i){
  const h=W.has(p[0])?'active':'';
  const safeT=p[0].replace(/'/g,"\\'");
  return`<div class="pc" style="animation-delay:${Math.min(i*30,600)}ms">
<div class="pc-img"><img src="${prodImg(p)}" alt="${p[0]}" loading="lazy" onerror="this.src='data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 400 400%22><rect fill=%22%23f8f0f4%22 width=%22400%22 height=%22400%22/><text x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 fill=%22%23dbb%22 font-size=%2240%22>🌸</text></svg>'">
<button class="pc-h ${h}" data-t="${safeT}" onclick="tglW(this)" aria-label="Wishlist"><svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></button>
</div>
<div class="pc-b"><h3 class="pc-t">${p[0]}</h3>
<a href="${prodUrl(p)}" target="_blank" rel="noopener" class="pc-btn"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>CLICK HERE AND DOWNLOAD</a>
</div></div>`;
}

function tglW(btn){
  const t=btn.dataset.t;const added=W.toggle(t);
  document.querySelectorAll('.pc-h').forEach(b=>{if(b.dataset.t===t)b.classList.toggle('active',added)});
}

/* ── Drawer ───────────────────────────────────────────────── */
function openD(){const d=document.getElementById('drawer');if(!d)return;d.classList.add('open');document.body.style.overflow='hidden';renderD()}
function closeD(){const d=document.getElementById('drawer');if(!d)return;d.classList.remove('open');document.body.style.overflow=''}
function renderD(){
  const el=document.getElementById('dList');if(!el)return;
  const items=W.g();
  if(!items.length){el.innerHTML='<div class="d-empty"><span style="font-size:2.5rem">🌸</span><p>Your wishlist is empty.<br>Heart any design to save it.</p><p style="margin-top:.5rem;font-size:.85rem;color:var(--muted)">Ready to buy? Each design opens on Creative Fabrica.</p></div>';return}
  el.innerHTML=items.map(t=>{
    const p=P.find(x=>x[0]===t);
    return`<div class="d-item"><img src="${p?prodImg(p):''}" alt="" loading="lazy"><div class="d-info"><span class="d-title">${t}</span>${p?`<a href="${prodUrl(p)}" target="_blank" rel="noopener" class="d-link">Open →</a>`:''}</div><button class="d-rm" onclick="rmW('${t.replace(/'/g,"\\'")}')">✕</button></div>`;
  }).join('');
}
function rmW(t){W.rm(t);renderD();document.querySelectorAll('.pc-h').forEach(b=>{if(b.dataset.t===t)b.classList.remove('active')})}

/* ── Catalog ──────────────────────────────────────────────── */
let S={cat:'all',q:'',page:1,pp:24};

function filtered(){
  let l=[...P];
  if(S.cat!=='all')l=l.filter(p=>CN[p[3]]===S.cat);
  if(S.q){const q=S.q.toLowerCase();l=l.filter(p=>p[0].toLowerCase().includes(q))}
  return l;
}

function renderCat(){
  const grid=document.getElementById('grid'),info=document.getElementById('info');if(!grid)return;
  const f=filtered(),total=f.length,pages=Math.ceil(total/S.pp)||1;
  if(S.page>pages)S.page=pages;
  const start=(S.page-1)*S.pp,slice=f.slice(start,start+S.pp);
  grid.innerHTML=slice.length?slice.map((p,i)=>card(p,i)).join(''):'<p class="no-res">🌸 No designs found. Try a different search or category.</p>';
  if(info)info.textContent=`Showing ${start+1}–${Math.min(start+S.pp,total)} of ${total}`;
  renderPag(pages);updCC();
}

function renderPag(pages){
  const w=document.getElementById('pag');if(!w)return;
  if(pages<=1){w.innerHTML='';return}
  let h=`<button class="pg ${S.page===1?'dis':''}" onclick="goP(${S.page-1})">‹</button>`;
  const r=[];for(let i=1;i<=pages;i++){if(i===1||i===pages||Math.abs(i-S.page)<=2)r.push(i)}
  let prev=0;r.forEach(i=>{if(prev&&i-prev>1)h+='<span class="pg-dot">…</span>';h+=`<button class="pg ${S.page===i?'act':''}" onclick="goP(${i})">${i}</button>`;prev=i});
  h+=`<button class="pg ${S.page===pages?'dis':''}" onclick="goP(${S.page+1})">›</button>`;
  w.innerHTML=h;
}

function goP(n){const pages=Math.ceil(filtered().length/S.pp)||1;if(n<1||n>pages)return;S.page=n;renderCat();document.getElementById('grid')?.scrollIntoView({behavior:'smooth',block:'start'})}

function setCat(c){
  S.cat=c;S.page=1;renderCat();
  document.querySelectorAll('.cl').forEach(el=>el.classList.toggle('act',el.dataset.cat===c));
  document.querySelector('.sidebar')?.classList.remove('mob-open');
  document.getElementById('sidebarOverlay')?.classList.remove('show');
}

function updCC(){
  CATS.forEach(c=>{const n=P.filter(p=>CN[p[3]]===c.id).length;document.querySelectorAll(`.cc[data-cat="${c.id}"]`).forEach(e=>e.textContent=n)});
  document.querySelectorAll('.cc[data-cat="all"]').forEach(e=>e.textContent=P.length);
}

/* ── Search ───────────────────────────────────────────────── */
function initSearch(){
  const inp=document.getElementById('searchInput');
  if(inp){let t;inp.addEventListener('input',()=>{clearTimeout(t);t=setTimeout(()=>{S.q=inp.value.trim();S.page=1;renderCat()},250)})}
  const mi=document.getElementById('msi');
  if(mi){let t2;mi.addEventListener('input',()=>{clearTimeout(t2);t2=setTimeout(()=>{
    const q=mi.value.trim().toLowerCase();
    const res=q?P.filter(p=>p[0].toLowerCase().includes(q)).slice(0,12):[];
    const wr=document.getElementById('msr');if(!wr)return;
    wr.innerHTML=res.length?res.map((p,i)=>card(p,i)).join(''):(q?'<p class="no-res">No results found</p>':'');
  },250)})}
}
function openSr(){const m=document.getElementById('srModal');if(!m)return;m.classList.add('open');document.body.style.overflow='hidden';setTimeout(()=>document.getElementById('msi')?.focus(),100)}
function closeSr(){const m=document.getElementById('srModal');if(!m)return;m.classList.remove('open');document.body.style.overflow=''}

/* ── Carousel ─────────────────────────────────────────────── */
function initCarousel(){
  const t=document.getElementById('carousel');if(!t)return;
  const s=[...P].sort(()=>Math.random()-.5).slice(0,12);
  t.innerHTML=s.map((p,i)=>card(p,i)).join('');
  document.getElementById('carL')?.addEventListener('click',()=>t.scrollBy({left:-320,behavior:'smooth'}));
  document.getElementById('carR')?.addEventListener('click',()=>t.scrollBy({left:320,behavior:'smooth'}));
}

/* ── Gift guide featured products ─────────────────────────── */
function initGiftProducts(){
  const w=document.getElementById('giftProducts');if(!w)return;
  const s=[...P].sort(()=>Math.random()-.5).slice(0,8);
  w.innerHTML=s.map((p,i)=>card(p,i)).join('');
}

/* ── Quiz ─────────────────────────────────────────────────── */
let quiz={step:0,who:'',style:''};
function startQuiz(){quiz={step:1,who:'',style:''};renderQuiz()}
function quizPick(val){
  if(quiz.step===1){quiz.who=val;quiz.step=2;renderQuiz()}
  else if(quiz.step===2){quiz.style=val;quiz.step=3;renderQuiz()}
}
function renderQuiz(){
  const w=document.getElementById('quizBody');if(!w)return;
  if(quiz.step===1){
    w.innerHTML=`<h3>Who are you making this for?</h3><p class="quiz-step">Step 1 of 2</p>
    <div class="quiz-opts"><button onclick="quizPick('mom')">👩 Mom</button><button onclick="quizPick('grandma')">👵 Grandma</button><button onclick="quizPick('newmom')">👶 New Mom</button><button onclick="quizPick('pet')">🐾 Pet Mom</button></div>`;
  } else if(quiz.step===2){
    w.innerHTML=`<h3>What's her style?</h3><p class="quiz-step">Step 2 of 2</p>
    <div class="quiz-opts"><button onclick="quizPick('floral')">🌺 Floral & Elegant</button><button onclick="quizPick('funny')">😂 Funny & Relatable</button><button onclick="quizPick('modern')">✨ Modern & Minimal</button><button onclick="quizPick('watercolor')">🎨 Watercolor Art</button></div>`;
  } else if(quiz.step===3){
    // Map answers to category
    let cat='clipart';
    if(quiz.who==='grandma')cat='grandma';
    else if(quiz.who==='newmom')cat='kids';
    else if(quiz.who==='pet')cat='animals';
    else if(quiz.style==='floral')cat='floral';
    else if(quiz.style==='modern')cat='modern';
    else if(quiz.style==='watercolor')cat='watercolor';
    else if(quiz.style==='funny')cat='quotes';
    const results=P.filter(p=>CN[p[3]]===cat).sort(()=>Math.random()-.5).slice(0,4);
    w.innerHTML=`<h3>Perfect Picks for Her ✨</h3><p class="quiz-step">Based on your answers:</p>
    <div class="quiz-results">${results.map((p,i)=>card(p,i)).join('')}</div>
    <div class="quiz-actions"><button class="qbtn-sec" onclick="startQuiz()">Try Again</button>
    <a href="shop.html?cat=${cat}" class="qbtn-pri">See All ${cat} Designs ➜</a></div>`;
  }
}

/* ── Mobile helpers ───────────────────────────────────────── */
function toggleNav(){document.querySelector('.nav-links')?.classList.toggle('open')}
function toggleSB(){
  document.querySelector('.sidebar')?.classList.toggle('mob-open');
  document.getElementById('sidebarOverlay')?.classList.toggle('show');
}

/* ── Init ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded',()=>{
  W.badge();
  // Sticky header
  const hdr=document.querySelector('.hdr');
  if(hdr)window.addEventListener('scroll',()=>hdr.classList.toggle('scrolled',scrollY>50),{passive:true});
  // AOS
  const obs=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting){e.target.classList.add('vis');obs.unobserve(e.target)}})},{threshold:.12});
  document.querySelectorAll('.aos').forEach(el=>obs.observe(el));
  // Scroll top
  const tt=document.getElementById('toTop');
  if(tt){window.addEventListener('scroll',()=>tt.classList.toggle('show',scrollY>600),{passive:true});tt.onclick=()=>window.scrollTo({top:0,behavior:'smooth'})}
  // Mobile bottom bar
  const mm=document.getElementById('mobBar');
  if(mm)window.addEventListener('scroll',()=>mm.classList.toggle('show',scrollY>300),{passive:true});
  
  initSearch();
  initCarousel();
  initGiftProducts();
  // Catalog
  if(document.getElementById('grid')){
    const u=new URLSearchParams(location.search);
    const c=u.get('cat');
    if(c&&CATS.find(x=>x.id===c)){S.cat=c;document.querySelectorAll('.cl').forEach(el=>el.classList.toggle('act',el.dataset.cat===c))}
    renderCat();
  }
  // Drawer overlay
  document.getElementById('dOverlay')?.addEventListener('click',closeD);
  document.getElementById('srBg')?.addEventListener('click',closeSr);
  document.getElementById('sidebarOverlay')?.addEventListener('click',()=>{
    document.querySelector('.sidebar')?.classList.remove('mob-open');
    document.getElementById('sidebarOverlay')?.classList.remove('show');
  });
});
