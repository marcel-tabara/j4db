'use client';
import { useGetAppsQuery } from '@j4db/redux-services';
import { Main } from '../../../templates/Main';
import Loader from '../../../ui/components/Loader';
import { CategoryForm } from '../../../ui/forms/CategoryForm';
import { ICategory } from '../../../utils/types';

const Category = () => {
  const categoryById = {} as ICategory;
  const { data: apps = [], isLoading } = useGetAppsQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Main>
      <CategoryForm apps={apps} categoryById={categoryById} />
    </Main>
  );
};

export default Category;
