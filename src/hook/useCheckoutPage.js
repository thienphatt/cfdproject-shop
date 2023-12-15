import { useDispatch, useSelector } from "react-redux";
import { orderService } from "../services/orderServices";
import { message } from "antd";
import { handleGetCart, updateCacheCart } from "../store/reducers/cartReducer";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../constants/paths";

function useCheckoutPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { cartInfo } = useSelector((state) => state.cart);

    const handleAddCoupon = async (value) => {
        try {
            const couponRes = await orderService.getOrderVoucher(value);

            const cuoponInfo = couponRes?.data?.data;

            if (cuoponInfo) {
                const { subTotal, shipping } = cartInfo || {};

                dispatch(
                    updateCacheCart({
                        ...cartInfo,
                        discount: cuoponInfo?.value,
                        discountCode: cuoponInfo?.code,
                        total:
                            subTotal -
                            (cuoponInfo?.value || 0) +
                            (shipping?.price || 0),
                    })
                );
                message.success("Add coupon success");
            }

            console.log("cartInfo", cartInfo);
        } catch (error) {
            console.log("error", error);
            message.error("Add coupon fail");
        }
    };

    const handleRemoveCoupon = () => {
        try {
            if (cartInfo.discountCode) {
                const { subTotal, shipping } = cartInfo || {};

                dispatch(
                    updateCacheCart({
                        ...cartInfo,
                        discount: 0,
                        discountCode: "",
                        total: subTotal - (shipping?.price || 0),
                    })
                );
                message.success("Remove coupon success");
            }
        } catch (error) {}
    };

    const couponProps = {
        addedCoupon: cartInfo?.discountCode,
        handleAddCoupon,
        handleRemoveCoupon,
    };

    // Check out Page

    const handleCheckoutPage = async (data) => {
        console.log("data", data);

        const { cartInfo, formInfo } = data || {};

        const {
            phone,
            email,
            firstName,
            note,
            province,
            district,
            ward,
            street,
        } = formInfo || {};
        const {
            shipping,
            variant,
            subTotal,
            total,
            product,
            quantity,
            totalProduct,
            discount,
            discountCode = "",
            paymentMethod,
        } = cartInfo || {};

        const payload = {
            address: {
                phone,
                email,
                fullName: firstName,
                street: `${street}, ${ward?.label || ""}, ${
                    district?.label || ""
                }, ${province?.label || ""}`,
            },
            shipping,
            variant,
            subTotal,
            total,
            product: product?.map((item) => item.id) || [],
            quantity,
            totalProduct,
            discount,
            discountCode,
            paymentMethod,
            note,
        };

        try {
            const res = await orderService.checkout(payload);
            if (res.data?.data) {
                dispatch(handleGetCart());
                message.success("Checkout successfully");
                navigate(PATHS.CHECKOUT_SUCCESS);
            } else {
                message.error("Checkout failed");
            }
        } catch (error) {
            message.error("Checkout failed");
        }
    };

    const formProps = {
        handleCheckoutPage,
    };

    return {
        couponProps,
        formProps,
    };
}

export default useCheckoutPage;
