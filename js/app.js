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

  // 6. PORTFOLIO PAGE CONTINUOUS CURVED ORBIT ENGINE & CATEGORY SYSTEM
  function initPortfolioGrid() {
    const stageContainer = document.getElementById('portfolio-stage-container');
    const cardsWrap = document.getElementById('portfolio-cards-wrap');
    if (!stageContainer || !cardsWrap) return;

    let currentCategory = 'logo-brand';
    let currentItems = (PORTFOLIO_SECTIONS['logo-brand'] && PORTFOLIO_SECTIONS['logo-brand'].items) ? PORTFOLIO_SECTIONS['logo-brand'].items : PORTFOLIO;
    let scrollPos = 0;
    let targetScrollPos = 0;
    let autoSpeed = 0.0035; // Continuous smooth gliding speed
    let isHovering = false;
    let isDragging = false;
    let dragStartX = 0;
    let dragLastX = 0;
    let dragVelocity = 0;
    let hasDraggedSignificantly = false;
    let animFrameId = null;

    // Subtitles dictionary
    const categoryCaptions = {
      'logo-brand': '16 ICONIC BRAND MARKS • VECTORS & VISUAL IDENTITIES',
      'apparel-packaging': '12 LUXURY BOX SETS • STREETWEAR SPECS & COSMETICS',
      'web-ui-nft': '12 DIGITAL ECOSYSTEMS • WEB3 SYNERGIES & DARK INTERFACES',
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
    const filterButtons = document.querySelectorAll('.portfolio-filter-pill');
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
      const pdfContainer = document.getElementById('extended-pdf-container');

      if (subCaption && categoryCaptions[cat]) {
        subCaption.innerText = categoryCaptions[cat];
      }

      if (badge && categoryBadges[cat]) {
        badge.innerText = categoryBadges[cat];
      }

      if (cat === 'extended-pdf') {
        stageContainer.style.display = 'none';
        if (pdfContainer) pdfContainer.style.display = 'flex';
        return;
      }

      // Show Orbit stage
      stageContainer.style.display = 'flex';
      if (pdfContainer) pdfContainer.style.display = 'none';

      if (PORTFOLIO_SECTIONS[cat] && PORTFOLIO_SECTIONS[cat].items) {
        currentItems = PORTFOLIO_SECTIONS[cat].items;
      } else {
        currentItems = PORTFOLIO;
      }

      scrollPos = 0;
      targetScrollPos = 0;
      renderCards();
      updateCounter();
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
          if (hasDraggedSignificantly) return;
          const total = currentItems.length;
          let diff = ((index - scrollPos) % total + total) % total;
          if (diff > total / 2) diff -= total;

          if (Math.abs(diff) < 0.28) {
            openImageLightbox(item.imageUrl);
          } else {
            targetScrollPos += diff;
          }
        });

        cardsWrap.appendChild(card);
      });

      updateCardTransforms();
    }

    // Update Continuous Curved Orbit Arch Transformations with 3D Parallax & Edge-Vanishing Rotation
    function updateCardTransforms() {
      const cards = cardsWrap.querySelectorAll('.portfolio-flow-card');
      const total = currentItems.length;
      if (total === 0) return;

      const isMobile = window.innerWidth <= 640;
      const isTablet = window.innerWidth <= 960 && !isMobile;

      // Arc radius R and Angular Step between cards
      const R = isMobile ? 420 : isTablet ? 680 : 920;
      const stepDeg = isMobile ? 22 : isTablet ? 18 : 14.5;
      const stepRad = stepDeg * (Math.PI / 180);

      cards.forEach(function (card, index) {
        // Calculate signed shortest offset in continuous circular loop
        let diff = ((index - scrollPos) % total + total) % total;
        if (diff > total / 2) diff -= total;

        const theta = diff * stepRad;
        const degZ = diff * stepDeg;
        const cosT = Math.cos(theta);
        const sinT = Math.sin(theta);

        // If card is far off to the sides/back of the circle, hide it cleanly
        if (cosT < 0.1) {
          card.style.opacity = '0';
          card.style.pointerEvents = 'none';
          card.style.transform = 'translate(-50%, -50%) translate3d(0px, 600px, -450px) scale(0.15)';
          card.style.zIndex = '0';
          return;
        }

        // Parallax depth calculation:
        // Center card is big & pushed forward; as it moves down the arch, it drops in Z and shrinks
        const transX = R * sinT;
        const transY = R * (1 - cosT); // Apex at 0, drops smoothly downwards on left & right
        const transZ = (cosT - 1) * 260 + (cosT > 0.95 ? 40 : 0); // Prominent front-to-back depth

        // Front card is much larger (up to 1.15x), smoothly scaling down to ~0.35x as it drops
        const scale = Math.max(0.32, Math.pow(cosT, 1.35) * 1.12);

        // Parallax Edge Rotation (Yaw):
        // Cards face forward at the apex (rotY = 0) and smoothly rotate inward on Y-axis
        // turning edge-on (faint line profile) near the perimeter before dipping out
        const sign = diff < 0 ? -1 : 1;
        const normalizedDiff = Math.min(1.0, Math.abs(diff) / 3.2);
        const rotY = sign * Math.pow(normalizedDiff, 1.25) * -72; // Up to ~72deg edge view

        // Smooth Opacity fade: front card 100%, fading down to 0% at edges
        const opacity = Math.min(1.0, Math.max(0, Math.pow(cosT, 2.2) * 1.35));
        const zIndex = Math.round(100 * cosT);
        const brightness = 0.55 + 0.5 * cosT;

        const isCenter = Math.abs(diff) < 0.35;
        if (isCenter) {
          card.style.borderColor = 'rgba(245, 158, 11, 0.7)';
        } else {
          card.style.borderColor = 'rgba(255, 255, 255, ' + (0.04 + 0.14 * cosT) + ')';
        }

        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = zIndex.toString();
        card.style.filter = 'brightness(' + brightness.toFixed(2) + ')';
        card.style.pointerEvents = opacity > 0.15 ? 'auto' : 'none';
        card.style.transform = 'translate(-50%, -50%) translate3d(' + transX.toFixed(2) + 'px, ' + transY.toFixed(2) + 'px, ' + transZ.toFixed(2) + 'px) rotateZ(' + degZ.toFixed(2) + 'deg) rotateY(' + rotY.toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')';
      });
    }

    // Continuous Ultra-Smooth Animation Loop (60/120fps)
    function startContinuousOrbitLoop() {
      function loop() {
        if (!isDragging) {
          // If hovering, slow glide down by 80%
          const speed = isHovering ? autoSpeed * 0.2 : autoSpeed;
          targetScrollPos += speed;

          // Apply velocity inertia if any
          if (Math.abs(dragVelocity) > 0.0001) {
            targetScrollPos += dragVelocity;
            dragVelocity *= 0.92; // Friction damping
          }
        }

        // Smooth spring interpolation towards targetScrollPos
        scrollPos += (targetScrollPos - scrollPos) * 0.14;

        updateCardTransforms();
        updateCounter();

        animFrameId = requestAnimationFrame(loop);
      }

      if (!animFrameId) {
        animFrameId = requestAnimationFrame(loop);
      }
    }

    // Drag / Swipe / Touch Interactive Controls
    function handlePointerDown(e) {
      isDragging = true;
      hasDraggedSignificantly = false;
      dragStartX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      dragLastX = dragStartX;
      dragVelocity = 0;
    }

    function handlePointerMove(e) {
      if (!isDragging) return;
      const currentX = e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
      const deltaX = currentX - dragLastX;

      if (Math.abs(currentX - dragStartX) > 6) {
        hasDraggedSignificantly = true;
      }

      const isMobile = window.innerWidth <= 640;
      const sensitivity = isMobile ? 200 : 340;
      const scrollDelta = -deltaX / sensitivity;

      targetScrollPos += scrollDelta;
      scrollPos += scrollDelta;
      dragVelocity = scrollDelta * 0.7;
      dragLastX = currentX;
    }

    function handlePointerUp() {
      if (!isDragging) return;
      isDragging = false;
    }

    stageContainer.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);

    stageContainer.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', handlePointerUp, { passive: true });

    // Mouse Wheel Scroll
    stageContainer.addEventListener('wheel', function (e) {
      e.preventDefault();
      const delta = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 0.0018;
      targetScrollPos += delta;
      dragVelocity = delta * 0.5;
    }, { passive: false });

    // Prev / Next Nav Buttons
    const prevBtn = document.getElementById('portfolio-prev-btn');
    const nextBtn = document.getElementById('portfolio-next-btn');

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        targetScrollPos = Math.round(targetScrollPos) - 1;
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        targetScrollPos = Math.round(targetScrollPos) + 1;
      });
    }

    // Keyboard Arrow Navigation
    window.addEventListener('keydown', function (e) {
      if (currentCategory === 'extended-pdf') return;
      if (e.key === 'ArrowLeft') {
        targetScrollPos = Math.round(targetScrollPos) - 1;
      } else if (e.key === 'ArrowRight') {
        targetScrollPos = Math.round(targetScrollPos) + 1;
      }
    });

    // Update Counter
    function updateCounter() {
      const curIndexEl = document.getElementById('portfolio-current-index');
      const totalCountEl = document.getElementById('portfolio-total-count');

      const total = currentItems.length;
      if (total === 0) return;

      const activeIndex = ((Math.round(scrollPos) % total) + total) % total;

      if (curIndexEl) {
        const num = activeIndex + 1;
        curIndexEl.innerText = num < 10 ? '0' + num : num;
      }

      if (totalCountEl) {
        totalCountEl.innerText = total < 10 ? '0' + total : total;
      }
    }

    // Window Resize Handling
    window.addEventListener('resize', function () {
      updateCardTransforms();
    });

    // Start everything
    renderCards();
    updateCounter();
    startContinuousOrbitLoop();
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
