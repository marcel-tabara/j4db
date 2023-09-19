'use client';
import { useGetAppByIdQuery } from '@j4db/redux-services';
import { useParams } from 'next/navigation';
import { Main } from '../../../templates/Main';
import Loader from '../../../ui/components/Loader';
import { AppForm } from '../../../ui/forms/AppForm';

const App = () => {
  const { _id } = useParams();
  const { data = { _id: '' }, isLoading } = useGetAppByIdQuery(_id as string);

  return isLoading && !data ? (
    <Loader />
  ) : (
    <Main>
      <AppForm appById={data} />
    </Main>
  );
};

export default App;
