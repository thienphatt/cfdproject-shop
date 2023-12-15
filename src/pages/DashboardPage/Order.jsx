import { CaretRightOutlined } from "@ant-design/icons";
import { Collapse, Empty, Modal, theme } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { PATHS } from "../../constants/paths";
import useQuery from "../../hook/useQuery";
import { orderService } from "../../services/orderServices";
import {
    capitalizeFirstLetter,
    formatDate,
    wrongUrlImg,
} from "../../utils/format";

const OrderItem = styled.div`
    .info {
        padding: 10px 20px;
        border: 1px #ddd solid;
        margin: 10px 0;
        .wrapInfo {
            display: grid;
            grid-template-columns: 1fr 1fr;
        }
    }
    .table-container {
        .product-col .product {
            background-color: inherit;
            .product-title {
                display: inline-block;
                color: #1a1a1a;
                font-weight: 400;
                font-size: 1.6rem;
                margin: 0;
                .nav-dashboard {
                    margin: 0;
                    .nav-link {
                        border: none;
                        padding-block: 0;
                        margin-bottom: 0;
                        cursor: pointer;
                    }
                }
            }
        }
        .wrapInfo {
            display: flex;
            justify-content: space-between;
            label {
                font-size: 18px;
            }
        }
    }
`;

const Order = () => {
    const { data: getOrder } = useQuery(orderService.getOrder);
    const { orders } = getOrder || {};
    const [open, setOpen] = useState(false);
    const getItem = (panelStyle) => {
        return orders?.reverse().map((order, index) => {
            const {
                id,
                address,
                createdAt,
                note,
                shipping,
                product,
                quantity,
                totalProduct,
                total,
                subTotal,
                discount,
                isReview,
            } = order || {};
            const { email, fullName, phone, street } = address || {};

            return {
                key: index,
                label: (
                    <div>
                        <h6 style={{ display: "inline" }}>
                            {`Order code: #${id || ""}`}{" "}
                        </h6>
                        <span>{`( ${formatDate(
                            createdAt,
                            "MMM DD, YYYY"
                        )} )`}</span>
                    </div>
                ),
                style: panelStyle,
                children: (
                    <OrderItem className="orderItem">
                        <div className="info">
                            <div className="wrapInfo">
                                <label>
                                    Name: <strong>{fullName}</strong>
                                </label>
                                <label>
                                    Phone: <strong>{phone}</strong>
                                </label>
                                <label>
                                    Email: <strong>{email}</strong>
                                </label>
                                <label>
                                    Address:{" "}
                                    <strong>
                                        {street?.slice(0, street?.indexOf(","))}
                                    </strong>
                                </label>
                                <label>
                                    Note: <strong>{note}</strong>
                                </label>
                                <label>
                                    Type Shipping:{" "}
                                    <strong>
                                        {capitalizeFirstLetter(
                                            shipping?.typeShip
                                        )}
                                    </strong>
                                </label>
                            </div>
                        </div>
                        <div className="table-container">
                            <table className="table table-cart table-mobile">
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th className="text-center">Price</th>
                                        <th className="text-center">
                                            Quantity
                                        </th>
                                        <th className="text-center">Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {product?.map((item, index) => {
                                        const {
                                            id,
                                            name,
                                            slug,
                                            price,
                                            images,
                                        } = item || {};
                                        return (
                                            <tr key={id}>
                                                <td className="product-col">
                                                    <div className="product">
                                                        <figure className="product-media">
                                                            <Link
                                                                to={`${PATHS.PRODUCT}/${slug}`}
                                                            >
                                                                <img
                                                                    src={wrongUrlImg(
                                                                        images?.[0]
                                                                    )}
                                                                    alt={name}
                                                                />
                                                            </Link>
                                                        </figure>
                                                        <h3 className="product-title">
                                                            <Link
                                                                to={`${PATHS.PRODUCT}/${slug}`}
                                                            >
                                                                {name}
                                                            </Link>
                                                            <div className="nav-dashboard reviewOrder">
                                                                {!!!isReview[
                                                                    index
                                                                ] ? (
                                                                    <p
                                                                        className="nav-link active"
                                                                        onClick={(
                                                                            e,
                                                                            index
                                                                        ) =>
                                                                            _onReview(
                                                                                e,
                                                                                index
                                                                            )
                                                                        }
                                                                    >
                                                                        Review
                                                                    </p>
                                                                ) : (
                                                                    <Link
                                                                        to={`${PATHS.PRODUCT}/${slug}`}
                                                                        className="nav-link active"
                                                                    >
                                                                        Already
                                                                        Reviewed
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </h3>
                                                    </div>
                                                </td>
                                                <td className="price-col text-center">
                                                    ${price}
                                                </td>
                                                <td className="quantity-col text-center">
                                                    {quantity[index]}
                                                </td>
                                                <td className="total-col text-center">
                                                    ${totalProduct[index]}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            <div className="orderPrice">
                                <div className="wrapInfo price">
                                    <label>
                                        SubTotal: <strong>{subTotal}$</strong>
                                    </label>
                                    <label>
                                        Discount: <strong>{discount}$</strong>
                                    </label>
                                    <label>
                                        Price Shipping:{" "}
                                        <strong>{shipping.price}$</strong>
                                    </label>
                                    <label>
                                        Total: <strong>{total}$</strong>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </OrderItem>
                ),
            };
        });
    };

    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: "none",
    };

    const handleOk = () => {
        setOpen(false);
    };
    const handleCancel = () => {
        setOpen(false);
    };

    const _onReview = (e, index) => {
        e?.stopPropagation();
        e?.preventDefault();
        return <Modal open={setOpen(true)}></Modal>;
    };

    return (
        <>
            <div
                className="tab-pane fade show active"
                id="tab-orders"
                role="tabpanel"
                aria-labelledby="tab-orders-link"
            >
                {orders?.length > 0 ? (
                    <div className="order">
                        <h2>My list ordered:</h2>
                        <Collapse
                            bordered={false}
                            defaultActiveKey={["0"]}
                            expandIcon={({ isActive }) => (
                                <CaretRightOutlined
                                    rotate={isActive ? 90 : 0}
                                />
                            )}
                            style={{
                                background: token.colorBgContainer,
                            }}
                            items={getItem(panelStyle)}
                        />
                    </div>
                ) : (
                    <Empty
                        description={
                            <>
                                <p>No order has been made yet</p>
                                <Link
                                    to={PATHS.PRODUCT}
                                    className="btn btn-outline-primary-2"
                                >
                                    Go to Shop
                                </Link>
                            </>
                        }
                    />
                )}
            </div>
            <Modal
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            />
        </>
    );
};

export default Order;
