import axiosClient from "./apiClient";

export function getCategoriesProducts() {
    return axiosClient.get("/CategoriesProducts");
}

export function getProducts() {
    return axiosClient.get("/Products");
}

export function getProductsByCategory(categoryId) {
    return axiosClient.get(`/Products/category/${categoryId}`);
}

export function getProductById(productId) {
    return axiosClient.get(`/Products/${productId}`);
}
