
function toggleTheme() {
    const body = document.getElementById('body-theme');
    const isDark = !body.classList.contains('light-mode');

    if (isDark) {
        body.classList.add('light-mode');

        document.documentElement.style.setProperty('--bg-color', '#f3f4f6');
        document.documentElement.style.setProperty('--text-color', '#1f2937');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        localStorage.setItem('theme', 'light');
    } else {
        body.classList.remove('light-mode');

        document.documentElement.style.setProperty('--bg-color', '#0b0c15');
        document.documentElement.style.setProperty('--text-color', '#ffffff');
        document.documentElement.style.setProperty('--card-bg', '#151621');
        localStorage.setItem('theme', 'dark');
    }
}


function toggleUserDropdown() {
    const menu = document.getElementById('user-dropdown');
    menu.classList.toggle('hidden');
}


document.addEventListener('click', function (event) {
    const container = document.getElementById('user-menu-container');
    const menu = document.getElementById('user-dropdown');
    if (container && !container.contains(event.target)) {
        if (menu && !menu.classList.contains('hidden')) {
            menu.classList.add('hidden');
        }
    }
});


(function () {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        const body = document.getElementById('body-theme');
        if (body) body.classList.add('light-mode');
        document.documentElement.style.setProperty('--bg-color', '#f3f4f6');
        document.documentElement.style.setProperty('--text-color', '#1f2937');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
    }
})();
