'use client';
import { useGetCategoriesQuery } from '@j4db/redux-services';
import { Main } from '../../../templates/Main';
import Loader from '../../../ui/components/Loader';
import { SubcategoryForm } from '../../../ui/forms/SubcategoryForm';
import { ISubCategory } from '../../../utils/types';

const Subcategory = () => {
  const subcategoryById = {} as ISubCategory;
  const { data: categories = [], isLoading } = useGetCategoriesQuery();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Main>
      <SubcategoryForm
        categories={categories}
        subcategoryById={subcategoryById}
      />
    </Main>
  );
};

export default Subcategory;
