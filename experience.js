// Experience page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initExperiencePage();
  createSVGGradients();
});

function initExperiencePage() {
  // Add interactive hover effects to timeline cards
  const timelineItems = document.querySelectorAll(".timeline-item");

  timelineItems.forEach((item) => {
    const card = item.querySelector(".timeline-card");

    // Add tilt effect
    card.addEventListener("mousemove", (e) => {
      const bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      const deltaX = (mouseX - centerX) / 20;
      const deltaY = (mouseY - centerY) / 20;

      // Different rotation based on item position (left or right)
      if (item.classList.contains("left")) {
        card.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(${-deltaY}deg) scale(1.03)`;
      } else {
        card.style.transform = `perspective(1000px) rotateY(5deg) rotateX(${-deltaY}deg) scale(1.03)`;
      }
    });

    // Reset transform on mouse leave
    card.addEventListener("mouseleave", () => {
      setTimeout(() => {
        card.style.transform = "";
      }, 200);
    });

    // Animate tech pills on hover
    const techPills = item.querySelectorAll(".tech-pill");
    card.addEventListener("mouseenter", () => {
      techPills.forEach((pill, index) => {
        setTimeout(() => {
          pill.style.transform = "translateY(-5px)";
        }, index * 100);
      });
    });

    card.addEventListener("mouseleave", () => {
      techPills.forEach((pill) => {
        pill.style.transform = "";
      });
    });

    // Animate achievements on hover
    const achievements = item.querySelectorAll(".achievements-list li");
    card.addEventListener("mouseenter", () => {
      achievements.forEach((achievement, index) => {
        setTimeout(() => {
          if (item.classList.contains("left")) {
            achievement.style.transform = "translateX(-10px)";
          } else {
            achievement.style.transform = "translateX(10px)";
          }
          achievement.style.color = "var(--accent-indigo)";
        }, index * 150);
      });
    });

    card.addEventListener("mouseleave", () => {
      achievements.forEach((achievement) => {
        achievement.style.transform = "";
        achievement.style.color = "";
      });
    });
  });

  // Animate timeline items on scroll
  const downloadBtn = document.querySelector(".resume-download");

  // Initial check if elements are in viewport
  animateOnScroll();

  // Check on scroll
  window.addEventListener("scroll", () => {
    animateOnScroll();
  });
}

function animateOnScroll() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const downloadBtn = document.querySelector(".resume-download");

  // Get viewport dimensions
  const viewportHeight = window.innerHeight;

  // Animate timeline items
  timelineItems.forEach((item, index) => {
    const itemTop = item.getBoundingClientRect().top;

    // If item is in viewport
    if (itemTop < viewportHeight - 100) {
      setTimeout(() => {
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, index * 200);
    }
  });

  // Animate download button
  if (downloadBtn) {
    const btnTop = downloadBtn.getBoundingClientRect().top;

    if (btnTop < viewportHeight - 50) {
      setTimeout(() => {
        downloadBtn.style.opacity = "1";
        downloadBtn.style.transform = "translateY(0)";
      }, timelineItems.length * 200);
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

  // Experience gradient
  const experienceGradient = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "linearGradient"
  );
  experienceGradient.setAttribute("id", "experience-gradient");
  experienceGradient.setAttribute("x1", "0%");
  experienceGradient.setAttribute("y1", "0%");
  experienceGradient.setAttribute("x2", "100%");
  experienceGradient.setAttribute("y2", "100%");

  const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop1.setAttribute("offset", "0%");
  stop1.setAttribute("stop-color", "#818cf8");

  const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
  stop2.setAttribute("offset", "100%");
  stop2.setAttribute("stop-color", "#8b5cf6");

  experienceGradient.appendChild(stop1);
  experienceGradient.appendChild(stop2);
  defs.appendChild(experienceGradient);

  svgDefs.appendChild(defs);
  document.body.appendChild(svgDefs);
}

// Add pulse effect to timeline
function addTimelinePulseEffect() {
  const timeline = document.querySelector(".timeline-center");

  if (timeline) {
    // Create pulse elements
    for (let i = 0; i < 3; i++) {
      const pulse = document.createElement("div");
      pulse.classList.add("timeline-pulse");
      pulse.style.animationDelay = `${i * 2}s`;

      timeline.appendChild(pulse);
    }
  }
}

// Add parallax effect to the timeline items
function addParallaxEffect() {
  const timelineItems = document.querySelectorAll(".timeline-item");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;

    timelineItems.forEach((item, index) => {
      // Alternate the parallax direction
      const direction = index % 2 === 0 ? 1 : -1;
      const speed = 0.05;

      item.style.transform = `translateY(${scrollY * speed * direction}px)`;
    });
  });
}

// Add a responsive behavior for mobile
function adjustForMobile() {
  const timelineItems = document.querySelectorAll(".timeline-item");
  const timelineCenter = document.querySelector(".timeline-center");

  function checkScreenSize() {
    if (window.innerWidth <= 768) {
      timelineCenter.style.left = "0";

      timelineItems.forEach((item) => {
        item.classList.remove("left", "right");
        item.style.paddingLeft = "2rem";
        item.style.paddingRight = "0";
        item.style.textAlign = "left";
        item.style.marginLeft = "0";
      });
    } else {
      timelineCenter.style.left = "50%";

      timelineItems.forEach((item, index) => {
        if (index % 2 === 0) {
          item.classList.add("left");
          item.classList.remove("right");
          item.style.paddingRight = "50%";
          item.style.paddingLeft = "0";
          item.style.textAlign = "right";
          item.style.marginLeft = "0";
        } else {
          item.classList.add("right");
          item.classList.remove("left");
          item.style.paddingLeft = "50%";
          item.style.paddingRight = "0";
          item.style.textAlign = "left";
          item.style.marginLeft = "auto";
        }
      });
    }
  }

  // Initial check
  checkScreenSize();

  // Check on resize
  window.addEventListener("resize", checkScreenSize);
}
