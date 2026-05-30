import asyncHandler from "express-async-handler";
import sendEmail from "../utils/sendEmail.js";

const subscribeNewsletter = asyncHandler(async (req, res) => {
    const email = req.body.email?.trim().toLowerCase();

    if (!email) {
        res.status(400);
        throw new Error("Email is required");
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
        res.status(400);
        throw new Error("Please enter a valid email address");
    }

    const emailSent = await sendEmail({
        email: process.env.EMAIL_USERNAME,
        subject: "New Dewora Newsletter Subscriber",
        message: [
            "Reason: Get Exclusive Offers",
            "A new user has subscribed to the Dewora Jewellers insider list.",
            "",
            `Subscriber email: ${email}`,
            `Subscribed at: ${new Date().toLocaleString("en-US", {
                timeZone: "Asia/Colombo",
            })}`,
        ].join("\n"),
    });

    if (!emailSent) {
        res.status(500);
        throw new Error("Could not send subscription email");
    }

    res.status(200).json({
        success: true,
        message: "Subscription received",
    });
});

export { subscribeNewsletter };
