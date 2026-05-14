import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../redux/slices/authSlice";
import api from "../services/api";
import { Mail, Lock, User, ArrowRight, LogIn } from "lucide-react";

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

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
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);
        try {
            const res = await api.post("/api/users", { name, email, password });
            dispatch(setCredentials({ ...res.data }));
            navigate(redirect);
            toast.success("Account created successfully!");
        } catch (err) {
            toast.error(err?.data?.message || err.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[90vh] flex items-center justify-center px-4 py-12">
            <div className="bg-white rounded-[3rem] p-8 sm:p-16 shadow-2xl shadow-gray-200/50 border border-gray-100 max-w-xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3 tracking-tight">Create Account</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Join the FashionHub community</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="space-y-4">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 ml-1">Full Name</label>
                            <div className="relative group">
                                <User size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                <input
                                    type="text"
                                    placeholder="John Doe"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 ml-1">Password</label>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Confirm Password Field */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 ml-1">Confirm Password</label>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    required
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-[0.98] shadow-xl shadow-black/10 flex items-center justify-center gap-3 group mt-4"
                    >
                        {loading ? "Creating Account..." : (
                            <>
                                Create Account
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-10 pt-10 border-t border-gray-100 text-center">
                    <p className="text-gray-500 text-sm mb-4">Already have an account?</p>
                    <Link 
                        to={redirect !== "/" ? `/login?redirect=${redirect}` : "/login"}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-black hover:text-gray-600 transition-colors"
                    >
                        <LogIn size={16} />
                        Sign In Instead
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterScreen;
