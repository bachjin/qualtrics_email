// Addon 04: Interruption screen when clicking on a link or attachment
// Display an interruption screen when clicking on a link or attachment

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

        // Create the interruption modal
        var modal = document.createElement('div');
        modal.id = 'security-interruption-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            z-index: 3000;
            font-family: Arial, sans-serif;
            backdrop-filter: blur(5px);
        `;

        modal.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: white;
                border-radius: 12px;
                padding: 30px;
                max-width: 500px;
                width: 90%;
                box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                border: 3px solid #ffc107;
            ">
                <!-- Header -->
                <div id="modal-header" style="
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    margin-bottom: 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #f0f0f0;
                ">
                    <div id="modal-icon" style="
                        font-size: 40px;
                    ">⚠️</div>
                    <div>
                        <h2 id="modal-title" style="
                            margin: 0 0 5px 0;
                            color: #333;
                            font-size: 20px;
                        ">Security Warning</h2>
                        <div id="modal-subtitle" style="
                            color: #666;
                            font-size: 14px;
                            margin: 0;
                        ">You are about to interact with potentially risky content</div>
                    </div>
                </div>

                <!-- Content -->
                <div id="modal-content" style="
                    margin-bottom: 25px;
                    line-height: 1.6;
                    color: #333;
                ">
                    <div id="modal-message" style="
                        margin-bottom: 15px;
                        font-size: 14px;
                    ">
                        You are about to click on a link that may be dangerous.
                    </div>
                    
                    <div id="modal-details" style="
                        background: #f8f9fa;
                        padding: 15px;
                        border-radius: 8px;
                        border-left: 4px solid #ffc107;
                        margin-bottom: 15px;
                    ">
                        <div style="font-weight: bold; margin-bottom: 8px;">⚠️ Security Assessment:</div>
                        <div id="risk-details" style="font-size: 13px; color: #555;">
                            This action may compromise your security.
                        </div>
                    </div>

                    <div id="target-info" style="
                        background: #f1f3f4;
                        padding: 12px;
                        border-radius: 6px;
                        font-size: 12px;
                        color: #555;
                        word-break: break-all;
                    ">
                        <strong>Target:</strong> <span id="target-details"></span>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div style="
                    display: flex;
                    gap: 15px;
                    justify-content: flex-end;
                ">
                    <button id="cancel-action" style="
                        background: #6c757d;
                        color: white;
                        border: none;
                        padding: 12px 25px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 500;
                        transition: background 0.2s ease;
                    ">Cancel</button>
                    <button id="continue-action" style="
                        background: #dc3545;
                        color: white;
                        border: none;
                        padding: 12px 25px;
                        border-radius: 6px;
                        cursor: pointer;
                        font-size: 14px;
                        font-weight: 500;
                        transition: background 0.2s ease;
                    ">Continue Anyway</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Add button hover styles
        var style = document.createElement('style');
        style.textContent = `
            #cancel-action:hover {
                background: #545b62 !important;
            }
            
            #continue-action:hover {
                background: #c82333 !important;
            }
            
            #continue-action.safe {
                background: #28a745 !important;
            }
            
            #continue-action.safe:hover {
                background: #218838 !important;
            }
            
            .modal-animate-in {
                animation: modalSlideIn 0.3s ease-out;
            }
            
            @keyframes modalSlideIn {
                from {
                    opacity: 0;
                    transform: translate(-50%, -60%);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%);
                }
            }
            
            @media (max-width: 768px) {
                #security-interruption-modal > div {
                    padding: 20px !important;
                    margin: 10px !important;
                    width: calc(100% - 20px) !important;
                }
                
                #modal-header {
                    flex-direction: column !important;
                    text-align: center !important;
                    gap: 10px !important;
                }
                
                #security-interruption-modal > div > div:last-child {
                    flex-direction: column !important;
                }
                
                #security-interruption-modal > div > div:last-child button {
                    width: 100% !important;
                }
            }
        `;
        document.head.appendChild(style);

        // Function to check if email is in phishing mode
        function isPhishingMode() {
            var changeBtn = document.getElementById('change-content-btn');
            return changeBtn && changeBtn.textContent.includes('Normal Email');
        }

        // Function to show interruption modal
        function showInterruptionModal(element, type, originalAction) {
            var modalIcon = document.getElementById('modal-icon');
            var modalTitle = document.getElementById('modal-title');
            var modalSubtitle = document.getElementById('modal-subtitle');
            var modalMessage = document.getElementById('modal-message');
            var riskDetails = document.getElementById('risk-details');
            var targetDetails = document.getElementById('target-details');
            var continueBtn = document.getElementById('continue-action');
            var modalDiv = modal.querySelector('div');

            if (isPhishingMode()) {
                // Phishing mode - high risk
                modalIcon.textContent = '🚨';
                modalTitle.textContent = 'DANGER: Phishing Detected';
                modalTitle.style.color = '#dc3545';
                modalSubtitle.textContent = 'This action may compromise your security';
                modal.querySelector('div').style.borderColor = '#dc3545';
                
                if (type === 'link') {
                    modalMessage.textContent = 'You are about to click on a suspicious link that may be part of a phishing attack.';
                    riskDetails.innerHTML = `
                        <strong>🔗 Link Analysis:</strong> Potentially malicious<br>
                        <strong>⚠️ Risk Level:</strong> HIGH<br>
                        <strong>🎯 Threat Type:</strong> Phishing/Credential Theft<br>
                        <strong>📝 Recommendation:</strong> DO NOT PROCEED
                    `;
                    targetDetails.textContent = element.href || element.textContent || 'Suspicious Link';
                } else {
                    modalMessage.textContent = 'You are about to interact with a suspicious attachment that may contain malware.';
                    riskDetails.innerHTML = `
                        <strong>📎 File Analysis:</strong> Suspicious content detected<br>
                        <strong>⚠️ Risk Level:</strong> HIGH<br>
                        <strong>🎯 Threat Type:</strong> Malware/Tracking<br>
                        <strong>📝 Recommendation:</strong> DO NOT PROCEED
                    `;
                    targetDetails.textContent = element.src || element.alt || 'Suspicious Attachment';
                }
                
                continueBtn.textContent = 'Proceed Despite Risk';
                continueBtn.style.background = '#dc3545';
                continueBtn.classList.remove('safe');
                
            } else {
                // Normal mode - low risk
                modalIcon.textContent = '🔒';
                modalTitle.textContent = 'Security Check';
                modalTitle.style.color = '#28a745';
                modalSubtitle.textContent = 'Confirming your action for security';
                modal.querySelector('div').style.borderColor = '#28a745';
                
                if (type === 'link') {
                    modalMessage.textContent = 'You are about to visit an external link. This appears to be safe.';
                    riskDetails.innerHTML = `
                        <strong>🔗 Link Analysis:</strong> Appears legitimate<br>
                        <strong>✅ Risk Level:</strong> LOW<br>
                        <strong>🔒 Security Status:</strong> Verified<br>
                        <strong>📝 Recommendation:</strong> Safe to proceed
                    `;
                    targetDetails.textContent = element.href || element.textContent || 'External Link';
                } else {
                    modalMessage.textContent = 'You are about to view an attachment. This file appears to be safe.';
                    riskDetails.innerHTML = `
                        <strong>📎 File Analysis:</strong> Clean scan results<br>
                        <strong>✅ Risk Level:</strong> LOW<br>
                        <strong>🔒 Security Status:</strong> Verified<br>
                        <strong>📝 Recommendation:</strong> Safe to proceed
                    `;
                    targetDetails.textContent = element.src || element.alt || 'File Attachment';
                }
                
                continueBtn.textContent = 'Continue';
                continueBtn.style.background = '#28a745';
                continueBtn.classList.add('safe');
            }

            // Show modal with animation
            modal.style.display = 'block';
            modalDiv.classList.add('modal-animate-in');

            // Handle button clicks
            var continueClicked = false;
            var cancelClicked = false;

            function closeModal() {
                modal.style.display = 'none';
                modalDiv.classList.remove('modal-animate-in');
            }

            document.getElementById('continue-action').onclick = function() {
                continueClicked = true;
                closeModal();
                // Execute the original action
                if (originalAction) {
                    originalAction();
                }
            };

            document.getElementById('cancel-action').onclick = function() {
                cancelClicked = true;
                closeModal();
            };

            // Close modal when clicking outside
            modal.onclick = function(e) {
                if (e.target === modal) {
                    cancelClicked = true;
                    closeModal();
                }
            };
        }

        // Function to intercept clicks on links and attachments
        function interceptClicks() {
            // Remove existing event listeners
            var existingTargets = document.querySelectorAll('.intercepted-element');
            existingTargets.forEach(function(target) {
                target.classList.remove('intercepted-element');
            });

            // Intercept link clicks
            var emailBody = document.getElementById('email-body');
            if (emailBody) {
                var links = emailBody.querySelectorAll('a');
                links.forEach(function(link) {
                    link.classList.add('intercepted-element');
                    link.addEventListener('click', function(e) {
                        e.preventDefault();
                        showInterruptionModal(link, 'link', function() {
                            // Original action: open link
                            if (link.href && link.href !== '#') {
                                window.open(link.href, '_blank');
                            } else {
                                alert('Link action executed!');
                            }
                        });
                    });
                });
            }

            // Intercept attachment clicks
            var attachmentContainer = document.getElementById('attachment-container');
            if (attachmentContainer) {
                var attachments = attachmentContainer.querySelectorAll('img');
                attachments.forEach(function(attachment) {
                    attachment.classList.add('intercepted-element');
                    attachment.addEventListener('click', function(e) {
                        e.preventDefault();
                        showInterruptionModal(attachment, 'attachment', function() {
                            // Original action: view attachment
                            window.open(attachment.src, '_blank');
                        });
                    });
                });
            }

            // Intercept attachment button clicks
            var attachmentBtn = document.getElementById('show-attachments-btn');
            if (attachmentBtn) {
                attachmentBtn.classList.add('intercepted-element');
                var originalClick = attachmentBtn.onclick;
                attachmentBtn.onclick = function(e) {
                    e.preventDefault();
                    showInterruptionModal(attachmentBtn, 'attachment', function() {
                        // Execute original attachment button functionality
                        var attachmentContainer = document.getElementById('attachment-container');
                        if (attachmentContainer.style.display === 'none' || attachmentContainer.style.display === '') {
                            attachmentContainer.style.display = 'block';
                            attachmentBtn.textContent = 'Hide Attachments (1)';
                        } else {
                            attachmentContainer.style.display = 'none';
                            attachmentBtn.textContent = 'Show Attachments (1)';
                        }
                    });
                };
            }
        }

        // Initial setup
        interceptClicks();

        // Re-setup when content changes
        var changeContentBtn = document.getElementById('change-content-btn');
        if (changeContentBtn) {
            changeContentBtn.addEventListener('click', function() {
                setTimeout(interceptClicks, 100);
            });
        }

        console.log('Addon 04: Interruption screen loaded');
    }, 200);
}
