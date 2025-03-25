// navbar class add 
window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 120) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
});

document.addEventListener("keydown", function (event) {
  // Prevent F12 (Dev Tools)
  if (event.key === "F12") {
      event.preventDefault();
  }
  // Prevent Ctrl+Shift+I (Dev Tools), Ctrl+Shift+J (Console), Ctrl+Shift+C (Element Inspector)
  if ((event.ctrlKey && event.shiftKey && event.key === "I") ||
      (event.ctrlKey && event.shiftKey && event.key === "J") ||
      (event.ctrlKey && event.shiftKey && event.key === "C")) {
      event.preventDefault();
  }
  // Prevent Ctrl+U (View Source)
  if (event.ctrlKey && event.key === "u") {
      event.preventDefault();
  }
});
