// Configuration: Set to true for projects that have pages created
const projectAvailability = {
    'pages-projects/template.html': true,
    'pages-projects/light-grows.html': false,      // Change to true when created
    'pages-projects/pitch-it.html': false,      // Change to true when created
    'pages-projects/formula-faceoff.html': false,      // Change to true when created
    'pages-projects/reminiscence.html': false,       // Change to true when created
    'pages-projects/covid-colony.html': false,          // Change to true when created
    'pages-projects/unreal-logic.html': false    // Change to true when created
};

// Configuration: External project links (set to null or empty string if in progress)
const externalLinks = {
    'https://selahhan.itch.io/light-grows': 'https://selahhan.itch.io/light-grows',
    'https://example.com/vr-adventure': null,        // null = in progress
    'https://jduaar.itch.io/reminiscence': 'https://jduaar.itch.io/reminiscence',
    'https://raihansyah-dean.itch.io/covid-colony': 'https://raihansyah-dean.itch.io/covid-colony',
    'https://raihansyah-dean.itch.io/unreal-logic': 'https://raihansyah-dean.itch.io/unreal-logic'
};

// Check if project detail page exists
function checkProjectPage(event, element) {
    event.preventDefault();
    const projectUrl = element.getAttribute('data-project');
    
    // Check if project is available in our config
    if (projectAvailability[projectUrl]) {
        // Project exists, navigate to it
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

// Filter Projects Function
function filterProjects(category) {
    const cards = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-filter') === category) {
            btn.classList.add('active');
        }
    });
    
    // Filter cards
    cards.forEach(card => {
        const types = card.getAttribute('data-types');
        
        if (category === 'all') {
            card.classList.remove('hidden');
        } else {
            if (types && types.includes(category)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        }
    });
}

// Update project counts on page load
function updateProjectCounts() {
    const cards = document.querySelectorAll('.project-card');
    const counts = {
        all: cards.length,
        games: 0,
        'visual-audio': 0,
        'graphics-tech': 0
    };
    
    cards.forEach(card => {
        const types = card.getAttribute('data-types');
        if (types) {
            if (types.includes('games')) counts.games++;
            if (types.includes('visual-audio')) counts['visual-audio']++;
            if (types.includes('graphics-tech')) counts['graphics-tech']++;
        }
    });
    
    document.getElementById('count-all').textContent = counts.all;
    document.getElementById('count-games').textContent = counts.games;
    document.getElementById('count-visual-audio').textContent = counts['visual-audio'];
    document.getElementById('count-graphics-tech').textContent = counts['graphics-tech'];
}

// Initialize counts on page load
updateProjectCounts();