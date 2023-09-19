import Image from 'next/image';
import Link from 'next/link';
import { getPostsByCatSubCat } from '../lib/api';
import DateFormatter from './DateFormatter';

export default function LatesPost() {
  const latestPost = getPostsByCatSubCat({})[0];

  return (
    <Link
      href={`/${latestPost?.category}/${latestPost?.subcategory}/${latestPost?.slug}`}
    >
      <div className="w-full mx-auto group">
        <Image
          alt={`cover image for hero ${latestPost?.title}`}
          src={latestPost?.image}
          width={400}
          height={400}
          style={{ width: '100%' }}
        />

        <div className="grid mt-4 md:grid-cols-2 grid-cols-1">
          <div className="mb-2">
            <p className="font-semibold text-xl group-hover:underline">
              {latestPost?.title}
            </p>
            <DateFormatter dateString={latestPost?.date} />
          </div>
          <p>{latestPost?.description}</p>
        </div>
      </div>
    </Link>
  );
}
