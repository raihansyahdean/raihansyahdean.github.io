// ════════════════════════════════════════════════════════════════════════
// js/core/portfolioPage.js
// Builds a whole portfolio page out of js/data/portfolio-data.js.
//
// A portfolio page is just a shell:
//   <body data-page="portfolio" data-root="../" data-portfolio="producer">
//       <main class="container page active portfolio-page"></main>
//
// This file is the layout for EVERY portfolio page, so changing a section
// here changes it on all of them. Content changes go in portfolio-data.js.
// ════════════════════════════════════════════════════════════════════════

(function () {
    var body = document.body;
    var KEY  = body.dataset.portfolio;
    var ROOT = body.dataset.root || '';
    var main = document.querySelector('main');

    if (!main) return;

    var data = (typeof PORTFOLIOS !== 'undefined') ? PORTFOLIOS[KEY] : null;
    if (!data) {
        main.innerHTML = '<h1>Portfolio not found</h1>' +
            '<p class="page-lead">No entry named "' + esc(KEY || '') +
            '" in js/data/portfolio-data.js.</p>';
        return;
    }

    // Default top-to-bottom order. Override per page with `order: [...]`.
    var DEFAULT_ORDER = ['hero', 'stats', 'projects', 'skills', 'quote', 'thanks'];

    // ── Helpers ───────────────────────────────────────────────────────

    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    // Data files store paths from the site root; pages sit one folder deep
    function url(path) {
        return ROOT + path;
    }

    function pick(key, fallback) {
        return data[key] !== undefined ? data[key] : fallback;
    }

    // ── Section builders ──────────────────────────────────────────────

    function hero() {
        return '' +
        '<div class="hero">' +
            '<h1>' + esc(PORTFOLIO_SHARED.name) + '</h1>' +
            '<p class="subtitle">' + esc(data.subtitle || '') + '</p>' +
            '<div class="profile-intro">' +
                '<div class="profile-image-container">' +
                    '<img src="' + url(PORTFOLIO_SHARED.profileImage) + '" alt="' +
                        esc(PORTFOLIO_SHARED.profileAlt) + '" class="profile-pic">' +
                '</div>' +
                '<div class="intro-box"><p>' + (data.story || '') + '</p></div>' +
            '</div>' +
        '</div>';
    }

    function stats() {
        var cards = (PORTFOLIO_SHARED.stats || []).map(function (s) {
            return '<div class="home-stat-card">' +
                       '<div class="home-stat-number">' + esc(s.number) + '</div>' +
                       '<div class="home-stat-label">' + esc(s.label) + '</div>' +
                   '</div>';
        }).join('');

        return '<section class="stats-section"><div class="home-stat-cards">' +
               cards + '</div></section>';
    }

    function mediaBlock(m) {
        if (!m) return '<div class="featured-image"></div>';

        if (m.type === 'youtube') {
            return '<div class="featured-image featured-image--video">' +
                   '<iframe src="https://www.youtube.com/embed/' + esc(m.id) + '" ' +
                   'title="' + esc(m.alt || 'Project video') + '" ' +
                   'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
                   'allowfullscreen></iframe></div>';
        }

        if (m.type === 'video') {
            return '<div class="featured-image"><video autoplay loop muted playsinline' +
                   (m.controls ? ' controls' : '') + '>' +
                   '<source src="' + url(m.src) + '" type="video/mp4"></video></div>';
        }

        return '<div class="featured-image">' +
               '<img src="' + url(m.src) + '" alt="' + esc(m.alt || '') + '"></div>';
    }

    function projectCard(entry) {
        // An entry is either 'projectKey' or { id, media, detail, ... }
        var ref  = (typeof entry === 'string') ? { id: entry } : (entry || {});
        var base = PROJECT_LIBRARY[ref.id];

        if (!base) {
            console.warn('[portfolio] No project named "' + ref.id + '" in PROJECT_LIBRARY');
            return '';
        }

        // Per-page overrides win over the library entry
        var p = {
            title:  ref.title  || base.title,
            badges: ref.badges || base.badges || [],
            media:  ref.media  || base.media,
            desc:   ref.desc   || base.desc,
            detail: ref.detail !== undefined ? ref.detail : base.detail
        };

        var badges = p.badges.map(function (b) {
            return '<span class="featured-badge">' + esc(b) + '</span>';
        }).join('');

        var inner =
            mediaBlock(p.media) +
            '<div class="featured-content">' +
                '<h3 class="featured-title">' + esc(p.title) + '</h3>' +
                '<div class="featured-meta">' + badges + '</div>' +
                '<p class="featured-desc">' + esc(p.desc) + '</p>' +
                (p.detail ? '<span class="view-project">View Project →</span>' : '') +
            '</div>';

        // Linked cards are <a>; cards with no detail page are plain <div>
        return p.detail
            ? '<a href="' + url(p.detail) + '" class="featured-card" data-referrer="portfolio">' + inner + '</a>'
            : '<div class="featured-card">' + inner + '</div>';
    }

    function projects() {
        var list = data.projects || [];
        if (!list.length) return '';

        // var btn = pick('allProjectsButton', PORTFOLIO_SHARED.allProjectsButton);
        // var btnHTML = btn
        //     ? '<a href="' + url(btn.href) + '" class="all-projects-btn">' + esc(btn.label) + '</a>'
        //     : '';

        return '' +
        '<section class="featured-section">' +
            '<div class="section-header">' +
                '<h2 class="section-title">Featured Projects</h2>' +
                '<p class="section-subtitle">' + esc(data.projectsSubtitle || '') + '</p>' +
            '</div>' +
            '<div class="featured-projects">' + list.map(projectCard).join('') + '</div>' +
            // btnHTML +
        '</section>';
    }

    function skillRow(entry) {
        // An entry is either 'skillKey' or { id, level } to override the level.
        // (An old-style ['skillKey', level] pair still works.)
        var ref = (typeof entry === 'string') ? { id: entry }
                : Array.isArray(entry)        ? { id: entry[0], level: entry[1] }
                : (entry || {});

        var s = SKILL_LIBRARY[ref.id];
        if (!s) {
            console.warn('[portfolio] No skill named "' + ref.id + '" in SKILL_LIBRARY');
            return '';
        }

        // Level comes from the library unless this page overrides it
        var level = (ref.level !== undefined) ? ref.level : s.level;
        if (level === undefined) {
            console.warn('[portfolio] Skill "' + ref.id + '" has no level set');
            return '';
        }

        var name = s.icon
            ? '<span class="skill-name-wrapper">' +
                  '<img src="' + url(s.icon) + '" alt="' + esc(s.name) +
                  '" class="skill-icon skill-icon--' + (s.tone || 'dark') + '">' +
                  '<span class="skill-name">' + esc(s.name) + '</span>' +
              '</span>'
            : '<span class="skill-name">' + esc(s.name) + '</span>';

        return '<div class="skill-item">' +
                   '<div class="skill-header">' + name +
                       '<span class="skill-level">' + level + '/10</span>' +
                   '</div>' +
                   '<div class="skill-bar">' +
                       '<div class="skill-progress" style="width: ' + (level * 10) + '%"></div>' +
                   '</div>' +
               '</div>';
    }

    function skills() {
        var list = data.skills || [];
        if (!list.length) return '';

        return '<div class="skills-section">' +
                   '<h3 class="section-heading section-heading--main">' +
                       esc(data.skillsHeading || 'Skills') + '</h3>' +
                   '<div class="skills-container">' + list.map(skillRow).join('') + '</div>' +
               '</div>';
    }

    function quote() {
        var q = pick('quote', PORTFOLIO_SHARED.quote);
        if (!q) return '';

        return '<div class="quote-section"><div class="quote-container">' +
                   '<div class="quote-mark">"</div>' +
                   '<p class="quote-text">' + esc(q.text) + '</p>' +
                   '<div class="quote-author">' + esc(q.author) + '</div>' +
               '</div></div>';
    }

    function thanks() {
        var t = pick('thankYou', PORTFOLIO_SHARED.thankYou);
        if (!t) return '';

        return '<div class="thank-you-section">' +
                   '<div class="thank-you-text">' + esc(t.title) + '</div>' +
                   '<p class="thank-you-subtext">' + esc(t.text) + '</p>' +
               '</div>';
    }

    var SECTIONS = {
        hero:     hero,
        stats:    stats,
        projects: projects,
        skills:   skills,
        quote:    quote,
        thanks:   thanks
    };

    // ── Render ────────────────────────────────────────────────────────

    document.title = (data.title || data.subtitle || 'Portfolio') +
                     ' — ' + PORTFOLIO_SHARED.name;

    var extras = data.extraSections || {};

    main.innerHTML = (data.order || DEFAULT_ORDER).map(function (name) {
        if (SECTIONS[name])  return SECTIONS[name]();
        if (extras[name])    return extras[name];
        console.warn('[portfolio] Unknown section "' + name + '"');
        return '';
    }).join('');

    // Project cards remember which page to send the visitor back to
    main.querySelectorAll('[data-referrer]').forEach(function (card) {
        card.addEventListener('click', function () {
            if (typeof setProjectReferrer === 'function') {
                setProjectReferrer(card.dataset.referrer);   // js/core/layout.js
            }
        });
    });
})();
