// ── Back button: returns to wherever the user came from ──────────────────
//
// Possible sources written to sessionStorage before navigating here:
//   'index-home'     → ../index.html  (home section)
//   'index-projects' → ../index.html#projects
//   'portfolio'      → the specific portfolio page (stored as a full path)
//
// Any page that links to a project detail page should call
// setProjectReferrer('index-home' | 'index-projects' | 'portfolio') before navigating.

function setProjectReferrer(source) {
    // For portfolio pages, also store the exact URL so we can go back to it
    if (source === 'portfolio') {
        sessionStorage.setItem('projectReferrerUrl', document.location.href);
    }
    sessionStorage.setItem('projectReferrer', source);
}

function navigateBack(event) {
    event.preventDefault();

    const source   = sessionStorage.getItem('projectReferrer') || 'index-projects';
    const url      = sessionStorage.getItem('projectReferrerUrl') || null;

    sessionStorage.removeItem('projectReferrer');
    sessionStorage.removeItem('projectReferrerUrl');

    if (source === 'portfolio' && url) {
        window.location.href = url;
    } else if (source === 'index-home') {
        window.location.href = '../index.html';
    } else {
        // default: index-projects
        window.location.href = '../index.html#projects';
    }

    return false;
}

// On load: update the back button label and href to reflect the source
document.addEventListener('DOMContentLoaded', function () {
    const source = sessionStorage.getItem('projectReferrer') || 'index-projects';
    const btn    = document.querySelector('.back-button');
    if (!btn) return;

    if (source === 'portfolio') {
        btn.textContent = '← Back to Portfolio';
    } else if (source === 'index-home') {
        btn.textContent = '← Back to Home';
    } else {
        btn.textContent = '← Back to Projects';
    }
});