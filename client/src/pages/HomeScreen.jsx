import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";

const fadeUp = {
    hidden: {
        opacity: 0,
        y: 40,
    },

    visible: {
        opacity: 1,
        y: 0,

        transition: {
            duration: 0.8,
            ease: "easeOut",
        },
    },
};

const stagger = {
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};


const StatBadge = ({ value, label }) => (
    <div className="text-center">
        <p className="text-3xl md:text-4xl font-serif font-bold text-transparent bg-clip-text"
            style={{ backgroundImage: "linear-gradient(90deg, #c9a84c, #f0d080)" }}>
            {value}
        </p>
        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mt-1">{label}</p>
    </div>
);

const CategoryCard = ({ emoji, title, subtitle, to, id, video }) => {
    const videoRef = useRef(null);

    const handleMouseEnter = () => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => { });
        }
    };

    const handleMouseLeave = () => {
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    return (
        <Link
            to={to}
            id={id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 block min-h-[280px]"
            style={{ background: video ? "#000" : "linear-gradient(135deg, #1a0533 0%, #2d0a5e 100%)" }}
        >
            {/* Background Video */}
            {video && (
                <video
                    ref={videoRef}
                    src={video}
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-700"
                />
            )}

            {/* Subtle bottom gradient for text readability — always visible */}
            <div
                className="absolute inset-0 z-0 transition-opacity duration-500"
                style={{
                    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0) 100%)",
                }}
            />
            {/* Subtle inner glow on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.4) 100%)" }} />

            {/* Content */}
            <div className="relative z-10 p-10 flex flex-col items-start gap-4 min-h-[280px] justify-end">
                <span className="text-5xl drop-shadow-lg">{emoji}</span>
                <div>
                    <p className="text-xs uppercase tracking-[0.35em] font-bold mb-1"
                        style={{ color: "#c9a84c" }}>{subtitle}</p>
                    <h3 className="text-2xl font-serif font-bold text-white group-hover:text-amber-200 transition-colors drop-shadow">
                        {title}
                    </h3>
                </div>
                <span className="text-xs uppercase tracking-widest font-bold text-white/50 group-hover:text-amber-400 transition-colors flex items-center gap-2">
                    Explore Collection
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                </span>
            </div>
            {/* Bottom gold bar */}
            <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[3px] transition-all duration-500"
                style={{ background: "linear-gradient(90deg, #c9a84c, #f0d080)" }} />
        </Link>
    );
};

const ServicePill = ({ icon, text }) => (
    <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <span className="text-2xl">{icon}</span>
        <span className="text-sm font-bold uppercase tracking-widest text-gray-600">{text}</span>
    </div>
);


const HomeScreen = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const heroImages = [
        "/hero-model.png",
        "/hero-model-2.png",
        "/hero-model-3.png",
        "/hero-model-4.png",
        "/hero-model-5.png"
    ];

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    const featured = products.slice(0, 4);

    return (
        <div className="min-h-screen bg-white overflow-x-hidden">

            {/* ── HERO ─────────────────────────────── */}
            <section
                className="relative min-h-[92vh] flex items-center overflow-hidden"
                style={{ background: "linear-gradient(120deg, #0d0d14 0%, #12101e 50%, #1a1828 100%)" }}
            >
                {/* Left — Text Content */}
                <div className="relative z-20 w-full md:w-1/2 px-10 md:px-16 lg:px-24 py-24 flex flex-col justify-center">
                    {/* Pre-title */}
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-8 h-[1px]" style={{ background: "#c9a84c" }} />
                        <span className="text-[11px] uppercase tracking-[0.35em] font-bold" style={{ color: "#c9a84c" }}>
                            Est. 2004 · Colombo, Sri Lanka
                        </span>
                    </div>

                    {/* Headline */}
                    <h1 className="font-serif font-bold text-white leading-[1.05] tracking-tight mb-6"
                        style={{ fontSize: "clamp(2.8rem, 5vw, 5rem)" }}>
                        Timeless<br />
                        <span className="whitespace-nowrap">Elegance, Inspired</span><br />
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "linear-gradient(90deg, #c9a84c, #f0d080)" }}>
                            By Heritage
                        </span>
                    </h1>

                    <p className="text-white/50 text-sm md:text-base leading-relaxed mb-10 max-w-sm">
                        Explore timeless jewellery that blends heritage design with modern elegance.
                    </p>

                    {/* CTA Buttons — large rectangular sharp-cornered style */}
                    <div className="flex flex-wrap gap-5 items-center">
                        {/* Solid white button */}
                        <motion.div
    variants={fadeUp}
    className="flex flex-wrap gap-5 items-center justify-center md:justify-start"
