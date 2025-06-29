import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import getBaseUrl from '../../../utils/baseUrl'

const baseQuery = fetchBaseQuery({
    baseUrl: `${getBaseUrl()}/api/movies`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem('token');
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    }
})

const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery,
    tagTypes: ['Movies'],
    endpoints: (builder) => ({
        fetchAllMovies: builder.query({
            query: () => '/',
            providesTags: ['Movies']
        }),
        fetchMovieById: builder.query({
            query: (id) => `/${id}`,
            providesTags: (result, error, id) => [{ type: 'Movies', id }]
        }),
        addMovie: builder.mutation({
            query: (newMovie) => ({
                url: '/create-movie',
                method: 'POST',
                body: newMovie
            }),
            invalidatesTags: ['Movies']
        }),
        updateMovie: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: 'PUT',
                body: rest,
                headers: {
                    'Content-Type': 'application/json'
                }  
            }),
            invalidatesTags: ['Movies']
        }),
        deleteMovie: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Movies']
        })
    })
})

export const { useFetchAllMoviesQuery, useFetchMovieByIdQuery, useAddMovieMutation, useDeleteMovieMutation, useUpdateMovieMutation } = moviesApi;
export default moviesApi;