// Addon 13: Community reporting dashboard
// Add a community reporting dashboard to the email interface

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

        // Create the reporting dashboard
        var reportingDashboard = document.createElement('div');
        reportingDashboard.className = 'qualtrics-addon'; // Add common class for cleanup
        reportingDashboard.id = 'reporting-dashboard';
        reportingDashboard.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
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
        
        dashboardContent.innerHTML = `
            <div style="
                background: #fff5f5;
                border: 1px solid #fed7d7;
                border-radius: 8px;
                padding: 16px;
                margin-bottom: 16px;
                text-align: center;
            ">
                <div style="font-size: 24px; font-weight: bold; color: #e53e3e; margin-bottom: 4px;">
                    ${reportCount}
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
                <ul style="margin: 0; padding-left: 16px; font-size: 13px; color: #4a5568;">
                    <li>Suspicious links: ${Math.floor(reportCount * 0.7)} reports</li>
                    <li>Fake sender: ${Math.floor(reportCount * 0.5)} reports</li>
                    <li>Urgent language: ${Math.floor(reportCount * 0.8)} reports</li>
                </ul>
            </div>
            
            <div style="
                background: #fff5f5;
                border-left: 4px solid #e53e3e;
                padding: 12px;
                border-radius: 0 6px 6px 0;
                font-size: 13px;
                color: #2d3748;
            ">
                <strong>⚠️ Community Warning:</strong><br>
                Multiple users have flagged this email as potentially malicious.
            </div>
        `;

        // Assemble the dashboard
        reportingDashboard.appendChild(dashboardHeader);
        reportingDashboard.appendChild(dashboardContent);

        // Add dashboard to the page
        document.body.appendChild(reportingDashboard);

        console.log('Addon 13: Community reporting dashboard loaded');
    }, 200);
}
