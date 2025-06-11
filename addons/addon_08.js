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
            left: 20px;
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
                    <div style="font-size: 11px; color: #ecf0f1;">
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
                    <div style="font-size: 11px; color: #ecf0f1;">
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
                    <div style="font-size: 11px; color: #ecf0f1;">
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
                <div style="background: rgba(231, 76, 60, 0.2); padding: 12px; border-radius: 8px; border: 1px solid rgba(231, 76, 60, 0.4);">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-weight: 500;">⚠️ Overall Risk</span>
                        <span style="font-weight: bold; color: #e74c3c;">HIGH</span>
                    </div>
                    <div style="font-size: 11px; color: #ecf0f1;">
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
        document.body.appendChild(dashboard);

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
        `;
        document.head.appendChild(dashboardStyle);

        console.log('Addon 08: Security Dashboard loaded');
    }, 200);
}
