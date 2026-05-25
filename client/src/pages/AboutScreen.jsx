import { useEffect } from "react";
const AboutScreen = () => {
    useEffect(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, []);
    const values = [
        {
            icon: "💎",
            title: "Premium Craftsmanship",
            desc: "Every piece is handcrafted by master artisans with decades of experience, using only ethically sourced gemstones and fine metals.",
        },
        {
            icon: "✨",
            title: "Timeless Design",
            desc: "Our designs bridge classic elegance and modern sensibility, creating jewellery that transcends fleeting trends.",
        },
        {
            icon: "🌿",
            title: "Ethical Sourcing",
            desc: "We are committed to responsible sourcing — every diamond and gemstone is certified conflict-free and sustainably obtained.",
        },
        {
            icon: "🤝",
            title: "Lifetime Service",
            desc: "Our relationship doesn't end at purchase. We offer complimentary cleaning, resizing, and care for every piece, forever.",
        },
    ];

    const milestones = [
        { year: "2004", event: "Dewora Jewellers founded in Colombo by the Perera family." },
        { year: "2010", event: "Expanded to three flagship stores across Sri Lanka." },
        { year: "2016", event: "Launched our first signature 22k Gold Bridal Collection." },
        { year: "2020", event: "Introduced bespoke custom design consultations." },
        { year: "2024", event: "Brought the Dewora experience online to reach jewellery lovers worldwide." },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div
                className="relative py-32 text-center overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 60%, #0d001a 100%)",
                }}
            >
                <div
                    className="absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage: "radial-gradient(ellipse at center, #c9a84c 0%, transparent 70%)",
                    }}
                />
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <p className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold mb-4">
                        Our Story
                    </p>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tighter mb-6">
                        About{" "}
                        <span
                            className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "linear-gradient(90deg, #c9a84c, #f0d080)" }}
                        >
                            Dewora Jewellers
                        </span>
                    </h1>
                    <p className="text-white/60 max-w-xl mx-auto leading-relaxed text-sm">
                        Two decades of passion, precision, and the pursuit of perfection in every piece we create.
                    </p>
                </div>
            </div>

            {/* Mission Statement */}
            <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                <div className="h-[1px] w-16 mx-auto mb-12" style={{ background: "#c9a84c" }} />
                <p className="text-3xl md:text-4xl font-serif text-gray-900 leading-relaxed font-light">
                    "We believe jewellery is more than adornment — it is a story, a memory, a legacy passed through generations."
                </p>
                <p className="mt-8 text-sm uppercase tracking-[0.3em] text-gray-400 font-bold">
                    — Dewora Jewellers Founding Principle
                </p>
                <div className="h-[1px] w-16 mx-auto mt-12" style={{ background: "#c9a84c" }} />
            </div>

            {/* Our Values */}
            <div className="bg-gray-50 py-24">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <p className="text-xs uppercase tracking-[0.4em] font-bold mb-3"
                            style={{ color: "#c9a84c" }}>
                            What Defines Us
                        </p>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tighter">
                            Our Core Values
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <div
                                key={i}
                                className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                            >
                                <div className="text-4xl mb-5">{v.icon}</div>
                                <h3 className="font-serif font-bold text-xl text-gray-900 mb-3 group-hover:text-purple-800 transition-colors">
                                    {v.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="max-w-4xl mx-auto px-6 py-24">
                <div className="text-center mb-16">
                    <p className="text-xs uppercase tracking-[0.4em] font-bold mb-3"
                        style={{ color: "#c9a84c" }}>
                        Our Journey
                    </p>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tighter">
                        Two Decades of Excellence
                    </h2>
                </div>
                <div className="relative">
                    <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gray-200 -translate-x-1/2 hidden md:block" />
                    <div className="space-y-12">
                        {milestones.map((m, i) => (
                            <div
                                key={i}
                                className={`flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
                            >
                                <div className={`flex-1 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                                    <div className="inline-block bg-white border border-gray-100 shadow-md rounded-2xl p-6 hover:shadow-xl transition-shadow">
                                        <p className="text-2xl font-serif font-bold mb-2"
                                            style={{ color: "#c9a84c" }}>
                                            {m.year}
                                        </p>
                                        <p className="text-gray-600 text-sm leading-relaxed">{m.event}</p>
                                    </div>
                                </div>
                                <div
                                    className="hidden md:flex w-5 h-5 rounded-full border-4 border-white shadow-md flex-shrink-0 z-10"
                                    style={{ background: "linear-gradient(135deg, #2d0a5e, #c9a84c)" }}
                                />
                                <div className="flex-1 hidden md:block" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutScreen;
