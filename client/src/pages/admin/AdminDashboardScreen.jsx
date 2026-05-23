import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaUsers, FaBoxOpen, FaScroll, FaDollarSign, FaTachometerAlt, FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { logout } from "../../redux/slices/authSlice";
import api from "../../services/api";

const AdminDashboardScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } = useSelector((state) => state.auth);

    const [stats, setStats] = useState({
        users: 0,
        products: 0,
        orders: 0,
        sales: 0
    });
    const [loading, setLoading] = useState(true);

    const logoutHandler = async () => {
        try {
            await api.post("/api/users/logout");
            dispatch(logout());
            navigate("/login");
        } catch (err) {
            toast.error("Logout failed");
        }
    };

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate("/login");
            return;
        }

        const fetchData = async () => {
            try {
                setLoading(true);
                // Fetch all data in parallel
                const [usersRes, productsRes, ordersRes] = await Promise.all([
                    api.get("/api/users"),
                    api.get("/api/products"),
                    api.get("/api/orders")
                ]);

                const totalSales = ordersRes.data.reduce((acc, order) =>
                    acc + (order.isPaid ? order.totalPrice : 0), 0
                );

                setStats({
                    users: usersRes.data.length,
                    products: productsRes.data.length,
                    orders: ordersRes.data.length,
                    sales: totalSales
                });
            } catch (err) {
                console.error("Dashboard fetch error:", err);
                toast.error("Failed to load dashboard statistics");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userInfo, navigate]);

    const statCards = [
        {
            title: "Total Users",
            count: stats.users,
            icon: <FaUsers size={24} />,
            lightColor: "bg-blue-50",
            textColor: "text-blue-500",
            link: "/admin/userlist"
        },
        {
            title: "Total Products",
            count: stats.products,
            icon: <FaBoxOpen size={24} />,
            lightColor: "bg-emerald-50",
            textColor: "text-emerald-500",
            link: "/admin/productlist"
        },
        {
            title: "Total Orders",
            count: stats.orders,
            icon: <FaScroll size={24} />,
            lightColor: "bg-amber-50",
            textColor: "text-amber-500",
            link: "/admin/orderlist"
        },
        {
            title: "Total Sales",
            count: `$${stats.sales.toFixed(2)}`,
            icon: <FaDollarSign size={24} />,
            lightColor: "bg-rose-50",
            textColor: "text-rose-500",
            link: "/admin/orderlist"
        }
    ];

    const sidebarItems = [
        { name: "Dashboard", icon: <FaTachometerAlt />, link: "/admin/dashboard", active: true },
        { name: "Users", icon: <FaUsers />, link: "/admin/userlist" },
        { name: "Products", icon: <FaBoxOpen />, link: "/admin/productlist" },
        { name: "Orders", icon: <FaScroll />, link: "/admin/orderlist" },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50/50">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                    <p className="text-[10px] uppercase tracking-[0.3em] font-black text-gray-400">Initializing Command Center</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50/50">
            {/* Sidebar */}
            <aside className="w-full lg:w-72 bg-primary text-white flex flex-col shadow-2xl z-20">
                <div className="p-8 border-b border-white/10">
                    <h2 className="text-xl font-bold tracking-widest text-accent font-serif transition-all hover:scale-105">
                        DEWORA <span className="text-white">ADMIN</span>
                    </h2>
                </div>

                <nav className="flex-1 px-4 py-8 space-y-2">
                    <p className="px-4 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 mb-4 italic">Management</p>
                    {sidebarItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.link}
                            className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${item.active
                                ? "bg-accent text-primary shadow-lg shadow-accent/20"
                                : "hover:bg-white/5 text-gray-400 hover:text-white"
                                }`}
                        >
                            <span className={`text-lg transition-transform group-hover:scale-110 ${item.active ? "text-primary" : "text-accent/60"}`}>
                                {item.icon}
                            </span>
                            <span className="text-xs uppercase tracking-[0.2em] font-bold">{item.name}</span>
                        </Link>
                    ))}

                    <div className="pt-8 mt-8 border-t border-white/10 space-y-2">
                        <p className="px-4 text-[10px] uppercase tracking-[0.3em] font-black text-gray-500 mb-4 italic">Account</p>
                        <Link
                            to="/profile"
                            className="flex items-center gap-4 px-4 py-3.5 rounded-2xl hover:bg-white/5 text-gray-400 hover:text-white transition-all group"
                        >
                            <span className="text-lg text-accent/60 group-hover:scale-110 transition-transform">
                                <FaUserCircle />
                            </span>
                            <span className="text-xs uppercase tracking-[0.2em] font-bold">My Profile</span>
                        </Link>
                        <button
                            onClick={logoutHandler}
                            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all hover:bg-rose-500/10 text-gray-400 hover:text-rose-400 group cursor-pointer"
                        >
                            <span className="text-lg group-hover:scale-110 transition-transform">
                                <FaSignOutAlt />
                            </span>
                            <span className="text-xs uppercase tracking-[0.2em] font-bold">Logout</span>
                        </button>
                    </div>
                </nav>

                <div className="p-6 mt-auto">
                    <div className="bg-white/5 rounded-3xl p-4 border border-white/5">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold shadow-lg">
                                {userInfo?.name?.charAt(0).toUpperCase()}
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] font-black uppercase tracking-widest text-white truncate">{userInfo?.name}</p>
                                <p className="text-[8px] text-gray-500 truncate mt-0.5">{userInfo?.email}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6 lg:p-12 overflow-y-auto">
                <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-4xl font-black text-primary tracking-tight font-serif mb-2">Dashboard Overview</h1>
                        <p className="text-gray-500 text-xs uppercase tracking-[0.3em] font-bold">Welcome back to your command center</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="px-6 py-3 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                            <span className="text-[10px] uppercase tracking-widest font-black text-gray-600">System Live</span>
                        </div>
                    </div>
                </header>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                    {statCards.map((stat) => (
                        <Link
                            key={stat.title}
                            to={stat.link}
                            className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-gray-200/50 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 group relative overflow-hidden"
                        >
                            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.lightColor} rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-700`}></div>

                            <div className="relative z-10">
                                <div className={`w-14 h-14 ${stat.lightColor} ${stat.textColor} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 shadow-sm`}>
                                    {stat.icon}
                                </div>
                                <h3 className="text-gray-400 text-[10px] uppercase tracking-[0.25em] font-black mb-1">{stat.title}</h3>
                                <p className="text-3xl font-black text-primary tracking-tight font-serif">{stat.count}</p>

                                <div className="mt-6 flex items-center gap-2 text-[8px] uppercase tracking-widest font-black text-gray-400 group-hover:text-primary transition-colors">
                                    View Details <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Quick Management Section */}
                <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-gray-200/50">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-primary tracking-tight font-serif italic">Quick Management</h3>
                            <span className="text-[9px] uppercase tracking-widest font-black text-gray-400">Command Shortcuts</span>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Link to="/admin/product/create" className="flex items-center gap-5 p-6 bg-gray-50 rounded-3xl hover:bg-black hover:text-white transition-all group duration-500 shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                                    <FaBoxOpen size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 mb-1 group-hover:text-accent font-serif">Inventory</p>
                                    <p className="text-sm font-bold tracking-tight">Add New Product</p>
                                </div>
                            </Link>

                            <Link to="/admin/orderlist" className="flex items-center gap-5 p-6 bg-gray-50 rounded-3xl hover:bg-black hover:text-white transition-all group duration-500 shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                                    <FaScroll size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 mb-1 group-hover:text-accent font-serif">Transactions</p>
                                    <p className="text-sm font-bold tracking-tight">Process Orders</p>
                                </div>
                            </Link>

                            <Link to="/admin/userlist" className="flex items-center gap-5 p-6 bg-gray-50 rounded-3xl hover:bg-black hover:text-white transition-all group duration-500 shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-500">
                                    <FaUsers size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-black opacity-50 mb-1 group-hover:text-accent font-serif">Relationship</p>
                                    <p className="text-sm font-bold tracking-tight">Review Customers</p>
                                </div>
                            </Link>

                            <div className="flex items-center gap-5 p-6 bg-accent/10 border border-accent/20 rounded-3xl shadow-sm">
                                <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-primary shadow-sm">
                                    <FaDollarSign size={20} />
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase tracking-[0.2em] font-black text-primary/50 mb-1 font-serif">Performance</p>
                                    <p className="text-sm font-bold tracking-tight text-primary">Optimize Sales</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary rounded-[2.5rem] p-10 shadow-2xl text-white relative overflow-hidden flex flex-col justify-between">
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent/5 rounded-full -mr-32 -mb-32"></div>
                        <div className="relative z-10">
                            <h3 className="text-xl font-serif font-bold text-accent mb-6">Admin Note</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-8 italic">
                                "Excellence is not a skill. It is an attitude. Continue maintaining the high standard of Dewora Jewellers."
                            </p>
                        </div>
                        <div className="relative z-10">
                            <span className="block text-xs uppercase tracking-[0.2em] font-bold text-white">Management Team</span>
                            <span className="text-[10px] tracking-widest text-[#B89B48] font-black uppercase">Dewora HQ</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboardScreen;
