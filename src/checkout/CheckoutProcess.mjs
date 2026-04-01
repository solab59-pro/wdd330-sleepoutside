/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */

import { getCart, clearCart } from '../js/cart.js';
import ExternalServices from './services/ExternalServices.mjs';

export default class CheckoutProcess {
    constructor(formId) {
    this.form = document.getElementById(formId);
    this.subtotalEl = document.getElementById('subtotal');
    this.taxEl = document.getElementById('tax');
    this.shippingEl = document.getElementById('shipping');
    this.orderTotalEl = document.getElementById('orderTotal');
    this.messageEl = document.getElementById('checkoutMessage');

    // Load cart items
    this.cartItems = getCart();

    // Initial calculations
    this.calculateSubtotal();
    this.calculateTotals();

    // Event listeners
    this.form.addEventListener('submit', e => this.checkout(e));
    document.querySelector('[name="zip"]').addEventListener('blur', () => this.calculateTotals());
  }

  loadCart() {
    this.cartItems = getCart();
  }

  // ... rest of CheckoutProcess remains the same ...

  async checkout(event) {
    event.preventDefault();
    const formData = new FormData(this.form);
    const data = Object.fromEntries(formData.entries());

    const payload = {
      orderDate: new Date().toISOString(),
      fname: data.fname,
      lname: data.lname,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
      cardNumber: data.cardNumber,
      expiration: data.expiration,
      code: data.code,
      items: this.packageItems(this.cartItems),
      tax: this.tax.toString(),
      shipping: this.shipping,
      orderTotal: this.orderTotal.toString()
    };

    try {
      const response = await ExternalServices.checkout(payload);

      if (response.success || response.id) {
        this.messageEl.style.color = 'green';
        this.messageEl.textContent = `✅ Order submitted successfully! Order ID: ${response.id || 'N/A'}`;
        this.form.reset();
        clearCart(); // clear the cart
        this.loadCart();
        this.calculateSubtotal();
        this.calculateTotals();
      } else {
        this.messageEl.style.color = 'red';
        this.messageEl.textContent = '❌ Error: Unable to submit order. Please try again.';
      }
    } catch (error) {
      this.messageEl.style.color = 'red';
      this.messageEl.textContent = `❌ Error: ${error.message}`;
    }
  }
}