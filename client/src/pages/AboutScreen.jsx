import { useEffect } from "react";
import {
    Gem, Sparkles, Sprout, Handshake,
    ChevronRight, History, Award, Globe,
    ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

const AboutScreen = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const values = [
        {
            icon: <Gem size={32} className="text-accent" />,
            title: "Premium Craftsmanship",
            desc: "Every piece is handcrafted by master artisans with decades of experience, using only ethically sourced gemstones and fine metals.",
        },
        {
            icon: <Sparkles size={32} className="text-accent" />,
            title: "Timeless Design",
            desc: "Our designs bridge classic elegance and modern sensibility, creating jewellery that transcends fleeting trends.",
        },
        {
            icon: <Sprout size={32} className="text-accent" />,
            title: "Ethical Sourcing",
            desc: "We are committed to responsible sourcing — every diamond and gemstone is certified conflict-free and sustainably obtained.",
        },
        {
            icon: <Handshake size={32} className="text-accent" />,
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
        <div className="min-h-screen bg-[#fdfbf7]">
            {/* Cinematic Hero Section */}
            {/* Refined Split Hero Section - Matching Service Page Aesthetic */}
            <div className="relative min-h-[600px] lg:h-[80vh] flex items-center bg-[#2A0845] overflow-hidden">
                {/* Subtle Background Glow */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[150px]"></div>

                <div className="max-w-4xl mx-auto px-6 w-full relative z-10 text-center animate-fade-in-up">
                    <p className="text-accent font-sans text-xs uppercase tracking-[0.5em] font-black mb-10">
                        Our Legacy & Heritage
                    </p>
                    <h1 className="text-6xl md:text-9xl font-serif font-bold text-white leading-[1.1] mb-12">
                        Crafting <br />
                        <span className="text-accent italic font-light italic text-7xl md:text-9xl block mt-2">
                            Forever.
                        </span>
                    </h1>
                    <p className="text-white/60 text-xl leading-relaxed mb-12 max-w-2xl mx-auto">
                        For two decades, Dewora Jewellers has defined the pinnacle of luxury, blending ancient craftsmanship with contemporary vision.
                    </p>
                </div>

                {/* Vertical Branding */}
                <div className="absolute bottom-10 left-10 flex flex-col items-center gap-6 hidden lg:flex">
                    <div className="rotate-90 origin-left">
                        <p className="text-[9px] uppercase tracking-[0.4em] font-black text-white/30 whitespace-nowrap">
                            ESTABLISHED 2004
                        </p>
                    </div>
                    <div className="w-[1px] h-16 bg-gradient-to-b from-accent/40 to-transparent"></div>
                </div>
            </div>

            {/* The Mission Statement - Elegance Section */}
            <div className="relative py-32 overflow-hidden">
                <div className="absolute top-0 right-0 p-32 opacity-[0.03] text-primary rotate-12 pointer-events-none">
                    <Award size={600} />
                </div>

                <div className="max-w-5xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-4 mb-12">
                        <div className="h-[1px] w-12 bg-accent shadow-[0_0_8px_rgba(212,175,55,0.4)]"></div>
                        <p className="text-xs uppercase tracking-[0.4em] font-black text-accent">Founding Purpose</p>
                        <div className="h-[1px] w-12 bg-accent shadow-[0_0_8px_rgba(212,175,55,0.4)]"></div>
                    </div>

                    <h2 className="text-3xl md:text-6xl font-serif text-primary leading-tight font-light italic mb-12 px-4">
                        "We believe jewellery is more than adornment — it is a story, a memory, and a legacy passed through generations."
                    </h2>

                    <p className="max-w-2xl mx-auto text-gray-500 text-lg leading-relaxed font-sans">
                        At Dewora, every diamond set and every gold filament spun is a testament to our commitment to excellence. We don't just sell jewellery; we curate milestones.
                    </p>
                </div>
            </div>

            {/* Core Values - Glassmorphism Grid */}
            <div className="bg-primary/5 py-32 border-y border-primary/5 relative">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-xl">
                            <p className="text-xs uppercase tracking-[0.4em] font-black text-accent mb-4">Values</p>
                            <h2 className="text-4xl md:text-6xl font-serif font-black text-primary tracking-tighter">
                                Excellence in Every Detail
                            </h2>
                        </div>
                        <p className="text-gray-500 font-medium max-w-xs text-sm leading-relaxed">
                            Our core pillars guide us in creating a sustainable and luxurious future for jewellery lovers.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((v, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-[2.5rem] p-10 shadow-xl shadow-primary/5 border border-primary/5 hover:border-accent/40 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity translate-x-4 group-hover:translate-x-0 duration-500">
                                    <ChevronRight size={100} className="text-accent" />
                                </div>

                                <div className="p-5 bg-accent/10 rounded-2xl inline-block mb-8 group-hover:bg-accent group-hover:text-white transition-colors duration-500">
                                    {v.icon}
                                </div>
                                <h3 className="text-2xl font-serif font-bold text-primary mb-4">
                                    {v.title}
                                </h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {v.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Showroom & Heritage Section */}
            <div className="py-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 border-2 border-accent/20 rounded-[3rem] -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700"></div>
                            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] shadow-2xl">
                                <img src="/about-showroom.png" alt="Showroom" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
                                <div className="absolute bottom-10 left-10 p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 max-w-xs transition-all hover:scale-105">
                                    <p className="text-white text-sm font-bold leading-relaxed italic">
                                        "Our flagship boutique represents the physical manifestation of our luxury commitment."
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="inline-flex items-center gap-4 mb-8">
                                <History size={24} className="text-accent" />
                                <p className="text-xs uppercase tracking-[0.4em] font-black text-accent">Two Decades of Heritage</p>
                            </div>
                            <h2 className="text-4xl md:text-6xl font-serif font-black text-primary leading-tight mb-12">
                                A Journey of <br /> Brilliance.
                            </h2>

                            <div className="space-y-4">
                                {milestones.map((m, i) => (
                                    <div
                                        key={i}
                                        className="group flex gap-8 p-6 rounded-2xl hover:bg-white hover:shadow-xl hover:shadow-primary/5 border border-transparent hover:border-primary/5 transition-all duration-300"
                                    >
                                        <div className="text-2xl font-serif font-black text-accent/40 group-hover:text-accent transition-colors">
                                            {m.year}
                                        </div>
                                        <div className="pt-1.5 flex flex-col gap-2">
                                            <p className="text-gray-700 text-sm font-bold group-hover:text-primary transition-colors">
                                                {m.event}
                                            </p>
                                            <div className="h-[2px] w-0 bg-accent group-hover:w-full transition-all duration-1000"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 p-10 bg-primary rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-125 transition-transform duration-1000">
                                    <Globe size={150} className="text-white" />
                                </div>
                                <h4 className="text-2xl font-serif font-bold text-white mb-4 relative z-10">Global Vision.</h4>
                                <p className="text-white/60 text-sm leading-relaxed mb-6 relative z-10">
                                    Today, Dewora reaches connoisseurs across six continents, delivering beauty that knows no boundaries.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AboutScreen;
