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

        // Hide email container initially
        emailContainer.style.display = 'none';

        // Create context explanation that user must understand first
        var contextExplanation = document.createElement('div');
        contextExplanation.id = 'context_explainer'
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
            text-align: center;
        `;

        contextExplanation.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: center; gap: 12px; margin-bottom: 16px;">
                <span style="font-size: 32px;">🏖️</span>
                <h3 style="margin: 0; color: #2d3436; font-size: 20px; font-weight: 600;">Welcome Back from Vacation!</h3>
            </div>
            <div style="color: #636e72; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
                <p style="margin: 0 0 12px 0;"><strong>📧 Situation:</strong> You just returned from a relaxing 2-week vacation and have 127 unread emails waiting for you.</p>
                <p style="margin: 0 0 12px 0;"><strong>⏰ Time Pressure:</strong> You're rushing to catch up on important messages before your 2 PM meeting in 30 minutes.</p>
                <p style="margin: 0 0 16px 0;"><strong>😰 Current State:</strong> You're feeling stressed and overwhelmed, trying to process emails as quickly as possible to get back up to speed.</p>
                <div style="background: rgba(255,255,255,0.3); padding: 12px; border-radius: 6px; font-style: italic;">
                    "I need to get through these emails fast - I can't afford to fall behind on my first day back!"
                </div>
            </div>
            <button id="understand-context-btn" style="
                background: #00b894;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 16px;
                font-weight: 600;
                box-shadow: 0 2px 8px rgba(0,184,148,0.3);
                transition: all 0.2s ease;
            ">I Understand - Show Me My Emails</button>
        `;

        // Insert the context explanation before the email container
        var old_explainer = document.getElementById('context_explainer');
	    if (old_explainer) document.body.removeChild(old_explainer);
        emailContainer.parentNode.insertBefore(contextExplanation, emailContainer);

        // Add button click handler to show email after understanding context
        var understandBtn = document.getElementById('understand-context-btn');
        understandBtn.addEventListener('click', function() {
            // Hide context explanation with fade out
            contextExplanation.style.transition = 'opacity 0.3s ease';
            contextExplanation.style.opacity = '0';
            
            setTimeout(function() {
                contextExplanation.style.display = 'none';
                
                // Show email container with fade in
                emailContainer.style.display = 'block';
                emailContainer.style.opacity = '0';
                emailContainer.style.transition = 'opacity 0.3s ease';
                
                setTimeout(function() {
                    emailContainer.style.opacity = '1';
                }, 50);
            }, 300);
        });

        // Add hover effect for button
        understandBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,184,148,0.4)';
        });

        understandBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 2px 8px rgba(0,184,148,0.3)';
        });

        console.log('Addon 15: Context explanation loaded - user must understand context first');
    }, 200);
}
