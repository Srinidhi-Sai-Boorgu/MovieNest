import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiMiniBars3CenterLeft } from "react-icons/hi2";
import { IoFilmOutline, IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { RiAdminLine } from "react-icons/ri";
import { HiOutlineShoppingCart } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import { useSelector } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import Swal from 'sweetalert2';

const navigation = [
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
]


const Navbar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);

    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            Swal.fire({
                icon: 'success',
                title: 'Logged out successfully',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Logout failed:", error);
            Swal.fire({
                icon: 'error',
                title: 'Logout Failed',
                text: error.message || 'Something went wrong',
            });
        }
    }

    return (
        <header className='max-w-screen-2xl mx-auto px-4 py-6'>
            <nav className='flex justify-between items-center'>
                <div className='flex items-center md:gap-16 gap-4'>
                    <Link to="/">
                        <HiMiniBars3CenterLeft className='size-6' />
                    </Link>

                    <div className="flex items-center space-x-2">
                        <IoFilmOutline className="text-5xl text-red-600" />
                        <span className="text-3xl font-extrabold text-gray-900">
                            Movie<span className="text-red-600">Nest</span>
                        </span>
                    </div>
                </div>

                <div className='relative flex items-center md:space-x-3 space-x-2'>
                    <div className='pt-1 pr-3'>
                        {
                            currentUser ? <>
                                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                    <img src={avatarImg} alt="" className={`size-7 rounded-full ${currentUser ? 'ring-2 ring-red-500' : ''}`} />
                                </button>

                                {
                                    isDropdownOpen && (
                                        <div className='absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40'>
                                            <ul className='py-2'>
                                                {
                                                    navigation.map((item) => (
                                                        <li key={item.name} onClick={() => setIsDropdownOpen(false)} >
                                                            <Link to={item.href} className='block px-4 py-2 text-sm hover:bg-gray-100'>
                                                                {item.name}
                                                            </Link>
                                                        </li>
                                                    ))
                                                }
                                                <li>
                                                    <button
                                                        onClick={handleLogout}
                                                        className='block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'>
                                                        Logout
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                }
                            </> : <Link to='/login'><HiOutlineUser className='size-7 ' /></Link>
                        }
                    </div>

                    {/* <button className="hidden sm:block">
                        <RiAdminLine className="size-6" />
                    </button> */}

                    <Link to='/cart' className='bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm'>
                        <HiOutlineShoppingCart className='size-6' />
                        {
                            cartItems.length > 0 ? <span className='text-sm font-semibold sm:ml-1'>{cartItems.length}</span> : <span className='text-sm font-semibold sm:ml-1'>0</span>
                        }

                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Navbar