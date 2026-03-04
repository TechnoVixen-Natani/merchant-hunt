# 💳 Merchant Hunt | AI Receipt Processor

Merchant Hunt is a highly modular, lightweight, front-end web application designed for forensic financial tracking. It was built from scratch with a strict "measure twice, cut once" philosophy to ensure absolute data purity and zero fatal crashes.

## 🎯 The Philosophy
Many modern web apps suffer from bloated UI and fragile data parsing. Merchant Hunt takes a different approach:
* **Modular Architecture:** The core logic is split into isolated modules (`storage.js`, `camera.js`, `app.js`). If one module encounters an error, the app stays alive.
* **Sensory-Friendly Design:** Built with a high-contrast, dark-mode aesthetic (neon purple and blue) to reduce eye strain during data entry.
* **Absolute Data Control:** No forced cloud databases. All data is written securely to your local browser storage until you choose to export it.

## ✨ Features
* **Simulated AI Verification:** Uses a high-precision prompt system for version 1.0 to ensure text extracted from receipts is manually verified before saving, eliminating corrupted data.
* **Ironclad Local Storage:** Built-in safety nets catch corrupted data strings so the app never crashes on load.
* **Dynamic Filtering:** Instantly sort your secure history by ALL, MONTHLY, or WEEKLY views.
* **Live Search:** Filter your logs by specific merchants in real-time.
* **Forensic CSV Export:** One-click download of your entire receipt history, perfectly formatted by Date, Merchant, and Amount for spreadsheet analysis.

## 🚀 How to Use (GitHub Pages)
Since this app runs entirely on the front end, deployment is instant:
1. Fork or clone this repository.
2. Ensure your folder structure maintains the `js/` directory.
3. Turn on GitHub Pages pointing to the `main` branch.
4. Open the live URL on your desktop or mobile device.

## 🛠️ Future Roadmap (v2.0)
* Integration of a literal OCR (Optical Character Recognition) API to automate text extraction.
* A dedicated Settings (`⚙️`) menu for API key management and a "Nuke Data" protocol.

---
*Built for accuracy. Designed for focus.*# merchant-hunt
receipt tracker for dispensaries, to help me keep track for tax purposes
