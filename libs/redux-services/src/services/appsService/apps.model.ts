import { IKeyword } from '../keywordsService/keywords.model';

export interface IApp {
  _id: string;
  keyOverride?: string;
  url?: string;
  title: string;
  image?: string;
  section?: string;
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
}
