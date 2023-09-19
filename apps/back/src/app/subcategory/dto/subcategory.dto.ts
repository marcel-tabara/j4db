import { Category } from '../../category/schemas/category.schema'

export class SubcategoryDTO {
  readonly title: string
  readonly slug: string
  readonly description: string
  readonly category: Category
}
