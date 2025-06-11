# Qualtrics Email Phishing Study System

A comprehensive email interface simulation system for conducting phishing awareness studies in Qualtrics. This system provides a realistic email environment with various security indicators and interaction patterns to study user behavior when encountering potentially malicious emails.

## 🎯 Purpose

This system is designed for academic research and cybersecurity training to:
- Study user behavior when interacting with phishing emails
- Test effectiveness of different security warning systems
- Analyze decision-making patterns in email security contexts
- Provide realistic email simulation environments for research

## 📧 Core Features

### Email Interface
- **Realistic email client** with header, body, and action buttons
- **Dynamic content switching** between normal and phishing emails
- **Interactive elements** including links, attachments, and reply functionality
- **Mobile-responsive design** that works across devices
- **AI assistant integration** with contextual security advice

### Email Content Types
- **Normal Email**: Legitimate business communication about Q1 results
- **Phishing Email**: Account security alert with suspicious characteristics
- **Attachment Support**: Image attachments with security scanning simulation

## 🔧 Addon System

The system uses a modular addon architecture. Each addon provides different security indicators and interaction patterns:

### Addon 01: Progress Indicators
**File**: `addon_01.js`
- **Horizontal progress bar** showing phishing likelihood (0-100%)
- **Circular confidence indicator** showing detection confidence
- **Color-coded visualization** (green=safe, yellow=questionable, red=dangerous)
- **Real-time updates** when email content changes
- **Interactive elements** with smooth animations

### Addon 02: Visual Status Indicators
**File**: `addon_02.js`
- **Status icons**: 🔒✅ (safe), ❓ (questionable), ☠️ (dangerous)
- **Traffic light system** with realistic lighting effects
- **Dynamic text labels** (SAFE/QUESTIONABLE/DANGEROUS)
- **Confidence level display** (HIGH/MEDIUM/LOW)
- **Pulsing animations** for warning states
- **Click-to-cycle** functionality for testing different states

### Addon 03: Hover Overlays
**File**: `addon_03.js`
- **Smart detection** of links and attachments
- **Security overlay tooltips** with detailed risk assessment
- **Visual indicators** (warning icons) that appear on hover
- **Context-aware warnings** different for phishing vs. normal emails
- **Detailed analysis** including risk level, threat type, and recommendations
- **Positioning intelligence** to keep overlays within viewport

### Addon 04: Interruption Screens
**File**: `addon_04.js`
- **Full-screen modal** that blocks dangerous actions
- **Click interception** for all links and attachments
- **Detailed security warnings** with threat analysis
- **Two-action system**: Cancel or Continue Despite Risk
- **Context-sensitive content** based on email type
- **Professional UI** with animations and responsive design

## 🚀 Installation & Setup

### Prerequisites
- Qualtrics survey platform access
- JavaScript enabled in survey settings
- Basic understanding of Qualtrics survey builder

### Basic Setup

1. **Create a new Qualtrics survey**
2. **Add a Text/Graphic question** where you want the email interface
3. **Copy the main email interface code** from `email.js`
4. **Paste into the question's JavaScript** (OnReady section)

5. **Test the interface** by running a local server:
   ```bash
   python3 -m http.server 8000
   ```
   Then navigate to `http://localhost:8000` to preview your email interface

6. **Configure email content** by modifying the variables in the JavaScript:
   ```javascript
   var normalEmailContent = "Your safe email content here...";
   var phishingEmailContent = "Your phishing email content here...";
   ```


### Adding Addons

Choose one or more addons based on your study requirements:

```javascript
// In your Qualtrics question JavaScript (OnReady section)

// Core email interface (required)
// ... paste email.js content ...

// Add desired addon (choose one)
// ... paste addon_01.js content ... // Progress indicators
// ... paste addon_02.js content ... // Visual status indicators  
// ... paste addon_03.js content ... // Hover overlays
// ... paste addon_04.js content ... // Interruption screens
```

### Configuration

