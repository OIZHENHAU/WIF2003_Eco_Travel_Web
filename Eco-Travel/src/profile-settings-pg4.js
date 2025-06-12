document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const profileForm = document.getElementById('profileForm');
  const profileImageWrapper = document.getElementById('profileImageWrapper');
  const imageInput = document.getElementById('imageInput');
  const deleteAccountBtn = document.getElementById('deleteAccountBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const successMessage = document.getElementById('successMessage');
  const spinnerOverlay = document.getElementById('spinnerOverlay');
  
  // Create exit transition overlay element
  const exitTransitionOverlay = document.createElement('div');
  exitTransitionOverlay.className = 'exit-transition-overlay';
  document.body.appendChild(exitTransitionOverlay);
  
  // Create modal overlay
  const modalOverlay = document.createElement('div');
  modalOverlay.className = 'modal-overlay';
  modalOverlay.innerHTML = `
    <div class="modal">
      <h3 class="modal-title">Confirm Action</h3>
      <p class="modal-message"></p>
      <div class="modal-actions">
        <button class="modal-btn modal-btn-secondary" data-action="cancel">Cancel</button>
        <button class="modal-btn modal-btn-primary" data-action="confirm">Confirm</button>
      </div>
    </div>
  `;
  document.body.appendChild(modalOverlay);
  
  // Default avatar HTML
  const defaultAvatarSvg = `
    <svg class="default-avatar" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
    </svg>
  `;
  
  // Show/hide spinner
  const showSpinner = (message = 'Loading...') => {
    document.querySelector('.spinner-text').textContent = message;
    spinnerOverlay.classList.add('show');
  };
  
  const hideSpinner = () => {
    spinnerOverlay.classList.remove('show');
  };
  
  // Show modal
  const showModal = (title, message) => {
    return new Promise((resolve) => {
      const modal = modalOverlay.querySelector('.modal');
      modal.querySelector('.modal-title').textContent = title;
      modal.querySelector('.modal-message').textContent = message;
      
      const handleModalAction = (e) => {
        if (e.target.classList.contains('modal-btn')) {
          const action = e.target.dataset.action;
          modalOverlay.classList.remove('show');
          modal.removeEventListener('click', handleModalAction);
          resolve(action === 'confirm');
        }
      };
      
      modal.addEventListener('click', handleModalAction);
      modalOverlay.classList.add('show');
    });
  };
  
  // Page transition effect
  const startPageTransition = (targetUrl) => {
    // First add transition class to body
    document.body.classList.add('page-transition-out');
    
    // Then show exit transition overlay
    setTimeout(() => {
      exitTransitionOverlay.classList.add('active');
      
      // After overlay is fully visible, redirect to new page
      setTimeout(() => {
        window.location.href = targetUrl;
      }, 600);
    }, 300);
  };
  
  // Load saved profile from localStorage
  const loadProfile = () => {
    const savedProfile = localStorage.getItem('userProfile');
    if (savedProfile) {
      const profile = JSON.parse(savedProfile);
      Object.keys(profile).forEach(key => {
        const input = document.getElementById(key);
        if (input) input.value = profile[key];
      });
      
      // Update display name and email
      const displayName = `${profile.firstName} ${profile.lastName}`.trim();
      //document.getElementById('profileName').textContent = displayName || 'User Name';
      //document.getElementById('profileEmail').textContent = profile.email || 'user@example.com';
    }
  };
  
  // Load saved profile image or show default avatar
  const loadProfileImage = () => {
    const savedImage = localStorage.getItem('userProfileImage');
    const profileImage = document.getElementById('profileImage');
    
    if (savedImage) {
      profileImage.src = savedImage;
      
      // Update the user icon in the header with the profile image
      const userIcon = document.querySelector('.user-icon');
      if (userIcon) {
        // Create a new image element to replace the user icon
        const headerAvatar = document.createElement('img');
        headerAvatar.src = savedImage;
        headerAvatar.alt = 'User';
        headerAvatar.style.width = '30px';
        headerAvatar.style.height = '30px';
        headerAvatar.style.borderRadius = '50%';
        headerAvatar.style.objectFit = 'cover';
        
        // Replace the icon with the image
        userIcon.parentNode.replaceChild(headerAvatar, userIcon);
      }
    } else {
      profileImage.style.display = 'none';
      profileImageWrapper.insertAdjacentHTML('afterbegin', defaultAvatarSvg);
      
      // Keep the default user icon in the header
    }
  };
  
  // Initialize
  //loadProfile();
  loadProfileImage();
  
  // Show success message
  const showSuccess = (message) => {
    successMessage.textContent = message;
    successMessage.classList.remove('hidden');
    successMessage.classList.add('show');
    
    setTimeout(() => {
      successMessage.classList.remove('show');
      setTimeout(() => {
        successMessage.classList.add('hidden');
      }, 300);
    }, 3000);
  };
  
  // Validate form
  const validateForm = () => {
    let isValid = true;
    const inputs = profileForm.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
      const errorSpan = input.nextElementSibling;
      if (input.required && !input.value.trim()) {
        isValid = false;
        errorSpan.textContent = `${input.previousElementSibling.textContent} is required`;
      } else if (input.type === 'email' && input.value && !/\S+@\S+\.\S+/.test(input.value)) {
        isValid = false;
        errorSpan.textContent = 'Invalid email address';
      } else if (input.type === 'password' && input.value && input.value.length < 8) {
        isValid = false;
        errorSpan.textContent = 'Password must be at least 8 characters';
      } else {
        errorSpan.textContent = '';
      }
    });
    
    return isValid;
  };
  
  // Add animation to form elements
  const animateFormElements = () => {
    const formElements = document.querySelectorAll('.form-group');
    formElements.forEach((element, index) => {
      element.style.animation = `fadeInUp 0.4s ease-out ${0.1 + index * 0.05}s backwards`;
    });
  };
  
  // Run animations on page load
  animateFormElements();
  
  // Handle form submission
  profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      showSpinner('Updating profile...');
      
      const formData = new FormData(profileForm);
      const profile = Object.fromEntries(formData.entries());
      
      // Replace this:
