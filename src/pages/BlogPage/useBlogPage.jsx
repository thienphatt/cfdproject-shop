import { useLocation, useSearchParams } from "react-router-dom";
import { FILTER_BLOG_PAGE } from "../../constants/general";
import useQuery from "../../hook/useQuery";
import { blogService } from "../../services/blogService";
import queryString from "query-string";
import { useEffect } from "react";

const useBlogPage = () => {
    const { search } = useLocation();

    const [_, setSearchParams] = useSearchParams();

    const query = queryString.parse(search);

    //API blog
    const {
        data: blogData,
        loading: blogLoading,
        refetch: fetchData,
    } = useQuery((query) =>
        blogService.getBlog(query || `?limit=${FILTER_BLOG_PAGE.limit}`)
    );
    const { blogs, pagination } = blogData || {};

    //API cateblog
    const { data: cateBlogData, loading: cateBlogLoading } = useQuery(() =>
        blogService.getBlogCategories()
    );
    const { blogs: cateBlogs } = cateBlogData || {};

    //API tagblog
    const { data: tagsData, loading: tagLoading } = useQuery(() =>
        blogService.getBlogTags()
    );

    const { blogs: tags } = tagsData || {};

    useEffect(() => {
        fetchData?.(search);
    }, [search]);

    const blogListProps = {
        blogs,
        isLoading: blogLoading,
    };

    const onPagiChange = (pageChange) => {
        setSearchParams({
            ...query,
            limit: FILTER_BLOG_PAGE.limit,
            page: pageChange,
        });
    };
    const pagiProps = {
        limit: Number(pagination?.limit),
        total: Number(pagination?.total),
        page: Number(pagination?.page || query?.page || 1),
        onPagiChange,
    };

    // aside props

    const handleFilteCate = (id) => {
        if (id) {
            setSearchParams({
                ...query,
                limit: FILTER_BLOG_PAGE.limit,
                category: id,
                page: 1,
            });
        }
    };

    const handleSearchBlog = (value) => {
        if (value) {
            setSearchParams({
                ...query,
                limit: FILTER_BLOG_PAGE.limit,
                search: value,
                page: 1,
            });
        } else {
            setSearchParams({
                limit: FILTER_BLOG_PAGE.limit,
                search: "",
                page: 1,
            });
        }
    };
    const asideBlogProps = {
        cateBlogs,
        blogLoading,
        tags,
        handleFilteCate,
        handleSearchBlog,
    };
    return {
        blogListProps,
        pagiProps,
        asideBlogProps,
    };
};

export default useBlogPage;
