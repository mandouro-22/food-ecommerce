import { Environments } from "@/constants/enums";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./feature/cart/cartSlice";
import loginReducer from "./feature/login/login";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    login: loginReducer,
  },
  devTools: process.env.NODE_ENV === Environments.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
