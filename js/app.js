// app.js - Main Application Logic & UI Rendering

let currentFilter = 'ALL';
let searchQuery = '';

document.addEventListener('DOMContentLoaded', () => {
    renderUI();
    
    const dateDisplay = document.getElementById('currentDateDisplay');
    if (dateDisplay) {
        const today = new Date();
        dateDisplay.innerText = today.toLocaleDateString();
    }

    // Wire up the Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.innerText;
            renderUI();
        });
    });

    // Wire up the Search Bar
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            searchQuery = e.target.value.toLowerCase();
            renderUI();
        });
    }
});

function processReceiptImage(base64Data) {
    console.log("Image received for processing. Length:", base64Data.length);
    
    setTimeout(() => {
        const storeName = prompt("Receipt Processed. Please verify the Merchant Name:", "Unknown Merchant");
        if (storeName === null) return; 

        const amountStr = prompt("Please verify the Total Amount Spent (e.g., 24.99):", "0.00");
        if (amountStr === null) return;

        const amount = parseFloat(amountStr);
        if (isNaN(amount)) {
            alert("Error: Invalid number entered for the amount. Receipt not saved.");
            return;
        }

        const success = saveReceipt(storeName, amount, ['scanned']);
        if (success) renderUI();

    }, 500); 
}

function renderUI() {
    let data = loadData();
    const now = new Date();

    // 1. Apply Time Filters
    if (currentFilter === 'WEEKLY') {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(now.getDate() - 7);
        data = data.filter(receipt => new Date(receipt.timestamp) >= oneWeekAgo);
    } else if (currentFilter === 'MONTHLY') {
        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(now.getMonth() - 1);
        data = data.filter(receipt => new Date(receipt.timestamp) >= oneMonthAgo);
    }

    // 2. Apply Search Filter
    if (searchQuery.trim() !== '') {
        data = data.filter(receipt => receipt.store.toLowerCase().includes(searchQuery));
    }

    // 3. Calculate dynamic total for whatever is currently visible
    let total = 0;
    data.forEach(receipt => {
        if (receipt.amount && !isNaN(receipt.amount)) {
            total += parseFloat(receipt.amount);
        }
    });

    const totalElement = document.getElementById('totalSpent');
    if (totalElement) {
        totalElement.innerText = '$' + total.toFixed(2);
    }

    const logContainer = document.getElementById('receiptLog');
    if (!logContainer) return;

    logContainer.innerHTML = ''; 

    if (data.length === 0) {
        logContainer.innerHTML = '<div style="color: var(--text-muted); text-align: center; padding: 20px;">No receipts found.</div>';
        return;
    }

    // 4. Draw each visible receipt
    data.slice().reverse().forEach(receipt => {
        const dateObj = new Date(receipt.timestamp);
        const dateStr = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        const itemHtml = `
            <div class="receipt-item">
                <div class="receipt-info">
                    <h4>${receipt.store}</h4>
                    <span>${dateStr}</span>
                </div>
                <div class="receipt-amount" style="color: var(--neon-purple);">
                    $${parseFloat(receipt.amount).toFixed(2)}
                </div>
            </div>
        `;
        logContainer.innerHTML += itemHtml;
    });
}

// --- CSV EXPORT LOGIC ---
document.getElementById('exportBtn').addEventListener('click', function() {
    const data = loadData(); 
    if (data.length === 0) {
        alert("No receipts to export yet!");
        return;
    }

    let csvContent = "Date,Merchant,Amount\n";

    data.forEach(receipt => {
        const dateObj = new Date(receipt.timestamp);
        const dateStr = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        csvContent += `"${dateStr}","${receipt.store}","${receipt.amount}"\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    
    link.setAttribute("href", url);
    link.setAttribute("download", "Merchant_Hunt_Export.csv");
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});