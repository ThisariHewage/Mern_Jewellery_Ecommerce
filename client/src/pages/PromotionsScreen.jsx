import { useState, useEffect } from "react";
import api from "../services/api";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const PromotionsScreen = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState(null); // 'sending', 'success', 'error'
    const [message, setMessage] = useState("");

    // Countdown to end of month
    useEffect(() => {
        const calculateTime = () => {
            const now = new Date();
            const end = new Date(now.getFullYear(), now.getMonth() + 1, 1); // Start of next month
            const diff = end - now;
            if (diff <= 0) return;
            setTimeLeft({
                days: Math.floor(diff / (1000 * 60 * 60 * 24)),
                hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((diff / (1000 * 60)) % 60),
                seconds: Math.floor((diff / 1000) % 60),
            });
        };
        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus("sending");
        try {
            const { data } = await api.post("/api/newsletter/subscribe", { email });
            setStatus("success");
            setMessage(data.message || "Thank you for subscribing!");
            setEmail("");
        } catch (err) {
            setStatus("error");
            setMessage(err.response?.data?.message || "Something went wrong. Please try again.");
        }
    };

    const promotions = [
        { badge: "HOT DEAL", title: "Bridal Collection", discount: "20% OFF", desc: "Celebrate your forever with our handcrafted bridal sets. 22k gold rings, necklaces, and earring sets curated for your special day.", tag: "Limited Stock", gradient: "linear-gradient(135deg, #1a0533, #4a0e8f)" },
        { badge: "NEW SEASON", title: "Summer Gold Edit", discount: "15% OFF", desc: "Lightweight everyday gold pieces perfect for the season. Delicate chains, stackable rings, and minimalist ear cuffs.", tag: "While Stocks Last", gradient: "linear-gradient(135deg, #7b3f00, #c9a84c)" },
        { badge: "EXCLUSIVE", title: "Diamond Solitaires", discount: "Buy 1 Get 1", desc: "Our most-loved diamond solitaire pendants are now available in a buy-one-get-one offer. Gift someone you love.", tag: "This Month Only", gradient: "linear-gradient(135deg, #0a2e4a, #1a6b8a)" },
    ];

    const CountBox = ({ value, label }) => (
        <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold font-serif"
                style={{ background: "rgba(201,168,76,0.15)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.3)" }}>
                {String(value).padStart(2, "0")}
            </div>
            <span className="text-white/40 text-[10px] uppercase tracking-widest font-bold mt-2">{label}</span>
        </div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Hero with Countdown */}
            <div className="relative py-32 text-center overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 60%, #0d001a 100%)" }}>
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <p className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold mb-4">Limited Time Offers</p>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tighter mb-6">
                        Exclusive <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #c9a84c, #f0d080)" }}>Promotions</span>
                    </h1>
                    <p className="text-white/60 max-w-lg mx-auto text-sm leading-relaxed mb-12">Extraordinary pieces at extraordinary values. These offers won't last long.</p>

                    {/* Countdown Timer */}
                    <div>
                        <p className="text-white/50 text-xs uppercase tracking-[0.3em] font-bold mb-6">Offers End In</p>
                        <div className="flex justify-center gap-4">
                            <CountBox value={timeLeft.days} label="Days" />
                            <div className="text-2xl font-bold text-amber-400 self-center mb-6">:</div>
                            <CountBox value={timeLeft.hours} label="Hours" />
                            <div className="text-2xl font-bold text-amber-400 self-center mb-6">:</div>
                            <CountBox value={timeLeft.minutes} label="Mins" />
                            <div className="text-2xl font-bold text-amber-400 self-center mb-6">:</div>
                            <CountBox value={timeLeft.seconds} label="Secs" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Promo Cards */}
            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {promotions.map((promo, i) => (
                        <div key={i} className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                            <div className="absolute inset-0" style={{ background: promo.gradient }} />
                            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(ellipse at top right, #c9a84c 0%, transparent 60%)" }} />
                            <div className="relative z-10 p-10">
                                <span className="inline-block px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6" style={{ background: "rgba(201,168,76,0.2)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.4)" }}>
                                    {promo.badge}
                                </span>
                                <h2 className="text-3xl font-serif font-bold text-white mb-2">{promo.title}</h2>
                                <p className="text-5xl font-serif font-bold mb-4" style={{ color: "#c9a84c" }}>{promo.discount}</p>
                                <p className="text-white/60 text-sm leading-relaxed mb-8">{promo.desc}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">⏱ {promo.tag}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Newsletter Banner */}
                <div className="rounded-3xl p-12 text-center border border-gray-100 shadow-sm" style={{ background: "linear-gradient(135deg, #fdf8ee, #fff)" }}>
                    <p className="text-xs uppercase tracking-[0.4em] font-bold mb-3" style={{ color: "#c9a84c" }}>Never Miss a Deal</p>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 tracking-tighter mb-4">Get Exclusive Offers First</h2>
                    <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto">Subscribe to the Dewora insider list and receive early access to promotions, new arrivals, and VIP events.</p>

                    {status === "success" ? (
                        <div className="flex flex-col items-center gap-3 animate-fade-in text-center">
                            <FaCheckCircle className="text-green-500 text-4xl" />
                            <p className="text-gray-800 font-bold">{message}</p>
                            <button onClick={() => setStatus(null)} className="text-xs text-[#c9a84c] uppercase tracking-widest font-bold hover:underline">Subscribe Another</button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    id="promo-email-input"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="flex-1 px-5 py-3.5 rounded-full border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
                                    style={{ "--tw-ring-color": "#c9a84c" }}
                                />
                                <button
                                    id="promo-subscribe-btn"
                                    disabled={status === "sending"}
                                    className="px-8 py-3.5 rounded-full text-sm font-bold uppercase tracking-widest whitespace-nowrap transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                                    style={{ background: "linear-gradient(90deg, #2d0a5e, #c9a84c)", color: "#fff" }}
                                >
                                    {status === "sending" ? "Subscribing..." : "Subscribe"}
                                </button>
                            </div>
                            {status === "error" && (
                                <div className="mt-4 flex items-center justify-center gap-2 text-red-500 text-xs font-bold">
                                    <FaExclamationCircle />
                                    <span>{message}</span>
                                </div>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PromotionsScreen;
