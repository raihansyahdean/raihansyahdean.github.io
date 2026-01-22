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
    'https://example.com/project-alpha': 'https://your-actual-link.com/project-alpha',  // Set actual URL
    'https://example.com/vr-adventure': null,        // null = in progress
    'https://example.com/rpg-quest': 'https://itch.io/your-rpg-game',  // Example
    'https://example.com/puzzle-dimension': null     // null = in progress
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
window.onclick = function(event) {
    const projectModal = document.getElementById('projectModal');
    const inProgressModal = document.getElementById('inProgressModal');
    
    if (event.target === projectModal) {
        closeProjectModal();
    }
    if (event.target === inProgressModal) {
        closeInProgressModal();
    }
}

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeProjectModal();
        closeInProgressModal();
    }
});