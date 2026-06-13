import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ShoppingBag, XCircle, CheckCircle, ChevronRight, ArrowLeft, Trash2, Eye } from "lucide-react";
import api from "../../services/api";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

const OrderListScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

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

    const deleteHandler = (id) => {
        setSelectedOrderId(id);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/api/orders/${selectedOrderId}`);
            toast.success("Order deleted successfully");
            setOrders(orders.filter((order) => order._id !== selectedOrderId));
            setShowDeleteModal(false);
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
            setShowDeleteModal(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-gray-100 rounded-full text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 hover:text-black hover:bg-gray-50 hover:shadow-lg hover:shadow-gray-200/50 transition-all mb-10 group"
            >
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <ArrowLeft size={12} strokeWidth={3} />
                </div>
                <span>Back to Dashboard</span>
            </Link>

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
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 whitespace-nowrap">Order ID</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 whitespace-nowrap">Product ID</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 whitespace-nowrap">User</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 whitespace-nowrap">Address</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 whitespace-nowrap">Quantity</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 whitespace-nowrap">Date</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 whitespace-nowrap">Total</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 whitespace-nowrap">Paid</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 whitespace-nowrap">Delivered</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 whitespace-nowrap text-center">Action</th>

                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-5 font-mono text-[14px] text-gray-400 whitespace-nowrap">{order.orderNumber || order._id.substring(0, 10)}</td>
                                        <td className="px-6 py-5 font-mono text-[14px] text-gray-500 max-w-[150px] truncate" title={order.orderItems.map((item) => item.productId).filter(Boolean).join(", ")}>
                                            {order.orderItems.map((item) => item.productId).filter(Boolean).slice(0, 2).join(", ")}
                                            {order.orderItems.length > 2 && "..."}
                                        </td>
                                        <td className="px-6 py-5 text-sm font-medium text-gray-700 whitespace-nowrap truncate max-w-[120px]">{order.user && order.user.name}</td>
                                        <td className="px-6 py-5 text-[14px] text-gray-500 max-w-[150px] truncate" title={`${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.country}`}>
                                            {order.shippingAddress.city}, {order.shippingAddress.country}
                                        </td>
                                        <td className="px-6 py-5 text-sm font-bold text-gray-900">
                                            <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-bold">{order.orderItems.reduce((acc, item) => acc + item.qty, 0)}</span>
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap">{order.createdAt.substring(0, 10)}</td>
                                        <td className="px-6 py-5 text-sm font-bold text-gray-900 whitespace-nowrap">${order.totalPrice}</td>
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
                                        <td className="px-6 py-5 text-center space-x-3 whitespace-nowrap">
                                            <Link
                                                to={`/order/${order._id}`}
                                                className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:text-black transition-colors"
                                                title="View Details"
                                            >
                                                <Eye size={16} />
                                            </Link>
                                            <button
                                                onClick={() => deleteHandler(order._id)}
                                                className="inline-flex items-center justify-center p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-800 transition-colors"
                                                title="Delete Order"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <DeleteConfirmModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete Order"
                message="Are you sure you want to delete this order? This action cannot be undone."
            />
        </div>
    );
};

export default OrderListScreen;
