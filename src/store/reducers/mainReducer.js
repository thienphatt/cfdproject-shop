import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowNavbar: false,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    handleShowNavbar: (state) => {
      state.isShowNavbar = true;
    },
    handleCloesNavbar: (state) => {
      state.isShowNavbar = false;
    },
  },
});

const { actions, reducer: mainReducer } = mainSlice;

export const { handleShowNavbar, handleCloesNavbar } = actions;

export default mainReducer;
