import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createLogger } from 'redux-logger';
import {
  appsService,
  articlesService,
  categoriesService,
  keywordsService,
  subcategoriesService,
} from './services';

const logger = createLogger();

export const createStore = (
  options?: ConfigureStoreOptions['preloadedState'] | undefined
) =>
  configureStore({
    reducer: {
      [appsService.reducerPath]: appsService.reducer,
      [articlesService.reducerPath]: articlesService.reducer,
      [keywordsService.reducerPath]: keywordsService.reducer,
      [categoriesService.reducerPath]: categoriesService.reducer,
      [subcategoriesService.reducerPath]: subcategoriesService.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware()
        .concat(appsService.middleware)
        .concat(articlesService.middleware)
        .concat(keywordsService.middleware)
        .concat(categoriesService.middleware)
        .concat(subcategoriesService.middleware)
        .concat(logger),
    ...options,
  });

export const store = createStore();
setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
