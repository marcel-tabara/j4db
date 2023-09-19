import markdownStyles from '../app/markdown-styles.module.css';
import { getPostsByCatSubCatSlug } from '../lib/api';
import markdownToHtml from '../lib/markdownToHtml';

export default async function Post({
  params,
}: {
  params: { category: string; subcategory: string; slug: string };
}) {
  const { category, subcategory, slug } = params;
  const { data, content } = getPostsByCatSubCatSlug({
    category,
    subcategory,
    slug,
  });
  const contentAsHtml = await markdownToHtml(content || '');

  console.log('[1;32m ####-#### post', data);
  return (
    <div className="container mx-auto">
      {/* <NextSeo
        title="Simple Usage Example"
        description="A short description goes here."
      /> */}
      <main>
        <div className="w-full h-16  text-white">
          <p className="text-2xl">{data.title}</p>
          <p className="text-gray-400">{data.author}</p>

          <div
            className={markdownStyles['markdown']}
            dangerouslySetInnerHTML={{ __html: contentAsHtml }}
          />
        </div>
      </main>
    </div>
  );
}
