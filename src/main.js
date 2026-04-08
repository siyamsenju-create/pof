import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// --- 1. Init Lenis Smooth Scrolling ---
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}
requestAnimationFrame(raf)


// --- 2. Setup GSAP ScrollTrigger to use Lenis ---
lenis.on('scroll', ScrollTrigger.update)

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})
gsap.ticker.lagSmoothing(0)


// --- 3. Navbar Sticky & Mobile Logic ---
const navbar = document.getElementById('navbar');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

let lastScroll = 0;
lenis.on('scroll', ({ scroll }) => {
  if (scroll > lastScroll && scroll > 100) {
    // scroll down
    navbar.classList.add('hidden');
  } else {
    // scroll up
    navbar.classList.remove('hidden');
  }
  
  if (scroll === 0) {
    navbar.style.background = 'rgba(11, 11, 11, 0.8)';
  } else {
    navbar.style.background = 'rgba(11, 11, 11, 0.95)';
  }
  lastScroll = scroll;
})

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
})
// Hide menu on click nav links
document.querySelectorAll('.nav-item, .btn-nav').forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
  })
})


// --- 4. GSAP Animations ---

// Hero Animation Timeline
const tlHero = gsap.timeline();

tlHero.fromTo('.navbar', 
  { y: -100, opacity: 0 }, 
  { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
)
.fromTo('.hero-title .word', 
  { y: 150, opacity: 0, rotationZ: 5 }, 
  { y: 0, opacity: 1, rotationZ: 0, duration: 1.2, stagger: 0.1, ease: 'power4.out' },
  '-=0.5'
)
.fromTo('.hero-subtitle', 
  { y: 30, opacity: 0 }, 
  { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
  '-=0.8'
)
.fromTo('.hero-cta a', 
  { y: 20, opacity: 0 }, 
  { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
  '-=0.6'
)
.fromTo('.hero-ghost',
  { y: 100, opacity: 0 },
  { y: 0, opacity: 0.02, duration: 1.5, ease: 'power2.out' },
  '-=1'
);

// Parallax for Hero Ghost Text
gsap.to('.hero-ghost', {
  yPercent: -50,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
})

// General Fade Up Animation for Sections
const sections = gsap.utils.toArray('.section-title');
sections.forEach(title => {
  gsap.fromTo(title, 
    { y: 50, opacity: 0 }, 
    {
      y: 0, 
      opacity: 1, 
      duration: 1, 
      ease: 'power3.out',
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
      }
    }
  );
});

// Projects Cards Stagger
gsap.fromTo('.project-card', 
  { y: 80, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.projects-grid',
      start: 'top 75%',
    }
  }
);

// Services Cards Stagger
gsap.fromTo('.service-card', 
  { y: 50, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.services-grid',
      start: 'top 80%',
    }
  }
);

// About Section Reveal
gsap.fromTo('.about-text, .about-stats',
  { y: 30, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.about-content',
      start: 'top 75%'
    }
  }
);

// About Image Parallax
gsap.to('.about-image img', {
  yPercent: 20,
  ease: 'none',
  scrollTrigger: {
    trigger: '.about-image',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true
  }
});
