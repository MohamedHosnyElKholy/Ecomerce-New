'use client';
import React from 'react';
import { Label, TextInput, Button } from 'flowbite-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function NewPassword() {
  const router = useRouter();

  // API call to set the new password
  const fetchApi = async (values: { email: string; newPassword: string }) => {
    try {
      const res = await axios.put(
        'https://ecommerce.routemisr.com/api/v1/auth/resetPassword',
        values
      );
      toast.success(res.data.message);
      console.log(res);

      // Redirect to login page
      router.push('/login');
    } catch (error) {
      console.log(error);
      toast.error("Failed to reset password. Please try again.");
    }
  };

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      email: '',
      newPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      newPassword: Yup.string()
        .required('New password is required')
        .min(6, 'Password must be at least 6 characters long'),
    }),
    onSubmit: (values) => {
      fetchApi(values);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white mt-[100px] mb-[100px]">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Set New Password</h2>
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
          <div className="mb-4">
            <Label htmlFor="newPassword" value="New Password" className="text-white" />
            <TextInput
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              {...formik.getFieldProps('newPassword')}
              className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-red-500 text-sm">{formik.errors.newPassword}</div>
            )}
          </div>
          <Button
            type="submit"
            gradientDuoTone="greenToBlue"
            fullSized={true}
            className="text-white"
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}
