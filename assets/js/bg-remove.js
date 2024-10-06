const imageUpload = document.getElementById('imageUpload');
const uploadedImage = document.getElementById('uploadedImage');
const loader = document.getElementById('loader');
const imageContainer = document.getElementById('imageContainer');
const downloadBtn = document.getElementById('downloadBtn');
const removeBtn = document.getElementById('removeBtn'); // Get the remove button

// Show image preview and remove background immediately after uploading
imageUpload.addEventListener('change', function() {
    const file = imageUpload.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            // Show image container and set the uploaded image
            imageContainer.style.display = 'block';
            uploadedImage.src = event.target.result;
            
            // Show loader while processing
            loader.style.display = 'block';
            uploadedImage.style.display = 'none'; // Hide original image

            const formData = new FormData();
            formData.append('image_file', file);

            // Example using Remove.bg API (replace 'YOUR_API_KEY' with your actual API key)
            fetch('https://api.remove.bg/v1.0/removebg', {
                method: 'POST',
                headers: {
                    'X-Api-Key': 'F6wLRPuSzAcDJVwjuMWxvSLq', // Replace with your own API key
                },
                body: formData
            })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.blob();
            })
            .then(blob => {
                // Hide the loader
                loader.style.display = 'none';

                // Show the processed image
                const imgURL = URL.createObjectURL(blob);
                uploadedImage.src = imgURL;
                uploadedImage.style.display = 'block'; // Show new image
                imageContainer.classList.add('transparent-bg'); // Add transparent background pattern
                
                downloadBtn.style.display = 'flex'; // Show download button
                removeBtn.style.display = 'flex'; // Show remove button
            })
            .catch(err => {
                loader.style.display = 'none'; // Hide the loader in case of error
                alert('Error processing the image. Please try again.');
                console.error(err);
            });
        };
        reader.readAsDataURL(file);
    }
});

// Download the processed image
downloadBtn.addEventListener('click', function() {
    const imageSrc = uploadedImage.src;
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'processed_image.png'; // Name of the downloaded file
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});

// Remove the uploaded image and reset input
removeBtn.addEventListener('click', function() {
    uploadedImage.src = ''; // Clear the image
    imageContainer.style.display = 'none'; // Hide the container
    imageUpload.value = ''; // Reset file input
    downloadBtn.style.display = 'none'; // Hide download button again
    removeBtn.style.display = 'none'; // Hide remove button again
});
