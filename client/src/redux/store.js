import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import productReducer from "./slices/productSlice.js";

/**
 * Configure the Redux Store.
 */
const store = configureStore({
    reducer: {
        auth: authReducer,
        products: productReducer,
    },
    devTools: true,
});

export default store;
