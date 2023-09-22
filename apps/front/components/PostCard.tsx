import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { Post } from '../lib/types';
import { Breadcrumbs } from './Breadcrumbs';
import { DateFormatter } from './DateFormatter';
import { Tags } from './Tags';

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <Box sx={{ flexGrow: 1 }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Link href={`/${post.category}/${post.subcategory}/${post.slug}`}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                {/* <div>
                  <Image
                    alt={`cover image for ${post.title}`}
                    src={post.image}
                    width={100}
                    height={100}
                    style={{ width: '100%' }}
                    className="rounded"
                  />
                </div> */}
                <CardMedia
                  component="img"
                  sx={{ width: 151 }}
                  image={post.image}
                  alt="Live from space album cover"
                />
              </Grid>
              <Grid item xs={8}>
                <div>
                  <Typography component="div" variant="h5">
                    {post.title}
                  </Typography>
                  <p>
                    <DateFormatter dateString={post.date} />
                  </p>
                  <Breadcrumbs
                    category={post.category}
                    subcategory={post.subcategory}
                  />
                  <p>{post.description}</p>
                  <Tags tags={post.tags} />
                </div>
              </Grid>
            </Grid>
          </Link>
        </CardContent>
      </Box>
    </Card>
  );
};
