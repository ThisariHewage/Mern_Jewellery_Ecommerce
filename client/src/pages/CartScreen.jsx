import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { addToCart, removeFromCart } from "../redux/slices/cartSlice";

const CartScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;

    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({ ...product, qty }));
    };

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const checkoutHandler = () => {
        navigate("/login?redirect=/shipping");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-4 mb-8">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeft size={24} />
                </button>
                <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
            </div>

            {cartItems.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-sm mb-6">
                        <ShoppingBag size={32} className="text-gray-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
                    <p className="text-gray-500 mb-8 max-w-sm mx-auto">
                        Looks like you haven't added anything to your cart yet. Explore our collection and find something you love.
                    </p>
                    <Link 
                        to="/" 
                        className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white border border-accent/20 uppercase tracking-widest font-bold text-xs hover:bg-black transition-all duration-300 active:scale-95"
                    >
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Cart Items List */}
                    <div className="lg:col-span-8 space-y-6">
                        {cartItems.map((item) => (
                            <div 
                                key={item._id} 
                                className="group flex flex-col sm:flex-row gap-6 p-6 bg-white border border-gray-100 rounded-2xl hover:shadow-xl transition-all duration-300"
                            >
                                {/* Item Image */}
                                <div className="relative w-full sm:w-32 aspect-[3/4] overflow-hidden rounded-xl bg-gray-50">
                                    <img 
                                        src={item.image} 
                                        alt={item.name} 
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                </div>

                                {/* Item Details */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="flex justify-between gap-4">
                                        <div>
                                            <Link 
                                                to={`/product/${item._id}`}
                                                className="text-lg font-bold text-gray-900 hover:text-gray-600 transition-colors"
                                            >
                                                {item.name}
                                            </Link>
                                            <p className="text-sm text-gray-500 mt-1 capitalize">{item.category}</p>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">${item.price}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-6">
                                        {/* Quantity Selector */}
                                        <div className="flex items-center bg-gray-50 rounded-full border border-gray-200 p-1">
                                            <button 
                                                onClick={() => addToCartHandler(item, Math.max(1, item.qty - 1))}
                                                className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all disabled:opacity-30"
                                                disabled={item.qty <= 1}
                                            >
                                                <Minus size={16} />
                                            </button>
                                            <span className="w-10 text-center font-semibold text-gray-900">{item.qty}</span>
                                            <button 
                                                onClick={() => addToCartHandler(item, Math.min(item.countInStock, item.qty + 1))}
                                                className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all disabled:opacity-30"
                                                disabled={item.qty >= item.countInStock}
                                            >
                                                <Plus size={16} />
                                            </button>
                                        </div>

                                        <button 
                                            onClick={() => removeFromCartHandler(item._id)}
                                            className="inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-600 transition-colors p-2"
                                        >
                                            <Trash2 size={18} />
                                            <span className="hidden sm:inline">Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-gray-50 rounded-3xl p-8 sticky top-24">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>
                            
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)</span>
                                    <span className="font-semibold text-gray-900">
                                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Shipping</span>
                                    <span className="font-semibold text-gray-900 text-green-600">Free</span>
                                </div>
                                <div className="flex justify-between text-gray-600">
                                    <span>Estimated Tax</span>
                                    <span className="font-semibold text-gray-900">$0.00</span>
                                </div>
                                <div className="pt-4 border-t border-gray-200 flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-gray-900">
                                        ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            <button 
                                onClick={checkoutHandler}
                                disabled={cartItems.length === 0}
                                className="w-full py-4 bg-primary text-white border border-accent/25 uppercase tracking-widest font-bold text-sm hover:bg-black transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:active:scale-100 cursor-pointer shadow-md hover:shadow-lg"
                            >
                                Checkout Now
                            </button>

                            <p className="text-center text-xs text-gray-500 mt-6 px-4">
                                Shipping, taxes, and discounts will be calculated at checkout.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartScreen;
