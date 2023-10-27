import axiosInstance from "../utils/axiosIntance";

export const cartService = {
  getCart() {
    return axiosInstance.get(`/carts/me`);
  },
  updateCart(payload = {}) {
    return axiosInstance.put(`/carts`, payload);
  },
};
