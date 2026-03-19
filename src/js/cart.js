import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");
  const countElement = document.querySelector(".cart-count");

  // ✅ EMPTY CART FIX
  if (cartItems.length === 0) {
    productList.innerHTML = "<li>Your cart is empty</li>";

    // hide footer
    cartFooter.classList.add("hide");

    // hide cart count
    if (countElement) countElement.classList.add("hide");

    return;
  }

  // ✅ Render items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // ✅ Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice,
    0
  );

  // ✅ Show total
  cartFooter.classList.remove("hide");
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;

  // ✅ Update cart count
  if (countElement) {
    countElement.classList.remove("hide");
    countElement.textContent = cartItems.length;
  }
}

function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img src="${item.Image}" alt="${item.Name}" />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "N/A"}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
}

renderCartContents();