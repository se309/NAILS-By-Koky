/* ============================================
   KOKY NAILS v4 — App Logic
   ============================================ */

const WHATSAPP_NUMBER = "201000000000"; // ⚠️ غيّري الرقم ده برقمك (بصيغة دولية بدون + أو 00)

/* All services — used for both Best Sellers carousel and full price list */
const SERVICES = [
  { id:"s1", name:"Gel Builder", nameAr:"جل بناء كلاسيك", desc:"تركيب جل بناء طبيعي ومرتب، ثبات عالي.", price:350, unit:"EGP", bestseller:true,
    img:"https://images.unsplash.com/photo-1604654894610-df63bc536371?q=80&w=700&auto=format&fit=crop" },
  { id:"s2", name:"French Tips", nameAr:"فرنش جل", desc:"اللمسة الكلاسيكية بخط فرنش دقيق.", price:300, unit:"EGP", bestseller:true,
    img:"https://images.unsplash.com/photo-1612887390768-fb02affea7a6?q=80&w=700&auto=format&fit=crop" },
  { id:"s3", name:"Acrylic + Art", nameAr:"أكريليك + تصميم", desc:"تركيب أكريليك بالشكل المطلوب مع تصميم.", price:450, unit:"EGP", bestseller:true,
    img:"https://images.unsplash.com/photo-1519014816548-bf5fe059798b?q=80&w=700&auto=format&fit=crop" },
  { id:"s4", name:"3D Nail Art", nameAr:"تصميم 3D فني", desc:"تفاصيل بارزة ثلاثية الأبعاد مميزة.", price:120, unit:"EGP/nail", bestseller:true,
    img:"https://images.unsplash.com/photo-1659391542239-9648f307c0b1?q=80&w=700&auto=format&fit=crop" },
  { id:"s5", name:"Ombre Fade", nameAr:"أومبريه / دقرادي", desc:"تدرج لوني ناعم بين درجتين أو أكتر.", price:380, unit:"EGP", bestseller:false,
    img:"https://images.unsplash.com/photo-1643648854897-7b5845b4c04c?q=80&w=700&auto=format&fit=crop" },
  { id:"s6", name:"Chrome Metallic", nameAr:"كروم ميتاليك", desc:"تشطيب عاكس بلمعة معدنية فاخرة.", price:400, unit:"EGP", bestseller:true,
    img:"https://images.unsplash.com/photo-1610992015836-7c249d75782d?q=80&w=700&auto=format&fit=crop" },
  { id:"s7", name:"Crystals & Gems", nameAr:"كرستالات وحجارة", desc:"إضافة كرستالات لامعة لمناسباتك.", price:50, unit:"EGP/gem", bestseller:false,
    img:"https://images.unsplash.com/photo-1630843599725-32ead7671867?q=80&w=700&auto=format&fit=crop" },
  { id:"s8", name:"Manicure + Care", nameAr:"مانيكير + عناية", desc:"تنظيف، تقليم، وعناية كاملة بالضوافر.", price:180, unit:"EGP", bestseller:false,
    img:"https://images.unsplash.com/photo-1607779097040-26e80aa78e66?q=80&w=700&auto=format&fit=crop" },
  { id:"s9", name:"Polish Removal", nameAr:"إزالة الطلاء القديم", desc:"إزالة جل أو أكريليك قديم بأمان.", price:100, unit:"EGP", bestseller:false,
    img:"https://images.unsplash.com/photo-1630843599725-32ead7671867?q=80&w=700&auto=format&fit=crop" }
];

const cart = new Set();

