import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../redux/slices/authSlice";
import api from "../services/api";
import { Mail, Lock, ArrowRight, UserPlus } from "lucide-react";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
        setLoading(true);
        try {
            const res = await api.post("/api/users/login", { email, password });
            dispatch(setCredentials({ ...res.data }));
            navigate(redirect);
            toast.success("Welcome back!");
        } catch (err) {
            toast.error(err?.data?.message || err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="bg-white rounded-[3rem] p-8 sm:p-16 shadow-2xl shadow-gray-200/50 border border-gray-100 max-w-xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3 tracking-tight">Welcome Back</h1>
                    <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold">Sign in to continue your fashion journey</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-8">
                    <div className="space-y-6">
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
                                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <div className="flex justify-between items-center px-1">
                                <label className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400">Password</label>
                                <a href="#" className="text-[10px] uppercase tracking-widest font-bold text-gray-400 hover:text-black transition-colors">Forgot?</a>
                            </div>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-[0.98] shadow-xl shadow-black/10 flex items-center justify-center gap-3 group"
                    >
                        {loading ? "Authenticating..." : (
                            <>
                                Sign In
                                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-12 pt-12 border-t border-gray-100 text-center">
                    <p className="text-gray-500 text-sm mb-4">New to FashionHub?</p>
                    <Link 
                        to={redirect !== "/" ? `/register?redirect=${redirect}` : "/register"}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-black hover:text-gray-600 transition-colors"
                    >
                        <UserPlus size={16} />
                        Create an Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
