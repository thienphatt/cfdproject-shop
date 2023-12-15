import axiosInstance from "../utils/axiosIntance";

export const orderService = {
    getOrderVoucher(query = "") {
        return axiosInstance.get(`/orders/voucher/${query}`);
    },

    checkout(payload = {}) {
        return axiosInstance.post(`/orders`, payload);
    },

    getOrder() {
        return axiosInstance.get(`/orders/me`);
    },
};
