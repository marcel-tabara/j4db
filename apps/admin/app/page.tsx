'use client';

import {
  useGenerateContentByAppMutation,
  useGetAppsQuery,
} from '@j4db/redux-services';
import '../styles/main.css';
import { Main } from '../templates/Main';
import Loader from '../ui/components/Loader';
import { useApps } from '../ui/hooks/useApps';
import { useArticles } from '../ui/hooks/useArticles';
import { useCategories } from '../ui/hooks/useCategories';
import { useKeywords } from '../ui/hooks/useKeywords';
import { useSubcategories } from '../ui/hooks/useSubcategories';

const Preloader = () => {
  useApps();
  useArticles();
  useKeywords();
  useCategories();
  useSubcategories();
  return null;
};

const Home = () => {
  const { data: apps = [], isLoading: isLoadingApps } = useGetAppsQuery();
  const [generateContentByApp, { isLoading: isLoadingGenerator }] =
    useGenerateContentByAppMutation();

  const onGenerate = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    e.preventDefault();
    generateContentByApp((e.target as HTMLLIElement).id);
  };

  if (isLoadingApps || isLoadingGenerator) {
    return <Loader />;
  }

  return (
    <Main>
      <Preloader />
      <ul>
        {(apps ?? []).map((app) => (
          <li key={app._id} onClick={onGenerate}>
            <a href="" id={app._id}>
              Generate {app.slug}
            </a>
          </li>
        ))}
      </ul>
    </Main>
  );
};

export default Home;
