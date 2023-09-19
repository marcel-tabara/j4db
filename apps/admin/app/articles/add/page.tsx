'use client';
import {
  useGetAppsQuery,
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
} from '@j4db/redux-services';
import { SelectChangeEvent } from '@mui/material';
import { useCallback, useState } from 'react';
import { Main } from '../../../templates/Main';
import Loader from '../../../ui/components/Loader';
import { ArticleForm } from '../../../ui/forms/ArticleForm';
import { IArticle, ICategory, ISubCategory } from '../../../utils/types';

const ArticleAdd = () => {
  const { data: apps = [], isLoading: isLoadingApps } = useGetAppsQuery();
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  const { data: subcategories = [], isLoading: isLoadingSubcategories } =
    useGetSubcategoriesQuery();

  const getDefaultCats = () => [];

  const [cats, setCats] = useState<ICategory[]>(getDefaultCats());
  const [subcats, setSubcats] = useState<ISubCategory[]>([]);

  const onChangeCategory = useCallback(
    (event: SelectChangeEvent<string>) => {
      const filteredSubcats = subcategories.filter(
        (subcategory: ISubCategory) =>
          subcategory.category._id === event.target.value,
      );
      setSubcats(filteredSubcats ?? []);
    },
    [subcategories],
  );

  const onChangeApp = useCallback(
    (event: SelectChangeEvent<string>) => {
      const filteredCats = categories.filter(
        (category: ICategory) => category.app._id === event.target.value,
      );

      setCats(filteredCats || []);
      onChangeCategory({
        target: { value: '' },
      } as SelectChangeEvent<string>);
    },
    [categories, onChangeCategory],
  );
  const article = { dateCreated: new Date().toISOString() } as IArticle;

  if (isLoadingApps || isLoadingCategories || isLoadingSubcategories) {
    return <Loader />;
  }

  return (
    <Main>
      <ArticleForm
        onChangeCategory={onChangeCategory}
        onChangeApp={onChangeApp}
        categories={cats}
        subcategories={subcats}
        article={article}
        allApps={apps}
      />
    </Main>
  );
};

export default ArticleAdd;
