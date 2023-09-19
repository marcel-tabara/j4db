import Post from '../../components/Post';
import PostList from '../../components/PostList';
import { getPostsByCatSubCat } from '../../lib/api';

interface IRouteWithParams {
  params: {
    params: string[];
  };
}

export default function RouteWithParams({
  params: allParams,
}: IRouteWithParams) {
  const { params } = allParams;
  const posts = getPostsByCatSubCat({
    category: params[0] as string,
    subcategory: params[1] as string,
  });

  //const data = getData();
  const postParams = {
    category: params[0] as string,
    subcategory: params[1] as string,
    slug: params[2] as string,
  };

  if (params.length === 3) {
    return <Post params={postParams} />;
  } else {
    return <PostList params={postParams} posts={posts} />;
  }
}
