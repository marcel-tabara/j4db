import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as fs from 'fs';
import * as mongoose from 'mongoose';
import { Model } from 'mongoose';
import { AppService } from '../app/app.service';
import { CategoryService } from '../category/category.service';
import { Keyword } from '../keyword/interfaces/keyword.interface';
import { KeywordService } from '../keyword/keyword.service';
import { SubcategoryService } from '../subcategory/subcategory.service';
import {
  cleanDir,
  generateArticlesFiles,
  generateCatSubcatFile,
} from './article.utils';
import { ArticleDTO } from './dto/article.dto';
import { PaginationDto } from './dto/pagination.dto';
import { Article } from './interfaces/article.interface';
import path = require('path');

type ArticleWithKeywords = { _doc: Article; keywords: Keyword[] };

const exportPath = '/apps/front/_posts/';

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel('Article') private readonly articleModel: Model<Article>,
    private readonly categoryService: CategoryService,
    private readonly keywordService: KeywordService,
    private readonly subcategoryService: SubcategoryService,
    private readonly appService: AppService,
  ) {}

  find = async (paginationQuery: PaginationDto, query): Promise<Article[]> => {
    Logger.log(
      `ArticleService: Find articles ${JSON.stringify(query, null, 2)}`,
    );
    const { limit, skip, sort } = paginationQuery;
    return await this.articleModel
      .find(query)
      .populate({
        path: 'app',
        select: '_id, title',
        strictPopulate: false,
      })
      .populate({
        path: 'category',
        select: '_id, title, slug',
        strictPopulate: false,
      })
      .populate({
        path: 'subcategory',
        select: '_id, title, slug',
        strictPopulate: false,
      })
      .sort(sort)
      .skip(skip)
      .limit(limit)
      .exec();
  };

  findAll = async (query): Promise<Article[]> => {
    Logger.log(
      `ArticleService: Find all articles ${JSON.stringify(query, null, 2)}`,
    );
    return await this.articleModel
      .find(query)
      .populate({
        path: 'category',
        select: '_id, slug',
        strictPopulate: false,
      })
      .populate({
        path: 'subcategory',
        select: '_id, slug',
        strictPopulate: false,
      })
      .sort({ datePublished: 'descending' })
      .exec();
  };

  findById = async (_id): Promise<Article> => {
    Logger.log(`ArticleService: findById ${_id}`);
    return await this.articleModel
      .findById(_id)
      .populate({
        path: 'app',
        select: '_id, title',
        strictPopulate: false,
      })
      .populate({
        path: 'category',
        select: '_id, slug',
        strictPopulate: false,
      })
      .populate({
        path: 'subcategory',
        select: '_id, slug',
        strictPopulate: false,
      })
      .exec();
  };

  create = async (articleDTO: ArticleDTO): Promise<Article> => {
    Logger.log(
      `ArticleService: Create article. ${JSON.stringify(articleDTO, null, 2)}`,
    );
    const article = await new this.articleModel(articleDTO).save();

    await this.keywordService.insertMany({
      _id: article._id,
      keywords: articleDTO.keywords,
    });

    return article;
  };

  findByIdAndUpdate = async (
    _id: string,
    articleDTO: ArticleDTO,
  ): Promise<Article> => {
    Logger.log(`ArticleService: findByIdAndUpdate ${_id}`);
    await this.keywordService.remove({ article: _id });
    await this.keywordService.insertMany({
      _id: _id,
      keywords: articleDTO.keywords,
    });

    return await this.articleModel.findByIdAndUpdate(_id, articleDTO, {
      new: true,
    });
  };

  findByIdAndRemove = async (_id): Promise<Article> => {
    Logger.log(`ArticleService: findByIdAndRemove ${_id}`);
    await this.keywordService.remove({ article: _id });
    return await this.articleModel.findByIdAndRemove(_id);
  };

  getCatSubCatPath = async ({ app, catSlug, subcatSlug }) => {
    Logger.log(`ArticleService: GetCatSubCatPath.`);
    const appData = await this.appService.findById(app);
    const dirPath = path.join(process.cwd(), exportPath, appData.slug);

    const catPath = path.join(dirPath, catSlug);
    const subCatPath = path.join(dirPath, catSlug, subcatSlug);
    return {
      dirPath,
      catPath,
      subCatPath,
    };
  };

  generateCatSubcatFile = async ({ app, catId, catSlug, subcatSlug }) => {
    Logger.log(`ArticleService: GeneratCatSubcatFile.`);
    const { catPath, subCatPath } = await this.getCatSubCatPath({
      app,
      catSlug,
      subcatSlug,
    });

    const articlesByCat = await this.find({} as PaginationDto, {
      app: new mongoose.Types.ObjectId(app),
      catId,
    });

    const articlesByCatWithKeywordsPromise = articlesByCat.map(async (a) => {
      const keywords =
        (await this.keywordService.find({ article: a._id })) || [];
      return { ...a, keywords: keywords.map((e) => e.title) };
    });
    const articlesByCatWithKeywords = await Promise.all(
      articlesByCatWithKeywordsPromise,
    );

    const cat = path.join(catPath, 'all.json');
    const subcat = path.join(subCatPath, 'all.json');
    !fs.existsSync(subCatPath) && fs.mkdirSync(subCatPath, { recursive: true });
    fs.writeFileSync(cat, JSON.stringify(articlesByCatWithKeywords, null, 2));
    const articlesBySubCat = articlesByCatWithKeywords.filter(
      (a) => a.subcategory?.slug === subcatSlug,
    );
    fs.writeFileSync(subcat, JSON.stringify({ articlesBySubCat }, null, 2));
  };

  removeCatSubcatFile = async ({ app, catSlug, subcatSlug }) => {
    Logger.log(`ArticleService: RemoveCatSubcatFile.`);
    const { catPath, subCatPath } = await this.getCatSubCatPath({
      app,
      catSlug,
      subcatSlug,
    });

    const cat = path.join(catPath, 'all.json');
    const subcat = path.join(subCatPath, 'all.json');
    fs.existsSync(cat) && fs.unlinkSync(cat);
    fs.existsSync(subcat) && fs.unlinkSync(subcat);

    await cleanDir(subCatPath);
    await cleanDir(catPath);
  };

  removeArticleFile = async ({ article, catSlug, subcatSlug }) => {
    Logger.log(`ArticleService: RemoveArticleFile.`);
    const filePath = await this.getFilePath(article, catSlug, subcatSlug);

    fs.existsSync(filePath) && fs.unlinkSync(filePath);
  };

  getCatSubcatSlug = async ({ article }) => {
    Logger.log(`ArticleService: GetCatSubcatSlug.`);
    const cat = await this.categoryService.findById(article.category);
    const subcat = await this.subcategoryService.findById(article.subcategory);

    return {
      catSlug: cat.slug,
      subcatSlug: subcat?.slug,
      catId: cat._id,
    };
  };

  getFilePath = async (article, cat: string, subcat: string) => {
    Logger.log(`ArticleService: GetFilePath.`);
    const app = await this.appService.findById(article.app);
    const dirPath = path.join(process.cwd(), exportPath, app.slug);
    return path.join(dirPath, cat, subcat, `${article.slug}.mdx`);
  };

  generateArticles = async () => {
    Logger.log(`ArticleService: Generate Article Files.`);
    try {
      const articles = await this.find({} as PaginationDto, {});
      const appData = await this.appService.findById(articles[0].app);
      const dirPath = path.join(process.cwd(), exportPath, appData.slug);
      cleanDir(dirPath, true);

      articles.map(async (a) => {
        const keywordsPromise =
          (await this.keywordService.find({ article: a._id })) || [];
        const keywords = await Promise.all(keywordsPromise);

        generateArticlesFiles({
          article: a,
          catSlug: a.category.slug,
          subcatSlug: a.subcategory.slug,
          keywords,
        });
        this.generateCatSubcatFile({
          app: a.app,
          catSlug: a.category.slug,
          catId: a.category._id,
          subcatSlug: a.subcategory.slug,
        });
      });

      return 'success';
    } catch (error) {
      Logger.log(`ArticleService Error: `, error);
      return error;
    }
  };

  generateDataByApp = async (_id: string) => {
    Logger.log(`ArticleService: generateDataByApp.`);
    try {
      const app = await this.appService.findById(_id);
      const cats = await this.categoryService.find({ app: _id });
      const articles = await this.findAll({ app: _id });
      const articleCats = articles.map((a) => a.category.toString());

      const dirPath = path.join(process.cwd(), exportPath, app.slug);

      const catsWithArticles = cats.filter((c) => articleCats.includes(c.id));
      const data = {
        app,
        cats: catsWithArticles,
      };

      !fs.existsSync(dirPath) && fs.mkdirSync(dirPath, { recursive: true });
      fs.writeFileSync(
        path.join(dirPath, 'data.json'),
        JSON.stringify(data, null, 2),
      );
    } catch (error) {
      Logger.log(`ArticleService generateDataByApp Error: `, error);
    }
  };

  generateContentByApp = async (_id: string) => {
    Logger.log(`ArticleService: generateContentByApp.`);
    try {
      const app = await this.appService.findById(_id);
      const articles = await this.findAll({ app: _id });
      const articleIds = articles.map((a) => a._id);
      const allKeywords = await this.keywordService.find({
        article: { $in: articleIds },
      });

      const dirPath = path.join(process.cwd(), exportPath, app.slug);
      cleanDir(dirPath);

      this.generateDataByApp(app.id);

      generateCatSubcatFile({
        folderPath: dirPath,
        articles: articles,
        type: 'all.json',
      });

      const data = articles.reduce((acc, a) => {
        const keywords = allKeywords
          .filter((k) => {
            return k.article._id.toString() === a._id.toString();
          })
          .map((e) => e.title);

        if (!acc[a.category.slug]?.[a.subcategory.slug]) {
          acc[a.category.slug] = {
            ...acc[a.category.slug],
            [a.subcategory.slug]: [{ ...a, keywords }],
          };
        } else {
          acc[a.category.slug][a.subcategory.slug].push({ ...a, keywords });
        }

        return acc;
      }, {});

      Object.entries(data).map((e) => {
        const cat = e[0];
        const oSubcat = e[1];
        const catPath = path.join(dirPath, cat);
        const catArticles = articles.filter((a) => a.category.slug === cat);

        generateCatSubcatFile({
          folderPath: catPath,
          articles: catArticles,
          type: 'all.json',
        });

        Object.entries(oSubcat).map((e) => {
          const subcat = e[0];
          const subcatArticles: ArticleWithKeywords[] = e[1];
          const subcatPath = path.join(dirPath, cat, subcat);
          generateCatSubcatFile({
            folderPath: subcatPath,
            articles: subcatArticles.map((e) => e._doc),
            type: 'all.json',
          });

          subcatArticles.map(
            async ({
              _doc,
              keywords,
            }: {
              _doc: Article;
              keywords: Keyword[];
            }) => {
              generateArticlesFiles({
                article: _doc,
                catSlug: _doc.category?.slug,
                subcatSlug: _doc.subcategory?.slug,
                keywords,
                app,
              });
            },
          );
        });
      });

      return '';
    } catch (error) {
      Logger.log(`ArticleService Error: `, error);
      return error.message;
    }
  };
}
