import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ShoppingBag, XCircle, CheckCircle, ChevronRight } from "lucide-react";
import api from "../../services/api";

const OrderListScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const { data } = await api.get("/api/orders");
                setOrders(data);
            } catch (err) {
                setError(err?.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-gray-900 flex items-center gap-3">
                        <ShoppingBag size={32} className="text-accent" />
                        Orders
                    </h1>
                    <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mt-2">Manage customer orders and deliveries</p>
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center animate-pulse tracking-widest uppercase text-gray-400">Loading orders...</div>
            ) : error ? (
                <div className="py-20 text-center text-red-500 font-medium">{error}</div>
            ) : (
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">ID</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">User</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Date</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Total</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Paid</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Delivered</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 text-right">Details</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-5 font-mono text-[10px] text-gray-400">{order._id.substring(0, 10)}...</td>
                                        <td className="px-6 py-5 text-sm font-medium text-gray-700">{order.user && order.user.name}</td>
                                        <td className="px-6 py-5 text-sm text-gray-500">{order.createdAt.substring(0, 10)}</td>
                                        <td className="px-6 py-5 text-sm font-bold text-gray-900">${order.totalPrice}</td>
                                        <td className="px-6 py-5">
                                            {order.isPaid ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-bold uppercase tracking-widest">
                                                    <CheckCircle size={12} /> {order.paidAt.substring(0, 10)}
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
                                        <td className="px-6 py-5 text-right">
                                            <Link 
                                                to={`/order/${order._id}`} 
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-black transition-all group-hover:translate-x-1"
                                            >
                                                View
                                                <ChevronRight size={14} />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderListScreen;
