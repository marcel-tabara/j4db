import { Box, Grid, Stack } from '@mui/material';
import { NavBar } from '../ui/components/Navbar';

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid container height="calc(100vh - 38px)" direction="column">
      <Stack direction="column" columnGap={1}>
        <NavBar />
        <Box sx={{ flexGrow: 1, padding: 10 }}>{children}</Box>
      </Stack>
    </Grid>
  );
};

export { Main };
