import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
export interface Product {
  id: string;
  name: string;
  price: string;
}

const initialState: Product[] = [
  {
    id: nanoid(),
    name: "Hamburger",
    price: "$5.99",
  },
  {
    id: nanoid(),
    name: "Chicken Nugget",
    price: "$9.99",
  },
  {
    id: nanoid(),
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
    removeProduct(state, action: PayloadAction<string>) {
      state.splice(
        state.findIndex((t) => t.id === action.payload),
        1
      );
    },
  },
});

export const { addProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
