## **Complete Email Interface Transformation Prompt**

### **Overview**
Transform the email interface from a complex multi-feature system to a simplified, focused phishing detection training tool. Remove unnecessary UI elements and streamline the interface to emphasize the core learning objective.

### **1. Remove AI Assistant System (Complete Removal)**
- **Delete AI Toggle Button**: Remove the `ai-toggle-btn` button and its entire container structure
- **Remove AI Suggestions Popup**: Delete the `ai-suggestions` div with all its content including:
  - AI Security Assistant header
  - Close button (`close-ai-mobile`)
  - AI content analysis sections
  - All gradient backgrounds and positioning styles
- **Clean up AI-related CSS**: Remove all AI-specific styles including:
  - `#ai-toggle-btn` hover effects and gradients
  - `#ai-suggestions` positioning and animations
  - `@keyframes slideIn` animation
  - `#close-ai-mobile` styles
  - Mobile responsive AI positioning rules
- **Remove AI JavaScript**: Delete all AI-related variables and event listeners:
  - `aiSuggestionsVisible` variable
  - AI toggle button click handler
  - AI close button click handler
  - AI content updates in change content button logic

### **2. Remove Navigation and Action Buttons**
- **Delete Back Button**: Remove `back-btn` from email actions and its event listener
- **Delete Reply System**: Completely remove:
  - `reply-btn` button
  - Entire `reply-section` div including textarea and action buttons
  - `send-reply-btn` and `save-draft-btn` buttons
  - All reply-related event listeners and functionality
- **Delete Delete Button**: Remove `delete-btn` and its confirmation dialog handler
- **Remove Related CSS**: Clean up hover effects for all removed buttons:
  - `#reply-btn:hover`, `#delete-btn:hover`, `#send-reply-btn:hover`, `#save-draft-btn:hover`
  - `#reply-text:focus` styles
  - Mobile responsive rules for removed elements

### **3. Restructure Email Actions Section**
```javascript
// Transform from flex layout to centered single button
<div id="email-actions" style="
    padding: 15px 20px;
    background: #f8f9fa;
    border-top: 1px solid #e0e0e0;
    text-align: center;  // Changed from flex to center
">
    <button id="change-content-btn" style="
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
```

### **4. Implement Change Content Button Color System**
- **Default State (Phishing Mode)**: Green (`#28a745`) - "Display Normal Email"
- **Toggled State (Normal Mode)**: Red (`#dc3545`) - "Display Phishing Email"
- **Hover Effects**: 
  - Green hover: `#218838`
  - Red hover: `#c82333`
- **Dynamic Hover Logic**: Update mouse events dynamically when button state changes:
```javascript
// In change content event listener
if (isPhishingMode) {
    this.style.background = '#dc3545';
    this.onmouseover = function() { this.style.background = '#c82333'; };
    this.onmouseout = function() { this.style.background = '#dc3545'; };
} else {
    this.style.background = '#28a745';
    this.onmouseover = function() { this.style.background = '#218838'; };
    this.onmouseout = function() { this.style.background = '#28a745'; };
}
```

### **5. Maintain Unique Show Attachments Button**
- **Color**: Teal (`#17a2b8`) to distinguish from change content button
- **Hover**: Darker teal (`#138496`)
- **Functionality**: Keep toggle behavior for showing/hiding attachments

### **6. Implement Dynamic Attachment System**
Replace any static images with contextual file attachments:

```javascript
// Attachment container structure
<div id="attachment-container" style="
    padding: 20px;
    background: #f8f9fa;
    border-top: 1px solid #e0e0e0;
    display: none;
">
    <div id="attachment-item" style="
        display: flex;
        align-items: center;
        padding: 12px;
        border: 1px solid #ddd;
        border-radius: 6px;
        background: white;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    ">
        <div id="attachment-icon" style="
            font-size: 24px;
            margin-right: 12px;
        ">📁</div>
        <div style="flex: 1;">
            <div id="attachment-name" style="
                font-weight: 500;
                color: #333;
                font-size: 14px;
            ">urgent_security_update.exe</div>
            <div id="attachment-size" style="
                color: #666;
                font-size: 12px;
                margin-top: 2px;
            ">2.4 MB</div>
        </div>
    </div>
</div>
```

**Dynamic Attachment Logic**:
- **Phishing Mode**: `urgent_security_update.exe`, 📁 icon, 2.4 MB
- **Normal Mode**: `Q1_Business_Report.pdf`, 📄 icon, 1.2 MB

### **7. Update Mobile Responsive Styles**
```css
@media (max-width: 768px) {
    #email-container {
        margin: 0 !important;
        border-radius: 0 !important;
        border-left: none !important;
        border-right: none !important;
    }
    #email-header, #email-body, #email-actions {  // Removed #reply-section
        padding: 15px !important;
    }
    #email-actions button {  // Removed flex-direction rules
        width: 100% !important;
    }
}
```

### **8. Code Cleanup and Standards**
- **String Concatenation**: Always use `+` operator instead of template literals (backticks) when using a new string variable to the project, but don't change the existing code that already uses `` 
- **Remove Unused Variables**: Delete `aiSuggestionsVisible` and any reply-related variables
- **Clean Event Listeners**: Remove all handlers for deleted buttons
- **Simplify CSS**: Remove unused hover effects, animations, and positioning rules
- **Maintain Tooltips**: Keep the `showTooltip` functionality for educational link warnings

### **9. Preserve Core Functionality**
**Keep These Elements Unchanged**:
- Email header (sender, subject, timestamp)
- Email body content switching
- Tooltip system for links
- Attachment toggle functionality
- Responsive design for mobile
- Core styling and layout structure
- Qualtrics integration (`setEmbeddedData` can be removed since no reply text)

### **10. Final Interface Structure**
After all changes, the interface should only contain:
1. **Email Header** - Sender information and timestamp
2. **Email Body** - Switchable content (phishing ↔ normal)
3. **Show Attachments Button** - Teal colored toggle
4. **Attachment Container** - Dynamic file display
5. **Change Content Button** - Green/red toggle for email type
6. **Tooltip System** - Educational warnings for links

### **Verification Checklist**
- [ ] All AI-related elements removed
- [ ] Reply system completely deleted
- [ ] Only 2 buttons remain (Show Attachments + Change Content)
- [ ] Change Content button uses green/red color scheme
- [ ] Attachments switch with email content
- [ ] Mobile responsive rules updated
- [ ] No JavaScript errors in console
- [ ] Tooltips still functional
- [ ] String concatenation follows project rules

This transformation reduces the interface complexity while maintaining the core educational value of distinguishing between legitimate and phishing emails.