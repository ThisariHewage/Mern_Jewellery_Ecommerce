import { createSlice } from "@reduxjs/toolkit";

/**
 * Initial state for authentication.
 * We try to get user info from localStorage if it exists.
 */
const initialState = {
    userInfo: localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        // Set user credentials and save to localStorage
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
        // Clear user credentials and remove from localStorage
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem("userInfo");
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
