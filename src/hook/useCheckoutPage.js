import { useDispatch, useSelector } from "react-redux";
import { orderService } from "../services/orderServices";
import { message } from "antd";
import { updateCacheCart } from "../store/reducers/cartReducer";

function useCheckoutPage() {
    const dispatch = useDispatch();
    const { cartInfo } = useSelector((state) => state.cart);

    console.log("cartInfo", cartInfo);
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
    return {
        couponProps,
    };
}

export default useCheckoutPage;
