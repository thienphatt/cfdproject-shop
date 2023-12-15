import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import { authService } from "../../services/authService";
import tokenMethod from "../../utils/token";
import { clearCar, handleGetCart } from "./cartReducer";
import { useDispatch, useSelector } from "react-redux";
import { updateCacheWishList } from "./wishListReducer";

const initialState = {
    isShowModal: "",
    profile: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        handleLogout: (state) => {
            tokenMethod.remove();
            state.profile = null;
        },
        handleShowModal: (state, action) => {
            state.isShowModal = action.payload;
        },
        handleCloseModal: (state) => {
            state.isShowModal = "";
        },
    },
    extraReducers: (builder) => {
        builder.addCase(handleGetProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
        builder.addCase(handleLogin.fulfilled, (state, action) => {
            state.isShowModal = "";
        });
    },
});

const { actions, reducer: authReducer } = authSlice;

export const { handleLogout, handleShowModal, handleCloseModal } = actions;

export default authReducer;

export const handleRegister = createAsyncThunk(
    "auth/handleRegister",
    async (payload, thunkApi) => {
        try {
            const registerRes = await authService.register(payload);
            if (registerRes?.data?.data?.id) {
                message.success("Đăng ký thành công");
                thunkApi.dispatch(
                    handleLogin({
                        email: payload.email,
                        password: payload.password,
                    })
                );
                return true;
            } else {
                throw false;
            }
        } catch (error) {
            const errorInfo = error?.response?.data;
            if (errorInfo.error === "Forbidden") {
                message.error("Email đã được đăng ký");
            }
            return thunkApi.rejectWithValue(errorInfo);
        }
    }
);

export const handleLogin = createAsyncThunk(
    "auth/handleLogin",
    async (payload, thunkApi) => {
        try {
            const loginRes = await authService.login(payload);
            const { token: accessToken, refreshToken } =
                loginRes?.data?.data || {};
            tokenMethod.set({
                accessToken,
                refreshToken,
            });

            thunkApi.dispatch(handleGetProfile());
            thunkApi.dispatch(handleGetCart());

            message.success("Đăng nhập thành công");

            return true;
        } catch (error) {
            const errorInfo = error?.response?.data;
            if (errorInfo.error === "Not Found") {
                message.error("Username hoặc password không đúng");
            }
            return thunkApi.rejectWithValue(errorInfo);
        }
    }
);

export const handleGetProfile = createAsyncThunk(
    "auth/getProfile",
    async (_, thunkApi) => {
        if (tokenMethod.get()) {
            try {
                const profileRes = await authService.getProfile();

                thunkApi.dispatch(
                    updateCacheWishList(profileRes?.data?.data?.whiteList)
                );

                return profileRes?.data?.data;
            } catch (error) {
                return thunkApi.rejectWithValue(error?.response?.data);
            }
        }
    }
);

export const handleUpdateProfile = createAsyncThunk(
    "auth/updateProfile",
    async (payload, thunkApi) => {
        console.log("payload", payload);
        try {
            const res = await authService.updateProfile(payload);

            message.success("Cập nhật thông tin thành công");

            thunkApi.dispatch(handleGetProfile());
        } catch (error) {
            console.log("error", error);
            message.success("Cập nhật thông tin thất bại");
        }
    }
);
