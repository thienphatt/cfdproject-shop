import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import { formatCurrency } from "../../utils/format";
import { Modal } from "antd";
import ProductColor from "../../components/ProductColor";
import ProductQuantity from "../../components/ProductQuantity";
import styled from "styled-components";

const ProductTilte = styled.h3`
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

const CartTable = ({
    products,
    handleRemoveProduct,
    quantityRef,
    handleUpdateQuantity,
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
        <div className="col-lg-9">
            {products?.length > 0 ? (
                <table className="table table-cart table-mobile">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {products?.map((product, i) => {
                            const {
                                images,
                                name,
                                price,
                                quantity,
                                totalProduct,
                                id,
                                slug,
                                variant,
                            } = product;
                            const productPath = PATHS.PRODUCT + `/${slug}`;

                            let imgPath = images?.[0];

                            if (imgPath?.slice("http")?.length > 2) {
                                imgPath =
                                    "https" + imgPath?.split("https").slice(-1);
                            }

                            return (
                                <tr key={id + i}>
                                    <td className="product-col">
                                        <div className="product">
                                            <figure className="product-media">
                                                <Link to={productPath}>
                                                    <img
                                                        src={imgPath}
                                                        alt="Product image"
                                                    />
                                                </Link>
                                            </figure>
                                            <ProductTilte className="product-title">
                                                <Link to={productPath}>
                                                    {name}
                                                </Link>
                                                <div className="cart-product-quantity">
                                                    Color :{" "}
                                                    <ProductColor
                                                        colors={[variant]}
                                                    />
                                                </div>
                                            </ProductTilte>
                                        </div>
                                    </td>
                                    <td className="price-col">
                                        $ {formatCurrency(price, 2)}
                                    </td>
                                    <td className="quantity-col">
                                        <ProductQuantity
                                            className="cart-product-quantity"
                                            defaultValue={quantity}
                                            ref={quantityRef}
                                            max={100}
                                            onChange={(value) => {
                                                handleUpdateQuantity(value, i);
                                            }}
                                        />
                                        {/* <div className="cart-product-quantity">
                                            <input
                                                type="number"
                                                className="form-control"
                                                defaultValue={quantity}
                                                min={1}
                                                max={100}
                                                step={1}
                                                data-decimals={0}
                                                required
                                            />
                                        </div> */}
                                    </td>
                                    <td className="total-col">
                                        $ {formatCurrency(totalProduct, 2)}
                                    </td>
                                    <td className="remove-col">
                                        <button
                                            onClick={(e) => _onRemoveCart(e, i)}
                                            className="btn-remove"
                                        >
                                            <i className="icon-close" />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                        {/* <tr>
                        <td className="product-col">
                            <div className="product">
                                <figure className="product-media">
                                    <a href="#">
                                        <img
                                            src="assets/images/demos/demo-3/products/product-6.jpg"
                                            alt="Product image"
                                        />
                                    </a>
                                </figure>
                                <h3 className="product-title">
                                    <a href="#">
                                        Beige knitted elastic runner shoes
                                    </a>
                                </h3>
                            </div>
                        </td>
                        <td className="price-col">$84.00</td>
                        <td className="quantity-col">
                            <div className="cart-product-quantity">
                                <input
                                    type="number"
                                    className="form-control"
                                    defaultValue={1}
                                    min={1}
                                    max={10}
                                    step={1}
                                    data-decimals={0}
                                    required
                                />
                            </div>
                        </td>
                        <td className="total-col">$84.00</td>
                        <td className="remove-col">
                            <button className="btn-remove">
                                <i className="icon-close" />
                            </button>
                        </td>
                    </tr>
                    <tr>
                        <td className="product-col">
                            <div className="product">
                                <figure className="product-media">
                                    <a href="#">
                                        <img
                                            src="assets/images/demos/demo-3/products/product-2-2.jpg"
                                            alt="Product image"
                                        />
                                    </a>
                                </figure>
                                <h3 className="product-title">
                                    <a href="#">
                                        Blue utility pinafore denim dress
                                    </a>
                                </h3>
                            </div>
                        </td>
                        <td className="price-col">$76.00</td>
                        <td className="quantity-col">
                            <div className="cart-product-quantity">
                                <input
                                    type="number"
                                    className="form-control"
                                    defaultValue={1}
                                    min={1}
                                    max={10}
                                    step={1}
                                    data-decimals={0}
                                    required
                                />
                            </div>
                        </td>
                        <td className="total-col">$76.00</td>
                        <td className="remove-col">
                            <button
                                onClick={_onRemoveCart}
                                className="btn-remove"
                            >
                                <i className="icon-close" />
                            </button>
                        </td>
                    </tr> */}
                    </tbody>
                </table>
            ) : (
                <p>
                    There is no any product in cart -{" "}
                    <Link to={PATHS.PRODUCT}>Go to Shop</Link>
                </p>
            )}

            {/* <div className="cart-bottom">
                <div className="cart-discount">
                    <form action="#">
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control input-error"
                                required
                                placeholder="Coupon code"
                            />
                            <div className="input-group-append">
                                <button
                                    className="btn btn-outline-primary-2"
                                    type="submit"
                                >
                                    <i className="icon-long-arrow-right" />
                                </button>
                            </div>
                        </div>
                        <p className="form-error">Please fill in this field</p>
                    </form>
                </div>
                <a href="#" className="btn btn-outline-dark-2">
                    <span>UPDATE CART</span>
                    <i className="icon-refresh" />
                </a>
            </div> */}
        </div>
    );
};

export default CartTable;
