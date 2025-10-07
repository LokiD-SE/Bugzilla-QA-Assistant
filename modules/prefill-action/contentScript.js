(function () {
  'use strict';
    // Function to extract bug ID from URL
    function getBugIdFromUrl() {
        const params = new URLSearchParams(window.location.search);
        return params.get('id') || 'No ID found';
    }
    function injectBugFixTemplateButton() {
        const bugPageTitle = document.querySelector('#title').innerText;
        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const day = date.getDate();
        const year = date.getFullYear();
        const changeMultipleBugsContainer = document.querySelector('#flags');
        const container = document.querySelector('#comment_tabs');
        const textArea = document.querySelector('textarea#comment');


        if (textArea) {
            if (!document.getElementById('bugFixTemplateSelect')) {

                const bugFixTemplateSelect = document.createElement('select');
                bugFixTemplateSelect.id = 'bugFixTemplateSelect';
                bugFixTemplateSelect.className = 'comment_tab';
                bugFixTemplateSelect.setAttribute('role', 'tablist'); // Optional, for accessibility
                bugFixTemplateSelect.style.marginLeft = '20px';

                // Add options to the select dropdown
                const options = [
                    { value: 'bugTemplateSelector', text: 'Select template' },
                    { value: 'bugFixTemplate', text: 'Bug Fix' },
                    { value: 'bugCompanyUpdate', text: 'Company Update' },
                    { value: 'bugReleaseTemplate', text: 'Release' },
                    { value: 'bugInvalid', text: 'Bug Invalid' },
                    { value: 'bugNoResponse', text: 'No Response' },
                    { value: 'bugNeedsInfo', text: 'Needs Info' },
                    { value: 'bugWiki', text: 'Wiki' },
                    { value: 'bugConfirmation', text: 'Confirmation' },
                    { value: 'bugVerification', text: 'Verification' }

                ];
                options.forEach(optData => {
                    const option = document.createElement('option');
                    option.value = optData.value;
                    option.textContent = optData.text;
                    bugFixTemplateSelect.appendChild(option);
                });
                const bugFixTextBox = document.createElement('input');
                            bugFixTextBox.id = 'bugFixTextBox';
                            bugFixTextBox.className  = 'comment_tab';
                            bugFixTextBox.setAttribute('role', 'tab');
                            bugFixTextBox.placeholder = 'Enter GeminiToken';
                            bugFixTextBox.style.width = 'flex';
                            bugFixTextBox.style.height = 'flex';
                            bugFixTextBox.style.margin = 'flex';
                            bugFixTextBox.style.display = 'block';

                const bugFixToggle = document.createElement('input');
                bugFixToggle.type = 'checkbox';
                bugFixToggle.id = 'bugFixToggle';
                bugFixToggle.className = 'bug-Fix-Toggle';

                // Create the toggle label (acts as the visual switch)
                const bugFixToggleLabel = document.createElement('label');
                bugFixToggleLabel.htmlFor = 'bugFixToggle';
                bugFixToggleLabel.className = 'bug-Fix-Toggle-label';

                const bugFixStatusText = document.createElement('span');
                bugFixStatusText.id = 'bugFixStatusText';
                bugFixStatusText.textContent = 'ManualMode'; // Default state
                bugFixStatusText.style.marginLeft = '10px';
                bugFixStatusText.style.fontFamily = 'Arial, sans-serif';
                bugFixStatusText.style.fontSize = '14px';


                bugFixTemplateSelect.addEventListener('change', async () => {
                    console.log('Bug Fix Template clicked');
                    const textArea = document.querySelector('textarea#comment');
                    const testAreaValue = textArea.value;
                    let product = '';
                    let component = '';
                    let summary = 'The issue in ';
                    let format, apiKey, Prompt;
                    const isAiEnabled = document.querySelector('#bugFixToggle').checked;
                    apiKey = document.getElementById('bugFixTextBox').value;
                    if(bugPageTitle=='Bugzilla – Enter Bug: Mobile App'||bugPageTitle=='Bugzilla – Enter Bug: BizomWeb')
                    {
                        console.log('Product & Component Found');
                        product = document.querySelector('#field_container_product').innerText;
                        component = document.querySelector('#component').value;
                        summary = summary+document.querySelector('#short_desc').value;
                    }
                    else{
                    product = document.querySelectorAll('#product option:checked')[0].innerText;
                    component = document.querySelectorAll('#component option:checked')[0].innerText;
                    summary = summary+document.querySelector('#short_desc_nonedit_display').innerText;
                    }
                    console.log('Bug Fix Template clicked');

                    async function generateAISummary(format,text, apiKey, formattedUrls, Prompt) {
                                    let geminiPrompt = ' ';
                                  //let geminiPrompt = `Please read the following comment below and write a simple and clear explanation that is easy for non-technical users to understand. Do NOT change the section headers (like given in ** **) and give section headers as per the format given last ( like as per the 2 types of format only like format confirmation - Hi Team,\n${summary}\n\n** Steps to Reproduce **\n\n** Expected Result (As Reported): **\n\n** Expected Result (As Per Testcase): **\n\n** Actual Result (As Observed by QA): **\n\n** Attachments **\n\n** Commitid/Appversion **\n\nPlease contact me for any queries. | and for format verification - Hi Team,\n\n**Bug Summary**\n${summary}\n\n**Environment Details:**\n\n**Steps to Verify the Bug Fix:**\n\n**Positive Case:**\n\n**Negative Case:**\n\n**Impact on Related Areas:**\n\n**Attachments:**\n\n**Resolution Verification Status:**\n\nPlease contact me for any queries. Also keep environment details and leave sections empty when no data is provided. Also provide credentials mentioned like this: Staging|Dev\nURL:\nAdmin:\nUser:\nBranch/version: as given in the format. Remove 'Okay, here's a simplified explanation of the reported issue, keeping the original headings intact:' in the start of the response and follow 'Hi Team,' as per format. Also add 'Please contact me for any Queries' at the end as mentioned in format. Only update the content under each header to be more human-readable for this content: ${text} based on the format without altering spacing and headings. This is the format - ${format}`;
                                  if (Prompt === "bugConfirmation")
                                  {
                                  geminiPrompt = `Please generate a human-friendly summary based on the given input text. Follow the exact format structure provided below. Do NOT change the section headings, spacing, or structure. Update only the content under each heading in a simple and easy-to-understand language.

                                    Use the following format based on the Data provided by the "format" below.

                                  ---

                                  **use this format:**

                                  Hi Team,

                                  Staging|Dev
                                  URL:
                                  Admin:
                                  User:
                                  Branch/version: master

                                  ** Steps to Reproduce **

                                  ** Expected Result (As Reported): **

                                  ** Expected Result (As Per Testcase): **

                                  ** Actual Result (As Observed by QA): **

                                  ** Attachments **

                                  ** Commitid/Appversion **

                                  Please contact me for any queries.

                                  ---

                                  Guidelines:
                                  - Do NOT alter or rename any headings (e.g., ** Steps to Reproduce **, ** Expected Result (As Reported): **).
                                  - Keep section spacing and layout exactly as shown.
                                  - Add related information to all the headings and generate information for each heading.
                                  - Always include URL credentials and branch/version under "Environment Details" when using the verification and confirmation format.
                                  - Remove any leading text like “Okay, here's a simplified explanation…” from the response.
                                  - Always start with “Hi Team,” and end with “Please contact me for any queries.”

                                  Now generate the summary using the above format with guidelines and the following input variables:
                                  ${text}`;
                                  }
                                  else
                                  {
                                  geminiPrompt = `Please generate a human-friendly summary based on the given input text. Follow the exact format structure provided below. Do NOT change the section headings, spacing, or structure. Update only the content under each heading in a simple and easy-to-understand language.

                                    Use the following format based on the Data provided by the "text" variable and format given below.

                                  ---
                                  Hi Team,

                                  **Bug Summary**

                                  **Environment Details:**

                                  Staging|Dev
                                  URL:
                                  Admin:
                                  User:
                                  Branch/version: release

                                  **Steps to Verify the Bug Fix:**

                                  **Positive Case:**

                                  **Negative Case:**

                                  **Impact on Related Areas:**

                                  **Attachments:**

                                  **Resolution Verification Status:**
                                  Verified

                                  Please contact me for any queries.

                                  ---
                                  Guidelines:
                                  - Do NOT alter or rename any headings (e.g., **Bug Summary**, **Environment Details:**).
                                  - Keep section spacing and layout exactly as shown.
                                  - Add Positive Case and Negative Case under each section from the bug summary.
                                  - Positive Case and Negative Case should start with "Verify that or check that".
                                  - Add related information to all the headings and generate information for each heading.
                                  - Always include URL credentials and branch/version under "Environment Details" when using the verification and confirmation format.
                                  - Remove any leading text like “Okay, here's a simplified explanation…” from the response.
                                  - Always start with “Hi Team,” and end with “Please contact me for any queries.”

                                  Now generate the summary using the above format with guidelines and the following input variables:
                                  ${text}`;
                                  }

                                  let geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                                  let aiSections = '';
                                  try {
                                      const geminiResp = await fetch(geminiUrl, {
                                          method: 'POST',
                                          headers: {
                                              'Content-Type': 'application/json'
                                          },
                                          body: JSON.stringify({
                                              contents: [{ parts: [{ text: geminiPrompt }] }]
                                          })
                                      });
                                      if (geminiResp.ok) {
                                          const geminiData = await geminiResp.json();
                                          aiSections = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || '';
                                      } else {
                                          aiSections = summary;
                                      }
                                  } catch (err) {
                                      aiSections = summary;
                                  }
                                  return aiSections;
                    }
                    let selected = bugFixTemplateSelect.options[bugFixTemplateSelect.selectedIndex];
                    if (textArea && !textArea.classList.contains('bz_default_hidden')) {
                        const bugId = getBugIdFromUrl();

                        const { username, token, repoName, geminitoken } = await new Promise(resolve => {
                            chrome.storage.local.get(['username', 'token', 'repoName', 'geminitoken'], resolve);
                        });
                        if(geminitoken!=null)
                        {
                        apiKey = geminitoken; // Store geminitoken in variable named apiKey
                        }

                       if (selected.value=="bugTemplateSelector") {
                          console.log('No Template Selected Yet');
                          textArea.value = ` `;
                          return;
                       }
                        if (selected.value=="bugReleaseTemplate") {
                            console.log('No repository selected, please select one from the home page');
                            if(product == 'Mobile App' && component == 'BizomNext')
                            {
                            textArea.value = `Hi Team,\n\nBizom Next - Released on `+day+', '+month+', '+year+'. Version:';
                            }
                            else if(product == 'Mobile App' && component == 'Bourbon')
                            {
                            textArea.value = `Hi Team,\n\nBizom App - Released on `+day+', '+month+', '+year+'. Version:';
                            }
                            else
                            {
                            textArea.value = `Hi Team,\n\nBizom Web - Released on `+day+', '+month+', '+year;
                            }
                            return;
                        }
                        if (selected.value=="bugCompanyUpdate") {
                            console.log('No repository selected, please select one from the home page');
                            textArea.value = `Hi Team,\n\nThe Company has been updated successfully as per the mentioned commit`;
                            return;
                        }
                        if (selected.value=="bugInvalid") {
                            let comments = document.querySelectorAll('.bz_comment_text');

                            // Slice from index 1 to length - 1
                            let selectedComments = Array.from(comments).slice(1, comments.length - 1);

                            // Get innerText of each selected comment
                            let commentTexts = selectedComments.map(comment => comment.innerText);

                            // Use Set to avoid duplicates
                            let bizomUrls = new Set();

                            commentTexts.forEach((text) => {
                                let matches = text.match(/https?:\/\/[^\s]+/g);
                                if (matches) {
                                    matches.forEach(url => {
                                        // Only keep URLs that contain 'bizom' and NOT 'bitbucket'
                                        if (url.includes("bizom") && !url.includes("bitbucket")) {
                                            bizomUrls.add(url);

                                            // If it's a production bizom.in URL, generate a staging version
                                            if (url.includes("bizom.in")) {
                                                let stagingUrl = url
                                                    .replace("https://", "https://staging")         // add "staging" before subdomain
                                                    .replace("bizom.in", "bizomstaging.in");        // replace domain

                                                bizomUrls.add(stagingUrl);
                                            }
                                        }
                                    });
                                }
                            });

                            // Convert Set to array
                            let bizomUrlList = Array.from(bizomUrls);
                            let formattedUrls = bizomUrlList.join('\n');


                            console.log('No repository selected, please select one from the home page');
                            textArea.value = `Hi Team,\n\nChecked this reported issue with the Below Details\n\nUrl:\n\n${summary}\n\n${formattedUrls}\n\nAs per the above details closing this ticket\n\nPlease contact me for further clarifications`;
                            return;
                        }
                        if (selected.value=="bugNoResponse") {
                            console.log('No repository selected, please select one from the home page');
                            textArea.value = `Hi Team,\n\nAs sufficient information or response for ${summary} is not provided \n\nHence, Marking this ticket as closed\n\nPlease raise new ticket if issue exists again`;
                            return;
                        }
                        if (selected.value=="bugNeedsInfo") {
                            console.log('No repository selected, please select one from the home page');
                            textArea.value = `Hi Team,\n\nPlease follow these guidelines to give all the needed info like, branch/app version, credentials, permission to clone, and steps to reproduce with attachments to work on this bug as provided info is insufficient\n\nBug Guideline Documents:\nhttps://bugzilla.bizom.in/page.cgi?id=bug-writing.html\nhttps://docs.google.com/document/d/1-2XUnI5dWujLawjzjOagvTdKShgd2RXWwPvv8GSy3fM/edit?tab=t.0#heading=h.dm28529y3jwb\n\nHence, Marking this ticket as Needs info\n\nPlease raise new ticket if issue exists again`;
                            return;
                        }
                        if (selected.value == "bugConfirmation") {
                        let comments = document.querySelectorAll(".bz_comment_text");
                        let commentTexts = Array.from(comments).map(c => c.innerText);
                        let combinedText = commentTexts.join(" ");


                          let prodUrls = new Set();
                          let backupUrls = new Set();
                          let stagingUrls = new Set();

                          commentTexts.forEach(text => {
                            let matches = text.match(/https?:\/\/[^\s]+/g);
                            if (matches) {
                              matches.forEach(url => {
                                try {
                                  let cleanUrl = new URL(url);
                                  let baseUrl = cleanUrl.origin + "/";

                                  if (/^[a-z0-9-]+\.bizom\.[a-z.]+$/i.test(cleanUrl.hostname)) {
                                    prodUrls.add(baseUrl);
                                    let subdomain = cleanUrl.hostname.split(".")[0];
                                    let tld = cleanUrl.hostname.split(".").slice(2).join(".");
                                    let stagingHost = `staging${subdomain}.bizomstaging.${tld}`;
                                    stagingUrls.add(cleanUrl.protocol + "//" + stagingHost + "/");
                                  } else if (/^backupexperience\.bizombackup\.[a-z.]+$/i.test(cleanUrl.hostname)) {
                                    backupUrls.add(baseUrl);
                                  }
                                } catch {
                                  // ignore invalid URLs
                                }
                              });
                            }
                          });

                          let formattedUrls = [
                            ...Array.from(prodUrls),
                            ...Array.from(backupUrls),
                            ...Array.from(stagingUrls)
                          ].join("\n");

                            if (product == "Mobile App") {
                              format = `Hi Team,\n\n${summary} in the Bizom App was Confirmed with the below Environment details\n\nStaging:\nURL:${formattedUrls}\nCreds:\nVersion:\nBranch:master\n\n** Steps to Reproduce **\n\n** Expected Result (As Reported): **\n\n** Expected Result (As Per Testcase): **\n\n** Actual Result (As Observed by QA): **\n\n** Attachments **\n\n** Commitid/Appversion **\n\nEnvironment: Dev|Staging\n\nPlease contact me for any queries`;
                            } else if (product == "BizomWeb") {
                              format = `Hi Team,\n\n${summary} in the Bizom Web was Confirmed with the below Environment details\n\nStaging:\nURL:${formattedUrls}\nCreds:\nBranch:master\n\n** Steps to Reproduce **\n\n** Expected Result (As Reported): **\n\n** Expected Result (As Per Testcase): **\n\n** Actual Result (As Observed by QA): **\n\n** Attachments **\n\n** Commitid/Appversion **\n\nPlease contact me for any queries`;
                            } else {
                              format = `Hi Team,\n${summary}\n\n** Steps to Reproduce **\n\n** Expected Result (As Reported): **\n\n** Expected Result (As Per Testcase): **\n\n** Actual Result (As Observed by QA): **\n\n** Attachments **\n\n** Commitid/Appversion **\n\nPlease contact me for any queries`;
                            }
                            console.log(format);
                            if(isAiEnabled == false)
                            {
                              generateAISummary(format, combinedText,apiKey,formattedUrls, "bugConfirmation").then(summary => {
                                if (summary !== null){
                                textArea.value = summary;
                                }
                                else{
                                textArea.value = format;
                                }
                              }).catch(err => {
                                console.error("Error generating summary:", err);
                                textArea.value = format;
                              });
                            }
                            else{
                            textArea.value = format;
                            }
                            const comment1 = document.querySelector('#comment').value

                          return;
                        }

                        if (selected.value === "bugVerification") {
                        let comments = document.querySelectorAll(".bz_comment_text");
                        let commentTexts = Array.from(comments).map(c => c.innerText);
                        let combinedText = commentTexts.join(" ");
                        let prompt = selected.value;

                            const prodUrls = new Set();
                            const backupUrls = new Set();
                            const stagingUrls = new Set();

                            // === Extract URLs ===
                            commentTexts.forEach(text => {
                                const matches = text.match(/https?:\/\/[^\s]+/g);
                                if (!matches) return;

                                matches.forEach(url => {
                                    try {
                                        const cleanUrl = new URL(url);
                                        const baseUrl = cleanUrl.origin + '/';
                                        const host = cleanUrl.hostname;

                                        if (/^[a-z0-9-]+\.bizom\.[a-z.]+$/i.test(host)) {
                                            prodUrls.add(baseUrl);
                                            const subdomain = host.split('.')[0];
                                            const tld = host.split('.').slice(2).join('.');
                                            const stagingUrl = `${cleanUrl.protocol}//staging${subdomain}.bizomstaging.${tld}/`;
                                            stagingUrls.add(stagingUrl);
                                        } else if (/^backupexperience\.bizombackup\.[a-z.]+$/i.test(host)) {
                                            backupUrls.add(baseUrl);
                                        }
                                    } catch {
                                        // skip invalid URLs
                                    }
                                });
                            });

                            const formattedUrls = [
                                ...prodUrls,
                                ...backupUrls,
                                ...stagingUrls
                            ].join('\n');

                            // === Extract Steps ===
                            const allSteps = [];

                            commentTexts.forEach(text => {
                                const lines = text.split('\n');
                                let steps = [];
                                let collecting = false;

                                for (let line of lines) {
                                    line = line.trim();
                                    if (line.toLowerCase().includes("steps to reproduce")) {
                                        collecting = true;
                                        continue;
                                    }
                                    if (collecting && (line.startsWith("**") || line.toLowerCase().startsWith("expected result"))) {
                                        break;
                                    }
                                    if (collecting && line && !line.startsWith("**")) {
                                        steps.push(line);
                                    }
                                }

                                if (steps.length > 0) {
                                    allSteps.push(...steps);
                                }
                            });

                            // === Extract Impact Areas ===
                            const impactAreas = [];

                            commentTexts.forEach(text => {
                                const lines = text.split('\n');
                                let collecting = false;
                                let sectionLines = [];

                                for (let line of lines) {
                                    line = line.trim();

                                    if (line.toLowerCase().includes("impact on related areas")) {
                                        collecting = true;
                                        continue;
                                    }
                                    if (collecting && (line.startsWith("**") || line.toLowerCase().includes("end-user impact"))) {
                                        break;
                                    }
                                    if (collecting && line && !line.startsWith("**")) {
                                        sectionLines.push(line);
                                    }
                                }

                                if (sectionLines.length > 0) {
                                    impactAreas.push(...sectionLines);
                                }
                            });

                            // === Generate Summary & Set TextArea ===
                            if(product == 'Mobile App')
                            {
                            format = `Hi Team,\n\nThe fix in the Bizom App was Verified with the details below\n\n**Bug Summary**\n${summary}\n\n**Environment Details:**\n\nStaging\nURL:${formattedUrls}\nAdmin:\nUn:\nVersion:\n\n**Steps to Verify the Bug Fix:**\n${allSteps.join("\n")}\n\n**Positive Case:**\n\n**Negative Case:**\n\n**Impact on Related Areas:**\n${impactAreas.join("\n")} \n\n**Attachments:**\n\n**Resolution Verification Status:**\n\nPlease contact me for any queries`;
                            }
                            else if(product == 'BizomWeb')
                            {
                            format = `Hi Team,\n\nThe Given fix in the Bizom Web was Verified with the given details below\n\n**Bug Summary**\n${summary}\n\n**Environment Details:**\n\nStaging\nURL:${formattedUrls}\nAdmin:\nUn:\nBranch:release\n\n**Steps to Verify the Bug Fix:**\n${allSteps.join("\n")}\n\n**Positive Case:**\n\n**Negative Case:**\n\n**Impact on Related Areas:**\n${impactAreas.join("\n")} \n\n**Attachments:**\n\n**Resolution Verification Status:**\n\nPlease contact me for any queries`;
                            }
                            else{
                            format = `Hi Team,\n\n**Bug Summary**\n${summary}\n\n**Environment Details:**\n\n**Steps to Verify the Bug Fix:**\n\n**Positive Case:**\n\n**Negative Case:**\n\n**Impact on Related Areas:**\n\n**Attachments:**\n\n**Resolution Verification Status:**\n\nPlease contact me for any queries`;
                            }
                            if(isAiEnabled == false)
                            {
                              generateAISummary(format, combinedText, apiKey, formattedUrls, "bugVerification").then(summary => {
                                if (summary !== null){
                                textArea.value = summary;
                                }
                                else{
                                textArea.value = format;
                                }
                              }).catch(err => {
                                console.error("Error generating summary:", err);
                                textArea.value = format;
                              });
                            }
                            else{
                            textArea.value = format;
                            }
                          return;
                        }
                        if (selected.value == "bugWiki") {
                            let comments = document.querySelectorAll(".bz_comment_text");
                            let commentTexts = Array.from(comments).map(c => c.innerText);
                            let combinedText = commentTexts.join(" ");
                            let wikiUrls = new Set(); // Changed 'url' to 'wikiUrls' to avoid conflict

                            commentTexts.forEach(text => {
                                let matches = text.match(/https?:\/\/[^\s]+/g);
                                console.log(matches);
                                if (matches) {
                                    matches.forEach(url => { // 'url' here is the string from the match
                                    try {
                                        let cleanUrl = new URL(url);

                                        // Check if the hostname includes "wiki"
                                        if (cleanUrl.hostname.includes("wiki")) {
                                            wikiUrls.add(cleanUrl.href);
                                        }
                                        }
                                     catch {
                                            // ignore invalid URLs
                                        }
                                    });
                                }
                            });

                            let formattedUrls = Array.from(wikiUrls).join("\n");
                            console.log(formattedUrls);

                            if (formattedUrls) { // The check should be for a truthy value, which an empty string is not
                                textArea.value = `Hi Team,\n\nI have reviewed the wiki page for this implementation and confirmed it is up-to-date, accurate, and includes helpful screenshots.\n\nWiki Link:\n${formattedUrls}\n\nMarking this ticket as Reviewed, Please Contact me for any Queries`;
                            } else {
                                console.log("No wiki.bizom URLs found in the comments.");
                                textArea.value = `Hi Team,\n\nI have reviewed the wiki page for this implementation and confirmed it is up-to-date, accurate, and includes helpful screenshots.\n\nWiki Link:\n\n\nMarking this ticket as Reviewed, Please Contact me for any Queries`;
                            }
                            return;
                        }
                        if (selected.value=="bugFixTemplate") {
                            try {
                                const credentials = btoa(`${username}:${token}`);
                                const { prApi } = await new Promise(resolve => {
                                    chrome.storage.local.get(['prApi'], resolve);
                                });
                                const prsResponse = await fetch(prApi, {
                                    headers: {
                                        'Authorization': `Basic ${credentials}`,
                                        'Accept': 'application/json'
                                    }
                                });
                                if (!prsResponse.ok) {
                                    throw new Error(`Error ${prsResponse.status}: ${prsResponse.statusText}`);
                                }
                                const prsData = await prsResponse.json();
                                const matchingPr = prsData.values.find(pr => pr.source.branch.name.includes(bugId));
                                let prLink = 'N/A';
                                let commitId = 'N/A';
                                let branchName = 'N/A';
                                if (matchingPr) {
                                    branchName = matchingPr.source.branch.name;
                                    prLink = matchingPr.links.html.href;
                                    commitId = matchingPr.source.commit.hash;
                                }
                                if(prLink !== 'N/A' && commitId !== 'N/A' && branchName !== 'N/A'){
                                    const template = `\n**Bug Summary**\n\n**Root Cause Analysis**\n\n**Ticket ID That Introduced This Issue**\n\n**Fix Description**\n\n**Testing Details**\n\n**Impact on Related Areas**\n\n**End-User Impact**\n\n**Attachments**\n PR: ${prLink} \n Commit ID: ${commitId} \n Branch: ${branchName}\n`;
                                    textArea.value = template;
                                    console.log('Textarea filled with PR data and template');
                                }else{
                                    const template = `\n\n!!!! Error extracting required data. !!!! \n\n**Bug Summary**\n\n**Root Cause Analysis**\n\n**Ticket ID That Introduced This Issue**\n\n**Fix Description**\n\n**Testing Details**\n\n**Impact on Related Areas**\n\n**End-User Impact**\n\n**Attachments**\n PR: N/A \n Commit ID: N/A \n Branch: N/A\n`;
                                    textArea.value = template;
                                    console.log('Error extracting required data.');
                                }
                            } catch (error) {
                                console.log(`Error fetching PR : ${error}`);
                                textArea.value = `\n\n!!!! Error fetching PR. !!!! \n\n**Bug Summary**\n\n**Root Cause Analysis**\n\n**Ticket ID That Introduced This Issue**\n\n**Fix Description**\n\n**Testing Details**\n\n**Impact on Related Areas**\n\n**End-User Impact**\n\n**Attachments**\n PR: N/A \n Commit ID: N/A \n Branch: N/A\n`;
                            }
                        }

                        
                    } else {
                        console.log('Textarea is hidden or not found');
                    }
                });
                if(bugPageTitle=='Bugzilla – Bug List'){
                changeMultipleBugsContainer.appendChild(bugFixStatusText);
                changeMultipleBugsContainer.appendChild(bugFixToggle);
                changeMultipleBugsContainer.appendChild(bugFixToggleLabel);
                changeMultipleBugsContainer.appendChild(bugFixTemplateSelect);
                changeMultipleBugsContainer.appendChild(bugFixTextBox);

                }
                else if(bugPageTitle=='Bugzilla – Enter Bug: BizomWeb'||bugPageTitle=='Bugzilla – Enter Bug: Mobile App'){
                container.appendChild(bugFixStatusText);
                container.appendChild(bugFixToggle);
                container.appendChild(bugFixToggleLabel);
                container.appendChild(bugFixTemplateSelect);
                container.appendChild(bugFixTextBox);
                }
                else{
                container.appendChild(bugFixStatusText);
                container.appendChild(bugFixToggle);
                container.appendChild(bugFixToggleLabel);
                container.appendChild(bugFixTemplateSelect);
                container.appendChild(bugFixTextBox);
                }

                console.log('Bug Fix Template button injected. Extracted Bug ID:', getBugIdFromUrl());
                updateBugFixTemplateState();
            }
        } else {
            console.log('Element with ID "comment_tabs" or textarea#comment not found.');
        }

       }

function updateBugFixTemplateState() {
    const textArea = document.querySelector('textarea#comment');
    const bugFixTemplateButton = document.getElementById('bugFixTemplateSelect');
    const bugFixTextBox = document.getElementById('bugFixTextBox');

    if (bugFixTemplateButton && textArea) {
        const isTextAreaHidden = textArea.classList.contains('bz_default_hidden');

        // Handle button state
        if (isTextAreaHidden) {
            bugFixTemplateButton.classList.add('disabled');
            bugFixTemplateButton.style.pointerEvents = 'none';
            console.log('Bug Fix Template disabled');

            // Hide or disable the custom text box if necessary
            if (bugFixTextBox) {
                bugFixTextBox.style.display = 'none';
                bugFixTextBox.disabled = true;
            }
        } else {
            bugFixTemplateButton.classList.remove('disabled');
            bugFixTemplateButton.style.marginLeft = '0px';
            bugFixTemplateButton.style.background = '#E0E0E0';
            bugFixTemplateButton.style.color = 'black';
            bugFixTemplateButton.style.pointerEvents = 'auto';
            console.log('Bug Fix Template enabled');

            // Show or enable the custom text box
            if (bugFixTextBox) {
                bugFixTextBox.style.display = 'block';
                bugFixTextBox.disabled = false;
            }
        }
    } else {
        console.log('Bug Fix Template button or textarea not found for state update');
    }
}


    document.addEventListener('DOMContentLoaded', injectBugFixTemplateButton);
    window.addEventListener('load', () => {
        injectBugFixTemplateButton();
        window.stateCheckInterval = setInterval(updateBugFixTemplateState, 2000);
    });

    window.addEventListener('unload', () => {
        clearInterval(window.stateCheckInterval);
    });
})();