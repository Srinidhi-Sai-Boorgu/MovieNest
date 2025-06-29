import React, { useState } from 'react'
import InputField from './InputField'
import SelectField from './SelectField'
import { useForm } from 'react-hook-form';
import { useAddMovieMutation } from '../../../redux/features/movies/moviesApi';
import Swal from 'sweetalert2';

const AddMovie = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [imageFile, setimageFile] = useState(null);
  const [addMovie, { isLoading, isError }] = useAddMovieMutation()
  const [imageFileName, setimageFileName] = useState('')

  const onSubmit = async (data) => {

    const newMovieData = {
      ...data,
      coverImage: imageFileName
    }
    try {
      await addMovie(newMovieData).unwrap();
      Swal.fire({
        title: "Movie added",
        text: "Your movie has been uploaded successfully!",
        icon: "success",
        confirmButtonText: 'OK',
      });
      reset();
      setimageFileName('')
      setimageFile(null);
    } catch (error) {
      console.error(error);
      Swal.fire({
        title: "Error",
        text: "Failed to add movie. Please try again.",
        icon: "error",
        confirmButtonColor: "#3085d6",
      })
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setimageFile(file);
      setimageFileName(file.name);
    }
  }
  return (
    <div className="max-w-lg  mx-auto md:p-6 p-3 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Movie</h2>

      <form onSubmit={handleSubmit(onSubmit)} className=''>
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
              className="rounded text-blue-600 focus:ring focus:ring-offset-2 focus:ring-blue-500"
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

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleFileChange} className="mb-2 w-full" />
          {imageFileName && <p className="text-sm text-gray-500">Selected: {imageFileName}</p>}
        </div>

        <button type="submit" className="w-full py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-md">
          {
            isLoading ? <span className="">Adding.. </span> : <span>Add Movie</span>
          }
        </button>
      </form>
    </div>
  )
}

export default AddMovie