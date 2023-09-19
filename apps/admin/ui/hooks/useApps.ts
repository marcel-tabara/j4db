import { appsService } from '@j4db/redux-services';

export const useApps = () => {
  const { data, error, isLoading, refetch } = appsService.useGetAppsQuery();

  return { data, error, isLoading, refetch };
};
