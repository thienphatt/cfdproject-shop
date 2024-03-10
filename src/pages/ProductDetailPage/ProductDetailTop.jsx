import React, { useEffect } from "react";
import ProductImageZoom from "../../components/ProductImageZoom";
import { PATHS } from "../../constants/paths";
import { formatCurrency, transformNumberToPrecent } from "../../utils/format";
import ProductColor from "../../components/ProductColor";
import ProductQuantity from "../../components/ProductQuantity";
import { Link } from "react-router-dom";
import ShareLink from "../../components/ShareLink";

const ProductDetailTop = ({
    images,
    name,
    rating,
    reviews,
    price,
    discount,
    description,
    color,
    category,
    stock,
    colorRef,
    quantityRef,
    handleAddToCart,
    handleAddToWhisList,
}) => {
    // lấy pathURL để bỏ vào để share social
    const pathUrl = window.location.href;

    const categoryPath =
        category?.id && PATHS.PRODUCT + `?category=${category?.id}`;

    // change title page
    useEffect(() => {
        document.title = name || "CFD Shop";
        return () => {
            document.title = "CFD Shop";
        };
    }, [name]);

    // click Add to cart
    const _onAddToCart = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        handleAddToCart?.();
    };

    //Click add to wish list
    const _onAddToWishList = (e) => {
        e?.stopPropagation();
        e?.preventDefault();
        handleAddToWhisList?.();
    };
    return (
        <div className="product-details-top">
            <div className="row">
                <div className="col-md-6">
                    <ProductImageZoom images={images} />
                </div>
                <div className="col-md-6">
                    <div className="product-details">
                        <h1 className="product-title">{name || ""}</h1>
                        <div className="ratings-container">
                            <div className="ratings">
                                <div
                                    className="ratings-val"
                                    style={{
                                        width: `${transformNumberToPrecent(
                                            rating
                                        )}%`,
                                    }}
                                />
                            </div>
                            <a
                                className="ratings-text"
                                href="#product-review-link"
                                id="review-link"
                            >
                                ( {reviews?.length} Reviews )
                            </a>
                        </div>
                        <div className="product-price">
                            {" "}
                            ${formatCurrency(price - discount || 0)}
                        </div>
                        <div
                            className="product-content"
                            dangerouslySetInnerHTML={{ __html: description }}
                        ></div>
                        <div className="details-filter-row details-row-size">
                            <label>Color:</label>
                            <ProductColor ref={colorRef} colors={color} />
                        </div>
                        <div className="details-filter-row details-row-size">
                            <label htmlFor="qty">Qty:</label>
                            <ProductQuantity
                                className="product-details-quantity"
                                max={stock}
                                ref={quantityRef}
                            />
                        </div>
                        <div className="product-details-action">
                            <a
                                href="#"
                                className="btn-product btn-cart"
                                onClick={(e) => _onAddToCart(e)}
                            >
                                <span>add to cart</span>
                            </a>
                            <div className="details-action-wrapper">
                                <a
                                    href="#"
                                    className="btn-product btn-wishlist"
                                    title="Wishlist"
                                    onClick={(e) => _onAddToWishList(e)}
                                >
                                    <span>Add to Wishlist</span>
                                </a>
                            </div>
                        </div>
                        <div className="product-details-footer">
                            <div className="product-cat">
                                <span>Category:</span>
                                <Link to={categoryPath}>{category?.name}</Link>
                            </div>
                            <div className="social-icons social-icons-sm">
                                <span className="social-label">Share:</span>
                                <ShareLink path={pathUrl} title={"Facebook"}>
                                    <i className="icon-facebook-f" />
                                </ShareLink>
                                <ShareLink
                                    path={pathUrl}
                                    title={"Twitter"}
                                    type="twitter"
                                >
                                    <i className="icon-twitter" />
                                </ShareLink>
                                <ShareLink
                                    path={pathUrl}
                                    title={"Instagram"}
                                    type="nstagram"
                                >
                                    <i className="icon-instagram" />
                                </ShareLink>
                                <ShareLink
                                    path={pathUrl}
                                    title={"Pinterest"}
                                    type="pinterest"
                                >
                                    <i className="icon-pinterest" />
                                </ShareLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailTop;
