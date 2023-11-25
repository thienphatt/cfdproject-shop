import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import mainReducer from "./reducers/mainreducer";
import cartReducer from "./reducers/cartReducer";
import wishListReducer from "./reducers/wishListReducer";

const store = configureStore({
    reducer: {
        auth: authReducer,
        main: mainReducer,
        cart: cartReducer,
        wishList: wishListReducer,
    },

    // custom middleware : [thunk]
});

export default store;
