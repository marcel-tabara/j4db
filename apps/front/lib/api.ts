import fs from 'fs';
import matter from 'gray-matter';
import { join } from 'path';
import { Items, Post } from './types';

const appSlug = 'j4db';
const POSTS_PATH = join(process.cwd(), '_posts');

export const getData = () => {
  const fullPath = join(POSTS_PATH, appSlug, `data.json`);

  let data = [];
  try {
    data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch (error) {
    console.log('[1;32m ####-#### getData', error);
  }

  const short = {
    cats: (data?.cats ?? []).map(
      (e: { title: string; description: string; slug: string }) => {
        return {
          title: e.title || 'test',
          description: e.description || 'test',
          slug: e.slug || 'test',
        };
      },
    ),
    app: {
      title: data?.app?.title ?? 'test',
      slug: data?.app?.slug ?? 'test',
      description: data?.app?.description ?? 'test',
    },
  };
  return short;
};

export function getPostsByCatSubCat({
  category,
  subcategory,
}: {
  category?: string;
  subcategory?: string;
}): Post[] {
  const fullPath = join(
    POSTS_PATH,
    appSlug,
    `${category || ''}`,
    `${subcategory || ''}`,
    `all.json`,
  );

  let posts = [];
  try {
    posts = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  } catch (error) {
    console.log('[1;32m ####-#### getPostsByCatSubCat', error);
  }

  const trans = posts.map(
    (e: {
      slug: string;
      dateCreated: string;
      image: string;
      title: string;
      description: string;
      category: { slug: string };
      subcategory: { slug: string };
      keywords: string;
    }) => {
      return {
        slug: e.slug,
        date: e.dateCreated,
        image: e.image,
        title: e.title,
        description: e.description,
        category: e.category.slug,
        subcategory: e.subcategory.slug,
        tags: e.keywords,
      };
    },
  );

  return trans;
}

export function getPostsByCatSubCatSlug({
  category,
  subcategory,
  slug,
}: {
  category: string;
  subcategory: string;
  slug: string;
}): Items {
  const fullPath = join(
    POSTS_PATH,
    appSlug,
    `${category}`,
    `${subcategory}`,
    `${slug}.mdx`,
  );

  const fileContent = fs.readFileSync(fullPath, 'utf8');
  const { content, data } = matter(fileContent);

  const items = {
    content,
    data,
  };

  return items;
}
