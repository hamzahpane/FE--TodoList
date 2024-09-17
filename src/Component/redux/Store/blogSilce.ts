import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define BlogItem type to match API structure
interface BlogItem {
  id: number;
  img: string;
  title: string;
  slug: string;
  body: string;
  status: string;
  type: string;
  posted: string;
  by: string;
}

// Define State type
interface BlogState {
  items: BlogItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define initial state
const initialState: BlogState = {
  items: [],
  status: "idle",
  error: null,
};

// Define async thunk for fetching blogs
export const fetchBlogs = createAsyncThunk<BlogItem[]>(
  "blogs/fetchBlogs",
  async () => {
    const response = await axios.get("https://demo.sistemtoko.com/demo/blog");
    return response.data.aaData; // Fetch the array of blog items from aaData
  }
);

// Create slice
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload; // action.payload is an array of BlogItem
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch blogs";
      });
  },
});

export default blogSlice.reducer;
