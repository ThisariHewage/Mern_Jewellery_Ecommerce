import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { getOrderDetails } from "../redux/slices/orderSlice";
import api from "../services/api";
import StripeCheckoutForm from "../components/StripeCheckoutForm";
import { ShoppingBag, ArrowLeft } from "lucide-react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutPaymentScreen = () => {
    const { id: orderId } = useParams();
    const dispatch = useDispatch();
    const { order, loading } = useSelector((state) => state.orders);
    const [clientSecret, setClientSecret] = useState(null);
    const [loadingPayment, setLoadingPayment] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId));
        }
    }, [dispatch, orderId, order]);

    useEffect(() => {
        const fetchPaymentIntent = async () => {
            try {
                const { data } = await api.post("/api/stripe/create-payment-intent", {
                    orderId,
                });
                setClientSecret(data.clientSecret);
            } catch (err) {
                setError(err?.response?.data?.message || "Failed to initialize payment");
            } finally {
                setLoadingPayment(false);
            }
        };

        if (orderId) {
            fetchPaymentIntent();
        }
    }, [orderId]);

    if (loading || loadingPayment || !order) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
                <div className="text-center space-y-4">
                    <div className="w-12 h-12 border-4 border-gray-200 border-t-primary rounded-full animate-spin mx-auto"></div>
                    <p className="text-sm uppercase tracking-widest text-gray-400 font-bold">Preparing Secure Checkout...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fdfbf7]">
                <div className="text-center space-y-4 max-w-md">
                    <p className="text-red-500 font-bold">{error}</p>
                    <Link to={`/order/${orderId}`} className="text-sm text-gray-500 underline">Back to Order</Link>
                </div>
            </div>
        );
    }

    const appearance = {
        theme: "stripe",
        variables: {
            colorPrimary: "#1a0533",
            colorBackground: "#ffffff",
            colorText: "#1a1a2e",
            colorDanger: "#ef4444",
            fontFamily: "system-ui, -apple-system, sans-serif",
            spacingUnit: "4px",
            borderRadius: "12px",
            fontSizeBase: "15px",
        },
        rules: {
            ".Input": {
                border: "1.5px solid #e5e7eb",
                boxShadow: "none",
                padding: "12px 14px",
            },
            ".Input:focus": {
                border: "1.5px solid #1a0533",
                boxShadow: "0 0 0 3px rgba(26,5,51,0.08)",
            },
            ".Label": {
                fontWeight: "600",
                fontSize: "12px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "#6b7280",
            },
            ".Tab": {
                borderRadius: "12px",
                border: "1.5px solid #e5e7eb",
                fontWeight: "600",
            },
            ".Tab--selected": {
                borderColor: "#1a0533",
                backgroundColor: "#1a0533",
                color: "#ffffff",
            },
        },
    };

    return (
        <div className="min-h-screen bg-[#fdfbf7]">
            {/* Top Bar */}
            <div className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link to={`/order/${orderId}`} className="flex items-center gap-2 text-gray-400 hover:text-gray-900 transition-colors text-sm font-medium">
                        <ArrowLeft size={16} />
                        Back to Order
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Secure Checkout</span>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Column: Payment Form */}
                    <div className="lg:col-span-7">
                        <div className="bg-white rounded-[2rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100">
                            {clientSecret && (
                                <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
                                    <StripeCheckoutForm orderId={orderId} />
                                </Elements>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Order Summary */}
                    <div className="lg:col-span-5">
                        <div className="bg-white rounded-[2rem] p-10 shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-24">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-900">
                                    <ShoppingBag size={20} />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 tracking-tight">Order Summary</h2>
                            </div>

                            {/* Product List */}
                            <div className="space-y-4 mb-8">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-100 shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-900 truncate">{item.name}</p>
                                            <p className="text-xs text-gray-400">{item.qty} × Rs. {item.price.toFixed(2)}</p>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900 shrink-0">Rs. {(item.qty * item.price).toFixed(2)}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-gray-100 pt-6 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Subtotal</span>
                                    <span className="font-bold text-gray-900">Rs. {order.itemsPrice}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-500 font-medium">Shipping</span>
                                    <span className="font-bold text-green-600">
                                        {Number(order.shippingPrice) === 0 ? "Free Shipping" : `Rs. ${order.shippingPrice}`}
                                    </span>
                                </div>
                                {Number(order.taxPrice) > 0 && (
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-500 font-medium">Tax</span>
                                        <span className="font-bold text-gray-900">Rs. {order.taxPrice}</span>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900">Total</span>
                                <span className="text-2xl font-bold text-gray-900 tracking-tight">Rs. {order.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPaymentScreen;
