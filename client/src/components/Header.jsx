import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import api from "../services/api";
import { FaShoppingCart, FaUser, FaSearch, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);
    const { cartItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            await api.post("/api/users/logout");
            dispatch(logout());
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

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
                        {cartItems.length > 0 && (
                            <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                            </span>
                        )}
                    </Link>

                    {userInfo ? (
                        <div className="flex items-center space-x-4">
                            {userInfo.isAdmin && (
                                <div className="hidden lg:flex items-center space-x-4 mr-4 pr-4 border-r border-gray-200">
                                    <Link to="/admin/userlist" className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors">Users</Link>
                                    <Link to="/admin/productlist" className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors">Products</Link>
                                    <Link to="/admin/orderlist" className="text-xs uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors">Orders</Link>
                                </div>
                            )}
                            <Link to="/profile" className="flex items-center space-x-2 hover:text-primary transition-colors">
                                <FaUser size={18} />
                                <span className="hidden sm:inline text-sm font-medium">{userInfo.name}</span>
                            </Link>
                            <button 
                                onClick={logoutHandler}
                                className="flex items-center space-x-1 hover:text-red-500 transition-colors text-sm font-bold uppercase tracking-widest cursor-pointer"
                            >
                                <FaSignOutAlt size={16} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
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
