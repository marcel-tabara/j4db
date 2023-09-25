import Image from 'next/image';
import Link from 'next/link';
import { flags } from '../app/api/flags';
import { getPostsByCatSubCat } from '../lib/api';
import { Crumbs } from './Crumbs';
import { DateFormatter } from './DateFormatter';

export default function LatesPost() {
  const latestPost = getPostsByCatSubCat({})[0];

  return (
    <div className="w-full mx-auto group">
      <Link
        href={`/${latestPost?.category}/${latestPost?.subcategory}/${latestPost?.slug}`}
      >
        <div style={{ verticalAlign: 'center' }}>
          <Image
            alt={`cover image for hero ${latestPost?.title}`}
            src={latestPost?.image}
            width={200}
            height={200}
            style={{ width: '100%' }}
            className="rounded"
          />
        </div>
      </Link>
      <div className="grid mt-4 md:grid-cols-1 grid-cols-1">
        <div className="mb-2">
          <Link
            href={`/${latestPost?.category}/${latestPost?.subcategory}/${latestPost?.slug}`}
          >
            <p className="font-semibold text-xl group-hover:underline">
              {latestPost?.title}
            </p>
          </Link>
          {flags.breradcumbs && (
            <Crumbs
              category={latestPost.category}
              subcategory={latestPost.subcategory}
            />
          )}
          <Link
            href={`/${latestPost?.category}/${latestPost?.subcategory}/${latestPost?.slug}`}
          >
            <p>{latestPost?.description}</p>
          </Link>
          {flags.date && <DateFormatter dateString={latestPost?.date} />}
        </div>
      </div>
    </div>
  );
}
