import { Link } from "react-router-dom";
import { FaHome, FaArrowLeft } from "react-icons/fa";

const NotFoundScreen = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-24 relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]"></div>
            </div>

            <div className="max-w-2xl w-full text-center relative z-10">
                {/* 404 Header */}
                <div className="mb-8">
                    <h1 className="text-[120px] md:text-[180px] font-serif font-black text-gray-200 leading-none select-none">
                        404
                    </h1>
                    <div className="mt-[-40px] md:mt-[-60px]">
                        <span className="text-2xl md:text-4xl font-serif text-primary tracking-wide bg-gray-50 px-6">
                            Page Not Found
                        </span>
                    </div>
                </div>

                {/* Message */}
                <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto leading-relaxed">
                    The piece you are looking for might have been moved, removed, or never existed in our collection.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-secondary transition-all shadow-lg hover:shadow-xl w-full sm:w-auto justify-center"
                    >
                        <FaHome size={14} />
                        Back to Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 bg-transparent border border-accent text-accent px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs hover:bg-accent hover:text-white transition-all w-full sm:w-auto justify-center"
                    >
                        <FaArrowLeft size={14} />
                        Previous Page
                    </button>
                </div>

                {/* Decorative Support Link */}
                <div className="mt-16 pt-8 border-t border-accent/10">
                    <p className="text-sm text-gray-400">
                        Need assistance? {" "}
                        <Link to="/contact" className="text-accent font-semibold hover:underline">
                            Contact our concierge
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundScreen;
