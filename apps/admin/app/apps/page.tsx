'use client';
import { useGetAppsQuery } from '@j4db/redux-services';
import { Main } from '../../templates/Main';
import { Apps } from '../../ui/components/Apps';
import Loader from '../../ui/components/Loader';

const AppsList = () => {
  const { data = [], isLoading } = useGetAppsQuery();
  const pagination = {};

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Main>
      <Apps apps={data} pagination={pagination} />
    </Main>
  );
};

export default AppsList;
