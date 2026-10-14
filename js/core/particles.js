// ════════════════════════════════════════════════════════════════════════
// js/core/particles.js — loaded on EVERY page
// Floating glowing particles in the background (#particlesContainer is
// created by layout.js).
// ════════════════════════════════════════════════════════════════════════

(function () {
    var PARTICLE_COUNT = 50;
    var COLORS = ['#58a6ff', '#ff6b35', '#f7931e', '#c792ea'];

    var container = document.getElementById('particlesContainer');
    if (!container) return;

    // One <style> tag holds every particle's keyframes; it's rewritten on
    // resize instead of piling up new tags each time.
    var keyframeStyle = document.createElement('style');
    document.head.appendChild(keyframeStyle);

    function createParticles() {
        container.innerHTML = '';
        var keyframes = '';

        for (var i = 0; i < PARTICLE_COUNT; i++) {
            var size     = Math.random() * 4 + 3;              // 3–7px
            var startX   = Math.random() * window.innerWidth;
            var startY   = Math.random() * window.innerHeight;
            var duration = Math.random() * 15 + 15;            // 15–30s
            var delay    = Math.random() * 10;                 // 0–10s
            var color    = COLORS[Math.floor(Math.random() * COLORS.length)];
            var drift    = Math.random() * 200 - 100;          // -100–100px

            var particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText =
                'position:absolute;' +
                'width:' + size + 'px;height:' + size + 'px;' +
                'background:' + color + ';' +
                'border-radius:50%;' +
                'left:' + startX + 'px;top:' + startY + 'px;' +
                'opacity:0;' +
                'box-shadow:0 0 ' + (size * 2) + 'px ' + color + ';' +
                'animation:particleFloat' + i + ' ' + duration + 's linear ' + delay + 's infinite;' +
                'pointer-events:none;';

            keyframes +=
                '@keyframes particleFloat' + i + '{' +
                    '0%{transform:translateY(0) translateX(0);opacity:0}' +
                    '10%{opacity:.8}' +
                    '90%{opacity:.8}' +
                    '100%{transform:translateY(-' + (window.innerHeight + 200) + 'px) translateX(' + drift + 'px);opacity:0}' +
                '}';

            container.appendChild(particle);
        }

        keyframeStyle.textContent = keyframes;
    }

    createParticles();

    // Re-spread particles after the window is resized
    var resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(createParticles, 500);
    });
})();
