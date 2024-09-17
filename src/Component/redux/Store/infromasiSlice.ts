import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define tipe data untuk informasi
interface InformasiItem {
  page_id: number;
  page_title: string;
  page_img: string;
  page_slug: string;
  page_body: string;
  page_type: string;
  page_user_id: number;
  page_status: string;
  created_at: string;
  updated_at: string;
  basePathImage: string;
}

// Define tipe data untuk state
interface InformasiState {
  item: InformasiItem | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Define initial state
const initialState: InformasiState = {
  item: null,
  status: "idle",
  error: null,
};

// Define async thunk untuk fetch data
export const fetchInform = createAsyncThunk<InformasiItem>(
  "informasi/fetchInform",
  async () => {
    const response = await axios.get(
      "http://demo.sistemtoko.com/public/demo/article/article-test-judul-2"
    );
    return response.data; // Mengembalikan objek tunggal
  }
);

// Create slice
const informasiSlice = createSlice({
  name: "informasi",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInform.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchInform.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.item = action.payload;
      })
      .addCase(fetchInform.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch information";
      });
  },
});

export default informasiSlice.reducer;
