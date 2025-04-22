document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector('.dropdown-btn');
        const content = dropdown.querySelector('.dropdown-content');
        const span = btn.querySelector('span');
        const items = content.querySelectorAll('li');

        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeAllDropdowns(dropdown);
            content.classList.toggle('hidden');
        });

        items.forEach(item => {
            item.addEventListener('click', () => {
                span.textContent = item.textContent;
                content.classList.add('hidden');
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
        closeAllDropdowns();
    });

    function closeAllDropdowns(except = null) {
        dropdowns.forEach(dropdown => {
            if (dropdown !== except) {
                dropdown.querySelector('.dropdown-content').classList.add('hidden');
            }
        });
    }
});