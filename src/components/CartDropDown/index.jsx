import { Modal } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATHS } from "../../constants/paths";
import { formatCurrency } from "../../utils/format";
import ProductColor from "../ProductColor";

const DropdownContainer = styled.div`
    max-height: 30vh;
    overflow-y: scroll;
    padding-right: 25px;

    // custom sroll
    &::-webkit-scrollbar {
        width: 10px;
        background-color: #f5f5f5;
        border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: #888;
    }
    &::-webkit-scrollbar-thumb:hover {
        border-radius: 10px;
        background-color: #555;
    }
`;

const ProductCartDetail = styled.div`
    .cart-product-quantity {
        display: flex;
        align-items: center;
        gap: 10px;
        .product-nav-dots {
            margin-bottom: 0;
            pointer-events: none;
        }
    }
`;

const HeaderCardDropDown = ({
    products,
    totalProduct,
    total,
    shipping,
    handleRemoveProduct,
}) => {
    const { confirm } = Modal;

    const _onRemoveCart = (e, i) => {
        e?.stopPropagation();
        e?.preventDefault();

        const removeProduct = products?.[i] || {};

        confirm({
            title: "Do you want remove this item from cart ?",
            content: (
                <>
                    <p>{removeProduct?.name || ""}</p>
                    <p>{`${removeProduct?.quantity || 0} x $ ${
                        formatCurrency(removeProduct?.price, 2) || 0
                    }`}</p>
                </>
            ),
            onOk() {
                if (i > -1) {
                    handleRemoveProduct?.(i);
                }
            },
            onCancel() {
                return false;
            },
        });
    };

    return (
        <div className="dropdown cart-dropdown">
            <a
                href="#"
                className="dropdown-toggle"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                data-display="static"
            >
                <i className="icon-shopping-cart" />
                <span className="cart-count">{products?.length || 0}</span>
            </a>
            <div
                className="dropdown-menu dropdown-menu-right"
                style={{ width: 400, zIndex: 999 }}
            >
                {products?.length > 0 ? (
                    <>
                        <DropdownContainer className="dropdown-cart-products">
                            {products?.map((product, i) => {
                                const {
                                    id,
                                    name,
                                    images,
                                    price,
                                    slug,
                                    quantity,
                                    variant,
                                    discount,
                                } = product;
                                const productPath = PATHS.PRODUCT + `/${slug}`;

                                let imgPath = images?.[0];

                                if (imgPath?.slice("http")?.length > 2) {
                                    imgPath =
                                        "https" +
                                        imgPath?.split("https").slice(-1);
                                }

                                return (
                                    <div key={id + i} className="product">
                                        <ProductCartDetail className="product-cart-details">
                                            <h4 className="product-title">
                                                <Link to={productPath}>
                                                    {name}
                                                </Link>
                                            </h4>
                                            <div className="cart-product-quantity">
                                                Color :{" "}
                                                <ProductColor
                                                    colors={[variant]}
                                                />
                                            </div>
                                            <span className="cart-product-info">
                                                {quantity} x $
                                                {formatCurrency(
                                                    price - discount,
                                                    2
                                                )}
                                            </span>
                                        </ProductCartDetail>
                                        <figure className="product-image-container">
                                            <Link
                                                to={productPath}
                                                className="product-image"
                                            >
                                                <img
                                                    src={imgPath}
                                                    alt="product"
                                                />
                                            </Link>
                                        </figure>
                                        <a
                                            href="#"
                                            className="btn-remove"
                                            title="Remove Product"
                                            onClick={(e) => _onRemoveCart(e, i)}
                                        >
                                            <i className="icon-close" />
                                        </a>
                                    </div>
                                );
                            })}
                        </DropdownContainer>
                        <div className="dropdown-cart-total">
                            <span>Total</span>
                            <span className="cart-total-price">
                                ${formatCurrency(totalProduct, 2)}
                            </span>
                        </div>
                        <div className="dropdown-cart-action">
                            <Link to={PATHS.CARD} className="btn btn-primary">
                                View Cart
                            </Link>
                            {shipping?.typeShip ? (
                                <Link
                                    to={PATHS.CHECKOUT}
                                    className="btn btn-outline-primary-2"
                                >
                                    <span>Checkout</span>
                                    <i className="icon-long-arrow-right" />
                                </Link>
                            ) : (
                                <></>
                            )}
                        </div>
                    </>
                ) : (
                    <p>
                        There is no any product in cart -{" "}
                        <Link to={PATHS.PRODUCT}>Go to Shop</Link>
                    </p>
                )}
            </div>
        </div>
    );
};

export default HeaderCardDropDown;
