import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import api from "../services/api";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (status !== "success") return;

        const timer = setTimeout(() => {
            setStatus("idle");
            setMessage("");
        }, 4000);

        return () => clearTimeout(timer);
    }, [status]);

    const subscribeHandler = async (e) => {
        e.preventDefault();
        setStatus("sending");
        setMessage("");

        try {
            await api.post("/api/newsletter/subscribe", { email, reason: "To join Dewora Club" });
            setEmail("");
            setStatus("success");
            setMessage("Thank you for subscribing.");
        } catch (err) {
            setStatus("error");
            setMessage(err?.response?.data?.message || "Subscription failed. Please try again.");
        }
    };

    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand & About */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-serif font-bold tracking-tighter">
                        DEWORA <span className="text-accent">JEWELLERS</span>
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Elevating your style with curated premium jewellery collections. Experience the perfect blend of luxury and elegance.
                    </p>
                    <div className="flex space-x-4">
                        <a href="https://www.facebook.com/" className="text-gray-400 hover:text-accent transition-colors"><FaFacebook size={20} /></a>
                        <a href="https://www.instagram.com/" className="text-gray-400 hover:text-accent transition-colors"><FaInstagram size={20} /></a>
                        <a href="https://www.twitter.com/" className="text-gray-400 hover:text-accent transition-colors"><FaTwitter size={20} /></a>
                        <a href="https://www.youtube.com/" className="text-gray-400 hover:text-accent transition-colors"><FaYoutube size={20} /></a>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-sm uppercase tracking-widest font-bold mb-6 text-accent">Contact Us</h4>
                    <ul className="space-y-4 text-sm text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-accent mt-1">📍</span>
                            <span>123 Jewellers Lane,<br />Colombo 03, Sri Lanka</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-accent">📞</span>
                            <span>+94 70 198 4663</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-accent">✉️</span>
                            <span>ureshathisari@gmail.com</span>
                        </li>
                    </ul>
                </div>

                {/* Customer Care */}
                <div>
                    <h4 className="text-sm uppercase tracking-widest font-bold mb-6 text-accent">Customer Care</h4>
                    <ul className="space-y-4 text-sm text-gray-300">
                        <li><Link to="/privacy-policy" className="hover:text-accent transition-colors">Privacy Policy</Link></li>
                        <li><Link to="/terms-conditions" className="hover:text-accent transition-colors">Terms & Conditions</Link></li>
                        <li><Link to="/services" className="hover:text-accent transition-colors">Services</Link></li>
                        <li><Link to="/promotions" className="hover:text-accent transition-colors">Promotions</Link></li>
                    </ul>
                </div>


                <div className="space-y-8">
                    <div className="space-y-3">
                        <h4 className="text-sm uppercase tracking-[0.3em] font-bold text-white px-4 border-l-2 border-white/20">Dewora Club</h4>
                        <p className="text-[15px] text-gray-400 leading-relaxed pl-4">Join our inner circle for early access and collection previews.</p>
                    </div>

                    <form onSubmit={subscribeHandler} className="relative group pl-4">
                        <div className="relative flex items-center">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-3.5 text-sm outline-none transition-all duration-300 focus:bg-white/10 focus:border-accent/40 focus:ring-1 focus:ring-accent/20 placeholder:text-gray-600"
                            />
                            <button
                                type="submit"
                                disabled={status === "sending"}
                                className="absolute right-1.5 p-2.5 rounded-full bg-accent text-primary hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group-hover:shadow-lg"
                            >
                                {status === "sending" ? (
                                    <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                                ) : (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12"></line>
                                        <polyline points="12 5 19 12 12 19"></polyline>
                                    </svg>
                                )}
                            </button>
                        </div>

                        {message && (
                            <p className={`absolute -bottom-7 left-6 text-[10px] uppercase tracking-widest font-bold ${status === "success" ? "text-accent" : "text-red-400"} animate-pulse`}>
                                {message}
                            </p>
                        )}
                    </form>
                </div>
            </div>


            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-gray-800 flex flex-col md:row justify-between items-center text-xs text-gray-500 uppercase tracking-widest">
                <p>&copy; {currentYear} Dewora Jewellers. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link to="/terms-conditions" className="hover:text-white transition-colors">Terms & Conditions</Link>
                    <Link to="/services" className="hover:text-white transition-colors">Services</Link>
                    <Link to="/promotions" className="hover:text-white transition-colors">Promotions</Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
