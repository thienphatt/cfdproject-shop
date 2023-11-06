import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { PATHS } from "../../constants/paths";
import useProductPage from "../../hook/useProductPage";
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import ProductsFilter from "./ProductsFilter";
import ToolBox from "./ToolBox";

const ProductPage = () => {
    const { productListProps, paginationProps, toolboxProps, filterProps } =
        useProductPage();

    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{
                    backgroundImage: 'url("assets/images/page-header-bg.jpg")',
                }}
            >
                <div className="container">
                    <h1 className="page-title">Product</h1>
                </div>
            </div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={PATHS.HOME}>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item isActive>Product</Breadcrumb.Item>
            </Breadcrumb>
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-9">
                            <ToolBox {...toolboxProps} />
                            <ProductList {...productListProps} />
                            <Pagination {...paginationProps} />
                        </div>
                        <ProductsFilter {...filterProps} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;
