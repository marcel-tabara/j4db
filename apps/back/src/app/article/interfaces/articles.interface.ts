import { Document } from 'mongoose'
import { Article } from './article.interface'

export interface Articles extends Document {
  readonly total: number
  readonly skip: number
  readonly limit: number
  readonly data: Article[]
}
