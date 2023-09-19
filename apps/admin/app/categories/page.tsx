'use client';
import { useGetCategoriesQuery } from '@j4db/redux-services';
import { Main } from '../../templates/Main';
import { Categories } from '../../ui/components/Categories';
import Loader from '../../ui/components/Loader';

const CategoriesList = () => {
  const { data = [], isLoading } = useGetCategoriesQuery();
  const pagination = {};

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Main>
      <Categories categories={data} pagination={pagination} />
    </Main>
  );
};

export default CategoriesList;
