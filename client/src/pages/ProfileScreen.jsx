import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setCredentials, logout } from "../redux/slices/authSlice";
import { resetCart } from "../redux/slices/cartSlice";
import api from "../services/api";
import {
    User, Mail, Lock, ShoppingBag, ChevronRight,
    CheckCircle, XCircle, ArrowLeft, LogOut,
    Eye, Trash2, Calendar, CreditCard, Box,
    Settings, Package, ShieldCheck
} from "lucide-react";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

const ProfileScreen = () => {
    const [activeTab, setActiveTab] = useState("account"); // 'account' or 'orders'
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [orders, setOrders] = useState([]);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

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
            setPassword("");
            setConfirmPassword("");
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        } finally {
            setUpdating(false);
        }
    };

    const deleteHandler = (id) => {
        setSelectedOrderId(id);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/api/orders/${selectedOrderId}`);
            toast.success("Order removed from history");
            setOrders(orders.filter((order) => order._id !== selectedOrderId));
            setShowDeleteModal(false);
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fdfbf7]">
            {/* Premium Hero Header */}
            <div className="relative h-[300px] bg-gradient-to-br from-[#2A0845] via-[#3B0C61] to-[#1a052d] overflow-hidden">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <div className="absolute top-10 left-10 w-64 h-64 bg-accent/30 rounded-full blur-[120px] animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/20 rounded-full blur-[150px]"></div>
                </div>

                <div className="max-w-7xl mx-auto px-6 pt-16 relative z-10">
                    {userInfo && userInfo.isAdmin && (
                        <Link
                            to="/admin/dashboard"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] uppercase tracking-widest font-bold text-white hover:bg-white/20 transition-all mb-8 group"
                        >
                            <ArrowLeft size={12} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform" />
                            Admin Dashboard
                        </Link>
                    )}

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                        <div>
                            <h1 className="text-4xl md:text-6xl font-serif font-black text-white tracking-tighter mb-2">
                                Welcome, {userInfo?.name?.split(' ')[0]}
                            </h1>
                            <p className="text-accent/80 font-sans text-sm tracking-[0.2em] uppercase font-bold">
                                Member Profile & Order History
                            </p>
                        </div>

                        <button
                            onClick={logoutHandler}
                            className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/20 text-white hover:text-red-400 rounded-xl transition-all font-bold text-xs uppercase tracking-widest"
                        >
                            <LogOut size={16} />
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-6 -mt-16 pb-24 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Left Sidebar: Profile Summary */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-[2rem] p-8 shadow-xl shadow-primary/5 border border-primary/5 overflow-hidden relative group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <ShieldCheck size={120} />
                            </div>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-accent/20 to-accent/5 flex items-center justify-center border-4 border-white shadow-lg mb-6 relative overflow-hidden group-hover:scale-105 transition-transform duration-500">
                                    <User size={48} className="text-accent" strokeWidth={1.5} />
                                    <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-primary mb-1">{userInfo?.name}</h3>
                                <p className="text-gray-400 text-sm mb-6">{userInfo?.email}</p>

                                <div className="w-full grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                                    <div className="text-left">
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Status</p>
                                        <p className="text-sm font-bold text-accent px-2 py-1 bg-accent/10 rounded-lg inline-block text-center min-w-[80px]">
                                            {userInfo?.isAdmin ? "Admin" : "Member"}
                                        </p>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Orders</p>
                                        <p className="text-sm font-bold text-primary px-2 py-1 bg-primary/5 rounded-lg inline-block text-center min-w-[60px]">
                                            {orders.length}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Tabs */}
                        <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-2 border border-primary/5 flex flex-col gap-2">
                            <button
                                onClick={() => setActiveTab("account")}
                                className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all font-bold text-sm ${activeTab === "account"
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-gray-500 hover:bg-white hover:text-primary"
                                    }`}
                            >
                                <Settings size={18} />
                                Account Settings
                            </button>
                            <button
                                onClick={() => setActiveTab("orders")}
                                className={`flex items-center gap-4 px-6 py-4 rounded-xl transition-all font-bold text-sm ${activeTab === "orders"
                                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                                    : "text-gray-500 hover:bg-white hover:text-primary"
                                    }`}
                            >
                                <Package size={18} />
                                Order History
                            </button>
                        </div>
                    </div>

                    {/* Right Content Area */}
                    <div className="lg:col-span-8">
                        {activeTab === "account" ? (
                            <div className="bg-white rounded-[2rem] p-10 shadow-xl shadow-primary/5 border border-primary/5 animate-fade-in">
                                <h2 className="text-2xl font-serif font-bold text-primary mb-2">Account Settings</h2>
                                <p className="text-gray-400 text-sm mb-10">Manage your personal information and security preferences</p>

                                <form onSubmit={submitHandler} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Full Name</label>
                                            <div className="relative group">
                                                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" />
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-transparent rounded-[1.25rem] focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-sm font-medium"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Email Address</label>
                                            <div className="relative group">
                                                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" />
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-transparent rounded-[1.25rem] focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-sm font-medium"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100">
                                        <h4 className="text-xs font-bold text-primary uppercase tracking-widest mb-6">Security Update</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">New Password</label>
                                                <div className="relative group">
                                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" />
                                                    <input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-transparent rounded-[1.25rem] focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-sm font-medium"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Confirm Password</label>
                                                <div className="relative group">
                                                    <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent transition-colors" />
                                                    <input
                                                        type="password"
                                                        placeholder="••••••••"
                                                        value={confirmPassword}
                                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                                        className="w-full pl-12 pr-4 py-4 bg-gray-50/50 border border-transparent rounded-[1.25rem] focus:bg-white focus:border-accent focus:ring-4 focus:ring-accent/10 outline-none transition-all text-sm font-medium"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={updating}
                                        className="w-full py-5 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-all shadow-xl shadow-primary/20 active:scale-[0.98] disabled:opacity-50 border border-primary mt-4"
                                    >
                                        {updating ? "Processing..." : "Save Profile Changes"}
                                    </button>
                                </form>
                            </div>
                        ) : (
                            <div className="space-y-6 animate-fade-in">
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h2 className="text-2xl font-serif font-bold text-primary">Your Orders</h2>
                                        <p className="text-gray-400 text-sm">Review and track your recent purchases</p>
                                    </div>
                                    <div className="px-4 py-2 bg-white rounded-xl border border-primary/5 text-[10px] font-bold uppercase tracking-widest text-primary">
                                        {orders.length} Total
                                    </div>
                                </div>

                                {loadingOrders ? (
                                    <div className="bg-white rounded-[2rem] p-20 flex flex-col items-center justify-center border border-primary/5">
                                        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mb-4"></div>
                                        <p className="text-xs uppercase tracking-widest font-bold text-gray-400">Fetching history...</p>
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="bg-white rounded-[2rem] p-16 text-center border border-dashed border-gray-200">
                                        <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <ShoppingBag size={32} className="text-gray-300" />
                                        </div>
                                        <h3 className="text-xl font-serif font-bold text-primary mb-2">No orders yet</h3>
                                        <p className="text-gray-500 mb-8 max-w-xs mx-auto">Discover our collection of fine jewellery and start your journey with us.</p>
                                        <Link
                                            to="/shop"
                                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-black transition-all shadow-lg shadow-primary/10"
                                        >
                                            Begin Shopping
                                            <ChevronRight size={14} />
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {orders.map((order) => (
                                            <div key={order._id} className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-primary/5 hover:border-accent/30 transition-all group relative overflow-hidden">
                                                <div className="absolute top-0 right-0 h-1.5 w-full bg-gradient-to-r from-transparent via-accent/0 to-accent/0 group-hover:via-accent/40 transition-all duration-700"></div>

                                                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
                                                    <div className="flex-grow space-y-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="p-3 bg-primary/5 rounded-2xl text-primary">
                                                                <Box size={24} strokeWidth={1.5} />
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Order ID</p>
                                                                <p className="text-sm font-mono font-bold text-primary uppercase">
                                                                    #{order.orderNumber || order._id.substring(order._id.length - 8)}
                                                                </p>
                                                                <div className="mt-3 flex flex-wrap gap-2" title="Product IDs">
                                                                    {order.orderItems.map((item, idx) => (
                                                                        <span key={idx} className="text-[11px] font-mono font-bold text-primary bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-lg shadow-sm">
                                                                            PID: {item.productId || item._id.substring(0, 8)}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                                            <div>
                                                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Date</p>
                                                                <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                                                                    <Calendar size={14} className="text-accent" />
                                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Total</p>
                                                                <div className="flex items-center gap-1.5 text-sm font-black text-primary">
                                                                    <CreditCard size={14} className="text-accent" />
                                                                    Rs. {order.totalPrice.toLocaleString()}
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Payment</p>
                                                                {order.isPaid ? (
                                                                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-md uppercase">
                                                                        <CheckCircle size={10} /> Paid
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-red-500 bg-red-50 px-2 py-0.5 rounded-md uppercase">
                                                                        <XCircle size={10} /> Unpaid
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Delivery</p>
                                                                {order.isDelivered ? (
                                                                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-md uppercase">
                                                                        <CheckCircle size={10} /> Delivered
                                                                    </span>
                                                                ) : (
                                                                    <span className="inline-flex items-center gap-1 text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-md uppercase">
                                                                        <Box size={10} /> Pending
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="flex md:flex-col gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-gray-100 md:pl-8">
                                                        <Link
                                                            to={`/order/${order._id}`}
                                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 bg-gray-50 hover:bg-primary hover:text-white rounded-xl transition-all font-bold text-xs uppercase tracking-widest"
                                                        >
                                                            <Eye size={16} />
                                                            Details
                                                        </Link>
                                                        <button
                                                            onClick={() => deleteHandler(order._id)}
                                                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-3 text-red-400 hover:bg-red-50 rounded-xl transition-all font-bold text-xs uppercase tracking-widest"
                                                        >
                                                            <Trash2 size={16} />
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <DeleteConfirmModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                title="Remove Order from History"
                message="Are you sure you want to remove this record? This will only remove it from your view and cannot be undone."
            />
        </div>
    );
};

export default ProfileScreen;
