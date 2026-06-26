export const API_ORIGIN = import.meta.env.VITE_API_ORIGIN || "http://localhost:13767";
export const API_BASE_URL = import.meta.env.DEV && !import.meta.env.VITE_API_ORIGIN
    ? "/api"
    : `${API_ORIGIN}/api`;
