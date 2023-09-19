import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL } from '../../constants';
import { appsType, appsUrl } from './apps.constants';
import { IApp } from './apps.model';

export const appsService = createApi({
  reducerPath: 'appsService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    },
  }),
  tagTypes: [appsType],
  endpoints: (build) => ({
    getApps: build.query<IApp[], void>({
      query: () => ({
        url: appsUrl,
      }),
      providesTags: (result) => [appsType],
    }),
    getAppById: build.query<IApp, IApp['_id']>({
      query: (body) => ({
        url: `${appsUrl}/${body}/`,
      }),
    }),
    createApp: build.mutation<IApp, IApp>({
      query: (body) => ({
        url: `${appsUrl}/add`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [appsType],
    }),
    updateApp: build.mutation<IApp, IApp>({
      query: (body) => ({
        url: `${appsUrl}/${body._id}/update`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [appsType],
    }),
    deleteApp: build.mutation<IApp, IApp['_id']>({
      query: (_id) => ({
        url: `${appsUrl}/${_id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: [appsType],
    }),
  }),
});

export const {
  useGetAppsQuery,
  useGetAppByIdQuery,
  useCreateAppMutation,
  useUpdateAppMutation,
  useDeleteAppMutation,
} = appsService;
