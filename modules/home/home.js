document.addEventListener('DOMContentLoaded', () => {
    const welcomeMessage = document.getElementById('welcomeMessage');
    const repoSelection = document.getElementById('repoSelection');
    const logoutButton = document.getElementById('logoutButton');
    const status = document.createElement('div'); // Temporary status div for errors
    status.id = 'status';
    document.querySelector('.home-container').appendChild(status);

    // Fetch username from storage and set welcome message
    chrome.storage.local.get(['username'], (result) => {
        const username = result.username;
        welcomeMessage.textContent = username ? `Welcome ${username}` : 'Welcome';
    });

    // Fetch and populate repositories
    async function fetchRepositories() {
        chrome.storage.local.get(['username', 'token', 'workspace', 'repositories', 'repoName', 'prApi'], async (result) => {
            const username = result.username;
            const token = result.token;
            const workspace = result.workspace || 'bizom'; // Updated to match JSON workspace slug

            if (!username || !token) {
                status.textContent = 'No user credentials found. Please log in.';
                return;
            }

            try {
                // Validate user with Bitbucket API
                const credentials = btoa(`${username}:${token}`);
                
                // Fetch repositories if user is validated
                const repoResponse = await fetch(`https://api.bitbucket.org/2.0/repositories/bizom`, {
                    headers: {
                        'Authorization': `Basic ${credentials}`,
                        'Accept': 'application/json'
                    }
                });

                if (!repoResponse.ok) {
                    throw new Error(`Error ${repoResponse.status}: ${repoResponse.statusText}`);
                }

                const data = await repoResponse.json();
                const repos = data.values.map(repo => ({
                    name: repo.name,
                    full_name: repo.full_name,
                    prApi: repo.links.pullrequests.href
                }));
                chrome.storage.local.set({ repositories: repos }, () => {
                    populateRadioButtons(repos, result.repoName, result.prApi);
                });
            } catch (err) {
                console.error('Failed to fetch data:', err);
                status.textContent = `Failed to fetch data: ${err.message}`;
            }
        });
    }

    // Populate radio buttons
    function populateRadioButtons(repos, selectedRepoName, selectedPrApi) {
        repoSelection.innerHTML = '';
        repos.forEach(repo => {
            const div = document.createElement('div');
            const radio = document.createElement('input');
            radio.type = 'radio';
            radio.name = 'repo';
            radio.value = repo.full_name;
            radio.id = `repo-${repo.full_name.replace(/\//g, '-')}`;
            radio.checked = selectedRepoName === repo.full_name;

            const label = document.createElement('label');
            label.htmlFor = radio.id;
            label.textContent = repo.name;

            div.appendChild(radio);
            div.appendChild(label);
            repoSelection.appendChild(div);

            radio.addEventListener('change', () => {
                if (radio.checked) {
                    chrome.storage.local.set({
                        repoName: repo.full_name,
                        prApi: repo.prApi
                    }, () => {
                        console.log('Selected repository:', repo.full_name, 'PR API:', repo.prApi);
                    });
                }
            });
        });
    }

    // Initial fetch and populate
    fetchRepositories();

    // Logout functionality
    logoutButton.addEventListener('click', () => {
        chrome.storage.local.remove(['username', 'token', 'repoName', 'prApi', 'repositories'], () => {
            window.location.href = '/modules/popup/popup.html';
        });
    });
});