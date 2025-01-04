"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar, Button } from "flowbite-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { FaHeart, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import imageOne from "../../../../public/download.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setToken } from "../../lib/loginSlice";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);

  // استخراج عدد العناصر في السلة من Redux
  const numOfCartItems = useSelector((state) => state.cart.numOfCartItems);
  const [authoNav, setAuthoNav] = useState(false);
  const [loading, setLoading] = useState(true); // حالة التحميل

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        setAuthoNav(true); // إذا كان التوكن موجودًا في الـ Redux
      } else {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
          dispatch(setToken(storedToken)); // خزّن التوكن في Redux
          setAuthoNav(true);
        } else {
          setAuthoNav(false); // إذا لم يكن هناك توكن
        }
      }
      setLoading(false); // انتهاء حالة التحميل
    };

    checkToken();
  }, [token, dispatch]);

  useEffect(() => {
    if (!loading && !token) {
      router.push("/login"); // التوجيه بعد التحقق
    }
  }, [token, loading, router]);

  const handleLogout = async () => {
    // إزالة التوكن من localStorage
    localStorage.removeItem("token");

    // تحديث حالة المصادقة في Redux
    await dispatch(setLogout());

    // التوجيه إلى صفحة تسجيل الدخول
    router.push("/login");
  };

  if (loading) {
    // عرض حالة تحميل بسيطة أثناء التحقق
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <>
      {authoNav ? (
        <Navbar
          fluid
          rounded
          className="fixed items-center top-0 left-0 w-full z-50 bg-white dark:bg-gray-900 shadow-md"
        >
          <Navbar.Brand as={Link} href="/">
            <Image
              src={imageOne}
              alt="Logo"
              className="mr-3 h-6 sm:h-9"
              width={40}
              height={40}
            />
            <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-900 dark:text-white">
              MovieApp
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            {/* روابط النافبار */}
            <Navbar.Link
              as={Link}
              href="/categories"
              active={pathname === "/categories"}
              className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
            >
              Categories
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              href="/brands"
              active={pathname === "/brands"}
              className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
            >
              Brands
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              href="/products"
              active={pathname === "/products"}
              className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
            >
              Products
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              href="/user-addresses"
              active={pathname === "/user-addresses"}
              className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
            >
              User Addresses
            </Navbar.Link>
            <Navbar.Link
              as={Link}
              href="/orders"
              active={pathname === "/orders"}
              className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400"
            >
              Orders
            </Navbar.Link>
            <div className="flex items-center space-x-4">
              <Link
                href="/wishlist"
                className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 flex items-center justify-center"
              >
                <FaHeart className="text-lg text-red-500" />
              </Link>
              <Link
                href="/cart"
                className="text-gray-900 dark:text-white hover:text-purple-600 dark:hover:text-purple-400 flex items-center justify-center relative"
              >
                <FaShoppingCart className="text-lg text-blue-500" />
                {numOfCartItems > 0 && (
                  <span className="absolute top-[-5px] right-[-5px] bg-red-500 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                    {numOfCartItems}
                  </span>
                )}
              </Link>
              <Button
                color="purple"
                className="ml-4"
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </Button>
            </div>
          </Navbar.Collapse>
        </Navbar>
      ) : null}
    </>
  );
}
