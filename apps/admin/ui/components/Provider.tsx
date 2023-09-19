'use client';
import { store } from '@j4db/redux-services';
import { Provider } from 'react-redux';

function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}

export default Providers;
