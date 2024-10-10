const imageInput = document.getElementById('imageInput');
const imageContainer = document.getElementById('imageContainer');
const uploadedImage = document.getElementById('uploadedImage');
const removeImage = document.getElementById('removeImage');
const originalSizeElement = document.getElementById('originalSize');
const compressedSizeElement = document.getElementById('compressedSize');
const downloadLink = document.getElementById('downloadLink');
const imageInfo = document.getElementById('imageInfo');
const imagePreview = document.getElementById('imagePreview');

let canvas = document.createElement('canvas');
let originalFileSize = 0;

imageInput.addEventListener('change', function (event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();
        originalFileSize = (file.size / 1024).toFixed(2); // Size in KB

        reader.onload = function (e) {
            const img = new Image();
            img.src = e.target.result;
            uploadedImage.src = img.src; // Display image in preview
            imageContainer.style.display = "block";
            imagePreview.classList.remove('d-none');
            removeImage.classList.remove('d-none');
            removeImage.classList.add('d-flex'); // Add d-flex to display the remove button

            img.onload = function () {
                const ctx = canvas.getContext('2d');
                const MAX_WIDTH = 800; // Set a max width for the compressed image
                const scaleSize = MAX_WIDTH / img.width;
                canvas.width = MAX_WIDTH;
                canvas.height = img.height * scaleSize;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Compress image
                const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); // Compression quality (0.7)
                
                // Convert compressed dataURL to Blob for size comparison and download
                fetch(compressedDataUrl)
                    .then(res => res.blob())
                    .then(blob => {
                        const compressedFileSize = (blob.size / 1024).toFixed(2); // Compressed size in KB
                        downloadLink.href = URL.createObjectURL(blob); // Provide download link

                        // Show original and compressed sizes
                        originalSizeElement.textContent = `${originalFileSize} KB`;
                        compressedSizeElement.textContent = `${compressedFileSize} KB`;
                        imageInfo.classList.remove('d-none');
                    });
            };
        };

        reader.readAsDataURL(file);
    }
});

removeImage.addEventListener('click', function () {
    imageInput.value = "";
    imageContainer.style.display = "none";
    imageInfo.classList.add('d-none');
    downloadLink.classList.add('done');
    removeImage.classList.remove('d-flex'); // Remove d-flex class when hidden
    removeImage.classList.add('d-none'); // Add d-none to hide the button
});
