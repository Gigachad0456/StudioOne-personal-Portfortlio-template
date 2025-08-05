const toggle = document.getElementById("toggle-dark");
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const colorScheme = document.getElementById("color-scheme");
const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll("#portfolio .grid > div");
const typingText = document.getElementById("typing-text");

tailwind.config = {
    darkMode: "class",
};

// Typing effect
const phrases = ["Web Developer", "UI/UX Designer", "Creative Coder"];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  if (!isDeleting && charIndex <= currentPhrase.length) {
    typingText.textContent = currentPhrase.substring(0, charIndex);
    charIndex++;
  } else if (isDeleting && charIndex >= 0) {
    typingText.textContent = currentPhrase.substring(0, charIndex);
    charIndex--;
  }
  if (charIndex > currentPhrase.length) {
    isDeleting = true;
  }
  if (charIndex < 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  setTimeout(type, isDeleting ? 50 : 100);
}
type();

toggle.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("mobile-nav-visible");
  menuToggle.textContent = navMenu.classList.contains("mobile-nav-visible")
    ? "✕"
    : "☰";
});

colorScheme.addEventListener("change", () => {
  document.documentElement.setAttribute("data-theme", colorScheme.value);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active", "bg-primary", "text-white");
      btn.classList.add("bg-secondary", "dark:bg-secondary", "text-white");
    });
    button.classList.add("active", "bg-primary", "text-white");
    button.classList.remove("bg-secondary", "dark:bg-secondary");

    const filter = button.getAttribute("data-filter");
    portfolioItems.forEach((item) => {
      if (filter === "all" || item.getAttribute("data-category") === filter) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 64,
        behavior: "smooth",
      });
      if (navMenu.classList.contains("mobile-nav-visible")) {
        navMenu.classList.remove("mobile-nav-visible");
        menuToggle.textContent = "☰";
      }
    }
  });
});
