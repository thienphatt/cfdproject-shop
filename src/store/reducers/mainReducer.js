import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isShowNavbar: false,
};

export const mainSlice = createSlice({
    name: "main",
    initialState,
    reducers: {
        handleShowNavbar: () => {
            $("body").addClass("mmenu-active");
            $("body").css("overflow-y", "hidden");
        },
        handleCloesNavbar: () => {
            $("body").removeClass("mmenu-active");
            $("body").css("overflow", "visible");
        },
    },
});

const { actions, reducer: mainReducer } = mainSlice;

export const { handleShowNavbar, handleCloesNavbar } = actions;

export default mainReducer;
