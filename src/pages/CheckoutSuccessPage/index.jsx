import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import useQuery from "../../hook/useQuery";
import { orderService } from "../../services/orderServices";

const CheckoutSuccessPage = () => {
    // const check = useCheckoutSuccess();

    const { data: myOder } = useQuery(orderService.getOrder);

    const orderId = myOder?.orders?.[myOder?.orders?.length - 1]?.id;

    return (
        <main className="main">
            <div className="content-success text-center">
                <div className="container">
                    <h1 className="content-title">Your Order is Completed!</h1>
                    <p>
                        Your order #<strong>{orderId || ""}</strong> has been
                        completed. Your order details are shown for your
                        personal accont.
                    </p>
                    <Link
                        to={PATHS.PROFILE.ORDER}
                        className="btn btn-outline-primary-2 btn-minwidth-lg"
                    >
                        <span>VIEW MY ORDERS</span>
                        <i className="icon-long-arrow-right" />
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default CheckoutSuccessPage;
