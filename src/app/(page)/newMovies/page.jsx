'use client';
import { AllMovie } from "../../lib/AllPopularSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";

export default function Page() {
  const [show, setShow] = useState([]);
  const [page, setPage] = useState(1); // الصفحة تبدأ من 1
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(AllMovie({ page })); // إرسال الصفحة المطلوبة عند تحميل البيانات
  }, [dispatch, page]);

  useEffect(() => {
    if (items) {
      setShow((prevItems) => [...prevItems, ...items]); // دمج البيانات القديمة والجديدة
    }
  }, [items]);

  const handlePage = () => {
    setPage((prevPage) => prevPage + 1); // زيادة رقم الصفحة عند الضغط على زر "Load More"
  };

  return (
    <div className="pt-[100px] px-4">
      {/* العنوان الرئيسي */}
      <h1 className="text-4xl font-bold text-purple-600 text-center mb-6">
        New Movies 🎬
      </h1>

      {/* شبكة عرض الأفلام */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {show &&
          show.map((movie, index) => (
            <Link
              href={`/detials/${movie.id}`}
              key={`${movie.id}-${index}`}
              className="bg-purple-100 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                width={500}
                height={750}
                className="w-full h-auto"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-purple-700">
                  {movie.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {movie.release_date} | Rating: {movie.vote_average}
                </p>
                <p className="text-gray-700 text-sm mt-2">
                  {movie.overview
                    ? movie.overview.substring(0, 100)
                    : "No overview available"}
                  ...
                </p>
              </div>
            </Link>
          ))}
      </div>

      {/* زر تحميل المزيد */}
      <div className="col-span-full text-center mt-6">
        <button
          onClick={handlePage}
          className="bg-purple-600 hover:bg-purple-800 text-white py-2 px-6 rounded-lg transition-colors duration-300"
        >
          Load More Movies
        </button>
      </div>
    </div>
  );
}
