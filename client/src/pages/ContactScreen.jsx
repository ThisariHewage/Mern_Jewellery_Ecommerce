import { useState } from "react";

const ContactScreen = () => {
    const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
    const [status, setStatus] = useState(null); // null | "sending" | "success" | "error"

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("sending");
        // Simulate send delay
        setTimeout(() => {
            setStatus("success");
            setForm({ name: "", email: "", phone: "", subject: "", message: "" });
            setTimeout(() => setStatus(null), 5000);
        }, 1500);
    };

    const contactDetails = [
        { icon: "📍", label: "Visit Us", value: "123 Jewellers Lane, Colombo 03, Sri Lanka" },
        { icon: "📞", label: "Call Us", value: "+94 11 234 5678" },
        { icon: "✉️", label: "Email Us", value: "hello@deworajewellers.lk" },
        { icon: "🕐", label: "Hours", value: "Mon–Sat: 9am – 7pm\nSun: 10am – 5pm" },
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero */}
            <div className="relative py-28 text-center overflow-hidden"
                style={{ background: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 60%, #0d001a 100%)" }}>
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <p className="text-xs uppercase tracking-[0.5em] text-amber-400 font-bold mb-4">Get In Touch</p>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tighter mb-6">
                        Contact{" "}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "linear-gradient(90deg, #c9a84c, #f0d080)" }}>
                            Us
                        </span>
                    </h1>
                    <p className="text-white/60 max-w-lg mx-auto text-sm leading-relaxed">
                        We'd love to hear from you. Visit us in-store or send us a message below.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-24">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">

                    {/* Contact Details */}
                    <div className="lg:col-span-2 space-y-6">
                        <div>
                            <p className="text-xs uppercase tracking-[0.4em] font-bold mb-2" style={{ color: "#c9a84c" }}>Our Information</p>
                            <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tighter">Let's Connect</h2>
                            <div className="h-[2px] w-12 mt-4" style={{ background: "#c9a84c" }} />
                        </div>

                        <div className="space-y-5 pt-4">
                            {contactDetails.map((item, i) => (
                                <div key={i} className="flex gap-4 p-5 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                                    <div className="text-2xl flex-shrink-0">{item.icon}</div>
                                    <div>
                                        <p className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-1">{item.label}</p>
                                        <p className="text-gray-700 text-sm font-medium whitespace-pre-line">{item.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Map Placeholder */}
                        <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm h-56 flex items-center justify-center"
                            style={{ background: "linear-gradient(135deg, #f8f4ff, #fff8e8)" }}>
                            <div className="text-center">
                                <p className="text-4xl mb-2">🗺️</p>
                                <p className="text-xs uppercase tracking-widest font-bold text-gray-400">Colombo 03, Sri Lanka</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-10">
                            <p className="text-xs uppercase tracking-[0.4em] font-bold mb-2" style={{ color: "#c9a84c" }}>Send a Message</p>
                            <h2 className="text-3xl font-serif font-bold text-gray-900 tracking-tighter mb-8">We'll Respond Within 24 Hours</h2>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-xs uppercase tracking-widest font-bold text-gray-400 block mb-2">Your Name</label>
                                        <input id="contact-name" name="name" value={form.name} onChange={handleChange} required
                                            placeholder="e.g. Thisari Hewage"
                                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all"
                                            style={{ focusRingColor: "#c9a84c" }} />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-widest font-bold text-gray-400 block mb-2">Email Address</label>
                                        <input id="contact-email" name="email" type="email" value={form.email} onChange={handleChange} required
                                            placeholder="you@example.com"
                                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                    <div>
                                        <label className="text-xs uppercase tracking-widest font-bold text-gray-400 block mb-2">Phone (Optional)</label>
                                        <input id="contact-phone" name="phone" value={form.phone} onChange={handleChange}
                                            placeholder="+94 77 000 0000"
                                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all" />
                                    </div>
                                    <div>
                                        <label className="text-xs uppercase tracking-widest font-bold text-gray-400 block mb-2">Subject</label>
                                        <select id="contact-subject" name="subject" value={form.subject} onChange={handleChange} required
                                            className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all bg-white">
                                            <option value="">Select a subject...</option>
                                            <option value="custom-design">Custom Design Enquiry</option>
                                            <option value="repair">Jewellery Repair</option>
                                            <option value="appraisal">Appraisal / Valuation</option>
                                            <option value="order">Order Enquiry</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400 block mb-2">Your Message</label>
                                    <textarea id="contact-message" name="message" value={form.message} onChange={handleChange} required rows={5}
                                        placeholder="Tell us how we can help you..."
                                        className="w-full px-5 py-3.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all resize-none" />
                                </div>

                                {status === "success" && (
                                    <div className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium"
                                        style={{ background: "rgba(201,168,76,0.1)", color: "#7a5c00", border: "1px solid rgba(201,168,76,0.3)" }}>
                                        ✅ Thank you! Your message has been sent. We'll be in touch soon.
                                    </div>
                                )}
                                {status === "error" && (
                                    <div className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium bg-red-50 text-red-600 border border-red-200">
                                        ❌ Something went wrong. Please try again.
                                    </div>
                                )}

                                <button id="contact-submit-btn" type="submit" disabled={status === "sending"}
                                    className="w-full py-4 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
                                    style={{ background: "linear-gradient(90deg, #2d0a5e, #c9a84c)", color: "#fff" }}>
                                    {status === "sending" ? "Sending..." : "Send Message →"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactScreen;
