import { useState, useEffect, useTransition, memo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Users, Edit, Trash2, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import api from "../../services/api";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

// Memoized Row for performance optimization
const UserRow = memo(({ user, onDelete }) => (
    <tr className="hover:bg-gray-50/50 transition-colors group">
        <td className="px-6 py-5 font-mono text-sm text-gray-400 whitespace-nowrap">{user.userId || user._id}</td>
        <td className="px-6 py-5 text-sm font-medium text-gray-700 whitespace-nowrap truncate max-w-[150px]">{user.name}</td>
        <td className="px-6 py-5 text-sm text-gray-500 whitespace-nowrap truncate max-w-[200px]">
            <a href={`mailto:${user.email}`} className="hover:text-black">{user.email}</a>
        </td>
        <td className="px-6 py-5">
            {user.isAdmin ? (
                <CheckCircle size={18} className="text-green-500" />
            ) : (
                <XCircle size={18} className="text-red-500" />
            )}
        </td>
        <td className="px-6 py-5 text-right space-x-3">
            <Link
                to={`/admin/user/${user._id}/edit`}
                className="inline-flex items-center justify-center p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 hover:text-black transition-colors"
                title="Edit User"
            >
                <Edit size={16} />
            </Link>
            <button
                onClick={() => onDelete(user._id)}
                className="inline-flex items-center justify-center p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 hover:text-red-800 transition-colors cursor-pointer"
                title="Delete User"
            >
                <Trash2 size={16} />
            </button>
        </td>
    </tr>
));

const UserListScreen = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isPending, startTransition] = useTransition();

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const { data } = await api.get("/api/users");
            setUsers(data);
        } catch (err) {
            setError(err?.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteHandler = (id) => {
        // High-priority update: Show modal immediately
        setSelectedUserId(id);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            await api.delete(`/api/users/${selectedUserId}`);
            toast.success("User deleted successfully");

            // Background update: Re-fetching data
            startTransition(() => {
                fetchUsers();
            });

            setShowDeleteModal(false);
        } catch (err) {
            toast.error(err?.response?.data?.message || err.message);
            setShowDeleteModal(false);
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

            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-4xl font-serif font-bold text-gray-900 flex items-center gap-3">
                        <Users size={32} className="text-accent" />
                        Users
                    </h1>
                    <p className="text-gray-500 uppercase tracking-widest text-[10px] font-bold mt-2">Manage customer accounts</p>
                </div>
            </div>

            {loading ? (
                <div className="py-20 text-center animate-pulse tracking-widest uppercase text-gray-400">Loading users...</div>
            ) : error ? (
                <div className="py-20 text-center text-red-500 font-medium">{error}</div>
            ) : (
                <div className={`bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">User ID</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Name</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Email</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Admin</th>
                                    <th className="px-6 py-5 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.map((user) => (
                                    <UserRow
                                        key={user._id}
                                        user={user}
                                        onDelete={deleteHandler}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <DeleteConfirmModal
                show={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
                title="Delete User"
                message="Are you sure you want to delete this user? This action cannot be undone."
            />
        </div>
    );
};

export default UserListScreen;
