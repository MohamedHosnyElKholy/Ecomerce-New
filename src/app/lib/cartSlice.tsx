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

// تعريف حالة السلة
interface DetailsState {
  items: ProductDetails[]; // قائمة المنتجات في السلة
  loading: boolean;
  error: string | null;
  numOfCartItems: number; // عدد العناصر في السلة
}

// استرجاع العدد من Local Storage
const initialNumOfCartItems =
  Number(localStorage.getItem("numOfCartItems")) || 0;

// ** دالة لإضافة منتج إلى السلة عبر API **
export const addCart = createAsyncThunk<
  { message: string; numOfCartItems: number }, // نوع البيانات التي سترجعها الدالة
  string, // نوع البيانات المدخلة (id المنتج)
  { rejectValue: string } // نوع قيمة الرفض
>("cart/addCart", async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("Token is missing.");
    }

    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { productId: id },
      {
        headers: {
          token,
        },
      }
    );

    return {
      message: response.data.message,
      numOfCartItems: response.data.numOfCartItems,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to add product to cart"
    );
  }
});

// ** دالة لجلب السلة الحالية من API **
export const loggedCart = createAsyncThunk<
  { items: ProductDetails[] }, // نوع البيانات التي سترجعها الدالة
  void, // لا حاجة لمدخلات هنا
  { rejectValue: string } // نوع قيمة الرفض
>("cart/loggedCart", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("Token is missing.");
    }

    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      {
        headers: { token },
      }
    );

    return {
      items: response.data.data.products,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch cart"
    );
  }
});

// ** دالة لإزالة منتج من السلة (RemoveCart) **
export const RemoveCart = createAsyncThunk<
  { items: ProductDetails[]; numOfCartItems: number }, // إضافة numOfCartItems
  number, // نوع البيانات المدخلة (id المنتج)
  { rejectValue: string } // نوع قيمة الرفض
>("cart/RemoveCart", async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("Token is missing.");
    }

    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        headers: {
          token,
        },
      }
    );

    return {
      items: response.data.data.products, // المنتجات
      numOfCartItems: response.data.numOfCartItems, // عدد العناصر في السلة
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to remove product from cart"
    );
  }
});

// ** دالة لتحديث عدد المنتج في السلة (UpdateCart) **
export const UpdateCart = createAsyncThunk<
  { items: ProductDetails[]; numOfCartItems: number },
  { id: number; count: number },
  { rejectValue: string }
>("cart/UpdateCart", async ({ id, count }, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("Token is missing.");
    }

    const response = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      { count },
      { headers: { token } }
    );

    return {
      items: response.data.data.products,
      numOfCartItems: response.data.numOfCartItems,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to update product in cart"
    );
  }
});

// ** دالة لتفريغ السلة (ClearCart) **
export const ClearCart = createAsyncThunk<
  { items: ProductDetails[]; numOfCartItems: number },
  void,
  { rejectValue: string }
>("cart/ClearCart", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      return thunkAPI.rejectWithValue("Token is missing.");
    }

    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/cart`,
      { headers: { token } }
    );
    console.log(response); 
    return {
      items: response.data.data.products,
      numOfCartItems: response.data.numOfCartItems,
    };
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to clear the cart"
    );
  }
});

// ** إنشاء الـ Slice **
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // قائمة فارغة لمنتجات السلة
    loading: false,
    error: null,
    numOfCartItems: initialNumOfCartItems,
  } as DetailsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // ** معالج حالة الإضافة إلى السلة **
      .addCase(addCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addCart.fulfilled,
        (
          state,
          action: PayloadAction<{ message: string; numOfCartItems: number }>
        ) => {
          state.loading = false;
          state.error = null;
          state.numOfCartItems = action.payload.numOfCartItems;
          localStorage.setItem(
            "numOfCartItems",
            String(state.numOfCartItems) // حفظ العدد في Local Storage
          );
        }
      )
      .addCase(
        addCart.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to add product to cart";
        }
      )

      // ** معالج حالة جلب السلة **
      .addCase(loggedCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loggedCart.fulfilled,
        (state, action: PayloadAction<{ items: ProductDetails[] }>) => {
          state.items = action.payload.items; // تحديث العناصر فقط
          state.loading = false;
        }
      )
      .addCase(
        loggedCart.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch cart";
        }
      )

      // ** معالج حالة إزالة المنتج من السلة (RemoveCart) **
      .addCase(RemoveCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        RemoveCart.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: ProductDetails[];
            numOfCartItems: number;
          }>
        ) => {
          state.items = action.payload.items; // تحديث قائمة العناصر
          state.numOfCartItems = action.payload.numOfCartItems; // تحديث عدد العناصر
          localStorage.setItem("numOfCartItems", String(state.numOfCartItems)); // حفظ العدد في Local Storage
          state.loading = false;
        }
      )
      .addCase(
        RemoveCart.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to remove product from cart";
        }
      )

      // ** معالج حالة تحديث المنتج في السلة (UpdateCart) **
      .addCase(UpdateCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        UpdateCart.fulfilled,
        (
          state,
          action: PayloadAction<{
            items: ProductDetails[];
            numOfCartItems: number;
          }>
        ) => {
          state.items = action.payload.items;
          state.numOfCartItems = action.payload.numOfCartItems;
          localStorage.setItem("numOfCartItems", String(state.numOfCartItems));
          state.loading = false;
        }
      )
      .addCase(
        UpdateCart.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to update product in cart";
        }
      )

      // ** معالج حالة تفريغ السلة (ClearCart) **
      .addCase(ClearCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        ClearCart.fulfilled,
        (
          state,
          action: PayloadAction<{ items: ProductDetails[]; numOfCartItems: number }>
        ) => {
          state.items = action.payload.items;
          state.numOfCartItems = action.payload.numOfCartItems;
          localStorage.setItem("numOfCartItems", String(state.numOfCartItems));
          state.loading = false;
        }
      )
      .addCase(
        ClearCart.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to clear cart";
        }
      );
  },
});

export default cartSlice.reducer;
