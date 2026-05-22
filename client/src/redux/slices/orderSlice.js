import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

/**
 * Async Thunk to create a new order.
 */
export const createOrder = createAsyncThunk(
    "orders/create",
    async (order, { rejectWithValue }) => {
        try {
            const response = await api.post("/api/orders", order);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

/**
 * Async Thunk to get order details.
 */
export const getOrderDetails = createAsyncThunk(
    "orders/getDetails",
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/api/orders/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

/**
 * Async Thunk to pay an order.
 */
export const payOrder = createAsyncThunk(
    "orders/pay",
    async ({ orderId, details }, { rejectWithValue }) => {
        try {
            const response = await api.put(`/api/orders/${orderId}/pay`, details);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message
            );
        }
    }
);

const orderSlice = createSlice({
    name: "orders",
    initialState: {
        order: null,
        loading: false,
        error: null,
        success: false,
        loadingPay: false,
        successPay: false,
    },
    reducers: {
        resetOrder: (state) => {
            state.order = null;
            state.loading = false;
            state.error = null;
            state.success = false;
            state.loadingPay = false;
            state.successPay = false;
        },
        payReset: (state) => {
            state.loadingPay = false;
            state.successPay = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload;
            })
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.order = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(payOrder.pending, (state) => {
                state.loadingPay = true;
            })
            .addCase(payOrder.fulfilled, (state) => {
                state.loadingPay = false;
                state.successPay = true;
            })
            .addCase(payOrder.rejected, (state, action) => {
                state.loadingPay = false;
                state.error = action.payload;
            });
    },
});

export const { resetOrder, payReset } = orderSlice.actions;
export default orderSlice.reducer;
