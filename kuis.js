// Jawaban yang benar untuk setiap pertanyaan
const correctAnswers = {
  // JavaScript
  js1: "c",
  js2: "a",
  js3: "b",
  js4: "a",
  js5: "c",
  
  // HTML
  html1: "b",
  html2: "c",
  html3: "d",
  html4: "b",
  html5: "c",
  
  // CSS
  css1: "b",
  css2: "c",
  css3: "c",
  css4: "b",
  css5: "d",
  
  // React
  react1: "d",
  react2: "a",
  react3: "b",
  react4: "d",
  react5: "b"
};

// Variabel global untuk menyimpan jawaban user
const userAnswers = {};

// Fungsi untuk membuka sidebar
function openNav() {
  document.getElementById("sidebar").style.left = "0";
  document.getElementById("overlay").classList.add("active");
}

// Fungsi untuk menutup sidebar
function closeNav() {
  document.getElementById("sidebar").style.left = "-300px";
  document.getElementById("overlay").classList.remove("active");
}

// Fungsi untuk memilih jawaban
function selectAnswer(questionId, answer) {
  // Hapus selected dari semua tombol di pertanyaan ini
  const buttons = document.querySelectorAll(`button[data-question="${questionId}"]`);
  buttons.forEach(button => {
    button.classList.remove("selected");
  });
  
  // Tambahkan selected ke tombol yang diklik
  const selectedButton = document.querySelector(`button[data-question="${questionId}"][data-answer="${answer}"]`);
  selectedButton.classList.add("selected");
  
  // Simpan jawaban user
  userAnswers[questionId] = answer;
}

// Fungsi untuk memfilter kuis berdasarkan kategori
function filterQuiz(category) {
  const quizItems = document.querySelectorAll(".quiz-item");
  const quizHeader = document.getElementById("default-content");
  
  if (category === "all") {
    quizItems.forEach(item => {
      item.style.display = "block";
    });
    quizHeader.style.display = "block";
  } else {
    quizItems.forEach(item => {
      if (item.dataset.category === category) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
    quizHeader.style.display = "none";
  }
}

// Fungsi untuk mengecek jawaban
function checkAnswers() {
  let score = 0;
  const totalQuestions = Object.keys(correctAnswers).length;
  
  // Hitung jawaban yang benar
  for (const question in correctAnswers) {
    if (userAnswers[question] === correctAnswers[question]) {
      score++;
    }
  }
  
  // Tampilkan hasil
  const resultElement = document.getElementById("quizResult");
  const percentage = Math.round((score / totalQuestions) * 100);
  
  if (percentage >= 70) {
    resultElement.className = "quiz-result success";
    resultElement.innerHTML = `
      <p><i class="fas fa-check-circle"></i> Kamu berhasil!</p>
      <p>Skor: ${score}/${totalQuestions} (${percentage}%)</p>
      <p>Kerja bagus! Pengetahuanmu cukup solid 😛.</p>
    `;
  } else {
    resultElement.className = "quiz-result error";
    resultElement.innerHTML = `
      <p><i class="fas fa-exclamation-circle"></i> Kamu perlu belajar lagi</p>
      <p>Skor: ${score}/${totalQuestions} (${percentage}%)</p>
      <p>Jangan menyerah! Teruslah belajar dan coba lagi😭.</p>
    `;
  }
  
  resultElement.style.display = "block";
  
  // Scroll ke hasil
  resultElement.scrollIntoView({ behavior: "smooth" });
}

// Event Listeners
document.addEventListener("DOMContentLoaded", function() {
  // Sidebar links
  const sidebarLinks = document.querySelectorAll(".sidebar-links a");
  sidebarLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      e.preventDefault();
      const category = this.dataset.content;
      
      // Update active link
      sidebarLinks.forEach(l => l.classList.remove("active"));
      this.classList.add("active");
      
      // Filter quiz
      filterQuiz(category);
      
      // Close sidebar on mobile
      if (window.innerWidth <= 768) {
        closeNav();
      }
    });
  });
  
  // Answer buttons
  const answerButtons = document.querySelectorAll(".answer-btn");
  answerButtons.forEach(button => {
    button.addEventListener("click", function() {
      const questionId = this.dataset.question;
      const answer = this.dataset.answer;
      selectAnswer(questionId, answer);
    });
  });
  
  // Submit button
  document.getElementById("submitQuiz").addEventListener("click", checkAnswers);
  
  // Initialize with all quizzes shown
  filterQuiz("all");
});

// Close sidebar when clicking outside
document.getElementById("overlay").addEventListener("click", closeNav);