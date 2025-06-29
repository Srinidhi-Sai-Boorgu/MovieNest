import React from 'react'
import { useState } from 'react';
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import getBaseUrl from '../utils/baseUrl';

const AdminLogin = () => {

    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) => {
        
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const auth = response.data;
            
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    Swal.fire({
                        icon: 'warning',
                        title: 'Session Expired',
                        text: 'Your session has expired. Please log in again.',
                        confirmButtonText: 'OK',
                    }).then(() => {
                        navigate("/");
                    })
                }, 3600 * 1000)
            }

            Swal.fire({
                icon: 'success',
                title: 'Admin Login Successful',
                text: 'You have logged in successfully!',
                confirmButtonText: 'OK',
            });
            navigate("/dashboard");
        } catch (error) {
            setMessage("Please provide a valid email and password.");
            console.error("Error logging in user:", error);
        }
    }

    return (
        <div className='h-[calc(100vh-120px)] flex justify-center items-center'>
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl text-center font-semibold mb-4'>Admin Dashboard Login</h2>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">Username</label>
                        <input
                            {...register("username", { required: true })}
                            type="text" name='username' id='username' placeholder='Username' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">Password</label>
                        <input
                            {...register("password", { required: true })}
                            type="password" name='password' id='password' placeholder='Password' className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow' />
                    </div>
                    {
                        message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>
                    }
                    <div>
                        <button className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>Login</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin