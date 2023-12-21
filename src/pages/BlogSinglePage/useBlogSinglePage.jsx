import { useParams } from "react-router-dom";
import useQuery from "../../hook/useQuery";
import { blogService } from "../../services/blogService";
import { useEffect } from "react";

export const useBLogSinglePage = () => {
    const { slug } = useParams();

    const { data: blogDetailData } = useQuery(() => {
        return blogService.getBlogDetail(slug);
    });

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
