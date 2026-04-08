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

// Hero Animation
gsap.fromTo('.hero-title', 
  { y: 50, opacity: 0 }, 
  { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.2 }
)
gsap.fromTo('.hero-subtitle', 
  { y: 30, opacity: 0 }, 
  { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.5 }
)

// Team Grid Reveal
gsap.fromTo('.team-card',
  { y: 60, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    stagger: 0.15,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.team-grid',
      start: 'top 85%'
    }
  }
);
