import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import wishListReducer from "./reducers/wishListReducer";
import mainReducer from "./reducers/mainReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        main: mainReducer,
        cart: cartReducer,
        wishList: wishListReducer,
    },
});

export default store;
