import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import rake from 'rake-js';
import { ChatGptService } from '../chatgpt/chatgpt.service';
import { CreateChatgptDto } from '../chatgpt/dto/create-chatgpt.dto';
import { ChatGptResponse } from '../chatgpt/dto/response-chatgpt.dto';
import { KeywordDTO } from './dto/keyword.dto';
import { Keyword } from './interfaces/keyword.interface';

@Injectable()
export class KeywordService {
  constructor(
    @InjectModel('Keyword') private readonly keywordModel: Model<Keyword>,
    private readonly chatGptService: ChatGptService,
  ) {}

  generateText = async (prompt: string): Promise<ChatGptResponse> => {
    const createChatgptDto: CreateChatgptDto = { prompt };
    return this.chatGptService.generateTextGPT3(createChatgptDto);
  };

  extractKeywords = async ({
    _id,
    url,
    text,
  }: {
    _id: string;
    url: string;
    text: string;
  }): Promise<Keyword[]> => {
    Logger.log(`ArticleService: Extrating keywords. _id: ${_id}`);
    const extractedKeywords = rake(text, { language: 'english' });

    const keywords = await this.find({
      title: { $in: extractedKeywords },
      article: { $ne: _id },
    });

    const keys = keywords.map((e) => e.title);
    const transformedExtractedKeywords = extractedKeywords
      .filter((e: string) => !keys.includes(e))
      .map((e: Keyword) => {
        return {
          title: e,
          article: { _id, url },
          articleLink: { _id, url },
        };
      });

    const transformedKeywords = keywords.map((e) => {
      return {
        title: e.title,
        article: { _id, url },
        articleLink: { _id: e.articleLink._id, url: e.articleLink.url },
      };
    });

    return transformedExtractedKeywords.concat(transformedKeywords);
  };

  find = async (query: FilterQuery<Keyword>): Promise<Keyword[]> => {
    Logger.log(
      `KeywordService: Find keywords ${JSON.stringify(query, null, 2)}.`,
    );
    return await this.keywordModel
      .find(query)
      .populate({
        path: 'article',
        populate: {
          path: 'app',
          select: 'title',
        },
        //select: 'title, url',
        strictPopulate: false,
      })
      .populate({
        path: 'articleLink',
        populate: {
          path: 'app',
          select: 'title',
        },
        //select: 'title, url',
        strictPopulate: false,
      })
      .exec();
  };

  findById = async (_id: string): Promise<Keyword> => {
    Logger.log(`KeywordService: findById keyword ${_id}.`);
    return await this.keywordModel.findById(_id).exec();
  };

  add = async (keywordDTO: KeywordDTO): Promise<Keyword> => {
    Logger.log(`KeywordService: Add keyword.`);
    const newKeyword = await new this.keywordModel(keywordDTO);
    return newKeyword.save();
  };

  findByIdAndUpdate = async (
    _id: string,
    keywordDTO: KeywordDTO,
  ): Promise<Keyword> => {
    Logger.log(`KeywordService: findByIdAndUpdate ${_id}.`);
    return await this.keywordModel.findByIdAndUpdate(_id, keywordDTO['_id'], {
      new: true,
    });
  };

  findByIdAndRemove = async (_id: string): Promise<unknown> => {
    Logger.log(`KeywordService: findByIdAndRemove.`);
    return await this.keywordModel.findByIdAndRemove(_id);
  };

  remove = async (query): Promise<unknown> => {
    Logger.log(
      `KeywordService: Remove keywords ${JSON.stringify(query, null, 2)}.`,
    );
    return await this.keywordModel.deleteMany(query).exec();
  };

  insertMany = async ({
    _id,
    keywords,
  }: {
    _id: string;
    keywords: Keyword[];
  }): Promise<Keyword[]> => {
    Logger.log(
      `KeywordService: insertMany keywords ${_id} ${JSON.stringify(
        keywords,
        null,
        2,
      )}.`,
    );

    const updatedKeywords = keywords.map((e) => {
      return {
        ...e,
        // article: _id,
        // articleLink: e.article,
        // _id: undefined,
      };
    });

    return await this.keywordModel.insertMany(updatedKeywords, {
      ordered: false,
    });
  };
}
