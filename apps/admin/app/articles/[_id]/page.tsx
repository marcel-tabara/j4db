'use client';
import {
  useGetAppsQuery,
  useGetArticleByIdQuery,
  useGetCategoriesQuery,
  useGetSubcategoriesQuery,
} from '@j4db/redux-services';
import { useParams } from 'next/navigation';
import { ChangeEvent, useCallback, useState } from 'react';
import { Main } from '../../../templates/Main';
import Loader from '../../../ui/components/Loader';
import { ArticleForm } from '../../../ui/forms/ArticleForm';
import { ICategory, ISubCategory } from '../../../utils/types';

const ArticleById = () => {
  const { _id } = useParams();
  const { data: apps = [], isLoading: isLoadingApps } = useGetAppsQuery();
  const { data: articleById, isLoading: isLoadingArticleById } =
    useGetArticleByIdQuery(_id as string);
  const { data: categories = [], isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  const { data: subcategories = [], isLoading: isLoadingSubcategories } =
    useGetSubcategoriesQuery();

  const getDefaultCats = () =>
    articleById?.app
      ? (categories || []).filter(
          (cat: ICategory) => cat.app._id === articleById.app._id,
        )
      : [];

  const [cats, setCats] = useState<ICategory[]>(getDefaultCats());
  const getSubCat = (cat: string) => {
    return (subcategories || []).filter(
      (subcat: ISubCategory) => subcat.category._id === cat,
    );
  };

  const [subcats, setSubcats] = useState<ISubCategory[]>(
    getSubCat(articleById?.category?._id ?? ''),
  );

  const onChangeCategory = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const filteredSubcats = (subcategories || []).filter(
        (subcategory: ISubCategory) =>
          subcategory.category._id === event.target.value,
      );
      setSubcats(filteredSubcats ?? []);
    },
    [subcategories],
  );

  const onChangeApp = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const filteredCats = (categories || []).filter(
        (category: ICategory) => category.app._id === event.target.value,
      );

      setCats(filteredCats || []);
      onChangeCategory({
        target: { value: '' },
      } as ChangeEvent<HTMLSelectElement>);
    },
    [categories, onChangeCategory],
  );

  if (
    isLoadingApps ||
    isLoadingArticleById ||
    isLoadingCategories ||
    isLoadingSubcategories
  ) {
    return <Loader />;
  }
  if (!articleById) {
    return null;
  }
  return (
    <Main>
      <ArticleForm
        onChangeCategory={onChangeCategory}
        onChangeApp={onChangeApp}
        categories={cats}
        subcategories={subcats}
        article={articleById}
        allApps={apps}
      />
    </Main>
  );
};

export default ArticleById;
