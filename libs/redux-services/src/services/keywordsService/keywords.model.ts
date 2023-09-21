export interface IKeyword {
  _id?: string;
  title?: string;
  article: {
    _id: string;
    url: string;
    title: string;
    app: {
      title: string;
    };
  };
  articleLink?: {
    _id: string;
    url: string;
    title: string;
    app: {
      title: string;
    };
  };
}
