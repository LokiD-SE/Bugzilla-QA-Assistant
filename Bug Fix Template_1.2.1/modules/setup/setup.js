document.addEventListener('DOMContentLoaded', () => {
    const usernameInput = document.getElementById('username');
    const tokenInput = document.getElementById('token');
    const geminitokenInput = document.getElementById('geminitoken');
    const linkButton = document.getElementById('linkButton');
    const status = document.getElementById('status'); // Assuming status div exists

    linkButton.addEventListener('click', async () => {
        // Get and trim inputs
        let username = usernameInput.value.trim();
        let token = tokenInput.value.trim();
        let geminitoken = geminitokenInput.value.trim();

        // Check for internal whitespace
        if (
            (username && username.includes(' ')) ||
            (token && token.includes(' ')) ||
            (geminitoken && geminitoken.includes(' '))
        ) {
            status.textContent = 'Fields must not contain empty spaces.';
            return;
        }

        // If only geminitoken is provided
        if (!username && !token && geminitoken) {
            chrome.storage.local.set({ geminitoken }, () => {
                // Navigate to home page
                window.location.href = '/modules/home/home.html';
            });
            return;
        }

        // If username or token is missing (but geminitoken is present or not)
        if (!username || !token) {
            status.textContent = 'Please enter both username and token, or only gemini token.';
            return;
        }

        try {
            // Create Basic Auth credentials
            const credentials = btoa(`${username}:${token}`);

            const response = await fetch('https://api.bitbucket.org/2.0/user', {
                headers: {
                    'Authorization': `Basic ${credentials}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }

            const userData = await response.json();
            console.log('User Info:', userData);

            // Save all available data
            chrome.storage.local.set({ username, token, geminitoken }, () => {
                // Navigate to home page
                window.location.href = '/modules/home/home.html';
            });
        } catch (err) {
            console.error('Failed to fetch user info:', err);
            status.textContent = `Failed to fetch user info: ${err.message}`;
        }
    });
});
