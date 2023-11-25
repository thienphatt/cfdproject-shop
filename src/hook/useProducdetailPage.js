import { message } from "antd";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { productService } from "../services/productService";
import useQuery from "./useQuery";
import { useDispatch, useSelector } from "react-redux";
import { handleAddCart } from "../store/reducers/cartReducer";
import tokenMethod from "../utils/token";
import { handleShowModal } from "../store/reducers/authReducer";
import { MODAL_TYPE } from "../constants/general";
import { handleAddToWishList } from "../store/reducers/wishListReducer";

const useProductDetailPage = () => {
    const dispatch = useDispatch();

    //   Initial Hooks
    const colorRef = useRef();
    const quantityRef = useRef();
    const { slug } = useParams();

    // fectAPI
    const { data: productDetailData } = useQuery(
        () => productService.getProductsDetail(slug),
        [slug]
    );

    const { id, name, description, shippingReturn, price, discount } =
        productDetailData || {};

    const { data: productDetailReviews } = useQuery(
        () => id && productService.getProductReview(id),
        [id]
    );

    const handleAddToCart = () => {
        const { value: color, reset: colorReset } = colorRef.current || {};
        const { value: quantity, reset: quantityReset } =
            quantityRef.current || {};

        // validate variant
        if (!color) {
            message.error("Plese select color");
            return;
        } else if (isNaN(quantity) && quantity < 1) {
            message.error("Quantity must be greater than 1");
        }

        if (tokenMethod?.get()) {
            // handAPI
            const addPayload = {
                addedId: id,
                addedColor: color,
                addedQuantity: quantity,
                addedPrice: price - discount,
            };

            try {
                // const res = dispatch(handleAddCart(addPayload)?.unwrap());
                const res = dispatch(handleAddCart(addPayload));
                if (res) {
                    colorReset?.();
                    quantityReset?.();
                }
            } catch (error) {
                console.log("error", error);
            }
        } else {
            dispatch(handleShowModal(MODAL_TYPE.login));
        }
    };

    const handleAddToWhisList = () => {
        dispatch(handleAddToWishList(id));
    };

    const productDetailTopProps = {
        ...productDetailData,
        reviews: productDetailReviews,
        colorRef,
        quantityRef,
        handleAddToCart,
        handleAddToWhisList,
    };

    const productDetailTabProps = {
        description,
        shipping: shippingReturn,
        reviews: productDetailReviews,
    };

    return {
        productDetailName: name,
        productDetailTopProps,
        productDetailTabProps,
        handleAddToCart,
    };
};

export default useProductDetailPage;
