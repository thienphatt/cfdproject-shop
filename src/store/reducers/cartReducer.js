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

export const handleAddCart = createAsyncThunk(
  "cart/add",
  async (actionPayload, thunkApi) => {
    try {
      const { addedId, addedColor, addedQuantity, addedPrice } = actionPayload;

      //get state cartInfo : hàm thunkAPI cung cấp getState() -> .state cần lấy ra
      const { cartInfo } = thunkApi.getState()?.cart || {};

      let addPayload = {}; // addPay for call API
      if (cartInfo.id) {
        // check trong mảng product có thằng nào trùng với id sản phẩm đag ad ko
        const matchIndex = cartInfo.product?.findIndex(
          (product) => product.id === addedId
        );

        // tạo product mới -> map tất cả id product vào product mới
        const newProduct = cartInfo.product?.map((product) => {
          return product.id;
        });

        // clone new quantity
        const newQuantity = [...(cartInfo.quantity ?? [])];
        // clone new variant
        const newVariant = [...(cartInfo.variant ?? [])];
        // clone new Total product
        const newTotalProduct = [...(cartInfo.totalProduct ?? [])];

        // check  điều kiện
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

      console.log("addPayload", addPayload);

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