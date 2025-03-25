let cropper;
let originalImageWidth; // Variable to store the original image width
let originalImageHeight; // Variable to store the original image height

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.getElementById('imagePreview');
            img.src = e.target.result;
            img.style.display = 'block';  // Show image preview

            // Initialize Cropper.js
            if (cropper) {
                cropper.destroy();  // Destroy previous cropper instance
            }
            cropper = new Cropper(img, {
                aspectRatio: NaN, // Adjust aspect ratio as needed
                viewMode: 1,
                autoCropArea: 1,
                ready: function () {
                    // Store original image dimensions
                    originalImageWidth = img.naturalWidth;
                    originalImageHeight = img.naturalHeight;
                    // Display original size
                    document.getElementById('originalSize').innerText = `${originalImageWidth} x ${originalImageHeight}`;
                }
            });

            // Show crop button and remove button
            document.getElementById('cropBtn').style.display = 'inline';
            document.getElementById('removeBtn').style.display = 'inline';
            document.getElementById('imageInfo').classList.remove('d-none'); // Show image info section
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('cropBtn').addEventListener('click', function() {
    if (cropper) {
        const canvas = cropper.getCroppedCanvas();
        const outputImage = document.getElementById('outputImage');
        outputImage.src = canvas.toDataURL();
        outputImage.style.display = 'block';

        // Get cropped image dimensions
        const croppedWidth = canvas.width;
        const croppedHeight = canvas.height;

        // Display compressed size
        const compressedSize = canvas.toDataURL().length; // Length of the base64 encoded string
        const sizeInKB = (compressedSize / 1024).toFixed(2); // Convert to KB
        document.getElementById('compressedSize').innerText = `${croppedWidth} x ${croppedHeight} (${sizeInKB} KB)`;

        // Show download button
        document.getElementById('downloadBtn').style.display = 'inline';
    }
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const outputImage = document.getElementById('outputImage');
    const link = document.createElement('a');
    link.href = outputImage.src;
    link.download = 'cropped-image.png';
    link.click();
});

// Add event listener for remove button
document.getElementById('removeBtn').addEventListener('click', function() {
    // Hide the image preview and reset cropper
    const img = document.getElementById('imagePreview');
    img.src = '';
    img.style.display = 'none';  // Hide image preview
    if (cropper) {
        cropper.destroy();  // Destroy cropper instance
        cropper = null;  // Reset cropper variable
    }

    // Hide output image and buttons
    const outputImage = document.getElementById('outputImage');
    outputImage.src = '';
    outputImage.style.display = 'none';

    // Hide buttons
    document.getElementById('cropBtn').style.display = 'none';
    document.getElementById('downloadBtn').style.display = 'none';
    document.getElementById('removeBtn').style.display = 'none'; // Hide remove button
    document.getElementById('fileInput').value = ''; // Clear file input

    // Reset size display
    document.getElementById('originalSize').innerText = '';
    document.getElementById('compressedSize').innerText = '';
    document.getElementById('imageInfo').classList.add('d-none'); // Hide image info section
});
