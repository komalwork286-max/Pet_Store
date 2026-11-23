/* =========================================================
   PawNest Pet Store – Demo Website by MiPetzy
   ---------------------------------------------------------
   STORE SETTINGS: change these for each client.
   Leave whatsapp / phone empty ('') to keep "demo mode":
   buttons then show a message instead of calling anyone.
   ========================================================= */
const STORE = {
  name: 'PawNest Pet Store',
  whatsapp: '',               // e.g. '919876543210' (country code + number, no + or spaces)
  phone: '',                  // e.g. '+919876543210'
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

const PRODUCTS = [
  { name: 'Royal Canin Maxi Adult 4kg', cat: 'dog', label: 'Dog Food', price: 3450, old: 3900, emoji: '🦴', bg: '#FFE3DA', tag: 'Bestseller', rating: 4.9, reviews: 128 },
  { name: 'Drools Puppy Starter 3kg', cat: 'dog', label: 'Dog Food', price: 1120, old: 1290, emoji: '🐶', bg: '#FFF1C9', tag: '-13%', tagClass: 'sale', rating: 4.8, reviews: 86 },
  { name: 'Whiskas Ocean Fish 1.2kg', cat: 'cat', label: 'Cat Food', price: 465, emoji: '🐟', bg: '#E1F1FF', tag: 'New', tagClass: 'new', rating: 4.7, reviews: 64 },
  { name: 'Me-O Creamy Kitten Treats', cat: 'cat', label: 'Cat Treats', price: 240, old: 280, emoji: '🐱', bg: '#ECE6FF', rating: 4.8, reviews: 52 },
  { name: 'Squeaky Rope Chew Toy', cat: 'toys', label: 'Toys', price: 299, emoji: '🧸', bg: '#DDF6EF', tag: 'Popular', rating: 4.6, reviews: 97 },
  { name: 'Tennis Ball Fetch Set (3 pcs)', cat: 'toys', label: 'Toys', price: 199, emoji: '🎾', bg: '#FFE3DA', rating: 4.5, reviews: 41 },
  { name: 'Himalaya Erina-EP Shampoo', cat: 'health', label: 'Grooming', price: 310, emoji: '🧴', bg: '#E1F1FF', rating: 4.8, reviews: 73 },
  { name: 'Tick & Flea Spot-On (3 pack)', cat: 'health', label: 'Healthcare', price: 650, old: 720, emoji: '💊', bg: '#FFF1C9', tag: '-10%', tagClass: 'sale', rating: 4.7, reviews: 58 },
];

const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const inr = n => '₹' + n.toLocaleString('en-IN');

/* ---------- Loader ---------- */
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => $('#loader').classList.add('hide'), 700);
});

/* ---------- Toast ---------- */
const toastEl = $('#toast');
let toastTimer;
function toast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
}

/* ---------- Contact actions (WhatsApp / Call / Directions) ---------- */
function openWhatsApp(text) {
  if (!STORE.whatsapp) {
    toast(`💬 Demo: this opens the store's WhatsApp chat${text ? ' with the product already typed in' : ''}.`);
    return;
  }
  const msg = text || `Hi ${STORE.name}! I have a query.`;
  window.open(`https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
}
function callStore() {
  if (!STORE.phone) { toast('📞 Demo: this calls the store directly in one tap.'); return; }
  location.href = `tel:${STORE.phone}`;
}
function openDirections() {
  window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(STORE.mapsQuery)}`, '_blank', 'noopener');
}
document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el) return;
  e.preventDefault();
  const action = el.dataset.action;
  if (action === 'whatsapp') openWhatsApp(el.dataset.msg);
  else if (action === 'call') callStore();
  else if (action === 'directions') openDirections();
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

  // Highlight current section in the menu
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

/* ---------- Products + filters ---------- */
const grid = $('#productGrid');
function renderProducts(filter = 'all') {
  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.cat === filter);
  grid.innerHTML = list.map((p, i) => `
    <article class="product-card" style="animation-delay:${i * 0.07}s">
      <div class="product-img" style="--pbg:${p.bg}">
        ${p.tag ? `<span class="tag ${p.tagClass || ''}">${p.tag}</span>` : ''}
        <button class="wish" aria-label="Add to wishlist">🤍</button>
        <span class="emoji">${p.emoji}</span>
      </div>
      <div class="product-body">
        <small>${p.label}</small>
        <h4>${p.name}</h4>
        <div class="rating">★★★★★ <span>${p.rating} (${p.reviews})</span></div>
        <div class="price-row">
          <div class="price">${inr(p.price)}${p.old ? `<del>${inr(p.old)}</del>` : ''}</div>
          <button class="enquire" data-action="whatsapp" data-msg="Hi! Is ${p.name} available? (${inr(p.price)})">💬 Enquire</button>
        </div>
      </div>
    </article>`).join('');
}
function setFilter(f) {
  $$('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.filter === f));
  renderProducts(f);
}
$$('.filter-btn').forEach(b => b.addEventListener('click', () => setFilter(b.dataset.filter)));
$$('.cat-card[data-filter]').forEach(c => c.addEventListener('click', () => {
  setFilter(c.dataset.filter);
  $('#shop').scrollIntoView({ behavior: 'smooth' });
}));
grid.addEventListener('click', e => {
  const btn = e.target.closest('.wish');
  if (!btn) return;
  const liked = btn.classList.toggle('liked');
  btn.textContent = liked ? '❤️' : '🤍';
  toast(liked ? '❤️ Added to your wishlist' : 'Removed from wishlist');
});
renderProducts();

/* ---------- Offer countdown (ends every Sunday night) ---------- */
function nextSundayEnd() {
  const d = new Date();
  d.setDate(d.getDate() + ((7 - d.getDay()) % 7));
  d.setHours(23, 59, 59, 0);
  if (d <= new Date()) d.setDate(d.getDate() + 7);
  return d;
}
let offerEnd = nextSundayEnd();
function updateCountdown() {
  let diff = offerEnd - new Date();
  if (diff <= 0) { offerEnd = nextSundayEnd(); diff = offerEnd - new Date(); }
  const pad = n => String(n).padStart(2, '0');
  $('#cdD').textContent = pad(Math.floor(diff / 864e5));
  $('#cdH').textContent = pad(Math.floor(diff / 36e5) % 24);
  $('#cdM').textContent = pad(Math.floor(diff / 6e4) % 60);
  $('#cdS').textContent = pad(Math.floor(diff / 1e3) % 60);
}
updateCountdown();
setInterval(updateCountdown, 1000);

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

/* ---------- FAQ accordion ---------- */
$$('.faq-item').forEach(item => {
  $('.faq-q', item).addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    $$('.faq-item').forEach(other => {
      other.classList.remove('open');
      $('.faq-a', other).style.maxHeight = null;
    });
    if (!isOpen) {
      item.classList.add('open');
      const answer = $('.faq-a', item);
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

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

/* ---------- MiPetzy "Notify me" form (demo only, nothing is saved) ---------- */
$('#notifyForm').addEventListener('submit', e => {
  e.preventDefault();
  const input = $('#notifyPhone');
  const digits = input.value.replace(/\D/g, '');
  if (digits.length < 10) {
    toast('📱 Please enter a valid 10-digit mobile number');
    input.focus();
    return;
  }
  input.value = '';
  toast(`🎉 Thanks! You'll be notified when ${STORE.name} goes live on MiPetzy.`);
});

/* ---------- Footer year ---------- */
$('#year').textContent = new Date().getFullYear();
