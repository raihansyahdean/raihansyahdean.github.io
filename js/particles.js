// Enhanced Particle System
function createParticles() {
    const particlesContainer = document.getElementById('particlesContainer');
    const colors = ['#58a6ff', '#ff6b35', '#f7931e', '#c792ea'];
    const particleCount = 50; // Increased from ~16 to 50
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 3; // 3px to 7px (bigger)
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const duration = Math.random() * 15 + 15; // 15-30 seconds
        const delay = Math.random() * 10; // 0-10 second delay
        const color = colors[Math.floor(Math.random() * colors.length)];
        const drift = Math.random() * 200 - 100; // -100 to 100px horizontal drift
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: 50%;
            left: ${startX}px;
            top: ${startY}px;
            opacity: 0;
            box-shadow: 0 0 ${size * 2}px ${color};
            animation: particleFloat${i} ${duration}s linear ${delay}s infinite;
            pointer-events: none;
        `;
        
        // Create unique animation for each particle
        const keyframes = `
            @keyframes particleFloat${i} {
                0% {
                    transform: translateY(0) translateX(0);
                    opacity: 0;
                }
                10% {
                    opacity: 0.8;
                }
                90% {
                    opacity: 0.8;
                }
                100% {
                    transform: translateY(-${window.innerHeight + 200}px) translateX(${drift}px);
                    opacity: 0;
                }
            }
        `;
        
        // Add keyframes to document
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles when page loads
createParticles();

// Recreate particles on window resize to maintain proper distribution
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        const particlesContainer = document.getElementById('particlesContainer');
        particlesContainer.innerHTML = '';
        createParticles();
    }, 500);
});