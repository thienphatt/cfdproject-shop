import React from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/Breadcrumb";
import { PATHS } from "../../constants/paths";
import CheckoutForm from "./CheckoutForm";
import CheckoutDiscount from "./CheckoutDiscount";
import useCheckoutPage from "../../hook/useCheckoutPage";

const CheckoutPage = () => {
    const { couponProps } = useCheckoutPage();
    return (
        <main className="main">
            <div
                className="page-header text-center"
                style={{
                    backgroundImage: 'url("/assets/images/page-header-bg.jpg")',
                }}
            >
                <div className="container">
                    <h1 className="page-title">Checkout</h1>
                </div>
            </div>

            <Breadcrumb>
                <Breadcrumb.Item>
                    <Link to={PATHS.HOME}>Home</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to={PATHS.PRODUCT}>Product</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item isActive>Checkout</Breadcrumb.Item>
            </Breadcrumb>

            <div className="page-content">
                <div className="checkout">
                    <div className="container">
                        <CheckoutDiscount {...couponProps} />
                        <CheckoutForm />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default CheckoutPage;
