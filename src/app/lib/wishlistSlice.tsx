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
  count: number;
  product: {
    id: number;
    title: string;
    category: {
      name: string;
    };
    brand: {
      name: string;
    };
    imageCover: string;
  };
}

// تعريف حالة القائمة المفضلة
interface WishlistState {
  items: ProductDetails[];
  loading: boolean;
  error: string | null;
}

// ** دالة لإضافة منتج إلى القائمة المفضلة عبر API **
export const addWishlist = createAsyncThunk<
  ProductDetails[],
  string,
  { rejectValue: string }
>("wishlist/addWishlist", async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("Token is missing.");

    const response = await axios.post(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { productId: id },
      {
        headers: {
          token,
        },
      }
    );

    return response.data.products;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to add product to wishlist"
    );
  }
});

// ** دالة لجلب قائمة المفضلة من API **
export const loggedWishList = createAsyncThunk<
  ProductDetails[],
  void,
  { rejectValue: string }
>("wishlist/loggedWishList", async (_, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("Token is missing.");

    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      {
        headers: {
          token,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to fetch wishlist"
    );
  }
});

// ** دالة لحذف منتج من القائمة المفضلة **
export const removeWishList = createAsyncThunk<
  ProductDetails[],
  string,
  { rejectValue: string }
>("wishlist/removeWishList", async (id, thunkAPI) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return thunkAPI.rejectWithValue("Token is missing.");

    const response = await axios.delete(
      `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
      {
        headers: {
          token,
        },
      }
    );

    return response.data;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(
      error.response?.data?.message || "Failed to remove product from wishlist"
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
  } as WishlistState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addWishlist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addWishlist.fulfilled,
        (state, action: PayloadAction<ProductDetails[]>) => {
          state.loading = false;
          state.error = null;
          state.items = action.payload;
        }
      )
      .addCase(
        addWishlist.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to add product to wishlist";
        }
      )
      .addCase(loggedWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loggedWishList.fulfilled,
        (state, action: PayloadAction<ProductDetails[]>) => {
          state.loading = false;
          state.error = null;
          state.items = action.payload;
        }
      )
      .addCase(
        loggedWishList.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error = action.payload || "Failed to fetch wishlist";
        }
      )
      .addCase(removeWishList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeWishList.fulfilled,
        (state, action: PayloadAction<ProductDetails[]>) => {
          state.loading = false;
          state.error = null;
          state.items = action.payload;
        }
      )
      .addCase(
        removeWishList.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.loading = false;
          state.error =
            action.payload || "Failed to remove product from wishlist";
        }
      );
  },
});

export default wishlistSlice.reducer;
