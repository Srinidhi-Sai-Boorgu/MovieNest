import React, { useEffect } from 'react'
import InputField from '../addMovie/InputField'
import SelectField from '../addMovie/SelectField'
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { useFetchMovieByIdQuery, useUpdateMovieMutation } from '../../../redux/features/movies/moviesApi';
import Loading from '../../../components/Loading';
import Swal from 'sweetalert2';
import axios from 'axios';
import getBaseUrl from '../../../utils/baseUrl';

const UpdateMovie = () => {
    const { id } = useParams();
    const { data: movieData, isLoading, isError, refetch } = useFetchMovieByIdQuery(id);

    const [updateMovie] = useUpdateMovieMutation();
    const { register, handleSubmit, setValue, reset } = useForm();
    useEffect(() => {
        if (movieData) {
            setValue('title', movieData.title);
            setValue('description', movieData.description);
            setValue('category', movieData?.category);
            setValue('trending', movieData.trending);
            setValue('oldPrice', movieData.oldPrice);
            setValue('newPrice', movieData.newPrice);
            setValue('coverImage', movieData.coverImage)
        }
    }, [movieData, setValue])

    const onSubmit = async (data) => {
        const updateMovieData = {
            title: data.title,
            description: data.description,
            category: data.category,
            trending: data.trending,
            oldPrice: Number(data.oldPrice),
            newPrice: Number(data.newPrice),
            coverImage: data.coverImage || movieData.coverImage,
        };
        try {
            await axios.put(`${getBaseUrl()}/api/movies/edit/${id}`, updateMovieData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            Swal.fire({
                title: "Movie updated",
                text: "Your movie has been updated successfully!",
                icon: "success",
                confirmButtonText: 'OK',
            });
            await refetch()
        } catch (error) {
            console.log("Failed to update movie.");
            Swal.fire({
                title: "Error",
                text: "Failed to update movie. Please try again.",
                icon: "error",
                confirmButtonColor: "#3085d6",
            })
        }
    }
    if (isLoading) return <Loading />
    if (isError) {
        return <div className="text-center text-red-500">Error fetching movie data.</div>
    }
    return (
        <div className="max-w-lg mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Update Movie</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <InputField
                    label="Title"
                    name="title"
                    placeholder="Enter movie title"
                    register={register}
                />

                <InputField
                    label="Description"
                    name="description"
                    placeholder="Enter movie description"
                    type="textarea"
                    register={register}
                />

                <SelectField
                    label="Category"
                    name="category"
                    options={[
                        { value: '', label: 'Choose A Category' },
                        { value: 'fiction', label: 'Fiction' },
                        { value: 'horror', label: 'Horror' },
                        { value: 'action', label: 'Action' },
                        { value: 'adventure', label: 'Adventure' },
                    ]}
                    register={register}
                />
                <div className="mb-4">
                    <label className="inline-flex items-center">
                        <input
                            type="checkbox"
                            {...register('trending')}
                            className="accent-red-600 rounded text-red-600 focus:ring focus:ring-offset-2 focus:ring-red-500"
                        />
                        <span className="ml-2 text-sm font-semibold text-gray-700">Trending</span>
                    </label>
                </div>

                <InputField
                    label="Old Price"
                    name="oldPrice"
                    type="number"
                    placeholder="Old Price"
                    register={register}
                />

                <InputField
                    label="New Price"
                    name="newPrice"
                    type="number"
                    placeholder="New Price"
                    register={register}
                />

                <InputField
                    label="Cover Image URL"
                    name="coverImage"
                    type="text"
                    placeholder="Cover Image URL"
                    register={register}
                />

                <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md">
                    Update Movie
                </button>
            </form>
        </div>
    )
}

export default UpdateMovie