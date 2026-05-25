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

    const adminEmail =
        process.env.ADMIN_EMAIL ||
        process.env.EMAIL_USERNAME ||
        "ureshathisari@gmail.com";

    const emailSent = await sendEmail({
        email: adminEmail,
        subject: "New Dewora Newsletter Subscriber",
        message: [
            "A new user subscribed from the Dewora Jewellers footer newsletter form.",
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
