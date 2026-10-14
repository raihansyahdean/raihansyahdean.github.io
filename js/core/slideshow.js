// ════════════════════════════════════════════════════════════════════════
// js/core/slideshow.js — detail pages only
//
// Runs every .slideshow-container on the page. In the HTML you only write
// the slides; the dots are generated here, one per slide, so you never
// have to keep a dot count in sync.
//
//   <div class="slideshow-container">
//       <div class="slide active"><img src="..." alt="..."></div>
//       <div class="slide"><video controls><source src="..."></video></div>
//       <button class="prev-slide" aria-label="Previous slide">❮</button>
//       <button class="next-slide" aria-label="Next slide">❯</button>
//       <div class="slide-controls"></div>
//   </div>
//
// Auto-advances every 5s, pauses while the pointer is over it, and hides
// its own controls when there is only one slide.
// ════════════════════════════════════════════════════════════════════════

(function () {
    var AUTO_ADVANCE_MS = 5000;

    function initSlideshow(box) {
        var slides = box.querySelectorAll('.slide');
        var dotBar = box.querySelector('.slide-controls');
        var prev   = box.querySelector('.prev-slide');
        var next   = box.querySelector('.next-slide');
        if (!slides.length) return;

        var index = 0;
        var timer = null;

        // One slide: nothing to navigate
        if (slides.length === 1) {
            box.classList.add('single');
            slides[0].classList.add('active');
            return;
        }

        // Build one dot per slide
        var dots = [];
        if (dotBar) {
            dotBar.innerHTML = '';
            slides.forEach(function (_, i) {
                var dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'slide-dot';
                dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
                dot.addEventListener('click', function () {
                    show(i);
                    restart();
                });
                dotBar.appendChild(dot);
                dots.push(dot);
            });
        }

        function show(i) {
            index = (i + slides.length) % slides.length;
            slides.forEach(function (s, n) { s.classList.toggle('active', n === index); });
            dots.forEach(function (d, n) { d.classList.toggle('active', n === index); });

            // Stop a video that has just been scrolled off
            slides.forEach(function (s, n) {
                if (n === index) return;
                var v = s.querySelector('video');
                if (v && !v.paused) v.pause();
            });
        }

        function step(by) {
            show(index + by);
            restart();
        }

        function restart() {
            clearInterval(timer);
            timer = setInterval(function () { show(index + 1); }, AUTO_ADVANCE_MS);
        }

        if (prev) prev.addEventListener('click', function () { step(-1); });
        if (next) next.addEventListener('click', function () { step(1); });

        // Pause while the visitor is looking at or using it
        box.addEventListener('mouseenter', function () { clearInterval(timer); });
        box.addEventListener('mouseleave', restart);
        box.addEventListener('focusin',    function () { clearInterval(timer); });

        show(0);
        restart();
    }

    document.addEventListener('DOMContentLoaded', function () {
        document.querySelectorAll('.slideshow-container').forEach(initSlideshow);
    });
})();
