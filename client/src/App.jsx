import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

// Pages
import HomeScreen from "./pages/HomeScreen";
import ProductScreen from "./pages/ProductScreen";
import CartScreen from "./pages/CartScreen";
import ShippingScreen from "./pages/ShippingScreen";
import PaymentScreen from "./pages/PaymentScreen";
import PlaceOrderScreen from "./pages/PlaceOrderScreen";
import OrderScreen from "./pages/OrderScreen";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import ShopScreen from "./pages/ShopScreen";
import JewelleryScreen from "./pages/JewelleryScreen";
import AboutScreen from "./pages/AboutScreen";
import ServicesScreen from "./pages/ServicesScreen";
import PromotionsScreen from "./pages/PromotionsScreen";
import ContactScreen from "./pages/ContactScreen";
import ProfileScreen from "./pages/ProfileScreen";
import PrivacyPolicyScreen from "./pages/PrivacyPolicyScreen";
import TermsConditionsScreen from "./pages/TermsConditionsScreen";
import UserListScreen from "./pages/admin/UserListScreen";
import UserEditScreen from "./pages/admin/UserEditScreen";
import ProductListScreen from "./pages/admin/ProductListScreen";
import ProductEditScreen from "./pages/admin/ProductEditScreen";
import OrderListScreen from "./pages/admin/OrderListScreen";
import AdminDashboardScreen from "./pages/admin/AdminDashboardScreen";
import ForgotPasswordScreen from "./pages/ForgotPasswordScreen";
import NotFoundScreen from "./pages/NotFoundScreen";
import CheckoutPaymentScreen from "./pages/CheckoutPaymentScreen";

function App() {
  const location = useLocation();
  const hideFooterRoutes = ["/shipping", "/payment", "/placeorder", "/order/"];
  const showFooter = !hideFooterRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/forgotpassword" element={<ForgotPasswordScreen />} />

          <Route path="/shop" element={<ShopScreen />} />
          <Route path="/jewellery" element={<JewelleryScreen />} />
          <Route path="/about" element={<AboutScreen />} />
          <Route path="/services" element={<ServicesScreen />} />
          <Route path="/promotions" element={<PromotionsScreen />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyScreen />} />
          <Route path="/terms-conditions" element={<TermsConditionsScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />

          {/* Registered Users Only */}
          <Route element={<PrivateRoute />}>
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/order/:id/pay" element={<CheckoutPaymentScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>

          {/* Admin Users Only */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboardScreen />} />
            <Route path="/admin/userlist" element={<UserListScreen />} />
            <Route path="/admin/user/:id/edit" element={<UserEditScreen />} />
            <Route path="/admin/productlist" element={<ProductListScreen />} />
            <Route path="/admin/product/create" element={<ProductEditScreen />} />
            <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
            <Route path="/admin/orderlist" element={<OrderListScreen />} />
          </Route>

          {/* 404 Not Found */}
          <Route path="*" element={<NotFoundScreen />} />
        </Routes>
      </main>

      {showFooter && <Footer />}

      {/* Global Toast Notifications */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
