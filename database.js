document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.querySelector('.nav-links');

  hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('active');

    const icon = this.querySelector('i');
    if (navLinks.classList.contains('active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  // Show BCA details
  const showBcaBtn = document.getElementById('show-bca');
  const bcaDetails = document.getElementById('bca-details');

  showBcaBtn.addEventListener('click', function (e) {
    e.preventDefault();
    bcaDetails.style.display = bcaDetails.style.display === 'block' ? 'none' : 'block';
  });

  // Form submission (AJAX)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('my-form-status');

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Hindari submit biasa

    const formData = new FormData(form);
    status.className = 'form-status loading';

    let dots = 0;
    const loadingInterval = setInterval(() => {
      dots = (dots + 1) % 4;
      status.textContent = `${'.'.repeat(dots)}`;
    }, 500)

    fetch('/contact', {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then((data) => {
        clearInterval(loadingInterval);
        status.className = 'form-status status-success';
        status.innerHTML = `✅ ${data.status}`;
        form.reset();

        setTimeout(() => {
          status.innerHTML = '';
          status.className = 'form-status';
        }, 500);
    
      })
      .catch((err) => {
        clearInterval(loadingInterval);
        status.className = 'form-status status error';
        status.innerHTML = '❌ Gagal mengirim pesan. Coba lagi.';
        console.error(err);
      });

       // Hilangkan pesan error juga
      setTimeout(() => {
        status.textContent = '';
        status.className = 'form-status';
      }, 3000);
  });

  // Coin animation
  const donationAnimation = document.querySelector('.donation-animation');

  function createCoin() {
    const coin = document.createElement('div');
    coin.className = 'coin';
    coin.style.left = Math.random() * 80 + 10 + '%';
    coin.style.animationDuration = Math.random() * 2 + 2 + 's';
    donationAnimation.appendChild(coin);

    setTimeout(() => {
      coin.remove();
    }, 4000);
  }

  setInterval(createCoin, 800);
  for (let i = 0; i < 3; i++) {
    setTimeout(createCoin, i * 300);
  }
});
