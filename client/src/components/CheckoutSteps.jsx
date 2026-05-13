import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    const steps = [
        { name: "Sign In", link: "/login", completed: step1 },
        { name: "Shipping", link: "/shipping", completed: step2 },
        { name: "Payment", link: "/payment", completed: step3 },
        { name: "Place Order", link: "/placeorder", completed: step4 },
    ];

    return (
        <nav className="flex items-center justify-center mb-12 px-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {steps.map((step, index) => (
                <div key={index} className="flex items-center">
                    <div className="flex flex-col items-center group">
                        <div 
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border-2 ${
                                step.completed 
                                    ? "bg-black border-black text-white" 
                                    : "bg-white border-gray-200 text-gray-400"
                            }`}
                        >
                            {step.completed ? <Check size={18} strokeWidth={3} /> : <span className="font-bold">{index + 1}</span>}
                        </div>
                        <div className="mt-3">
                            {step.completed ? (
                                <Link 
                                    to={step.link} 
                                    className="text-xs uppercase tracking-[0.2em] font-bold text-black hover:text-gray-600 transition-colors"
                                >
                                    {step.name}
                                </Link>
                            ) : (
                                <span className="text-xs uppercase tracking-[0.2em] font-bold text-gray-300">
                                    {step.name}
                                </span>
                            )}
                        </div>
                    </div>
                    {index < steps.length - 1 && (
                        <div className={`w-12 sm:w-20 h-[2px] mx-2 sm:mx-4 mb-8 transition-colors duration-300 ${
                            steps[index + 1].completed ? "bg-black" : "bg-gray-200"
                        }`} />
                    )}
                </div>
            ))}
        </nav>
    );
};

export default CheckoutSteps;
