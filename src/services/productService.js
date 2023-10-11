import axiosInstance from "../utils/axiosIntance";

export const productService = {
  getProducts(query = "") {
    return axiosInstance.get(`/products${query}`);
  },
  getProductsBySlug(slug = "") {
    return axiosInstance.get(`/products/${slug}`);
  },
  getProductCategories(query = "") {
    return axiosInstance.get(`/product-categories${query}`);
  },
  getProductCategories(slug = "") {
    return axiosInstance.get(`/product-categories/${slug}`);
  },
};
