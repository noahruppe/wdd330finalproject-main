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

const search = {
    "China" : "zh",
    "India" : "hi",
    "Japan" : "ja",
    "South Korea" : "ko",
    "Thailand" : "th",
    "Vietnam" : "vi" 
};



async function translatePhrases() {
    const phrases = {
        "greetings": {
            "hello": "Hello",
            "good_morning": "Good morning",
            "good_afternoon": "Good afternoon",
            "good_evening": "Good evening",
            "good_night": "Good night"
        },
        "courtesy": {
            "please": "Please",
            "thank_you": "Thank you",
            "you_are_welcome": "You're welcome",
            "excuse_me": "Excuse me",
            "sorry": "Sorry"
        },
        "questions": {
            "how_much": "How much?",
            "where_is": "Where is...?",
            "do_you_speak_english": "Do you speak English?",
            "can_you_help_me": "Can you help me?",
            "what_time_is_it": "What time is it?"
        },
        "travel": {
            "i_need_a_taxi": "I need a taxi",
            "where_is_the_hotel": "Where is the hotel?",
            "how_do_i_get_to": "How do I get to...?",
            "i_have_a_reservation": "I have a reservation",
            "what_is_the_wifi_password": "What is the Wi-Fi password?"
        },
        "emergencies": {
            "call_the_police": "Call the police",
            "i_need_a_doctor": "I need a doctor",
            "where_is_the_hospital": "Where is the hospital?",
            "i_lost_my_passport": "I lost my passport",
            "i_am_lost": "I am lost"
        }
    };

    const apiKey = "64b64c06-d896-4957-9e2f-0f4f3e2d4dc2";

    const phrasesContainer = document.getElementById('phrases');

    if (!phrasesContainer) {
        console.error("Could not find phrases element");
        return;
    }

    // Extract country from URL
    const url = new URL(window.location.href);
    const country = url.searchParams.get("country");

    // Determine target language from search object
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
}

// Call the function to fetch and display phrases
displayPhrases();

// Call the function to translate phrases
translatePhrases();
