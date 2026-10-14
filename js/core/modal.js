// ════════════════════════════════════════════════════════════════════════
// js/core/modal.js — generic popup handling
// Used by: projects.html, experience.html (styles in css/components/modal.css)
//
// No per-modal code needed. In HTML:
//   <div id="myModal" class="modal"> … <button data-close-modal>OK</button> … </div>
//   <button data-open-modal="myModal">Open it</button>
// From JS:  openModal('myModal')  /  closeModal('myModal')
//
// A modal also closes when clicking the dark backdrop or pressing Escape.
// ════════════════════════════════════════════════════════════════════════

function openModal(id) {
    var modal = document.getElementById(id);
    if (modal) modal.style.display = 'block';
}

function closeModal(id) {
    var modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(function (m) {
        m.style.display = 'none';
    });
}

document.addEventListener('click', function (e) {
    // Click on the dark backdrop
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
        return;
    }

    // [data-open-modal="id"]
    var opener = e.target.closest('[data-open-modal]');
    if (opener) {
        e.preventDefault();
        openModal(opener.dataset.openModal);
        return;
    }

    // [data-close-modal] inside a modal
    var closer = e.target.closest('[data-close-modal]');
    if (closer) {
        var modal = closer.closest('.modal');
        if (modal) modal.style.display = 'none';
    }
});

document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeAllModals();
});
