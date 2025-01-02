'use client';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

export default function Page() {
  const [categories, setCategories] = useState([]);

  const fetchCategory = async () => {
    try {
      // استدعاء API والحصول على البيانات باستخدام await
      const response = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      console.log(response.data.data.slice(0, 3)); // طباعة البيانات في الكونسول
      setCategories(response.data.data.slice(0, 3)); // حفظ الفئات في الحالة
    } catch (error) {
      console.error('Error fetching categories:', error.message); // معالجة الخطأ
    }
  };

  useEffect(() => {
    fetchCategory(); // استدعاء الدالة عند التحميل
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {categories.map((category) => (
        <div
          key={category._id}
          className="flex items-center justify-center bg-gradient-to-r from-gray-800 to-black pt-[80px] pb-10 rounded-lg shadow-lg"
        >
          <div className="flex items-center w-full px-4">
            {/* صورة الفئة على الجهة اليسرى */}
            <div className="w-full sm:w-1/3 md:w-1/4">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
            {/* النص على الجهة اليمنى */}
            <div className="w-full sm:w-2/3 md:w-3/4 pl-6">
              <h3 className="text-3xl font-bold text-white mb-2">{category.name}</h3>
              <p className="text-gray-400 text-lg">{category.slug}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
}
