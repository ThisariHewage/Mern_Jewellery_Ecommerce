import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
        resetPasswordOTP: String,
        resetPasswordOTPExpire: Date,
        userId: {
            type: String,
            unique: true,
            sparse: true,
        },
    },
    {
        timestamps: true,
    }
);

// Method to compare entered password with hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash password OTP
userSchema.methods.getResetPasswordOTP = function () {
    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Hash OTP and set to resetPasswordOTP field
    this.resetPasswordOTP = crypto.createHash("sha256").update(otp).digest("hex");

    // Set expire (10 minutes)
    this.resetPasswordOTPExpire = Date.now() + 10 * 60 * 1000;

    return otp;
};

// Middleware to handle tasks before saving to database
userSchema.pre("save", async function () {
    // 1. Generate userId if it's a new user
    if (this.isNew) {
        const lastUser = await this.constructor.findOne({}, {}, { sort: { createdAt: -1 } });
        let nextNumber = 1;

        if (lastUser && lastUser.userId) {
            const lastNumber = parseInt(lastUser.userId.replace("TD", ""), 10);
            if (!isNaN(lastNumber)) {
                nextNumber = lastNumber + 1;
            }
        }

        this.userId = `TD${String(nextNumber).padStart(5, "0")}`;
    }

    // 2. Hash the password if it's being modified (or is new)
    if (!this.isModified("password")) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
