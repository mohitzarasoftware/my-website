const box = document.getElementById('transform-box');
const rotate = document.getElementById('rotate');
const scaleX = document.getElementById('scaleX');
const scaleY = document.getElementById('scaleY');
const skewX = document.getElementById('skewX');
const skewY = document.getElementById('skewY');
const translateX = document.getElementById('translateX');
const translateY = document.getElementById('translateY');
const cssOutput = document.getElementById('css-output');
const copyButton = document.getElementById('copy-button');

// Update the transform and CSS code
function updateTransform() {
    const r = rotate.value;
    const sX = scaleX.value;
    const sY = scaleY.value;
    const skX = skewX.value;
    const skY = skewY.value;
    const tX = translateX.value;
    const tY = translateY.value;

    const transformValue = `rotate(${r}deg) scale(${sX}, ${sY}) skew(${skX}deg, ${skY}deg) translate(${tX}px, ${tY}px)`;

    // Apply the transform to the box
    box.style.transform = transformValue;

    // Update the generated CSS code
    cssOutput.textContent = `transform: ${transformValue};`;
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

// Event listeners
rotate.addEventListener('input', updateTransform);
scaleX.addEventListener('input', updateTransform);
scaleY.addEventListener('input', updateTransform);
skewX.addEventListener('input', updateTransform);
skewY.addEventListener('input', updateTransform);
translateX.addEventListener('input', updateTransform);
translateY.addEventListener('input', updateTransform);
copyButton.addEventListener('click', copyToClipboard);

// Initialize with default settings
updateTransform();