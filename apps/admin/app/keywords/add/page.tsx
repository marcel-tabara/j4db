'use client';
import { Main } from '../../../templates/Main';
import { KeywordForm } from '../../../ui/forms/KeywordForm';
import { IKeyword } from '../../../utils/types';

const Keyword = () => {
  const keywordById = {} as IKeyword;
  return (
    <Main>
      <KeywordForm keywordById={keywordById} />
    </Main>
  );
};

export default Keyword;
