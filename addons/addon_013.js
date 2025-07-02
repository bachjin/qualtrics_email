// Addon 13: Community reporting dashboard
// Add a community reporting dashboard to the email interface

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
        You can view the detailed report <a href="#" onclick="alert('Normal email'); return false;" style="color: #0066cc;">here</a>.</p>
        <p>Best regards,<br>Sarah Johnson</p>
    `

	var phishyContent = `
		<p>Dear Valued Customer,</p>
		<p>We have detected unusual activity on your account that requires immediate attention. 
		Your account security is our top priority.</p>
		<p>To protect your account, please verify your information by clicking the link below:</p>
		<p style="text-align: center;">
			<a href="#" style="color: #0066cc;" onclick="alert('You are phished!'); return false;">Verify Account Now</a>
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

	// replaced with initPhishingHelper() from separate addons

    // Community reporting dashboard
    function initCommunityReporting() {
        // Create the reporting dashboard
        var reportingDashboard = document.createElement('div');
        reportingDashboard.className = 'qualtrics-addon'; // Add common class for cleanup
        reportingDashboard.id = 'reporting-dashboard';
        reportingDashboard.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
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
            background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%);
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
            <span style="font-size: 18px;">🚨</span>
            <span>Community Reports</span>
        `;

        // Create dashboard content
        var dashboardContent = document.createElement('div');
        dashboardContent.style.cssText = `
            padding: 20px;
            color: #333;
            line-height: 1.5;
        `;

        // Generate random number of reports for demonstration
        var reportCount = Math.floor(Math.random() * 15) + 3; // 3-17 reports
        
        // Check if this is a phishing email by looking for phishing indicators in the page
        var isPhishing = true;
        
        var warningSection = isPhishing ? `
            <div style="
                background: #fff5f5;
                border-left: 4px solid #e53e3e;
                padding: 12px;
                border-radius: 0 6px 6px 0;
                font-size: 13px;
                color: #2d3748;
            " id="warning-section">
                <strong>⚠️ Community Warning:</strong><br>
                Multiple users have flagged this email as potentially malicious.
            </div>
        ` : '';
        
        dashboardContent.innerHTML = `
            <div style="
                background: #fff5f5;
                border: 1px solid #fed7d7;
                border-radius: 8px;
                padding: 16px;
                margin-bottom: 16px;
                text-align: center;
            ">
                <div style="font-size: 24px; font-weight: bold; color: #e53e3e; margin-bottom: 4px;" id="report-count">
                    ` + reportCount + `
                </div>
                <div style="color: #666; font-size: 14px;">
                    people reported this email today
                </div>
            </div>
            
            <div style="
                background: #f7fafc;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 14px;
                margin-bottom: 16px;
            ">
                <div style="font-weight: 500; color: #2d3748; margin-bottom: 8px; font-size: 13px;">
                    📊 Report Summary:
                </div>
                <ul style="margin: 0; padding-left: 16px; font-size: 13px; color: #4a5568;" id="report-summary">
                    <li>Suspicious links: ` + Math.floor(reportCount * 0.7) + ` reports</li>
                    <li>Fake sender: ` + Math.floor(reportCount * 0.5) + ` reports</li>
                    <li>Urgent language: ` + Math.floor(reportCount * 0.8) + ` reports</li>
                </ul>
            </div>
            
            ` + warningSection + `
        `;

        // Assemble the dashboard
        reportingDashboard.appendChild(dashboardHeader);
        reportingDashboard.appendChild(dashboardContent);

        // Add dashboard to the page
        document.body.appendChild(reportingDashboard);

        // Update the change-content-btn to modify report count
        var changeContentBtn = document.getElementById('change-content-btn');
        if (changeContentBtn) {
            changeContentBtn.addEventListener('click', function() {
                var reportCountElement = document.getElementById('report-count');
                var reportSummaryElement = document.getElementById('report-summary');
                isPhishing = !isPhishing;
                if (reportCountElement && reportSummaryElement) {
                    if (isPhishing) {
                        var newReportCount = Math.floor(Math.random() * 15) + 3; // 3-17 reports
                    } else {
                        var newReportCount = 0;
                    }
                    reportCountElement.textContent = newReportCount;
                    reportSummaryElement.innerHTML = `
                        <li>Suspicious links: ` + Math.floor(newReportCount * 0.7) + ` reports</li>
                        <li>Fake sender: ` + Math.floor(newReportCount * 0.5) + ` reports</li>
                        <li>Urgent language: ` + Math.floor(newReportCount * 0.8) + ` reports</li>
                    `;
                }
                console.log('isPhishing', isPhishing);
                var warningSection = document.getElementById('warning-section');
                if (isPhishing) {
                    warningSection.style.display = 'block';
                } else {
                    warningSection.style.display = 'none';
                }
            });
        }

        console.log('Community reporting dashboard loaded');
    }

    // Initialize the community reporting dashboard
    initCommunityReporting();
});
