import { configureStore } from "@reduxjs/toolkit";
import products from "../src/app/lib/detialsSlice.jsx";
import movies from "../src/app/lib/AllPopularSlice.jsx";
const store = configureStore({
  reducer: {
    products,
    movies,
  },
});

export default store;
