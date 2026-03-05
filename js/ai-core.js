// THE MERCHANT HUNT AI CORE
const MERCHANT_DATA = []; // We will fill this with your JSON data later

async function huntMerchant(query) {
    const API_KEY = 'AIzaSyBAIWHXMRmd96IXjf9YcZ2UhjP9JsWm8f8'; // Secure this later!
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

    const systemPrompt = `
        You are the Elden Ring Merchant Hunter. 
        Your goal is to help the player find specific items or merchants.
        Base your answers ONLY on this data: ${JSON.stringify(MERCHANT_DATA)}.
        If an item isn't in the data, tell them it's "not in the current manifest."
        Keep answers short, technical, and formatted for a PWA screen.
    `;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `${systemPrompt}\n\nUser Question: ${query}` }] }]
            })
        });

        const data = await response.json();
        return data.candidates[0].content.parts[0].text;
    } catch (error) {
        return "⚠️ Logic Error: AI connection failed. Check your API key.";
    }
}