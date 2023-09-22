import { Typography } from '@mui/material';
import Link from 'next/link';

interface IBreadcrumbsProps {
  category: string;
  subcategory: string;
}
export const Breadcrumbs = ({ category, subcategory }: IBreadcrumbsProps) => {
  return (
    <div>
      <Typography>
        <Link href={`/${category}`}>{category}</Link>
        {' / '}
        <Link href={`/${category}/${subcategory}`}>{subcategory}</Link>
      </Typography>
    </div>
  );
};
