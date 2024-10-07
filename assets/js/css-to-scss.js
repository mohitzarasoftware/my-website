 // Simple SCSS to CSS converter (simulated)
 function scssToCss(scss) {
    // Remove nesting and add brackets (basic simulation)
    return scss.replace(/\s*\{([^}]+)\}/g, ' { $1 }')
        .replace(/@mixin/g, '/* Mixin converted */')
        .replace(/@include/g, '/* Include converted */')
        .replace(/\$([a-zA-Z-_]+)/g, '/* Variable $1 */'); // Simple variable replacement
}

// Simple CSS to SCSS converter (simulated)
function cssToScss(css) {
    // Simulate nested SCSS from flat CSS
    return css.replace(/\}/g, '}').replace(/\{/g, '{');
}

// Convert SCSS to CSS
document.getElementById('convertToCSSBtn').addEventListener('click', () => {
    const scssInput = document.getElementById('scss-input').value;
    if (!scssInput) {
        alert('Please enter SCSS code!');
        return;
    }

    // Call the SCSS to CSS conversion function
    const convertedCSS = scssToCss(scssInput);

    // Display the result
    document.getElementById('formatted-output').textContent = convertedCSS.trim();
});

// Convert CSS to SCSS
document.getElementById('convertToSCSSBtn').addEventListener('click', () => {
    const cssInput = document.getElementById('css-input').value;
    if (!cssInput) {
        alert('Please enter CSS code!');
        return;
    }

    // Call the CSS to SCSS conversion function
    const convertedSCSS = cssToScss(cssInput);

    // Display the result
    document.getElementById('formatted-output').textContent = convertedSCSS.trim();
});