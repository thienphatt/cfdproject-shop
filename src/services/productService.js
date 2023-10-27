import axiosInstance from "../utils/axiosIntance";

export const productService = {
  getProducts(query = "") {
    return axiosInstance.get(`/products${query}`);
  },
  getProductsDetail(slug = "") {
    return axiosInstance.get(`/products/${slug}`);
  },
  getProductsBySlug(slug = "") {
    return axiosInstance.get(`/products/${slug}`);
  },
  getCategories(query = "") {
    return axiosInstance.get(`/product-categories${query}`);
  },
  getCategoryBySlug(slug = "") {
    return axiosInstance.get(`/product-categories/${slug}`);
  },
  getProductReview(slug = "") {
    return axiosInstance.get(`reviews/product/${slug}`);
  },
};
