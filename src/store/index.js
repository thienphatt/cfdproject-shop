import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";
import mainReducer from "./reducers/mainReducer";
import wishListReducer from "./reducers/wishListReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        main: mainReducer,
        cart: cartReducer,
        wishList: wishListReducer,
    },
});

export default store;
