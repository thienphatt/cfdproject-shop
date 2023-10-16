import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import counterReducer from "./reducers/counterReducer";
import dogReducer from "./reducers/dogReducer";

const reducers = combineReducers({
  counter: counterReducer,
  dog: dogReducer,
});

const thunkMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    action(store.dispatch);
    return;
  }
  next(action);
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  // reducers: Các reducers của ứng dụng.
  reducers,

  //   undefined: Giá trị ban đầu của state
  undefined,

  //   composeEnhancers(applyMiddleware(thunkMiddleware)): Sử dụng composeEnhancers để kết hợp middleware và Redux DevTools Extension (nếu có).
  composeEnhancers(applyMiddleware(thunkMiddleware))
);

export default store;
