import { Select, message } from "antd";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import { MESSAGE, REGREX } from "../../constants/validate";
import useAddress from "../../hook/useAddress";
import { formatCurrency, removeAccents } from "../../utils/format";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import { PAYMENT_METHOD } from "../../constants/general";

const WarpperForm = styled.form`
    .form-group {
        margin: 0;
    }
    .customSelect {
        display: flex;
        height: 40px;
        margin-bottom: 13px;
        div {
            color: #777;
            background-color: #f9f9f9 !important;
            border: 1px solid #ebebeb;
            border-radius: unset;
            &:hover {
                border-color: #fcb941 !important;
            }
        }
    }
`;

const CheckoutForm = ({ handleCheckoutPage }) => {
    const { profile } = useSelector((state) => state.auth);
    const { cartInfo } = useSelector((state) => state.cart);

    const [currentPaymenMethod, setCurrentPaymenMethod] = useState(
        PAYMENT_METHOD.cash
    );

    const {
        product,
        quantity,
        shipping,
        variant,
        total,
        subTotal,
        discount,
        discountCode,
        totalProduct,
    } = cartInfo || {};

    const renderProductInfo =
        product?.map((item, index) => {
            return {
                ...item,
                quantity: quantity?.[index],
                variant: variant?.[index],
                totalProduct: totalProduct?.[index],
            };
        }) || [];

    const {
        provinces,
        districts,
        wards,
        wardId,
        provinceId,
        districtId,
        handleDistrictChange,
        handleWardChange,
        handleProvinceChange,
    } = useAddress();

    const { firstName, phone, email, ward, province, district, street } =
        profile || {};
    const {
        register,
        handleSubmit,
        reset,
        getValues,
        formState: { errors },
        control,
    } = useForm({
        defaultValues: {
            firstName,
            phone,
            email,
            province,
            district,
            ward,
            street,
        },
    });

    useEffect(() => {
        if (!profile) return;
        reset?.({
            firstName,
            phone,
            email,
            ward,
            province,
            district,
            street,
        });
        handleProvinceChange?.(province);
        handleDistrictChange?.(district);
        handleWardChange?.(ward);
    }, [profile]);

    const _onProvinceChange = (changeId) => {
        handleProvinceChange(changeId);
        reset({
            ...getValues(),
            province: changeId,
            district: undefined,
            ward: undefined,
        });
    };
    const _onDistrictChange = (changeId) => {
        handleDistrictChange(changeId);
        reset({
            ...getValues(),
            district: changeId,
            ward: undefined,
        });
    };
    const _onWardChange = (changeId) => {
        handleWardChange(changeId);
        reset({
            ...getValues(),
            ward: changeId,
        });
    };

    const _onSubmit = (value) => {
        if (!!!shipping?.typeShip) {
            message.error("Please select type shipping in your order");
            return;
        }

        const data = {
            formInfo: {
                ...value,
                province:
                    provinces?.find((item) => item.value === provinceId) || "",
                district:
                    districts?.find((item) => item.value === districtId) || "",
                ward: wards?.find((item) => item.value === wardId) || "",
            },
            cartInfo: {
                ...cartInfo,
            },
        };

        handleCheckoutPage(data);
    };

    return (
        <WarpperForm
            onSubmit={handleSubmit(_onSubmit)}
            action="#"
            className="checkout-form"
        >
            <div className="row">
                <div className="col-lg-9">
                    <h2 className="checkout-title">Billing Details</h2>
                    <div className="row">
                        <div className="col-sm-4">
                            <Input
                                label="Full Name"
                                required
                                errors={errors.firstName}
                                {...register("firstName", {
                                    required: MESSAGE.required,
                                })}
                            />
                        </div>
                        <div className="col-sm-4">
                            <Input
                                label="Phone Number"
                                required
                                {...register("phone", {
                                    required: MESSAGE.required,
                                    pattern: {
                                        value: REGREX.phone,
                                        message: MESSAGE.phone,
                                    },
                                })}
                                errors={errors?.phone}
                            />
                        </div>
                        <div className="col-sm-4">
                            <Input
                                label="Email"
                                required
                                errors={errors.email}
                                defaultValue={email}
                                disabled
                                {...register("email")}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-4">
                            <label>Province/City *</label>
                            <Controller
                                name="province"
                                control={control}
                                rules={{ required: MESSAGE.required }}
                                render={({ formState: { errors } }) => (
                                    <>
                                        <Select
                                            className="customSelect"
                                            showSearch
                                            placeholder="Please select Province/City"
                                            options={provinces}
                                            value={provinceId}
                                            onChange={_onProvinceChange}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => {
                                                return removeAccents(
                                                    option?.label ?? ""
                                                )
                                                    .toLowerCase()
                                                    .includes(
                                                        removeAccents(
                                                            input.toLowerCase()
                                                        )
                                                    );
                                            }}
                                        />
                                        <p
                                            className="form-error"
                                            style={{ minHeight: 24 }}
                                        >
                                            {errors?.province?.message || ""}
                                        </p>
                                    </>
                                )}
                            />
                        </div>
                        <div className="col-sm-4">
                            <label>District/Town *</label>
                            <Controller
                                name="district"
                                control={control}
                                rules={{ required: MESSAGE.required }}
                                render={({ formState: { errors } }) => (
                                    <>
                                        <Select
                                            className="customSelect"
                                            showSearch
                                            placeholder="Please select District"
                                            options={districts}
                                            value={districtId}
                                            onChange={_onDistrictChange}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => {
                                                return removeAccents(
                                                    option?.label ?? ""
                                                )
                                                    .toLowerCase()
                                                    .includes(
                                                        removeAccents(
                                                            input.toLowerCase()
                                                        )
                                                    );
                                            }}
                                        />
                                        <p
                                            className="form-error"
                                            style={{ minHeight: 24 }}
                                        >
                                            {errors?.district?.message || ""}
                                        </p>
                                    </>
                                )}
                            />
                        </div>
                        <div className="col-sm-4">
                            <label>Ward *</label>
                            <Controller
                                name="ward"
                                control={control}
                                rules={{ required: MESSAGE.required }}
                                render={({ formState: { errors } }) => (
                                    <>
                                        <Select
                                            className="customSelect"
                                            // suffixIcon={<></>}
                                            showSearch
                                            placeholder="Please select Ward"
                                            options={wards}
                                            value={wardId}
                                            onChange={_onWardChange}
                                            optionFilterProp="children"
                                            filterOption={(input, option) => {
                                                return removeAccents(
                                                    option?.label ?? ""
                                                )
                                                    .toLowerCase()
                                                    .includes(
                                                        removeAccents(
                                                            input.toLowerCase()
                                                        )
                                                    );
                                            }}
                                        />
                                        <p
                                            className="form-error"
                                            style={{ minHeight: 24 }}
                                        >
                                            {errors?.ward?.message || ""}
                                        </p>
                                    </>
                                )}
                            />
                        </div>
                    </div>
                    <Input
                        className="input-error"
                        placeholder="House number and Street name"
                        label="Street address"
                        required
                        errors={errors.street}
                        {...register("street", {
                            required: MESSAGE.required,
                        })}
                    />
                    {/* 
                    <input
                        type="text"
                        className="form-control input-error"
                        placeholder="House number and Street name"
                        required
                    />
                    <p className="form-error">Please fill in this field</p> */}
                    <Input
                        label="Order notes (optional)"
                        errors={errors?.note}
                        renderInput={(inputProps) => (
                            <TextArea
                                {...inputProps}
                                cols={30}
                                rows={4}
                                className="form-control"
                                placeholder="Notes about your order, e.g. special notes for delivery"
                                {...register("note")}
                            />
                        )}
                    />

                    {/* <label>Order notes (optional)</label>
                    <textarea
                        className="form-control"
                        cols={30}
                        rows={4}
                        placeholder="Notes about your order, e.g. special notes for delivery"
                        defaultValue={""}
                    /> */}
                    {/* <div className="custom-control custom-checkbox">
                            <input
                                type="checkbox"
                                className="custom-control-input"
                                id="checkout-create-acc"
                            />
                            <label
                                className="custom-control-label"
                                htmlFor="checkout-create-acc"
                            >
                                Create an account?
                            </label>
                        </div> */}
                </div>
                <aside className="col-lg-3">
                    <div className="summary">
                        <h3 className="summary-title">Your Order</h3>
                        <table className="table table-summary">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderProductInfo?.map((item) => {
                                    const { slug, id, name, price, quantity } =
                                        item || {};
                                    return (
                                        <tr key={id}>
                                            <td>
                                                <Link
                                                    to={`${PATHS.PRODUCT}/${slug}`}
                                                >
                                                    {name}
                                                </Link>
                                                <p>
                                                    {quantity} x ${price}
                                                </p>
                                            </td>
                                            <td>
                                                $ {formatCurrency(price, 2)}
                                            </td>
                                        </tr>
                                    );
                                })}
                                <tr className="summary-subtotal">
                                    <td>Subtotal:</td>
                                    <td>${formatCurrency(subTotal, 2)}</td>
                                </tr>
                                <tr>
                                    <td>Shipping:</td>
                                    {shipping ? (
                                        <td>
                                            {shipping?.typeShip} - $
                                            {shipping?.price}
                                            <p>
                                                <Link to={PATHS.CARD}>
                                                    Edit{" "}
                                                    <i className="icon-edit" />
                                                </Link>
                                            </p>
                                        </td>
                                    ) : (
                                        <td
                                            style={{
                                                color: "red",
                                                textDecoration: "underline",
                                            }}
                                        >
                                            <Link to={PATHS.CARD}>
                                                Please Select Shipping
                                            </Link>
                                        </td>
                                    )}
                                </tr>

                                {discountCode && (
                                    <tr>
                                        <td>Discount:</td>
                                        <td>
                                            {discountCode} - ${discount}
                                        </td>
                                    </tr>
                                )}
                                <tr className="summary-total">
                                    <td>Total:</td>
                                    <td>${formatCurrency(total, 2)}</td>
                                </tr>
                            </tbody>
                        </table>
                        <div
                            className="accordion-summary"
                            id="accordion-payment"
                        >
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="card-title">
                                        <a
                                            href="#collapse-1"
                                            className={
                                                currentPaymenMethod ===
                                                PAYMENT_METHOD.bank
                                                    ? ""
                                                    : "collapsed"
                                            }
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPaymenMethod(
                                                    PAYMENT_METHOD.bank
                                                );
                                            }}
                                        >
                                            Direct bank transfer
                                        </a>
                                    </h2>
                                </div>
                                {currentPaymenMethod ===
                                    PAYMENT_METHOD.bank && (
                                    <div className="collapse show">
                                        <div className="card-body">
                                            Make your payment directly into our
                                            bank account. Please use your Order
                                            ID as the payment reference. Your
                                            order will not be shipped until the
                                            funds have cleared in our account.
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h2 className="card-title">
                                        <a
                                            className={
                                                currentPaymenMethod ===
                                                PAYMENT_METHOD.cash
                                                    ? ""
                                                    : "collapsed"
                                            }
                                            href="#collapse-3"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPaymenMethod(
                                                    PAYMENT_METHOD.cash
                                                );
                                            }}
                                        >
                                            Cash on delivery
                                        </a>
                                    </h2>
                                </div>
                                {currentPaymenMethod ===
                                    PAYMENT_METHOD.cash && (
                                    <div className="collapse show">
                                        <div className="card-body">
                                            Quisque volutpat mattis eros. Lorem
                                            ipsum dolor sit amet, consectetuer
                                            adipiscing elit. Donec odio. Quisque
                                            volutpat mattis eros.
                                        </div>
                                    </div>
                                )}
                            </div>
                            {/* <div class="card">
                                <div class="card-header" id="heading-1">
                                    <h2 class="card-title">
                                        <a
                                            role="button"
                                            data-toggle="collapse"
                                            href="#collapse-1"
                                            aria-expanded="true"
                                            aria-controls="collapse-1"
                                        >
                                            {" "}
                                            Direct bank transfer{" "}
                                        </a>
                                    </h2>
                                </div>
                                <div
                                    id="collapse-1"
                                    class="collapse show"
                                    aria-labelledby="heading-1"
                                    data-parent="#accordion-payment"
                                >
                                    <div class="card-body">
                                        {" "}
                                        Make your payment directly into our bank
                                        account. Please use your Order ID as the
                                        payment reference. Your order will not
                                        be shipped until the funds have cleared
                                        in our account.{" "}
                                    </div>
                                </div>
                            </div>

                            <div class="card">
                                <div class="card-header" id="heading-3">
                                    <h2 class="card-title">
                                        <a
                                            class="collapsed"
                                            role="button"
                                            data-toggle="collapse"
                                            href="#collapse-3"
                                            aria-expanded="false"
                                            aria-controls="collapse-3"
                                        >
                                            {" "}
                                            Cash on delivery{" "}
                                        </a>
                                    </h2>
                                </div>
                                <div
                                    id="collapse-3"
                                    class="collapse"
                                    aria-labelledby="heading-3"
                                    data-parent="#accordion-payment"
                                >
                                    <div class="card-body">
                                        Quisque volutpat mattis eros. Lorem
                                        ipsum dolor sit amet, consectetuer
                                        adipiscing elit. Donec odio. Quisque
                                        volutpat mattis eros.{" "}
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-outline-primary-2 btn-order btn-block"
                        >
                            <span className="btn-text">Place Order</span>
                            <span className="btn-hover-text">
                                Proceed to Checkout
                            </span>
                        </button>
                    </div>
                </aside>
            </div>
        </WarpperForm>
    );
};

export default CheckoutForm;
