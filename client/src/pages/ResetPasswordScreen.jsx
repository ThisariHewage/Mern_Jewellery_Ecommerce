import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import { X } from "lucide-react";

const ResetPasswordScreen = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { token } = useParams();
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            await api.put(`/api/users/resetpassword/${token}`, { password });
            toast.success("Password reset successfully! Please login.");
            navigate("/login");
        } catch (err) {
            setError(err?.response?.data?.message || err.message || "Failed to reset password");
            toast.error(err?.response?.data?.message || err.message || "Failed to reset password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white p-8 sm:p-12 w-full max-w-lg shadow-sm border border-gray-100 relative">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif tracking-tighter font-bold text-gray-900">New Password</h1>
                    <Link to="/login" className="text-gray-900 hover:text-gray-500 transition-colors">
                        <X size={28} />
                    </Link>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-100 p-4 mb-8 text-center text-red-500 text-sm">
                        <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2 mb-[2px]"></span>
                        {error}
                    </div>
                )}

                <p className="text-gray-600 mb-8 leading-relaxed">
                    Please enter and confirm your new password below.
                </p>

                <form onSubmit={submitHandler} className="space-y-6">
                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            New Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="New Password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-4 border border-gray-300 focus:border-black outline-none transition-all placeholder:text-gray-300"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            Confirm New Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-4 border border-gray-300 focus:border-black outline-none transition-all placeholder:text-gray-300"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-primary text-white font-bold text-xl uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50 mt-4"
                    >
                        {loading ? "Resetting..." : "RESET PASSWORD"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordScreen;
