import { ICategory } from '../categoriesService/categories.model';

export interface ISubCategory {
  _id: string;
  title: string;
  slug: string;
  description: string;
  category: ICategory;
}
