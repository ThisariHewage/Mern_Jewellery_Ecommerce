import { AlertTriangle, X } from 'lucide-react';

const DeleteConfirmModal = ({ show, onClose, onConfirm, title = "Confirm Action", message = "Are you sure you want to proceed? This action cannot be undone." }) => {
    if (!show) return null;

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-[#1a0533]/40 backdrop-blur-md z-[9999] p-4 transition-all duration-300"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-[2.5rem] p-10 max-w-sm w-full shadow-[0_32px_64px_-16px_rgba(26,5,51,0.3)] border border-gray-100 transform transition-all duration-500 scale-100 animate-in fade-in zoom-in duration-300 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Decorative Accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60"></div>

                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-gray-300 hover:text-black hover:bg-gray-50 rounded-full transition-all"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center text-rose-500 mb-8 border border-rose-100/50 shadow-inner text-red-600">
                        <AlertTriangle size={36} strokeWidth={1.5} />
                    </div>

                    <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3 tracking-tight">{title}</h3>
                    <p className="text-gray-500 text-[13px] leading-relaxed mb-10 font-medium px-2">
                        {message}
                    </p>

                    <div className="flex flex-col w-full gap-4">
                        <button
                            onClick={onConfirm}
                            className="w-full py-4.5 bg-[#1a0533] text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-black hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-gray-200/50 border border-white/10 cursor-pointer"
                        >
                            Delete Permanently
                        </button>
                        <button
                            onClick={onClose}
                            className="w-full py-4.5 bg-white text-gray-400 rounded-2xl font-bold uppercase tracking-[0.2em] text-[10px] hover:text-black hover:bg-gray-50 transition-all border border-gray-100 cursor-pointer"
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
