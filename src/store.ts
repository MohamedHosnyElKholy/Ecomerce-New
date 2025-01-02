import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./app/lib/loginSlice";
import productsReducer from "./app/lib/productsSlice"; // إضافة الـ productsSlice إذا كان لديك
import detailsReducer from "./app/lib/detialsSlice";
import cartReducer from "./app/lib/cartSlice";
import wishlistReducer from "./app/lib/wishlistSlice";
const store = configureStore({
  reducer: {
    login: loginReducer,
    products: productsReducer, // إضافة الـ productsReducer إلى الـ store
    details: detailsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // إضافة نوع RootState
export type AppDispatch = typeof store.dispatch; // إضافة نوع AppDispatch

export default store;
