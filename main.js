// DOM Elements
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const customCursor = document.querySelector(".custom-cursor");
const cursorDot = document.querySelector(".cursor-dot");
const emailButton = document.getElementById("email-button");
const emailPopup = document.getElementById("email-popup");
const emailClose = document.getElementById("email-close");
const emailForm = document.getElementById("email-form");
const emailSuccess = document.getElementById("email-success");
const formSubmit = document.getElementById("form-submit");
const navItems = document.querySelectorAll(".nav-item");
const heroName = document.getElementById("hero-name");

// Portfolio data
const personalInfo = {
  name: "John Doe",
  title: "Full Stack Developer",
  bio: "Creative developer crafting elegant digital experiences with clean code and innovative design. Specialized in React, TypeScript, and modern web technologies.",
  location: "New York, NY",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  social: {
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
};

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initParticles();
  generateStars();
  addEventListeners();
  animateHeroName();
});

// Theme toggle functionality
function initTheme() {
  // Check for saved theme preference or use default dark mode
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);
}

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark-mode");
    body.classList.remove("light-mode");
  } else {
    body.classList.add("light-mode");
    body.classList.remove("dark-mode");
  }
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  if (body.classList.contains("dark-mode")) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
}

// Custom cursor functionality
function updateCursor(e) {
  if (customCursor) {
    // Update cursor position
    customCursor.style.left = `${e.clientX}px`;
    customCursor.style.top = `${e.clientY}px`;

    // Check if hovering over interactive elements
    const target = e.target;
    if (
      target.tagName === "BUTTON" ||
      target.tagName === "A" ||
      target.closest("button") ||
      target.closest("a") ||
      target.classList.contains("cursor-pointer")
    ) {
      customCursor.classList.add("cursor-hover");
    } else {
      customCursor.classList.remove("cursor-hover");
    }
  }
}

// Generate dynamic stars for the background
function generateStars() {
  const starsContainer = document.getElementById("stars-container");
  const starCount = 200;

  if (!starsContainer) return;

  for (let i = 0; i < starCount; i++) {
    const size = Math.random() * 3 + 0.5;

    const star = document.createElement("div");
    star.className = "star";
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.opacity = size > 2 ? 0.8 : 0.5;
    star.style.animationDelay = `${Math.random() * 5}s`;

    starsContainer.appendChild(star);
  }
}

// Initialize particles.js with premium settings
function initParticles() {
  if (typeof particlesJS !== "undefined") {
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 120,
          density: {
            enable: true,
            value_area: 1500,
          },
        },
        color: {
          value: "#6366f1",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
        },
        opacity: {
          value: 0.3,
          random: true,
          anim: {
            enable: true,
            speed: 0.3,
            opacity_min: 0.05,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 0.5,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 170,
          color: "#a78bfa",
          opacity: 0.15,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.3,
          direction: "none",
          random: true,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: true,
            mode: "grab",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 180,
            line_linked: {
              opacity: 0.35,
            },
          },
          push: {
            particles_nb: 4,
          },
        },
      },
      retina_detect: true,
    });
  }
}

// Email form functionality
function toggleEmailPopup() {
  emailPopup.classList.toggle("show");

  if (emailPopup.classList.contains("show")) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
    // Reset form when closing
    resetForm();
  }
}

function resetForm() {
  // Hide success message, show form
  emailForm.style.display = "flex";
  emailSuccess.style.display = "none";

  // Clear form fields
  emailForm.reset();

  // Clear error messages
  clearFormErrors();

  // Enable submit button
  formSubmit.disabled = false;
  formSubmit.innerHTML = `
        <div class="submit-content">
            <span class="submit-text">Send Message</span>
            <i class="fas fa-arrow-right"></i>
        </div>
        <div class="submit-shine"></div>
    `;

  // Remove success class
  emailPopup.classList.remove("success");
}

function clearFormErrors() {
  document.getElementById("name-error").textContent = "";
  document.getElementById("email-error").textContent = "";
  document.getElementById("subject-error").textContent = "";
  document.getElementById("message-error").textContent = "";
}

