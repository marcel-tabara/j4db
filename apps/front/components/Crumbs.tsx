import { Breadcrumbs } from '@mui/material';
import Link from 'next/link';

interface IBreadcrumbsProps {
  category: string;
  subcategory: string;
}
export const Crumbs = ({ category, subcategory }: IBreadcrumbsProps) => {
  return (
    <div className="breadcrumbs">
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href={`/${category}`}>
          {category}
        </Link>
        <Link color="inherit" href={`/${category}/${subcategory}`}>
          {subcategory}
        </Link>
      </Breadcrumbs>
    </div>
  );
};
