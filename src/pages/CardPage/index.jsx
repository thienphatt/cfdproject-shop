import React from "react";
import { PATHS } from "../../constants/paths";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import CartSummary from "./CartSummary";
import CartTable from "./CartTable";
import useCartPage from "../../hook/useCartPage";

const CardPage = () => {
    const { cartSummaryProps, cartTableProps } = useCartPage();

    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{
                    backgroundImage: 'url("assets/images/page-header-bg.jpg")',
                }}
            >
                <div className="container">
                    <h1 className="page-title">Shopping Cart</h1>
                </div>
            </div>
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={PATHS.HOME}>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={PATHS.PRODUCT}>Product</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item isActive>Shopping Cart</Breadcrumb.Item>
            </Breadcrumb>
            <div className="page-content">
                <div className="cart">
                    <div className="container">
                        <div className="row">
                            <CartTable {...cartTableProps} />
                            <CartSummary {...cartSummaryProps} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CardPage;
