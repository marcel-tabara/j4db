import { Logger } from '@nestjs/common';
import * as fs from 'fs';
import { App } from '../app/interfaces/app.interface';
import { Keyword } from '../keyword/interfaces/keyword.interface';
import { Article } from './interfaces/article.interface';
import path = require('path');

interface IBaseFileProps {
  article: Article;
  catSlug: string;
  subcatSlug: string;
  keywords?: Keyword[];
  app?: App;
}
const getFilePath = ({ article, catSlug, subcatSlug, app }: IBaseFileProps) => {
  Logger.log(`ArticleService: GetFilePath.`);
  return path.join(
    process.cwd(),
    '/apps/front/_posts/',
    app.slug,
    catSlug,
    subcatSlug,
    `${article.slug}.mdx`,
  );
};

export const sanitizeText = (text: string) => {
  return text
    .replace(new RegExp(':', 'g'), '-')
    .replace(new RegExp(/(\r\n?|\n|\t)/g), '-');
};

export const getBody = async ({
  article,
  catSlug,
  subcatSlug,
  keywords,
}: IBaseFileProps): Promise<string> => {
  Logger.log(`ArticleService: GetBody.`);
  let articleBody = article.body;

  keywords.map((e) => {
    articleBody = articleBody.replace(
      e.title,
      `[${e.title}](${e.articleLink.url})`,
    );
  });
  const tags = keywords.map((e) => e.title) || '';
  return `---
title: ${article?.title}
category: ${catSlug}
subcategory: ${subcatSlug}
description: ${sanitizeText(article?.description)}
date: ${article?.dateCreated}
image: ${article?.image}
tags: ${tags}
slug: ${article?.slug}
author1: ${article?.authorName}
---
${articleBody}
`;
};

export const cleanDir = async (path, removeAll = false) => {
  Logger.log(`ArticleService: Clean directory.`);
  if (fs.existsSync(path) && (fs.readdirSync(path).length <= 1 || removeAll)) {
    fs.rmSync(path, { recursive: true });
  }
};

export const generateCatSubcatFile = async ({ folderPath, articles, type }) => {
  !fs.existsSync(folderPath) && fs.mkdirSync(folderPath, { recursive: true });
  fs.writeFileSync(
    path.join(folderPath, type),
    JSON.stringify(articles, null, 2),
  );
};

export const generateArticlesFiles = async ({
  article,
  catSlug,
  subcatSlug,
  keywords,
  app,
}: IBaseFileProps): Promise<string> => {
  Logger.log(
    `ArticleService: GenerateArticlesFiles: ${app.url}/${catSlug}/${subcatSlug}/${article.slug}`,
  );

  try {
    const filePath = await getFilePath({ article, catSlug, subcatSlug, app });
    await getBody({ article, catSlug, subcatSlug, keywords }).then((e) => {
      const dirname = path.dirname(filePath);
      !fs.existsSync(dirname) && fs.mkdirSync(dirname, { recursive: true });
      fs.writeFileSync(filePath, e);
    });
  } catch (error) {
    return error;
  }
  return 'SUCCESS';
};
