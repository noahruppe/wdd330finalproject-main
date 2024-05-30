import { loadHeaderFooter } from "./utils.mjs";

export function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

export function setFavorites(favorites) {
    localStorage.setItem('favorites', JSON.stringify(favorites));
}


function renderFavorites() {
    const favorites = getFavorites();
    const favoriteListElement = document.getElementById('favorite-list');
    favoriteListElement.innerHTML = '';

    favorites.forEach((country, index) => {
        const countryItem = document.createElement('div');
        countryItem.classList.add('country-item');

        const countryNameContainer = document.createElement('div');
        countryNameContainer.classList.add('country-name-container');

        const countryName = document.createElement('h3');
        countryName.textContent = country.name;
        countryNameContainer.appendChild(countryName);

        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.classList.add('remove-button');
        countryNameContainer.appendChild(removeButton);

        countryItem.appendChild(countryNameContainer);


        countryNameContainer.style.display = 'flex';
        countryNameContainer.style.justifyContent = 'space-between';

        const countryImage = document.createElement('img');
        countryImage.src = country.image;
        countryImage.alt = `${country.name} icon`;
        countryItem.appendChild(countryImage);

    
        countryItem.addEventListener('click', () => {
            const pathParts = window.location.pathname.split('/');
            const basePath = pathParts.includes('country-list') || pathParts.includes('phrases') || pathParts.includes('favorites') ? '../' : './';
        
            const newPageURL = basePath + 'phrases/phrases.html?country=' + encodeURIComponent(country.name);
        
            window.location.href = newPageURL;
        });

        // Add event listener to remove button
        removeButton.addEventListener('click', (event) => {
            event.stopPropagation();
            favorites.splice(index, 1);
            setFavorites(favorites);
            renderFavorites(); 
        });

        favoriteListElement.appendChild(countryItem);
    });
}

// Call the function
document.addEventListener('DOMContentLoaded', renderFavorites);

loadHeaderFooter();