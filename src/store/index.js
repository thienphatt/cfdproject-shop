import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import mainReducer from "./reducers/mainreducer";
import cartReducer from "./reducers/cartReducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
    cart: cartReducer,
  },

  // custom middleware : [thunk]
});

export default store;
