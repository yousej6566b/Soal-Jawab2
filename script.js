/* =============================================
   سؤال وجواب - لعبة الأسئلة العائلية
   JavaScript - Premium Interactions & Animations
   ============================================= */

'use strict';

// =============================================
// 1. LOADING SCREEN
// =============================================
(function initLoadingScreen() {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingBar = document.getElementById('loading-bar');
  const pageContent = document.getElementById('page-content');

  if (!loadingScreen || !loadingBar || !pageContent) return;

  let progress = 0;
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      loadingBar.style.width = '100%';
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        pageContent.classList.add('visible');
        setTimeout(() => {
          loadingScreen.style.display = 'none';
        }, 800);
      }, 400);
    }
    loadingBar.style.width = Math.min(progress, 100) + '%';
  }, 150);
})();

// =============================================
// 2. PARTICLES BACKGROUND
// =============================================
(function initParticles() {
  const container = document.getElementById('particlesBg');
  if (!container) return;
  const count = window.innerWidth < 768 ? 15 : 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random() * 100 + '%';
    p.style.animationDuration = (Math.random() * 10 + 10) + 's';
    p.style.animationDelay = (Math.random() * 10) + 's';
    p.style.opacity = '0';
    container.appendChild(p);
  }
})();

// =============================================
// 3. BUTTON RIPPLE EFFECT
// =============================================
(function initRippleEffect() {
  document.addEventListener('click', function (e) {
    const button = e.target.closest('.btn');
    if (!button) return;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
    const existing = button.querySelector('.ripple');
    if (existing) existing.remove();
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
})();

// =============================================
// 4. HAMBURGER MENU
// =============================================
(function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;
  hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar')) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    }
  });
})();

// =============================================
// 5. SCROLL REVEAL
// =============================================
(function initScrollReveal() {
  const els = document.querySelectorAll('.reveal-bottom, .reveal-scale');
  if (!els.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        obs.unobserve(e.target);
      }
    });
  }, { rootMargin: '-60px', threshold: 0.08 });
  els.forEach(el => obs.observe(el));
})();

// =============================================
// 6. SMOOTH SCROLL ANCHORS
// =============================================
(function initSmoothScroll() {
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    e.preventDefault();
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.pageYOffset - 80,
      behavior: 'smooth'
    });
  });
})();

// =============================================
// 7. NAVBAR SCROLL EFFECT
// =============================================
(function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.pageYOffset > 50 ? '0 4px 24px rgba(0,0,0,0.15)' : 'none';
  }, { passive: true });
})();

// =============================================
// 8. BUTTON 3D TILT
// =============================================
(function initButtonAnimations() {
  const buttons = document.querySelectorAll('.btn-primary, .btn-secondary');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', function (e) {
      const r = this.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      this.style.transform = `perspective(800px) rotateX(${(y - 0.5) * -16}deg) rotateY(${(x - 0.5) * 16}deg) translateY(-4px)`;
    });
    btn.addEventListener('mouseleave', function () { this.style.transform = ''; });
  });
})();

// =============================================
// 9. PARALLAX
// =============================================
(function initParallax() {
  const section = document.getElementById('topSection');
  if (!section) return;
  window.addEventListener('scroll', () => {
    const s = window.pageYOffset;
    if (s <= section.offsetHeight) {
      section.style.backgroundPositionY = `-${s * 0.3}px`;
    }
  }, { passive: true });
})();

// =============================================
// 10. HERO ZOOM
// =============================================
(function initHeroZoom() {
  const showcase = document.querySelector('.hero-showcase');
  if (!showcase) return;
  showcase.addEventListener('mousemove', function (e) {
    const img = this.querySelector('.hero-img');
    if (!img) return;
    const r = this.getBoundingClientRect();
    img.style.transformOrigin = `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`;
  });
  showcase.addEventListener('mouseleave', function () {
    const img = this.querySelector('.hero-img');
    if (img) img.style.transformOrigin = 'center center';
  });
})();

