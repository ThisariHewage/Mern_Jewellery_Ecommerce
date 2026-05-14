import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";

const NewArrivalsScreen = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    // Sort by newest for this screen
    const newArrivals = [...products].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 8);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="text-center mb-16">
                <p className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4">Just Landed</p>
                <h1 className="text-6xl font-serif font-bold text-gray-900 tracking-tighter mb-6">New Arrivals</h1>
                <div className="h-[1px] w-24 bg-gray-200 mx-auto" />
            </div>

            {loading ? (
                <div className="py-20 text-center animate-pulse tracking-widest uppercase text-gray-400">
                    Sourcing the latest trends...
                </div>
            ) : error ? (
                <div className="py-20 text-center text-red-500 font-medium">
                    {error}
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                    {newArrivals.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default NewArrivalsScreen;
