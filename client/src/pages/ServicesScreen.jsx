import { useEffect } from "react";
import { Link } from "react-router-dom";

const ServicesScreen = () => {
    useEffect(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, []);
    const services = [
        { icon: "💍", title: "Custom Design", subtitle: "Bespoke Creation", desc: "Work one-on-one with our master jewellers to bring your dream piece to life. From initial sketch to final polish, every detail is yours to decide.", highlight: "Starting from consultation" },
        { icon: "🔧", title: "Jewellery Repair", subtitle: "Restoration & Repair", desc: "Breathing new life into beloved pieces. We expertly repair broken clasps, resize rings, re-tip prongs, and restore antique jewellery.", highlight: "Same-day assessment" },
        { icon: "📜", title: "Appraisal", subtitle: "Official Valuation", desc: "Receive a certified appraisal document for insurance, estate, or resale purposes by our GIA-trained gemologists.", highlight: "Certified documentation" },
        { icon: "✨", title: "Professional Cleaning", subtitle: "Ultrasonic & Polish", desc: "Restore brilliance with our professional ultrasonic cleaning. Complimentary for all Dewora pieces.", highlight: "Free for Dewora clients" },
        { icon: "💎", title: "Gemstone Sourcing", subtitle: "Custom Gem Selection", desc: "Access our exclusive network of global suppliers to source rare, certified, and ethically mined gemstones.", highlight: "Ethically certified" },
        { icon: "🎁", title: "Gift Concierge", subtitle: "Personal Shopping", desc: "Our personal styling team will help you select the perfect gift with complimentary gift wrapping.", highlight: "Premium gift wrapping" },
    ];

    return (
        <div className="min-h-screen bg-white">
            <div className="relative py-32 text-center overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 60%, #0d001a 100%)" }}>
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <p className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold mb-4">What We Offer</p>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tighter mb-6">
                        Our <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #c9a84c, #f0d080)" }}>Services</span>
                    </h1>
                    <p className="text-white/60 max-w-xl mx-auto leading-relaxed text-sm">A complete suite of luxury jewellery services tailored to you.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, i) => (
                        <div key={i} className="group relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl" style={{ background: "linear-gradient(135deg, #2d0a5e, #c9a84c)" }} />
                            <div className="relative z-10">
                                <div className="text-5xl mb-6">{service.icon}</div>
                                <p className="text-xs uppercase tracking-[0.3em] font-bold mb-1" style={{ color: "#c9a84c" }}>{service.subtitle}</p>
                                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-purple-900 transition-colors">{service.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">{service.desc}</p>
                                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#c9a84c" }} />
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{service.highlight}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mx-6 lg:mx-auto max-w-7xl mb-24 rounded-3xl py-20 px-8 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0533, #2d0a5e)" }}>
                <div className="relative z-10">
                    <p className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold mb-4">Ready to Begin?</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tighter mb-6">Let's Create Something Extraordinary</h2>
                    <p className="text-white/60 max-w-lg mx-auto text-sm leading-relaxed mb-10">Book a complimentary consultation with one of our expert jewellers.</p>
                    <Link to="/contact" id="services-cta-contact" className="inline-block px-10 py-4 font-bold text-sm uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl" style={{ background: "linear-gradient(90deg, #c9a84c, #f0d080)", color: "#1a0533" }}>
                        Book a Consultation
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ServicesScreen;
