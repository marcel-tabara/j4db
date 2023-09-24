import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Link from 'next/link';
import { flags } from '../app/api/flags';
import { Post } from '../lib/types';
import { Crumbs } from './Crumbs';
import { DateFormatter } from './DateFormatter';
import { Tags } from './Tags';

export const PostCard = ({ post }: { post: Post }) => {
  return (
    <Card sx={{ display: 'flex' }}>
      <Box
        sx={{ flexGrow: 1 }}
        m={1}
        display="flex"
        alignItems="center"
        flexDirection="column"
      >
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <Link href={`/${post.category}/${post.subcategory}/${post.slug}`}>
                <div>
                  <CardMedia
                    component="img"
                    sx={{ width: 151 }}
                    image={post.image}
                    alt={post.title}
                  />
                </div>
              </Link>
            </Grid>
            <Grid item xs={9}>
              <div>
                <Link
                  href={`/${post.category}/${post.subcategory}/${post.slug}`}
                >
                  <Typography component="div" variant="h5">
                    {post.title}
                  </Typography>
                </Link>
                {flags.date && (
                  <p>
                    <DateFormatter dateString={post.date} />
                  </p>
                )}
                {flags.breradcumbs && (
                  <Crumbs
                    category={post.category}
                    subcategory={post.subcategory}
                  />
                )}
                <Link
                  href={`/${post.category}/${post.subcategory}/${post.slug}`}
                >
                  <p>{post.description}</p>
                </Link>
                {flags.tags && <Tags tags={post.tags} />}
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  );
};
