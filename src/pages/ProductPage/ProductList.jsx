import { Empty, Skeleton } from "antd";
import React from "react";
import ProductCard from "../../components/ProductCard";
import useDebounce from "../../hook/useDebounce";

const ProductList = ({ products, isLoading, productsError }) => {
  const loading = useDebounce(isLoading, 2000);

  if ((!loading && products?.length < 1) || productsError)
    return (
      <Empty
        description="There is no products"
        style={{ margin: "50px auto" }}
      />
    );

  // if (loading) return;

  // Array(9)
  //   .fill("")
  //   .map((_, index) => (
  //     <div key={index} className="col-6 col-md-4 col-lg-4">
  //       <Skeleton active />
  //     </div>
  //   ));

  return (
    <div className="products mb-3">
      <div className="row justify-content-center">
        {loading
          ? Array(9)
              .fill("")
              .map((_, i) => (
                <div key={i} className="col-6 col-md-4 col-lg-4">
                  <Skeleton.Image size="large" active />
                  <br />
                  <Skeleton />
                </div>
              ))
          : products?.map((product, i) => (
              <div key={product.id || i} className="col-6 col-md-4 col-lg-4">
                <ProductCard product={product} />
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProductList;
