import React from 'react'
import axios from 'axios';
import Loading from '../../components/Loading';
import { useNavigate } from 'react-router-dom';
import getBaseUrl from '../../utils/baseUrl';
import { useState } from 'react';
import { useEffect } from 'react';
import { MdIncompleteCircle } from 'react-icons/md';
import RevenueChart from './RevenueChart';

const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    const [data, setData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        'Content-Type': 'application/json'
                    }
                })
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return <Loading />
    }

    return (
        <>
            <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-primary bg-purple-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">{data?.totalMovies}</span>
                        <span className="block text-gray-500">Movies</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">${data?.totalSales}</span>
                        <span className="block text-gray-500">Total Sales</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                    </div>
                    <div>
                        <span className="inline-block text-2xl font-bold">{data?.trendingMovies}</span>
                        <span className="inline-block ml-1 text-xl text-gray-500 font-semibold">({data?.trendingPercentage}%)</span>
                        <span className="block text-gray-500">Trending Movies</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
                        <MdIncompleteCircle className='size-6' />
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">{data?.totalOrders}</span>
                        <span className="block text-gray-500">Total Orders</span>
                    </div>
                </div>
            </section>
            <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 gap-6">
                <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
                    <div className="px-6 py-5 font-semibold border-b border-gray-100">Monthly Sales</div>
                    <div className="p-4 flex-grow">
                        <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
                            <RevenueChart />
                        </div>
                    </div>
                </div>
                <div className="row-span-3 bg-white shadow rounded-lg">
                    <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                        <span>Average Monthly Orders</span>
                    </div>
                    <div className="overflow-y-auto" style={{ maxHeight: '28rem' }}>
                        <ul className="p-6 space-y-6">
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                    <img src="https://randomuser.me/api/portraits/women/82.jpg" alt="Annette Watson profile picture" />
                                </div>
                                <span className="text-gray-600">Annette Watson</span>
                                <span className="ml-auto font-semibold">4.3</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                    <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Calvin Steward profile picture" />
                                </div>
                                <span className="text-gray-600">Grace Simmons</span>
                                <span className="ml-auto font-semibold">3.9</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                    <img src="https://randomuser.me/api/portraits/men/80.jpg" alt="Ralph Richards profile picture" />
                                </div>
                                <span className="text-gray-600">Ralph Richards</span>
                                <span className="ml-auto font-semibold">3.7</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                    <img src="https://randomuser.me/api/portraits/men/79.jpg" alt="Bernard Murphy profile picture" />
                                </div>
                                <span className="text-gray-600">Bernard Murphy</span>
                                <span className="ml-auto font-semibold">3.2</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                    <img src="https://randomuser.me/api/portraits/women/78.jpg" alt="Arlene Robertson profile picture" />
                                </div>
                                <span className="text-gray-600">Arlene Robertson</span>
                                <span className="ml-auto font-semibold">2.7</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                    <img src="https://randomuser.me/api/portraits/women/77.jpg" alt="Jane Lane profile picture" />
                                </div>
                                <span className="text-gray-600">Jane Lane</span>
                                <span className="ml-auto font-semibold">2.5</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                    <img src="https://randomuser.me/api/portraits/men/76.jpg" alt="Pat Mckinney profile picture" />
                                </div>
                                <span className="text-gray-600">Pat Mckinney</span>
                                <span className="ml-auto font-semibold">2.3</span>
                            </li>
                            <li className="flex items-center">
                                <div className="h-10 w-10 mr-3 bg-gray-100 rounded-full overflow-hidden">
                                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Norman Walters profile picture" />
                                </div>
                                <span className="text-gray-600">Norman Walters</span>
                                <span className="ml-auto font-semibold">1.8</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-yellow-600 bg-yellow-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path fill="#fff" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">02</span>
                        <span className="block text-gray-500">Orders left</span>
                    </div>
                </div>
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-teal-600 bg-teal-100 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">139</span>
                        <span className="block text-gray-500">Website visits (last day)</span>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard