import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder, resetOrder } from "../redux/slices/orderSlice";
import { clearCartItems } from "../redux/slices/cartSlice";
import { MapPin, CreditCard, ShoppingBag, ArrowRight } from "lucide-react";

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    if (!cart.shippingAddress.address) {
        navigate("/shipping");
    } else if (!cart.paymentMethod) {
        navigate("/payment");
    }

    const orderCreate = useSelector((state) => state.orders);
    const { order, success, error, loading } = orderCreate;

    useEffect(() => {
        if (success && order) {
            // Navigate to the in-site payment page instead of Stripe's hosted checkout
            navigate(`/order/${order._id}/pay`);
        }
        if (error) {
            toast.error(error);
        }
    }, [success, error, order, navigate]);

    const placeOrderHandler = () => {
        dispatch(
            createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            })
        );
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">

            <CheckoutSteps step1 step2 step3 step4 />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
                {/* Left Column: Details */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Shipping Section */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900">
                                <MapPin size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
                                <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">Delivery destination</p>
                            </div>
                        </div>
                        <div className="pl-16">
                            <p className="text-gray-700 leading-relaxed font-medium">
                                {cart.shippingAddress.address}, {cart.shippingAddress.city} {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                            </p>
                        </div>
                    </div>

                    {/* Payment Section */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                                <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">Selected provider</p>
                            </div>
                        </div>
                        <div className="pl-16">
                            <p className="text-gray-700 font-bold">{cart.paymentMethod}</p>
                        </div>
                    </div>

                    {/* Order Items Section */}
                    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-900">
                                <ShoppingBag size={24} />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Order Items</h2>
                                <p className="text-xs uppercase tracking-widest text-gray-400 font-medium">Your selection</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {cart.cartItems.length === 0 ? (
                                <p className="text-gray-500 italic">Your cart is empty</p>
                            ) : (
                                cart.cartItems.map((item, index) => (
                                    <div key={index} className="flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-colors group">
                                        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-100">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                                        </div>
                                        <div className="flex-1 flex justify-between items-center">
                                            <div>
                                                <Link to={`/product/${item._id}`} className="font-bold text-gray-900 hover:text-gray-600 transition-colors">
                                                    {item.name}
                                                </Link>
                                                <p className="text-sm text-gray-500">{item.qty} x Rs. {item.price}</p>
                                            </div>
                                            <p className="font-bold text-gray-900">Rs. {(item.qty * item.price).toFixed(2)}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Order Summary */}
                <div className="lg:col-span-4">
                    <div className="bg-gray-50 rounded-[2.5rem] p-10 sticky top-24 border border-gray-100 shadow-xl shadow-gray-200/50">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Order Summary</h2>

                        <div className="space-y-4 mb-10">
                            <div className="flex justify-between text-gray-500">
                                <span className="font-medium tracking-wide">Items Subtotal</span>
                                <span className="font-bold text-gray-900">Rs. {cart.itemsPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span className="font-medium tracking-wide">Shipping Cost</span>
                                <span className="font-bold text-gray-900">Rs. {cart.shippingPrice}</span>
                            </div>
                            <div className="flex justify-between text-gray-500">
                                <span className="font-medium tracking-wide">Estimated Tax</span>
                                <span className="font-bold text-gray-900">Rs. {cart.taxPrice}</span>
                            </div>
                            <div className="pt-6 border-t border-gray-200 flex justify-between items-center">
                                <span className="text-lg font-bold text-gray-900 uppercase tracking-tighter">Total Amount</span>
                                <span className="text-3xl font-bold text-gray-900 tracking-tighter">Rs. {cart.totalPrice}</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={cart.cartItems.length === 0 || loading}
                            onClick={placeOrderHandler}
                            className="w-full py-4.5 bg-primary text-white border border-accent/25 uppercase tracking-widest font-bold text-sm hover:bg-black transition-all duration-300 active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group cursor-pointer shadow-md hover:shadow-lg"
                        >
                            {loading ? "Processing..." : (
                                <>
                                    Place Order
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform text-accent" />
                                </>
                            )}
                        </button>

                        <div className="mt-8 p-4 bg-white/50 rounded-2xl border border-dashed border-gray-200">
                            <p className="text-[10px] text-gray-400 text-center uppercase tracking-widest font-bold">
                                By placing your order, you agree to our <br /> Terms of Service & Privacy Policy
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlaceOrderScreen;
