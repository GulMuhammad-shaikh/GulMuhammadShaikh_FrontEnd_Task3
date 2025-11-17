// DOM Elements
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillBars = document.querySelectorAll('.skill-percentage');
const contactForm = document.getElementById('contactForm');
const backToTopBtn = document.getElementById('backToTop');
const modal = document.getElementById('ctaModal');
const closeModal = document.querySelector('.close-modal');
const heroButtons = document.querySelectorAll('.hero-buttons .cta-button');

// Toggle mobile menu
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a link
navItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Burger animation
burger.addEventListener('click', () => {
    burger.classList.toggle('toggle');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Portfolio filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// Animate skill bars on scroll
const animateSkillBars = () => {
    const triggerBottom = window.innerHeight / 5 * 4;
    
    skillBars.forEach(bar => {
        const barTop = bar.getBoundingClientRect().top;
        
        if (barTop < triggerBottom) {
            const percentage = bar.getAttribute('data-percentage');
            bar.style.width = percentage + '%';
        }
    });
};

window.addEventListener('scroll', animateSkillBars);
window.addEventListener('load', animateSkillBars);

// Form validation and submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Reset error messages
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('messageError').textContent = '';
    document.getElementById('nameError').classList.remove('show');
    document.getElementById('emailError').classList.remove('show');
    document.getElementById('messageError').classList.remove('show');
    
    let isValid = true;
    
    // Name validation
    if (name === '') {
        document.getElementById('nameError').textContent = 'Please enter your name';
        document.getElementById('nameError').classList.add('show');
        isValid = false;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '') {
        document.getElementById('emailError').textContent = 'Please enter your email';
        document.getElementById('emailError').classList.add('show');
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address';
        document.getElementById('emailError').classList.add('show');
        isValid = false;
    }
    
    // Message validation
    if (message === '') {
        document.getElementById('messageError').textContent = 'Please enter your message';
        document.getElementById('messageError').classList.add('show');
        isValid = false;
    }
    
    if (isValid) {
        // Show success message
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
        formMessage.className = 'form-message success show';
        
        // Reset form
        contactForm.reset();
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    } else {
        // Show error message
        const formMessage = document.getElementById('formMessage');
        formMessage.textContent = 'Please correct the errors above.';
        formMessage.className = 'form-message error show';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.classList.remove('show');
        }, 5000);
    }
});

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

// Back to top functionality
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Modal functionality
heroButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Only open modal for the primary button
        if (button.classList.contains('primary')) {
            e.preventDefault();
            modal.style.display = 'block';
        }
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe all cards
document.querySelectorAll('.service-card, .project-card, .testimonial-card, .skill-item').forEach(card => {
    observer.observe(card);
});

// Observe about content
document.querySelectorAll('.about-text, .about-image').forEach(element => {
    observer.observe(element);
});

// Observe contact content
document.querySelectorAll('.contact-info, .contact-form').forEach(element => {
    observer.observe(element);
});

// Add animation classes
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .service-card, .project-card, .testimonial-card, .skill-item {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }
    
    .service-card.animate, .project-card.animate, .testimonial-card.animate, .skill-item.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .about-text, .about-image, .contact-info, .contact-form {
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(style);

// Add header background on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        header.style.padding = '10px 0';
    } else {
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        header.style.padding = '';
    }
});