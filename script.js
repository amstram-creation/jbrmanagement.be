// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');

menuToggle.addEventListener('click', () => {
  const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
  menuToggle.setAttribute('aria-expanded', !expanded);
  mainNav.classList.toggle('show');
});

// Modal Functionality
const modal = document.getElementById('contact-modal');
const contactBtns = document.querySelectorAll(
  '#contact-btn, #hero-contact-btn, #footer-contact-btn'
);
const closeModal = document.querySelector('.close-modal');
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');
let lastFocusedElement;

contactBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    lastFocusedElement = document.activeElement;
    modal.style.display = 'block';
    // Set focus to the modal content for accessibility
    modal.querySelector('.modal-content').focus();
  });
});

const closeTheModal = () => {
  modal.style.display = 'none';
  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
};

closeModal.addEventListener('click', closeTheModal);

window.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeTheModal();
  }
});

// Close modal on Escape key press
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.style.display === 'block') {
    closeTheModal();
  }
});

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Here you would typically process the form data with AJAX
  // For this demo, we'll just show a success message

  // Reset form
  contactForm.reset();

  // Hide modal
  modal.style.display = 'none';

  // Show toast notification
  toast.className = 'toast show';

  // Hide toast after 3 seconds
  setTimeout(() => {
    toast.className = toast.className.replace('show', '');
  }, 3000);
});

// Language Switcher
const langBtns = document.querySelectorAll('.lang-switcher button');

langBtns.forEach((btn) => {
  btn.addEventListener('click', function () {
    // Remove active class from all buttons
    langBtns.forEach((b) => b.classList.remove('active'));

    // Add active class to clicked button
    this.classList.add('active');

    // Here you would typically implement language switching functionality
    const lang = this.getAttribute('data-lang');
    console.log(`Switching to ${lang} language`);

    // For demonstration, show toast with language change message
    toast.textContent = `Langue changée en ${
      lang === 'fr' ? 'Français' : lang === 'en' ? 'Anglais' : 'Néerlandais'
    }`;
    toast.className = 'toast show';

    setTimeout(() => {
      toast.className = toast.className.replace('show', '');
    }, 3000);
  });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    // Skip if it's a modal trigger
    if (
      this.id === 'contact-btn' ||
      this.id === 'hero-contact-btn' ||
      this.id === 'footer-contact-btn'
    ) {
      return;
    }

    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Close mobile menu if open
      mainNav.classList.remove('show');
      menuToggle.setAttribute('aria-expanded', 'false');
    }
  });
});
