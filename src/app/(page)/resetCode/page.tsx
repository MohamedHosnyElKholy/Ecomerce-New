'use client';
import React from 'react';
import { Label, TextInput, Button } from 'flowbite-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function ResetCode() {
  const router = useRouter();

  // API call to verify the reset code
  const fetchApi = async (values: { resetCode: string }) => {
    try {
      const res = await axios.post(
        'https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',
        values
      );
      toast.success(res.data.message);
      console.log(res);

      // Redirect to set new password page
      router.push('/newPassword'); // Adjust this route as per your application
    } catch (error) {
      console.log(error);
      toast.error("Invalid reset code. Please try again.");
    }
  };

  // Formik setup with validation schema
  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema: Yup.object({
      resetCode: Yup.string()
        .required('Reset code is required')
        .length(6, 'Reset code must be 6 characters long'), // Assuming 6-character code
    }),
    onSubmit: (values) => {
      fetchApi(values);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white mt-[100px] mb-[100px]">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Code</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <Label htmlFor="resetCode" value="Reset Code" className="text-white" />
            <TextInput
              id="resetCode"
              type="text"
              placeholder="Enter the reset code"
              {...formik.getFieldProps('resetCode')}
              className="bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.touched.resetCode && formik.errors.resetCode && (
              <div className="text-red-500 text-sm">{formik.errors.resetCode}</div>
            )}
          </div>
          <Button
            type="submit"
            gradientDuoTone="greenToBlue"
            fullSized={true}
            className="text-white"
          >
            Verify Code
          </Button>
        </form>
        <p className="text-center mt-4">
          Didn't receive the code?{' '}
          <span
            className="text-blue-400 hover:underline font-medium cursor-pointer"
            onClick={() => toast('Code resent successfully!')}
          >
            Resend Code
          </span>
        </p>
      </div>
    </div>
  );
}
