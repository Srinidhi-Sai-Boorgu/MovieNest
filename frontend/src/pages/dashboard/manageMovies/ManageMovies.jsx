import React from 'react'
import { useDeleteMovieMutation, useFetchAllMoviesQuery } from '../../../redux/features/movies/moviesApi';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ManageMovies = () => {
    const navigate = useNavigate();

    const { data: movies, refetch } = useFetchAllMoviesQuery()

    const [deleteMovie] = useDeleteMovieMutation()

    const handleDeleteMovie = async (id) => {
        try {
            await deleteMovie(id).unwrap();
            
            Swal.fire({
                title: 'Movie Deleted',
                text: 'The movie has been successfully deleted.',
                icon: 'success',
                confirmButtonText: 'OK'
            })
            refetch();

        } catch (error) {
            console.error('Failed to delete movie:', error.message);
            Swal.fire({
                title: 'Error',
                text: 'Failed to delete movie. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }
    };

    const handleEditClick = (id) => {
        navigate(`dashboard/edit-movie/${id}`);
    };
    
    return (
        <section className="py-1 bg-blueGray-50">
            <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
                    <div className="rounded-t mb-0 px-4 py-3 border-0">
                        <div className="flex flex-wrap items-center">
                            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                                <h3 className="font-semibold text-base text-blueGray-700">All Movies</h3>
                            </div>
                        </div>
                    </div>

                    <div className="block w-full overflow-x-auto">
                        <table className="items-center bg-transparent w-full border-collapse ">
                            <thead>
                                <tr>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        #
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Movie Title
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Category
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Price
                                    </th>
                                    <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    movies && movies.map((movie, index) => (
                                        <tr key={index}>
                                            <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                                                {index + 1}
                                            </th>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                                                {movie.title}
                                            </td>
                                            <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                                {movie.category}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">

                                                ${movie.newPrice}
                                            </td>
                                            <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 space-x-4">

                                                <Link to={`/dashboard/edit-movie/${movie._id}`} className="font-medium text-red-600 hover:text-red-700 mr-2 hover:underline underline-offset-2">
                                                    Edit
                                                </Link>
                                                <button
                                                    onClick={() => handleDeleteMovie(movie._id)}
                                                    className="font-medium bg-red-500 hover:bg-red-600 py-1 px-4 rounded-full text-white mr-2">Delete</button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default ManageMovies