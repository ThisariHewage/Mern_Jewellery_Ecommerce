import { Link } from "react-router-dom";

/**
 * Reusable Product Card for the listing page.
 */
const ProductCard = ({ product }) => {
    return (
        <div className="group border border-gray-100 overflow-hidden bg-white hover:shadow-2xl transition-all duration-500">
            {/* Image Wrapper */}
            <Link to={`/product/${product._id}`} className="relative block aspect-[3/4] overflow-hidden bg-gray-100">
                <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Quick Add Overlay (Optional) */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 transition-colors duration-500" />
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
                
                {/* Rating Placeholder (Optional) */}
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
    );
};

export default ProductCard;
