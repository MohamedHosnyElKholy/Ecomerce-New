'use client'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loggedWishList, removeWishList } from '../../lib/wishlistSlice';
import { AppDispatch, RootState } from '../../../store';
import { Card, Button, Spinner } from 'flowbite-react';

export default function Page() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.wishlist);

  useEffect(() => {
    dispatch(loggedWishList());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  const removeWishListItems = async (id: string) => {
    await dispatch(removeWishList(id));
    dispatch(loggedWishList());
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
        Your Wishlist
      </h1>
      {Array.isArray(items?.data) && items.data.length === 0 ? (
        <p className="text-center text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {Array.isArray(items?.data) && items.data.map((item: any, index: number) => (
            <Card
              key={item.id || index} // استخدم index إذا كان id غير متوفر
              className="shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-lg overflow-hidden"
            >
              <img
                src={item.imageCover}
                alt={item.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {item.description}
                </p>
                <p className="text-xl font-bold text-gray-900 mt-4">
                  ${item.price}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Rating: {item.ratingsAverage} ({item.ratingsQuantity} reviews)
                </p>
                <div className="mt-4 flex justify-between">
                  <Button
                    onClick={() => removeWishListItems(item.id)}
                    color="failure"
                    size="sm"
                    className="w-full text-sm flex justify-center"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
