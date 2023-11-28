import axiosInstance from "../utils/axiosIntance";

export const orderService = {
    getOrderVoucher(query = "") {
        return axiosInstance.get(`/orders/voucher/${query}`);
    },
};
