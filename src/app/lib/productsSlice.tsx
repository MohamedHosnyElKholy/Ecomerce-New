// lib/productsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// تعريف نوع بيانات المنتج
interface Product {
  id: number;
  title: string;       // تعديل name إلى title
  price: number;
  imageCover: string;  // تعديل image إلى imageCover
  description: string;
  ratingsAverage: number;
}

interface ProductsState {
  items: Product[] | null; // مصفوفة من المنتجات
  loading: boolean;
  error: string | null;
}

// دالة لجلب بيانات المنتجات من API
export const fetchProducts = createAsyncThunk<
  Product[], // نوع البيانات التي سيتم إرجاعها من API
  void, // لا يوجد مدخلات في هذه الحالة
  { rejectValue: string } // نوع البيانات عند حدوث خطأ
>("products/fetchProducts", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/products"
    );
    console.log(response.data); // تأكد من أن `response.data` يحتوي على المنتجات
    return response.data.data; // إرجاع المنتجات المستلمة من API
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch products"
    );
  }
});

// إنشاء الـ Slice
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: null,
    loading: false,
    error: null,
  } as ProductsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProducts.fulfilled,
        (state, action: PayloadAction<Product[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load products";
      });
  },
});

export default productsSlice.reducer;
