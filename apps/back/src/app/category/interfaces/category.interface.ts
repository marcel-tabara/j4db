import { Document } from 'mongoose'
import { App } from '../../app/interfaces/app.interface'

export interface Category extends Document {
  readonly title: string
  readonly slug: string
  readonly description: string
  readonly app: App
}
