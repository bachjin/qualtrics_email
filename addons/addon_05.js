// Addon 05: Top email banner for security warnings and information
// Creates a prominent banner at the top of the email with security indicators

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

        // Create banner element
        var banner = document.createElement('div');
        banner.id = 'security-banner';
        banner.className = 'qualtrics-addon';
        
        // Default to safe state
        var bannerContent = createBannerContent('safe');
        banner.innerHTML = bannerContent;
        
        // Insert banner at the top of email container
        emailContainer.insertBefore(banner, emailContainer.firstChild);
        
        // Add banner styles
        addBannerStyles();
        
        // Monitor email content changes to update banner
        setupBannerUpdates();
        
        console.log('Addon 05: Top security banner loaded');
    }, 200);
}

function createBannerContent(status) {
    var configs = {
        safe: {
            background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
            icon: '🔒',
            title: 'SECURE EMAIL',
            message: 'This email appears safe and legitimate',
            textColor: 'white',
            borderColor: '#28a745'
        },
        questionable: {
            background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)',
            icon: '⚠️',
            title: 'SUSPICIOUS EMAIL',
            message: 'Exercise caution - some elements may be questionable',
            textColor: '#212529',
            borderColor: '#ffc107'
        },
        dangerous: {
            background: 'linear-gradient(135deg, #dc3545 0%, #6f42c1 100%)',
            icon: '☠️',
            title: 'PHISHING DETECTED',
            message: 'This email contains suspicious content and may be a phishing attempt',
            textColor: 'white',
            borderColor: '#dc3545'
        }
    };
    
    var config = configs[status] || configs.safe;
    
    return `
        <div style="
            background: ${config.background};
            color: ${config.textColor};
            padding: 12px 20px;
            border-left: 4px solid ${config.borderColor};
            border-radius: 8px 8px 0 0;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            position: relative;
            overflow: hidden;
        ">
            <div style="
                font-size: 24px;
                filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
            ">${config.icon}</div>
            <div style="flex: 1;">
                <div style="
                    font-weight: 600;
                    font-size: 14px;
                    margin-bottom: 2px;
                    letter-spacing: 0.5px;
                ">${config.title}</div>
                <div style="
                    font-size: 13px;
                    opacity: 0.95;
                    line-height: 1.3;
                ">${config.message}</div>
            </div>
            <div id="banner-status-indicator" style="
                background: rgba(255,255,255,0.2);
                padding: 4px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                border: 1px solid rgba(255,255,255,0.3);
            ">${status.toUpperCase()}</div>
        </div>
    `;
}

function addBannerStyles() {
    var existingStyle = document.getElementById('banner-addon-styles');
    if (existingStyle) return;
    
    var style = document.createElement('style');
    style.id = 'banner-addon-styles';
    style.className = 'qualtrics-addon';
    style.textContent = `
        #security-banner {
            animation: bannerSlideDown 0.5s ease-out;
            position: relative;
            z-index: 100;
        }
        
        @keyframes bannerSlideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        #security-banner:hover {
            transform: translateY(-1px);
            transition: transform 0.2s ease;
            box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
        
        /* Ensure banner stays at top of email container */
        #email-container {
            overflow: visible !important;
        }
        
        /* Mobile responsive adjustments */
        @media (max-width: 768px) {
            #security-banner {
                padding: 10px 15px !important;
                border-radius: 0 !important;
                margin: 0 -1px !important;
            }
            
            #security-banner > div:first-child {
                font-size: 20px !important;
            }
            
            #security-banner > div:nth-child(2) > div:first-child {
                font-size: 12px !important;
            }
            
            #security-banner > div:nth-child(2) > div:last-child {
                font-size: 11px !important;
            }
            
            #banner-status-indicator {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
}

function setupBannerUpdates() {
    // Monitor the change content button to update banner
    var changeContentBtn = document.getElementById('change-content-btn');
    if (changeContentBtn) {
        // Override the click handler to include banner updates
        var originalHandler = changeContentBtn.onclick;
        
        changeContentBtn.addEventListener('click', function() {
            setTimeout(function() {
                updateBannerBasedOnContent();
            }, 100);
        });
    }
    
    // Initial banner state based on current content
    updateBannerBasedOnContent();
}

function updateBannerBasedOnContent() {
    var emailBody = document.getElementById('email-body');
    var banner = document.getElementById('security-banner');
    
    if (!emailBody || !banner) return;
    
    var content = emailBody.innerHTML.toLowerCase();
    var status = 'safe';
    
    // Detect phishing content
    if (content.includes('unusual activity') || 
        content.includes('verify your information') || 
        content.includes('account will be suspended') ||
        content.includes('immediate attention') ||
        content.includes('security alert')) {
        status = 'dangerous';
    }
    
    // Update banner content with animation
    banner.style.opacity = '0.7';
    banner.style.transform = 'translateY(-5px)';
    
    setTimeout(function() {
        banner.innerHTML = createBannerContent(status);
        banner.style.opacity = '1';
        banner.style.transform = 'translateY(0)';
        banner.style.transition = 'all 0.3s ease';
    }, 150);
}
