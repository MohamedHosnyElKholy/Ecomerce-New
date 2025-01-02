"use client";

import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../../store";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt, FaSpinner } from "react-icons/fa"; // استيراد الأيقونات
import {
  ClearCart,
  loggedCart,
  RemoveCart,
  UpdateCart,
} from "../../lib/cartSlice";

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { items } = useSelector((state: RootState) => state.cart);
  const [loadingId, setLoadingId] = useState<number | null>(null); // حالة التحميل

  useEffect(() => {
    dispatch(loggedCart());
  }, [dispatch]);

  const totalPrice = Array.isArray(items)
    ? items.reduce((acc, item) => acc + item.price * item.count, 0)
    : 0;

  const updateCartItems = async ({
    id,
    count,
  }: {
    id: number;
    count: number;
  }) => {
    setLoadingId(id); // بدء التحميل
    await dispatch(UpdateCart({ id, count }));
    dispatch(loggedCart()); // جلب السلة المحدثة
    setLoadingId(null); // إيقاف التحميل
  };

  const clearCarts = async () => {
    await dispatch(ClearCart());
    dispatch(loggedCart());
    console.log(items)
  };
  return (
    <div className="min-h-screen p-6 pt-[75px]">
      {/* عنوان الصفحة */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white">Shopping Cart</h1>
      </div>

      <button
        onClick={() => clearCarts()}
        className={`px-6 py-2 
    "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"} 
    text-white rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center`}
      >
        Clear All
      </button>

      {/* قائمة العناصر */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((item) => (
            <div
              key={item.product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 relative"
            >
              {/* زر الحذف */}
              <button
                className="absolute top-3 right-3 text-red-600 hover:text-red-800 transition-colors duration-200"
                aria-label="Remove item"
                onClick={() =>
                  updateCartItems({
                    id: item.product.id,
                    count: item.count - 1,
                  })
                }
              >
                <FaTrashAlt className="text-xl" />
              </button>
              <img
                src={item.product.imageCover}
                alt={item.product.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 truncate">
                  {item.product.title}
                </h2>
                <p className="text-gray-600 text-sm mt-1">
                  Price: ${item.price}
                </p>
                <div className="flex items-center mt-4">
                  {/* زر إنقاص العدد */}
                  <button
                    onClick={() =>
                      updateCartItems({
                        id: item.product.id,
                        count: item.count - 1,
                      })
                    }
                    className="px-3 py-1 bg-gray-300 text-black rounded-l-lg"
                  >
                    -
                  </button>
                  {/* العدد أو أيقونة التحميل */}
                  <span className="px-4 py-1 bg-gray-100 text-black rounded-lg flex items-center justify-center">
                    {loadingId === item.product.id ? (
                      <FaSpinner className="text-gray-500 animate-spin" />
                    ) : (
                      item.count
                    )}
                  </span>
                  {/* زر زيادة العدد */}
                  <button
                    onClick={() =>
                      updateCartItems({
                        id: item.product.id,
                        count: item.count + 1,
                      })
                    }
                    className="px-3 py-1 bg-gray-300 text-black rounded-r-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-600">Your cart is empty</div>
        )}
      </div>

      {/* المجموع الكلي */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-md flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Total Price: ${totalPrice.toFixed(2)}
        </h2>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200">
          Checkout
        </button>
      </div>
    </div>
  );
}
