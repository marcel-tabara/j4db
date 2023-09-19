import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL } from '../../constants';
import { keywordsType } from '../keywordsService/keywords.constants';
import { articlesType, articlesUrl } from './articles.constants';
import { IArticle, IPaginatesArticles } from './articles.model';

export const articlesService = createApi({
  reducerPath: 'articlesService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    },
  }),
  tagTypes: [articlesType, keywordsType],
  endpoints: (build) => ({
    getArticles: build.query<IPaginatesArticles, void>({
      query: () => ({
        url: articlesUrl,
      }),
      providesTags: (result) => [articlesType],
    }),
    getArticleById: build.query<IArticle, IArticle['_id']>({
      query: (body) => ({
        url: `${articlesUrl}/${body}`,
      }),
    }),
    createArticle: build.mutation<IArticle, IArticle>({
      query: (app) => ({
        url: `${articlesUrl}/add`,
        method: 'POST',
        body: app,
      }),
      invalidatesTags: [articlesType],
    }),
    updateArticle: build.mutation<IArticle, IArticle>({
      query: (app) => ({
        url: `${articlesUrl}/${app._id}/update`,
        method: 'PUT',
        body: app,
      }),
      invalidatesTags: [articlesType, keywordsType],
    }),
    deleteArticle: build.mutation<IArticle, IArticle['_id']>({
      query: (_id) => ({
        url: `${articlesUrl}/${_id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: [articlesType],
    }),
    generateContentByApp: build.mutation<void, IArticle['_id']>({
      query: (_id) => ({
        url: `${articlesUrl}/generateContentByApp`,
        method: 'POST',
        body: { _id },
      }),
    }),
    generateArticles: build.query<void, IArticle['_id']>({
      query: (_id) => ({
        url: `${articlesUrl}/generateArticles`,
      }),
    }),
  }),
});

export const {
  useCreateArticleMutation,
  useDeleteArticleMutation,
  useGenerateArticlesQuery,
  useGenerateContentByAppMutation,
  useGetArticleByIdQuery,
  useGetArticlesQuery,
  useUpdateArticleMutation,
} = articlesService;
