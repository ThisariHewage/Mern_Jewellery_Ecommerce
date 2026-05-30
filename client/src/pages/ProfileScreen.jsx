import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials, logout } from "../redux/slices/authSlice";
import { resetCart } from "../redux/slices/cartSlice";
import api from "../services/api";
import { User, Mail, Lock, ShoppingBag, ChevronRight, CheckCircle, XCircle, ArrowLeft, LogOut } from "lucide-react";

const ProfileScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const [updating, setUpdating] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.auth);

    const logoutHandler = async () => {
        try {
            await api.post("/api/users/logout");
            dispatch(logout());
            dispatch(resetCart());
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
        }

        const fetchMyOrders = async () => {
            try {
                const { data } = await api.get("/api/orders/myorders");
                setOrders(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoadingOrders(false);
            }
        };

        fetchMyOrders();
    }, [userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setUpdating(true);
        try {
            const { data } = await api.put("/api/users/profile", {
                name,
                email,
                password,
            });
            dispatch(setCredentials({ ...data }));
            toast.success("Profile updated successfully");
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            {userInfo && userInfo.isAdmin && (
                <Link
                    to="/admin/dashboard"
                    className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-gray-100 rounded-full text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 hover:text-black hover:bg-gray-50 hover:shadow-lg hover:shadow-gray-200/50 transition-all mb-10 group w-fit"
                >
                    <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                        <ArrowLeft size={12} strokeWidth={3} />
                    </div>
                    <span>Back to Dashboard</span>
                </Link>
            )}

            <div className="mb-16">
                <h1 className="text-5xl font-serif font-bold text-gray-900 tracking-tighter">Your Profile</h1>
                <p className="text-gray-500 uppercase tracking-[0.3em] text-[10px] font-bold mt-2">Manage your account and orders</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                {/* Profile Form */}
                <div className="lg:col-span-4">
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-gray-200/50 border border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900 mb-8 flex items-center gap-2">
                            <User size={20} className="text-accent" />
                            Account Details
                        </h2>
                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                                <div className="relative">
                                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                                <div className="relative">
                                    <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">New Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="Leave blank to keep same"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Confirm Password</label>
                                <div className="relative">
                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="password"
                                        placeholder="Confirm new password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={updating}
                                className="w-full py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-95 disabled:opacity-50"
                            >
                                {updating ? "Updating..." : "Update Profile"}
                            </button>
                            <button
                                type="button"
                                onClick={logoutHandler}
                                className="w-full py-4 bg-white border border-red-100 text-red-500 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-red-50 hover:border-red-200 transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2 mt-4"
                            >
                                <LogOut size={16} />
                                Logout
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order History */}
                <div className="lg:col-span-8">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                            <ShoppingBag size={24} className="text-accent" />
                            Order History
                        </h2>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-gray-400">{orders.length} Total Orders</span>
                    </div>

                    {loadingOrders ? (
                        <div className="py-20 text-center animate-pulse tracking-widest uppercase text-gray-400">Loading orders...</div>
                    ) : orders.length === 0 ? (
                        <div className="bg-gray-50 rounded-3xl p-12 text-center border-2 border-dashed border-gray-200">
                            <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
                            <p className="text-gray-500 font-medium">You haven't placed any orders yet.</p>
                            <Link to="/shop" className="text-accent uppercase tracking-widest text-xs font-bold mt-4 inline-block hover:underline">Start Shopping</Link>
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50 border-b border-gray-100">
                                            <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">ID</th>
                                            <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Date</th>
                                            <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Qty</th>
                                            <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Total</th>
                                            <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Paid</th>
                                            <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Delivered</th>

                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {orders.map((order) => (
                                            <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="px-6 py-5 font-mono text-[10px] text-gray-400">{order._id.substring(0, 10)}...</td>
                                                <td className="px-6 py-5 text-sm font-medium text-gray-700">{order.createdAt.substring(0, 10)}</td>
                                                <td className="px-6 py-5 text-sm font-bold text-gray-900">{order.orderItems.reduce((acc, item) => acc + item.qty, 0)}</td>
                                                <td className="px-6 py-5 text-sm font-bold text-gray-900">${order.totalPrice}</td>
                                                <td className="px-6 py-5">
                                                    {order.isPaid ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest">
                                                            <CheckCircle size={12} /> Paid on {order.paidAt.substring(0, 10)} OK ✅
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-widest">
                                                            <XCircle size={12} /> No
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-5">
                                                    {order.isDelivered ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest">
                                                            <CheckCircle size={12} /> {order.deliveredAt.substring(0, 10)}
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold uppercase tracking-widest">
                                                            <XCircle size={12} /> No
                                                        </span>
                                                    )}
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileScreen;
