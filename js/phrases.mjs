const phrasesURL = "https://noahruppe.github.io/wdd330finalproject-main/json/commonphrases.json";

async function displayPhrases() {
    try {
        const response = await fetch(phrasesURL);
        const data = await response.json();
        const phrases = data.phrases;

        let outputHTML = "<ul>";
        
        Object.entries(phrases).forEach(([category, categoryPhrases]) => {
            outputHTML += `<li><strong>${category}</strong>`;
            outputHTML += "<ul>";
            
            Object.values(categoryPhrases).forEach(phrase => {
                outputHTML += `<li>${phrase}</li>`;
            });
            outputHTML += "</ul></li>";
        });

        outputHTML += "</ul>";
        
        document.getElementById("output").innerHTML = outputHTML;
    } catch (error) {
        console.error("Error fetching phrases:", error);
    }
}

displayPhrases();

const search = {
    "China": "zh",
    "India": "hi",
    "Japan": "ja",
    "South Korea": "ko",
    "Thailand": "th",
    "Vietnam": "vi",
    "Mexico": "es",
    "Canada": "fr",
    "Brazil": "pt",
    "Argentina": "es",
    "Chile": "es",
    "Peru": "es",
    "Colombia": "es",
    "Venezuela": "es",
    "Germany": "de",
    "France": "fr",
    "Italy": "it",
    "Spain": "es",
    "Netherlands": "nl",
    "Belgium": "nl"
};

async function translatePhrases() {
    try {
        const response = await fetch(phrasesURL);
        const data = await response.json();
        const phrases = data.phrases;

        const apiKey = "64b64c06-d896-4957-9e2f-0f4f3e2d4dc2";
        const phrasesContainer = document.getElementById('phrases');

        if (!phrasesContainer) {
            console.error("Could not find phrases element");
            return;
        }

        const url = new URL(window.location.href);
        const country = url.searchParams.get("country");
        const targetLanguage = search[country] || "es"; // Default to Spanish if country is not found

        for (const category in phrases) {
            const categoryDiv = document.createElement('div');
            categoryDiv.innerHTML = `<h2>${category}</h2>`;
            phrasesContainer.appendChild(categoryDiv);

            for (const key in phrases[category]) {
                const res = await fetch("https://libretranslate.com/translate", {
                    method: "POST",
                    body: JSON.stringify({
                        q: phrases[category][key],
                        source: "en",
                        target: targetLanguage,
                        format: "text",
                        api_key: apiKey
                    }),
                    headers: { "Content-Type": "application/json" }
                });

                const translation = await res.json();
                const translatedPhrase = translation.translatedText;

                const phraseDiv = document.createElement('div');
                phraseDiv.textContent = translatedPhrase;
                categoryDiv.appendChild(phraseDiv);
            }
        }
    } catch (error) {
        console.error("Error fetching or translating phrases:", error);
    }
}

translatePhrases();
