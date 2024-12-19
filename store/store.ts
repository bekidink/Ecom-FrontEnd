import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer, { CartState } from "./slices/cartProduct";
import addressReducer from "./slices/addressSlice";
import orderReducer from "./slices/orderSlice";
export type RootState = ReturnType<typeof store.getState>;
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartItem: cartReducer,
    addresses: addressReducer,
    orders: orderReducer,
  },
});
