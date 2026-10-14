// Configuration: Set to true for projects that have pages created
// Change to true when page is created
const workAvailability = {
    'pages-experience/template.html': true,
    'pages-experience/exp-ecomindo.html': false,
    'pages-experience/exp-codomo.html': false,
    'pages-experience/exp-projectseed.html': false
};

// Check if project page exists
function checkWorkPage(event, element) {
    event.preventDefault();
    const projectUrl = element.getAttribute('data-project');
    
    // Check if project is available in our config
    if (workAvailability[projectUrl]) {
        // Project exists, navigate to it
        window.location.href = projectUrl;
    } else {
        // Project doesn't exist yet, show modal
        showWorkModal();
    }
}

function showWorkModal() {
    document.getElementById('workModal').style.display = 'block';
}

function closeWorkModal() {
    document.getElementById('workModal').style.display = 'none';
}

// Close modal when clicking outside of it
 window.addEventListener('click', function(event) {
    const modal = document.getElementById('workModal');
    if (event.target === modal) {
        closeWorkModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeWorkModal();
    }
});