import {
  getPostsByCatSubCat,
  getPostsByCatSubCatSlug,
} from 'apps/front/lib/api';
import Post from '../../components/Post';
import PostList from '../../components/PostList';

interface IRouteWithParams {
  params: {
    params: string[];
  };
}

export default function RouteWithParams({
  params: allParams,
}: IRouteWithParams) {
  const { params } = allParams;

  const postParams = {
    category: params[0] as string,
    subcategory: params[1] as string,
    slug: params[2] as string,
  };

  const { data, content } =
    params.length === 3
      ? getPostsByCatSubCatSlug(postParams)
      : { data: {}, content: '' };

  const posts =
    params.length === 2
      ? getPostsByCatSubCat({
          category: postParams.category,
          subcategory: postParams.subcategory,
        })
      : [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    title: data.title,
    category: data.category,
    subcategory: data.subcategory,
    description: data.description,
    date: data.date,
    image: data.image,
    tags: data.tags,
    slug: data.slug,
    author: data.author,
  };

  return (
    <div className="container mx-auto">
      <section>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </section>
      <main>
        {params.length === 3 && <Post data={data} content={content} />}
        {params.length === 2 && <PostList posts={posts} />}
      </main>
    </div>
  );
}
