import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import productReducer from "./slices/productSlice.js";
import cartReducer from "./slices/cartSlice.js";

/**
 * Configure the Redux Store.
 */
const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
        cart: cartReducer,
    },
    devTools: true,
});

export default store;
