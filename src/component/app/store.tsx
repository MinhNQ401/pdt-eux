import orderReducer from "@/src/component/features/order/orderSlice";
import productReducer from "@/src/component/features/product/productSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
  },
});

export type AppStore = typeof store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
