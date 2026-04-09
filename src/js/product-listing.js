// import { loadHeaderFooter, getParam } from "./utils.mjs";
// import ProductData from "./ProductData.mjs";
// import ProductList from "./ProductList.mjs";

// loadHeaderFooter();

// const category = getParam("category");
// const dataSource = new ProductData();
// const element = document.querySelector(".product-list");
// const listing = new ProductList(category, dataSource, element);

// listing.init();

// js/product-listing.js
import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { getParam } from './utils.mjs';

(async () => {
  const category = getParam('category') || 'tents';
  const listElement = document.querySelector('.product-list');
  const dataSource = new ProductData();
  const myList = new ProductList(category, dataSource, listElement);
  await myList.init();

  // Update title
  function prettyCategory(slug) {
    return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }
  document.getElementById('product-title').textContent = `Top Products: ${prettyCategory(category)}`;
})();

