// import { renderListWithTemplate } from "./utils.mjs";

// function productCardTemplate(product) {
//   return `
//     <li class="product-card">
//       <a href="/product_pages/?product=${product.Id}">
//         <img src="${product.Images.PrimaryMedium}" alt="${product.Name}">
//         <h3>${product.Brand.Name}</h3>
//         <p>${product.NameWithoutBrand}</p>
//         <p class="product-card__price">$${product.FinalPrice}</p>
//       </a>
//     </li>
//     `;
// }

// export default class ProductList {
//   constructor(category, dataSource, listElement) {
//     this.category = category;
//     this.dataSource = dataSource;
//     this.listElement = listElement;
//   }

//   async init() {
//     const list = await this.dataSource.getData(this.category);
//     this.renderList(list);
//     document.querySelector(".title").textContent = this.category;
//   }

//   renderList(list) {
//     // const htmlStrings = list.map(productCardTemplate);
//     // this.listElement.insertAdjacentHTML("afterbegin", htmlStrings.join(""));

//     // apply use new utility function instead of the commented code above
//     renderListWithTemplate(productCardTemplate, this.listElement, list);

//   }
// }

// js/ProductList.mjs
const baseURL = import.meta.env.VITE_SERVER_URL;

function absoluteUrl(path) {
  if (!path) return '/images/placeholder.png';
  if (/^https?:\/\//i.test(path)) return path;
  return `${baseURL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

function pickImage(product, size = 'PrimaryMedium') {
  if (product.Images && product.Images[size]?.Url) return absoluteUrl(product.Images[size].Url);
  if (product[size]) return absoluteUrl(product[size]);
  if (product.PrimaryImage?.Url) return absoluteUrl(product.PrimaryImage.Url);
  if (product.Image) return absoluteUrl(product.Image);
  return '/images/placeholder.png';
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const products = await this.dataSource.getData(this.category);
    this.renderList(products);
  }

  renderList(products) {
    this.listElement.innerHTML = products.map((product) => {
      const id = product.Id || product.id || product._id;
      const img = pickImage(product, 'PrimaryMedium');
      const name = product.Name || product.Title || '';
      const price = product.Price || '';

      return `
        <li class="product-card">
          <a href="/product_detail/index.html?id=${id}&category=${this.category}">
            <img src="${img}" alt="${name}" loading="lazy">
            <h3>${name}</h3>
            ${price ? `<p class="price">${price}</p>` : ''}
          </a>
        </li>
      `;
    }).join('');
  }
}