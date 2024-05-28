// import { loadContinentData } from "./loadData.mjs";
// import { loadHeaderFooter } from "./utils.mjs";

// document.addEventListener("DOMContentLoaded", function(){
//     const params = new URLSearchParams(window.location.search);
//     const continent = params.get("continent") || "north-america"; //Default to North America
//     document.getElementById("continent-title").textContent = `Countries in ${capitalizeFirstLetter(continent.replace("-", ""))}`;
//     loadContinentData(continent);
// });

// function capitalizeFirstLetter(string){
//     return string.charAt(0).toUpperCase() + string.slice(1);
// }

// loadHeaderFooter();

import { loadContinentData } from "./loadData.mjs";
import { loadHeaderFooter } from "./utils.mjs";

document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const continent = params.get("continent") || "north-america"; // Default to North America
    document.getElementById("continent-title").textContent = `Countries in ${capitalizeFirstLetter(continent.replace("-", " "))}`;
    loadContinentData(continent);
});

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

loadHeaderFooter();