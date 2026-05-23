import { useState } from "react";
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { Lock } from "lucide-react";

const CheckoutForm = ({ order, orderId, userInfo, dispatch, payOrder, loadingPay }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsProcessing(true);

        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            redirect: "if_required",
        });

        if (error) {
            toast.error(error.message);
            setIsProcessing(false);
        } else if (paymentIntent && paymentIntent.status === "succeeded") {
            const details = {
                id: paymentIntent.id,
                status: paymentIntent.status,
                update_time: new Date().toISOString(),
                payer: { email_address: userInfo.email },
            };
            dispatch(payOrder({ orderId, details }));
            toast.success("Payment successful!");
        }

        setIsProcessing(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <button
                type="submit"
                disabled={isProcessing || loadingPay || !stripe || !elements}
                className="w-full py-4.5 mt-4 bg-primary text-white border border-accent/25 uppercase tracking-widest font-bold text-xs hover:bg-black transition-all duration-300 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-3 cursor-pointer shadow-md hover:shadow-lg rounded-xl"
            >
                {isProcessing || loadingPay ? (
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Processing Payment...</span>
                    </div>
                ) : (
                    <>
                        <Lock size={14} className="text-accent" />
                        <span>{`Pay Securely $${order.totalPrice.toFixed(2)}`}</span>
                    </>
                )}
            </button>
        </form>
    );
};

export default CheckoutForm;
