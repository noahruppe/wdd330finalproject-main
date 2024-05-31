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
        event.preventDefault(); 

    
        const basePath = '/wdd330finalproject-main/favorites/favorites.html';
        
        
        window.location.href = basePath;
    });
}


setupFavoritesRedirection();
