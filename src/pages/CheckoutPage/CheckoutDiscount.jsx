import React, { useEffect } from "react";
import styled from "styled-components";
import { MESSAGE } from "../../constants/validate";
import { useForm } from "react-hook-form";

const Wrapper = styled.div`
    display: flex;
    height: 40px;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    .checkout-discount {
        flex: 1;
        margin: 0;
        height: 100%;
        .form-control {
            margin: 0;
        }
        .text-truncate {
            z-index: -1;
        }
    }
`;

const CheckoutDiscount = ({
    handleAddCoupon,
    handleRemoveCoupon,
    addedCoupon,
}) => {
    useEffect(() => {
        $("#checkout-discount-input")
            .on("focus", function () {
                // Hide label on focus
                $(this).parent("form").find("label").css("opacity", 0);
            })
            .on("blur", function () {
                // Check if input is empty / toggle label
                var $this = $(this);

                if ($this.val().length !== 0) {
                    $this.parent("form").find("label").css("opacity", 0);
                } else {
                    $this.parent("form").find("label").css("opacity", 1);
                }
            });
    }, []);

    const _addCoupon = (value) => {
        if (value?.discountCode) return handleAddCoupon(value?.discountCode);
    };

    const _removeCoupon = () => {
        if (addedCoupon) return handleRemoveCoupon();
    };

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({
        defaultValues: {
            discountCode: addedCoupon,
        },
    });

    useEffect(() => {
        reset({ discountCode: addedCoupon });
    }, [addedCoupon]);

    return (
        <Wrapper>
            <div className="checkout-discount">
                <form action="#">
                    <input
                        type="text"
                        className="form-control"
                        required
                        id="checkout-discount-input"
                        {...register("discountCode", {
                            required: MESSAGE.required,
                        })}
                    />
                    <label
                        htmlFor="checkout-discount-input"
                        className="text-truncate"
                        style={{ opacity: addedCoupon ? 0 : 1 }}
                    >
                        Have a coupon?
                        <span>Click here to enter your code</span>
                    </label>
                    <p
                        className="form-error"
                        style={{
                            textAlign: "left",
                            minHeight: 23,
                        }}
                    >
                        {errors?.discountCode?.message || ""}
                    </p>
                </form>
            </div>

            {!!!addedCoupon ? (
                <button
                    onClick={handleSubmit(_addCoupon)}
                    className="btn btn-outline-primary-2"
                >
                    Add
                </button>
            ) : (
                <button
                    className="btn btn-outline-primary-2"
                    onClick={_removeCoupon}
                >
                    Remove
                </button>
            )}
        </Wrapper>
    );
};

export default CheckoutDiscount;
