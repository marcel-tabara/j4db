import { App } from '../../app/interfaces/app.interface'
import { Category } from '../../category/interfaces/category.interface'
import { Keyword } from '../../keyword/interfaces/keyword.interface'
import { Subcategory } from '../../subcategory/interfaces/subcategory.interface'

export class ArticleDTO {
  readonly keyOverride?: string
  readonly url: string
  readonly title: string
  readonly image: string
  readonly dateCreated: Date
  readonly datePublished: Date
  readonly dateModified?: Date
  readonly authorName: string
  readonly description: string
  readonly body: string
  readonly publisherName: string
  readonly publisherLogo: string
  readonly slug: string
  readonly category: Category
  readonly subcategory: Subcategory
  readonly app: App
  readonly _id: string
  readonly keywords: Keyword[]
}
