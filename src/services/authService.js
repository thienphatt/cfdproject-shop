import axiosInstance from "../utils/axiosIntance";

export const authService = {
    login(payload = {}) {
        return axiosInstance.post(`/customer/login`, payload);
    },
    register(payload = {}) {
        return axiosInstance.post(`/customer/register`, payload);
    },
    getProfile() {
        return axiosInstance.get(`/customer/profiles`);
    },
    updateProfile(payload = {}) {
        return axiosInstance.put(`/customer/profiles`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },
    addWishList(payload = {}) {
        return axiosInstance.post(`/customer/white-list`, payload);
    },

    removeWishList(payload = {}) {
        return axiosInstance.delete(`/customer/white-list`, { data: payload });
    },
};
