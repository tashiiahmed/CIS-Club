
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
    initializeBackgroundSlider();
    initializeScrollToTop();
});
function initializeNavigation() {
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('main-nav');

    if (navToggle && mainNav) {
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mainNav.classList.toggle('active');
            const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !isExpanded);
            const hamburger = navToggle.querySelector('.hamburger');
            if (hamburger) {
                hamburger.classList.toggle('active');
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.site-header') && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                const hamburger = navToggle.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            }
        });

        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                const hamburger = navToggle.querySelector('.hamburger');
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
            });
        });
    }

    updateActiveNavLink();
}

function updateActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

function initializeBackgroundSlider() {
    const bgSlides = document.querySelectorAll('.hero-bg-slide');
    const bgDots = document.querySelectorAll('.bg-dot');
    const bgPrevBtn = document.getElementById('bgSliderPrev');
    const bgNextBtn = document.getElementById('bgSliderNext');
    const heroSlider = document.querySelector('.hero-bg-slider');

    if (!bgSlides.length) return;

    let currentBgSlide = 0;
    let bgSlideInterval;

    function showBgSlide(index) {
        bgSlides.forEach(slide => slide.classList.remove('active'));
        bgDots.forEach(dot => dot.classList.remove('active'));
        bgSlides[index].classList.add('active');
        if (bgDots[index]) {
            bgDots[index].classList.add('active');
        }
        currentBgSlide = index;
    }

    function nextBgSlide() {
        currentBgSlide = (currentBgSlide + 1) % bgSlides.length;
        showBgSlide(currentBgSlide);
    }

    function prevBgSlide() {
        currentBgSlide = (currentBgSlide - 1 + bgSlides.length) % bgSlides.length;
        showBgSlide(currentBgSlide);
    }

    function startBgAutoSlide() {
        bgSlideInterval = setInterval(nextBgSlide, 3000);
    }

    function stopBgAutoSlide() {
        clearInterval(bgSlideInterval);
    }

    if (bgPrevBtn) {
        bgPrevBtn.addEventListener('click', () => {
            stopBgAutoSlide();
            prevBgSlide();
            startBgAutoSlide();
        });
    }

    if (bgNextBtn) {
        bgNextBtn.addEventListener('click', () => {
            stopBgAutoSlide();
            nextBgSlide();
            startBgAutoSlide();
        });
    }

    bgDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            stopBgAutoSlide();
            showBgSlide(index);
            startBgAutoSlide();
        });
    });

    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopBgAutoSlide);
        heroSlider.addEventListener('mouseleave', startBgAutoSlide);
    }

    startBgAutoSlide();
}

function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (!scrollToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

console.log('CIS Club Website loaded successfully');