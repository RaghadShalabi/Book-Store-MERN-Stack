import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Slide, toast } from "react-toastify";

const SignUp = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [serverError, setServerError] = useState(null);


    const signUpUser = async (value) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`http://localhost:3000/auth/signUp`, value);
            console.log(response);
            if (response.status == 201) {
                toast.info('Please check your email', {
                    position: "top-right",
                    autoClose: false,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
                // navigate(`/signIn`);
            } else {
                alert('Failed to register user');
            }
            console.log(value);
        } catch (error) {
            if (error.response.status == 409) {
                setServerError('Email address already exists');
            } else {
                setServerError('server error, please try again later!');
            }
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <div className="max-w-md mx-auto bg-slate-100 p-8 rounded-lg shadow-lg my-8">
            <h2 className="text-center text-2xl font-semibold text-gray-800 mb-6">Sign Up</h2>
            {serverError ? <p className="text-red-500 text-center mb-4">{serverError}</p>:null}
            <form onSubmit={handleSubmit(signUpUser)}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Username:</label>
                    <input
                        type="text"
                        {...register("userName", { required: "Username is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.userName && <p className="text-red-500 text-sm">{errors.userName.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Email:</label>
                    <input
                        type="email"
                        {...register("email", { required: "Email is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Password:</label>
                    <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </div>

                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    {isLoading ? "Loading..." : "Sign Up"}
                </button>
            </form>
        </div>
    );
};

export default SignUp;