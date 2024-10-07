const textPreview = document.getElementById('text-preview');
    const customText = document.getElementById('custom-text');
    const hShadow = document.getElementById('h-shadow');
    const vShadow = document.getElementById('v-shadow');
    const blurRadius = document.getElementById('blur-radius');
    const shadowColor = document.getElementById('shadow-color');
    const cssOutput = document.getElementById('css-output');
    const copyButton = document.getElementById('copy-button');

    // Update the text shadow and CSS output
    function updateShadow() {
        const h = hShadow.value;
        const v = vShadow.value;
        const blur = blurRadius.value;
        const color = shadowColor.value;
        textPreview.style.textShadow = `${h}px ${v}px ${blur}px ${color}`;

        // Generate the CSS code
        cssOutput.textContent = `text-shadow: ${h}px ${v}px ${blur}px ${color};`;
    }

    // Update the text content
    function updateText() {
        textPreview.textContent = customText.value;
    }

    // Copy CSS code to clipboard
    function copyToClipboard() {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(cssOutput.textContent)
                .then(() => {
                    alert("CSS copied to clipboard!");
                })
                .catch(err => {
                    console.error("Error copying text: ", err);
                });
        } else {
            alert("Clipboard API not supported in this browser.");
        }
    }

    // Event listeners
    hShadow.addEventListener('input', updateShadow);
    vShadow.addEventListener('input', updateShadow);
    blurRadius.addEventListener('input', updateShadow);
    shadowColor.addEventListener('input', updateShadow);
    customText.addEventListener('input', updateText);
    copyButton.addEventListener('click', copyToClipboard);

    // Initialize default settings
    updateShadow();
    updateText();