import styled from "styled-components";
import { PATHS } from "../../constants/paths";
import { Link } from "react-router-dom";
import { Empty } from "antd";
import { formatCurrency, transformNumberToPrecent } from "../../utils/format";
import { useDispatch } from "react-redux";
import { handleAddCart } from "../../store/reducers/cartReducer";
import tokenMethod from "../../utils/token";
import { handleShowModal } from "../../store/reducers/authReducer";
import { MODAL_TYPE } from "../../constants/general";
import useQuery from "../../hook/useQuery";
import { productService } from "../../services/productService";

const ImageWrapper = styled.div`
    width: 100%;
    height: 315px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #c1c1c1;
`;

const ProductCard = ({ product }) => {
    const dispatch = useDispatch();

    console.log("check");

    const { id, slug, title, price, rating, images, discount, color } =
        product || {};

    const { data: productDetailReviews } = useQuery(
        () => id && productService.getProductReview(id),
        [id]
    );

    const review = productDetailReviews?.length;

    const productPath = PATHS.PRODUCT + `/${slug}`;

    const _onAddToCart = (e) => {
        e?.preventDefault();

        if (tokenMethod?.get()) {
            // handAPI
            const payload = {
                addedId: id,
                addedColor: color?.[0] || "",
                addedQuantity: 1,
                addedPrice: price - discount,
            };

            // const res = dispatch(handleAddCart(addPayload)?.unwrap());
            const res = dispatch(handleAddCart(payload));
        } else {
            dispatch(handleShowModal(MODAL_TYPE.login));
        }

        // const payload = {
        //     addedId: id,
        //     addedColor: color?.[0] || "",
        //     addedQuantity: 1,
        //     addedPrice: price - discount,
        // };
        // dispatch(handleAddCart(payload));
    };

    return (
        <div className="product product-2">
            <figure className="product-media">
                {discount > 0 && (
                    <span className="product-label label-circle label-sale">
                        Sale
                    </span>
                )}
                {/* Cố định height hình ảnh để tránh tình trạng kích thước ảnh không đồng bộ */}
                <Link to={productPath} style={{ height: 275 }}>
                    {images?.length > 0 ? (
                        <img
                            src={images[0]}
                            alt="Product image"
                            className="product-image"
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <ImageWrapper>
                            <Empty
                                description=""
                                // props này mặc định của Antd Empty, dùng để thay đổi ảnh của Empty
                                image={Empty.PRESENTED_IMAGE_SIMPLE}
                            />
                        </ImageWrapper>
                    )}
                </Link>
                <div className="product-action-vertical">
                    <a
                        href="#"
                        className="btn-product-icon btn-wishlist btn-expandable"
                    >
                        <span>add to wishlist</span>
                    </a>
                </div>
                <div className="product-action product-action-dark">
                    <a
                        role="button"
                        className="btn-product btn-cart"
                        title="Add to cart"
                        onClick={_onAddToCart}
                    >
                        <span style={{ cursor: "pointer" }}>add to cart</span>
                    </a>
                </div>
            </figure>
            <div className="product-body">
                <h3 className="product-title">
                    <Link to={productPath}>{title || ""}</Link>
                </h3>
                <div className="product-price">
                    {discount ? (
                        <>
                            {" "}
                            <span className="new-price">
                                ${formatCurrency(price - discount)}
                            </span>
                            <span className="old-price">
                                Was ${formatCurrency(price)}
                            </span>{" "}
                        </>
                    ) : (
                        <>${formatCurrency(price || 0)}</>
                    )}
                </div>
                <div className="ratings-container">
                    <div className="ratings">
                        <div
                            className="ratings-val"
                            style={{
                                width: `${transformNumberToPrecent(rating)}%`,
                            }}
                        />
                    </div>
                    <span className="ratings-text">( {review} Reviews )</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
