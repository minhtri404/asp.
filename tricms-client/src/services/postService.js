import axiosClient from "./apiClient";

export function getPosts() {
    return axiosClient.get("/Posts");
}

export function getPostById(postId) {
    return axiosClient.get(`/Posts/${postId}`);
}
