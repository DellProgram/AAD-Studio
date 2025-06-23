document.addEventListener('DOMContentLoaded', () => {

    const mainHeader = document.getElementById('main-header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mainHeader && mobileMenuButton && mobileMenu) {
        const handleHeaderScroll = () => {
            if (window.scrollY > 50) {
                if (mainHeader.classList) mainHeader.classList.add('header-scrolled');
            } else {
                if (mainHeader.classList) mainHeader.classList.remove('header-scrolled');
            }
        };

        const toggleMobileMenu = () => {
            if (mobileMenu.classList) mobileMenu.classList.toggle('hidden');
        };
        
        window.addEventListener('scroll', handleHeaderScroll);
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    if (elementsToAnimate.length > 0) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        elementsToAnimate.forEach(el => {
            animationObserver.observe(el);
        });
    }

    const collageItems = document.querySelectorAll('.collage-item');
    if (collageItems.length > 0) {
        const collageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.style.getPropertyValue('--delay');
                    entry.target.style.transitionDelay = delay;
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        collageItems.forEach(item => {
            collageObserver.observe(item);
        });
    }

});