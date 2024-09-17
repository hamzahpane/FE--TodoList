// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";
import blogReducer from "./blogSilce";
import infromReducer from "./infromasiSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    blogs: blogReducer,
    infrom: infromReducer,
  },
});

// Define RootState and AppDispatch types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
