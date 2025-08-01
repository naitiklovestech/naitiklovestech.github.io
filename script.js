// Enhanced Accessibility and Interactive Features

// Floating Action Button functionality
function scrollToContact() {
  const contactSection = document.querySelector('#contact');
  if (contactSection) {
    contactSection.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Mobile Navigation Toggle with Accessibility
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu when clicking on a link
  document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }));
}

// Keyboard Navigation Support
document.addEventListener('keydown', (e) => {
  // Escape key to close mobile menu
  if (e.key === 'Escape') {
    if (navMenu && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  }

  // Tab key navigation improvements
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-navigation');
  }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-navigation');
});

// Smooth scrolling for navigation links with accessibility
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      // Announce to screen readers
      announceToScreenReader(`Navigating to ${this.textContent} section`);
      
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Update active navigation
      updateActiveNavLink();
    }
  });
});

// Screen reader announcement function
function announceToScreenReader(message) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Enhanced Navbar background change on scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(10, 10, 10, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(10, 10, 10, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  }
});

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      
      // Animate skill bars when skills section is visible
      if (entry.target.classList.contains('skill-category')) {
        const skillBars = entry.target.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
          const width = bar.style.width;
          bar.style.width = '0';
          setTimeout(() => {
            bar.style.width = width;
          }, 200);
        });
      }

      // Announce section to screen readers
      const sectionTitle = entry.target.querySelector('.section-title');
      if (sectionTitle) {
        announceToScreenReader(`Entered ${sectionTitle.textContent} section`);
      }
    }
  });
}, observerOptions);

// Observe all elements with fade-in class
document.addEventListener('DOMContentLoaded', () => {
  const fadeElements = document.querySelectorAll('.fade-in, .skill-category, .project-card, .contact-item');
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
  });
});

// Enhanced typing effect for hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect when page loads
document.addEventListener('DOMContentLoaded', () => {
  const heroTitle = document.querySelector('.hero-title .gradient-text');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 1000);
  }
});

// Enhanced parallax effect for hero section
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  const heroContent = document.querySelector('.hero-content');
  
  if (hero && heroContent && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const rate = scrolled * -0.5;
    heroContent.style.transform = `translateY(${rate}px)`;
  }
});

// Enhanced active navigation link highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// Enhanced project card interactions
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.style.transform = 'translateY(-10px) scale(1.02)';
    }
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0) scale(1)';
  });

  // Keyboard interaction for project cards
  card.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const link = this.querySelector('a[href]');
      if (link) {
        link.click();
      }
    }
  });
});

// Enhanced skill bar animation trigger
function animateSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');
  skillBars.forEach(bar => {
    const width = bar.style.width;
    bar.style.width = '0';
    setTimeout(() => {
      bar.style.width = width;
    }, 100);
  });
}

// Trigger skill bar animation when skills section is in view
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateSkillBars();
        skillsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  skillsObserver.observe(skillsSection);
}

// Enhanced contact form handling with better accessibility
document.addEventListener('DOMContentLoaded', () => {
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Real-time form validation
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
      input.addEventListener('blur', validateField);
      input.addEventListener('input', clearFieldError);
      input.addEventListener('keydown', handleFormKeyboard);
    });
  }
});

