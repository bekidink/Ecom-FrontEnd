import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a single cart item (optional if structure is simple)
export interface CartItem {
  id: string;
  quantity: number;
  productId: {
    price: number;
    discount?: number; // Optional, since not all products may have discounts
    [key: string]: any; // Include this if there are additional unknown fields in productId
  };
}

// Define the type for the cart state
export interface CartState {
  cart: CartItem[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    handleAddItemCart: (state, action: PayloadAction<CartItem[]>) => {
      // Directly assign the payload to state.cart
      state.cart = action.payload;
    },
  },
});

export const { handleAddItemCart } = cartSlice.actions;

export default cartSlice.reducer;
