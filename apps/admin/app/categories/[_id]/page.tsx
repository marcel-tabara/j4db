'use client';
import {
  ICategory,
  useGetAppsQuery,
  useGetCategoryByIdQuery,
} from '@j4db/redux-services';
import { useParams } from 'next/navigation';
import { Main } from '../../../templates/Main';
import Loader from '../../../ui/components/Loader';
import { CategoryForm } from '../../../ui/forms/CategoryForm';

const Category = () => {
  const { _id } = useParams();
  const { data: apps = [], isLoading: isLoadingApps } = useGetAppsQuery();
  const { data = {} as ICategory, isLoading } = useGetCategoryByIdQuery(
    _id as string,
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Main>
      <CategoryForm apps={apps} categoryById={data} />
    </Main>
  );
};

export default Category;
