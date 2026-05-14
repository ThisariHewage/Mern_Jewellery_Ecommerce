import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronLeft, Package, DollarSign, Image as ImageIcon, Tag, Hash, AlignLeft, Check } from "lucide-react";
import api from "../../services/api";

const ProductEditScreen = () => {
    const { id: productId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState("");
    
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`/api/products/${productId}`);
                setName(data.name);
                setPrice(data.price);
                setImage(data.image);
                setBrand(data.brand);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);
            } catch (err) {
                setError(err?.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [productId]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setUpdating(true);
            await api.put(`/api/products/${productId}`, {
                name,
                price,
                image,
                brand,
                category,
                countInStock,
                description,
            });
            toast.success("Product updated successfully");
            navigate("/admin/productlist");
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <Link 
                to="/admin/productlist" 
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors mb-10"
            >
                <ChevronLeft size={16} />
                Back to Products
            </Link>

            <div className="mb-12 text-center">
                <h1 className="text-4xl font-serif font-bold text-gray-900 tracking-tighter">Edit Product</h1>
                <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-bold mt-2">Update product details</p>
            </div>

            {loading ? (
                <div className="py-20 text-center animate-pulse tracking-widest uppercase text-gray-400">Loading product data...</div>
            ) : error ? (
                <div className="py-20 text-center text-red-500 font-medium">{error}</div>
            ) : (
                <div className="bg-white rounded-[2.5rem] p-10 sm:p-16 shadow-2xl shadow-gray-200/50 border border-gray-100">
                    <form onSubmit={submitHandler} className="space-y-8">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Product Name</label>
                            <div className="relative group">
                                <Package size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                <input
                                    type="text"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Price */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Price ($)</label>
                                <div className="relative group">
                                    <DollarSign size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                    <input
                                        type="number"
                                        value={price}
                                        required
                                        step="0.01"
                                        onChange={(e) => setPrice(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>

                            {/* Count In Stock */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Stock Count</label>
                                <div className="relative group">
                                    <Hash size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                    <input
                                        type="number"
                                        value={countInStock}
                                        required
                                        onChange={(e) => setCountInStock(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Image URL */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Image URL</label>
                            <div className="relative group">
                                <ImageIcon size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                <input
                                    type="text"
                                    value={image}
                                    required
                                    onChange={(e) => setImage(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium text-sm"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Brand */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Brand</label>
                                <div className="relative group">
                                    <Tag size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                    <input
                                        type="text"
                                        value={brand}
                                        required
                                        onChange={(e) => setBrand(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>

                            {/* Category */}
                            <div className="space-y-2">
                                <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Category</label>
                                <div className="relative group">
                                    <Tag size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                    <input
                                        type="text"
                                        value={category}
                                        required
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium text-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Description</label>
                            <div className="relative group">
                                <AlignLeft size={16} className="absolute left-5 top-6 text-gray-400 group-focus-within:text-black transition-colors" />
                                <textarea
                                    value={description}
                                    required
                                    rows="4"
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium text-sm resize-none"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={updating}
                            className="w-full py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                        >
                            {updating ? "Saving Changes..." : (
                                <>
                                    <Check size={16} /> Save Product
                                </>
                            )}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ProductEditScreen;
