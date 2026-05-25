import { useEffect } from "react";
import { Link } from "react-router-dom";

const policySections = [
    {
        icon: "01",
        title: "Information We Collect",
        subtitle: "Personal Details",
        body: "We collect details you provide when creating an account, placing an order, subscribing to updates, contacting us, or using checkout. This may include your name, email address, phone number, delivery address, order details, and payment-related confirmation data.",
        highlight: "Used for orders and support",
    },
    {
        icon: "02",
        title: "How We Use Your Information",
        subtitle: "Service Purpose",
        body: "Your information helps us process orders, arrange delivery, respond to enquiries, send service updates, improve your shopping experience, and share Dewora offers or collection news when you choose to subscribe.",
        highlight: "Improves your experience",
    },
    {
        icon: "03",
        title: "Payments And Security",
        subtitle: "Secure Checkout",
        body: "Payments are handled through secure payment providers. Dewora Jewellers does not store full card numbers. We use reasonable technical and administrative safeguards to protect account, order, and communication data.",
        highlight: "Card details are not stored",
    },
    {
        icon: "04",
        title: "Email And Newsletter Updates",
        subtitle: "Club Updates",
        body: "If you subscribe to our newsletter, we use your email address to send collection updates, offers, and jewellery care news. You can ask us to remove your email from our mailing list at any time.",
        highlight: "Opt out anytime",
    },
    {
        icon: "05",
        title: "Sharing Information",
        subtitle: "Trusted Services",
        body: "We only share information when needed to complete services, such as delivery, payment processing, order support, legal compliance, or protecting the safety and integrity of our website.",
        highlight: "Shared only when needed",
    },
    {
        icon: "06",
        title: "Your Choices",
        subtitle: "Your Control",
        body: "You may request access, correction, or deletion of your personal information by contacting us. Some order records may be kept where required for business, tax, fraud prevention, or legal purposes.",
        highlight: "Request updates anytime",
    },
];

const PrivacyPolicyScreen = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="min-h-screen bg-white">
            <div className="relative py-32 text-center overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 60%, #0d001a 100%)" }}>
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <p className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold mb-4">Your Data, Protected</p>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tighter mb-6">
                        Privacy <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #c9a84c, #f0d080)" }}>Policy</span>
                    </h1>
                    <p className="text-white/60 max-w-xl mx-auto leading-relaxed text-sm">
                        We respect your privacy and handle your personal information with care while providing our jewellery, delivery, support, and newsletter services.
                    </p>
                    <p className="text-white/40 text-[10px] uppercase tracking-[0.3em] font-bold mt-8">
                        Last updated: May 2026
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {policySections.map((section) => (
                        <article key={section.title} className="group relative bg-white border border-gray-100 rounded-3xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden">
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl" style={{ background: "linear-gradient(135deg, #2d0a5e, #c9a84c)" }} />
                            <div className="relative z-10">
                                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-serif font-bold mb-6" style={{ background: "rgba(201,168,76,0.12)", color: "#c9a84c", border: "1px solid rgba(201,168,76,0.25)" }}>
                                    {section.icon}
                                </div>
                                <p className="text-xs uppercase tracking-[0.3em] font-bold mb-1" style={{ color: "#c9a84c" }}>{section.subtitle}</p>
                                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4 group-hover:text-purple-900 transition-colors">
                                    {section.title}
                                </h2>
                                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                    {section.body}
                                </p>
                                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                                    <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#c9a84c" }} />
                                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400">{section.highlight}</span>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <div className="mx-6 lg:mx-auto max-w-7xl mb-24 rounded-3xl py-20 px-8 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0533, #2d0a5e)" }}>
                <div className="relative z-10">
                    <p className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold mb-4">Need Help?</p>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-white tracking-tighter mb-6">Questions About Your Data?</h2>
                    <p className="text-white/60 max-w-lg mx-auto text-sm leading-relaxed mb-10">
                        For privacy questions or data requests, contact Dewora Jewellers and we will help you review or update your information.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block px-10 py-4 font-bold text-sm uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        style={{ background: "linear-gradient(90deg, #c9a84c, #f0d080)", color: "#1a0533" }}
                    >
                        Contact Dewora
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyScreen;
