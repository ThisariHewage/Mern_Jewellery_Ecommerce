import { useState, useEffect } from "react";
import {
    FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock,
    FaInstagram, FaFacebookF, FaWhatsapp, FaPaperPlane,
    FaCheckCircle, FaGem, FaShieldAlt,
    FaHeadset, FaTruck
} from "react-icons/fa";
import api from "../services/api";



/* ─── Trust Badges ───────────────────────────────── */
const trustBadges = [
    { icon: <FaGem size={20} />, label: "Certified Gemstones" },
    { icon: <FaShieldAlt size={20} />, label: "Secure Payments" },
    { icon: <FaHeadset size={20} />, label: "24h Support" },
    { icon: <FaTruck size={20} />, label: "Insured Shipping" },
];

/* ─── Contact Details ────────────────────────────── */
const contactDetails = [
    {
        icon: <FaMapMarkerAlt size={18} />,
        label: "Visit Us",
        value: "123 Jewellers Lane\nColombo 03, Sri Lanka",
        href: "https://maps.google.com",
    },
    {
        icon: <FaPhoneAlt size={16} />,
        label: "Call Us",
        value: "+94 70 198 4663",
        href: "tel:+94701984663",
    },
    {
        icon: <FaEnvelope size={16} />,
        label: "Email Us",
        value: "ureshathisari@gmail.com",
        href: "mailto:ureshathisari@gmail.com",
    },
    {
        icon: <FaClock size={16} />,
        label: "Store Hours",
        value: "Mon – Sat: 9:00am – 7:00pm\nSunday: 10:00am – 5:00pm",
        href: null,
    },
];

