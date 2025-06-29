import React from 'react'
import { useParams } from 'react-router-dom';
import { useFetchMovieByIdQuery } from '../../redux/features/movies/moviesApi';
import { getImgUrl } from '../../utils/getImgUrl';
import { FiShoppingCart } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';

const SingleMovie = () => {

    const { id } = useParams();
    const { data: movie, isLoading, isError } = useFetchMovieByIdQuery(id);

    if (isLoading) {
        return <div className="text-center text-gray-500">Loading...</div>
    }
    if (isError) {
        return <div className="text-center text-red-500">Error loading movie details.</div>
    }

    const dispatch = useDispatch();

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
    }

    return (
        <div className="max-w-lg shadow-md p-5">
            <h1 className="text-2xl font-bold mb-6">{movie.title}</h1>

            <div className=''>
                <div>
                    <img
                        src={`${getImgUrl(movie.coverImage)}`}
                        alt={movie.title}
                        className="mb-8 w-1/2 h-auto"
                    />
                </div>

                <div className='mb-5'>
                    <p className="text-gray-700 mb-2"><strong>Author:</strong> {movie.author || 'admin'}</p>
                    <p className="text-gray-700 mb-4">
                        <strong>Published:</strong> {new Date(movie?.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-gray-700 mb-4 capitalize">
                        <strong>Category:</strong> {movie?.category}
                    </p>
                    <p className="text-gray-700"><strong>Description:</strong> {movie.description}</p>
                </div>

                <button onClick={() => handleAddToCart(movie)} className="btn-primary px-6 space-x-1 flex items-center gap-1 ">
                    <FiShoppingCart className="" />
                    <span>Add to Cart</span>

                </button>
            </div>
        </div>
    )
}

export default SingleMovie