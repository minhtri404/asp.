import axiosClient from "./apiClient";

export function createOrder(orderData) {
    return axiosClient.post("/Orders", orderData);
}

export function getOrdersByCustomer(customerId) {
    return axiosClient.get(`/Orders/customer/${customerId}`);
}