function buildWhatsAppLink(){
  let text;
  if(cart.size === 0){
    text = `أهلاً كوكي نيلز ✨\nعايزة أحجز معاد، ممكن تساعدوني أختار الخدمة المناسبة؟ 🌸`;
  } else {
    const items = SERVICES.filter(s => cart.has(s.id));
    const lines = items.map(s => `• ${s.nameAr} (${s.name}) — ${s.price} ${s.unit}`).join('\n');
    const total = items.reduce((sum, s) => sum + s.price, 0);
    text = `أهلاً كوكي نيلز ✨\nعايزة أحجز الخدمات الآتية:\n${lines}\n\nالإجمالي التقريبي: ${total} EGP\nمستنية ردكم لتأكيد الميعاد 🌸`;
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

/* ---- Render Best Sellers carousel ---- */
function renderBestSellers(){
  const track = document.getElementById('bsTrack');
  if(!track) return;
  const items = SERVICES.filter(s => s.bestseller);
  track.innerHTML = items.map(s => `
    <div class="bs-card" data-id="${s.id}">
      <div class="bs-media">
        <span class="bs-badge">Bestseller</span>
        <span class="bs-fav">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7.5-4.6-10-9.3C.5 8.2 2.2 4.8 5.6 4.1c2-.4 4 .5 5 2.2.9-1.7 3-2.6 5-2.2 3.4.7 5.1 4.1 3.6 7.6C19.5 16.4 12 21 12 21z"/></svg>
        </span>
        <img src="${s.img}" alt="${s.nameAr}" draggable="false">
      </div>
      <div class="bs-info">
        <p class="bs-name">${s.name}<small>${s.nameAr}</small></p>
        <div class="bs-bottom">
          <span class="bs-price">${s.price} ${s.unit}</span>
          <span class="bs-add">
            <svg class="icon-plus" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
            <svg class="icon-check" width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </span>
        </div>
      </div>
    </div>
  `).join('');

  track.querySelectorAll('.bs-card').forEach(card => {
    card.addEventListener('click', () => toggleService(card.dataset.id));
  });

  // dots
  const dotsWrap = document.getElementById('bsDots');
  if(dotsWrap){
    dotsWrap.innerHTML = items.map((_, i) => `<span class="${i===0?'active':''}"></span>`).join('');
  }
}

/* ---- Render full services grid ---- */
function renderServicesGrid(){
  const grid = document.getElementById('servicesGrid');
  if(!grid) return;
  grid.innerHTML = SERVICES.map((s, i) => `
    <div class="svc-row reveal" data-id="${s.id}" style="transition-delay:${(i % 4) * 0.05}s">
      <div class="svc-thumb"><img src="${s.img}" alt="${s.nameAr}"></div>
      <div class="svc-body">
        <p class="svc-name">${s.nameAr}</p>
        <p class="svc-desc">${s.desc}</p>
      </div>
      <div class="svc-right">
        <span class="svc-price">${s.price} ${s.unit}</span>
        <span class="svc-check">
          <svg class="icon-plus" width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>
          <svg class="icon-check" width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M4 12l5 5L20 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
        </span>
      </div>
    </div>
  `).join('');

  grid.querySelectorAll('.svc-row').forEach(row => {
    row.addEventListener('click', () => toggleService(row.dataset.id));
  });
}

function toggleService(id){
  if(cart.has(id)) cart.delete(id);
  else cart.add(id);

  // sync visuals across both bestseller cards and grid rows sharing the same id
  document.querySelectorAll(`[data-id="${id}"]`).forEach(el => {
    el.classList.toggle('selected', cart.has(id));
  });
  updateCartUI();
}

function updateCartUI(){
  const count = cart.size;
  const items = SERVICES.filter(s => cart.has(s.id));
  const total = items.reduce((sum, s) => sum + s.price, 0);

  const cartCount = document.getElementById('cartCount');
  if(cartCount){ cartCount.textContent = count; cartCount.classList.toggle('show', count > 0); }

  const cartBar = document.getElementById('cartBar');
  const cartBarCount = document.getElementById('cartBarCount');
  const cartBarTotal = document.getElementById('cartBarTotal');
  const cartBarBtn = document.getElementById('cartBarBtn');
  const floatBtn = document.getElementById('floatWhatsapp');
  const mainBtn = document.getElementById('bookingMainBtn');

  if(cartBar) cartBar.classList.toggle('show', count > 0);
  if(cartBarCount) cartBarCount.textContent = count;
  if(cartBarTotal) cartBarTotal.textContent = `${total} EGP`;
  if(cartBarBtn) cartBarBtn.href = buildWhatsAppLink();
  if(floatBtn){ floatBtn.classList.toggle('lifted', count > 0); floatBtn.href = buildWhatsAppLink(); }
  if(mainBtn) mainBtn.href = buildWhatsAppLink();
}

function wireBookingLinks(){
  updateCartUI();
  const phoneDisplay = document.getElementById('phoneDisplay');
  const footerPhone = document.getElementById('footerPhone');
  const footerWa = document.getElementById('footerWa');
  if(WHATSAPP_NUMBER !== "201000000000"){
    if(phoneDisplay) phoneDisplay.textContent = "+" + WHATSAPP_NUMBER;
    if(footerPhone) footerPhone.textContent = "+" + WHATSAPP_NUMBER;
  }
  if(footerWa) footerWa.href = `https://wa.me/${WHATSAPP_NUMBER}`;
}

function wireNavCart(){
  const navCartBtn = document.getElementById('navCartBtn');
  if(navCartBtn){
    navCartBtn.addEventListener('click', () => {
      document.getElementById('services').scrollIntoView({ behavior:'smooth' });
    });
  }
}

/* ---- Loader ---- */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => loader.classList.add('hidden'), 1400);
});

