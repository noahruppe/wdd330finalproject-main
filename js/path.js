// Check if the current page is index.html
if (window.location.pathname.endsWith('index.html')) {
    // Update the href attribute of the favorites link to point to favorites.html in the parent directory
    document.getElementById('favorites').href = '../favorites/favorites.html';
} else {
    // Update the href attribute of the favorites link to point to favorites.html in the current directory
    document.getElementById('favorites').href = 'favorites.html';
}
