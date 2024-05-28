//get list of countries in favorites
import { loadHeaderFooter } from "./utils.mjs";
export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// render list of favorite countries
function renderFavorites() {
    const favorites = getFavorites();
    const favoriteListElement = document.getElementById('favorite-list');
    favoriteListElement.innerHTML = '';

    favorites.forEach(country => {
        const countryItem = document.createElement('div');
        countryItem.classList.add('country-item');

        const countryName = document.createElement('h3');
        countryName.textContent = country.name;
        countryItem.appendChild(countryName);

        const countryImage = document.createElement('img');
        countryImage.src = country.image;
        countryImage.alt = `${country.name} icon`;
        countryItem.appendChild(countryImage);

        favoriteListElement.appendChild(countryItem);
    });
}

//call function
document.addEventListener('DOMContentLoaded', renderFavorites);

