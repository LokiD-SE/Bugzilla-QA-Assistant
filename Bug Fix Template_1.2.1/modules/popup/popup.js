document.addEventListener('DOMContentLoaded', () => {
    const proceedButton = document.getElementById('proceedButton');

    proceedButton.addEventListener('click', async () => {
        // Check for existing user data in storage
        chrome.storage.local.get(['username', 'token'], async (result) => {
            const username = result.username;
            const token = result.token;

            if (username && token) {
                // User data exists, hit API to verify
                const userData = await checkUserDetails(username, token);

                if (userData) {
                    // Successful API response, navigate to home page
                    navigateTo('/modules/home/home.html');
                } else {
                    // Unsuccessful API response, navigate to setup
                    navigateTo('/modules/setup/setup.html');
                }
            } else {
                // No user data, navigate to setup
                navigateTo('/modules/setup/setup.html');
            }
        });
    });
});

// Function to check user details via API
async function checkUserDetails(username, token) {
    try {
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
        return userData; // Successful response
    } catch (err) {
        console.error('Failed to fetch user info:', err);
        return null; // Indicate failure
    }
}

// Function to navigate to a page
function navigateTo(page) {
    window.location.href = page;
}