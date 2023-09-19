import { useDeleteSubcategoryMutation } from '@j4db/redux-services';
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
import { ISubcategoriesProps } from '../../utils/types';
import Loader from './Loader';

const Subcategories = ({ subcategories }: ISubcategoriesProps) => {
  const router = useRouter();

  const [deleteSubcategory, { isLoading: deleting }] =
    useDeleteSubcategoryMutation();

  const onAddCategory = () => router.push('/subcategories/add');
  const onDelete = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const id = e.currentTarget.id;
    if (id) {
      deleteSubcategory(id);
      router.push('/subcategories');
    }
  };

  if (deleting) {
    return <Loader />;
  }

  return (
    <>
      <Button type="button" className="btn btn-primary" onClick={onAddCategory}>
        Add Subcategory
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Subcategory</TableCell>
              <TableCell align="left">Category</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(subcategories ?? []).map((subcategory) => (
              <TableRow
                key={subcategory._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                  <Link
                    href="/subcategories/[_id]"
                    as={`/subcategories/${subcategory._id}`}
                  >
                    {subcategory.title}
                  </Link>
                  <br />
                </TableCell>
                <TableCell align="left">{subcategory.category.slug}</TableCell>
                <TableCell align="right">
                  <IconButton
                    id={subcategory._id}
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

export { Subcategories };
