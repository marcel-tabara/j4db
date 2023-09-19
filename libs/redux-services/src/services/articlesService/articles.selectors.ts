import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IArticle } from './articles.model';

const articlesFlags = (state: RootState) =>
  state.articlesService.queries.getArticles;
const articleByIdFlags = (state: RootState) =>
  state.articlesService.queries.getArticleById;

export const articlesSelector = createSelector(articlesFlags, (item) => {
  return {
    available: item?.status === 'fulfilled',
    fetching: item?.status === 'pending',
    data: item?.data as IArticle[],
    error: item?.error,
  };
});

export const articleByIdSelector = createSelector(articleByIdFlags, (item) => {
  return {
    available: item?.status === 'fulfilled',
    fetching: item?.status === 'pending',
    data: item?.data as IArticle,
    error: item?.error,
  };
});
