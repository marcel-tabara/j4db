import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Link from 'next/link';
import { Post } from '../lib/types';
import DateFormatter from './DateFormatter';

export default function PostPreview({ post }: { post: Post }) {
  return (
    <Box sx={{ flexGrow: 1, paddingBottom: 5 }}>
      <Link href={`/${post.category}/${post.subcategory}/${post.slug}`}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <div>
              <Image
                alt={`cover image for ${post.title}`}
                src={post.image}
                width={100}
                height={100}
                style={{ width: '100%' }}
              />
            </div>
          </Grid>
          <Grid item xs={8}>
            <div>
              <p className="font-semibold text-xl group-hover:underline">
                {post.title}
              </p>
              <DateFormatter dateString={post.date} />
              <p>{post.description}</p>
            </div>
          </Grid>
        </Grid>
      </Link>
    </Box>
  );
}
