'use client';
import React from 'react';
import { Label, TextInput, Button } from 'flowbite-react';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ForgotPassword() {
  const router = useRouter();

  // Mock API call function
  const fetchApi = async (values: { email: string }) => {
    try {
      const res = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',
        values
      );
      toast.success(res.data.message)
      console.log(res);
      router.push('/resetCode');
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again.");
    }
  };

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    }),
    onSubmit: (values) => {
      fetchApi(values);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white mt-[100px] mb-[100px]">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="email" value="Email" className="text-white" />
            <TextInput
              id="email"
              type="email"
              placeholder="Enter your email"
              {...formik.getFieldProps('email')}
              className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            )}
          </div>
          <Button
            type="submit"
            gradientDuoTone="greenToBlue"
            fullSized={true}
            className="text-white"
          >
            Send Reset Link
          </Button>
        </form>
        <p className="text-center mt-4">
          Remember your password?{' '}
          <Link
            href="/login"
            className="text-blue-400 hover:underline font-medium"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
