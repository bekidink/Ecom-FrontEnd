import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import productReducer from "./slices/productSlice";
import cartReducer, { CartState } from "./slices/cartProduct";
import addressReducer from "./slices/addressSlice";
import orderReducer from "./slices/orderSlice";
export interface RootState {
  cartItem: CartState;
  user: any; // Replace `any` with the proper user type if defined
}
export const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    cartItem: cartReducer,
    addresses: addressReducer,
    orders: orderReducer,
  },
});
