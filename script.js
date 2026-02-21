/* ===============================
   PREMIUM CURSOR + PARTICLE TRAIL
================================= */

document.addEventListener("DOMContentLoaded", () => {

  const cursor = document.querySelector(".cursor");
  const follower = document.querySelector(".cursor-follower");
  const particleContainer = document.getElementById("cursor-particles");
  let mouseX = 0;
  let mouseY = 0;

  // Cursor movement
  document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + "px";
      cursor.style.top = mouseY + "px";
  });

  // Smooth follower
  function animateFollower() {
      follower.style.left = mouseX + "px";
      follower.style.top = mouseY + "px";
      requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Hover effect on clickable elements
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

  // Particle trail
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


















// Home page
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
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
    } else {
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
    } 
    else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(typeEffect, 60);
    } 
    else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            textIndex = (textIndex + 1) % textArray.length;
        }
        setTimeout(typeEffect, 1000);
    }
}

typeEffect();













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
}, {
    threshold: 0.2
});

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




















// ── FILTER BUTTONS ──
// Jab bhi koi filter button click ho, sirf wahi active ho jaye

document.querySelectorAll('.filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {

    // Pehle sabse active class hatao
    document.querySelectorAll('.filter-btn').forEach(function(b) {
      b.classList.remove('active');
    });

    // Sirf clicked button ko active karo
    btn.classList.add('active');
  });
});


















// ── PROJECTS FILTER BUTTONS ──
// Jab bhi koi filter button click ho, sirf wahi active ho jaye

document.querySelectorAll('.pj-filter-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {

    // Pehle sabse active class hatao
    document.querySelectorAll('.pj-filter-btn').forEach(function(b) {
      b.classList.remove('pj-filter-active');
    });

    // Sirf clicked button ko active karo
    btn.classList.add('pj-filter-active');
  });
});





























// ── CONTACT FORM SUBMIT ──

var form = document.getElementById('contactForm');
var successMsg = document.getElementById('successMsg');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Page reload band karo

  var btn = form.querySelector('.submit-btn');

  // Button loading state
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  // 1.5 second baad success dikhao (real API ke liye yahan fetch lagao)
  setTimeout(function() {
    // Success message show karo
    successMsg.classList.add('show');

    // Button reset karo
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
      Send Message
    `;
    btn.style.opacity = '1';
    btn.disabled = false;

    // Form reset karo
    form.reset();

    // 4 second baad success message hide karo
    setTimeout(function() {
      successMsg.classList.remove('show');
    }, 4000);

  }, 1500);
});

// ── INPUT FOCUS ANIMATION ──
// Har input par focus hone par label cyan ho jaye
document.querySelectorAll('.form-group input, .form-group textarea').forEach(function(input) {
  input.addEventListener('focus', function() {
    this.closest('.form-group').querySelector('label').style.color = '#00bfff';
  });
  input.addEventListener('blur', function() {
    this.closest('.form-group').querySelector('label').style.color = '';
  });
});












// ── CONTACT FORM SUBMIT ──

var ctForm = document.getElementById('ct-contactForm');
var ctSuccessMsg = document.getElementById('ct-successMsg');

ctForm.addEventListener('submit', function(e) {
  e.preventDefault();

  var btn = ctForm.querySelector('.ct-submit-btn');

  // Button loading state
  btn.textContent = 'Sending...';
  btn.style.opacity = '0.7';
  btn.disabled = true;

  // 1.5 second baad success dikhao
  setTimeout(function() {

    ctSuccessMsg.classList.add('ct-show');

    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"/>
        <polygon points="22 2 15 22 11 13 2 9 22 2"/>
      </svg>
      Send Message
    `;
    btn.style.opacity = '1';
    btn.disabled = false;

    ctForm.reset();

    // 4 second baad success message hide karo
    setTimeout(function() {
      ctSuccessMsg.classList.remove('ct-show');
    }, 4000);

  }, 1500);
});

// ── INPUT FOCUS: label cyan ho jaye ──
document.querySelectorAll('.ct-form-group input, .ct-form-group textarea').forEach(function(input) {
  input.addEventListener('focus', function() {
    this.closest('.ct-form-group').querySelector('label').style.color = '#00bfff';
  });
  input.addEventListener('blur', function() {
    this.closest('.ct-form-group').querySelector('label').style.color = '';
  });
});










