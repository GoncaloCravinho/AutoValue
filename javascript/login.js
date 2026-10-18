/* LOGIN PAGE */

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const showPassword = document.getElementById("show-password");
const loginMessage = document.getElementById("login-message");

/* SHOW / HIDE PASSWORD */

showPassword.addEventListener("change", () => {
  if (showPassword.checked) {
    passwordInput.type = "text";
  } else {
    passwordInput.type = "password";
  }
});

/* LOGIN FORM VALIDATION */

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  loginMessage.textContent = "";

  if (email === "" || password === "") {
    loginMessage.textContent = "Please fill in all fields.";
    return;
  }

  if (!emailInput.validity.valid) {
    loginMessage.textContent = "Please enter a valid email address.";
    return;
  }

  loginMessage.textContent =
    "Authentication is not available yet. Please try again later.";
});
