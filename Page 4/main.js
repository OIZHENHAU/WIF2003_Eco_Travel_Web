document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const profileForm = document.getElementById('profileForm');
  const profileImageWrapper = document.getElementById('profileImageWrapper');
  const imageInput = document.getElementById('imageInput');
  const deleteAccountBtn = document.getElementById('deleteAccountBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const successMessage = document.getElementById('successMessage');
  const spinnerOverlay = document.getElementById('spinnerOverlay');
  
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
      document.getElementById('profileName').textContent = displayName || 'User Name';
      document.getElementById('profileEmail').textContent = profile.email || 'user@example.com';
    }
  };
  
  // Load saved profile image or show default avatar
  const loadProfileImage = () => {
    const savedImage = localStorage.getItem('userProfileImage');
    const profileImage = document.getElementById('profileImage');
    const headerAvatar = document.getElementById('header-avatar');
    
    if (savedImage) {
      profileImage.src = savedImage;
      headerAvatar.src = savedImage;
    } else {
      profileImage.style.display = 'none';
      profileImageWrapper.insertAdjacentHTML('afterbegin', defaultAvatarSvg);
      headerAvatar.style.display = 'none';
      headerAvatar.parentElement.insertAdjacentHTML('afterbegin', defaultAvatarSvg);
    }
  };
  
  // Initialize
  loadProfile();
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
  
  // Handle form submission
  profileForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      showSpinner('Updating profile...');
      
      const formData = new FormData(profileForm);
      const profile = Object.fromEntries(formData.entries());
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.setItem('userProfile', JSON.stringify(profile));
      
      // Update display name and email
      const displayName = `${profile.firstName} ${profile.lastName}`.trim();
      document.getElementById('profileName').textContent = displayName;
      document.getElementById('profileEmail').textContent = profile.email;
      
      hideSpinner();
      showSuccess('Profile updated successfully!');
    }
  });
  
  // Handle profile image update
  profileImageWrapper.addEventListener('click', () => {
    imageInput.click();
  });
  
  imageInput.addEventListener('change', async (e) => {
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
        document.getElementById('header-avatar').src = result;
        document.getElementById('header-avatar').style.display = 'block';
        localStorage.setItem('userProfileImage', result);
        
        hideSpinner();
        showSuccess('Profile image updated successfully!');
      };
      reader.readAsDataURL(file);
    }
  });
  
  // Handle delete account
  let deleteConfirmation = false;
  deleteAccountBtn.addEventListener('click', async () => {
    if (deleteConfirmation) {
      showSpinner('Deleting account...');
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      localStorage.removeItem('userProfile');
      localStorage.removeItem('userProfileImage');
      profileForm.reset();
      
      // Reset profile image to default
      document.getElementById('profileImage').style.display = 'none';
      document.getElementById('header-avatar').style.display = 'none';
      
      if (!profileImageWrapper.querySelector('.default-avatar')) {
        profileImageWrapper.insertAdjacentHTML('afterbegin', defaultAvatarSvg);
        document.querySelector('.user-avatar').insertAdjacentHTML('afterbegin', defaultAvatarSvg);
      }
      
      document.getElementById('profileName').textContent = 'User Name';
      document.getElementById('profileEmail').textContent = 'user@example.com';
      
      deleteConfirmation = false;
      deleteAccountBtn.textContent = 'Delete Account';
      deleteAccountBtn.classList.remove('confirm');
      
      hideSpinner();
      showSuccess('Account deleted successfully!');
    } else {
      deleteConfirmation = true;
      deleteAccountBtn.textContent = 'Confirm Delete';
      deleteAccountBtn.classList.add('confirm');
      
      setTimeout(() => {
        deleteConfirmation = false;
        deleteAccountBtn.textContent = 'Delete Account';
        deleteAccountBtn.classList.remove('confirm');
      }, 3000);
    }
  });
  
  // Handle logout
  logoutBtn.addEventListener('click', async () => {
    showSpinner('Logging out...');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    hideSpinner();
    showSuccess('Logged out successfully!');
  });
  
  // Clear error messages on input
  profileForm.querySelectorAll('input, select, textarea').forEach(input => {
    input.addEventListener('input', () => {
      input.nextElementSibling.textContent = '';
    });
  });
});