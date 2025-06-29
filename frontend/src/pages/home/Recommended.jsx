import React, { useEffect, useState } from 'react'
import MovieCard from '../movies/MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useFetchAllMoviesQuery } from '../../redux/features/movies/moviesApi';

const Recommended = () => {

    const {data: movies = []} = useFetchAllMoviesQuery();

    return (
        <div className='py-16'>
            <h2 className='text-3xl font-semibold mb-6'>Recommended</h2>

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
                    movies.length > 0 && movies.slice(8, 18).map((movie, index) => (
                        <SwiperSlide key={index}>
                            <MovieCard movie={movie} />
                        </SwiperSlide>
                    ))
                }
            </Swiper>


        </div>
    )
}

export default Recommended