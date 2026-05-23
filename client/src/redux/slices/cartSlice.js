import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../../utils/cartUtils";

const getInitialState = () => {
    try {
        const userInfo = localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null;

        const cartKey = userInfo ? `cart_${userInfo._id}` : "cart";
        const cartFromStorage = localStorage.getItem(cartKey);

        return cartFromStorage
            ? JSON.parse(cartFromStorage)
            : { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
    } catch (error) {
        return { cartItems: [], shippingAddress: {}, paymentMethod: "PayPal" };
    }
};

const initialState = getInitialState();

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find((x) => x._id === item._id);

            if (existItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            return updateCart(state);
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state);
        },
        clearCartItems: (state) => {
            state.cartItems = [];
            return updateCart(state);
        },
        // Reset cart state when user logs in/out
        resetCart: (state) => {
            const newState = getInitialState();
            state.cartItems = newState.cartItems;
            state.shippingAddress = newState.shippingAddress;
            state.paymentMethod = newState.paymentMethod;
            state.itemsPrice = newState.itemsPrice;
            state.shippingPrice = newState.shippingPrice;
            state.taxPrice = newState.taxPrice;
            state.totalPrice = newState.totalPrice;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems,
    resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
