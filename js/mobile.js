/* ═══════════════════════════════════════════════════════════════════════
   mobile.js
   Handles burger nav sidebar and collapsible sections on mobile.
   Add <script src="js/mobile.js"></script> as the LAST script in every
   HTML file (after scripts.js / backButton.js etc.)
   ═══════════════════════════════════════════════════════════════════════ */
 
(function () {
    'use strict';
 
    /* ── 1. Inject burger button and nav overlay into the DOM ─────────── */
    function initBurgerNav() {
        var nav = document.querySelector('nav');
        if (!nav) return;
 
        // Burger button
        var burger = document.createElement('button');
        burger.className = 'burger-btn';
        burger.setAttribute('aria-label', 'Open navigation menu');
        burger.innerHTML = [
            '<span class="burger-line"></span>',
            '<span class="burger-line"></span>',
            '<span class="burger-line"></span>'
        ].join('');
        document.body.appendChild(burger);
 
        // Dim overlay
        var overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
 
        var navUl = nav.querySelector('ul');
 
        function openNav() {
            navUl.classList.add('mobile-open');
            burger.classList.add('open');
            overlay.classList.add('visible');
            burger.setAttribute('aria-label', 'Close navigation menu');
            document.body.style.overflow = 'hidden';
        }
 
        function closeNav() {
            navUl.classList.remove('mobile-open');
            burger.classList.remove('open');
            overlay.classList.remove('visible');
            burger.setAttribute('aria-label', 'Open navigation menu');
            document.body.style.overflow = '';
        }
 
        burger.addEventListener('click', function (e) {
            e.stopPropagation();
            if (navUl.classList.contains('mobile-open')) {
                closeNav();
            } else {
                openNav();
            }
        });
 
        overlay.addEventListener('click', closeNav);
 
        // Close when a nav link is clicked (page navigation)
        if (navUl) {
            navUl.querySelectorAll('a.nav-link, a.nav-dropdown-item').forEach(function (link) {
                link.addEventListener('click', function () {
                    closeNav();
                });
            });
        }
 
        // Keep dropdown working inside sidebar on mobile
        var dropdownBtn = nav.querySelector('.nav-dropdown-btn');
        if (dropdownBtn) {
            // The existing dropdown toggle in scripts.js uses stopPropagation,
            // which is fine — the sidebar dropdown just displays inline via CSS.
            // No extra JS needed here.
        }
 
        // Close if window resizes above mobile breakpoint
        window.addEventListener('resize', function () {
            if (window.innerWidth > 768) {
                closeNav();
            }
        });
    }
 
    /* ── 2. Make specified sections collapsible on mobile ─────────────── */
    // Each entry: { selector, label }
    // selector: CSS selector for the section wrapper
    // label: text shown on the toggle button header
    var COLLAPSIBLE_SECTIONS = [
        { selector: '.skills-section',        label: 'Technical Skills'     },
        { selector: '#home .about-section:nth-child(2)', label: 'What I Do' },
    ];
 
    function initCollapsibles() {
        if (window.innerWidth > 768) return; // only on mobile
 
        COLLAPSIBLE_SECTIONS.forEach(function (cfg) {
            var el = document.querySelector(cfg.selector);
            if (!el) return;
 
            // Don't double-wrap
            if (el.classList.contains('collapsible-section')) return;
 
            // Wrap existing children in .collapsible-body
            var body = document.createElement('div');
            body.className = 'collapsible-body';
            while (el.firstChild) {
                body.appendChild(el.firstChild);
            }
 
            // Create toggle button
            var toggle = document.createElement('button');
            toggle.className = 'collapsible-toggle';
            toggle.innerHTML =
                '<span>' + cfg.label + '</span>' +
                '<span class="collapsible-arrow">▼</span>';
 
            el.appendChild(toggle);
            el.appendChild(body);
            el.classList.add('collapsible-section');
            // Collapsed by default
            // el.classList.add('expanded'); // uncomment to start expanded
 
            toggle.addEventListener('click', function () {
                el.classList.toggle('expanded');
            });
        });
    }
 
    /* ── 3. Project detail page collapsibles ──────────────────────────── */
    // On project detail pages, collapse the Process Breakdown and
    // Key Solutions sections behind a toggle.
    var DETAIL_COLLAPSIBLES = [
        { selector: '.process-breakdown',  label: 'Process Breakdown'  },
        { selector: '.process-columns',    label: 'Development Process' },
        { selector: '.takeaways-section',  label: 'Takeaways'          },
    ];
 
    function initDetailCollapsibles() {
        if (window.innerWidth > 768) return;
 
        DETAIL_COLLAPSIBLES.forEach(function (cfg) {
            var el = document.querySelector(cfg.selector);
            if (!el || el.classList.contains('collapsible-section')) return;
 
            var body = document.createElement('div');
            body.className = 'collapsible-body';
            while (el.firstChild) {
                body.appendChild(el.firstChild);
            }
 
            var toggle = document.createElement('button');
            toggle.className = 'collapsible-toggle';
            toggle.innerHTML =
                '<span>' + cfg.label + '</span>' +
                '<span class="collapsible-arrow">▼</span>';
 
            el.appendChild(toggle);
            el.appendChild(body);
            el.classList.add('collapsible-section');
        });
    }
 
    /* ── 4. Init on DOM ready ─────────────────────────────────────────── */
    function init() {
        initBurgerNav();
        initCollapsibles();
        initDetailCollapsibles();
    }
 
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
 
})();
 