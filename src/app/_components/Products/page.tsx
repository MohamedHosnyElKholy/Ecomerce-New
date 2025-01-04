"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../lib/productsSlice";
import { AppDispatch, RootState } from "../../../store";
import Link from "next/link";
import { addCart } from "../../lib/cartSlice";
import toast from "react-hot-toast";

// استيراد أيقونة القلب من React Icons
import { FaHeart } from "react-icons/fa";
import { addWishlist } from "../../lib/wishlistSlice";

// تعريف نوع المنتج (Product)
interface Category {
  name: string;
}

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  imageCover: string;
  ratingsAverage: number;
  category: Category;
}

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const {
    items: cart,
    loading: loadcart,
    error: errorcart,
  } = useSelector((state: RootState) => state.cart);

  const {
    items: wishList,
  } = useSelector((state: RootState) => state.wishlist);


  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

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

  const handleWishList = async (id: number) => {
    try {
      const response = await dispatch(addWishlist(id)).unwrap();
      console.log("Response:", response);
      toast.success(response.message);
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.success(error.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-10 text-lg font-semibold text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-10 text-red-400">Error: {error}</div>;
  }

  return (
    <div className="antialiased bg-gradient-to-r from-gray-900 to-black min-h-screen text-white flex flex-col">
      <header className="text-center py-6 bg-gray-800 shadow-lg">
        <h1 className="text-4xl font-extrabold text-white tracking-wider">
          Our Products
        </h1>
        <p className="text-gray-400 text-sm mt-2">
          Discover our latest collection
        </p>
      </header>
      <main className="container mx-auto px-6 py-8 flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {items?.map((product: Product) => (
            <div
              key={product.id}
              className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300"
            >
              <img
                src={product.imageCover}
                alt={product.title}
                className="w-full h-60 object-cover rounded-t-lg"
              />
              <div className="p-5">
                <h2 className="text-lg font-semibold text-white truncate">
                  {product.title}
                </h2>
                <p className="text-sm text-gray-400 mt-2">
                  {product.description.substring(0, 80)}...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-green-400 font-bold text-xl">
                    ${product.price}
                  </span>
                  <span className="text-sm text-gray-400">
                    {product.ratingsAverage} ★
                  </span>
                </div>
                <div className="mt-4 space-y-3">
                  <Link
                    href={`/detials/${product.id}/${product.category.name}`}
                    className="w-full block text-center py-2 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full block text-center py-2 px-6 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleWishList(product.id)}
                    className="w-full block text-center py-2 px-6 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 mt-2"
                  >
                    <FaHeart className="inline-block mr-2 text-lg" />
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <footer className="text-center py-6 bg-gray-800 text-gray-500 text-sm">
        © 2024 E-Commerce. All rights reserved.
      </footer>
    </div>
  );
}
