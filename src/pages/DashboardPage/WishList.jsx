import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../../utils/format";
import { handleShowModal } from "../../store/reducers/authReducer";
import { Modal } from "antd";
import { handleRemoveToWishList } from "../../store/reducers/wishListReducer";
import { handleAddCart } from "../../store/reducers/cartReducer";
import tokenMethod from "../../utils/token";
import { PATHS } from "../../constants/paths";
import { Link } from "react-router-dom";

const WishList = () => {
    const { myWishList = 0 } = useSelector((state) => state.wishList);

    const dispatch = useDispatch();

    const { confirm } = Modal;

    const _onRemoveWishList = (id, title) => {
        console.log("title", title);
        confirm({
            title: "Do you want remove item from wish list ?",

            content: <p>{title || ""}</p>,

            onOk() {
                dispatch(handleRemoveToWishList(id));
            },
            onCancel() {
                return false;
            },
        });
    };

    const _onAddToCart = (product) => {
        const { id, color, price, discount } = product || {};
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
    };
    return (
        <div
            className="tab-pane fade show active"
            id="tab-wishlist"
            role="tabpanel"
            aria-labelledby="tab-wishlist-link"
        >
            {myWishList?.length > 0 ? (
                <table className="table table-wishlist table-mobile">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th className="text-center">Price</th>
                            <th className="text-center">Stock Status</th>
                            <th />
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {myWishList?.map((item, index) => {
                            const { images, id, title, price, stock, slug } =
                                item;
                            const imgPATH = `https://cfdshop.hn.ss.bfcplatform.vn/images/product/${images[0]}`;
                            const productPath = PATHS.PRODUCT + `/${slug}`;

                            return (
                                <tr key={id}>
                                    <td className="product-col">
                                        <div className="product">
                                            <figure className="product-media">
                                                <Link to={productPath}>
                                                    <img
                                                        src={imgPATH}
                                                        alt="Product image"
                                                    />
                                                </Link>
                                            </figure>
                                            <h3 className="product-title">
                                                <Link to={productPath}>
                                                    {title}
                                                </Link>
                                            </h3>
                                        </div>
                                    </td>
                                    <td className="price-col text-center">
                                        ${formatCurrency(price, 2)}
                                    </td>
                                    <td className="stock-col text-center">
                                        <span className="in-stock">
                                            {stock > 0 ? (
                                                <span className="in-stock">
                                                    In stock
                                                </span>
                                            ) : (
                                                <span className="out-of-stock">
                                                    Out of stock
                                                </span>
                                            )}
                                        </span>
                                    </td>
                                    <td className="action-col">
                                        {stock > 0 ? (
                                            <button
                                                className="btn btn-block btn-outline-primary-2"
                                                onClick={() =>
                                                    _onAddToCart(item)
                                                }
                                            >
                                                <i className="icon-cart-plus" />
                                                Add to Cart
                                            </button>
                                        ) : (
                                            <button className="btn btn-block btn-outline-primary-2 disabled">
                                                Out of Stock
                                            </button>
                                        )}
                                    </td>

                                    <td className="remove-col">
                                        <button
                                            className="btn-remove"
                                            onClick={() =>
                                                _onRemoveWishList(id, title)
                                            }
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
                                                src="assets/images/demos/demo-3/products/product-4.jpg"
                                                alt="Product image"
                                            />
                                        </a>
                                    </figure>
                                    <h3 className="product-title">
                                        <a href="#">Beige knitted</a>
                                    </h3>
                                </div>
                            </td>
                            <td className="price-col text-center">$84.00</td>
                            <td className="stock-col text-center">
                                <span className="in-stock">In stock</span>
                            </td>
                            <td className="action-col">
                                <button className="btn btn-block btn-outline-primary-2">
                                    <i className="icon-cart-plus" />
                                    Add to Cart{" "}
                                </button>
                            </td>
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
                                                src="assets/images/demos/demo-3/products/product-5.jpg"
                                                alt="Product image"
                                            />
                                        </a>
                                    </figure>
                                    <h3 className="product-title">
                                        <a href="#">Blue utility</a>
                                    </h3>
                                </div>
                            </td>
                            <td className="price-col text-center">$76.00</td>
                            <td className="stock-col text-center">
                                <span className="in-stock">In stock</span>
                            </td>
                            <td className="action-col">
                                <button className="btn btn-block btn-outline-primary-2">
                                    <i className="icon-cart-plus" />
                                    Add to Cart{" "}
                                </button>
                            </td>
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
                                                src="assets/images/demos/demo-3/products/product-6.jpg"
                                                alt="Product image"
                                            />
                                        </a>
                                    </figure>
                                    <h3 className="product-title">
                                        <a href="#">Orange saddle lock</a>
                                    </h3>
                                </div>
                            </td>
                            <td className="price-col text-center">$52.00</td>
                            <td className="stock-col text-center">
                                <span className="out-of-stock">
                                    Out of stock
                                </span>
                            </td>
                            <td className="action-col">
                                <button className="btn btn-block btn-outline-primary-2 disabled">
                                    Out of Stock
                                </button>
                            </td>
                            <td className="remove-col">
                                <button className="btn-remove">
                                    <i className="icon-close" />
                                </button>
                            </td>
                        </tr> */}
                    </tbody>
                </table>
            ) : (
                <p>There is no Product in Wish List</p>
            )}
        </div>
    );
};

export default WishList;
