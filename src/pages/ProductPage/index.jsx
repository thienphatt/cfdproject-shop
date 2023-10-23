import React from "react";
import useProductPage from "../../hook/useProductPage";
import Breadcrumb from "../../components/Breadcrumb";
import ToolBox from "./ToolBox";
import ProductList from "./ProductList";
import Pagination from "./Pagination";
import ProductsFilter from "./ProductsFilter";

const ProductPage = () => {
  const { productListProps, paginationProps, toolboxProps, filterProps } =
    useProductPage();
  return (
    <main className="main">
      <div
        className="page-header text-center"
        style={{ backgroundImage: 'url("assets/images/page-header-bg.jpg")' }}
      >
        <div className="container">
          <h1 className="page-title">Product</h1>
        </div>
      </div>
      <Breadcrumb></Breadcrumb>
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
