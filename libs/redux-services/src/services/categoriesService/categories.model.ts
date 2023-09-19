import { IApp } from '../appsService/apps.model';

export interface ICategory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  app: IApp;
}
