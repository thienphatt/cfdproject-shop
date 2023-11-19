import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { cartService } from "../../services/cartService";
import { message } from "antd";

const initialState = {
    cartInfo: {},
    cartLoading: false,
};

export const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        updateCacheCart: (state, action) => {
            state.cartInfo = action.payload || state.cartInfo;
        },
        clearCar: (state) => {
            state.cartInfo = {};
        },
    },
    extraReducers: (builder) => {
        // GET CART
        builder.addCase(handleGetCart.pending, (state) => {
            state.cartLoading = true;
        });
        builder.addCase(handleGetCart.fulfilled, (state, action) => {
            state.cartLoading = false;
            state.cartInfo = action.payload;
        });
        builder.addCase(handleGetCart.rejected, (state) => {
            state.cartLoading = false;
            state.cartInfo = {};
        });

        // ADD cart
        builder.addCase(handleAddCart.pending, (state) => {
            state.cartLoading = true;
        });
        builder.addCase(handleAddCart.fulfilled, (state) => {
            state.cartLoading = false;
        });
        builder.addCase(handleAddCart.rejected, (state) => {
            state.cartLoading = false;
        });

        // RemoveCart
        builder.addCase(handleRemoveFormCard.pending, (state) => {
            state.cartLoading = true;
        });
        builder.addCase(handleRemoveFormCard.fulfilled, (state) => {
            state.cartLoading = false;
        });
        builder.addCase(handleRemoveFormCard.rejected, (state) => {
            state.cartLoading = false;
        });

        // Update Cart
        builder.addCase(handleUpdateCart.pending, (state) => {
            state.cartLoading = true;
        });
        builder.addCase(handleUpdateCart.fulfilled, (state) => {
            state.cartLoading = false;
        });
        builder.addCase(handleUpdateCart.rejected, (state) => {
            state.cartLoading = false;
        });
    },
});

const { actions, reducer: cartReducer } = cartSlice;

export const { updateCacheCart, clearCar } = actions;

export default cartReducer;

// get cart
export const handleGetCart = createAsyncThunk(
    "auth/get",
    async (_, thunkApi) => {
        try {
            const cartRes = await cartService.getCart();

            return cartRes?.data?.data;
        } catch (error) {
            thunkApi.rejectWithValue(error);
        }
    }
);

export const handleUpdateCart = createAsyncThunk(
    "cart/update",
    async (actionPayload, { dispatch }) => {
        try {
            const cartRes = await cartService.updateCart(actionPayload);
            message.success("update success");
            dispatch(handleGetCart());
            return cartRes?.data?.data;
        } catch (error) {
            message.error("update fail");
            thunkApi.rejectWithValue(error);
        }
    }
);

export const handleRemoveFormCard = createAsyncThunk(
    "cart/remove",
    async (actionPayload, thunkApi) => {
        const removeIndex = actionPayload;
        const { getState, rejectWithValue, dispatch } = thunkApi;
        const { cartInfo } = getState()?.cart || {};

        // neu trong cart ko co san pham return false
        if (removeIndex < 0) return false;

        try {
            const newProduct = cartInfo?.product
                ?.filter((_, i) => i !== removeIndex)
                .map((item) => item.id);
            const newQuantity = cartInfo?.quantity?.filter(
                (_, i) => i !== removeIndex
            );
            const newVariant = cartInfo?.variant?.filter(
                (_, i) => i !== removeIndex
            );
            const newTotalProduct = cartInfo?.totalProduct?.filter(
                (_, i) => i !== removeIndex
            );

            const newSubTotal =
                newTotalProduct.reduce((curr, next) => curr + next, 0) || 0;

            const newTotal = newSubTotal - (cartInfo.discount ?? 0);
            const updatePayload = {
                ...cartInfo,
                product: newProduct,
                variant: newVariant,
                quantity: newQuantity,
                totalProduct: newTotalProduct,
                subTotal: newSubTotal,
                total: newTotal,
                shipping: newProduct?.length > 0 ? cartInfo.shipping : {},
                discount: newProduct?.length > 0 ? cartInfo.discount : 0,
            };

            const cartRes = await cartService.updateCart(updatePayload);
            dispatch(handleGetCart());
            message.success("Remove form cart success");
            return cartRes?.data?.data;
        } catch (error) {
            rejectWithValue(error);
            message.error("Remove form cart failed");
            console.log("error", error);
        }
    }
);

export const handleAddCart = createAsyncThunk(
    "cart/add",
    async (actionPayload, thunkApi) => {
        try {
            const { addedId, addedColor, addedQuantity, addedPrice } =
                actionPayload;
            //get state cartInfo : hàm thunkAPI cung cấp getState() -> .state cần lấy ra
            const { cartInfo } = thunkApi.getState()?.cart || {};

            let addPayload = {}; // addPay for call API
            if (cartInfo.id) {
                // check trong mảng product có thằng nào trùng với id sản phẩm đag add ko
                const matchIndex = cartInfo.product?.findIndex(
                    (product, i) =>
                        product.id === addedId &&
                        cartInfo.variant[i] === addedColor
                );

                console.log("matchIndex", matchIndex);

                // tạo product mới -> map tất cả id product vào product mới
                const newProduct = cartInfo.product?.map(
                    (product) => product.id
                );

                // clone new quantity
                const newQuantity = [...(cartInfo.quantity ?? [])];
                // clone new variant
                const newVariant = [...(cartInfo.variant ?? [])];
                // clone new Total product
                const newTotalProduct = [...(cartInfo.totalProduct ?? [])];

                // check  điều kiện
                // find had an index for product

                if (matchIndex >= 0) {
                    if (newVariant[matchIndex] === addedColor) {
                        newQuantity[matchIndex] =
                            addedQuantity + newQuantity[matchIndex];
                        newTotalProduct[matchIndex] =
                            Number(newQuantity[matchIndex]) * addedPrice;
                    } else {
                        newProduct.push(addedId);
                        newQuantity.push(addedQuantity);
                        newVariant.push(addedColor);
                        newTotalProduct.push(addedQuantity * addedPrice);
                    }
                } else {
                    newProduct.push(addedId);
                    newQuantity.push(addedQuantity);
                    newVariant.push(addedColor);
                    newTotalProduct.push(addedQuantity * addedPrice);
                }

                const newSubTotal =
                    newTotalProduct.reduce((curr, next) => curr + next, 0) || 0;

                const newTotal =
                    newSubTotal -
                        cartInfo.discount +
                        cartInfo?.shipping?.price || 0;

                addPayload = {
                    ...cartInfo,
                    product: newProduct,
                    variant: newVariant,
                    quantity: newQuantity,
                    totalProduct: newTotalProduct,
                    subTotal: newSubTotal,
                    total: newTotal,
                    discount: 0,
                    paymentMethod: "",
                };
            } else {
                addPayload = {
                    product: [addedId],
                    variant: [addedColor],
                    quantity: [addedQuantity],
                    totalProduct: [addedPrice * addedQuantity],
                    subTotal: addedPrice * addedQuantity,
                    total: addedPrice * addedQuantity,
                    discount: 0,
                    paymentMethod: "",
                };
            }

            const cartRes = await cartService.updateCart(addPayload);

            thunkApi.dispatch(handleGetCart());
            message.success("Add to cart successfully");

            return cartRes?.data?.data;
        } catch (error) {
            message.error("Add to cart failed");
            return thunkApi.rejectWithValue(errorInfo);
        }
    }
);
