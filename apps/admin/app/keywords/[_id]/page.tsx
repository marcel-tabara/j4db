'use client';
import { IKeyword, useGetKeywordByIdQuery } from '@j4db/redux-services';
import { useParams } from 'next/navigation';
import { Main } from '../../../templates/Main';
import Loader from '../../../ui/components/Loader';
import { KeywordForm } from '../../../ui/forms/KeywordForm';

const Keyword = () => {
  const { _id } = useParams();
  const { data: keywordById = {} as IKeyword, isLoading } =
    useGetKeywordByIdQuery(_id as string);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Main>
      <KeywordForm keywordById={keywordById} />
    </Main>
  );
};

export default Keyword;
