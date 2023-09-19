import { articlesService } from '@j4db/redux-services';

export const useArticles = () => {
  const { data, error, isLoading, refetch } =
    articlesService.useGetArticlesQuery();

  return { data, error, isLoading, refetch };
};
