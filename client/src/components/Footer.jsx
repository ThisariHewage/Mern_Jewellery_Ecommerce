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
                        AURA <span className="text-accent">JEWELLERS</span>
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

                {/* Quick Links */}
                <div>
                    <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Quick Links</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link to="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
                        <li><Link to="/new-arrivals" className="hover:text-white transition-colors">New Arrivals</Link></li>
                        <li><Link to="/categories" className="hover:text-white transition-colors">Categories</Link></li>
                        <li><Link to="/sales" className="hover:text-white transition-colors">Flash Sale</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div>
                    <h4 className="text-sm uppercase tracking-widest font-bold mb-6">Customer Service</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                        <li><Link to="/shipping" className="hover:text-white transition-colors">Shipping Policy</Link></li>
                        <li><Link to="/returns" className="hover:text-white transition-colors">Returns & Exchanges</Link></li>
                        <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
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
                <p>&copy; {currentYear} Aura Jewellers. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
