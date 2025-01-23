import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from "react-toastify";

const SignIn = ({ login }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);

  const signInUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/signIn`, value);
      if (response.status === 200) {
        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Slide,
        });
        // Save token or user data here
        // استخدام دالة login لتحديث حالة المستخدم
        login(response.data);  // افترض أن الرد يحتوي على بيانات المستخدم أو الرمز المميز
        navigate(`/`); // Redirect to dashboard or another page
      } else {
        setServerError('Invalid email or password');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setServerError('Invalid email or password');
      } else {
        setServerError('Server error, please try again later!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-slate-100 p-8 rounded-lg shadow-lg my-8">
      <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Sign In</h2>
      {serverError && <p className="text-red-500 text-center mb-4">{serverError}</p>}
      <form onSubmit={handleSubmit(signInUser)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Email:</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Invalid email format"
              }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Password:</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              }
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isLoading ? "Loading..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignIn;