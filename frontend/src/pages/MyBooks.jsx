import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import { BsArrowLeft } from 'react-icons/bs';

export default function UserBooks() {
    const [books, setBooks] = useState([]);
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

        // Fetch user books from the API
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/user/user-books`, {
                headers: {
                    Authorization: `BEARER__${token}`,
                },
            })
            .then((response) => {
                setBooks(response.data.data);  // Set the user books to state
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
            <h1 className="text-3xl my-8 font-bold">Your Books</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                    <div key={book._id} className="border-2 border-sky-400 rounded-xl p-4">
                        <h2 className="text-2xl">{book.title}</h2>
                        <p className="text-lg">Author: {book.author}</p>
                        <p className="text-gray-500">Published: {book.publishYear}</p>
                        <Link to={`/books/details/${book._id}`} className="text-blue-500 hover:underline">View Details</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}