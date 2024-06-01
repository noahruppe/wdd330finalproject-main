if (window.location.pathname.endsWith('index.html')) {
    // Get the favorites link element
    var favoritesLink = document.getElementById('favorites');
    // Update the href attribute to point to index.html
    favoritesLink.href = 'favorites/favorites.html';
}