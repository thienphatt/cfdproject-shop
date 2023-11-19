import { useDispatch, useSelector } from "react-redux";
import { SHIPPING_OPTIONS } from "../constants/general";
import {
    handleRemoveFormCard,
    handleUpdateCart,
} from "../store/reducers/cartReducer";
import { useRef } from "react";

const useCartPage = () => {
    const { cartInfo, cartLoading } = useSelector((state) => state.cart);
    console.log("cartLoading", cartLoading);
    const quantityRef = useRef();
    const dispatch = useDispatch();

    const {
        subTotal,
        total,
        shipping,
        product,
        discount,
        quantity,
        totalProduct,
        variant,
    } = cartInfo || {};

    console.log("cartInfo", cartInfo);

    const updateQuantityTimeout = useRef();

    console.log("updateQuantityTimeout.current", updateQuantityTimeout.current);

    const handleUpdateQuantity = (updateQuantity, updateIndex) => {
        const getPayload = () => {
            const newQuantity = quantity?.map((qty, index) => {
                return index === updateIndex ? updateQuantity : qty;
            });
            const newTotalProduct = totalProduct?.map((item, index) => {
                return index === updateIndex
                    ? product[updateIndex].price * updateQuantity
                    : item;
            });

            const newSubtotal = newTotalProduct?.reduce(
                (acc, curr) => acc + curr,
                0
            );

            const newTotal =
                newSubtotal - (discount ?? 0) + (shipping?.price ?? 0);

            return {
                ...cartInfo,
                product: product.map((item) => item.id),
                quantity: newQuantity,
                totalProduct: newTotalProduct,
                subTotal: newSubtotal,
                total: newTotal,
            };
        };

        // call API update

        if (updateQuantityTimeout.current) {
            clearTimeout(updateQuantityTimeout.current);
        }

        updateQuantityTimeout.current = setTimeout(async () => {
            if (
                !cartLoading &&
                updateQuantity !== "" &&
                quantity[updateIndex] !== updateQuantity
            ) {
                try {
                    const res = await dispatch(
                        handleUpdateCart(getPayload())
                    ).unwrap();
                } catch (error) {
                    quantityRef.current[updateIndex]?.reset?.();
                }
            }
        }, 300);
    };

    const handleUpdateShipping = (selectedTypeShip) => {
        // Call API update cart

        const selectedShipping = SHIPPING_OPTIONS.find(
            (optiton) => optiton.value === selectedTypeShip
        );

        const updatePayload = {
            ...cartInfo,
            product: product?.map((item) => item.id),

            shipping: {
                typeShip: selectedShipping.value,
                price: selectedShipping.price,
            },
            total: subTotal - discount + selectedShipping.price,
        };

        dispatch(handleUpdateCart(updatePayload));
    };

    const cartSummaryProps = {
        subTotal,
        total,
        typeShip: shipping?.typeShip,
        handleUpdateShipping,
    };

    const handleRemoveProduct = (removeIndex) => {
        if (product.length > 0) {
            dispatch(handleRemoveFormCard(removeIndex));
        }
    };

    const cartTableProps = {
        products: product?.map((product, i) => {
            return {
                ...product,
                quantity: quantity?.[i],
                totalProduct: totalProduct?.[i],
                variant: variant?.[i],
            };
        }),
        quantityRef,
        handleUpdateQuantity,
        handleRemoveProduct,
    };

    return {
        cartTableProps,
        cartSummaryProps,
    };
};

export default useCartPage;
