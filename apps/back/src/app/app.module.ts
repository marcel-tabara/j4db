import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppsModule } from './app/app.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { KeywordModule } from './keyword/keyword.module';
import { SubcategoryModule } from './subcategory/subcategory.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.NX_MONGO_URL, {
      //useNewUrlParser: true,
    }),
    ArticleModule,
    CategoryModule,
    KeywordModule,
    SubcategoryModule,
    AppsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
