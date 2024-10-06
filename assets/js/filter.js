const image = document.getElementById('image');
const blur = document.getElementById('blur');
const brightness = document.getElementById('brightness');
const contrast = document.getElementById('contrast');
const grayscale = document.getElementById('grayscale');
const hueRotate = document.getElementById('hue-rotate');
const invert = document.getElementById('invert');
const opacity = document.getElementById('opacity');
const saturate = document.getElementById('saturate');
const sepia = document.getElementById('sepia');
const cssOutput = document.getElementById('css-output');
const copyButton = document.getElementById('copy-button');
const uploadImage = document.getElementById('upload-image');
const downloadButton = document.getElementById('download-button'); // Download button

// Default filter values
const defaultFilters = {
    blur: '0px',
    brightness: '100%',
    contrast: '100%',
    grayscale: '0%',
    hueRotate: '0deg',
    invert: '0%',
    opacity: '100%',
    saturate: '100%',
    sepia: '0%'
};

// Update the filters and CSS output
function updateFilters() {
    let filterValues = '';

    if (blur.value !== '0') filterValues += `blur(${blur.value}px) `;
    if (brightness.value !== '100') filterValues += `brightness(${brightness.value}%) `;
    if (contrast.value !== '100') filterValues += `contrast(${contrast.value}%) `;
    if (grayscale.value !== '0') filterValues += `grayscale(${grayscale.value}%) `;
    if (hueRotate.value !== '0') filterValues += `hue-rotate(${hueRotate.value}deg) `;
    if (invert.value !== '0') filterValues += `invert(${invert.value}%) `;
    if (opacity.value !== '100') filterValues += `opacity(${opacity.value}%) `;
    if (saturate.value !== '100') filterValues += `saturate(${saturate.value}%) `;
    if (sepia.value !== '0') filterValues += `sepia(${sepia.value}%) `;

    filterValues = filterValues.trim();
    image.style.filter = filterValues || 'none';
    cssOutput.textContent = filterValues ? `filter: ${filterValues};` : 'filter: none;';
}

// Copy CSS to clipboard
function copyToClipboard() {
    navigator.clipboard.writeText(cssOutput.textContent)
        .then(() => {
            alert("CSS copied to clipboard!");
        })
        .catch(err => {
            console.error("Error copying text: ", err);
        });
}

// Download the edited image
function downloadImage() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size to match image size
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;

    // Apply current filters to canvas
    ctx.filter = image.style.filter;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Convert the canvas to a downloadable image
    const link = document.createElement('a');
    link.href = canvas.toDataURL();
    link.download = 'edited-image.png';
    link.click();
}

// Event listeners for each filter
blur.addEventListener('input', updateFilters);
brightness.addEventListener('input', updateFilters);
contrast.addEventListener('input', updateFilters);
grayscale.addEventListener('input', updateFilters);
hueRotate.addEventListener('input', updateFilters);
invert.addEventListener('input', updateFilters);
opacity.addEventListener('input', updateFilters);
saturate.addEventListener('input', updateFilters);
sepia.addEventListener('input', updateFilters);
copyButton.addEventListener('click', copyToClipboard);
downloadButton.addEventListener('click', downloadImage); // Download event listener

// Image upload functionality
uploadImage.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            image.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Initialize with default settings
updateFilters();
