import axios from "axios";
import { API_BASE_URL, API_ORIGIN } from "../config/api";

const axiosClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

export { API_ORIGIN };
export default axiosClient;
