'use client'
import React, { useEffect } from "react";
import { Label, TextInput, Button } from "flowbite-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogin, setToken } from "../../lib/loginSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../../store";
import { useRouter } from "next/navigation";

interface LoginValues {
  email: string;
  password: string;
}

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { items, loading, error } = useSelector((state: RootState) => state.login);
  const formik = useFormik<LoginValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      dispatch(fetchLogin(values));
    },
  });

  useEffect(() => {
    if (items) {
      dispatch(setToken(items.token));
      router.push("/"); // تحويل المستخدم إلى صفحة "Home"
    }
  }, [items, router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <Label htmlFor="email" value="Email" className="text-white" />
            <TextInput
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
            )}
          </div>
          {/* Password Field */}
          <div className="mb-4">
            <Label htmlFor="password" value="Password" className="text-white" />
            <TextInput
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.password}
              </p>
            )}
          </div>
          {/* Submit Button */}
          <Button
            type="submit"
            gradientDuoTone="greenToBlue"
            fullSized={true}
            className="text-white"
            disabled={loading} // تعطيل الزر أثناء التحميل
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
          {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
        </form>
        {/* Forgot Password Link */}
        <p className="text-center mt-4">
          <Link href="/forgotPassword" className="text-blue-400 hover:underline">
            Forgot Password?
          </Link>
        </p>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link
            href={"/register"}
            className="text-blue-400 hover:underline font-medium"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