// =============================================
// 11. BACK TO TOP
// =============================================
(function initBackToTop() {
  const footer = document.querySelector('.footer');
  if (!footer) return;
  const btn = document.createElement('button');
  btn.innerHTML = '↑';
  btn.setAttribute('aria-label', 'العودة للأعلى');
  btn.style.cssText = 'position:fixed;bottom:24px;left:24px;width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#6A3BFF,#8E44FF);color:white;font-size:20px;font-weight:700;border:none;cursor:pointer;box-shadow:0 4px 16px rgba(106,59,255,0.3);opacity:0;visibility:hidden;transform:translateY(20px);transition:all 0.3s ease;z-index:999';
  document.body.appendChild(btn);
  window.addEventListener('scroll', () => {
    const s = window.pageYOffset;
    btn.style.opacity = s > 600 ? '1' : '0';
    btn.style.visibility = s > 600 ? 'visible' : 'hidden';
    btn.style.transform = s > 600 ? 'translateY(0)' : 'translateY(20px)';
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// =============================================
// 12. MARKETPLACE ENGINE (Offers & New)
// =============================================
(function initMarketplace() {
  const offerBtn = document.getElementById('offerBtn');
  const newBtn = document.getElementById('newBtn');
  if (!offerBtn && !newBtn) return;

  // DOM refs
  const overlay = document.getElementById('mktOverlay');
  const container = document.getElementById('mktContainer');
  const closeBtn = document.getElementById('mktCloseBtn');
  const tabOffers = document.getElementById('mktTabOffers');
  const tabNew = document.getElementById('mktTabNew');
  const contentOffers = document.getElementById('mktOffers');
  const contentNew = document.getElementById('mktNew');
  const newGrid = document.getElementById('mktNewGrid');

  if (!overlay || !container) return;

  // ==================== DATA ====================
  const newReleases = [
    {
      img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-general-20.webp',
      title: 'تحدي رمضان',
      category: 'منوعات',
      date: 'رمضان ١٤٤٧ هـ',
      questions: '٨٠ سؤال',
      desc: 'باقة خاصة من الأسئلة الرمضانية الممتعة للعائلة'
    },
    {
      img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-kuwait-10.webp',
      title: 'أسئلة كويتية',
      category: 'الكويت',
      date: 'شوال ١٤٤٧ هـ',
      questions: '١٠٠ سؤال',
      desc: 'مجموعة جديدة من الأسئلة الخاصة بالكويت وتاريخها'
    },
    {
      img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-sports-17.webp',
      title: 'أساطير الرياضة',
      category: 'رياضة',
      date: 'محرم ١٤٤٨ هـ',
      questions: '٦٠ سؤال',
      desc: 'أسئلة عن أعظم الأساطير الرياضية في التاريخ'
    }
  ];

  // ==================== RENDER FUNCTIONS ====================
  function renderNewReleases() {
    newGrid.innerHTML = '';

    newReleases.forEach(item => {
      const el = document.createElement('div');
      el.className = 'mkt-new-card';
      el.innerHTML = `
        <div class="mkt-new-img-wrap">
          <img src="${item.img}" alt="${item.title}" class="mkt-new-img" loading="lazy">
          <div class="mkt-new-badge">🆕 جديد</div>
        </div>
        <div class="mkt-new-info">
          <h4 class="mkt-new-card-title">${item.title}</h4>
          <div class="mkt-new-meta">
            <span class="mkt-new-meta-item">📂 ${item.category}</span>
            <span class="mkt-new-meta-item">📅 ${item.date}</span>
            <span class="mkt-new-meta-item">❓ ${item.questions}</span>
          </div>
          <p class="mkt-new-desc">${item.desc}</p>
          <button class="mkt-new-btn">🎯 ابدأ الآن</button>
        </div>
      `;
      el.addEventListener('click', function (e) {
        if (e.target.closest('.mkt-new-btn')) {
          const btn = e.target.closest('.mkt-new-btn');
          if (btn.dataset.clicked === '1') return;
          btn.dataset.clicked = '1';
          const ripple = document.createElement('span');
          ripple.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.3);transform:scale(0);animation:rippleAnim 0.6s ease-out;pointer-events:none';
          const rect = btn.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          ripple.style.width = ripple.style.height = size + 'px';
          ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
          ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
          btn.style.position = 'relative';
          btn.style.overflow = 'hidden';
          btn.appendChild(ripple);
          setTimeout(() => ripple.remove(), 600);
          const origText = btn.textContent;
          btn.textContent = '✓ تم!';
          setTimeout(() => {
            btn.textContent = origText;
            btn.dataset.clicked = '0';
          }, 1000);
        }
      });
      newGrid.appendChild(el);
    });
  }

  // ==================== OPEN / CLOSE ====================
  function openMarketplace(tab) {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (tab === 'new') {
      tabNew.click();
    } else {
      tabOffers.click();
    }
  }

  function closeMarketplace() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // ==================== TAB SWITCHING ====================
  function switchTab(tab) {
    // Update tab buttons
    [tabOffers, tabNew].forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Show/hide content
    const isOffers = tab.dataset.tab === 'offers';
    contentOffers.style.display = isOffers ? 'block' : 'none';
    contentNew.style.display = isOffers ? 'none' : 'block';

    // Reset scroll
    const content = isOffers ? contentOffers : contentNew;
    content.scrollTop = 0;
  }

  // ==================== EVENT LISTENERS ====================
  // Offer button
  if (offerBtn) {
    offerBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openMarketplace('offers');
    });
  }

  // New button
  if (newBtn) {
    newBtn.addEventListener('click', function (e) {
      e.preventDefault();
      openMarketplace('new');
    });
  }

  // Close button
  closeBtn.addEventListener('click', closeMarketplace);

  // Close on overlay click
  overlay.addEventListener('click', function (e) {
    if (e.target === this) closeMarketplace();
  });

  // Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeMarketplace();
    }
  });

  // Tab switching
  tabOffers.addEventListener('click', function () { switchTab(this); });
  tabNew.addEventListener('click', function () { switchTab(this); });

  // ==================== MAINTENANCE BAR ====================
  let maintenanceProgress = 0;
  const maintenanceBar = document.getElementById('mktMaintenanceBar');
  if (maintenanceBar) {
    setInterval(() => {
      maintenanceProgress += Math.random() * 8 + 2;
      if (maintenanceProgress >= 92) {
        maintenanceProgress = 92 + Math.random() * 5;
        if (maintenanceProgress > 98) maintenanceProgress = 98;
      }
      maintenanceBar.style.width = Math.min(maintenanceProgress, 98) + '%';
    }, 1200);
  }

  // Maintenance close button
  const maintenanceClose = document.getElementById('mktMaintenanceClose');
  if (maintenanceClose) {
    maintenanceClose.addEventListener('click', closeMarketplace);
  }

  // ==================== INIT ====================
  // Initial render (only new releases, offers are in maintenance)
  renderNewReleases();

  // Animate new releases
  setTimeout(() => {
    const newCards = newGrid.querySelectorAll('.mkt-new-card');
    newCards.forEach((card, i) => {
      card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    });
  }, 100);
})();

