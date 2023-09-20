import Link from 'next/link';
import PostPreview from '../../../components/PostPreview';
import { getPostsByCatSubCat } from '../../../lib/api';

export default async function SubCategory({
  params,
}: {
  params: { category: string; subcategory: string; slug: string };
}) {
  const { category, subcategory } = params;
  const posts = getPostsByCatSubCat({ category, subcategory });

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
              <PostPreview post={post} />
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
