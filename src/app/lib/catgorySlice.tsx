import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// تعريف نوع بيانات الفئة
interface Category {
  id: number;
  name: string;          // اسم الفئة
  imageCover: string;    // الصورة الخاصة بالفئة
  description: string;   // وصف الفئة
  ratingsAverage: number; // متوسط التقييم
}

interface CategoriesState {
  items: Category[] | null; // مصفوفة الفئات
  loading: boolean;
  error: string | null;
}

// دالة لجلب بيانات الفئات من API
export const fetchAllCategories = createAsyncThunk<
  Category[], // نوع البيانات المرجعة
  void, // المدخلات فارغة
  { rejectValue: string } // نوع بيانات الخطأ
>("categories/fetchAllCategories", async (_, thunkAPI) => {
  try {
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/categories"
    );
    console.log(response.data); // فحص البيانات المستلمة
    return response.data.data; // إرجاع الفئات
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch categories"
    );
  }
});

// إنشاء الـ Slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    items: null,
    loading: false,
    error: null,
  } as CategoriesState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllCategories.fulfilled,
        (state, action: PayloadAction<Category[]>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to load categories";
      });
  },
});

export default categoriesSlice.reducer;
