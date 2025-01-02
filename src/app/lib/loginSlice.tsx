import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// تعريف نوع بيانات الاستجابة
interface LoginResponse {
  // حدد البيانات التي تتوقعها من الاستجابة هنا
  token: string;
  user: { id: number; name: string; email: string };
}

interface LoginState {
  items: LoginResponse | null;
  loading: boolean;
  error: string | null;
  token: string | null;
}

// دالة لجلب بيانات الـ Login من API
export const fetchLogin = createAsyncThunk<
  LoginResponse, // نوع البيانات التي سيتم إرجاعها من API
  { email: string; password: string }, // نوع البيانات المرسلة
  { rejectValue: string } // نوع البيانات عند حدوث خطأ
>("login/fetchLogin", async (values, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      values
    );
    localStorage.setItem("token", response.data.token);
    toast.success(response.data.message);
    console.log(response.data);
    return response.data; // تأكد من أن `response.data` يحتوي على البيانات المطلوبة
  } catch (error: any) {
    console.log(error.response.data.message);
    toast.error(error.response.data.message);
    return error.response.data;
  }
});

// إنشاء الـ Slice
const loginSlice = createSlice({
  name: "login",
  initialState: {
    items: null,
    loading: false,
    error: null,
    token: null,
  } as LoginState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLogout: (state, action) => {
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchLogin.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to login";
      });
  },
});
export const { setToken, setLogout } = loginSlice.actions;
export default loginSlice.reducer;
