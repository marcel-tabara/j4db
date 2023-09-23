import { Post } from '../lib/types';
import { PostCard } from './PostCard';

export default async function PostList({ posts }: { posts: Post[] }) {
  return (
    <div className="container mx-auto">
      <main>
        {posts.map((post) => (
          <PostCard post={post} key={post.slug} />
        ))}
      </main>
    </div>
  );
}
