import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { X, Lock, Mail, KeyRound } from "lucide-react";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [step, setStep] = useState(1); // 1: Email, 2: OTP & New Password
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const requestOtpHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post("/api/users/forgotpassword", { email });
            toast.success("Reset code sent to your email.");
            setStep(2);
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message || "Failed to send reset code");
        } finally {
            setLoading(false);
        }
    };

    const resetPasswordHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await api.post("/api/users/resetpassword", { email, otp, password });
            toast.success("Password reset successfully! Please login.");
            navigate("/login");
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 sm:p-12 w-full max-w-lg shadow-sm border border-gray-100 relative">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif tracking-tighter font-bold text-gray-900">
                        {step === 1 ? "Reset Password" : "Verify Code"}
                    </h1>
                    <Link to="/login" className="text-gray-900 hover:text-gray-500 transition-colors">
                        <X size={28} />
                    </Link>
                </div>

                {step === 1 ? (
                    <>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Enter the email address associated with your account and we'll send you a 6-digit code to reset your password.
                        </p>

                        <form onSubmit={requestOtpHandler} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-gray-700 font-medium">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={email}
                                        required
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-300 focus:border-black outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-primary text-white font-bold text-xl uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 mt-4"
                            >
                                {loading ? "Sending..." : "SEND CODE"}
                            </button>
                        </form>
                    </>
                ) : (
                    <>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            A 6-digit code has been sent to <span className="font-bold text-gray-900">{email}</span>. Please enter it below along with your new password.
                        </p>

                        <form onSubmit={resetPasswordHandler} className="space-y-6">
                            {/* OTP Field */}
                            <div className="space-y-2">
                                <label className="block text-gray-700 font-medium">
                                    Verification Code <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="text"
                                        placeholder="6-Digit Code"
                                        value={otp}
                                        required
                                        maxLength={6}
                                        onChange={(e) => setOtp(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-300 focus:border-black outline-none transition-all placeholder:text-gray-300 tracking-[0.5em] font-mono text-center text-2xl"
                                    />
                                </div>
                            </div>

                            {/* New Password */}
                            <div className="space-y-2">
                                <label className="block text-gray-700 font-medium">
                                    New Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        value={password}
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-300 focus:border-black outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="block text-gray-700 font-medium">
                                    Confirm New Password <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                    <input
                                        type="password"
                                        placeholder="Confirm New Password"
                                        value={confirmPassword}
                                        required
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 border border-gray-300 focus:border-black outline-none transition-all placeholder:text-gray-300"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-primary text-white font-bold text-xl uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 mt-4"
                            >
                                {loading ? "Resetting..." : "RESET PASSWORD"}
                            </button>

                            <button
                                type="button"
                                onClick={() => setStep(1)}
                                className="w-full text-gray-500 text-sm font-medium hover:text-black transition-colors"
                            >
                                Didn't receive code? Try again
                            </button>
                        </form>
                    </>
                )}

                <div className="mt-8 text-center pt-8 border-t border-gray-100">
                    <Link to="/login" className="text-gray-700 underline text-sm font-medium hover:text-black transition-colors">
                        Return to Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;
