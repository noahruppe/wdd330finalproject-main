import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

console.log("Newsletter script loaded");

document.getElementById("newsletter-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;

    alert("Thank you for subscribing!");
});

function setupFavoritesRedirection() {
    const favoritesLink = document.getElementById('favorites');
    favoritesLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default anchor behavior
        window.location.href = '../favorites/favorites.html'; // Redirect to favorites.html
    });
}

// Call the setup function to add the event listener
setupFavoritesRedirection();
