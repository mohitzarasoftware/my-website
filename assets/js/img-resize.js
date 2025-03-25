let originalWidth;
let originalHeight;
let originalImageType;

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('imagePreview');
            img.src = e.target.result;
            img.style.display = 'block';  // Show image preview
            img.onload = function() {
                originalWidth = img.width;
                originalHeight = img.height;
                originalImageType = file.type;  // Store original image type
                document.getElementById('width').value = originalWidth;
                document.getElementById('height').value = originalHeight;
                displaySizeInfo(originalWidth, originalHeight, originalWidth, originalHeight);
            };
        };
        reader.readAsDataURL(file);
    }
});

// Event listener for width and height changes
document.getElementById('width').addEventListener('input', function() {
    const newWidth = this.value;
    const aspectRatio = originalHeight / originalWidth;

    if (document.getElementById('maintainAspectRatio').checked) {
        const newHeight = Math.round(newWidth * aspectRatio);
        document.getElementById('height').value = newHeight;
        displaySizeInfo(originalWidth, originalHeight, newWidth, newHeight);
    } else {
        displaySizeInfo(originalWidth, originalHeight, newWidth, document.getElementById('height').value);
    }
});

document.getElementById('height').addEventListener('input', function() {
    const newHeight = this.value;
    const aspectRatio = originalWidth / originalHeight;

    if (document.getElementById('maintainAspectRatio').checked) {
        const newWidth = Math.round(newHeight * aspectRatio);
        document.getElementById('width').value = newWidth;
        displaySizeInfo(originalWidth, originalHeight, newWidth, newHeight);
    } else {
        displaySizeInfo(originalWidth, originalHeight, document.getElementById('width').value, newHeight);
    }
});

function downloadImage() {
    const widthInput = document.getElementById('width').value;
    const heightInput = document.getElementById('height').value;
    const img = document.getElementById('imagePreview');
    const outputImage = document.getElementById('outputImage');

    // Set the dimensions for the output image
    if (widthInput && heightInput) {
        outputImage.src = img.src;  // Set the same source
        outputImage.style.display = 'block';  // Show output image
        outputImage.width = widthInput;  // Set the width
        outputImage.height = heightInput;  // Set the height

        // Create a download link for the resized image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = widthInput;
        canvas.height = heightInput;

        const imgElement = new Image();
        imgElement.src = img.src;
        imgElement.onload = function() {
            ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
            const link = document.createElement('a');
            link.href = canvas.toDataURL(originalImageType);  // Use original image type for download
            link.download = 'resized-image.' + originalImageType.split('/')[1];
            link.click();

            // Calculate and display the compressed size
            const compressedSize = Math.round((canvas.toDataURL(originalImageType).length * 3) / 4 / 1024); // size in KB
            document.getElementById('compressedSize').innerText = compressedSize + ' KB';
            document.getElementById('imageInfo').classList.remove('d-none'); // Show image info
        };
    }
}

function displaySizeInfo(originalWidth, originalHeight, newWidth = '', newHeight = '') {
    const originalSizeElement = document.getElementById('originalSize');
    originalSizeElement.innerText = `${originalWidth}px x ${originalHeight}px`;

    // Calculate the compressed size based on new dimensions
    const compressedSize = newWidth && newHeight ? Math.round((newWidth * newHeight * 4) / 1024) : 'N/A';
    document.getElementById('compressedSize').innerText = compressedSize + ' KB';
    document.getElementById('imageInfo').classList.remove('d-none'); // Show image info
}
