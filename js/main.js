import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

console.log("Newsletter script loaded");

document.getElementById("newsletter-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;

    alert("Thank you for subscribing!");
});

function redirectToFavorites() {
    window.location.href = '../favorites/favorites.html';
}

// Call the function to force the index page to open favorites.html
redirectToFavorites();
