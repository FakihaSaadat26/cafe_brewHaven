/* ============================================
   BREW HAVEN CAFÉ - MAIN JAVASCRIPT
   Interactivity & Dynamic Functionality
   ============================================ */

// ============================================
// PAGE LOAD ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.animation = 'fadeInUp 0.8s ease-out';
});

// ============================================
// DARK MODE TOGGLE
// ============================================

const darkModeBtn = document.getElementById('dark-mode-btn');
const htmlElement = document.documentElement;

// Initialize dark mode from localStorage
const isDarkMode = localStorage.getItem('darkMode') === 'enabled';
if (isDarkMode) {
    enableDarkMode();
}

// Dark mode button click handler
darkModeBtn.addEventListener('click', toggleDarkMode);

function toggleDarkMode() {
    const isCurrentlyDark = htmlElement.classList.contains('dark-mode');
    
    if (isCurrentlyDark) {
        disableDarkMode();
    } else {
        enableDarkMode();
    }
}

function enableDarkMode() {
    htmlElement.classList.add('dark-mode');
    darkModeBtn.textContent = '☀️';
    localStorage.setItem('darkMode', 'enabled');
    // Add animation
    darkModeBtn.style.animation = 'rotateIn 0.4s ease-out';
}

function disableDarkMode() {
    htmlElement.classList.remove('dark-mode');
    darkModeBtn.textContent = '🌙';
    localStorage.setItem('darkMode', 'disabled');
    // Add animation
    darkModeBtn.style.animation = 'rotateIn 0.4s ease-out';
}

// ============================================
// STICKY NAVBAR & MOBILE MENU TOGGLE
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(10px, 10px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        
        // Reset hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Update active nav link based on current page
function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateActiveNavLink);

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollToTopBtn = document.getElementById('scroll-to-top');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
    
    // Add parallax effect to hero
    const hero = document.querySelector('.hero');
    if (hero && window.scrollY < window.innerHeight) {
        hero.style.backgroundPosition = `0 ${window.scrollY * 0.5}px`;
    }
});

// Scroll to top on button click with animation
scrollToTopBtn.addEventListener('click', () => {
    scrollToTopBtn.style.animation = 'bounce 0.4s ease-out';
    
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============================================
// MENU FILTERING (Menu Page)
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', filterMenu);
    });
}

function filterMenu(e) {
    // Update active button with animation
    filterButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    e.target.classList.add('active');
    e.target.style.animation = 'scaleIn 0.3s ease-out';
    
    // Get the selected filter
    const selectedFilter = e.target.getAttribute('data-filter');
    
    // Filter menu items with animation
    let delayCounter = 0;
    menuItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        if (selectedFilter === 'all' || itemCategory === selectedFilter) {
            // Show item
            item.classList.remove('hidden');
            item.style.animation = 'none';
            // Trigger reflow to restart animation
            void item.offsetWidth;
            item.style.animation = `fadeInUp 0.5s ease-out ${delayCounter * 0.05}s`;
            delayCounter++;
        } else {
            // Hide item
            item.classList.add('hidden');
            item.style.animation = 'none';
        }
    });
}

// ============================================
// FORM VALIDATION & SUBMISSION (Contact Page)
// ============================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    // Clear previous messages
    clearFormMessages();
    
    // Validate form
    if (validateForm()) {
        // Form is valid - show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
        
        // Scroll to form
        contactForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function validateForm() {
    let isValid = true;
    
    // Get form fields
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    // Validate Name
    if (!name.value.trim()) {
        showError(name, 'Name is required');
        isValid = false;
    } else if (name.value.trim().length < 2) {
        showError(name, 'Name must be at least 2 characters');
        isValid = false;
    } else {
        clearError(name);
    }
    
    // Validate Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
        showError(email, 'Email is required');
        isValid = false;
    } else if (!emailRegex.test(email.value)) {
        showError(email, 'Please enter a valid email');
        isValid = false;
    } else {
        clearError(email);
    }
    
    // Validate Phone (optional but if provided, must be valid)
    if (phone.value.trim()) {
        const phoneRegex = /^[\d\s\-\(\)\+]+$/;
        if (!phoneRegex.test(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearError(phone);
        }
    }
    
    // Validate Subject
    if (!subject.value) {
        showError(subject, 'Please select a subject');
        isValid = false;
    } else {
        clearError(subject);
    }
    
    // Validate Message
    if (!message.value.trim()) {
        showError(message, 'Message is required');
        isValid = false;
    } else if (message.value.trim().length < 10) {
        showError(message, 'Message must be at least 10 characters');
        isValid = false;
    } else {
        clearError(message);
    }
    
    return isValid;
}

function showError(field, message) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
}

