import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
    console.log("[Contact] Received submission:", req.body);
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }

    console.log("[Contact] Creating database entry...");
    let contact;
    try {
        contact = await Contact.create({
            name,
            email,
            phone,
            subject,
            message,
        });
    } catch (dbErr) {
        console.error("[Contact] Database Error:", dbErr.message);
        res.status(500);
        throw new Error(`Database Error: ${dbErr.message}`);
    }

    if (contact) {
        console.log("[Contact] Entry created, id:", contact._id);

        // Respond immediately — don't make the user wait for email
        res.status(201).json({
            success: true,
            _id: contact._id,
            name: contact.name,
            email: contact.email,
            subject: contact.subject,
            message: contact.message,
            status: contact.status,
        });

        // Fire-and-forget: send email in background
        const emailOptions = {
            email: process.env.EMAIL_USERNAME,
            subject: `New Contact Form Submission: ${subject}`,
            message: `
You have received a new message from the contact form.

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Subject: ${subject}

Message:
${message}
            `,
        };

        sendEmail(emailOptions)
            .then((result) => console.log("[Contact] Email sent:", result))
            .catch((err) => console.error("[Contact] Email failed:", err.message));
    } else {
        res.status(400);
        throw new Error("Invalid contact data");
    }
});

export { submitContactForm };
