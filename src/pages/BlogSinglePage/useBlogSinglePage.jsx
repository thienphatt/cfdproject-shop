import { useParams } from "react-router-dom";
import useQuery from "../../hook/useQuery";
import { blogService } from "../../services/blogService";
import { useEffect } from "react";
import useMutation from "../../hook/useMutation";

export const useBLogSinglePage = () => {
    const { slug } = useParams();

    const {
        data: blogDetailData,
        loading: blogLoading,
        execute,
    } = useMutation(() => {
        return blogService.getBlogDetail(slug);
    });

    useEffect(() => {
        execute(slug);
    }, [slug]);

    const cateBlogDetailId = blogDetailData?.category?.id || "";

    const { data: cateData, refetch } = useQuery(() => {
        return blogService.getBlog();
    });

    const cateBlogByCate = cateData?.blogs?.filter(
        (blog) => blog?.category?.id === cateBlogDetailId
    );

    const blogsRelated = cateBlogByCate || [];

    const breadcrumbProp = blogDetailData?.name || "";

    const blogPostProps = {
        blogDetailData,
        blogsRelated,
    };

    return {
        breadcrumbProp,
        blogPostProps,
    };
};
