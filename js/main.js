/* =========================================================
   PawNest Pet Store – Demo Website by MiPetzy
   Marketing website only: no ordering, enquiry or sign-up.
   ---------------------------------------------------------
   STORE SETTINGS: change these for each client.
   ========================================================= */
const STORE = {
  name: 'PawNest Pet Store',
  mapsQuery: 'Pune, Maharashtra',
  // Opening hours: 0 = Sunday ... 6 = Saturday. Use null for a closed day.
  hours: {
    1: ['10:00', '21:30'],
    2: ['10:00', '21:30'],
    3: ['10:00', '21:30'],
    4: ['10:00', '21:30'],
    5: ['10:00', '21:30'],
    6: ['10:00', '21:30'],
    0: ['10:00', '14:00'],
  },
};

// Product showcase. For a real client, replace emoji with a real photo:
// add  photo: 'assets/products/royal-canin.jpg'  to a product.
const PRODUCTS = [
  { name: 'Royal Canin Maxi Adult', cat: 'dog', label: 'Dog Food', emoji: '🦴', bg: '#ECE9FF', tag: 'Bestseller' },
  { name: 'Drools Puppy Starter', cat: 'dog', label: 'Dog Food', emoji: '🐶', bg: '#FFF3DC', tag: 'Popular' },
  { name: 'Whiskas Ocean Fish', cat: 'cat', label: 'Cat Food', emoji: '🐟', bg: '#E1F1FF', tag: 'New', tagClass: 'new' },
  { name: 'Me-O Creamy Kitten Treats', cat: 'cat', label: 'Cat Treats', emoji: '🐱', bg: '#FFE0E8' },
  { name: 'Squeaky Rope Chew Toy', cat: 'toys', label: 'Toys', emoji: '🧸', bg: '#DDF6EF', tag: 'Popular' },
  { name: 'Tennis Ball Fetch Set', cat: 'toys', label: 'Toys', emoji: '🎾', bg: '#ECE9FF' },
  { name: 'Himalaya Erina-EP Shampoo', cat: 'health', label: 'Grooming', emoji: '🧴', bg: '#E1F1FF' },
  { name: 'Tick & Flea Spot-On', cat: 'health', label: 'Healthcare', emoji: '💊', bg: '#FFF3DC' },
];

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];

/* ---------- Loader ---------- */
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => $('#loader').classList.add('hide'), 700);
});

