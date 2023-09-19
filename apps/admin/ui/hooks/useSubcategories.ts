import { subcategoriesService } from '@j4db/redux-services';

export const useSubcategories = () => {
  const { data, error, isLoading, refetch } =
    subcategoriesService.useGetSubcategoriesQuery();

  return { data, error, isLoading, refetch };
};
