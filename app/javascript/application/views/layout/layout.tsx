import React, { ReactElement, ReactChild } from "react";
import { Box, Main, Grid } from "grommet";
import PublicHeader from "../../components/publicHeader";
import PrivateHeader from "../../components/privateHeader";
import Footer from "../../components/footer";

export interface LayoutProps {
  children: ReactChild;
  loggedIn?: boolean
}

export default function Layout({ children, loggedIn = false } : LayoutProps) : ReactElement {
  return (
    <Grid
      rows={['xxsmall', 'xlarge', 'xxsmall']}
      columns={['full']}
      areas={[
        { name: 'header', start: [0, 0], end: [0, 0] },
        { name: 'main', start: [0, 1], end: [0, 1] },
        { name: 'footer', start: [0, 2], end: [0, 2] },
      ]}
      gap="small"
    >
      <Box gridArea="header">
        { loggedIn
          ? <PrivateHeader />
          : <PublicHeader />}
      </Box>
      <Main gridArea="main" pad="large" align="center" >
        <Box elevation="small" pad="medium" width="xlarge">
          {children}
        </Box>
      </Main>
      <Box gridArea="footer">
        <Footer />
      </Box>
    </Grid>
  );
}
