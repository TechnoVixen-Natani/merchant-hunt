// storage.js - Core Database & Safety Module

const DB_NAME = 'merchant_hunt_db';

// 1. Initialize the local database
function initDB() {
    try {
        if (!localStorage.getItem(DB_NAME)) {
            localStorage.setItem(DB_NAME, JSON.stringify([]));
            console.log("Database initialized.");
        }
    } catch (e) {
        console.error("Storage init failed:", e);
    }
}

// 2. Load data with an ironclad safety net (Prevents the Bolt.ai crash)
function loadData() {
    try {
        const data = localStorage.getItem(DB_NAME);
        if (!data) return [];
        return JSON.parse(data);
    } catch (e) {
        console.error("⚠️ Data Corruption Detected. Bypassing crash.", e);
        // If data is corrupted, we return an empty array so the app stays alive
        return [];
    }
}

// 3. Save a new receipt entry safely
function saveReceipt(storeName, amount, itemTags = []) {
    try {
        const currentData = loadData();
        
        const newReceipt = {
            id: Date.now().toString(),
            timestamp: new Date().toISOString(),
            store: storeName,
            amount: parseFloat(amount).toFixed(2),
            tags: itemTags
        };

        currentData.push(newReceipt);
        localStorage.setItem(DB_NAME, JSON.stringify(currentData));
        console.log("Receipt saved:", newReceipt);
        return true;
    } catch (e) {
        console.error("Failed to save receipt:", e);
        return false;
    }
}

// 4. Calculate total spent for the insight card
function calculateTotal() {
    const data = loadData();
    let total = 0;
    data.forEach(receipt => {
        if (receipt.amount && !isNaN(receipt.amount)) {
            total += parseFloat(receipt.amount);
        }
    });
    return total.toFixed(2);
}

// Run initialization immediately when the file loads
initDB();