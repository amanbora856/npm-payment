const stripe = require("stripe")("YOUR_SECRET_KEY"); // Replace with your Stripe secret key

class PaymentProcessor {
  // Create a new payment intent (for one-time payments)
  async createPaymentIntent(amount, currency = "usd") {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // amount in cents (e.g., 5000 for $50)
        currency: currency,
        description: `Payment of ${amount / 100} ${currency.toUpperCase()}`,
        payment_method_types: ["card"],
      });
      return paymentIntent;
    } catch (error) {
      throw new Error("Error creating payment intent: " + error.message);
    }
  }

  // Confirm a payment intent (after client-side payment completion)
  async confirmPaymentIntent(paymentIntentId, paymentMethodId) {
    try {
      const confirmedPayment = await stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: paymentMethodId,
      });
      return confirmedPayment;
    } catch (error) {
      throw new Error("Error confirming payment intent: " + error.message);
    }
  }

  // Retrieve a payment intent's status (for post-payment verification)
  async retrievePaymentIntent(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent;
    } catch (error) {
      throw new Error("Error retrieving payment intent: " + error.message);
    }
  }
}

module.exports = new PaymentProcessor();