>

    {/* View Jewellery Button */}

    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className="relative overflow-hidden"
    >
        <motion.div
            className="absolute inset-0 rounded-none"
            initial={{ opacity: 0 }}
            whileHover={{
                opacity: 1,
                scale: 1.2,
            }}
            transition={{ duration: 0.4 }}
            style={{
                background:
                    "radial-gradient(circle, rgba(255,255,255,0.35) 0%, transparent 70%)",
            }}
        />

        <Link
            to="/jewellery"
            id="hero-cta-shop"
            className="relative z-10 inline-flex items-center gap-3 font-bold uppercase tracking-[0.25em]"
            style={{
                background: "#ffffff",
                color: "#111111",
                padding: "18px 44px",
                fontSize: "12px",
                letterSpacing: "0.2em",
                borderRadius: "0",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
        >
            <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                }}
            >
                ✦
            </motion.span>

            View Jewellery
        </Link>
    </motion.div>

    {/* Our Story Button */}

    <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.92 }}
        className="relative overflow-hidden"
    >
        <motion.div
            className="absolute inset-0 rounded-none"
            initial={{ opacity: 0 }}
            whileHover={{
                opacity: 1,
                scale: 1.2,
            }}
            transition={{ duration: 0.4 }}
            style={{
                background:
                    "radial-gradient(circle, rgba(201,168,76,0.3) 0%, transparent 70%)",
            }}
        />

        <Link
            to="/about"
            id="hero-cta-about"
            className="relative z-10 inline-flex items-center gap-3 font-bold uppercase tracking-[0.25em]"
            style={{
                background: "transparent",
                color: "#ffffff",
                padding: "18px 44px",
                fontSize: "12px",
                letterSpacing: "0.2em",
                borderRadius: "0",
                border: "2px solid rgba(255,255,255,0.75)",
                backdropFilter: "blur(10px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            }}
        >
            <motion.span
                animate={{
                    rotate: [0, 15, -15, 0],
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                }}
            >
                ✦
            </motion.span>

            Our Story
        </Link>
    </motion.div>

</motion.div>
                        
                    </div>

                    {/* Stats Row */}
                    <div className="mt-16 pt-8 border-t flex flex-wrap gap-10"
                        style={{ borderColor: "rgba(201,168,76,0.15)" }}>
                        <StatBadge value="20+" label="Years of Craft" />
                        <StatBadge value="5K+" label="Happy Clients" />
                        <StatBadge value="22K" label="Gold Standard" />
                        <StatBadge value="100%" label="Ethically Sourced" />
                    </div>
                </div>

                {/* Right — Model Image filling half the screen */}
                <div className="absolute right-0 top-0 h-full w-full md:w-[58%] select-none">
                    {/* Gradient fade on left edge so image blends into dark bg */}
                    <div className="absolute inset-0 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(to right, #0d0d14 0%, transparent 30%)" }} />
                    {/* Bottom fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-32 z-10 pointer-events-none"
                        style={{ background: "linear-gradient(to top, #0d0d14 0%, transparent 100%)" }} />
                    {heroImages.map((src, index) => (
                        <img
                            key={src}
                            src={src}
                            alt="Dewora Jewellers — Timeless Elegance"
                            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 pointer-events-none ${index === currentImageIndex ? "opacity-100 z-0" : "opacity-0 -z-10"
                                }`}
                            style={{ filter: "brightness(0.92) contrast(1.05)" }}
                        />
                    ))}

                    {/* Carousel Dots */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3 pointer-events-auto">
                        {heroImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`w-3 h-3 rounded-full transition-all duration-300 border ${idx === currentImageIndex
                                    ? "border-transparent scale-125 shadow-[0_0_10px_rgba(201,168,76,0.6)]"
                                    : "bg-transparent border-[#c9a84c]/60 hover:border-[#c9a84c] hover:bg-white/10"
                                    }`}
                                style={idx === currentImageIndex ? { background: "linear-gradient(90deg, #c9a84c, #f0d080)" } : {}}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce z-20">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/25 font-bold">Scroll</span>
                    <div className="w-[1px] h-8 bg-gradient-to-b from-white/25 to-transparent" />
                </div>
            </section>

            {/* ── MARQUEE TRUST BAR ─────────────────── */}
            <div className="py-5 overflow-hidden border-y border-gray-100" style={{ background: "#fafaf9" }}>
                <div className="flex gap-16 animate-marquee whitespace-nowrap">
                    {["✦ Free Shipping Over $200", "✦ Certified Conflict-Free Gems", "✦ Lifetime Cleaning Service", "✦ Custom Design Available", "✦ GIA-Certified Appraisals", "✦ 30-Day Returns", "✦ Free Shipping Over $200", "✦ Certified Conflict-Free Gems", "✦ Custom Design Available"].map((t, i) => (
                        <span key={i} className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400">{t}</span>
                    ))}
                </div>
            </div>

            {/* ── SHOP BY CATEGORY ──────────────────── */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
                    <div>
                        <p className="text-xs uppercase tracking-[0.4em] font-bold mb-3" style={{ color: "#c9a84c" }}>
                            Shop by Category
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tighter">
                            Find Your Perfect Piece
                        </h2>
                    </div>
                    <Link to="/jewellery" className="text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-gray-900 transition-colors flex items-center gap-2 group">
                        All Jewellery
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CategoryCard
                        title="Women's Jewellery"
                        subtitle="For Her"
                        to="/jewellery?category=Women"
                        id="home-cat-women"
                        video="/videos/cat-women.mp4"
                    />
                    <CategoryCard
                        title="Men's Jewellery"
                        subtitle="For Him"
                        to="/jewellery?category=Men"
                        id="home-cat-men"
                        video="/videos/cat-men.mp4"
                    />
                    <CategoryCard
                        title="Bridal Collection"
                        subtitle="New Beginnings"
                        to="/jewellery?category=Bridal"
                        id="home-cat-bridal"
                        video="/videos/cat-bridal.mp4"
                    />
                </div>
            </section>

            {/* ── FEATURED PRODUCTS ─────────────────── */}
            <section className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-xs uppercase tracking-[0.4em] font-bold mb-3" style={{ color: "#c9a84c" }}>
                            Handpicked for You
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tighter">
                            Featured Collection
                        </h2>
                        <div className="h-[2px] w-16 mx-auto mt-6" style={{ background: "linear-gradient(90deg, #c9a84c, #f0d080)" }} />
                    </div>

                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-24 gap-4">
                            <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
                                style={{ borderColor: "#c9a84c", borderTopColor: "transparent" }} />
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-bold animate-pulse">
                                Loading Collection...
                            </p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 text-red-500 font-medium">{error}</div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {featured.map((product) => (
                                    <ProductCard key={product._id} product={product} />
                                ))}
                            </div>
                            <div className="text-center mt-14">
                                <Link
                                    to="/jewellery"
                                    id="home-view-all-btn"
                                    className="inline-block px-12 py-4 rounded-full font-bold text-sm uppercase tracking-widest border-2 transition-all duration-300 hover:scale-105 hover:shadow-xl"
                                    style={{ borderColor: "#2d0a5e", color: "#2d0a5e" }}
                                    onMouseEnter={e => { e.currentTarget.style.background = "#2d0a5e"; e.currentTarget.style.color = "#fff"; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#2d0a5e"; }}
                                >
                                    View All Jewellery →
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </section>

            {/* ── PROMO BANNER ──────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 py-24">
                <div
                    className="relative rounded-3xl overflow-hidden px-8 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-10"
                    style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 60%, #1a0533 100%)" }}
                >
                    {/* Glow */}
                    <div className="absolute inset-0 opacity-10"
                        style={{ backgroundImage: "radial-gradient(ellipse at top right, #c9a84c 0%, transparent 60%)" }} />
                    <div className="relative z-10">
                        <p className="text-xs uppercase tracking-[0.4em] font-bold mb-3" style={{ color: "#c9a84c" }}>
                            This Month Only
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tighter mb-4">
                            Up to 20% Off<br />Bridal Collections
                        </h2>
                        <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                            Celebrate your forever with our handcrafted 22k gold bridal sets — rings, necklaces, and earrings.
                        </p>
                    </div>
                    <div className="relative z-10 flex-shrink-0">
                        <Link
                            to="/promotions"
                            id="home-promo-btn"
                            className="inline-block px-10 py-4 font-bold text-sm uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                            style={{ background: "linear-gradient(90deg, #c9a84c, #f0d080)", color: "#1a0533" }}
                        >
                            View All Promotions
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── WHY CHOOSE US ─────────────────────── */}
            <section className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-xs uppercase tracking-[0.4em] font-bold mb-3" style={{ color: "#c9a84c" }}>
                            The Dewora Promise
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tighter">
                            Why Our Clients Love Us
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "💎", title: "Premium Craft", desc: "Every piece hand-finished by master artisans with 10+ years experience." },
                            { icon: "🌿", title: "Ethically Sourced", desc: "All gemstones are certified conflict-free and responsibly mined." },
                            { icon: "🚚", title: "Free Shipping", desc: "Complimentary insured delivery on all orders over $200." },
                            { icon: "🔄", title: "30-Day Returns", desc: "Not in love with your piece? Return it hassle-free within 30 days." },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 text-center group">
                                <div className="text-4xl mb-5">{item.icon}</div>
                                <h3 className="font-serif font-bold text-lg text-gray-900 mb-3 group-hover:text-purple-800 transition-colors">{item.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── SERVICES STRIP ────────────────────── */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="flex flex-wrap justify-center gap-4">
                    <ServicePill icon="💍" text="Custom Design" />
                    <ServicePill icon="🔧" text="Jewellery Repair" />
                    <ServicePill icon="📜" text="Appraisals" />
                    <ServicePill icon="✨" text="Free Cleaning" />
                    <ServicePill icon="🎁" text="Gift Concierge" />
                </div>
                <p className="text-center mt-8">
                    <Link to="/services" id="home-services-link" className="text-xs uppercase tracking-widest font-bold hover:text-purple-800 transition-colors text-gray-400 flex items-center justify-center gap-2 group">
                        Learn about all our services
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </Link>
                </p>
            </section>

            {/* ── FINAL CTA ─────────────────────────── */}
            <section className="max-w-4xl mx-auto px-6 pb-28 text-center">
                <div className="h-[1px] w-16 mx-auto mb-12" style={{ background: "#c9a84c" }} />
                <p className="text-xs uppercase tracking-[0.4em] font-bold mb-4" style={{ color: "#c9a84c" }}>
                    Begin Your Journey
                </p>
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tighter mb-6">
                    Let's Create Your Perfect Piece Together
                </h2>
                <p className="text-gray-500 text-sm leading-relaxed max-w-lg mx-auto mb-10">
                    Book a complimentary in-store consultation or reach out to our jewellery specialists. We're here to help you find — or create — something extraordinary.
                </p>
                <Link
                    to="/contact"
                    id="home-final-cta"
                    className="inline-block px-12 py-4 font-bold text-sm uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl"
                    style={{ background: "linear-gradient(90deg, #2d0a5e, #c9a84c)", color: "#fff" }}
                >
                    Get in Touch
                </Link>
            </section>

            {/* Shimmer keyframe */}
            <style>{`
                @keyframes shimmer {
                    0% { background-position: 0% center; }
                    100% { background-position: 200% center; }
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-marquee {
                    animation: marquee 25s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default HomeScreen;
