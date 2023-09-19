import { getPostsByCatSubCatSlug } from '../../../../lib/api'
import markdownToHtml from '../../../../lib/markdownToHtml'
import markdownStyles from '../../../markdown-styles.module.css'

export default async function Slug({
  params,
}: {
  params: { category: string; subcategory: string; slug: string }
}) {
  const { category, subcategory, slug } = params
  const post = getPostsByCatSubCatSlug({ category, subcategory, slug })

  const content = await markdownToHtml(post.content || '')

  return (
    <div className="container mx-auto">
      {/* <NextSeo
        title="Simple Usage Example"
        description="A short description goes here."
      /> */}
      <main>
        <div className="w-full h-16  text-white">
          <p className="text-2xl">{post.title}</p>
          <p className="text-gray-400">{post.author}</p>
          <div
            className={markdownStyles['markdown']}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </main>
    </div>
  )
}
