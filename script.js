 document.addEventListener('DOMContentLoaded', function () {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function () {
      navLinks.classList.toggle('active');
    });
 });

  document.querySelectorAll('.button').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault(); 
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});
