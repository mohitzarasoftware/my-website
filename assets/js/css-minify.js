function minifyCSS(css) {
    // Remove comments
    css = css.replace(/\/\*[\s\S]*?\*\//g, '');
    // Remove whitespace
    css = css.replace(/\s+/g, ' ')
             .replace(/ ?\{\s+/g, '{')
             .replace(/\s+\}/g, '}')
             .replace(/;\s+/g, ';')
             .replace(/:\s+/g, ':');
    return css.trim();
}

document.getElementById('minify-button').addEventListener('click', function() {
    const cssInput = document.getElementById('css-input').value;
    const minifiedCSS = minifyCSS(cssInput);
    document.getElementById('css-output').value = minifiedCSS;
});