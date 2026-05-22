import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-toastify";
import api from "../services/api";
import { getOrderDetails, payOrder, payReset } from "../redux/slices/orderSlice";
import { MapPin, CreditCard, ShoppingBag, CheckCircle, Clock, Lock } from "lucide-react";

const StripePaymentComponent = ({ order, orderId, userInfo, dispatch, loadingPay }) => {
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvc, setCardCvc] = useState("");
    const [focusedField, setFocusedField] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Formatters
    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 16) value = value.slice(0, 16);
        const formattedValue = value.replace(/(\d{4})(?=\d)/g, "$1 ");
        setCardNumber(formattedValue);
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length > 2) {
            value = `${value.slice(0, 2)}/${value.slice(2)}`;
        }
        setCardExpiry(value);
    };

    const handleCvcChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 4) value = value.slice(0, 4);
        setCardCvc(value);
    };

    const handleNameChange = (e) => {
        const value = e.target.value.replace(/[^a-zA-Z\s]/g, "");
        setCardName(value);
    };

    const getCardType = (num) => {
        const clean = num.replace(/\s/g, "");
        if (clean.startsWith("4")) return "visa";
        if (clean.startsWith("5")) return "mastercard";
        if (clean.startsWith("3")) return "amex";
        return "generic";
    };

    const cardType = getCardType(cardNumber);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cleanNumber = cardNumber.replace(/\s/g, "");
        if (cleanNumber.length < 15) {
            toast.error("Please enter a valid credit card number.");
            return;
        }
        if (cardExpiry.length < 5) {
            toast.error("Please enter expiration date in MM/YY format.");
            return;
        }
        const [month, year] = cardExpiry.split("/");
        const numMonth = parseInt(month, 10);
        if (numMonth < 1 || numMonth > 12) {
            toast.error("Invalid month.");
            return;
        }
        if (cardCvc.length < 3) {
            toast.error("Please enter a valid CVV code.");
            return;
        }
        if (!cardName.trim()) {
            toast.error("Please enter cardholder name.");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            try {
                const details = {
                    id: "ch_" + Math.random().toString(36).substr(2, 9),
                    status: "succeeded",
                    update_time: new Date().toISOString(),
                    payer: { email_address: userInfo.email },
                };
                dispatch(payOrder({ orderId, details }));
                toast.success("Credit card payment successful!");
            } catch (err) {
                toast.error(err?.message || "Payment failed");
                setIsSubmitting(false);
            }
        }, 1500);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {/* 3D Card */}
            <div className="perspective flex justify-center mb-4">
                <div
                    className={`w-full max-w-[340px] aspect-[1.586/1] rounded-2xl text-white shadow-2xl transition-transform duration-700 preserve-3d relative cursor-pointer ${
                        focusedField === "cvc" ? "my-rotate-y-180" : ""
                    }`}
                >
                    {/* Front Side */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#2A0845] via-[#3a155c] to-[#6441A5] p-6 flex flex-col justify-between backface-hidden border border-white/10 shadow-lg shadow-primary/20">
                        {/* Shine Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/10 rounded-2xl pointer-events-none" />
                        <div className="flex justify-between items-start">
                            {/* Card Chip */}
                            <div className="w-11 h-9 rounded-md bg-gradient-to-r from-amber-400 to-amber-200 relative overflow-hidden">
                                <div className="absolute inset-x-2 inset-y-1 border border-black/10 rounded-sm" />
                                <div className="absolute inset-x-4 inset-y-0 border-x border-black/10" />
                                <div className="absolute inset-y-3 inset-x-0 border-y border-black/10" />
                            </div>
                            {/* Card Type Brand Logo */}
                            {cardType === "visa" && (
                                <span className="text-2xl font-black italic tracking-tighter text-white/90">VISA</span>
                            )}
                            {cardType === "mastercard" && (
                                <div className="flex items-center gap-1">
                                    <div className="w-6 h-6 rounded-full bg-[#EB001B] opacity-90" />
                                    <div className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-90 -ml-3" />
                                </div>
                            )}
                            {cardType === "amex" && (
                                <div className="bg-[#016FD0] px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider text-white">AMEX</div>
                            )}
                            {cardType === "generic" && (
                                <CreditCard size={28} className="text-white/60" />
                            )}
                        </div>
                        {/* Card Number */}
                        <div className="text-lg sm:text-xl font-mono tracking-[0.2em] font-semibold text-center select-none text-white/95 my-2">
                            {cardNumber || "•••• •••• •••• ••••"}
                        </div>
                        {/* Name and Expiry */}
                        <div className="flex justify-between items-end">
                            <div className="max-w-[70%]">
                                <span className="block text-[8px] uppercase tracking-widest text-white/50 font-bold">Card Holder</span>
                                <span className="block font-mono text-sm tracking-wide font-bold uppercase truncate select-none text-white/90">
                                    {cardName || "YOUR FULL NAME"}
                                </span>
                            </div>
                            <div>
                                <span className="block text-[8px] uppercase tracking-widest text-white/50 font-bold">Expires</span>
                                <span className="block font-mono text-sm font-bold tracking-wide select-none text-white/90">
                                    {cardExpiry || "MM/YY"}
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* Back Side */}
                    <div className="absolute inset-0 w-full h-full rounded-2xl bg-gradient-to-br from-[#1F0535] to-[#4A2675] py-6 flex flex-col justify-between backface-hidden my-rotate-y-180 border border-white/10 shadow-2xl">
                        {/* Black Strip */}
                        <div className="w-full h-10 bg-black/80 my-2" />
                        {/* Signature and CVV */}
                        <div className="px-6 flex items-center justify-between mt-2">
                            <div className="flex-1 h-8 bg-white/20 rounded-md border border-white/10 mr-4 flex items-center px-3">
                                <span className="text-[10px] italic font-serif text-white/40 tracking-wider">Secure Signature</span>
                            </div>
                            <div className="text-right w-16">
                                <span className="block text-[8px] uppercase tracking-widest text-white/50 font-bold mb-1">CVC</span>
                                <div className="h-8 bg-white text-black font-mono text-sm font-bold flex items-center justify-center rounded-md select-none tracking-widest">
                                    {cardCvc || "•••"}
                                </div>
                            </div>
                        </div>
                        {/* Info Text */}
                        <div className="px-6 text-[7px] text-white/30 text-center leading-relaxed">
                            This simulated card is secured by end-to-end sandbox protocols. Do not share credentials.
                        </div>
                    </div>
                </div>
            </div>
            {/* Input Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Cardholder Name */}
                <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block">Cardholder Name</label>
                    <input
                        type="text"
                        placeholder="e.g. John Doe"
                        value={cardName}
                        required
                        onChange={handleNameChange}
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField("")}
                        className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-black outline-none transition-all text-sm font-semibold"
                    />
                </div>
                {/* Card Number */}
                <div className="space-y-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block">Card Number</label>
                    <div className="relative group">
                        <CreditCard size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                        <input
                            type="text"
                            placeholder="4111 1111 1111 1111"
                            value={cardNumber}
                            required
                            onChange={handleCardNumberChange}
                            onFocus={() => setFocusedField("number")}
                            onBlur={() => setFocusedField("")}
                            className="w-full pl-11 pr-5 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-black outline-none transition-all text-sm font-semibold font-mono"
                        />
                    </div>
                </div>
                {/* Expiration and CVC */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block">Expiration Date</label>
                        <input
                            type="text"
                            placeholder="MM/YY"
                            value={cardExpiry}
                            required
                            onChange={handleExpiryChange}
                            onFocus={() => setFocusedField("expiry")}
                            onBlur={() => setFocusedField("")}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-black outline-none transition-all text-sm font-semibold font-mono"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] uppercase tracking-wider font-bold text-gray-500 block">CVC / CVV</label>
                        <input
                            type="password"
                            placeholder="•••"
                            value={cardCvc}
                            required
                            onChange={handleCvcChange}
                            onFocus={() => setFocusedField("cvc")}
                            onBlur={() => setFocusedField("")}
                            className="w-full px-5 py-3.5 bg-gray-50 border border-transparent rounded-xl focus:bg-white focus:border-black outline-none transition-all text-sm font-semibold font-mono"
                        />
                    </div>
                </div>
                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting || loadingPay}
                    className="w-full py-4.5 mt-4 bg-primary text-white border border-accent/25 uppercase tracking-widest font-bold text-xs hover:bg-black transition-all duration-300 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-3 cursor-pointer shadow-md hover:shadow-lg rounded-xl"
                >
                    {isSubmitting || loadingPay ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Processing Charge...</span>
                        </div>
                    ) : (
                        <>
                            <Lock size={14} className="text-accent" />
                            <span>{`Pay Securely $${order.totalPrice.toFixed(2)}`}</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

const OrderScreen = () => {
    const { id: orderId } = useParams();
    const dispatch = useDispatch();
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();
    const { order, loading, error, successPay, loadingPay } = useSelector((state) => state.orders);
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!order || successPay || order._id !== orderId) {
            dispatch(getOrderDetails(orderId));
            if (successPay) {
                dispatch(payReset());
            }
        } else if (!order.isPaid) {
            if (!window.paypal) {
                const loadPayPalScript = async () => {
                    const { data: clientId } = await api.get("/api/config/paypal");
                    paypalDispatch({
                        type: "resetOptions",
                        value: { "client-id": clientId, currency: "USD" },
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
                        amount: { value: order.totalPrice },
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
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900"><MapPin size={24} /></div>
                            <div className="flex-1"><h2 className="text-xl font-bold text-gray-900">Shipping</h2><p className="text-sm text-gray-500">{order.user.name} ({order.user.email})</p></div>
                        </div>
                        <div className="pl-16 space-y-4">
                            <p className="text-gray-700 font-medium">
                                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest"><CheckCircle size={14} /> Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</div>
                            ) : (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-full text-xs font-bold uppercase tracking-widest"><Clock size={14} /> Not Delivered</div>
                            )}
                        </div>
                    </div>
                    {/* Payment Status */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900"><CreditCard size={24} /></div>
                            <div className="flex-1"><h2 className="text-xl font-bold text-gray-900">Payment</h2><p className="text-sm text-gray-500">Method: {order.paymentMethod}</p></div>
                        </div>
                        <div className="pl-16 space-y-4">
                            {order.isPaid ? (
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-xs font-bold uppercase tracking-widest">
                                    <CheckCircle size={14} /> Paid on {order.paidAt ? new Date(order.paidAt).toLocaleDateString() : 'N/A'}
                                </div>
                            ) : (
                                <>
                                    {order.paymentMethod === "Stripe" ? (
                                        <StripePaymentComponent order={order} orderId={orderId} userInfo={userInfo} dispatch={dispatch} loadingPay={loadingPay} />
                                    ) : (
                                        <>
                                            {isPending && <div className="text-center py-4 font-bold text-xs uppercase tracking-widest text-gray-400">Connecting to PayPal...</div>}
                                            {!isPending && <PayPalButtons createOrder={createOrder} onApprove={onApprove} onError={onError} />}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                    {/* Order Items */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-8"><div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900"><ShoppingBag size={24} /></div><h2 className="text-xl font-bold text-gray-900">Order Items</h2></div>
                        <div className="space-y-6">
                            {order.orderItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                                    <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                                    <div className="flex-1 flex justify-between items-center">
                                        <div><Link to={`/product/${item.product}`} className="font-bold text-gray-900 hover:text-gray-600">{item.name}</Link><p className="text-sm text-gray-500">{item.qty} x ${item.price}</p></div>
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
                            <div className="flex justify-between"><span className="text-gray-500 uppercase tracking-widest font-bold">Items</span><span className="font-bold">${order.itemsPrice}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500 uppercase tracking-widest font-bold">Shipping</span><span className="font-bold text-gray-900 text-green-600">Free</span></div>
                            <div className="flex justify-between"><span className="text-gray-500 uppercase tracking-widest font-bold">Estimated Tax</span><span className="font-bold">${order.taxPrice}</span></div>
                            <div className="pt-4 border-t border-gray-200 flex justify-between items-center"><span className="text-lg font-bold text-gray-900">Total</span><span className="text-2xl font-bold text-gray-900">${order.totalPrice}</span></div>
                        </div>
                        {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                            <button onClick={deliverOrderHandler} className="w-full py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all">Mark As Delivered</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderScreen;