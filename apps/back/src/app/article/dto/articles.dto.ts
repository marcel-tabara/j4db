import { Article } from '../interfaces/article.interface'

export class ArticleDTO {
  readonly total: number
  readonly skip: number
  readonly limit: number
  readonly data: Article[]
}
