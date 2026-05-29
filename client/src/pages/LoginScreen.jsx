import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials } from "../redux/slices/authSlice";
import { resetCart } from "../redux/slices/cartSlice";
import api from "../services/api";
import { X, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";

const LoginScreen = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState("");

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
        setLoginError("");
        try {
            const res = await api.post("/api/users/login", { email, password });
            dispatch(setCredentials({ ...res.data }));
            dispatch(resetCart());
            navigate(redirect);
            toast.success("Welcome back to Dewora!");
        } catch (err) {
            setLoginError("Incorrect email or password.");
            toast.error(err?.response?.data?.message || err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-gray-50">
            {/* Soft Ambient Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Login Card */}
            <div className="w-full max-w-lg mx-4 z-10">
                <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-gray-100 p-8 sm:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden group">
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent to-transparent"></div>

                    {/* Header */}
                    <div className="flex justify-between items-start mb-12">
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles size={16} className="text-accent" />
                                <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">Member Access</span>
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-serif tracking-tighter font-bold text-gray-900 leading-tight">
                                Login to <span className="text-accent underline decoration-gray-100 underline-offset-8">Dewora</span>
                            </h1>
                        </div>
                        <Link to="/" className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-gray-900 hover:bg-gray-100 transition-all duration-300 border border-gray-100 group-hover:rotate-90">
                            <X size={24} />
                        </Link>
                    </div>

                    {/* Error Display */}
                    {loginError && (
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-8 flex items-center gap-3 animate-shake">
                            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                            <p className="text-red-600 text-sm font-medium">{loginError}</p>
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="space-y-6">
                        {/* Email Input */}
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

                        {/* Password Input */}
                        <div className="group/input relative">
                            <div className="flex justify-between items-center mb-2 ml-1">
                                <label className="text-[11px] uppercase tracking-[0.2em] text-gray-700 font-bold group-focus-within/input:text-accent transition-colors">
                                    Password
                                </label>
                                <Link
                                    to="/forgotpassword"
                                    className="text-[11px] uppercase tracking-widest text-[#B8860B] hover:text-black font-bold transition-all flex items-center gap-1 group/forgot"
                                >
                                    Forgot Password?
                                    <div className="w-0 h-px bg-black group-hover/forgot:w-3 transition-all"></div>
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within/input:text-accent transition-colors">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="••••••••"
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-14 py-4.5 text-gray-900 placeholder:text-gray-400 focus:bg-white focus:border-accent/30 focus:shadow-lg focus:shadow-accent/5 outline-none transition-all duration-300 font-medium tracking-widest"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-gray-900 text-white rounded-2xl font-bold text-sm uppercase tracking-[0.2em] shadow-xl shadow-gray-900/10 hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:scale-100 flex items-center justify-center gap-3 cursor-pointer group/btn"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></div>
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                    <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                </div>
                            ) : (
                                <>
                                    Sign In to Dewora
                                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-12 text-center">
                        <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mb-4">Don't have an account?</p>
                        <Link
                            to={redirect !== "/" ? `/register?redirect=${redirect}` : "/register"}
                            className="inline-flex items-center gap-2 text-gray-900 font-bold text-sm uppercase tracking-widest hover:text-accent transition-all group/reg"
                        >
                            Create Account
                            <div className="w-8 h-px bg-gray-200 group-hover/reg:w-12 group-hover/reg:bg-accent transition-all"></div>
                        </Link>
                    </div>
                </div>

                {/* Secure Badge */}
                <div className="mt-8 flex items-center justify-center gap-4 text-gray-300 uppercase tracking-[0.3em] text-[8px] font-bold">
                    <div className="h-px w-8 bg-gray-100"></div>
                    <span>Secure Customer Authentication</span>
                    <div className="h-px w-8 bg-gray-100"></div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    25% { transform: translateX(-5px); }
                    75% { transform: translateX(5px); }
                }
                .animate-shake {
                    animation: shake 0.4s ease-in-out;
                }
            ` }} />
        </div>
    );
};

export default LoginScreen;
