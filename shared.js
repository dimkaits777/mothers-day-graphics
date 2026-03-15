/* ============================================================
   Mother's Day Graphics – Shared JavaScript
   Wishlist, search, filtering, pagination, UI helpers
   ============================================================ */

/* ── Wishlist (localStorage) ─────────────────────────────── */
const Wishlist = {
  KEY: 'mdg_wishlist',
  _get()   { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch { return []; } },
  _set(arr){ localStorage.setItem(this.KEY, JSON.stringify(arr)); },
  has(title){ return this._get().includes(title); },
  toggle(title){
    const list = this._get();
    const idx  = list.indexOf(title);
    if (idx > -1) list.splice(idx, 1); else list.push(title);
    this._set(list);
    this.updateBadge();
    return idx === -1;               // true = added
  },
  all()    { return this._get(); },
  count()  { return this._get().length; },
  remove(title){ const l = this._get().filter(t=>t!==title); this._set(l); this.updateBadge(); },
  updateBadge(){
    document.querySelectorAll('.wish-count').forEach(el=>{
      const c = this.count();
      el.textContent = c;
      el.style.display = c ? 'flex' : 'none';
    });
  }
};

/* ── Drawer (wishlist side panel) ────────────────────────── */
function openDrawer(){
  const d = document.getElementById('wishDrawer');
  if (!d) return;
  d.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderDrawerItems();
}
function closeDrawer(){
  const d = document.getElementById('wishDrawer');
  if (!d) return;
  d.classList.remove('open');
  document.body.style.overflow = '';
}
function renderDrawerItems(){
  const list = document.getElementById('drawerList');
  if (!list) return;
  const items = Wishlist.all();
  if (!items.length){ list.innerHTML = '<p class="drawer-empty">Your wishlist is empty.<br>Tap the ♡ on any design to save it here.</p>'; return; }
  list.innerHTML = items.map(title=>{
    const p = PRODUCTS.find(x=>x.t===title);
    return `<div class="drawer-item">
      <img src="${p?p.i:''}'" alt="" loading="lazy">
      <div class="drawer-item-info">
        <span class="drawer-item-title">${title}</span>
        ${p?'<span class="drawer-item-price">'+p.price+'</span>':''}
      </div>
      <button class="drawer-remove" onclick="removeWish('${title.replace(/'/g,"\\'")}')">✕</button>
    </div>`;
  }).join('');
}
function removeWish(title){
  Wishlist.remove(title);
  renderDrawerItems();
  // refresh hearts on page
  document.querySelectorAll('.card-wish').forEach(btn=>{
    if(btn.dataset.title===title) btn.classList.remove('active');
  });
}

/* ── Product Card HTML ───────────────────────────────────── */
function productCard(p, idx){
  const hearted = Wishlist.has(p.t) ? 'active' : '';
  const formats = p.f.map(f=>`<span class="fmt-tag">${f}</span>`).join('');
  return `
  <div class="product-card" style="animation-delay:${idx*0.04}s">
    <div class="card-img-wrap">
      <img src="${p.i}" alt="${p.t}" loading="lazy">
      <button class="card-wish ${hearted}" data-title="${p.t}" onclick="toggleWish(this)" aria-label="Add to wishlist">
        <svg viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
      </button>
      <div class="card-badge">${p.price}</div>
    </div>
    <div class="card-body">
      <h3 class="card-title">${p.t}</h3>
      <div class="card-meta">
        <span class="card-downloads"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> ${p.dl.toLocaleString()}</span>
        <div class="card-formats">${formats}</div>
      </div>
      <a href="${p.a}" target="_blank" rel="noopener" class="card-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        CLICK HERE AND DOWNLOAD
      </a>
    </div>
  </div>`;
}

function toggleWish(btn){
  const title = btn.dataset.title;
  const added = Wishlist.toggle(title);
  btn.classList.toggle('active', added);
  // sync all same-title hearts on page
  document.querySelectorAll(`.card-wish[data-title="${title}"]`).forEach(b=>b.classList.toggle('active',added));
}

/* ── Catalog Engine ──────────────────────────────────────── */
let catalogState = {
  category: 'all',
  search: '',
  page: 1,
  perPage: 24
};

function getFilteredProducts(){
  let list = [...PRODUCTS];
  if(catalogState.category !== 'all'){
    list = list.filter(p=>p.c === catalogState.category);
  }
  if(catalogState.search){
    const q = catalogState.search.toLowerCase();
    list = list.filter(p=>p.t.toLowerCase().includes(q));
  }
  return list;
}

