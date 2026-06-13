import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { updateProductStock } from "../redux/slices/productSlice";
import { toast } from "react-toastify";
import { FaShoppingBag } from "react-icons/fa";
import api from "../services/api";
const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const addToCartHandler = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (product && product.countInStock > 0) {
            try {
                const { data } = await api.patch(`/api/products/${product._id}/stock`, { qty: -1 });
                dispatch(updateProductStock({ productId: product._id, countInStock: data.countInStock }));
                dispatch(addToCart({ ...product, qty: 1 }));
                toast.success(`✨ Added ${product.name} to your collection!`, {
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
        }
    };

    return (
        <div className="group relative flex flex-col justify-between h-full bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100">
            <div>
                <Link to={`/product/${product._id}`} className="relative block aspect-[4/5] overflow-hidden bg-[#fafafa]">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:opacity-95"
                    />

                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                        {product.countInStock === 0 ? (
                            <span className="bg-red-500/90 text-white text-[9px] uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md">
                                Sold Out
                            </span>
                        ) : product.countInStock <= 3 ? (
                            <span className="bg-amber-500/90 text-white text-[9px] uppercase tracking-widest font-extrabold px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md animate-pulse">
                                Only {product.countInStock} Left
                            </span>
                        ) : null}
                    </div>

                    <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 hidden md:block z-10">
                        <button
                            onClick={addToCartHandler}
                            disabled={product.countInStock === 0}
                            className={`w-full py-3 text-[10px] font-extrabold uppercase tracking-widest rounded-xl backdrop-blur-md transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-lg ${product.countInStock === 0
                                ? "bg-white/80 text-gray-400 cursor-not-allowed"
                                : "bg-white/90 text-primary hover:bg-primary hover:text-white"
                                }`}
                        >
                            <FaShoppingBag size={12} />
                            <span>{product.countInStock > 0 ? "Quick Add" : "Out of Stock"}</span>
                        </button>
                    </div>
                </Link>

                <div className="p-6 text-center">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#c9a84c] mb-2 font-bold flex items-center justify-center gap-2">
                        <span>{product.brand || product.category}</span>
                        {product.productId && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-[#c9a84c]/40"></span>
                                <span className="text-gray-500">{product.productId}</span>
                            </>
                        )}
                    </p>
                    <Link to={`/product/${product._id}`}>
                        <h3 className="text-sm font-medium text-gray-900 hover:text-[#c9a84c] transition-colors mb-2 line-clamp-2 px-2 leading-relaxed">
                            {product.name}
                        </h3>
                    </Link>
                    <p className="text-lg font-serif font-bold text-gray-900 mb-3">
                        Rs. {product.price.toFixed(2)}
                    </p>

                    <div className="mb-4">
                        {product.countInStock > 3 ? (
                            <p className="text-[10px] uppercase tracking-widest text-green-600 font-bold">
                                • In Stock ({product.countInStock})
                            </p>
                        ) : product.countInStock > 0 ? (
                            <p className="text-[10px] uppercase tracking-widest text-amber-500 font-bold">
                                • LOW STOCK ({product.countInStock})
                            </p>
                        ) : (
                            <p className="text-[10px] uppercase tracking-widest text-red-500 font-bold">
                                • Out of Stock
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < product.rating ? "text-[#c9a84c]" : "text-gray-200"}`}>
                                ★
                            </span>
                        ))}
                        <span className="text-[10px] text-gray-400 ml-2 font-medium">({product.numReviews})</span>
                    </div>
                </div>
            </div>

            <div className="px-6 pb-6 pt-0 md:hidden">
                <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className={`w-full py-3.5 text-[10px] font-extrabold uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${product.countInStock === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-primary text-white hover:bg-[#c9a84c] shadow-md"
                        }`}
                >
                    <FaShoppingBag size={12} />
                    <span>{product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}</span>
                </button>
            </div>
        </div>
    );
};
export default ProductCard;
