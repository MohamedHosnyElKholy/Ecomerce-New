"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { AppDispatch, RootState } from "../../../../../store";
import { fetchProductDetails } from "../../../../lib/detialsSlice";
import { fetchProducts } from "../../../../lib/productsSlice";
import { addCart } from "../../../../lib/cartSlice";
import Link from "next/link";
import toast from "react-hot-toast";

// تحديد نوع المنتج
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  ratingsQuantity: number;
  sold: number;
  quantity: number;
  category: string;
}

interface DetailsState {
  item: Product | null;
  loading: boolean;
  error: string | null;
}

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { id, category } = useParams<{ id: string; category: string }>(); // تحديد نوع 'id' و 'category' في useParams

  // جلب البيانات من الـ Redux Store
  const { item, loading, error } = useSelector(
    (state: RootState) => state.details as DetailsState
  );
  const { items: allProducts } = useSelector(
    (state: RootState) => state.products
  );

  // دالة إضافة المنتج إلى السلة
  const handleAddToCart = async (id: number) => {
    try {
      const response = await dispatch(addCart(id)).unwrap();
      console.log("Response:", response);
      toast.success(response.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.success(error.message);
    }
  };

  // استخدام useEffect لتحميل البيانات عند تغيير 'id'
  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [id, dispatch]);

  // تحميل جميع المنتجات عند تحميل الصفحة
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // تصفية المنتجات حسب الفئة
  const filteredProducts = allProducts?.filter((product) => {
    return (
      product.category.name.toLowerCase() ===
      decodeURIComponent(category).toLowerCase()
    );
  });

  // عرض حالات التحميل والتحميل الخاطئ
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black text-white flex flex-col justify-between p-8">
      {/* عرض تفاصيل المنتج */}
      <div className="max-w-3xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg mt-[100px]">
        {item ? (
          <>
            <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
            <img
              src={item.imageCover}
              alt={item.title}
              className="w-full h-72 object-cover rounded-lg mb-6"
            />
            <p className="text-lg mb-4">{item.description}</p>
            <div className="flex justify-between items-center mb-4">
              <p className="text-xl font-semibold">Price: ${item.price}</p>
              <p className="text-yellow-400">{`Rating: ${item.ratingsAverage} (${item.ratingsQuantity} reviews)`}</p>
            </div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-gray-400">Sold: {item.sold}</p>
              <p className="text-gray-400">Quantity: {item.quantity}</p>
            </div>
            <button
              onClick={() => handleAddToCart(item.id)}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xl transition-colors"
            >
              Add to Cart
            </button>
          </>
        ) : (
          <p>No product details available.</p>
        )}
      </div>

      {/* عرض المنتجات المفلترة حسب الفئة */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500">
          Related Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts?.length > 0 ? (
            filteredProducts?.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold mb-2 text-gray-300">
                  {product.title.slice(0, 50)}
                  {product.title.length > 10 && "..."}
                </h3>
                <p className="text-lg mb-4 text-gray-400">
                  {product.description.slice(0, 50)}
                  {product.description.length > 20 && "..."}
                </p>
                <p className="text-xl font-semibold text-yellow-400">
                  Price: ${product.price}
                </p>

                <div className="mt-4 flex flex-col gap-4">
                  <button onClick={() => handleAddToCart(product.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xl transition-colors"
                  >
                    Add to Cart
                  </button>
                  <Link href={`/detials/${product.id}/${product.category.name}`}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-xl transition-colors text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">
              No products found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
