export interface IKeyword {
  _id?: string;
  title?: string;
  article: {
    _id: string;
    url: string;
  };
  articleLink?: {
    _id: string;
    url: string;
  };
}
