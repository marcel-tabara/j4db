import { useDeleteArticleMutation } from '@j4db/redux-services';
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
import { IArticlesProps } from '../../utils/types';
import Loader from './Loader';

const Articles = ({ articles }: IArticlesProps) => {
  const [deleteArticle, { isLoading: deleting }] = useDeleteArticleMutation();
  const router = useRouter();
  const onAddArticle = () => router.push('/articles/add');
  const onDelete = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const id = e.currentTarget.id;
    if (id) {
      deleteArticle(id);
      router.push('/articles');
    }
  };

  if (deleting) {
    return <Loader />;
  }

  return (
    <>
      <Button type="button" className="btn btn-primary" onClick={onAddArticle}>
        Add Article
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Article</TableCell>
              <TableCell align="left">App</TableCell>
              <TableCell align="left">Cat</TableCell>
              <TableCell align="left">Subcat</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(articles ?? []).map((article) => (
              <TableRow key={article._id}>
                <TableCell align="left">
                  {' '}
                  <Link href="/articles/[_id]" as={`/articles/${article._id}`}>
                    {article.title || 'Missing title!'}
                  </Link>
                </TableCell>
                <TableCell align="left">{article.app.title}</TableCell>
                <TableCell align="left">{article.category?.slug}</TableCell>
                <TableCell align="left">{article.subcategory?.slug}</TableCell>
                <TableCell align="right">
                  <IconButton
                    id={article._id}
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

export { Articles };
