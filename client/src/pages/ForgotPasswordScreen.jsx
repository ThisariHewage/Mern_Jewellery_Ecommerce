import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { X, Lock, Mail, KeyRound, ArrowRight, ArrowLeft, Sparkles, ShieldCheck } from "lucide-react";

const ForgotPasswordScreen = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
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
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-50 py-12">
            {/* Soft Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-5%] right-[-5%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-5%] left-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Recovery Card */}
            <div className="w-full max-w-lg mx-4 z-10">
                <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-gray-100 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>

                    {/* Header */}
                    <div className="flex justify-between items-start mb-10">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles size={16} className="text-accent" />
                                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Security</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-serif tracking-tighter font-bold text-gray-900 leading-tight">
                                {step === 1 ? (
                                    <>Recover <span className="text-accent underline decoration-gray-100 underline-offset-8">Account</span></>
                                ) : (
                                    <>Secure <span className="text-accent underline decoration-gray-100 underline-offset-8">Verification</span></>
                                )}
                            </h1>
                        </div>
                        <Link to="/login" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 border border-gray-100">
                            <X size={24} />
                        </Link>
                    </div>

                    {step === 1 ? (
                        <>
                            <p className="text-gray-500 text-sm font-medium mb-10 leading-relaxed max-w-[90%]">
                                Enter your email address and we'll send you a <span className="text-gray-900 font-bold">6-digit code</span> to securely reset your credentials.
                            </p>

                            <form onSubmit={requestOtpHandler} className="space-y-6">
                                <div className="group/input relative">
                                    <label className="text-[11px] uppercase tracking-[0.2em] text-gray-700 font-bold mb-2 block ml-1 group-focus-within/input:text-accent transition-colors">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-accent transition-colors">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            placeholder="your@email.com"
                                            value={email}
                                            required
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-14 py-4.5 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-accent/30 focus:shadow-lg focus:shadow-accent/5 outline-none transition-all duration-300 font-medium"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-xl shadow-gray-900/10 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer group/btn"
                                >
                                    {loading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                        </div>
                                    ) : (
                                        <>
                                            Send Reset Code
                                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            <div className="bg-accent/5 rounded-2xl p-6 mb-10 flex items-start gap-4 border border-accent/10">
                                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-accent shadow-sm border border-accent/5 shrink-0">
                                    <ShieldCheck size={20} />
                                </div>
                                <div>
                                    <p className="text-gray-900 font-bold text-sm uppercase tracking-wider mb-1">Code Sent!</p>
                                    <p className="text-gray-500 text-sm leading-relaxed">
                                        We sent a code to <span className="text-gray-900 font-bold underline decoration-accent/30 underline-offset-2">{email}</span>. Please verify below.
                                    </p>
                                </div>
                            </div>

                            <form onSubmit={resetPasswordHandler} className="space-y-6">
                                {/* OTP Field */}
                                <div className="group/input relative">
                                    <label className="text-[11px] uppercase tracking-[0.2em] text-gray-700 font-bold mb-2 block ml-1 group-focus-within/input:text-accent transition-colors">
                                        Verification Code
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-accent transition-colors">
                                            <KeyRound size={18} />
                                        </div>
                                        <input
                                            type="text"
                                            placeholder="••••••"
                                            value={otp}
                                            required
                                            maxLength={6}
                                            onChange={(e) => setOtp(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-14 py-4.5 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-accent/30 focus:shadow-lg focus:shadow-accent/5 outline-none transition-all duration-300 font-mono text-xl tracking-[0.8em] text-center"
                                        />
                                    </div>
                                </div>

                                {/* New Password */}
                                <div className="group/input relative">
                                    <label className="text-[11px] uppercase tracking-[0.2em] text-gray-700 font-bold mb-2 block ml-1 group-focus-within/input:text-accent transition-colors">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-accent transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={password}
                                            required
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-14 py-4.5 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-accent/30 focus:shadow-lg focus:shadow-accent/5 outline-none transition-all duration-300 font-medium tracking-widest"
                                        />
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="group/input relative">
                                    <label className="text-[11px] uppercase tracking-[0.2em] text-gray-700 font-bold mb-2 block ml-1 group-focus-within/input:text-accent transition-colors">
                                        Confirm New Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-accent transition-colors">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type="password"
                                            placeholder="••••••••"
                                            value={confirmPassword}
                                            required
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-14 py-4.5 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-accent/30 focus:shadow-lg focus:shadow-accent/5 outline-none transition-all duration-300 font-medium tracking-widest"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-xl shadow-gray-900/10 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-3 cursor-pointer group/btn"
                                >
                                    {loading ? "Updating..." : "Reset Password"}
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="w-full flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-gray-400 hover:text-black font-bold transition-all group/back"
                                >
                                    <ArrowLeft size={14} className="group-hover/back:-translate-x-1 transition-transform" />
                                    Didn't receive code? Try again
                                </button>
                            </form>
                        </>
                    )}

                    {/* Footer */}
                    <div className="mt-12 text-center pt-8 border-t border-gray-100">
                        <Link
                            to="/login"
                            className="inline-flex items-center gap-2 text-gray-900 font-bold text-sm uppercase tracking-widest hover:text-accent transition-all group/return"
                        >
                            <ArrowLeft size={16} className="group-hover/return:-translate-x-1 transition-transform" />
                            Return to Login
                        </Link>
                    </div>
                </div>

                {/* Secure Badge */}
                <div className="mt-8 flex items-center justify-center gap-4 text-gray-300 uppercase tracking-[0.3em] text-[8px] font-bold">
                    <div className="h-px w-8 bg-gray-100"></div>
                    <span>End-to-End Encryption</span>
                    <div className="h-px w-8 bg-gray-100"></div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordScreen;
