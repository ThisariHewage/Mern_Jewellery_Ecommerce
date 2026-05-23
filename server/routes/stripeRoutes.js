import express from "express";
const router = express.Router();
import Stripe from "stripe";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @desc    Create a payment intent for Stripe
 * @route   POST /api/stripe/create-payment-intent
 * @access  Private
 */
const createPaymentIntent = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (order) {
        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.totalPrice * 100), // Stripe expects amount in cents
            currency: "usd",
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                orderId: order._id.toString(),
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

router.post("/create-payment-intent", createPaymentIntent);

export default router;
