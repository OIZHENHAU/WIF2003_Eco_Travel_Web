document.addEventListener('DOMContentLoaded', function() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;
  
  // Check local storage for dark mode preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  
  // Apply dark mode if saved in preferences
  if (isDarkMode) {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  }
  
  // Toggle dark mode when switch is clicked
  darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
      body.classList.add('dark-mode');
      localStorage.setItem('darkMode', 'true');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('darkMode', 'false');
    }
  });
  
  // Smoothly apply dark mode if user prefers it
  const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (prefersDarkMode && localStorage.getItem('darkMode') === null) {
    body.classList.add('dark-mode');
    darkModeToggle.checked = true;
    localStorage.setItem('darkMode', 'true');
  }
  
  // Listen for system dark mode changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    if (localStorage.getItem('darkMode') === null) {
      if (e.matches) {
        body.classList.add('dark-mode');
        darkModeToggle.checked = true;
      } else {
        body.classList.remove('dark-mode');
        darkModeToggle.checked = false;
      }
    }
  });
});