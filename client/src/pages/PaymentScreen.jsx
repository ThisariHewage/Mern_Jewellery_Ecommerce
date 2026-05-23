import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../redux/slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { CreditCard } from "lucide-react";

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

    const [paymentMethod, setPaymentMethod] = useState("Stripe");

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

                </div>

                <form onSubmit={submitHandler} className="space-y-6">
                    <div className="space-y-4">
                        <div className={`p-6 rounded-2xl border-2 transition-all border-black bg-gray-50`}>
                            <label className="flex items-center justify-between cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-black text-white`}>
                                        <CreditCard size={24} />
                                    </div>
                                    <div>
                                        <span className="block font-bold text-gray-900">Direct Credit Card</span>
                                        <span className="text-xs text-gray-500 uppercase tracking-widest font-medium">Stripe Secure</span>
                                    </div>
                                </div>

                            </label>
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
