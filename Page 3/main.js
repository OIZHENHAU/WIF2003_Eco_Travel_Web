document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const pageTransition = document.querySelector('.page-transition');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        menuIcon.classList.toggle('hidden');
        closeIcon.classList.toggle('hidden');
    });

    // Profile link transition
    const profileLink = document.getElementById('profileLink');
    profileLink.addEventListener('click', (e) => {
        e.preventDefault();
        const href = profileLink.getAttribute('href');
        
        // Start the transition
        pageTransition.classList.add('active');
        document.body.classList.add('transitioning');
        
        // Wait for the animation to complete before navigating
        setTimeout(() => {
            window.location.href = href;
        }, 300);
    });

    // Dropdown functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    const searchBtn = document.querySelector('.search-btn');
    const loaderContainer = document.querySelector('.loader-container');
    const searchResults = document.querySelector('.search-results');
    let isSearching = false;

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

    // Search functionality
    searchBtn.addEventListener('click', () => {
        if (isSearching) return;

        if (searchBtn.textContent === 'Reset Filter') {
            // Reset the form
            dropdowns.forEach(dropdown => {
                const span = dropdown.querySelector('.dropdown-btn span');
                span.textContent = span.closest('.dropdown-btn').dataset.type;
            });
            searchBtn.textContent = 'Search Now';
            searchResults.classList.add('hidden');
            return;
        }

        isSearching = true;
        searchBtn.textContent = 'Searching...';
        searchBtn.disabled = true;
        loaderContainer.classList.remove('hidden');
        searchResults.classList.add('hidden');

        // Simulate search delay
        setTimeout(() => {
            loaderContainer.classList.add('hidden');
            searchResults.classList.remove('hidden');
            searchResults.querySelector('p').textContent = 'Found 5 eco-friendly destinations in Malaysia matching your criteria!';
            searchBtn.textContent = 'Reset Filter';
            searchBtn.disabled = false;
            isSearching = false;
        }, 2500);
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.search-results') && !searchResults.classList.contains('hidden')) {
            searchResults.classList.add('hidden');
        }
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