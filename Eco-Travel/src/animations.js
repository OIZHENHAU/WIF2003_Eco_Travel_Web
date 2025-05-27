document.addEventListener('DOMContentLoaded', function() {
  // Initial form animation
  const container = document.querySelector('.container');
  setTimeout(() => {
    container.style.opacity = '1';
  }, 100);
  
  // Switch animation effect
  const registerSwitch = document.querySelector('.register-switch');
  const loginSwitch = document.querySelector('.login-switch');
  const loginSection = document.querySelector('.login-section');
  const registerSection = document.querySelector('.register-section');
  
  function animateTransition(from, to) {
    // First fade out the current section
    from.style.transition = 'opacity 0.3s ease';
    from.style.opacity = '0';
    
    // After the fade out, switch sections and fade in the new one
    setTimeout(() => {
      from.classList.remove('active');
      to.classList.add('active');
      to.style.opacity = '0';
      
      // Force a reflow to ensure transitions work properly
      void to.offsetWidth;
      
      // Fade in the new section
      to.style.transition = 'opacity 0.3s ease, transform 0.6s ease-in-out';
      to.style.opacity = '1';
      
      // Reset transitions after animation completes
      setTimeout(() => {
        from.style.transition = '';
        to.style.transition = '';
      }, 600);
    }, 300);
  }
  
  registerSwitch.addEventListener('click', function() {
    animateTransition(loginSection, registerSection);
  });
  
  loginSwitch.addEventListener('click', function() {
    animateTransition(registerSection, loginSection);
  });
  
  // Ripple effect for buttons
  const buttons = document.querySelectorAll('.form-button, .switch-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
  
  // Input focus animations
  const formInputs = document.querySelectorAll('.form-input');
  
  formInputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
      this.style.transform = 'scale(1)';
    });
  });
  
  // Append ripple style
  const style = document.createElement('style');
  style.textContent = `
    .ripple {
      position: absolute;
      background-color: rgba(255, 255, 255, 0.4);
      border-radius: 50%;
      transform: scale(0);
      animation: ripple-animation 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes ripple-animation {
      to {
        transform: scale(4);
        opacity: 0;
      }
    }
    
    .form-button, .switch-btn {
      position: relative;
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
});