import asyncHandler from "express-async-handler";
import Contact from "../models/contactModel.js";
import sendEmail from "../utils/sendEmail.js";

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
const submitContactForm = asyncHandler(async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        res.status(400);
        throw new Error("Please fill in all required fields");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        subject,
        message,
    });

    if (contact) {
        // Send email to admin
        const emailOptions = {
            email: process.env.EMAIL_USERNAME, // Send to admin
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

        const emailSent = await sendEmail(emailOptions);

        res.status(201).json({
            success: true,
            _id: contact._id,
            name: contact.name,
            email: contact.email,
            subject: contact.subject,
            message: contact.message,
            status: contact.status,
            emailSent: emailSent, // Inform the frontend if email was actually sent
        });
    } else {
        res.status(400);
        throw new Error("Invalid contact data");
    }
});

export { submitContactForm };
