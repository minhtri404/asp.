import axiosClient from "./apiClient";

export function getAdvertisements() {
    return axiosClient.get("/Advertisements");
}
