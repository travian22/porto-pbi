// Mobile menu functionality
const mobileMenuBtn = document.createElement('button');
mobileMenuBtn.className = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '☰';
const navbar = document.querySelector('.navbar');
navbar.insertBefore(mobileMenuBtn, document.querySelector('.nav-menu'));

mobileMenuBtn.addEventListener('click', () => {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? '✕' : '☰';
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navMenu = document.querySelector('.nav-menu');
    const isClickInsideNav = navbar.contains(e.target);
    
    if (!isClickInsideNav && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '☰';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.innerHTML = '☰';
        }
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Form submission handling
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // You can add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Navbar scroll effect
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollTop = scrollTop;
});

// Add animation to project cards when they come into view
const projectCards = document.querySelectorAll('.project-card');

const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});