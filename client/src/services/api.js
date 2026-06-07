import axios from "axios";


/**
 * Central Axios instance for API calls.
 * We can add interceptors here later if we need to handle global errors or auth headers.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
    withCredentials: true,
});

export default api;
