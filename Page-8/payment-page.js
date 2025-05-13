// JavaScript for Payment Page

document.addEventListener('DOMContentLoaded', function() {
    // Payment method selection
    const paymentMethodBtns = document.querySelectorAll('.payment-method-btn');
    const creditCardForm = document.getElementById('credit-card-form');
    const checkoutBtn = document.querySelector('.btn-checkout');
    
    paymentMethodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            paymentMethodBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const method = this.getAttribute('data-method');
            
            if (method !== 'credit-card') {
                creditCardForm.style.opacity = '0.5';
                
                alert(`Redirecting to ${method} payment...`);
            } else {
                creditCardForm.style.opacity = '1';
            }
        });
    });
    
    // Credit card form validation
    const cardHolderName = document.getElementById('card-holder-name');
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    
    // Format card number with spaces
    cardNumber.addEventListener('input', function() {
        // Remove any non-digits
        let value = this.value.replace(/\D/g, '');
        
        // Add a space after every 4 digits
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        // Limit to 16 digits (19 with spaces)
        if (formattedValue.length > 19) {
            formattedValue = formattedValue.substring(0, 19);
        }
        
        this.value = formattedValue;
    });
    
    // Format expiry date with slash
    expiryDate.addEventListener('input', function() {
        // Remove any non-digits
        let value = this.value.replace(/\D/g, '');
        
        // Add slash after 2 digits (MM/YY)
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        
        // Limit to 4 digits (5 with slash)
        if (value.length > 5) {
            value = value.substring(0, 5);
        }
        
        this.value = value;
    });
    
    // Limit CVV to 3 or 4 digits
    cvv.addEventListener('input', function() {
        // Remove any non-digits
        let value = this.value.replace(/\D/g, '');
        
        // Limit to 4 digits
        if (value.length > 4) {
            value = value.substring(0, 4);
        }
        
        this.value = value;
    });
    
    // Form submission handler
    creditCardForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        let isValid = true;
        
        if (!cardHolderName.value.trim()) {
            highlightError(cardHolderName, 'Card holder name is required');
            isValid = false;
        }
        
        if (!cardNumber.value.trim() || cardNumber.value.replace(/\s/g, '').length < 16) {
            highlightError(cardNumber, 'Valid card number is required');
            isValid = false;
        }
        
        if (!expiryDate.value.trim() || expiryDate.value.length < 5) {
            highlightError(expiryDate, 'Valid expiry date is required');
            isValid = false;
        }
        
        if (!cvv.value.trim() || cvv.value.length < 3) {
            highlightError(cvv, 'Valid CVV is required');
            isValid = false;
        }
        
        if (isValid) {
            // Simulate processing payment
            checkoutBtn.textContent = 'Processing...';
            checkoutBtn.disabled = true;
            
            setTimeout(() => {
                alert('Payment processed successfully!');
                window.location.href = 'confirmation.html'; // Redirect to confirmation page
            }, 2000);
        }
    });
    
    // Helper function to highlight errors
    function highlightError(element, message) {
        element.style.borderColor = 'red';
        
        // Create error message if it doesn't exist
        let errorElement = element.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('div');
            errorElement.classList.add('error-message');
            errorElement.style.color = 'red';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '0.3rem';
            element.parentNode.insertBefore(errorElement, element.nextSibling);
        }
        
        errorElement.textContent = message;
        
        // Remove error on input
        element.addEventListener('input', function() {
            this.style.borderColor = '';
            if (errorElement) {
                errorElement.textContent = '';
            }
        });
    }
});