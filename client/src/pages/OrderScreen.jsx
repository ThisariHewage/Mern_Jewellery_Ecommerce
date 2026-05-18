import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import api from "../services/api";
import { getOrderDetails, payOrder } from "../redux/slices/orderSlice";
import { MapPin, CreditCard, ShoppingBag, CheckCircle, Clock } from "lucide-react";

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const dispatch = useDispatch();

    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

    const { order, loading, error, successPay, loadingPay } = useSelector((state) => state.orders);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!order || successPay || order._id !== orderId) {
            dispatch(getOrderDetails(orderId));
        } else if (!order.isPaid) {
            if (!window.paypal) {
                const loadPayPalScript = async () => {
                    const { data: clientId } = await api.get("/api/config/paypal");
                    paypalDispatch({
                        type: "resetOptions",
                        value: {
                            "client-id": clientId,
                            currency: "USD",
                        },
                    });
                    paypalDispatch({ type: "setLoadingStatus", value: "pending" });
                };
                loadPayPalScript();
            }
        }
    }, [dispatch, orderId, successPay, order, paypalDispatch]);

    function onApprove(data, actions) {
        return actions.order.capture().then(async function (details) {
            try {
                dispatch(payOrder({ orderId, details }));
                toast.success("Order is paid");
            } catch (err) {
                toast.error(err?.data?.message || err.message);
            }
        });
    }

    function onError(err) {
        toast.error(err.message);
    }

    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: order.totalPrice,
                        },
                    },
                ],
            })
            .then((orderId) => {
                return orderId;
            });
    }

    const deliverOrderHandler = async () => {
        try {
            await api.put(`/api/orders/${orderId}/deliver`);
            toast.success("Order marked as delivered");
            dispatch(getOrderDetails(orderId));
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        }
    };

    if (loading) return <div className="py-20 text-center uppercase tracking-widest animate-pulse">Loading Order Details...</div>;
    if (error) return <div className="py-20 text-center text-red-500">{error}</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Order #{order._id}</h1>
                <p className="text-gray-500 uppercase tracking-widest text-xs font-medium">Thank you for your purchase</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-8">
                    {/* Shipping Status */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900">
                                <MapPin size={24} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900">Shipping</h2>
                                <p className="text-sm text-gray-500">{order.user.name} ({order.user.email})</p>
                            </div>
                        </div>
                        <div className="pl-16 space-y-4">
                            <p className="text-gray-700 font-medium">
                                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">
                                    <CheckCircle size={14} /> Delivered on {new Date(order.deliveredAt).toLocaleDateString()}
                                </div>
                            ) : (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-xs font-bold uppercase tracking-widest">
                                    <Clock size={14} /> Not Delivered
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Payment Status */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900">
                                <CreditCard size={24} />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-xl font-bold text-gray-900">Payment</h2>
                                <p className="text-sm text-gray-500">Method: {order.paymentMethod}</p>
                            </div>
                        </div>
                        <div className="pl-16 space-y-4">
                            {order.isPaid ? (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">
                                    <CheckCircle size={14} /> Paid on {new Date(order.paidAt).toLocaleDateString()}
                                </div>
                            ) : (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full text-xs font-bold uppercase tracking-widest">
                                    <Clock size={14} /> Not Paid
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Order Items */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900">
                                <ShoppingBag size={24} />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
                        </div>
                        <div className="space-y-6">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex-1 flex justify-between items-center">
                                        <div>
                                            <Link to={`/product/${item.product}`} className="font-bold text-gray-900 hover:text-gray-600">
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-gray-500">{item.qty} x ${item.price}</p>
                                        </div>
                                        <p className="font-bold text-gray-900">${(item.qty * item.price).toFixed(2)}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4">
                    <div className="bg-gray-50 rounded-[2.5rem] p-10 sticky top-24 border border-gray-100 shadow-xl shadow-gray-200/50">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>
                        <div className="space-y-4 mb-10 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500 uppercase tracking-widest font-bold">Items</span>
                                <span className="font-bold">${order.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 uppercase tracking-widest font-bold">Shipping</span>
                                <span className="font-bold">${order.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500 uppercase tracking-widest font-bold">Tax</span>
                                <span className="font-bold">${order.taxPrice}</span>
                            </div>
                            <div className="pt-6 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900 uppercase tracking-tighter">Total</span>
                                <span className="text-3xl font-bold text-gray-900 tracking-tighter">${order.totalPrice}</span>
                            </div>
                        </div>

                        {!order.isPaid && (
                            <div className="space-y-4">
                                {loadingPay && <div className="text-center animate-pulse py-4 font-bold text-xs uppercase tracking-widest">Verifying Payment...</div>}
                                {isPending ? (
                                    <div className="text-center py-4 font-bold text-xs uppercase tracking-widest text-gray-400">Connecting to PayPal...</div>
                                ) : (
                                    <PayPalButtons
                                        createOrder={createOrder}
                                        onApprove={onApprove}
                                        onError={onError}
                                    />
                                )}
                            </div>
                        )}
                        
                        {/* Admin Mark as Delivered */}
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <button 
                                onClick={deliverOrderHandler}
                                className="w-full py-4 mt-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all"
                            >
                                Mark As Delivered
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;
