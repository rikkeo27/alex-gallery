// Toggle class active
const navbarNav = document.querySelector(".navbar-nav");
const hamburger = document.querySelector("#hamburger-menu");

// ketika hamburger-menu diklik
hamburger.onclick = () => {
  navbarNav.classList.toggle("active");
};

// klik di luar navbar-nav dan hamburger untuk menutup menu
document.addEventListener("click", function (e) {
  if (!navbarNav.contains(e.target) && !hamburger.contains(e.target)) {
    navbarNav.classList.remove("active");
  }
});
