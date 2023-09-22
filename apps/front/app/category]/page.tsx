import Link from 'next/link';
import { PostCard } from '../../components/PostCard';
import { getPostsByCatSubCat } from '../../lib/api';

export default async function Category({
  params,
}: {
  params: { category: string };
}) {
  const { category } = params;
  const posts = getPostsByCatSubCat({ category });

  return (
    <div className="container mx-auto px-5">
      {/* <NextSeo
        title="Simple Usage Example"
        description="A short description goes here."
      /> */}
      <main>
        <div className="space-y-4">
          <p className="text-center text-xl">
            Welcome to a dynamic markdown blog using NextJS 13.
          </p>
        </div>

        <p className="text-3xl mb-6">Recent Posts</p>
        <div className="grid md:grid-cols-2 grid-cols-1 mx-auto md:gap-32 gap-8">
          {posts.map((post) => (
            <div key={post.title}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
        <div className="h-16"></div>
        <Link
          href="/blog"
          className="text-3xl hover:text-gray-300 hover:underline"
        >
          Read More
        </Link>
      </main>
    </div>
  );
}
