import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Transform, Type } from 'class-transformer'
import * as mongoose from 'mongoose'
import { Document, ObjectId } from 'mongoose'
import { Category } from '../../category/schemas/category.schema'

export type SubcategoryDocument = Subcategory & Document

@Schema()
export class Subcategory {
  @Transform(({ value }) => value.toString())
  _id: ObjectId

  @Prop()
  title: string

  @Prop()
  slug: string

  @Prop()
  description: string

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  @Type(() => Category)
  category: Category
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory)
