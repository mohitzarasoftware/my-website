 // Function to format HTML code
 function formatHTML(html) {
    let formatted = '';
    let indentLevel = 0;
    const indentSize = 4; // Number of spaces for each indent

    // Add indentation and line breaks based on tag structure
    html.split(/>\s*</).forEach(element => {
        if (element.match(/^\/\w/)) {
            // Closing tag, reduce indent
            indentLevel -= 1;
        }

        formatted += ' '.repeat(indentSize * indentLevel) + '<' + element + '>\n';

        if (element.match(/^<?\w[^>]*[^\/]$/) && !element.includes('!')) {
            // Opening tag or incomplete self-closing tag, increase indent
            indentLevel += 1;
        }
    });

    return formatted.trim();
}

// Attach event listener to the "Format HTML" button
document.getElementById('formatBtn').addEventListener('click', () => {
    const htmlInput = document.getElementById('html-input').value;

    // Format the input HTML
    const formattedHTML = formatHTML(htmlInput);

    // Display the formatted HTML in the output div
    document.getElementById('formatted-html').textContent = formattedHTML;
});