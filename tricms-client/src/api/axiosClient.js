import axios from "axios";

export const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "http://localhost:13767";

const axiosClient = axios.create({
    baseURL: `${API_ORIGIN}/api`,
    headers: {
        "Content-Type": "application/json"
    }
});

export default axiosClient;
