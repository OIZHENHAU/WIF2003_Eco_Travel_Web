document.addEventListener('DOMContentLoaded', function() {
    // Real-time validation for username
    const registerUsername = document.getElementById('registerUsername');
    const usernameError = document.getElementById('usernameError');
    
    registerUsername.addEventListener('input', function() {
      if (this.value.length < 3 && this.value.length > 0) {
        usernameError.textContent = 'Username must be at least 3 characters';
        usernameError.classList.add('visible');
      } else {
        usernameError.textContent = '';
        usernameError.classList.remove('visible');
      }
    });
    
    // Real-time validation for email
    const registerEmail = document.getElementById('registerEmail');
    const emailError = document.getElementById('emailError');
    
    registerEmail.addEventListener('input', function() {
      if (this.value && !isValidEmail(this.value)) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.classList.add('visible');
      } else {
        emailError.textContent = '';
        emailError.classList.remove('visible');
      }
    });
    
    // Real-time validation and strength meter for password
    const registerPassword = document.getElementById('registerPassword');
    const passwordError = document.getElementById('passwordError');
    const strengthSections = document.querySelectorAll('.strength-section');
    
    registerPassword.addEventListener('input', function() {
      const password = this.value;
      const strength = calculatePasswordStrength(password);
      
      // Update strength meter
      updatePasswordStrengthMeter(strength);
      
      // Show error if password is weak
      if (password && strength === 0) {
        passwordError.textContent = 'Password is too weak';
        passwordError.classList.add('visible');
      } else if (password && strength < 3) {
        passwordError.textContent = 'Consider using a stronger password';
        passwordError.classList.add('visible');
      } else {
        passwordError.textContent = '';
        passwordError.classList.remove('visible');
      }
    });
    
    // Helper functions
    function isValidEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    
    function calculatePasswordStrength(password) {
      if (!password) return 0;
      
      let strength = 0;
      
      // Length check
      if (password.length >= 8) strength += 1;
      if (password.length >= 12) strength += 1;
      
      // Complexity checks
      if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
      if (/[0-9]/.test(password)) strength += 1;
      if (/[^A-Za-z0-9]/.test(password)) strength += 1;
      
      return Math.min(strength, 4);
    }
    
    function updatePasswordStrengthMeter(strength) {
      // Reset all sections
      strengthSections.forEach(section => {
        section.className = 'strength-section';
      });
      
      // Apply appropriate classes based on strength
      for (let i = 0; i < strength; i++) {
        if (strength === 1) {
          strengthSections[i].classList.add('weak');
        } else if (strength === 2) {
          strengthSections[i].classList.add('medium');
        } else if (strength >= 3) {
          strengthSections[i].classList.add('strong');
        }
      }
    }
  
    // Form blur/focus effects
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
      });
    });
  });