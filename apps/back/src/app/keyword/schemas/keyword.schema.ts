import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Transform, Type } from 'class-transformer'
import * as mongoose from 'mongoose'
import { Document, ObjectId } from 'mongoose'
import { Article } from '../../article/schemas/article.schema'

export type KeywordDocument = Keyword & Document

@Schema()
export class Keyword {
  @Transform(({ value }) => value.toString())
  _id: ObjectId

  @Prop()
  title: string
  // article: Article
  // articleLink: Article

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Article.name })
  @Type(() => Article)
  article: Article

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Article.name })
  @Type(() => Article)
  articleLink: Article
}
export const KeywordSchema = SchemaFactory.createForClass(Keyword)