function handleFormKeyboard(e) {
  if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
    e.preventDefault();
    const nextInput = e.target.parentNode.nextElementSibling?.querySelector('input, textarea');
    if (nextInput) {
      nextInput.focus();
    }
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalBtnText = submitBtn.textContent;
  
  // Show loading state
  form.classList.add('loading');
  submitBtn.textContent = 'Sending...';
  submitBtn.setAttribute('aria-busy', 'true');
  
  // Remove any existing messages
  const existingMessage = form.querySelector('.form-message');
  if (existingMessage) {
    existingMessage.remove();
  }
  
  // Get form data
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Enhanced validation
  const errors = validateForm(data);
  if (errors.length > 0) {
    showFormErrors(form, errors);
    resetFormState(form, submitBtn, originalBtnText);
    return;
  }
  
  // Submit form using Formspree
  fetch(form.action, {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    if (response.ok) {
      showFormMessage(form, 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
      form.reset();
      announceToScreenReader('Message sent successfully');
    } else {
      throw new Error('Network response was not ok');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    showFormMessage(form, 'Sorry, there was an error sending your message. Please try again or email me directly.', 'error');
    announceToScreenReader('Error sending message');
  })
  .finally(() => {
    resetFormState(form, submitBtn, originalBtnText);
  });
}

function validateForm(data) {
  const errors = [];
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push({ field: 'name', message: 'Name must be at least 2 characters long' });
  }
  
  if (!data.email || !validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }
  
  if (!data.subject || data.subject.trim().length < 5) {
    errors.push({ field: 'subject', message: 'Subject must be at least 5 characters long' });
  }
  
  if (!data.message || data.message.trim().length < 10) {
    errors.push({ field: 'message', message: 'Message must be at least 10 characters long' });
  }
  
  return errors;
}

function showFormErrors(form, errors) {
  errors.forEach(error => {
    const field = form.querySelector(`[name="${error.field}"]`);
    const errorDiv = form.querySelector(`#${error.field}-error`);
    
    if (field && errorDiv) {
      field.classList.add('error');
      errorDiv.textContent = error.message;
      errorDiv.classList.add('show');
    }
  });
  
  announceToScreenReader(`Form has ${errors.length} error${errors.length > 1 ? 's' : ''}`);
}

function showFormMessage(form, message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `form-message ${type}`;
  messageDiv.textContent = message;
  messageDiv.setAttribute('role', 'alert');
  messageDiv.setAttribute('aria-live', 'polite');
  
  // Insert message after the form
  form.parentNode.insertBefore(messageDiv, form.nextSibling);
  
  // Auto-remove success messages after 5 seconds
  if (type === 'success') {
    setTimeout(() => {
      messageDiv.remove();
    }, 5000);
  }
}

function resetFormState(form, submitBtn, originalText) {
  form.classList.remove('loading');
  submitBtn.textContent = originalText;
  submitBtn.removeAttribute('aria-busy');
}

// Enhanced email validation
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Enhanced form field validation feedback
function validateField(e) {
  const field = e.target;
  const value = field.value.trim();
  const errorDiv = document.querySelector(`#${field.name}-error`);
  
  // Remove existing error styling
  field.classList.remove('error', 'valid');
  
  // Check if field is required and empty
  if (field.hasAttribute('required') && !value) {
    field.classList.add('error');
    if (errorDiv) {
      errorDiv.textContent = 'This field is required';
      errorDiv.classList.add('show');
    }
    return;
  }
  
  // Email validation
  if (field.type === 'email' && value && !validateEmail(value)) {
    field.classList.add('error');
    if (errorDiv) {
      errorDiv.textContent = 'Please enter a valid email address';
      errorDiv.classList.add('show');
    }
    return;
  }
  
  // Add success styling for valid fields
  if (value) {
    field.classList.add('valid');
    if (errorDiv) {
      errorDiv.classList.remove('show');
    }
  }
}

function clearFieldError(e) {
  const field = e.target;
  const errorDiv = document.querySelector(`#${field.name}-error`);
  
  field.classList.remove('error');
  if (errorDiv) {
    errorDiv.classList.remove('show');
  }
}

// Enhanced loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
  announceToScreenReader('Page loaded successfully');
});

// Enhanced reveal animation for sections
function revealOnScroll() {
  const reveals = document.querySelectorAll('.section');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize all animations
document.addEventListener('DOMContentLoaded', () => {
  revealOnScroll();
  updateActiveNavLink();
});

// Enhanced CSS for accessibility and interactions
const enhancedStyles = document.createElement('style');
enhancedStyles.textContent = `
  /* Keyboard navigation styles */
  .keyboard-navigation .nav-link:focus,
  .keyboard-navigation .btn:focus,
  .keyboard-navigation .project-link:focus,
  .keyboard-navigation .social-link:focus {
    outline: 3px solid #667eea;
    outline-offset: 2px;
  }
  
  /* Screen reader only content */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  /* Enhanced focus styles */
  .nav-link:focus,
  .btn:focus,
  .project-link:focus,
  .social-link:focus,
  .form-group input:focus,
  .form-group textarea:focus {
    outline: 2px solid #667eea;
    outline-offset: 2px;
  }
  
  /* Loading state for buttons */
  .btn[aria-busy="true"] {
    position: relative;
    color: transparent;
  }
  
  .btn[aria-busy="true"]::after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
  
  /* Enhanced form validation styles */
  .form-group input.error,
  .form-group textarea.error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
  }
  
  .form-group input.valid,
  .form-group textarea.valid {
    border-color: #22c55e !important;
    box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1) !important;
  }
  
  /* Enhanced hover effects for better accessibility */
  @media (hover: hover) {
    .project-card:hover {
      transform: translateY(-10px) scale(1.02);
    }
    
    .tech-item:hover {
      transform: translateY(-3px) scale(1.05);
    }
    
    .stat:hover {
      transform: translateY(-5px) scale(1.05);
    }
  }
  
  /* Reduced motion support */
  @media (prefers-reduced-motion: reduce) {
    .project-card:hover,
    .tech-item:hover,
    .stat:hover {
      transform: none;
    }
  }
`;
document.head.appendChild(enhancedStyles); 