/* ---- Navbar scroll ---- */
const navbar = document.getElementById('navbar');
function onScroll(){
  if(window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
}
window.addEventListener('scroll', onScroll, { passive:true });

/* ---- Mobile menu ---- */
function setupMobileMenu(){
  const navBurger = document.getElementById('navBurger');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuVeil = document.getElementById('menuVeil');

  function openMenu(){
    navBurger.classList.add('active');
    mobileMenu.classList.add('open');
    menuVeil.classList.add('open');
    navbar.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu(){
    navBurger.classList.remove('active');
    mobileMenu.classList.remove('open');
    menuVeil.classList.remove('open');
    navbar.classList.remove('menu-open');
    document.body.style.overflow = '';
  }
  navBurger.addEventListener('click', () => {
    if(mobileMenu.classList.contains('open')) closeMenu();
    else openMenu();
  });
  menuVeil.addEventListener('click', closeMenu);
  mobileMenu.addEventListener('click', (e) => { if(e.target === mobileMenu) closeMenu(); });
  mobileMenu.querySelectorAll('[data-mm]').forEach(link => link.addEventListener('click', closeMenu));
}

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

/* ---- Animated counters ---- */
function setupCounters(){
  const counters = document.querySelectorAll('.stat-num');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ animateCount(entry.target); observer.unobserve(entry.target); }
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

/* ---- Hero: auto-sliding + draggable ---- */
function setupHeroSlider(){
  const hero = document.querySelector('.hero');
  const slides = document.querySelectorAll('.hero-slide');
  const dotsWrap = document.getElementById('heroDots');
  if(!hero || !slides.length) return;

  let current = 0;
  let autoTimer = null;
  let isAnimating = false;

  dotsWrap.innerHTML = Array.from(slides).map((_, i) => `<span class="${i===0?'active':''}"></span>`).join('');
  const dots = dotsWrap.querySelectorAll('span');

  function goTo(index){
    if(isAnimating) return;
    const newIndex = (index + slides.length) % slides.length;
    if(newIndex === current) return;
    isAnimating = true;

    const prevSlide = slides[current];
    const prevDot = dots[current];
    const nextSlide = slides[newIndex];
    const nextDot = dots[newIndex];

    // Restart the zoom animation cleanly on the incoming slide
    nextSlide.classList.remove('active');
    void nextSlide.offsetWidth; // force reflow
    nextSlide.classList.add('active');
    nextDot.classList.add('active');
    prevSlide.classList.remove('active');
    prevDot.classList.remove('active');

    current = newIndex;
    setTimeout(() => { isAnimating = false; }, 700);
  }
  function next(){ goTo(current + 1); }
  function prev(){ goTo(current - 1); }

  function startAuto(){
    stopAuto();
    autoTimer = setInterval(next, 5000);
  }
  function stopAuto(){ if(autoTimer){ clearInterval(autoTimer); autoTimer = null; } }

  dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); startAuto(); }));

  // Start the very first slide's zoom + auto rotation right away
  requestAnimationFrame(() => { startAuto(); });

  /* ---- Robust drag / swipe support (mouse + touch) ---- */
  let isPointerDown = false;
  let dragStartX = 0;
  let dragDeltaX = 0;
  let resumeTimer = null;

  function onDragStart(x){
    isPointerDown = true;
    dragStartX = x;
    dragDeltaX = 0;
    stopAuto();
    hero.classList.add('dragging');
  }
  function onDragMove(x){
    if(!isPointerDown) return;
    dragDeltaX = x - dragStartX;
  }
  function onDragEnd(){
    if(!isPointerDown) return;
    isPointerDown = false;
    hero.classList.remove('dragging');
    if(Math.abs(dragDeltaX) > 40){
      if(dragDeltaX < 0) next(); else prev();
    }
    dragDeltaX = 0;
    // Always resume auto-rotation after any interaction, even if it was just a tap
    clearTimeout(resumeTimer);
    resumeTimer = setTimeout(startAuto, 200);
  }

  hero.addEventListener('mousedown', (e) => { onDragStart(e.clientX); });
  window.addEventListener('mousemove', (e) => onDragMove(e.clientX));
  window.addEventListener('mouseup', () => onDragEnd());
  hero.addEventListener('mouseleave', () => { if(isPointerDown) onDragEnd(); });

  hero.addEventListener('touchstart', (e) => onDragStart(e.touches[0].clientX), { passive:true });
  hero.addEventListener('touchmove', (e) => onDragMove(e.touches[0].clientX), { passive:true });
  hero.addEventListener('touchend', () => onDragEnd(), { passive:true });
  hero.addEventListener('touchcancel', () => onDragEnd(), { passive:true });

  slides.forEach(slide => {
    const img = slide.querySelector('img');
    if(img) img.addEventListener('dragstart', (e) => e.preventDefault());
  });
}

