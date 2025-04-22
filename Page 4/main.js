document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const profileForm = document.getElementById('profileForm');
    const profileImageWrapper = document.getElementById('profileImageWrapper');
    const imageInput = document.getElementById('imageInput');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const successMessage = document.getElementById('successMessage');
    
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
    
    // Load saved profile image
    const loadProfileImage = () => {
      const savedImage = localStorage.getItem('userProfileImage');
      if (savedImage) {
        document.getElementById('profileImage').src = savedImage;
        document.getElementById('header-avatar').src = savedImage;
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
    profileForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      if (validateForm()) {
        const formData = new FormData(profileForm);
        const profile = Object.fromEntries(formData.entries());
        
        localStorage.setItem('userProfile', JSON.stringify(profile));
        
        // Update display name and email
        const displayName = `${profile.firstName} ${profile.lastName}`.trim();
        document.getElementById('profileName').textContent = displayName;
        document.getElementById('profileEmail').textContent = profile.email;
        
        showSuccess('Profile updated successfully!');
      }
    });
    
    // Handle profile image update
    profileImageWrapper.addEventListener('click', () => {
      imageInput.click();
    });
    
    imageInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target.result;
          document.getElementById('profileImage').src = result;
          document.getElementById('header-avatar').src = result;
          localStorage.setItem('userProfileImage', result);
          showSuccess('Profile image updated successfully!');
        };
        reader.readAsDataURL(file);
      }
    });
    
    // Handle delete account
    let deleteConfirmation = false;
    deleteAccountBtn.addEventListener('click', () => {
      if (deleteConfirmation) {
        localStorage.removeItem('userProfile');
        localStorage.removeItem('userProfileImage');
        profileForm.reset();
        document.getElementById('profileImage').src = 'https://via.placeholder.com/150';
        document.getElementById('header-avatar').src = 'https://via.placeholder.com/40';
        document.getElementById('profileName').textContent = 'User Name';
        document.getElementById('profileEmail').textContent = 'user@example.com';
        deleteConfirmation = false;
        deleteAccountBtn.textContent = 'Delete Account';
        deleteAccountBtn.classList.remove('confirm');
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
    logoutBtn.addEventListener('click', () => {
      showSuccess('Logged out successfully!');
    });
    
    // Clear error messages on input
    profileForm.querySelectorAll('input, select, textarea').forEach(input => {
      input.addEventListener('input', () => {
        input.nextElementSibling.textContent = '';
      });
    });
  });