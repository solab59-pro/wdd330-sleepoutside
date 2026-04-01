// import { loadHeaderFooter } from "./utils.mjs";

// loadHeaderFooter();

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

import ProductList from './ProductList.mjs';
import ProductData from './ProductData.mjs';
import { getParam } from './utils.mjs';

// -------- Homepage (index.html) --------
async function initHome() {
  const productListEl = document.querySelector('.product-list');
  if (!productListEl) return;

  const dataSource = new ProductData();
  const list = new ProductList('top', dataSource, productListEl);
  await list.init();
}

// -------- Product Listing Page --------
async function initProductListing() {
  const productListEl = document.querySelector('.product-list');
  if (!productListEl) return;

  const category = getParam('category') || 'tents';
  const dataSource = new ProductData();
  const list = new ProductList(category, dataSource, productListEl);
  await list.init();
}

// -------- Product Detail Page --------
async function initProductDetail() {
  const productContent = document.getElementById('product-content');
  if (!productContent) return;

  const id = getParam('id');
  const category = getParam('category') || '';

  const backLink = document.getElementById('backToCategory');
  if (backLink) {
    backLink.href = category
      ? `/product_listing/?category=${encodeURIComponent(category)}`
      : '/';
  }

  if (!id) {
    productContent.innerHTML = '<p>Missing product ID.</p>';
    return;
  }

  const dataSource = new ProductData();
  const product = await dataSource.findProductById(id);

  if (!product) {
    productContent.innerHTML = '<p>Product not found.</p>';
    return;
  }

  const name = product.Name || product.Title || '';
  const price = product.Price || '';
  const description = product.Description || product.LongDescription || '';
  const imgUrl = product.PrimaryLarge || '/images/placeholder.png';

  document.title = `Sleep Outside | ${name}`;

  productContent.innerHTML = `
    <article class="detail-card">
      <div class="detail-image">
        <img src="${imgUrl}" alt="${name}" />
      </div>
      <div class="detail-meta">
        <h1>${name}</h1>
        ${price ? `<p class="price">${price}</p>` : ''}
        <div class="description">${description || '<p>No description provided.</p>'}</div>
      </div>
    </article>
  `;
}

// -------- Page Router --------
function initPage() {
  const path = window.location.pathname;

  if (path.endsWith('/') || path.endsWith('/index.html')) {
    initHome();
  } else if (path.includes('/product_listing/')) {
    initProductListing();
  } else if (path.includes('/product_detail/')) {
    initProductDetail();
  }
}

initPage();