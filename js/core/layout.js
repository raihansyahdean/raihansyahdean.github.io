// ════════════════════════════════════════════════════════════════════════
// js/core/layout.js — loaded on EVERY page, right after <body>
//
// Renders the shared animated background + navigation bar, so the nav
// lives in ONE place instead of being copy-pasted into every HTML file.
//
// Each page tells this script who it is via attributes on <body>:
//   data-page="home | projects | experience | resume | contact | portfolio"
//   data-root=""     → for pages in the site root (index.html, projects.html…)
//   data-root="../"  → for pages one folder deep (portfolios/*.html, pages-projects/*.html)
//
// To add / rename / reorder nav items: edit NAV_ITEMS or PORTFOLIO_ITEMS.
// ════════════════════════════════════════════════════════════════════════

(function () {
    var body    = document.body;
    var ROOT    = body.dataset.root || '';
    var CURRENT = body.dataset.page || '';

    // ── Main nav ──────────────────────────────────────────────────────
    // `id` must match a page's data-page value so it gets highlighted.
    var NAV_ITEMS = [
        { id: 'home',       label: 'Home',       href: 'index.html' },
        { id: 'portfolio',  label: 'Portfolios', dropdown: true },
        { id: 'projects',   label: 'Projects',   href: 'projects.html' },
        { id: 'experience', label: 'Experience', href: 'experience.html' },
        { id: 'resume',     label: 'Resume',     href: 'resume.html' },
        { id: 'contact',    label: 'Contact',    href: 'contact.html' }
    ];

    // ── Portfolios dropdown ───────────────────────────────────────────
    // Uncomment a line when that portfolio page is ready.
    var PORTFOLIO_ITEMS = [
        { icon: '🎮', label: 'Game Producing', href: 'portfolios/producer.html' },
        { icon: '🎨', label: 'Game Design',    href: 'portfolios/designer.html' },
        { icon: '🔧', label: 'Technical Art',  href: 'portfolios/technical-artist.html' }
        // { icon: '🎵', label: 'Game Audio',       href: 'portfolios/audio.html' },
        // { icon: '💻', label: 'Game Engineering', href: 'portfolios/engineer.html' },
        // { icon: '🖼️', label: 'Art',              href: 'portfolios/artist.html' }
    ];

    // ── Old single-page links → new pages ─────────────────────────────
    // Keeps old links like "index.html#projects" (and the sessionStorage
    // "navigateTo" trick used by portfolio pages) working.
    var LEGACY_ROUTES = {
        projects:   'projects.html',
        experience: 'experience.html',
        resume:     'resume.html',
        contact:    'contact.html'
    };

    if (CURRENT === 'home') {
        var legacyTarget = window.location.hash.substring(1);
        try {
            var stored = sessionStorage.getItem('navigateTo');
            if (stored) {
                sessionStorage.removeItem('navigateTo');
                legacyTarget = stored.replace('#', '');
            }
        } catch (e) { /* storage blocked — ignore */ }

        if (LEGACY_ROUTES[legacyTarget]) {
            window.location.replace(ROOT + LEGACY_ROUTES[legacyTarget]);
            return;
        }
    }

    // ── Build markup ──────────────────────────────────────────────────
    function navLink(item) {
        var active = item.id === CURRENT ? ' active' : '';
        return (
            '<li><a href="' + ROOT + item.href + '" class="nav-link' + active + '">' +
                '<span class="nav-text">' + item.label + '</span>' +
                '<span class="nav-hover-effect"></span>' +
            '</a></li>'
        );
    }

    function navDropdown(item) {
        var active = item.id === CURRENT ? ' active' : '';
        var links = PORTFOLIO_ITEMS.map(function (p) {
            return '<li><a href="' + ROOT + p.href + '" class="nav-dropdown-item">' +
                   p.icon + ' ' + p.label + '</a></li>';
        }).join('');

        return (
            '<li class="nav-dropdown' + active + '">' +
                '<button class="nav-link nav-dropdown-btn' + active + '" type="button">' +
                    '<span class="nav-text">' + item.label + ' ▾</span>' +
                    '<span class="nav-hover-effect"></span>' +
                '</button>' +
                '<ul class="nav-dropdown-menu">' + links + '</ul>' +
            '</li>'
        );
    }

    var background =
        '<div class="bg-grid"></div>' +
        '<div class="bg-particles" id="particlesContainer"></div>' +
        '<div class="bg-gradient-orb bg-gradient-orb-1"></div>' +
        '<div class="bg-gradient-orb bg-gradient-orb-2"></div>' +
        '<div class="bg-gradient-orb bg-gradient-orb-3"></div>';

    var nav =
        '<nav>' +
            '<div class="nav-glow"></div>' +
            '<ul>' +
                NAV_ITEMS.map(function (item) {
                    return item.dropdown ? navDropdown(item) : navLink(item);
                }).join('') +
            '</ul>' +
        '</nav>';

    body.insertAdjacentHTML('afterbegin', background + nav);

    // ── Dropdown behaviour ────────────────────────────────────────────
    var dropdown    = body.querySelector('.nav-dropdown');
    var dropdownBtn = body.querySelector('.nav-dropdown-btn');

    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            dropdown.classList.toggle('open');
        });

        document.addEventListener('click', function () {
            dropdown.classList.remove('open');
        });
    }

    // Older portfolio pages mark themselves with .portfolio-page instead
    // of data-page="portfolio" — highlight the dropdown for them too.
    document.addEventListener('DOMContentLoaded', function () {
        if (dropdown && document.querySelector('.portfolio-page')) {
            dropdown.classList.add('active');
            dropdownBtn.classList.add('active');
        }
    });
})();

// ── Shared helper ──────────────────────────────────────────────────────
// Remember where the visitor came from before opening a project detail
// page, so that page's "Back" button can return to the right place.
function setProjectReferrer(source) {
    try {
        if (source === 'portfolio') {
            sessionStorage.setItem('projectReferrerUrl', document.location.href);
        }
        sessionStorage.setItem('projectReferrer', source);
    } catch (e) { /* storage blocked — ignore */ }
}
