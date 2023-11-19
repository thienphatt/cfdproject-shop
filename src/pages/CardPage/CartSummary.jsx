import { message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import { formatCurrency } from "../../utils/format";
import RadioGroup from "../../components/RadioGroup";
import { SHIPPING_OPTIONS } from "../../constants/general";

const CartSummary = ({
    subTotal,
    total,
    typeShip = 0,
    handleUpdateShipping,
}) => {
    const navigate = useNavigate();
    const _onProcessCheckout = (e) => {
        e?.preventDefault();

        if (!!!typeShip) {
            message.info("Please choose a shipping method");
        } else if (subTotal === 0) {
            message.info("There is no any product in cart");
        } else {
            navigate(PATHS.CHECKOUT);
        }
    };
    return (
        <aside className="col-lg-3">
            <div className="summary summary-cart">
                <h3 className="summary-title">Cart Total</h3>
                <table className="table table-summary">
                    <tbody>
                        <tr className="summary-subtotal">
                            <td>Subtotal:</td>
                            <td>${formatCurrency(subTotal, 2)}</td>
                        </tr>
                        <tr className="summary-shipping">
                            <td>Shipping:</td>
                            <td>&nbsp;</td>
                        </tr>
                        <RadioGroup
                            onChange={handleUpdateShipping}
                            defaultValue={typeShip || ""}
                        >
                            {SHIPPING_OPTIONS?.map((option, i) => {
                                return (
                                    <tr
                                        key={i}
                                        className="summary-shipping-row"
                                    >
                                        <td>
                                            <RadioGroup.Item
                                                value={option.value}
                                            >
                                                {option.label}
                                            </RadioGroup.Item>
                                        </td>
                                        <td>
                                            ${formatCurrency(option.price, 2)}
                                        </td>
                                    </tr>
                                );
                            })}
                        </RadioGroup>
                        {/* <tr className="summary-shipping-row">
                            <td>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        id="free-shipping"
                                        name="shipping"
                                        className="custom-control-input"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="free-shipping"
                                    >
                                        Free Shipping
                                    </label>
                                </div>
                            </td>
                            <td>$0.00</td>
                        </tr>
                        <tr className="summary-shipping-row">
                            <td>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        id="standart-shipping"
                                        name="shipping"
                                        className="custom-control-input"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="standart-shipping"
                                    >
                                        Standart:
                                    </label>
                                </div>
                            </td>
                            <td>$10.00</td>
                        </tr>
                        <tr className="summary-shipping-row">
                            <td>
                                <div className="custom-control custom-radio">
                                    <input
                                        type="radio"
                                        id="express-shipping"
                                        name="shipping"
                                        className="custom-control-input"
                                    />
                                    <label
                                        className="custom-control-label"
                                        htmlFor="express-shipping"
                                    >
                                        Express:
                                    </label>
                                </div>
                            </td>
                            <td>$20.00</td>
                        </tr> */}
                        <tr className="summary-shipping-estimate">
                            <td>
                                Estimate for Your Country <br />
                                <Link to={PATHS.DASHBOARD}>Change address</Link>
                            </td>
                            <td>&nbsp;</td>
                        </tr>
                        <tr className="summary-total">
                            <td>Total:</td>
                            <td>${formatCurrency(total, 2)}</td>
                        </tr>
                    </tbody>
                </table>
                <Link
                    onClick={(e) => _onProcessCheckout(e)}
                    className="btn btn-outline-primary-2 btn-order btn-block"
                >
                    PROCEED TO CHECKOUT
                </Link>
            </div>
            <Link
                to={PATHS.PRODUCT}
                className="btn btn-outline-dark-2 btn-block mb-3"
            >
                <span>CONTINUE SHOPPING</span>
                <i className="icon-refresh" />
            </Link>
        </aside>
    );
};

export default CartSummary;
