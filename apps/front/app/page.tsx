import LatestPost from '../components/LatestPost';
import { PostCard } from '../components/PostCard';
import { getData, getPostsByCatSubCat } from '../lib/api';

export default function Home() {
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
        <div className="grid md:grid-cols-1 grid-cols-1 mx-auto md:gap-4 gap-2">
          {posts.map((post) => (
            <div key={post.title}>
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
