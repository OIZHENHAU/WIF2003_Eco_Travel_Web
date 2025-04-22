const container = document.getElementById('main-container');
const toggleBtn = document.getElementById('toggle-button');
const title = document.getElementById('toggle-title');
const text = document.getElementById('toggle-text');
const loadingOverlay = document.getElementById('loading');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const darkToggleInput = document.getElementById('darkModeToggle');
const passwordToggles = document.querySelectorAll('.toggle-password');

toggleBtn.addEventListener('click', () => {
  container.classList.toggle('active');
  if (container.classList.contains('active')) {
    title.textContent = 'Hello, Friend!';
    text.textContent = "Already have an account?";
    toggleBtn.textContent = 'Login';
  } else {
    title.textContent = 'Welcome Back!';
    text.textContent = "Do you have an account?";
    toggleBtn.textContent = 'Register';
  }
});

function simulateLoading() {
  loadingOverlay.style.display = "flex";
  setTimeout(() => {
    loadingOverlay.style.display = "none";
    alert("✅ Form submitted! (Backend simulation)");
  }, 2000);
}

loginBtn.addEventListener("click", simulateLoading);

registerBtn.addEventListener("click", () => {
  const emailInput = document.getElementById("registerEmail");
  const passwordInput = document.getElementById("registerPassword");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");

  const emailValue = emailInput.value.trim();
  const passwordValue = passwordInput.value;

  const emailValid = /^[^\s@]+@[^\s@]+\.(com|net|org|edu|gov|my|co|io)$/.test(emailValue);
  const passwordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/.test(passwordValue);

  if (!emailValid) {
    emailInput.style.border = "1px solid red";
    emailError.style.display = "block";
  } else {
    emailInput.style.border = "";
    emailError.style.display = "none";
  }

  if (!passwordValid) {
    passwordInput.style.border = "1px solid red";
    passwordError.style.display = "block";
  } else {
    passwordInput.style.border = "";
    passwordError.style.display = "none";
  }

  if (emailValid && passwordValid) {
    simulateLoading();
  } else {
    alert("❌ Please fix the errors before registering.");
  }
});

darkToggleInput.addEventListener("change", () => {
  document.body.classList.add("transitioning");
  setTimeout(() => {
    document.body.classList.toggle("dark-mode");
    setTimeout(() => {
      document.body.classList.remove("transitioning");
    }, 400);
  }, 100);
});

passwordToggles.forEach(toggle => {
  toggle.addEventListener('click', () => {
    const inputId = toggle.getAttribute('data-toggle');
    const input = document.getElementById(inputId);
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    toggle.classList.toggle('fa-eye');
    toggle.classList.toggle('fa-eye-slash');
  });
});