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
    editProduct(state, action: PayloadAction<Product>) {
      let i = state.findIndex((t) => t.id === action.payload.id);
      state[i].name = action.payload.name;
      state[i].price = action.payload.price;
    },
    removeProduct(state, action: PayloadAction<string>) {
      state.splice(
        state.findIndex((t) => t.id === action.payload),
        1
      );
    },
  },
});

export const { addProduct, editProduct, removeProduct } = productSlice.actions;
export default productSlice.reducer;
