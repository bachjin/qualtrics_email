// Addon 00: template
// Add a phishing confidence indicator bar to the email interface

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure email interface is loaded
    setTimeout(function() {
        initPhishingHelper();
    }, 200);
});

initPhishingHelper();

function initPhishingHelper() {
    // Small delay to ensure email interface is loaded
    setTimeout(function() {
        var emailContainer = document.getElementById('email-container');
        if (!emailContainer) {
            console.error('Email container not found');
            return;
        }

        // Create the confidence indicator container with both bar and circle
        var something = document.createElement('div');
        something.className = 'qualtrics-addon'; // Add common class for cleanup

        emailBody.innerHTML += `
        <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
            <p style="color: #666; font-size: 12px;">Diese email wurde von einem sicheren Server gesendet. Bitte antworte nicht auf diese Nachricht.</p>
        </div>
        `;

        console.log('Addon 00: addon loaded');
    }, 200);
}
