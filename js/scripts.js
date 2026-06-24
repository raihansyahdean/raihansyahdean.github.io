// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link:not(.nav-dropdown-btn)');
const pages = document.querySelectorAll('.page');
 
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        
        // Update active states
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        pages.forEach(page => page.classList.remove('active'));
        document.getElementById(targetId).classList.add('active');
        
        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
 
        // Update URL hash
        window.location.hash = targetId;
    });
});
 
function navigateToSection(sectionId) {
    // Remove # if present
    const targetId = sectionId.replace('#', '');
    
    // Update nav active states
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + targetId) {
            link.classList.add('active');
        }
    });
    
    // Update page visibility
    pages.forEach(page => page.classList.remove('active'));
    const targetPage = document.getElementById(targetId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Update URL hash
    window.location.hash = targetId;
}
 
// Handle hash changes (back/forward browser buttons)
window.addEventListener('hashchange', function() {
    const hash = window.location.hash.substring(1) || 'home';
    navigateToSection(hash);
});
 
// Handle hash navigation on page load
window.addEventListener('load', function() {
    const hash = window.location.hash.substring(1);
    if (hash) {
        navigateToSection(hash);
    }
});
 
// ── Portfolios dropdown toggle ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function () {
    var dropdownBtn = document.querySelector('.nav-dropdown-btn');
    if (dropdownBtn) {
        dropdownBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            this.closest('.nav-dropdown').classList.toggle('open');
        });
        
        document.addEventListener('click', function () {
            document.querySelectorAll('.nav-dropdown').forEach(function (d) { d.classList.remove('open'); });
        });
    }
 
    // ── Handle navigateTo from portfolio pages ────────────────────
    var target = sessionStorage.getItem('navigateTo');
    if (target && typeof navigateToSection === 'function') {
        sessionStorage.removeItem('navigateTo');
        navigateToSection(target);
    }
});