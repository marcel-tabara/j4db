import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL } from '../../constants';
import { subcategoriesType, subcategoriesUrl } from './subcategories.constants';
import { ISubCategory } from './subcategories.model';

export const subcategoriesService = createApi({
  reducerPath: 'subcategoriesService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    },
  }),
  tagTypes: [subcategoriesType],
  endpoints: (build) => ({
    getSubcategories: build.query<ISubCategory[], void>({
      query: () => ({
        url: subcategoriesUrl,
      }),
      providesTags: (result) => [subcategoriesType],
    }),
    getSubcategoryById: build.query<ISubCategory, ISubCategory['_id']>({
      query: (body) => ({
        url: `${subcategoriesUrl}/${body}`,
      }),
    }),
    createSubcategory: build.mutation<ISubCategory, ISubCategory>({
      query: (body) => ({
        url: `${subcategoriesUrl}/add`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [subcategoriesType],
    }),
    updateSubcategory: build.mutation<ISubCategory, ISubCategory>({
      query: (body) => ({
        url: `${subcategoriesUrl}/${body._id}/update`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [subcategoriesType],
    }),
    deleteSubcategory: build.mutation<ISubCategory, ISubCategory['_id']>({
      query: (_id) => ({
        url: `${subcategoriesUrl}/${_id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: [subcategoriesType],
    }),
  }),
});

export const {
  useUpdateSubcategoryMutation,
  useCreateSubcategoryMutation,
  useDeleteSubcategoryMutation,
  useGetSubcategoriesQuery,
  useGetSubcategoryByIdQuery,
} = subcategoriesService;
