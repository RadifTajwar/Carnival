const catchAsyncErrors = require("../middleware/catchAsyncError");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Process a payment using Stripe
exports.processPayment = catchAsyncErrors(async (req, res, next) => {
    // Create a payment intent with the provided amount and currency
    const myPayment = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: "bdt",
        metadata: {
            company: "LuxeLane",
        },
    });

    // Respond with the success status and the client secret needed for payment confirmation
    res.status(200).json({
        success: true,
        client_secret: myPayment.client_secret
    });
});

// Send the Stripe API key to the client
exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
    // Respond with the Stripe API key from the environment variables
    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    });
});
