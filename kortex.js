class Kortex {
  constructor() {
    // DOM elements
    this.menuToggle = document.querySelector('.menu-toggle');
    this.mainNav = document.querySelector('.main-nav');
    this.modal = document.getElementById('contact-modal');
    this.contactBtns = document.querySelectorAll(
      '#contact-btn, #hero-contact-btn, #footer-contact-btn'
    );
    this.closeModal = document.querySelector('.close-modal');
    this.contactForm = document.getElementById('contact-form');
    this.toast = document.getElementById('toast');
    this.langBtns = document.querySelectorAll('.lang-switcher button');
    this.lastFocusedElement = null;

    this.initEventListeners();
  }

  initEventListeners() {
    // Mobile menu toggle
    this.menuToggle?.addEventListener('click', this.toggleMenu.bind(this));

    // Modal functionality
    this.contactBtns.forEach((btn) => {
      btn.addEventListener('click', this.openModal.bind(this));
    });

    this.closeModal?.addEventListener('click', this.closeTheModal.bind(this));

    window.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeTheModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.style.display === 'block') {
        this.closeTheModal();
      }
    });

    // Contact form
    this.contactForm?.addEventListener(
      'submit',
      this.handleFormSubmit.bind(this)
    );

    // Language switcher
    this.langBtns.forEach((btn) => {
      btn.addEventListener('click', this.switchLanguage.bind(this));
    });

    // Smooth scrolling
    this.initSmoothScrolling();
  }

  toggleMenu() {
    const expanded =
      this.menuToggle.getAttribute('aria-expanded') === 'true' || false;
    this.menuToggle.setAttribute('aria-expanded', !expanded);
    this.mainNav.classList.toggle('show');
  }

  openModal(e) {
    e.preventDefault();
    this.lastFocusedElement = document.activeElement;
    this.modal.style.display = 'block';
    // Set focus to the modal content for accessibility
    this.modal.querySelector('.modal-content').focus();
  }

  closeTheModal() {
    this.modal.style.display = 'none';
    if (this.lastFocusedElement) {
      this.lastFocusedElement.focus();
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();

    // Here you would typically process the form data with AJAX
    // For this demo, we'll just show a success message

    // Reset form
    this.contactForm.reset();

    // Hide modal
    this.modal.style.display = 'none';

    // Show toast notification
    this.showToast();
  }

  showToast(message = null) {
    if (message) {
      this.toast.textContent = message;
    }

    this.toast.className = 'toast show';

    // Hide toast after 3 seconds
    setTimeout(() => {
      this.toast.className = this.toast.className.replace('show', '');
    }, 3000);
  }

  switchLanguage(e) {
    // Remove active class from all buttons
    this.langBtns.forEach((btn) => btn.classList.remove('active'));

    // Add active class to clicked button
    e.currentTarget.classList.add('active');

    // Here you would typically implement language switching functionality
    const lang = e.currentTarget.getAttribute('data-lang');
    console.log(`Switching to ${lang} language`);

    // For demonstration, show toast with language change message
    const langNames = {
      fr: 'Français',
      en: 'Anglais',
      nl: 'Néerlandais',
    };

    this.showToast(`Langue changée en ${langNames[lang] || lang}`);
    this.translateContent(lang);
  }

  translateContent(lang) {
    if (lang === 'fr') {
      // Reset to original French content (no translation needed)
      document.querySelectorAll('[data-toki]').forEach((element) => {
        if (element.dataset.originalText) {
          element.textContent = element.dataset.originalText;
        }
      });
      return;
    }

    // Apply translations
    document.querySelectorAll('[data-toki]').forEach((element) => {
      const tokiKey = element.getAttribute('data-toki');
      const translation = translations[tokiKey];

      if (translation && translation[lang]) {
        // Store original text if not already stored
        if (!element.dataset.originalText) {
          element.dataset.originalText = element.textContent;
        }

        // Apply translation
        element.textContent = translation[lang];
      }
    });

    // Special handling for form elements
    document.querySelectorAll('option[data-toki]').forEach((option) => {
      const tokiKey = option.getAttribute('data-toki');
      const translation = translations[tokiKey];

      if (translation && translation[lang]) {
        if (!option.dataset.originalText) {
          option.dataset.originalText = option.textContent;
        }
        option.textContent = translation[lang];
      }
    });
  }

  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        // Skip if it's a modal trigger
        if (
          anchor.id === 'contact-btn' ||
          anchor.id === 'hero-contact-btn' ||
          anchor.id === 'footer-contact-btn'
        ) {
          return;
        }

        e.preventDefault();

        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });

          // Close mobile menu if open
          this.mainNav.classList.remove('show');
          this.menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }
}

// Usage
document.addEventListener('DOMContentLoaded', () => {
  const Kortex = new Kortex();
});
