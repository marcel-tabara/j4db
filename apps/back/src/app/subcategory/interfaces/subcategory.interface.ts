import { Document } from 'mongoose'
import { Category } from '../../category/interfaces/category.interface'

export interface Subcategory extends Document {
  readonly title: string
  readonly slug: string
  readonly description: string
  readonly category: Category
}
