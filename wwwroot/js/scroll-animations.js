
const initScrollAnimations = () => {
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    // Fade in and slide up for sections
    const fadeUpElements = document.querySelectorAll('.product-card, .stat-card, .animate-on-scroll');

    fadeUpElements.forEach((el) => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none none"
            },
            y: 30, // Reduced from 50 for subtlety and performance
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all"
        });
    });

    // Staggered animation for grids
    const grids = document.querySelectorAll('.product-grid, .grid');
    grids.forEach(grid => {
        const children = grid.children;
        if (children.length > 0) {
            gsap.from(children, {
                scrollTrigger: {
                    trigger: grid,
                    start: "top 85%",
                },
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                clearProps: "all"
            });
        }
    });

    // Heading animations
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: "top 90%",
            },
            x: -20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
            clearProps: "all"
        });
    });

    // Special hero animation
    const hero = document.querySelector('.gallery-hero');
    if (hero) {
        gsap.from(hero, {
            scale: 0.95,
            opacity: 0,
            duration: 1.2,
            ease: "expo.out",
            clearProps: "all"
        });
    }
};

// Export to window for page transitions
window.initScrollAnimations = initScrollAnimations;

// Initial run
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
} else {
    initScrollAnimations();
}
