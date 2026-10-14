// ── Resume viewer switcher ────────────────────────────────────────────
(function () {
    var btn    = document.getElementById('resumeDropdownBtn');
    var menu   = document.getElementById('resumeDropdownMenu');
    var label  = document.getElementById('resumeDropdownLabel');
    var iframe = document.getElementById('resumeIframe');
    var dlBtn  = document.getElementById('resumeDownloadBtn');
    var title  = document.getElementById('resumeViewerTitle');
    var fbLink = document.getElementById('resumeFallbackLink');

    if (!btn) return;

    // Toggle dropdown open/close
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        menu.classList.toggle('open');
        btn.classList.toggle('open');
    });

    // Close on outside click
    document.addEventListener('click', function () {
        menu.classList.remove('open');
        btn.classList.remove('open');
    });

    // Select an option
    menu.querySelectorAll('.resume-option').forEach(function (opt) {
        opt.addEventListener('click', function () {
            var file  = this.dataset.file;
            var icon  = this.dataset.icon;
            var lbl   = this.dataset.label;

            // Update active state
            menu.querySelectorAll('.resume-option').forEach(function (o) {
                o.classList.remove('active');
            });
            this.classList.add('active');

            // Update button label
            btn.querySelector('.resume-dropdown-icon').textContent = icon;
            label.textContent = lbl;

            // Update iframe, download link, header title, and fallback
            iframe.src      = file;
            dlBtn.href      = file;
            dlBtn.setAttribute('download', file.split('/').pop());
            title.textContent = lbl + ' Resume';
            if (fbLink) fbLink.href = file;

            // Close menu
            menu.classList.remove('open');
            btn.classList.remove('open');
        });
    });

    // Hide fallback if iframe loads successfully
    if (iframe) {
        iframe.addEventListener('load', function () {
            var fb = document.getElementById('resumeFallback');
            if (fb) fb.style.display = 'none';
        });
    }
})();