/* ---- Best sellers drag carousel ---- */
function setupBsCarousel(){
  const wrap = document.getElementById('bsTrackWrap');
  const track = document.getElementById('bsTrack');
  const dotsWrap = document.getElementById('bsDots');
  const prevBtn = document.getElementById('bsPrev');
  const nextBtn = document.getElementById('bsNext');
  if(!wrap || !track) return;

  let cardEls = [];
  let currentIndex = 0;

  function refreshCards(){
    cardEls = Array.from(track.querySelectorAll('.bs-card'));
  }
  refreshCards();

  function cardCenter(card){
    return card.offsetLeft + card.offsetWidth / 2;
  }

  let isProgrammaticScroll = false;
  let programmaticScrollTimer = null;

  function scrollToIndex(index, smooth = true){
    if(!cardEls.length) return;
    currentIndex = Math.max(0, Math.min(cardEls.length - 1, index));
    const card = cardEls[currentIndex];
    isProgrammaticScroll = true;
    if(programmaticScrollTimer) clearTimeout(programmaticScrollTimer);
    card.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', inline: 'center', block: 'nearest' });
    updateActiveDot();
    // Smooth scroll typically settles within ~500ms; ignore scroll-driven detection until then
    programmaticScrollTimer = setTimeout(() => { isProgrammaticScroll = false; }, smooth ? 550 : 50);
  }

  function updateActiveDot(){
    if(!dotsWrap) return;
    const dots = dotsWrap.querySelectorAll('span');
    dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
  }

  // Detect which card is nearest to the visual center after any scroll (drag, snap, wheel)
  function detectCenterCard(){
    if(!cardEls.length || isProgrammaticScroll) return;
    const wrapCenter = wrap.scrollLeft + wrap.clientWidth / 2;
    let closestIdx = 0;
    let closestDist = Infinity;
    cardEls.forEach((card, i) => {
      const dist = Math.abs(cardCenter(card) - wrapCenter);
      if(dist < closestDist){ closestDist = dist; closestIdx = i; }
    });
    if(closestIdx !== currentIndex){
      currentIndex = closestIdx;
      updateActiveDot();
    }
  }

  let scrollTimer = null;
  wrap.addEventListener('scroll', () => {
    if(scrollTimer) clearTimeout(scrollTimer);
    scrollTimer = setTimeout(detectCenterCard, 90);
  }, { passive:true });

  if(prevBtn) prevBtn.addEventListener('click', () => scrollToIndex(currentIndex - 1));
  if(nextBtn) nextBtn.addEventListener('click', () => scrollToIndex(currentIndex + 1));
  if(dotsWrap){
    dotsWrap.addEventListener('click', (e) => {
      const dots = Array.from(dotsWrap.querySelectorAll('span'));
      const idx = dots.indexOf(e.target);
      if(idx !== -1) scrollToIndex(idx);
    });
  }

  // Drag-to-scroll: mouse (desktop) + touch (mobile).
  // We avoid relying on live scrollLeft reads during the gesture (unreliable across some
  // browser/embedding contexts in RTL pages) and instead track net drag distance, then
  // resolve to the correct neighboring card on release via scrollIntoView.
  let isDown = false, startX = 0, dragMoved = false, netDelta = 0;
  const SWIPE_THRESHOLD = 40;

  function dragStart(x){
    isDown = true; dragMoved = false; startX = x; netDelta = 0;
    wrap.classList.add('dragging');
  }
  function dragMove(x){
    if(!isDown) return;
    netDelta = x - startX;
    if(Math.abs(netDelta) > 4) dragMoved = true;
  }
  function dragEnd(){
    if(!isDown) return;
    isDown = false;
    wrap.classList.remove('dragging');
    if(Math.abs(netDelta) > SWIPE_THRESHOLD){
      // In this RTL layout, dragging left (negative delta) advances to the next card,
      // dragging right (positive delta) goes back — matching natural swipe direction.
      if(netDelta < 0) scrollToIndex(currentIndex + 1);
      else scrollToIndex(currentIndex - 1);
    } else {
      scrollToIndex(currentIndex);
    }
    netDelta = 0;
  }

  wrap.addEventListener('mousedown', (e) => dragStart(e.clientX));
  window.addEventListener('mousemove', (e) => dragMove(e.clientX));
  window.addEventListener('mouseup', dragEnd);

  wrap.addEventListener('touchstart', (e) => dragStart(e.touches[0].clientX), { passive:true });
  wrap.addEventListener('touchmove', (e) => dragMove(e.touches[0].clientX), { passive:true });
  wrap.addEventListener('touchend', dragEnd, { passive:true });
  wrap.addEventListener('touchcancel', dragEnd, { passive:true });

  // Prevent the click-to-select from firing right after a drag/swipe
  wrap.addEventListener('click', (e) => {
    if(dragMoved){ e.preventDefault(); e.stopPropagation(); dragMoved = false; }
  }, { capture:true });

  window.addEventListener('resize', () => { refreshCards(); scrollToIndex(currentIndex, false); });

  // Re-sync after images load (layout shift can throw off centering)
  track.querySelectorAll('img').forEach(img => {
    img.addEventListener('load', () => { refreshCards(); scrollToIndex(currentIndex, false); }, { once:true });
  });

  // Initial center on first card
  requestAnimationFrame(() => scrollToIndex(0, false));
}

/* ---- Init ---- */
document.addEventListener('DOMContentLoaded', () => {
  renderBestSellers();
  renderServicesGrid();
  wireBookingLinks();
  wireNavCart();
  setupMobileMenu();
  setupReveal();
  setupCounters();
  setupHeroSlider();
  setupBsCarousel();
  onScroll();
});
