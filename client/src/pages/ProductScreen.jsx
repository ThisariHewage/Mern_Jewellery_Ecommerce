import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaArrowLeft, FaMinus, FaPlus, FaShieldAlt, FaShippingFast, FaUndo } from "react-icons/fa";
import { addToCart } from "../redux/slices/cartSlice";
import { updateProductStock } from "../redux/slices/productSlice";
import api from "../services/api";
import { toast } from "react-toastify";

const ProductScreen = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`/api/products/${productId}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.response && err.response.data.message ? err.response.data.message : err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const addToCartHandler = async () => {
        try {
            const { data } = await api.patch(`/api/products/${productId}/stock`, { qty: -qty });

            dispatch(updateProductStock({ productId, countInStock: data.countInStock }));
            dispatch(addToCart({ ...product, qty }));

            setProduct(data);
            setQty(1);

            toast.success(`✨ Added ${qty} ${product.name} to your collection!`, {
                position: "bottom-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                theme: "dark",
            });
        } catch (err) {
            toast.error("Failed to update stock");
        }
    };

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
            <div className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin" style={{ borderColor: "#c9a84c", borderTopColor: "transparent" }} />
            <div className="text-xs uppercase tracking-[0.3em] font-bold text-gray-400 animate-pulse">Curating Selection...</div>
        </div>
    );

    if (error) return <div className="py-32 text-center text-red-500 font-bold uppercase tracking-widest">{error}</div>;

    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <button onClick={() => navigate(-1)} className="inline-flex items-center text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400 hover:text-[#c9a84c] transition-colors mb-12 group cursor-pointer">
                    <FaArrowLeft className="mr-3 transition-transform group-hover:-translate-x-1" />
                    Back to Previous
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    <div className="relative group lg:col-span-5 lg:pl-8">
                        <div className="bg-[#fafafa] aspect-[4/5] rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative max-w-md mx-auto">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                            {product.countInStock === 0 ? (
                                <div className="absolute top-6 left-6 bg-red-500/90 text-white text-[10px] uppercase tracking-[0.2em] font-extrabold px-4 py-2 rounded-full shadow-lg z-10">Sold Out</div>
                            ) : product.countInStock <= 3 ? (
                                <div className="absolute top-6 left-6 bg-amber-500/90 text-white text-[10px] uppercase tracking-[0.2em] font-extrabold px-4 py-2 rounded-full shadow-lg animate-pulse z-10">Only {product.countInStock} Left</div>
                            ) : null}
                        </div>
                    </div>

                    <div className="flex flex-col justify-center py-6 lg:col-span-7">
                        <div className="flex items-center gap-3 mb-3">
                            <p className="text-[10px] uppercase tracking-[0.3em] text-[#c9a84c] font-extrabold">{product.brand || product.category}</p>
                            {product.productId && (
                                <>
                                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                                    <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">{product.productId}</p>
                                </>
                            )}
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-6 leading-tight">{product.name}</h1>
                        <p className="text-3xl font-serif font-bold text-gray-900 mb-6">${product.price.toFixed(2)}</p>
                        <div className="h-[1px] w-full bg-gray-100 mb-8" />
                        <p className="text-gray-500 text-sm leading-relaxed mb-10 font-medium">{product.description}</p>
                        <div className="mb-10">
                            {product.countInStock > 3 ? (
                                <p className="text-[11px] uppercase tracking-[0.2em] text-green-600 font-extrabold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> In Stock - Ready to Ship</p>
                            ) : product.countInStock > 0 ? (
                                <p className="text-[11px] uppercase tracking-[0.2em] text-amber-500 font-extrabold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" /> Low Stock - {product.countInStock} Left</p>
                            ) : (
                                <p className="text-[11px] uppercase tracking-[0.2em] text-red-500 font-extrabold flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-red-500" /> Currently Unavailable</p>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 mb-12">
                            {product.countInStock > 0 && (
                                <div className="flex items-center bg-[#fafafa] border border-gray-200 rounded-2xl p-1 h-14 w-full sm:w-32">
                                    <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 cursor-pointer"><FaMinus size={10} /></button>
                                    <span className="flex-1 text-center text-sm font-bold text-gray-900">{qty}</span>
                                    <button onClick={() => setQty(q => Math.min(product.countInStock, q + 1))} className="w-10 h-full flex items-center justify-center text-gray-500 hover:text-gray-900 cursor-pointer"><FaPlus size={10} /></button>
                                </div>
                            )}
                            <button disabled={product.countInStock === 0} onClick={addToCartHandler} className={`h-14 flex-1 rounded-2xl text-xs uppercase tracking-[0.2em] font-extrabold transition-all duration-300 shadow-lg flex items-center justify-center cursor-pointer ${product.countInStock === 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed shadow-none" : "bg-primary text-white hover:bg-[#c9a84c] hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"}`}>{product.countInStock > 0 ? "Add to Bag" : "Sold Out"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;
