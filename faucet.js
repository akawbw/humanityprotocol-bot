const axios = require('axios');

async function claimTokens() {
    const url = 'https://faucet.testnet.humanity.org/api/claim';

    // Replace this with the actual Ethereum address you want to use
    const payload = {
        address: "0xde2DbBD06b55b6c9A1893d99c8760dDb912411a0"
    };

    // Custom headers (add or modify as needed)
    const headers = {
        'Content-Type': 'application/json',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        // Add other headers if necessary
    };

    try {
        // Make the POST request
        const response = await axios.post(url, payload, { headers });
        
        // Log the response from the server
        console.log("Response Status:", response.status);
        console.log("Response Data:", response.data);
    } catch (error) {
        // Handle any errors
        if (error.response) {
            console.error("Error Response Status:", error.response.status);
            console.error("Error Response Data:", error.response.data);
        } else {
            console.error("Error:", error.message);
        }
    }
}

// Call the function to trigger the automation
claimTokens();
