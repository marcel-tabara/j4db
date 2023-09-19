import { Post } from '../lib/types';
import PostPreview from './PostPreview';

export default async function PostList({
  params,
  posts,
}: {
  params: { category: string; subcategory: string; slug: string };
  posts: Post[];
}) {
  //const { category, subcategory } = params;
  //const posts = getPostsByCatSubCat({ category, subcategory });

  return (
    <div className="container mx-auto">
      {/* <NextSeo
        title="Simple Usage Example"
        description="A short description goes here."
      /> */}
      <main>
        {posts.map((post) => (
          <PostPreview post={post} key={post.slug} />
        ))}
      </main>
    </div>
  );
}
