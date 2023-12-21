import React from "react";
import useDebounce from "../../hook/useDebounce";

const AsideBlogPage = ({
    cateBlogs,
    blogLoading,
    tags,
    handleFilteCate,
    handleSearchBlog,
}) => {
    const _onClickCateBlog = (e, id) => {
        e?.stopPropagation();
        e?.preventDefault();
        handleFilteCate?.(id);
    };

    let timeoutId;

    const _onSearch = (value) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            handleSearchBlog?.(value || "");
        }, 500);
    };

    return (
        <aside className="col-lg-3">
            <div className="sidebar">
                <div className="widget widget-search">
                    <h3 className="widget-title">Search</h3>
                    <form action="#">
                        <label htmlFor="ws" className="sr-only">
                            Search in blog
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            name="ws"
                            id="ws"
                            placeholder="Search in blog"
                            required
                            onChange={(e) => _onSearch(e.target.value)}
                        />

                        <button
                            type="submit"
                            className="btn"
                            onClick={(e) => e.preventDefault()}
                        >
                            <i className="icon-search" />
                            {/* <span className="sr-only">Search</span> */}
                        </button>
                    </form>
                </div>
                <div className="widget widget-cats">
                    <h3 className="widget-title">Categories</h3>
                    <ul>
                        {cateBlogs?.map((blog) => {
                            const { id, name, slug } = blog;

                            return (
                                <li key={id}>
                                    <a
                                        href="#"
                                        onClick={(e) => _onClickCateBlog(e, id)}
                                    >
                                        {name}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
                {/* <div className="widget">
                    <h3 className="widget-title">Popular Posts</h3>
                    <ul className="posts-list">
                        <li>
                            <figure>
                                <a href="#">
                                    <img
                                        src="assets/images/blog/sidebar/post-1.jpg"
                                        alt="post"
                                    />
                                </a>
                            </figure>
                            <div>
                                <span>Nov 22, 2018</span>
                                <h4>
                                    <a href="#">
                                        Aliquam tincidunt mauris eurisus.
                                    </a>
                                </h4>
                            </div>
                        </li>
                        <li>
                            <figure>
                                <a href="#">
                                    <img
                                        src="assets/images/blog/sidebar/post-2.jpg"
                                        alt="post"
                                    />
                                </a>
                            </figure>
                            <div>
                                <span>Nov 19, 2018</span>
                                <h4>
                                    <a href="#">Cras ornare tristique elit.</a>
                                </h4>
                            </div>
                        </li>
                        <li>
                            <figure>
                                <a href="#">
                                    <img
                                        src="assets/images/blog/sidebar/post-3.jpg"
                                        alt="post"
                                    />
                                </a>
                            </figure>
                            <div>
                                <span>Nov 12, 2018</span>
                                <h4>
                                    <a href="#">
                                        Vivamus vestibulum ntulla nec ante.
                                    </a>
                                </h4>
                            </div>
                        </li>
                        <li>
                            <figure>
                                <a href="#">
                                    <img
                                        src="assets/images/blog/sidebar/post-4.jpg"
                                        alt="post"
                                    />
                                </a>
                            </figure>
                            <div>
                                <span>Nov 25, 2018</span>
                                <h4>
                                    <a href="#">
                                        Donec quis dui at dolor tempor interdum.
                                    </a>
                                </h4>
                            </div>
                        </li>
                    </ul>
                </div> */}
                <div className="widget widget-banner-sidebar">
                    <div className="banner-sidebar-title">ad box 280 x 280</div>
                    <div className="banner-sidebar banner-overlay">
                        <a href="#">
                            <img
                                src="/assets/images/blog/sidebar/banner.jpg"
                                alt="banner"
                            />
                        </a>
                    </div>
                </div>
                <div className="widget">
                    <h3 className="widget-title">Browse Tags</h3>
                    <div className="tagcloud">
                        {tags?.map((tag) => (
                            <a
                                key={tag?.id}
                                href="#"
                                onClick={(e) => e.preventDefault()}
                            >
                                {tag?.name}
                            </a>
                        ))}
                        {/* <a href="#">style</a>
                        <a href="#">women</a>
                        <a href="#">photography</a>
                        <a href="#">travel</a>
                        <a href="#">shopping</a>
                        <a href="#">hobbies</a> */}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AsideBlogPage;
