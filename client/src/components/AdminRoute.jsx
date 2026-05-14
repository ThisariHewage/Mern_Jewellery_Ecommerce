import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminRoute = () => {
    const { userInfo } = useSelector((state) => state.auth);

    // If user exists and is an admin, render the child routes (Outlet)
    // Otherwise, redirect to the home page or login page
    return userInfo && userInfo.isAdmin ? (
        <Outlet />
    ) : (
        <Navigate to="/login" replace />
    );
};

export default AdminRoute;