/* ---------- Directions ---------- */
document.addEventListener('click', e => {
  const el = e.target.closest('[data-action="directions"]');
  if (!el) return;
  e.preventDefault();
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE.mapsQuery)}`, '_blank', 'noopener');
});

/* ---------- Demo bar ---------- */
$('#demoClose').addEventListener('click', () => $('#demoBar').remove());

/* ---------- Navbar, progress bar, back-to-top ---------- */
const nav = $('#nav');
const progress = $('#progress');
const toTop = $('#toTop');
const navLinks = $('#navLinks');
const hamburger = $('#hamburger');

function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 30);
  toTop.classList.toggle('show', y > 600);
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';

  let current = 'home';
  $$('section[id]').forEach(sec => { if (y >= sec.offsetTop - 140) current = sec.id; });
  $$('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + current));
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
$$('.nav-links a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}));

/* ---------- Hero parallax ---------- */
const heroVisual = $('#heroVisual');
if (matchMedia('(hover: hover)').matches) {
  $('.hero').addEventListener('mousemove', e => {
    const r = heroVisual.getBoundingClientRect();
    const mx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const my = ((e.clientY - r.top) / r.height - 0.5) * 2;
    heroVisual.style.setProperty('--mx', Math.max(-1, Math.min(1, mx)).toFixed(3));
    heroVisual.style.setProperty('--my', Math.max(-1, Math.min(1, my)).toFixed(3));
  });
}

/* ---------- Counters ---------- */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const suffix = el.dataset.suffix || '';
  const duration = 1800;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(decimals);
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = (decimals ? target.toFixed(decimals) : target.toLocaleString('en-IN')) + suffix;
  }
  requestAnimationFrame(tick);
}

/* ---------- Scroll reveal ---------- */
const reveals = $$('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      $$('[data-count]', entry.target).forEach(animateCount);
      io.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => io.observe(el));
} else {
  reveals.forEach(el => el.classList.add('visible'));
  $$('[data-count]').forEach(animateCount);
}

/* ---------- Product showcase + filters ---------- */
const grid = $('#productGrid');
function renderProducts(filter = 'all') {
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  grid.innerHTML = list.map((p, i) => `
    <article class="product-card" style="animation-delay:${i * 0.07}s">
      <div class="product-img" style="--pbg:${p.bg}">
        ${p.tag ? `<span class="tag ${p.tagClass || ''}">${p.tag}</span>` : ''}
        ${p.photo ? `<img src="${p.photo}" alt="${p.name}" loading="lazy">` : `<span class="emoji">${p.emoji}</span>`}
      </div>
      <div class="product-body">
        <small>${p.label}</small>
        <h4>${p.name}</h4>
        <span class="in-store">✔ Available in store</span>
      </div>
    </article>`).join('');
}
$$('.filter-btn').forEach(b => b.addEventListener('click', () => {
  $$('.filter-btn').forEach(x => x.classList.toggle('active', x === b));
  renderProducts(b.dataset.filter);
}));
renderProducts();

/* ---------- Reviews slider ---------- */
const track = $('#reviewTrack');
const slides = $$('.review', track);
const dotsWrap = $('#reviewDots');
let slide = 0;
let autoTimer;
slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'dot';
  d.setAttribute('aria-label', `Show review ${i + 1}`);
  d.addEventListener('click', () => { goTo(i); restartAuto(); });
  dotsWrap.appendChild(d);
});
function goTo(i) {
  slide = (i + slides.length) % slides.length;
  track.style.transform = `translateX(-${slide * 100}%)`;
  $$('.dot', dotsWrap).forEach((d, j) => d.classList.toggle('active', j === slide));
}
function restartAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => goTo(slide + 1), 5000);
}
$('#prevReview').addEventListener('click', () => { goTo(slide - 1); restartAuto(); });
$('#nextReview').addEventListener('click', () => { goTo(slide + 1); restartAuto(); });
let touchX = null;
track.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 40) { goTo(slide + (dx < 0 ? 1 : -1)); restartAuto(); }
  touchX = null;
});
track.parentElement.addEventListener('mouseenter', () => clearInterval(autoTimer));
track.parentElement.addEventListener('mouseleave', restartAuto);
goTo(0);
restartAuto();

/* ---------- Opening hours + live open/closed status ---------- */
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const toMins = t => { const [h, m] = t.split(':').map(Number); return h * 60 + m; };
function fmtTime(t) {
  let [h, m] = t.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}${m ? ':' + String(m).padStart(2, '0') : ''} ${ampm}`;
}
function renderHours() {
  const today = new Date().getDay();
  $('#hoursList').innerHTML = [1, 2, 3, 4, 5, 6, 0].map(d => {
    const h = STORE.hours[d];
    return `<li class="${d === today ? 'today' : ''}"><span>${DAY_NAMES[d]}${d === today ? ' (Today)' : ''}</span><span>${h ? `${fmtTime(h[0])} – ${fmtTime(h[1])}` : 'Closed'}</span></li>`;
  }).join('');
}
function updateStatus() {
  const now = new Date();
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const h = STORE.hours[day];
  const statusEl = $('#openStatus');
  let text;
  if (h && mins >= toMins(h[0]) && mins < toMins(h[1])) {
    statusEl.className = 'status open';
    text = `Open now · closes at ${fmtTime(h[1])}`;
  } else {
    statusEl.className = 'status closed';
    if (h && mins < toMins(h[0])) {
      text = `Closed now · opens today at ${fmtTime(h[0])}`;
    } else {
      text = 'Closed now';
      for (let i = 1; i <= 7; i++) {
        const nd = (day + i) % 7;
        if (STORE.hours[nd]) {
          text += ` · opens ${i === 1 ? 'tomorrow' : DAY_NAMES[nd]} at ${fmtTime(STORE.hours[nd][0])}`;
          break;
        }
      }
    }
  }
  $('#openText').textContent = text;
}
renderHours();
updateStatus();
setInterval(updateStatus, 60000);

/* ---------- Footer year ---------- */
$('#year').textContent = new Date().getFullYear();
