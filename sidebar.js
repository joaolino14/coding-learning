// Sidebar functionality
function openNav() {
  const sidebar = document.getElementById('sidebar');
  const content = document.querySelector('.content');
  const overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
  
  sidebar.classList.add('active');
  content.classList.add('sidebar-active');
  
  overlay.addEventListener('click', closeNav);
}

function closeNav() {
  const sidebar = document.getElementById('sidebar');
  const content = document.querySelector('.content');
  const overlay = document.querySelector('.overlay');
  
  sidebar.classList.remove('active');
  content.classList.remove('sidebar-active');
  
  if (overlay) {
    overlay.remove();
  }
}

// Close sidebar when clicking on a link (for mobile)
document.querySelectorAll('.sidebar-links a').forEach(link => {
  link.addEventListener('click', function() {
    if (window.innerWidth <= 768) {
      closeNav();
    }
  });
});

// Highlight active link
document.querySelectorAll('.sidebar-links a').forEach(link => {
  link.addEventListener('click', function() {
    document.querySelectorAll('.sidebar-links a').forEach(item => {
      item.classList.remove('active');
    });
    this.classList.add('active');
  });
});

// Close sidebar when pressing Escape key
document.addEventListener('keydown', function(event) {
  if (event.key === 'Escape') {
    closeNav();
  }
});

// ... (kode sebelumnya tetap sama)

// Fungsi untuk menampilkan konten materi
function showContent(contentId) {
  // Sembunyikan semua konten
  document.querySelectorAll('.content-section').forEach(section => {
    section.style.display = 'none';
  });
  
  // Sembunyikan konten default
  document.getElementById('default-content').style.display = 'none';
  
  // Tampilkan konten yang dipilih
  const contentToShow = document.getElementById(contentId);
  if (contentToShow) {
    contentToShow.style.display = 'block';
  }
}

// Event listener untuk link sidebar
document.querySelectorAll('.sidebar-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Dapatkan ID konten dari atribut data
    const contentId = this.getAttribute('data-content');
    
    // Tampilkan konten yang sesuai
    showContent(contentId);
    
    // Update active link
    document.querySelectorAll('.sidebar-links a').forEach(item => {
      item.classList.remove('active');
    });
    this.classList.add('active');
    
    // Pada mobile, tutup sidebar setelah memilih
    if (window.innerWidth <= 768) {
      closeNav();
    }
  });
});

// Pada awal load, sembunyikan semua konten kecuali default
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.content-section').forEach(section => {
    section.style.display = 'none';
  });
});