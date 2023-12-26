import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import { formatDate } from "../../utils/format";
import { owlCarousels } from "../../utils/owlCarousels";

const BlogPostSection = ({ blogDetailData, blogsRelated }) => {
    const { description, image, tags, name, author, updatedAt } =
        blogDetailData || {};

    useEffect(() => {
        owlCarousels();
    }, [blogsRelated]);

    return (
        <div className="col-lg-9">
            <article className="entry single-entry">
                <div className="entry-body">
                    <figure className="entry-media">
                        <img src={image} alt="image desc" />
                    </figure>
                    <h1 className="entry-title entry-title-big">
                        {name || ""}
                    </h1>
                    <div className="entry-meta">
                        <span>{formatDate(updatedAt, "MMMM DD, YYYY")}</span>
                        <span className="meta-separator">|</span>
                        <span className="entry-author">
                            by <Link to={PATHS.BLOG}>{author || ""}</Link>
                        </span>
                    </div>
                    <div
                        className="entry-content editor-content"
                        dangerouslySetInnerHTML={{ __html: description }}
                    ></div>
                    <div className="entry-footer row no-gutters flex-column flex-md-row">
                        <div className="col-md">
                            <div className="entry-tags">
                                <span>Tags:</span>
                                {tags?.map((tag, i) => (
                                    <a key={i} href="#">
                                        photography
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="col-md-auto mt-2 mt-md-0">
                            <div className="social-icons social-icons-color">
                                <span className="social-label">
                                    Share this post:
                                </span>
                                <a
                                    href="#"
                                    className="social-icon social-facebook"
                                    title="Facebook"
                                    target="_blank"
                                >
                                    <i className="icon-facebook-f" />
                                </a>
                                <a
                                    href="#"
                                    className="social-icon social-twitter"
                                    title="Twitter"
                                    target="_blank"
                                >
                                    <i className="icon-twitter" />
                                </a>
                                <a
                                    href="#"
                                    className="social-icon social-pinterest"
                                    title="Pinterest"
                                    target="_blank"
                                >
                                    <i className="icon-pinterest" />
                                </a>
                                <a
                                    href="#"
                                    className="social-icon social-linkedin"
                                    title="Linkedin"
                                    target="_blank"
                                >
                                    <i className="icon-linkedin" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
            {/* <nav className="pager-nav" aria-label="Page navigation">
                <a
                    className="pager-link pager-link-prev"
                    href="blog-single.html"
                    aria-label="Previous"
                    tabIndex={-1}
                >
                    {" "}
                    Previous Post{" "}
                    <span className="pager-link-title">
                        Cras iaculis ultricies nulla
                    </span>
                </a>
                <a
                    className="pager-link pager-link-next"
                    href="blog-single.html"
                    aria-label="Next"
                    tabIndex={-1}
                >
                    {" "}
                    Next Post{" "}
                    <span className="pager-link-title">
                        Praesent placerat risus
                    </span>
                </a>
            </nav> */}
            <div className="related-posts">
                <h3 className="title">Related Posts</h3>
                {blogsRelated?.length > 0 && (
                    <div
                        className="owl-carousel owl-simple"
                        data-toggle="owl"
                        data-owl-options='{
                                      "nav": false, 
                                      "dots": true,
                                      "margin": 20,
                                      "loop": false,
                                      "responsive": {
                                          "0": {
                                              "items":1
                                          },
                                          "480": {
                                              "items":2
                                          },
                                          "768": {
                                              "items":3
                                          }
                                      }
                                  }'
                    >
                        {blogsRelated?.map((blog, index) => {
                            const { author, updatedAt, image, name, slug } =
                                blog || {};

                            return (
                                <article
                                    key={index}
                                    className="entry entry-grid"
                                >
                                    <figure className="entry-media">
                                        <a href="blog-single.html">
                                            <img src={image} alt={name} />
                                        </a>
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
                                                {" "}
                                                by{" "}
                                                <Link to={PATHS.BLOG}>
                                                    {author}
                                                </Link>
                                            </span>
                                        </div>
                                        <h2 className="entry-title">
                                            <Link to={`${PATHS.BLOG}/${slug}`}>
                                                {name}
                                            </Link>
                                        </h2>
                                    </div>
                                </article>
                            );
                        })}
                        {/* {blogsRelated?.map((blog, index) => (
                            <article key={index} className="entry entry-grid">
                                <figure className="entry-media">
                                    <a href="blog-single.html">
                                        <img
                                            src="/assets/images/blog/grid/3cols/post-1.jpg"
                                            alt="image desc"
                                        />
                                    </a>
                                </figure>
                                <div className="entry-body">
                                    <div className="entry-meta">
                                        <span>Nov 22, 2018</span>
                                        <span className="meta-separator">
                                            |
                                        </span>
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
                                </div>
                            </article>
                        ))} */}
                        {/* <article className="entry entry-grid">
                            <figure className="entry-media">
                                <a href="blog-single.html">
                                    <img
                                        src="/assets/images/blog/grid/3cols/post-1.jpg"
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
                            </div>
                        </article> */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPostSection;
