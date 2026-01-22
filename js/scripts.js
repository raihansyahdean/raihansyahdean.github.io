// Navigation functionality
const navLinks = document.querySelectorAll('.nav-link');
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
    });
});

// Handle hash navigation on page load
window.addEventListener('load', function() {
    if (window.location.hash) {
        const hash = window.location.hash;
        setTimeout(() => {
            const targetElement = document.querySelector(hash);
            const navLinks = document.querySelectorAll('.nav-link');
            const pages = document.querySelectorAll('.page');
            
            if (targetElement) {
                navLinks.forEach(link => link.classList.remove('active'));
                pages.forEach(page => page.classList.remove('active'));
                
                const targetLink = document.querySelector(`a[href="${hash}"]`);
                if (targetLink) {
                    targetLink.classList.add('active');
                }
                targetElement.classList.add('active');
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }, 100);
    }
});