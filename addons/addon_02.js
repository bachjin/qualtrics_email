// Addon 02: Confidence rating indicators with visual elements
// Add visual confidence indicators (poison, question mark, lock, traffic light)

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

        // Create the confidence indicator container
        var confidenceIndicator = document.createElement('div');
        confidenceIndicator.id = 'confidence-rating-indicator';
        confidenceIndicator.className = 'qualtrics-addon'; // Add common class for cleanup
        confidenceIndicator.innerHTML = `
            <div style="
                position: fixed;
                top: 20px;
                right: 20px;
                background: rgba(255, 255, 255, 0.95);
                border: 2px solid #333;
                border-radius: 15px;
                padding: 20px;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 1500;
                font-family: Arial, sans-serif;
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
                min-width: 120px;
            ">
                <!-- Header -->
                <div style="
                    font-size: 12px;
                    font-weight: bold;
                    color: #333;
                    text-align: center;
                    margin-bottom: 5px;
                ">SECURITY STATUS</div>
                
                <!-- Main Status Icon -->
                <div id="status-icon" style="
                    font-size: 48px;
                    transition: all 0.5s ease;
                    text-align: center;
                ">☠️</div>
                
                <!-- Status Text -->
                <div id="status-text" style="
                    font-size: 12px;
                    font-weight: bold;
                    color: #dc3545;
                    text-align: center;
                    transition: color 0.5s ease;
                ">DANGEROUS</div>
                
                <!-- Traffic Light System -->
                <div style="
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    background: #2c2c2c;
                    padding: 12px 8px;
                    border-radius: 25px;
                    border: 2px solid #444;
                ">
                    <div id="red-light" style="
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #dc3545;
                        transition: all 0.5s ease;
                        box-shadow: 0 0 10px rgba(220, 53, 69, 0.8);
                    "></div>
                    <div id="yellow-light" style="
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #666;
                        transition: all 0.5s ease;
                        box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
                    "></div>
                    <div id="green-light" style="
                        width: 20px;
                        height: 20px;
                        border-radius: 50%;
                        background: #666;
                        transition: all 0.5s ease;
                        box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);
                    "></div>
                </div>
                
                <!-- Confidence Level -->
                <div style="
                    font-size: 10px;
                    color: #666;
                    text-align: center;
                ">
                    <div>CONFIDENCE</div>
                    <div id="confidence-level" style="
                        font-weight: bold;
                        color: #dc3545;
                        margin-top: 2px;
                    ">HIGH</div>
                </div>
            </div>
        `;

        // Insert the confidence indicator into the page
        document.body.appendChild(confidenceIndicator);

        // Add mobile-responsive styles
        var style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                #confidence-rating-indicator > div {
                    top: 10px !important;
                    right: 10px !important;
                    padding: 15px !important;
                    min-width: 100px !important;
                }
                
                #status-icon {
                    font-size: 36px !important;
                }
                
                #confidence-rating-indicator > div > div:nth-child(4) {
                    padding: 8px 6px !important;
                }
                
                #confidence-rating-indicator > div > div:nth-child(4) > div {
                    width: 16px !important;
                    height: 16px !important;
                }
            }
            
            .pulse {
                animation: pulse 2s infinite;
            }
            
            @keyframes pulse {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
                100% {
                    transform: scale(1);
                }
            }
            
            .glow-red {
                box-shadow: 0 0 15px rgba(220, 53, 69, 0.8) !important;
            }
            
            .glow-yellow {
                box-shadow: 0 0 15px rgba(255, 193, 7, 0.8) !important;
            }
            
            .glow-green {
                box-shadow: 0 0 15px rgba(40, 167, 69, 0.8) !important;
            }
        `;
        document.head.appendChild(style);

        // Initialize indicators
        var currentRiskLevel = 'dangerous'; // 'safe', 'questionable', 'dangerous'
        
        // Get references to elements
        var statusIcon = document.getElementById('status-icon');
        var statusText = document.getElementById('status-text');
        var confidenceLevel = document.getElementById('confidence-level');
        var redLight = document.getElementById('red-light');
        var yellowLight = document.getElementById('yellow-light');
        var greenLight = document.getElementById('green-light');

        // Function to update confidence indicators
        function updateConfidenceIndicators(riskLevel) {
            currentRiskLevel = riskLevel;
            
            // Reset all lights
            redLight.style.background = '#666';
            redLight.classList.remove('glow-red', 'pulse');
            yellowLight.style.background = '#666';
            yellowLight.classList.remove('glow-yellow', 'pulse');
            greenLight.style.background = '#666';
            greenLight.classList.remove('glow-green', 'pulse');
            
            switch(riskLevel) {
                case 'safe':
                    statusIcon.textContent = '🔒✅';
                    statusText.textContent = 'SAFE';
                    statusText.style.color = '#28a745';
                    confidenceLevel.textContent = 'HIGH';
                    confidenceLevel.style.color = '#28a745';
                    
                    // Light up green
                    greenLight.style.background = '#28a745';
                    greenLight.classList.add('glow-green');
                    break;
                    
                case 'questionable':
                    statusIcon.textContent = '❓';
                    statusText.textContent = 'QUESTIONABLE';
                    statusText.style.color = '#ffc107';
                    confidenceLevel.textContent = 'MEDIUM';
                    confidenceLevel.style.color = '#ffc107';
                    
                    // Light up yellow with pulse
                    yellowLight.style.background = '#ffc107';
                    yellowLight.classList.add('glow-yellow', 'pulse');
                    break;
                    
                case 'dangerous':
                    statusIcon.textContent = '☠️';
                    statusText.textContent = 'DANGEROUS';
                    statusText.style.color = '#dc3545';
                    confidenceLevel.textContent = 'HIGH';
                    confidenceLevel.style.color = '#dc3545';
                    
                    // Light up red with pulse
                    redLight.style.background = '#dc3545';
                    redLight.classList.add('glow-red', 'pulse');
                    break;
            }
        }

        // Initialize with dangerous status (phish default)
        updateConfidenceIndicators('dangerous');

        // Listen for content change button to update indicators
        var changeContentBtn = document.getElementById('change-content-btn');
        
        if (changeContentBtn) {
            changeContentBtn.addEventListener('click', function() {
                // Toggle between dangerous and safe when email content changes
                if (currentRiskLevel === 'dangerous') {
                    updateConfidenceIndicators('safe');
                } else {
                    updateConfidenceIndicators('dangerous');
                }
            });
        }

        // Optional: Add click functionality to cycle through states
        statusIcon.addEventListener('click', function() {
            if (currentRiskLevel === 'safe') {
                updateConfidenceIndicators('questionable');
            } else if (currentRiskLevel === 'questionable') {
                updateConfidenceIndicators('dangerous');
            } else {
                updateConfidenceIndicators('safe');
            }
        });

        // Add cursor pointer to indicate clickability
        statusIcon.style.cursor = 'pointer';
        statusIcon.title = 'Click to cycle through security levels';

        console.log('Addon 02: Confidence rating indicators loaded');
    }, 200);
}
