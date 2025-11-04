// Compact BioPrint EDU - Main Script
// Interactive functionality and animations

(function() {
    'use strict';

    // ============================================
    // State Management
    // ============================================
    const state = {
        currentLanguage: 'ru',
        currentTheme: 'dark',
        currentCurrency: 'usd',
        currentPayment: 'purchase'
    };

    // Exchange rates (example)
    const EXCHANGE_RATES = {
        usd: 1,
        uzs: 12600 // 1 USD = 12,600 UZS (approximate)
    };

    // ============================================
    // Initialization
    // ============================================
    function init() {
        // Load saved preferences
        loadPreferences();
        
        // Initialize language
        applyTranslations();
        
        // Initialize theme
        applyTheme();
        
        // Setup event listeners
        setupEventListeners();
        
        // Initialize animations
        initAnimations();
        
        // Initialize forms
        initForms();
        
        // Initialize pricing
        updatePricing();
    }

    // ============================================
    // Preferences Management
    // ============================================
    function loadPreferences() {
        const savedLang = localStorage.getItem('cbp-lang');
        const savedTheme = localStorage.getItem('cbp-theme');
        
        if (savedLang && translations[savedLang]) {
            state.currentLanguage = savedLang;
        }
        
        if (savedTheme) {
            state.currentTheme = savedTheme;
        }
    }

    function savePreferences() {
        localStorage.setItem('cbp-lang', state.currentLanguage);
        localStorage.setItem('cbp-theme', state.currentTheme);
    }

    // ============================================
    // Language Management
    // ============================================
    function applyTranslations() {
        const elements = document.querySelectorAll('[data-i18n]');
        const currentTranslations = translations[state.currentLanguage] || translations.ru;
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = currentTranslations[key];
            
            if (translation) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else if (element.tagName === 'OPTION') {
                    element.textContent = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
        
        // Update lang buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === state.currentLanguage);
        });
        
        // Update document language
        document.documentElement.lang = state.currentLanguage;
        
        // Format hero title into lines of 2 words for better readability
        formatHeroTitleLines();
    }

    function formatHeroTitleLines() {
        const titleEl = document.querySelector('.hero-title');
        if (!titleEl) return;
        // Применяем форматирование только для русской локали
        if (state.currentLanguage !== 'ru') {
            // На не-русских языках оставляем текст как есть (одной строкой)
            const currentTranslations = translations[state.currentLanguage] || translations.ru;
            const key = titleEl.getAttribute('data-i18n');
            if (key && currentTranslations[key]) {
                titleEl.textContent = currentTranslations[key];
            }
            return;
        }
        const raw = (titleEl.textContent || '').trim().replace(/\s+/g, ' ');
        if (!raw) return;
        const words = raw.split(' ');
        const chunkSize = 2; // две слова на строку
        const lines = [];
        for (let i = 0; i < words.length; i += chunkSize) {
            lines.push(words.slice(i, i + chunkSize).join(' '));
        }
        titleEl.innerHTML = lines.map(l => `<span class="line">${l}</span>`).join('');
    }

    function switchLanguage(lang) {
        if (translations[lang]) {
            state.currentLanguage = lang;
            applyTranslations();
            savePreferences();
        }
    }

    // ============================================
    // Theme Management
    // ============================================
    function applyTheme() {
        document.body.classList.remove('theme-dark', 'theme-light');
        document.body.classList.add(`theme-${state.currentTheme}`);
    }

    function toggleTheme() {
        state.currentTheme = state.currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme();
        savePreferences();
    }

    // ============================================
    // Navigation
    // ============================================
    function setupNavigation() {
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const navLinks = document.querySelectorAll('.nav-link');
        const header = document.getElementById('header');
        
        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }
        
        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            });
        });
        
        // Close mobile menu on outside click
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                if (navToggle) navToggle.classList.remove('active');
            }
        });
        
        // Scroll header effect
        let lastScrollY = window.scrollY;
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            lastScrollY = window.scrollY;
        });
    }

    // ============================================
    // Sticky CTA
    // ============================================
    function setupStickyCTA() {
        const stickyCta = document.getElementById('stickyCta');
        const hero = document.getElementById('hero');
        
        if (!stickyCta || !hero) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    stickyCta.classList.remove('visible');
                } else {
                    stickyCta.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(hero);
    }

    // ============================================
    // Counter Animation
    // ============================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = Math.round(target);
                clearInterval(timer);
            } else {
                element.textContent = Math.round(current);
            }
        }, 16);
    }

    function setupCounters() {
        const counters = document.querySelectorAll('[data-count]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    const target = parseInt(entry.target.dataset.count);
                    entry.target.classList.add('counted');
                    animateCounter(entry.target, target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        counters.forEach(counter => observer.observe(counter));
    }

    // ============================================
    // FAQ Accordion
    // ============================================
    function setupFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active', !isActive);
            });
        });
    }

    // ============================================
    // Pricing Controls
    // ============================================
    function setupPricing() {
        // Currency switcher
        const currencyBtns = document.querySelectorAll('.currency-btn');
        currencyBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                state.currentCurrency = btn.dataset.currency;
                currencyBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updatePricing();
            });
        });
        
        // Payment method switcher
        const paymentBtns = document.querySelectorAll('.payment-btn');
        paymentBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                state.currentPayment = btn.dataset.payment;
                paymentBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                updatePricing();
            });
        });
    }

    function updatePricing() {
        const priceElements = document.querySelectorAll('.price-amount');
        
        priceElements.forEach(element => {
            const priceUsd = parseFloat(element.dataset.priceUsd);
            const priceUzs = parseFloat(element.dataset.priceUzs);
            
            if (!priceUsd || !priceUzs) return;
            
            let displayPrice;
            let currency;
            
            if (state.currentCurrency === 'usd') {
                displayPrice = priceUsd;
                currency = '$';
            } else {
                displayPrice = priceUzs;
                currency = '';
            }
            
            // Adjust for payment method
            if (state.currentPayment === 'rent') {
                displayPrice = Math.round(displayPrice / 12); // Monthly rent
            } else if (state.currentPayment === 'installment') {
                displayPrice = Math.round(displayPrice / 12); // Monthly installment
            }
            
            // Format number
            const formatted = new Intl.NumberFormat(
                state.currentLanguage === 'uz' ? 'uz-UZ' : 'ru-RU'
            ).format(displayPrice);
            
            element.textContent = formatted;
            
            // Update currency symbol
            const currencySymbol = element.previousElementSibling;
            if (currencySymbol && currencySymbol.classList.contains('price-currency')) {
                currencySymbol.textContent = state.currentCurrency === 'usd' ? '$' : '';
            }
            
            // Update period label
            const periodLabel = element.nextElementSibling;
            if (periodLabel && periodLabel.classList.contains('price-period')) {
                if (state.currentPayment === 'purchase') {
                    const translations = {
                        ru: 'единоразово',
                        uz: 'bir martalik',
                        en: 'one-time'
                    };
                    periodLabel.textContent = translations[state.currentLanguage] || translations.ru;
                } else {
                    const translations = {
                        ru: '/месяц',
                        uz: '/oy',
                        en: '/month'
                    };
                    periodLabel.textContent = translations[state.currentLanguage] || translations.ru;
                }
            }
        });
    }

    // ============================================
    // Forms
    // ============================================
    function initForms() {
        // Phone mask
        const phoneInputs = document.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                
                // Format: +998 (XX) XXX-XX-XX
                if (value.startsWith('998')) {
                    value = value.substring(3);
                }
                
                let formatted = '+998';
                if (value.length > 0) {
                    formatted += ' (' + value.substring(0, 2);
                }
                if (value.length >= 2) {
                    formatted += ') ' + value.substring(2, 5);
                }
                if (value.length >= 5) {
                    formatted += '-' + value.substring(5, 7);
                }
                if (value.length >= 7) {
                    formatted += '-' + value.substring(7, 9);
                }
                
                e.target.value = formatted;
            });
        });
        
        // Form submissions
        const forms = document.querySelectorAll('.contact-form');
        forms.forEach(form => {
            form.addEventListener('submit', handleFormSubmit);
        });
    }

    function handleFormSubmit(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate
        const consent = form.querySelector('input[name="consent"]');
        if (consent && !consent.checked) {
            alert(getTranslation('contact.consent'));
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = state.currentLanguage === 'ru' ? 'Отправка...' : 
                               state.currentLanguage === 'uz' ? 'Yuborilmoqda...' : 
                               'Sending...';
        
        // Simulate form submission (replace with actual API call)
        setTimeout(() => {
            console.log('Form submitted:', data);
            
            // Show success message
            const successMsg = state.currentLanguage === 'ru' ? 
                'Спасибо! Мы свяжемся с вами в ближайшее время.' :
                state.currentLanguage === 'uz' ?
                'Rahmat! Tez orada siz bilan bog\'lanamiz.' :
                'Thank you! We will contact you shortly.';
            
            alert(successMsg);
            
            // Reset form
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1500);
    }

    function getTranslation(key) {
        return translations[state.currentLanguage][key] || translations.ru[key] || '';
    }

    // ============================================
    // Animations
    // ============================================
    function initAnimations() {
        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe cards and sections
        const animatedElements = document.querySelectorAll('.glass-card, .step, .feature-card');
        animatedElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // ============================================
    // Smooth Scroll
    // ============================================
    function setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ============================================
    // Event Listeners Setup
    // ============================================
    function setupEventListeners() {
        // Language switcher
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                switchLanguage(btn.dataset.lang);
            });
        });
        
        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', toggleTheme);
        }
        
        // Setup other components
        setupNavigation();
        setupStickyCTA();
        setupCounters();
        setupFAQ();
        setupPricing();
        setupSmoothScroll();
    }

    // ============================================
    // Error Handling
    // ============================================
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
    });

    // ============================================
    // Load Event
    // ============================================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // ============================================
    // Performance Monitoring
    // ============================================
    window.addEventListener('load', () => {
        // Log performance metrics
        if ('performance' in window && 'getEntriesByType' in performance) {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', Math.round(perfData.loadEventEnd - perfData.fetchStart), 'ms');
        }
    });

    // ============================================
    // Service Worker Registration (PWA ready)
    // ============================================
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            // Uncomment to enable service worker
            // navigator.serviceWorker.register('/sw.js')
            //     .then(reg => console.log('Service Worker registered'))
            //     .catch(err => console.log('Service Worker registration failed'));
        });
    }

})();

// ============================================
// Export for testing (optional)
// ============================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { translations };
}

