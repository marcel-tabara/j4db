'use client';
import { useGetSubcategoriesQuery } from '@j4db/redux-services';
import { Main } from '../../templates/Main';
import Loader from '../../ui/components/Loader';
import { Subcategories } from '../../ui/components/Subcategories';

const SubcategoriesList = () => {
  const { data = [], isLoading } = useGetSubcategoriesQuery();
  const pagination = {};

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Main>
      <Subcategories subcategories={data} pagination={pagination} />
    </Main>
  );
};

export default SubcategoriesList;
