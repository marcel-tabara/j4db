import { useDeleteKeywordMutation } from '@j4db/redux-services';
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
import { IKeywordsProps } from '../../utils/types';
import Loader from './Loader';

const Keywords = ({ keywords }: IKeywordsProps) => {
  const router = useRouter();

  const [deleteKeyword, { isLoading: deleting }] = useDeleteKeywordMutation();

  const onAddKeyword = () => router.push('/keywords/add');
  const onDelete = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const id = e.currentTarget.id;
    if (id) {
      deleteKeyword(id);
      router.push('/keywords');
    }
  };

  if (deleting) {
    return <Loader />;
  }
  return (
    <>
      <Button type="button" className="btn btn-primary" onClick={onAddKeyword}>
        Add Keyword
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Keywords</TableCell>
              <TableCell align="left">Article</TableCell>
              <TableCell align="left">External link</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(keywords ?? []).map((keyword) => (
              <TableRow key={keyword._id}>
                <TableCell align="left">
                  <Link href="/keywords/[_id]" as={`/keywords/${keyword._id}`}>
                    {keyword.title}
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <Link
                    href="/articles/[_id]"
                    as={`/articles/${keyword.articleLink?._id}`}
                  >
                    {keyword.article._id}
                  </Link>
                </TableCell>
                <TableCell align="left">
                  <Link
                    href="/articles/[_id]"
                    as={`/articles/${keyword.articleLink?._id}`}
                  >
                    {keyword.article._id !== keyword.articleLink?._id &&
                      keyword.articleLink?._id}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    id={keyword._id}
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

export { Keywords };
