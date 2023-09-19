import Link from 'next/link';
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactFragment,
  ReactPortal,
} from 'react';
import { getData } from '../lib/api';

export default function Navbar() {
  const data = getData();

  return (
    <div className="bg-neutral-800">
      <nav className="container py-2 mx-auto">
        <ul className="flex space-x-6 text-lg justify-center">
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          {data.cats.map(
            (e: {
              _id: Key | null | undefined;
              slug: string;
              title:
                | string
                | number
                | boolean
                | ReactElement<string, string | JSXElementConstructor<string>>
                | ReactFragment
                | ReactPortal
                | null
                | undefined;
            }) => {
              return (
                <li key={e._id + e.slug}>
                  <NavLink href={e.slug}>{e.title}</NavLink>
                </li>
              );
            },
          )}
        </ul>
      </nav>
    </div>
  );
}

type NavLink = {
  href: string;
  children: React.ReactNode;
};

const NavLink = ({ href, children }: NavLink) => {
  return (
    <Link className="hover:text-gray-300 hover:underline" href={href}>
      {children}
    </Link>
  );
};
