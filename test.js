const paymentProcessor = require("./index");

async function testPayment() {
  try {
    // Step 1: Create a payment intent for $50 (5000 cents)
    const paymentIntent = await paymentProcessor.createPaymentIntent(5000);

    console.log("Payment Intent Created:", paymentIntent);

    // Step 2: After client-side payment is done, use the client-provided payment method ID
    const paymentMethodId = "your_payment_method_id_here"; // This should be provided from the client-side Stripe Elements or similar
    const confirmedPayment = await paymentProcessor.confirmPaymentIntent(paymentIntent.id, paymentMethodId);

    console.log("Payment Confirmed:", confirmedPayment);

    // Step 3: Optionally, retrieve the payment intent to check the status
    const retrievedPayment = await paymentProcessor.retrievePaymentIntent(paymentIntent.id);
    console.log("Payment Status:", retrievedPayment.status);
  } catch (error) {
    console.error("Error processing payment:", error.message);
  }
}

// Run the test
testPayment();
