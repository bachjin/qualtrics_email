// Addon 09: Suspicious Element Symbols
// Add suspicious symbols to specific elements in the email interface

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

        var emailBody = document.getElementById('email-body');
        if (!emailBody) {
            console.error('Email body not found');
            return;
        }

        // Add styles for tooltips
        var style = document.createElement('style');
        style.id = 'suspicious-symbols-styles';
        style.className = 'qualtrics-addon';
        style.textContent = `
            .suspicious-tooltip {
                position: relative;
                display: inline-block;
            }
            
            .suspicious-tooltip .tooltip-text {
                visibility: hidden;
                width: 200px;
                background-color: #555;
                color: #fff;
                text-align: center;
                border-radius: 6px;
                padding: 8px;
                position: absolute;
                z-index: 1001;
                bottom: 125%;
                left: 50%;
                margin-left: -100px;
                opacity: 0;
                transition: opacity 0.3s;
                font-size: 12px;
                line-height: 1.3;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            }
            
            .suspicious-tooltip .tooltip-text::after {
                content: "";
                position: absolute;
                top: 100%;
                left: 50%;
                margin-left: -5px;
                border-width: 5px;
                border-style: solid;
                border-color: #555 transparent transparent transparent;
            }
            
            .suspicious-tooltip:hover .tooltip-text {
                visibility: visible;
                opacity: 1;
            }
        `;
        document.head.appendChild(style);

        // Find and add suspicious symbols to specific elements
        var links = emailBody.querySelectorAll('a');
        var paragraphs = emailBody.querySelectorAll('p');
        
        // Add warning symbols to suspicious links
        links.forEach(function(link) {
            if (link.textContent.toLowerCase().includes('verify') || 
                link.textContent.toLowerCase().includes('account') ||
                link.textContent.toLowerCase().includes('click')) {
                
                var warningContainer = document.createElement('span');
                warningContainer.className = 'qualtrics-addon suspicious-tooltip';
                
                var warningSymbol = document.createElement('span');
                warningSymbol.style.cssText = `
                    color: #dc3545;
                    font-size: 16px;
                    margin-left: 5px;
                    font-weight: bold;
                    cursor: pointer;
                `;
                warningSymbol.innerHTML = '⚠️';
                
                var tooltipText = document.createElement('span');
                tooltipText.className = 'tooltip-text';
                tooltipText.innerHTML = 'Suspicious link detected! This link may be part of a phishing attempt. Verify the URL before clicking.';
                
                warningContainer.appendChild(warningSymbol);
                warningContainer.appendChild(tooltipText);
                
                link.parentNode.insertBefore(warningContainer, link.nextSibling);
            }
        });

        // Add question mark symbols to suspicious text patterns
        paragraphs.forEach(function(paragraph) {
            var text = paragraph.textContent.toLowerCase();
            if (text.includes('unusual activity') || 
                text.includes('immediate attention') ||
                text.includes('24 hours') ||
                text.includes('suspended')) {
                
                var questionContainer = document.createElement('span');
                questionContainer.className = 'qualtrics-addon suspicious-tooltip';
                
                var questionSymbol = document.createElement('span');
                questionSymbol.style.cssText = `
                    color: #ffc107;
                    font-size: 16px;
                    margin-left: 8px;
                    font-weight: bold;
                    cursor: pointer;
                `;
                questionSymbol.innerHTML = '❓';
                
                var tooltipText = document.createElement('span');
                tooltipText.className = 'tooltip-text';
                tooltipText.innerHTML = 'Questionable content! This text uses urgency tactics commonly found in phishing emails.';
                
                questionContainer.appendChild(questionSymbol);
                questionContainer.appendChild(tooltipText);
                
                paragraph.appendChild(questionContainer);
            }
        });

        // Add poison symbol to sender information if suspicious
        var emailHeader = document.getElementById('email-header');
        if (emailHeader) {
            var fromField = emailHeader.querySelector('div:last-child');
            if (fromField && fromField.textContent.includes('Account Security Team')) {
                var poisonContainer = document.createElement('span');
                poisonContainer.className = 'qualtrics-addon suspicious-tooltip';
                
                var poisonSymbol = document.createElement('span');
                poisonSymbol.style.cssText = `
                    color: #dc3545;
                    font-size: 18px;
                    margin-left: 10px;
                    font-weight: bold;
                    cursor: pointer;
                `;
                poisonSymbol.innerHTML = '☠️';
                
                var tooltipText = document.createElement('span');
                tooltipText.className = 'tooltip-text';
                tooltipText.innerHTML = 'Potentially dangerous sender! This sender name is commonly used in phishing attacks to appear legitimate.';
                
                poisonContainer.appendChild(poisonSymbol);
                poisonContainer.appendChild(tooltipText);
                
                fromField.appendChild(poisonContainer);
            }
        }

        console.log('Addon 09: Suspicious element symbols loaded');
    }, 200);
}
