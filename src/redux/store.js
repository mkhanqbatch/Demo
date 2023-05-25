import { combineReducers, configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import productSlice from "./slices/productSlice";
import userSlice from "./slices/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import orderSlice from "./slices/orderSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["users", "cart"],
};
const rootReducer = combineReducers({
  users: userSlice,
  cart: cartSlice,
  product: productSlice,
  order: orderSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
export const persistor = persistStore(store);
