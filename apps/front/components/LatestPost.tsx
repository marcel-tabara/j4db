import Image from 'next/image';
import Link from 'next/link';
import { getPostsByCatSubCat } from '../lib/api';
import { DateFormatter } from './DateFormatter';

export default function LatesPost() {
  const latestPost = getPostsByCatSubCat({})[0];

  return (
    <Link
      href={`/${latestPost?.category}/${latestPost?.subcategory}/${latestPost?.slug}`}
    >
      <div className="w-full mx-auto group">
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

        <div className="grid mt-4 md:grid-cols-1 grid-cols-1">
          <div className="mb-2">
            <p className="font-semibold text-xl group-hover:underline">
              {latestPost?.title}
            </p>
            <p>{latestPost?.description}</p>
            <p>
              <DateFormatter dateString={latestPost?.date} />
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
