import { categoriesService } from '@j4db/redux-services';

export const useCategories = () => {
  const { data, error, isLoading, refetch } =
    categoriesService.useGetCategoriesQuery();

  return { data, error, isLoading, refetch };
};
