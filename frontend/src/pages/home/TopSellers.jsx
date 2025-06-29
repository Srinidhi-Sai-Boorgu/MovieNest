import React, { useEffect, useState } from 'react'
import MovieCard from '../movies/MovieCard'
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useFetchAllMoviesQuery } from '../../redux/features/movies/moviesApi';

const categories = ["Choose a genre", "Fiction", "Horror", "Action", "Adventure"]

const TopSellers = () => {

    const [selectedCategory, setSelectedCategory] = useState("Choose a genre");

    const {data: movies = []} = useFetchAllMoviesQuery();
    
    const filteredMovies = selectedCategory === "Choose a genre" ? movies : movies.filter(movie => movie.category === selectedCategory.toLowerCase());

    return (
        <div id="top-sellers" className='py-10'>
            <h2 className='text-3xl font-semibold mb-6'>Top Sellers</h2>
            <div className='mb-8 flex items-center'>
                <select
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    name="category" id="category" className='border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none'>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                navigation={true}
                
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    filteredMovies.length > 0 && filteredMovies.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <MovieCard movie={movie} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>


        </div>
    )
}

export default TopSellers