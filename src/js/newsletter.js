const form = document.querySelector(".newsletter-form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thanks for subscribing!");
  });
}