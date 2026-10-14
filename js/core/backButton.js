// ════════════════════════════════════════════════════════════════════════
// js/core/backButton.js — detail pages only
// (pages-projects/*.html and pages-experience/*.html)
//
// Sends the visitor back to wherever they came from. The page that links
// here calls setProjectReferrer(source) first — that function lives in
// js/core/layout.js, which every page with a nav already loads.
//
// To add a new source: add a line to ROUTES below, and call
// setProjectReferrer('your-source') on the page that links here.
// ════════════════════════════════════════════════════════════════════════

var ROUTES = {
    'index-home':     { href: '../index.html',      label: '← Back to Home' },
    'index-projects': { href: '../projects.html',   label: '← Back to Projects' },
    'experience':     { href: '../experience.html', label: '← Back to Experience' },
    // 'portfolio' is special: the exact page URL is stored alongside it,
    // so the visitor returns to the specific portfolio they came from.
    'portfolio':      { href: '../index.html',      label: '← Back to Portfolio' }
};

var DEFAULT_SOURCE = 'index-projects';

function getReferrer() {
    try {
        return {
            source: sessionStorage.getItem('projectReferrer') || DEFAULT_SOURCE,
            url:    sessionStorage.getItem('projectReferrerUrl')
        };
    } catch (e) {
        return { source: DEFAULT_SOURCE, url: null };
    }
}

function clearReferrer() {
    try {
        sessionStorage.removeItem('projectReferrer');
        sessionStorage.removeItem('projectReferrerUrl');
    } catch (e) { /* storage blocked — ignore */ }
}

document.addEventListener('DOMContentLoaded', function () {
    var btn = document.querySelector('.back-button');
    if (!btn) return;

    var ref   = getReferrer();
    var route = ROUTES[ref.source] || ROUTES[DEFAULT_SOURCE];

    // A portfolio referrer carries the exact page it came from
    var target = (ref.source === 'portfolio' && ref.url) ? ref.url : route.href;

    // Set both, so middle-click and "open in new tab" work too
    btn.textContent = route.label;
    btn.setAttribute('href', target);

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        clearReferrer();
        window.location.href = target;
    });
});
