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
    category: params[0],
    subcategory: params[1],
    slug: params[2],
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

  const {
    author,
    category,
    date,
    description,
    image,
    slug,
    subcategory,
    tags,
    title,
  } = data;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    author,
    category,
    date,
    description,
    image,
    slug,
    subcategory,
    tags,
    title,
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
