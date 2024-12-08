"use client";
import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-8">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-2xl font-semibold">MovieApp</h3>
          <p className="text-sm text-gray-400">Your go-to movie app</p>
        </div>
        <div className="mb-4">
          <Link href="/" className="text-gray-400 hover:text-white mx-2">Home</Link>
          <Link href="/popular" className="text-gray-400 hover:text-white mx-2">Popular Movies</Link>
          <Link href="/top-rated" className="text-gray-400 hover:text-white mx-2">Top Rated</Link>
          <Link href="/upcoming" className="text-gray-400 hover:text-white mx-2">Upcoming Movies</Link>
        </div>
        <div className="mt-6">
          <p className="text-sm text-gray-500">&copy; 2024 MovieApp. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
