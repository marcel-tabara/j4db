import { HttpException, Injectable, Logger } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { CreateChatgptDto } from './dto/create-chatgpt.dto';
import { ChatGptResponse } from './dto/response-chatgpt.dto';

@Injectable()
export class ChatGptService {
  private readonly apiKey: string;
  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }
  generateTextGPT3 = async ({ prompt }: CreateChatgptDto) => {
    Logger.log('generateTextGPT3 prompt', prompt);
    return this.generateText({ prompt, model: 'text-davinci-003' });
  };

  generateText = async ({ prompt, model }: CreateChatgptDto) => {
    try {
      const response = await axios.post<ChatGptResponse>(
        'https://api.openai.com/v1/completions',
        {
          model,
          prompt,
          temperature: 1,
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${this.apiKey}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new HttpException('ChatGPT Service', error.response.status);
      } else {
        console.log('########## error', error);
      }
    }
  };
}
