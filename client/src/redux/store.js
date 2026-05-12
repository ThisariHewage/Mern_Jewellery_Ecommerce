import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";

/**
 * Configure the Redux Store.
 * We'll add more reducers (like cart, products) as we build the features.
 */
const store = configureStore({
    reducer: {
        auth: authReducer,
    },
    devTools: true, // Enable Redux DevTools
});

export default store;
