const puppeteer = require('puppeteer');
const axios = require('axios');

// Replace with a valid fake email for testing
const fakeEmail = "fakeemail123@example.com";

async function automateRegistration() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    try {
        // Increase timeout to 60 seconds and wait for a specific element instead of the whole page
        console.log("Navigating to the registration page...");
        await page.goto('https://testnet.humanity.org/login?ref=dasarpemulung', { waitUntil: 'networkidle2', timeout: 60000 });
        
        // Wait for the email input field to be visible (Adjust selector as needed)
        await page.waitForSelector('input[name="email"]', { timeout: 60000 });
        
        console.log("Filling registration form...");
        await page.type('input[name="email"]', fakeEmail);

        // Click the submit button (Adjust selector as needed)
        await page.click('button[type="submit"]');
        
        // Wait for a successful response or next page load
        await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });

        console.log("Registration completed.");
    } catch (error) {
        console.error("Error during registration: ", error);
    } finally {
        await browser.close();
    }
}


async function postPayload() {
    const payload = {
        attributed_client_id: 1,
        email: fakeEmail,
        honeypot_activated: false,
        method: "email",
        recaptcha_token: "your_valid_recaptcha_token", // Ensure this token is valid
        session: "your_valid_session" // Ensure this session is valid
    };

    try {
        const response = await axios.post('https://terminal3.humanity.org/api/user/connect', payload, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log("Payload posted successfully:", response.data);
    } catch (error) {
        // Log the full error response to inspect what the server returns
        if (error.response) {
            console.error("Error details:", error.response.data);
        } else {
            console.error("Error posting payload: ", error);
        }
    }
}


(async () => {
    await automateRegistration();
    await postPayload();
})();
