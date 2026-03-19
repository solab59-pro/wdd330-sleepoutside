import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];
  const productList = document.querySelector(".product-list");
  const cartFooter = document.querySelector(".cart-footer");
  const cartTotal = document.querySelector(".cart-total");
  const countElement = document.querySelector(".cart-count");

  // ✅ If cart is empty
  if (cartItems.length === 0) {
    productList.innerHTML = "<li>Your cart is empty</li>";
    return;
  }

  // cart count
  if (!countElement) return;

  const count = cartItems.length;

  if (count > 0) {
    countElement.classList.remove("hide");
    countElement.textContent = count;
  } else {
    countElement.classList.add("hide");
  }

  // ✅ Render cart items
  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  productList.innerHTML = htmlItems.join("");

  // ✅ STEP 4: Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.FinalPrice,
    0
  );

  // ✅ STEP 5: Show footer + insert total
  cartFooter.classList.remove("hide");
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
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
updateCartCount();