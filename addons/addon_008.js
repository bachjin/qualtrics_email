// Addon 08: Security Dashboard
// Add a security dashboard to the email interface

Qualtrics.SurveyEngine.addOnload(function () {
    /*Place your JavaScript here to run when the page loads*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

    // Clean up the email interface styles when leaving this question
    var existingStyle = document.getElementById('email-interface-styles');
    if (existingStyle) {
        existingStyle.remove();
    }

    // Clean up all addon elements using common class
    var addonElements = document.querySelectorAll('.qualtrics-addon');
    addonElements.forEach(function(element) {
        element.remove();
    });
    
    // Clean up any tooltips
    var tooltips = document.querySelectorAll('.link-tooltip');
    tooltips.forEach(function(tooltip) {
        tooltip.remove();
    });

});

var something = 'something';

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

    // Get the question container and preserve its original content
    var questionContainer = this.questionContainer;
    // Save original content instead of clearing it
    // questionContainer.innerHTML = '';

    // Define email content variable at the start of addOnReady function
    var emailContent = `
        <p>Hi there,</p>
        <p>I wanted to share the Q1 results with you. The project has exceeded our 
        expectations with a 25% increase in user engagement and a 15% improvement in 
        conversion rates.</p>
        <p>Key highlights:</p>
        <ul>
            <li>User engagement increased by 20%</li>
            <li>Conversion rates improved by 15%</li>
            <li>Customer satisfaction score: 4.8/5</li>
            <li>New feature adoption rate: 78%</li>
        </ul>
        <p>I'd love to hear your thoughts on these results and discuss next steps for Q2.
        You can view the detailed report <a href="#" onclick="showTooltip(event, 'This is a legitimate business email link. In a real scenario, this would open a secure report.', 'normal'); return false;" style="color: #0066cc;">here</a>.</p>
        <p>Best regards,<br>Sarah Johnson</p>
    `

	var phishyContent = `
		<p>Dear Valued Customer,</p>
		<p>We have detected unusual activity on your account that requires immediate attention. 
		Your account security is our top priority.</p>
		<p>To protect your account, please verify your information by clicking the link below:</p>
		<p style="text-align: center;">
			<a href="#" style="color: #0066cc;" onclick="showTooltip(event, '⚠️ PHISHING ATTEMPT DETECTED! This link would steal your credentials. Never click suspicious links demanding urgent action.', 'warning'); return false;">Verify Account Now</a>
		</p>
		<p>If you do not take action within 24 hours, your account will be temporarily suspended.</p>
		<p>This is an automated message, please do not reply.</p>
		<p>Best regards,<br>Account Security Team</p>
	`


    // Create the email interface HTML
    var emailInterface = `
		<div id="email-container" style="
			max-width: 800px;
			margin: 0 auto;
			background: #ffffff;
			border: 1px solid #e0e0e0;
			border-radius: 8px;
			box-shadow: 0 2px 8px rgba(0,0,0,0.1);
			font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
			position: relative;
		">
			<!-- Email Header -->
			<div id="email-header" style="
				background: #f8f9fa;
				padding: 20px;
				border-bottom: 1px solid #e0e0e0;
				border-radius: 8px 8px 0 0;
			">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
					<h2 style="margin: 0; color: #333; font-size: 18px;">Account Security Alert</h2>
					<span style="color: #666; font-size: 14px;">2 hours ago</span>
				</div>
				<div style="color: #666; font-size: 14px;">
					<strong>From:</strong> "Sarah Johnson" &lt;sarah.johnson@company.com&gt;<br>
					<strong>To:</strong> "You" &lt;you@company.com&gt;<br>
				</div>
			</div>
			
			<!-- Email Body -->
			<div id="email-body" style="
				padding: 20px;
				line-height: 1.6;
				color: #333;
				height: 400px;
				overflow-y: auto;
				border-bottom: 1px solid #e0e0e0;
			"> ` + phishyContent + `</div>
			
			<!-- Action Buttons -->
			<div id="attachment-toggle" style="
				padding: 15px 20px;
				background: #f8f9fa;
				border-top: 1px solid #e0e0e0;
				text-align: center;
			">
				<button id="show-attachments-btn" style="
					background: #6c757d;
					color: white;
					border: none;
					padding: 8px 16px;
					border-radius: 4px;
					cursor: pointer;
					font-size: 14px;
					font-weight: 500;
				">📎 Show Attachments (1)</button>
			</div>
			
			<div id="attachment-container" style="
				padding: 20px;
				background: #f8f9fa;
				border-top: 1px solid #e0e0e0;
				display: none;
			">
				<img src="https://jollycontrarian.com/images/6/6c/Rickroll.jpg" alt="Example Image" style="max-width: 50%; height: auto; margin: 10px 0;">
			</div>

			<div id="email-actions" style="
				padding: 15px 20px;
				background: #f8f9fa;
				border-top: 1px solid #e0e0e0;
				display: flex;
				gap: 10px;
				flex-wrap: wrap;
			">
				<button id="reply-btn" style="
					background: #007bff;
					color: white;
					border: none;
					padding: 10px 20px;
					border-radius: 4px;
					cursor: pointer;
					font-size: 14px;
					font-weight: 500;
				">Reply</button>
				<button id="delete-btn" style="
					background: #dc3545;
					color: white;
					border: none;
					padding: 10px 20px;
					border-radius: 4px;
					cursor: pointer;
					font-size: 14px;
					font-weight: 500;
				">Delete</button>
				<button id="back-btn" style="
					background: #6c757d;
					color: white;
					border: none;
					padding: 10px 20px;
					border-radius: 4px;
					cursor: pointer;
					font-size: 14px;
					font-weight: 500;
				">Back</button>
				<button id="change-content-btn" style="
					background: #28a745;
					color: white;
					border: none;
					padding: 10px 20px;
					border-radius: 4px;
					cursor: pointer;
					font-size: 14px;
					font-weight: 500;
				">Display Normal Email</button>
			</div>
			
			<!-- Reply Section (shown by default) -->
			<div id="reply-section" style="
				padding: 20px;
				border-top: 1px solid #e0e0e0;
				background: #f8f9fa;
				position: relative;
			">
				<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
					<h3 style="margin: 0; color: #333; font-size: 16px;">Your Reply:</h3>
					<button id="ai-toggle-btn" style="
						background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
						color: white;
						border: none;
						padding: 8px 12px;
						border-radius: 20px;
						cursor: pointer;
						font-size: 12px;
						font-weight: 500;
						display: flex;
						align-items: center;
						gap: 5px;
						box-shadow: 0 2px 4px rgba(0,0,0,0.1);
					">
						<span style="font-size: 14px;">🤖</span>
						<span>AI Assistant</span>
					</button>
				</div>
				<div style="position: relative;">
					<textarea id="reply-text" placeholder="Type your reply here..." style="
						width: 100%;
						height: 120px;
						padding: 12px;
						border: 1px solid #ccc;
						border-radius: 4px;
						font-family: inherit;
						font-size: 14px;
						line-height: 1.4;
						resize: vertical;
						box-sizing: border-box;
					"></textarea>
					
					<!-- AI Suggestions Hover Block -->
					<div id="ai-suggestions" style="
						position: fixed;
						top: 20px;
						right: 20px;
						width: 300px;
						min-height: 200px;
						max-height: calc(100vh - 40px);
						overflow-y: auto;
						background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
						border-radius: 12px;
						padding: 16px;
						box-shadow: 0 8px 25px rgba(0,0,0,0.15);
						z-index: 1000;
						display: none;
						color: white;
						font-size: 13px;
						line-height: 1.4;
					">
						<div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
							<div style="display: flex; align-items: center; gap: 8px;">
								<span style="font-size: 18px;">🛡️</span>
								<strong style="font-size: 14px;">AI Security Assistant</strong>
							</div>
							<button id="close-ai-mobile" style="
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
							">✕</button>
						</div>
						
						<div id="ai-content" style="margin-bottom: 12px;">
							<div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 6px; margin-bottom: 8px;">
								<div style="font-weight: 500; margin-bottom: 4px;">✅ Email Analysis:</div>
								<div>No phishing indicators detected</div>
							</div>
							<div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 6px;">
								<div style="font-weight: 500; margin-bottom: 4px;">💡 Suggestion:</div>
								<div>This appears to be a legitimate business email. Safe to reply.</div>
							</div>
						</div>
					</div>
				</div>
				
				<div style="margin-top: 10px;">
					<button id="send-reply-btn" style="
						background: #28a745;
						color: white;
						border: none;
						padding: 10px 20px;
						border-radius: 4px;
						cursor: pointer;
						font-size: 14px;
						font-weight: 500;
						margin-right: 10px;
					">Send Reply</button>
					<button id="save-draft-btn" style="
						background: #ffc107;
						color: #212529;
						border: none;
						padding: 10px 20px;
						border-radius: 4px;
						cursor: pointer;
						font-size: 14px;
						font-weight: 500;
					">Save Draft</button>
				</div>
			</div>
		</div>
	`;

    var s1 = 'cool';
    var s2 = 'Yes ' + s1 + ' Minister';

    console.log(s1);
    console.log(s2);
	console.log(something);

    // Insert the email interface into the question container (append instead of replace)
    var emailDiv = document.createElement('div');
    emailDiv.innerHTML = emailInterface;
    questionContainer.appendChild(emailDiv);

    // Add button hover effects and responsive styles
    var style = document.createElement('style');
    style.id = 'email-interface-styles';
    style.textContent = `
		#email-container button:hover {
			opacity: 0.9;
			transform: translateY(-1px);
			transition: all 0.2s ease;
		}
		#reply-btn:hover { background: #0056b3 !important; }
		#delete-btn:hover { background: #c82333 !important; }
		#back-btn:hover { background: #545b62 !important; }
		#send-reply-btn:hover { background: #218838 !important; }
		#save-draft-btn:hover { background: #e0a800 !important; }
		#change-content-btn:hover { background: #e8650e !important; }
		#reply-text:focus {
			outline: none;
			border-color: #007bff;
			box-shadow: 0 0 0 2px rgba(0,123,255,0.25);
		}
		
		#ai-toggle-btn:hover {
			transform: translateY(-2px) !important;
			box-shadow: 0 4px 8px rgba(0,0,0,0.2) !important;
		}
		
		#ai-suggestions {
			animation: slideIn 0.3s ease-out;
		}
		
		@keyframes slideIn {
			from {
				opacity: 0;
				transform: translateY(-10px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}
		
		#close-ai-mobile:hover {
			background: rgba(255,255,255,0.4) !important;
			transform: scale(1.1);
		}
		
		/* Ensure AI suggestions box stays within viewport */
		#reply-section {
			overflow: visible !important;
		}
		
		#email-container {
			overflow: visible !important;
		}
		
		@media (min-width: 769px) {
			#ai-suggestions {
				position: fixed !important;
				top: 20px !important;
				right: 20px !important;
				width: 320px !important;
			}
		}
		
		/* Mobile responsive styles */
		/* Tooltip styles */
		.link-tooltip {
			position: fixed;
			background: white;
			border: 1px solid #ddd;
			border-radius: 8px;
			padding: 16px;
			box-shadow: 0 4px 12px rgba(0,0,0,0.15);
			z-index: 1001;
			max-width: 300px;
			font-size: 14px;
			line-height: 1.4;
			display: none;
			animation: tooltipFadeIn 0.2s ease-out;
		}
		
		.link-tooltip.normal {
			border-left: 4px solid #28a745;
		}
		
		.link-tooltip.warning {
			border-left: 4px solid #dc3545;
			background: #fff5f5;
		}
		
		.link-tooltip-header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: 8px;
		}
		
		.link-tooltip-close {
			background: none;
			border: none;
			font-size: 18px;
			cursor: pointer;
			color: #666;
			padding: 0;
			margin-left: 8px;
			line-height: 1;
		}
		
		.link-tooltip-close:hover {
			color: #333;
		}
		
		@keyframes tooltipFadeIn {
			from {
				opacity: 0;
				transform: translateY(-5px);
			}
			to {
				opacity: 1;
				transform: translateY(0);
			}
		}

		@media (max-width: 768px) {
			#email-container {
				margin: 0 !important;
				border-radius: 0 !important;
				border-left: none !important;
				border-right: none !important;
			}
			#email-header, #email-body, #email-actions, #reply-section {
				padding: 15px !important;
			}
			#email-actions {
				flex-direction: column !important;
				gap: 8px !important;
			}
			#email-actions button {
				width: 100% !important;
			}
			
			/* Fix AI toggle button positioning on mobile */
			#reply-section > div:first-child {
				flex-direction: column !important;
				align-items: flex-start !important;
				gap: 10px !important;
			}
			
			#ai-toggle-btn {
				align-self: flex-end !important;
				margin-bottom: 10px !important;
			}
			
			#ai-suggestions {
				position: fixed !important;
				top: 50% !important;
				left: 50% !important;
				transform: translate(-50%, -50%) !important;
				width: 90% !important;
				max-width: 300px !important;
				min-height: auto !important;
				max-height: 80vh !important;
				overflow-y: auto !important;
			}
			
			#close-ai-mobile {
				display: flex !important;
			}
			
			.link-tooltip {
				position: fixed !important;
				top: 50% !important;
				left: 50% !important;
				transform: translate(-50%, -50%) !important;
				width: 90% !important;
				max-width: 280px !important;
			}
		}
	`;
    document.head.appendChild(style);

    // AI Suggestions functionality
    var aiSuggestionsVisible = false;
    var isPhishingMode = false;

    document.getElementById('ai-toggle-btn').addEventListener('click', function () {
        var aiSuggestions = document.getElementById('ai-suggestions');
        aiSuggestionsVisible = !aiSuggestionsVisible;

        if (aiSuggestionsVisible) {
            aiSuggestions.style.display = 'block';
            this.style.background = 'linear-gradient(135deg, #dc3545 0%, #6f42c1 100%)';
            this.innerHTML = '<span style="font-size: 14px;">🤖</span><span>Hide AI</span>';
        } else {
            aiSuggestions.style.display = 'none';
            this.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            this.innerHTML = '<span style="font-size: 14px;">🤖</span><span>AI Assistant</span>';
        }
    });

    document.getElementById('change-content-btn').addEventListener('click', function () {
        var emailBody = document.getElementById('email-body');
        var aiContent = document.getElementById('ai-content');
        isPhishingMode = !isPhishingMode;

        if (isPhishingMode) {
            emailBody.innerHTML = emailContent;
            this.textContent = 'Display Phishing Email';
            this.style.background = '#dc3545';
            // Update AI analysis for normal email
            aiContent.innerHTML = `
				<div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 6px; margin-bottom: 8px;">
					<div style="font-weight: 500; margin-bottom: 4px;">✅ Email Analysis:</div>
					<div>No phishing indicators detected</div>
				</div>
				<div style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 6px;">
					<div style="font-weight: 500; margin-bottom: 4px;">💡 Suggestion:</div>
					<div>This appears to be a legitimate business email. Safe to reply.</div>
				</div>
			`;
        } else {
            emailBody.innerHTML = phishyContent;
            this.textContent = 'Display Normal Email';
            this.style.background = '#28a745';
            // Update AI analysis for phishing email
            aiContent.innerHTML = `
				<div style="background: rgba(220,53,69,0.3); padding: 10px; border-radius: 6px; margin-bottom: 8px; border: 1px solid rgba(220,53,69,0.5);">
					<div style="font-weight: 500; margin-bottom: 4px;">⚠️ PHISHING DETECTED:</div>
					<div>Suspicious sender patterns and unusual urgency detected</div>
				</div>
				<div style="background: rgba(220,53,69,0.2); padding: 10px; border-radius: 6px;">
					<div style="font-weight: 500; margin-bottom: 4px;">🚨 Warning:</div>
					<div>DO NOT reply or click any links. Report this email immediately.</div>
				</div>
			`;
        }
    });

    // Close button functionality for mobile
    document.getElementById('close-ai-mobile').addEventListener('click', function () {
        var aiSuggestions = document.getElementById('ai-suggestions');
        var toggleBtn = document.getElementById('ai-toggle-btn');
        
        aiSuggestions.style.display = 'none';
        aiSuggestionsVisible = false;
        toggleBtn.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        toggleBtn.innerHTML = '<span style="font-size: 14px;">🤖</span><span>AI Assistant</span>';
    });

    // Add button functionality
	document.getElementById('show-attachments-btn').addEventListener('click', function () {
		var attachmentContainer = document.getElementById('attachment-container');
		if (attachmentContainer.style.display === 'none' || attachmentContainer.style.display === '') {
			attachmentContainer.style.display = 'block';
			this.textContent = 'Hide Attachments (1)';
		} else {
			attachmentContainer.style.display = 'none';
			this.textContent = 'Show Attachments (1)';
		}
	});

    document.getElementById('reply-btn').addEventListener('click', function () {
        var replySection = document.getElementById('reply-section');
        var replyText = document.getElementById('reply-text');

        if (replySection.style.display === 'none') {
            replySection.style.display = 'block';
            this.textContent = 'Hide Reply';
            this.style.background = '#6c757d';
        } else {
            replySection.style.display = 'none';
            this.textContent = 'Reply';
            this.style.background = '#007bff';
        }
        replyText.focus();
    });

    document.getElementById('delete-btn').addEventListener('click', function () {
        if (confirm('Are you sure you want to delete this email?')) {
            alert('Email deleted successfully!');
            // In a real scenario, you might hide the email or redirect
        }
    });

    document.getElementById('back-btn').addEventListener('click', function () {
        alert('Going back to email list...');
        // In a real scenario, you might navigate to the previous page
    });

    document.getElementById('send-reply-btn').addEventListener('click', function () {
        var replyText = document.getElementById('reply-text').value.trim();
        if (replyText) {
            alert('Reply sent successfully!');
            document.getElementById('reply-text').value = '';
        } else {
            alert('Please enter a reply message.');
        }
    });

    document.getElementById('save-draft-btn').addEventListener('click', function () {
        var replyText = document.getElementById('reply-text').value.trim();
        if (replyText) {
            alert('Draft saved successfully!');
        } else {
            alert('Please enter some text to save as draft.');
        }
    });

    // Store reply text in Qualtrics embedded data (optional)
    document.getElementById('reply-text').addEventListener('input', function () {
        Qualtrics.SurveyEngine.setEmbeddedData('emailReply', this.value);
    });

    // Tooltip functionality for links
    window.showTooltip = function(event, message, type) {
        event.preventDefault();
        
        // Remove any existing tooltip
        var existingTooltip = document.querySelector('.link-tooltip');
        if (existingTooltip) {
            existingTooltip.remove();
        }
        
        // Create new tooltip
        var tooltip = document.createElement('div');
        tooltip.className = 'link-tooltip ' + type;
        tooltip.innerHTML = `
            <div class="link-tooltip-header">
                <div style="flex: 1;">` + message + `</div>
                <button class="link-tooltip-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        `;
        
        document.body.appendChild(tooltip);
        
        // Position tooltip near the clicked element
        var rect = event.target.getBoundingClientRect();
        var tooltipRect = tooltip.getBoundingClientRect();
        
        var left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        var top = rect.bottom + 10;
        
        // Ensure tooltip stays within viewport
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top + tooltipRect.height > window.innerHeight - 10) {
            top = rect.top - tooltipRect.height - 10;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
        tooltip.style.display = 'block';
        
        // Close tooltip when clicking outside
        setTimeout(function() {
            document.addEventListener('click', function closeTooltip(e) {
                if (!tooltip.contains(e.target) && e.target !== event.target) {
                    tooltip.remove();
                    document.removeEventListener('click', closeTooltip);
                }
            });
        }, 100);
    };

	// replaced with initPhishingHelper() from separate addons
	initPhishingHelper();
});

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

        // Add close functionality
        document.getElementById('close-dashboard').addEventListener('click', function() {
            dashboard.remove();
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
