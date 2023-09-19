import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL } from '../../constants';
import { categoriesType, categoriesUrl } from './categories.constants';
import { ICategory } from './categories.model';

export const categoriesService = createApi({
  reducerPath: 'categoriesService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    },
  }),
  tagTypes: [categoriesType],
  endpoints: (build) => ({
    getCategories: build.query<ICategory[], void>({
      query: () => ({
        url: categoriesUrl,
      }),
      providesTags: (result) => [categoriesType],
    }),
    getCategoryById: build.query<ICategory, ICategory['_id']>({
      query: (body) => ({
        url: `${categoriesUrl}/${body}`,
      }),
    }),
    createCategory: build.mutation<ICategory, ICategory>({
      query: (body) => ({
        url: `${categoriesUrl}/add`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [categoriesType],
    }),
    updateCategory: build.mutation<ICategory, ICategory>({
      query: (body) => ({
        url: `${categoriesUrl}/${body._id}/update`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [categoriesType],
    }),
    deleteCategory: build.mutation<ICategory, ICategory['_id']>({
      query: (_id) => ({
        url: `${categoriesUrl}/${_id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: [categoriesType],
    }),
  }),
});

export const {
  useUpdateCategoryMutation,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
} = categoriesService;
