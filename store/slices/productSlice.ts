import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialValue = {
  allCategory: [],
  loadingCategory: false,
  allSubCategory: [],
  product: [],
};

const productSlice = createSlice({
  name: "product",
  initialState: initialValue,
  reducers: {
    setAllCategory: (state, action:PayloadAction<[]>) => {
      state.allCategory = [...action.payload];
    },
    setLoadingCategory: (state, action) => {
      state.loadingCategory = action.payload;
    },
    setAllSubCategory: (state, action:PayloadAction<[]>) => {
      state.allSubCategory = [...action.payload];
    },
  },
});

export const { setAllCategory, setAllSubCategory, setLoadingCategory } =
  productSlice.actions;

export default productSlice.reducer;
