document.addEventListener('DOMContentLoaded', function() {
  // Switch between login and register forms
  const registerSwitch = document.querySelector('.register-switch');
  const loginSwitch = document.querySelector('.login-switch');
  const loginSection = document.querySelector('.login-section');
  const registerSection = document.querySelector('.register-section');
  const loadingSpinner = document.querySelector('.loading-spinner');

  registerSwitch.addEventListener('click', function() {
    loginSection.classList.remove('active');
    registerSection.classList.add('active');
  });

  loginSwitch.addEventListener('click', function() {
    registerSection.classList.remove('active');
    loginSection.classList.add('active');
  });

  // Toggle password visibility
  const togglePasswordButtons = document.querySelectorAll('.toggle-password');
  
  togglePasswordButtons.forEach(button => {
    button.addEventListener('click', function() {
      const targetId = this.getAttribute('data-target');
      const passwordInput = document.getElementById(targetId);
      
      if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        this.classList.add('visible');
      } else {
        passwordInput.type = 'password';
        this.classList.remove('visible');
      }
    });
  });

  // Form submission handling
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!username || !password) {
      loginForm.classList.add('shake');
      setTimeout(() => {
        loginForm.classList.remove('shake');
      }, 600);
      return;
    }

    // Show loading spinner
    loadingSpinner.style.display = 'flex';
    
    // Simulate API call
    setTimeout(() => {
      loadingSpinner.style.display = 'none';
      alert('Login successful!');
    }, 2000);
  });

  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // Reset previous errors
    document.querySelectorAll('.error-message').forEach(el => {
      el.textContent = '';
      el.classList.remove('visible');
    });
    
    let hasError = false;
    
    // Validate username
    if (!username || username.length < 3) {
      const usernameError = document.getElementById('usernameError');
      usernameError.textContent = 'Username must be at least 3 characters';
      usernameError.classList.add('visible');
      hasError = true;
    }
    
    // Validate email
    if (!isValidEmail(email)) {
      const emailError = document.getElementById('emailError');
      emailError.textContent = 'Please enter a valid email address';
      emailError.classList.add('visible');
      hasError = true;
    }
    
    // Validate password
    if (!isStrongPassword(password)) {
      const passwordError = document.getElementById('passwordError');
      passwordError.textContent = 'Password must be at least 8 characters with letters and numbers';
      passwordError.classList.add('visible');
      hasError = true;
    }
    
    if (hasError) {
      registerForm.classList.add('shake');
      setTimeout(() => {
        registerForm.classList.remove('shake');
      }, 600);
      return;
    }

    // Show loading spinner
    loadingSpinner.style.display = 'flex';
    
    // Simulate API call
    setTimeout(() => {
      loadingSpinner.style.display = 'none';
      alert('Registration successful!');
      
      // Switch back to login
      registerSection.classList.remove('active');
      loginSection.classList.add('active');
    }, 2000);
  });

  // Helper functions
  function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function isStrongPassword(password) {
    return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
  }

  // Handle social login/register buttons
  const socialButtons = document.querySelectorAll('.social-btn');
  
  socialButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      
      let platform;
      if (this.classList.contains('facebook')) platform = 'Facebook';
      else if (this.classList.contains('google')) platform = 'Google';
      else if (this.classList.contains('linkedin')) platform = 'LinkedIn';
      
      // Show loading spinner
      loadingSpinner.style.display = 'flex';
      
      // Simulate social auth
      setTimeout(() => {
        loadingSpinner.style.display = 'none';
        alert(`${platform} authentication would happen here.`);
      }, 1500);
    });
  });

  // Forgot password functionality
  const forgotPasswordLink = document.querySelector('.forgot-password');
  
  forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = prompt('Enter your email to reset your password:');
    
    if (email && isValidEmail(email)) {
      // Show loading spinner
      loadingSpinner.style.display = 'flex';
      
      // Simulate password reset email
      setTimeout(() => {
        loadingSpinner.style.display = 'none';
        alert(`Password reset instructions would be sent to ${email}`);
      }, 1500);
    } else if (email) {
      alert('Please enter a valid email address');
    }
  });
});