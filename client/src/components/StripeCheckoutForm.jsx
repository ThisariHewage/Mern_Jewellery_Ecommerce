import { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { Lock, ShieldCheck } from "lucide-react";

const StripeCheckoutForm = ({ orderId }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        setIsProcessing(true);
        setErrorMessage(null);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/order/${orderId}?success=true`,
            },
        });

        if (error) {
            setErrorMessage(error.message);
            setIsProcessing(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2 tracking-tight">Payment Details</h2>
                <p className="text-gray-400 text-sm font-medium">Pay securely with your credit or debit card</p>
            </div>

            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100">
                <PaymentElement
                    options={{
                        layout: "tabs",
                        defaultValues: {
                            billingDetails: {
                                address: { country: "LK" },
                            },
                        },
                    }}
                />
            </div>

            {errorMessage && (
                <div className="p-4 bg-red-50 border border-red-100 rounded-2xl">
                    <p className="text-red-600 text-sm font-medium">{errorMessage}</p>
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || isProcessing}
                className="w-full py-5 bg-primary text-white border border-accent/25 uppercase tracking-widest font-bold text-sm hover:bg-black transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group cursor-pointer shadow-md hover:shadow-lg rounded-2xl"
            >
                {isProcessing ? (
                    <span className="flex items-center gap-3">
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing Payment...
                    </span>
                ) : (
                    <>
                        <Lock size={16} />
                        Pay Now
                    </>
                )}
            </button>

            <div className="flex items-center justify-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-gray-400">
                    <ShieldCheck size={16} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">SSL Encrypted</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                    <Lock size={14} />
                    <span className="text-[10px] uppercase tracking-widest font-bold">Stripe Secure</span>
                </div>
            </div>
        </form>
    );
};

export default StripeCheckoutForm;
