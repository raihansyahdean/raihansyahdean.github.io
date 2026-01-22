// Navigate back to experience section
function navigateToExperience(event) {
    event.preventDefault();
    window.location.href = '../index.html#experience';
    // Force scroll to experience section after a brief delay
    setTimeout(() => {
        const experienceSection = document.getElementById('experience');
        if (experienceSection) {
            experienceSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 100);
    return false;
}