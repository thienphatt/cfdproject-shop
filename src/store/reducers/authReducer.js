import { createSlice } from "@reduxjs/toolkit";
import tokenMethod from "../../utils/token";

const initialState = {
  isShowModal: false,
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
    handleShowModal: (state) => {
      state.isShowModal = true;
    },
  },
});

const { actions, reducer: authReducer } = authSlice;

export const { handleLogout, handleShowModal } = actions;

export default authReducer;
