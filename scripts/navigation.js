const menuButton = document.getElementById("menu-button");
const navMenu = document.getElementById("nav-menu");

menuButton.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    if (navMenu.classList.contains("open")) {
        menuButton.innerHTML = "X";
    } else {
        menuButton.innerHTML = "&#9776;";
    }
});