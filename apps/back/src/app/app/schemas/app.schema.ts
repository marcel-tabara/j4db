import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Transform } from 'class-transformer'
import { Document, ObjectId } from 'mongoose'

export type AppDocument = App & Document

@Schema()
export class App {
  @Transform(({ value }) => value.toString())
  _id: ObjectId

  @Prop()
  keyOverride: string
  @Prop()
  url: string
  @Prop()
  title: string
  @Prop()
  image: string
  @Prop()
  section: string
  @Prop()
  keywords: string
  @Prop()
  dateCreated: string
  @Prop()
  datePublished: string
  @Prop()
  dateModified: string
  @Prop()
  authorName: string
  @Prop()
  description: string
  @Prop()
  body: string
  @Prop()
  publisherName: string
  @Prop()
  publisherLogo: string
  @Prop()
  slug: string
}

export const AppSchema = SchemaFactory.createForClass(App)
