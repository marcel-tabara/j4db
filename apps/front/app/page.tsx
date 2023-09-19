import Link from 'next/link';
import LatestPost from '../components/LatestPost';
import PostPreview from '../components/PostPreview';
import { getData, getPostsByCatSubCat } from '../lib/api';

export default function Home() {
  console.log('[1;32m ####-#### Home');
  const posts = getPostsByCatSubCat({});
  const data = getData();

  return (
    <div className="container mx-auto px-5">
      {/* <DefaultSeo
        title="Simple Usage Example"
        description="A short description goes here."
      /> */}
      <main>
        <div className="space-y-4">
          <h1 className="text-center text-5xl">{data.app.title}</h1>
        </div>

        <div className="h-12"></div>

        <LatestPost />

        <div className="h-16"></div>

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
          href="/assets"
          className="text-3xl hover:text-gray-300 hover:underline"
        >
          Read More
        </Link>
      </main>
    </div>
  );
}
