import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import Pagination from "../ProductPage/Pagination";
import useBlogPage from "./useBlogPage";
import BlogList from "./BlogList";
import AsideBlogPage from "./asideBlogPage";

const BlogPage = () => {
    const { blogListProps, pagiProps, asideBlogProps } = useBlogPage();
    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{
                    backgroundImage: 'url("assets/images/page-header-bg.jpg")',
                }}
            >
                <div className="container">
                    <h1 className="page-title">Blog</h1>
                </div>
            </div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={"/"}>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item isActive>Blog</Breadcrumb.Item>
            </Breadcrumb>
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <BlogList {...blogListProps} />
                            <Pagination {...pagiProps} />

                            {/* <nav aria-label="Page navigation">
                                <ul className="pagination">
                                    <li className="page-item disabled">
                                        <a
                                            className="page-link page-link-prev"
                                            href="#"
                                            aria-label="Previous"
                                            tabIndex={-1}
                                            aria-disabled="true"
                                        >
                                            <span aria-hidden="true">
                                                <i className="icon-long-arrow-left" />
                                            </span>
                                            Prev{" "}
                                        </a>
                                    </li>
                                    <li
                                        className="page-item active"
                                        aria-current="page"
                                    >
                                        <a className="page-link" href="#">
                                            1
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a className="page-link" href="#">
                                            2
                                        </a>
                                    </li>
                                    <li className="page-item">
                                        <a
                                            className="page-link page-link-next"
                                            href="#"
                                            aria-label="Next"
                                        >
                                            {" "}
                                            Next{" "}
                                            <span aria-hidden="true">
                                                <i className="icon-long-arrow-right" />
                                            </span>
                                        </a>
                                    </li>
                                </ul>
                            </nav> */}
                        </div>
                        <AsideBlogPage {...asideBlogProps} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BlogPage;
