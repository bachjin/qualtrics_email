// Addon 12: Interactive Chatbot with Questions
// Add a chatbot window that asks you questions

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

        // Create overlay that blocks interaction but keeps content visible
        var overlay = document.createElement('div');
        overlay.className = 'qualtrics-addon'; // Add common class for cleanup
        overlay.id = 'quiz-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.1);
            z-index: 999;
            pointer-events: auto;
        `;

        // Block interactions with email buttons and interactive elements
        var emailButtons = document.querySelectorAll('#email-container button, #email-container input, #email-container textarea, #email-container a');
        emailButtons.forEach(function(element) {
            element.style.pointerEvents = 'none';
            element.style.opacity = '0.5';
        });

        // Create interactive chatbot window that asks questions
        var chatbotWindow = document.createElement('div');
        chatbotWindow.className = 'qualtrics-addon'; // Add common class for cleanup
        chatbotWindow.id = 'interactive-chatbot';
        chatbotWindow.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 320px;
            height: 400px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            pointer-events: auto;
        `;

        // Add mobile responsiveness for chatbot positioning
        var mediaQuery = window.matchMedia('(max-width: 768px)');
        function handleMobileView() {
            if (mediaQuery.matches) {
                chatbotWindow.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 90%;
                    max-width: 320px;
                    height: 400px;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
                    z-index: 1000;
                    display: flex;
                    flex-direction: column;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    pointer-events: auto;
                `;
            }
        }
        handleMobileView();
        mediaQuery.addListener(handleMobileView);

        // Create chatbot header
        var chatbotHeader = document.createElement('div');
        chatbotHeader.style.cssText = `
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 16px;
            border-radius: 12px 12px 0 0;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        chatbotHeader.innerHTML = '<span style="font-size: 16px;">🤖</span><span>Security Quiz</span>';

        // Create chatbot content area
        var chatbotContent = document.createElement('div');
        chatbotContent.style.cssText = `
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            background: #f8f9fa;
            display: flex;
            flex-direction: column;
            gap: 12px;
        `;

        // Question tracking
        var currentQuestion = 0;
        var correctAnswers = 0;
        var totalQuestions = 2;

        var questions = [
            {
                question: "What is the most suspicious element in this email?",
                options: [
                    "The sender's email address",
                    "The urgent language and request for immediate action",
                    "The professional formatting"
                ],
                correct: 1,
                highlight: '#email-body p:nth-child(2)' // Highlights the urgency paragraph
            },
            {
                question: "What should you do with this email?",
                options: [
                    "Click the verification link immediately",
                    "Reply with your account information",
                    "Report it as phishing and delete it"
                ],
                correct: 2,
                highlight: '#email-body p:nth-child(3) a' // Highlights the suspicious link
            }
        ];

        // Function to highlight email elements
        function highlightEmailElement(selector) {
            // Remove any existing highlights
            var existingHighlights = document.querySelectorAll('.quiz-highlight');
            existingHighlights.forEach(function(element) {
                element.classList.remove('quiz-highlight');
            });

            // Add new highlight
            if (selector) {
                var element = document.querySelector(selector);
                if (element) {
                    element.classList.add('quiz-highlight');
                    
                    // Add highlight styles if not already added
                    if (!document.getElementById('quiz-highlight-styles')) {
                        var style = document.createElement('style');
                        style.id = 'quiz-highlight-styles';
                        style.textContent = `
                            .quiz-highlight {
                                background: rgba(255, 193, 7, 0.4) !important;
                                border: 3px solid #ffc107 !important;
                                border-radius: 6px !important;
                                animation: pulse-highlight 2s infinite;
                                box-shadow: 0 0 15px rgba(255, 193, 7, 0.5) !important;
                            }
                            
                            @keyframes pulse-highlight {
                                0% { box-shadow: 0 0 15px rgba(255, 193, 7, 0.5), 0 0 0 0 rgba(255, 193, 7, 0.7); }
                                70% { box-shadow: 0 0 15px rgba(255, 193, 7, 0.5), 0 0 0 15px rgba(255, 193, 7, 0); }
                                100% { box-shadow: 0 0 15px rgba(255, 193, 7, 0.5), 0 0 0 0 rgba(255, 193, 7, 0); }
                            }
                        `;
                        document.head.appendChild(style);
                    }
                }
            }
        }

        function showQuestion(questionIndex) {
            var question = questions[questionIndex];
            
            // Highlight the related email element
            highlightEmailElement(question.highlight);
            
            chatbotContent.innerHTML = `
                <div style="background: white; padding: 12px; border-radius: 8px; border: 1px solid #e0e0e0;">
                    <div style="font-weight: 500; margin-bottom: 12px; color: #333;">
                        Question ${questionIndex + 1} of ${totalQuestions}:
                    </div>
                    <div style="margin-bottom: 16px; color: #555; line-height: 1.4;">
                        ${question.question}
                    </div>
                    <div id="question-options" style="display: flex; flex-direction: column; gap: 8px;">
                        ${question.options.map((option, index) => `
                            <button class="option-btn" data-option="${index}" style="
                                background: white;
                                border: 2px solid #e0e0e0;
                                border-radius: 6px;
                                padding: 10px;
                                text-align: left;
                                cursor: pointer;
                                font-size: 13px;
                                line-height: 1.3;
                                transition: all 0.2s ease;
                            ">${option}</button>
                        `).join('')}
                    </div>
                </div>
            `;

            // Add click handlers for options
            var optionButtons = chatbotContent.querySelectorAll('.option-btn');
            optionButtons.forEach(function(btn) {
                btn.addEventListener('click', function() {
                    var selectedOption = parseInt(this.getAttribute('data-option'));
                    handleAnswer(selectedOption, question.correct, questionIndex);
                });
                
                // Add hover effect
                btn.addEventListener('mouseenter', function() {
                    this.style.borderColor = '#667eea';
                    this.style.background = '#f8f9ff';
                });
                
                btn.addEventListener('mouseleave', function() {
                    this.style.borderColor = '#e0e0e0';
                    this.style.background = 'white';
                });
            });
        }

        function handleAnswer(selected, correct, questionIndex) {
            var isCorrect = selected === correct;
            if (isCorrect) {
                correctAnswers++;
            }

            // Show feedback
            var optionButtons = chatbotContent.querySelectorAll('.option-btn');
            optionButtons.forEach(function(btn, index) {
                btn.style.pointerEvents = 'none';
                if (index === correct) {
                    btn.style.background = '#d4edda';
                    btn.style.borderColor = '#c3e6cb';
                    btn.style.color = '#155724';
                } else if (index === selected && !isCorrect) {
                    btn.style.background = '#f8d7da';
                    btn.style.borderColor = '#f5c6cb';
                    btn.style.color = '#721c24';
                }
            });

            // Move to next question after delay
            setTimeout(function() {
                currentQuestion++;
                if (currentQuestion < totalQuestions) {
                    showQuestion(currentQuestion);
                } else {
                    showResults();
                }
            }, 2000);
        }

        function showResults() {
            var percentage = Math.round((correctAnswers / totalQuestions) * 100);
            
            // Remove highlights when showing results
            highlightEmailElement(null);
            
            chatbotContent.innerHTML = `
                <div style="background: white; padding: 16px; border-radius: 8px; border: 1px solid #e0e0e0; text-align: center;">
                    <div style="font-size: 24px; margin-bottom: 8px;">
                        ${percentage >= 50 ? '🎉' : '📚'}
                    </div>
                    <div style="font-weight: 500; margin-bottom: 8px; color: #333;">
                        Quiz Complete!
                    </div>
                    <div style="margin-bottom: 12px; color: #555;">
                        You got ${correctAnswers} out of ${totalQuestions} questions correct
                    </div>
                    <div style="font-size: 18px; font-weight: 500; color: ${percentage >= 50 ? '#28a745' : '#dc3545'};">
                        ${percentage}%
                    </div>
                    <div style="margin-top: 12px; font-size: 12px; color: #666; line-height: 1.4;">
                        ${percentage >= 50 
                            ? 'Great job! You can now interact with the email safely.' 
                            : 'Consider reviewing phishing awareness materials before proceeding.'}
                    </div>
                    <button id="close-quiz-btn" style="
                        background: #28a745;
                        color: white;
                        border: none;
                        padding: 8px 16px;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 12px;
                        font-weight: 500;
                        margin-top: 12px;
                    ">Continue to Email</button>
                </div>
            `;

            // Add close button functionality
            var closeBtn = chatbotContent.querySelector('#close-quiz-btn');
            closeBtn.addEventListener('click', function() {
                // Re-enable email interactions
                var emailButtons = document.querySelectorAll('#email-container button, #email-container input, #email-container textarea, #email-container a');
                emailButtons.forEach(function(element) {
                    element.style.pointerEvents = 'auto';
                    element.style.opacity = '1';
                });
                
                // Clean up highlights and styles before closing
                highlightEmailElement(null);
                var highlightStyles = document.getElementById('quiz-highlight-styles');
                if (highlightStyles) {
                    highlightStyles.remove();
                }
                overlay.remove();
                chatbotWindow.remove();
            });
        }

        // Assemble chatbot
        chatbotWindow.appendChild(chatbotHeader);
        chatbotWindow.appendChild(chatbotContent);

        // Add overlay and chatbot to page separately
        document.body.appendChild(overlay);
        document.body.appendChild(chatbotWindow);

        // Start with first question
        showQuestion(0);

        console.log('Addon 12: Interactive chatbot with questions loaded');
    }, 200);
}
