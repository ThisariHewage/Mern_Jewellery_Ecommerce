import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";

const JewelleryScreen = () => {
    useEffect(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, []);
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [searchParams, setSearchParams] = useSearchParams();
    const categoryFilter = searchParams.get("category") || "All";
    const productFilter = searchParams.get("product") || "All";
    const sortFilter = searchParams.get("sort") || "";

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleCategoryChange = (filter) => {
        const newParams = new URLSearchParams(searchParams);
        if (filter === "All") {
            newParams.delete("category");
        } else {
            newParams.set("category", filter);
        }
        setSearchParams(newParams);
    };

    const handleProductChange = (e) => {
        const filter = e.target.value;
        const newParams = new URLSearchParams(searchParams);
        if (filter === "All") {
            newParams.delete("product");
        } else {
            newParams.set("product", filter);
        }
        setSearchParams(newParams);
    };

    const handleSortChange = (e) => {
        const filter = e.target.value;
        const newParams = new URLSearchParams(searchParams);
        if (filter === "") {
            newParams.delete("sort");
        } else {
            newParams.set("sort", filter);
        }
        setSearchParams(newParams);
    };

    let filteredProducts = products.filter((p) => {
        let matchCat = true;
        if (categoryFilter !== "All") {
            matchCat = p.category?.toLowerCase() === categoryFilter.toLowerCase() ||
                       p.gender?.toLowerCase() === categoryFilter.toLowerCase();
        }

        let matchProd = true;
        if (productFilter !== "All") {
            const term = productFilter.toLowerCase();
            matchProd = p.category?.toLowerCase().includes(term) ||
                        p.name?.toLowerCase().includes(term) ||
                        p.brand?.toLowerCase().includes(term);
        }

        return matchCat && matchProd;
    });

    if (sortFilter === "price_asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortFilter === "price_desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    }

    const categories = ["All", "Men", "Women", "Bridal"];
    const productTypes = ["All", "Anklet", "Bangle", "Bracelet", "Chain", "Earrings", "Necklace", "Ring", "Pendant"];

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
                <div className="flex justify-end mb-8">
                    <p className="text-xs uppercase tracking-widest font-bold text-gray-400">
                        {filteredProducts.length} {filteredProducts.length === 1 ? "Piece" : "Pieces"} Found
                    </p>
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
                            No pieces found matching your filters
                        </p>
                        <button
                            onClick={() => setSearchParams({})}
                            className="mt-6 text-xs uppercase tracking-widest font-bold underline underline-offset-4 cursor-pointer"
                            style={{ color: "#c9a84c" }}
                        >
                            Clear All Filters
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
