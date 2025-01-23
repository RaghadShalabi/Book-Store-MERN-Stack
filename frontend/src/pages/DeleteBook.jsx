import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import { BsArrowLeft } from 'react-icons/bs';

export default function DeleteBook() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    // Retrieve the user object from localStorage
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user?.token;  // Get the token
        if (!token) {
          setLoading(false);
          toast.error('Please login again.', {
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
          return;
        }
    
    axios
      .delete(`http://localhost:3000/books/${id}`,{
        headers: {
          Authorization: `BEARER__${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        toast.success('Book Deleted successfully', {
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
        navigate('/');
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
        console.log(error);
      });
  };

  return (
    <div className='p-4'>
      <div className="flex">
        <Link
          to={`/`}
          className="bg-pink-800 text-white px-4 py-1 rounded-lg w-fit"
        >
          <BsArrowLeft className="text-2xl" />
        </Link>
      </div>
      <h1 className='text-3xl my-8 font-bold'>Delete Book</h1>
      {loading ? <Spinner /> : ''}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
        <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>

        <button
          className='p-4 bg-red-600 text-white m-8 w-full'
          onClick={handleDeleteBook}
        >
          Yes, Delete it
        </button>
      </div>
    </div>
  )
}
