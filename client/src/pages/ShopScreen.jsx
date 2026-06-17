import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductCard from "../components/ProductCard";
import ProductPagination from "../components/ProductPagination";

const PRODUCTS_PER_PAGE = 12;

const ShopScreen = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const requestedPage = Number(searchParams.get("page")) || 1;
    const currentPage = Math.min(Math.max(requestedPage, 1), totalPages || 1);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const paginatedProducts = products.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

    const handlePageChange = (page) => {
        const newParams = new URLSearchParams(searchParams);
        if (page === 1) {
            newParams.delete("page");
        } else {
            newParams.set("page", page);
        }
        setSearchParams(newParams);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                <div>
                    <p className="text-primary uppercase tracking-[0.3em] text-xs font-bold mb-3 border-l-2 border-accent pl-3">Dewora Collection</p>
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 tracking-tighter">Shop Fine Jewellery</h1>
                </div>
                <div className="flex items-center gap-4 text-xs uppercase tracking-widest font-bold text-gray-400">
                    <span>Filter</span>
                    <div className="w-[1px] h-4 bg-gray-200" />
                    <span className="text-black">Newest</span>
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center animate-pulse tracking-widest uppercase text-gray-400">
                    Loading our curated collection...
                </div>
            ) : error ? (
                <div className="py-20 text-center text-red-500 font-medium">
                    {error}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                        {paginatedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                    <ProductPagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default ShopScreen;
