'use client'
import React, { useEffect } from "react";
import { fetchAllCategories } from "../../lib/catgorySlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store";
import { Card } from 'flowbite-react';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.categories);

  // جلب البيانات عند تحميل الصفحة
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // إذا كانت البيانات قيد التحميل
  if (loading) {
    return <div>Loading...</div>;
  }

  // في حالة وجود خطأ
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Categories
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.isArray(items) && items.length > 0 ? (
          items.map((category) => (
            <Card key={category._id} className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{category.name}</h2>
                <p className="text-sm text-gray-600 mt-2">{category.description}</p>
              </div>
            </Card>
          ))
        ) : (
          <p className="text-center text-gray-500">No categories available.</p>
        )}
      </div>
    </div>
  );
}
