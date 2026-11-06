const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.getElementById("navlinks");

menuToggle.addEventListener("click", () => {
  // toggle() adds the class if it is missing, removes it if it is there,
  // and returns true when the menu is now open
  const isOpen = navLinks.classList.toggle("open");

  // Keep screen readers informed about the state of the button
  menuToggle.setAttribute("aria-expanded", isOpen);
  menuToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
});
