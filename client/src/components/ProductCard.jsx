import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { FaShoppingCart } from "react-icons/fa";

/**
 * Reusable Product Card for the listing page.
 */
const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    const addToCartHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (product.countInStock > 0) {
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
        }
    };

    return (
        <div className="group border border-gray-100 overflow-hidden bg-white hover:shadow-2xl hover:border-accent/40 transition-all duration-500 flex flex-col justify-between h-full">
            <div>
                {/* Image Wrapper */}
                <Link to={`/product/${product._id}`} className="relative block aspect-square overflow-hidden bg-secondary">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {/* Quick Add Overlay (Optional) */}
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-500" />
                </Link>

                {/* Product Details */}
                <div className="p-6 text-center">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 mb-2 font-medium">
                        {product.brand}
                    </p>
                    <Link to={`/product/${product._id}`}>
                        <h3 className="text-sm font-medium text-primary hover:text-accent transition-colors mb-2 truncate px-2">
                            {product.name}
                        </h3>
                    </Link>
                    <p className="text-lg font-serif font-bold text-primary">
                        ${product.price.toFixed(2)}
                    </p>
                    
                    {/* Rating Stars */}
                    <div className="mt-4 flex items-center justify-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < product.rating ? "text-accent" : "text-gray-200"}>
                                ★
                            </span>
                        ))}
                        <span className="text-[10px] text-gray-400 ml-1">({product.numReviews})</span>
                    </div>
                </div>
            </div>

            {/* Action Button Area */}
            <div className="px-6 pb-6 pt-0">
                <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 border flex items-center justify-center gap-2 cursor-pointer ${
                        product.countInStock === 0
                            ? "bg-gray-100 text-gray-400 border-gray-100 cursor-not-allowed"
                            : "border-primary bg-primary text-white hover:bg-transparent hover:text-primary active:scale-95 shadow-sm hover:shadow-md"
                    }`}
                >
                    <FaShoppingCart size={12} />
                    <span>{product.countInStock > 0 ? "Add to Cart" : "Out of Stock"}</span>
                </button>
            </div>
        </div>
    );
};

export default ProductCard;

