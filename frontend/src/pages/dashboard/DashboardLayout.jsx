import React from 'react'
import Loading from '../../components/Loading';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiViewGridAdd } from 'react-icons/hi';
import { MdOutlineManageHistory } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { IoFilmOutline } from 'react-icons/io5';
import Swal from 'sweetalert2';

const DashboardLayout = () => {

    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token');
        Swal.fire({
            icon: 'success',
            title: 'Logged out successfully',
            showConfirmButton: false,
            timer: 1500
        });
        navigate("/")
    }

    return (
        <section className="flex md:bg-gray-100 min-h-screen overflow-hidden">
            <aside className="hidden sm:flex sm:flex-col">
                <a href="/" className="inline-flex items-center justify-center h-20 w-20 bg-red-500 hover:bg-red-600 focus:bg-red-600">
                    <FaHome className='size-8' />
                </a>
                <div className="flex-grow flex flex-col justify-between text-gray-500 bg-gray-800">
                    <nav className="flex flex-col mx-4 my-6 space-y-4">

                        <Link to="/dashboard" className="inline-flex items-center justify-center py-3 text-red-600 bg-white rounded-lg">
                            <span className="sr-only">Dashboard</span>
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </Link>
                        <Link to="/dashboard/add-new-movie" className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                            <span className="sr-only">Add Movie</span>
                            <HiViewGridAdd className="h-6 w-6" />
                        </Link>
                        <Link to="/dashboard/manage-movies" className="inline-flex items-center justify-center py-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                            <span className="sr-only">Documents</span>
                            <MdOutlineManageHistory className="h-6 w-6" />
                        </Link>
                    </nav>
                    <div className="inline-flex items-center justify-center h-20 w-20 border-t border-gray-700">
                        <button className="p-3 hover:text-gray-400 hover:bg-gray-700 focus:text-gray-400 focus:bg-gray-700 rounded-lg">
                            <span className="sr-only">Settings</span>
                            <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </aside>
            <div className="flex-grow text-gray-800">
                <header className="flex items-center h-20 px-6 sm:px-10 bg-white">
                    <button className="block sm:hidden relative flex-shrink-0 p-2 mr-2 text-gray-600 hover:bg-gray-100 hover:text-gray-800 focus:bg-gray-100 focus:text-gray-800 rounded-full">
                        <span className="sr-only">Menu</span>
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </button>
                    <div className="flex items-center space-x-2">
                        <IoFilmOutline className="text-5xl text-red-600" />
                        <span className="text-3xl font-extrabold text-gray-900">
                            Movie<span className="text-red-600">Nest</span>
                        </span>
                    </div>
                    <div className="flex flex-shrink-0 items-center ml-auto">
                        <button className="inline-flex items-center p-2 hover:bg-gray-100 focus:bg-gray-100 rounded-lg">
                            <span className="sr-only">User Menu</span>
                            <div className="hidden md:flex md:flex-col md:items-end md:leading-tight">
                                <span className="font-semibold">Calvin Steward</span>
                                <span className="text-sm text-gray-600">Lecturer</span>
                            </div>
                            <span className="h-12 w-12 ml-2 sm:ml-3 mr-2 bg-gray-100 rounded-full overflow-hidden">
                                <img src="https://randomuser.me/api/portraits/men/81.jpg" alt="user profile photo" className="h-full w-full object-cover" />
                            </span>

                        </button>
                        <div className="border-l pl-3 ml-3 space-x-1">
                            <button
                                onClick={handleLogout}
                                className="relative p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 rounded-full">
                                <span className="sr-only">Log out</span>
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </header>
                <main className="p-6 sm:p-10 space-y-6 ">
                    <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
                        <div className="mr-6">
                            <h1 className="text-4xl font-semibold mb-2">Admin Dashboard</h1>
                            <h2 className="text-gray-600 ml-0.5">Movie Store Inventory</h2>
                        </div>
                        <div className="flex flex-col md:flex-row items-start justify-end -mb-3">
                            <Link to="/dashboard/manage-movies" className="inline-flex px-5 py-3 text-red-600 hover:text-red-700 focus:text-red-700 hover:bg-red-100 focus:bg-red-100 border border-red-600 rounded-md mb-3">
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-5 w-5 -ml-1 mt-0.5 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                Manage Movies
                            </Link>
                            <Link to="/dashboard/add-new-movie" className="inline-flex px-5 py-3 text-white bg-red-500 hover:bg-red-600 focus:bg-red-700 rounded-md ml-6 mb-3">
                                <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                                Add New Movie
                            </Link>
                        </div>
                    </div>
                    <Outlet />
                </main>
            </div>
        </section>
    )
}

export default DashboardLayout