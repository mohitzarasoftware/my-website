const colorContainer = document.getElementById('color-container');
        const copyBtn = document.getElementById('copyBtn');
        let colorCount = 2; // Starting with 2 colors by default
        const maxColors = 5; // Max 5 colors

        // Function to update the gradient preview and CSS
        function updateGradient() {
            const text = document.getElementById('text-input').value;
            const colors = [];

            // Collect all the selected colors
            document.querySelectorAll('.color-input').forEach((input) => {
                colors.push(input.value);
                // Show HEX code next to color input
                input.nextElementSibling.textContent = input.value;
            });

            // Generate gradient CSS
            const gradientText = document.getElementById('gradient-text');
            gradientText.textContent = text;
            gradientText.style.background = `linear-gradient(to right, ${colors.join(', ')})`;
            gradientText.style.webkitBackgroundClip = 'text';
            gradientText.style.webkitTextFillColor = 'transparent';

            // Output the generated CSS
            const cssOutput = `
                background: linear-gradient(to right, ${colors.join(', ')});
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            `;
            document.getElementById('css-output').textContent = cssOutput.trim();
        }

        // Function to add a new color input box
        function addColorBox() {
            if (colorCount >= maxColors) return; // Limit to max 5 colors

            const colorBox = document.createElement('div');
            colorBox.classList.add('color-box', 'gradient-add-colors','d-flex', 'align-items-center', 'justify-content-between');
            colorBox.innerHTML = `
                <input type="color" class="color-input" value="#${Math.floor(Math.random()*16777215).toString(16)}" />
                <span class="hex-code">#000000</span>
                <button class="removeColorBtn remove-btn border-0 bg-transparent fw-bold"><i class="ri-close-line"></i></button>
            `;

            colorContainer.appendChild(colorBox);

            // Attach event listeners to the new input and remove button
            const colorInput = colorBox.querySelector('.color-input');
            const removeBtn = colorBox.querySelector('.removeColorBtn');

            colorInput.addEventListener('input', updateGradient);
            removeBtn.addEventListener('click', () => {
                if (colorCount > 2) { // Ensure a minimum of 2 colors
                    colorBox.remove();
                    colorCount--;
                    updateGradient();
                } else {
                    alert('At least two colors are required.');
                }
            });

            colorCount++;
            updateGradient();
        }

        // Function to copy the generated CSS to clipboard
        function copyToClipboard() {
            const cssOutput = document.getElementById('css-output').textContent;
            const textarea = document.createElement('textarea');
            textarea.value = cssOutput;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            alert("CSS copied to clipboard!");
        }

        // Add event listeners to input elements and copy button
        document.getElementById('text-input').addEventListener('input', updateGradient);
        document.getElementById('addColorBtn').addEventListener('click', addColorBox);
        copyBtn.addEventListener('click', copyToClipboard);

        // Initialize with 2 color boxes
        function initializeColors() {
            for (let i = 0; i < 2; i++) {
                addColorBox();
            }
        }

        // Initialize with default 2 colors
        initializeColors();