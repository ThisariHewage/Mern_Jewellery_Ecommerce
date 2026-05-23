import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
    // 1. Create a transporter
    // For testing, if env variables aren't set, we can log that email would be sent.
    // In production/real app, you'd use Gmail or Mailtrap.
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'Gmail', // e.g., 'Gmail' or Mailtrap host
        auth: {
            user: process.env.EMAIL_USERNAME || 'test@example.com',
            pass: process.env.EMAIL_PASSWORD || 'password123',
        },
    });

    // 2. Define the email options
    const mailOptions = {
        from: 'Dewora Jewellers <noreply@deworajewellers.com>',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };

    // 3. Send the email
    try {
        if (!process.env.EMAIL_USERNAME || !process.env.EMAIL_PASSWORD) {
            console.warn('Email credentials missing. Skipping actual email sending.');
            return true; // Return true so dev doesn't fail, but log it
        }

        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to ${options.email}`);
        return true;
    } catch (error) {
        console.error('Email could not be sent:', error.message);
        return false;
    }
};

export default sendEmail;
