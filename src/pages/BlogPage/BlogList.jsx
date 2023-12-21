import { Empty, Skeleton } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { DESCRIPTION_ANT } from "../../constants/message";
import { PATHS } from "../../constants/paths";
import useDebounce from "../../hook/useDebounce";
import { formatDate } from "../../utils/format";

const TitleWarper = styled.h2`
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const SkeletonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
`;

const BlogList = ({ blogs = [], isLoading }) => {
    const loading = useDebounce(isLoading, 1000);

    if (!!!loading && blogs?.length < 1) {
        return (
            <Empty
                description={DESCRIPTION_ANT.empty.blog}
                style={{ margin: "50px auto" }}
            />
        );
    }
    return (
        <div className="entry-container max-col-2" data-layout="fitRows">
            {loading ? (
                Array(4)
                    .fill()
                    .map((_, index) => (
                        <div key={index} className="entry-item col-sm-6">
                            <SkeletonWrapper>
                                <Skeleton.Image
                                    active
                                    style={{
                                        width: "100%",
                                        height: 250,
                                    }}
                                />
                                <Skeleton.Input
                                    active
                                    style={{ height: 10, marginBlock: 5 }}
                                />
                                <Skeleton.Input
                                    active
                                    block
                                    style={{ height: 40, marginBottom: 10 }}
                                />
                                <Skeleton.Input
                                    active
                                    block
                                    style={{ height: 10 }}
                                />
                                <Skeleton.Input
                                    active
                                    block
                                    style={{ height: 10 }}
                                />
                                <Skeleton.Input
                                    active
                                    block
                                    style={{ height: 10 }}
                                />
                            </SkeletonWrapper>
                        </div>
                    ))
            ) : (
                <>
                    {blogs?.map((blog) => {
                        const { id, slug, image, name, author, updatedAt } =
                            blog;
                        return (
                            <div key={id} className="entry-item col-sm-6">
                                <article className="entry entry-grid">
                                    <figure className="entry-media">
                                        <Link to={`${PATHS.BLOG}/${slug}`}>
                                            <img src={image} alt={name} />
                                        </Link>
                                    </figure>
                                    <div className="entry-body">
                                        <div className="entry-meta">
                                            <span>
                                                {formatDate(
                                                    updatedAt,
                                                    "MMMM DD, YYYY"
                                                )}
                                            </span>
                                            <span className="meta-separator">
                                                |
                                            </span>
                                            <span className="entry-author">
                                                by{" "}
                                                <Link
                                                    to={`${PATHS.BLOG}/${slug}`}
                                                >
                                                    {author}
                                                </Link>
                                            </span>
                                        </div>
                                        <TitleWarper className="entry-title">
                                            <Link to={`${PATHS.BLOG}/${slug}`}>
                                                {name}
                                            </Link>
                                        </TitleWarper>
                                        <div className="entry-content">
                                            <p>
                                                Sed pretium, ligula sollicitudin
                                                laoreet viverra, tortor libero
                                                sodales leo, eget blandit nunc
                                                tortor eu nibh. Suspendisse
                                                potenti. Sed egestas vulputate
                                                ...
                                            </p>
                                            <Link
                                                to={`${PATHS.BLOG}/${slug}`}
                                                className="read-more"
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            </div>
                        );
                    })}
                </>
            )}{" "}
        </div>
    );
};

export default BlogList;
