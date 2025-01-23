import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Slide, toast } from 'react-toastify';
import { BsArrowLeft } from 'react-icons/bs';

export default function CreateBooks() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = (data) => {
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
      .post('http://localhost:3000/books', data, {
        headers: {
          Authorization: `BEARER__${token}`,
        },
      })
      .then(() => {
        setLoading(false);
        toast.success('Book Created successfully', {
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
        reset(); // Reset form fields
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
      <h1 className='text-3xl my-8 font-bold'>Create Book</h1>
      {loading && <Spinner />}
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            {...register('title', { required: 'Title is required' })}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            {...register('author', { required: 'Author is required' })}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          {errors.author && <p className="text-red-500">{errors.author.message}</p>}
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            {...register('publishYear', {
              required: 'Publish Year is required',
              min: { value: 1000, message: 'Enter a valid year' },
              max: { value: new Date().getFullYear(), message: 'Year cannot be in the future' }
            })}
            className='border-2 border-gray-500 px-4 py-2 w-full'
          />
          {errors.publishYear && <p className="text-red-500">{errors.publishYear.message}</p>}
        </div>
        <button type='submit' className='p-2 bg-sky-300 m-8'>
          Save
        </button>
      </form>
    </div>
  );
}