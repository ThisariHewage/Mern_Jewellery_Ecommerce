import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Scale, Shield, Lock, Truck, RefreshCw, AlertCircle, ArrowRight } from "lucide-react";

const termsContent = [
    {
        id: "website-use",
        icon: <Scale size={20} />,
        title: "1. Website Use & Access",
        subtitle: "General Terms",
        body: "By accessing and using the Dewora Jewellers website, you agree to comply with our terms. The website is provided for lawful browsing, shopping, and account management. Any unauthorized access, data scraping, or disruption of our services will result in immediate termination of your access. We reserve the right to temporarily suspend the website for planned maintenance or security updates without prior liability.",
    },
    {
        id: "product-info",
        icon: <Shield size={20} />,
        title: "2. Product Information",
        subtitle: "Jewellery Details",
        body: "Dewora Jewellers prides itself on craftsmanship. We ensure that our product descriptions, grading, and pricing are accurate. However, because our pieces are handcrafted and feature natural gemstones, slight variations in color, carat weight, and finish may occur. These variations are the hallmark of true artisan work. Pricing is subject to change based on the daily fluctuations of the global precious metal and diamond markets.",
    },
    {
        id: "orders-payments",
        icon: <Lock size={20} />,
        title: "3. Orders And Secure Payments",
        subtitle: "Purchasing",
        body: "Placing an order constitutes an offer to purchase. An order is only confirmed once full payment is successfully authorized and stock availability is verified. We utilize bank-grade encryption for all transactions. Dewora Jewellers reserves the right to cancel or place an order on hold if our fraud-prevention systems flag irregularities, or if pricing errors occur.",
    },
    {
        id: "delivery-shipping",
        icon: <Truck size={20} />,
        title: "4. Delivery & Insured Shipping",
        subtitle: "Logistics",
        body: "Every piece of Dewora Jewellery is dispatched using premium, fully insured courier services. Delivery timelines vary based on location and whether the item requires custom sizing. A mandatory signature is required upon delivery to ensure chain-of-custody. Please ensure your shipping details are accurate; we are not liable for delayed shipments resulting from incorrect address inputs.",
    },
    {
        id: "returns-exchanges",
        icon: <RefreshCw size={20} />,
        title: "5. Returns And Exchanges",
        subtitle: "Customer Care",
        body: "We offer a strict but fair return policy. Eligible items must be returned within 14 days in pristine, unworn condition with all original certificates and packaging intact. Due to hygiene and customization constraints, personalized items, engravings, and bespoke commissions are strictly non-refundable and non-exchangeable unless a verified manufacturing defect is identified upon our expert inspection.",
    },
    {
        id: "account",
        icon: <AlertCircle size={20} />,
        title: "6. Account Responsibility",
        subtitle: "Your Login",
        body: "If you create an account, you are solely responsible for maintaining the confidentiality of your login credentials. You agree to accept responsibility for all activities that occur under your account. If you suspect any unauthorized access, you must notify Dewora customer support immediately. We reserve the right to terminate accounts that violate our terms of service.",
    }
];

const TermsConditionsScreen = () => {
    const [activeSection, setActiveSection] = useState("website-use");

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });

        const handleScroll = () => {
            const sections = termsContent.map(t => document.getElementById(t.id));
            const scrollPosition = window.scrollY + 200;

            for (let i = sections.length - 1; i >= 0; i--) {
                const section = sections[i];
                if (section && section.offsetTop <= scrollPosition) {
                    setActiveSection(section.id);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            window.scrollTo({
                top: element.offsetTop - 120, // Offset for fixed headers
                behavior: "smooth"
            });
            setActiveSection(id);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            {/* Elegant Header Banner */}
            <div className="relative py-24 text-center overflow-hidden border-b border-accent/20" style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 60%, #0d001a 100%)" }}>
                <div className="relative z-10 max-w-4xl mx-auto px-6">
                    <p className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold mb-4">Dewora Purchase Guide</p>
                    <h1 className="text-6xl md:text-7xl font-serif font-bold text-white tracking-tighter mb-4">
                        Terms <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(90deg, #c9a84c, #f0d080)" }}>& Conditions</span>
                    </h1>
                    <p className="text-white/60 max-w-xl mx-auto leading-relaxed text-sm font-medium">
                        These terms explain how orders, payments, delivery, returns, and website use work when shopping with Dewora Jewellers.
                    </p>
                    <div className="mt-6 inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-white/50 font-bold">
                        Last updated: May 2026
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Sticky Sidebar Navigation */}
                    <div className="lg:w-1/4 hidden lg:block">
                        <div className="sticky top-32 space-y-2">
                            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-gray-400 mb-6 px-4">
                                Legal Index
                            </h3>
                            <nav className="flex flex-col space-y-1 border-l-2 border-gray-200">
                                {termsContent.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => scrollToSection(item.id)}
                                        className={`text-left px-6 py-3 font-medium text-sm transition-all duration-300 border-l-[3px] -ml-[2px] hover:bg-white hover:text-accent ${activeSection === item.id
                                            ? "border-accent text-accent bg-white shadow-sm"
                                            : "border-transparent text-gray-500"
                                            }`}
                                    >
                                        {item.title}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    <div className="lg:hidden scrollbar-hide overflow-x-auto whitespace-nowrap pb-4 mb-4 border-b border-gray-200">
                        {termsContent.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`inline-block px-4 py-2 font-medium text-xs rounded-full mr-2 transition-all ${activeSection === item.id
                                    ? "bg-primary text-white"
                                    : "bg-gray-200 text-gray-600"
                                    }`}
                            >
                                {item.title}
                            </button>
                        ))}
                    </div>

                    {/* Scrollable Content */}
                    <div className="lg:w-3/4 space-y-16">
                        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Welcome to Dewora Jewellers. Please read these terms carefully before using our website or purchasing our products. By accessing this website, you agree to be bound by these terms and conditions.
                            </p>

                            <div className="space-y-16 mt-12">
                                {termsContent.map((section) => (
                                    <div key={section.id} id={section.id} className="scroll-mt-32">
                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0">
                                                {section.icon}
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.2em] font-bold text-accent mb-1">
                                                    {section.subtitle}
                                                </p>
                                                <h2 className="text-2xl font-serif font-bold text-gray-900 border-b border-gray-100 pb-2">
                                                    {section.title}
                                                </h2>
                                            </div>
                                        </div>
                                        <p className="text-gray-600 leading-relaxed text-sm md:text-base text-justify pl-8 md:pl-16 border-l-2 border-gray-100">
                                            {section.body}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Support Block */}
                        <div className="mx-6 lg:mx-auto max-w-7xl mb-12 rounded-2xl py-10 px-8 text-center relative overflow-hidden" style={{ background: "linear-gradient(135deg, #1a0533, #2d0a5e)" }}>
                            <div className="relative z-10">
                                <p className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold mb-2">Need Clarification?</p>
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-tighter mb-3">Questions Before You Order?</h2>
                                <p className="text-white/60 max-w-lg mx-auto text-sm leading-relaxed mb-6">
                                    Our jewellery specialists can help with product details, custom requests, delivery questions, and after-sales support.
                                </p>
                                <Link
                                    to="/contact"
                                    className="inline-block px-7 py-3 font-bold text-xs uppercase tracking-widest rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                                    style={{ background: "linear-gradient(90deg, #c9a84c, #f0d080)", color: "#1a0533" }}
                                >
                                    Contact Dewora
                                </Link>
                            </div>
                        </div>
                    </div>

                </div>
            </div >
        </div >
    );
};

export default TermsConditionsScreen;
