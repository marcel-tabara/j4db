import { IApp } from '../appsService/apps.model';
import { ICategory } from '../categoriesService/categories.model';
import { IKeyword } from '../keywordsService/keywords.model';
import { ISubCategory } from '../subcategoriesService/subcategories.model';

export interface IArticle {
  _id: string;
  keyOverride?: string;
  url?: string;
  title: string;
  image?: string;
  keywords?: IKeyword[];
  dateCreated?: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  description?: string;
  body?: string;
  publisherName?: string;
  publisherLogo?: string;
  slug?: string;
  category?: ICategory;
  subcategory?: ISubCategory;
  app: IApp;
  priority: number;
}

export interface IPaginatesArticles {
  data: IArticle[];
  total: number;
}
