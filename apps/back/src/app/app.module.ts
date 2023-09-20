import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppsModule } from './app/app.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { ChatGptModule } from './chatgpt/chatgpt.module';
import { KeywordModule } from './keyword/keyword.module';
import { SubcategoryModule } from './subcategory/subcategory.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.NX_MONGO_URL),
    ArticleModule,
    CategoryModule,
    KeywordModule,
    SubcategoryModule,
    AppsModule,
    ChatGptModule.forRoot(process.env.NX_OPENAI_KEY),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
