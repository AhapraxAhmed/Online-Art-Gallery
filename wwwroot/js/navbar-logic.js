document.addEventListener('DOMContentLoaded', () => {

    /* =========================
       NAVBAR LOGIC
    ========================== */

    const header = document.getElementById('main-header');
    const container = document.getElementById('nav-container');

    // Toggle menus (mobile / user dropdown)
    window.toggleMenu = function (menuId) {
        const menu = document.getElementById(menuId);
        if (menu) {
            menu.classList.toggle('hidden');
            menu.classList.toggle('flex');

            // Prevent body scroll when mobile menu is open
            if (menuId === 'mobile-nav') {
                if (!menu.classList.contains('hidden')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            }
        }
    };

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        const userDropdown = document.getElementById('user-dropdown');
        const mobileNav = document.getElementById('mobile-nav');

        // user dropdown click outside
        if (userDropdown && !userDropdown.classList.contains('hidden')) {
            if (!e.target.closest('.relative')) {
                userDropdown.classList.add('hidden');
                userDropdown.classList.remove('flex');
            }
        }
    });

    // Close dropdowns on scroll
    window.addEventListener('scroll', () => {
        const userDropdown = document.getElementById('user-dropdown');
        if (userDropdown && !userDropdown.classList.contains('hidden')) {
            userDropdown.classList.add('hidden');
            userDropdown.classList.remove('flex');
        }
    }, { passive: true });

    // Navbar scroll behavior
    window.handleScroll = function () {
        if (!header || !container) return;

        // Disable scroll logic on mobile/tablets
        if (window.innerWidth < 1024) {
            header.classList.add('top-0', 'left-0', 'w-full');
            header.classList.remove('top-4', 'left-1/2', '-translate-x-1/2', 'w-[95%]', 'max-w-7xl');
            container.classList.remove('glass-morphism', 'bg-glass', 'rounded-full', 'shadow-2xl', 'py-3', 'px-8');
            container.classList.add('py-6', 'bg-transparent', 'border-b', 'border-[#ffffff10]', 'rounded-b-[2.5rem]');
            return;
        }

        if (window.scrollY > 50) {
            header.classList.remove('top-0', 'left-0', 'w-full');
            header.classList.add('top-4', 'left-1/2', '-translate-x-1/2', 'w-[95%]', 'max-w-7xl');

            container.classList.add(
                'glass-morphism', 'bg-glass', 'rounded-full',
                'shadow-2xl', 'py-3', 'px-8'
            );
            container.classList.remove(
                'py-6', 'bg-transparent', 'border-b',
                'border-[#ffffff10]', 'rounded-b-[2.5rem]'
            );
        } else {
            header.classList.add('top-0', 'left-0', 'w-full');
            header.classList.remove('top-4', 'left-1/2', '-translate-x-1/2', 'w-[95%]', 'max-w-7xl');

            container.classList.remove(
                'glass-morphism', 'bg-glass', 'rounded-full',
                'shadow-2xl', 'py-3', 'px-8'
            );
            container.classList.add(
                'py-6', 'bg-transparent', 'border-b',
                'border-[#ffffff10]', 'rounded-b-[2.5rem]'
            );
        }
    };

    window.handleScroll();
    window.addEventListener('scroll', window.handleScroll);
    window.addEventListener('resize', window.handleScroll);


    /* =========================
       EYE FOLLOW CURSOR (INDEPENDENT)
    ========================== */

    let mouseX = 0;
    let mouseY = 0;
    let ticking = false;

    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (!ticking) {
            window.requestAnimationFrame(updateEyes);
            ticking = true;
        }
    }, { passive: true });

    function updateEyes() {
        const eyes = document.querySelectorAll('.eye-socket');

        eyes.forEach(eye => {
            const pupil = eye.querySelector('.pupil');
            if (!pupil) return;

            const rect = eye.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = mouseX - centerX;
            const dy = mouseY - centerY;

            const angle = Math.atan2(dy, dx);
            const maxMove = 4;

            pupil.style.transform = `translate(${Math.cos(angle) * maxMove}px, ${Math.sin(angle) * maxMove}px)`;
        });
        ticking = false;
    }


    /* =========================
       POINTER DETECTION (INDEPENDENT)
    ========================== */

    const pointerSelector = 'a, button, input, textarea, select, [role="button"]';

    document.addEventListener('mouseover', function (e) {
        if (e.target.closest(pointerSelector)) {
            document.body.classList.add('pointer-active');
        }
    });

    document.addEventListener('mouseout', function (e) {
        const el = e.target.closest(pointerSelector);
        if (!el) return;

        // Prevent flicker when moving inside the same element
        if (!el.contains(e.relatedTarget)) {
            document.body.classList.remove('pointer-active');
        }
    });

});
