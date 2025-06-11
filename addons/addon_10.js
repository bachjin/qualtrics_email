// Addon 10: Chatbot Interface
// Add a chatbot window that can be toggled or displayed permanently

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

        // Create chatbot toggle button
        var chatbotButton = document.createElement('button');
        chatbotButton.className = 'qualtrics-addon';
        chatbotButton.id = 'chatbot-toggle-btn';
        chatbotButton.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
        `;
        chatbotButton.innerHTML = '<span style="font-size: 16px;">💬</span><span>Chat Assistant</span>';

        // Create chatbot window
        var chatbotWindow = document.createElement('div');
        chatbotWindow.className = 'qualtrics-addon';
        chatbotWindow.id = 'chatbot-window';
        chatbotWindow.style.cssText = `
            position: fixed;
            top: 70px;
            right: 20px;
            width: 320px;
            height: 400px;
            background: white;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.15);
            z-index: 1001;
            display: none;
            flex-direction: column;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            border: 1px solid #e0e0e0;
        `;

        // Chatbot header
        var chatbotHeader = document.createElement('div');
        chatbotHeader.style.cssText = `
            background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
            color: white;
            padding: 16px;
            border-radius: 12px 12px 0 0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        `;
        chatbotHeader.innerHTML = `
            <div style="display: flex; align-items: center; gap: 8px;">
                <span style="font-size: 18px;">🤖</span>
                <strong>Security Assistant</strong>
            </div>
            <button id="close-chatbot" style="
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
        `;

        // Chatbot messages container
        var chatbotMessages = document.createElement('div');
        chatbotMessages.id = 'chatbot-messages';
        chatbotMessages.style.cssText = `
            flex: 1;
            padding: 16px;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 12px;
        `;

        // Initial bot message
        chatbotMessages.innerHTML = `
            <div style="background: #f8f9fa; padding: 12px; border-radius: 12px 12px 12px 4px; font-size: 14px; line-height: 1.4;">
                <div style="font-weight: 500; margin-bottom: 4px; color: #28a745;">🤖 Security Assistant</div>
                Hello! I'm here to help you analyze this email for potential security threats. Would you like me to review it?
            </div>
        `;

        // Chatbot input area
        var chatbotInput = document.createElement('div');
        chatbotInput.style.cssText = `
            padding: 16px;
            border-top: 1px solid #e0e0e0;
            display: flex;
            gap: 8px;
        `;
        chatbotInput.innerHTML = `
            <input type="text" id="chatbot-input" placeholder="Type your message..." style="
                flex: 1;
                padding: 8px 12px;
                border: 1px solid #ccc;
                border-radius: 20px;
                font-size: 14px;
                outline: none;
            ">
            <button id="send-chat" style="
                background: #28a745;
                color: white;
                border: none;
                padding: 8px 12px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 14px;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
            ">➤</button>
        `;

        // Assemble chatbot window
        chatbotWindow.appendChild(chatbotHeader);
        chatbotWindow.appendChild(chatbotMessages);
        chatbotWindow.appendChild(chatbotInput);

        // Add elements to page
        document.body.appendChild(chatbotButton);
        document.body.appendChild(chatbotWindow);

        // Toggle functionality
        var chatbotVisible = false;
        chatbotButton.addEventListener('click', function() {
            chatbotVisible = !chatbotVisible;
            if (chatbotVisible) {
                chatbotWindow.style.display = 'flex';
                chatbotButton.innerHTML = '<span style="font-size: 16px;">💬</span><span>Hide Chat</span>';
                chatbotButton.style.background = 'linear-gradient(135deg, #dc3545 0%, #e74c3c 100%)';
            } else {
                chatbotWindow.style.display = 'none';
                chatbotButton.innerHTML = '<span style="font-size: 16px;">💬</span><span>Chat Assistant</span>';
                chatbotButton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
            }
        });

        // Close button functionality
        document.getElementById('close-chatbot').addEventListener('click', function() {
            chatbotWindow.style.display = 'none';
            chatbotVisible = false;
            chatbotButton.innerHTML = '<span style="font-size: 16px;">💬</span><span>Chat Assistant</span>';
            chatbotButton.style.background = 'linear-gradient(135deg, #28a745 0%, #20c997 100%)';
        });

        // Send message functionality
        document.getElementById('send-chat').addEventListener('click', function() {
            var input = document.getElementById('chatbot-input');
            var message = input.value.trim();
            if (message) {
                // Add user message
                var userMessage = document.createElement('div');
                userMessage.style.cssText = 'background: #007bff; color: white; padding: 12px; border-radius: 12px 12px 4px 12px; font-size: 14px; align-self: flex-end; max-width: 70%;';
                userMessage.textContent = message;
                chatbotMessages.appendChild(userMessage);

                // Add bot response
                setTimeout(function() {
                    var botMessage = document.createElement('div');
                    botMessage.style.cssText = 'background: #f8f9fa; padding: 12px; border-radius: 12px 12px 12px 4px; font-size: 14px; line-height: 1.4;';
                    botMessage.innerHTML = `
                        <div style="font-weight: 500; margin-bottom: 4px; color: #28a745;">🤖 Security Assistant</div>
                        I've analyzed your question. This email shows signs of phishing attempts. Be cautious with any links or attachments.
                    `;
                    chatbotMessages.appendChild(botMessage);
                    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
                }, 1000);

                input.value = '';
                chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
            }
        });

        // Enter key support
        document.getElementById('chatbot-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                document.getElementById('send-chat').click();
            }
        });

        console.log('Addon 10: Chatbot interface loaded');
    }, 200);
}