/* ─── Component ──────────────────────────────────── */
const ContactScreen = () => {
    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);

    const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [status, setStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [focusedField, setFocusedField] = useState(null);
    const [openFaq, setOpenFaq] = useState(null);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        setErrorMessage("");

        try {
            await api.post("/api/contact", form);
            setStatus("success");
            setForm({ name: "", email: "", phone: "", subject: "", message: "" });
        } catch (err) {
            setStatus("error");
            setErrorMessage(err?.response?.data?.message || "Something went wrong. Please try again.");
            setTimeout(() => setStatus(null), 5000);
        }
    };

    const inputBase =
        "w-full px-5 py-4 rounded-2xl border bg-gray-50 text-sm font-medium text-gray-800 placeholder:text-gray-400 outline-none transition-all duration-200";
    const inputFocused = "border-[#c9a84c] bg-white ring-4 ring-[#c9a84c]/10 shadow-sm";
    const inputIdle = "border-gray-200 hover:border-gray-300";
    const fieldClass = (name) => `${inputBase} ${focusedField === name ? inputFocused : inputIdle}`;

    return (
        <div className="min-h-screen bg-white">

            {/* ── HERO ──────────────────────────────────── */}
            <div
                className="relative py-36 text-center overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 55%, #0d001a 100%)" }}
            >
                {/* Gold radial glow */}
                <div className="absolute inset-0 opacity-[0.09]"
                    style={{ backgroundImage: "radial-gradient(ellipse at center, #c9a84c 0%, transparent 68%)" }} />
                {/* Rotating decorative rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[420px] h-[420px] rounded-full border border-[#c9a84c]/10 absolute" />
                    <div className="w-[620px] h-[620px] rounded-full border border-[#c9a84c]/6 absolute" />
                    <div className="w-[820px] h-[820px] rounded-full border border-white/[0.03] absolute" />
                </div>
                {/* Scattered sparkle dots */}
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="absolute w-1 h-1 rounded-full bg-[#c9a84c]/40 animate-pulse"
                        style={{
                            top: `${15 + i * 13}%`,
                            left: `${8 + i * 15}%`,
                            animationDelay: `${i * 0.4}s`,
                        }} />
                ))}

                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <p className="text-[10px] uppercase tracking-[0.6em] text-amber-400/90 font-bold mb-5 flex items-center justify-center gap-3">
                        <span className="h-[1px] w-8 bg-amber-500/40 inline-block" />
                        Get In Touch
                        <span className="h-[1px] w-8 bg-amber-500/40 inline-block" />
                    </p>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tighter mb-6 leading-[1.05]">
                        Contact{" "}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "linear-gradient(90deg, #c9a84c, #f0d080)" }}>
                            Us
                        </span>
                    </h1>
                    <p className="text-white/55 max-w-lg mx-auto text-sm leading-relaxed font-medium">
                        Whether it's a bespoke creation, a repair, or simply a question —
                        we're here for you. Our team responds personally within 24 hours.
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-10">
                        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[#c9a84c]/60" />
                        <div className="w-1.5 h-1.5 rounded-full bg-[#c9a84c]/80" />
                        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[#c9a84c]/60" />
                    </div>
                </div>
            </div>

            {/* ── TRUST BADGES STRIP ───────────────────── */}
            <div className="border-b border-gray-100" style={{ background: "linear-gradient(90deg, #f8f4ff, #fff8e8, #f8f4ff)" }}>
                <div className="max-w-5xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
                    {trustBadges.map((b, i) => (
                        <div key={i} className="flex items-center gap-2.5 text-gray-600">
                            <span className="text-[#c9a84c]">{b.icon}</span>
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">{b.label}</span>
                            {i < trustBadges.length - 1 && (
                                <span className="hidden sm:block h-4 w-[1px] bg-gray-200 ml-6" />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* ── FLOATING INFO CARDS ──────────────────── */}
            <div className="max-w-7xl mx-auto px-6 pt-14">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {contactDetails.map((item, i) => (
                        <div key={i}
                            className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/80 p-6 flex gap-4 items-start hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-default">
                            <div
                                className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300"
                                style={{ background: "linear-gradient(135deg, #2d0a5e, #c9a84c)" }}
                            >
                                {item.icon}
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] uppercase tracking-[0.25em] font-bold text-gray-400 mb-1">{item.label}</p>
                                {item.href ? (
                                    <a href={item.href} target="_blank" rel="noreferrer"
                                        className="text-gray-800 text-sm font-semibold leading-snug whitespace-pre-line hover:text-[#c9a84c] transition-colors">
                                        {item.value}
                                    </a>
                                ) : (
                                    <p className="text-gray-800 text-sm font-semibold leading-snug whitespace-pre-line">{item.value}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── MAIN GRID ────────────────────────────── */}
            <div className="max-w-7xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 xl:gap-16">

                    {/* ── LEFT COL ── */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Section heading */}
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] font-bold mb-2" style={{ color: "#c9a84c" }}>Find Us</p>
                            <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tighter">Our Location</h2>
                            <div className="h-[2px] w-10 mt-4 rounded-full" style={{ background: "#c9a84c" }} />
                        </div>

                        {/* Map embed */}
                        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-md h-64">
                            <iframe
                                title="Dewora Jewellers Location"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31691.03699485088!2d79.8393!3d6.9271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25963120b1509%3A0x2db2c18a68712863!2sColombo%2003%2C%20Sri%20Lanka!5e0!3m2!1sen!2slk!4v1700000000000"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>

                        {/* Social links */}
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] font-bold mb-4 text-gray-400">Follow Us</p>
                            <div className="flex gap-3">
                                {[
                                    { icon: <FaInstagram size={16} />, href: "https://instagram.com", label: "Instagram" },
                                    { icon: <FaFacebookF size={16} />, href: "https://facebook.com", label: "Facebook" },
                                    { icon: <FaWhatsapp size={16} />, href: "https://wa.me/94701984663", label: "WhatsApp" },
                                ].map((s, i) => (
                                    <a key={i} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                                        className="w-11 h-11 rounded-xl flex items-center justify-center border border-gray-200 text-gray-500 hover:text-white hover:border-transparent hover:shadow-lg transition-all duration-300"
                                        onMouseEnter={e => { e.currentTarget.style.background = "linear-gradient(135deg, #2d0a5e, #c9a84c)"; }}
                                        onMouseLeave={e => { e.currentTarget.style.background = ""; }}>
                                        {s.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quote block */}
                        <div className="rounded-2xl p-6 border-l-4"
                            style={{ background: "linear-gradient(135deg, #f8f4ff, #fff8e8)", borderLeftColor: "#c9a84c" }}>
                            <p className="font-serif text-gray-700 text-sm leading-relaxed italic">
                                "Behind every exquisite jewel is a conversation that began with trust. Let's start yours today."
                            </p>
                            <p className="mt-3 text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold">— The Dewora Team</p>
                        </div>
                    </div>

                    {/* ── RIGHT COL — FORM ── */}
                    <div className="lg:col-span-3">
                        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-8 xl:p-10 relative overflow-hidden">
                            {/* Top accent bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
                                style={{ background: "linear-gradient(90deg, #2d0a5e, #c9a84c, #2d0a5e)" }} />

                            <p className="text-xs uppercase tracking-[0.4em] font-bold mb-2" style={{ color: "#c9a84c" }}>Send a Message</p>
                            <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tighter mb-8">
                                We'll Respond Within 24 Hours
                            </h2>

                            {status === "success" ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center gap-5">
                                    <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-xl"
                                        style={{ background: "linear-gradient(135deg, #2d0a5e, #c9a84c)" }}>
                                        <FaCheckCircle size={36} className="text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Message Sent!</h3>
                                        <p className="text-gray-500 text-sm max-w-xs">
                                            Thank you for reaching out. Our team will get back to you within 24 hours.
                                        </p>
                                    </div>
                                    <button onClick={() => setStatus(null)}
                                        className="mt-2 text-xs uppercase tracking-widest font-bold px-6 py-3 rounded-full border border-gray-200 text-gray-500 hover:border-[#c9a84c] hover:text-[#c9a84c] transition-all">
                                        Send Another
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Your Name *</label>
                                            <input id="contact-name" name="name" value={form.name} onChange={handleChange}
                                                onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                                                required placeholder="e.g. Thisari Hewage" className={fieldClass("name")} />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Email Address *</label>
                                            <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange}
                                                onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                                                required placeholder="you@example.com" className={fieldClass("email")} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Phone (Optional)</label>
                                            <input id="contact-phone" name="phone" value={form.phone} onChange={handleChange}
                                                onFocus={() => setFocusedField("phone")} onBlur={() => setFocusedField(null)}
                                                placeholder="+94 77 000 0000" className={fieldClass("phone")} />
                                        </div>
                                        <div>
                                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Subject *</label>
                                            <select id="contact-subject" name="subject" value={form.subject} onChange={handleChange}
                                                onFocus={() => setFocusedField("subject")} onBlur={() => setFocusedField(null)}
                                                required className={fieldClass("subject")}>
                                                <option value="">Select a subject…</option>
                                                <option value="custom-design">Custom Design Enquiry</option>
                                                <option value="repair">Jewellery Repair</option>
                                                <option value="appraisal">Appraisal / Valuation</option>
                                                <option value="order">Order Enquiry</option>
                                                <option value="bridal">Bridal Collection</option>
                                                <option value="appointment">Book an Appointment</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 block mb-2">Your Message *</label>
                                        <textarea id="contact-message" name="message" value={form.message} onChange={handleChange}
                                            onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                                            required rows={5} placeholder="Tell us how we can help you…"
                                            className={`${fieldClass("message")} resize-none`} />
                                    </div>

                                    <button id="contact-submit-btn" type="submit" disabled={status === "sending"}
                                        className="w-full py-4 rounded-2xl font-bold text-sm uppercase tracking-widest text-white flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-900/30 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                        style={{ background: "linear-gradient(90deg, #2d0a5e 0%, #c9a84c 100%)" }}>
                                        {status === "sending" ? (
                                            <>
                                                <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                                Sending…
                                            </>
                                        ) : (
                                            <>
                                                <FaPaperPlane size={14} />
                                                Send Message
                                            </>
                                        )}
                                    </button>

                                    {errorMessage && (
                                        <p className="text-center text-xs font-bold text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 animate-pulse">
                                            {errorMessage}
                                        </p>
                                    )}

                                    <p className="text-center text-[10px] text-gray-400 tracking-widest uppercase">
                                        We respect your privacy and will never share your information.
                                    </p>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}


export default ContactScreen;
