const xOffset = document.getElementById('x-offset');
const yOffset = document.getElementById('y-offset');
const blur = document.getElementById('blur');
const spread = document.getElementById('spread');
const color = document.getElementById('color');
const box = document.querySelector('.box-shadow-box');
const cssCode = document.getElementById('css-code');
const copyButton = document.getElementById('copy-button');

function updateBoxShadow() {
  const boxShadow = `${xOffset.value}px ${yOffset.value}px ${blur.value}px ${spread.value}px ${color.value}`;
  box.style.boxShadow = boxShadow;
  cssCode.textContent = `box-shadow: ${boxShadow};`;
}

function copyToClipboard() {
  const textToCopy = cssCode.textContent;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert('CSS code copied to clipboard!');
  }).catch(err => {
    console.error('Could not copy text: ', err);
  });
}

xOffset.addEventListener('input', updateBoxShadow);
yOffset.addEventListener('input', updateBoxShadow);
blur.addEventListener('input', updateBoxShadow);
spread.addEventListener('input', updateBoxShadow);
color.addEventListener('input', updateBoxShadow);
copyButton.addEventListener('click', copyToClipboard);

// Initialize with default values
updateBoxShadow();
