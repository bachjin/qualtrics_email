// Addon 11: Descriptive Chatbot
// Add a chatbot window that just describes something

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

        // Create chatbot window that just describes something
        var chatbotWindow = document.createElement('div');
        chatbotWindow.className = 'qualtrics-addon'; // Add common class for cleanup
        chatbotWindow.id = 'descriptive-chatbot';
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
        `;

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
        chatbotHeader.innerHTML = '<span style="font-size: 16px;">🤖</span><span>Security Assistant</span>';

        // Create chatbot content area
        var chatbotContent = document.createElement('div');
        chatbotContent.style.cssText = `
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            background: #f8f9fa;
        `;

        // Add descriptive message from chatbot
        chatbotContent.innerHTML = `
            <div style="
                background: white;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                position: relative;
            ">
                <div style="
                    position: absolute;
                    left: -8px;
                    top: 12px;
                    width: 0;
                    height: 0;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid transparent;
                    border-right: 8px solid white;
                "></div>
                <div style="font-size: 13px; color: #333; line-height: 1.4;">
                    Hi! I'm your email security assistant. I analyze incoming emails for potential threats and suspicious patterns.
                </div>
            </div>
            <div style="
                background: white;
                padding: 12px;
                border-radius: 8px;
                margin-bottom: 12px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                position: relative;
            ">
                <div style="
                    position: absolute;
                    left: -8px;
                    top: 12px;
                    width: 0;
                    height: 0;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid transparent;
                    border-right: 8px solid white;
                "></div>
                <div style="font-size: 13px; color: #333; line-height: 1.4;">
                    I'm currently scanning this email for common phishing indicators like urgent language, suspicious links, and sender verification issues.
                </div>
            </div>
            <div style="
                background: white;
                padding: 12px;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                position: relative;
            ">
                <div style="
                    position: absolute;
                    left: -8px;
                    top: 12px;
                    width: 0;
                    height: 0;
                    border-top: 8px solid transparent;
                    border-bottom: 8px solid transparent;
                    border-right: 8px solid white;
                "></div>
                <div style="font-size: 13px; color: #333; line-height: 1.4;">
                    Remember to always verify sender information and be cautious with unexpected urgent requests for personal information.
                </div>
            </div>
        `;

        // Assemble chatbot window
        chatbotWindow.appendChild(chatbotHeader);
        chatbotWindow.appendChild(chatbotContent);

        // Add to page
        document.body.appendChild(chatbotWindow);

        console.log('Addon 11: Descriptive chatbot loaded');
    }, 200);
}
