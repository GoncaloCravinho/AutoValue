const registerForm = document.getElementById("register-form");
const nameInput = document.getElementById("full-name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirm-password");
const showPassword = document.getElementById("show-password");
const registerMessage = document.getElementById("register-message");

showPassword.addEventListener("change", () => {
  if (showPassword.checked) {
    passwordInput.type = "text";
    confirmPasswordInput.type = "text";
  } else {
    passwordInput.type = "password";
    confirmPasswordInput.type = "password";
  }
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const fullName = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  registerMessage.textContent = "";

  if (
    fullName === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    registerMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!emailInput.validity.valid) {
    registerMessage.textContent = "Please enter a valid email address.";
    return;
  }

  if (password.length < 8) {
    registerMessage.textContent =
      "Password must contain at least 8 characters.";
    return;
  }

  if (password !== confirmPassword) {
    registerMessage.textContent = "Passwords do not match.";
    return;
  }

  registerMessage.textContent =
    "Registration is not available yet. Please try again later.";
});
