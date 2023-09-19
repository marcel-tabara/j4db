'use client';
import { useDeleteAppMutation } from '@j4db/redux-services';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, IconButton } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IAppsProps } from '../../utils/types';
import Loader from './Loader';

const Apps = ({ apps }: IAppsProps) => {
  const [deleteApp, { isLoading: deleting }] = useDeleteAppMutation();
  const router = useRouter();
  const onAddApp = () => router.push('/apps/add');
  const onDelete = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => {
    const id = e.currentTarget.id;
    if (id) {
      deleteApp(id);
      router.push('/apps');
    }
  };

  if (deleting) {
    return <Loader />;
  }

  return (
    <>
      <Button type="button" className="btn btn-primary" onClick={onAddApp}>
        Add App
      </Button>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">Apps</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(apps ?? []).map((app) => (
              <TableRow
                key={app._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                  <Link href="/apps/[_id]" as={`/apps/${app._id}`}>
                    {app.title}
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    id={app._id}
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

export { Apps };
