// ════════════════════════════════════════════════════════════════════════
// js/pages/projects.js — projects.html only
// 1. "View Details" buttons (detail page or "Coming Soon" popup)
// 2. Dual filter (Type + Role) with automatic count badges
// ════════════════════════════════════════════════════════════════════════

// ── 1. Project detail pages ─────────────────────────────────────────────
// When you finish a detail page, add its path here. That's it — the button
// turns from grey to blue and links to the page automatically.
var AVAILABLE_PROJECT_PAGES = [
    'pages-projects/template.html',
    'pages-projects/underwater-shader.html'
    // 'pages-projects/elementary.html',
    // 'pages-projects/pulse-pole.html',
    // 'pages-projects/rube-goldberg.html',
    // 'pages-projects/light-grows.html',
    // 'pages-projects/pitch-it.html',
    // 'pages-projects/formula-faceoff.html',
    // 'pages-projects/covid-colony.html',
    // 'pages-projects/reminiscence.html',
    // 'pages-projects/unreal-logic.html'
];

function isProjectPageAvailable(path) {
    return AVAILABLE_PROJECT_PAGES.indexOf(path) !== -1;
}

function setupDetailButtons() {
    document.querySelectorAll('.view-details[data-project]').forEach(function (btn) {
        var path = btn.dataset.project;
        var available = isProjectPageAvailable(path);

        btn.classList.toggle('unavailable', !available);
        btn.setAttribute('href', available ? path : '#');

        btn.addEventListener('click', function (e) {
            if (available) {
                setProjectReferrer('index-projects');   // defined in js/core/layout.js
            } else {
                e.preventDefault();
                openModal('projectModal');              // defined in js/core/modal.js
            }
        });
    });
}

// ── 2. Filters ──────────────────────────────────────────────────────────
// Filter buttons are read straight from the HTML (data-group + data-filter),
// so adding a new type/role only needs a new button + matching values in
// each card's data-types / data-roles. No JS list to keep in sync.
var activeFilters = { type: 'all', role: 'all' };

// data-group on the button → data attribute on the card
var GROUP_TO_CARD_ATTR = { type: 'types', role: 'roles' };

function cardValues(card, group) {
    return (card.dataset[GROUP_TO_CARD_ATTR[group]] || '')
        .split(',')
        .map(function (s) { return s.trim(); })
        .filter(Boolean);
}

function cardMatches(card, group, filter) {
    return filter === 'all' || cardValues(card, group).indexOf(filter) !== -1;
}

function applyFilters() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.project-card'));

    // Show / hide cards (must match BOTH active filters)
    cards.forEach(function (card) {
        var visible = cardMatches(card, 'type', activeFilters.type) &&
                      cardMatches(card, 'role', activeFilters.role);
        card.classList.toggle('hidden', !visible);
    });

    // Count badges: total cards per button (independent of the other filter)
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
        var badge = btn.querySelector('.project-count');
        if (!badge) return;
        var group  = btn.dataset.group;
        var filter = btn.dataset.filter;
        badge.textContent = cards.filter(function (card) {
            return cardMatches(card, group, filter);
        }).length;
    });
}

function setupFilters() {
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var group = this.dataset.group;

            document.querySelectorAll('.filter-btn[data-group="' + group + '"]')
                .forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');

            activeFilters[group] = this.dataset.filter;
            applyFilters();
        });
    });

    applyFilters();
}

// ── Init ────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    setupDetailButtons();
    setupFilters();
});
