import axiosInstance from "../utils/axiosIntance";

export const blogService = {
    getBlog(query = "") {
        return axiosInstance.get(`/blogs${query}`);
    },
    getBlogDetail(slug = "") {
        return axiosInstance.get(`/blogs/${slug}`);
    },
    getBlogBySlug(slug = "") {
        return axiosInstance.get(`/blogs/${slug}`);
    },
    getBlogCategories() {
        return axiosInstance.get(`/blog-categories`);
    },
    getBlogCategoryBySlug(slug = "") {
        return axiosInstance.get(`/blog-categories/${slug}`);
    },
    getBlogTags() {
        return axiosInstance.get(`/blog-tags`);
    },
};
