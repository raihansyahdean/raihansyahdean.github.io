// ════════════════════════════════════════════════════════════════════════
// js/pages/experience.js — experience.html only
// Timeline images open a job's detail page, or a "Coming Soon" popup.
// ════════════════════════════════════════════════════════════════════════

// When you finish a job detail page, add its path here. The image
// switches from "Details Page Coming Soon" to "View Details →" automatically.
var AVAILABLE_EXPERIENCE_PAGES = [
    'pages-experience/template.html'
    // 'pages-experience/exp-ecomindo.html',
    // 'pages-experience/exp-codomo.html',
    // 'pages-experience/exp-projectseed.html'
];

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.timeline-image-link[data-project]').forEach(function (link) {
        var path = link.dataset.project;
        var available = AVAILABLE_EXPERIENCE_PAGES.indexOf(path) !== -1;

        link.classList.toggle('unavailable', !available);
        link.setAttribute('href', available ? path : '#');

        link.addEventListener('click', function (e) {
            if (available) {
                setProjectReferrer('experience');   // defined in js/core/layout.js
            } else {
                e.preventDefault();
                openModal('workModal');             // defined in js/core/modal.js
            }
        });
    });
});
