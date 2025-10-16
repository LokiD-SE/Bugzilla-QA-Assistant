# Chrome Extension: [Bug Fix Template]

## Overview

Bug Fix Template is a Chrome extension that enhances your productivity by providing quick access to AI-powered bug fix templates. The extension integrates seamlessly with Bugzilla and offers both AI-assisted and manual template generation modes. 

## Features
Version 1.3.2
- AI mode enabled by default with improved toggle behavior
- Enhanced UI with status indicator showing "AIMode" or "ManualMode"
- Improved token input field with better styling and visibility controls
- Fixed URL parsing issues in bug reporting template
- Added DOM safety checks to prevent errors when elements are missing
- Enhanced error handling and user feedback
- Token input field automatically shows/hides based on AI toggle state

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
   git clone https://github.com/yourusername/your-extension.git
Open Chrome and navigate to chrome://extensions/

Enable Developer Mode (top right corner)

Click Load unpacked

Select the root directory of this extension

## Usage

Once installed, the extension automatically integrates with Bugzilla pages. You'll see:

1. **Template Dropdown**: Select from various bug fix templates (Reporting, Bug Fix, Confirmation, Verification, etc.)
2. **AI Toggle**: Switch between AI mode (default) and Manual mode
3. **Status Indicator**: Shows current mode ("AIMode" or "ManualMode")
4. **API Key Input**: Enter your Gemini API key when AI mode is enabled
5. **Smart Templates**: AI-powered content generation for confirmation and verification templates

### How to Use:
1. Navigate to any Bugzilla bug page
2. The extension UI will appear in the comment section
3. Toggle AI mode on/off as needed
4. Enter your Gemini API key if using AI mode
5. Select a template from the dropdown
6. The textarea will be automatically filled with the appropriate template

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

Development
To modify or enhance the extension:

Make changes in the appropriate HTML, JS, or CSS files

Reload the extension in chrome://extensions/ by clicking the refresh icon

License
feel free to use and modify this extension.

Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.