function clearError(field) {
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    errorElement.textContent = '';
}

function clearFormMessages() {
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error');
        const errorElement = group.querySelector('.error-message');
        if (errorElement) {
            errorElement.textContent = '';
        }
    });
}

function showSuccessMessage() {
    const formMessage = document.getElementById('form-message');
    formMessage.className = 'form-message success';
    formMessage.innerHTML = `
        <strong>✓ Success!</strong><br>
        Thank you for your message! We'll get back to you soon.
    `;
    formMessage.style.animation = 'slideDown 0.4s ease-out';
    
    // Hide message after 5 seconds with fade out
    setTimeout(() => {
        formMessage.style.animation = 'fadeInUp 0.4s ease-out reverse';
        setTimeout(() => {
            formMessage.classList.remove('success');
            formMessage.innerHTML = '';
        }, 400);
    }, 5000);
}

// Real-time validation on input
const formFields = document.querySelectorAll('#name, #email, #phone, #subject, #message');
formFields.forEach(field => {
    field.addEventListener('blur', () => {
        if (field.value.trim()) {
            // Validate individual field
            const fieldName = field.id;
            let isFieldValid = true;
            
            if (fieldName === 'name') {
                if (field.value.trim().length < 2) {
                    showError(field, 'Name must be at least 2 characters');
                    isFieldValid = false;
                }
            } else if (fieldName === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    showError(field, 'Please enter a valid email');
                    isFieldValid = false;
                }
            } else if (fieldName === 'phone') {
                const phoneRegex = /^[\d\s\-\(\)\+]*$/;
                if (field.value.trim() && !phoneRegex.test(field.value)) {
                    showError(field, 'Please enter a valid phone number');
                    isFieldValid = false;
                }
            } else if (fieldName === 'message') {
                if (field.value.trim().length < 10) {
                    showError(field, 'Message must be at least 10 characters');
                    isFieldValid = false;
                }
            }
            
            if (isFieldValid) {
                clearError(field);
            }
        }
    });
});

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ============================================
// PAGE TRANSITION EFFECTS
// ============================================

// Fade in elements on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Add animation to images
const images = document.querySelectorAll('img');
images.forEach((img, index) => {
    img.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s both`;
});

// ============================================
// LINE DRAW ANIMATION FOR HEADINGS
// ============================================

document.querySelectorAll('h2').forEach((heading, index) => {
    const underline = heading.querySelector('::after');
    heading.style.position = 'relative';
    heading.style.animation = `slideDown 0.6s ease-out ${index * 0.1}s both`;
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add staggered animation
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
            entry.target.style.opacity = '1';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and items
document.querySelectorAll('.featured-card, .menu-item, .benefit-card, .value-card, .team-member, .faq-item').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.animationDelay = `${index * 0.05}s`;
    observer.observe(el);
});

// ============================================
// DYNAMIC ELEMENT ANIMATIONS ON SCROLL
// ============================================

// Add cursor follow effect to cards on hover
document.querySelectorAll('.featured-card, .menu-item, .benefit-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(230, 126, 34, 0.1), transparent)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.background = '';
    });
});

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for smooth scrolling
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
        if (!lastRan) {
            func.apply(this, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(() => {
                if ((Date.now() - lastRan) >= limit) {
                    func.apply(this, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Button ripple effect
document.querySelectorAll('button, .cta-button, .cta-button-secondary').forEach(button => {
    button.addEventListener('click', function (e) {
        // Create ripple
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
    });
});

// Log page analytics (optional)
function logPageView() {
    const page = window.location.pathname;
    console.log(`Page viewed: ${page}`);
}

logPageView();

// ============================================
// MOBILE OPTIMIZATION
// ============================================

// Prevent zoom on double-tap
let lastTouchEnd = 0;
document.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 300) {
        e.preventDefault();
    }
    lastTouchEnd = now;
}, false);

// ============================================
// CONSOLE WELCOME MESSAGE
// ============================================

console.log(
    '%c☕ Welcome to Brew Haven Café! %c\n\n' +
    'Website built with ❤️ using HTML, CSS, and JavaScript\n' +
    'Now with dynamic animations, smooth transitions, and vibrant colors!\n' +
    'Enjoy your coffee! 😊\n\n' +
    'Features:\n' +
    '✨ Gradient animations\n' +
    '🎬 Smooth transitions\n' +
    '🌙 Dark mode support\n' +
    '📱 Fully responsive\n' +
    '⚡ High performance',
    'font-size: 18px; color: #C85A54; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);',
    'font-size: 12px; color: #8B6F47; font-family: monospace;'
);
