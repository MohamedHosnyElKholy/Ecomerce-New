import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// إنشاء دالة لجلب البيانات من API
const apiKey = "02a708bf6e4b7205976338b061b32fc6";
// جلب الأفلام الشعبية
export const AllMovie = createAsyncThunk(
  "movies/fetchPopularMovies",
  async ({ page }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=${apiKey}`
    );
    return response.data; // تأكد من أن الاستجابة تحتوي على البيانات بشكل صحيح
  }
);

// جلب الأفلام الأعلى تصنيفاً
export const AllTopRated = createAsyncThunk(
  "movies/fetchTopRatedMovies",
  async ({ page }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}&api_key=${apiKey}`
    );
    return response.data; // تأكد من أن الاستجابة تحتوي على البيانات بشكل صحيح
  }
);

// جلب الأفلام القادمة
export const AllUpcoming = createAsyncThunk(
  "movies/fetchUpcomingMovies",
  async ({ page }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}&api_key=${apiKey}`
    );
    return response.data; // تأكد من أن الاستجابة تحتوي على البيانات بشكل صحيح
  }
);


export const AllNewMovies = createAsyncThunk(
  "movies/fetchNewMovies",
  async ({ page }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}&api_key=${apiKey}
`
    );
    return response.data; // تأكد من أن الاستجابة تحتوي على البيانات بشكل صحيح
  }
);



// إنشاء slice
const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(AllMovie.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AllMovie.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...action.payload.results]; // تأكد من الوصول إلى نتائج الأفلام
      })
      .addCase(AllMovie.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(AllTopRated.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AllTopRated.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...action.payload.results]; // تأكد من الوصول إلى نتائج الأفلام
      })
      .addCase(AllTopRated.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(AllUpcoming.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AllUpcoming.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...action.payload.results]; // تأكد من الوصول إلى نتائج الأفلام
      })
      .addCase(AllUpcoming.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(AllNewMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AllNewMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...action.payload.results]; // تأكد من الوصول إلى نتائج الأفلام
      })
      .addCase(AllNewMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default moviesSlice.reducer;
