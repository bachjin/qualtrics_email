// Addon 07: Security dashboard
// Add a dashboard with security indicators to the email interface

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

        // Create dashboard that appears instantly with the email
        var dashboard = document.createElement('div');
        dashboard.id = 'security-dashboard';
        dashboard.className = 'qualtrics-addon';
        dashboard.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.95);
                border: 2px solid #007bff;
                border-radius: 8px;
                padding: 20px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                z-index: 1500;
                font-family: Arial, sans-serif;
                max-width: 300px;
                min-width: 250px;
            ">
                <div style="
                    font-size: 14px;
                    font-weight: bold;
                    color: #007bff;
                    margin-bottom: 15px;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                ">
                    <span style="font-size: 16px;">🛡️</span>
                    Email Security Dashboard
                </div>
                
                <div id="dashboard-content" style="font-size: 13px; line-height: 1.4; color: #333;">
                    <div style="margin-bottom: 12px;">
                        <div style="font-weight: 500; margin-bottom: 6px; color: #dc3545;">
                            ⚠️ Security Alerts:
                        </div>
                        <ul style="margin: 0; padding-left: 16px;">
                            <li>Suspicious sender domain detected</li>
                            <li>Urgent language patterns found</li>
                            <li>Unverified external links present</li>
                        </ul>
                    </div>
                    
                    <div style="margin-bottom: 12px;">
                        <div style="font-weight: 500; margin-bottom: 6px; color: #28a745;">
                            ✅ Safety Checks:
                        </div>
                        <ul style="margin: 0; padding-left: 16px;">
                            <li>Email encrypted in transit</li>
                            <li>No malicious attachments detected</li>
                        </ul>
                    </div>
                    
                    <div style="
                        background: #f8f9fa;
                        padding: 10px;
                        border-radius: 4px;
                        border-left: 3px solid #ffc107;
                    ">
                        <div style="font-weight: 500; margin-bottom: 4px; color: #856404;">
                            💡 Recommendation:
                        </div>
                        <div>Exercise caution before responding or clicking any links.</div>
                    </div>
                </div>
                
                <button id="tell-me-more-btn" style="
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 8px 16px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 12px;
                    font-weight: 500;
                    margin-top: 15px;
                    width: 100%;
                ">Tell Me More</button>
                
                <div id="expanded-content" style="
                    display: none;
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid #e0e0e0;
                    font-size: 12px;
                    color: #666;
                ">
                    <div style="font-weight: 500; margin-bottom: 8px;">🔍 Detailed Analysis:</div>
                    <ul style="margin: 0; padding-left: 16px; line-height: 1.5;">
                        <li>Sender reputation score: 2.3/10</li>
                        <li>Domain age: 3 days (suspicious)</li>
                        <li>Similar phishing attempts: 127 reported today</li>
                        <li>Geographic origin: Unknown proxy server</li>
                    </ul>
                    
                    <div style="margin-top: 12px; padding: 8px; background: #fff3cd; border-radius: 4px;">
                        <strong>Action Required:</strong> Report this email to your IT security team immediately.
                    </div>
                </div>
            </div>
        `;

        // Add dashboard to the page
        document.body.appendChild(dashboard);

        // Add "Tell Me More" functionality
        var tellMeMoreBtn = document.getElementById('tell-me-more-btn');
        var expandedContent = document.getElementById('expanded-content');
        
        tellMeMoreBtn.addEventListener('click', function() {
            if (expandedContent.style.display === 'none') {
                expandedContent.style.display = 'block';
                this.textContent = 'Show Less';
                this.style.background = '#6c757d';
            } else {
                expandedContent.style.display = 'none';
                this.textContent = 'Tell Me More';
                this.style.background = '#007bff';
            }
        });

        // Listen for the change content button to update dashboard
        var changeContentBtn = document.getElementById('change-content-btn');
        if (changeContentBtn) {
            changeContentBtn.addEventListener('click', function() {
                var dashboardContent = document.getElementById('dashboard-content');
                var expandedContent = document.getElementById('expanded-content');
                
                // Check current mode based on button text
                var isShowingNormal = this.textContent === 'Display Phishing Email';
                
                if (isShowingNormal) {
                    // Switching to normal email content - show safe indicators
                    dashboardContent.innerHTML = `
                        <div style="margin-bottom: 12px;">
                            <div style="font-weight: 500; margin-bottom: 6px; color: #28a745;">
                                ✅ Security Status:
                            </div>
                            <ul style="margin: 0; padding-left: 16px;">
                                <li>Verified sender domain</li>
                                <li>No suspicious patterns detected</li>
                                <li>All links verified safe</li>
                            </ul>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <div style="font-weight: 500; margin-bottom: 6px; color: #28a745;">
                                ✅ Safety Checks:
                            </div>
                            <ul style="margin: 0; padding-left: 16px;">
                                <li>Email encrypted in transit</li>
                                <li>No malicious attachments detected</li>
                                <li>Sender authentication passed</li>
                            </ul>
                        </div>
                        
                        <div style="
                            background: #d4edda;
                            padding: 10px;
                            border-radius: 4px;
                            border-left: 3px solid #28a745;
                        ">
                            <div style="font-weight: 500; margin-bottom: 4px; color: #155724;">
                                💡 Status:
                            </div>
                            <div>This email appears to be legitimate and safe to interact with.</div>
                        </div>
                    `;
                    
                    expandedContent.innerHTML = `
                        <div style="font-weight: 500; margin-bottom: 8px;">🔍 Detailed Analysis:</div>
                        <ul style="margin: 0; padding-left: 16px; line-height: 1.5;">
                            <li>Sender reputation score: 8.7/10</li>
                            <li>Domain age: 5 years (established)</li>
                            <li>SPF/DKIM verification: Passed</li>
                            <li>Geographic origin: Verified corporate network</li>
                        </ul>
                        
                        <div style="margin-top: 12px; padding: 8px; background: #d4edda; border-radius: 4px;">
                            <strong>Safe to proceed:</strong> This email has passed all security checks.
                        </div>
                    `;
                } else {
                    // Switching to phishing email content - show warning indicators
                    dashboardContent.innerHTML = `
                        <div style="margin-bottom: 12px;">
                            <div style="font-weight: 500; margin-bottom: 6px; color: #dc3545;">
                                ⚠️ Security Alerts:
                            </div>
                            <ul style="margin: 0; padding-left: 16px;">
                                <li>Suspicious sender domain detected</li>
                                <li>Urgent language patterns found</li>
                                <li>Unverified external links present</li>
                            </ul>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <div style="font-weight: 500; margin-bottom: 6px; color: #28a745;">
                                ✅ Safety Checks:
                            </div>
                            <ul style="margin: 0; padding-left: 16px;">
                                <li>Email encrypted in transit</li>
                                <li>No malicious attachments detected</li>
                            </ul>
                        </div>
                        
                        <div style="
                            background: #f8f9fa;
                            padding: 10px;
                            border-radius: 4px;
                            border-left: 3px solid #ffc107;
                        ">
                            <div style="font-weight: 500; margin-bottom: 4px; color: #856404;">
                                💡 Recommendation:
                            </div>
                            <div>Exercise caution before responding or clicking any links.</div>
                        </div>
                    `;
                    
                    expandedContent.innerHTML = `
                        <div style="font-weight: 500; margin-bottom: 8px;">🔍 Detailed Analysis:</div>
                        <ul style="margin: 0; padding-left: 16px; line-height: 1.5;">
                            <li>Sender reputation score: 2.3/10</li>
                            <li>Domain age: 3 days (suspicious)</li>
                            <li>Similar phishing attempts: 127 reported today</li>
                            <li>Geographic origin: Unknown proxy server</li>
                        </ul>
                        
                        <div style="margin-top: 12px; padding: 8px; background: #fff3cd; border-radius: 4px;">
                            <strong>Action Required:</strong> Report this email to your IT security team immediately.
                        </div>
                    `;
                }
            });
        }

        // Add hover effect for the button
        var style = document.createElement('style');
        style.id = 'dashboard-styles';
        style.className = 'qualtrics-addon';
        style.textContent = `
            #tell-me-more-btn:hover {
                opacity: 0.9;
                transform: translateY(-1px);
                transition: all 0.2s ease;
            }
            
            @media (max-width: 768px) {
                #security-dashboard > div {
                    position: fixed !important;
                    top: 10px !important;
                    left: 10px !important;
                    right: 10px !important;
                    max-width: none !important;
                    min-width: none !important;
                }
            }
        `;
        document.head.appendChild(style);

        console.log('Addon 07: Security dashboard loaded');
    }, 200);
}