Each addon can be customized by modifying variables at the top of the files:

```javascript
// Example configuration options
var currentConfidence = 85;        // Initial confidence level
var currentRiskLevel = 'dangerous'; // Initial risk assessment
var enableAnimations = true;        // Enable/disable animations
```

## 📊 Data Collection

The system automatically captures user interactions:

### Embedded Data Variables
- `emailReply`: User's reply text content
- `buttonClicks`: Tracking of button interactions
- `timeSpent`: Time spent viewing email
- `addonInteractions`: Specific addon interactions

### Custom Tracking
Add additional tracking by modifying the event listeners:

```javascript
// Example: Track specific interactions
element.addEventListener('click', function() {
    Qualtrics.SurveyEngine.setEmbeddedData('customAction', 'value');
});
```

## 🎨 Customization

### Email Content
Modify the email content variables in `email.js`:

```javascript
var emailContent = `Your normal email content...`;
var phishyContent = `Your phishing email content...`;
```

### Visual Styling
All addons include embedded CSS that can be customized:

```javascript
style.textContent = `
    .your-custom-class {
        color: #custom-color;
        // Add your styles here
    }
`;
```

### Behavioral Logic
Each addon includes configuration functions that can be modified:

```javascript
function updateConfidenceIndicators(riskLevel) {
    // Customize behavior here
}
```

## 📱 Mobile Compatibility

All addons include responsive design with:
- **Adaptive layouts** for small screens
- **Touch-friendly interactions** for mobile devices
- **Optimized positioning** to prevent off-screen elements
- **Scalable fonts and buttons** for accessibility

## 🔬 Research Applications

### Study Design Examples

1. **A/B Testing**: Compare effectiveness of different addon types
2. **Behavioral Analysis**: Study click patterns with interruption screens
3. **Training Effectiveness**: Measure learning with progress indicators
4. **UI/UX Research**: Test different visual warning systems

### Metrics Collection

- **Response times**: How quickly users make decisions
- **Click-through rates**: Percentage who proceed despite warnings
- **Interaction patterns**: Which elements users engage with
- **Warning effectiveness**: How different alerts affect behavior

## 🛡️ Security Considerations

- This is a **simulation system** for research purposes only
- **No real security threats** are present in the system
- **Simulated warnings** should not be used in production environments
- **Educational use only** - not for actual email security

## 🔧 Technical Details

### Browser Compatibility
- **Modern browsers** (Chrome, Firefox, Safari, Edge)
- **JavaScript ES5+** compatibility
- **CSS3 features** for animations and styling
- **Responsive design** principles

### Performance
- **Lightweight implementation** with minimal dependencies
- **Efficient event handling** to prevent memory leaks
- **Optimized animations** for smooth performance
- **Modular loading** to include only needed features

## 📚 Documentation

### Function Reference

#### Core Functions
- `initEmailInterface()`: Initializes the main email interface
- `switchEmailContent()`: Toggles between normal and phishing content
- `handleUserInteraction()`: Processes user actions

#### Addon Functions
- `initConfidenceIndicators()`: Sets up progress/confidence displays
- `initHoverOverlays()`: Enables hover warning system
- `initInterruptionScreen()`: Activates click interruption modals

## 🤝 Contributing

When modifying or extending the system:

1. **Follow the modular pattern** for new addons
2. **Include responsive design** for mobile compatibility
3. **Add embedded data tracking** for research purposes
4. **Test across different browsers** and devices
5. **Document any new features** or configuration options

## 📄 License

This system is designed for academic research and educational purposes. Please ensure compliance with your institution's research ethics guidelines when conducting studies with human participants.

## 🆘 Support

For technical issues or questions:
1. Check browser console for JavaScript errors
2. Verify Qualtrics JavaScript settings are enabled
3. Test with minimal addon configuration first
4. Ensure email content variables are properly defined

---

**Note**: This is a research tool for studying phishing awareness. It should not be used as actual email security software.
