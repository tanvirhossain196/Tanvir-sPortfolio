// Skills page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initSkillsPage();
});

function initSkillsPage() {
  // Add interactive hover effects to skill cards
  const skillCards = document.querySelectorAll(".skill-card");

  skillCards.forEach((card) => {
    // Add tilt effect
    card.addEventListener("mousemove", (e) => {
      const bounds = card.getBoundingClientRect();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      const deltaX = (mouseX - centerX) / 10;
      const deltaY = (mouseY - centerY) / 10;

      card.querySelector(
        ".skill-card-inner"
      ).style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) scale(1.05)`;
    });

    // Reset transform on mouse leave
    card.addEventListener("mouseleave", () => {
      setTimeout(() => {
        card.querySelector(".skill-card-inner").style.transform = "";
      }, 200);
    });
  });

  // Animate the skill category cards on scroll
  const skillCategories = document.querySelectorAll(".skill-category");

  skillCategories.forEach((category) => {
    category.addEventListener("mouseenter", () => {
      // Scale up slightly
      category.style.transform = "scale(1.05) rotate(-1deg)";

      // Highlight the skills
      const skills = category.querySelectorAll(".category-skills li");
      skills.forEach((skill, index) => {
        setTimeout(() => {
          skill.style.transform = "translateX(10px)";
          skill.style.color = getSkillHighlightColor(category);
          skill.style.transition = "all 0.3s ease";
        }, index * 100);
      });
    });

    category.addEventListener("mouseleave", () => {
      // Reset transform
      category.style.transform = "";

      // Reset the skills
      const skills = category.querySelectorAll(".category-skills li");
      skills.forEach((skill) => {
        skill.style.transform = "";
        skill.style.color = "";
      });
    });
  });
}

function getSkillHighlightColor(category) {
  if (category.classList.contains("frontend")) {
    return "#3b82f6";
  } else if (category.classList.contains("backend")) {
    return "#8b5cf6";
  } else if (category.classList.contains("tools")) {
    return "#ec4899";
  }
  return "";
}

// Add scroll-based animations
window.addEventListener("scroll", () => {
  animateSkillsOnScroll();
});

function animateSkillsOnScroll() {
  const skillCards = document.querySelectorAll(".skill-card");
  const skillCategories = document.querySelectorAll(
    ".skill-category-container"
  );

  // Get viewport dimensions
  const viewportHeight = window.innerHeight;

  // Animate skill cards
  skillCards.forEach((card, index) => {
    const cardTop = card.getBoundingClientRect().top;

    // If card is in viewport
    if (cardTop < viewportHeight - 100) {
      setTimeout(() => {
        card.style.transform = "translateY(0)";
        card.style.opacity = "1";
      }, index * 100);
    }
  });

  // Animate skill categories
  skillCategories.forEach((category, index) => {
    const categoryTop = category.getBoundingClientRect().top;

    // If category is in viewport
    if (categoryTop < viewportHeight - 100) {
      setTimeout(() => {
        category.style.transform = "translateY(0)";
        category.style.opacity = "1";
      }, (index + skillCards.length) * 100);
    }
  });
}
