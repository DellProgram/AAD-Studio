/*
================================================
Legacy Script File
================================================
NOTE: This file contains foundational JavaScript functionality. 
Many of these functions have been expanded upon or are now handled by 
more specific, consolidated scripts embedded directly in their 
respective HTML pages.

This file is preserved for reference. For the most current and complete
functionality, use scripts within the HTML files.
================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    // --- Element Selectors ---
    const mainHeader = document.getElementById('main-header');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const carousel = document.getElementById('services-carousel');

    // --- Header & Basic Navigation ---
    // This section handles the header's style change on scroll and the mobile menu toggle.
    if (mainHeader && mobileMenuButton && mobileMenu) {
        
        // Adds a 'header-scrolled' class to the header when the user scrolls down.
        const handleHeaderScroll = () => {
            if (window.scrollY > 50) {
                if (mainHeader.classList) mainHeader.classList.add('header-scrolled');
            } else {
                if (mainHeader.classList) mainHeader.classList.remove('header-scrolled');
            }
        };

        // Toggles the 'hidden' class to show or hide the mobile menu.
        const toggleMobileMenu = () => {
            if (mobileMenu.classList) mobileMenu.classList.toggle('hidden');
        };
        
        window.addEventListener('scroll', handleHeaderScroll);
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }

    // --- General Scroll Animations ---
    // Uses the Intersection Observer API to trigger animations when elements scroll into view.
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');
    if (elementsToAnimate.length > 0) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Prevents the animation from re-triggering.
                }
            });
        }, { threshold: 0.1 }); // Triggers when 10% of the element is visible.

        elementsToAnimate.forEach(el => {
            animationObserver.observe(el);
        });
    }

    // --- Collage Item Animations (Homepage) ---
    // A specific observer for collage items, allowing for staggered animation delays.
    const collageItems = document.querySelectorAll('.collage-item');
    if (collageItems.length > 0) {
        const collageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Applies a transition delay defined in the element's inline style (`--delay`).
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
    
    // --- Services Carousel (Homepage) ---
    // Manages the functionality for the services carousel on the index page.
    if (carousel) {
        const slides = carousel.querySelectorAll('.service-slide');
        const prevBtn = document.getElementById('prev-slide-btn');
        const nextBtn = document.getElementById('next-slide-btn');
        const dotsContainer = document.getElementById('carousel-dots');
        let currentSlide = 0;

        if (slides.length > 0) {
            dotsContainer.innerHTML = ''; // Clear any existing dots.

            // Creates a navigation dot for each slide.
            slides.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.classList.add('carousel-dot');
                dot.setAttribute('data-slide-to', i);
                dot.addEventListener('click', () => showSlide(i));
                dotsContainer.appendChild(dot);
            });
            
            const dots = dotsContainer.querySelectorAll('.carousel-dot');

            // Main function to display a specific slide.
            function showSlide(index) {
                // Allows the carousel to loop infinitely.
                if (index >= slides.length) {
                    index = 0;
                } else if (index < 0) {
                    index = slides.length - 1;
                }

                // Toggles the 'active' class on slides and dots.
                slides.forEach((slide, i) => {
                    slide.classList.toggle('active', i === index);
                });
                if(dots.length > 0) {
                    dots.forEach((dot, i) => {
                        dot.classList.toggle('active', i === index);
                    });
                }
                currentSlide = index;
            }

            // Attaches event listeners to the navigation buttons.
            prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
            nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
            
            showSlide(0); // Initialize the carousel to the first slide.
        }

        // --- Video Unmute Button Functionality ---
        // Toggles the 'muted' property of a video and updates the button icon.
        const unmuteButtons = document.querySelectorAll('.unmute-button');
        unmuteButtons.forEach(button => {
            const videoId = button.dataset.video;
            const video = document.getElementById(videoId);
            if (video) {
                button.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevents the parent link from being followed.
                    video.muted = !video.muted;
                    video.volume = 0.5; // Set a default volume when unmuted.
                    // Toggles between a "muted" and "unmuted" SVG icon.
                    button.innerHTML = video.muted 
                        ? `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zM6 5.04 4.312 6.39A.5.5 0 0 1 4 6.5H2v3h2a.5.5 0 0 1 .312.11L6 10.96V5.04z"/><path d="M13.854 5.146a.5.5 0 0 1 0 .708L12.207 7.5l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.207l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 7.5 9.146 5.854a.5.5 0 1 1 .708-.708L11.5 6.793l1.646-1.647a.5.5 0 0 1 .708 0z"/></svg>`
                        : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/><path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/><path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.489 3.489 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/></svg>`;
                });
            }
        });
    }
});
