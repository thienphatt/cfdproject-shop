import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import styled from "styled-components";
import { formatDate } from "../../utils/format";
import useDebounce from "../../hook/useDebounce";
import { Skeleton, Space } from "antd";

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

const BlogList = ({ blogs, isLoading }) => {
    let loading = useDebounce(isLoading, 1000);

    // loading = true;

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
            )}

            {/* <div className="entry-item col-sm-6">
                <article className="entry entry-grid">
                    <figure className="entry-media">
                        <a href="blog-single.html">
                            <img
                                src="assets/images/blog/grid/3cols/post-1.jpg"
                                alt="image desc"
                            />
                        </a>
                    </figure>
                    <div className="entry-body">
                        <div className="entry-meta">
                            <span>Nov 22, 2018</span>
                            <span className="meta-separator">|</span>
                            <span className="entry-author">
                                {" "}
                                by <a href="#">John Doe</a>
                            </span>
                        </div>
                        <h2 className="entry-title">
                            <a href="blog-single.html">
                                Cras ornare tristique elit.
                            </a>
                        </h2>
                        <div className="entry-content">
                            <p>
                                Sed pretium, ligula sollicitudin laoreet
                                viverra, tortor libero sodales leo, eget blandit
                                nunc tortor eu nibh. Suspendisse potenti. Sed
                                egestas vulputate ...
                            </p>
                            <a href="blog-single.html" className="read-more">
                                Read More
                            </a>
                        </div>
                    </div>
                </article>
            </div>
            <div className="entry-item col-sm-6">
                <article className="entry entry-grid">
                    <figure className="entry-media">
                        <a href="blog-single.html">
                            <img
                                src="assets/images/blog/grid/3cols/post-2.jpg"
                                alt="image desc"
                            />
                        </a>
                    </figure>
                    <div className="entry-body">
                        <div className="entry-meta">
                            <span>Nov 22, 2018</span>
                            <span className="meta-separator">|</span>
                            <span className="entry-author">
                                {" "}
                                by <a href="#">John Doe</a>
                            </span>
                        </div>
                        <h2 className="entry-title">
                            <a href="blog-single.html">
                                Vivamus vestibulum ntulla necante.
                            </a>
                        </h2>
                        <div className="entry-content">
                            <p>
                                Morbi purus libero, faucibus commodo quis,
                                gravida id, est. Vestibulumvolutpat, lacus a
                                ultrices sagittis, mi neque euismod dui ...
                            </p>
                            <a href="blog-single.html" className="read-more">
                                Read More
                            </a>
                        </div>
                    </div>
                </article>
            </div>
            <div className="entry-item col-sm-6">
                <article className="entry entry-grid">
                    <figure className="entry-media">
                        <a href="blog-single.html">
                            <img
                                src="assets/images/blog/grid/3cols/post-5.jpg"
                                alt="image desc"
                            />
                        </a>
                    </figure>
                    <div className="entry-body">
                        <div className="entry-meta">
                            <span>Nov 22, 2018</span>
                            <span className="meta-separator">|</span>
                            <span className="entry-author">
                                {" "}
                                by <a href="#">John Doe</a>
                            </span>
                        </div>
                        <h2 className="entry-title">
                            <a href="blog-single.html">
                                Aenean dignissim pellente squefelis.
                            </a>
                        </h2>
                        <div className="entry-content">
                            <p>
                                Aliquam erat volutpat. Nam dui mi, tincidunt
                                quis, accumsan porttitor, facilisis luctus,
                                metus. Phasellus ultrices nulla quis nibh.
                                Quisque lectus ...{" "}
                            </p>
                            <a href="blog-single.html" className="read-more">
                                Read More
                            </a>
                        </div>
                    </div>
                </article>
            </div>
            <div className="entry-item col-sm-6">
                <article className="entry entry-grid">
                    <figure className="entry-media">
                        <a href="blog-single.html">
                            <img
                                src="assets/images/blog/grid/3cols/post-6.jpg"
                                alt="image desc"
                            />
                        </a>
                    </figure>
                    <div className="entry-body">
                        <div className="entry-meta">
                            <span>Nov 22, 2018</span>
                            <span className="meta-separator">|</span>
                            <span className="entry-author">
                                {" "}
                                by <a href="#">John Doe</a>
                            </span>
                        </div>
                        <h2 className="entry-title">
                            <a href="blog-single.html">
                                Quisque volutpat mattiseros.
                            </a>
                        </h2>
                        <div className="entry-content">
                            <p>
                                Nam dui mi, tincidunt quis, accumsan porttitor,
                                facilisis luctus, metus. Phasellus ultrices
                                nulla quis nibh. Quisque lectus. Donec
                                consectetuer ...{" "}
                            </p>
                            <a href="blog-single.html" className="read-more">
                                Read More
                            </a>
                        </div>
                    </div>
                </article>
            </div>
            <div className="entry-item col-sm-6">
                <article className="entry entry-grid">
                    <figure className="entry-media">
                        <a href="blog-single.html">
                            <img
                                src="assets/images/blog/grid/3cols/post-7.jpg"
                                alt="image desc"
                            />
                        </a>
                    </figure>
                    <div className="entry-body">
                        <div className="entry-meta">
                            <span>Nov 22, 2018</span>
                            <span className="meta-separator">|</span>
                            <span className="entry-author">
                                {" "}
                                by <a href="#">John Doe</a>
                            </span>
                        </div>
                        <h2 className="entry-title">
                            <a href="blog-single.html">
                                Utaliquam sollicitudin leo.
                            </a>
                        </h2>
                        <div className="entry-content">
                            <p>
                                Praesent dapibus, neque id cursus faucibus,
                                tortor neque egestas auguae, eu vulputate magna
                                eros eu erat. Aliquam erat volutpat ...{" "}
                            </p>
                            <a href="blog-single.html" className="read-more">
                                Read More
                            </a>
                        </div>
                    </div>
                </article>
            </div>
            <div className="entry-item col-sm-6">
                <article className="entry entry-grid">
                    <figure className="entry-media">
                        <a href="blog-single.html">
                            <img
                                src="assets/images/blog/grid/3cols/post-8.jpg"
                                alt="image desc"
                            />
                        </a>
                    </figure>
                    <div className="entry-body">
                        <div className="entry-meta">
                            <span>Nov 22, 2018</span>
                            <span className="meta-separator">|</span>
                            <span className="entry-author">
                                {" "}
                                by <a href="#">John Doe</a>
                            </span>
                        </div>
                        <h2 className="entry-title">
                            <a href="blog-single.html">Quisque a lectus. </a>
                        </h2>
                        <div className="entry-content">
                            <p>
                                Aliquam erat volutpat. Nam dui mi, tincidunt
                                quis, accumsan porttitor, facilisis luctus,
                                metus. Phasellus ultrices nulla quis nibh.
                                Quisque lectus ...{" "}
                            </p>
                            <a href="blog-single.html" className="read-more">
                                Read More
                            </a>
                        </div>
                    </div>
                </article>
            </div> */}
        </div>
    );
};

export default BlogList;
