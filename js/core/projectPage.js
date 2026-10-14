// ════════════════════════════════════════════════════════════════════════
// js/core/projectPage.js
// Builds a project / experience detail page from js/data/project-pages.js.
//
// A detail page is just a shell:
//   <body data-root="../" data-project="underwater-shader">
//       <main class="container"></main>
//
// This file is the LAYOUT for every detail page — change a section here
// and it changes on all of them. Content goes in project-pages.js,
// styling goes in the :root tokens at the top of css/pages/detail.css.
//
// Runs before DOMContentLoaded, so slideshow.js finds the slides it built.
// ════════════════════════════════════════════════════════════════════════

(function () {
    var body = document.body;
    var KEY  = body.dataset.project;
    var ROOT = body.dataset.root || '';
    var main = document.querySelector('main');

    if (!main) return;

    var data = (typeof PROJECT_PAGES !== 'undefined') ? PROJECT_PAGES[KEY] : null;
    if (!data) {
        main.innerHTML = '<h1 class="project-title">Project not found</h1>' +
            '<p class="project-subtitle">No entry named "' + esc(KEY || '') +
            '" in js/data/project-pages.js.</p>';
        return;
    }

    // Section headings. Override any of them per project with `labels: {}`.
    var LABELS = {
        details:      'Project Details',
        process:      'Process',
        breakdown:    'Detailed Breakdown',
        solutions:    'Key Solutions',
        stageResults: 'Stage Results',
        finalResults: 'Final Results',
        takeaways:    'Takeaways',
        takeawaysSub: 'Project Insights & Learnings'
    };

    // Takeaway leads alternate through these when no `tone` is given
    var TAKEAWAY_TONES = ['highlight', 'highlight-orange'];

    // ── Helpers ───────────────────────────────────────────────────────

    function esc(s) {
        return String(s == null ? '' : s)
            .replace(/&/g, '&amp;').replace(/</g, '&lt;')
            .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function url(path) { return ROOT + path; }

    function label(key) {
        return (data.labels && data.labels[key]) || LABELS[key];
    }

    function pad(n) { return String(n).padStart(2, '0'); }

    // Body text may contain HTML (highlight spans, links), so it isn't escaped.
    // Only attributes and short plain labels go through esc().
    function listItems(points) {
        return (points || []).map(function (p) { return '<li>' + p + '</li>'; }).join('');
    }

    // Returns the bare media element; each caller supplies its own wrapper.
    //   { type:'image',   src, alt }
    //   { type:'video',   src, controls, autoplay }   autoplay defaults to true
    //   { type:'youtube', id }
    function media(m) {
        if (!m) return '';

        if (m.type === 'youtube') {
            return '<iframe src="https://www.youtube.com/embed/' + esc(m.id) + '" ' +
                   'title="' + esc(m.alt || 'Video') + '" ' +
                   'allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" ' +
                   'allowfullscreen></iframe>';
        }

        if (m.type === 'video') {
            // controls and autoplay are independent, so a clip can have both
            var autoplay = (m.autoplay !== false);
            return '<video' +
                   (m.controls ? ' controls' : '') +
                   (autoplay ? ' autoplay loop muted playsinline' : '') + '>' +
                   '<source src="' + url(m.src) + '" type="video/mp4">' +
                   'Your browser does not support the video tag.</video>';
        }

        return '<img src="' + url(m.src) + '" alt="' + esc(m.alt || '') + '">';
    }

    function section(title, inner) {
        if (!inner) return '';
        return '<section class="section">' +
                   '<h2 class="section-title">' + esc(title) + '</h2>' +
                   inner +
               '</section>';
    }

    // ── Section 1: carousel + description + info boxes ────────────────

    function slideshow() {
        var slides = data.slides || [];
        if (!slides.length) return '';

        return '<div class="slideshow-container' +
                   (data.slideFit === 'contain' ? ' slides-contain' : '') + '">' +
                   slides.map(function (m, i) {
                       return '<div class="slide' + (i === 0 ? ' active' : '') + '">' +
                              media(m) + '</div>';
                   }).join('') +
                   '<button class="prev-slide" type="button" aria-label="Previous slide">❮</button>' +
                   '<button class="next-slide" type="button" aria-label="Next slide">❯</button>' +
                   '<div class="slide-controls"></div>' +
               '</div>';
    }

    function description() {
        if (!data.description) return '';
        return '<div class="description-box"><p>' + data.description + '</p></div>';
    }

    function infoBoxes() {
        var boxes = data.info || [];
        if (!boxes.length) return '';

        return '<div class="info-grid">' +
               boxes.map(function (b) {
                   return '<div class="info-list">' +
                              '<h3>' + esc(b.heading) + '</h3>' +
                              '<ul>' + listItems(b.items) + '</ul>' +
                          '</div>';
               }).join('') +
               '</div>';
    }

    // ── Section 2: process columns + breakdown ────────────────────────

    function processColumns() {
        var steps = data.process || [];
        if (!steps.length) return '';

        return '<div class="process-columns">' +
               steps.map(function (s, i) {
                   return '<div class="process-column">' +
                              '<div class="process-number">' + esc(s.number || pad(i + 1)) + '</div>' +
                              '<h3>' + esc(s.title) + '</h3>' +
                              '<ul>' + listItems(s.points) + '</ul>' +
                          '</div>';
               }).join('') +
               '</div>';
    }

    function breakdown() {
        var items = data.breakdown || [];
        if (!items.length) return '';

        // The items sit in their own wrapper so the alternating sides count
        // from the first item rather than from the heading.
        return '<div class="process-breakdown">' +
                   '<h3 class="breakdown-heading">' + esc(label('breakdown')) + '</h3>' +
                   '<div class="breakdown-items">' +
                   items.map(function (it) {
                       return '<div class="breakdown-item">' +
                                  '<div class="breakdown-content">' +
                                      '<h4>' + esc(it.title) + '</h4>' +
                                      '<ul>' + listItems(it.points) + '</ul>' +
                                  '</div>' +
                                  (it.media ? '<div class="breakdown-image">' + media(it.media) + '</div>' : '') +
                              '</div>';
                   }).join('') +
                   '</div>' +
               '</div>';
    }

    // ── Section 3: key solutions ──────────────────────────────────────

    function feature(f) {
        var text = '<h4 class="feature-title">' + esc(f.title) + '</h4>' +
                   '<ul class="feature-points">' + listItems(f.points) + '</ul>';

        // With media the text and media sit side by side; without, it's plain
        var inner = f.media
            ? '<div class="feature-header">' +
                  '<div class="feature-text">' + text + '</div>' +
                  '<div class="feature-media">' + media(f.media) + '</div>' +
              '</div>'
            : text;

        return '<div class="feature-section">' + inner + '</div>';
    }

    function stageResults(r) {
        if (!r) return '';

        return '<div class="stage-results">' +
                   '<h4>' + esc(label('stageResults')) + '</h4>' +
                   '<div class="results-content' + (r.media ? ' with-media' : '') + '">' +
                       '<div class="results-text"><p>' + (r.text || '') + '</p></div>' +
                       (r.media ? '<div class="results-media">' + media(r.media) + '</div>' : '') +
                   '</div>' +
               '</div>';
    }

    function stage(s, i) {
        var id = s.id || ('stage' + (i + 1));

        // `number` is free text — "Algorithm 01", "Bringing it Together", …
        var number = s.number !== undefined ? s.number : ('Stage ' + pad(i + 1));

        var ideaBox = (s.problem || s.solution)
            ? '<div class="idea-box">' +
                  (s.problem
                      ? '<div class="idea-problem">' +
                            '<span class="idea-problem-label">⚠️ Problem</span>' +
                            '<p class="idea-problem-text">' + s.problem + '</p>' +
                        '</div>' : '') +
                  (s.solution
                      ? '<div>' +
                            '<span class="idea-solution-label">✓ Solution</span>' +
                            '<p class="idea-solution-text">' + s.solution + '</p>' +
                        '</div>' : '') +
              '</div>'
            : '';

        return '<div class="stage" id="' + esc(id) + '">' +
                   '<div class="stage-header">' +
                       (number ? '<div class="stage-number">' + esc(number) + '</div>' : '') +
                       '<h3 class="stage-title">' + esc(s.title) + '</h3>' +
                   '</div>' +
                   ideaBox +
                   (s.features || []).map(feature).join('') +
                   stageResults(s.results) +
               '</div>';
    }

    function solutionsSection() {
        var stages = data.stages || [];
        if (!stages.length) return '';

        var nav = '<div class="stage-navigation">' +
                  stages.map(function (s, i) {
                      var id = s.id || ('stage' + (i + 1));
                      return '<a href="#' + esc(id) + '" class="stage-nav-btn">' +
                             esc(s.navLabel || s.title) + '</a>';
                  }).join('') +
                  '</div>';

        return section(label('solutions'), nav + stages.map(stage).join(''));
    }

    // ── Section 4: final results — one paragraph, one media ───────────

    function finalSection() {
        var f = data.finalResults;
        if (!f) return '';

        return section(label('finalResults'),
            (f.text ? '<p class="final-results-desc">' + f.text + '</p>' : '') +
            (f.media ? '<div class="final-results-media">' +
                           '<div class="final-media-frame">' + media(f.media) + '</div>' +
                       '</div>' : '')
        );
    }

    // ── Section 5: takeaways ──────────────────────────────────────────

    function takeawaysSection() {
        var list = data.takeaways || [];
        if (!list.length) return '';

        var items = list.map(function (t, i) {
            if (typeof t === 'string') return '<li>' + t + '</li>';
            // Leads alternate blue / orange unless the entry names a tone
            var tone = t.tone ? ('highlight-' + t.tone).replace('-blue', '')
                              : TAKEAWAY_TONES[i % TAKEAWAY_TONES.length];
            return '<li><span class="' + tone + '">' + esc(t.lead) + '</span> ' +
                   (t.text || '') + '</li>';
        }).join('');

        return section(label('takeaways'),
            '<div class="takeaways-section">' +
                '<h3>' + esc(label('takeawaysSub')) + '</h3>' +
                '<ul class="takeaways-list">' + items + '</ul>' +
            '</div>');
    }

    // ── Bottom button ─────────────────────────────────────────────────

    function externalLink() {
        var l = data.externalLink;
        if (!l) return '';

        return '<div class="external-project-section">' +
                   '<a href="' + esc(l.href) + '" class="external-project-btn" ' +
                   'target="_blank" rel="noopener">' + esc(l.label) + '</a>' +
               '</div>';
    }

    // ── Render ────────────────────────────────────────────────────────

    document.title = (data.title || 'Project') + ' — Raihansyah A. Andrian';

    main.innerHTML =
        '<h1 class="project-title">' + esc(data.title || '') + '</h1>' +
        (data.subtitle ? '<p class="project-subtitle">' + esc(data.subtitle) + '</p>' : '') +
        section(label('details'), slideshow() + description() + infoBoxes()) +
        section(label('process'), processColumns() + breakdown()) +
        solutionsSection() +
        finalSection() +
        takeawaysSection() +
        externalLink();
})();
