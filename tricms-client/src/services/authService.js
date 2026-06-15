import axiosClient from "./apiClient";

export function loginCustomer(credentials) {
    return axiosClient.post("/Auth/CustomerLogin", credentials);
}

export function registerCustomer(customerData) {
    return axiosClient.post("/Auth/CustomerRegister", customerData);
}
