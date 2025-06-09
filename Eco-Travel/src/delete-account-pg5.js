// JavaScript for Delete Account Page

document.addEventListener('DOMContentLoaded', function() {
    const confirmTextInput = document.getElementById('confirm-text');
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const cancelBtn = document.querySelector('.btn-cancel');

    confirmTextInput.addEventListener('input', function() {
        deleteAccountBtn.disabled = this.value.trim() !== 'CONFIRM';
    });

    deleteAccountBtn.addEventListener('click', function() {
        if (confirmTextInput.value.trim() === 'CONFIRM') {
            fetch('/delete-my-account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    window.location.href = '/'; // Or "/index", depending on your route
                } else {
                    alert('Failed to delete account.');
                }
            })
            .catch(err => {
                console.error('Error:', err);
            });
        }
    });

    cancelBtn.addEventListener('click', function() {
        window.history.back();
    });
});