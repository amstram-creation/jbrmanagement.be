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
  const translations = {
    // Header and navigation
    'nav-home': {
      en: 'Home',
      nl: 'Home',
    },
    'nav-services': {
      en: 'Services',
      nl: 'Diensten',
    },
    'nav-about': {
      en: 'About',
      nl: 'Over Ons',
    },
    'nav-contact': {
      en: 'Contact',
      nl: 'Contact',
    },

    // Hero section
    'hero-title': {
      en: 'Expert in Property Management',
      nl: 'Expert in Gebouwenbeheer',
    },
    'hero-text': {
      en: 'With over 40 years of experience in Belgium, France and Quebec, Jean-Pierre Lannoy puts his expertise at the service of conflict prevention in co-ownership and training of real estate professionals.',
      nl: 'Met meer dan 40 jaar ervaring in België, Frankrijk en Quebec, stelt Jean-Pierre Lannoy zijn expertise ten dienste van conflictpreventie in mede-eigendom en opleiding van vastgoedprofessionals.',
    },
    'hero-btn': {
      en: 'Contact us',
      nl: 'Neem contact op',
    },

    // Services section
    'services-title': {
      en: 'Our Services',
      nl: 'Onze Diensten',
    },
    'service1-title': {
      en: 'Co-ownership Management',
      nl: 'Beheer van Mede-eigendom',
    },
    'service1-text': {
      en: 'Professional administration of co-ownerships with over 40 years of experience. We develop effective processes to prevent conflicts and ensure harmonious management.',
      nl: 'Professioneel beheer van mede-eigendommen met meer dan 40 jaar ervaring. We ontwikkelen effectieve processen om conflicten te voorkomen en een harmonieus beheer te verzekeren.',
    },
    'service2-title': {
      en: 'Real Estate Training',
      nl: 'Vastgoedopleidingen',
    },
    'service2-text': {
      en: 'Specialized training for real estate professionals and co-owners. Our expertise is recognized throughout Belgium, France and Quebec.',
      nl: 'Gespecialiseerde opleidingen voor vastgoedprofessionals en mede-eigenaars. Onze expertise wordt erkend in België, Frankrijk en Quebec.',
    },
    'service3-title': {
      en: 'Legal Advice',
      nl: 'Juridisch Advies',
    },
    'service3-text': {
      en: 'Specialized legal support in resolving co-ownership conflicts. Jean-Pierre Lannoy holds several judicial mandates as provisional administrator.',
      nl: 'Gespecialiseerde juridische ondersteuning bij het oplossen van conflicten in mede-eigendom. Jean-Pierre Lannoy heeft verschillende gerechtelijke mandaten als voorlopig beheerder.',
    },

    // About section
    'about-title': {
      en: 'About JBR Management',
      nl: 'Over JBR Management',
    },
    'about-subtitle': {
      en: 'Real Estate Expertise for over 40 years',
      nl: 'Vastgoedexpertise voor meer dan 40 jaar',
    },
    'about-p1': {
      en: 'Jean-Pierre Lannoy has developed his entire professional activity through co-ownership in Belgium, France and Quebec. As an author of publications, he has notably addressed the need to develop all useful processes aimed at preventing conflicts in co-ownership.',
      nl: 'Jean-Pierre Lannoy heeft zijn hele professionele activiteit ontwikkeld via mede-eigendom in België, Frankrijk en Quebec. Als auteur heeft hij met name de noodzaak benadrukt om alle nuttige processen te ontwikkelen die gericht zijn op het voorkomen van conflicten in mede-eigendom.',
    },
    'about-p2': {
      en: 'Real estate agent and provisional administrator by judicial mandate, he has been an administrator of several important organizations in the real estate sector, including the Belgian Association of Trustees and Property Administrators (ABSA), the Federation of French-speaking Real Estate Agents of Belgium (FEDERIA) and the Center for Real Estate Studies and Training (CEFIM), of which he is the President.',
      nl: 'Als vastgoedmakelaar en voorlopig beheerder via gerechtelijk mandaat, is hij bestuurder geweest van verschillende belangrijke organisaties in de vastgoedsector, waaronder de Belgische Vereniging van Syndici en Beheerders van Onroerende Goederen (ABSA), de Federatie van Franstalige Vastgoedmakelaars van België (FEDERIA) en het Centrum voor Vastgoedstudies en -Opleiding (CEFIM), waarvan hij de voorzitter is.',
    },
    'about-p3': {
      en: 'Trainer with numerous organizations (CEFIM, FS 323, EFP IFAPME, HOMEGRADE, CIRE), speaker and author of articles on the challenges of co-ownership, he now focuses his activities on training and digitalizing training courses dedicated to the real estate world.',
      nl: 'Als trainer bij talrijke organisaties (CEFIM, FS 323, EFP IFAPME, HOMEGRADE, CIRE), spreker en auteur van artikelen over de uitdagingen van mede-eigendom, concentreert hij zijn activiteiten nu op training en het digitaliseren van opleidingstrajecten voor de vastgoedwereld.',
    },

    // Contact section
    'contact-title': {
      en: 'Contact Us',
      nl: 'Neem Contact Op',
    },
    'contact-role': {
      en: 'Co-ownership manager',
      nl: 'Beheerder van mede-eigendom',
    },
    'contact-subtitle': {
      en: 'President of the CEFIM Center for Studies and Training',
      nl: 'Voorzitter van het CEFIM Centrum voor Studies en Opleiding',
    },
    'contact-email': {
      en: 'Email:',
      nl: 'E-mail:',
    },
    'contact-tel': {
      en: 'Tel:',
      nl: 'Tel:',
    },
    'contact-address': {
      en: 'Address',
      nl: 'Adres',
    },
    'contact-phone': {
      en: 'Phone',
      nl: 'Telefoon',
    },
    'contact-office': {
      en: 'Office:',
      nl: 'Kantoor:',
    },
    'contact-mobile': {
      en: 'Mobile:',
      nl: 'Mobiel:',
    },
    'contact-btn': {
      en: 'Contact Us',
      nl: 'Neem Contact Op',
    },

    // Footer
    'footer-about': {
      en: 'Professional real estate management, brokerage and co-ownership administration services in Brussels.',
      nl: 'Professionele diensten voor vastgoedbeheer, makelaardij en administratie van mede-eigendom in Brussel.',
    },
    'footer-quicklinks': {
      en: 'Quick Links',
      nl: 'Snelle Links',
    },
    'footer-services': {
      en: 'Services',
      nl: 'Diensten',
    },
    'footer-service1': {
      en: 'Real Estate Brokerage',
      nl: 'Vastgoedmakelaardij',
    },
    'footer-service2': {
      en: 'Trustee Management',
      nl: 'Syndicus Beheer',
    },
    'footer-service3': {
      en: 'Rental Management',
      nl: 'Verhuurbeheer',
    },
    'footer-partner': {
      en: 'Partner Institutions',
      nl: 'Partner Instellingen',
    },
    'footer-copyright': {
      en: '© 2025 JBR Management. All rights reserved.',
      nl: '© 2025 JBR Management. Alle rechten voorbehouden.',
    },

    // Modal
    'modal-title': {
      en: 'Contact Us',
      nl: 'Neem Contact Op',
    },
    'modal-name': {
      en: 'Name',
      nl: 'Naam',
    },
    'modal-phone': {
      en: 'Phone',
      nl: 'Telefoon',
    },
    'modal-service': {
      en: 'Service',
      nl: 'Dienst',
    },
    'modal-service1': {
      en: 'Co-ownership Management',
      nl: 'Beheer van Mede-eigendom',
    },
    'modal-service2': {
      en: 'Real Estate Training',
      nl: 'Vastgoedopleiding',
    },
    'modal-service3': {
      en: 'Legal Advice',
      nl: 'Juridisch Advies',
    },
    'modal-message': {
      en: 'Message',
      nl: 'Bericht',
    },
    'modal-submit': {
      en: 'Send',
      nl: 'Verzenden',
    },
    'toast-success': {
      en: 'Your message has been sent successfully!',
      nl: 'Uw bericht is succesvol verzonden!',
    },
  };
  new Kortex();
});
