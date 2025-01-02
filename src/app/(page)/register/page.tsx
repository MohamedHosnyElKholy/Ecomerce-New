"use client";
import React from "react";
import { Label, TextInput, Button } from "flowbite-react";
import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Register() {
  // Mock API call function
    const router = useRouter();
  const fetchApi = async (values) => {
    try {
      const res = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/auth/signup`,
        values
      );
      console.log(res);
      toast.success(res.data.message);
      router.push("/login");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm password is required"),
      phone: Yup.string()
        .matches(/^\d{11}$/, "Phone must be 10 digits")
        .required("Phone number is required"),
    }),
    onSubmit: (values) => {
      fetchApi(values);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white mt-[100px] mb-[100px]">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="name" value="Name" className="text-white" />
            <TextInput
              id="name"
              type="text"
              placeholder="Enter your name"
              {...formik.getFieldProps("name")}
              className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.name && formik.errors.name && (
              <div className="text-red-500 text-sm">{formik.errors.name}</div>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="email" value="Email" className="text-white" />
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email"
              {...formik.getFieldProps("email")}
              className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>
          <div className="mb-4">
            <Label htmlFor="password" value="Password" className="text-white" />
            <TextInput
              id="password"
              type="password"
              placeholder="Enter your password"
              {...formik.getFieldProps("password")}
              className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-500 text-sm">
                {formik.errors.password}
              </div>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="rePassword"
              value="Confirm Password"
              className="text-white"
            />
            <TextInput
              id="rePassword"
              type="password"
              placeholder="Re-enter your password"
              {...formik.getFieldProps("rePassword")}
              className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.rePassword && formik.errors.rePassword && (
              <div className="text-red-500 text-sm">
                {formik.errors.rePassword}
              </div>
            )}
          </div>
          <div className="mb-4">
            <Label
              htmlFor="phone"
              value="Phone Number"
              className="text-white"
            />
            <TextInput
              id="phone"
              type="tel"
              placeholder="Enter your phone number"
              {...formik.getFieldProps("phone")}
              className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-500 text-sm">{formik.errors.phone}</div>
            )}
          </div>
          <Button
            type="submit"
            gradientDuoTone="greenToBlue"
            fullSized={true}
            className="text-white"
          >
            Register
          </Button>
        </form>
        <p className="text-center mt-4">
          Already have an account?{" "}
          <Link
            href={"/login"}
            className="text-blue-400 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
