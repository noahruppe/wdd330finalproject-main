const phrasesURL = "https://noahruppe.github.io/wdd330finalproject-main/json/commonphrases.json";

async function displayPhrases() {
    try {
        const response = await fetch(phrasesURL);
        const data = await response.json();
        const phrases = data.phrases;

        let outputHTML = "<ul>";

        // Iterate over each category of phrases
        Object.entries(phrases).forEach(([category, categoryPhrases]) => {
            outputHTML += `<li><strong>${category}</strong>`;
            outputHTML += "<ul>";
            // Iterate over phrases in the category
            Object.values(categoryPhrases).forEach(phrase => {
                outputHTML += `<li>${phrase}</li>`;
            });
            outputHTML += "</ul></li>";
        });

        outputHTML += "</ul>";

        // Display generated HTML in the output div
        document.getElementById("output").innerHTML = outputHTML;
    } catch (error) {
        console.error("Error fetching phrases:", error);
    }
}

// Call the function to fetch and display phrases
displayPhrases();
