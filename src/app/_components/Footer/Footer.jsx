"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../lib/loginSlice";

export default function Footer() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const [authoNav, setAuthoNav] = useState(false);

  useEffect(() => {
    // تحقق من التوكن في Redux
    if (token) {
      setAuthoNav(true); // إذا كان التوكن موجودًا في Redux، عرض الـ Navbar
    } else {
      // تحقق من التوكن في localStorage
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        dispatch(setToken(storedToken)); // خزنه في Redux
        setAuthoNav(true); // عرض الـ Navbar بعد تحديث Redux
      } else {
        setAuthoNav(false); // إذا لم يكن هناك توكن
      }
    }
  }, [token, dispatch]);

  // محتوى الفوتر
  const footerContent = (
    <div className="container mx-auto px-4 text-center">
      {/* Header Section */}
      <div className="mb-4">
        <h3 className="text-3xl font-semibold text-purple-600">MovieApp</h3>
        <p className="text-sm text-gray-400">
          Your go-to movie app for the latest and greatest films
        </p>
      </div>

      {/* Navigation Links */}
      <div className="mb-4">
        <Link href="/" className="text-gray-400 hover:text-white mx-2">
          Home
        </Link>
        <Link href="/popular" className="text-gray-400 hover:text-white mx-2">
          Popular Movies
        </Link>
        <Link href="/top-rated" className="text-gray-400 hover:text-white mx-2">
          Top Rated
        </Link>
        <Link href="/upcoming" className="text-gray-400 hover:text-white mx-2">
          Upcoming Movies
        </Link>
      </div>

      {/* Social Media / Contact Links (Optional) */}
      <div className="mb-4">
        <Link
          href="https://facebook.com"
          target="_blank"
          className="text-gray-400 hover:text-white mx-2"
        >
          Facebook
        </Link>
        <Link
          href="https://twitter.com"
          target="_blank"
          className="text-gray-400 hover:text-white mx-2"
        >
          Twitter
        </Link>
        <Link
          href="https://instagram.com"
          target="_blank"
          className="text-gray-400 hover:text-white mx-2"
        >
          Instagram
        </Link>
      </div>

      {/* Footer Text */}
      <div className="mt-6">
        <p className="text-sm text-gray-500">
          &copy; 2024 MovieApp. All Rights Reserved.
        </p>
      </div>
    </div>
  );

  return (
    <footer
      className={`bg-gray-900 text-white py-8 mt-8 ${
        authoNav ? "block" : "hidden"
      }`}
    >
      {footerContent}
    </footer>
  );
}
