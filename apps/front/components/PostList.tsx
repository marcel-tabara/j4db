import { Post } from '../lib/types';
import { PostCard } from './PostCard';

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
          <PostCard post={post} key={post.slug} />
        ))}
      </main>
    </div>
  );
}
