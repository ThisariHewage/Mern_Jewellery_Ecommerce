import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronLeft, User, Mail, Shield, Check } from "lucide-react";
import api from "../../services/api";

const UserEditScreen = () => {
    const { id: userId } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                setLoading(true);
                const { data } = await api.get(`/api/users/${userId}`);
                setName(data.name);
                setEmail(data.email);
                setIsAdmin(data.isAdmin);
            } catch (err) {
                setError(err?.response?.data?.message || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [userId]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setUpdating(true);
            await api.put(`/api/users/${userId}`, { name, email, isAdmin });
            toast.success("User updated successfully");
            navigate("/admin/userlist");
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-6 py-16">
            <Link 
                to="/admin/userlist" 
                className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-gray-500 hover:text-black transition-colors mb-10"
            >
                <ChevronLeft size={16} />
                Back to Users
            </Link>

            <div className="mb-12 text-center">
                <h1 className="text-4xl font-serif font-bold text-gray-900 tracking-tighter">Edit User</h1>
                <p className="text-gray-500 uppercase tracking-[0.2em] text-[10px] font-bold mt-2">Manage roles and details</p>
            </div>

            {loading ? (
                <div className="py-20 text-center animate-pulse tracking-widest uppercase text-gray-400">Loading user data...</div>
            ) : error ? (
                <div className="py-20 text-center text-red-500 font-medium">{error}</div>
            ) : (
                <div className="bg-white rounded-[2.5rem] p-10 sm:p-16 shadow-2xl shadow-gray-200/50 border border-gray-100">
                    <form onSubmit={submitHandler} className="space-y-8">
                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Full Name</label>
                            <div className="relative group">
                                <User size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                <input
                                    type="text"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium text-sm"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400 ml-1">Email Address</label>
                            <div className="relative group">
                                <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-14 pr-6 py-4 bg-gray-50 border border-transparent rounded-2xl focus:bg-white focus:border-black outline-none transition-all font-medium text-sm"
                                />
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <label className="flex items-center gap-4 cursor-pointer group">
                                <div className={`w-12 h-6 rounded-full transition-colors relative flex items-center justify-center ${isAdmin ? "bg-black" : "bg-gray-200"}`}>
                                    <input
                                        type="checkbox"
                                        checked={isAdmin}
                                        onChange={(e) => setIsAdmin(e.target.checked)}
                                        className="sr-only"
                                    />
                                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform absolute top-1 ${isAdmin ? "right-1" : "left-1"}`} />
                                </div>
                                <div>
                                    <span className="text-sm font-bold text-gray-900 block flex items-center gap-2">
                                        <Shield size={14} className={isAdmin ? "text-accent" : "text-gray-400"} />
                                        Administrator Privileges
                                    </span>
                                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mt-1">Grant access to dashboard</span>
                                </div>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={updating}
                            className="w-full py-4 bg-black text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
                        >
                            {updating ? "Saving Changes..." : (
                                <>
                                    <Check size={16} /> Save Changes
                                </>
                            )}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserEditScreen;
