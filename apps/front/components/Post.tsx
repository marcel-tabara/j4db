import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Image from 'next/image';
import markdownStyles from '../app/markdown-styles.module.css';
import markdownToHtml from '../lib/markdownToHtml';
import { DateFormatter } from './DateFormatter';

export interface IData {
  content: string;
  data: {
    [key: string]: string;
  };
}

export default async function Post({ data, content }: IData) {
  const contentAsHtml = await markdownToHtml(content);

  return (
    <div className="container mx-auto">
      <main>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Image
                alt={`cover image for ${data.title}`}
                src={data.image}
                width={100}
                height={100}
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <div>
                <p className="font-semibold text-xl group-hover:underline">
                  <h1 className="text-center text-5xl">{data.title}</h1>
                </p>
                <div
                  className={markdownStyles['markdown']}
                  dangerouslySetInnerHTML={{ __html: contentAsHtml }}
                />
                <p>
                  <DateFormatter dateString={data.date} />
                </p>
              </div>
            </Grid>
          </Grid>
        </Box>
      </main>
    </div>
  );
}
