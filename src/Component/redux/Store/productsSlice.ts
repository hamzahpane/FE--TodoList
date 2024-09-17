// src/Component/redux/Store/productsSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define Product type based on new API response
interface Product {
  aaData?: {
    id: number;
    name: string;
    photo: string;
    totalPrice: number;
    stock: number;
    childs?: {
      // Include childs
      buyPrice: number;
    }[];
  }[];
}

// Define State type
interface ProductsState {
  items: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  pageSize: number;
  search_name: string; // Add search_name to state
}

// Define initial state
const initialState: ProductsState = {
  items: [],
  status: "idle",
  error: null,
  currentPage: 1,
  pageSize: 3, // Number of products per page
  search_name: "", // Initialize search_name
};

// Define async thunk for fetching products with search_name
export const fetchProducts = createAsyncThunk<Product[], string>(
  "products/fetchProducts",
  async (searchName) => {
    const response = await axios.get(
      `https://sistemtoko.com/public/demo/product?search_name=${searchName}`
    );
    return [response.data]; // Wrap response data in an array if needed
  }
);

// Create slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchName: (state, action) => {
      state.search_name = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // action.payload is now an array of products
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export const { setPage, setSearchName } = productsSlice.actions;
export default productsSlice.reducer;
