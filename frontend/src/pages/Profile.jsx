import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import { BsArrowLeft } from 'react-icons/bs';

export default function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);

        // Retrieve the user object from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;  // Get the token


        if (!token) {
            toast.error('Please Sign In again.', {
                position: "top-right",
                autoClose: true,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Slide,
            });
              navigate('/signIn');  // Redirect to Sign In if no token
              return;
        }

        // Fetch user profile from the API
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
                headers: {
                    Authorization: `BEARER__${token}`,
                },
            })
            .then((response) => {
                setUser(response.data.user);  // Set the user data to state
                console.log(response.data)
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                const errorMessage = error.response?.data?.message || 'An error occurred';
                toast.error(errorMessage, {
                    position: "top-right",
                    autoClose: true,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Slide,
                });
                console.error(error);
            });
    }, [navigate]);

    return (
        <div className="p-4">
            <div className="flex">
                <Link
                    to={`/`}
                    className="bg-pink-800 text-white px-4 py-1 rounded-lg w-fit"
                >
                    <BsArrowLeft className="text-2xl" />
                </Link>
            </div>
            <h1 className="text-3xl my-8 font-bold">User Profile</h1>
            <div className="border-2 border-sky-400 rounded-xl p-8 mx-auto w-[600px]">
                <h2 className="text-2xl">Name: {user?.userName }</h2>
                <p className="text-xl">Email: {user?.email }</p>
                <p className="text-xl">Joined: {new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
    );
}