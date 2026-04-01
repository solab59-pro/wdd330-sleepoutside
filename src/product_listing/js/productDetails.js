// import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// export default class ProductDetails {

//   constructor(productId, dataSource) {
//     this.productId = productId;
//     this.product = {};
//     this.dataSource = dataSource;
//   }

//   async init() {
//     // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
//     this.product = await this.dataSource.findProductById(this.productId);
//     // the product details are needed before rendering the HTML
//     this.renderProductDetails();
//     // once the HTML is rendered, add a listener to the Add to Cart button
//     // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
//     document
//       .getElementById("add-to-cart")
//       .addEventListener("click", this.addProductToCart.bind(this));
//   }

//   addProductToCart() {
//     const cartItems = getLocalStorage("so-cart") || [];
//     cartItems.push(this.product);
//     setLocalStorage("so-cart", cartItems);
//   }

//   renderProductDetails() {
//     productDetailsTemplate(this.product);
//   }
// }

// function productDetailsTemplate(product) {
//   document.querySelector("h2").textContent = product.Category.charAt(0).toUpperCase() + product.Category.slice(1);
//   document.querySelector("#p-brand").textContent = product.Brand.Name;
//   document.querySelector("#p-name").textContent = product.NameWithoutBrand;

//   const productImage = document.querySelector("#p-image");
//   productImage.src = product.Images.PrimaryExtraLarge;
//   productImage.alt = product.NameWithoutBrand;
//   const euroPrice = new Intl.NumberFormat('de-DE',
//     {
//       style: 'currency', currency: 'EUR',
//     }).format(Number(product.FinalPrice) * 0.85);
//   document.querySelector("#p-price").textContent = `${euroPrice}`;
//   document.querySelector("#p-color").textContent = product.Colors[0].ColorName;
//   document.querySelector("#p-description").innerHTML = product.DescriptionHtmlSimple;

//   document.querySelector("#add-to-cart").dataset.id = product.Id;
// }

// // ************* Alternative Display Product Details Method *******************
// // function productDetailsTemplate(product) {
// //   return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
// //     <h2 class="divider">${product.NameWithoutBrand}</h2>
// //     <img
// //       class="divider"
// //       src="${product.Image}"
// //       alt="${product.NameWithoutBrand}"
// //     />
// //     <p class="product-card__price">$${product.FinalPrice}</p>
// //     <p class="product__color">${product.Colors[0].ColorName}</p>
// //     <p class="product__description">
// //     ${product.DescriptionHtmlSimple}
// //     </p>
// //     <div class="product-detail__add">
// //       <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
// //     </div></section>`;
// // }

import ProductData from './ProductData.mjs';
import { getParam } from './utils.mjs';

(async () => {
  const id = getParam('id');
  const category = getParam('category') || '';
  const productContent = document.getElementById('product-content');
  const backLink = document.getElementById('backToCategory');

  // ✅ Back link now uses /product_listing/
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
})();