// await new Promise(resolve => setTimeout(resolve, 1500));
// localStorage.setItem('userProfile', JSON.stringify(profile));

    // With this:
    try {
      const res = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profile)
      });

      const data = await res.json();
      if (res.ok) {
        showSuccess('Profile updated successfully!');
      } else {
        alert('Error: ' + data.message);
      }
    } catch (err) {
      
    }

      
      hideSpinner();
      showSuccess('Profile updated successfully!');
    }
  });
  
  // Handle profile image update
  document.getElementById('updateImageBtn').addEventListener('click', () => {
    imageInput.click();
  });
  
  /*imageInput.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (file) {
      showSpinner('Uploading image...');
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        const result = e.target.result;
        
        // Simulate upload delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Remove default avatar if exists
        const defaultAvatar = profileImageWrapper.querySelector('.default-avatar');
        if (defaultAvatar) {
          defaultAvatar.remove();
          document.getElementById('profileImage').style.display = 'block';
        }
        
        document.getElementById('profileImage').src = result;
        localStorage.setItem('userProfileImage', result);
        
        // Update the user icon in the header with the profile image
        const userIcon = document.querySelector('.user-icon');
        if (userIcon) {
          // Create a new image element to replace the user icon
          const headerAvatar = document.createElement('img');
          headerAvatar.src = result;
          headerAvatar.alt = 'User';
          headerAvatar.style.width = '30px';
          headerAvatar.style.height = '30px';
          headerAvatar.style.borderRadius = '50%';
          headerAvatar.style.objectFit = 'cover';
          
          // Replace the icon with the image
          userIcon.parentNode.replaceChild(headerAvatar, userIcon);
        }
        
        hideSpinner();
        showSuccess('Profile image updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  });
  */

  imageInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  showSpinner('Uploading image...');

  const formData = new FormData();
  formData.append('profileImage', file);

  try {
    const res = await fetch('/api/upload-profile-image', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();

    if (res.ok) {
      const result = data.imageUrl;

      // Update displayed image
      const profileImage = document.getElementById('profileImage');
      profileImage.style.display = 'block';
      profileImage.src = result;
      localStorage.setItem('userProfileImage', result);

      // Update header avatar
      const userIcon = document.querySelector('.user-icon');
      if (userIcon) {
        const headerAvatar = document.createElement('img');
        headerAvatar.src = result;
        headerAvatar.alt = 'User';
        headerAvatar.style.cssText = 'width:30px;height:30px;border-radius:50%;object-fit:cover;';
        userIcon.parentNode.replaceChild(headerAvatar, userIcon);
      }

      showSuccess('Profile image updated successfully!');
    } else {
      alert('Upload failed: ' + data.message);
    }
  } catch (err) {
    console.error(err);
    alert('Upload error');
  } finally {
    hideSpinner();
  }
});

  
  // Handle delete account
  deleteAccountBtn.addEventListener('click', async () => {

    const confirmed = await showModal(
      'Delete Account',
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    
    if (confirmed) {
      showSpinner('Deleting account...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.removeItem('userProfile');
      localStorage.removeItem('userProfileImage');
      profileForm.reset();
      
      // Reset profile image to default
      document.getElementById('profileImage').style.display = 'none';
      
      if (!profileImageWrapper.querySelector('.default-avatar')) {
        profileImageWrapper.insertAdjacentHTML('afterbegin', defaultAvatarSvg);
        
        // Reset the user icon in the header
        const userAvatar = document.querySelector('.user-icon').parentNode.querySelector('img');
        if (userAvatar) {
          const userIcon = document.createElement('i');
          userIcon.className = 'fa-solid fa-circle-user user-icon';
          userAvatar.parentNode.replaceChild(userIcon, userAvatar);
        }
      }
      
      //document.getElementById('profileName').textContent = 'User Name';
      //document.getElementById('profileEmail').textContent = 'user@example.com';
      
      hideSpinner();
      showSuccess('Account deleted successfully!');
      
      // Start page transition after success message
      setTimeout(() => {
        startPageTransition('../Page 1 & 2/index.html');
      }, 1000);
    }
  });
  
  // Handle logout
  /*logoutBtn.addEventListener('click', async () => {
    window.location.href = `index.ejs`;

    const confirmed = await showModal(
      'Confirm Logout',
      'Are you sure you want to log out? You will need to log in again to access your account.'
    );
    
    if (confirmed) {
      showSpinner('Logging out...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      hideSpinner();
      showSuccess('Logged out successfully!');
      
      // After showing success message, start transition and redirect
      setTimeout(() => {
        startPageTransition('index.ejs');
      }, 800);
    }
  });
  */
  
  // Clear error messages on input
  profileForm.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.nextElementSibling.textContent = '';
    });
  });
  
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mousedown', function(e) {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});