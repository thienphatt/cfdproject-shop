import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authReducer";
import mainReducer from "./reducers/mainreducer";

const store = configureStore({
  reducer: {
    auth: authReducer,
    main: mainReducer,
  },

  // middleware : [thunk]
});

export default store;
