'use client';
import { Main } from '../../../templates/Main';
import { AppForm } from '../../../ui/forms/AppForm';
import { IApp } from '../../../utils/types';

const App = () => {
  const appById = { dateCreated: new Date().toISOString() } as IApp;
  return (
    <Main>
      <AppForm appById={appById} />
    </Main>
  );
};

export default App;
