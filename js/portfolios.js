// ── Navigate back to main site section ───────────────────────
// Writes the target section to sessionStorage, then lets the
// href navigate to index.html which reads it on load.
function goToMainSection(section) {
    sessionStorage.setItem('navigateTo', section);
    // navigation proceeds via the href — do NOT return false
}

function setProjectReferrer(source) {
    if (source === 'portfolio') {
        sessionStorage.setItem('projectReferrerUrl', document.location.href);
    }
    sessionStorage.setItem('projectReferrer', source);
}