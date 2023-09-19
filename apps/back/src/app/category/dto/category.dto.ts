import { App } from '../../app/schemas/app.schema'

export class CategoryDTO {
  readonly title: string
  readonly slug: string
  readonly description: string
  readonly app: App
}
