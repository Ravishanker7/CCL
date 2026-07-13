// ── Navbar scroll ──
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  });

  // ── Scroll reveal ──
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Stagger children if applicable
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => observer.observe(el));

  // ── Layer animation ──
  const stack = document.getElementById('layerStack');
  if (stack) {
    const layersObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          setTimeout(() => stack.classList.add('layers-exploded'), 400);
        } else {
          stack.classList.remove('layers-exploded');
        }
      });
    }, { threshold: 0.4 });
    layersObserver.observe(stack);
  }

  function highlightLayer(n) {
    document.querySelectorAll('.layer-item').forEach(el => el.classList.remove('active'));
    const map = {1: 4, 2: 3, 3: 2, 4: 1, 5: 0};
    const items = document.querySelectorAll('.layer-item');
    if (items[map[n]]) items[map[n]].classList.add('active');
  }
  function resetLayers() {
    document.querySelectorAll('.layer-item').forEach((el, i) => {
      el.classList.toggle('active', i === 0);
    });
  }

  // ── FAQ accordion ──
  function toggleFaq(el) {
    const item = el.parentElement;
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  }

  // ── Counter animation ──
  function animateCounter(el) {
    const target = parseInt(el.dataset.target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = (current >= 1000 ? Math.round(current / 1000) + 'K+' : Math.round(current) + (target === 98 ? '%' : '+'));
      if (current >= target) clearInterval(timer);
    }, 16);
  }
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('[data-target]').forEach(animateCounter);
        statsObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) statsObserver.observe(statsSection);

  // ── Size selector functionality for product cards and best sellers ──
  (function initSizeSelector() {
    const sizeButtons = document.querySelectorAll('.best-card .size-option, .product-card .size-btn');
    sizeButtons.forEach(button => {
      button.addEventListener('click', function(e) {
        e.preventDefault();

        const card = this.closest('.best-card') || this.closest('.product-card');
        if (!card) return;

        const allButtons = card.querySelectorAll('.size-option, .size-btn');
        allButtons.forEach(btn => btn.classList.remove('active'));

        this.classList.add('active');

        const price = this.getAttribute('data-price');
        const priceDisplay = card.querySelector('.product-price');
        if (priceDisplay && price) {
          const formattedPrice = new Intl.NumberFormat('en-IN').format(price);
          priceDisplay.textContent = '₹' + formattedPrice;
          priceDisplay.setAttribute('data-display-price', price);
        }
      });
    });
  })();
