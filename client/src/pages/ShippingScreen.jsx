import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../redux/slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";
import { MapPin, Globe } from "lucide-react";

const ShippingScreen = () => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address || "");
    const [city, setCity] = useState(shippingAddress.city || "");
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || "");
    const [country, setCountry] = useState(shippingAddress.country || "");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate("/payment");
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <CheckoutSteps step1 step2 />
            
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100">
                <div className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Shipping Details</h1>
                    <p className="text-gray-500 text-center uppercase tracking-widest text-xs">Where should we send your fashion items?</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-8">
                    {/* Address Field */}
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-gray-500 ml-1">Street Address</label>
                        <div className="relative group">
                            <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                            <input
                                type="text"
                                placeholder="e.g. 123 Fashion Street"
                                value={address}
                                required
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* City Field */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-gray-500 ml-1">City</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="e.g. New York"
                                    value={city}
                                    required
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Postal Code Field */}
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest font-bold text-gray-500 ml-1">Postal Code</label>
                            <div className="relative group">
                                <input
                                    type="text"
                                    placeholder="e.g. 10001"
                                    value={postalCode}
                                    required
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="w-full px-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Country Field */}
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-widest font-bold text-gray-500 ml-1">Country</label>
                        <div className="relative group">
                            <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                            <input
                                type="text"
                                placeholder="e.g. United States"
                                value={country}
                                required
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-5 bg-black text-white rounded-2xl font-bold text-lg hover:bg-gray-800 transition-all active:scale-[0.98] mt-4"
                    >
                        Continue to Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingScreen;
