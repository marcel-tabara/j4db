import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { ISubCategory } from './subcategories.model';

const subcategories = (state: RootState) =>
  state.subcategoriesService.queries.getSubcategories;
const subcategoryById = (state: RootState) =>
  state.subcategoriesService.queries.getSubcategoryById;

export const subcategoriesSelector = createSelector(subcategories, (item) => {
  return {
    available: item?.status === 'fulfilled',
    fetching: item?.status === 'pending',
    data: item?.data as ISubCategory[],
    error: item?.error,
  };
});

export const subcategoryByIdSelector = createSelector(
  subcategoryById,
  (item) => {
    return {
      available: item?.status === 'fulfilled',
      fetching: item?.status === 'pending',
      data: item?.data as ISubCategory,
      error: item?.error,
    };
  }
);
