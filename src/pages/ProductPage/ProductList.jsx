import { Empty, Skeleton } from "antd";
import React from "react";
import styled from "styled-components";
import ProductCard from "../../components/ProductCard";

const ProductSkeletonStyle = styled.div`
    display: flex;
    gap: 10px;
    flex-direction: column;
    padding-bottom: 5%;
`;

const ProductList = ({ products, isLoading, isError }) => {
    if ((!!!isLoading && products?.length < 1) || isError) {
        return (
            <Empty
                description="There is no products"
                style={{ margin: "50px auto" }}
            />
        );
    }

    if (isLoading) {
        return (
            <div className="products mb-3">
                <div className="row justify-content-center">
                    {new Array(9).fill("").map((_, i) => (
                        <ProductSkeletonStyle
                            key={i}
                            className="col-6 col-md-4 col-lg-4"
                        >
                            <Skeleton.Image
                                active
                                style={{ width: "100%", height: 275 }}
                            />
                            <Skeleton.Input />
                            <Skeleton.Input block />
                        </ProductSkeletonStyle>
                    ))}
                </div>
            </div>
        );
    }
    return (
        <div className="products mb-3">
            <div className="row justify-content-center">
                {products?.map((product, i) => (
                    <div
                        key={product.id || i}
                        className="col-6 col-md-4 col-lg-4"
                    >
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
