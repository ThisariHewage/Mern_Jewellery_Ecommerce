import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="py-12">
            {/* Hero Section */}
            <div className="text-center mb-20">
                <h1 className="text-6xl mb-4 text-primary uppercase tracking-tighter font-serif">
                    Monarch of The Gold World
                </h1>
                <p className="text-gray-500 mb-8 max-w-lg mx-auto leading-relaxed text-sm uppercase tracking-widest">
                    Crafted for the modern silhouette. Redefining elegance with premium 22k gold and diamond collections.
                </p>
                <div className="h-[1px] w-20 bg-accent mx-auto" />
            </div>

            {/* Product Grid */}
            {loading ? (
                <div className="text-center py-20 font-medium tracking-widest uppercase animate-pulse">
                    Loading Collection...
                </div>
            ) : error ? (
                <div className="text-center py-20 text-red-500">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default HomeScreen;
