// @ts-nocheck

export default class ExternalServices {
  static baseUrl = 'https://wdd330-backend.onrender.com/checkout';

  /**
   * Submit an order to the server
   * @param {Object} payload - The order object from CheckoutProcess
   * @returns {Promise<Object>} - JSON response from server
   */
  static async checkout(payload) {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      };

      const response = await fetch(this.baseUrl, options);

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('ExternalServices checkout error:', error);
      throw error;
    }
  }
}