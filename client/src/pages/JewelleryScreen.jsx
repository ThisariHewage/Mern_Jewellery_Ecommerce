import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";

const JewelleryScreen = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [searchParams, setSearchParams] = useSearchParams();
    const [activeFilter, setActiveFilter] = useState(searchParams.get("category") || "All");

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Sync tab with URL param on load / back-navigation
    useEffect(() => {
        const cat = searchParams.get("category");
        setActiveFilter(cat || "All");
    }, [searchParams]);

    const handleFilter = (filter) => {
        setActiveFilter(filter);
        if (filter === "All") {
            setSearchParams({});
        } else {
            setSearchParams({ category: filter });
        }
    };

    const filteredProducts = products.filter((p) => {
        if (activeFilter === "All") return true;
        return (
            p.category?.toLowerCase() === activeFilter.toLowerCase() ||
            p.gender?.toLowerCase() === activeFilter.toLowerCase()
        );
    });

    const filters = ["All", "Men", "Women"];

    return (
        <div className="min-h-screen bg-white">
            {/* Page Hero */}
            <div
                className="relative py-24 text-center overflow-hidden"
                style={{
                    background: "linear-gradient(135deg, #1a0533 0%, #2d0a5e 50%, #1a0533 100%)",
                }}
            >
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at 20% 50%, #c9a84c 0%, transparent 50%), radial-gradient(circle at 80% 50%, #c9a84c 0%, transparent 50%)",
                    }}
                />
                <div className="relative z-10 max-w-3xl mx-auto px-6">
                    <p className="text-xs uppercase tracking-[0.4em] text-amber-400 font-bold mb-4">
                        Dewora Jewellers — Curated Collection
                    </p>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white tracking-tighter mb-6">
                        Fine{" "}
                        <span className="text-transparent bg-clip-text"
                            style={{ backgroundImage: "linear-gradient(90deg, #c9a84c, #f0d080)" }}>
                            Jewellery
                        </span>
                    </h1>
                    <p className="text-white/60 text-sm tracking-widest uppercase font-medium">
                        Timeless pieces crafted for every story
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-16">
                {/* Filter Tabs */}
                <div className="flex items-center justify-between mb-14 flex-wrap gap-6">
                    <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                id={`jewellery-filter-${filter.toLowerCase()}`}
                                onClick={() => handleFilter(filter)}
                                className={`px-7 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer ${
                                    activeFilter === filter
                                        ? "text-white shadow-lg"
                                        : "text-gray-500 hover:text-gray-900"
                                }`}
                                style={
                                    activeFilter === filter
                                        ? {
                                              background:
                                                  "linear-gradient(135deg, #2d0a5e, #c9a84c)",
                                          }
                                        : {}
                                }
                            >
                                {filter === "All" ? "All Jewellery" : `${filter}'s`}
                            </button>
                        ))}
                    </div>
                    <div className="text-xs uppercase tracking-widest font-bold text-gray-400">
                        {filteredProducts.length}{" "}
                        {filteredProducts.length === 1 ? "Piece" : "Pieces"} Found
                    </div>
                </div>

                {/* Product Grid */}
                {loading ? (
                    <div className="py-32 text-center">
                        <div className="inline-flex flex-col items-center gap-4">
                            <div
                                className="w-12 h-12 rounded-full border-4 border-t-transparent animate-spin"
                                style={{ borderColor: "#c9a84c", borderTopColor: "transparent" }}
                            />
                            <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-bold animate-pulse">
                                Loading Collection...
                            </p>
                        </div>
                    </div>
                ) : error ? (
                    <div className="py-20 text-center text-red-500 font-medium">{error}</div>
                ) : filteredProducts.length === 0 ? (
                    <div className="py-32 text-center">
                        <p className="text-4xl mb-4">💎</p>
                        <p className="text-gray-400 text-sm uppercase tracking-widest font-bold">
                            No {activeFilter !== "All" ? `${activeFilter}'s` : ""} pieces found
                        </p>
                        <button
                            onClick={() => handleFilter("All")}
                            className="mt-6 text-xs uppercase tracking-widest font-bold underline underline-offset-4 cursor-pointer"
                            style={{ color: "#c9a84c" }}
                        >
                            View All Jewellery
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default JewelleryScreen;
