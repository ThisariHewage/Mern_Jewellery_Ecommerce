import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import api from "../services/api";
import { FaShoppingCart, FaUser, FaSearch, FaSignOutAlt, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [jewelleryOpen, setJewelleryOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileJewelleryOpen, setMobileJewelleryOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setJewelleryOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const logoutHandler = async () => {
        try {
            await api.post("/api/users/logout");
            dispatch(logout());
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    const navLinkClass = "hover:text-primary transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 hover:after:w-full";

    return (
        <header className="sticky top-0 z-50 bg-secondary border-b border-accent/20 shadow-sm">
            <div className="container mx-auto px-6 py-5 flex items-center justify-between">

                {/* Logo */}
                <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-primary flex-shrink-0">
                    AURA <span className="text-accent">JEWELLERS</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center space-x-8 text-sm uppercase tracking-widest font-medium text-gray-600">
                    <Link to="/" id="nav-home" className={navLinkClass}>Home</Link>
                    <Link to="/about" id="nav-about" className={navLinkClass}>About Us</Link>

                    {/* Jewellery Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            id="nav-jewellery"
                            onClick={() => setJewelleryOpen((o) => !o)}
                            className={`flex items-center gap-1.5 cursor-pointer ${navLinkClass} ${jewelleryOpen ? "text-primary" : ""}`}
                        >
                            Jewellery
                            <FaChevronDown size={10} className={`transition-transform duration-300 ${jewelleryOpen ? "rotate-180" : ""}`} />
                        </button>

                        {jewelleryOpen && (
                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden min-w-[200px] animate-fade-in">
                                {/* Dropdown header */}
                                <div className="px-5 py-3 border-b border-gray-100">
                                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-400">Shop by</p>
                                </div>
                                <Link
                                    to="/jewellery"
                                    id="nav-jewellery-all"
                                    onClick={() => setJewelleryOpen(false)}
                                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group"
                                >
                                    <span className="text-lg">💎</span>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 group-hover:text-purple-800 transition-colors uppercase tracking-wider">All Jewellery</p>
                                        <p className="text-[10px] text-gray-400">Browse the full collection</p>
                                    </div>
                                </Link>
                                <Link
                                    to="/jewellery?category=Men"
                                    id="nav-jewellery-men"
                                    onClick={() => setJewelleryOpen(false)}
                                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group border-t border-gray-50"
                                >
                                    <span className="text-lg">👔</span>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 group-hover:text-purple-800 transition-colors uppercase tracking-wider">Men's</p>
                                        <p className="text-[10px] text-gray-400">Rings, chains & cufflinks</p>
                                    </div>
                                </Link>
                                <Link
                                    to="/jewellery?category=Women"
                                    id="nav-jewellery-women"
                                    onClick={() => setJewelleryOpen(false)}
                                    className="flex items-center gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors group border-t border-gray-50"
                                >
                                    <span className="text-lg">👑</span>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 group-hover:text-purple-800 transition-colors uppercase tracking-wider">Women's</p>
                                        <p className="text-[10px] text-gray-400">Necklaces, earrings & bracelets</p>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>

                    <Link to="/services" id="nav-services" className={navLinkClass}>Services</Link>
                    <Link to="/promotions" id="nav-promotions" className={navLinkClass}>Promotions</Link>
                    <Link to="/contact" id="nav-contact" className={navLinkClass}>Contact Us</Link>
                </nav>

                {/* Right Icons */}
                <div className="flex items-center space-x-5 text-gray-700">
                    <button id="header-search-btn" className="hidden md:block hover:text-primary transition-colors cursor-pointer">
                        <FaSearch size={16} />
                    </button>

                    <Link to="/cart" id="header-cart-btn" className="relative hover:text-primary transition-colors">
                        <FaShoppingCart size={20} />
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {userInfo ? (
                        <div className="hidden md:flex items-center space-x-4">
                            {userInfo.isAdmin && (
                                <div className="hidden lg:flex items-center space-x-4 mr-4 pr-4 border-r border-gray-200">
                                    <Link to="/admin/userlist" className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors">Users</Link>
                                    <Link to="/admin/productlist" className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors">Products</Link>
                                    <Link to="/admin/orderlist" className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors">Orders</Link>
                                </div>
                            )}
                            <Link to="/profile" className="flex items-center space-x-2 hover:text-primary transition-colors">
                                <FaUser size={16} />
                                <span className="hidden sm:inline text-sm font-medium">{userInfo.name}</span>
                            </Link>
                            <button
                                onClick={logoutHandler}
                                className="flex items-center space-x-1 hover:text-red-500 transition-colors text-sm font-bold uppercase tracking-widest cursor-pointer"
                            >
                                <FaSignOutAlt size={14} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" id="header-login-btn" className="hidden md:flex items-center space-x-2 hover:text-primary transition-colors">
                            <FaUser size={16} />
                            <span className="hidden sm:inline text-sm font-medium uppercase tracking-widest">Login</span>
                        </Link>
                    )}

                    {/* Mobile Hamburger */}
                    <button
                        id="mobile-menu-btn"
                        className="md:hidden hover:text-primary transition-colors cursor-pointer"
                        onClick={() => setMobileOpen((o) => !o)}
                    >
                        {mobileOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 shadow-xl px-6 py-6 space-y-1 animate-fade-in">
                    <Link to="/" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-primary border-b border-gray-50 transition-colors">Home</Link>
                    <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-primary border-b border-gray-50 transition-colors">About Us</Link>

                    {/* Mobile Jewellery Accordion */}
                    <div className="border-b border-gray-50">
                        <button
                            onClick={() => setMobileJewelleryOpen((o) => !o)}
                            className="flex items-center justify-between w-full py-3 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-primary transition-colors cursor-pointer"
                        >
                            Jewellery
                            <FaChevronDown size={10} className={`transition-transform duration-300 ${mobileJewelleryOpen ? "rotate-180" : ""}`} />
                        </button>
                        {mobileJewelleryOpen && (
                            <div className="pl-4 pb-3 space-y-2">
                                <Link to="/jewellery" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-primary transition-colors">💎 All Jewellery</Link>
                                <Link to="/jewellery?category=Men" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-primary transition-colors">👔 Men's</Link>
                                <Link to="/jewellery?category=Women" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2 text-sm text-gray-600 hover:text-primary transition-colors">👑 Women's</Link>
                            </div>
                        )}
                    </div>

                    <Link to="/services" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-primary border-b border-gray-50 transition-colors">Services</Link>
                    <Link to="/promotions" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-primary border-b border-gray-50 transition-colors">Promotions</Link>
                    <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-primary border-b border-gray-50 transition-colors">Contact Us</Link>

                    {userInfo ? (
                        <div className="pt-4 space-y-2">
                            <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-primary transition-colors"><FaUser size={14} /> {userInfo.name}</Link>
                            <button onClick={() => { logoutHandler(); setMobileOpen(false); }} className="flex items-center gap-2 py-2 text-sm font-bold uppercase tracking-widest text-red-500 cursor-pointer"><FaSignOutAlt size={14} /> Logout</button>
                        </div>
                    ) : (
                        <div className="pt-4">
                            <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-primary transition-colors"><FaUser size={14} /> Login</Link>
                        </div>
                    )}
                </div>
            )}
        </header>
    );
};

export default Header;
