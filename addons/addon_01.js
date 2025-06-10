// Addon 01: Progression of elements that changes with increased suspicion/confidence
// Add a phishing confidence indicator bar to the email interface

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

        // Create the confidence indicator container with both bar and circle
        var confidenceIndicator = document.createElement('div');
        confidenceIndicator.id = 'phishing-confidence-indicator';
        confidenceIndicator.className = 'qualtrics-addon'; // Add common class for cleanup
        confidenceIndicator.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(255, 255, 255, 0.95);
                border: 2px solid #333;
                border-radius: 15px;
                padding: 15px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 1500;
                font-family: Arial, sans-serif;
                display: flex;
                align-items: center;
                gap: 20px;
            ">
                <!-- Horizontal Bar Indicator -->
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="
                        font-size: 12px;
                        font-weight: bold;
                        margin-bottom: 8px;
                        color: #333;
                    ">PHISHING LIKELIHOOD</div>
                    
                    <div style="
                        position: relative;
                        width: 200px;
                        height: 20px;
                        background: linear-gradient(to right, #28a745 0%, #ffc107 40%, #dc3545 100%);
                        border-radius: 10px;
                        border: 1px solid #333;
                    ">
                        <!-- Risk level indicator -->
                        <div id="risk-indicator-bar" style="
                            position: absolute;
                            left: 0;
                            top: 0;
                            height: 100%;
                            background: rgba(0,0,0,0.7);
                            border-radius: 10px;
                            transition: width 1s ease-in-out;
                            width: 85%;
                        "></div>
                        
                        <!-- Percentage text for bar -->
                        <div id="risk-percentage-bar" style="
                            position: absolute;
                            top: 25px;
                            left: 85%;
                            transform: translateX(-50%);
                            background: #333;
                            color: white;
                            padding: 2px 6px;
                            border-radius: 4px;
                            font-size: 10px;
                            font-weight: bold;
                            white-space: nowrap;
                        ">85%</div>
                    </div>
                    
                    <div style="
                        display: flex;
                        justify-content: space-between;
                        width: 200px;
                        font-size: 8px;
                        margin-top: 8px;
                        color: #666;
                    ">
                        <div>LOW</div>
                        <div>MED</div>
                        <div>HIGH</div>
                    </div>
                </div>

                <!-- Circle Indicator -->
                <div style="display: flex; flex-direction: column; align-items: center;">
                    <div style="
                        font-size: 12px;
                        font-weight: bold;
                        margin-bottom: 8px;
                        color: #333;
                    ">CONFIDENCE</div>
                    
                    <div style="
                        position: relative;
                        width: 80px;
                        height: 80px;
                    ">
                        <svg width="80" height="80" style="transform: rotate(-90deg);">
                            <!-- Background circle -->
                            <circle cx="40" cy="40" r="35" 
                                stroke="#e0e0e0" 
                                stroke-width="8" 
                                fill="transparent"/>
                            <!-- Progress circle -->
                            <circle id="confidence-circle" cx="40" cy="40" r="35"
                                stroke="#dc3545"
                                stroke-width="8"
                                fill="transparent"
                                stroke-dasharray="220"
                                stroke-dashoffset="154"
                                stroke-linecap="round"
                                style="transition: stroke-dashoffset 1s ease-in-out, stroke 0.5s ease;"/>
                        </svg>
                        
                        <!-- Percentage text for circle -->
                        <div id="confidence-percentage" style="
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            font-size: 14px;
                            font-weight: bold;
                            color: #333;
                        ">30%</div>
                    </div>
                    
                    <div style="
                        text-align: center;
                        font-size: 8px;
                        margin-top: 4px;
                        color: #666;
                    ">PHISHING</div>
                </div>
            </div>
        `;

        // Insert the confidence indicator into the page
        document.body.appendChild(confidenceIndicator);

        // Add mobile-responsive styles
        var style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                #phishing-confidence-indicator > div {
                    flex-direction: column !important;
                    gap: 15px !important;
                    padding: 12px !important;
                    top: 10px !important;
                }
                
                #phishing-confidence-indicator > div > div:first-child > div:nth-child(2) {
                    width: 150px !important;
                    height: 16px !important;
                }
                
                #phishing-confidence-indicator > div > div:first-child > div:last-child {
                    width: 150px !important;
                }
                
                #phishing-confidence-indicator > div > div:last-child > div:nth-child(2) {
                    width: 60px !important;
                    height: 60px !important;
                }
                
                #phishing-confidence-indicator > div > div:last-child > div:nth-child(2) svg {
                    width: 60px !important;
                    height: 60px !important;
                }
                
                #phishing-confidence-indicator > div > div:last-child > div:nth-child(2) svg circle {
                    r: 25 !important;
                    cx: 30 !important;
                    cy: 30 !important;
                }
                
                #confidence-percentage {
                    font-size: 12px !important;
                }
            }
        `;
        document.head.appendChild(style);

        // Optional: Add dynamic behavior to change confidence over time or based on user interaction
        var currentConfidence = 85; // Bar confidence (phishing likelihood)
        var currentCircleConfidence = 30; // Circle confidence (phishing detection confidence)
        var riskIndicatorBar = document.getElementById('risk-indicator-bar');
        var riskPercentageBar = document.getElementById('risk-percentage-bar');
        var confidenceCircle = document.getElementById('confidence-circle');
        var confidencePercentage = document.getElementById('confidence-percentage');

        // Function to update the bar confidence level
        function updateBarConfidence(newConfidence) {
            currentConfidence = Math.max(0, Math.min(100, newConfidence));
            riskIndicatorBar.style.width = currentConfidence + '%';
            riskPercentageBar.textContent = currentConfidence + '%';
            riskPercentageBar.style.left = currentConfidence + '%';
            
            // Update color based on risk level
            if (currentConfidence < 30) {
                riskPercentageBar.style.background = '#28a745';
            } else if (currentConfidence < 70) {
                riskPercentageBar.style.background = '#ffc107';
                riskPercentageBar.style.color = '#333';
            } else {
                riskPercentageBar.style.background = '#dc3545';
                riskPercentageBar.style.color = 'white';
            }
        }

        // Function to update the circle confidence level
        function updateCircleConfidence(newConfidence) {
            currentCircleConfidence = Math.max(0, Math.min(100, newConfidence));
            var circumference = 2 * Math.PI * 35; // radius = 35
            var offset = circumference - (currentCircleConfidence / 100) * circumference;
            
            confidenceCircle.style.strokeDashoffset = offset;
            confidencePercentage.textContent = currentCircleConfidence + '%';
            
            // Update circle color based on confidence level
            if (currentCircleConfidence < 30) {
                confidenceCircle.style.stroke = '#28a745';
            } else if (currentCircleConfidence < 70) {
                confidenceCircle.style.stroke = '#ffc107';
            } else {
                confidenceCircle.style.stroke = '#dc3545';
            }
        }

        // Initialize the displays
        updateBarConfidence(85);
        updateCircleConfidence(30);

        // Listen for content change button to update confidence indicators
        var changeContentBtn = document.getElementById('change-content-btn');
        
        if (changeContentBtn) {
            changeContentBtn.addEventListener('click', function() {
                // Toggle between high and low confidence when email content changes
                if (currentConfidence > 50) {
                    updateBarConfidence(15); // Low risk for normal email
                    updateCircleConfidence(85); // High confidence for normal email
                } else {
                    updateBarConfidence(85); // High risk for phishing email
                    updateCircleConfidence(30); // Low confidence for phishing email
                }
            });
        }

        console.log('Addon 01: Phishing confidence indicators loaded');
    }, 200);
}
