import { keywordsService } from '@j4db/redux-services';

export const useKeywords = () => {
  const { data, error, isLoading, refetch } =
    keywordsService.useGetKeywordsQuery();

  return { data, error, isLoading, refetch };
};
