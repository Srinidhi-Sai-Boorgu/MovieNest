import React from 'react'
import footerLogo from "../assets/footer.png"

import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 px-4">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="md:w-1/2 w-full">
                    <img src={footerLogo} alt="Logo" className="mb-5 w-36" />
                    <ul className="flex flex-col md:flex-row gap-4">
                        <li><a href="/" className="hover:text-primary">Home</a></li>
                        <li><a href="/orders" className="hover:text-primary">Orders</a></li>
                        <li><a href="/cart" className="hover:text-primary">Cart Page</a></li>
                    </ul>
                </div>

                <div className="md:w-1/2 w-full">
                    <p className="mb-4">
                        Subscribe to our newsletter to receive the latest updates, news, and offers!
                    </p>
                    <div className="flex">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-l-md text-black"
                        />
                        <button className="bg-primary px-6 py-2 rounded-r-md hover:bg-secondary">
                            <a href="/">Subscribe</a>
                        </button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mt-10 border-t border-gray-700 pt-6">
                <ul className="flex gap-6 mb-4 md:mb-0">
                    <li><a href="/dashboard" className="hover:text-primary">Admin Dashboard</a></li>
                </ul>

                <div className="flex gap-6">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        <FaFacebook size={24} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary">
                        <FaInstagram size={24} />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer