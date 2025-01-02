import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// تعريف نوع بيانات المنتج
interface ProductDetails {
  id: number; // معرف المنتج
  title: string; // عنوان المنتج
  price: number; // سعر المنتج
  imageCover: string; // رابط صورة الغلاف للمنتج
  description: string; // وصف المنتج
  ratingsAverage: number; // التقييم المتوسط للمنتج
  count: number; // عدد المنتج في السلة
  product: {
    id: number; // معرف المنتج
    title: string; // عنوان المنتج
    category: {
      name: string; // اسم الفئة
    };
    brand: {
      name: string; // اسم العلامة التجارية
    };
    imageCover: string; // صورة غلاف المنتج
  }; // تفاصيل المنتج
}

// تعريف حالة القائمة المفضلة
interface WishlistState {
  items: ProductDetails[]; // قائمة المنتجات المفضلة
  loading: boolean;
  error: string | null;
  numOfWishlistItems: number; // عدد العناصر في القائمة المفضلة
}

// ** دالة لإضافة منتج إلى القائمة المفضلة عبر API **
export const addWishlist = createAsyncThunk<
  { message: string; numOfWishlistItems: number }, // نوع البيانات التي سترجعها الدالة
  string, // نوع البيانات المدخلة (id المنتج)
  { rejectValue: string } // نوع قيمة الرفض
>("wishlist/addWishlist", async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("Token is missing.");
    }

    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: id },
      {
        headers: {
          token,
        },
      }
    );

    return {
      message: response.data.message,
      numOfWishlistItems: response.data.numOfWishlistItems,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to add product to wishlist"
    );
  }
});

// ** إنشاء الـ Slice **
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
    numOfWishlistItems: 0, // تأكيد أن numOfWishlistItems يبدأ من 0
  } as WishlistState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ** معالج حالة الإضافة إلى القائمة المفضلة **
      .addCase(addWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addWishlist.fulfilled,
        (
          state,
          action: PayloadAction<{ message: string; numOfWishlistItems: number }>
        ) => {
          state.loading = false;
          state.error = null;
          state.numOfWishlistItems = action.payload.numOfWishlistItems;
          localStorage.setItem(
            "numOfWishlistItems",
            String(state.numOfWishlistItems) // حفظ العدد في Local Storage
          );
        }
      )
      .addCase(
        addWishlist.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to add product to wishlist";
        }
      );
  },
});

export default wishlistSlice.reducer;
