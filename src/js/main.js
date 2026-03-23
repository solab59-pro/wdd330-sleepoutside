import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter();

// import ProductData from "./ProductData.mjs";
// import ProductList from "./ProductList.mjs";
// import { getLocalStorage } from "./utils.mjs"; // ✅ ADD THIS

// function updateCartCount() {
//     const cartItems = getLocalStorage("so-cart") || [];
//     const countElement = document.querySelector(".cart-count");

//     if (!countElement) return;

//     const count = cartItems.length;

//     if (count > 0) {
//         countElement.classList.remove("hide");
//         countElement.textContent = count;
//     } else {
//         countElement.classList.add("hide");
//     }
// }

// const dataSource = new ProductData("tents");
// const element = document.querySelector(".product-list");

// const productList = new ProductList("Tents", dataSource, element);

// productList.init();
// updateCartCount();