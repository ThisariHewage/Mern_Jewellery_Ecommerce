import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaArrowLeft, FaMinus, FaPlus } from "react-icons/fa";
import { addToCart } from "../redux/slices/cartSlice";
import api from "../services/api";

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

    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate("/cart");
    };

    if (loading) return <div className="py-20 text-center uppercase tracking-widest animate-pulse">Refining Details...</div>;
    if (error) return <div className="py-20 text-center text-red-500">{error}</div>;

    return (
        <div className="py-12">
            <Link to="/" className="inline-flex items-center text-xs uppercase tracking-widest text-gray-500 hover:text-primary transition-colors mb-8">
                <FaArrowLeft className="mr-2" /> Back to Collection
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                {/* Product Image */}
                <div className="bg-gray-100 aspect-[3/4] overflow-hidden">
                    <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Product Info */}
                <div className="flex flex-col justify-center">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-2 font-medium">
                        {product.brand}
                    </p>
                    <h1 className="text-4xl font-serif font-bold text-primary mb-4 leading-tight">
                        {product.name}
                    </h1>
                    
                    <div className="flex items-center space-x-2 mb-6">
                        <div className="flex text-accent text-xs">
                            {[...Array(5)].map((_, i) => (
                                <span key={i}>{i < product.rating ? "★" : "☆"}</span>
                            ))}
                        </div>
                        <span className="text-xs text-gray-400 uppercase tracking-widest">
                            {product.numReviews} Reviews
                        </span>
                    </div>

                    <p className="text-2xl font-serif font-bold text-primary mb-8">
                        ${product.price.toFixed(2)}
                    </p>

                    <div className="h-[1px] w-full bg-gray-100 mb-8" />

                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                        {product.description}
                    </p>

                    {/* Stock & Quantity */}
                    <div className="mb-8">
                        <div className="flex items-center space-x-4 mb-4">
                            <span className="text-xs uppercase tracking-widest font-bold">Status:</span>
                            <span className={`text-xs uppercase tracking-widest font-bold ${product.countInStock > 0 ? "text-green-600" : "text-red-600"}`}>
                                {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                            </span>
                        </div>

                        {product.countInStock > 0 && (
                            <div className="flex items-center space-x-6">
                                <span className="text-xs uppercase tracking-widest font-bold">Quantity:</span>
                                <div className="flex items-center border border-gray-200">
                                    <button 
                                        onClick={() => setQty(q => Math.max(1, q - 1))}
                                        className="p-3 hover:bg-gray-50 transition-colors"
                                    >
                                        <FaMinus size={10} />
                                    </button>
                                    <span className="w-12 text-center text-sm font-medium">{qty}</span>
                                    <button 
                                        onClick={() => setQty(q => Math.min(product.countInStock, q + 1))}
                                        className="p-3 hover:bg-gray-50 transition-colors"
                                    >
                                        <FaPlus size={10} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Action Button */}
                    <button 
                        disabled={product.countInStock === 0}
                        onClick={addToCartHandler}
                        className={`btn-premium w-full py-4 ${product.countInStock === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                        {product.countInStock > 0 ? "Add to Bag" : "Sold Out"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductScreen;
