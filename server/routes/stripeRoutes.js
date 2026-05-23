import express from "express";
const router = express.Router();
import Stripe from "stripe";
import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @desc    Create a Stripe Checkout Session
 * @route   POST /api/stripe/create-checkout-session
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

const createCheckoutSession = asyncHandler(async (req, res) => {
    const { orderId } = req.body;

    const order = await Order.findById(orderId).populate("user", "name email");

    if (!order) {
        res.status(404);
        throw new Error("Order not found");
    }

    const line_items = order.orderItems.map((item) => ({
        price_data: {
            currency: "usd",
            product_data: {
                name: item.name,
                images: [item.image],
            },
            unit_amount: Math.round(item.price * 100),
        },
        quantity: item.qty,
    }));

    // Add shipping cost if any
    if (order.shippingPrice > 0) {
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Shipping Cost",
                },
                unit_amount: Math.round(order.shippingPrice * 100),
            },
            quantity: 1,
        });
    }

    // Add tax if any
    if (order.taxPrice > 0) {
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Tax",
                },
                unit_amount: Math.round(order.taxPrice * 100),
            },
            quantity: 1,
        });
    }

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `http://localhost:5173/order/${order._id}?success=true`,
        cancel_url: `http://localhost:5173/order/${order._id}?canceled=true`,
        customer_email: order.user.email,
        metadata: {
            orderId: order._id.toString(),
        },
    });

    res.json({ url: session.url });
});

router.post("/create-payment-intent", createPaymentIntent);
router.post("/create-checkout-session", createCheckoutSession);

export default router;
