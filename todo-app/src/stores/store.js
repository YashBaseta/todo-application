import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice";
import productReducer from "../features/productSlice";


export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
  },
});
