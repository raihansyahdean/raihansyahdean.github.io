// ─────────────────────────────────────────────────────────────────────────────
// projects.js
// Handles: project page availability, modal popups, dual filter (type + role),
//          and count badges for both filter rows.
// ─────────────────────────────────────────────────────────────────────────────

// Configuration: Set to true for projects that have pages created
const projectAvailability = {
    'pages-projects/template.html': true,
    'pages-projects/elementary.html': false,      // Change to true when created
    'pages-projects/rube-goldberg.html': false,     // Change to true when created
    'pages-projects/light-grows.html': false,      // Change to true when created
    'pages-projects/underwater-shader.html': true,
    'pages-projects/pitch-it.html': false,      // Change to true when created
    'pages-projects/formula-faceoff.html': false,      // Change to true when created
    'pages-projects/reminiscence.html': false,       // Change to true when created
    'pages-projects/covid-colony.html': false,          // Change to true when created
    'pages-projects/unreal-logic.html': false    // Change to true when created
};

// Configuration: External project links (set to null or empty string if in progress)
const externalLinks = {
    'https://example.com/vr-adventure': null,        // null = in progress
    'https://selahhan.itch.io/light-grows': 'https://selahhan.itch.io/light-grows',
    'https://jduaar.itch.io/reminiscence': 'https://jduaar.itch.io/reminiscence',
    'https://raihansyah-dean.itch.io/covid-colony': 'https://raihansyah-dean.itch.io/covid-colony',
    'https://raihansyah-dean.itch.io/unreal-logic': 'https://raihansyah-dean.itch.io/unreal-logic'
};

// All filter slug values — used for counting
const ALL_TYPES = ['games', 'visual-audio', 'graphics-tech'];
const ALL_ROLES = ['producer', 'designer', 'engineer', 'artist', 'technical-artist', 'audio', 'solo-developer'];
 
// Active filter state
let activeType = 'all';
let activeRole = 'all';

// ── Modal helpers ─────────────────────────────────────────────────────────────

// Check if project detail page exists
function checkProjectPage(event, element) {
    event.preventDefault();
    const projectUrl = element.getAttribute('data-project');
    
    // Check if project is available in our config
    if (projectAvailability[projectUrl]) {
        // Project exists, navigate to it
        setProjectReferrer('index-projects');
        window.location.href = projectUrl;
    } else {
        // Project doesn't exist yet, show modal
        showProjectModal();
    }
}

// Check external link availability
function checkExternalLink(event, element) {
    event.preventDefault();
    const externalUrl = element.getAttribute('data-external');
    
    // This won't be called for in-progress buttons since they use showInProgressModal
    // Just navigate to the external link
    if (externalUrl) {
        window.open(externalUrl, '_blank');
    }
}

// Show in-progress modal
function showInProgressModal(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('inProgressModal').style.display = 'block';
}

function showProjectModal() {
    document.getElementById('projectModal').style.display = 'block';
}

function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
}

function closeInProgressModal() {
    document.getElementById('inProgressModal').style.display = 'none';
}

// Close modals when clicking outside of them
window.addEventListener('click', function(event) {
    const projectModal = document.getElementById('projectModal');
    const inProgressModal = document.getElementById('inProgressModal');
    
    if (event.target === projectModal) {
        closeProjectModal();
    }
    if (event.target === inProgressModal) {
        closeInProgressModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
        closeInProgressModal();
    }
});

// ── Filtering ─────────────────────────────────────────────────────────────────

function applyFilters() {
    const cards = document.querySelectorAll('.project-card');
 
    // Pass 1: show/hide cards based on both active filters
    cards.forEach(function (card) {
        const types = (card.dataset.types || '').split(',').map(s => s.trim());
        const roles = (card.dataset.roles || '').split(',').map(s => s.trim());
        const typeMatch = activeType === 'all' || types.includes(activeType);
        const roleMatch = activeRole === 'all' || roles.includes(activeRole);
        card.classList.toggle('hidden', !(typeMatch && roleMatch));
    });
 
    // Pass 2: type counts — always all cards, role filter ignored
    const typeCounts = { all: 0 };
    ALL_TYPES.forEach(t => { typeCounts[t] = 0; });
    cards.forEach(function (card) {
        const types = (card.dataset.types || '').split(',').map(s => s.trim());
        typeCounts.all++;
        types.forEach(t => { if (typeCounts[t] !== undefined) typeCounts[t]++; });
    });
    Object.keys(typeCounts).forEach(function (key) {
        const el = document.getElementById('count-' + key);
        if (el) el.textContent = typeCounts[key];
    });
 
    // Pass 3: role counts — always all cards, type filter ignored
    const roleCounts = { all: 0 };
    ALL_ROLES.forEach(r => { roleCounts[r] = 0; });
    cards.forEach(function (card) {
        const roles = (card.dataset.roles || '').split(',').map(s => s.trim());
        roleCounts.all++;
        roles.forEach(r => { if (roleCounts[r] !== undefined) roleCounts[r]++; });
    });
    Object.keys(roleCounts).forEach(function (key) {
        const el = document.getElementById('count-role-' + key);
        if (el) el.textContent = roleCounts[key];
    });
}

// Wire all filter buttons on load
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const group = this.dataset.group;
            const filter = this.dataset.filter;
 
            document.querySelectorAll(`.filter-btn[data-group="${group}"]`).forEach(b => b.classList.remove('active'));
            this.classList.add('active');
 
            if (group === 'type') activeType = filter;
            if (group === 'role') activeRole = filter;
 
            applyFilters();
        });
    });
 
    applyFilters();
});

// Write referrer to sessionStorage before navigating to a project detail page
function setProjectReferrer(source) {
    if (source === 'portfolio') {
        sessionStorage.setItem('projectReferrerUrl', document.location.href);
    }
    sessionStorage.setItem('projectReferrer', source);
}
