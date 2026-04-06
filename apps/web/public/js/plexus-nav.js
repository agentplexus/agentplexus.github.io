/**
 * PlexusOne Unified Navigation
 * Shared navigation component for MkDocs and other non-React sites
 *
 * Usage:
 *   <div id="plexus-nav-root"></div>
 *   <script src="https://plexusone.dev/js/plexus-nav.js"></script>
 *
 * Or with custom options:
 *   <script>
 *     window.PlexusNavConfig = { currentProduct: 'omnillm' };
 *   </script>
 *   <script src="https://plexusone.dev/js/plexus-nav.js"></script>
 */
(function() {
  'use strict';

  var BASE_URL = 'https://plexusone.dev';
  var PRODUCTS_JSON_URL = BASE_URL + '/data/products.json';
  var CATEGORY_ORDER = ['library', 'agent', 'application', 'specification'];
  // Category key to plural URL path
  var CATEGORY_PATHS = {
    library: '/libraries',
    agent: '/agents',
    application: '/applications',
    specification: '/specifications'
  };

  // SVG Icons
  var ICONS = {
    chevron: '<svg class="plexus-nav-chevron" viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',
    chevronSmall: '<svg viewBox="0 0 24 24" width="12" height="12"><path fill="currentColor" d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>',
    github: '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>',
    hamburger: '<svg class="plexus-nav-hamburger" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>',
    close: '<svg class="plexus-nav-close" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>'
  };

  // Get config from window
  var config = window.PlexusNavConfig || {};

  // Resolve URL helper
  function resolveUrl(url) {
    if (!url) return '#';
    if (url.startsWith('http')) return url;
    if (url.startsWith('/')) return BASE_URL + url;
    return BASE_URL + '/' + url;
  }

  // Inject styles
  function injectStyles() {
    if (document.getElementById('plexus-nav-styles')) return;

    var style = document.createElement('style');
    style.id = 'plexus-nav-styles';
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

      .plexus-nav {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 100;
        background: rgba(10, 14, 26, 0.8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      }

      .plexus-nav-container {
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 1rem;
        height: 64px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .plexus-nav-brand {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        text-decoration: none;
        border-radius: 8px;
      }

      .plexus-nav-brand:focus-visible {
        outline: 2px solid #8b5cf6;
        outline-offset: 2px;
      }

      .plexus-nav-logo {
        width: 40px;
        height: 40px;
      }

      .plexus-nav-title {
        font-size: 20px;
        font-weight: 700;
      }

      .plexus-nav-title-light {
        color: #ffffff;
      }

      .plexus-nav-title-gradient {
        background: linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .plexus-nav-links {
        display: none;
        align-items: center;
        gap: 2rem;
      }

      @media (min-width: 769px) {
        .plexus-nav-links {
          display: flex;
        }
      }

      .plexus-nav-link {
        color: #d1d5db;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        padding: 8px 0;
        border: none;
        background: none;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 4px;
        transition: color 0.15s ease;
        border-radius: 4px;
      }

      .plexus-nav-link:hover,
      .plexus-nav-link[aria-expanded="true"] {
        color: #06b6d4;
      }

      .plexus-nav-link:focus-visible {
        outline: 2px solid #8b5cf6;
        outline-offset: 2px;
      }

      .plexus-nav-chevron {
        transition: transform 0.2s ease;
      }

      .plexus-nav-link[aria-expanded="true"] .plexus-nav-chevron {
        transform: rotate(180deg);
      }

      /* Dropdowns */
      .plexus-nav-dropdown {
        position: relative;
      }

      .plexus-nav-dropdown-menu {
        position: absolute;
        top: 100%;
        left: 0;
        margin-top: 0.5rem;
        min-width: 12rem;
        padding: 0.5rem 0;
        background: rgba(10, 14, 26, 0.95);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        opacity: 0;
        visibility: hidden;
        transform: translateY(-8px);
        transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s ease;
      }

      .plexus-nav-dropdown.open .plexus-nav-dropdown-menu {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }

      .plexus-nav-dropdown-item {
        display: block;
        padding: 8px 16px;
        color: #d1d5db;
        text-decoration: none;
        font-size: 14px;
        transition: color 0.15s ease, background 0.15s ease;
      }

      .plexus-nav-dropdown-item:hover {
        color: #06b6d4;
        background: rgba(255, 255, 255, 0.05);
      }

      /* GitHub button */
      .plexus-nav-github {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: rgba(139, 92, 246, 0.2);
        border: 1px solid rgba(139, 92, 246, 0.5);
        border-radius: 8px;
        color: #a78bfa;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
        transition: background 0.15s ease;
      }

      .plexus-nav-github:hover {
        background: rgba(139, 92, 246, 0.3);
      }

      .plexus-nav-github:focus-visible {
        outline: 2px solid #8b5cf6;
        outline-offset: 2px;
      }

      /* Mobile toggle */
      .plexus-nav-mobile-toggle {
        display: flex;
        padding: 0.5rem;
        background: none;
        border: none;
        color: #d1d5db;
        cursor: pointer;
        border-radius: 8px;
      }

      .plexus-nav-mobile-toggle:focus-visible {
        outline: 2px solid #8b5cf6;
        outline-offset: 2px;
      }

      @media (min-width: 769px) {
        .plexus-nav-mobile-toggle {
          display: none;
        }
      }

      .plexus-nav-close {
        display: none;
      }

      .plexus-nav.mobile-open .plexus-nav-hamburger {
        display: none;
      }

      .plexus-nav.mobile-open .plexus-nav-close {
        display: block;
      }

      /* Mobile menu */
      .plexus-nav-mobile-menu {
        display: none;
        padding: 1rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
      }

      .plexus-nav.mobile-open .plexus-nav-mobile-menu {
        display: block;
      }

      @media (min-width: 769px) {
        .plexus-nav-mobile-menu {
          display: none !important;
        }
      }

      .plexus-nav-mobile-section {
        padding: 0.75rem 0;
        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      }

      .plexus-nav-mobile-section:last-child {
        border-bottom: none;
      }

      .plexus-nav-mobile-label {
        display: block;
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #6b7280;
        margin-bottom: 8px;
      }

      .plexus-nav-mobile-link {
        display: block;
        padding: 8px 0;
        color: #d1d5db;
        text-decoration: none;
        font-size: 14px;
        transition: color 0.15s ease;
      }

      .plexus-nav-mobile-link:hover {
        color: #06b6d4;
      }

      .plexus-nav-mobile-github {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: #a78bfa;
      }

      .plexus-nav-mobile-more {
        font-size: 12px;
        color: #06b6d4;
      }

      /* Mega Menu */
      .plexus-megamenu {
        display: none;
        position: fixed;
        top: 64px;
        left: 0;
        right: 0;
        z-index: 1000;
      }

      .plexus-megamenu.open {
        display: block;
      }

      .plexus-megamenu-backdrop {
        position: fixed;
        inset: 64px 0 0 0;
        background: rgba(0, 0, 0, 0.5);
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      }

      .plexus-megamenu-panel {
        position: relative;
        background: rgba(10, 15, 28, 0.98);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
      }

      .plexus-megamenu-content {
        max-width: 80rem;
        margin: 0 auto;
        padding: 2rem;
      }

      .plexus-megamenu-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 2rem;
      }

      .plexus-megamenu-category h3 {
        font-size: 12px;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: #fff;
        margin: 0 0 4px 0;
      }

      .plexus-megamenu-category h3 a {
        color: #fff;
        text-decoration: none;
        transition: color 0.15s;
      }

      .plexus-megamenu-category h3 a:hover {
        color: #06b6d4;
      }

      .plexus-megamenu-category .plexus-megamenu-desc {
        font-size: 11px;
        color: #6b7280;
        margin: 0 0 16px 0;
      }

      .plexus-megamenu-category ul {
        list-style: none;
        margin: 0;
        padding: 0;
      }

      .plexus-megamenu-category li {
        margin-bottom: 0.75rem;
      }

      .plexus-megamenu-category li a {
        display: block;
        text-decoration: none;
        transition: color 0.15s;
      }

      .plexus-megamenu-category li a .product-name {
        font-size: 14px;
        font-weight: 500;
        color: #e5e7eb;
      }

      .plexus-megamenu-category li a:hover .product-name {
        color: #06b6d4;
      }

      .plexus-megamenu-category li a .product-tagline {
        font-size: 11px;
        color: #6b7280;
        margin-top: 2px;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }

      .plexus-megamenu-more {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        margin-top: 12px;
        font-size: 11px;
        color: #06b6d4;
        text-decoration: none;
        transition: color 0.15s;
      }

      .plexus-megamenu-more:hover {
        color: #22d3ee;
      }

      .plexus-megamenu-more svg {
        transform: rotate(-90deg);
      }

      .plexus-megamenu-footer {
        margin-top: 2rem;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .plexus-megamenu-footer-links {
        display: flex;
        gap: 1.5rem;
      }

      .plexus-megamenu-footer-links a {
        font-size: 14px;
        color: #9ca3af;
        text-decoration: none;
        transition: color 0.15s;
      }

      .plexus-megamenu-footer-links a:hover {
        color: #fff;
      }

      .plexus-megamenu-stats {
        font-size: 12px;
        color: #4b5563;
      }

      @media (max-width: 768px) {
        .plexus-megamenu {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // Render the navigation HTML
  function renderNavHTML() {
    return `
      <nav class="plexus-nav" aria-label="PlexusOne main navigation">
        <div class="plexus-nav-container">
          <a href="${BASE_URL}/" class="plexus-nav-brand">
            <img src="${BASE_URL}/icon.png" alt="PlexusOne" class="plexus-nav-logo">
            <span class="plexus-nav-title">
              <span class="plexus-nav-title-gradient">Plexus</span><span class="plexus-nav-title-light">One</span>
            </span>
          </a>

          <div class="plexus-nav-links">
            <button class="plexus-nav-link plexus-nav-megamenu-trigger" aria-expanded="false" aria-haspopup="true">
              Products ${ICONS.chevron}
            </button>

            <a href="${BASE_URL}/projects" class="plexus-nav-link">Projects</a>

            <div class="plexus-nav-dropdown" data-dropdown="developers">
              <button class="plexus-nav-link plexus-nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                Developers ${ICONS.chevron}
              </button>
              <div class="plexus-nav-dropdown-menu">
                <a href="${BASE_URL}/academy" class="plexus-nav-dropdown-item">Academy</a>
                <a href="${BASE_URL}/mcp" class="plexus-nav-dropdown-item">MCP</a>
              </div>
            </div>

            <div class="plexus-nav-dropdown" data-dropdown="community">
              <button class="plexus-nav-link plexus-nav-dropdown-trigger" aria-expanded="false" aria-haspopup="true">
                Community ${ICONS.chevron}
              </button>
              <div class="plexus-nav-dropdown-menu">
                <a href="${BASE_URL}/blog" class="plexus-nav-dropdown-item">Blog</a>
                <a href="${BASE_URL}/releases" class="plexus-nav-dropdown-item">Releases</a>
                <a href="${BASE_URL}/#philosophy" class="plexus-nav-dropdown-item">Philosophy</a>
              </div>
            </div>

            <a href="https://github.com/plexusone" target="_blank" rel="noopener noreferrer" class="plexus-nav-github">
              ${ICONS.github} GitHub
            </a>
          </div>

          <button class="plexus-nav-mobile-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
            ${ICONS.hamburger}
            ${ICONS.close}
          </button>
        </div>

        <div class="plexus-megamenu" id="plexus-megamenu">
          <div class="plexus-megamenu-backdrop"></div>
          <div class="plexus-megamenu-panel">
            <div class="plexus-megamenu-content">
              <div class="plexus-megamenu-grid" id="plexus-megamenu-grid">
                <!-- Populated by JS -->
              </div>
              <div class="plexus-megamenu-footer">
                <div class="plexus-megamenu-footer-links">
                  <a href="${BASE_URL}/#products">All Products</a>
                  <a href="${BASE_URL}/integrations">Integrations</a>
                  <a href="https://github.com/plexusone" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
                <span class="plexus-megamenu-stats" id="plexus-megamenu-stats"></span>
              </div>
            </div>
          </div>
        </div>

        <div class="plexus-nav-mobile-menu" id="plexus-nav-mobile">
          <!-- Populated by JS -->
        </div>
      </nav>
    `;
  }

  // Render mega menu grid
  function renderMegaMenuGrid(data) {
    var grid = document.getElementById('plexus-megamenu-grid');
    var stats = document.getElementById('plexus-megamenu-stats');
    if (!grid) return;

    var html = '';
    var totalProducts = data.products.length;
    var totalCategories = Object.keys(data.categories).length;

    CATEGORY_ORDER.forEach(function(catKey) {
      var category = data.categories[catKey];
      if (!category) return;

      var products = data.products.filter(function(p) {
        return p.category === catKey && p.featured && p.docsUrl;
      }).slice(0, 5);

      var allInCategory = data.products.filter(function(p) {
        return p.category === catKey && p.docsUrl;
      });

      var remaining = allInCategory.length - products.length;

      var categoryUrl = BASE_URL + CATEGORY_PATHS[catKey];
      html += '<div class="plexus-megamenu-category">';
      html += '<h3><a href="' + categoryUrl + '">' + category.label + '</a></h3>';
      html += '<p class="plexus-megamenu-desc">' + category.description + '</p>';
      html += '<ul>';

      products.forEach(function(product) {
        var categoryPath = CATEGORY_PATHS[product.category] || '/products';
        var url = BASE_URL + categoryPath + '/' + product.slug;
        html += '<li><a href="' + url + '">';
        html += '<span class="product-name">' + product.name + '</span>';
        html += '<p class="product-tagline">' + product.tagline + '</p>';
        html += '</a></li>';
      });

      html += '</ul>';

      if (remaining > 0) {
        var moreUrl = BASE_URL + CATEGORY_PATHS[catKey];
        html += '<a href="' + moreUrl + '" class="plexus-megamenu-more">';
        html += '+' + remaining + ' more ' + category.label.toLowerCase();
        html += ICONS.chevronSmall;
        html += '</a>';
      }

      html += '</div>';
    });

    grid.innerHTML = html;

    if (stats) {
      stats.textContent = totalProducts + ' products across ' + totalCategories + ' categories';
    }
  }

  // Render mobile menu
  function renderMobileMenu(data) {
    var mobileNav = document.getElementById('plexus-nav-mobile');
    if (!mobileNav) return;

    var html = '';

    // Products section with category links (matching React Navbar.tsx)
    html += '<div class="plexus-nav-mobile-section">';
    html += '<span class="plexus-nav-mobile-label">Products</span>';

    // Category links
    CATEGORY_ORDER.forEach(function(catKey) {
      var category = data.categories[catKey];
      if (!category) return;
      var categoryUrl = BASE_URL + CATEGORY_PATHS[catKey];
      html += '<a href="' + categoryUrl + '" class="plexus-nav-mobile-link">' + category.label + '</a>';
    });

    // Integrations link
    html += '<a href="' + BASE_URL + '/integrations" class="plexus-nav-mobile-link">Integrations</a>';
    html += '</div>';

    // Projects
    html += '<div class="plexus-nav-mobile-section">';
    html += '<a href="' + BASE_URL + '/projects" class="plexus-nav-mobile-link">Projects</a>';
    html += '</div>';

    // Developers
    html += '<div class="plexus-nav-mobile-section">';
    html += '<span class="plexus-nav-mobile-label">Developers</span>';
    html += '<a href="' + BASE_URL + '/academy" class="plexus-nav-mobile-link">Academy</a>';
    html += '<a href="' + BASE_URL + '/mcp" class="plexus-nav-mobile-link">MCP</a>';
    html += '</div>';

    // Community
    html += '<div class="plexus-nav-mobile-section">';
    html += '<span class="plexus-nav-mobile-label">Community</span>';
    html += '<a href="' + BASE_URL + '/blog" class="plexus-nav-mobile-link">Blog</a>';
    html += '<a href="' + BASE_URL + '/releases" class="plexus-nav-mobile-link">Releases</a>';
    html += '<a href="' + BASE_URL + '/#philosophy" class="plexus-nav-mobile-link">Philosophy</a>';
    html += '</div>';

    // GitHub
    html += '<div class="plexus-nav-mobile-section">';
    html += '<a href="https://github.com/plexusone" target="_blank" rel="noopener noreferrer" class="plexus-nav-mobile-link plexus-nav-mobile-github">';
    html += ICONS.github + ' GitHub';
    html += '</a>';
    html += '</div>';

    mobileNav.innerHTML = html;
  }

  // Attach event listeners
  function attachEventListeners() {
    var nav = document.querySelector('.plexus-nav');
    var megamenu = document.getElementById('plexus-megamenu');
    var megamenuTrigger = document.querySelector('.plexus-nav-megamenu-trigger');
    var backdrop = document.querySelector('.plexus-megamenu-backdrop');
    var mobileToggle = document.querySelector('.plexus-nav-mobile-toggle');
    var dropdowns = document.querySelectorAll('.plexus-nav-dropdown');

    function closeAllDropdowns() {
      dropdowns.forEach(function(d) {
        d.classList.remove('open');
        var t = d.querySelector('.plexus-nav-dropdown-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
      });
    }

    function closeMegaMenu() {
      if (megamenu) megamenu.classList.remove('open');
      if (megamenuTrigger) megamenuTrigger.setAttribute('aria-expanded', 'false');
    }

    // Mega menu toggle
    if (megamenuTrigger && megamenu) {
      megamenuTrigger.addEventListener('click', function(e) {
        e.stopPropagation();
        closeAllDropdowns();
        var isOpen = megamenu.classList.contains('open');
        megamenu.classList.toggle('open');
        this.setAttribute('aria-expanded', !isOpen);
      });
    }

    // Dropdown toggles
    dropdowns.forEach(function(dropdown) {
      var trigger = dropdown.querySelector('.plexus-nav-dropdown-trigger');
      if (trigger) {
        trigger.addEventListener('click', function(e) {
          e.stopPropagation();
          closeMegaMenu();
          var isOpen = dropdown.classList.contains('open');
          closeAllDropdowns();
          if (!isOpen) {
            dropdown.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
          }
        });
      }
    });

    // Close on backdrop click
    if (backdrop) {
      backdrop.addEventListener('click', closeMegaMenu);
    }

    // Close on outside click
    document.addEventListener('click', function(e) {
      var clickedInDropdown = false;
      dropdowns.forEach(function(d) {
        if (d.contains(e.target)) clickedInDropdown = true;
      });
      if (!clickedInDropdown) {
        closeAllDropdowns();
      }
    });

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeMegaMenu();
        closeAllDropdowns();
        if (nav) nav.classList.remove('mobile-open');
        if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // Close mega menu on link click
    if (megamenu) {
      megamenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', closeMegaMenu);
      });
    }

    // Mobile menu toggle
    if (mobileToggle && nav) {
      mobileToggle.addEventListener('click', function() {
        var isOpen = nav.classList.contains('mobile-open');
        nav.classList.toggle('mobile-open');
        this.setAttribute('aria-expanded', !isOpen);
      });
    }
  }

  // Initialize
  function init() {
    // Find or create root element
    var root = document.getElementById('plexus-nav-root');
    if (!root) {
      // Insert at top of body if no root element
      root = document.createElement('div');
      root.id = 'plexus-nav-root';
      document.body.insertBefore(root, document.body.firstChild);
    }

    // Inject styles
    injectStyles();

    // Render nav HTML
    root.innerHTML = renderNavHTML();

    // Attach event listeners
    attachEventListeners();

    // Fetch products.json and render dynamic content
    fetch(PRODUCTS_JSON_URL)
      .then(function(response) {
        if (!response.ok) throw new Error('Failed to fetch products.json');
        return response.json();
      })
      .then(function(data) {
        renderMegaMenuGrid(data);
        renderMobileMenu(data);
      })
      .catch(function(err) {
        console.warn('PlexusOne Nav: Failed to load products.json', err);
      });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export for manual initialization
  window.PlexusNav = {
    init: init,
    config: config
  };
})();
