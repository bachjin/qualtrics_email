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
		<p>We have detected <span data-highlight="urgency">unusual activity</span> on your account that requires <span data-highlight="urgency">immediate attention</span>. 
		Your account security is our top priority.</p>
		<p>To protect your account, please verify your information by clicking the link below:</p>
		<p style="text-align: center;">
			<a href="#" style="color: #0066cc;" onclick="alert('You are phished!'); return false;" data-highlight="suspicious-link">Verify Account Now</a>
		</p>
		<p>If you do not take action within <span data-highlight="urgency">24 hours</span>, your account will be <span data-highlight="threat">temporarily suspended</span>.</p>
		<p>This is an automated message, please do not reply.</p>
		<p>Best regards,<br><span data-highlight="sender">Account Security Team</span></p>
	`

    // Quiz questions data
    var quizQuestions = [
        {
            id: 1,
            question: "What creates urgency in this email?",
            options: [
                "Mentions of immediate attention and 24-hour deadline",
                "Professional greeting",
                "Contact information",
                "Email signature"
            ],
            correct: 0,
            highlight: "urgency",
            explanation: "Phishing emails often create false urgency to pressure recipients into acting quickly without thinking."
        },
        {
            id: 2,
            question: "What makes the sender suspicious?",
            options: [
                "Use of proper grammar",
                "Generic 'Account Security Team' without specific company name",
                "Professional tone",
                "Email length"
            ],
            correct: 1,
            highlight: "sender",
            explanation: "Legitimate companies typically identify themselves clearly, not with generic department names."
        },
        {
            id: 3,
            question: "What should you be cautious about with the link?",
            options: [
                "It's colored blue",
                "It's underlined",
                "It leads to account verification without company-specific domain",
                "It's clickable"
            ],
            correct: 2,
            highlight: "suspicious-link",
            explanation: "Always verify links lead to legitimate company domains before clicking."
        },
        {
            id: 4,
            question: "What threat tactic is being used?",
            options: [
                "Offering rewards",
                "Threatening account suspension",
                "Requesting feedback",
                "Sharing company news"
            ],
            correct: 1,
            highlight: "threat",
            explanation: "Phishing emails often threaten negative consequences to create fear and prompt immediate action."
        }
    ];

    // Create the main container with quiz and email side by side
    var mainInterface = `
        <div id="main-container" style="
            display: flex;
            gap: 20px;
            max-width: 1400px;
            margin: 0 auto;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
            <!-- Quiz Dashboard -->
            <div id="quiz-dashboard" style="
                width: 350px;
                min-width: 350px;
                background: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                height: fit-content;
                position: sticky;
                top: 20px;
            ">
                <div id="quiz-header" style="
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 20px;
                    border-radius: 8px 8px 0 0;
                    text-align: center;
                ">
                    <h3 style="margin: 0; font-size: 18px;">📚 Email Security Quiz</h3>
                    <p style="margin: 10px 0 0; font-size: 14px; opacity: 0.9;">Complete to unlock email interactions</p>
                </div>
                
                <div id="quiz-progress" style="
                    padding: 15px 20px;
                    background: #f8f9fa;
                    border-bottom: 1px solid #e0e0e0;
                ">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                        <span style="font-size: 14px; font-weight: 500;">Progress</span>
                        <span id="progress-text" style="font-size: 14px; color: #666;">0 / 4</span>
                    </div>
                    <div style="background: #e9ecef; height: 8px; border-radius: 4px;">
                        <div id="progress-bar" style="
                            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                            height: 100%;
                            border-radius: 4px;
                            width: 0%;
                            transition: width 0.3s ease;
                        "></div>
                    </div>
                </div>
                
                <div id="quiz-content" style="padding: 20px;">
                    <div id="question-container">
                        <!-- Questions will be inserted here -->
                    </div>
                    
                    <div id="quiz-complete" style="display: none; text-align: center;">
                        <div style="
                            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
                            color: white;
                            padding: 20px;
                            border-radius: 8px;
                            margin-bottom: 15px;
                        ">
                            <div style="font-size: 24px; margin-bottom: 10px;">🎉</div>
                            <h4 style="margin: 0 0 5px; font-size: 16px;">Quiz Complete!</h4>
                            <p style="margin: 0; font-size: 14px; opacity: 0.9;">Email interactions are now unlocked</p>
                        </div>
                        <p style="font-size: 14px; color: #666; line-height: 1.5;">
                            Great job! You've identified key phishing indicators. 
                            You can now interact with the email interface.
                        </p>
                    </div>
                </div>
            </div>

                        <!-- Email Container -->
            <div id="email-container" class="email-interactions-disabled" style="
                flex: 1;
                background: #ffffff;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
                position: relative;
                opacity: 1;
                transition: all 0.3s ease;
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
                ">` + phishyContent + `</div>
			
			<!-- Action Buttons -->
			<div id="attachment-toggle" style="
				padding: 15px 20px;
				background: #f8f9fa;
				border-top: 1px solid #e0e0e0;
				text-align: center;
			">
                    <button id="show-attachments-btn" class="email-interactive" style="
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
                    <button id="reply-btn" class="email-interactive" style="
					background: #007bff;
					color: white;
					border: none;
					padding: 10px 20px;
					border-radius: 4px;
					cursor: pointer;
					font-size: 14px;
					font-weight: 500;
				">Reply</button>
                    <button id="delete-btn" class="email-interactive" style="
					background: #dc3545;
					color: white;
					border: none;
					padding: 10px 20px;
					border-radius: 4px;
					cursor: pointer;
					font-size: 14px;
					font-weight: 500;
				">Delete</button>
                    <button id="back-btn" class="email-interactive" style="
					background: #6c757d;
					color: white;
					border: none;
					padding: 10px 20px;
					border-radius: 4px;
					cursor: pointer;
					font-size: 14px;
					font-weight: 500;
				">Back</button>
                    <button id="change-content-btn" class="email-interactive" style="
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
				<div style="display: none; justify-content: space-between; align-items: center; margin-bottom: 15px;">
					<h3 style="margin: 0; color: #333; font-size: 16px;">Your Reply:</h3>
                        <button id="ai-toggle-btn" class="email-interactive" style="
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
                        <textarea id="reply-text" class="email-interactive" placeholder="Type your reply here..." style="
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
                        <button id="send-reply-btn" class="email-interactive" style="
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
                        <button id="save-draft-btn" class="email-interactive" style="
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

                                <!-- Quiz Status Banner -->
                <div id="quiz-status-banner" style="
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 500;
                    z-index: 10;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
                    transition: all 0.3s ease;
                ">
                    🔒 Complete quiz to unlock interactions
                </div>
			</div>
		</div>
	`;

    var s1 = 'cool';
    var s2 = 'Yes ' + s1 + ' Minister';

    console.log(s1);
    console.log(s2);
	console.log(something);

    // Insert the main interface into the question container
    var mainDiv = document.createElement('div');
    mainDiv.innerHTML = mainInterface;
	var old_emailInterface = document.getElementById('email-container');
	if (old_emailInterface) questionContainer.removeChild(old_emailInterface.parentNode);
    questionContainer.appendChild(mainDiv);

    // Quiz state variables
    var currentQuestionIndex = 0;
    var correctAnswers = 0;
    var userAnswers = [];
    var quizCompleted = false;

    // Initialize the quiz after DOM insertion
    setTimeout(function() {
        initializeQuiz();
    }, 100);

    // Initialize quiz
    function initializeQuiz() {
        showQuestion(currentQuestionIndex);
    }

    // Show specific question
    function showQuestion(index) {
        var question = quizQuestions[index];
        var questionContainer = document.getElementById('question-container');
        
        var optionsHTML = '';
        for (var optIndex = 0; optIndex < question.options.length; optIndex++) {
            optionsHTML += '<label class="quiz-option-label" style="' +
                'display: block;' +
                'margin-bottom: 10px;' +
                'padding: 12px;' +
                'background: #f8f9fa;' +
                'border: 2px solid #e9ecef;' +
                'border-radius: 6px;' +
                'cursor: pointer;' +
                'transition: all 0.2s ease;' +
                'font-size: 14px;' +
                '">' +
                '<input type="radio" name="quiz-option" value="' + optIndex + '" style="margin-right: 10px;">' +
                question.options[optIndex] +
                '</label>';
        }
        
        var questionHTML = `
            <div id="current-question" style="margin-bottom: 20px;">
                <h4 style="margin: 0 0 15px; color: #333; font-size: 16px;">
                    Question ` + (index + 1) + ` of ` + quizQuestions.length + `
                </h4>
                <p style="margin: 0 0 15px; font-size: 14px; line-height: 1.5; color: #555;">
                    ` + question.question + `
                </p>
                <div id="options-container">
                    ` + optionsHTML + `
                </div>
                <button id="submit-answer-btn" style="
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    margin-top: 15px;
                    width: 100%;
                " disabled>Submit Answer</button>
            </div>
        `;
        
        questionContainer.innerHTML = questionHTML;
        
        // Highlight the relevant parts in email
        highlightEmailContent(question.highlight);
        
        // Add event listeners
        var options = document.querySelectorAll('input[name="quiz-option"]');
        var submitBtn = document.getElementById('submit-answer-btn');
        
        options.forEach(function(option) {
            option.addEventListener('change', function() {
                // Remove selected class from all labels
                var allLabels = document.querySelectorAll('.quiz-option-label');
                allLabels.forEach(function(label) {
                    label.classList.remove('selected');
                });
                
                // Add selected class to the clicked label
                var selectedLabel = this.closest('.quiz-option-label');
                if (selectedLabel) {
                    selectedLabel.classList.add('selected');
                }
                
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.background = '#667eea';
                submitBtn.style.cursor = 'pointer';
            });
        });
        
        submitBtn.addEventListener('click', function() {
            var selectedOption = document.querySelector('input[name="quiz-option"]:checked');
            if (selectedOption) {
                submitAnswer(parseInt(selectedOption.value), question);
            }
        });
    }

    // Highlight content in email
    function highlightEmailContent(highlightClass) {
        // Clear previous highlights
        var highlighted = document.querySelectorAll('.quiz-highlight');
        highlighted.forEach(function(elem) {
            elem.classList.remove('quiz-highlight');
        });
        
        // Add new highlights
        var targets = document.querySelectorAll('[data-highlight="' + highlightClass + '"]');
        targets.forEach(function(elem) {
            elem.classList.add('quiz-highlight');
        });
    }

    // Submit answer
    function submitAnswer(selectedIndex, question) {
        var isCorrect = selectedIndex === question.correct;
        userAnswers.push({
            questionId: question.id,
            selected: selectedIndex,
            correct: isCorrect
        });
        
        if (isCorrect) {
            correctAnswers++;
        }
        
        // Show feedback
        showAnswerFeedback(question, isCorrect, selectedIndex);
    }

    // Show answer feedback
    function showAnswerFeedback(question, isCorrect, selectedIndex) {
        var questionContainer = document.getElementById('question-container');
        
        var backgroundGradient = isCorrect ? 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' : 'linear-gradient(135deg, #dc3545 0%, #fd7e14 100%)';
        var icon = isCorrect ? '✅' : '❌';
        var resultText = isCorrect ? 'Correct!' : 'Incorrect';
        var borderColor = isCorrect ? '#28a745' : '#dc3545';
        var buttonText = currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'Complete Quiz';
        
        var feedbackHTML = `
            <div style="margin-bottom: 20px;">
                <div style="
                    background: ` + backgroundGradient + `;
                    color: white;
                    padding: 15px;
                    border-radius: 6px;
                    margin-bottom: 15px;
                    text-align: center;
                ">
                    <div style="font-size: 24px; margin-bottom: 8px;">
                        ` + icon + `
                    </div>
                    <h4 style="margin: 0; font-size: 16px;">
                        ` + resultText + `
                    </h4>
                </div>
                
                <div style="
                    background: #f8f9fa;
                    padding: 15px;
                    border-radius: 6px;
                    border-left: 4px solid ` + borderColor + `;
                ">
                    <h5 style="margin: 0 0 8px; color: #333; font-size: 14px;">Explanation:</h5>
                    <p style="margin: 0; font-size: 13px; line-height: 1.4; color: #666;">
                        ` + question.explanation + `
                    </p>
                </div>
                
                <button id="next-question-btn" style="
                    background: #667eea;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                    font-size: 14px;
                    font-weight: 500;
                    margin-top: 15px;
                    width: 100%;
                ">
                    ` + buttonText + `
                </button>
            </div>
        `;
        
        questionContainer.innerHTML = feedbackHTML;
        
        // Update progress
        updateProgress();
        
        document.getElementById('next-question-btn').addEventListener('click', function() {
            if (currentQuestionIndex < quizQuestions.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            } else {
                completeQuiz();
            }
        });
    }

    // Update progress bar
    function updateProgress() {
        var progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
        var progressBar = document.getElementById('progress-bar');
        var progressText = document.getElementById('progress-text');
        
        progressBar.style.width = progress + '%';
        progressText.textContent = (currentQuestionIndex + 1) + ' / ' + quizQuestions.length;
    }

    // Complete quiz
    function completeQuiz() {
        quizCompleted = true;
        
        // Show completion screen
        document.getElementById('question-container').style.display = 'none';
        document.getElementById('quiz-complete').style.display = 'block';
        
        // Enable email interactions
        enableEmailInteractions();
        
        // Clear highlights
        var highlighted = document.querySelectorAll('.quiz-highlight');
        highlighted.forEach(function(elem) {
            elem.classList.remove('quiz-highlight');
        });
        
        // Store quiz results in Qualtrics
        Qualtrics.SurveyEngine.setEmbeddedData('quizScore', correctAnswers);
        Qualtrics.SurveyEngine.setEmbeddedData('quizTotal', quizQuestions.length);
        Qualtrics.SurveyEngine.setEmbeddedData('quizCompleted', true);
    }

    // Enable email interactions
    function enableEmailInteractions() {
        var emailContainer = document.getElementById('email-container');
        var statusBanner = document.getElementById('quiz-status-banner');
        
        // Remove the interactions-disabled class to enable all interactions
        emailContainer.classList.remove('email-interactions-disabled');
        
        if (statusBanner) {
            statusBanner.innerHTML = '✅ Quiz completed - interactions unlocked';
            statusBanner.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            
            // Hide the banner after 3 seconds
            setTimeout(function() {
                statusBanner.style.opacity = '0';
                setTimeout(function() {
                    statusBanner.style.display = 'none';
                }, 300);
            }, 3000);
        }
    }

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
		
		/* Quiz highlighting styles */
		.quiz-highlight {
			background: linear-gradient(135deg, #ffeaa7 0%, #fab1a0 100%) !important;
			padding: 2px 4px !important;
			border-radius: 3px !important;
			border: 2px solid #fd79a8 !important;
			animation: pulse 2s infinite !important;
			box-shadow: 0 0 10px rgba(253, 121, 168, 0.5) !important;
		}
		
		@keyframes pulse {
			0% { box-shadow: 0 0 5px rgba(253, 121, 168, 0.5); }
			50% { box-shadow: 0 0 15px rgba(253, 121, 168, 0.8); }
			100% { box-shadow: 0 0 5px rgba(253, 121, 168, 0.5); }
		}
		
		/* Quiz option styling */
		.quiz-option-label:hover {
			background: #e9ecef !important;
			transform: translateY(-2px) !important;
			box-shadow: 0 4px 8px rgba(0,0,0,0.1) !important;
		}
		
		.quiz-option-label.selected {
			background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
			color: white !important;
			border-color: #667eea !important;
			transform: translateY(-2px) !important;
			box-shadow: 0 6px 12px rgba(102, 126, 234, 0.3) !important;
		}
		
		.quiz-option-label.selected:hover {
			background: linear-gradient(135deg, #5a6fd8 0%, #6a42a0 100%) !important;
		}
		
		/* Email scrolling fix */
		.email-interactions-disabled {
			pointer-events: none !important;
		}
		
		.email-interactions-disabled #email-body {
			pointer-events: auto !important;
		}
		
		/* Quiz submit button styling */
		#submit-answer-btn:disabled {
			background: #6c757d !important;
			cursor: not-allowed !important;
			opacity: 0.6 !important;
		}
		
		#submit-answer-btn:enabled {
			background: #667eea !important;
			cursor: pointer !important;
			opacity: 1 !important;
		}
		
		#submit-answer-btn:enabled:hover {
			background: #5a6fd8 !important;
			transform: translateY(-1px) !important;
			box-shadow: 0 4px 8px rgba(102, 126, 234, 0.3) !important;
		}
		
		/* Quiz dashboard responsive styles */
		@media (max-width: 1200px) {
			#main-container {
				flex-direction: column !important;
				gap: 15px !important;
			}
			
			#quiz-dashboard {
				width: 100% !important;
				min-width: auto !important;
				position: relative !important;
				top: auto !important;
				order: -1 !important;
			}
			
			#quiz-status-banner {
				position: relative !important;
				top: auto !important;
				right: auto !important;
				margin-bottom: 10px !important;
				text-align: center !important;
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


});

