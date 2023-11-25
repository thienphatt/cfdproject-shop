import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { authService } from "../../services/authService";
import { handleGetProfile } from "./authReducer";

const initialState = {
    myWishList: [],
    wishtListLoading: false,
};

export const wishListSlice = createSlice({
    initialState,
    name: "wishList",
    reducers: {
        updateCacheWishList: (state, action) => {
            state.myWishList = action.payload || state.myWishList;
        },
        clearWishList: (state) => {
            state.myWishList = [];
        },
    },
    extraReducers: (builder) => {
        // builder.addCase(handleGetCart.pending, (state) => {
        //     state.cartLoading = true;
        // });
        // builder.addCase(handleGetCart.fulfilled, (state, action) => {
        //     state.cartLoading = false;
        //     state.cartInfo = action.payload;
        // });
        // builder.addCase(handleGetCart.rejected, (state) => {
        //     state.cartLoading = false;
        //     state.cartInfo = {};
        // });
    },
});

const { actions, reducer: wishListReducer } = wishListSlice;

export const { updateCacheWishList } = actions;

export default wishListReducer;

export const handleAddToWishList = createAsyncThunk(
    "wishList/add",
    async (actionPayload, thunkAPI) => {
        const { myWishList } = thunkAPI.getState()?.wishList || {};
        try {
            if (myWishList?.some((item) => item.id === actionPayload)) {
                message.info("The product is already in your wish list");
                return false;
            }

            const addPayload = {
                product: actionPayload,
            };

            await authService.addWishList(addPayload);
            message.success("Add To Wish List Success");
            thunkAPI.dispatch(handleGetProfile());
        } catch (error) {
            message.error("Add To WishList Failed");
        }
    }
);

export const handleRemoveToWishList = createAsyncThunk(
    "wishList/remove",
    async (removeWishListId, thunkAPI) => {
        console.log("removeWishListId", removeWishListId);

        const addPayload = {
            product: removeWishListId,
        };

        await authService.removeWishList(addPayload);
        message.success("Remove To Wish List Success");
        thunkAPI.dispatch(handleGetProfile());
        try {
        } catch (error) {
            message.error("Remove To WishList Failed");
        }
    }
);
