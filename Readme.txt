# Chrome Extension: [Bug Fix Template]

## Overview

Bug Fix Template is a Chrome extension that enhances your productivity by providing quick access to AI-powered bug fix templates. The extension integrates seamlessly with Bugzilla and offers both AI-assisted and manual template generation modes. 

## Features
Version 1.3.2
- **Complete Modern Design System**: Implemented glassmorphism effects across all screens
- **Enhanced Home Screen**: Added modern gradient backgrounds, improved typography, and interactive repository selection
- **Upgraded Popup Interface**: Contemporary design with gradient text effects and smooth animations
- **Modernized Setup Screen**: Enhanced form styling with focus states, hover effects, and improved input design
- **Redesigned Content Script**: Updated button styling, modern toggle switches, and consistent interaction patterns
- **Success Message Styling**: Added animated success indicators with checkmark icons and fade-in effects
- **Consistent Color Scheme**: Unified purple theme (#D0CFF2, #B6A5BD, #0F0013) across all modules
- **Smooth Animations**: Implemented cubic-bezier easing functions and shimmer effects
- **Improved Accessibility**: Better contrast ratios and interactive feedback states
- **Responsive Design**: Optimized layouts with proper spacing and modern border radius
- AI mode enabled by default with improved toggle behavior
- Enhanced UI with status indicator showing "AIMode" or "ManualMode"
- Improved token input field with better styling and visibility controls
- Fixed URL parsing issues in bug reporting template
- Added DOM safety checks to prevent errors when elements are missing
- Enhanced error handling and user feedback
- Token input field automatically shows/hides based on AI toggle state
- Steps to Verify bug fix and all other fields are now populating properly
- Added Reporting Template for Creating new bugs
- **New Raise Wiki Template**: AI-powered template for creating wiki documentation tickets with automatic URL and step extraction
- Resolved issues in Needs Info Template and Removed "Please Raise a New Ticket if issue persists".

Version 1.3.1
- AI summary and content generation for confirmation and bugfix templates
- Used Gemini API and Incorporated chrome local storage to use cache for gemini key storage
- Introduced Manual mode to use just the format and not AI intervention.
- Made slight changes to fix AI generated content and fixed spacing issues in the confirmation template

Version 1.2.2
- Features of All previous versions listed below.
- Added all these features in Change multiple bugs at once Page also
- Added support to add date for release template
- Now the Template will be changed according to the Product and component selected - like Web or App

Version 1.2.1
- Features of All previous versions listed below.
- Easy-to-use Dropdown for multiple bug-fix templates for developers and QA
- Added New Bug Templates like Bug Release Template, Company Update Template, Bug Invalid Template, Bug No Response Template, Bug Confirmation Template, and Bug Verification Template.
- Changed Icon to Bug symbol

Version 1.2.0
- Lightweight and fast-loading UI
- Seamless integration into Chrome's browser interface
- Easy-to-use button for bug-fix template for developers




## Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/LokiD-SE/Bugzilla-QA-Assistant.git

OR Download from Drive link - https://drive.google.com/drive/folders/1okO4Hb_4YX4q-co5wMdO6Z4AD-aeqtWK?usp=drive_link

2.Open Chrome and navigate to chrome://extensions/

3. Enable Developer Mode (top right corner)

4. Click Load unpacked

5. Select the root directory of this extension Example

## UI/UX Improvements (Version 1.3.2)

### 🎨 Modern Design System
The extension has been completely redesigned with a contemporary look and feel:

#### **Glassmorphism Effects**
- Semi-transparent backgrounds with backdrop blur effects
- Layered shadows for depth and dimension
- Subtle gradient overlays for visual appeal

#### **Enhanced Typography**
- Improved font weights and letter spacing
- Gradient text effects on titles and headings
- Better text shadows for improved readability
- Consistent JetBrains Mono font family across all modules

#### **Interactive Elements**
- Smooth hover animations with cubic-bezier easing
- Shimmer effects on button interactions
- Transform animations for tactile feedback
- Focus states with glowing borders

#### **Color Scheme**
- **Primary**: #D0CFF2 (Light Purple)
- **Secondary**: #B6A5BD (Medium Purple)
- **Background**: #0F0013 (Dark Purple)
- **Success**: #4CAF50 (Green for actions)
- **Accent**: Semi-transparent overlays for depth

### 📱 Screen-Specific Improvements

#### **Home Screen (`home.css`)**
- Glassmorphism container with blur effects
- Modern repository selection with hover states
- Enhanced button styling with gradient backgrounds
- Smooth transitions and micro-interactions

#### **Popup Screen (`popup.css`)**
- Gradient text effects on titles
- Enhanced button animations with shimmer effects
- Improved spacing and visual hierarchy
- Contemporary card-like design

#### **Setup Screen (`setup.css`)**
- Modern form input styling with focus states
- Glassmorphism input fields with backdrop blur
- Enhanced button interactions
- Improved accessibility with better contrast

#### **Content Script (`contentScript.css`)**
- Modern button design with gradient backgrounds
- Enhanced toggle switch with smooth animations
- Improved text input styling
- Consistent interaction patterns

### ✨ Animation System
- **Cubic-bezier easing**: Natural motion curves
- **Shimmer effects**: Subtle light animations on hover
- **Transform animations**: Scale and translate effects
- **Fade transitions**: Smooth opacity changes
- **Success animations**: Animated checkmarks and fade-ins

## Usage

Once installed, the extension automatically integrates with Bugzilla pages. You'll see:

1. **Template Dropdown**: Select from 11 bug fix templates in the following order:
   - Select template (placeholder)
   - Reporting (AI-powered)
   - Bug Fix (Bitbucket integration)
   - Company Update (Manual)
   - Release (Manual)
   - Bug Invalid (Manual)
   - No Response (Manual)
   - Needs Info (Manual)
   - Raise Wiki (AI-powered)
   - Wiki Review (Manual)
   - Confirmation (AI-powered)
   - Verification (AI-powered)
2. **AI Toggle**: Switch between AI mode (default) and Manual mode
3. **Status Indicator**: Shows current mode ("AIMode" or "ManualMode")
4. **API Key Input**: Enter your Gemini API key when AI mode is enabled
5. **Smart Templates**: AI-powered content generation for confirmation, verification, bug reporting, and wiki templates

### Available Templates:

#### 🤖 AI-Powered Templates (Require Gemini API Key):
1. **Reporting**: Create new bug reports with environment details, step extraction, and AI-generated summaries
   - Automated URL extraction and formatting
   - Environment details auto-population
   - Build date and hardware tracking
   - Multi-platform support detection

2. **Confirmation**: AI-assisted bug confirmation templates
   - Smart URL extraction (production, backup, staging)
   - Auto-generated reproduction steps
   - Environment details formatting
   - Product-specific templates (Mobile App/Web)

3. **Verification**: Bug fix verification with positive/negative test cases
   - Impact area detection
   - Step verification generation
   - Positive and negative case testing
   - Environment validation details

4. **Raise Wiki**: Create wiki documentation tickets with AI-powered content generation
   - Wiki page link suggestions
   - One-liner implementation summary
   - Prerequisite/configuration steps extraction
   - Impacted areas identification
   - Test case and attachment links
   - Reference ticket tracking

#### 📝 Manual Templates (No AI Required):
5. **Bug Fix**: Generate bug fix templates with PR and commit information
   - Automatic PR and commit ID extraction from Bitbucket
   - Branch name detection
   - Root cause analysis section
   - Testing details template

6. **Wiki Review**: Review and verify wiki documentation
   - Automatic wiki URL detection
   - Review confirmation template
   - Smart wiki link extraction from comments

7. **Release**: Product release announcements
   - Date auto-population (day, month, year)
   - Product-specific versions (Mobile App/Web/Next)
   - Release version tracking

8. **Company Update**: Company update notifications
   - Simple update confirmation template
   - Commit reference support

9. **Bug Invalid**: Mark invalid bug reports
   - URL extraction and formatting
   - Automatic bizom URL detection
   - Staging URL generation from production
   - Closure confirmation template

10. **No Response**: Handle unresponsive bug reports
    - Closure justification template
    - Summary integration
    - Re-raise instruction message

11. **Needs Info**: Request additional information for bug resolution
    - Bug guideline document links
    - Information requirements listing
    - Standard response template

### How to Use:
1. Navigate to any Bugzilla bug page
2. The extension UI will appear in the comment section
3. Toggle AI mode on/off as needed
4. Enter your Gemini API key if using AI mode
5. Select a template from the dropdown
6. The textarea will be automatically filled with the appropriate template

### Template Features in Detail:

#### 🔍 Smart Extraction Capabilities:
All AI-powered templates include intelligent data extraction:
- **URL Parsing**: Automatically detects production, staging, and backup bizom URLs from comments
- **Staging URL Generation**: Converts production URLs to staging equivalents
- **Step Detection**: Pulls "Steps to Reproduce" from existing bug comments
- **Summary Integration**: Extracts bug summaries and descriptions
- **Environment Detection**: Identifies Dev/Staging/Live environments
- **Product/Component Awareness**: Adapts templates based on selected product and component

#### 📋 Bug Fix Template (Manual):
This template is unique as it integrates with Bitbucket API:
- **PR Detection**: Automatically fetches Pull Request information from Bitbucket
- **Commit Tracking**: Extracts commit IDs associated with bug fixes
- **Branch Identification**: Captures source branch names
- **Error Handling**: Graceful fallback when API calls fail
- **Template Structure**: Includes Root Cause, Fix Description, Testing Details, and Impact sections

#### 🔄 Toggle Functionality:
The AI Toggle switch provides flexibility:
- **AI Mode (Default)**: Uses Gemini API for intelligent content generation
- **Manual Mode**: Quick template generation without AI processing
- **Dynamic UI**: Token input appears/disappears based on toggle state
- **State Persistence**: Toggle state is visually indicated
- **Status Indicator**: Shows "AIMode" or "ManualMode" in real-time

#### 🎯 Page Compatibility:
The extension works on multiple Bugzilla page types:
- Bug detail pages
- Bug creation pages (Mobile App, BizomWeb, Internal Tools)
- Bug list pages for bulk operations
- Comment sections with dynamic state checking

Folder Structure
your-extension/
│
├── manifest.json         # Extension manifest file
├── background.js         # Background script (if applicable)
├── content.js            # Content script that interacts with web pages
├── popup.html            # HTML for popup interface
├── popup.js              # JavaScript for popup behavior
├── styles.css            # Extension styling
├── icons/                # Extension icons
└── README.md             # You're here!

## Technical Implementation

### Key Components:
- **Content Script**: Injects UI elements and handles template generation logic
- **Storage API**: Stores user credentials, API keys, and configuration
- **Bitbucket API Integration**: Fetches PR and commit information
- **Gemini AI API**: Powers intelligent template generation
- **DOM Manipulation**: Dynamic element injection and state management

### APIs Used:
- **Chrome Storage API**: Local storage for user data persistence
- **Bitbucket REST API**: Pull Request and commit data
- **Gemini 2.0 Flash API**: AI-powered content generation
- **Chrome Extensions API**: Active tab and host permissions

### Data Flow:
1. User selects template from dropdown
2. Extension extracts relevant data from page and comments
3. If AI enabled: Sends extracted data to Gemini API
4. AI processes and returns formatted content
5. Template is populated in textarea
6. If Manual mode: Static template is populated directly

Development
To modify or enhance the extension:

Make changes in the appropriate HTML, JS, or CSS files

Reload the extension in chrome://extensions/ by clicking the refresh icon

Test changes by navigating to bugzilla.bizom.in pages

License
feel free to use and modify this extension.

Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.