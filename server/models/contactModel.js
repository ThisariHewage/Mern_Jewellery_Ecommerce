import mongoose from "mongoose";

const contactSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name"],
        },
        email: {
            type: String,
            required: [true, "Please add an email"],
        },
        phone: {
            type: String,
        },
        subject: {
            type: String,
            required: [true, "Please add a subject"],
        },
        message: {
            type: String,
            required: [true, "Please add a message"],
        },
        status: {
            type: String,
            required: true,
            enum: ["pending", "read", "replied"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
