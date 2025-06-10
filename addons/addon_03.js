// Addon 03: Hover overlay indicators for links and attachments
// Display warning overlays when hovering over links or attachments

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

        // Create overlay element
        var overlay = document.createElement('div');
        overlay.id = 'hover-security-overlay';
        overlay.className = 'qualtrics-addon'; // Add common class for cleanup
        overlay.style.cssText = `
            position: fixed;
            display: none;
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            font-family: Arial, sans-serif;
            font-size: 12px;
            max-width: 250px;
            z-index: 2000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            border: 2px solid #ffc107;
            pointer-events: none;
        `;
        document.body.appendChild(overlay);

        // Add styles for hover effects
        var style = document.createElement('style');
        style.textContent = `
            .security-hover-target {
                position: relative;
                transition: all 0.2s ease;
            }
            
            .security-hover-target:hover {
                background: rgba(255, 193, 7, 0.1) !important;
                border-radius: 3px;
                box-shadow: 0 0 8px rgba(255, 193, 7, 0.4);
            }
            
            .security-hover-target.dangerous:hover {
                background: rgba(220, 53, 69, 0.1) !important;
                box-shadow: 0 0 8px rgba(220, 53, 69, 0.4);
            }
            
            .security-hover-target.safe:hover {
                background: rgba(40, 167, 69, 0.1) !important;
                box-shadow: 0 0 8px rgba(40, 167, 69, 0.4);
            }
            
            .security-hover-icon {
                position: absolute;
                top: -8px;
                right: -8px;
                font-size: 16px;
                background: white;
                border-radius: 50%;
                width: 20px;
                height: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                opacity: 0;
                transition: opacity 0.2s ease;
            }
            
            .security-hover-target:hover .security-hover-icon {
                opacity: 1;
            }
        `;
        document.head.appendChild(style);

        // Function to check if email is in phishing mode
        function isPhishingMode() {
            var changeBtn = document.getElementById('change-content-btn');
            return changeBtn && changeBtn.textContent.includes('Normal Email');
        }

        // Function to add hover overlay to element
        function addHoverOverlay(element, type, riskLevel) {
            element.classList.add('security-hover-target');
            if (riskLevel) {
                element.classList.add(riskLevel);
            }

            // Add security icon
            var icon = document.createElement('div');
            icon.className = 'security-hover-icon';
            
            if (riskLevel === 'dangerous') {
                icon.textContent = '⚠️';
                icon.style.borderColor = '#dc3545';
            } else if (riskLevel === 'safe') {
                icon.textContent = '✅';
                icon.style.borderColor = '#28a745';
            } else {
                icon.textContent = '❓';
                icon.style.borderColor = '#ffc107';
            }
            
            element.style.position = 'relative';
            element.appendChild(icon);

            element.addEventListener('mouseenter', function(e) {
                var content = '';
                var borderColor = '#ffc107';
                
                if (type === 'link') {
                    if (isPhishingMode()) {
                        content = `
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                <span style="font-size: 20px;">🚨</span>
                                <strong style="color: #ff6b6b;">SUSPICIOUS LINK DETECTED</strong>
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>⚠️ Risk Assessment:</strong> HIGH
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>🔗 URL Analysis:</strong> Potentially malicious
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>📝 Recommendation:</strong> DO NOT CLICK
                            </div>
                            <div style="color: #ff9999; font-size: 11px;">
                                This link may lead to a phishing site designed to steal your credentials.
                            </div>
                        `;
                        borderColor = '#dc3545';
                    } else {
                        content = `
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                <span style="font-size: 20px;">🔗</span>
                                <strong style="color: #90ee90;">SAFE LINK</strong>
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>✅ Risk Assessment:</strong> LOW
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>🔒 Security Status:</strong> Verified
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>📝 Recommendation:</strong> Safe to click
                            </div>
                            <div style="color: #90ee90; font-size: 11px;">
                                This appears to be a legitimate business link.
                            </div>
                        `;
                        borderColor = '#28a745';
                    }
                } else if (type === 'attachment') {
                    if (isPhishingMode()) {
                        content = `
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                <span style="font-size: 20px;">⚠️</span>
                                <strong style="color: #ff6b6b;">SUSPICIOUS ATTACHMENT</strong>
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>📎 File Type:</strong> Image (Potential Risk)
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>🔍 Scan Status:</strong> Suspicious content detected
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>📝 Recommendation:</strong> DO NOT DOWNLOAD
                            </div>
                            <div style="color: #ff9999; font-size: 11px;">
                                This attachment may contain malware or tracking pixels.
                            </div>
                        `;
                        borderColor = '#dc3545';
                    } else {
                        content = `
                            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                                <span style="font-size: 20px;">📎</span>
                                <strong style="color: #90ee90;">SAFE ATTACHMENT</strong>
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>📎 File Type:</strong> Image
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>🔍 Scan Status:</strong> Clean
                            </div>
                            <div style="margin-bottom: 8px;">
                                <strong>📝 Recommendation:</strong> Safe to view
                            </div>
                            <div style="color: #90ee90; font-size: 11px;">
                                This attachment has been scanned and appears safe.
                            </div>
                        `;
                        borderColor = '#28a745';
                    }
                }

                overlay.innerHTML = content;
                overlay.style.borderColor = borderColor;
                overlay.style.display = 'block';
                
                // Position overlay near the mouse
                var rect = e.target.getBoundingClientRect();
                overlay.style.left = (rect.right + 10) + 'px';
                overlay.style.top = (rect.top - 10) + 'px';
                
                // Adjust position if overlay would go off screen
                var overlayRect = overlay.getBoundingClientRect();
                if (overlayRect.right > window.innerWidth) {
                    overlay.style.left = (rect.left - overlayRect.width - 10) + 'px';
                }
                if (overlayRect.bottom > window.innerHeight) {
                    overlay.style.top = (window.innerHeight - overlayRect.height - 10) + 'px';
                }
            });

            element.addEventListener('mouseleave', function() {
                overlay.style.display = 'none';
            });
        }

        // Function to scan and add overlays to elements
        function scanAndAddOverlays() {
            // Remove existing overlays
            var existingTargets = document.querySelectorAll('.security-hover-target');
            existingTargets.forEach(function(target) {
                target.classList.remove('security-hover-target', 'dangerous', 'safe');
                var icon = target.querySelector('.security-hover-icon');
                if (icon) {
                    icon.remove();
                }
            });

            // Find all links in email body
            var emailBody = document.getElementById('email-body');
            if (emailBody) {
                var links = emailBody.querySelectorAll('a');
                links.forEach(function(link) {
                    var riskLevel = isPhishingMode() ? 'dangerous' : 'safe';
                    addHoverOverlay(link, 'link', riskLevel);
                });
            }

            // Find attachments
            var attachmentContainer = document.getElementById('attachment-container');
            if (attachmentContainer) {
                var attachments = attachmentContainer.querySelectorAll('img');
                attachments.forEach(function(attachment) {
                    var riskLevel = isPhishingMode() ? 'dangerous' : 'safe';
                    addHoverOverlay(attachment, 'attachment', riskLevel);
                });
            }

            // Add overlay to attachment button
            var attachmentBtn = document.getElementById('show-attachments-btn');
            if (attachmentBtn) {
                var riskLevel = isPhishingMode() ? 'dangerous' : 'safe';
                addHoverOverlay(attachmentBtn, 'attachment', riskLevel);
            }
        }

        // Initial scan
        scanAndAddOverlays();

        // Listen for content changes to rescan
        var changeContentBtn = document.getElementById('change-content-btn');
        if (changeContentBtn) {
            changeContentBtn.addEventListener('click', function() {
                // Delay to allow content change to complete
                setTimeout(scanAndAddOverlays, 100);
            });
        }

        console.log('Addon 03: Hover overlay indicators loaded');
    }, 200);
}
