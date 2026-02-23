/* ===============================
   PREMIUM CURSOR + PARTICLE TRAIL
================================= */

document.addEventListener("DOMContentLoaded", () => {

  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");
  const particleContainer = document.getElementById("cursor-particles");
  let mouseX = 0;
  let mouseY = 0;

  document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
  });

  function animateFollower() {
      follower.style.left = mouseX + "px";
      follower.style.top = mouseY + "px";
      requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverElements = document.querySelectorAll("a, button");
  hoverElements.forEach(el => {
      el.addEventListener("mouseenter", () => {
          cursor.classList.add("cursor-hover");
          follower.classList.add("follower-hover");
      });
      el.addEventListener("mouseleave", () => {
          cursor.classList.remove("cursor-hover");
          follower.classList.remove("follower-hover");
      });
  });

  const particles = [];
  function createParticle(x, y) {
      const p = document.createElement("div");
      p.classList.add("cursor-particle");
      p.style.left = x + "px";
      p.style.top = y + "px";
      particleContainer.appendChild(p);
      particles.push({el: p, life: 100});
  }

  function animateParticles() {
      particles.forEach((p, i) => {
          p.life -= 2;
          p.el.style.opacity = p.life / 100;
          p.el.style.transform = `translateY(-${100 - p.life}px)`;
          if(p.life <= 0){
              p.el.remove();
              particles.splice(i, 1);
          }
      });
      requestAnimationFrame(animateParticles);
  }
  animateParticles();

  document.addEventListener("mousemove", (e) => {
      createParticle(e.clientX, e.clientY);
  });

});

/* ===============================
   HAMBURGER MENU
================================= */
document.addEventListener("DOMContentLoaded", function () {
  // Sab navs handle karo (header .nav)
  const nav = document.querySelector(".nav");
  const header = document.querySelector(".header");

  if (nav && header) {
    // Hamburger button create karo dynamically
    const hamburger = document.createElement("button");
    hamburger.classList.add("hamburger");
    hamburger.setAttribute("aria-label", "Toggle Menu");
    hamburger.innerHTML = `<span></span><span></span><span></span>`;
    header.appendChild(hamburger);

    // Toggle menu
    hamburger.addEventListener("click", function () {
      hamburger.classList.toggle("open");
      nav.classList.toggle("nav-open");
    });

    // Menu band karo jab koi link click ho
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        hamburger.classList.remove("open");
        nav.classList.remove("nav-open");
      });
    });

    // Outside click se band karo
    document.addEventListener("click", function (e) {
      if (!header.contains(e.target)) {
        hamburger.classList.remove("open");
        nav.classList.remove("nav-open");
      }
    });
  }
});

/* ===============================
   ACTIVE NAV LINK ON CLICK
================================= */
const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {
    link.addEventListener("click", function () {
        navLinks.forEach(nav => nav.classList.remove("active"));
        this.classList.add("active");
    });
});

/* ===============================
   HEADER SHADOW ON SCROLL
================================= */
const header = document.querySelector(".header");

window.addEventListener("scroll", () => {
    if (header && window.scrollY > 50) {
        header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
    } else if (header) {
        header.style.boxShadow = "none";
    }
});

/* ===============================
   TYPING EFFECT
================================= */
const textElement = document.querySelector(".subtitle");
const textArray = [
    "Java Full Stack Developer",
    "1.6 Years Experience as Assistant Programmer"
];

if (textElement) {
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
      const currentText = textArray[textIndex];
      const displayedText = currentText.substring(0, charIndex);
      textElement.textContent = displayedText;

      if (!isDeleting && charIndex < currentText.length) {
          charIndex++;
          setTimeout(typeEffect, 100);
      } else if (isDeleting && charIndex > 0) {
          charIndex--;
          setTimeout(typeEffect, 60);
      } else {
          isDeleting = !isDeleting;
          if (!isDeleting) {
              textIndex = (textIndex + 1) % textArray.length;
          }
          setTimeout(typeEffect, 1000);
      }
  }
  typeEffect();
}

/* ===============================
   SCROLL REVEAL ANIMATION
================================= */
const revealElements = document.querySelectorAll(".hero-text, .hero-image");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition = "all 0.8s ease";
    observer.observe(el);
});

/* ===============================
   SKILLS PROGRESS ANIMATION
================================= */
const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.getAttribute("data-progress");
      bar.style.width = width;
      observer.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  bar.style.width = "0";
  skillObserver.observe(bar);
});

/* ===============================
   PROJECTS FILTER BUTTONS
================================= */
document.querySelectorAll('.pj-filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.pj-filter-btn').forEach(function(b) {
      b.classList.remove('pj-filter-active');
    });
    btn.classList.add('pj-filter-active');
  });
});

/* ===============================
   CONTACT FORM (old - non emailjs)
================================= */
var ctForm = document.getElementById('ct-contactForm');

if (ctForm) {
  // EmailJS version handles this - skip old handler
}

/* INPUT FOCUS: label cyan ho jaye */
document.querySelectorAll('.ct-form-group input, .ct-form-group textarea').forEach(function(input) {
  input.addEventListener('focus', function() {
    var label = this.closest('.ct-form-group').querySelector('label');
    if (label) label.style.color = '#00bfff';
  });
  input.addEventListener('blur', function() {
    var label = this.closest('.ct-form-group').querySelector('label');
    if (label) label.style.color = '';
  });
});