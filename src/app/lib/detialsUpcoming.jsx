import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء دالة لجلب البيانات من API
const apiKey = "02a708bf6e4b7205976338b061b32fc6";
export const detialsUpcoming = createAsyncThunk(
  "products/fetchProducts",
  async ({ id }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    );
    return response.data; // تأكد من التحقق من هيكل البيانات
  }
);

// إنشاء slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(detialsUpcoming.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(detialsUpcoming.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(detialsUpcoming.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
