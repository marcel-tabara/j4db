import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ICategory } from './categories.model';

const categories = (state: RootState) =>
  state.categoriesService.queries.getCategories;
const categoryById = (state: RootState) =>
  state.categoriesService.queries.getCategoryById;

export const categoriesSelector = createSelector(categories, (item) => {
  return {
    available: item?.status === 'fulfilled',
    fetching: item?.status === 'pending',
    data: item?.data as ICategory[],
    error: item?.error,
  };
});

export const categoryByIdSelector = createSelector(categoryById, (item) => {
  return {
    available: item?.status === 'fulfilled',
    fetching: item?.status === 'pending',
    data: item?.data as ICategory,
    error: item?.error,
  };
});
