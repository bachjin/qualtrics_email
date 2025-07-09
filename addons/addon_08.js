// Addon 08: Security Dashboard
// Add a security dashboard to the email interface

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

        // Create the visual dashboard container
        var dashboard = document.createElement('div');
        dashboard.className = 'qualtrics-addon'; // Add common class for cleanup
        dashboard.id = 'security-dashboard';
        dashboard.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            z-index: 1001;
            color: white;
            font-size: 13px;
            line-height: 1.4;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        `;

        // Create dashboard content
        dashboard.innerHTML = `
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 18px;">🛡️</span>
                    <strong style="font-size: 14px;">Security Dashboard</strong>
                </div>
                <div style="display: flex; gap: 4px;">
                    <button id="toggle-dashboard" style="
                        background: rgba(255,255,255,0.2);
                        border: 1px solid rgba(255,255,255,0.3);
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        color: white;
                        cursor: pointer;
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0;
                    ">−</button>
                    <button id="close-dashboard" style="
                        background: rgba(231, 76, 60, 0.3);
                        border: 1px solid rgba(231, 76, 60, 0.5);
                        border-radius: 50%;
                        width: 24px;
                        height: 24px;
                        color: white;
                        cursor: pointer;
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 0;
                    ">×</button>
                </div>
            </div>
            
            <div id="dashboard-content">
                <!-- Sender Verification -->
                <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-weight: 500;">📧 Sender Verification</span>
                        <div id="sender-indicator" style="
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            background: #e74c3c;
                        "></div>
                    </div>
                    <div id="sender-status" style="font-size: 11px; color: #ecf0f1;">
                        Domain mismatch detected
                    </div>
                    <div style="background: rgba(0,0,0,0.2); height: 4px; border-radius: 2px; margin-top: 6px;">
                        <div id="sender-bar" style="
                            width: 25%;
                            height: 100%;
                            background: #e74c3c;
                            border-radius: 2px;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>

                <!-- Content Analysis -->
                <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-weight: 500;">📝 Content Analysis</span>
                        <div id="content-indicator" style="
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            background: #f39c12;
                        "></div>
                    </div>
                    <div id="content-status" style="font-size: 11px; color: #ecf0f1;">
                        Urgency keywords found
                    </div>
                    <div style="background: rgba(0,0,0,0.2); height: 4px; border-radius: 2px; margin-top: 6px;">
                        <div id="content-bar" style="
                            width: 60%;
                            height: 100%;
                            background: #f39c12;
                            border-radius: 2px;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>

                <!-- Link Security -->
                <div style="background: rgba(255,255,255,0.1); padding: 12px; border-radius: 8px; margin-bottom: 12px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-weight: 500;">🔗 Link Security</span>
                        <div id="link-indicator" style="
                            width: 12px;
                            height: 12px;
                            border-radius: 50%;
                            background: #e74c3c;
                        "></div>
                    </div>
                    <div id="link-status" style="font-size: 11px; color: #ecf0f1;">
                        Suspicious redirect detected
                    </div>
                    <div style="background: rgba(0,0,0,0.2); height: 4px; border-radius: 2px; margin-top: 6px;">
                        <div id="link-bar" style="
                            width: 85%;
                            height: 100%;
                            background: #e74c3c;
                            border-radius: 2px;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>

                <!-- Overall Risk Score -->
                <div id="risk-container" style="background: rgba(231, 76, 60, 0.2); padding: 12px; border-radius: 8px; border: 1px solid rgba(231, 76, 60, 0.4);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-weight: 500;">⚠️ Overall Risk</span>
                        <span id="risk-level" style="font-weight: bold; color: #e74c3c;">HIGH</span>
                    </div>
                    <div id="risk-status" style="font-size: 11px; color: #ecf0f1;">
                        Multiple indicators suggest this is a phishing attempt
                    </div>
                    <div style="background: rgba(0,0,0,0.2); height: 6px; border-radius: 3px; margin-top: 8px;">
                        <div id="risk-bar" style="
                            width: 78%;
                            height: 100%;
                            background: linear-gradient(90deg, #f39c12 0%, #e74c3c 100%);
                            border-radius: 3px;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>
            </div>
        `;

        // Add dashboard to the page
        var old_dashboard = document.getElementById('security-dashboard');
	    if (old_dashboard) document.body.removeChild(old_dashboard);
        document.body.appendChild(dashboard);

        // Function to update dashboard content based on email type
        function updateDashboardContent(isPhishing) {
            var senderIndicator = document.getElementById('sender-indicator');
            var senderStatus = document.getElementById('sender-status');
            var senderBar = document.getElementById('sender-bar');
            
            var contentIndicator = document.getElementById('content-indicator');
            var contentStatus = document.getElementById('content-status');
            var contentBar = document.getElementById('content-bar');
            
            var linkIndicator = document.getElementById('link-indicator');
            var linkStatus = document.getElementById('link-status');
            var linkBar = document.getElementById('link-bar');
            
            var riskContainer = document.getElementById('risk-container');
            var riskLevel = document.getElementById('risk-level');
            var riskStatus = document.getElementById('risk-status');
            var riskBar = document.getElementById('risk-bar');

            if (isPhishing) {
                // Phishing email - high risk
                senderIndicator.style.background = '#e74c3c';
                senderStatus.textContent = 'Domain mismatch detected';
                senderBar.style.width = '25%';
                senderBar.style.background = '#e74c3c';
                
                contentIndicator.style.background = '#f39c12';
                contentStatus.textContent = 'Urgency keywords found';
                contentBar.style.width = '60%';
                contentBar.style.background = '#f39c12';
                
                linkIndicator.style.background = '#e74c3c';
                linkStatus.textContent = 'Suspicious redirect detected';
                linkBar.style.width = '85%';
                linkBar.style.background = '#e74c3c';
                
                riskContainer.style.background = 'rgba(231, 76, 60, 0.2)';
                riskContainer.style.border = '1px solid rgba(231, 76, 60, 0.4)';
                riskLevel.style.color = '#e74c3c';
                riskLevel.textContent = 'HIGH';
                riskStatus.textContent = 'Multiple indicators suggest this is a phishing attempt';
                riskBar.style.width = '78%';
                riskBar.style.background = 'linear-gradient(90deg, #f39c12 0%, #e74c3c 100%)';
            } else {
                // Normal email - low risk
                senderIndicator.style.background = '#27ae60';
                senderStatus.textContent = 'Sender verified and trusted';
                senderBar.style.width = '90%';
                senderBar.style.background = '#27ae60';
                
                contentIndicator.style.background = '#27ae60';
                contentStatus.textContent = 'Professional business content';
                contentBar.style.width = '85%';
                contentBar.style.background = '#27ae60';
                
                linkIndicator.style.background = '#27ae60';
                linkStatus.textContent = 'Safe links from trusted domain';
                linkBar.style.width = '95%';
                linkBar.style.background = '#27ae60';
                
                riskContainer.style.background = 'rgba(39, 174, 96, 0.2)';
                riskContainer.style.border = '1px solid rgba(39, 174, 96, 0.4)';
                riskLevel.style.color = '#27ae60';
                riskLevel.textContent = 'LOW';
                riskStatus.textContent = 'All security checks passed - email appears legitimate';
                riskBar.style.width = '15%';
                riskBar.style.background = 'linear-gradient(90deg, #27ae60 0%, #2ecc71 100%)';
            }
        }

        // Monitor the change content button
        function setupContentToggleListener() {
            var changeContentBtn = document.getElementById('change-content-btn');
            if (changeContentBtn) {
                changeContentBtn.addEventListener('click', function() {
                    // Small delay to let the email content change first
                    setTimeout(function() {
                        var emailBody = document.getElementById('email-body');
                        if (emailBody) {
                            var isPhishing = emailBody.innerHTML.includes('unusual activity') || 
                                           emailBody.innerHTML.includes('Verify Account Now') ||
                                           emailBody.innerHTML.includes('Account Security Team');
                            updateDashboardContent(isPhishing);
                        }
                    }, 100);
                });
            } else {
                // If button not found, try again after a short delay
                setTimeout(setupContentToggleListener, 100);
            }
        }

        // Initialize with phishing content (default state)
        updateDashboardContent(true);
        
        // Set up the listener for content toggle
        setupContentToggleListener();

        // Add toggle functionality
        document.getElementById('toggle-dashboard').addEventListener('click', function() {
            var content = document.getElementById('dashboard-content');
            var isVisible = content.style.display !== 'none';
            
            if (isVisible) {
                content.style.display = 'none';
                this.textContent = '+';
                dashboard.style.height = 'auto';
            } else {
                content.style.display = 'block';
                this.textContent = '−';
            }
        });
        console.log("meowy")
        // Add close functionality
        document.getElementById('close-dashboard').addEventListener('click', function() {
            dashboard.remove();
            console.log("clickedy click")
        });

        // Add responsive styles
        var dashboardStyle = document.createElement('style');
        dashboardStyle.className = 'qualtrics-addon';
        dashboardStyle.textContent = `
            @media (max-width: 768px) {
                #security-dashboard {
                    position: fixed !important;
                    top: 10px !important;
                    left: 10px !important;
                    right: 10px !important;
                    width: auto !important;
                    max-width: none !important;
                }
            }
            
            #toggle-dashboard:hover {
                background: rgba(255,255,255,0.3) !important;
                transform: scale(1.1);
            }
            
            #close-dashboard:hover {
                background: rgba(231, 76, 60, 0.5) !important;
                transform: scale(1.1);
            }
        `;
        document.head.appendChild(dashboardStyle);

        console.log('Addon 08: Security Dashboard loaded');
    }, 200);
}
