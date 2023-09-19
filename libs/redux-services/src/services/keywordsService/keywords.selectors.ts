import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IKeyword } from './keywords.model';

const keywords = (state: RootState) =>
  state.keywordsService.queries.getKeywords;
const keywordById = (state: RootState) =>
  state.keywordsService.queries.getKeywordById;
const keywordExtraction = (state: RootState) =>
  state.keywordsService.queries.keywordExtraction;
const keywordsData = (state: RootState) =>
  state.keywordsService.queries.getKeywords?.data as IKeyword[];

export const keywordsSelector = createSelector(keywords, (item) => {
  return {
    available: item?.status === 'fulfilled',
    fetching: item?.status === 'pending',
    data: item?.data,
    error: item?.error,
  };
});

export const keywordByIdSelector = createSelector(keywordById, (item) => {
  return {
    available: item?.status === 'fulfilled',
    fetching: item?.status === 'pending',
    data: item?.data as IKeyword,
    error: item?.error,
  };
});

export const keywordExtractionSelector = createSelector(
  keywordExtraction,
  (item) => {
    return {
      available: item?.status === 'fulfilled',
      fetching: item?.status === 'pending',
      data: item?.data as IKeyword[],
      error: item?.error,
    };
  }
);

export const keywordsByArticleSelector = createSelector(
  keywordsData,
  (items) => (id: string) => {
    return id
      ? (items || []).filter((e: { article: { [x: string]: string } }) => {
          return e.article['_id'] === id;
        })
      : items;
  }
);
