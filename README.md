# Phishing Email Scenario Testing Framework

This framework allows you to easily test different phishing detection scenarios individually in both local development and Qualtrics environments.

## 📁 File Structure

```
your_project/
├── email.js                     # Base email interface (your existing code)
├── scenario_manager.js          # Provides API for scenarios to hook into
├── scenario_tester.html         # Local testing interface with scenario switcher
├── email_interface.html         # Your original testing file
├── scenarios/                   # Individual scenario files
│   ├── scenario_01_progress_bar.js
│   ├── scenario_06_underline_suspicious.js
│   ├── scenario_12_interactive_chatbot.js
│   └── ... (add more scenarios)
└── README.md
```

## 🏗️ Architecture Overview

### 1. **Base Email Interface** (`email.js`)
- Your existing email interface code
- Remains unchanged - provides the foundation
- Contains the core email HTML structure and basic functionality

### 2. **Scenario Manager** (`scenario_manager.js`)
- Provides a clean API for scenarios to interact with the email interface
- Handles element manipulation, event management, and cleanup
- Automatically initializes when the email interface is ready

### 3. **Individual Scenario Files** (`scenarios/scenario_XX_name.js`)
- Each scenario is a self-contained module
- Uses the Scenario Manager API to modify the interface
- Follows a consistent naming pattern for easy organization

## 🚀 Usage

### Local Development & Debugging

1. **Open `scenario_tester.html`** in your browser
2. **Select a scenario** from the control panel
3. **Click "Load Scenario"** to test it
4. **Use "Reset Interface"** to clean up and test another scenario

### For Qualtrics

1. **Copy the base `email.js`** into your Qualtrics question
2. **Copy `scenario_manager.js`** into the same question 
3. **Copy the specific scenario file** you want to test
4. **Load in order**: `email.js` → `scenario_manager.js` → `scenario_XX.js`

## 📝 Creating New Scenarios

Create a new file: `scenarios/scenario_XX_name.js`

```javascript
// Scenario XX: Description of what it does
window.addEventListener('scenarioManagerReady', function() {
    
    console.log('Scenario XX: Description - Activated');
    
    // Your scenario code here using EmailScenarioManager API
    
    // Example: Add a new element
    EmailScenarioManager.addElement(
        '<div>Your HTML here</div>', 
        'email-container', 
        'prepend'
    );
    
    // Example: Add styles
    EmailScenarioManager.addStyles(`
        .your-class { color: red; }
    `, 'scenario-xx-styles');
    
    // Example: Add event listener
    EmailScenarioManager.addEventListener('your-element-id', 'click', function() {
        // Handle click
    });
    
    console.log('Scenario XX setup complete');
});
```

## 🔧 Scenario Manager API

### Element Manipulation
- `addElement(html, targetId, position)` - Add new elements
- `replaceContent(elementId, newContent)` - Replace element content
- `modifyStyles(elementId, styles)` - Modify element styles
- `toggleElement(elementId, show)` - Show/hide elements

### Event Management
- `addEventListener(elementId, event, handler)` - Add event listeners with auto-cleanup
- `triggerEvent(eventName, data)` - Trigger custom events

### Styling
- `addStyles(css, id)` - Add CSS styles with optional ID for cleanup

### Overlays & Modals
- `showOverlay(content, id)` - Show overlay/modal
- `hideOverlay(id)` - Hide overlay/modal

### Cleanup
- `cleanup()` - Remove all scenario-specific elements, styles, and events

## ✅ Example Scenarios Included

1. **Scenario 1**: Progress bar showing phishing likelihood
2. **Scenario 6**: Grammarly-style underlines for suspicious text  
3. **Scenario 12**: Interactive chatbot with questions and points

## 🔄 Adding More Scenarios

1. Create the scenario file: `scenarios/scenario_XX_name.js`
2. Add it to the scenario tester: Update `scenario_tester.html` with a new button
3. Test locally first, then deploy to Qualtrics

## 🏃‍♂️ Quick Start

1. **Clone/download** this framework
2. **Open `scenario_tester.html`** in your browser
3. **Test existing scenarios** to see how they work
4. **Create your own scenario** following the pattern
5. **Deploy to Qualtrics** when ready

## 🎯 Benefits

- ✅ **Isolated Testing**: Each scenario runs independently
- ✅ **Easy Debugging**: Test scenarios individually in browser
- ✅ **Clean Architecture**: Base email code remains untouched
- ✅ **Reusable Components**: Scenario Manager API for consistency
- ✅ **Quick Deployment**: Copy 3 files to Qualtrics per scenario
- ✅ **Automatic Cleanup**: No conflicts between scenarios 