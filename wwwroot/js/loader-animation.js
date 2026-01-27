document.addEventListener("DOMContentLoaded", () => {
    if (typeof gsap === 'undefined') return;

    const header = document.getElementById('main-header');
    const container = document.getElementById('nav-container');
    const logoWrapper = document.getElementById('nav-logo-wrapper');
    const mask = document.getElementById('loader-mask');
    const navLinks = document.getElementById('nav-links');
    const navActions = document.getElementById('nav-actions');

    if (!header || !logoWrapper || !mask) return;

    // Check if loader has already been shown in this session
    const hasShownLoader = sessionStorage.getItem('loaderShown');

    if (hasShownLoader) {
        // SKIP LOADER: Immediately set to navbar state
        header.classList.remove('inset-0', 'bg-black', 'items-center', 'justify-center', 'z-[200]', 'overflow-hidden');
        header.classList.add('top-0', 'left-0', 'w-full', 'z-[100]');
        header.style.overflow = 'visible'; // Ensure dropdowns aren't clipped

        // Remove the temporary bypass class
        document.documentElement.classList.remove('loader-already-shown');

        if (mask) mask.style.width = '100%';
        gsap.set(logoWrapper, { x: 0, y: 0, scale: 1 });
        gsap.set([navLinks, navActions], { opacity: 1, visibility: "visible" });

        const children = document.querySelectorAll('.nav-link, .btn-premium, #nav-actions > *');
        gsap.set(children, { clearProps: "all" });

        document.body.style.overflow = '';

        if (typeof window.handleScroll === 'function') {
            window.handleScroll();
        }
        return;
    }

    // 0. Initial State for First Load
    document.body.style.overflow = 'hidden';
    header.style.overflow = 'hidden'; // Keep hidden during movement starting later

    gsap.set([navLinks, navActions], { opacity: 0, visibility: "visible" });

    const allInteractiveItems = document.querySelectorAll('.nav-link, .btn-premium, #nav-actions > *');
    if (allInteractiveItems.length) {
        gsap.set(allInteractiveItems, { opacity: 0, y: 10 });
    }

    // Measure logo
    const logoRect = logoWrapper.getBoundingClientRect();
    const screenCenterX = window.innerWidth / 2;
    const screenCenterY = window.innerHeight / 2;
    const logoCenterX = logoRect.left + (logoRect.width / 2);
    const logoCenterY = logoRect.top + (logoRect.height / 2);

    const deltaX = screenCenterX - logoCenterX;
    const deltaY = screenCenterY - logoCenterY;

    // Position logo in center
    gsap.set(logoWrapper, {
        x: deltaX,
        y: deltaY,
        scale: 4,
        transformOrigin: "center center"
    });

    // 1. Progress Animation
    gsap.to(mask, {
        width: "100%",
        duration: 2.0, // Reduced from 2.5
        ease: "power2.inOut",
        onComplete: startTransition
    });

    function startTransition() {
        const tl = gsap.timeline({
            onComplete: () => {
                // Final Cleanup
                header.classList.remove('inset-0', 'bg-black', 'items-center', 'justify-center', 'z-[200]', 'overflow-hidden');
                header.classList.add('top-0', 'left-0', 'w-full', 'z-[100]');
                header.style.overflow = 'visible'; // CRITICAL: Allow dropdowns to show

                document.documentElement.classList.remove('loader-already-shown');
                gsap.set([header, logoWrapper, navLinks, navActions], { clearProps: "all" });

                const items = document.querySelectorAll('.nav-link, .btn-premium, #nav-actions > *');
                gsap.set(items, { clearProps: "all" });

                document.body.style.overflow = '';
                sessionStorage.setItem('loaderShown', 'true');

                if (typeof window.handleScroll === 'function') {
                    window.handleScroll();
                }
            }
        });

        // Step A: Header shrinks
        gsap.set(header, { bottom: 'auto', height: '100%' });

        tl.to(header, {
            height: "80px",
            backgroundColor: "rgba(2, 4, 10, 0.95)",
            duration: 1.1, // Reduced from 1.5
            ease: "expo.inOut"
        }, 0);

        // Step B: Logo moves back
        tl.to(logoWrapper, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 1.1, // Reduced from 1.5
            ease: "expo.inOut"
        }, 0);

        // Step C: Reveal links and actions
        tl.to([navLinks, navActions], {
            opacity: 1,
            duration: 0.4 // Reduced from 0.5
        }, "-=0.6"); // Adjusted offset

        if (navLinks) {
            tl.to(navLinks.querySelectorAll('.nav-link'), {
                y: 0,
                opacity: 1,
                duration: 0.5, // Reduced from 0.6
                stagger: 0.04, // Reduced from 0.05
                ease: "power2.out"
            }, "-=0.5");
        }

        if (navActions) {
            tl.to(navActions.children, {
                x: 0,
                y: 0,
                opacity: 1,
                duration: 0.5, // Reduced from 0.6
                stagger: 0.04, // Reduced from 0.05
                ease: "power2.out"
            }, "-=0.5");
        }
    }
});
