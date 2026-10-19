/* PROFILE PAGE */

const profileForm = document.getElementById("profile-form");

const nameInput = document.getElementById("profile-name");
const emailInput = document.getElementById("profile-email");
const createdAt = document.getElementById("profile-created");

const editButton = document.getElementById("edit-profile");
const cancelButton = document.getElementById("cancel-edit");
const saveButton = document.getElementById("save-profile");
const editActions = document.getElementById("edit-actions");

const profileMessage = document.getElementById("profile-message");
const logoutButton = document.getElementById("logout-button");

/* ORIGINAL USER DATA */

let originalName = "";
let originalEmail = "";

/* EDIT MODE */

function setEditMode(isEditing) {
  nameInput.disabled = !isEditing;
  emailInput.disabled = !isEditing;

  editButton.hidden = isEditing;
  editActions.hidden = !isEditing;
}

/* EDIT PROFILE */

editButton.addEventListener("click", () => {
  if (!nameInput.value || !emailInput.value) {
    profileMessage.textContent = "Account information is not available yet.";
    return;
  }

  originalName = nameInput.value;
  originalEmail = emailInput.value;

  profileMessage.textContent = "";
  setEditMode(true);

  nameInput.focus();
});

/* CANCEL EDIT */

cancelButton.addEventListener("click", () => {
  nameInput.value = originalName;
  emailInput.value = originalEmail;

  profileMessage.textContent = "";
  setEditMode(false);
});

/* SAVE PROFILE */

profileForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  profileMessage.textContent = "";

  if (name.length < 2) {
    profileMessage.textContent = "Name must contain at least 2 characters.";
    return;
  }

  if (!emailInput.validity.valid || email === "") {
    profileMessage.textContent = "Please enter a valid email address.";
    return;
  }

  profileMessage.textContent = "Profile updates are not available yet.";

  // Future integration:
  // PATCH /api/users/me
});

/* LOGOUT */

logoutButton.addEventListener("click", () => {
  profileMessage.textContent =
    "Logout is not available until authentication is implemented.";
});

/* INITIAL STATE */

setEditMode(false);
