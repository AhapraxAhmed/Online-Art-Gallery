
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('page-transition-container');
    const content = document.getElementById('page-content');
    const skeleton = document.getElementById('skeleton-overlay');

    if (!container || !content) return;

    let isTransitioning = false;

    const navigate = async (url, isBack = false) => {
        if (isTransitioning) return;
        isTransitioning = true;

        try {
            // 1. Show Skeleton and Fade Out Content
            const skeleton = document.getElementById('skeleton-overlay');
            if (skeleton) {
                // Determine which skeleton to show
                const path = new URL(url, window.location.origin).pathname.toLowerCase();
                let subId = 'sketch-default';

                if (path.includes('/product')) subId = 'sketch-gallery';
                else if (path.includes('/aboutcontact')) subId = 'sketch-about';
                else if (path.includes('/cart')) subId = 'sketch-cart';

                // Reset all sub-layouts
                skeleton.querySelectorAll('.skeleton-sub-layout').forEach(s => s.classList.remove('active'));
                const targetSub = document.getElementById(subId);
                if (targetSub) targetSub.classList.add('active');

                skeleton.classList.add('active');
            }
            gsap.to(content, { opacity: 0, scale: 0.98, duration: 0.3, ease: "power2.in" });

            // 2. Minimum 500ms delay + Fetch Content
            const minTime = new Promise(resolve => setTimeout(resolve, 500));
            const response = await fetch(url);
            const html = await response.text();

            // Wait for both
            await minTime;

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const newContent = doc.getElementById('page-content');
            const newTitle = doc.querySelector('title').innerText;

            if (!newContent) {
                window.location.href = url;
                return;
            }

            // 3. Swap Content
            content.innerHTML = newContent.innerHTML;
            document.title = newTitle;
            window.scrollTo(0, 0);

            if (!isBack) {
                history.pushState({ url }, newTitle, url);
            }

            // 4. Re-execute Scripts
            const scripts = content.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
                newScript.appendChild(document.createTextNode(oldScript.innerHTML));
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });

            // 5. Cleanup & Show New Content
            if (skeleton) skeleton.classList.remove('active');

            gsap.fromTo(content,
                { opacity: 0, scale: 1.02 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out", delay: 0.2 }
            );

            // Re-init global features
            if (window.initializeCursor) window.initializeCursor();
            if (window.initScrollAnimations) window.initScrollAnimations();
            if (window.ScrollTrigger) ScrollTrigger.refresh();

            updateActiveLinks(url);
            isTransitioning = false;

        } catch (error) {
            console.error('Navigation error:', error);
            window.location.href = url;
        }
    };

    const updateActiveLinks = (url) => {
        const path = new URL(url, window.location.origin).pathname;
        document.querySelectorAll('nav a, header a').forEach(a => {
            const h = a.getAttribute('href');
            if (!h) return;
            const aPath = new URL(h, window.location.origin).pathname;
            if (path === aPath) {
                a.classList.add('text-[var(--text-primary)]');
                a.classList.remove('text-[var(--text-secondary)]');
            } else if (!h.startsWith('#')) {
                a.classList.remove('text-[var(--text-primary)]');
                a.classList.add('text-[var(--text-secondary)]');
            }
        });
    };

    document.addEventListener('click', (e) => {
        const anchor = e.target.closest('a');
        if (!anchor) return;

        const href = anchor.getAttribute('href');
        if (!href || href.startsWith('#') || href.startsWith('javascript:') || anchor.target === '_blank') return;

        const url = new URL(href, window.location.origin);
        if (url.origin !== window.location.origin) return;
        if (href.includes('/api/') || href.includes('.pdf')) return;

        e.preventDefault();
        navigate(href);
    });

    window.addEventListener('popstate', (e) => {
        navigate(window.location.pathname, true);
    });
});
