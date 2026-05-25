import { useEffect } from "react";
import { Link } from "react-router-dom";

const policySections = [
    {
        title: "Information We Collect",
        body: "We collect details you provide when creating an account, placing an order, subscribing to updates, contacting us, or using checkout. This may include your name, email address, phone number, delivery address, order details, and payment-related confirmation data.",
    },
    {
        title: "How We Use Your Information",
        body: "Your information helps us process orders, arrange delivery, respond to enquiries, send service updates, improve your shopping experience, and share Dewora offers or collection news when you choose to subscribe.",
    },
    {
        title: "Payments And Security",
        body: "Payments are handled through secure payment providers. Dewora Jewellers does not store full card numbers. We use reasonable technical and administrative safeguards to protect account, order, and communication data.",
    },
    {
        title: "Email And Newsletter Updates",
        body: "If you subscribe to our newsletter, we use your email address to send collection updates, offers, and jewellery care news. You can ask us to remove your email from our mailing list at any time.",
    },
    {
        title: "Sharing Information",
        body: "We only share information when needed to complete services, such as delivery, payment processing, order support, legal compliance, or protecting the safety and integrity of our website.",
    },
    {
        title: "Your Choices",
        body: "You may request access, correction, or deletion of your personal information by contacting us. Some order records may be kept where required for business, tax, fraud prevention, or legal purposes.",
    },
];

const PrivacyPolicyScreen = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="bg-white">
            <section
                className="relative overflow-hidden px-6 py-24 text-white"
                style={{ background: "linear-gradient(120deg, #0d0d14 0%, #1a0533 60%, #12101e 100%)" }}
            >
                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
                <div className="max-w-5xl mx-auto">
                    <p className="text-xs uppercase tracking-[0.4em] font-bold mb-4" style={{ color: "#c9a84c" }}>
                        Dewora Jewellers
                    </p>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold tracking-tighter mb-6">
                        Privacy Policy
                    </h1>
                    <p className="text-white/60 text-sm md:text-base leading-relaxed max-w-2xl">
                        We respect your privacy and handle your personal information with care while providing our jewellery, delivery, support, and newsletter services.
                    </p>
                    <p className="text-white/35 text-xs uppercase tracking-widest mt-8">
                        Last updated: May 2026
                    </p>
                </div>
            </section>

            <section className="max-w-5xl mx-auto px-6 py-20">
                <div className="grid gap-6">
                    {policySections.map((section) => (
                        <article key={section.title} className="border border-gray-100 rounded-2xl p-6 md:p-8 shadow-sm bg-white">
                            <h2 className="text-xl md:text-2xl font-serif font-bold text-gray-900 mb-3">
                                {section.title}
                            </h2>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                {section.body}
                            </p>
                        </article>
                    ))}
                </div>

                <div className="mt-12 rounded-2xl bg-gray-50 border border-gray-100 p-8">
                    <h2 className="text-2xl font-serif font-bold text-gray-900 mb-3">Contact Us</h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">
                        For privacy questions or data requests, contact Dewora Jewellers and we will help you review or update your information.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block px-8 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:scale-[1.02]"
                        style={{ background: "linear-gradient(90deg, #2d0a5e, #c9a84c)", color: "#fff" }}
                    >
                        Contact Dewora
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicyScreen;
