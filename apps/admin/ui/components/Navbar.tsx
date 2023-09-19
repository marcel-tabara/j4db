import { AppBar, Button, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const useStyles = makeStyles((theme: Theme) => ({
  navlinks: {
    marginLeft: theme.spacing(10),
    display: "flex",
  },
 logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: theme.spacing(20),
    "&:hover": {
      color: "yellow",
      borderBottom: "1px solid white",
    },
  },
}));

const NavBar = () => {
  const classes = useStyles();
  const router = useRouter();
  return (
    <AppBar position="static">
      <div className={classes.navlinks}>
        <Button onClick={() => router.push('/')}>
          <Link href="/" as="/" className="nav-bar">
            Home
          </Link>
        </Button>
        <Button onClick={() => router.push('/apps')}>
          <Link href="/apps" as="/apps" className="nav-bar">
            Apps
          </Link>
        </Button>
        <Button onClick={() => router.push('/articles')}>
          <Link href="/articles" as="/articles" className="nav-bar">
            Articles
          </Link>
        </Button>
        <Button onClick={() => router.push('/keywords')}>
          <Link href="/keywords" as="/keywords" className="nav-bar">
            Keywords
          </Link>
        </Button>
        <Button onClick={() => router.push('/categories')}>
          <Link href="/categories" as="/categories" className="nav-bar">
            Categories
          </Link>
        </Button>
        <Button onClick={() => router.push('/subcategories')}>
          <Link href="/subcategories" as="/subcategories" className="nav-bar">
            Subcategories
          </Link>
        </Button>
      </div>
    </AppBar>
  );
};

export { NavBar };
