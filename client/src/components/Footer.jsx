import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaPinterest } from "react-icons/fa";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-primary text-white pt-16 pb-8">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand & About */}
                <div className="space-y-6">
                    <h3 className="text-2xl font-serif font-bold tracking-tighter">
                        DEWORA <span className="text-accent">JEWELLERS</span>
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Elevating your style with curated premium jewellery collections. Experience the perfect blend of luxury and elegance.
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-accent transition-colors"><FaFacebook size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-accent transition-colors"><FaInstagram size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-accent transition-colors"><FaTwitter size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-accent transition-colors"><FaPinterest size={20} /></a>
                    </div>
                </div>

                {/* Contact Info */}
                <div>
                    <h4 className="text-sm uppercase tracking-widest font-bold mb-6 text-accent">Contact Us</h4>
                    <ul className="space-y-4 text-sm text-gray-300">
                        <li className="flex items-start gap-3">
                            <span className="text-accent mt-1">📍</span>
                            <span>123 Luxury Avenue,<br />Colombo 03, Sri Lanka</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-accent">📞</span>
                            <span>+94 11 234 5678</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-accent">✉️</span>
                            <span>info@deworajewellers.com</span>
                        </li>
                    </ul>
                </div>

                {/* Customer Care */}
                <div>
                    <h4 className="text-sm uppercase tracking-widest font-bold mb-6 text-accent">Customer Care</h4>
                    <ul className="space-y-4 text-sm text-gray-300">
                        <li><Link to="/shipping" className="hover:text-accent transition-colors">Shipping Policy</Link></li>
                        <li><Link to="/returns" className="hover:text-accent transition-colors">Returns & Exchanges</Link></li>
                        <li><Link to="/warranty" className="hover:text-accent transition-colors">Lifetime Warranty</Link></li>
                        <li><Link to="/faq" className="hover:text-accent transition-colors">FAQs</Link></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Join Our Club</h4>
                    <p className="text-sm text-gray-400 mb-4">Subscribe to get special offers and first look at new collections.</p>
                    <form className="flex flex-col space-y-2">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="bg-gray-800 border-none px-4 py-3 text-sm focus:ring-1 focus:ring-accent outline-none"
                        />
                        <button className="btn-premium py-2 text-xs">Subscribe</button>
                    </form>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-16 pt-8 border-t border-gray-800 flex flex-col md:row justify-between items-center text-xs text-gray-500 uppercase tracking-widest">
                <p>&copy; {currentYear} Dewora Jewellers. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
