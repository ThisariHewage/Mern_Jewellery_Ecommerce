import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { resetCart } from "../redux/slices/cartSlice";
import api from "../services/api";
import { FaShoppingCart, FaUser, FaSearch, FaSignOutAlt, FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [jewelleryOpen, setJewelleryOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileJewelleryOpen, setMobileJewelleryOpen] = useState(false);
    const dropdownRef = useRef(null);
    const profileDropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setJewelleryOpen(false);
            }
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
                setProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, []);

    const logoutHandler = async () => {
        try {
            await api.post("/api/users/logout");
            dispatch(logout());
            dispatch(resetCart());
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    const navLinkClass = "hover:text-accent transition-colors duration-300 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1.5px] after:bg-accent after:transition-all after:duration-300 hover:after:w-full";

    return (
        <div className="sticky top-0 z-50">
            {/* Premium Top Announcement Bar */}
            <div className="bg-primary text-accent text-[9px] tracking-[0.25em] font-extrabold uppercase py-2.5 px-4 text-center border-b border-accent/20 shadow-inner select-none flex items-center justify-center gap-2">
                <span className="animate-pulse">✨</span>
                <span>COMPLIMENTARY ROYAL INSURED SHIPPING ON ALL ORDERS • SECURE HAND-DELIVERY</span>
                <span className="animate-pulse">✨</span>
            </div>

            <header className="bg-secondary/95 backdrop-blur-md border-b border-accent/10 shadow-sm py-1">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

                    {/* Left Side: Brand Logo */}
                    <Link to="/" className="text-xl font-serif font-bold tracking-[0.05em] text-primary flex-shrink-0 mr-4 transition-transform hover:scale-[1.01]">
                        DEWORA <span className="text-accent font-medium">JEWELLERS</span>
                    </Link>

                    {/* Center: Main Navigation */}
                    <nav className="hidden lg:flex items-center space-x-6 lg:space-x-8 text-[11px] uppercase tracking-[0.2em] font-bold text-gray-500 flex-grow justify-center">
                        <Link to="/" id="nav-home" className={navLinkClass}>Home</Link>
                        <Link to="/about" id="nav-about" className={navLinkClass}>About Us</Link>

                        {/* Jewellery Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                id="nav-jewellery"
                                onClick={() => setJewelleryOpen((o) => !o)}
                                className={`flex items-center gap-1.5 cursor-pointer uppercase tracking-[0.2em] ${navLinkClass} ${jewelleryOpen ? "text-accent" : ""}`}
                            >
                                JEWELLERY
                                <FaChevronDown size={8} className={`transition-transform duration-300 ${jewelleryOpen ? "rotate-180 text-accent" : ""}`} />
                            </button>

                            {jewelleryOpen && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-5 bg-secondary rounded-3xl shadow-2xl border border-accent/20 overflow-hidden min-w-[800px] z-50 animate-fade-in p-8 grid grid-cols-3 gap-16">
                                    {/* Column 1: Categories */}
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-accent mb-4 border-b border-accent/20 pb-2">By Category</h4>
                                        <div className="flex flex-col gap-3.5">
                                            <Link to="/jewellery" onClick={() => setJewelleryOpen(false)} className="text-xs font-bold text-primary hover:text-accent transition-colors">All Jewellery</Link>
                                            <Link to="/jewellery?category=Men" onClick={() => setJewelleryOpen(false)} className="text-xs font-bold text-primary hover:text-accent transition-colors">Men's</Link>
                                            <Link to="/jewellery?category=Women" onClick={() => setJewelleryOpen(false)} className="text-xs font-bold text-primary hover:text-accent transition-colors">Women's</Link>
                                            <Link to="/jewellery?category=Bridal" onClick={() => setJewelleryOpen(false)} className="text-xs font-bold text-primary hover:text-accent transition-colors">Bridal's</Link>
                                        </div>
                                    </div>

                                    {/* Column 2: Products */}
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-accent mb-4 border-b border-accent/20 pb-2">By Product</h4>
                                        <div className="grid grid-cols-2 gap-y-3.5 gap-x-8">
                                            {["All", "Anklet", "Bangle", "Bracelet", "Chain", "Earrings", "Necklace", "Ring", "Pendant"].map(p => (
                                                <Link key={p} to={`/jewellery?product=${p}`} onClick={() => setJewelleryOpen(false)} className="text-xs font-bold text-primary hover:text-accent transition-colors">{p}</Link>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Column 3: Price / Sorting */}
                                    <div>
                                        <h4 className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-accent mb-4 border-b border-accent/20 pb-2">By Price</h4>
                                        <div className="flex flex-col gap-3.5">
                                            <Link to="/jewellery?sort=price_asc" onClick={() => setJewelleryOpen(false)} className="text-xs font-bold text-primary hover:text-accent transition-colors">Low to High</Link>
                                            <Link to="/jewellery?sort=price_desc" onClick={() => setJewelleryOpen(false)} className="text-xs font-bold text-primary hover:text-accent transition-colors">High to Low</Link>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>


                        <Link to="/services" id="nav-services" className={navLinkClass}>Services</Link>
                        <Link to="/promotions" id="nav-promotions" className={navLinkClass}>Promotions</Link>
                        <Link to="/contact" id="nav-contact" className={navLinkClass}>Contact Us</Link>
                    </nav>

                    {/* Right Side: Action Icons + Premium Profile Dropdown */}
                    <div className="flex items-center space-x-5 text-gray-700 flex-shrink-0 ml-4">
                        <button id="header-search-btn" className="hidden lg:block hover:text-accent transition-colors cursor-pointer p-2">
                            <FaSearch size={15} />
                        </button>

                        <Link to="/cart" id="header-cart-btn" className="relative hover:text-accent transition-colors p-2 flex items-center">
                            <FaShoppingCart size={18} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-primary text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-md animate-pulse">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            )}
                        </Link>

                        {/* Authentication & Profile Dropdown */}
                        {userInfo ? (
                            <div className="relative" ref={profileDropdownRef}>
                                <button
                                    onClick={() => setProfileOpen((o) => !o)}
                                    className="flex items-center gap-2 hover:text-accent transition-colors p-1"
                                >
                                    <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold shadow-sm">
                                        {userInfo.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden xl:inline text-xs uppercase tracking-widest font-bold text-primary">{userInfo.name}</span>
                                    <FaChevronDown size={8} className={`text-accent/60 transition-transform duration-300 ${profileOpen ? "rotate-180 text-accent" : ""}`} />
                                </button>

                                {profileOpen && (
                                    <div className="absolute right-0 top-full mt-4 bg-secondary rounded-2xl shadow-2xl border border-accent/20 overflow-hidden min-w-[240px] z-50 animate-fade-in">
                                        {/* Account Header */}
                                        <div className="px-5 py-4 bg-primary/5 border-b border-accent/10">
                                            <p className="text-xs font-bold text-primary truncate">{userInfo.name}</p>
                                            <p className="text-[10px] text-gray-400 truncate mt-0.5">{userInfo.email}</p>
                                            {userInfo.isAdmin && (
                                                <span className="inline-block mt-2 px-2.5 py-0.5 bg-accent/20 border border-accent/35 text-accent text-[8px] uppercase tracking-widest font-extrabold rounded-md">
                                                    Admin Partner
                                                </span>
                                            )}
                                        </div>

                                        {/* Admin Specific Actions */}
                                        {userInfo.isAdmin && (
                                            <div className="py-2 border-b border-accent/10">
                                                <p className="px-5 py-1 text-[8px] uppercase tracking-[0.25em] font-extrabold text-accent">Management</p>
                                                <Link
                                                    to="/admin/userlist"
                                                    onClick={() => setProfileOpen(false)}
                                                    className="flex items-center gap-3 px-5 py-2.5 hover:bg-primary/5 transition-colors text-xs font-bold text-gray-600 hover:text-primary uppercase tracking-wider"
                                                >
                                                    👥 Manage Users
                                                </Link>
                                                <Link
                                                    to="/admin/productlist"
                                                    onClick={() => setProfileOpen(false)}
                                                    className="flex items-center gap-3 px-5 py-2.5 hover:bg-primary/5 transition-colors text-xs font-bold text-gray-600 hover:text-primary uppercase tracking-wider"
                                                >
                                                    📦 Manage Products
                                                </Link>
                                                <Link
                                                    to="/admin/orderlist"
                                                    onClick={() => setProfileOpen(false)}
                                                    className="flex items-center gap-3 px-5 py-2.5 hover:bg-primary/5 transition-colors text-xs font-bold text-gray-600 hover:text-primary uppercase tracking-wider"
                                                >
                                                    📜 Manage Orders
                                                </Link>
                                            </div>
                                        )}

                                        {/* Profile & Logout */}
                                        <div className="py-2">
                                            <Link
                                                to="/profile"
                                                onClick={() => setProfileOpen(false)}
                                                className="flex items-center gap-3 px-5 py-2.5 hover:bg-primary/5 transition-colors text-xs font-bold text-gray-600 hover:text-primary uppercase tracking-wider"
                                            >
                                                👤 My Profile
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    setProfileOpen(false);
                                                    logoutHandler();
                                                }}
                                                className="w-full text-left flex items-center gap-3 px-5 py-2.5 hover:bg-red-50/50 transition-colors text-xs font-bold text-red-500 hover:text-red-700 uppercase tracking-wider cursor-pointer"
                                            >
                                                🚪 Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link to="/login" id="header-login-btn" className="hidden lg:flex items-center gap-2 hover:text-accent transition-colors text-xs font-bold uppercase tracking-widest text-gray-500 p-1">
                                <FaUser size={14} className="text-gray-400" />
                                <span>Login</span>
                            </Link>
                        )}

                        {/* Mobile Hamburger Menu */}
                        <button
                            id="mobile-menu-btn"
                            className="lg:hidden hover:text-accent transition-colors cursor-pointer p-1 text-primary"
                            onClick={() => setMobileOpen((o) => !o)}
                        >
                            {mobileOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="lg:hidden bg-secondary border-t border-accent/10 shadow-xl px-6 py-6 space-y-1 animate-fade-in">
                    <Link to="/" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-accent border-b border-accent/10 transition-colors">Home</Link>
                    <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-accent border-b border-accent/10 transition-colors">About Us</Link>

                    {/* Mobile Jewellery Accordion */}
                    <div className="border-b border-accent/10">
                        <button
                            onClick={() => setMobileJewelleryOpen((o) => !o)}
                            className="flex items-center justify-between w-full py-3 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-accent transition-colors cursor-pointer"
                        >
                            JEWELLERY
                            <FaChevronDown size={10} className={`transition-transform duration-300 ${mobileJewelleryOpen ? "rotate-180" : ""}`} />
                        </button>
                        {mobileJewelleryOpen && (
                            <div className="pl-4 pb-3 space-y-5">
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-accent font-bold mb-3 border-b border-accent/10 pb-1 inline-block">Categories</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link to="/jewellery" onClick={() => setMobileOpen(false)} className="text-xs text-gray-600 hover:text-accent transition-colors">All Jewellery</Link>
                                        <Link to="/jewellery?category=Men" onClick={() => setMobileOpen(false)} className="text-xs text-gray-600 hover:text-accent transition-colors">Men's</Link>
                                        <Link to="/jewellery?category=Women" onClick={() => setMobileOpen(false)} className="text-xs text-gray-600 hover:text-accent transition-colors">Women's</Link>
                                        <Link to="/jewellery?category=Bridal" onClick={() => setMobileOpen(false)} className="text-xs text-gray-600 hover:text-accent transition-colors">Bridal's</Link>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-accent font-bold mb-3 border-b border-accent/10 pb-1 inline-block">Products</p>
                                    <div className="grid grid-cols-3 gap-3">
                                        {["All", "Anklet", "Bangle", "Bracelet", "Chain", "Earrings", "Necklace", "Ring", "Pendant"].map(p => (
                                            <Link key={p} to={`/jewellery?product=${p}`} onClick={() => setMobileOpen(false)} className="text-xs text-gray-600 hover:text-accent transition-colors">{p}</Link>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <p className="text-[9px] uppercase tracking-[0.2em] text-accent font-bold mb-3 border-b border-accent/10 pb-1 inline-block">Sort By Price</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <Link to="/jewellery?sort=price_asc" onClick={() => setMobileOpen(false)} className="text-xs text-gray-600 hover:text-accent transition-colors">Low to High</Link>
                                        <Link to="/jewellery?sort=price_desc" onClick={() => setMobileOpen(false)} className="text-xs text-gray-600 hover:text-accent transition-colors">High to Low</Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <Link to="/services" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-accent border-b border-accent/10 transition-colors">Services</Link>
                    <Link to="/promotions" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-accent border-b border-accent/10 transition-colors">Promotions</Link>
                    <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-accent border-b border-accent/10 transition-colors">Contact Us</Link>

                    {userInfo ? (
                        <div className="pt-4 space-y-2">
                            <Link to="/profile" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-accent transition-colors"><FaUser size={14} /> {userInfo.name}</Link>
                            <button onClick={() => { logoutHandler(); setMobileOpen(false); }} className="flex items-center gap-2 py-2 text-sm font-bold uppercase tracking-widest text-red-500 cursor-pointer"><FaSignOutAlt size={14} /> Logout</button>
                        </div>
                    ) : (
                        <div className="pt-4">
                            <Link to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 py-2 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-accent transition-colors"><FaUser size={14} /> Login</Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Header;
