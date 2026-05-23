import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../redux/slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { CreditCard, Wallet } from "lucide-react";

const PaymentScreen = () => {
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    // Redirect if no shipping address
    useEffect(() => {
        if (!shippingAddress.address) {
            navigate("/shipping");
        }
    }, [shippingAddress, navigate]);

    const [paymentMethod, setPaymentMethod] = useState("PayPal");

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate("/placeorder");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <CheckoutSteps step1 step2 step3 />

            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100 max-w-2xl mx-auto">
                <div className="mb-12">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Payment Method</h1>
                    <p className="text-gray-500 text-center uppercase tracking-widest text-xs font-medium">Select how you'd like to pay</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="space-y-4">
                        {/* PayPal Option */}
                        <label
                            className={`flex items-center justify-between p-6 rounded-2xl border-2 transition-all cursor-pointer group ${paymentMethod === "PayPal"
                                ? "border-black bg-gray-50"
                                : "border-gray-100 hover:border-gray-200"
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === "PayPal" ? "bg-black text-white" : "bg-gray-100 text-gray-400"
                                    }`}>
                                    <Wallet size={24} />
                                </div>
                                <div>
                                    <span className="block font-bold text-gray-900">PayPal or Credit Card</span>
                                    <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Safe & Secure</span>
                                </div>
                            </div>
                            <input
                                type="radio"
                                className="w-5 h-5 accent-black"
                                name="paymentMethod"
                                value="PayPal"
                                checked={paymentMethod === "PayPal"}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                        </label>

                        <div className={`p-6 rounded-2xl border-2 transition-all ${paymentMethod === "Stripe" ? "border-black bg-gray-50" : "border-gray-100"}`}>
                            <label className="flex items-center justify-between cursor-pointer mb-6">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${paymentMethod === "Stripe" ? "bg-black text-white" : "bg-gray-100 text-gray-400"}`}>
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-gray-900">Direct Credit Card</span>
                                        <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Stripe Secure</span>
                                    </div>
                                </div>
                                <input
                                    type="radio"
                                    className="w-5 h-5 accent-black cursor-pointer"
                                    name="paymentMethod"
                                    value="Stripe"
                                    checked={paymentMethod === "Stripe"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                />
                            </label>
                            {paymentMethod === "Stripe" && (
                                <div className="mt-4 pt-4 border-t border-gray-200 space-y-4">
                                    <input type="text" placeholder="Card Number" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-black" />
                                    <div className="flex gap-4">
                                        <input type="text" placeholder="MM/YY" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-black" />
                                        <input type="text" placeholder="CVC" className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:border-black" />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4.5 bg-primary text-white border border-accent/25 uppercase tracking-widest font-bold text-sm hover:bg-black transition-all duration-300 active:scale-[0.98] mt-8 cursor-pointer shadow-md hover:shadow-lg"
                    >
                        Continue to Review
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentScreen;
