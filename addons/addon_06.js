// Addon 06: Suspicious text underlines
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

        // Add styles for suspicious text underlines
        var style = document.createElement('style');
        style.id = 'suspicious-underline-styles';
        style.className = 'qualtrics-addon';
        style.textContent = `
            .suspicious-text {
                position: relative;
                cursor: pointer;
            }
            
            .suspicious-text::after {
                content: '';
                position: absolute;
                left: 0;
                right: 0;
                bottom: -2px;
                height: 2px;
                background: repeating-linear-gradient(
                    to right,
                    #dc3545 0px,
                    #dc3545 3px,
                    transparent 3px,
                    transparent 6px
                );
                border-radius: 1px;
            }
            
            .suspicious-text:hover::after {
                background: repeating-linear-gradient(
                    to right,
                    #ff1728 0px,
                    #ff1728 3px,
                    transparent 3px,
                    transparent 6px
                );
            }
            
            .suspicious-tooltip {
                position: absolute;
                bottom: 100%;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(220, 53, 69, 0.95);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1000;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.3s, visibility 0.3s;
                margin-bottom: 5px;
            }
            
            .suspicious-tooltip::after {
                content: '';
                position: absolute;
                top: 100%;
                left: 50%;
                transform: translateX(-50%);
                border: 5px solid transparent;
                border-top-color: rgba(220, 53, 69, 0.95);
            }
            
            .suspicious-text:hover .suspicious-tooltip {
                opacity: 1;
                visibility: visible;
            }
        `;
        document.head.appendChild(style);

        // Function to wrap suspicious text with underline styling
        function markSuspiciousText() {
            var emailBody = document.getElementById('email-body');
            if (!emailBody) return;

            // Define suspicious phrases to highlight
            var suspiciousPatterns = [
                'unusual activity',
                'verify your information',
                'account will be suspended',
                'immediate attention',
                'security alert',
                'click here',
                'urgent action required',
                'verify account',
                'suspended',
                'expires today',
                'limited time'
            ];

            var content = emailBody.innerHTML;
            
            suspiciousPatterns.forEach(function(pattern) {
                var regex = new RegExp('(' + pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi');
                content = content.replace(regex, function(match) {
                    return '<span class="suspicious-text" style="position: relative;">' + match + 
                           '<span class="suspicious-tooltip">Suspicious phrase detected</span></span>';
                });
            });

            emailBody.innerHTML = content;
        }

        // Initial marking of suspicious text
        markSuspiciousText();

        // Monitor for content changes to re-apply suspicious text marking
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' || mutation.type === 'characterData') {
                    setTimeout(markSuspiciousText, 100);
                }
            });
        });

        var emailBody = document.getElementById('email-body');
        if (emailBody) {
            observer.observe(emailBody, {
                childList: true,
                subtree: true,
                characterData: true
            });
        }

        console.log('Addon 06: Suspicious text underlines loaded');
    }, 200);
}
