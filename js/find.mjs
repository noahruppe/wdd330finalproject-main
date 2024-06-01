// Define a function to get the paths to index.html and favorites.html
function getPaths() {
    const pathParts = window.location.pathname.split('/');
    const basePath = pathParts.includes('country-list') || pathParts.includes('phrases') ? '../public/' : './public/';

    return {
        index: basePath + 'index.html',
        favorites: basePath + 'favorites/favorites.html'
    };
}

// Usage example:
const paths = getPaths();
console.log("Path to index.html:", paths.index);
console.log("Path to favorites.html:", paths.favorites);
