import React from 'react';
import { CheckCircle } from 'lucide-react';


const SuccessAlert = ({ show, onClose }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#001f3f] bg-opacity-90 backdrop-blur-sm z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center max-w-sm w-full shadow-xl transform transition-all duration-300 hover:scale-105">
        <CheckCircle className="mx-auto text-emerald-500" size={48} />
        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          Order Placed Successfully!
        </h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          Thank you for your purchase. Your order is being processed.
        </p>
        <button
          onClick={onClose}
          className="mt-6 inline-flex items-center justify-center rounded-full bg-primary text-white px-6 py-2 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default SuccessAlert;
