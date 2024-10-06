// navbar class add 
window.addEventListener('scroll', function() {
    var navbar = document.getElementById('navbar');
    if (window.scrollY > 120) {
      navbar.classList.add('sticky');
    } else {
      navbar.classList.remove('sticky');
    }
});

