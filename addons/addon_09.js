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

        // Find and add suspicious symbols to specific elements
        var links = emailBody.querySelectorAll('a');
        var paragraphs = emailBody.querySelectorAll('p');
        
        // Add warning symbols to suspicious links
        links.forEach(function(link) {
            if (link.textContent.toLowerCase().includes('verify') || 
                link.textContent.toLowerCase().includes('account') ||
                link.textContent.toLowerCase().includes('click')) {
                
                var warningSymbol = document.createElement('span');
                warningSymbol.className = 'qualtrics-addon';
                warningSymbol.style.cssText = `
                    color: #dc3545;
                    font-size: 16px;
                    margin-left: 5px;
                    font-weight: bold;
                    cursor: pointer;
                    title: "Suspicious link detected";
                `;
                warningSymbol.innerHTML = '⚠️';
                warningSymbol.title = 'Suspicious link detected';
                
                link.parentNode.insertBefore(warningSymbol, link.nextSibling);
            }
        });

        // Add question mark symbols to suspicious text patterns
        paragraphs.forEach(function(paragraph) {
            var text = paragraph.textContent.toLowerCase();
            if (text.includes('unusual activity') || 
                text.includes('immediate attention') ||
                text.includes('24 hours') ||
                text.includes('suspended')) {
                
                var questionSymbol = document.createElement('span');
                questionSymbol.className = 'qualtrics-addon';
                questionSymbol.style.cssText = `
                    color: #ffc107;
                    font-size: 16px;
                    margin-left: 8px;
                    font-weight: bold;
                    cursor: pointer;
                `;
                questionSymbol.innerHTML = '❓';
                questionSymbol.title = 'Questionable content';
                
                paragraph.appendChild(questionSymbol);
            }
        });

        // Add poison symbol to sender information if suspicious
        var emailHeader = document.getElementById('email-header');
        if (emailHeader) {
            var fromField = emailHeader.querySelector('div:last-child');
            if (fromField && fromField.textContent.includes('Account Security Team')) {
                var poisonSymbol = document.createElement('span');
                poisonSymbol.className = 'qualtrics-addon';
                poisonSymbol.style.cssText = `
                    color: #dc3545;
                    font-size: 18px;
                    margin-left: 10px;
                    font-weight: bold;
                    cursor: pointer;
                `;
                poisonSymbol.innerHTML = '☠️';
                poisonSymbol.title = 'Potentially dangerous sender';
                
                fromField.appendChild(poisonSymbol);
            }
        }

        console.log('Addon 09: Suspicious element symbols loaded');
    }, 200);
}
