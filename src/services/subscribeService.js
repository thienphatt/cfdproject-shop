import axiosInstance from "../utils/axiosIntance";

export const subscribeService = {
  subscribe(payload = {}) {
    return axiosInstance.post(`/subscribes`, payload);
  },
  subscribeDeal(payload = {}) {
    return axiosInstance.post(`/subscribes/deals`, payload);
  },
};
