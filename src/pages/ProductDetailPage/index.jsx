import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { PATHS } from "../../constants/paths";
import useProductDetailPage from "../../hook/useProducdetailPage";
import ProductDetailTab from "./ProductDetailTab";
import ProductDetailTop from "./ProductDetailTop";

const ProductDetailPage = () => {
  const { productDetailName, productDetailTopProps, productDetailTabProps } =
    useProductDetailPage();
  return (
    <main className="main">
      <nav aria-label="breadcrumb" className="breadcrumb-nav border-0 mb-0">
        <div className="container d-flex align-items-center">
          <Breadcrumb>
            <Breadcrumb.Item>
              <Link to={PATHS.HOME}>Home</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={PATHS.PRODUCT}>Product</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item isActive>
              {productDetailName || ""}
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </nav>
      <div className="page-content">
        <div className="container">
          <ProductDetailTop {...productDetailTopProps} />
          <ProductDetailTab {...productDetailTabProps} />
        </div>
      </div>
    </main>
  );
};

export default ProductDetailPage;
