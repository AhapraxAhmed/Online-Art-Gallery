document.addEventListener('DOMContentLoaded', () => {
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');

    // Only proceed if cursor elements exist
    if (!cursorDot || !cursorOutline) return;

    // Visibility state
    let isCursorVisible = false;

    const showCursor = () => {
        if (isCursorVisible) return;
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
        isCursorVisible = true;
    };

    const hideCursor = () => {
        if (!isCursorVisible) return;
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
        isCursorVisible = false;
    };

    // Initial position
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Movement Logic
    const onMouseMove = (e) => {
        showCursor();
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Instant movement for dot
        // We use simple transforms to avoid GSAP dependency overhead for the dot if desired,
        // but GSAP is smoother. Since GSAP is loaded in Layout, let's use it if available.

        if (typeof gsap !== 'undefined') {
            gsap.to(cursorDot, {
                x: mouseX,
                y: mouseY,
                duration: 0.1,
                ease: 'power2.out'
            });

            // Laggy movement for outline
            gsap.to(cursorOutline, {
                x: mouseX,
                y: mouseY,
                duration: 0.5,
                ease: 'power2.out'
            });
        } else {
            // Fallback
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
            cursorOutline.style.left = `${mouseX}px`;
            cursorOutline.style.top = `${mouseY}px`;
        }
    };

    window.addEventListener('mousemove', onMouseMove);

    // Hover Effects
    // We look for 'a', 'button', and elements with '.hover-target'
    const hoverElements = document.querySelectorAll('a, button, .hover-target, input, select, textarea');

    const addHoverEffect = () => {
        // Hide custom cursor elements so system cursor takes over
        cursorDot.style.opacity = '0';
        cursorOutline.style.opacity = '0';
    };

    const removeHoverEffect = () => {
        // Restore visibility
        cursorDot.style.opacity = '1';
        cursorOutline.style.opacity = '1';
        // Reset styles in case they were changed elsewhere (though we just hid them)
        cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', addHoverEffect);
        el.addEventListener('mouseleave', removeHoverEffect);
    });

    // Handle leaving the window
    document.addEventListener('mouseout', (e) => {
        if (e.relatedTarget === null) {
            hideCursor();
        }
    });

    document.addEventListener('mouseenter', showCursor);
});