function renderCatalog(){
  const grid = document.getElementById('catalogGrid');
  const info = document.getElementById('catalogInfo');
  if(!grid) return;

  const filtered = getFilteredProducts();
  const total    = filtered.length;
  const pages    = Math.ceil(total / catalogState.perPage) || 1;
  if(catalogState.page > pages) catalogState.page = pages;

  const start = (catalogState.page - 1) * catalogState.perPage;
  const slice = filtered.slice(start, start + catalogState.perPage);

  grid.innerHTML = slice.length
    ? slice.map((p,i)=>productCard(p,i)).join('')
    : '<p class="no-results">No designs found. Try a different search or category.</p>';

  if(info) info.textContent = `Showing ${slice.length} of ${total} designs`;

  renderPagination(pages);
  updateCategoryCounts();
}

function renderPagination(pages){
  const wrap = document.getElementById('pagination');
  if(!wrap) return;
  if(pages <= 1){ wrap.innerHTML = ''; return; }
  let html = '';
  html += `<button class="page-btn ${catalogState.page===1?'disabled':''}" onclick="goPage(${catalogState.page-1})">‹</button>`;
  for(let i=1;i<=pages;i++){
    html += `<button class="page-btn ${catalogState.page===i?'active':''}" onclick="goPage(${i})">${i}</button>`;
  }
  html += `<button class="page-btn ${catalogState.page===pages?'disabled':''}" onclick="goPage(${catalogState.page+1})">›</button>`;
  wrap.innerHTML = html;
}

function goPage(n){
  const pages = Math.ceil(getFilteredProducts().length / catalogState.perPage) || 1;
  if(n<1||n>pages) return;
  catalogState.page = n;
  renderCatalog();
  document.getElementById('catalogGrid')?.scrollIntoView({behavior:'smooth', block:'start'});
}

function filterCategory(cat){
  catalogState.category = cat;
  catalogState.page = 1;
  renderCatalog();
  // highlight active cat in sidebar
  document.querySelectorAll('.cat-link').forEach(el=>{
    el.classList.toggle('active', el.dataset.cat === cat);
  });
}

function updateCategoryCounts(){
  CATEGORIES.forEach(cat=>{
    const count = PRODUCTS.filter(p=>p.c===cat.id).length;
    const el = document.querySelector(`.cat-count[data-cat="${cat.id}"]`);
    if(el) el.textContent = count;
  });
  const allEl = document.querySelector('.cat-count[data-cat="all"]');
  if(allEl) allEl.textContent = PRODUCTS.length;
}

/* ── Search ──────────────────────────────────────────────── */
function initSearch(){
  const input = document.getElementById('searchInput');
  if(!input) return;
  let timer;
  input.addEventListener('input', ()=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
      catalogState.search = input.value.trim();
      catalogState.page = 1;
      renderCatalog();
    }, 300);
  });
}

/* ── Popular carousel (index page) ───────────────────────── */
function renderPopular(){
  const wrap = document.getElementById('popularGrid');
  if(!wrap) return;
  // sort by downloads, pick top 8
  const top = [...PRODUCTS].sort((a,b)=>b.dl-a.dl).slice(0,8);
  wrap.innerHTML = top.map((p,i)=>productCard(p,i)).join('');
}

/* ── Mobile nav toggle ───────────────────────────────────── */
function toggleMobileNav(){
  document.querySelector('.nav-links')?.classList.toggle('open');
}

/* ── Scroll-based header ─────────────────────────────────── */
function initStickyHeader(){
  const header = document.querySelector('.site-header');
  if(!header) return;
  let last = 0;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    header.classList.toggle('scrolled', y > 60);
    last = y;
  }, {passive:true});
}

/* ── Animate on scroll ───────────────────────────────────── */
function initAOS(){
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.classList.add('aos-in');
        observer.unobserve(e.target);
      }
    });
  }, {threshold:0.15});
  document.querySelectorAll('.aos').forEach(el=>observer.observe(el));
}

/* ── Init ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', ()=>{
  Wishlist.updateBadge();
  initStickyHeader();
  initAOS();
  initSearch();

  // if catalog page
  if(document.getElementById('catalogGrid')){
    renderCatalog();
  }
  // if index page popular section
  if(document.getElementById('popularGrid')){
    renderPopular();
  }

  // drawer overlay close
  document.getElementById('drawerOverlay')?.addEventListener('click', closeDrawer);
});
