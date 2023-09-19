import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { IApp } from './apps.model';

const apps = (state: RootState) => state.appsService.queries.getApps;
const appById = (state: RootState) => state.appsService.queries.getAppById;

export const appsSelector = createSelector(apps, (item) => {
  return {
    available: item?.status === 'fulfilled',
    fetching: item?.status === 'pending',
    data: item?.data as IApp[],
    error: item?.error,
  };
});

export const appByIdSelector = createSelector(appById, (item) => {
  return {
    available: item?.status === 'fulfilled',
    fetching: item?.status === 'pending',
    data: item?.data as IApp,
    error: item?.error,
  };
});
