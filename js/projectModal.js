// Configuration: Set to true for projects that have pages created
// Change to true when page is created
const projectAvailability = {
    'pages-experience/template.html': true,
    'pages-experience/exp-ecomindo.html': false,
    'pages-experience/exp-codomo.html': false,
    'pages-experience/exp-projectseed.html': false
};

// Check if project page exists
function checkProject(event, element) {
    event.preventDefault();
    const projectUrl = element.getAttribute('data-project');
    
    // Check if project is available in our config
    if (projectAvailability[projectUrl]) {
        // Project exists, navigate to it
        window.location.href = projectUrl;
    } else {
        // Project doesn't exist yet, show modal
        showModal();
    }
}

function showModal() {
    document.getElementById('projectModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('projectModal').style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});