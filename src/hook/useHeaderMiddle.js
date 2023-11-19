import { useDispatch, useSelector } from "react-redux";
import { handleRemoveFormCard } from "../store/reducers/cartReducer";

const useHeaderMiddle = () => {
    const dispatch = useDispatch();
    const { cartInfo, cartLoading } = useSelector((state) => state.cart);

    const { product, quantity, total, totalProduct, variant, shipping } =
        cartInfo;
    const handleRemoveProduct = (removeIndex) => {
        if (product.length > 0) {
            dispatch(handleRemoveFormCard(removeIndex));
        }
    };

    const headerMiddleProps = {
        products: product?.map((product, i) => {
            return {
                ...product,
                quantity: quantity?.[i],
                totalProduct: totalProduct?.[i],
                variant: variant?.[i],
            };
        }),
        totalProduct: totalProduct?.reduce((curr, next) => curr + next, 0) || 0,
        total,
        shipping,
        handleRemoveProduct,
    };
    return { headerMiddleProps };
};

export default useHeaderMiddle;
