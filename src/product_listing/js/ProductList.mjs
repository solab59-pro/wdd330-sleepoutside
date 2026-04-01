const baseURL = import.meta.env.VITE_SERVER_URL || '';

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function absoluteUrl(path) {
  if (!path) return '/images/placeholder.png';
  if (/^https?:\/\//i.test(path)) return path;
  const base = baseURL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

function pickImage(product, size = 'PrimaryMedium') {
  try {
    if (product.Images && product.Images[size] && product.Images[size].Url) {
      return absoluteUrl(product.Images[size].Url);
    }
    if (product[size] && typeof product[size] === 'string') {
      return absoluteUrl(product[size]);
    }
    if (product.PrimaryImage && product.PrimaryImage.Url) {
      return absoluteUrl(product.PrimaryImage.Url);
    }
    if (product.Image) {
      return absoluteUrl(product.Image);
    }
  } catch (e) {
    // fall through
  }
  return '/images/noun_Backpack_65884.svg';
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    const titleEl = document.querySelector('.page-title');
    if (titleEl) {
      titleEl.textContent = `Top Products: ${ProductList.prettyCategory(this.category)}`;
    }

    const products = await this.dataSource.getData(this.category);
    this.render(products);
  }

  static prettyCategory(slug) {
    return String(slug).replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  }

  render(products = []) {
    if (!this.listElement) return;
    if (!products.length) {
      this.listElement.innerHTML = '<p>No products found in this category.</p>';
      return;
    }

    const html = products
      .map(product => {
        const id =
          product.Id || product.id || product._id || product.productId || product.ProductId;
        const name = product.Name || product.Title || product.name || '';
        const price = product.Price || product.price || '';
        const img = pickImage(product, 'PrimaryMedium');

        // ✅ Clean URL (no /src/)
        const detailHref = `/product_detail/?id=${encodeURIComponent(id)}&category=${encodeURIComponent(
          this.category
        )}`;

        return `
          <article class="product-card">
            <a href="${detailHref}" class="product-link">
              <div class="product-image">
                <img src="${escapeHtml(img)}" alt="${escapeHtml(name)}" loading="lazy" />
              </div>
              <div class="product-meta">
                <h3>${escapeHtml(name)}</h3>
                ${price ? `<p class="price">${escapeHtml(price)}</p>` : ''}
              </div>
            </a>
          </article>
        `;
      })
      .join('\n');

    this.listElement.innerHTML = html;
  }
}