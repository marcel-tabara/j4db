'use client';
import { IArticle, useGetArticlesQuery } from '@j4db/redux-services';
import { Main } from '../../templates/Main';
import { Articles } from '../../ui/components/Articles';
import Loader from '../../ui/components/Loader';

const ArticlesList = () => {
  const pagination = {};
  const { data, isLoading } = useGetArticlesQuery();
  const sorted = [...(data?.data ?? [])].sort(
    (a: IArticle, b: IArticle) => a.app?.title.localeCompare(b.app.title),
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Main>
      <Articles articles={sorted ?? []} pagination={pagination} />
    </Main>
  );
};

export default ArticlesList;
