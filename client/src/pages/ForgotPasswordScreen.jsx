import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { X } from "lucide-react";

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        try {
            const { data } = await api.post("/api/users/forgotpassword", { email });
            setMessage("An email has been sent with further instructions.");
            toast.success("Reset link sent to your email.");
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message || "Failed to send reset link");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 sm:p-12 w-full max-w-lg shadow-sm border border-gray-100 relative">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif tracking-tighter font-bold text-gray-900">Reset Password</h1>
                    <Link to="/login" className="text-gray-900 hover:text-gray-500 transition-colors">
                        <X size={28} />
                    </Link>
                </div>

                {message ? (
                    <div className="bg-green-50 border border-green-100 p-6 text-center text-green-700 font-medium">
                        {message}
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Enter the email address associated with your account and we'll send you a link to reset your password.
                        </p>

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-gray-700 font-medium">
                                    Email Address <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-4 border border-gray-300 focus:border-black outline-none transition-all placeholder:text-gray-300"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-5 bg-primary text-white font-bold text-xl uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 mt-4"
                            >
                                {loading ? "Sending..." : "SEND RESET LINK"}
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
