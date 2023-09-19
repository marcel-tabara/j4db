import { useDeleteCategoryMutation } from '@j4db/redux-services';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ICategoriesProps } from '../../utils/types';
import Loader from './Loader';

const Categories = ({ categories }: ICategoriesProps) => {
  const [deleteCategory, { isLoading: deleting }] = useDeleteCategoryMutation();
  const router = useRouter();
  const onAddCategory = () => router.push('/categories/add');
  const onDelete = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const id = e.currentTarget.id;
    if (id) {
      deleteCategory(id);
      router.push('/categories');
    }
  };

  if (deleting) {
    return <Loader />;
  }

  return (
    <>
      <Button type="button" className="btn btn-primary" onClick={onAddCategory}>
        Add Category
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Category</TableCell>
              <TableCell align="left">App</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(categories ?? []).map((category) => (
              <TableRow key={category._id}>
                <TableCell align="left">
                  <Link
                    href="/categories/[_id]"
                    as={`/categories/${category._id}`}
                  >
                    {category.title}
                  </Link>
                </TableCell>
                <TableCell align="left">{category.app.title}</TableCell>
                <TableCell align="right">
                  <IconButton
                    id={category._id}
                    className="pointer"
                    onClick={onDelete}
                    href=""
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export { Categories };
