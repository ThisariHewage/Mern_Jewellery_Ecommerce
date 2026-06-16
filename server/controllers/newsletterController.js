import asyncHandler from "express-async-handler";
import sendEmail from "../utils/sendEmail.js";

const subscribeNewsletter = asyncHandler(async (req, res) => {
    const { email: rawEmail, reason } = req.body;
    const email = rawEmail?.trim().toLowerCase();

    if (!email) {
        res.status(400);
        throw new Error("Email is required");
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!isValidEmail) {
        res.status(400);
        throw new Error("Please enter a valid email address");
    }

    // Respond immediately — don't block on email
    res.status(200).json({
        success: true,
        message: "Subscription received",
    });

    // Fire-and-forget: send notification email in background
    sendEmail({
        email: process.env.EMAIL_USERNAME,
        subject: "New Dewora Newsletter Subscriber",
        message: [
            `Reason: ${reason || "Newsletter Subscription"}`,
            "A new user has subscribed to the Dewora Jewellers insider list.",
            "",
            `Subscriber email: ${email}`,
            `Subscribed at: ${new Date().toLocaleString("en-US", {
                timeZone: "Asia/Colombo",
            })}`,
        ].join("\n"),
    })
        .then((result) => console.log("[Newsletter] Email sent:", result))
        .catch((err) => console.error("[Newsletter] Email failed:", err.message));
});

export { subscribeNewsletter };
