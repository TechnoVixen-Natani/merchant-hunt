// camera.js - Image Acquisition Module

// We wait for the DOM to load before attaching events
document.addEventListener('DOMContentLoaded', () => {
    const cameraInput = document.getElementById('cameraInput');
    const uploadInput = document.getElementById('uploadInput');

    // Handle direct camera capture
    if (cameraInput) {
        cameraInput.addEventListener('change', function(event) {
            handleImageAcquisition(event, 'Camera');
        });
    }

    // Handle file upload (the high-res pre-scanned receipt)
    if (uploadInput) {
        uploadInput.addEventListener('change', function(event) {
            handleImageAcquisition(event, 'Upload');
        });
    }
});

// Main function to process the acquired image file
function handleImageAcquisition(event, source) {
    const file = event.target.files[0];
    if (!file) {
        console.log(`[${source}] No image selected.`);
        return;
    }

    console.log(`[${source}] Image acquired:`, file.name, `(${(file.size / 1024).toFixed(2)} KB)`);

    // Create a FileReader to convert the image into a Base64 data string
    const reader = new FileReader();
    
    reader.onload = function(e) {
        const base64ImageData = e.target.result;
        
        // This is the hand-off. We pass the image data to our app logic to be processed.
        // We will build processReceiptImage() in our app.js file next.
        if (typeof processReceiptImage === 'function') {
            console.log("Handing image off to processing module...");
            processReceiptImage(base64ImageData);
        } else {
            console.error("Processing module not found!");
        }
    };

    reader.onerror = function() {
        console.error("Error reading the image file.");
        alert("System Error: Could not read the image file. Please try again.");
    };

    // Start reading the file
    reader.readAsDataURL(file);
    
    // Reset the inputs so the user can scan the exact same file again if needed
    event.target.value = '';
}