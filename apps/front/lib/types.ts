export type Items = {
  content: string;
  data: {
    [key: string]: string;
  };
};

export type Params = { category: string; subcategory: string; slug: string };

export type Post = {
  slug: string;
  date: string;
  image: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string;
};
