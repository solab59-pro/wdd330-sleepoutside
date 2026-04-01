
import { loadHeaderFooter } from '../js/utils.mjs';
loadHeaderFooter();

const cartContainer = document.querySelector('.cart-items');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const shippingEl = document.getElementById('shipping');
const totalEl = document.getElementById('orderTotal');

let cart = JSON.parse(localStorage.getItem('cart')) || [];

// For testing only: fill cart if empty
if (cart.length === 0) {
  cart = [
    { id: '20CXG', name: 'Backpack', price: 39.99, quantity: 1 },
    { id: '14GVF', name: 'Sleeping Bag', price: 229.99, quantity: 1 }
  ];
  localStorage.setItem('cart', JSON.stringify(cart));
}

function renderCart() {
  cartContainer.innerHTML = '';
  let subtotal = 0;

  cart.forEach((item, index) => {
    const price = Number(item.price);
    const quantity = Number(item.quantity);
    const total = price * quantity;
    subtotal += total;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <p><strong>${item.name}</strong></p>
      <p>Price: $${price.toFixed(2)}</p>
      <p>
        Quantity: <input type="number" min="1" value="${quantity}" data-index="${index}" class="qty-input">
      </p>
      <p>Total: $<span class="item-total">${total.toFixed(2)}</span></p>
      <button class="remove-btn" data-index="${index}">Remove</button>
    `;
    cartContainer.appendChild(itemDiv);
  });

  calculateSummary(subtotal);

  document.querySelectorAll('.qty-input').forEach(input => {
    input.addEventListener('change', e => {
      const idx = e.target.dataset.index;
      const val = Math.max(1, Number(e.target.value));
      cart[idx].quantity = val;
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      const idx = e.target.dataset.index;
      cart.splice(idx, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart();
    });
  });
}

function calculateSummary(subtotal) {
  const tax = +(subtotal * 0.06).toFixed(2);
  const shipping = cart.length > 0 ? 10 + (cart.length - 1) * 2 : 0;
  const total = +(subtotal + tax + shipping).toFixed(2);

  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax.toFixed(2);
  shippingEl.textContent = shipping.toFixed(2);
  totalEl.textContent = total.toFixed(2);
}

// ✅ EXPORTS FOR OTHER FILES (CheckoutProcess)

renderCart();

export function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

export function clearCart() {
  localStorage.removeItem('cart');
}