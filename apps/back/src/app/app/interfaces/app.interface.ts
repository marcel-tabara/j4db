import { Document } from 'mongoose'

export interface App extends Document {
  readonly keyOverride?: string
  readonly url: string
  readonly title: string
  readonly image: string
  readonly section: string
  readonly keywords: string
  readonly dateCreated: string
  readonly datePublished: string
  readonly dateModified?: string
  readonly authorName: string
  readonly description: string
  readonly body: string
  readonly publisherName: string
  readonly publisherLogo: string
  readonly slug: string
}
