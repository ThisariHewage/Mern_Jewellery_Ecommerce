import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Package, Edit, Trash2, Plus, ArrowLeft } from "lucide-react";
import api from "../../services/api";

const ProductListScreen = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loadingCreate, setLoadingCreate] = useState(false);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/api/products");
            setProducts(data);
        } catch (err) {
            setError(err?.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteHandler = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.delete(`/api/products/${id}`);
                toast.success("Product deleted successfully");
                fetchProducts();
            } catch (err) {
                toast.error(err?.response?.data?.message || err.message);
            }
        }
    };

    const createProductHandler = async () => {
        if (window.confirm("Are you sure you want to create a new product?")) {
            navigate(`/admin/product/create`);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-16">
            <Link
                to="/admin/dashboard"
                className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-gray-100 rounded-full text-[10px] uppercase tracking-[0.2em] font-black text-gray-500 hover:text-black hover:bg-gray-50 hover:shadow-lg hover:shadow-gray-200/50 transition-all mb-10 group"
            >
                <div className="w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:scale-110 transition-transform">
                    <ArrowLeft size={12} strokeWidth={3} />
                </div>
                <span>Back to Dashboard</span>
            </Link>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-gray-900 flex items-center gap-3">
                        <Package size={32} className="text-accent" />
                        Products
                    </h1>
                    <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mt-2">Manage inventory and catalog</p>
                </div>
                <button
                    onClick={createProductHandler}
                    disabled={loadingCreate}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-95 disabled:opacity-50"
                >
                    <Plus size={16} />
                    Create Product
                </button>
            </div>

            {loading ? (
                <div className="py-20 text-center animate-pulse tracking-widest uppercase text-gray-400">Loading products...</div>
            ) : error ? (
                <div className="py-20 text-center text-red-500 font-medium">{error}</div>
            ) : (
                <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">ID</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Name</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Price</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Stock</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Category</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Brand</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {products.map((product) => (
                                    <tr key={product._id} className="hover:bg-gray-50/50 transition-colors group">
                                        <td className="px-6 py-5 font-mono text-[10px] text-gray-400">{product._id.substring(0, 10)}...</td>
                                        <td className="px-6 py-5 text-sm font-medium text-gray-700">{product.name}</td>
                                        <td className="px-6 py-5 text-sm font-bold text-gray-900">${product.price}</td>
                                        <td className="px-6 py-5 text-sm font-bold">
                                            {product.countInStock <= 5 ? (
                                                <span className="text-rose-600 bg-rose-50 px-2 py-1 rounded-md">{product.countInStock}</span>
                                            ) : (
                                                <span className="text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">{product.countInStock}</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5 text-sm text-gray-500">{product.category}</td>
                                        <td className="px-6 py-5 text-sm text-gray-500">{product.brand}</td>
                                        <td className="px-6 py-5 text-right space-x-3">
                                            <Link
                                                to={`/admin/product/${product._id}/edit`}
                                                className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:text-black transition-colors"
                                            >
                                                <Edit size={16} />
                                            </Link>
                                            <button
                                                onClick={() => deleteHandler(product._id)}
                                                className="inline-flex items-center justify-center p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-800 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductListScreen;
