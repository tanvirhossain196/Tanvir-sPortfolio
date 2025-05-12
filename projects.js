// Projects page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initProjectsPage();
  createSVGGradients();
});

function initProjectsPage() {
  // Add interactive hover effects to project cards
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    // Add tilt effect
    card.addEventListener("mousemove", (e) => {
      const bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      const deltaX = (mouseX - centerX) / 20;
      const deltaY = (mouseY - centerY) / 20;

      card.querySelector(
        ".project-card-inner"
      ).style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) scale(1.02)`;
    });

    // Reset transform on mouse leave
    card.addEventListener("mouseleave", () => {
      setTimeout(() => {
        card.querySelector(".project-card-inner").style.transform = "";
      }, 200);
    });

    // Stagger tech badge animations
    const techBadges = card.querySelectorAll(".tech-badge");
    card.addEventListener("mouseenter", () => {
      techBadges.forEach((badge, index) => {
        setTimeout(() => {
          badge.style.transform = "translateY(-5px)";
        }, index * 100);
      });
    });

    card.addEventListener("mouseleave", () => {
      techBadges.forEach((badge) => {
        badge.style.transform = "";
      });
    });
  });

  // Animate project cards on scroll
  const moreProjectsBtn = document.querySelector(".more-projects");

  // Initial check if elements are in viewport
  animateProjectsOnScroll();

  // Check on scroll
  window.addEventListener("scroll", () => {
    animateProjectsOnScroll();
  });
}

function animateProjectsOnScroll() {
  const projectCards = document.querySelectorAll(".project-card");
  const moreProjectsBtn = document.querySelector(".more-projects");

  // Get viewport dimensions
  const viewportHeight = window.innerHeight;

  // Animate project cards
  projectCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;

    // If card is in viewport
    if (cardTop < viewportHeight - 100) {
      setTimeout(() => {
        card.style.transform = "translateY(0)";
        card.style.opacity = "1";
      }, index * 100);
    }
  });

  // Animate more projects button
  if (moreProjectsBtn) {
    const btnTop = moreProjectsBtn.getBoundingClientRect().top;

    if (btnTop < viewportHeight - 50) {
      setTimeout(() => {
        moreProjectsBtn.style.transform = "translateY(0)";
        moreProjectsBtn.style.opacity = "1";
      }, projectCards.length * 100);
    }
  }
}

// Create SVG gradients for corner decorations
function createSVGGradients() {
  // Create SVG defs for gradients
  const svgDefs = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgDefs.style.width = "0";
  svgDefs.style.height = "0";
  svgDefs.style.position = "absolute";
  svgDefs.setAttribute("aria-hidden", "true");

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");

  // Project 1 gradient (Purple to Indigo)
  const gradient1 = createLinearGradient(
    "project-gradient-1",
    "#8b5cf6",
    "#6366f1"
  );

  // Project 2 gradient (Blue to Cyan)
  const gradient2 = createLinearGradient(
    "project-gradient-2",
    "#3b82f6",
    "#06b6d4"
  );

  // Project 3 gradient (Green to Emerald)
  const gradient3 = createLinearGradient(
    "project-gradient-3",
    "#10b981",
    "#059669"
  );

  // Project 4 gradient (Orange to Amber)
  const gradient4 = createLinearGradient(
    "project-gradient-4",
    "#f59e0b",
    "#d97706"
  );

  // Add all gradients to defs
  defs.appendChild(gradient1);
  defs.appendChild(gradient2);
  defs.appendChild(gradient3);
  defs.appendChild(gradient4);

  svgDefs.appendChild(defs);
  document.body.appendChild(svgDefs);
}

// Helper function to create linear gradients
function createLinearGradient(id, color1, color2) {
  const gradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  gradient.setAttribute("id", id);
  gradient.setAttribute("x1", "0%");
  gradient.setAttribute("y1", "0%");
  gradient.setAttribute("x2", "100%");
  gradient.setAttribute("y2", "100%");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", color1);

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", color2);

  gradient.appendChild(stop1);
  gradient.appendChild(stop2);

  return gradient;
}

// Add particle effects to the project cards
function addParticleEffects() {
  const projectCards = document.querySelectorAll(".project-card");

  projectCards.forEach((card) => {
    const projectContent = card.querySelector(".project-content");

    // Create and add particles
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement("div");
      particle.classList.add("project-particle");

      // Random positions
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;

      // Random sizes
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      // Random delays
      particle.style.animationDelay = `${Math.random() * 5}s`;

      // Add to the project content
      projectContent.appendChild(particle);
    }
  });
}
