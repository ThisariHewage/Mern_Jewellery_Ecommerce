import axios from "axios";


/**
 * Central Axios instance for API calls.
 * We can add interceptors here later if we need to handle global errors or auth headers.
 */
const baseURL = import.meta.env.VITE_API_URL || "http://localhost:5000";

if (import.meta.env.MODE === "production") {
    console.log(`[API] Initializing with Base URL: ${baseURL}`);
}

const api = axios.create({
    baseURL,
    withCredentials: true,
});

// Add a request interceptor to include the Bearer token as a fallback
api.interceptors.request.use(
    (config) => {
        const userInfo = localStorage.getItem("userInfo")
            ? JSON.parse(localStorage.getItem("userInfo"))
            : null;

        if (userInfo && userInfo.token) {
            config.headers.Authorization = `Bearer ${userInfo.token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
