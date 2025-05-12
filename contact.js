// Contact page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initContactPage();
  createGradients();
  setCurrentYear();
});

function initContactPage() {
  // Add click event to email circle
  const emailCircle = document.querySelector(".email-circle");
  const emailPopup = document.getElementById("email-popup");
  const emailClose = document.getElementById("email-close");

  if (emailCircle && emailPopup) {
    emailCircle.addEventListener("click", () => {
      emailPopup.classList.add("show");
      document.body.style.overflow = "hidden";
    });

    if (emailClose) {
      emailClose.addEventListener("click", () => {
        emailPopup.classList.remove("show");
        document.body.style.overflow = "auto";
        resetForm();
      });

      // Close when clicking outside
      emailPopup.addEventListener("click", (e) => {
        if (e.target === emailPopup) {
          emailPopup.classList.remove("show");
          document.body.style.overflow = "auto";
          resetForm();
        }
      });
    }
  }

  // Add hover effects to contact circles
  const contactCircles = document.querySelectorAll(".contact-circle");

  contactCircles.forEach((circle) => {
    circle.addEventListener("mouseenter", () => {
      // Add floating effect
      circle.style.transform = "translateY(-10px)";

      // Animate particles
      const particles = circle.querySelectorAll(".particle");
      particles.forEach((particle, index) => {
        setTimeout(() => {
          particle.style.opacity = "1";
        }, index * 100);
      });
    });

    circle.addEventListener("mouseleave", () => {
      circle.style.transform = "";

      // Reset particles
      const particles = circle.querySelectorAll(".particle");
      particles.forEach((particle) => {
        particle.style.opacity = "";
      });
    });
  });

  // Handle email form submission
  const emailForm = document.getElementById("email-form");
  const formSubmit = document.getElementById("form-submit");
  const emailSuccess = document.getElementById("email-success");

  if (emailForm) {
    emailForm.addEventListener("submit", handleFormSubmit);
  }
}

// Create SVG gradients for the connecting lines
function createGradients() {
  // Create SVG defs for line gradients
  const svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgDefs.style.width = "0";
  svgDefs.style.height = "0";
  svgDefs.style.position = "absolute";
  svgDefs.setAttribute("aria-hidden", "true");

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

  // Line 1 gradient (Email to LinkedIn)
  const gradient1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  gradient1.setAttribute("id", "line-gradient-1");
  gradient1.setAttribute("x1", "0%");
  gradient1.setAttribute("y1", "0%");
  gradient1.setAttribute("x2", "100%");
  gradient1.setAttribute("y2", "0%");

  const stop1_1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop"
  );
  stop1_1.setAttribute("offset", "0%");
  stop1_1.setAttribute("stop-color", "#3b82f6");
  stop1_1.setAttribute("stop-opacity", "0.2");

  const stop1_2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop"
  );
  stop1_2.setAttribute("offset", "100%");
  stop1_2.setAttribute("stop-color", "#8b5cf6");
  stop1_2.setAttribute("stop-opacity", "0.2");

  gradient1.appendChild(stop1_1);
  gradient1.appendChild(stop1_2);

  // Line 2 gradient (LinkedIn to GitHub)
  const gradient2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  gradient2.setAttribute("id", "line-gradient-2");
  gradient2.setAttribute("x1", "0%");
  gradient2.setAttribute("y1", "0%");
  gradient2.setAttribute("x2", "100%");
  gradient2.setAttribute("y2", "0%");

  const stop2_1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop"
  );
  stop2_1.setAttribute("offset", "0%");
  stop2_1.setAttribute("stop-color", "#8b5cf6");
  stop2_1.setAttribute("stop-opacity", "0.2");

  const stop2_2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop"
  );
  stop2_2.setAttribute("offset", "100%");
  stop2_2.setAttribute("stop-color", "#ec4899");
  stop2_2.setAttribute("stop-opacity", "0.2");

  gradient2.appendChild(stop2_1);
  gradient2.appendChild(stop2_2);

  // Line 3 gradient (GitHub to Email)
  const gradient3 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  gradient3.setAttribute("id", "line-gradient-3");
  gradient3.setAttribute("x1", "0%");
  gradient3.setAttribute("y1", "0%");
  gradient3.setAttribute("x2", "100%");
  gradient3.setAttribute("y2", "0%");

  const stop3_1 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop"
  );
  stop3_1.setAttribute("offset", "0%");
  stop3_1.setAttribute("stop-color", "#ec4899");
  stop3_1.setAttribute("stop-opacity", "0.2");

  const stop3_2 = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "stop"
  );
  stop3_2.setAttribute("offset", "100%");
  stop3_2.setAttribute("stop-color", "#3b82f6");
  stop3_2.setAttribute("stop-opacity", "0.2");

  gradient3.appendChild(stop3_1);
  gradient3.appendChild(stop3_2);

  // Add gradients to defs
  defs.appendChild(gradient1);
  defs.appendChild(gradient2);
  defs.appendChild(gradient3);

  svgDefs.appendChild(defs);
  document.body.appendChild(svgDefs);
}

// Set the current year for the footer copyright
function setCurrentYear() {
  const currentYearElement = document.getElementById("current-year");
  if (currentYearElement) {
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;
  }
}

// Form validation - simplified for fewer fields
function validateForm() {
  let isValid = true;
  clearFormErrors();

  const email = document.getElementById("form-email").value.trim();
  const message = document.getElementById("form-message").value.trim();

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

  // Message validation
  if (!message) {
    document.getElementById("message-error").textContent =
      "Message is required";
    isValid = false;
  } else if (message.length < 5) {
    document.getElementById("message-error").textContent =
      "Message is too short";
    isValid = false;
  }

  return isValid;
}

function clearFormErrors() {
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  if (emailError) emailError.textContent = "";
  if (messageError) messageError.textContent = "";
}

function handleFormSubmit(e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const formSubmit = document.getElementById("form-submit");
  const emailForm = document.getElementById("email-form");
  const emailSuccess = document.getElementById("email-success");

  // Disable submit button and show loading state
  formSubmit.disabled = true;
  formSubmit.innerHTML = `
          <div class="submit-content">
              <span class="loading-spinner"></span>
              <span class="submit-text">Sending...</span>
          </div>
      `;

  // Simulate email sending (would connect to a real service in production)
  setTimeout(() => {
    // Show success message, hide form
    emailForm.style.display = "none";
    emailSuccess.style.display = "block";

    // Add success class for animation
    document.getElementById("email-popup").classList.add("success");

    // Auto close after delay
    setTimeout(() => {
      document.getElementById("email-popup").classList.remove("show");
      document.body.style.overflow = "auto";
      resetForm();
    }, 3000);
  }, 1500);
}

function resetForm() {
  const emailForm = document.getElementById("email-form");
  const emailSuccess = document.getElementById("email-success");
  const formSubmit = document.getElementById("form-submit");

  // Hide success message, show form
  if (emailForm) emailForm.style.display = "flex";
  if (emailSuccess) emailSuccess.style.display = "none";

  // Clear form fields
  if (emailForm) emailForm.reset();

  // Clear error messages
  clearFormErrors();

  // Enable submit button
  if (formSubmit) {
    formSubmit.disabled = false;
    formSubmit.innerHTML = `
              <div class="submit-content">
                  <span class="submit-text">Send</span>
                  <i class="fas fa-arrow-right"></i>
              </div>
              <div class="submit-shine"></div>
          `;
  }

  // Remove success class
  document.getElementById("email-popup").classList.remove("success");
}
