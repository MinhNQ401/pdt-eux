import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  name: string;
  price: string;
}

const initialState: Product[] = [
  {
    id: 0,
    name: "Hamburger",
    price: "$5.99",
  },
  {
    id: 1,
    name: "Chicken Nugget",
    price: "$9.99",
  },
  {
    id: 2,
    name: "French Fries",
    price: "$2.99",
  },
];

const productSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<Product>) {
      state.push(action.payload);
    },
    removeProduct(state, action: PayloadAction<Product>) {
      state.filter((t) => t.id !== action.payload.id);
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
