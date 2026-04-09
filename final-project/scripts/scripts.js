function toggleMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.getElementById("navMenu");
    const navWord = document.querySelector(".nav-word-section");

    // getElementById() selects only id element and returns First element with ID
    // Use getElementById() when selecting a single unique element by its ID → fastest and simplest.

    // querySelector selects id, class, tags and complex css selectors and returns the first matching element using a CSS selector.
    // Use querySelector() when you need flexibility (classes, tags, attributes, nested selectors).

    // Toggle menu visibility
    navMenu.classList.toggle("active");
     /* If i should use  navMenu.classList.remove("active"); then the navMenu (Home, contact etc)
    will not show when hamburger sign is clicked in the mobile size. */


    // Toggle the JESUS CHRIST message below menu
    navWord.classList.toggle("active");

    // Animate hamburger into X. 
    // True, the X shows when the Hamburger is clicked indicating it can be used to closed at will
    hamburger.classList.toggle("active");
}

document.querySelector('.dropdown-link').addEventListener('click', function (e) {
    e.preventDefault();
    this.parentElement.classList.toggle('open');
});



// Currecy Exchange
// async function loadFX() {
//     const url = "https://open.er-api.com/v6/latest/USD";

//     try {
//         const res = await fetch(url);
//         const data = await res.json();

//         const NGN = data.rates.NGN;
//         const EUR = data.rates.EUR;

//         const container = document.getElementById("fx-container");

//         container.innerHTML = `
//             <div class="fx-item">
//                 <span>1 USD → NGN</span>
//                 <strong>${NGN.toLocaleString()}</strong>
//             </div>

//             <div class="fx-item">
//                 <span>1 EUR → NGN</span>
//                 <strong>${Math.round(NGN / EUR).toLocaleString()}</strong>
//             </div>

            
//         `;
//     } catch (error) {
//         document.getElementById("fx-container").innerHTML =
//             "<p>Unable to load exchange rates.</p>";
//     }
// }

// // load immediately
// loadFX();

// // refresh every 10 minutes
// setInterval(loadFX, 600000);

async function loadCurrencyRates() {
    const url = "https://api.exchangerate-api.com/v4/latest/USD";
    try {
        const res = await fetch(url);
        const data = await res.json();

        const rates = data.rates;
        const usdToNgn = rates.NGN;  // USD → NGN rate

        const currencies = ["USD", "EUR", "GBP", "CAD", "CNY", ];

        const container = document.getElementById("currency-box");
        container.innerHTML = "";  // clear existing

        currencies.forEach(cur => {
            if (!rates[cur]) return;
            // Cross-rate: how much 1 unit of cur is in NGN
            const rateInNgn = usdToNgn / rates[cur];
            container.innerHTML += `
        <div class="currency-item">
          <strong>1 ${cur} →</strong> <span>${rateInNgn.toLocaleString("en-NG", { maximumFractionDigits: 2 })} NGN</span>
        </div>
      `;
        });

    } catch (err) {
        const container = document.getElementById("currency-box");
        container.innerHTML = "<p>Error loading exchange rates.</p>";
        console.error("Error fetching currency rates:", err);
    }
}

loadCurrencyRates();
setInterval(loadCurrencyRates, 300000);  // refresh every 5 mins


// Bible Verse. The code on comment refreshes the verses each time it loads rather than daily
// async function loadBibleVerse() {
//     const box = document.getElementById("bible-verse-box");

//     try {
//         const res = await fetch("https://labs.bible.org/api/?passage=random&type=json");
//         const data = await res.json();

//         const verse = data[0];

//         box.innerHTML = `
//             <p><strong>${verse.bookname} ${verse.chapter}:${verse.verse}</strong></p>
//             <p>"${verse.text}"</p>
//         `;
//     } catch (error) {
//         box.innerHTML = "<p>Failed to load verse. Try again later.</p>";
//         console.error("Bible verse error:", error);
//     }
// }

// loadBibleVerse();

async function loadBibleVerse() {
    const box = document.getElementById("bible-verse-box");

    // Format today's date as YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    // Check saved verse and saved date
    const savedVerse = localStorage.getItem("dailyBibleVerse");
    const savedDate = localStorage.getItem("dailyBibleVerseDate");

    // If we already have today's verse, use it
    if (savedVerse && savedDate === today) {
        box.innerHTML = savedVerse;
        return;
    }

    // Otherwise fetch a new verse
    try {
        const res = await fetch("https://labs.bible.org/api/?passage=random&type=json");
        const data = await res.json();
        const verse = data[0];

        const verseHTML = `
            <p><strong>${verse.bookname} ${verse.chapter}:${verse.verse}</strong></p>
            <p>"${verse.text}"</p>
        `;

        // Display new verse
        box.innerHTML = verseHTML;

        // Save to localStorage
        localStorage.setItem("dailyBibleVerse", verseHTML);
        localStorage.setItem("dailyBibleVerseDate", today);

    } catch (error) {
        box.innerHTML = "<p>Failed to load verse. Try again later.</p>";
        console.error("Bible verse error:", error);
    }
}

loadBibleVerse();


// QUote of the day. This is good as i can sort seven quotes in a week and just fix it here
const quotes = [
    "Success is not final; failure is not fatal: It is the courage to continue that counts.",
    "Start where you are. Use what you have. Do what you can.",
    "Small progress is still progress.",
    "Your life is a result of your choices. Make good ones.",
    "Believe you can and you're halfway there.",
    "You are stronger than you think.",
    "The future depends on what you do today.",
    "Push yourself, because no one else is going to do it for you.",
    "Great things never come from comfort zones.",
    "Don't stop when you're tired. Stop when you're done.",
    "A little progress each day adds up to big results.",
    "It always seems impossible until it is done."
];


function loadDailyQuote() {
    const quoteBox = document.getElementById("motivationText");

    // Get saved quote & date
    const savedQuote = localStorage.getItem("dailyQuote");
    const savedDate = localStorage.getItem("quoteDate");

    // Today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];

    // If already saved today, show it
    if (savedQuote && savedDate === today) {
        quoteBox.textContent = savedQuote;
        return;
    }

    // Otherwise pick a new quote
    const newQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Save quote + date to localStorage
    localStorage.setItem("dailyQuote", newQuote);
    localStorage.setItem("quoteDate", today);

    quoteBox.textContent = newQuote;
}

loadDailyQuote();

// PArable
function loadDailyParable() {
    const parables = [
        "The kingdom of heaven is like a mustard seed, which a man took and planted in his field.",
        "The wise man builds his house on the rock, while the foolish man builds on the sand.",
        "A shepherd left ninety-nine sheep to find the one that was lost.",
        "The prodigal son returned home, and his father welcomed him with open arms.",
        "The sower scattered seeds, and each fell on different types of ground.",
        "A man found a treasure hidden in a field and sold all he had to buy that field.",
        "The good Samaritan helped the wounded man when others passed by.",
        "A merchant found a pearl of great price and sold everything to buy it."
    ];

    const stored = JSON.parse(localStorage.getItem("dailyParable"));
    const today = new Date().toDateString();

    if (stored && stored.date === today) {
        document.getElementById("parable-text").textContent = stored.text;
        return;
    }

    const randomIndex = Math.floor(Math.random() * parables.length);
    const todayParable = parables[randomIndex];

    localStorage.setItem("dailyParable", JSON.stringify({
        date: today,
        text: todayParable
    }));

    document.getElementById("parable-text").textContent = todayParable;
    }

loadDailyParable();


