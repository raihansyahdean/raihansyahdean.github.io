// ════════════════════════════════════════════════════════════════════════
// js/pages/resume.js — resume.html only
// Dropdown that swaps which resume PDF is shown / downloaded.
// To add a resume: add an <li class="resume-option" data-file=… data-icon=…
// data-label=…> to the dropdown in resume.html. No JS change needed.
// ════════════════════════════════════════════════════════════════════════

(function () {
    var btn    = document.getElementById('resumeDropdownBtn');
    var menu   = document.getElementById('resumeDropdownMenu');
    var label  = document.getElementById('resumeDropdownLabel');
    var iframe = document.getElementById('resumeIframe');
    var dlBtn  = document.getElementById('resumeDownloadBtn');
    var title  = document.getElementById('resumeViewerTitle');
    var fbLink = document.getElementById('resumeFallbackLink');

    if (!btn || !menu) return;

    function setOpen(open) {
        menu.classList.toggle('open', open);
        btn.classList.toggle('open', open);
    }

    // Toggle dropdown
    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        setOpen(!menu.classList.contains('open'));
    });

    // Close on outside click
    document.addEventListener('click', function () {
        setOpen(false);
    });

    // Pick a resume
    menu.querySelectorAll('.resume-option').forEach(function (opt) {
        opt.addEventListener('click', function () {
            var file = this.dataset.file;
            var lbl  = this.dataset.label;

            menu.querySelectorAll('.resume-option').forEach(function (o) {
                o.classList.remove('active');
            });
            this.classList.add('active');

            btn.querySelector('.resume-dropdown-icon').textContent = this.dataset.icon;
            label.textContent = lbl;

            iframe.src = file;
            dlBtn.href = file;
            dlBtn.setAttribute('download', file.split('/').pop());
            title.textContent = lbl + ' Resume';
            if (fbLink) fbLink.href = file;

            setOpen(false);
        });
    });

    // Hide the fallback message once the PDF loads
    if (iframe) {
        iframe.addEventListener('load', function () {
            var fb = document.getElementById('resumeFallback');
            if (fb) fb.style.display = 'none';
        });
    }
})();
