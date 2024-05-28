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

export function loadContinentData(continent) {
    const jsonFile = `../json/${continent}.json`;

    fetch(jsonFile)
        .then(response => response.json())
        .then(data => {
            const countryList = document.getElementById("country-list");
            countryList.innerHTML = ""; // Clear previous countries

            data.countries.forEach(country => {
                const countryItem = document.createElement("li");
                countryItem.classList.add("country");

                countryItem.innerHTML = `
                    <img src="${country.image}" alt="${country.name} flag">
                    <h2>${country.name}</h2>
                    <p>Capital: ${country.capital}</p>
                    <p>Language: ${country.language}</p>
                    <button class="favorite-button" data-country='${JSON.stringify(country)}'>Add to Favorites</button>
                `;
                countryList.appendChild(countryItem);
            });

            document.querySelectorAll('.favorite-button').forEach(button => {
                button.addEventListener('click', () => {
                    const country = JSON.parse(button.getAttribute('data-country'));
                    addToFavorites(country);
                });
            });
        })
        .catch(error => {
            console.error("Error fetching the JSON file: ", error);
        });
}

function addToFavorites(country) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.some(fav => fav.name === country.name)) {
        favorites.push(country);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}