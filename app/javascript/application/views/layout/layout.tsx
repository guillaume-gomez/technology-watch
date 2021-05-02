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
    <>
      { loggedIn
        ? <PrivateHeader />
        : <PublicHeader />}
      <Main gridArea="main" pad="large" align="center" >
        <Box elevation="small" pad="medium" width="xlarge">
          {children}
        </Box>
      </Main>
      <Footer />
    </>
  );
}
