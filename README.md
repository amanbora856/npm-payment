Go Package: PaymentUtil

Overview

npm-payment is a Go package designed to simplify payment gateway integration. It provides a common interface for interacting with multiple payment providers, such as Stripe, PayPal, and Razorpay. This package abstracts the complexities of individual payment APIs, allowing developers to focus on building their applications.

Installation

To install the package, run:

go get github.com/amanbora856/npm-payment


Importing the Package

To use npm-payment, import it in your Go application:

import "github.com/amanbora856/npm-payment"

Features

Unified Interface: Supports multiple payment providers with a consistent API.

Transaction Management: Create and verify transactions seamlessly.

Refunds: Simplified handling of refunds.

Custom Configurations: Easily configure API keys and settings.

Usage

1. Initialization

Initialize the package with your payment provider credentials:

config := paymentutil.Config{
    Provider: "stripe", // Supported: "stripe", "paypal", "razorpay"
    ApiKey:   "your-api-key",
    Secret:   "your-secret-key",
}

client, err := paymentutil.NewClient(config)
if err != nil {
    log.Fatalf("Error initializing payment client: %v", err)
}

2. Creating a Payment

payment := paymentutil.PaymentRequest{
    Amount:   5000, // in smallest currency unit (e.g., cents for USD)
    Currency: "USD",
    Metadata: map[string]string{
        "order_id": "12345",
    },
}

response, err := client.CreatePayment(payment)
if err != nil {
    log.Fatalf("Payment creation failed: %v", err)
}

fmt.Printf("Payment created successfully: %v\n", response)

3. Verifying a Payment

paymentID := "payment-id-received"
verified, err := client.VerifyPayment(paymentID)
if err != nil {
    log.Fatalf("Payment verification failed: %v", err)
}

if verified {
    fmt.Println("Payment verified successfully")
} else {
    fmt.Println("Payment verification failed")
}

4. Initiating a Refund

refund := paymentutil.RefundRequest{
    PaymentID: "payment-id",
    Amount:    2000, // Partial refund (optional)
}

response, err := client.RefundPayment(refund)
if err != nil {
    log.Fatalf("Refund failed: %v", err)
}

fmt.Printf("Refund initiated successfully: %v\n", response)

Testing

To run tests for this package:

go test ./...

Supported Providers

Provider

Features Supported

Stripe

Payments, Refunds, Metadata

PayPal

Payments, Refunds

Razorpay

Payments, Refunds, Verification

Versioning

This package uses semantic versioning. Each release is tagged in the format vX.Y.Z.

License

This package is open-source and available under the MIT License.

Contributions

Contributions are welcome! Open an issue or submit a pull request on the GitHub repository.

Support

For any questions or issues, visit the GitHub Issues page or contact me
