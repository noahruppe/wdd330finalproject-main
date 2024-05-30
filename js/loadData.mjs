// document.addEventListener("DOMContentLoaded", function(){
//     fetch("../json/north-america.json")
//         .then(response => {
//             return response.json();
//         })
//         .then(data => {
//             const countryList = document.getElementById("country-list");

//             data.countries.forEach(country =>{
//                 const countryDiv = document.createElement("li");
//                 countryDiv.classList.add("country");

//                 //populate div with country's data
//                 countryDiv.innerHTML = `
//                     <img src="${country.image}" alt="${country.name} flag">
//                     <h2>${country.name}</h2>
//                     <p>Capital: ${country.capital}</p>
//                     <p>Language: ${country.language}</p>
//                 `;

//                 //adding country div to container
//                 countryList.appendChild(countryDiv);
//             });
//         })
//         .catch(error => {
//             console.error("Error fetching the JSON file: ", error);
//         });
// });

//method 2

// export function loadContinentData(continent){
//     const jsonFile = `../json/${continent}.json`;

//     fetch(jsonFile)
//         .then(response => response.json())
//         .then(data =>{
//             const countryList = document.getElementById("country-list");
//             countryList.innerHTML = ""; //Clear previous countries

//             data.countries.forEach(country =>{
//                 const countryItem = document.createElement("li");
//                 countryItem.classList.add("country");

//                 countryItem.innerHTML = `
//                     <img src="${country.image}" alt="${country.name} flag">
//                     <h2>${country.name}</h2>
//                     <p>Capital: ${country.capital}</p>
//                     <p>Language: ${country.language}</p>
//                 `;
//                 countryList.appendChild(countryItem);
//             });
//         })
//         .catch(error=>{
//             console.error("Error fetching the JSON file: ", error);
//         });

// }

//method including add favorites

const API_KEY = "d93c11a8f8e7a7283aed823d47647002";

async function getWeather(lat, lon){
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    console.log(url);
    const response = await fetch(url);
    if(!response.ok){
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
}

// export function loadContinentData(continent) {
//     const jsonFile = `../json/${continent}.json`;

//     fetch(jsonFile)
//         .then(response => response.json())
//         .then(data => {
//             const countryList = document.getElementById("country-list");
//             countryList.innerHTML = ""; // Clear previous countries

//             data.countries.forEach(country => {
//                 const countryItem = document.createElement("li");
//                 countryItem.classList.add("country");

//                 countryItem.innerHTML = `
//                     <img src="${country.image}" alt="${country.name} flag">
//                     <h2>${country.name}</h2>
//                     <p>Capital: ${country.capital}</p>
//                     <p>Language: ${country.language}</p>
//                     <button class="favorite-button" data-country='${JSON.stringify(country)}'>Add to Favorites</button>
//                 `;
//                 countryList.appendChild(countryItem);
//             });

//             document.querySelectorAll('.favorite-button').forEach(button => {
//                 button.addEventListener('click', () => {
//                     const country = JSON.parse(button.getAttribute('data-country'));
//                     addToFavorites(country);
//                 });
//             });
//         })
//         .catch(error => {
//             console.error("Error fetching the JSON file: ", error);
//         });
// }

export async function loadContinentData(continent) {
    const jsonFile = `../json/${continent}.json`;

    try {
        const response = await fetch(jsonFile);
        const data = await response.json();

        const countryList = document.getElementById("country-list");
        countryList.innerHTML = ""; // Clear previous countries

        for (const country of data.countries) {
            const weatherData = await getWeather(country.lat, country.lon);
            const temperature = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;

            const countryItem = document.createElement("li");
            countryItem.classList.add("country");

            countryItem.innerHTML = `
                <img src="${country.image}" alt="${country.name} flag">
                <div class="country-details">
                    <h2>${country.name}</h2>
                    <p>Capital: ${country.capital}</p>
                    <p>Language: ${country.language}</p>
                    <p>Temperature: ${temperature}°C</p>
                    <p>Weather: <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png" alt="${weatherData.weather[0].description}" class="weather-icon"> ${weatherDescription}</p>
                    <button class="favorite-button" data-country='${JSON.stringify(country)}'>Add to Favorites</button>
                </div>
            `;

            // Add click event to navigate to phrases.html with the language parameter
            countryItem.addEventListener('click', () => {
                const pathParts = window.location.pathname.split('/');
                const basePath = pathParts.includes('country-list') || pathParts.includes('phrases') ? '../public/' : './public/';
            
                const newPageURL = basePath + '../phrases/phrases.html?country=' + encodeURIComponent(country.name);
            
                window.location.href = newPageURL;
            });

            countryList.appendChild(countryItem);
        }


        document.querySelectorAll('.favorite-button').forEach(button => {
            button.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent the click from propagating to the country item
                const country = JSON.parse(button.getAttribute('data-country'));
                addToFavorites(country);
            });
        });
    } catch (error) {
        console.error("Error fetching the JSON file: ", error);
    }
}

function addToFavorites(country) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.name === country.name)) {
        favorites.push(country);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

