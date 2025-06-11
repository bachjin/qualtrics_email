// Addon 15: Context Explanation
// Add a context explanation banner above the email interface

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

        // Create context explanation above the email
        var contextExplanation = document.createElement('div');
        contextExplanation.className = 'qualtrics-addon'; // Add common class for cleanup
        contextExplanation.style.cssText = `
            background: linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 100%);
            border: 1px solid #e17055;
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            position: relative;
        `;

        contextExplanation.innerHTML = `
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <span style="font-size: 24px;">📧</span>
                <h3 style="margin: 0; color: #2d3436; font-size: 16px; font-weight: 600;">Email Context</h3>
            </div>
            <div style="color: #636e72; font-size: 14px; line-height: 1.5;">
                <p style="margin: 0 0 8px 0;"><strong>Scenario:</strong> You just returned from a 2-week vacation and have 127 unread emails in your inbox.</p>
                <p style="margin: 0 0 8px 0;"><strong>Situation:</strong> You're rushing to catch up on important messages before your 2 PM meeting.</p>
                <p style="margin: 0;"><strong>Mood:</strong> Stressed and trying to process emails quickly to get back up to speed.</p>
            </div>
        `;

        // Insert the context explanation before the email container
        emailContainer.parentNode.insertBefore(contextExplanation, emailContainer);

        console.log('Addon 15: Context explanation loaded');
    }, 200);
}
