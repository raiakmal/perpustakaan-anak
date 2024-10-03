// Navbar Fixed
window.onscroll = function () {
  const header = document.querySelector('header');
  const fixedNav = header.offsetTop;

  if (window.pageYOffset > fixedNav) {
    header.classList.add('navbar-fixed');
  } else {
    header.classList.remove('navbar-fixed');
  }
};

// Hamburger
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('hamburger-active');
  navMenu.classList.toggle('hidden');
});

// JavaScript untuk pergantian background
const heroSection = document.querySelector('.hero-bg');
const backgrounds = ['bg-hero-1', 'bg-hero-2', 'bg-hero-3'];
let currentBackground = 0;

setInterval(() => {
  heroSection.classList.remove(backgrounds[currentBackground]);
  currentBackground = (currentBackground + 1) % backgrounds.length;
  heroSection.classList.add(backgrounds[currentBackground]);
}, 5000);
