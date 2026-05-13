import axios from "axios";
import.meta.env.VITE_API_URL

/**
 * Central Axios instance for API calls.
 * We can add interceptors here later if we need to handle global errors or auth headers.
 */
const api = axios.create({
    baseURL: "http://localhost:5000", // Your backend URL
    withCredentials: true, // Necessary for HTTP-only cookies
});

export default api;
