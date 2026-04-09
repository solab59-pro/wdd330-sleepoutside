// document.addEventListener("DOMContentLoaded", () => {
//     const container = document.getElementById("tips-container");

//     fetch("https://api.api-ninjas.com/v1/exercises?muscle=abdominals", {
//         method: "GET",
//         headers: {
//             "X-Api-Key": "Cc/xz7gQ+DRbR5U4Q1EY/A==tZNQ2V1Db6DA5va7"
//         }
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error("HTTP error " + response.status);
//             }
//             return response.json();
//         })
//         .then(data => {
//             container.innerHTML = "";

//             data.slice(0, 5).forEach(item => {
//                 const div = document.createElement("div");
//                 div.className = "tip";
//                 div.innerHTML = `
//                 <h3>${item.name}</h3>
//                 <p>${item.instructions}</p>
//             `;
//                 container.appendChild(div);
//             });
//         })
//         .catch(error => {
//             container.innerHTML = "<p>Unable to load health tips.</p>";
//             console.error("ERROR:", error);
//         });
// });

document.addEventListener("DOMContentLoaded", () => {
    const tips = [
        "Drink enough water every day.",
        "Exercise for at least 30 minutes daily.",
        "Eat more fruits and vegetables.",
        "Get 7–9 hours of sleep.",
        "Wash your hands regularly."
    ];

    const container = document.getElementById("tips-container");

    // Get today's date (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    // Get saved tip info
    const savedDate = localStorage.getItem("tipDate");
    let tipIndex = localStorage.getItem("tipIndex");

    // If new day or no saved tip, pick a new one
    if (savedDate !== today || tipIndex === null) {
        tipIndex = Math.floor(Math.random() * tips.length);
        localStorage.setItem("tipIndex", tipIndex);
        localStorage.setItem("tipDate", today);
    }

    // Display the tip
    const div = document.createElement("div");
    div.className = "tip";
    div.innerHTML = `<p>${tips[tipIndex]}</p>`;
    container.appendChild(div);
});