// Form validation
function validateForm() {
  let isValid = true;
  clearFormErrors();

  const name = document.getElementById("form-name").value.trim();
  const email = document.getElementById("form-email").value.trim();
  const subject = document.getElementById("form-subject").value.trim();
  const message = document.getElementById("form-message").value.trim();

  // Name validation
  if (!name) {
    document.getElementById("name-error").textContent = "Name is required";
    isValid = false;
  } else if (name.length < 2) {
    document.getElementById("name-error").textContent =
      "Name must be at least 2 characters";
    isValid = false;
  }

  // Email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email) {
    document.getElementById("email-error").textContent = "Email is required";
    isValid = false;
  } else if (!emailRegex.test(email)) {
    document.getElementById("email-error").textContent =
      "Please enter a valid email address";
    isValid = false;
  }

  // Subject validation
  if (!subject) {
    document.getElementById("subject-error").textContent =
      "Subject is required";
    isValid = false;
  } else if (subject.length < 3) {
    document.getElementById("subject-error").textContent =
      "Subject must be at least 3 characters";
    isValid = false;
  }

  // Message validation
  if (!message) {
    document.getElementById("message-error").textContent =
      "Message is required";
    isValid = false;
  } else if (message.length < 10) {
    document.getElementById("message-error").textContent =
      "Message must be at least 10 characters";
    isValid = false;
  }

  return isValid;
}

function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  // Disable submit button and show loading state
  formSubmit.disabled = true;
  formSubmit.innerHTML = `
        <div class="submit-content">
            <span class="loading-spinner"></span>
            <span class="submit-text">Sending Message...</span>
        </div>
    `;

  // Simulate email sending (would connect to a real service in production)
  setTimeout(() => {
    // Show success message, hide form
    emailForm.style.display = "none";
    emailSuccess.style.display = "block";

    // Add success class for animation
    emailPopup.classList.add("success");

    // Auto close after delay
    setTimeout(() => {
      toggleEmailPopup();
    }, 5000);
  }, 2000);
}

// Animate hero name with letter-by-letter effect
function animateHeroName() {
  if (!heroName) return;

  const text = heroName.textContent;
  heroName.textContent = "";

  for (let i = 0; i < text.length; i++) {
    const letter = document.createElement("span");
    letter.textContent = text[i];
    letter.style.display = "inline-block";
    letter.style.transition = "all 0.3s";
    letter.style.transitionDelay = `${i * 0.03}s`;
    letter.style.animationDelay = `${i * 0.1}s`;

    letter.addEventListener("mouseover", () => {
      letter.style.color = "transparent";
      letter.style.backgroundImage =
        "linear-gradient(to right, #6366f1, #8b5cf6)";
      letter.style.backgroundClip = "text";
      letter.style.webkitBackgroundClip = "text";
      letter.style.transform = "translateY(-5px)";
    });

    letter.addEventListener("mouseout", () => {
      letter.style.color = "";
      letter.style.backgroundImage = "";
      letter.style.backgroundClip = "";
      letter.style.webkitBackgroundClip = "";
      letter.style.transform = "";
    });

    heroName.appendChild(letter);
  }
}

// Add all event listeners
function addEventListeners() {
  // Theme toggle
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Custom cursor
  if (customCursor) {
    document.addEventListener("mousemove", updateCursor);
  }

  // Email popup
  if (emailButton && emailPopup && emailClose) {
    emailButton.addEventListener("click", toggleEmailPopup);
    emailClose.addEventListener("click", toggleEmailPopup);

    // Close when clicking outside
    emailPopup.addEventListener("click", (e) => {
      if (e.target === emailPopup) {
        toggleEmailPopup();
      }
    });
  }

  // Form submission
  if (emailForm) {
    emailForm.addEventListener("submit", handleFormSubmit);
  }

  // Navigation highlight
  navItems.forEach((item) => {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    const itemPage = item.getAttribute("href");

    if (currentPage === itemPage) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // Handle scroll for orbital animation
  window.addEventListener("scroll", () => {
    const orbitalSystem = document.querySelector(".orbital-system");
    if (orbitalSystem) {
      const scrollY = window.scrollY;
      orbitalSystem.style.transform = `translate(-50%, -50%) rotate(${
        scrollY * 0.05
      }deg)`;
    }
  });
}

// Handle clicking outside of the email popup
document.addEventListener("mousedown", (e) => {
  if (emailPopup && emailPopup.classList.contains("show")) {
    if (
      !e.target.closest(".email-popup-content") &&
      !e.target.closest("#email-button")
    ) {
      toggleEmailPopup();
    }
  }
});

// Prevent scrolling when popup is open
document.addEventListener("scroll", () => {
  if (emailPopup && emailPopup.classList.contains("show")) {
    window.scrollTo(0, 0);
  }
});
