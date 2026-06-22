/* ============================================
   KOKY NAILS v2 — App Logic
   ============================================ */

const WHATSAPP_NUMBER = "201000000000"; // ⚠️ غيّري الرقم ده برقمك (بصيغة دولية بدون + أو 00)

const SERVICES = [
  { name:"جل بناء كلاسيك", desc:"تركيب جل بناء بشكل طبيعي ومرتب، ثبات عالي.", price:"350", unit:"جنيه" },
  { name:"فرنش جل", desc:"اللمسة الكلاسيكية الأنيقة بخط فرنش دقيق.", price:"300", unit:"جنيه" },
  { name:"أكريليك + تصميم", desc:"تركيب أكريليك بالشكل والطول المطلوب مع تصميم.", price:"450", unit:"جنيه" },
  { name:"تصميم 3D فني", desc:"تفاصيل بارزة ثلاثية الأبعاد لتصميمات مميزة.", price:"120", unit:"جنيه / ضافر" },
  { name:"أومبريه / دقرادي", desc:"تدرج لوني ناعم بين درجتين أو أكتر.", price:"380", unit:"جنيه" },
  { name:"كروم ميتاليك", desc:"تشطيب عاكس بلمعة معدنية فاخرة.", price:"400", unit:"جنيه" },
  { name:"كرستالات وحجارة", desc:"إضافة كرستالات لامعة لمناسباتك.", price:"50", unit:"جنيه / حجر" },
  { name:"مانيكير + عناية", desc:"تنظيف، تقليم، وعناية كاملة بالضوافر.", price:"180", unit:"جنيه" },
  { name:"إزالة الطلاء القديم", desc:"إزالة جل أو أكريليك قديم بأمان.", price:"100", unit:"جنيه" }
];

function buildWhatsAppLink(service){
  const text = service
    ? `أهلاً كوكي نيلز ✨\nعايزة أحجز: ${service.name}\nالسعر: ${service.price} ${service.unit}\nمستنية ردكم لتأكيد الميعاد 🌸`
    : `أهلاً كوكي نيلز ✨\nعايزة أحجز معاد، ممكن تساعدوني أختار الخدمة المناسبة؟ 🌸`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

function renderServices(){
  const list = document.getElementById('servicesList');
  if(!list) return;
  list.innerHTML = SERVICES.map((s, i) => `
    <a href="${buildWhatsAppLink(s)}" target="_blank" rel="noopener" class="service-row reveal" style="transition-delay:${(i % 6) * 0.05}s">
      <div class="service-info">
        <span class="service-name">${s.name}</span>
        <span class="service-desc">${s.desc}</span>
      </div>
      <div class="service-right">
        <span class="service-price">${s.price} <small>${s.unit}</small></span>
        <span class="service-arrow">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M5 19L19 5M19 5H8M19 5V16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </div>
    </a>
  `).join('');
}

function wireBookingLinks(){
  const mainBtn = document.getElementById('bookingMainBtn');
  if(mainBtn) mainBtn.href = buildWhatsAppLink(null);
  const floatBtn = document.getElementById('floatWhatsapp');
  if(floatBtn) floatBtn.href = buildWhatsAppLink(null);
  const phoneDisplay = document.getElementById('phoneDisplay');
  if(phoneDisplay && WHATSAPP_NUMBER !== "201000000000"){
    phoneDisplay.textContent = "+" + WHATSAPP_NUMBER;
  }
}

/* ---- Loader ---- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 500);
});

/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
function onScroll(){
  if(window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll, { passive:true });

/* ---- Mobile menu ---- */
const navBurger = document.getElementById('navBurger');
const mobileMenu = document.getElementById('mobileMenu');
navBurger.addEventListener('click', () => {
  navBurger.classList.toggle('active');
  mobileMenu.classList.toggle('open');
});
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navBurger.classList.remove('active');
    mobileMenu.classList.remove('open');
  });
});

/* ---- Scroll reveal ---- */
function setupReveal(){
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}
function tagRevealTargets(){
  const selectors = [
    '.about-media', '.about-content > *',
    '.intro-strip p'
  ];
  document.querySelectorAll(selectors.join(',')).forEach((el, i) => {
    if(!el.classList.contains('reveal')){
      el.classList.add('reveal');
      el.style.transitionDelay = `${(i % 5) * 0.07}s`;
    }
  });
}

/* ---- Animated counters ---- */
function setupCounters(){
  const counters = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  counters.forEach(c => observer.observe(c));
}
function animateCount(el){
  const target = parseInt(el.dataset.count, 10);
  const duration = 1300;
  const start = performance.now();
  function tick(now){
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if(progress < 1) requestAnimationFrame(tick);
    else el.textContent = target + '+';
  }
  requestAnimationFrame(tick);
}

/* ---- Drag-to-scroll gallery (mouse + touch) ---- */
function setupDragGallery(){
  const wrap = document.querySelector('.dg-track-wrap');
  const track = document.getElementById('dgTrack');
  if(!wrap || !track) return;

  let isDown = false;
  let startX = 0;
  let scrollStart = 0;
  let currentTranslate = 0;
  let maxTranslate = 0;

  function calcMax(){
    maxTranslate = Math.max(0, track.scrollWidth - wrap.clientWidth);
  }
  calcMax();
  window.addEventListener('resize', calcMax);

  function setTranslate(x){
    currentTranslate = Math.min(Math.max(x, -maxTranslate), 0);
    track.style.transform = `translateX(${currentTranslate}px)`;
  }

  function pointerDown(x){
    isDown = true;
    startX = x;
    scrollStart = currentTranslate;
    wrap.classList.add('dragging');
  }
  function pointerMove(x){
    if(!isDown) return;
    const delta = x - startX;
    setTranslate(scrollStart + delta);
  }
  function pointerUp(){
    isDown = false;
    wrap.classList.remove('dragging');
  }

  // Mouse events
  wrap.addEventListener('mousedown', (e) => { pointerDown(e.clientX); e.preventDefault(); });
  window.addEventListener('mousemove', (e) => pointerMove(e.clientX));
  window.addEventListener('mouseup', pointerUp);

  // Touch events
  wrap.addEventListener('touchstart', (e) => pointerDown(e.touches[0].clientX), { passive:true });
  wrap.addEventListener('touchmove', (e) => pointerMove(e.touches[0].clientX), { passive:true });
  wrap.addEventListener('touchend', pointerUp);

  // Prevent image ghost-drag
  track.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => e.preventDefault());
  });

  // Wheel horizontal-ish support (shift+wheel or trackpad)
  wrap.addEventListener('wheel', (e) => {
    if(Math.abs(e.deltaX) > Math.abs(e.deltaY)){
      e.preventDefault();
      setTranslate(currentTranslate - e.deltaX);
    }
  }, { passive:false });
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderServices();
  wireBookingLinks();
  tagRevealTargets();
  setupReveal();
  setupCounters();
  setupDragGallery();
  onScroll();
});
