import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { resetCart } from "../redux/slices/cartSlice";
import api from "../services/api";
import { FaShoppingCart, FaUser, FaSearch, FaSignOutAlt, FaChevronDown, FaBars, FaTimes, FaUsers, FaBoxOpen, FaScroll, FaUserCircle, FaTachometerAlt } from "react-icons/fa";

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [jewelleryOpen, setJewelleryOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobileJewelleryOpen, setMobileJewelleryOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [keyword, setKeyword] = useState("");
    const dropdownRef = useRef(null);
    const profileDropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setJewelleryOpen(false);
            }
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(e.target)) {
                setProfileDropdownOpen(false);
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

    const searchHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            navigate(`/jewellery?keyword=${encodeURIComponent(keyword.trim())}`);
        } else {
            navigate("/jewellery");
        }
        setSearchOpen(false);
        setKeyword("");
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
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">

                    {/* Left Side: Brand Logo */}
                    <Link to="/" className="flex items-center gap-2 text-lg xl:text-xl font-serif font-bold tracking-[0.04em] text-primary flex-shrink-0 mr-2 -ml-5 sm:-ml-8 lg:-ml-10 transition-transform hover:scale-[1.01]">
                        <img
                            src="/dewora-diamond-logo.svg"
                            alt="Dewora Jewellers logo"
                            className="h-8 w-auto object-contain sm:h-9 xl:h-10"
                        />
                        <span className="leading-none">
                            DEWORA <span className="text-accent font-medium">JEWELLERS</span>
                        </span>
                    </Link>

                    {/* Center: Main Navigation */}
                    <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 text-[11px] uppercase tracking-[0.16em] xl:tracking-[0.2em] font-bold text-gray-500 flex-grow justify-center whitespace-nowrap">
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
                        <button id="header-search-btn" onClick={() => setSearchOpen((o) => !o)} className="hidden lg:block hover:text-accent transition-colors cursor-pointer p-2">
                            {searchOpen ? <FaTimes size={15} /> : <FaSearch size={15} />}
                        </button>

                        <Link to="/cart" id="header-cart-btn" className="relative hover:text-accent transition-colors p-2 flex items-center">
                            <FaShoppingCart size={18} />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-accent text-primary text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold shadow-md animate-pulse">
                                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                                </span>
                            )}
                        </Link>

                        {/* Authentication & Profile Link */}
                        {userInfo ? (
                            <div className="relative flex items-center gap-2" ref={profileDropdownRef}>
                                <button
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    className="flex items-center gap-2 hover:text-accent transition-colors p-1 cursor-pointer group"
                                >
                                    <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 text-accent flex items-center justify-center text-xs font-bold shadow-sm group-hover:scale-110 transition-transform">
                                        {userInfo.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden xl:inline text-xs uppercase tracking-widest font-bold text-primary group-hover:text-accent transition-colors">{userInfo.name}</span>
                                    <FaChevronDown size={8} className={`hidden xl:block transition-transform duration-300 text-primary group-hover:text-accent ${profileDropdownOpen ? "rotate-180" : ""}`} />
                                </button>

                                {/* Profile Dropdown */}
                                {profileDropdownOpen && (
                                    <div className="absolute top-full right-0 mt-4 w-48 bg-secondary rounded-2xl shadow-xl border border-accent/20 overflow-hidden z-50 animate-fade-in divide-y divide-accent/10">
                                        <div className="px-4 py-3 bg-primary/5">
                                            <p className="text-xs font-bold text-primary truncate">{userInfo.name}</p>
                                            <p className="text-[10px] text-gray-500 truncate">{userInfo.email}</p>
                                        </div>
                                        {userInfo.isAdmin && (
                                            <div className="py-1">
                                                <Link
                                                    to="/admin/dashboard"
                                                    onClick={() => setProfileDropdownOpen(false)}
                                                    className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-primary hover:bg-accent/10 hover:text-accent transition-colors"
                                                >
                                                    <FaTachometerAlt size={12} /> Dashboard
                                                </Link>
                                            </div>
                                        )}
                                        <div className="py-1">
                                            <Link
                                                to="/profile"
                                                onClick={() => setProfileDropdownOpen(false)}
                                                className="flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-primary hover:bg-accent/10 hover:text-accent transition-colors"
                                            >
                                                <FaUser size={12} /> Profile
                                            </Link>
                                        </div>
                                        <div className="py-1 border-t border-accent/10">
                                            <button
                                                onClick={() => {
                                                    setProfileDropdownOpen(false);
                                                    logoutHandler();
                                                }}
                                                className="w-full flex items-center gap-2 px-4 py-2.5 text-xs font-bold uppercase tracking-widest text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                            >
                                                <FaSignOutAlt size={12} /> Logout
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

            {/* Search Bar */}
            {searchOpen && (
                <div className="bg-secondary/95 backdrop-blur-sm border-b border-accent/10 shadow-sm animate-fade-in relative z-40">
                    <div className="max-w-xl mx-auto px-4 py-3">
                        <form onSubmit={searchHandler} className="flex items-center gap-2 bg-white/50 border border-accent/20 rounded-full px-4 py-1.5 focus-within:border-accent/40 focus-within:shadow-sm transition-all">
                            <FaSearch size={12} className="text-accent/60 flex-shrink-0" />
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Search collection..."
                                autoFocus
                                className="flex-grow bg-transparent text-xs text-primary placeholder:text-gray-400 outline-none font-medium tracking-wide h-7"
                            />
                            {keyword && (
                                <button
                                    type="button"
                                    onClick={() => setKeyword("")}
                                    className="p-1 hover:text-accent transition-colors"
                                >
                                    <FaTimes size={10} className="text-gray-400" />
                                </button>
                            )}
                            <button
                                type="submit"
                                className="text-[9px] uppercase tracking-[0.1em] font-bold text-accent hover:text-primary transition-colors cursor-pointer px-3 py-1 ml-1"
                            >
                                search
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="lg:hidden bg-secondary border-t border-accent/10 shadow-xl px-6 py-6 space-y-1 animate-fade-in">
                    <Link to="/" onClick={() => setMobileOpen(false)} className="block py-3 text-sm font-bold uppercase tracking-widest text-gray-700 hover:text-accent border-b border-accent/10 transition-colors">Home</Link>

                    {/* Mobile Search */}
                    <div className="py-4 border-b border-accent/10">
                        <form onSubmit={(e) => { e.preventDefault(); searchHandler(e); setMobileOpen(false); }} className="relative flex items-center">
                            <input
                                type="text"
                                value={keyword}
                                onChange={(e) => setKeyword(e.target.value)}
                                placeholder="Search collection..."
                                className="w-full bg-accent/5 border border-accent/10 rounded-full px-5 py-2.5 text-xs text-primary placeholder:text-gray-400 outline-none focus:border-accent/30 transition-all font-medium"
                            />
                            <button type="submit" className="absolute right-4 text-accent">
                                <FaSearch size={12} />
                            </button>
                        </form>
                    </div>

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
