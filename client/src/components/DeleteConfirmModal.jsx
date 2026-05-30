import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ show, onClose, onConfirm, title = "Confirm Delete", message = "Are you sure you want to delete this item? This action cannot be undone." }) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-[100] p-4 transition-all duration-300">
            <div
                className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all duration-300 scale-100 animate-in fade-in zoom-in duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 mb-6">
                        <AlertTriangle size={32} />
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        {message}
                    </p>

                    <div className="flex flex-col w-full gap-3">
                        <button
                            onClick={onConfirm}
                            className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-red-700 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-red-200"
                        >
                            Delete Permanently
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-gray-50 text-gray-500 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-100 hover:text-gray-700 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
