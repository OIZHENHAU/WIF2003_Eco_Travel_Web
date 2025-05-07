// JavaScript for Delete Account Page

document.addEventListener('DOMContentLoaded', function() {
    const confirmTextInput = document.getElementById('confirm-text');
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const cancelBtn = document.querySelector('.btn-cancel');
    
    // Enable/disable delete button based on input
    confirmTextInput.addEventListener('input', function() {
        if (this.value.trim() === 'CONFIRM') {
            deleteAccountBtn.disabled = false;
        } else {
            deleteAccountBtn.disabled = true;
        }
    });
    
    // Delete account button click event
    deleteAccountBtn.addEventListener('click', function() {
        if (confirmTextInput.value.trim() === 'CONFIRM') {
            // You would typically make an API call here to delete the account
            alert('Your account has been deleted successfully.');
            window.location.href = 'index.html'; // Redirect to home page or login page
        }
    });
    
    // Cancel button click event
    cancelBtn.addEventListener('click', function() {
        window.history.back(); // Go back to the previous page
    });
});