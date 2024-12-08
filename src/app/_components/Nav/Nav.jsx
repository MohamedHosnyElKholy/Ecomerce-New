"use client";
import React from "react";
import Link from "next/link";
import { Navbar } from "flowbite-react";
import Image from "next/image"; // استيراد مكون Image من next
import { usePathname } from "next/navigation"; // استيراد usePathname للتحقق من المسار الحالي
import imageOne from "../../../../public/download.jpg"; // تأكد من مسار الصورة الصحيح

export default function Nav() {
  const pathname = usePathname(); // الحصول على المسار الحالي

  return (
    <Navbar fluid rounded className="fixed top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md">
      <Navbar.Brand as={Link} href="/">
        <Image
          src={imageOne}
          alt="Logo"
          className="mr-3 h-6 sm:h-9"
          width={40} // تعيين العرض المناسب للصورة
          height={40} // تعيين الارتفاع المناسب للصورة
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">
          MovieApp
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link 
          as={Link} 
          href="/popular" 
          active={pathname === "/popular"} 
          className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
        >
          Popular Movies
        </Navbar.Link>
        <Navbar.Link 
          as={Link} 
          href="/rated" 
          active={pathname === "/rated"} 
          className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
        >
          Top Rated Movies
        </Navbar.Link>
        <Navbar.Link 
          as={Link} 
          href="/upcoming" 
          active={pathname === "/upcoming"} 
          className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
        >
          Upcoming Movies
        </Navbar.Link>
        <Navbar.Link 
          as={Link} 
          href="/newMovies" 
          active={pathname === "/newMovies"} 
          className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
        >
          New Movies
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
