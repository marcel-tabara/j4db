'use client';
import { useGetKeywordsQuery } from '@j4db/redux-services';
import { Main } from '../../templates/Main';
import { Keywords } from '../../ui/components/Keywords';
import Loader from '../../ui/components/Loader';

const KeywordsList = () => {
  const { data = [], isLoading } = useGetKeywordsQuery();
  const pagination = {};

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Main>
      <Keywords keywords={data} pagination={pagination} />
    </Main>
  );
};

export default KeywordsList;
