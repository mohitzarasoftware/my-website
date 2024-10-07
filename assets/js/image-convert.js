const imageUpload = document.getElementById('imageUpload');
    const formatSelector = document.getElementById('formatSelector');
    const convertBtn = document.getElementById('convertBtn');
    const removeBtn = document.getElementById('removeBtn'); // Remove button reference
    const uploadedImagePreview = document.getElementById('uploadedImagePreview');
    const convertedImagePreview = document.getElementById('convertedImagePreview');
    const downloadLink = document.getElementById('downloadLink');

    let uploadedImage = null;

    // Handle image upload and display uploaded image in the first preview
    imageUpload.addEventListener('change', (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          uploadedImage = new Image();
          uploadedImage.src = e.target.result;
          uploadedImage.onload = function () {
            // Display the uploaded image in the first preview area
            uploadedImagePreview.src = uploadedImage.src;
            uploadedImagePreview.style.display = 'block'; // Show uploaded image
            removeBtn.classList.remove('d-none'); // Show remove button
          };
          uploadedImage.onerror = function () {
            alert('Failed to load uploaded image.');
          };
        };
        reader.readAsDataURL(file);
      }
    });

    // Convert the image and display it in the second preview area
    convertBtn.addEventListener('click', () => {
      if (!uploadedImage) {
        alert('Please upload an image first!');
        return;
      }

      const format = formatSelector.value;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      canvas.width = uploadedImage.width;
      canvas.height = uploadedImage.height;
      ctx.drawImage(uploadedImage, 0, 0);

      const convertedImage = canvas.toDataURL(`image/${format}`);

      // Display the converted image in the second preview area
      convertedImagePreview.src = convertedImage;
      convertedImagePreview.style.display = 'block'; // Show converted image

      // Set up the download link for the converted image
      downloadLink.href = convertedImage;
      downloadLink.download = `converted-image.${format}`;
      downloadLink.classList.remove('hidden');
      downloadLink.textContent = `Download Converted Image as ${format.toUpperCase()}`;
    });

    // Remove image and reset everything
    removeBtn.addEventListener('click', () => {
      uploadedImage = null;
      uploadedImagePreview.src = '#';
      uploadedImagePreview.style.display = 'none'; // Hide uploaded image
      convertedImagePreview.src = '#';
      convertedImagePreview.style.display = 'none'; // Hide converted image
      downloadLink.classList.add('hidden'); // Hide download link
      removeBtn.classList.add('d-none'); // Hide remove button
      imageUpload.value = ''; // Reset file input
    });