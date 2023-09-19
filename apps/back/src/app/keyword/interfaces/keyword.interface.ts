import { Document } from 'mongoose'

export interface Keyword extends Document {
  readonly title: string
  readonly article: { _id: string; url: string }
  readonly articleLink: { _id: string; url: string }
}
