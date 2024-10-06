const imageUpload = document.getElementById('imageUpload');
        const compressedImage = document.getElementById('compressedImage');
        const imageContainer = document.getElementById('imageContainer');
        const downloadBtn = document.getElementById('downloadBtn');
        const originalSizeText = document.getElementById('originalSize');
        const compressedSizeText = document.getElementById('compressedSize');
        const loader = document.getElementById('loader');
        const removeImageBtn = document.getElementById('removeImageBtn');

        imageUpload.addEventListener('change', () => {
            const file = imageUpload.files[0];
            if (!file) {
                alert('Please upload an image first.');
                return;
            }

            // Display original size
            const originalSizeKB = (file.size / 1024).toFixed(2); // in KB
            originalSizeText.textContent = `Original Size: ${originalSizeKB} KB`;

            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.src = event.target.result;

                img.onload = function() {
                    loader.style.display = 'block'; // Show loader

                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    
                    // Set canvas dimensions
                    canvas.width = img.width;
                    canvas.height = img.height;

                    // Draw the image on the canvas
                    ctx.drawImage(img, 0, 0);

                    // Compress the image (keep quality high)
                    canvas.toBlob((blob) => {
                        loader.style.display = 'none'; // Hide loader
                        const url = URL.createObjectURL(blob);
                        compressedImage.src = url;
                        imageContainer.style.display = 'block';
                        downloadBtn.style.display = 'flex';

                        // Display compressed size
                        const compressedSizeKB = (blob.size / 1024).toFixed(2); // in KB
                        compressedSizeText.textContent = `Compressed Size: ${compressedSizeKB} KB`;

                        // Set the download link
                        downloadBtn.href = url; // Update the download link to the compressed image
                        downloadBtn.download = 'compressed_image.jpg'; // Set the default file name
                    }, 'image/jpeg', 0.95); // Set to 'image/jpeg' with high quality of 0.95
                };
            };
            reader.readAsDataURL(file);
        });

        // Remove Image Button Event
        removeImageBtn.addEventListener('click', () => {
            compressedImage.src = '';
            imageContainer.style.display = 'none';
            downloadBtn.style.display = 'none';
            imageUpload.value = ''; // Reset the input file
            originalSizeText.textContent = '';
            compressedSizeText.textContent = '';
        });