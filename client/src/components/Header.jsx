import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaUser, FaSearch } from "react-icons/fa";

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);

    return (
        <header className="sticky top-0 z-50 glass">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-serif font-bold tracking-tighter text-primary">
                    FASHION<span className="text-accent">HUB</span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-medium text-gray-600">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
                    <Link to="/new-arrivals" className="hover:text-primary transition-colors">New Arrivals</Link>
                </nav>

                {/* Icons */}
                <div className="flex items-center space-x-6 text-gray-700">
                    <button className="hover:text-primary transition-colors cursor-pointer">
                        <FaSearch size={18} />
                    </button>
                    
                    <Link to="/cart" className="relative hover:text-primary transition-colors">
                        <FaShoppingCart size={20} />
                        <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            0
                        </span>
                    </Link>

                    {userInfo ? (
                        <Link to="/profile" className="flex items-center space-x-2 hover:text-primary transition-colors">
                            <FaUser size={18} />
                            <span className="hidden sm:inline text-sm font-medium">{userInfo.name}</span>
                        </Link>
                    ) : (
                        <Link to="/login" className="flex items-center space-x-2 hover:text-primary transition-colors">
                            <FaUser size={18} />
                            <span className="hidden sm:inline text-sm font-medium uppercase tracking-widest">Login</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
