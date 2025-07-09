// Addon 00: template
// Add a phishing confidence indicator bar to the email interface

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure email interface is loaded
    setTimeout(function() {
        initPhishingHelper();
    }, 200);
});

function initPhishingHelper() {
    // Small delay to ensure email interface is loaded
    setTimeout(function() {
        var emailContainer = document.getElementById('email-container');
        if (!emailContainer) {
            console.error('Email container not found');
            return;
        }
        document.getElementById('ai-assistant').style.display = 'flex';
        console.log('Addon 00_v2: addon loaded');
    }, 200);
}