// =============================================
// 13. AUTH SYSTEM (Firebase + Discord OAuth)
// =============================================
(function initAuthSystem() {
  const overlay = document.getElementById('authOverlay');
  const card = document.getElementById('authCard');
  const closeBtn = document.getElementById('authCloseBtn');
  const navLoginBtn = document.getElementById('navLoginBtn');
  const navLoginText = document.getElementById('navLoginText');

  if (!overlay || !navLoginBtn) return;

  // ==================== FIREBASE CONFIG (loaded from firebase-config.js) ====================
  const firebaseConfig = window.FIREBASE_CONFIG || null;
  const firebaseConfigured = window.FIREBASE_IS_CONFIGURED === true;
  const discordConfigured = window.DISCORD_IS_CONFIGURED === true;

  // Initialize Firebase
  let auth = null;
  let firebaseReady = false;

  if (typeof firebase !== 'undefined' && firebaseConfigured && firebaseConfig) {
    try {
      // Check if already initialized to avoid double-init
      if (!firebase.apps || !firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      auth = firebase.auth();
      firebaseReady = true;
      console.log('⚡ Firebase Auth initialized successfully');
    } catch (e) {
      console.warn('Firebase init failed:', e);
    }
  } else if (typeof firebase === 'undefined') {
    console.warn(
      '%c❌ Firebase SDK not loaded!\n%cCheck that index.html has the Firebase CDN scripts.',
      'color:#FF4444;font-size:14px;font-weight:bold',
      'color:#FFBF00;font-size:12px'
    );
  } else {
    console.warn(
      '%c⚠️ Firebase not configured!\n%cOpen firebase-config.js → replace placeholder values with your Firebase config.\nGet your config at: https://console.firebase.google.com',
      'color:#FFBF00;font-size:14px;font-weight:bold',
      'color:#8E44FF;font-size:12px'
    );
  }

  // ==================== LOADING STATE HELPER ====================
  function setButtonLoading(btn, isLoading, originalText) {
    if (isLoading) {
      btn.dataset.origText = btn.textContent;
      btn.disabled = true;
      btn.style.opacity = '0.7';
      btn.style.pointerEvents = 'none';
      // Use text-based spinner instead of SVG to avoid PNG issues
      btn.innerHTML = `<span style="display:inline-block;animation:authSpin 0.8s linear infinite;font-size:1.1em">⏳</span> جاري التحميل...`;
    } else {
      btn.disabled = false;
      btn.style.opacity = '1';
      btn.style.pointerEvents = '';
      btn.textContent = originalText || btn.dataset.origText || '';
    }
  }

  // ==================== DOM REFS ====================
  const tabLogin = document.getElementById('authTabLogin');
  const tabRegister = document.getElementById('authTabRegister');
  const formLogin = document.getElementById('authFormLogin');
  const formRegister = document.getElementById('authFormRegister');
  const formForgot = document.getElementById('authFormForgot');

  const googleBtn = document.getElementById('authGoogleBtn');
  const discordBtn = document.getElementById('authDiscordBtn');
  const loginSubmit = document.getElementById('authLoginSubmit');
  const registerSubmit = document.getElementById('authRegisterSubmit');
  const forgotSubmit = document.getElementById('authForgotSubmit');

  const switchToRegister = document.getElementById('authSwitchToRegister');
  const switchToLogin = document.getElementById('authSwitchToLogin');
  const backToLogin = document.getElementById('authBackToLogin');
  const forgotBtn = document.getElementById('authForgotBtn');

  const emailInput = document.getElementById('authEmail');
  const passInput = document.getElementById('authPassword');
  const regUserInput = document.getElementById('authUsername');
  const regEmailInput = document.getElementById('authRegEmail');
  const regPassInput = document.getElementById('authRegPassword');
  const regConfirmInput = document.getElementById('authRegConfirm');
  const forgotEmailInput = document.getElementById('authForgotEmail');

  // Password toggles
  document.querySelectorAll('.auth-password-toggle').forEach(btn => {
    btn.addEventListener('click', function () {
      const targetId = this.dataset.target;
      const target = targetId ? document.getElementById(targetId) : document.getElementById('authPassword');
      if (target) {
        target.type = target.type === 'password' ? 'text' : 'password';
      }
    });
  });

  // ==================== FORM SWITCHING ====================
  function showAuthForm(formToShow) {
    [formLogin, formRegister, formForgot].forEach(f => f.style.display = 'none');
    formToShow.style.display = 'block';
  }

  function switchAuthTab(tab) {
    [tabLogin, tabRegister].forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const isLogin = tab.dataset.auth === 'login';
    showAuthForm(isLogin ? formLogin : formRegister);
  }

  tabLogin.addEventListener('click', function () { switchAuthTab(this); });
  tabRegister.addEventListener('click', function () { switchAuthTab(this); });

  switchToRegister.addEventListener('click', function () { tabRegister.click(); });
  switchToLogin.addEventListener('click', function () { tabLogin.click(); });

  forgotBtn.addEventListener('click', function () { showAuthForm(formForgot); });
  backToLogin.addEventListener('click', function () { showAuthForm(formLogin); });

  // ==================== OPEN / CLOSE ====================
  function openAuth() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    showAuthForm(formLogin);
    tabLogin.classList.add('active');
    tabRegister.classList.remove('active');
  }

  function closeAuth() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Expose open/close globally so other parts of the app can use them
  window.openAuth = openAuth;
  window.closeAuth = closeAuth;

  navLoginBtn.addEventListener('click', openAuth);
  closeBtn.addEventListener('click', closeAuth);
  overlay.addEventListener('click', function (e) {
    if (e.target === this) closeAuth();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeAuth();
    }
  });

  // ==================== INPUT VALIDATION ====================
  function setInputError(input, hasError) {
    if (hasError) {
      input.classList.add('error');
    } else {
      input.classList.remove('error');
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showToast(message, type) {
    // Remove existing toast
    const old = document.querySelector('.auth-toast');
    if (old) old.remove();

    const toast = document.createElement('div');
    toast.className = 'auth-toast';
    toast.style.cssText = `
      position: fixed; top: 24px; left: 50%; transform: translateX(-50%);
      padding: 14px 28px; border-radius: 14px; font-family: 'Tajawal', sans-serif;
      font-size: 14px; font-weight: 700; z-index: 10001;
      background: ${type === 'error' ? 'rgba(255,68,68,0.9)' : 'rgba(76,175,80,0.9)'};
      color: white; box-shadow: 0 8px 32px rgba(0,0,0,0.3);
      backdrop-filter: blur(12px); animation: toastSlide 0.4s ease;
      direction: rtl; text-align: center;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(-20px)';
      toast.style.transition = 'all 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }

  // Inject toast animation
  const toastStyle = document.createElement('style');
  toastStyle.textContent = `@keyframes toastSlide { from { opacity: 0; transform: translateX(-50%) translateY(-20px); } to { opacity: 1; transform: translateX(-50%) translateY(0); } }`;
  document.head.appendChild(toastStyle);

  // ==================== GOOGLE SIGN-IN ====================
  function handleGoogleSignIn() {
    if (!firebaseReady || !auth) {
      showToast('⚠️ Firebase غير مهيأ', 'error');
      showToast('📋 افتح ملف firebase-config.js وضيف بيانات Firebase حقتك', 'error');
      return;
    }

    setButtonLoading(googleBtn, true);
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    auth.signInWithPopup(provider)
      .then(result => {
        const user = result.user;
        showToast(`✅ مرحباً ${user.displayName || 'أيها المستخدم'}!`, 'success');
        updateNavForUser(user);
        closeAuth();
      })
      .catch(error => {
        if (error.code === 'auth/popup-closed-by-user') {
          // User closed popup - just reset, no error
        } else if (error.code === 'auth/unauthorized-domain') {
          showToast('❌ هذا النطاق غير مسموح. أضف domain في Firebase Console', 'error');
        } else if (error.code === 'auth/operation-not-allowed') {
          showToast('❌ تفعيل Google Sign-In في Firebase Console أولاً', 'error');
        } else {
          showToast('❌ ' + friendlyFirebaseError(error), 'error');
        }
      })
      .finally(() => {
        setButtonLoading(googleBtn, false);
      });
  }

  googleBtn.addEventListener('click', handleGoogleSignIn);

  // ==================== DISCORD OAUTH ====================
  function handleDiscordSignIn() {
    const DISCORD_CLIENT_ID = window.DISCORD_CLIENT_ID || 'YOUR_DISCORD_CLIENT_ID';
    const REDIRECT_URI = window.location.href.split('?')[0].split('#')[0];

    if (!discordConfigured) {
      showToast('⚠️ Discord غير مهيأ', 'error');
      showToast('📋 افتح Discord Developer Portal وأضف Client ID في firebase-config.js', 'error');
      return;
    }

    setButtonLoading(discordBtn, true);

    const params = new URLSearchParams({
      client_id: DISCORD_CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      response_type: 'token',
      scope: 'identify email'
    });
    window.location.href = `https://discord.com/api/oauth2/authorize?${params}`;
  }

  discordBtn.addEventListener('click', handleDiscordSignIn);

  // ==================== HANDLE DISCORD OAUTH REDIRECT BACK ====================
  (function handleDiscordRedirect() {
    const hash = window.location.hash;
    if (hash && hash.includes('access_token')) {
      const params = new URLSearchParams(hash.substring(1));
      const token = params.get('access_token');

      if (token) {
        // Clean URL
        window.history.replaceState(null, '', window.location.pathname);

        fetch('https://discord.com/api/users/@me', {
          headers: { Authorization: `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(user => {
            // Create a user-like object
            const discordUser = {
              displayName: user.global_name || user.username,
              photoURL: `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`,
              email: user.email,
              uid: `discord_${user.id}`
            };
            showToast(`✅ مرحباً ${discordUser.displayName}!`, 'success');
            updateNavForUser(discordUser);
            closeAuth();
          })
          .catch(err => {
            console.error('Discord user fetch error:', err);
          });
      }
    }
  })();

  // ==================== FRIENDLY FIREBASE ERRORS ====================
  function friendlyFirebaseError(error) {
    const messages = {
      'auth/user-not-found': 'لا يوجد حساب بهذا البريد الإلكتروني',
      'auth/wrong-password': 'كلمة المرور غير صحيحة، حاول مرة أخرى',
      'auth/invalid-email': 'البريد الإلكتروني غير صالح',
      'auth/invalid-credential': 'البريد الإلكتروني أو كلمة المرور غير صحيحة',
      'auth/email-already-in-use': 'هذا البريد الإلكتروني مسجل بالفعل',
      'auth/weak-password': 'كلمة المرور ضعيفة جداً (٦ أحرف أو أكثر)',
      'auth/too-many-requests': 'تم حظر تسجيل الدخول مؤقتاً، حاول لاحقاً',
      'auth/user-disabled': 'هذا الحساب تم تعطيله',
      'auth/operation-not-allowed': 'هذه الخاصية غير مفعلة في Firebase Console',
      'auth/network-request-failed': 'مشكلة في الاتصال بالإنترنت، تحقق من اتصالك',
      'auth/popup-blocked': 'تم حظر النافذة المنبثقة، اسمح للنوافذ المنبثقة وحاول مرة أخرى',
      'auth/unauthorized-domain': 'هذا النطاق غير مصرح به في Firebase Console'
    };
    return messages[error.code] || error.message || 'حدث خطأ غير متوقع';
  }

  // ==================== EMAIL/PASSWORD LOGIN ====================
  function handleEmailLogin(e) {
    e.preventDefault();

    const email = emailInput.value.trim();
    const pass = passInput.value;

    let hasError = false;
    setInputError(emailInput, false);
    setInputError(passInput, false);

    if (!email) { setInputError(emailInput, true); hasError = true; }
    if (!validateEmail(email)) { setInputError(emailInput, true); hasError = true; }
    if (!pass || pass.length < 6) { setInputError(passInput, true); hasError = true; }

    if (hasError) {
      showToast('❌ يرجى تعبئة الحقول بشكل صحيح', 'error');
      return;
    }

    if (!firebaseReady || !auth) {
      showToast('⚠️ Firebase غير مهيأ', 'error');
      showToast('📋 افتح firebase-config.js وضيف بيانات Firebase', 'error');
      return;
    }

    // Show loading state
    const origText = loginSubmit.textContent;
    setButtonLoading(loginSubmit, true, origText);

    auth.signInWithEmailAndPassword(email, pass)
      .then(result => {
        showToast(`✅ مرحباً بعودتك ${result.user.displayName || 'أيها المستخدم'}!`, 'success');
        updateNavForUser(result.user);
        closeAuth();
      })
      .catch(error => {
        showToast('❌ ' + friendlyFirebaseError(error), 'error');
      })
      .finally(() => {
        setButtonLoading(loginSubmit, false, origText);
      });
  }

  loginSubmit.addEventListener('click', handleEmailLogin);
  passInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') loginSubmit.click();
  });

  // ==================== EMAIL REGISTER ====================
  function handleRegister(e) {
    e.preventDefault();

    const username = regUserInput.value.trim();
    const email = regEmailInput.value.trim();
    const pass = regPassInput.value;
    const confirm = regConfirmInput.value;

    let hasError = false;
    [regUserInput, regEmailInput, regPassInput, regConfirmInput].forEach(i => setInputError(i, false));

    if (!username) { setInputError(regUserInput, true); hasError = true; }
    if (!email || !validateEmail(email)) { setInputError(regEmailInput, true); hasError = true; }
    if (!pass || pass.length < 6) { setInputError(regPassInput, true); hasError = true; }
    if (pass !== confirm) { setInputError(regConfirmInput, true); hasError = true; }

    if (hasError) {
      showToast(pass !== confirm ? '❌ كلمة المرور غير متطابقة' : '❌ يرجى تعبئة الحقول بشكل صحيح', 'error');
      return;
    }

    if (!firebaseReady || !auth) {
      showToast('⚠️ Firebase غير مهيأ', 'error');
      showToast('📋 افتح firebase-config.js وضيف بيانات Firebase', 'error');
      return;
    }

    const origText = registerSubmit.textContent;
    setButtonLoading(registerSubmit, true, origText);

    auth.createUserWithEmailAndPassword(email, pass)
      .then(result => {
        return result.user.updateProfile({ displayName: username });
      })
      .then(() => {
        showToast(`✅ مرحباً ${username}! تم إنشاء حسابك`, 'success');
        updateNavForUser(auth.currentUser);
        closeAuth();
      })
      .catch(error => {
        showToast('❌ ' + friendlyFirebaseError(error), 'error');
      })
      .finally(() => {
        setButtonLoading(registerSubmit, false, origText);
      });
  }

  registerSubmit.addEventListener('click', handleRegister);
  regConfirmInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') registerSubmit.click();
  });

  // ==================== FORGOT PASSWORD ====================
  function handleForgotPassword(e) {
    e.preventDefault();

    const email = forgotEmailInput.value.trim();

    setInputError(forgotEmailInput, false);
    if (!email || !validateEmail(email)) {
      setInputError(forgotEmailInput, true);
      showToast('❌ يرجى إدخال بريد إلكتروني صحيح', 'error');
      return;
    }

    if (!firebaseReady || !auth) {
      showToast('⚠️ Firebase غير مهيأ', 'error');
      showToast('📋 افتح firebase-config.js وضيف بيانات Firebase', 'error');
      return;
    }

    const origText = forgotSubmit.textContent;
    setButtonLoading(forgotSubmit, true, origText);

    auth.sendPasswordResetEmail(email)
      .then(() => {
        showToast('✅ تم إرسال رابط إعادة تعيين كلمة المرور! تحقق من بريدك', 'success');
        setTimeout(() => showAuthForm(formLogin), 1500);
      })
      .catch(error => {
        showToast('❌ ' + friendlyFirebaseError(error), 'error');
      })
      .finally(() => {
        setButtonLoading(forgotSubmit, false, origText);
      });
  }

  forgotSubmit.addEventListener('click', handleForgotPassword);
  forgotEmailInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') forgotSubmit.click();
  });

  // ==================== USER STATE & NAV UPDATE ====================
  function updateNavForUser(user) {
    // Persist Discord user to localStorage
    if (user && user.uid && user.uid.startsWith('discord_')) {
      localStorage.setItem('discord_user', JSON.stringify({
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        uid: user.uid
      }));
      discordUserData = user;
    } else if (!user) {
      localStorage.removeItem('discord_user');
      discordUserData = null;
    }

    if (!user) {
      // Logged out
      navLoginBtn.innerHTML = `<span class="nav-login-icon">👤</span><span class="nav-login-text" id="navLoginText">تسجيل الدخول</span>`;
      navLoginBtn.className = 'nav-login-btn';
      navLoginBtn.onclick = openAuth;
      return;
    }

    const photoURL = user.photoURL;
    const displayName = user.displayName || user.email || 'مستخدم';
    const initials = displayName.charAt(0).toUpperCase();

    // Replace login button with profile
    navLoginBtn.className = 'nav-user-profile';
    navLoginBtn.innerHTML = `
      <div class="nav-user-dropdown">
        <button class="nav-dropdown-item" id="navProfileView">👤 الملف الشخصي</button>
        <div class="nav-dropdown-divider"></div>
        <button class="nav-dropdown-item logout" id="navLogoutBtn">🚪 تسجيل الخروج</button>
      </div>
      ${photoURL
        ? `<img src="${photoURL}" alt="" class="nav-user-avatar" onerror="this.style.display='none'">`
        : `<div class="nav-user-avatar" style="background:linear-gradient(135deg,#6A3BFF,#8E44FF);display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:14px">${initials}</div>`
      }
      <span class="nav-user-name">${displayName}</span>
    `;
    navLoginBtn.onclick = null;

    // Wire all interactions via onclick (replaces previous handler, no accumulation)
    const currentDisplayName = displayName;
    navLoginBtn.onclick = function (e) {
      const dropdown = this.querySelector('.nav-user-dropdown');
      const logoutBtn = e.target.closest('#navLogoutBtn');
      const profileBtn = e.target.closest('#navProfileView');

      if (logoutBtn) {
        e.stopPropagation();
        if (auth && firebaseReady && user.uid && !user.uid.startsWith('discord_')) {
          auth.signOut();
        }
        updateNavForUser(null);
        showToast('👋 تم تسجيل الخروج', 'success');
      } else if (profileBtn) {
        e.stopPropagation();
        showToast('👤 ' + currentDisplayName, 'success');
      } else if (dropdown) {
        dropdown.classList.toggle('show');
        e.stopPropagation();
      }
    };

    // Close dropdown when clicking outside (use a single listener with flag)
    if (!window._dropdownListenerAdded) {
      window._dropdownListenerAdded = true;
      document.addEventListener('click', function () {
        document.querySelectorAll('.nav-user-dropdown.show').forEach(d => d.classList.remove('show'));
      });
    }
  }

  // ==================== CHECK EXISTING AUTH STATE ====================
  // Check localStorage for Discord user first (before Firebase)
  let discordUserData = null;
  try {
    const saved = localStorage.getItem('discord_user');
    if (saved) discordUserData = JSON.parse(saved);
  } catch (e) { /* ignore */ }

  // Show Discord user if present
  if (discordUserData) {
    updateNavForUser(discordUserData);
  }

  // Firebase auth state listener (only applies if Firebase is ready)
  if (firebaseReady && auth) {
    auth.onAuthStateChanged(user => {
      // Don't overwrite Discord user with null Firebase state
      if (user) {
        updateNavForUser(user);
      } else if (!discordUserData) {
        // Only clear nav if no Discord user is active
        updateNavForUser(null);
      }
    });
  }
})();

// =============================================
// 14. CURSOR GLOW
// =============================================
(function initCursorGlow() {
  if ('ontouchstart' in window) return;
  const section = document.getElementById('topSection');
  if (!section) return;
  const glow = document.createElement('div');
  glow.style.cssText = 'position:fixed;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(255,191,0,0.06) 0%,transparent 70%);pointer-events:none;z-index:1;transition:opacity 0.3s ease;opacity:0';
  document.body.appendChild(glow);
  let visible = false;
  new IntersectionObserver((e) => { visible = e[0].isIntersecting; glow.style.opacity = visible ? '1' : '0'; }, { threshold: 0 }).observe(section);
  document.addEventListener('mousemove', (e) => {
    if (!visible) return;
    requestAnimationFrame(() => { glow.style.left = (e.clientX - 150) + 'px'; glow.style.top = (e.clientY - 150) + 'px'; });
  });
})();

// =============================================
// 13. TEAM PICK + GAME SETUP + QUIZ ENGINE
// =============================================
(function initQuizGame() {
  const startBtn = document.getElementById('startGameBtn');
  if (!startBtn) return;

  // DOM refs
  const overlay = document.getElementById('gameOverlay');
  const container = document.getElementById('gameContainer');
  const teamPickScreen = document.getElementById('gameTeamPick');
  const gameSetupScreen = document.getElementById('gameSetup');
  const gameReady = document.getElementById('gameReady');
  const gamePlay = document.getElementById('gamePlay');
  const gameResults = document.getElementById('gameResults');
  const closeBtn = document.getElementById('gameCloseBtn');
  const playAgainBtn = document.getElementById('gamePlayAgainBtn');
  const backHomeBtn = document.getElementById('gameBackHomeBtn');

  // Game Ready DOM
  const grGameName = document.getElementById('grGameName');
  const grLeftName = document.getElementById('grLeftName');
  const grRightName = document.getElementById('grRightName');
  const grLeftCards = document.getElementById('grLeftCards');
  const grRightCards = document.getElementById('grRightCards');
  const grLeftPlayers = document.getElementById('grLeftPlayers');
  const grRightPlayers = document.getElementById('grRightPlayers');
  const grStartBtn = document.getElementById('grStartBtn');

  const questionText = document.getElementById('gameQuestionText');
  const answerBtns = document.querySelectorAll('.game-answer-btn');
  const progressText = document.getElementById('gameProgress');
  const progressBar = document.getElementById('gameProgressBar');
  const scoreNum = document.getElementById('gameScoreNum');
  const timerText = document.getElementById('gameTimerText');
  const timerCircle = document.getElementById('gameTimerCircle');
  const timerEl = document.getElementById('gameTimer');

  const resultsIcon = document.getElementById('gameResultsIcon');
  const resultsTitle = document.getElementById('gameResultsTitle');
  const resultsSubtitle = document.getElementById('gameResultsSubtitle');
  const resultsScore = document.getElementById('gameResultsScore');
  const resultsStars = document.getElementById('gameResultsStars');
  const resultsMessage = document.getElementById('gameResultsMessage');

  // ==================== TEAM PICK DOM ====================
  const cardsGrid = document.getElementById('tpCardsGrid');
  const team1Cards = document.getElementById('tpTeam1Cards');
  const team2Cards = document.getElementById('tpTeam2Cards');
  const team1Count = document.getElementById('tpTeam1Count');
  const team2Count = document.getElementById('tpTeam2Count');
  const team1Status = document.getElementById('tpTeam1Status');
  const team2Status = document.getElementById('tpTeam2Status');
  const confirmBtn = document.getElementById('tpConfirmBtn');
  const catBtns = document.querySelectorAll('.tp-cat-btn');

  // Setup DOM
  const setupGameName = document.getElementById('setupGameName');
  const setupTeam1Name = document.getElementById('setupTeam1Name');
  const setupTeam2Name = document.getElementById('setupTeam2Name');
  const setupTeam1Players = document.getElementById('setupTeam1Players');
  const setupTeam2Players = document.getElementById('setupTeam2Players');
  const setupStartBtn = document.getElementById('setupStartBtn');
  const setupTeam1Cards = document.getElementById('setupTeam1Cards');
  const setupTeam2Cards = document.getElementById('setupTeam2Cards');

  // ==================== CATEGORIES DATA ====================
  const categories = {
    football: {
      name: 'قسم الكورة',
      icon: '⚽',
      cards: [
        {      img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-football-1.png', title: 'منتخب' },
        { img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-football-2.webp', title: 'برشلونة' },
        { img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-football-3.webp', title: 'ريال مدريد' },
        { img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-football-4.webp', title: 'دوري الأبطال' }
      ]
    },
    sports: {
      name: 'الرياضات',
      icon: '🥊',
      cards: [
        {      img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-sports-1.webp', title: 'UFC' },
        { img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-sports-2.webp', title: 'كاراتيه' },
        { img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-sports-3.webp', title: 'ملاكمة' },
        { img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-sports-4.webp', title: 'مصارعة' }
      ]
    },
    entertainment: {
      name: 'الترفيه',
      icon: '🎬',
      cards: [
        {      img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-movies-1.webp', title: 'أفلام' },
        { img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-movies-2.webp', title: 'مسلسلات' },
        { img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-movies-3.webp', title: 'شخصيات' }
      ]
    },
    music: {
      name: 'الموسيقى',
      icon: '🎵',
      cards: [
        {      img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-music-1.webp', title: 'أغاني عربية' },
        { img: 'https://res.cloudinary.com/dydbennd/image/upload/f_webp/soal-jawab/cards/card-music-2.webp', title: 'أغاني خليجية' }
      ]
    }
  };

  // ==================== TEAM PICK STATE ====================
  let activeCategory = 'football';
  let selectedTeam = 1; // 1 or 2
  const team1Selected = [];
  const team2Selected = [];
  const MAX_CARDS = 3;

  // ==================== RENDER CATEGORY CARDS ====================
  function renderCategoryCards(catKey) {
    const cat = categories[catKey];
    if (!cat) return;
    activeCategory = catKey;
    cardsGrid.innerHTML = '';

    cat.cards.forEach((card, idx) => {
      const el = document.createElement('div');
      el.className = 'tp-card';
      el.dataset.catKey = catKey;
      el.dataset.cardIdx = idx;

      const imgSrc = card.img;
      el.innerHTML = `
        <div class="tp-card-img-wrap">
          <img src="${imgSrc}" alt="${card.title}" class="tp-card-img" loading="lazy" onerror="this.style.display='none'">
        </div>
        <div class="tp-card-title">${card.title}</div>
      `;

      el.addEventListener('click', function () {
        handleCardClick(catKey, idx, this);
      });

      cardsGrid.appendChild(el);
    });

    // Update selection states for visible cards
    updateCardStates();
  }

  // ==================== UPDATE CARD VISUAL STATES ====================
  function updateCardStates() {
    const allCards = cardsGrid.querySelectorAll('.tp-card');
    allCards.forEach(card => {
      const catKey = card.dataset.catKey;
      const idx = parseInt(card.dataset.cardIdx);
      card.className = 'tp-card';

      const inTeam1 = team1Selected.some(s => s.cat === catKey && s.idx === idx);
      const inTeam2 = team2Selected.some(s => s.cat === catKey && s.idx === idx);

      if (inTeam1) {
        card.classList.add('selected', 'team1-selected');
      } else if (inTeam2) {
        card.classList.add('selected', 'team2-selected');
      }

      // Check if card is used by the OTHER team or already maxed
      const currentTeam = selectedTeam;
      const currentTeamSelected = currentTeam === 1 ? team1Selected : team2Selected;
      const alreadyInOtherTeam = (currentTeam === 1 && inTeam2) || (currentTeam === 2 && inTeam1);
      const currentTeamFull = currentTeamSelected.length >= MAX_CARDS;

      if (alreadyInOtherTeam || (currentTeamFull && !inTeam1 && !inTeam2)) {
        card.classList.add('used');
      }
    });
  }

  // ==================== HANDLE CARD CLICK ====================
  function handleCardClick(catKey, idx, el) {
    const currentTeam = selectedTeam;
    const selected = currentTeam === 1 ? team1Selected : team2Selected;
    const otherTeam = currentTeam === 1 ? team2Selected : team1Selected;

    // Check if already selected by current team (deselect)
    const existingIdx = selected.findIndex(s => s.cat === catKey && s.idx === idx);
    if (existingIdx !== -1) {
      selected.splice(existingIdx, 1);
      updateTeamDisplay();
      updateCardStates();
      return;
    }

    // Check if in other team
    if (otherTeam.some(s => s.cat === catKey && s.idx === idx)) return;

    // Check if max
    if (selected.length >= MAX_CARDS) return;

    // Add selection
    selected.push({ cat: catKey, idx: idx, title: el.querySelector('.tp-card-title').textContent, img: categories[catKey].cards[idx].img });
    updateTeamDisplay();
    updateCardStates();
  }

  // ==================== UPDATE TEAM DISPLAY ====================
  function updateTeamDisplay() {
    // Team 1
    team1Cards.innerHTML = '';
    team1Selected.forEach(s => {
      const img = document.createElement('img');
      img.src = s.img;
      img.alt = s.title;
      img.className = 'tp-team-card-mini';
      team1Cards.appendChild(img);
    });
    if (team1Selected.length === 0) {
      team1Cards.innerHTML = '<div class="tp-team-empty">اختر ٣ بطاقات</div>';
    }
    team1Count.textContent = `${toArabicNum(team1Selected.length)}/${toArabicNum(MAX_CARDS)}`;
    team1Status.textContent = team1Selected.length >= MAX_CARDS ? '✓ اكتمل اختيار الفريق الأول' : '';

    // Team 2
    team2Cards.innerHTML = '';
    team2Selected.forEach(s => {
      const img = document.createElement('img');
      img.src = s.img;
      img.alt = s.title;
      img.className = 'tp-team-card-mini';
      team2Cards.appendChild(img);
    });
    if (team2Selected.length === 0) {
      team2Cards.innerHTML = '<div class="tp-team-empty">اختر ٣ بطاقات</div>';
    }
    team2Count.textContent = `${toArabicNum(team2Selected.length)}/${toArabicNum(MAX_CARDS)}`;
    team2Status.textContent = team2Selected.length >= MAX_CARDS ? '✓ اكتمل اختيار الفريق الثاني' : '';

    // Show confirm if both complete
    if (team1Selected.length >= MAX_CARDS && team2Selected.length >= MAX_CARDS) {
      confirmBtn.style.display = 'block';
    } else {
      confirmBtn.style.display = 'none';
    }

    // Switch team automatically if current is full
    if (selectedTeam === 1 && team1Selected.length >= MAX_CARDS && team2Selected.length < MAX_CARDS) {
      setActiveTeam(2);
    } else if (selectedTeam === 2 && team2Selected.length >= MAX_CARDS && team1Selected.length < MAX_CARDS) {
      setActiveTeam(1);
    }
  }

  // ==================== SET ACTIVE TEAM ====================
  function setActiveTeam(team) {
    selectedTeam = team;
    document.querySelectorAll('.tp-team-box').forEach(box => box.classList.remove('active-team'));
    const box = document.getElementById(`tpTeam${team}`);
    if (box) box.classList.add('active-team');
    updateCardStates();
  }

  // ==================== CATEGORY SWITCHING ====================
  function switchCategory(catKey) {
    catBtns.forEach(b => b.classList.remove('active'));
    const btn = document.querySelector(`.tp-cat-btn[data-tpcat="${catKey}"]`);
    if (btn) btn.classList.add('active');
    renderCategoryCards(catKey);

    // Animate cards
    const cards = cardsGrid.querySelectorAll('.tp-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(15px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, i * 60);
    });
  }

  // ==================== SHOW SETUP SCREEN ====================
  function showSetupScreen() {
    showScreen(gameSetupScreen);
    container.classList.add('team-mode');

    // Populate setup with selected cards
    setupTeam1Cards.innerHTML = '';
    team1Selected.forEach(s => {
      const img = document.createElement('img');
      img.src = s.img;
      img.className = 'setup-team-card-img';
      setupTeam1Cards.appendChild(img);
    });

    setupTeam2Cards.innerHTML = '';
    team2Selected.forEach(s => {
      const img = document.createElement('img');
      img.src = s.img;
      img.className = 'setup-team-card-img';
      setupTeam2Cards.appendChild(img);
    });
  }

  // ==================== QUESTIONS ====================
  const questions = [
    {
      question: 'ما عاصمة دولة الكويت؟',
      answers: ['الكويت', 'جدة', 'مسقط', 'المنامة'],
      correct: 0
    },
    {
      question: 'كم عدد سور القرآن الكريم؟',
      answers: ['١١٤', '١١٠', '١٢٠', '١٠٠'],
      correct: 0
    },
    {
      question: 'في أي سنة تم تحرير الكويت؟',
      answers: ['١٩٩٠', '١٩٩١', '١٩٩٢', '١٩٨٩'],
      correct: 1
    },
    {
      question: 'ما أكبر كوكب في المجموعة الشمسية؟',
      answers: ['زحل', 'المريخ', 'المشتري', 'الأرض'],
      correct: 2
    },
    {
      question: 'من هو مؤسس دولة الكويت الحديثة؟',
      answers: ['الشيخ عبدالله السالم', 'الشيخ مبارك الكبير', 'الشيخ صباح الأحمد', 'الشيخ جابر الأحمد'],
      correct: 0
    },
    {
      question: 'ما العملة الرسمية في الكويت؟',
      answers: ['الريال', 'الدينار', 'الجنيه', 'الدرهم'],
      correct: 1
    },
    {
      question: 'كم شهراً في السنة الهجرية؟',
      answers: ['١٢', '١٠', '٨', '١٤'],
      correct: 0
    },
    {
      question: 'ما لون العلم الكويتي؟',
      answers: ['أخضر وأبيض وأسود وأحمر', 'أخضر وأحمر وأصفر', 'أزرق وأبيض وأحمر', 'أسود وأبيض وأخضر'],
      correct: 0
    },
    {
      question: 'ما أشهر برج في الكويت؟',
      answers: ['برج خليفة', 'أبراج الكويت', 'برج المملكة', 'برج الساعة'],
      correct: 1
    },
    {
      question: 'في أي قارة تقع الكويت؟',
      answers: ['أوروبا', 'آسيا', 'أفريقيا', 'أستراليا'],
      correct: 1
    }
  ];

  // ==================== GAME STATE ====================
  let state = {
    current: 0,
    score: 0,
    timer: 15,
    timerInterval: null,
    isAnswering: false,
    totalQuestions: questions.length
  };

  // ==================== SHOW / HIDE ====================
  function showScreen(screen) {
    [teamPickScreen, gameSetupScreen, gameReady, gamePlay, gameResults].forEach(s => s.style.display = 'none');
    screen.style.display = 'block';
  }

  function openOverlay() {
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    showScreen(teamPickScreen);
    container.classList.add('team-mode');
    resetTeamPick();
  }

  function closeOverlay() {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    container.classList.remove('team-mode');
    clearInterval(state.timerInterval);
  }

  // ==================== ARABIC NUMBER HELPER ====================
  function toArabicNum(num) {
    const digits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
    return num.toString().replace(/\d/g, d => digits[parseInt(d, 10)]);
  }

  // ==================== TIMER ====================
  function startTimer() {
    state.timer = 15;
    timerText.textContent = '١٥';
    timerCircle.style.strokeDashoffset = '0';
    timerEl.classList.remove('warning');

    state.timerInterval = setInterval(() => {
      state.timer--;
      timerText.textContent = toArabicNum(state.timer);

      // Update ring
      const circumference = 163.36;
      const offset = circumference * (1 - state.timer / 15);
      timerCircle.style.strokeDashoffset = offset;

      // Warning
      if (state.timer <= 5) timerEl.classList.add('warning');

      if (state.timer <= 0) {
        clearInterval(state.timerInterval);
        handleTimeout();
      }
    }, 1000);
  }

  function stopTimer() {
    clearInterval(state.timerInterval);
  }

  // ==================== LOAD QUESTION ====================
  function loadQuestion() {
    if (state.current >= state.totalQuestions) {
      showResults();
      return;
    }

    const q = questions[state.current];
    questionText.textContent = q.question;
    progressText.textContent = `السؤال ${toArabicNum(state.current + 1)} من ${toArabicNum(state.totalQuestions)}`;
    progressBar.style.width = `${((state.current + 1) / state.totalQuestions) * 100}%`;
    scoreNum.textContent = toArabicNum(state.score);

    // Reset answers
    answerBtns.forEach((btn, i) => {
      btn.textContent = q.answers[i];
      btn.className = 'game-answer-btn';
      btn.disabled = false;
    });

    // Animate question in
    const area = document.querySelector('.game-question-area');
    area.style.animation = 'none';
    void area.offsetHeight;
    area.style.animation = 'questionFadeIn 0.4s ease';

    state.isAnswering = true;
    startTimer();
  }

  // ==================== HANDLE ANSWER ====================
  function handleAnswer(index) {
    if (!state.isAnswering) return;
    state.isAnswering = false;
    stopTimer();

    const q = questions[state.current];
    const correct = index === q.correct;

    // Disable all buttons
    answerBtns.forEach(btn => btn.disabled = true);

    // Show correct/wrong
    answerBtns[q.correct].classList.add('correct');
    if (!correct) {
      answerBtns[index].classList.add('wrong');
    } else {
      state.score++;
      scoreNum.textContent = toArabicNum(state.score);
    }

    // Next question after delay
    setTimeout(() => {
      state.current++;
      loadQuestion();
    }, 1200);
  }

  function handleTimeout() {
    state.isAnswering = false;
    const q = questions[state.current];
    answerBtns.forEach(btn => btn.disabled = true);
    answerBtns[q.correct].classList.add('correct');

    setTimeout(() => {
      state.current++;
      loadQuestion();
    }, 1500);
  }

  // ==================== RESULTS ====================
  function showResults() {
    showScreen(gameResults);
    const score = state.score;
    resultsScore.textContent = toArabicNum(score);

    if (score === state.totalQuestions) {
      resultsIcon.textContent = '👑';
      resultsTitle.textContent = 'أدييييت!';
      resultsSubtitle.textContent = 'علامة كاملة';
      resultsStars.textContent = '⭐⭐⭐⭐⭐';
      resultsMessage.textContent = 'أنت بطل! عندك ثقافة عامة رهيبة';
    } else if (score >= 7) {
      resultsIcon.textContent = '🏆';
      resultsTitle.textContent = 'أحسنت!';
      resultsSubtitle.textContent = 'نتيجة رائعة';
      resultsStars.textContent = '⭐⭐⭐⭐';
      resultsMessage.textContent = 'ممتاز! كمل التحدي';
    } else if (score >= 4) {
      resultsIcon.textContent = '👍';
      resultsTitle.textContent = 'كويس!';
      resultsSubtitle.textContent = 'نتيجة جيدة';
      resultsStars.textContent = '⭐⭐⭐';
      resultsMessage.textContent = 'تقدر تزود نتيجتك، جرب مرة ثانية';
    } else {
      resultsIcon.textContent = '💪';
      resultsTitle.textContent = 'عادي!';
      resultsSubtitle.textContent = 'البداية صعبة';
      resultsStars.textContent = '⭐⭐';
      resultsMessage.textContent = 'كل مرة بتتعلم أكثر، حاول مرة ثانية';
    }
  }

  // ==================== RESET GAME ====================
  function resetGame() {
    state.current = 0;
    state.score = 0;
    state.timer = 15;
    state.isAnswering = false;
    stopTimer();
    progressBar.style.width = '0%';
    scoreNum.textContent = '٠';
    timerText.textContent = '١٥';
    timerCircle.style.strokeDashoffset = '0';
    timerEl.classList.remove('warning');
    answerBtns.forEach(btn => { btn.className = 'game-answer-btn'; btn.disabled = false; });
  }

  // ==================== START GAME ====================
  function startGame() {
    resetGame();
    showScreen(gamePlay);
    loadQuestion();
  }

  // ==================== RESET TEAM PICK ====================
  function resetTeamPick() {
    team1Selected.length = 0;
    team2Selected.length = 0;
    selectedTeam = 1;
    confirmBtn.style.display = 'none';
    renderCategoryCards('football');
    updateTeamDisplay();

    catBtns.forEach(b => b.classList.remove('active'));
    const first = document.querySelector('.tp-cat-btn[data-tpcat="football"]');
    if (first) first.classList.add('active');

    // Reset setup fields
    setupGameName.value = '';
    setupTeam1Name.value = '';
    setupTeam2Name.value = '';
    setupTeam1Players.textContent = '1';
    setupTeam2Players.textContent = '1';
  }

  // ==================== EVENT LISTENERS ====================
  // Main start button (hero section) - redirect to gamecard.html
  startBtn.addEventListener('click', function () {
    // Check if user is logged in
    const navLoginBtn = document.getElementById('navLoginBtn');
    const isLoggedIn = navLoginBtn && navLoginBtn.classList.contains('nav-user-profile');
    if (!isLoggedIn) {
      if (typeof window.openAuth === 'function') {
        window.openAuth();
      }
      return;
    }
    // Redirect to standalone gamecard page
    window.location.href = 'gamecard.html';
  });
  startBtn.addEventListener('contextmenu', e => e.preventDefault());

  // Category tabs
  catBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      switchCategory(this.dataset.tpcat);
    });
  });

  // Confirm button → go to setup
  confirmBtn.addEventListener('click', function () {
    showSetupScreen();
  });

  // Setup counter buttons
  document.querySelectorAll('.setup-counter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const team = parseInt(this.dataset.team);
      const dir = this.dataset.dir;
      const el = document.getElementById(team === 1 ? 'setupTeam1Players' : 'setupTeam2Players');
      let val = parseInt(el.textContent);
      if (dir === 'plus' && val < 10) val++;
      if (dir === 'minus' && val > 1) val--;
      el.textContent = val;
    });
  });

  // Game Ready start button → begin quiz
  grStartBtn.addEventListener('click', function () {
    container.classList.remove('team-mode');
    startGame();
  });

  // Setup start button → go to game ready
  setupStartBtn.addEventListener('click', function () {
    // Populate Game Ready screen
    const gameName = setupGameName.value.trim() || 'لعبة جديدة';
    const t1 = setupTeam1Name.value.trim() || 'الفريق الأول';
    const t2 = setupTeam2Name.value.trim() || 'الفريق الثاني';

    grGameName.textContent = gameName;
    grLeftName.textContent = t1;
    grRightName.textContent = t2;

    const p1 = parseInt(setupTeam1Players.textContent);
    const p2 = parseInt(setupTeam2Players.textContent);
    grLeftPlayers.textContent = `${toArabicNum(p1)}/${toArabicNum(p1)} لاعبين`;
    grRightPlayers.textContent = `${toArabicNum(p2)}/${toArabicNum(p2)} لاعبين`;

    // Populate team cards in game ready
    grLeftCards.innerHTML = '';
    team1Selected.forEach(s => {
      const img = document.createElement('img');
      img.src = s.img;
      img.className = 'gr-vs-card-mini';
      grLeftCards.appendChild(img);
    });

    grRightCards.innerHTML = '';
    team2Selected.forEach(s => {
      const img = document.createElement('img');
      img.src = s.img;
      img.className = 'gr-vs-card-mini';
      grRightCards.appendChild(img);
    });

    // Show Game Ready screen
    showScreen(gameReady);
  });

  // Answer buttons
  answerBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const index = parseInt(this.dataset.index);
      handleAnswer(index);
    });
  });

  // Play again → restart from team pick
  playAgainBtn.addEventListener('click', function () {
    resetGame();
    openOverlay();
  });

  // Back home
  backHomeBtn.addEventListener('click', closeOverlay);

  // Close button
  closeBtn.addEventListener('click', closeOverlay);

  // Close on overlay click (outside container)
  overlay.addEventListener('click', function (e) {
    if (e.target === this) closeOverlay();
  });

  // Keyboard: Escape to close
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('open')) {
      closeOverlay();
    }
  });

  // ==================== INIT ====================
  // Initial render for team pick
  renderCategoryCards('football');
  updateTeamDisplay();
  catBtns.forEach(b => b.classList.remove('active'));
  const firstCat = document.querySelector('.tp-cat-btn[data-tpcat="football"]');
  if (firstCat) firstCat.classList.add('active');
})();
