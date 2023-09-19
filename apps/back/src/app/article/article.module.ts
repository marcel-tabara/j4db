import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AppsModule } from '../app/app.module'
import { CategoryModule } from '../category/category.module'
import { KeywordModule } from '../keyword/keyword.module'
import { SubcategoryModule } from '../subcategory/subcategory.module'
import { ArticleController } from './article.controller'
import { ArticleService } from './article.service'
import { ArticleSchema } from './schemas/article.schema'

@Module({
  imports: [
    AppsModule,
    CategoryModule,
    KeywordModule,
    SubcategoryModule,
    MongooseModule.forFeature([{ name: 'Article', schema: ArticleSchema }]),
  ],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {}
