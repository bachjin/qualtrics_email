// Addon 14: Countdown dashboard
// Add a countdown dashboard to the email interface

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

        // Create countdown dashboard
        var countdownDashboard = document.createElement('div');
        countdownDashboard.className = 'qualtrics-addon'; // Add common class for cleanup
        countdownDashboard.id = 'countdown-dashboard';
        countdownDashboard.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            width: 320px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            z-index: 1000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            border: 1px solid #e0e0e0;
        `;

        // Create dashboard header
        var dashboardHeader = document.createElement('div');
        dashboardHeader.style.cssText = `
            background: linear-gradient(135deg, #ff9500 0%, #ff6b00 100%);
            color: white;
            padding: 16px;
            border-radius: 12px 12px 0 0;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        dashboardHeader.innerHTML = `
            <span style="font-size: 18px;">⏱️</span>
            <span>Security Cooldown</span>
        `;

        // Create dashboard content
        var dashboardContent = document.createElement('div');
        dashboardContent.style.cssText = `
            padding: 20px;
            text-align: center;
        `;

        var countdownText = document.createElement('div');
        countdownText.style.cssText = `
            font-size: 24px;
            font-weight: bold;
            color: #ff6b00;
            margin-bottom: 10px;
        `;
        countdownText.id = 'countdown-text';
        countdownText.textContent = '10';

        var warningText = document.createElement('div');
        warningText.style.cssText = `
            font-size: 14px;
            color: #666;
            line-height: 1.4;
        `;
        warningText.textContent = 'Please wait before interacting with email links or attachments. This helps prevent accidental clicks on suspicious content.';

        dashboardContent.appendChild(countdownText);
        dashboardContent.appendChild(warningText);
        countdownDashboard.appendChild(dashboardHeader);
        countdownDashboard.appendChild(dashboardContent);

        // Add to page
        document.body.appendChild(countdownDashboard);

        // Disable all links and attachments initially
        var links = emailContainer.querySelectorAll('a');
        var buttons = emailContainer.querySelectorAll('button');
        var attachmentBtn = document.getElementById('show-attachments-btn');

        // Store original onclick handlers and disable links
        var originalHandlers = [];
        links.forEach(function(link, index) {
            originalHandlers[index] = link.onclick;
            link.onclick = function(e) {
                e.preventDefault();
                alert('Please wait for the security cooldown to finish.');
                return false;
            };
            link.style.pointerEvents = 'none';
            link.style.opacity = '0.5';
        });

        // Disable buttons except basic navigation
        buttons.forEach(function(button) {
            if (button.id !== 'back-btn' && button.id !== 'reply-btn' && button.id !== 'delete-btn') {
                button.style.pointerEvents = 'none';
                button.style.opacity = '0.5';
            }
        });

        if (attachmentBtn) {
            attachmentBtn.style.pointerEvents = 'none';
            attachmentBtn.style.opacity = '0.5';
        }

        // Start countdown
        var timeLeft = 10;
        var countdownInterval = setInterval(function() {
            timeLeft--;
            countdownText.textContent = timeLeft;

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                
                // Re-enable all links and restore handlers
                links.forEach(function(link, index) {
                    link.onclick = originalHandlers[index];
                    link.style.pointerEvents = 'auto';
                    link.style.opacity = '1';
                });

                // Re-enable buttons
                buttons.forEach(function(button) {
                    button.style.pointerEvents = 'auto';
                    button.style.opacity = '1';
                });

                if (attachmentBtn) {
                    attachmentBtn.style.pointerEvents = 'auto';
                    attachmentBtn.style.opacity = '1';
                }

                // Update dashboard to show completion
                countdownText.textContent = '✓';
                countdownText.style.color = '#28a745';
                warningText.textContent = 'Security cooldown complete. You may now interact with the email.';
                dashboardHeader.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
                dashboardHeader.innerHTML = `
                    <span style="font-size: 18px;">✅</span>
                    <span>Ready</span>
                `;

                // Auto-hide after 3 seconds
                setTimeout(function() {
                    countdownDashboard.style.transition = 'opacity 0.5s ease';
                    countdownDashboard.style.opacity = '0';
                    setTimeout(function() {
                        countdownDashboard.remove();
                    }, 500);
                }, 3000);
            }
        }, 1000);

        console.log('Addon 14: Countdown dashboard loaded');
    }, 200);
}
