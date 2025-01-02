// lib/detailsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// تعريف نوع بيانات المنتج
interface ProductDetails {
  id: number;
  title: string;
  price: number;
  imageCover: string;
  description: string;
  ratingsAverage: number;
}

interface DetailsState {
  item: ProductDetails | null; // بيانات منتج واحد
  loading: boolean;
  error: string | null;
}

// دالة لجلب بيانات منتج واحد من API
export const fetchProductDetails = createAsyncThunk<
  ProductDetails, // نوع البيانات التي سيتم إرجاعها من API
  number, // المدخل هو id المنتج
  { rejectValue: string } // نوع البيانات عند حدوث خطأ
>("details/fetchProductDetails", async (id, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    return response.data.data; // إرجاع بيانات المنتج
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch product details"
    );
  }
});

// إنشاء الـ Slice
const detailsSlice = createSlice({
  name: "details",
  initialState: {
    item: null,
    loading: false,
    error: null,
  } as DetailsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductDetails.fulfilled,
        (state, action: PayloadAction<ProductDetails>) => {
          state.loading = false;
          state.item = action.payload;
        }
      )
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load product details";
      });
  },
});

export default detailsSlice.reducer;
