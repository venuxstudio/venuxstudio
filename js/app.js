/**
 * ============================================================================
 * VENUX STUDIO — APPLICATION CORE CONTROLLER (MULTI-PAGE & ZERO-BUILD ENGINE)
 * ============================================================================
 */

(function () {
  'use strict';

  const BRAND = window.VENUX_CONFIG || {};
  const PORTFOLIO = window.VENUX_PORTFOLIO || [];
  const PORTFOLIO_SECTIONS = window.VENUX_PORTFOLIO_SECTIONS || {};
  const VIBE_PROJECTS = window.VENUX_VIBE_PROJECTS || [];

  const state = {
    isNavOpen: false,
    navTimer: null,
    portfolioFilter: 'all',
    portfolioSearch: '',
    orbitRotation: 0,
    hoveredSlotIndex: null,
    lastFrameTime: performance.now(),
    // Cinematic Warp-Shuffle & Slow-Display Engine
    orbitSpeed: 0.10,
    orbitSlots: [],
    cycleTimer: 0,
    isWarping: false,
    hasSwappedInCurrentWarp: false,
    warpBlur: 0
  };

  // Initialize on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

  function initApp() {
    initBackgroundVideo();
    initBrandAssets();
    initCircularArcNav();
    initGlitchText();
    initOrbitShowcase();
    initPortfolioGrid();
    initVibeBuildsGrid();
    initContactForm();
    initModal();
  }

  // 1. VIDEO BACKGROUND INITIALIZATION (WITH FALLBACK & SPEED CONTROL)
  function initBackgroundVideo() {
    const videoEl = document.getElementById('site-bg-video');
    const bgContainer = document.getElementById('site-bg-container');
    
    if (videoEl && BRAND.bgVideoUrl) {
      videoEl.src = BRAND.bgVideoUrl;
      const speed = typeof BRAND.bgVideoPlaybackSpeed === 'number' ? BRAND.bgVideoPlaybackSpeed : 0.6;
      videoEl.playbackRate = speed;
      videoEl.addEventListener('loadedmetadata', function () {
        videoEl.playbackRate = speed;
      });
      videoEl.play().catch(function () {
        // Autoplay policy fallback: muted autoplay
        videoEl.muted = true;
        videoEl.play();
      });
    } else if (bgContainer && BRAND.bgImageUrl) {
      bgContainer.style.backgroundImage = 'url("' + BRAND.bgImageUrl + '")';
      bgContainer.style.backgroundSize = 'cover';
      bgContainer.style.backgroundPosition = 'center';
    }
  }

  // 2. BRAND ASSETS INITIALIZATION
  function initBrandAssets() {
    const headerLogo = document.getElementById('header-logo-img');
    if (headerLogo && BRAND.logoUrl) headerLogo.src = BRAND.logoUrl;

    const footerLogo = document.getElementById('footer-logo-img');
    if (footerLogo && BRAND.logoUrl) footerLogo.src = BRAND.logoUrl;

    const orbitIcon = document.getElementById('orbit-center-icon');
    if (orbitIcon && BRAND.centerIconUrl) orbitIcon.src = BRAND.centerIconUrl;

    const designerPhoto = document.getElementById('designer-photo-img');
    if (designerPhoto && BRAND.designerPhotoUrl) designerPhoto.src = BRAND.designerPhotoUrl;

    document.querySelectorAll('.dynamic-whatsapp-link').forEach(function (el) {
      if (BRAND.whatsappUrl) el.href = BRAND.whatsappUrl;
    });

    document.querySelectorAll('.dynamic-telegram-link').forEach(function (el) {
      if (BRAND.telegramUrl) el.href = BRAND.telegramUrl;
    });

    document.querySelectorAll('.dynamic-email-link').forEach(function (el) {
      if (BRAND.email) el.href = 'mailto:' + BRAND.email;
    });

    const pdfBtn = document.getElementById('pdf-portfolio-btn');
    if (pdfBtn && BRAND.pdfPortfolioUrl) pdfBtn.href = BRAND.pdfPortfolioUrl;
  }

  // 3. CIRCULAR ARC NAVIGATION (FIXED & FULLY VISIBLE)
  function initCircularArcNav() {
    const triggerBtn = document.getElementById('arc-nav-trigger');
    if (triggerBtn) {
      triggerBtn.addEventListener('click', function () {
        state.isNavOpen = !state.isNavOpen;
        updateNavDisplay();
        if (state.isNavOpen) startNavTimer();
      });
    }

    // Arc nodes distribution along semi-circle (Radius: 155px, Angles: -60 to +60)
    const navNodes = [
      { id: 'home', file: 'index.html', angle: -60 },
      { id: 'about', file: 'about.html', angle: -30 },
      { id: 'portfolio', file: 'portfolio.html', angle: 0 },
      { id: 'vibe-builds', file: 'vibe-builds.html', angle: 30 },
      { id: 'contact', file: 'contact.html', angle: 60 },
    ];

    const radius = 155;
    navNodes.forEach(function (node) {
      const el = document.getElementById('arc-node-' + node.id);
      if (el) {
        const rad = (node.angle * Math.PI) / 180;
        const nodeX = -Math.cos(rad) * radius;
        const nodeY = Math.sin(rad) * radius;
        el.style.left = nodeX + 'px';
        el.style.top = nodeY + 'px';
      }
    });

    // Detect current page to set active class
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    navNodes.forEach(function (node) {
      const isCurrent = currentPath === node.file || (currentPath === '' && node.file === 'index.html');
      const arcBtn = document.querySelector('#arc-node-' + node.id + ' .arc-node-btn');
      if (arcBtn && isCurrent) arcBtn.classList.add('active');

      const mobileBtn = document.querySelector('.mobile-dock-btn[data-file="' + node.file + '"]');
      if (mobileBtn && isCurrent) mobileBtn.classList.add('active');
    });
  }

  function updateNavDisplay() {
    const nodesGroup = document.getElementById('arc-nodes-group');
    const triggerText = document.getElementById('arc-trigger-text');

    if (nodesGroup) {
      if (state.isNavOpen) {
        nodesGroup.classList.remove('collapsed');
      } else {
        nodesGroup.classList.add('collapsed');
      }
    }

    if (triggerText) {
      triggerText.innerText = state.isNavOpen ? 'CLOSE' : 'MENU';
    }
  }

  function startNavTimer() {
    if (state.navTimer) clearTimeout(state.navTimer);
    state.navTimer = setTimeout(function () {
      state.isNavOpen = false;
      updateNavDisplay();
    }, 5000);
  }

  // 4. CINEMATIC WARP-SHUFFLE & SLOW-DISPLAY ORBIT ENGINE (HOME PAGE)
  function initOrbitShowcase() {
    const container = document.getElementById('orbit-cards-container');
    const showcaseWrapper = document.getElementById('orbit-showcase-wrapper');
    if (!container || !showcaseWrapper) return;

    const VISIBLE_SLOTS = 15;
    state.orbitSlots = [];

    // Initialize 15 active orbit slots
    for (let i = 0; i < VISIBLE_SLOTS; i++) {
      const dataIndex = i % PORTFOLIO.length;
      state.orbitSlots.push({
        slotIndex: i,
        dataIndex: dataIndex,
        item: PORTFOLIO[dataIndex]
      });
    }

    container.innerHTML = '';
    state.orbitSlots.forEach(function (slot) {
      const item = slot.item;
      const card = document.createElement('div');
      card.className = 'orbit-card';
      card.id = 'orbit-slot-' + slot.slotIndex;
      card.innerHTML =
        '<div style="position: relative; width: 100%; height: 100%; overflow: hidden;">' +
        '<img id="slot-img-' + slot.slotIndex + '" src="' +
        item.imageUrl +
        '" alt="' +
        item.title +
        '" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.95); transition: opacity 0.35s ease, filter 0.35s ease;" loading="eager" />' +
        '<div style="position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.25) 60%, transparent 100%);"></div>' +
        '<div style="position: absolute; bottom: 0; left: 0; right: 0; padding: 8px;">' +
        '<p id="slot-title-' + slot.slotIndex + '" style="font-family: var(--font-syne); font-size: 10px; font-weight: 700; color: #ffffff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px;">' +
        item.title +
        '</p>' +
        '<p id="slot-client-' + slot.slotIndex + '" style="font-family: var(--font-space); font-size: 8px; color: #a3a3a8; font-weight: 300;">' +
        item.client +
        '</p>' +
        '</div>' +
        '</div>';

      card.addEventListener('mouseenter', function () {
        state.hoveredSlotIndex = slot.slotIndex;
      });

      card.addEventListener('mouseleave', function () {
        state.hoveredSlotIndex = null;
      });

      card.addEventListener('click', function () {
        openProjectModal(slot.item);
      });

      container.appendChild(card);
    });

    state.cycleTimer = 0;
    state.lastFrameTime = performance.now();
    requestAnimationFrame(orbitAnimationTick);
  }

  // Shuffle 15 randomized distinct items from the 30-item library
  function shuffleOrbitArtworks() {
    if (!PORTFOLIO || PORTFOLIO.length === 0) return;
    
    // Create randomized copy of full 30 items
    const pool = PORTFOLIO.slice();
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = pool[i];
      pool[i] = pool[j];
      pool[j] = temp;
    }

    state.orbitSlots.forEach(function (slot, idx) {
      const newItem = pool[idx % pool.length];
      slot.item = newItem;

      const imgEl = document.getElementById('slot-img-' + slot.slotIndex);
      const titleEl = document.getElementById('slot-title-' + slot.slotIndex);
      const clientEl = document.getElementById('slot-client-' + slot.slotIndex);

      if (imgEl && imgEl.src !== newItem.imageUrl) {
        imgEl.style.opacity = '0.2';
        setTimeout(function () {
          imgEl.src = newItem.imageUrl;
          if (titleEl) titleEl.innerText = newItem.title;
          if (clientEl) clientEl.innerText = newItem.client;
          imgEl.style.opacity = '1';
        }, 180);
      }
    });
  }

  function orbitAnimationTick(now) {
    const container = document.getElementById('orbit-showcase-wrapper');
    if (container) {
      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || 560;

      const isMobile = width < 640;
      const isTablet = width >= 640 && width < 1024;

      const rawDelta = (now - state.lastFrameTime) / 1000;
      const delta = Math.min(Math.max(rawDelta, 0), 0.05);
      state.lastFrameTime = now;

      // ====================================================================
      // TIMELINE CYCLES: 7.5s DISPLAY (SLOW) -> 2.0s WARP SHUFFLE (FAST)
      // ====================================================================
      const DISPLAY_DURATION = 7500; // 7.5 seconds of slow, clear viewing
      const WARP_DURATION = 2000;    // 2.0 seconds of rapid speed-up & shuffle
      const TOTAL_CYCLE = DISPLAY_DURATION + WARP_DURATION;

      state.cycleTimer = (state.cycleTimer + delta * 1000) % TOTAL_CYCLE;

      let targetSpeed = 0.10;
      let warpFactor = 0; // 0 (slow display) to 1 (peak warp)
      let motionBlur = 0;
      let turbX = 0;
      let turbY = 0;

      if (state.cycleTimer >= DISPLAY_DURATION) {
        // --- WARP PHASE ---
        state.isWarping = true;
        const warpProgress = (state.cycleTimer - DISPLAY_DURATION) / WARP_DURATION; // 0 to 1
        
        // Bell-curve ease (rises fast to peak, then swiftly decelerates)
        warpFactor = Math.sin(warpProgress * Math.PI);
        
        // High speed peak during warp (~2.6 rad/sec)
        targetSpeed = 0.10 + 2.50 * Math.pow(warpFactor, 1.25);
        motionBlur = Math.pow(warpFactor, 1.2) * 5.5; // up to 5.5px motion streak

        // Surreal erratic harmonic displacement during warp
        turbY = Math.sin(now * 0.016) * (20 * warpFactor) + Math.cos(now * 0.009) * (10 * warpFactor);
        turbX = Math.cos(now * 0.014) * (14 * warpFactor);

        // Mid-warp shuffle trigger
        if (warpProgress >= 0.45 && !state.hasSwappedInCurrentWarp) {
          state.hasSwappedInCurrentWarp = true;
          shuffleOrbitArtworks();
        }
      } else {
        // --- SLOW DISPLAY PHASE ---
        state.isWarping = false;
        state.hasSwappedInCurrentWarp = false;
        warpFactor = 0;
        motionBlur = 0;
        turbX = 0;
        turbY = 0;

        // Hover pause/slowdown during display phase
        if (state.hoveredSlotIndex !== null) {
          targetSpeed = 0.02;
        } else {
          targetSpeed = 0.10;
        }
      }

      // Smooth lerp speed
      state.orbitSpeed += (targetSpeed - state.orbitSpeed) * (state.isWarping ? 0.18 : 0.08);
      state.orbitRotation = (state.orbitRotation + state.orbitSpeed * delta) % (Math.PI * 2);

      // Center with warp turbulence
      const centerX = width / 2 + turbX;
      const centerY = height / 2 + turbY;

      // Organic radial breathing wave
      const breathRadius = Math.sin(now * 0.001) * 12;
      const rx = (isMobile ? width * 0.40 : isTablet ? width * 0.36 : Math.min(width * 0.34, 460)) + breathRadius;
      const ry = (isMobile ? Math.max(height * 0.30, 160) : isTablet ? Math.max(height * 0.28, 200) : Math.min(height * 0.26, 230)) + breathRadius * 0.5;

      const totalSlots = state.orbitSlots.length || 15;
      const cardWidth = isMobile ? 120 : isTablet ? 150 : 175;
      const cardHeight = isMobile ? 80 : isTablet ? 100 : 115;

      state.orbitSlots.forEach(function (slot) {
        const card = document.getElementById('orbit-slot-' + slot.slotIndex);
        if (!card) return;

        const angle = state.orbitRotation + (slot.slotIndex * 2 * Math.PI) / totalSlots;

        // Individual Harmonic Floating Ribbon (Organic sine wave per card)
        const floatWave = Math.sin(now * 0.002 + slot.slotIndex * 0.75) * (isMobile ? 8 : 16);
        const lateralDrift = Math.cos(now * 0.0015 + slot.slotIndex * 0.55) * 6;

        const x = centerX + rx * Math.cos(angle) + lateralDrift;
        const y = centerY + ry * Math.sin(angle) + floatWave;
        const depth = Math.sin(angle); // -1 (back) to +1 (front)
        const normalizedDepth = (depth + 1) / 2; // 0 (back) to 1 (front)
        const depthCurve = Math.pow(normalizedDepth, 1.18);

        // Perspective 3D Yaw, Pitch & Roll
        const tangentYaw = -Math.cos(angle) * 30;
        const pitchX = -depth * 14;
        const rollZ = Math.cos(angle) * 3.5;

        // Front cards enlarged, back cards compact
        const baseScale = isMobile ? 0.60 + 0.52 * depthCurve : 0.72 + 0.70 * depthCurve;
        const isHovered = state.hoveredSlotIndex === slot.slotIndex && !state.isWarping;
        const scale = isHovered ? baseScale * 1.22 : baseScale;
        const zIndex = isHovered ? 99 : Math.round(10 + 45 * depth);

        card.style.width = cardWidth + 'px';
        card.style.height = cardHeight + 'px';
        card.style.left = x + 'px';
        card.style.top = y + 'px';
        card.style.zIndex = zIndex;
        card.style.transform =
          'translate(-50%, -50%) scale(' +
          scale.toFixed(3) +
          ') rotateX(' +
          pitchX.toFixed(2) +
          'deg) rotateY(' +
          tangentYaw.toFixed(2) +
          'deg) rotateZ(' +
          rollZ.toFixed(2) +
          'deg)';

        // Depth Opacity & Motion Blur Filters
        if (state.isWarping && motionBlur > 0.3) {
          // Motion blur streak during warp
          card.style.opacity = (0.75 + 0.25 * depthCurve).toFixed(2);
          card.style.filter = 'blur(' + motionBlur.toFixed(1) + 'px) brightness(' + (1.0 + warpFactor * 0.35).toFixed(2) + ')';
        } else if (isHovered) {
          // Selected hover state
          card.style.opacity = '1';
          card.style.filter = 'brightness(1.15) drop-shadow(0 0 25px rgba(245,158,11,0.6))';
        } else if (state.hoveredSlotIndex !== null && !state.isWarping) {
          // Dim other cards when one is inspected
          card.style.opacity = '0.35';
          card.style.filter = 'brightness(0.6) blur(1px)';
        } else {
          // Crisp Slow-Display Mode (Enhanced back card visibility: 70% back, 100% front)
          const opacity = 0.70 + 0.30 * depthCurve;
          const brightness = 0.75 + 0.30 * depthCurve;
          card.style.opacity = opacity.toFixed(2);
          card.style.filter = 'brightness(' + brightness.toFixed(2) + ')';
        }
      });
    }

    requestAnimationFrame(orbitAnimationTick);
  }

  // 5. GLITCH TEXT
  function initGlitchText() {
    const leftEl = document.getElementById('glitch-left-text');
    const rightEl = document.getElementById('glitch-right-text');

    const LEFT_TEXTS = ['STUDIO BY GOKUL', 'DESIGN BY GOKUL', 'ART BY GOKUL', 'BUILD BY GOKUL'];
    const RIGHT_TEXTS = ['BRANDING • LOGO • IDENTITY', 'APPAREL • PACKAGING • AI', '3D VISUALS • VIBE CODE'];

    let lIdx = 0;
    let rIdx = 0;

    const scramble = function (el, targetText) {
      if (!el) return;
      el.classList.add('animate-glitch');
      el.style.color = 'var(--gold-primary)';
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890•@#$%&';
      let iterations = 0;
      const max = 8;
      const interval = setInterval(function () {
        el.innerText = targetText
          .split('')
          .map(function (c, i) {
            if (c === ' ' || c === '•') return c;
            if (i < (iterations / max) * targetText.length) return targetText[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        iterations++;
        if (iterations >= max) {
          clearInterval(interval);
          el.innerText = targetText;
          el.classList.remove('animate-glitch');
          el.style.color = '';
        }
      }, 40);
    };

    if (leftEl) {
      setInterval(function () {
        lIdx = (lIdx + 1) % LEFT_TEXTS.length;
        scramble(leftEl, LEFT_TEXTS[lIdx]);
      }, 3500);
    }

    if (rightEl) {
      setInterval(function () {
        rIdx = (rIdx + 1) % RIGHT_TEXTS.length;
        scramble(rightEl, RIGHT_TEXTS[rIdx]);
      }, 4200);
    }
  }

  // 6. PORTFOLIO PAGE 3D STEPPED COVERFLOW ENGINE & CATEGORY SYSTEM
  function initPortfolioGrid() {
    const stageContainer = document.getElementById('portfolio-stage-container');
    const cardsWrap = document.getElementById('portfolio-cards-wrap');
    if (!stageContainer || !cardsWrap) return;

    let currentCategory = 'logo-brand';
    let currentItems = (PORTFOLIO_SECTIONS['logo-brand'] && PORTFOLIO_SECTIONS['logo-brand'].items) ? PORTFOLIO_SECTIONS['logo-brand'].items : PORTFOLIO;
    let currentIndex = 0;
    let autoSlideInterval = null;
    let isHovering = false;
    let breathingPhase = 0;
    let animFrameId = null;

    // Subtitles dictionary
    const categoryCaptions = {
      'logo-brand': '16 ICONIC BRAND MARKS • VECTORS & VISUAL IDENTITIES',
      'apparel-packaging': '12 LUXURY BOX SETS • STREETWEAR SPECS & COSMETICS',
      'web-ui-nft': '8 DIGITAL ECOSYSTEMS • WEB3 SYNERGIES & DARK INTERFACES',
      'print-media': '12 EDITORIAL SPREADS • SILK SCREENS & POSTERS',
      'digital-art': '12 GENERATIVE AI COMPOSITIONS • 3D RENDERS & SHADERS',
      'extended-pdf': 'OFFICIAL STUDIO ARCHIVE • COMPLETE CLIENT DECKS & MANUALS'
    };

    const categoryBadges = {
      'logo-brand': 'LOGO & BRAND SYSTEM',
      'apparel-packaging': 'APPAREL & PACKAGING',
      'web-ui-nft': 'WEB UI & NFT',
      'print-media': 'PRINT MEDIA',
      'digital-art': 'DIGITAL ART',
      'extended-pdf': 'EXTENDED PDF ARCHIVE'
    };

    // Initialize Category Filters
    const filterButtons = document.querySelectorAll('.portfolio-filter-item');
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const cat = btn.getAttribute('data-cat');
        if (!cat) return;

        filterButtons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        switchCategory(cat);
      });
    });

    function switchCategory(cat) {
      currentCategory = cat;
      const subCaption = document.getElementById('portfolio-sub-caption');
      const badge = document.getElementById('active-category-badge');
      const bottomBar = document.getElementById('portfolio-bottom-bar');
      const pdfContainer = document.getElementById('extended-pdf-container');

      if (subCaption && categoryCaptions[cat]) {
        subCaption.innerText = categoryCaptions[cat];
      }

      if (badge && categoryBadges[cat]) {
        badge.innerText = categoryBadges[cat];
      }

      if (cat === 'extended-pdf') {
        stageContainer.style.display = 'none';
        if (bottomBar) bottomBar.style.display = 'none';
        if (pdfContainer) pdfContainer.style.display = 'flex';
        stopAutoSlide();
        return;
      }

      // Show 3D stage
      stageContainer.style.display = 'flex';
      if (bottomBar) bottomBar.style.display = 'flex';
      if (pdfContainer) pdfContainer.style.display = 'none';

      if (PORTFOLIO_SECTIONS[cat] && PORTFOLIO_SECTIONS[cat].items) {
        currentItems = PORTFOLIO_SECTIONS[cat].items;
      } else {
        currentItems = PORTFOLIO;
      }

      currentIndex = 0;
      renderCards();
      updateDots();
      updateCounter();
      startAutoSlide();
    }

    // Render Cards in DOM (Clean Pure Images with No Text Overlays)
    function renderCards() {
      cardsWrap.innerHTML = '';
      if (!currentItems || currentItems.length === 0) return;

      currentItems.forEach(function (item, index) {
        const card = document.createElement('div');
        card.className = 'portfolio-flow-card';
        card.setAttribute('data-index', index);
        card.setAttribute('data-id', item.id);

        // Pure clean image — No text overlays or gradients on the card
        card.innerHTML = '<img src="' + item.imageUrl + '" alt="' + item.title + '" loading="lazy" />';

        // Hover Effect
        card.addEventListener('mouseenter', function () {
          isHovering = true;
          cardsWrap.classList.add('has-hover');
        });

        card.addEventListener('mouseleave', function () {
          isHovering = false;
          cardsWrap.classList.remove('has-hover');
        });

        // Click to center or open enlarged fullscreen
        card.addEventListener('click', function () {
          if (currentIndex === index) {
            openImageLightbox(item.imageUrl);
          } else {
            currentIndex = index;
            updateCardTransforms();
            updateDots();
            updateCounter();
          }
        });

        cardsWrap.appendChild(card);
      });

      updateCardTransforms();
    }

    // Update 3D Transformations with Breathing Parallax
    function updateCardTransforms() {
      const cards = cardsWrap.querySelectorAll('.portfolio-flow-card');
      const total = currentItems.length;
      if (total === 0) return;

      const isMobile = window.innerWidth <= 640;
      const isTablet = window.innerWidth <= 960 && !isMobile;
      // Spacing between cards: adjust here for tighter/wider separation on mobile and desktop
      const spacing = isMobile ? 130 : isTablet ? 200 : 270;

      cards.forEach(function (card, index) {
        // Calculate signed shortest offset in circular loop
        let offset = index - currentIndex;
        while (offset > total / 2) offset -= total;
        while (offset < -total / 2) offset += total;

        const absOffset = Math.abs(offset);
        const sign = offset < 0 ? -1 : 1;

        if (absOffset > 3.5) {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
          card.style.transform = 'translate(-50%, -50%) translate3d(' + (sign * 700) + 'px, 0, -450px) scale(0.3)';
          card.style.zIndex = '0';
          return;
        }

        // Stepped size and opacity curve
        let scale = 1.0;
        let opacity = 1.0;
        let brightness = 1.0;
        let zIndex = 50;
        let rotY = 0;
        let transZ = 0;
        let transX = 0;
        let transY = 0;

        // Breathing float calculation
        const floatY = Math.sin(breathingPhase + index * 0.7) * (absOffset === 0 ? 5 : 3.5);

        if (absOffset === 0) {
          // Center Card — Largest, sharpest, upfront
          scale = isMobile ? 1.02 : 1.08;
          opacity = 1.0;
          brightness = 1.05;
          zIndex = 50;
          rotY = 0;
          transZ = 50;
          transX = 0;
          transY = floatY;
          card.style.borderColor = 'rgba(245, 158, 11, 0.6)';
        } else if (absOffset <= 1.2) {
          // Direct Adjacent Cards (Left and Right)
          scale = isMobile ? 0.84 : 0.88;
          opacity = 0.88;
          brightness = 0.82;
          zIndex = 40;
          rotY = sign * -14;
          transZ = -60;
          transX = sign * spacing;
          transY = floatY;
          card.style.borderColor = 'rgba(255, 255, 255, 0.16)';
        } else if (absOffset <= 2.2) {
          // Tier 2 Cards
          scale = isMobile ? 0.70 : 0.72;
          opacity = 0.60;
          brightness = 0.60;
          zIndex = 30;
          rotY = sign * -24;
          transZ = -140;
          transX = sign * (spacing * 1.8);
          transY = floatY;
          card.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        } else {
          // Outer Edge Cards
          scale = isMobile ? 0.55 : 0.56;
          opacity = 0.32;
          brightness = 0.40;
          zIndex = 20;
          rotY = sign * -32;
          transZ = -220;
          transX = sign * (spacing * 2.45);
          transY = floatY;
          card.style.borderColor = 'rgba(255, 255, 255, 0.06)';
        }

        card.style.opacity = opacity.toString();
        card.style.zIndex = zIndex.toString();
        card.style.filter = 'brightness(' + brightness + ')';
        card.style.pointerEvents = 'auto';
        card.style.transform = 'translate(-50%, -50%) translate3d(' + transX + 'px, ' + transY + 'px, ' + transZ + 'px) rotateY(' + rotY + 'deg) scale(' + scale + ')';
      });
    }

    // Gentle Real-time Harmonic Breathing Parallax Loop
    function startBreathingLoop() {
      function loop() {
        breathingPhase += 0.024;
        updateCardTransforms();
        animFrameId = requestAnimationFrame(loop);
      }
      if (!animFrameId) {
        animFrameId = requestAnimationFrame(loop);
      }
    }

    // Auto-advance Carousel (Speed up display to ~3.2s)
    function startAutoSlide() {
      stopAutoSlide();
      autoSlideInterval = setInterval(function () {
        if (!isHovering && currentItems.length > 1) {
          currentIndex = (currentIndex + 1) % currentItems.length;
          updateDots();
          updateCounter();
        }
      }, 1000); // Snappy, engaging image pace
    }

    function stopAutoSlide() {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
      }
    }

    // Prev / Next Handlers
    const prevBtn = document.getElementById('portfolio-prev-btn');
    const nextBtn = document.getElementById('portfolio-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
        updateDots();
        updateCounter();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        currentIndex = (currentIndex + 1) % currentItems.length;
        updateDots();
        updateCounter();
      });
    }

    // Keyboard Arrow Navigation
    window.addEventListener('keydown', function (e) {
      if (currentCategory === 'extended-pdf') return;
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
        updateDots();
        updateCounter();
      } else if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % currentItems.length;
        updateDots();
        updateCounter();
      }
    });

    // Touch Swipe Support for Mobile & Tablet
    let touchStartX = 0;
    stageContainer.addEventListener('touchstart', function (e) {
      if (e.touches && e.touches[0]) {
        touchStartX = e.touches[0].clientX;
      }
    }, { passive: true });

    stageContainer.addEventListener('touchend', function (e) {
      if (e.changedTouches && e.changedTouches[0]) {
        const touchEndX = e.changedTouches[0].clientX;
        const diffX = touchEndX - touchStartX;
        if (diffX > 40) {
          currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
          updateDots();
          updateCounter();
        } else if (diffX < -40) {
          currentIndex = (currentIndex + 1) % currentItems.length;
          updateDots();
          updateCounter();
        }
      }
    }, { passive: true });

    // Update Dots Navigation Bar
    function updateDots() {
      const dotsBar = document.getElementById('portfolio-dots-bar');
      if (!dotsBar || !currentItems) return;

      dotsBar.innerHTML = '';
      const maxDots = Math.min(currentItems.length, 12);

      for (let i = 0; i < maxDots; i++) {
        const dot = document.createElement('div');
        dot.className = 'portfolio-dot' + (i === currentIndex % maxDots ? ' active' : '');
        dot.addEventListener('click', function () {
          currentIndex = i;
          updateDots();
          updateCounter();
        });
        dotsBar.appendChild(dot);
      }
    }

    // Update Counter & Active Title
    function updateCounter() {
      const curIndexEl = document.getElementById('portfolio-current-index');
      const totalCountEl = document.getElementById('portfolio-total-count');
      const activeTitleEl = document.getElementById('active-item-title');

      if (curIndexEl) {
        const num = (currentIndex + 1);
        curIndexEl.innerText = num < 10 ? '0' + num : num;
      }

      if (totalCountEl) {
        const tot = currentItems.length;
        totalCountEl.innerText = tot < 10 ? '0' + tot : tot;
      }

      if (activeTitleEl && currentItems[currentIndex]) {
        activeTitleEl.innerText = currentItems[currentIndex].title;
        activeTitleEl.style.display = 'inline-block';
      }
    }

    // Window Resize Handling
    window.addEventListener('resize', function () {
      updateCardTransforms();
    });

    // Start everything
    renderCards();
    updateDots();
    updateCounter();
    startBreathingLoop();
    startAutoSlide();
  }

  // IMAGE LIGHTBOX MODAL (PURE ENLARGED IMAGE + BACK BUTTON)
  function openImageLightbox(imgUrl) {
    const modal = document.getElementById('image-lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');

    if (!modal || !modalImg) return;

    modalImg.src = imgUrl;
    modal.classList.add('active');
  }

  function closeImageLightbox() {
    const modal = document.getElementById('image-lightbox-modal');
    if (modal) {
      modal.classList.remove('active');
    }
  }

  // Bind Lightbox Close Button & Backdrop Click
  const lightboxModal = document.getElementById('image-lightbox-modal');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');

  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeImageLightbox);
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', function (e) {
      if (e.target === lightboxModal) {
        closeImageLightbox();
      }
    });
  }

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeImageLightbox();
    }
  });

  // 7. VIBE BUILDS PAGE GRID
  function initVibeBuildsGrid() {
    const grid = document.getElementById('vibe-builds-grid');
    if (!grid) return;

    grid.innerHTML = '';
    VIBE_PROJECTS.forEach(function (proj) {
      const card = document.createElement('a');
      card.href = proj.link;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.className = 'glass-panel glass-panel-hover';
      card.style.borderRadius = '20px';
      card.style.padding = '24px';
      card.style.textDecoration = 'none';
      card.style.color = '#ffffff';
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.justifyContent = 'space-between';

      const techPills = proj.tech
        .map(function (t) {
          return (
            '<span style="background: rgba(255,255,255,0.05); font-family: var(--font-space); font-size: 9px; padding: 2px 8px; border-radius: 4px; color: var(--text-silver);">' +
            t +
            '</span>'
          );
        })
        .join('');

      card.innerHTML =
        '<div>' +
        '<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">' +
        '<span style="font-family: var(--font-space); font-size: 9px; color: var(--gold-primary); letter-spacing: 0.15em; background: rgba(245,158,11,0.1); padding: 3px 10px; border-radius: 9999px; border: 1px solid rgba(245,158,11,0.2);">' +
        proj.category +
        '</span>' +
        '<span style="font-size: 14px; color: var(--text-muted);">↗</span>' +
        '</div>' +
        '<h4 style="font-family: var(--font-syne); font-size: 18px; font-weight: 700; color: #fff; margin-bottom: 8px;">' +
        proj.name +
        '</h4>' +
        '<p style="font-family: var(--font-space); font-size: 12px; color: var(--text-silver); font-weight: 300; line-height: 1.6; margin-bottom: 20px;">' +
        proj.tagline +
        '</p>' +
        '</div>' +
        '<div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 14px;">' +
        '<div style="display: flex; gap: 6px; flex-wrap: wrap;">' +
        techPills +
        '</div>' +
        '<span style="font-family: var(--font-space); font-size: 9px; color: var(--text-muted); text-transform: uppercase;">' +
        'OPEN ↗' +
        '</span>' +
        '</div>';

      grid.appendChild(card);
    });
  }

  // 8. CONTACT FORM (DISPATCH DIRECTLY TO GMAIL)
  function initContactForm() {
    const form = document.getElementById('standalone-contact-form');
    const successBox = document.getElementById('contact-form-success');
    const activationBox = document.getElementById('contact-form-activation');
    const errorBox = document.getElementById('contact-form-error');
    const submitBtn = document.getElementById('contact-submit-btn');
    const submitBtnText = document.getElementById('submit-btn-text');

    if (form) {
      form.addEventListener('submit', function (e) {
        // If loaded via local file:// protocol or if user wants native form submission
        if (window.location.protocol === 'file:') {
          // Allow standard POST submission directly to FormSubmit
          return true;
        }

        e.preventDefault();

        const recipient = BRAND.contactFormRecipient || BRAND.email || 'venuxstudiox@gmail.com';
        
        const nameInput = form.elements['name'];
        const emailInput = form.elements['email'];
        const scopeInput = form.elements['project_scope'];
        const overviewInput = form.elements['project_overview'];

        const clientName = nameInput ? nameInput.value.trim() : 'Client';
        const clientEmail = emailInput ? emailInput.value.trim() : '';
        const projectScope = scopeInput ? scopeInput.value : 'Brand Identity';
        const projectOverview = overviewInput ? overviewInput.value.trim() : '';

        const payload = {
          name: clientName,
          email: clientEmail,
          project_scope: projectScope,
          project_overview: projectOverview,
          _subject: '⚡ New Project Brief: ' + clientName + ' [' + projectScope + '] • Venux Studio',
          _template: 'table',
          _captcha: 'false'
        };

        // Loading state
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.style.opacity = '0.7';
          if (submitBtnText) submitBtnText.innerHTML = 'SENDING BRIEF... ⏳';
        }
        if (errorBox) errorBox.style.display = 'none';
        if (activationBox) activationBox.style.display = 'none';

        // Send JSON to FormSubmit AJAX endpoint
        fetch('https://formsubmit.co/ajax/' + encodeURIComponent(recipient), {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          const msg = (data && data.message) ? data.message.toLowerCase() : '';
          const isSuccess = data && (data.success === 'true' || data.success === true || data.success === '1');

          form.style.display = 'none';

          // Check if FormSubmit requested one-time activation
          if (msg.indexOf('activate') !== -1 || msg.indexOf('confirmation') !== -1 || msg.indexOf('verify') !== -1) {
            if (activationBox) activationBox.style.display = 'block';
          } else if (isSuccess || responseOkFallback(data)) {
            if (successBox) successBox.style.display = 'block';
          } else {
            if (successBox) successBox.style.display = 'block';
          }
        })
        .catch(function (err) {
          console.warn('FormSubmit AJAX notice, falling back to native post:', err);
          // If AJAX is blocked by browser CORS/extensions, submit form natively
          try {
            form.submit();
          } catch (e2) {
            if (errorBox) errorBox.style.display = 'block';
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.style.opacity = '1';
              if (submitBtnText) submitBtnText.innerHTML = 'TRY AGAIN ↗';
            }
          }
        });
      });
    }

    function responseOkFallback(data) {
      return data && typeof data === 'object' && !data.error;
    }
  }

  // 9. PROJECT & LIGHTBOX MODAL
  function initModal() {
    const overlay = document.getElementById('project-modal-overlay');
    const closeBtn = document.getElementById('modal-close-btn');

    if (closeBtn) {
      closeBtn.addEventListener('click', closeProjectModal);
    }

    if (overlay) {
      overlay.addEventListener('click', function (e) {
        if (e.target === overlay) closeProjectModal();
      });
    }

    // Lightbox modal listeners
    const lightboxModal = document.getElementById('image-lightbox-modal');
    const lightboxClose = document.getElementById('lightbox-close-btn');

    if (lightboxClose) {
      lightboxClose.addEventListener('click', closeImageLightbox);
    }

    if (lightboxModal) {
      lightboxModal.addEventListener('click', function (e) {
        if (e.target === lightboxModal) closeImageLightbox();
      });
    }

    // Global Escape Key to close any open modal
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        closeProjectModal();
        closeImageLightbox();
      }
    });
  }

  function openProjectModal(item) {
    const overlay = document.getElementById('project-modal-overlay');
    const modalImg = document.getElementById('modal-img');
    const modalCat = document.getElementById('modal-cat');
    const modalTitle = document.getElementById('modal-title');
    const modalClient = document.getElementById('modal-client');
    const modalDesc = document.getElementById('modal-desc');
    const modalTags = document.getElementById('modal-tags');
    const modalDeliverables = document.getElementById('modal-deliverables');

    if (modalImg) modalImg.src = item.imageUrl;
    if (modalCat) modalCat.innerText = item.category;
    if (modalTitle) modalTitle.innerText = item.title;
    if (modalClient) modalClient.innerText = item.client + ' • ' + item.year;
    if (modalDesc) modalDesc.innerText = item.description;

    if (modalTags) {
      modalTags.innerHTML = item.tags
        .map(function (t) {
          return (
            '<span style="background: rgba(255,255,255,0.06); padding: 4px 10px; border-radius: 9999px; font-size: 10px; font-family: var(--font-space); color: var(--text-silver);">' +
            t +
            '</span>'
          );
        })
        .join('');
    }

    if (modalDeliverables && item.deliverables) {
      modalDeliverables.innerHTML = item.deliverables
        .map(function (d) {
          return (
            '<li style="font-family: var(--font-space); font-size: 11px; color: var(--text-silver); margin-bottom: 4px;">• ' +
            d +
            '</li>'
          );
        })
        .join('');
    }

    if (overlay) {
      overlay.classList.add('active');
    }
  }

  function closeProjectModal() {
    const overlay = document.getElementById('project-modal-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
  }
})();
