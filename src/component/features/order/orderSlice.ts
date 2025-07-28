import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  productID: string;
  productName: string;
  productPrice: string;
  amount: number;
}

export interface Order {
  orderID: string;
  orderName: string;
  orderList: Product[];
}

export interface ProductAdded {
  orderID: string;
  product: Product;
}

export interface ProductRemoved {
  orderID: string;
  productID: string;
}

const initialState: Order[] = [
  {
    orderID: nanoid(),
    orderName: "Order 1",
    orderList: [],
  },
];

export const orderSlice = createSlice({
  name: "orderList",
  initialState,
  reducers: {
    addProduct(state, action: PayloadAction<ProductAdded>) {
      const temp = state.findIndex((o) => o.orderID === action.payload.orderID);
      const seek = state[temp].orderList.findIndex(
        (p) => p.productID === action.payload.product.productID
      );
      if (seek) {
        state[temp].orderList[seek].amount += 1;
      } else {
        state[temp].orderList.push(action.payload.product);
      }
    },
    removeProduct(state, action: PayloadAction<ProductRemoved>) {
      const temp = state.findIndex((o) => o.orderID === action.payload.orderID);
      const seek = state[temp].orderList.findIndex(
        (p) => p.productID === action.payload.productID
      );
      if (state[temp].orderList[seek].amount === 1) {
        state[temp].orderList.splice(seek, 1);
      } else {
        state[temp].orderList[seek].amount -= 1;
      }
    },
    addOrder(state, action: PayloadAction<string>) {
      const temp: Order = {
        orderID: nanoid(),
        orderName: action.payload,
        orderList: [],
      };
      state.push(temp);
    },
    removeOrder(state, action: PayloadAction<string>) {
      const temp = state.findIndex((o) => o.orderID === action.payload);
      state.splice(temp);
    },
  },
});

export const { addProduct, removeProduct, addOrder, removeOrder } =
  orderSlice.actions;
export default orderSlice.reducer;
