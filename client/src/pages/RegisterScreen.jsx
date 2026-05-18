import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../redux/slices/authSlice";
import api from "../services/api";
import { X } from "lucide-react";

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [registerError, setRegisterError] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setRegisterError("");
        
        if (password !== confirmPassword) {
            setRegisterError("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post("/api/users", { name, email, password });
            dispatch(setCredentials({ ...res.data }));
            navigate(redirect);
            toast.success("Account created successfully!");
        } catch (err) {
            setRegisterError(err?.response?.data?.message || err.message || "Registration failed");
            toast.error(err?.response?.data?.message || err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
            <div className="bg-white p-8 sm:p-12 w-full max-w-lg shadow-sm border border-gray-100 relative">
                {/* Header with X */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-serif tracking-tighter font-bold text-gray-900">Register</h1>
                    <Link to="/" className="text-gray-900 hover:text-gray-500 transition-colors">
                        <X size={28} />
                    </Link>
                </div>

                {/* Error Banner */}
                {registerError && (
                    <div className="bg-red-50 border border-red-100 p-4 mb-8 text-center text-red-500 text-sm">
                        <span className="inline-block w-1 h-1 bg-red-500 rounded-full mr-2 mb-[2px]"></span>
                        {registerError}
                    </div>
                )}

                <form onSubmit={submitHandler} className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-4 py-4 border border-gray-300 focus:border-black outline-none transition-all placeholder:text-gray-300"
                        />
                    </div>

                    {/* Email Field */}
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

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-4 border border-gray-300 focus:border-black outline-none transition-all placeholder:text-gray-300"
                        />
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <label className="block text-gray-700 font-medium">
                            Confirm Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            required
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-4 border border-gray-300 focus:border-black outline-none transition-all placeholder:text-gray-300"
                        />
                    </div>

                    {/* Register Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 mt-4 bg-primary text-white font-bold text-xl uppercase tracking-widest hover:bg-black transition-all disabled:opacity-50"
                    >
                        {loading ? "Creating Account..." : "CREATE ACCOUNT"}
                    </button>
                </form>

                {/* Footer Links */}
                <div className="mt-8 text-center space-y-6">
                    <p className="text-gray-700 font-medium">
                        Already have an account?
                    </p>

                    <div className="pt-4">
                        <Link 
                            to={redirect !== "/" ? `/login?redirect=${redirect}` : "/login"}
                            className="inline-block w-full py-4 border border-primary text-primary font-bold text-xl uppercase tracking-widest hover:bg-primary hover:text-white transition-all text-center"
                        >
                            LOG IN INSTEAD
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
