let colorCount = 2; // Starting with 2 colors
const maxColors = 5; // Maximum 5 colors
const colorContainer = document.getElementById('color-container');
const gradientBox = document.getElementById('gradient-box');
const cssCodeBox = document.getElementById('css-code');
const copyButton = document.getElementById('copy-btn');

const degreeKnob = document.getElementById('degree-knob');
const degreeHandle = document.getElementById('degree-handle');
let currentDegree = 90; // Default degree
const knobRadius = 35; // Half the size of the knob for positioning (smaller radius for mobile)

// Function to create a color input with hex code display
function createColorInput(id, value = '#000000') {
    const colorDiv = document.createElement('div');
    colorDiv.classList.add('d-flex', 'justify-content-between', 'gradient-add-colors', 'position-relative');

    const input = document.createElement('input');
    input.type = 'color';
    input.id = `color${id}`;
    input.value = value;
    input.classList.add('color-input');
    input.addEventListener('input', () => {
        hexInput.value = input.value; // Update hex code when color changes
        updateGradient();
    });

    // Hex code input
    const hexInput = document.createElement('input');
    hexInput.type = 'text';
    hexInput.classList.add('hex-code');
    hexInput.value = value; // Initially set to the color value
    hexInput.addEventListener('input', () => {
        const hexValue = hexInput.value;
        if (isValidHex(hexValue)) {
            input.value = hexValue; // Update color input when a valid hex code is entered
            updateGradient();
        }
    });

    // Close button to remove the color input with an icon
    const closeBtn = document.createElement('button');
    closeBtn.classList.add('remove-btn', 'border-0', 'bg-transparent', 'fw-bold');
    closeBtn.innerHTML = '<i class="ri-close-fill"></i>'; // Insert icon using innerHTML
    closeBtn.addEventListener('click', () => {
        if (colorContainer.children.length > 2) { // Ensure at least 2 colors remain
            colorDiv.remove();
            updateGradient();
        }
    });

    colorDiv.appendChild(input);
    colorDiv.appendChild(hexInput); // Add hex input next to the color picker
    colorDiv.appendChild(closeBtn);

    return colorDiv;
}

// Function to update the gradient background and CSS code
function updateGradient() {
    const colors = [...colorContainer.querySelectorAll('input[type="color"]')].map(input => input.value);
    const degree = currentDegree;
    const cssGradient = `linear-gradient(${degree}deg, ${colors.join(', ')})`;
    gradientBox.style.background = cssGradient;
    cssCodeBox.textContent = `background: ${cssGradient};`;
}

// Function to validate hex codes
function isValidHex(hex) {
    return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
}

// Function to position the degree handle based on the current degree
function updateHandlePosition(degree) {
    const radian = (degree - 90) * (Math.PI / 180); // Convert to radian and adjust to start from top
    const x = knobRadius + Math.cos(radian) * knobRadius; // x coordinate
    const y = knobRadius + Math.sin(radian) * knobRadius; // y coordinate
    degreeHandle.style.left = `${x - degreeHandle.offsetWidth / 2}px`;
    degreeHandle.style.top = `${y - degreeHandle.offsetHeight / 2}px`;
}

// Add initial 2 color inputs
for (let i = 1; i <= 2; i++) {
    colorContainer.appendChild(createColorInput(i, i === 1 ? '#ff0000' : '#0000ff'));
}

// Event listener for adding more colors
document.getElementById('add-color-btn').addEventListener('click', () => {
    if (colorContainer.children.length < maxColors) {
        const nextId = colorContainer.children.length + 1;
        colorContainer.appendChild(createColorInput(nextId));
    }
});

// Copy the generated CSS to clipboard
copyButton.addEventListener('click', () => {
    const cssCode = cssCodeBox.textContent;
    navigator.clipboard.writeText(cssCode).then(() => {
        alert("CSS code copied!");
    });
});

// Degree Knob interaction
let isDragging = false;
degreeHandle.addEventListener('mousedown', () => {
    isDragging = true;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

document.addEventListener('mousemove', (event) => {
    if (isDragging) {
        const rect = degreeKnob.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = event.clientX - centerX;
        const deltaY = event.clientY - centerY;
        const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        currentDegree = (angle + 90 + 360) % 360; // Adjust angle to range [0, 360]
        updateHandlePosition(currentDegree); // Update handle position
        updateGradient();
    }
});

// Initialize with the default gradient and handle position
updateHandlePosition(currentDegree);
updateGradient();
