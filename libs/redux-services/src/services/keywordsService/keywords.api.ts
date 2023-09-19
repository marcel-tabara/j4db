import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { BASE_URL } from '../../constants';
import { keywordsType, keywordsUrl } from './keywords.constants';
import { IKeyword } from './keywords.model';

export const keywordsService = createApi({
  reducerPath: 'keywordsService',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    mode: 'cors',
    prepareHeaders: (headers) => {
      headers.set('Access-Control-Allow-Origin', '*');
      return headers;
    },
  }),
  tagTypes: [keywordsType],
  endpoints: (build) => ({
    getKeywords: build.query<IKeyword[], void>({
      query: () => ({
        url: keywordsUrl,
      }),
      providesTags: (result) => [keywordsType],
    }),
    getKeywordById: build.query<IKeyword, IKeyword['_id']>({
      query: (body) => ({
        url: `${keywordsUrl}/${body}`,
      }),
    }),
    createKeyword: build.mutation<IKeyword, IKeyword>({
      query: (body) => ({
        url: `${keywordsUrl}/${body._id}/add`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [keywordsType],
    }),
    updateKeyword: build.mutation<IKeyword, IKeyword>({
      query: (body) => ({
        url: `${keywordsUrl}/${body._id}/update`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [keywordsType],
    }),
    deleteKeyword: build.mutation<IKeyword, IKeyword['_id']>({
      query: (_id) => ({
        url: `${keywordsUrl}/${_id}/delete`,
        method: 'DELETE',
      }),
      invalidatesTags: [keywordsType],
    }),
    deleteKeywordByArticleId: build.mutation<IKeyword, IKeyword['_id']>({
      query: (_id) => ({
        url: `${keywordsUrl}/${_id}/deleteByArticleId`,
        method: 'DELETE',
      }),
      invalidatesTags: [keywordsType],
    }),
    getKeywordsByArticleId: build.query<IKeyword[], IKeyword['_id']>({
      query: (_id) => ({
        url: `${keywordsUrl}/${_id}/byArticle`,
      }),
    }),
    insertManyKeywords: build.query<IKeyword[], IKeyword[]>({
      query: (body) => ({
        url: `${keywordsUrl}/insertMany`,
        method: 'POST',
        body,
      }),
    }),
    keywordExtraction: build.mutation<
      IKeyword[],
      {
        _id: string;
        url: string | undefined;
        text: string | undefined;
      }
    >({
      query: (body) => ({
        url: `${keywordsUrl}/extractKeywords`,
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useCreateKeywordMutation,
  useUpdateKeywordMutation,
  useDeleteKeywordByArticleIdMutation,
  useDeleteKeywordMutation,
  useGetKeywordByIdQuery,
  useGetKeywordsByArticleIdQuery,
  useGetKeywordsQuery,
  useInsertManyKeywordsQuery,
  useKeywordExtractionMutation,
} = keywordsService;
