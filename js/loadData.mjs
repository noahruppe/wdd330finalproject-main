// Utility function to fetch elevation data
async function getElevation(lat, lon) {
    const url = `https://api.open-meteo.com/v1/elevation?latitude=${lat}&longitude=${lon}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch elevation data: ${response.statusText}`);
    }
    const data = await response.json();
    return data.elevation;
}

// Function to load continent data
export async function loadContinentData(continent) {
    const jsonFile = `../json/${continent}.json`;

    try {
        const response = await fetch(jsonFile);
        const data = await response.json();

        const countryList = document.getElementById("country-list");
        countryList.innerHTML = ""; // Clear previous countries

        for (const country of data.countries) {
            const elevation = await getElevation(country.lat, country.lon);
            country.elevation = elevation;

            const countryItem = document.createElement("li");
            countryItem.classList.add("country");

            countryItem.innerHTML = `
                <img src="${country.image}" alt="${country.name} flag">
                <div class="country-details">
                    <h2>${country.name}</h2>
                    <p>Capital: ${country.capital}</p>
                    <p>Language: ${country.language}</p>
                    <p>Elevation: ${elevation} meters</p>
                    <button class="favorite-button" data-country='${JSON.stringify(country)}'>Add to Favorites</button>
                </div>
            `;

            countryList.appendChild(countryItem);

            // Add event listener for the favorite button inside this loop
            countryItem.querySelector('.favorite-button').addEventListener('click', async (event) => {
                event.stopPropagation(); // Prevent the click from propagating to the country item
                const country = JSON.parse(event.target.getAttribute('data-country'));
                addToFavorites(country);

                // Fetch elevation data again when adding to favorites
                try {
                    const elevation = await getElevation(country.lat, country.lon);
                    country.elevation = elevation;
                    event.target.closest('.country').querySelector('.country-details p:last-child').textContent = `Elevation: ${elevation} meters`;
                } catch (error) {
                    console.error("Error fetching elevation data: ", error);
                }
            });

            // Add event listener for country item click
            countryItem.addEventListener('click', () => {
                const pathParts = window.location.pathname.split('/');
                const basePath = pathParts.includes('country-list') || pathParts.includes('phrases') ? '../public/' : './public/';

                const newPageURL = basePath + '../phrases/phrases.html?country=' + encodeURIComponent(country.name);

                window.location.href = newPageURL;
            });
        }
    } catch (error) {
        console.error("Error fetching the JSON file: ", error);
    }
}

// Function to add a country to favorites
function addToFavorites(country) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.name === country.name)) {
        favorites.push(country);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}
