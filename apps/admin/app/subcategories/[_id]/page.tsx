'use client';
import {
  ISubCategory,
  useGetCategoriesQuery,
  useGetSubcategoryByIdQuery,
} from '@j4db/redux-services';
import { useParams } from 'next/navigation';
import { Main } from '../../../templates/Main';
import Loader from '../../../ui/components/Loader';
import { SubcategoryForm } from '../../../ui/forms/SubcategoryForm';

const Subcategory = () => {
  const { _id } = useParams();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategoriesQuery();

  const {
    data: subcategoryById = {} as ISubCategory,
    isLoading: isLoadingSubcategoryById,
  } = useGetSubcategoryByIdQuery(_id as string);

  if (isLoadingCategories || isLoadingSubcategoryById) {
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
